"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useSearchRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createSearchParams = useCallback(
    (name: string, value: string | string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete(name);

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(name, v));
      } else if (value) {
        params.set(name, value);
      }

      return params;
    },
    [searchParams]
  );

  const pushSearchParams = (name: string, value: string | string[]) => {
    router.push(pathname + "?" + createSearchParams(name, value), {
      scroll: false,
    });
  };

  const getSearchParams = (name: string) => searchParams.getAll(name);

  return {
    pushSearchParams,
    createSearchParams,
    getSearchParams,
  };
}
