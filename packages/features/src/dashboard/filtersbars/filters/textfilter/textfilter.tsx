"use client";

import { useState } from "react";

import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";

type TextFilterProps = {
  label: string;
  name: string;
  placeholder?: string;
};

export function TextFilter({ label, name, placeholder }: TextFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();
  const externalValue = getSearchParams(name)?.[0] || "";

  const [value, setValue] = useState(externalValue);
  const [prevExternalValue, setPrevExternalValue] = useState(externalValue);

  if (externalValue !== prevExternalValue) {
    setValue(externalValue);
    setPrevExternalValue(externalValue);
  }

  const handleUpdate = (val: string) => {
    if (val === externalValue) return;
    updateSearchParams({
      [name]: val || undefined,
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => handleUpdate(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleUpdate(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
}
