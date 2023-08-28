<script lang="ts" setup>
import AwesomeButtonList from '../button-list/index.vue'
interface Props {
  modelValue: boolean
  type: 'top' | 'center' | 'bottom' | 'left' | 'right'
  title: string
  config?: { label: string, event: string }[]
}
const props = withDefaults(defineProps<Props>(), {
  type: 'right',
  modelValue: true,
  config: () => [
    { label: '取消', event: 'cancel' },
    { label: '确认', event: 'confirm' },
  ]
})
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])
const popup = ref()
watch(() => props.modelValue, (val) => {
  if (val) {
    if (!popup.value) {
      nextTick(() => {
        popup.value?.open?.()
      })
    } else {
      popup.value?.open?.()
    }
  } else {
    if (!popup.value) {
      nextTick(() => {
        popup.value?.close?.()
      })
    } else {
      popup.value?.close?.()
    }
  }
}, {
  immediate: true
})
const buttonClick = (event: 'cancel' | 'confirm') => {
  emit(event)
}
const closePopup = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <view class="popup-wrap">
    <uni-popup ref="popup" :type="type" :is-mask-click="false" @maskClick="closePopup" background-color="#fff">
      <view class="popup-top">
        <slot name="title">
          <view class="title">{{ title }}</view>
        </slot>
        <view class="close" @click="closePopup">
          <uni-icons type="closeempty" size="20"></uni-icons>
        </view>
      </view>
      <div class="popup-center">
        <slot></slot>
      </div>
      <view class="popup-bottom">
        <AwesomeButtonList :config="config" @buttonClick="buttonClick" />
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
.popup-wrap {
  :deep(.uni-popup__wrapper) {
    padding-top: 0 !important;
  }
  .popup-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20rpx;
    background-color: #f9f9f9;
    .title {
      font-size: 14px;
      font-weight: 600;
    }
  }
  .popup-center {
    height: calc(100% - 84rpx);
    overflow-y: auto;
  }
  .popup-bottom {
    border-top: 1px solid #ebedf0;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>