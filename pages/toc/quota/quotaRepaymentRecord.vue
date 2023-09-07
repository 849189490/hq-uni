<template>
	<view class="root">
		<view class="repayment-head">
			<!-- <view class="repayment-head-left" @click="selectYear">
				<span>{{ currentYear }}年</span>
				<i class="el-icon-caret-bottom"></i>
			</view> -->
			<view class="repayment-head-left">
				<view>
					<picker class="picker" mode="date" :value="date" fields="year" @change="bindDateChange($event)" @cancel="bindDateCancel($event)">
						<view class="uni-input">{{date}}</view>
						<uni-icons type="bottom" size="15" color="#aaa"/>

					</picker>
				</view>
			</view>
			<view class="repayment-head-right">
				<span>共计明细</span>
				<span class="repayment-head-right-num">{{ currentYearList.length }}</span>
				<span>笔</span>
			</view>
		</view>

		<view class="box">
			<view class="repayment-list" v-if="currentYearList.length">
				<view class="repayment-box">
					<uni-collapse v-model="activeNames">
						<view v-for="(item, i) in currentYearList" :key="i" class="repayment-item">
							<uni-collapse-item :title="'¥' + item.recAmt | toThousands" :value="item.recycleGenerateMode | formatPayType">
								<view class="content">
									<view class="repayment-item-child" v-if="item.repaidAmtPri && Number(item.repaidAmtPri) !== 0">实还本金：¥{{item.repaidAmtPri}}</view>
									<view class="repayment-item-child" v-if="item.repaidAmtInt && Number(item.repaidAmtInt) !== 0">实还利息：¥{{item.repaidAmtInt}}</view>
									<view class="repayment-item-child" v-if="item.repaidAmtOdp && Number(item.repaidAmtOdp) !== 0">实还罚息：¥{{item.repaidAmtOdp}}</view>
									<view class="repayment-item-child" v-if="item.pretermPri && Number(item.pretermPri) !== 0">提前还款本金：¥{{item.pretermPri}}</view>
									<view class="repayment-item-child" v-if="item.pretermInt && Number(item.pretermInt) !== 0">提前还款利息：¥{{item.pretermInt}}</view>
									<view class="repayment-item-child" v-if="item.recGrt && Number(item.recGrt) !== 0">还款担保费：¥{{item.recGrt}}</view>
									<view class="repayment-item-child" v-if="item.recGrtOdp && Number(item.recGrtOdp) !== 0">还款滞纳金：¥{{item.recGrtOdp}}</view>
									<view class="repayment-item-child" v-if="item.pretermTra && Number(item.pretermTra) !== 0">提前还款违约金：¥{{item.pretermTra}}</view>
								</view>
							</uni-collapse-item>
							<view class="repayment-item-day">还款日：{{ item.lastSettleDate | formatTransDate }}</view>
						</view>
					</uni-collapse>
				</view>
			</view>
			
			<view class="repayment-footer" v-if="currentYearList.length">- 我们是有底线的 -</view>
			<view class="repayment-footer repayment-footer1" v-else>- 暂无记录 -</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed } from 'vue'

	const order = ref({})
	const type = ""
	const repaymentList = ref([])
	const currentYear = ref(`${new Date().getFullYear()}`)
	const pickDataFlag = ref(false)
	const activeNames = ref([])
	
	const getDate = (type) => {
		const date = new Date();
		console.log('getDate>>>>>>>',date );

		let year = date.getFullYear();
		return `${year}`;
	}
	
	const date = ref(
		getDate({
			format: true
		})
	)

	const bindDateChange = (e) => {
		console.log('bindDateChange> ', e, e.detail.value);
		date.value = e.detail.value
	}
	const bindDateCancel = (e) => {
		console.log('bindDateCancel> ', e.detail.value);
	}
	
	const pickerData = computed(() => {
		const year = new Date().getFullYear();
		const result = [];
		for (let i = year - 50; i <= year + 50; i++) {
			result.push({
				name: `${i}年`,
				value: `${i}`
			});
		}
		return result;
	})
	const currentYearList = computed(() => {
		return (repaymentList.value || [])
		.filter(v =>  moment(v.recycleDate).year()==this.currentYear)
	})
	const formatPayType = computed((val) => {
		if (!val) {
			return "--";
		}
		const map = {
			"A": "系统扣款",
			"M": "主动还款"
		};
		return map[val] || val;
	})
	
</script>

<style scoped lang="scss">
.root {
  background: #f5f5f5;
  min-height: 100%;
  position: relative;
  overflow: hidden;
}
.repayment-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem 0.25rem;
  color: #4a4a4a;
  .repayment-head-left {
    font-size: 18px;
    display: flex;
    align-items: center;
    i {
      margin-left: 0.25rem;
      color: #aaa;
    }
  }
  .repayment-head-right {
    line-height: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #aaa;
    .repayment-head-right-num {
      color: #69a5ff;
    }
  }
}

.box{
  max-height: calc(100vh - 99px);
  overflow: auto;
}
.repayment-list {
  padding: 0.9375rem;
  .repayment-item {
    border-radius: 13px;
    overflow: hidden;
    box-sizing: border-box;
    background: #ffffff;
    margin-bottom: 6px;
    &-child {
      font-size: 12px;
      padding: 2px 0;
    }
    &-day {
      font-size: 12px;
      padding: 0 16px 8px;
    }
    // box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.1); 
  }
}
.data-pick {
  background: #ffffff;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  .data-pick-btn {
    background: #fbf9fe;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #828282;
  }
}

.repayment-footer {
  text-align: center;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  color: #9b9b9b;

  &.repayment-footer1{
    margin-top: 0.9375rem;
  }
}
.uni-input {
	float: left;
	padding-right: 5px;
}
</style>