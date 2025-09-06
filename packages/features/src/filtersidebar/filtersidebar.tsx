import { CarTypesList } from "@icat/db";
import { CheckboxFilter } from "./checkboxfilter";
import { PriceFilter } from "./pricefilter";

export function FilterSidebar() {
  return (
    <section>
      <aside className="flex flex-col gap-4">
        <PriceFilter />
        <CheckboxFilter title="Car Type" filtersList={CarTypesList} />
        <CheckboxFilter title="Transmission Type" filtersList={CarTypesList} />
        <CheckboxFilter title="Fuel Type" filtersList={CarTypesList} />
        <CheckboxFilter title="Amenities Type" filtersList={CarTypesList} />
      </aside>
    </section>
  );
}
