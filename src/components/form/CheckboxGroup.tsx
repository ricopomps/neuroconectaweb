"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type CheckboxOption = {
  value: string;
  label: string;
};

interface CheckboxGroupProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: CheckboxOption[];
  className?: string;
}

export function CheckboxGroup<T extends FieldValues>({
  control,
  name,
  options,
  className,
}: Readonly<CheckboxGroupProps<T>>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={className}>
          {options.map((option) => {
            const checked = field.value?.includes(option.value);

            return (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={checked}
                  onCheckedChange={(isChecked) => {
                    if (isChecked) {
                      field.onChange([...(field.value || []), option.value]);
                    } else {
                      field.onChange(
                        field.value?.filter((v: string) => v !== option.value),
                      );
                    }
                  }}
                />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            );
          })}
        </div>
      )}
    />
  );
}
