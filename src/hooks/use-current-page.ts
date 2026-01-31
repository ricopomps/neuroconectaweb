import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function useCurrentPage(totalPages: number): number {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const raw = Number.parseInt(searchParams.get("page") ?? "1", 10);

    if (Number.isNaN(raw) || raw < 1) return 1;
    if (raw > totalPages) return totalPages;

    return raw;
  }, [searchParams, totalPages]);
}
