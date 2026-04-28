"use client";

import { ChevronDownIcon, Plus,SearchIcon, X } from "lucide-react";
import * as React from "react";

import { cn } from "@icat/ui/lib/utils";

import { Badge } from "./badge";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type AutocompleteProps<T extends string> = {
  name?: string;
  id?: string;
  options: readonly T[];
  defaultValue?: T[];
  value?: T[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  creatable?: boolean;
  errors?: string[];
  className?: string;
  onChange?: (values: T[]) => void;
};

export function Autocomplete<T extends string>({
  name,
  id,
  options,
  defaultValue = [],
  value,
  placeholder = "Select…",
  required,
  disabled,
  creatable = false,
  errors,
  className,
  onChange,
}: AutocompleteProps<T>) {
  const [internalValues, setInternalValues] = React.useState<T[]>(
    value || defaultValue,
  );
  const values = value !== undefined ? value : internalValues;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const hasError = !!errors?.length;

  const toggle = (val: T) => {
    const newValues = values.includes(val)
      ? values.filter((v) => v !== val)
      : [...values, val];

    if (value === undefined) {
      setInternalValues(newValues);
    }
    onChange?.(newValues);
    if (creatable) setSearchTerm("");
  };

  const removeValue = (val: T, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValues = values.filter((v) => v !== val);
    if (value === undefined) {
      setInternalValues(newValues);
    }
    onChange?.(newValues);
  };

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showCreateOption =
    creatable &&
    searchTerm.length > 0 &&
    !options.some((opt) => opt.toLowerCase() === searchTerm.toLowerCase()) &&
    !values.some((v) => v.toLowerCase() === searchTerm.toLowerCase());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && showCreateOption) {
      e.preventDefault();
      toggle(searchTerm as T);
    }
    e.stopPropagation();
  };

  return (
    <div id={id} className="w-full relative">
      {/* Hidden inputs for form submission */}
      {name &&
        (values.length > 0 ? (
          values.map((v) => (
            <input key={v} type="hidden" name={name} value={v} />
          ))
        ) : (
          <input type="hidden" name={name} value="" />
        ))}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex min-h-11 w-full flex-wrap items-center gap-2 rounded-lg border border-border px-3 py-2 text-base outline-none md:text-sm cursor-pointer dark:bg-input/30",
              "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
              disabled && "pointer-events-none opacity-50",
              hasError && "border-destructive text-destructive",
              className,
            )}
          >
            {values.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {values.map((v) => (
                  <Badge
                    key={v}
                    variant="secondary"
                    className="flex items-center gap-1 pr-1 py-0 h-7"
                  >
                    {v}
                    <button
                      type="button"
                      onClick={(e) => removeValue(v, e)}
                      className="hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronDownIcon className="ml-auto size-4 opacity-50 shrink-0" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <div className="p-2 border-b">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-9"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {showCreateOption && (
              <div
                className="flex items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors text-primary"
                onClick={() => toggle(searchTerm as T)}
              >
                <Plus className="size-4" />
                <span className="text-sm">Create &quot;{searchTerm}&quot;</span>
              </div>
            )}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                    values.includes(opt) && "bg-accent/50",
                  )}
                  onClick={() => toggle(opt)}
                >
                  <Checkbox
                    checked={values.includes(opt)}
                    onCheckedChange={() => toggle(opt)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-sm select-none">{opt}</span>
                </div>
              ))
            ) : (
              !showCreateOption && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              )
            )}
          </div>
          {values.length > 0 && (
            <div className="p-1 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-8 text-xs justify-center"
                onClick={() => {
                  if (value === undefined) setInternalValues([]);
                  onChange?.([]);
                }}
              >
                Clear all
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {hasError && (
        <div className="mt-1 text-sm text-destructive">
          {errors!.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      )}
    </div>
  );
}
