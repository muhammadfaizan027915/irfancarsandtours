export type CheckBoxFilterProps<T extends string> = {
  title: string;
  filtersList: readonly T[] | readonly string[];
};
