"use client";

import { DateFilter } from "./datefilter";
import { RangeFilter } from "./rangefilter";
import { SingleRangeFilter } from "./singlerangefilter";

export function ToursFiltersBar() {
  return (
    <section>
      <aside className="flex flex-col gap-4">
        <DateFilter title="Available Between" />
        <RangeFilter
          title="Price per Adult"
          minParam="pricePerAdultMin"
          maxParam="pricePerAdultMax"
          min={0}
          max={50000}
          step={500}
        />
        <RangeFilter
          title="Price per Child"
          minParam="pricePerChildMin"
          maxParam="pricePerChildMax"
          min={0}
          max={30000}
          step={500}
        />
        <SingleRangeFilter
          title="Minimum Capacity"
          paramName="maxCapacity"
          min={1}
          max={100}
          step={1}
          unit="people"
        />
      </aside>
    </section>
  );
}
