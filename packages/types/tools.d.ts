export type dateListItem = {
  ifCurrentMonth: boolean,
  day: number,
  date: string,
  content?: string
}
export type dayContent = {
  date: string,
  content: string
}

export type formatDateNum = {
  year?: number,
  month?: number,
  day?: number,
  hour?: number,
  minute?: number,
  second?: number
}
export type formatDateStr = {
  year?: string,
  month?: string ,
  day?: string,
  hour?: string,
  minute?: string,
  second?: string
}
export type MessageTypes = "success" | "warning" | "info" | "error"
type targetListItem = {
  [key: string]: any;
  id: string;
  title: string;
  indentValue?: number;
  listPosition?: string;
  children?: targetListItem[];
}