"use client";

import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { SingleSelect } from "@icat/ui";
import { Label } from "@icat/ui/components/label";

type SelectFilterProps = {
  label: string;
  name: string;
  options: readonly string[];
  placeholder?: string;
}

export function SelectFilter({
  label,
  name,
  options,
  placeholder,
}: SelectFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();
  const value = getSearchParams(name)?.[0] || "";

  const handleChange = (val: string) => {
    updateSearchParams({
      [name]: val || undefined,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={name}>{label}</Label>
      <SingleSelect
        id={name}
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
