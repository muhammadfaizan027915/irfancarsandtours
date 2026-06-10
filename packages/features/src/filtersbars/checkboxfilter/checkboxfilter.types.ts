export type CheckBoxFilterProps<S extends string, T extends string> = {
  title: string;
  paramName: S;
  filtersList: readonly T[] | readonly string[];
};
