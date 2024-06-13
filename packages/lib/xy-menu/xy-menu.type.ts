export type menuItem= {
  title: string,
  id: string,
  submenuIndent?: number,
  icon?: string,
  children?: Array<menuItem>,
  path?: string,
  disabled?: boolean,
  hidden?: boolean,
}