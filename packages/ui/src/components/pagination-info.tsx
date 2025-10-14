
interface PaginationInfoProps {
  pagination?: { page?: number; limit?: number; total?: number };
  label?: string;
}

export function PaginationInfo({
  pagination,
  label = "results",
}: PaginationInfoProps) {
  const page = pagination?.page ?? 1;
  const limit = pagination?.limit ?? 10;
  const total = pagination?.total ?? 0;

  if (total === 0) {
    return <p>No {label} found</p>;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <p>
      {`${start} - ${end} of ${total} ${label} found`}
    </p>
  );
}
