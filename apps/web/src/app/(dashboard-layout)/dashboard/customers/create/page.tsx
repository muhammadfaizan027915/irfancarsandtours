import { UserForm } from "@icat/features/dashboard/forms/user";

export default function CreateCustomerPage() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Create Customer</h1>
        <p className="text-muted-foreground">Register a new customer to the platform</p>
      </div>

      <UserForm />
    </div>
  );
}
