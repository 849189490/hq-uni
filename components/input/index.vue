<script lang="ts" setup>
import { computed } from 'vue'
interface Props {
  rawProps?: Record<string, any>
  modelValue?: string | number
  root?: Record<string, any>
  textAlign?: 'left' | 'right'
  thousandth?: boolean // 千分位
  rightText?: string
  disabled?: boolean | ((root: Record<string, any>) => boolean)
}
const props = defineProps<Props>()
interface Emit {
  (e: 'update:modelValue', val: string): void
  (e: 'onBlur', val: string): void
}
const emit = defineEmits<Emit>()
// 千分位处理逻辑
const delDot = (val: string | number) => {
  if (val === '' || val === undefined || val === null) return ''
  return `${val}`.replace(/,/g, '')
}
const addDot = (val: string | number) => {
  if (val === '' || val === undefined || val === null) return ''
  if (delDot(val) === '') return ''
  const [a, b = ''] = `${val}`.split('.')
  const dec = b ? `.${b}` : b
  return delDot(a).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + dec
}
// const dotValueReg = /^([0-9]|,)*$/
const inputValue = computed(() => {
  if (props.thousandth) {
    return addDot(props.modelValue)
  } else {
    return props.modelValue
  }
})

const handleChange = (val: string) => {
  emit('update:modelValue', delDot(val))
}
const onBlur = (val: any) => {
  emit('onBlur', val.detail.value)
}
type Disabled = () => boolean
const isDisabled: Disabled = () => {
  let disabled = props.rawProps?.disabled
  if (props.disabled === true || props.disabled === false) {
    disabled = props.disabled
  }
  if (disabled instanceof Function) {
    return disabled(props.root)
  } else {
    return disabled || false
  }
}
type Placeholder = () => string
const setPlaceholder: Placeholder = () => {
  const placeholder = props.rawProps?.placeholder
  if (!placeholder || props.rawProps?.disabled) {
    return ''
  }
  if (placeholder instanceof Function) {
    return placeholder(props.root)
  } else {
    return placeholder
  }
}
</script>

<template>
  <uni-easyinput
    :clearable="false"
    :modelValue="inputValue"
    :placeholder="setPlaceholder()"
    :disabled="isDisabled()"
    @blur="onBlur"
    @update:modelValue="handleChange"
  >
    <template #right>
      <slot name="right">
        <view v-if="rightText" class="right-text">
          {{ rightText }}
        </view>
      </slot>
    </template>
  </uni-easyinput>
</template>

<style lang="scss" scoped>
:deep(.uni-easyinput__content-input) {
  text-align: v-bind('textAlign');
  .uni-input-wrapper {
    font-size: 14px;
  }
}
:deep(.uni-icons) {
  font-size: 14px;
}
.right-text {
  color: #999;
  margin-left: 12rpx;
}
</style>
