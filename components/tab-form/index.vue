<script lang="ts" setup>
import { TabFormData } from '../public.types'
import AwesomeForm from '../form/index.vue'
import AwesomeListForm from '../list-form/index.vue'
import AwesomeTabs from '../tabs/index.vue'
interface Props {
  rawProps?: Record<string, any>
  modelValue: Record<string, any>
  data: TabFormData[]
  rules?: Record<string, any>
  divider?: boolean
  textAlign?: 'left' | 'right'
  styleType?: string
  activeColor?: string
  current?: string | number
  labelWidth?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  rawProps: () => ({}),
  modelValue: () => ({}),
  data: () => [],
  rules: () => ({}),
  divider: true,
  textAlign: 'right',
  styleType: 'button',
  activeColor: '#007aff',
  labelWidth: '120'
})
const emit = defineEmits([
  'update:modelValue',
  'change',
  'buttonClick',
  'changeUpload',
  'onBlur'
])
// const handleChange = (key: string, value: any) => {
//   emit('change', key, value)
//   emit('update:modelValue', { ...unref(props.modelValue), [key]: value })
// }
const myCurrent = ref()

const tabList = computed(() =>
  props.data.map((item) => ({ label: item.tabName, value: item.tabKey }))
)

watch(
  () => tabList.value,
  (val) => {
    myCurrent.value = props.current || val[0].value || 0
  },
  { deep: true, immediate: true }
)

const currentChange = (item: Record<string, any>) => {
  myCurrent.value = item.value
}

const handleChange = (key: string, value: any,label:any) => {
  emit('change', key, value,label)
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
const onBlur = (key: string, value: any) => {
  emit('onBlur', key, value)
  // emit('update:modelValue', { ...props.modelValue, [key]: value })
}
const changeUpload = (key: string, value: any, file: File) => {
  emit('changeUpload', key, value, file)
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
const isActive = (tab: Record<string, any>, index: number) => {
  if (tab.tabKey === undefined) {
    return index === myCurrent.value
  } else {
    return tab.tabKey === myCurrent.value
  }
}
const handleButtonClick = (event: any, e: MouseEvent) => {
  emit('buttonClick', event, e)
}

const awesome = ref<any[]>()

const validator = () => {
  console.log('awesome', awesome.value)
  const promiseBe: any = awesome.value?.map((item) => item.validator())
  return new Promise((resolve, reject) => {
    Promise.all(promiseBe)
      .then((values) => {
        console.log('values.flat()', values.flat())
        resolve(values.flat())
      })
      .catch((err) => {
        console.log('err', err)
        reject(err)
      })
  })
}
defineExpose({
  validator
})
</script>

<template>
  <view class="tab-form-wrap">
    <AwesomeTabs
      v-model="myCurrent"
      :tabs="tabList"
      :active-color="activeColor"
      @change="currentChange"
    />
    <template v-for="(item, index) of data" :key="item.tabKey">
      <template v-if="item.slot">
        <view :class="item.slot + '-wrap'" v-show="isActive(item, index)">
          <slot :name="item.slot" :data="item"></slot>
        </view>
      </template>
      <template v-else-if="item.formData">
        <AwesomeForm
          v-show="isActive(item, index)"
          ref="awesome"
          :labelWidth="labelWidth"
          :formData="item.formData"
          :modelValue="modelValue"
          :rules="rules"
          @onBlur="onBlur"
          @change="handleChange"
          @changeUpload="changeUpload"
          @buttonClick="(event, e) => handleButtonClick(event, e)"
        />
      </template>
      <template v-else>
        <AwesomeListForm
          v-show="isActive(item, index)"
          ref="awesome"
          :labelWidth="labelWidth"
          :data="item.data"
          :modelValue="modelValue"
          :rules="rules"
          @change="handleChange"
          @changeUpload="changeUpload"
          @buttonClick="(event, e) => handleButtonClick(event, e)"
        />
      </template>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.tab-form-wrap {
  width: 100%;
  background-color: #fff;
}
</style>
