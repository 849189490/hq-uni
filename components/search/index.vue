<script lang="ts" setup>
import { ref } from 'vue'
interface Props {
  rawProps: Record<string, any>
  value: string | number
  root: Record<string, any>
  disabled?: boolean | ((root: Record<string, any>) => boolean)
}
const props = withDefaults(defineProps<Props>(), {
  rawProps: () => ({}),
  value: '',
  root: () => ({}),
})

const emit = defineEmits(['change'])

type Disabled = () => boolean
const isDisabled: Disabled = () => {
  let disabled = props.rawProps.disabled
  if (props.disabled === true || props.disabled === false) {
    disabled = props.disabled
  }
  if (disabled instanceof Function) {
    return disabled(props.root)
  } else {
    return disabled || false
  }
}
const popup = ref()
const searchValue = ref('')
const searchList = ref<Record<string, any>[]>([
  // { label: '汤臣一品', value: 'tcyp' },
  // { label: '深圳湾一号', value: 'szwyh' }
])
const handleClick = () => {
  if (isDisabled()) return
  popup.value.open()
}
const iconClick = async () => {
  searchList.value = await props.rawProps?.searchFn(searchValue.value, props.root)
}
const selectText = (value) => {
  emit('change', value)
  // 清空搜索, 关闭弹框
  searchList.value = []
  searchValue.value = ''
  popup.value.close()
}
</script>

<template>
  <view class="search-wrap" @click="handleClick">
    {{value}}
  </view>
  <uni-popup ref="popup" type="top" background-color="#fff">
    <view class="popup-content">
      <uni-easyinput class="uni-input" v-model="searchValue">
        <template #right>
          <uni-icons
            @click="iconClick"
            type="search"
            color="#333333"
            size="24"
          />
        </template>
      </uni-easyinput>
      <view class="search-list">
        <template v-for="item of searchList" :key="item.value">
          <view class="search-item" @click="selectText(item)">{{item.label}}</view>
        </template>
      </view>
    </view>
  </uni-popup>
</template>

<style lang="scss" scoped>
.search-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
}
::v-deep .popup-content {
  height: 60vh;
  .search-list {
    width: 100%;
    height: calc(100% - 60rpx);
    padding: 10rpx;
    box-sizing: border-box;
    overflow-y: auto;
    color: #1e1e1e;
    .search-item {
      line-height: 1.6;
      padding: 10rpx 20rpx;
      border-bottom: 1px solid #eee;
    }
  }
}
.uni-input {
  box-sizing: border-box;
  padding: 20rpx;
  background: #efefef;
  ::v-deep .uni-easyinput__content {
    background-color: #efefef !important;
  }
}
::v-deep .uni-input-input {
  width: 100%;
  height: 60rpx;
  line-height: 60rpx;
  border: 1px solid #dbd5d5;
  box-sizing: border-box;
  padding: 0 30rpx;
  border-radius: 30rpx;
  font-size: 14px;
  background: #fff;
}
</style>
