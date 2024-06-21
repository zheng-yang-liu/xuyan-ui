export type columns = {
  name: string,
  key: string,
  width?: number,
  align?:string,
};
export type data = {
  name:string,
  explain:string,
  type:string | {value:string,complexType?:string}[],
  typeValue?:string,
  default?:string
}
export type catalogue = {
  name:string,
  id:string,
  explain:string | string[],
  key?:string,
}