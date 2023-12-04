'use client'

import {
  type Dispatch,
  type SetStateAction,
  useState
} from "react";

import { Button } from "~/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/ui/Popover";
import { ChevronsUpDown } from "lucide-react";
import { VirtualizedList } from "~/components/VirtualizedList/VirtualizedList";
import stockList from '~/global/data/symbols.json'

interface SearchStockProps {
  selectedOption: string
  setSelectedOption: Dispatch<SetStateAction<string>>
  searchPlaceholder?: string;
  disabled?: boolean
  width?: string;
  height?: string;
}

export function SearchStock({
  selectedOption,
  setSelectedOption,
  searchPlaceholder = "Search stocks...",
  disabled = false,
  width = "400px",
  height = "400px",
}: SearchStockProps) {
  const [open, setOpen] = useState<boolean>(false);

  const clearSearch = () => {
    setSelectedOption('')
  }

  return (
    <div className="flex gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={disabled} asChild>
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
              setSelectedOption(currentValue.toUpperCase());
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <Button variant={'secondary'} disabled={disabled} onClick={clearSearch}>Clear search</Button>
    </div>
  );
} 