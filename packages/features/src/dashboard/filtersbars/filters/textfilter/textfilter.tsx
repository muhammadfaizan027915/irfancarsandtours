"use client";

import { useEffect, useState } from "react";

import { useDebounce } from "@icat/lib/hooks";
import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";

interface TextFilterProps {
  label: string;
  paramName: string;
  placeholder?: string;
}

export function TextFilter({ label, paramName, placeholder }: TextFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();
  const externalValue = getSearchParams(paramName)?.[0] || "";

  const [value, setValue] = useState(externalValue);
  const [prevExternalValue, setPrevExternalValue] = useState(externalValue);

  if (externalValue !== prevExternalValue) {
    setValue(externalValue);
    setPrevExternalValue(externalValue);
  }

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    updateSearchParams({
      [paramName]: debouncedValue || undefined,
    });
  }, [debouncedValue, paramName, updateSearchParams]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={paramName}>{label}</Label>
      <Input
        id={paramName}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
