'use client'

import { Button } from "~/ui/Button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/ui/Popover";

import { ChevronsUpDown } from "lucide-react";
import { VirtualizedList } from "~/components/VirtualizedList/VirtualizedList";
import stockList from '~/global/data/symbols.json'
import { useEffect, useState } from "react";

interface FindStockProps {

  searchPlaceholder?: string;
  width?: string;
  height?: string;
}

console.log(stockList, 'list');


export function FindStock({
  // options,
  searchPlaceholder = "Search stocks...",
  width = "400px",
  height = "400px",
}: FindStockProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    console.log({ selectedOption }, 'selectedOption');
  }, [selectedOption])

  const clearSearch = () => {
    setSelectedOption('')
  }

  return (
    <div className="flex gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
            style={{
              width: width,
            }}
          >
            {selectedOption
              ? selectedOption
              : searchPlaceholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0" style={{ width: width }}>
          <VirtualizedList
            height={height}
            options={stockList}
            placeholder={'Search...'}
            selectedOption={selectedOption}
            onSelectOption={(currentValue) => {
              setSelectedOption(
                currentValue === selectedOption ? "" : currentValue.toUpperCase()
              );
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <Button variant={'secondary'} onClick={clearSearch}>Clear search</Button>
    </div>
  );
}