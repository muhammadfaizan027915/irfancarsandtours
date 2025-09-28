import { Session } from "next-auth";
import { VarientType } from "../common";

export type HeaderProps = {
  varient?: VarientType;
  session?: Session | null;
};
