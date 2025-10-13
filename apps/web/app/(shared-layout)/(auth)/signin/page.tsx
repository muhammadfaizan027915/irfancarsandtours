import dynamic from "next/dynamic";

const SignInFrom = dynamic(() =>
  import("@icat/features/forms/signin").then((m) => m.SignInFrom)
);

export default function SignInPage() {
  return <SignInFrom />;
}
