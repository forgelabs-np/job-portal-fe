export type FilterSelectProps = {
  name: string;
  options: SelectOptionTypes[];
  icon?: React.ReactNode;
};

export type SelectOptionTypes = {
  label: string;
  value: string;
};
