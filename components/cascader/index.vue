<script lang="ts" setup>
interface Props {
  rawProps: Record<string, any>
  modelValue?: string
  root: Record<string, any>
  textAlign: 'left' | 'right'
  options: Record<string, string | number>[] // 下拉菜单数据
  mapper?: { text: string; value: string }
  disabled?: boolean | ((root: Record<string, any>) => boolean)
  placeholder?: string
  isIndustry?:boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const handleChange = (val: { detail: { value: Record<string, string>[] } }) => {
  const emitVal = val.detail.value.map((item) => item.value).join('-')
  const emitText = val.detail.value.map((item) => item.text).join('-')
  emit('update:modelValue', emitVal, emitText)
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
  let placeholder = props.rawProps?.placeholder
  if (props.placeholder) {
    placeholder = props.placeholder
  }

  if (!placeholder || props.rawProps?.disabled) {
    return ''
  }
  if (placeholder instanceof Function) {
    return placeholder(props.root ?? {})
  } else {
    return placeholder
  }
}
const cascaderFmt = () => {
  const value = props.mapper?.value || 'value'
  const text = props.mapper?.text || 'text'
  const options = props.options
  const casArr = props.modelValue?.split('-').map((item) => item.trim())
  const { casVal } = casArr.reduce((pre: { options: Record<string, any>[], casVal: Record<string, any>[] }, cur) => {
    const item = pre.options?.find(
      (item) => item[value] === cur || item[text] === cur
    )
    return {
      options: item?.children ?? [],
      casVal: [
        ...pre.casVal,
        { [text]: item?.[text], [value]: item?.[value] }
      ]
    }
  },
  { options, casVal: [] }
  )
  return casVal
}
</script>

<template>
  <view :class="props.isIndustry? 'cascader-wrap industry': 'cascader-wrap'">
    <uni-data-picker v-bind="rawProps" :localdata="options" :modelValue="cascaderFmt()" :map="mapper"
      :placeholder="setPlaceholder()" :clear-icon="!isDisabled()" @update:modelValue="handleChange">
    </uni-data-picker>
    <view :class="isDisabled() && 'disabled-mask'"></view>
  </view>
</template>

<style lang="scss" scoped>
.cascader-wrap {
  position: relative;
  width: 100%;

  :deep(.uni-data-tree-input)  {
    .input-value {
      .uni-scroll-view-content {
        .selected-list {
          justify-content: flex-end;
          font-size: 14px;
        }
      }
    }
  }

  :deep(.input-value-border) {
    border: none;
  }

  :deep(.uniui-clear) {
    font-size: 18px !important;
  }
}
.industry{
:deep(.selected-list) {
  flex-direction:column;
}
:deep(.input-value) {
    height: auto;
  }
}

.disabled-mask {
  z-index: 1;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffffbb;
}

:deep(.arrow-area) {
  padding-top: 12px;
  margin: 0 0 12px 3px;
}
</style>
