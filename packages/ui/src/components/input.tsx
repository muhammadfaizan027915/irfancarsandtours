import * as React from "react";
import { cn } from "@icat/ui/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  startIcon?: React.ReactNode;
};

function Input({ className, type, startIcon, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {startIcon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
          {startIcon}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-border flex h-11 w-full min-w-0 rounded-lg border bg-muted px-3 py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          startIcon ? "pl-10" : "",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
