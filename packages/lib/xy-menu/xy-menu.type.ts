export type MenuItem= {
  title: string,
  icon?: string,
  children?: Array<MenuItem>,
  path?: string,
  disabled?: boolean,
  hidden?: boolean,
}