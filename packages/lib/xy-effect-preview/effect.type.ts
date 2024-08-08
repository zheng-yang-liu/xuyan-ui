export type columns = {
  name: string,
  key: string,
  width?: number,
  align?:string,
};
export type dataType = {
  name:string,
  explain:string,
  type:string | {value:string,complexType?:string}[],
  default?:string
}
export type catalogueType = {
  id: string;
  slot?: string;
  title: string;
  explain?: string|string[];
  indentValue?: number;
  listPosition?: string;
  children?: catalogueType[];
}
export type introductionType = string | Array<string>;