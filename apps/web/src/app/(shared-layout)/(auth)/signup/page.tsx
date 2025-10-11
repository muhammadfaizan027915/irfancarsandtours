import dynamic from "next/dynamic";

const SignUpForm = dynamic(() =>
  import("@icat/features/forms/signup").then((m) => m.SignUpForm)
);

export default function SignupPage() {
  return <SignUpForm />;
}
