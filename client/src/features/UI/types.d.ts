export type CMSTableColumnType = {
  name: string;
  key: string;
  hide: boolean;
}

export type CMSTableItemType = {
  id: number;
  [key: string]: any;
}

type LinkType = {
  label: string;
  to: string;
  icon: JSX.Element;
}
