<script lang="ts" setup>
// 用于form中的按钮列表
import AwesomeButton from '../button/index.vue'
interface Props {
  root?: Record<string, any>
  disabled?: boolean | ((root: Record<string, any>) => boolean)
  config: Record<string, any>[]
}
defineProps<Props>()

const emit = defineEmits(['buttonClick'])
const handleClick = (event: any, e) => {
  emit('buttonClick', event, e)
}
</script>

<template>
  <view class="button-list-wrap">
    <template v-for="(item, index) of config" :key="index">
      <AwesomeButton
        :root="root"
        :disabled="item.disabled"
        :icon="item.icon"
        :label="item.label"
        :color="item.color"
        @click="(e) => handleClick(item.event, e)"
      />
    </template>
  </view>
</template>

<style lang="scss" scoped>
.button-list-wrap {
  display: flex;
  align-items: center;
  .button-wrap ~ .button-wrap {
    box-sizing: border-box;
    border-left: 2rpx solid #ebedf0;
  }
}
</style>
