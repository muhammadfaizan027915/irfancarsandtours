"use client";

import { usePathname,useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useSearchRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback((
    updates: Record<string, string | string[] | undefined>
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      params.delete(key);

      if (!value) return;

      if (Array.isArray(value)) {
        value.forEach((v) => v && params.append(key, v));
      } else {
        params.set(key, value);
      }
    });

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  const getSearchParams = useCallback((name: string) => searchParams.getAll(name), [searchParams]);

  return {
    updateSearchParams,
    getSearchParams,
  };
}
