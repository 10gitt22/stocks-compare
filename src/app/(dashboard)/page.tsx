import { StockInfo, StocksFilter } from "~/modules/Home";
import symbols from '~/global/data/symbols.json'
import { Skeleton } from "~/ui/Skeleton";
import { Suspense } from "react";

type HomePageProps = {
  searchParams?: {
    symbol?: string
    start?: string
    end?: string
  }
}

export default async function Home({
  searchParams,
}: HomePageProps) {

  const stock1Option = symbols.find(element => searchParams?.symbol === element.value)
  const stock2Option = symbols.find(element => 'SPY' === element.value)

  return (
    <main className="flex flex-col gap-20 lg:gap-0 lg:flex-row p-4 md:p-10">
      <StocksFilter
        stock1={searchParams?.symbol}
        stock2={'SPY'}
        width="500px"
        startDate={searchParams?.start}
        endDate={searchParams?.end}
      />
      <div className="flex flex-col lg:pl-10 w-full">
        {
          stock1Option &&
          stock2Option && (
            <div className="flex flex-col gap-4 md:flex-row w-full mb-10">
              <div className="flex-1">
                <h2 className="text-5xl font-bold text-primary/80">{stock1Option.value}</h2>
                <p className="text-xl text-zinc-500">{stock1Option.label}</p>
              </div>
              <div className="flex-1">
                <h2 className="text-5xl font-bold text-primary2/80">{stock2Option.value}</h2>
                <p className="text-xl text-zinc-500">{stock2Option.label}</p>
              </div>
            </div>
          )
        }
        {
          stock1Option &&
          stock2Option &&
          searchParams?.start &&
          searchParams?.end &&
          (
            <Suspense key={`${stock1Option.value}${stock2Option.value}${searchParams?.start}${searchParams?.end}`} fallback={<Skeleton className="w-full h-[400px]" />}>
              <StockInfo
                stock1={stock1Option.value}
                stock2={stock2Option.value}
                start={searchParams.start}
                end={searchParams.end}
              />
            </Suspense>
          )
        }
      </div>
    </main>
  );
}
