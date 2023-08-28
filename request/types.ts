// 所有请求共有的类型
export interface Responce {
  code: string
  data: Record<string, any>
  message?: string
  msg?: string
  retMessage?: string
  respHeader?: { respCode: string, respMsg: string }
  [key: string]: any
}
