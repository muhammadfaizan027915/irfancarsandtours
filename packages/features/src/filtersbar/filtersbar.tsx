import {
  CarTypesList,
  TransmissionTypesList,
  FuelTypesList,
  AmenitiesList,
} from "@icat/database/enums";
import { CheckboxFilter } from "./checkboxfilter";

export function FiltersBar() {
  return (
    <section>
      <aside className="flex flex-col gap-4">
        <CheckboxFilter
          title="Car Type"
          filterName="carType"
          filtersList={CarTypesList}
        />
        <CheckboxFilter
          title="Transmission Type"
          filterName="transmissionType"
          filtersList={TransmissionTypesList}
        />
        <CheckboxFilter
          title="Fuel Type"
          filterName="fuelType"
          filtersList={FuelTypesList}
        />
        <CheckboxFilter
          title="Amenities Type"
          filterName="amenities"
          filtersList={AmenitiesList}
        />
      </aside>
    </section>
  );
}
