import { Session } from "next-auth";
import { VarientType } from "@icat/features/common";

export type HeaderProps = {
  varient?: VarientType;
  session?: Session | null;
};
