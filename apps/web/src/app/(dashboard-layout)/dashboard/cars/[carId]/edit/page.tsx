import { Badge } from "@icat/ui/components/badge";
import { Suspense } from "react";
import { DashboardCarEditContent, DashboardCarEditContentSkeleton } from "@icat/features/contents/dashboard/caredit";

type UpdateCarProps = {
  params: Promise<{ carId: string }>;
};

export default async function UpdateCarPage({ params }: UpdateCarProps) {
  const { carId } = await params;

  return (
    <div className="flex flex-col gap-4">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Update Car
      </Badge>
      <Suspense fallback={<DashboardCarEditContentSkeleton />}>
        <DashboardCarEditContent carId={carId} />
      </Suspense>
    </div>
  );
}
