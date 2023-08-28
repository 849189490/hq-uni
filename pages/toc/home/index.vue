<template>
  <view class="home-wrap">
    <view>
      首页 {{ token }}
    </view>
    <button type="default" size="mini" @click="gotoLogin">登录</button>
    <button type="default" size="mini" @click="chooseImage">相机</button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const token = ref(uni.getStorageSync('token'))

const gotoLogin = () => {
  uni.navigateTo({
    url: '/pages/toc/login/index'
  })
}
const chooseImage = () => {
  uni.chooseImage({
    count: 9,
  }).then(res => {
    console.log(res.tempFilePaths)
  })
}
</script>

<style scoped lang="scss">
</style>
