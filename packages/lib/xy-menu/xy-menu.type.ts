export type menuItem= {
  title: string,
  id: string,
  indentValue?: number,
  icon?: string,
  children?: Array<menuItem>,
  path?: string,
  disabled?: boolean,
  hidden?: boolean,
}