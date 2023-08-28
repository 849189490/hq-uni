<template>
  <view class="arrow-area">
    <view class="input-arrow"></view>
  </view>
</template>

<style lang="scss" scoped>
.arrow-area {
  position: relative;
  width: 20px;
  margin-bottom: 5px;
  // margin-left: auto;
  display: flex;
  justify-content: center;
  transform: rotate(-45deg);
  transform-origin: center;
  .input-arrow {
    width: 7px;
    height: 7px;
    border-left: 1px solid #999;
    border-bottom: 1px solid #999;
  }
}
</style>
