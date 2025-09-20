import {
  CarTypesList,
  TransmissionTypesList,
  FuelTypesList,
  AmenitiesList,
} from "@icat/database";
import { CheckboxFilter } from "./checkboxfilter";
import { PriceFilter } from "./pricefilter";

export function FilterSidebar() {
  return (
    <section>
      <aside className="flex flex-col gap-4">
        {/* <PriceFilter /> */}
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
          filterName="amenitiesType"
          filtersList={AmenitiesList}
        />
      </aside>
    </section>
  );
}
