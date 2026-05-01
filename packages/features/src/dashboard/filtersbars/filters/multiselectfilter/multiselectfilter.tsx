"use client";

import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { Autocomplete } from "@icat/ui";
import { Label } from "@icat/ui/components/label";

type MultiSelectFilterProps = {
  label: string;
  name: string;
  options: readonly string[];
  placeholder?: string;
}

export function MultiSelectFilter({
  label,
  name,
  options,
  placeholder,
}: MultiSelectFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();
  const values = getSearchParams(name) || [];

  const handleChange = (vals: string[]) => {
    updateSearchParams({
      [name]: vals.length > 0 ? vals : undefined,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={name}>{label}</Label>
      <Autocomplete
        id={name}
        options={options}
        value={values}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
