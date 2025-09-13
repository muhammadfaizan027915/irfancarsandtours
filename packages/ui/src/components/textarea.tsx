import * as React from "react";
import { cn } from "@icat/ui/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  startIcon?: React.ReactNode;
  errors?: string[];
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, startIcon, errors, ...props }, ref) => {
    const hasError = errors && errors.length > 0;

    return (
      <div className="w-full">
        <div className="relative w-full">
          {startIcon && (
            <div className="absolute left-3 top-2.5 flex items-center pointer-events-none text-muted-foreground">
              {startIcon}
            </div>
          )}
          <textarea
            ref={ref}
            data-slot="textarea"
            aria-invalid={hasError ? "true" : undefined}
            className={cn(
              "border-border placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-lg border bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              startIcon ? "pl-10" : "",
              hasError ? "border-destructive text-destructive focus-visible:ring-destructive/50" : "",
              className
            )}
            {...props}
          />
        </div>

        {hasError && (
          <div className="mt-1 text-sm text-destructive">
            {errors!.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
