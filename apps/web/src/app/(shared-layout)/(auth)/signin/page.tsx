import dynamic from "next/dynamic";
import { Skeleton } from "@icat/ui/components/skeleton";

const SignInFrom = dynamic(
  () => import("@icat/features/forms/signin").then((m) => m.SignInFrom),
  {
    loading: () => <Skeleton className="h-[400px] w-full max-w-md mx-auto rounded-xl" />,
  }
);

export default function SignInPage() {
  return <SignInFrom />;
}
