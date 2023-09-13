<template>
	<view class="root">
		<view class="text">
			<span class="span" v-if="!loanRecordList">{{!loanRecordList}}暂无数据</span>
			<view class="loan-record-list">
				<view
					v-for="(item, i) in loanRecordList"
					:key="i"
					class="loan-record-item"
					:class="{
						normal: ['ZHC'].includes(item.accountingStatus) &&
							['N', 'A', 'P'].includes(item.acctStatus),
						overdue:
							!['ZHC'].includes(item.accountingStatus) &&
							['N', 'A', 'P'].includes(item.acctStatus),
						success: ['C'].includes(item.acctStatus)
					}"
				>
					<!-- @click="tradingResult(item)" -->
					<view class="loan-record-status">{{ statusMaping(item) }}</view>
					<view class="loan-record-amount">
						<view class="loan-record-amount-item">
							<view class="loan-record-amount-text">放款金额(元)</view>
							<view class="loan-record-amount-value">{{ item.loanAmt || toThousands }}</view>
						</view>
						<view class="loan-record-amount-item" >
							<view class="loan-record-amount-text">剩余本金(元)</view>
							<view class="loan-record-amount-value">{{ item.balance || toThousands }}</view>
						</view>
					</view>
					<view class="loan-record-info">
						<view class="loan-record-info-item">合同编号: {{ item.agreementNo }}</view>
						<!-- <view class="loan-record-info-item" v-if="item.loanNo">借据号：{{ item.loanNo }}</view> -->
						<view class="loan-record-info-item" >贷款到期日：
							<span v-if="item.maturityDate">{{ item.maturityDate | formatDateMoment }}</span>
							<span v-else>--</span>
						</view>
					</view>
					<view class="loan-record-button">
						<template v-if="['A', 'P'].includes(item.acctStatus)">
							<view class="loan-record-button-item" @click.stop="viewPlan(item)">还款计划</view>
							<view class="loan-record-button-line"></view>
						</template>
						<view class="loan-record-button-item" @click.stop="viewRecord(item)">还款记录</view>
						<!-- <view class="loan-record-button-line"></view> -->
						<!-- <view class="loan-record-button-item" @click.stop="tradingResult(item)">去还款</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang='ts' setup>
	import { ref, computed, watch, version, onMounted, onUpdated } from 'vue';
	import { useGammaApply } from '@/mock/index';
	import { toThousands } from '@/utils/data'
	import moment from "moment";

	const loanRecordList = ref([])
	const orderNo = ref('')
  const loanNo = ref('')
  const statusMap = ref({
		'A': '正常',
		'P': '逾期',
		// 'PRE_CLOSE': '提前结清',
		'C': '结清'
	})
	
	const formatDateMoment = computed((date?: any) => {
		return date ? moment(date).format('YYYY-MM-DD'):''
	})
	
	const statusMaping = computed(() => (item?: any) => {
		console.log(item, 'item>>');
		if (
				["ZHC"].includes(item.accountingStatus) &&
				["N", "A", "P"].includes(item.acctStatus)
			) {
				return "正常";
			} else if (
				!["ZHC"].includes(item.accountingStatus) &&
				["N", "A", "P"].includes(item.acctStatus)
			) {
				return "逾期";
			} else if (["C"].includes(item.acctStatus)) {
				return "结清";
			}
	})
	const getList = () => {
		const mockData = useGammaApply()
		console.log("mockData> ", mockData);
		if(mockData) {
			console.log(mockData.data.data, 'mockData.data.data>');
			loanRecordList.value = mockData.data.data || []
		}
		// orderQuery().then((res) => {
		// 	if (res.code == 0) {
		// 		this.loanRecordList = res.data && res.data || []
		// 	} else {
		// 		// alert(res.msg || res.message || res.responseMsg)
		// 	}
		// })
	}
	const viewPlan = (item?: any) => {
		console.log(encodeURI(JSON.stringify(item)), 'JSON.stringify(item)>>');
		uni.navigateTo({
			url: `/pages/toc/pay-plan/index` // ?order=` + encodeURI(JSON.stringify(item)) + `receiptNo?=` + item?.receiptNo || ''
		});
	}
	const viewRecord = (item?: any) => {
		console.log('viewRecord');
		uni.navigateTo({
			url: `/pages/toc/quota-repayment-record/index?receiptNo?=` + item?.receiptNo || '' 
		});
	}
	getList()
	console.log(loanRecordList.value, 'loanRecordList>');
	
</script>
	
<style scoped lang="scss">
	// .root {
	// 	display: flex;
	// }
	// .text {
	// 	color: #9b9b9b;
	// 	margin: 20px auto;
	// }
	// .span {
	// 	height: 23px;
	// 	display: inline-block;
	// }
	.root {
		height: 100%;
		overflow: auto;

		.loan-record-list {
			padding: 0 1rem 1.5rem;
			// margin-top: 66px;
			margin-top: 26px;
		}
	}
	.loan-record-item {
	  border-radius: 16px;
	  padding-top: 1rem;
	  margin-bottom: 1.5rem;
	  &.overdue {
	    background: #FFEFEF;
	    .loan-record-status {
	      border: 1px solid #EEB3B9;
	      color: #DC838E;
	    }
	    .loan-record-button {
	      background: rgba(201, 54, 71, 0.06);
	      color: #C93647;
	    }
	  }
	  &.normal {
	    background:#e9f2ff;
	    .loan-record-status {
	      border: 1px solid #69a5ff;
	      color: #69a5ff
	    }
	    .loan-record-button {
	      background: #e0eaff;
	      color: #69a5ff;
	    }
	  }
	  &.success {
	    background: #F4FFFA;
	    .loan-record-status {
	      border: 1px solid #CEEFBD;
	      color: #A2DC85;
	    }
	    .loan-record-button {
	      background: rgba(116, 207, 70, 0.06);
	      color: rgb(104, 228, 42);
	    }
	  }
	}
	.loan-record-status {
	  margin-left: 1.5rem;
	  padding: 0 0.5rem;
	  height: 1.5rem;
	  font-size: .75rem;
	  line-height: 1.5rem;
	  border-radius: 5px;
	  text-align: center;
	  display: inline-block;
	}
	.loan-record-amount {
	  padding: 0 1.5rem;
	  margin-top: .5rem;
	  display: flex;
	  .loan-record-amount-item {
	    &:first-child {
	      width: 12.5rem;
	    }
	  }
	  .loan-record-amount-text {
	    font-size: .625rem;
	    color: #9B9B9B;
	  }
	  .loan-record-amount-value {
	    font-size: 1.5rem;
	    color: #4A4A4A;
	    line-height: 2rem;
	    font-weight: bold;
	  }
	}
	.loan-record-info {
	  padding: 0 1.5rem .75rem;
	  margin-top: 1.25rem;
	  .loan-record-info-item {
	    font-size: .75rem;
	    color: #9B9B9B;
	    margin-bottom: .5rem;
	  }
	}
	.loan-record-button {
	  display: flex;
	  line-height: 2.5rem;
	  align-items: center;
	  border-radius: 0 0 16px 16px;
	  .loan-record-button-item {
	    text-align: center;
	    flex: 1;
	    font-size: .8125rem;
	  }
	  .loan-record-button-line {
	    width: 1px;
	    height: 1.25rem;
	    background: rgba(201,54,71,0.10);
	  }
	}
</style>