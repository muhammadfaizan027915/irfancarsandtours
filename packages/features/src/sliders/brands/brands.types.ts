import * as BrandIcons from "@cardog-icons/react";

type IconKeys = keyof typeof BrandIcons;

type StripSuffix<S extends string> = S extends `${infer Brand}Icon`
  ? Brand
  : S extends `${infer Brand}Logo`
  ? Brand
  : S extends `${infer Brand}LogoHorizontal`
  ? Brand
  : S extends `${infer Brand}Wordmark`
  ? Brand
  : never;

export type BrandName = StripSuffix<IconKeys>;
