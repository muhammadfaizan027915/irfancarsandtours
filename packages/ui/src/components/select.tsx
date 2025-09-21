"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "lucide-react";
import { Badge } from "@icat/ui/components/badge";
import { cn } from "@icat/ui/lib/utils";

export type GenericSelectProps<T> = {
  options: readonly T[];
  placeholder?: string;
  multiple?: boolean;

  /** Controlled */
  value?: string | string[];

  /** Uncontrolled */
  defaultValue?: string | (string | undefined)[];

  /** Controlled handler */
  onValueChange?: (value: string | string[]) => void;

  /** Extracts unique value from option (default: String(opt)) */
  getOptionValue?: (option: T) => string;

  /** Render option label (default: String(opt)) */
  renderOption?: (option: T, selected: boolean) => React.ReactNode;

  errors?: string[];
  size?: "sm" | "default";
  className?: string;
  name?: string;
  id?: string;
};

function GenericSelect<T>({
  options,
  placeholder = "Select…",
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  getOptionValue,
  renderOption,
  errors,
  size = "default",
  className,
  name,
  id,
}: GenericSelectProps<T>) {
  const hasError = errors && errors.length > 0;

  const extractValue = React.useCallback(
    (opt: T): string => {
      const raw = getOptionValue ? getOptionValue(opt) : String(opt);
      return raw && raw.trim() !== "" ? raw : JSON.stringify(opt);
    },
    [getOptionValue]
  );

  const controlledValues = multiple
    ? (value as string[] | undefined) ?? []
    : value
    ? [value as string]
    : [];

  const uncontrolledValues = multiple
    ? (defaultValue as string[] | undefined) ?? []
    : defaultValue
    ? [defaultValue as string]
    : [];

  const [internalValues, setInternalValues] = React.useState<string[]>(
    controlledValues.length > 0 ? controlledValues : uncontrolledValues
  );

  React.useEffect(() => {
    if (value !== undefined) {
      if (multiple) {
        setInternalValues(
          Array.isArray(value) ? (value as string[]) : [value as string]
        );
      } else {
        setInternalValues(value ? [value as string] : []);
      }
    }
  }, [value, multiple]);

  const handleChange = (val: string) => {
    let newValues: string[];
    if (multiple) {
      newValues = internalValues.includes(val)
        ? internalValues.filter((v) => v !== val)
        : [...internalValues, val];
    } else {
      newValues = [val];
    }

    if (value === undefined) {
      setInternalValues(newValues);
    }
    onValueChange?.(multiple ? newValues : newValues[0]);
  };

  const values = value !== undefined ? controlledValues : internalValues;

  return (
    <div className="w-full" id={id}>
      <SelectPrimitive.Root
        value={values[0] ?? ""}
        onValueChange={handleChange}
      >
        <SelectTrigger
          size={size}
          hasError={hasError}
          className={cn(
            "max-w-full overflow-hidden truncate",
            hasError && "border-destructive text-destructive",
            className
          )}
        >
          {multiple ? (
            values.length > 0 ? (
              <div className="flex items-center gap-1 overflow-hidden">
                {values.slice(0, 3).map((v) => {
                  const opt = options.find((o) => extractValue(o) === v);
                  return (
                    <Badge key={v} className="text-xs">
                      {opt
                        ? renderOption?.(opt, true) ??
                          (typeof opt === "string" ? opt : extractValue(opt))
                        : v}
                    </Badge>
                  );
                })}
                {values.length > 3 && (
                  <Badge className="text-xs">+{values.length - 3}</Badge>
                )}
              </div>
            ) : (
              <SelectValue placeholder={placeholder} />
            )
          ) : values.length > 0 ? (
            (() => {
              const opt = options.find((o) => extractValue(o) === values[0]);
              return opt
                ? renderOption?.(opt, true) ??
                    (typeof opt === "string"
                      ? (opt as string)
                      : extractValue(opt))
                : values[0];
            })()
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="bg-popover text-popover-foreground z-50 min-w-[8rem] max-h-64 overflow-y-auto rounded-md border shadow-md"
            position="popper"
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => {
                const val = extractValue(opt);
                const selected = values.includes(val);

                return (
                  <SelectPrimitive.Item
                    key={val}
                    value={val}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
                      selected && "bg-accent text-accent-foreground"
                    )}
                  >
                    <SelectPrimitive.ItemText>
                      {renderOption?.(opt, selected) ??
                        (typeof opt === "string" ? (opt as string) : val)}
                    </SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                );
              })}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {name &&
        values.map((v, i) => (
          <input
            key={i}
            type="hidden"
            name={name}
            value={v}
          />
        ))}

      {hasError && (
        <div className="mt-1 text-sm text-destructive">
          {errors.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------
   Wrappers for Radix parts
---------------------------- */

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup(
  props: React.ComponentProps<typeof SelectPrimitive.Group>
) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue(
  props: React.ComponentProps<typeof SelectPrimitive.Value>
) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className="data-[placeholder]:text-muted-foreground"
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = "default",
  hasError,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
  hasError?: boolean;
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      aria-invalid={hasError ? "true" : undefined}
      className={cn(
        "flex w-full min-w-0 items-center justify-between rounded-lg border px-3 py-2 text-base outline-none md:text-sm",
        "dark:bg-input/30 border-border",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        size === "default" && "h-11",
        size === "sm" && "h-9 text-sm",
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
        hasError && "border-destructive text-destructive",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  GenericSelect,
};
