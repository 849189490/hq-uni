<script lang="ts" setup>
import { unref } from 'vue'
import type { DataArray } from './types'
import AwesomeForm from '../form/index.vue'
import AwesomeTabForm from '../tab-form/index.vue'
import AwesomeListForm from '../list-form/index.vue'
interface Props {
  rawProps: Record<string, any>
  modelValue: Record<string, any>
  data: DataArray
  divider?: boolean
  textAlign?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  rawProps: () => ({}),
  modelValue: () => ({}),
  data: () => [],
  divider: true,
  textAlign: 'right'
})
const emit = defineEmits(['update:modelValue', 'change', 'buttonClick'])
const handleChange = (key: string, value: any) => {
  emit('change', key, value)
  emit('update:modelValue', { ...unref(props.modelValue), [key]: value })
}
const handleButtonClick = (event: any, e: MouseEvent) => {
  emit('buttonClick', event, e)
}
</script>

<template>
  <view class="section-wrap">
    <template v-for="item of unref(props.data)" :key="item.key">
      <uni-section :title="item.title" type="line">
        <template v-if="item.type === 'tab'">
          <AwesomeTabForm
            :data="item.data"
            :divider="divider"
            :textAlign="textAlign"
            :modelValue="modelValue"
            @change="(key, value) => handleChange(key, value)"
            @buttonClick="(event, e) => handleButtonClick(event, e)"
          />
        </template>
        <template v-else-if="item.type === 'slot'">
          <slot :name="item.slot" :props="item.props"></slot>
        </template>
        <template v-else-if="item.type === 'list'">
          <AwesomeListForm
            :data="item.data"
            :divider="divider"
            :textAlign="textAlign"
            :modelValue="modelValue"
            @change="(key, value) => handleChange(key, value)"
            @buttonClick="(event, e) => handleButtonClick(event, e)"
          ></AwesomeListForm>
        </template>
        <template v-else>
          <AwesomeForm
            :formData="item.formData"
            :divider="divider"
            :textAlign="textAlign"
            :modelValue="modelValue"
            @change="(key, value) => handleChange(key, value)"
            @buttonClick="(event, e) => handleButtonClick(event, e)"
          ></AwesomeForm>
        </template>
      </uni-section>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.section-wrap {
  width: 100%;
}
</style>
