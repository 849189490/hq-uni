<script lang="ts" setup>
interface Props {
  title?: string
}
defineProps<Props>()
</script>

<template>
  <view class="title">
    <slot>{{ title }}</slot>
  </view>
</template>

<style lang="scss" scoped>
.title {
  color: #101010;
  font-size: 12px;
  box-sizing: border-box;
  padding: 10rpx 28rpx;
  background: #f6f6f6;
}
</style>