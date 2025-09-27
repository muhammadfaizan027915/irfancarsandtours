import { Card, CardContent, CardHeader, CardTitle, Slider } from "@icat/ui";

export function PriceFilter() {
  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <CardTitle>Price Range</CardTitle>
      </CardHeader>
      <CardContent className="space-y-12">
        <Slider />
        <Slider />

        <p className="text-md">10 Rs - 40 Rs</p>
      </CardContent>
    </Card>
  );
}
