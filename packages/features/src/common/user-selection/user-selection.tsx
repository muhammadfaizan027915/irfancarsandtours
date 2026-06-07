"use client";

import { Check, ChevronsUpDown, Loader2, Plus, SearchIcon, User as UserIcon } from "lucide-react";
import * as React from "react";

import { DetailedUserResponseDto } from "@icat/contracts";
import { Button } from "@icat/ui/components/button";
import { Input } from "@icat/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@icat/ui/components/popover";
import { cn } from "@icat/ui/lib/utils";
import { searchCustomersForBooking } from "@icat/web/actions";

export type UserSelectionProps = {
  onSelect: (user: DetailedUserResponseDto | null) => void;
  selectedUser: DetailedUserResponseDto | null;
  onCreateNew: () => void;
};

const PAGE_SIZE = 10;

export function UserSelection({
  onSelect,
  selectedUser,
  onCreateNew,
}: UserSelectionProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState<DetailedUserResponseDto[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);

  const fetchUsers = React.useCallback(
    async (pageNum: number, isInitial: boolean = false, searchTerm: string = search) => {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      try {
        const result = await searchCustomersForBooking({
          name: searchTerm,
          limit: PAGE_SIZE,
          page: pageNum,
        });
        const newUsers = result.data;

        setUsers((prev) => (isInitial ? newUsers : [...prev, ...newUsers]));
        setHasMore(newUsers.length === PAGE_SIZE);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [search]
  );

  const handleSearch = () => {
    setPage(1);
    fetchUsers(1, true);
  };

  React.useEffect(() => {
    fetchUsers(1, true, "");
  }, [fetchUsers]);

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasMore && !loading && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchUsers(nextPage);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-11"
          >
            {selectedUser ? (
              <div className="flex items-center gap-2">
                <UserIcon className="size-4 text-muted-foreground" />
                <span>
                  {selectedUser.name} ({selectedUser.email})
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground">
                Select existing customer or create new...
              </span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <div className="p-2 border-b">
            <div className="relative">
              <SearchIcon 
                className="absolute left-2 top-2.5 size-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" 
                onClick={handleSearch}
              />
              <Input
                placeholder="Search customers by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="pl-8 h-9 shadow-none"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {loading && page === 1 && (
              <div className="p-4 text-sm text-center text-muted-foreground">
                Searching...
              </div>
            )}
            {!loading && users.length === 0 && search && (
              <div className="p-4 text-sm text-center text-muted-foreground">
                No customers found.
              </div>
            )}

            <div
              className="flex items-center gap-2 rounded-sm px-2 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors text-primary font-medium"
              onClick={() => {
                onCreateNew();
                setOpen(false);
              }}
            >
              <Plus className="mr-2 h-4 w-4 shrink-0" />
              Create New Customer
            </div>

            {users.map((user) => (
              <div
                key={user.id}
                className={cn(
                  "flex items-center gap-2 rounded-sm px-2 py-2 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => {
                  onSelect(user);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 shrink-0",
                    selectedUser?.id === user.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col min-w-0">
                  <span className="truncate">{user.name}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            ))}

            {hasMore && users.length > 0 && (
              <div className="p-2 border-t mt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-muted-foreground hover:text-primary"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <Loader2 className="size-3 animate-spin mr-2" />
                  ) : null}
                  {loadingMore ? "Loading..." : "Load More Customers"}
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
