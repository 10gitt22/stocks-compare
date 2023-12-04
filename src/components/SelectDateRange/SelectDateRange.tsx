import {
  type SetStateAction,
  type HTMLAttributes,
  type Dispatch,
  type FC
} from "react"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { cn } from "~/global/utils"
import { Button } from "~/ui/Button"
import { Calendar } from "~/ui/Calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/ui/Popover"

type SelectDateRangeProps = HTMLAttributes<HTMLDivElement> & {
  dateRange: DateRange | undefined
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>
}

export const SelectDateRange: FC<SelectDateRangeProps> = ({
  className,
  dateRange,
  setDateRange
}) => {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
