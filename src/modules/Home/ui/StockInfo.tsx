import { type FC } from "react"
import { CompareStocksChart } from "./CompareStocksChart"
import { api } from "~/trpc/server";
import { type StockData } from "~/server/api/routers/stock";

const spyData = {
  "symbol": "SPY",
  "history": {
    "day": [
      {
        "date": "2019-01-02",
        "open": 154.89,
        "high": 158.85,
        "low": 154.23,
        "close": 137.92,
        "volume": 37039737
      },
      {
        "date": "2019-01-03",
        "open": 143.98,
        "high": 145.72,
        "low": 142.0,
        "close": 142.19,
        "volume": 91312195
      },
      {
        "date": "2019-01-04",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 178.26,
        "volume": 58607070
      },
      {
        "date": "2019-01-05",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 138.26,
        "volume": 58607070
      },
      {
        "date": "2019-01-06",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 149.26,
        "volume": 58607070
      },
      {
        "date": "2019-01-07",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 188.26,
        "volume": 58607070
      }, {
        "date": "2019-01-08",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 178.26,
        "volume": 58607070
      },
      {
        "date": "2019-01-09",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 168.26,
        "volume": 58607070
      },
      {
        "date": "2019-01-10",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 148.26,
        "volume": 58607070
      }
    ]
  }
}

const searchData = {
  "symbol": "NVDA",
  "history": {
    "day": [
      {
        "date": "2019-01-02",
        "open": 154.89,
        "high": 158.85,
        "low": 154.23,
        "close": 157.92,
        "volume": 37039737
      },
      {
        "date": "2019-01-03",
        "open": 143.98,
        "high": 145.72,
        "low": 142.0,
        "close": 142.19,
        "volume": 91312195
      },
      {
        "date": "2019-01-04",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 148.26,
        "volume": 58607070
      },
      {
        "date": "2019-01-05",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 148.26,
        "volume": 58607070
      },
      {
        "date": "2019-01-06",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 148.26,
        "volume": 58607070
      },
      {
        "date": "2019-01-07",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 148.26,
        "volume": 58607070
      }, {
        "date": "2019-01-08",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 148.26,
        "volume": 58607070
      },
      {
        "date": "2019-01-09",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 148.26,
        "volume": 58607070
      },
      {
        "date": "2019-01-10",
        "open": 144.53,
        "high": 148.5499,
        "low": 143.8,
        "close": 148.26,
        "volume": 58607070
      }
    ]
  }
}


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
