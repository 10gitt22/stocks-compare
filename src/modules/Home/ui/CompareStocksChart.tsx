/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import { useCallback, type FC } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { type TooltipProps } from 'recharts/types/component/Tooltip'

import { useIsClient } from 'usehooks-ts'
import { type StockData, type StockPriceData } from '~/server/api/routers/stock'
import { Skeleton } from '~/ui/Skeleton'

// type Stock = {
//   symbol: string,
//   history: {
//     day: StockPriceData[]
//   }
// }

// type StockPriceData = {
//   date: string
//   open: number
//   high: number
//   low: number
//   close: number
//   volume: number
// }


type CompareStocksChartProps = {
  data1: StockData
  data2: StockData
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = (props: TooltipProps<any, any> & { data2: StockData }) => {
  const { active, payload, label, labelClassName, data2 } = props

  if (active && payload?.length && labelClassName) {
    const [data1Symbol, data2Symbol] = labelClassName?.split('/')
    const [data1FromPayload, data2FromPayload] = payload

    const data2Info = data2.history.day.find(obj => obj.date === data1FromPayload?.payload.date)

    const styleForData1 = { color: data1FromPayload?.stroke }
    const styleForData2 = { color: data2FromPayload?.stroke }

    return (
      <div className="bg-background p-4 border border-border rounded-sm">
        <p>
          Date: {label}
        </p>
        <div className='flex gap-4'>
          {
            data1FromPayload?.payload && (
              <div className='flex flex-col py-2'>
                <span className='text-2xl font-bold' style={styleForData1}>{data1Symbol}</span>
                <span style={styleForData1}>Close: {data1FromPayload.payload.close}</span>
                <span style={styleForData1}>Open: {data1FromPayload.payload.open}</span>
                <span style={styleForData1}>High: {data1FromPayload.payload.high}</span>
                <span style={styleForData1}>Low: {data1FromPayload.payload.low}</span>
                <span style={styleForData1}>Volume: {data1FromPayload.payload.volume}</span>
              </div>
            )
          }
          {
            data2Info && (
              <>
                {/* <div className='w-full bg-muted h-[0.5px]'></div> */}
                <div className='flex flex-col py-2'>
                  <span className='text-2xl font-bold' style={styleForData2}>{data2Symbol}</span>
                  <span style={styleForData2}>Close: {data2Info.close}</span>
                  <span style={styleForData2}>Open: {data2Info.open}</span>
                  <span style={styleForData2}>High: {data2Info.high}</span>
                  <span style={styleForData2}>Low: {data2Info.low}</span>
                  <span style={styleForData2}>Volume: {data2Info.volume}</span>
                </div>
              </>
            )
          }
        </div>
      </div>
    );
  }

  return null;
};

export const CompareStocksChart: FC<CompareStocksChartProps> = ({
  data1,
  data2
}) => {

  const isClient = useIsClient()

  const getPriceValueData1 = useCallback((data: StockPriceData) => {
    const index = data1.history.day.findIndex(obj => obj.date === data.date);
    return data1.history.day[index]?.close;
  }, [data1, data2])

  const getPriceValueData2 = useCallback((data: StockPriceData) => {
    const index = data2.history.day.findIndex(obj => obj.date === data.date);
    return data2.history.day[index]?.close;
  }, [data1, data2])

  const getTransformedDateValue = useCallback((data: StockPriceData) => {
    const date = new Date(data.date)
    return date.toLocaleDateString()
  }, [data1, data2])

  if (!isClient) {
    return <Skeleton className='w-full h-[400px]' />
  }

  return (
    <ResponsiveContainer height={400}>
      <LineChart data={data1.history.day} >
        <XAxis tickMargin={15} dataKey={getTransformedDateValue} />
        <YAxis tickMargin={5} />
        <Tooltip
          labelClassName={`${data1.symbol}/${data2.symbol}`}
          content={<CustomTooltip data2={data2} />}
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderRadius: 'var(--radius)',
            borderColor: 'hsl(var(--border))',
          }}
        />
        <CartesianGrid strokeDasharray="2 2" strokeWidth={0.4} />
        <Line type="monotone" dataKey={getPriceValueData1} stroke='hsl(var(--primary))' />
        <Line type="monotone" dataKey={getPriceValueData2} stroke='hsl(var(--primary2))' />
      </LineChart>
    </ResponsiveContainer>
  )
}
