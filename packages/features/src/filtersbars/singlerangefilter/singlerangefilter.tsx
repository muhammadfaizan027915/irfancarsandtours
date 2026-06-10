"use client";

import { useState } from "react";

import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@icat/ui/components/card";
import { Slider } from "@icat/ui/components/slider";

import { SingleRangeFilterProps } from "./singlerangefilter.types";

export function SingleRangeFilter({
  title,
  paramName,
  min = 1,
  max = 50,
  step = 1,
  unit = "people",
}: SingleRangeFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();

  const initialValue = Number(getSearchParams(paramName)[0]) || min;

  const [value, setValue] = useState<number>(initialValue);

  const handleCommit = (newValues: number[]) => {
    const val = newValues[0];
    if (val === min) {
      updateSearchParams({ [paramName]: undefined });
    } else {
      updateSearchParams({
        [paramName]: val.toString(),
      });
    }
  };

  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={(val) => setValue(val[0])}
          onValueCommit={handleCommit}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {value} {unit}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
