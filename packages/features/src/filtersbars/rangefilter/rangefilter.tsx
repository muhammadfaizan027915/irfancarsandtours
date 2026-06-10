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

import { RangeFilterProps } from "./rangefilter.types";

export function RangeFilter({
  title,
  minParam,
  maxParam,
  min = 0,
  max = 10000,
  step = 100,
  unit = "Rs",
}: RangeFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();
  
  const initialMin = Number(getSearchParams(minParam)[0]) || min;
  const initialMax = Number(getSearchParams(maxParam)[0]) || max;

  const [values, setValues] = useState<[number, number]>([initialMin, initialMax]);

  const handleCommit = (newValues: number[]) => {
    const [vMin, vMax] = newValues as [number, number];
    if (vMin === min && vMax === max) {
      updateSearchParams({ [minParam]: undefined, [maxParam]: undefined });
    } else {
      updateSearchParams({
        [minParam]: vMin.toString(),
        [maxParam]: vMax.toString(),
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
          value={values}
          onValueChange={(val) => setValues(val as [number, number])}
          onValueCommit={handleCommit}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{values[0]} {unit}</span>
          <span>{values[1]} {unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
