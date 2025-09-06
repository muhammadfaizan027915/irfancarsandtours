import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Label,
} from "@icat/ui";
import { CheckBoxFilterProps } from "./checkboxfilter.types";

export function CheckboxFilter<T extends string>({
  title,
  filtersList,
}: CheckBoxFilterProps<T>) {
  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <CardTitle>{}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {filtersList?.map((type) => (
          <div key={type} className="flex items-center">
            <Checkbox className="" /> <Label className="ml-2">{type}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
