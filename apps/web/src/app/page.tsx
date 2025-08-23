import { Button } from "@icat/ui";
import { Landmark } from "lucide-react";

export default function Home() {
  return (
    <Button className="hover:shadow-2xl transition-shadow">
      <Landmark />
    </Button>
  );
}
