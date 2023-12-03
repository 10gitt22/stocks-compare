'use client'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/ui/Command";
import { cn } from "~/global/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Check } from "lucide-react";
import { useRef, useState } from "react";

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
    // ================   OLD   =================
    // setFilteredOptions(
    //   options.filter((option) => {
    //     option.value.toLowerCase().includes(search.toLowerCase() ?? [])
    //   })
    // );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      <CommandEmpty>No item found.</CommandEmpty>
      <CommandGroup
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
                className="gap-3"
                key={filteredOption.value}
                value={filteredOption.value}
                onSelect={onSelectOption}
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
            }
          })}
        </div>
      </CommandGroup>
    </Command>
  );
};
