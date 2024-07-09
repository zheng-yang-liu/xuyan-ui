export type MenuItemType= {
  title: string,
  id: string,
  indentValue?: number,
  listPosition?: number,
  icon?: string,
  children?: Array<MenuItemType>,
  path?: string
}
export type targetListItem = {
  [key: string]: any;
  id: string;
  title: string;
  indentValue?: number;
  listPosition?: string;
  children?: targetListItem[];
}