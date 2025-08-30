import { NavigationUrls } from "../../header";
import { Badge, Button, Card, Input } from "@icat/ui";
import { ArrowRight, Mail, Lock, UserRound } from "lucide-react";
import Link from "next/link";

export function SignUpForm() {
  return (
    <Card className="w-full p-8 max-w-md flex flex-col items-center gap-2 shadow-none">
      <Badge variant={"accent"} className={"px-4 py-2 text-sm rounded-xl"}>
        Sign Up
      </Badge>

      <h1 className="font-bold text-4xl">Create an Account</h1>

      <form className="flex flex-col gap-3 w-full mt-8">
        <Input
          type="text"
          placeholder="Name"
          startIcon={<UserRound size={18} />}
        />

        <Input
          type="email"
          placeholder="Email Address"
          startIcon={<Mail size={18} />}
        />

        <Input
          type="password"
          placeholder="Password"
          startIcon={<Lock size={18} />}
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          startIcon={<Lock size={18} />}
        />

        <Button size={"lg"} className="font-bold shadow-none group mt-4">
          Sign Up
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      <p className="text-muted-foreground text-sm mt-10">
        Already have an account?{" "}
        <Link
          href={NavigationUrls.SIGNIN}
          className="text-foreground hover:text-primary"
        >
          Sign In Here !
        </Link>
      </p>
    </Card>
  );
}
