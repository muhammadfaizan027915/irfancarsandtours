import dynamic from "next/dynamic";
import { Skeleton } from "@icat/ui/components/skeleton";

const ForgotPasswordForm = dynamic(
  () => import("@icat/features/forms/forgotpassword").then((m) => m.ForgotPasswordForm),
  {
    loading: () => <Skeleton className="h-[400px] w-full max-w-md mx-auto rounded-xl" />,
  }
);

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
