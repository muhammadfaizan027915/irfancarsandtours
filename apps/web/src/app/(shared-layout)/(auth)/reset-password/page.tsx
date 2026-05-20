import dynamic from "next/dynamic";
import { Skeleton } from "@icat/ui/components/skeleton";
import { Suspense } from "react";
import { notFound } from "next/navigation";

const ResetPasswordForm = dynamic(
  () => import("@icat/features/forms/resetpassword").then((m) => m.ResetPasswordForm),
  {
    loading: () => <Skeleton className="h-[400px] w-full max-w-md mx-auto rounded-xl" />,
  }
);

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    notFound();
  }

  return (
    <Suspense fallback={<Skeleton className="h-[400px] w-full max-w-md mx-auto rounded-xl" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
