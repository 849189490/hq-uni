import { Ref } from 'vue'
import { FormDataArray, TabForm, TabFormData } from '../public.types'

interface Base {
  key: string
  title: string
}

interface Data extends Base {
  type?: 'base'
  formData: FormDataArray
}

type TabData = TabForm & Base

interface SlotData extends Base {
  type: 'slot'
  slot: string
  formData: FormDataArray
  [key: string]: any
}

interface ListData extends Base {
  type: 'list'
  data: TabFormData[]
}

type MixData = Data | TabData | SlotData | ListData

type DataArray = MixData[] | Ref<MixData[]>

export type {
  Data,
  TabData,
  SlotData,
  ListData,
  DataArray,
  DataArray as default
}
