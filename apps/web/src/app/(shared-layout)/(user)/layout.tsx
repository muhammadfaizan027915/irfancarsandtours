import { ReactNode } from "react";
import { UserTabs } from "@icat/features";
import { requireAuth } from "@icat/lib/auth";

type UserLayoutProps = {
  children: ReactNode;
};

export default async function UserLayout({ children }: UserLayoutProps) {
  await requireAuth();

  return (
    <div className="container mx-auto py-8">
      <UserTabs />
      <div className="p-4">{children}</div>
    </div>
  );
}
