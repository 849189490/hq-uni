<script lang="ts" setup>
import AwesomePulldownArrow from '../pulldown-arrow/index.vue'
interface Props {
  rawProps: Record<string, any>
  value?: string | number
  root: Record<string, any>
  textAlign: 'left' | 'right'
  options: (Record<string, any> | string)[]
  labelKey?: string
  valueKey?: string
  clearable?: boolean
  disabled?: boolean | ((root: Record<string, any>) => boolean)
}
const props = withDefaults(defineProps<Props>(), {
  rawProps: () => ({}),
  value: '',
  root: () => ({}),
  textAlign: 'right',
  options: () => [],
  labelKey: 'label',
  valueKey: 'value',
  clearable: false
})
const emit = defineEmits(['change'])

const showIndex = ref()

const getNewOptions:any = () => {
  if (props.options instanceof Function) {
    return props.options(props.root)|| []
  } else {
    return props.options || []
  }
}
watch(
  () => props.value,
  (val) => {
    showIndex.value = getNewOptions().findIndex(
      (item) => item[props.valueKey] === val
    )
  },
  { immediate: true, flush: 'post' }
)


const handleChange = (current: Record<string, any>) => {
  const index = current.detail.value
  showIndex.value = index
  const value = getNewOptions()[index][props.valueKey]
  const label = getNewOptions()[index][props.labelKey]
  emit('change', value, label)
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

const range = computed(() => {
  return getNewOptions().map((item) => item[props.labelKey])
})
const showLabel = computed(() => {
  return (
    getNewOptions().find((item) => item[props.valueKey] === props.value)?.[
      props.labelKey
    ] || props.value
  )
})
</script>

<template>
  <view class="select-wrap">
    <picker
      class="select"
      @change="handleChange"
      :value="showIndex"
      :range="getNewOptions()"
      :rangeKey="labelKey"
      :disabled="isDisabled()"
    >
      <view class="uni-input">
        <uni-easyinput
          :clearable="false"
          v-bind="props.rawProps"
          :value="showLabel"
          :placeholder="setPlaceholder()"
          :disabled="isDisabled()"
          @input="handleChange"
          readonly
        >
          <template #right>
            <AwesomePulldownArrow />
          </template>
        </uni-easyinput>
        <!-- <text>{{ showLabel }}</text>
        <template v-if="clearable">
          <uni-icons @click="clearValue" type="clear" size="15"></uni-icons>
        </template> -->
      </view>
    </picker>
  </view>
</template>

<style lang="scss" scoped>
.select-wrap {
  width: 100%;
  height: 100%;
  .select {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: right;
    .uni-easyinput__content-input {
      width: 100%;
      text-align: v-bind('props.textAlign');
    }
    .uni-input {
      .uni-easyinput__content {
        .uni-icons.uniui-forward {
          font-size: 32rpx !important;
          padding: 0;
        }
      }
    }
  }
}
</style>
