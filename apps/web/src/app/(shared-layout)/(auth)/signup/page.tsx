import dynamic from "next/dynamic";
import { Skeleton } from "@icat/ui/components/skeleton";

const SignUpForm = dynamic(
  () => import("@icat/features/forms/signup").then((m) => m.SignUpForm),
  {
    loading: () => <Skeleton className="h-[500px] w-full max-w-md mx-auto rounded-xl" />,
  }
);

export default function SignupPage() {
  return <SignUpForm />;
}
