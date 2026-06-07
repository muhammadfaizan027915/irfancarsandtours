import {
  AmenitiesList,
  CarTypesList,
  FuelTypesList,
  TransmissionTypesList,
} from "@icat/database/enums";

import { CheckboxFilter } from "./checkboxfilter";

export function CarsFiltersBar() {
  return (
    <section>
      <aside className="flex flex-col gap-4">
        <CheckboxFilter
          title="Car Type"
          paramName="carType"
          filtersList={CarTypesList}
        />
        <CheckboxFilter
          title="Transmission Type"
          paramName="transmissionType"
          filtersList={TransmissionTypesList}
        />
        <CheckboxFilter
          title="Fuel Type"
          paramName="fuelType"
          filtersList={FuelTypesList}
        />
        <CheckboxFilter
          title="Amenities Type"
          paramName="amenities"
          filtersList={AmenitiesList}
        />
      </aside>
    </section>
  );
}
