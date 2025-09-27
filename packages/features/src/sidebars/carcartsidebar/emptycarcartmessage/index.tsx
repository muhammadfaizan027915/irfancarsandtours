import { ShoppingCart } from "lucide-react";

export function EmptyCarCartMessage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
      <ShoppingCart size={40} strokeWidth={1.5} />
      <p className="text-center">Your cart is empty!</p>
    </div>
  );
}
