"use client";

import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { Autocomplete } from "@icat/ui";
import { Label } from "@icat/ui/components/label";

interface MultiSelectFilterProps {
  label: string;
  paramName: string;
  options: readonly string[];
  placeholder?: string;
}

export function MultiSelectFilter({
  label,
  paramName,
  options,
  placeholder,
}: MultiSelectFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();
  const values = getSearchParams(paramName) || [];

  const handleChange = (vals: string[]) => {
    updateSearchParams({
      [paramName]: vals.length > 0 ? vals : undefined,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={paramName}>{label}</Label>
      <Autocomplete
        id={paramName}
        options={options}
        value={values}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
