import { getCustomerById } from "@icat/web/data/users";
import { UserForm } from "@icat/features/dashboard/forms/user";
import { notFound } from "next/navigation";
import { Button } from "@icat/ui/components/button";
import Link from "next/link";
import { History } from "lucide-react";

type CustomerDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { id } = await params;
  const user = await getCustomerById(id);

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Customer Profile</h1>
          <p className="text-muted-foreground">Manage profile information for {user.name}</p>
        </div>
        <Link href={`/dashboard/customers/${id}/bookings`}>
          <Button variant="outline" className="font-bold shadow-none">
            <History className="w-4 h-4 mr-2" />
            Booking History
          </Button>
        </Link>
      </div>

      <UserForm user={user} />
    </div>
  );
}
