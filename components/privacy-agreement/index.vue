<script lang="ts" setup>
interface Props {
  modelValue: boolean
  list: Record<string, string>[]
}
interface Emit {
  (e: 'update:modelValue', checked: boolean)
}
const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const changeRadio = () => {
  emit('update:modelValue', !props.modelValue)
}
const openFile = (url: string) => {
  console.log(url)
}
</script>

<template>
  <view>
    <div class="radio" @click="changeRadio"><radio style="transform:scale(0.8)" :checked="modelValue" @click.stop="changeRadio" />
      我已阅读并同意
      <template v-for="item of list" :key="item.privacyAgreementURL">
        <text class="privacy" @click.stop="openFile(item.privacyAgreementURL)">《{{ item.privacyAgreementName }}》</text>
      </template>
    </div>
  </view>
</template>

<style lang="scss" scoped>
.privacy {
  color: #62a4ff;
}
</style>