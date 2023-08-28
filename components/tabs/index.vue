<script lang="ts" setup>
interface Props {
  max?: number // 超出3个开始滑动，小于等于三个平分
  tabs: { label: string; value?: string | number }[]
  modelValue: number | string
  activeColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  max: 3,
  tabs: () => [],
  activeColor: '#E2F2FF'
})
const emit = defineEmits(['update:modelValue', 'change'])
const scrollWdith = computed(() => {
  const size = props.max
  const tabsLength = props.tabs.length
  if (tabsLength <= size) return '100%'
  const percent = `${(tabsLength / size) * 100}%`
  return percent
})

const changeTab = (tab: Record<string, any>, index: number) => {
  const current = tab.value || index
  emit('update:modelValue', current)
  emit('change', tab)
}

const isActive = (tab: Record<string, any>, index: number) => {
  if (tab.value === undefined) {
    return index === props.modelValue
      ? 'active tabs-content-item'
      : 'tabs-content-item'
  } else {
    return tab.value === props.modelValue
      ? 'active tabs-content-item'
      : 'tabs-content-item'
  }
}
</script>

<template>
  <view class="tabs-wrap">
    <view class="tabs-content">
      <template v-for="(item, index) of tabs" :key="item.value || index">
        <view :class="isActive(item, index)" @click="changeTab(item, index)">
          {{ item.label }}
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tabs-wrap {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  width: 100%;
  height: 80rpx;

  .tabs-content {
    width: v-bind('scrollWdith');
    display: flex;
    height: 100%;
    .tabs-content-item {
      flex: 1;
      font-size: 14px;
      line-height: 80rpx;
      text-align: center;
      color: #666;
      background-color: #f9f9f9;
    }
    .active {
      background-color: #e2f2ff;
      color: #003775;
    }
  }
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
  background: transparent;
}
</style>
