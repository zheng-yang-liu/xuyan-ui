export type menuItem= {
  title: string,
  id: string,
  icon?: string,
  children?: Array<menuItem>,
  path?: string,
  disabled?: boolean,
  hidden?: boolean,
}