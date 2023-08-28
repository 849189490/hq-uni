<script lang="ts" setup>
interface Props {
  options: {
    title: string
  }[]
  active: number
}
withDefaults(defineProps<Props>(), {
  options: () => [],
  active: 1
})
</script>

<template>
  <view class="awesome-steps">
    <template v-for="(item, index) of options" :key="index">
      <view :class="['awesome-step', index + 1 === active && 'is-active']">
        <view class="awesome-step-head">
          <view class="awesome-step-line"></view>
          <view class="awesome-step-icon">
            {{ index + 1 }}
          </view>
        </view>
        <view class="awesome-step-main">
          <view class="awesome-step-title">
            {{ item.title }}
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.awesome-steps {
  display: flex;
  width: 100%;
  white-space: nowrap;
  .awesome-step {
    position: relative;
    flex: 1;
    &-head {
      position: relative;
      text-align: center;
      width: 100%;
      .awesome-step-line {
        position: absolute;
        top: 22rpx;
        left: 0;
        right: 0;
        width: 100%;
        height: 1px;
        background: #999;
      }
      .awesome-step-icon {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44rpx;
        height: 44rpx;
        box-sizing: border-box;
        border: 1px solid #999;
        border-radius: 50%;
        font-size: 24rpx;
        color: #999;
        background-color: #fff;
      }
    }
    &-main {
      text-align: center;
      white-space: normal;
      .awesome-step-title {
        font-size: 14px;
        margin-top: 16rpx;
        color: #999;
      }
    }
  }
  .is-active {
    .awesome-step-head {
      .awesome-step-line {
        background: #1a67a6;
      }
      .awesome-step-icon {
        color: #fff;
        border-color: #1a67a6;
        background-color: #1a67a6;
      }
    }
    .awesome-step-main {
      .awesome-step-title {
        color: #1a67a6;
      }
    }
  }
}
</style>
