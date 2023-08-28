<script lang="ts" setup>
import AwesomeUpload from '../upload/index.vue'
interface Props {
  rawProps: Record<string, any>
  value: Record<string, any>[]
  imgs: Record<string, any>[]
  root: Record<string, any> // 祖先form的全部数据
  disabled: boolean
}
const props = withDefaults(defineProps<Props>(), {
  rawProps: () => ({}),
  value: () => [],
  root: () => ({}),
  imgs: () => []
})
const emit = defineEmits(['changeUpload'])
type Disabled = () => boolean
const isDisabled: Disabled = () => {
  if (props.disabled === false || props.disabled === true) {
    return props.disabled
  }
  const disabled = props.rawProps.disabled
  if (disabled instanceof Function) {
    return disabled(props.root)
  } else {
    return disabled || false
  }
}
const handleChange = (key, payload, file) => {
  // 汇总所有的upload的值
  // 特殊的，一排两张身份证
  emit('changeUpload', key, payload, file)
}
</script>

<template>
  <view class="upload-list-wrap">
    <template v-for="item of imgs" :key="item.key">
      <AwesomeUpload
        width="48%"
        :rawProps="item.rawProps"
        :value="root[item.key]"
        :occupying="item.occupying"
        :title="item.label"
        :type="item.type"
        :disabled="isDisabled()"
        :root="root"
        :valueKey="item.key"
        @change="(payload, file) => handleChange(item.key, payload, file)"
      />
    </template>
  </view>
</template>

<style lang="scss" scoped>
.upload-list-wrap {
  display: flex;
  gap: 20rpx;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
</style>
