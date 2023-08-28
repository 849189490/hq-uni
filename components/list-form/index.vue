<script lang="ts" setup>
import { ref } from 'vue'
import AwesomeForm from '../form/index.vue'
interface Props {
  rawProps?: Record<string, any>
  modelValue: Record<string, any>
  data: Record<string, any>[]
  rules?: Record<string, any>
  labelWidth?: string | number
}
const props = defineProps<Props>()
const emit = defineEmits([
  'update:modelValue',
  'change',
  'buttonClick',
  'changeUpload'
])

const handleChange = (key: string, value: any,label:any) => {
  emit('change', key, value,label)
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
const changeUpload = (key: string, value: any, file: File) => {
  emit('changeUpload', key, value, file)
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
const handleButtonClick = (event: any, e: MouseEvent) => {
  emit('buttonClick', event, e)
}
const awesome = ref<any[]>()

const validator = () => {
  const promiseBe: any = awesome.value?.map((item) => item.validator())
  return new Promise((resolve, reject) => {
    Promise.all(promiseBe)
      .then((values) => {
        resolve(values.flat())
      })
      .catch((err) => {
        reject(err)
      })
  })
}
defineExpose({
  validator
})
</script>

<template>
  <view class="list-form-wrap">
    <template v-for="item of data" :key="item.key">
      <view class="title">{{ item.title }}</view>
      <template v-if="item.slot">
        <view :class="item.slot + '-wrap'">
          <slot :name="item.slot" :data="item"></slot>
        </view>
      </template>
      <template v-else>
        <AwesomeForm
          ref="awesome"
          :labelWidth="labelWidth"
          :formData="item.formData"
          :rules="rules"
          :modelValue="modelValue"
          @change="handleChange"
          @changeUpload="changeUpload"
          @buttonClick="handleButtonClick"
        />
      </template>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.list-form-wrap {
  width: 100%;
  height: 100%;
  .title {
    color: #101010;
    font-size: 12px;
    box-sizing: border-box;
    padding: 10rpx 28rpx;
    background: #f6f6f6;
  }
}
</style>
