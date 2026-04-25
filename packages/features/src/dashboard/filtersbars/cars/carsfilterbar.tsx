"use client";

import { X } from "lucide-react";
import { Button } from "@icat/ui/components/button";
import { Card, CardHeader, CardContent } from "@icat/ui/components/card";
import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { TextFilter, SelectFilter, MultiSelectFilter } from "../filters";
import {
  BrandNamesList,
  FuelTypesList,
  AmenitiesList,
  CarTypesList,
  TransmissionTypesList,
} from "@icat/database/enums";

export function CarsFilterBar() {
  const { getSearchParams, updateSearchParams } = useSearchRouter();

  const nameValue = getSearchParams("name")?.[0];
  const modelValue = getSearchParams("model")?.[0];
  const brandValue = getSearchParams("brand")?.[0];
  const typeValue = getSearchParams("carType");
  const fuelValue = getSearchParams("fuelType");
  const transmissionValue = getSearchParams("transmissionType");
  const amenitiesValue = getSearchParams("amenities");

  const hasFilters = Boolean(
    nameValue ||
      modelValue ||
      brandValue ||
      typeValue.length > 0 ||
      fuelValue.length > 0 ||
      transmissionValue.length > 0 ||
      amenitiesValue.length > 0
  );

  const handleClearFilters = () => {
    updateSearchParams({
      name: undefined,
      model: undefined,
      brand: undefined,
      carType: undefined,
      fuelType: undefined,
      transmissionType: undefined,
      amenities: undefined,
    });
  };

  return (
    <Card className="py-4 shadow-none rounded-xl gap-2">
      <CardHeader className="px-4 h-8 flex flex-row gap-2 justify-between items-center">
        <h3 className="font-semibold text-lg">Filter Cars</h3>
        {hasFilters && (
          <Button
            onClick={handleClearFilters}
            size="sm"
            variant="outline"
            className="shadow-none"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </CardHeader>

      <CardContent className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <TextFilter label="Name" paramName="name" placeholder="Car Name" />
        <TextFilter label="Model" paramName="model" placeholder="Car Model" />
        <SelectFilter
          label="Brand"
          paramName="brand"
          options={BrandNamesList}
          placeholder="Select Brand"
        />
        <MultiSelectFilter
          label="Car Type"
          paramName="carType"
          options={CarTypesList}
          placeholder="Select Type"
        />
        <MultiSelectFilter
          label="Fuel Type"
          paramName="fuelType"
          options={FuelTypesList}
          placeholder="Select Fuel"
        />
        <MultiSelectFilter
          label="Transmission"
          paramName="transmissionType"
          options={TransmissionTypesList}
          placeholder="Select Transmission"
        />
        <MultiSelectFilter
          label="Amenities"
          paramName="amenities"
          options={AmenitiesList}
          placeholder="Select Amenities"
        />
      </CardContent>
    </Card>
  );
}
