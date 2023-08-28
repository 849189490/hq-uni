<script lang="ts" setup>
import dayjs from '@/utils/dayjs'
interface Props {
  rawProps: Record<string, any>
  modelValue?: string | number
  root: Record<string, any>
  timeFormat?: string
  textAlign: 'left' | 'right'
  rangeKey: [string, string]
  disabled: boolean | ((root: Record<string, any>) => boolean)
}
interface Emit {
  (e: 'rangeChange', val: string[], payload: Record<string, any>)
  (e: 'update:modelValue', val: string[], payload: Record<string, any>)
}
const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const handleChange = (val: string[]) => {
  const [key1, key2] = props.rangeKey
  const [value1, value2] = val
  const val1 = dayjs(value1).format(props.timeFormat || 'YYYY-MM-DD')
  const val2 = dayjs(value2).format(props.timeFormat || 'YYYY-MM-DD')
  emit('rangeChange', val, { [key1]: val1, [key2]: val2 })
  emit('update:modelValue', val, { [key1]: val1, [key2]: val2 })
}

type Disabled = () => boolean
const isDisabled: Disabled = () => {
  let disabled = props.rawProps.disabled
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
  const placeholder = props.rawProps.placeholder
  if (!placeholder || props.rawProps.disabled) {
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
  <uni-datetime-picker
    :clearable="true"
    type="daterange"
    v-bind="rawProps"
    :modelValue="modelValue"
    :start-placeholder="setPlaceholder()"
    :end-placeholder="setPlaceholder()"
    :placeholder="setPlaceholder()"
    :disabled="isDisabled()"
    @update:modelValue="handleChange"
  >
  </uni-datetime-picker>
</template>

<style lang="scss" scoped>
.uni-date {
  ::v-deep &-editor {
    .uni-date-x--border {
      border: none;
      .uni-date-x {
        .uniui-calendar {
          display: none;
        }
      }
    }
  }
}
:deep(.uni-date__x-input) {
  text-align: v-bind('textAlign');
}
:deep(.uni-icons) {
  font-size: 36rpx !important;
}
</style>
