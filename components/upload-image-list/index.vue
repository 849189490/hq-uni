<script lang="ts" setup>
import { fileDownload, newUpload } from '@/api/load'
import { base642file } from '@/utils/base642file'
import { isAndroid } from '@/utils/is-android'
import SDK from '@/utils/sdk'
interface Props {
  rawProps: Record<string, any>
  value?: Record<string, any>[]
  root: Record<string, any>
  disabled?: boolean
  type?: string
  valueKey: string
  max?: number
  col?: number
}
const props = withDefaults(defineProps<Props>(), {
  rawProps: () => ({}),
  value: () => [],
  root: () => ({}),
  type: 'preview',
  max: 9,
  col: 4
})
const emit = defineEmits(['change'])

const imgSrcList = ref<{ id: string; src: string }[]>([])
watch(
  () => props.value,
  (val) => {
    if (val?.length) {
      imgSrcList.value = val.map((item) => ({
        src: fileDownload({
          id: item.attach_im_id,
          type: props.type
        }),
        id: item.attach_im_id
      }))
    } else {
      imgSrcList.value = []
    }
  },
  { immediate: true, deep: true }
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
  if (isAndroid()) {
    SDK.fetchPhoto({
      data: {},
      config: {
        isUpload: true,
        isHaveAlbum: true, // 相册
        multipleSelect: 1
      }
    })
      .then((res: any) => {
        if (res?.data?.photos) {
          const photoList =
            res.data?.photos?.map((item) => ({
              fileId: item.fileId,
              attach_suffix: 'png',
              attach_im_id: item.fileId,
              attach_type: '1006',
              attach_name: 'image'
            })) ?? []
          emit('change', [...props.value, ...photoList])
        } else {
          // const file = base642file('data:image/png;base64,'+res.data.imageBase64, '图片')
          // multiLoad([file])
          emit(
            'change',
            [...props.value,
              {
                attach_im_id: res?.data?.fileId,
                attach_name: 'image',
                attach_suffix: 'png',
                attach_type: '1006'
              }
            ]
          )
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    uni.chooseImage({
      count: props.max,
      extension: ['jpg', 'jpeg', 'png', 'bmp', 'tif'],
      success: (res: any) => {
        multiLoad(res.tempFiles)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}
const multiLoad = (tempFiles: any[]) => {
  const promiseList = tempFiles.map((file) => {
    const formData = new FormData()
    formData.append('file', file)
    return newUpload(formData)
  })
  Promise.allSettled(promiseList).then((res) => {
    const fileList =
      res
        ?.filter((item) => item.status === 'fulfilled')
        ?.map((item: any) => {
          const data = item.value?.data ?? {}
          return {
            attach_im_id: data.documentId,
            attach_name: data.fileName,
            attach_suffix: data.extensionType,
            attach_type: '1006'
          }
        }) ?? []
    const list = fileList.map((item) => ({
      src: fileDownload({
        id: item.attach_im_id,
        type: props.type
      }),
      id: item.attach_im_id
    }))
    imgSrcList.value = [...imgSrcList.value, ...list]

    emit('change', [...props.value, ...fileList])
  })
}
const handleDelete = (id: string) => {
  const fileList = props.value.filter((item) => item.attach_im_id !== id)
  console.log('delete', fileList)

  emit('change', fileList)
}
</script>

<template>
  <view class="upload-image-list-wrap">
    <view class="img-box">
      <template v-for="item of imgSrcList" :key="item.id">
        <view class="img-item">
          <img :src="item.src" alt="" v-viewer />
          <template v-if="!isDisabled()">
            <uni-icons
              @click="handleDelete(item.id)"
              type="closeempty"
              color="#00000070"
              size="22"
            />
          </template>
        </view>
      </template>
      <view
        v-if="imgSrcList.length < max"
        class="add-img img-item"
        @click="chooseFile"
      >
        <uni-icons type="camera-filled" color="#00000070" size="34" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.upload-image-list-wrap {
  box-sizing: border-box;
  padding: 20rpx 0 10rpx 10rpx;
  .img-box {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .img-item {
      position: relative;
      box-sizing: border-box;
      width: v-bind('`calc(calc(100% - 15px) / ${props.col})`');
      height: 0;
      padding-top: v-bind('`calc(100% / ${props.col})`');
      margin-right: v-bind('`calc(15px / ${props.col})`');
      margin-bottom: 10rpx;
      img {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
      .uni-icons {
        position: absolute;
        top: 6rpx;
        right: 6rpx;
      }
    }
    .add-img {
      background: #f7f8fa;
      .uni-icons {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
