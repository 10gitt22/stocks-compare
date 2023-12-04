'use client'

import {
  useState,
  type FC,
} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { addDays, subDays } from "date-fns"

import { type DateRange } from "react-day-picker"
import { SelectDateRange } from "~/components/SelectDateRange/SelectDateRange"
import { Button } from "~/ui/Button"
import { SearchStock } from "./SearchStock"
import { cn } from "~/global/utils"

const transformDateToISOWithoutTime = (date: Date): string => {
  return date.toISOString().split('T')[0]!
}

type StocksFilter = {
  stock1?: string
  stock2?: string
  width?: string
  startDate?: string
  endDate?: string
}

export const StocksFilter: FC<StocksFilter> = ({
  stock1,
  stock2,
  width = '400px',
  startDate,
  endDate
}) => {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter();

  const [selectedStock1, setSelectedStock1] = useState(stock1 ?? '')
  const [selectedStock2, setSelectedStock2] = useState(stock2 ?? '')


  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startDate ? new Date(startDate) : subDays(new Date(), 3),
    to: endDate ? new Date(endDate) : new Date(),
  })

  const handleSubmit = () => {
    if (!selectedStock1 || !dateRange?.from || !dateRange?.to) {
      alert('SET ALL DATA!')
      return
    }

    const params = new URLSearchParams(searchParams)
    params.set('symbol', selectedStock1.toUpperCase())

    const startDate = transformDateToISOWithoutTime(dateRange.from)
    params.set('start', startDate)

    const endDate = transformDateToISOWithoutTime(dateRange.to)
    params.set('end', endDate)

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col lg:border-r border-border lg:pr-10">
      <SearchStock width={width} selectedOption={selectedStock1} setSelectedOption={setSelectedStock1} />
      <div className="w-[0.5px] h-[20px] my-2 ml-5 bg-primary/40"></div>
      <SearchStock width={width} selectedOption={selectedStock2} disabled setSelectedOption={setSelectedStock2} />

      <SelectDateRange className={cn("mt-10", `w-[${width}]`)} dateRange={dateRange} setDateRange={setDateRange} />
      <Button className="w-[150px] mt-4" onClick={handleSubmit}>Submit</ Button >
    </div>
  )
}
