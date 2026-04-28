"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { Button } from "@icat/ui/components/button";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";

import { SearchFilterProps } from "./searchfilter.types";

export function SearchFilter({
  placeholder = "Search (ID, Address, Name)",
  label,
}: SearchFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();

  const searchValue = getSearchParams("search")?.[0] || "";
  const [search, setSearch] = useState<string>(searchValue);

  const handleSearch = () => {
    updateSearchParams({
      search: search.trim() ? search : "",
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label>{label}</Label>}
      <div className="w-full flex items-center gap-2">
        <Input
          size={10}
          id="search"
          value={search}
          placeholder={placeholder}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button size="lg" onClick={handleSearch} className="shadow-none">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
