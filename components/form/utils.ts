import { unref, Ref } from 'vue'
// import { TabFormData, ListFormData } from '../public.types'
export const setOptions = (
  obj: Record<string, any>[] | Ref<Record<string, any>[]>,
  listKey: string,
  key: string,
  options: Record<string, any>[]
) => {
  const item = unref(obj).find((item) => item.key === listKey)
  if (item) {
    const config = item.formData.find((item) => item.key === key)
    config.options = options
  }
}

export const fmtBaseFormRules = (data: any[]) => {
  const baseRule = data.reduce((p, c) => {
    if (c.required) {
      return { ...p, [c.key]: [{ required: c.required, message: (c.component === 'Input' ? '请输入' : '请选择') + c.label, trigger: 'change' }] }
    } else {
      return p
    }
  }, {})
  return baseRule
}

export const fmtFormRules = (data: ({ formData?: FormData[] } & any)[]) => {
  const baseRule = data.reduce((pre: any, cur: { formData: any[] }) => {
    const r = cur.formData?.reduce((p, c) => {
      if (c.required) {
        return { ...p, [c.key]: [{ required: c.required, errorMessage: (c.component === 'Input' ? '请输入' : '请选择') + c.label }] }
      } else {
        return p
      }
    }, {})
    return { ...pre, ...r }
  }, {})
  return baseRule
}