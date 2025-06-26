import { Button } from "@/components/ui/button";
import {
  CommandInput,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CommandEmpty, CommandItem } from "cmdk";
import { ChevronsUpDownIcon } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;

  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleOpenChange = (open: boolean) => {
    onSearch?.("");
    setOpen(open);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-around p-x-2 bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-sm rounded-lg font-medium tracking-tight",
          !selectedOption && "text-amber-600/70",
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon className="text-amber-600/70" />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <CommandInput
          placeholder="Search..."
          onValueChange={onSearch}
          className="border-2 border-amber-200 bg-amber-50/30 text-amber-900 placeholder:text-amber-600/70 focus:border-amber-400 focus:ring-amber-300/50"
        />
        <CommandList className="bg-gradient-to-br from-amber-50/30 to-orange-50/30 border-2 border-amber-200 shadow-lg backdrop-blur-sm">
          <CommandEmpty>
            <span className="text-amber-700/70 text-sm">No options found</span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className="text-amber-800 hover:bg-amber-100/50 hover:text-amber-900 transition-all duration-200"
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
