'use client'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "~/ui/Command";
import { cn } from "~/global/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Check, Star } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "~/ui/Button";
import { useLocalStorage } from "usehooks-ts";

type Option = {
  value: string;
  label: string;
  priority?: number
};

interface VirtualizedListProps {
  height: string;
  options: Option[];
  placeholder: string;
  selectedOption: string;
  onSelectOption?: (option: string) => void;
}

export const VirtualizedList = ({
  height,
  options,
  placeholder,
  selectedOption,
  onSelectOption,
}: VirtualizedListProps) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  const [favourites, setFavourites] = useLocalStorage<Option[]>('favourites', [])
  const virtualOptions = virtualizer.getVirtualItems();

  const handleSearch = (search: string) => {
    const filteredArr = options.filter((option) => {
      const valueIncludes = option.value.toLowerCase().includes(search.toLowerCase() ?? [])
      const labelIncludes = option.label.toLowerCase().includes(search.toLowerCase() ?? [])

      if (valueIncludes || labelIncludes) {
        return option
      }
    })

    setFilteredOptions(filteredArr)
  };

  const handleAddFavourite = (option: Option) => {
    setFavourites(prev => [...prev, option])
  }

  const handleRemoveFromFavourite = (value: string) => {
    const filteredArr = favourites.filter(stock => stock.value !== value)
    setFavourites([...filteredArr])
  }

  const checkIsInFavourite = (value: string) => {
    const isInFavoutites = favourites.find(stock => stock.value === value)
    return Boolean(isInFavoutites)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      {favourites.length > 0 && (
        <>
          <CommandGroup key={'another'} heading="Favourites">
            {favourites.map((stock => {
              return (
                <CommandItem className={cn("flex justify-between")}>
                  <CommandItem
                    className="flex items-center gap-2"
                    key={`fav${stock.value}`}
                    value={stock.value}
                    onSelect={onSelectOption}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedOption === stock.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <span className="text-xl block font-semibold text-yellow-600">{stock.value}</span>
                    <span className="font-light block">{stock.label}</span>

                  </CommandItem>
                  <Button size={'icon'} className="bg-muted text-xl font-bold group" onClick={() => handleRemoveFromFavourite(stock.value)}><Star className="w-[16px] stroke-yellow-600 fill-yellow-600 " /></Button>
                </CommandItem>
              )
            }))}
          </CommandGroup>
          <CommandSeparator />
        </>
      )}
      <CommandEmpty>No item found.</CommandEmpty>
      <CommandGroup
        heading={virtualOptions.length > 0 && "All stocks"}
        ref={parentRef}
        style={{
          height: height,
          width: "100%",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
            contain: 'strict'
          }}
        >
          {virtualOptions.map((virtualOption) => {
            const filteredOption = filteredOptions[virtualOption.index]
            if (filteredOption) {
              return <CommandItem
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualOption.size}px`,
                  transform: `translateY(${virtualOption.start}px)`,
                }}
                className="flex justify-between"
              >
                <CommandItem
                  key={filteredOption.value}
                  value={filteredOption.value}
                  onSelect={onSelectOption}
                  className="flex items-center gap-2"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedOption === filteredOption.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span className="text-xl font-semibold text-primary">{filteredOption.value}</span>
                  <span className="font-light">{filteredOption.label}</span>
                </CommandItem>
                {!checkIsInFavourite(filteredOption.value) && (
                  <Button size={'icon'} className="bg-muted text-xl font-bold group" onClick={() => handleAddFavourite(filteredOption)}><Star className="w-[16px] stroke-yellow-600 group-hover:stroke-white" /></Button>
                )}
              </CommandItem>
            }
          })}
        </div>
      </CommandGroup>
    </Command>
  );
};
