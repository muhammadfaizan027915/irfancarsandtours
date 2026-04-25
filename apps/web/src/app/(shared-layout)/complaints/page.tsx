import { SecondaryHero } from "@icat/features/hero/secondary";
import { ContactDetails } from "@icat/features/contactdetails";

import dynamic from "next/dynamic";

import { Skeleton } from "@icat/ui/components/skeleton";

const ComplaintForm = dynamic(
  () => import("@icat/features/forms/complaint").then((m) => m.ComplaintForm),
  {
    loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />,
  }
);

const Map = dynamic(() => import("@icat/features/map").then((m) => m.Map), {
  loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />,
});

export default function ComplaintsPage() {
  return (
    <>
      <SecondaryHero
        position="start"
        title="File a Complaint"
        subtitle="Let us know if something went wrong"
      />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
        <ComplaintForm />
        <div className="flex flex-col gap-4">
          <ContactDetails />
          <Map />
        </div>
      </div>
    </>
  );
}
