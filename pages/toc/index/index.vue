<template>
  <view class="home-wrap">
    首页,登录状态测试 token： {{token}}
  </view>
</template>

<script lang="ts" setup>
const token = uni.getStorageSync('token')
if (!token) {
  uni.navigateTo({
    url: '/pages/toc/login/index'
  })
} else {
  uni.switchTab({
    url: '/pages/toc/home/index'
  })
}
</script>

<style scoped lang="scss">
</style>
