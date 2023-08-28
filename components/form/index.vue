<script lang="ts" setup>
import AwesomeInput from '../input/index.vue'
import AwesomeSelect from '../select/index.vue'
import AwesomeCascader from '../cascader/index.vue'
import AwesomeDatePicker from '../date-picker/index.vue'
import AwesomeUpload from '../upload/index.vue'
import AwesomeUploadList from '../upload-list/index.vue'

import AwesomeButton from '../button/index.vue'
import AwesomeButtonList from '../button-list/index.vue'
import AwesomeFormSplit from '../form-split/index.vue'
import AwesomeSearch from '../search/index.vue'
import { computed } from 'vue'
import type { FormDataArray, Component } from '../public.types'
interface Props {
  rawProps: Record<string, any>
  modelValue: Record<string, any>
  formData: FormDataArray
  rules: Record<string, any>
  divider?: boolean
  colon?: boolean
  textAlign?: 'left' | 'right'
  labelWidth?: string | number
  formIndex?:string | number
}
interface Emit {
  (e: 'update:modelValue', payload: Record<string, any>): void
  (e: 'change', key: string, value: any, payload?: any): void
  (e: 'onBlur', key: string, value: any, payload?: any): void
  (e: 'changeUpload', key: string, value: any, file: File): void
  (e: 'buttonClick', event: string, rawE: Event): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emit>()

type Label = (label?: string | ((modelValue: any) => string)) => string
const labelShow: Label = (label) => {
  if (!label) {
    return ''
  }
  const colon = props.colon ? ':' : ''
  if (label instanceof Function) {
    return label(props.modelValue) + colon
  } else {
    return label + colon
  }
}
type Required = (
  required?: boolean | ((modelValue: Record<string, any>) => boolean)
) => boolean
const isRequired: Required = (required) => {
  if (required instanceof Function) {
    return required(props.modelValue)
  } else {
    return required || false
  }
}
type Show = (
  show?: boolean | ((modelValue: Record<string, any>) => boolean)
) => boolean
const isShow: Show = (show) => {
  if (show instanceof Function) {
    // console.log('props.modelValue', props.modelValue)
    return show(props.modelValue)
  } else {
    if (show === false) {
      return false
    } else {
      return show || true
    }
  }
}
type Disabled = (
  disabled?: boolean | ((modelValue: Record<string, any>) => boolean)
) => boolean
const isDisabled: Disabled = (disabled) => {
  if (disabled instanceof Function) {
    return disabled(props.modelValue)
  } else {
    return disabled || false
  }
}

const handleChange = (key: string, value: any, payload: any) => {
  if (payload instanceof Object && payload.update) {
    const updateValue = payload.update(props.modelValue)
    emit('change', key, value, updateValue)
    emit('update:modelValue', { ...props.modelValue, [key]: value, ...updateValue })
  } else {
    emit('change', key, value, payload)
    emit('update:modelValue', { ...props.modelValue, [key]: value })
  }
}

const onBlur = (key: string, value: any) => {
  emit('onBlur', key, value)
}

const changeUpload = (key: string, value: any, file: File) => {
  emit('changeUpload', key, value, file)
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
const labelWidth = computed(() => Number(props.labelWidth || '120') + 'px')

const handleButtonClick = (event: any, e: MouseEvent) => {
  emit('buttonClick', event, e)
}

const formItemClass = (component: Component | ((modelValue: Record<string, any>) => Component)) => {
  let cpn
  if (component instanceof Function) {
    cpn = component(props.modelValue)
  } else {
    cpn = component
  }
  const mapper = {
    Upload: 'upload',
    UploadList: 'upload-list',
    ButtonList: 'button-list',
    Button: 'awesome-button',
    FormSplit: 'form-split',
    UploadImageList: 'upload-image-list'
  }
  return mapper[cpn]
}
const validator = () => {
  return new Promise((resolve, reject) => {
    const data = props.formData
      .map((item) => {
        if (item.component === 'UploadList') {
          return item.imgs?.map((i) => i.key)
        } else {
          return item.key
        }
      })
      .flat()
    for (const value of data) {
      if (props.rules[value]) {
        const valiRes = isKeyVali(props.rules[value], props.modelValue[value])
        if (valiRes) {
          const err = props.formIndex?`rules:${props.formIndex+'：'}${valiRes}`:`rules:${valiRes}`
          reject(err)
        }
      }
    }
    const dataVal = data.map((item) => ({ [item]: props.modelValue[item] }))
    resolve(dataVal)
  })
}
// 判断校验的数据类型
const isKeyVali = (rule, value) => {
  if (rule instanceof Array) {
    for (const item of rule) {
      const va = valiRule(item, value)
      if (va) return va
    }
  } else {
    const va = valiRule(rule, value)
    if (va) return va
  }
}
// 发起校验
const valiRule = (rule, value) => {
  if (rule.required) {
    if (rule.required instanceof Function) {
      if (rule.required(props.modelValue) && !value) {
        return rule.errorMessage
      }
    } else {
      return !value && rule.errorMessage
    }
  } else if (rule.pattern) {
    return !rule.pattern.test(value) && rule.errorMessage
  }
  return false
}
const component = (component: Component | ((modelValue: Record<string, any>) => Component)) => {
  const componentsMapper = {
    'Input': AwesomeInput,
    'Select': AwesomeSelect,
    'Cascader': AwesomeCascader,
    'DatePicker': AwesomeDatePicker,
    'Upload': AwesomeUpload,
    'UploadList': AwesomeUploadList,
    // 'UploadButton': AwesomeUploadButton,
    // 'UploadImageList': AwesomeUploadImageList,
    'Button': AwesomeButton,
    'ButtonList': AwesomeButtonList,
    'FormSplit': AwesomeFormSplit,
    'Search': AwesomeSearch,
  }
  // props.modelValue
  if (component instanceof Function) {
    return componentsMapper[component(props.modelValue)]
  } else {
    return componentsMapper[component]
  }
}
defineExpose({
  validator
})
</script>

<template>
  <view class="form-wrap">
    <!-- forms中传入的modelValue可以作为优化项 -->
    <uni-forms :label-width="labelWidth" :model="modelValue" :rules="rules">
      <template v-for="item of formData" :key="item.key">
        <template v-if="isShow(item.show)">
          <template v-if="item.slot">
            <template v-if="!item.wrap">
              <view :class="item.slot + '-wrap local-wrap'">
                <slot :name="item.slot" :data="item" :value="modelValue[item.key]"></slot>
              </view>
            </template>
            <template v-else>
              <uni-forms-item
                :class="item.slot + '-wrap'"
                :label="labelShow(item.label)"
                :name="item.key"
                :required="isRequired(item.required)"
              >
                <slot :name="item.slot" :data="item" :value="modelValue[item.key]"></slot>
              </uni-forms-item>
            </template>
          </template>
          <template v-else>
            <uni-forms-item
              :class="[(props.divider ?? true) && 'divider', 'component-wrap', isDisabled(item.disabled) && 'is-disabled-wrap', formItemClass(item.component!)]"
              :label="labelShow(item.label)"
              :name="item.key"
              :required="isRequired(item.required)"
            >
              <template v-if="component(item.component!) === 'Input'">
                <AwesomeInput
                  :value="modelValue[item.key]"
                  @update:modelValue="(val, payload) => handleChange(item.key, val, payload)"
                  :textAlign="textAlign || 'right'"
                  :root="modelValue"
                  :thousandth="item.thousandth"
                  :rightText="item.rightText"
                  :placeholder="item.placeholder"
                  :textarea="item.textarea"
                  @onBlur="(val) => onBlur(item.key, val)"
                  :disabled="isDisabled(item.disabled)"
                />
              </template>
              <template v-else-if="component(item.component!) === 'Select'">
                <AwesomeSelect
                  :value="modelValue[item.key]"
                  @update:modelValue="(val, payload) => handleChange(item.key, val, payload)"
                  :textAlign="textAlign || 'right'"
                  :root="modelValue"
                  :options="item.options"
                  :labelKey="item.labelKey"
                  :valueKey="item.valueKey"
                  :clearable="item.clearable"
                  :placeholder="item.placeholder"
                  :disabled="isDisabled(item.disabled)"
                />
              </template>
              <template v-else-if="component(item.component!) === 'Cascader'">
                <AwesomeCascader
                  :value="modelValue[item.key]"
                  @update:modelValue="(val, payload) => handleChange(item.key, val, payload)"
                  :textAlign="textAlign || 'right'"
                  :root="modelValue"
                  :options="item.options"
                  :mapper="item.mapper"
                  :placeholder="item.placeholder"
                  :disabled="isDisabled(item.disabled)"
                />
              </template>
              <template v-else-if="component(item.component!) === 'DatePicker'">
                <AwesomeDatePicker
                  :value="modelValue[item.key]"
                  @update:modelValue="(val, payload) => handleChange(item.key, val, payload)"
                  :textAlign="textAlign || 'right'"
                  :root="modelValue"
                  :timeFormat="item.timeFormat"
                  :placeholder="item.placeholder"
                  :disabled="isDisabled(item.disabled)"
                />
              </template>
              <template v-else-if="component(item.component!) === 'Upload'">
                <AwesomeUpload
                  :value="modelValue[item.key]"
                  @update:modelValue="(val, payload) => handleChange(item.key, val, payload)"
                  :textAlign="textAlign || 'right'"
                  :root="modelValue"
                  :title="item.title"
                  :type="item.type"
                  :width="item.width"
                  :max="item.max"
                  :occupying="item.occupying"
                  :placeholder="item.placeholder"
                  :disabled="isDisabled(item.disabled)"
                  @changeUpload="changeUpload"
                />
              </template>
              <template v-else-if="component(item.component!) === 'UploadList'">
                <AwesomeUploadList
                  :value="modelValue[item.key]"
                  @update:modelValue="(val, payload) => handleChange(item.key, val, payload)"
                  :textAlign="textAlign || 'right'"
                  :root="modelValue"
                  :imgs="item.imgs"
                  :placeholder="item.placeholder"
                  :disabled="isDisabled(item.disabled)"
                  @changeUpload="changeUpload"
                />
              </template>
              <template v-else-if="component(item.component!) === 'ButtonList'">
                <AwesomeButtonList
                  :textAlign="textAlign || 'right'"
                  :root="modelValue"
                  :placeholder="item.placeholder"
                  :disabled="isDisabled(item.disabled)"
                  @buttonClick="handleButtonClick"
                />
              </template>
              <template v-else-if="component(item.component!) === 'Search'">
                <AwesomeSearch
                  :value="modelValue[item.key]"
                  @update:modelValue="(val, payload) => handleChange(item.key, val, payload)"
                  :textAlign="textAlign || 'right'"
                  :root="modelValue"
                  :placeholder="item.placeholder"
                  :disabled="isDisabled(item.disabled)"
                />
              </template>
              <template v-else-if="component(item.component!) === 'FormSplit'">
                <AwesomeFormSplit />
              </template>
              <!-- <component
                :is="component(item.component!)"
                @update:modelValue="(val, payload) => handleChange(item.key, val, payload)"
                :value="modelValue[item.key]"
                :textAlign="textAlign || 'right'"
                :root="modelValue"
                v-bind="item"
                :placeholder="item.placeholder"
                @onBlur="(val) => onBlur(item.key, val)"
                @buttonClick="handleButtonClick"
                :disabled="isDisabled(item.disabled)"
                @changeUpload="changeUpload"
              /> -->
            </uni-forms-item>
          </template>
        </template>
      </template>
    </uni-forms>
  </view>
</template>

<style lang="scss" scoped>
.form-wrap {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  // ::v-deep .uni-icon {
  //   font-size: 14px;
  // }
  ::v-deep .uni-forms-item {
    margin: 0 32rpx;
    padding: 8rpx 0;
    box-sizing: border-box;
    &.is-disabled-wrap {
      .uni-forms-item__label {
        color: #999 !important;
      }
    }
    .uni-forms-item__label {
      color: #646566;
      font-size: 14px;
      font-weight: normal;
      width: v-bind('labelWidth');
      .is-required {
        margin-right: 8rpx;
      }
    }
    &__content {
      .is-input-border {
        border: none;
      }
    }
  }
  .upload-list {
    padding: 36rpx 0;
    box-sizing: border-box;
    ::v-deep .uni-forms-item__label {
      width: 6px !important;
      margin-left: -3px;
      padding: 0 !important;
    }
  }
  .button-list {
    ::v-deep .uni-forms-item__label {
      display: none;
    }
  }
  .form-split {
    // height: auto !important;
    padding: 0;
    ::v-deep .uni-forms-item__label {
      display: none;
    }
    &.divider {
      border: none;
    }
  }
  .upload-image-list{
    flex-direction: column;
  }
  .divider {
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
  ::v-deep .uni-input-placeholder,
  .input-placeholder {
    color: #d8d8d8;
    font-size: 24rpx;
  }
  .local-wrap{
    margin: 0 32rpx;
    padding: 50rpx 0;
    box-sizing: border-box;
  }
}
::v-deep ::placeholder {
  color: #d8d8d8;
  font-size: 24rpx;
}
::v-deep .is-disabled {
  background-color: #fff !important;
}
::v-deep .uni-forms-item__error {
  z-index: 1;
  transform: translateY(-24rpx) !important;
}
</style>
