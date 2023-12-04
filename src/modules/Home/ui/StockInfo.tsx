import { type FC } from "react"
import { CompareStocksChart } from "./CompareStocksChart"
import { api } from "~/trpc/server";
import { type StockData } from "~/server/api/routers/stock";

type StockInfoProps = {
  stock1: string,
  stock2: string,
  start: string
  end: string
}

export const StockInfo: FC<StockInfoProps> = async ({
  stock1,
  stock2,
  start,
  end
}) => {
  const data1 = await api.stock.getStockPrices.query({ symbol: stock1, start: start, end: end })
  const data2 = await api.stock.getStockPrices.query({ symbol: stock2, start: start, end: end })

  if (!data1.history || !data2.history) {
    return (
      <div className="flex flex-col h-[400px] justify-center items-center text-3xl font-light text-zinc-600 w-full">
        No data 🤷🏼‍♂️
      </div>
    )
  }

  return (
    <CompareStocksChart data1={data1 as StockData} data2={data2 as StockData} />
  )
}
