export type dateListItemType = {
  ifCurrentMonth: boolean,
  day: number,
  date: string,
  content?: string
}

export type dayContentType = {
  date: `${number}${number}${number}${number}-${number}${number}-${number}${number}`,
  content: string,
};

export type convertDateType = `${number}${number}${number}${number}${string}${number}${number}${string}${number}${number}`
export type targetDateFormat = `YYYY${string}MM${string}DD`


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

export type dataType =  "'boolean'| |'number' |'string' |'function' |'array' |'date' |'regExp' |'undefined' |'null' |'object' |'blob' |'formData' |'promise'"









