<script lang="ts" setup></script>

<template>
  <view class="form-split-wrap"></view>
</template>

<style lang="scss" scoped>
.form-split-wrap {
  position: relative;
  width: 100%;
  height: 24rpx;
  background-color: #f6f6f6;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -32rpx;
    top: 0;
    width: 32rpx;
    height: 24rpx;
    background-color: #f6f6f6;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    right: -32rpx;
    top: 0;
    width: 32rpx;
    height: 24rpx;
    background-color: #f6f6f6;
  }
}
</style>
