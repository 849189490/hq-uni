<script lang="ts" setup>
import AwesomePullDownArrow from '../pulldown-arrow/index.vue'
import { fileDownload, newUpload } from '@/apis/load'
import { ref, watch } from 'vue'
interface Props {
  rawProps: Record<string, any>
  value?: Record<string, any>[]
  root: Record<string, any>
  disabled?: boolean
  title?: string
  type?: string
  valueKey: string
}
const props = withDefaults(defineProps<Props>(), {
  rawProps: () => ({}),
  value: () => [],
  root: () => ({}),
  type: 'preview',
})
const emit = defineEmits(['change'])

const pdfSrc = ref('')
watch(
  () => props.value,
  (val) => {
    const pdf = val?.[0]
    if (pdf?.attach_im_id) {
      pdfSrc.value = fileDownload({
        id: pdf.attach_im_id,
        type: props.type
      })
    }
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
  uni.chooseFile({
    count: 1,
    extension: ['pdf'],
    success: (res) => {
      const formData = new FormData()
      const file = res.tempFiles[0]
      const typeArr = file.type.split('/')
      const type = typeArr[1] || typeArr[0]
      formData.append('file', file)
      newUpload(formData).then((res) => {
        if (!res.data.documentId) {
          uni.showToast({
            icon: 'error',
            title: '文件上传失败'
          })
          return
        }
        emit('change', [
          {
            attach_im_id: res.data.documentId,
            attach_name: file.name,
            attach_suffix: type,
            attach_type: '1006'
          }
        ])
      })
    },
    fail: (err) => {
      console.log(err)
    }
  })

}
const deletePdf = () => {
  emit('change', [])
}
const openPdf = () => {
  uni.openDocument({
    filePath: pdfSrc.value,
    success(res) {
      console.log('打开文档成功', res)
    },
    fail(err) {
      console.log('打开失败', err)
    }
  })
}
</script>

<template>
  <view class="upload-wrap">
    <view class="upload-content">
      <template v-if="value && value.length">
        <text class="open-pdf upload-pdf" @click="openPdf">{{
          value[0].attach_name
        }}</text>
      </template>
      <template v-else>
        <text class="no-pdf upload-pdf" @click="chooseFile">上传PDF文档</text>
      </template>
    </view>
    <uni-icons v-if="value && value.length && !disabled" @click="deletePdf" type="closeempty" size="20" color="#999999"></uni-icons>
    <AwesomePullDownArrow />
  </view>
</template>

<style lang="scss" scoped>
.upload-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .upload-pdf {
    // 使用px单位，与form组件保持一致
    padding-right: 10px;
  }
  .open-pdf {
    color: #101010;
  }
  .no-pdf {
    color: #2c91e1;
  }
}
</style>
