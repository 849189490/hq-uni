<script lang="ts" setup>
interface Props {
  titleLeft?: string
  titleRight?: string
  titleRightIcon?: string
  modelValue?: Record<string, any>[]
}
defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'iconClick'])

const iconClick = () => {
  emit('iconClick')
}
</script>

<template>
  <view class="card-wrap">
    <view class="title">
      <view class="title-left">{{ titleLeft }}</view>
      <view class="title-right">
        <text class="text">{{ titleRight }}</text>
        <uni-icons
          @click="iconClick"
          :type="titleRightIcon"
          color="#999999"
          size="22"
        />
      </view>
    </view>
    <view class="content">
      <slot></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.card-wrap {
  width: 100%;
  height: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
  background-color: #fff;
  overflow-x: hidden;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 84rpx;
    border-bottom: 1px solid #d8d8d8;
    &-left {
      position: relative;
      padding-left: 20rpx;
      font-size: 28rpx;
      color: #101010;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 3rpx;
        width: 6rpx;
        height: 36rpx;
        background-color: #1a69aa;
      }
    }
    &-right {
    }
  }
}
</style>
