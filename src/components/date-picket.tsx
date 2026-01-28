"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import * as React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface DatePickerProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;

  className?: string;
  buttonClassName?: string;

  disabled?: boolean;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Selecione uma data",
  className,
  buttonClassName,
  disabled,
  minDate,
  maxDate,
}: Readonly<DatePickerProps<T>>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field className={cn("w-full", className)}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={name}
                disabled={disabled}
                className={cn("justify-start font-normal", buttonClassName)}
              >
                {field.value
                  ? new Date(field.value).toLocaleDateString("pt-BR")
                  : placeholder}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value}
                defaultMonth={field.value}
                locale={ptBR}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
                disabled={(date) =>
                  Boolean(
                    (minDate && date < minDate) || (maxDate && date > maxDate),
                  )
                }
              />
            </PopoverContent>
          </Popover>
        </Field>
      )}
    />
  );
}
