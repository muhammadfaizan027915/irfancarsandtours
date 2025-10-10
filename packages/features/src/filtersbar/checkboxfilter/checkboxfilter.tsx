"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@icat/ui/components/card";
import { Label } from "@icat/ui/components/label";
import { Checkbox } from "@icat/ui/components/checkbox";
import { CheckBoxFilterProps } from "./checkboxfilter.types";
import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";

export function CheckboxFilter<S extends string, T extends string>({
  title,
  filterName,
  filtersList,
}: CheckBoxFilterProps<S, T>) {
  const { getSearchParams, pushSearchParams } = useSearchRouter();
  const existingSearchParams: string[] = getSearchParams(filterName) ?? [];

  const handleApplyFilters = (filter: string) => (checked: boolean) => {
    const updated = checked
      ? [...new Set([...existingSearchParams, filter])]
      : existingSearchParams.filter((f) => f !== filter);

    pushSearchParams(filterName, updated);
  };

  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {filtersList?.map((filter) => (
          <div key={filter} className="flex items-center">
            <Checkbox
              className=""
              id={filter}
              name={filter}
              defaultChecked={existingSearchParams?.includes(filter)}
              onCheckedChange={handleApplyFilters(filter)}
            />{" "}
            <Label className="ml-2" htmlFor={filter}>
              {filter}
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
