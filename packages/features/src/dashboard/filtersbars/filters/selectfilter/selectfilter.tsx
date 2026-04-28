"use client";

import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { SingleSelect } from "@icat/ui";
import { Label } from "@icat/ui/components/label";

interface SelectFilterProps {
  label: string;
  paramName: string;
  options: readonly string[];
  placeholder?: string;
}

export function SelectFilter({
  label,
  paramName,
  options,
  placeholder,
}: SelectFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();
  const value = getSearchParams(paramName)?.[0] || "";

  const handleChange = (val: string) => {
    updateSearchParams({
      [paramName]: val || undefined,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={paramName}>{label}</Label>
      <SingleSelect
        id={paramName}
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
