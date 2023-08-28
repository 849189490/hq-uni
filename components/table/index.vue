<script lang="ts" setup>
import dayjs from '@/utils/dayjs'
interface Props {
  tableData: {
    prop: string
    label: string
    width?: string
    options?: any
    align?: 'left' | 'center' | 'right'
  }[]
  modelValue: Record<string, any>[]
  tableCtrl?: Record<string, any>[] // table操作按钮
  pagination?: boolean
  total?: number
  currentPage?: number
  pageSize?: number
  formatterLabel?: string
  formatterValue?: string
}
const props = withDefaults(defineProps<Props>(), {
  tableData: () => [],
  formatterLabel: 'label',
  formatterValue: 'value'
})

const emit = defineEmits(['update:currentChange', 'tableClick', 'delete'])
type Show = (
  row: Record<string, any>,
  show?: boolean | ((row: Record<string, any>) => boolean)
) => boolean
const isShow: Show = (row, show) => {
  if (show instanceof Function) {
    return show(row)
  } else {
    if (show === false) {
      return false
    } else {
      return show || true
    }
  }
}
type Disabled = (
  row: Record<string, any>,
  disabled?: boolean | ((row: Record<string, any>) => boolean)
) => boolean
const isDisabled: Disabled = (row, disabled) => {
  if (disabled instanceof Function) {
    return disabled(row)
  } else {
    return disabled || false
  }
}
const currentChange = (e) => {
  emit('update:currentChange', e.current)
}
const pendingDelete = ref()
const handleButtonClick = (event, row) => {
  if (event === 'delete') {
    pendingDelete.value = row
    dialog.value.open()
  } else {
    emit('tableClick', event, row)
  }
}
const fmtMoney = (num?: number | string) => {
  if (!num) return ''
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
// 日期格式化 传入 options: 'Date'
const fmtLabel = (row: Record<string, any>, prop: string, options?: any) => {
  if (!row[prop]) return row[prop]
  if (options) {
    if (options instanceof Function) {
      return options(row[prop])
    } else if (options instanceof Array) {
      const label = options.find(item => item[props.formatterValue] === row[prop])?.[props.formatterLabel] || row[prop]
      return label
    } else if (options === 'Date') {
      return dayjs(row[prop]).format('YYYY-MM-DD')
    } else if (options === 'Money') {
      return fmtMoney(row[prop])
    } else {
      return options[row[prop]]
    }
  } else {
    return row[prop]
  }
}
const dialog = ref()
const dialogConfirm = () => {
  emit('delete')
  emit('tableClick', 'delete', pendingDelete.value)
  pendingDelete.value = {}
  dialog.value.close()
}
const dialogClose = () => {
  dialog.value.close()
}
</script>

<template>
  <view class="uni-container">
    <uni-table ref="table" border stripe emptyText="暂无更多数据">
      <uni-tr>
        <template v-for="item of tableData" :key="item.prop">
          <uni-th :width="item.width" :align="item.align">{{
            item.label
          }}</uni-th>
        </template>
        <template v-if="tableCtrl">
          <uni-th :width="tableCtrl.length * 80" align="center">设置</uni-th>
        </template>
      </uni-tr>
      <template v-for="(item, index) of modelValue" :key="index">
        <uni-tr>
          <template v-for="col of tableData" :key="col.prop + index">
            <uni-td>{{ fmtLabel(item, col.prop, col.options ) }}</uni-td>
            <!-- item[col.prop] -->
          </template>
          <template v-if="tableCtrl">
            <uni-td align="center" fixed="right">
              <div class="button-wrap">
                <template v-for="tc of tableCtrl" :key="tc.event">
                  <template v-if="isShow(item, tc.show)">
                    <button
                      class="uni-button"
                      size="mini"
                      :disabled="isDisabled(item, tc.disabled)"
                      :type="tc.type || 'primary'"
                      :event="tc.event"
                      @click="handleButtonClick(tc.event, item)"
                    >
                    {{ tc.label }}
                  </button>
                  </template>
                </template>
              </div>
            </uni-td>
          </template>
        </uni-tr>
      </template>
    </uni-table>
    <template v-if="pagination">
      <view class="uni-pagination-box"
        ><uni-pagination
          show-icon
          :page-size="pageSize"
          :current="currentPage"
          :total="total"
          @change="currentChange"
      /></view>
    </template>
    <uni-popup ref="dialog" type="dialog">
      <uni-popup-dialog type="warn" cancelText="取消" confirmText="确定" title="通知" content="确定要删除吗" @confirm="dialogConfirm" @close="dialogClose">
      </uni-popup-dialog >
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
.button-wrap {
  display: flex;
  justify-content: space-evenly;
}
</style>
