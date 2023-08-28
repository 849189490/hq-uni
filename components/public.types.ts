// 组件中，公用的类型
export type Component =
  'Input'
  | 'Select'
  | 'DatePicker'
  | 'Upload'
  | 'UploadButton'
  | 'UploadList'
  | 'Cascader'
  | 'Button'
  | 'ButtonList'
  | 'FormSplit'
  | 'UploadImageList'
  | 'Search'
export interface FormData {
  key: string
  label?: string | ((root: Record<string, any>) => string)
  rawProps?: Record<string, any>
  component?: Component | ((root: Record<string, any>) => Component)
  disabled?: boolean | ((root: Record<string, any>) => boolean)
  placeholder?: string
  wrap?: boolean // 插槽是否要uni-forms-item的外包装
  options?: Record<string, any>[]| ((root: Record<string, any>) => Record<string, any>[]) // cascader & select
  labelKey?: string
  valueKey?: string
  clearable?: boolean
  thousandth?: boolean // input
  rightText?: string // input
  required?: boolean | ((root: Record<string, any>) => boolean)
  show?: boolean | ((root: Record<string, any>) => boolean)
  type?: string
  imgs?: Record<string, any>[] // upload
  title?: string // upload-button，作为固定文件名
  mapper?: { text: string; value: string } // cascader
  config?: { label: string; icon?: string; event: string; color?: string }[] // button
  width?: string
  slot?: string // 仅使用插槽时有效
  isIndustry?: boolean
  occupying?: string
  timeFormat?: string
  max?: number
}
export type FormDataArray = FormData[]

export interface TabFormData {
  tabKey?: string | number
  tabName: string
  tabType?: 'list'
  formData?: FormDataArray
  data?: TabFormListData
  slot?: string
  [key: string]: any // 仅限插槽中拓展
}

export type ListFormData = {
  title: string
  slot?: string
  [key: string]: any
  formData: FormDataArray
}[]
export type TabFormListData = {
  title?: string
  formData?: FormDataArray
}[]
export interface TabForm {
  type: 'tab'
  data: TabFormData[]
  // direction?: 'vertical' | 'horizontal'
}
