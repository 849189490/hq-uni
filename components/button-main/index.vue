<script lang="ts" setup>
// 用于form中的按钮列表
interface Props {
  root?: Record<string, any>
  disabled?: boolean | ((root: Record<string, any>) => boolean)
  label?: string
  icon?: string
  color?: string
}
interface Emit {
  (e: 'click', rawR: Event)
}
const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
type Disabled = () => boolean
const isDisabled: Disabled = () => {
  const disabled = props.disabled
  if (disabled instanceof Function) {
    return disabled(props.root)
  } else {
    return disabled || false
  }
}
</script>

<template>
  <view
    :class="['button-wrap', isDisabled() && 'disabled']"
    :disabled="isDisabled()"
    @click="handleClick"
  >
  <!-- <uni-icons :type="icon" :color="color" size="20" /> -->
    <slot>
      <uni-icons custom-prefix="iconfont" :type="'icon-' + icon" :color="color" size="18" />
      <view :style="{ color }">{{ label }}</view>
    </slot>
  </view>
</template>

<style lang="scss" scoped>
.button-wrap {
  width: 90%;
  min-width: 300rpx;
  height: 80rpx;
  line-height: 80rpx;
  margin: 0 auto;
  border-radius: 40rpx;
  font-size: 32rpx;
  text-align: center;
  background-color: #196099;
  color: #fff;
}
.disabled {
  color: #999;
}
</style>
