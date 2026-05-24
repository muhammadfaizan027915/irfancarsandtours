import { Session } from "next-auth";

import { VarientType } from "@icat/features/common/common.types";

export type HeaderProps = {
  varient?: VarientType;
  session?: Session | null;
};
