<script lang="ts" setup>
import dayjs from '@/utils/dayjs'
interface Props {
  rawProps?: Record<string, any>
  modelValue?: string | number
  root?: Record<string, any>
  timeFormat?: string
  textAlign?: 'left' | 'right'
  disabled?: boolean | ((root: Record<string, any>) => boolean)
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const handleChange = (val: string) => {
  emit('update:modelValue', dayjs(val).format(props.timeFormat || 'YYYY-MM-DD'))
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
  <uni-datetime-picker
    :clearable="true"
    type="date"
    v-bind="rawProps"
    :modelValue="modelValue"
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
::v-deep .uni-date__x-input {
  text-align: v-bind('props.textAlign');
}
::v-deep .uni-icons {
  font-size: 36rpx !important;
}
</style>
