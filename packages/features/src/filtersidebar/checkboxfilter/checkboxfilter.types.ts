export type CheckBoxFilterProps<S extends string, T extends string> = {
  title: string;
  filterName: S;
  filtersList: readonly T[] | readonly string[];
};
