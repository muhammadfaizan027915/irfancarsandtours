import {
  CarTypesList,
  TransmissionTypesList,
  FuelTypesList,
  AmenitiesList,
} from "@icat/db";
import { CheckboxFilter } from "./checkboxfilter";
import { PriceFilter } from "./pricefilter";

export function FilterSidebar() {
  return (
    <section>
      <aside className="flex flex-col gap-4">
        <PriceFilter />
        <CheckboxFilter title="Car Type" filtersList={CarTypesList} />
        <CheckboxFilter
          title="Transmission Type"
          filtersList={TransmissionTypesList}
        />
        <CheckboxFilter title="Fuel Type" filtersList={FuelTypesList} />
        <CheckboxFilter title="Amenities Type" filtersList={AmenitiesList} />
      </aside>
    </section>
  );
}
