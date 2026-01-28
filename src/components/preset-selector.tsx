"use client";

import { PopoverProps } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AppRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Preset {
  id: string;
  name: string;
}

interface PresetSelectorProps extends PopoverProps {
  readonly presets: Preset[];
}

export function PresetSelector({ presets, ...props }: PresetSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<Preset>();

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Selecione uma instituição..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-50 lg:max-w-75"
        >
          {selectedPreset
            ? selectedPreset.name
            : "Selecione uma instituição..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-75 p-0">
        <Command>
          <CommandInput placeholder="Pesquisar instituições..." />
          <CommandList>
            <CommandEmpty>Nenhuma instituição encontrada.</CommandEmpty>
            <CommandGroup heading="Instituições">
              {presets.map((preset) => (
                <CommandItem
                  key={preset.id}
                  onSelect={() => {
                    setSelectedPreset(preset);
                    setOpen(false);
                  }}
                >
                  {preset.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedPreset?.id === preset.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <Link
                href={AppRoutes.INSTITUTIONS_CREATE}
                onClick={() => setOpen(false)}
              >
                <CommandItem>Cadastrar nova instituição</CommandItem>
              </Link>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
