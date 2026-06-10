import { LucideIcon, ShoppingCart } from "lucide-react";
import * as React from "react";

import { cn } from "@icat/ui/lib/utils";

export interface EmptyMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  message?: React.ReactNode;
  iconSize?: number;
  iconStrokeWidth?: number;
}

export function EmptyMessage({
  icon: Icon = ShoppingCart,
  message = "Your list is empty!",
  iconSize = 40,
  iconStrokeWidth = 1.5,
  className,
  ...props
}: EmptyMessageProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center gap-2 text-muted-foreground",
        className
      )}
      {...props}
    >
      <Icon size={iconSize} strokeWidth={iconStrokeWidth} />
      <p className="text-center">{message}</p>
    </div>
  );
}
