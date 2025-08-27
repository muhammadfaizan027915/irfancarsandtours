import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@icat/ui";
import { SearchbarProps } from "./searchbar.types";

export function Searchbar({
  defaultTab = "cars",
  showTabs,
  ...props
}: SearchbarProps) {
    console.log(defaultTab)
  return (
    <Card className="-translate-y-1/2 p-6 mx-auto max-w-3/4 shadow-2xl">
      <Tabs defaultValue={defaultTab}>
        <TabsList>
          <TabsTrigger value="Cars">Cars</TabsTrigger>
          <TabsTrigger value="Tours">Tours</TabsTrigger>
        </TabsList>
        <TabsContent value="cars"></TabsContent>
        <TabsContent value="tours"></TabsContent>
      </Tabs>
    </Card>
  );
}
