import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@icat/ui/lib/utils";
import { Button, buttonVariants } from "@icat/ui/components/button";
import Link from "next/link";

type PaginationBarProps = {
  pagination?: { total: number; page: number; pages: number; limit: number };
};

function PaginationBar({ pagination }: PaginationBarProps) {
  const { page = 1, pages = 1, limit = 50 } = pagination || {};
  const makeHref = (p: number) => `?page=${p}&limit=${limit}`;

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <Link href={page > 1 ? makeHref(page - 1) : "#"} passHref>
            <PaginationPrevious
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </Link>
        </PaginationItem>

        <PaginationItem>
          <Link href={makeHref(1)} passHref>
            <PaginationLink isActive={page === 1}>1</PaginationLink>
          </Link>
        </PaginationItem>

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page > 1 && page < pages && (
          <PaginationItem>
            <Link href={makeHref(page)} passHref>
              <PaginationLink isActive>{page}</PaginationLink>
            </Link>
          </PaginationItem>
        )}

        {page < pages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pages > 1 && (
          <PaginationItem>
            <Link href={makeHref(pages)} passHref>
              <PaginationLink isActive={page === pages}>{pages}</PaginationLink>
            </Link>
          </PaginationItem>
        )}

        {/* Next */}
        <PaginationItem>
          <Link href={page < pages ? makeHref(page + 1) : "#"} passHref>
            <PaginationNext
              className={page === pages ? "pointer-events-none opacity-50" : ""}
            />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationBar,
};
