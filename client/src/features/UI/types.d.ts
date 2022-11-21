export type CMSTableColumnType<T> = {
  name: string;
  key: keyof T;
  hide: boolean;
}

type LinkType = {
  label: string;
  to: string;
  icon: JSX.Element;
}
