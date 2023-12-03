import { type SafeParseSuccess, z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env";
import { TRPCError } from "@trpc/server";

const stockPriceDataSchema = z.object({
  date: z.string(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close:z.number(),
  volume: z.number()
})

const stockHistorySchema = z.object({
  day: z.array(stockPriceDataSchema)
})
export type StockHistorySchema = z.infer<typeof stockHistorySchema>;
export type StockPriceData = z.infer<typeof stockPriceDataSchema>
export type StockData = {history: StockHistorySchema} & { symbol: string }

const stockHistoryResponseSchema = z.object({
  history: stockHistorySchema.nullable()
})

type GetStockHistoryResponse = z.infer<typeof stockHistoryResponseSchema>

export const stockRouter = createTRPCRouter({
  getStockPrices: protectedProcedure.input(
    z.object({
      symbol: z.string(),
      start: z.string(),
      end: z.string()
    })
  ).query(async ({ ctx, input }) => {
    const resp = await fetch(
        `${env.API_URL}/markets/history?symbol=${input.symbol}&interval=daily&start=${input.start}&end=${input.end}&session_filter=all`, { 
          headers: {
          "Authorization": `Bearer ${env.ACCESS_TOKEN}`,
          "Accept": "application/json"
        }
    })

    if (!resp.ok) {
      throw new TRPCError({
        code: 'BAD_REQUEST'
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await resp.json()
    const valid = stockHistoryResponseSchema.safeParse(data)

    if (!valid.success) {
      console.log(valid.error);
    }

    const result: GetStockHistoryResponse & { symbol: string } = {...(valid as SafeParseSuccess<GetStockHistoryResponse>).data, symbol: input.symbol}
    return result
  })
})