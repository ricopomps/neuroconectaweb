import { useCurrentPage } from "@/hooks/use-current-page";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Separator } from "./ui/separator";

type PageItem =
  | { type: "page"; value: number }
  | { type: "ellipsis"; position: "left" | "right" };

function getVisiblePages(
  currentPage: number,
  totalPages: number,
  range: number,
): PageItem[] {
  const items: PageItem[] = [];

  items.push({ type: "page", value: 1 });

  const start = Math.max(2, currentPage - range);
  const end = Math.min(totalPages - 1, currentPage + range);

  if (start > 2) {
    items.push({ type: "ellipsis", position: "left" });
  }

  for (let page = start; page <= end; page++) {
    items.push({ type: "page", value: page });
  }

  if (end < totalPages - 1) {
    items.push({ type: "ellipsis", position: "right" });
  }

  if (totalPages > 1) {
    items.push({ type: "page", value: totalPages });
  }

  return items;
}

interface PaginationProps {
  readonly totalItems: number;
  readonly itemsPerPage?: number;
  readonly range?: number;
  readonly disableScroll?: boolean;
}

export function Pagination({
  totalItems,
  itemsPerPage = 10,
  range = 2,
  disableScroll = false,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function generatePageLink(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    return `${pathname}?${params}`;
  }

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage],
  );

  const currentPage = useCurrentPage(totalPages);

  const pages = useMemo(
    () => getVisiblePages(currentPage, totalPages, range),
    [currentPage, totalPages, range],
  );
  console.log("pagination render");
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination">
      <div className="flex justify-center space-x-2 mt-4">
        {currentPage > 1 && (
          <div className="flex">
            <Link
              href={generatePageLink(currentPage - 1)}
              className="px-3 py-1 rounded bg-muted disabled:opacity-50 hover:bg-background/50"
              scroll={!disableScroll}
            >
              <ChevronLeft className="text-muted-foreground" />
            </Link>

            <Separator orientation="vertical" />
          </div>
        )}

        {pages.map((item) =>
          item.type === "ellipsis" ? (
            <span
              key={`ellipsis-${item.position}`}
              className="px-3 py-1 rounded bg-muted text-muted-foreground flex items-center justify-center"
              aria-hidden
            >
              <Ellipsis className="w-4 h-4" />
            </span>
          ) : (
            <Link
              key={item.value}
              href={generatePageLink(item.value)}
              aria-current={item.value === currentPage ? "page" : undefined}
              onClick={
                item.value === currentPage
                  ? (e) => e.preventDefault()
                  : undefined
              }
              scroll={!disableScroll}
              className={`px-3 py-1 rounded ${
                item.value === currentPage
                  ? "bg-background text-accent-foreground"
                  : "bg-muted hover:bg-background/50 text-muted-foreground"
              }`}
            >
              {item.value}
            </Link>
          ),
        )}

        {currentPage < totalPages && (
          <div className="flex">
            <Separator orientation="vertical" />

            <Link
              href={generatePageLink(currentPage + 1)}
              className="px-3 py-1 rounded bg-muted disabled:opacity-50 hover:bg-background/50"
              scroll={!disableScroll}
            >
              <ChevronRight className="text-muted-foreground" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
