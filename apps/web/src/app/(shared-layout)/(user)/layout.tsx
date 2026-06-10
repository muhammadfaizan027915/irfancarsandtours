import { ReactNode } from "react";
import { UserTabs } from "@icat/features/usertabs";
import { requireAuth } from "@icat/lib/auth";

type UserLayoutProps = {
  children: ReactNode;
};

export default async function UserLayout({ children }: UserLayoutProps) {
  await requireAuth();
  return (
    <section className="container mx-auto py-8">
      <UserTabs />
      <div>{children}</div>
    </section>
  );
}
