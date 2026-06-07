import { TourForm } from "@icat/features/dashboard/forms/tour/tour";

export default function CreateTourPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <TourForm mode="create" />
    </div>
  );
}
