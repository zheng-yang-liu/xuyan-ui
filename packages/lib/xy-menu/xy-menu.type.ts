export type menuData= {
  title: string,
  id: string,
  icon?: string,
  children?: Array<menuData>,
  path?: string,
  disabled?: boolean,
  hidden?: boolean,
}