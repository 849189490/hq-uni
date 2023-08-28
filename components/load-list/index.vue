<script lang="ts" setup>
import BScroll from '@/common/better-scroll'
interface Props {
  probeType: 1 | 2 | 3,
  pullDownRefresh?: true
  pullUpLoad?: true
  finished?: boolean // 是否加载完全部数据
}
const props = withDefaults(defineProps<Props>(), {
  probeType: 3,
  pullDownRefresh: true,
  pullUpLoad: true,
  finished: false
})
const emit = defineEmits(['pullingDown', 'pullingUp'])
const wrapper = ref()
const scroll = ref<BScroll>()
// 'pending' 无任何动作， 'loading' 加载中，'finish' 全部加载完
const loadState = ref<'pending' | 'loading' | 'finish'>('pending')
const loadMapper = {
  'pending': '轻触或下拉以加载更多',
  'loading': '全力加载中...',
  'finish': '已全部加载完成'
}
const loadText = computed(() => loadMapper[loadState.value])
// 如果加载完成了全部数据，外界需要告诉组件内部
watch(() => props.finished, (val) => {
  if (val) {
    scroll.value?.closePullUp?.()
    scroll.value?.finishPullDown?.()
    loadState.value = 'finish'
  }
})
// watch(() => props.finished, (val) => {
//   if (val) {
//     finishPullUp()
//   }
// })
// 初始化bscroll并且监听上拉下拉事件
const initScroll = () => {
  if (!wrapper) return
  scroll.value = new BScroll(wrapper.value, {
    probeType: props.probeType,
    pullDownRefresh: {
      stop: 40,
      threshold: 0
    },
    pullUpLoad: {
      threshold: -10
    },
    scrollY: true,
    click: true
  })
  // 上拉加载
  scroll.value.on('pullingUp', () => {
    if (loadState.value === 'finish') return
    loadState.value = 'loading'
    emit('pullingUp')
  })
  // 下拉刷新
  scroll.value.on('pullingDown', () => {
    // 刷新后开启上拉加载
    scroll.value?.openPullUp()
    emit('pullingDown')
  })
}
// 点击时加载
const loadMore = () => {
  if (loadState.value === 'finish') return
  loadState.value = 'loading'
  emit('pullingUp')
}
onMounted(() => {
  nextTick(() => {
    initScroll()
  })
})

// 通知bscroll结束上拉
const finishPullUp = () => {
  if (loadState.value !== 'finish') {
    loadState.value = 'pending'
  }
  scroll.value?.finishPullUp?.()
  refresh()
}
// 通知bscroll结束下拉
const finishPullDown = () => {
  scroll.value?.finishPullDown?.()
  refresh()
}
// 通知bscroll重新计算高度
const refresh = () => {
  nextTick(() => {
    scroll.value?.refresh()
  })
}
// 暴露给组件外部使用，完成上拉或下拉后需要调用对应方法通知bscroll
defineExpose({
  finishPullUp,
  finishPullDown,
  refresh
})
</script>

<template>
  <view class="wrapper-box">
    <div ref="wrapper" class="list-wrapper">
      <view class="list-content">
        <view class="top-loading">
          <view class="top-icon">
            <uni-icons type="spinner-cycle" color="#88b0e5" size="30"></uni-icons>
          </view>
        </view>
        <slot></slot>
        <view class="bottom-loading" @click="loadMore">{{ loadText }}</view>
      </view>
    </div>
  </view>
</template>

<style lang="scss" scoped>
.wrapper-box {
  height: 100%;
  position: relative;

  .list-wrapper {
    overflow: hidden;
    height: 100%;
    .top-loading {
      z-index: -1;
      position: absolute;
      // transform: translate(0 , -100%);
      top: -90rpx;
      display: flex;
      justify-content: center;
      width: 100%;
      height: 80rpx;
      box-sizing: border-box;
      .top-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80rpx;
        width: 80rpx;
        animation: spin 2s linear infinite;
      }
    }
    
    .bottom-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80rpx;
    }
    .list-content {
      width: 100%;
      // position: relative;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>