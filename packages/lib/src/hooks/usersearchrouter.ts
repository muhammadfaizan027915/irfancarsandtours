"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useSearchRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (
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
  };

  const getSearchParams = (name: string) => searchParams.getAll(name);

  return {
    updateSearchParams,
    getSearchParams,
  };
}
