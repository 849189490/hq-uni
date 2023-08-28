<script lang="ts" setup>
import { fileDownload, newUpload } from '@/apis/load'
import { ref, watch } from 'vue'
interface Props {
  rawProps: Record<string, any>
  value?: Record<string, any>[]
  root?: Record<string, any>
  disabled?: boolean
  occupying?: string
  title?: string
  type?: string
  width?: string
  max: number
}
const props = withDefaults(defineProps<Props>(), {
  rawProps: () => ({}),
  value: () => [],
  root: () => ({}),
  type: 'preview',
  width: '100%',
  max: 9
})
const emit = defineEmits(['change'])

const imgSrc = ref('')
watch(
  () => props.value,
  (val) => {
    let pic: Record<string, any> = (val ?? [])[0]
    if (pic?.attach_im_id) {
      imgSrc.value = fileDownload({
        id: pic.attach_im_id,
        type: props.type
      })
    } else {
      imgSrc.value = ''
    }
  }, {
    immediate: true,
    deep: true
  }
)
type Disabled = () => boolean
const isDisabled: Disabled = () => {
  if (props.disabled === false || props.disabled === true) {
    return props.disabled
  }
  const disabled = props.rawProps.disabled
  if (disabled instanceof Function) {
    return disabled(props.root)
  } else {
    return disabled || false
  }
}

const chooseFile = () => {
  if (isDisabled()) {
    return
  }
  uni.chooseImage({
    count: 1,
    extension: ['jpg', 'jpeg', 'png'],
    success: (res) => {
      const formData = new FormData()
      const file = res.tempFiles[0]
      const typeArr = file.type.split('/')
      const type = typeArr[1] || typeArr[0]
      formData.append('file', file)
      newUpload(formData).then((res) => {
        imgSrc.value = file.path
        if (!res?.data?.documentId) {
          uni.showToast({
            title: '上传图片异常',
            icon: 'error'
          })
          emit(
            'change',
            [],
          )
          return
        }
        emit(
          'change',
          [
            {
              attach_im_id: res.data.documentId,
              attach_name: file.name,
              attach_suffix: type,
              attach_type: '1006'
            }
          ],
          file
        )
      }).catch(() => {
        uni.showToast({
          title: '上传图片失败',
          icon: 'error'
        })
        emit(
          'change',
          [],
        )
        return
      })
    },
    fail: (err) => {
      console.log(err)
    }
  })

}
const handleDelete = () => {
  imgSrc.value = ''
  emit('change', '')
}
</script>

<template>
  <view class="upload-wrap">
    <view class="upload-content">
      <view class="img-box">
        <img v-if="!imgSrc" :src="occupying" alt="" @click="chooseFile" />
        <template v-else>
          <!-- v-viewer -->
          <img :src="imgSrc" alt="" @click.stop />
          <template v-if="!isDisabled()">
            <uni-icons @click="handleDelete" class="closeIcon" color="#fff" custom-prefix="iconfont" type="icon-close" size="12" />
          </template>
        </template>
      </view>
      <view class="img-title">{{ title }}</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.upload-wrap {
  width: v-bind(width);
  .upload-content {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    box-sizing: border-box;
    .img-box {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 70%;
      .uni-icons {
        position: absolute;
        top: 6rpx;
        right: 6rpx;
        line-height: 50rpx;
        height: 50rpx;
        width: 50rpx;
        background: #b2b2b2;
        opacity: .8;
        border-radius: 50rpx;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    .img-title {
      text-align: center;
      margin-top: -40rpx;
      width: 100%;
      font-size: 12px;
      color: #7888c9;
    }
  }
}
</style>
