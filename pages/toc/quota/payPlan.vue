<template>
	<view>
		<view class="pay-plan-wrap">
			<view class="pay-plan">
				<view class="repayment-head">
					<view class="repayment-head-left"  >
						<span style="color:#fff;opacity:0.7;font-size:14px;marginBottom:4px">贷款剩余应还{{amountSources === '1'?'本金':'担保费'}}(元)</span>
						<span style="color:#fff;font-size:18px">{{formateMoney(oslAmt) || '-'}}</span>
					</view>
					<view class="repayment-head-right">
						<span style="color:#fff;marginBottom:4px;opacity:0.7;">剩余期数</span>
						<span style="color:#fff;font-size:18px">
							<span class="">{{ remainPeriod || '-' }}</span>
							<span>期</span>
						</span>
					</view>
				</view>
				<cell :data="currentYearList" />
	
				<view class="data-pick" v-if="pickDataFlag">
					<view class="data-pick-btn">
						<view @click.stop="pickDataFlag = false">取消</view>
						<view @click="pickData">确定</view>
					</view>
					<picker :value="year" :data="[pickerData]">
						<view class="uni-input">{{year}}</view>
					</picker>
				</view>
	
				<view class="repayment-footer" v-if="currentYearList.length">- 我们是有底线的 -</view>
				<view class="repayment-footer repayment-footer1" v-else>- 暂无记录 -</view>
	
			</view>
		</view>
	</view>
</template>
<script setup>
	import { ref, watch, version, onMounted, onUpdated, computed } from 'vue';
	import { route } from '@/utils/data'
	import { repayQuery } from "@/apis/quota";

	const repaymentList = ref([])
	const currentYear = `${new Date().getFullYear()}`
	const year = [`${new Date().getFullYear()}`]
	const pickDataFlag = ref(false)
	const count = ref(0)
	const amountSources = ref('')
	const oslAmt = ref('')
	const remainPeriod = ref('')
	
	const plusOne = computed(() => count.value + 1)

	const params = {
		receiptNo: route.query().receiptNo || '',  // this.$route.query.receiptNo || '',
	}
	
	const pickerData = computed(() => {
		console.log('pickerData');
		
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
		console.log('currentYearList');
		return repaymentList.value
		// .filter(v =>  moment(v.repayDate).year()==this.currentYear)
	})
	
	const formatTransDate = computed(() => {
		if (!val) {
			return "--";
		}
		return val
			.slice(0, 8)
			.split("")
			.reduce((result, v, i) => {
				if ([4, 6].includes(i)) {
					result += `-${v}`;
				} else {
					result += v;
				}
				return result;
			}, "");
	})

	const selectYear = () => {
		this.year = [this.currentYear];
		pickDataFlag.value = true;
	}
	const pickData = () => {
		this.currentYear = this.year[0];
		pickDataFlag.value = false;
	}
	const formateMoney = (str) => {
		console.log('str',str)
		if(!str)return '-'
		return str.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
	}
	const formateDate = (str) => {
		return `扣款日 ${moment(str).year()}-${moment(str).month()+1}-${moment(str).date()}`;
	}
	const getList = (params) => {
		repayQuery(params).then((res) => {
			if (res?.code == '0') {
				const {amountSources,oslAmt,remainPeriod} = res.data
				count.value = res.data.total
				// const amountSources = res.data.amountSources;
				amountSources.value = amountSources;
				oslAmt.value = oslAmt;
				remainPeriod.value = remainPeriod;
				console.log('amountSources',amountSources)
				repaymentList.value = ((res.data && res.data || {}).detail || []).reduce((pre, cur, index) => {
					return [
						...pre,
						{
							repayDate: cur.repayDate,
							group: cur.stageNo,
							title: amountSources === '2' ?  `¥ ${this.formateMoney(cur.schedAmtOdi)}` : `¥ ${this.formateMoney(cur.schedAmtAll)}`,
							value: `第${cur.stageNo}期/共${this.count}期`,
							children: [{
								modelVale: index + '',
								label: amountSources === '2' ? `担保费: ${cur.schedAmtOdi || '-'}` :`${cur.schedAmtPri ?('本金: '+(cur.schedAmtPri || '-')+ ' +'):''} 利息: ${cur.schedAmtInt || '-'}`,
								value: this.formateDate(cur.repayDate) || ''
							}]
						}
					]
				}, [])
			} else {
				// alert(res.msg || res.message || res.responseMsg)
			}
		})
	}
	const jumpTo = () => {
		console.log('---');
		alert('敬请期待')
		// handleClick({ targetId:'t0009'}, this)
	}
	
	getList(params);
	
</script>
<style scoped lang="scss">
.pay-plan-wrap {
  overflow-y: auto;
  position: relative;
  height: calc(100% - 46px);
  font-size: 14px;
  .pay-plan {
    height: 100%;
    margin: 0 10px;
    box-sizing: border-box;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 0 10px;
      :deep(.drop-value) {
        .drop-label {
          font-size: 20px;
          font-weight: 600;
        }
        .drop-icon {
          color: #2b4cdd;
        }
      }
      &-total {
        font-size: 14px;
        color: #969799;
        > span {
          color: #2b4cdd;
        }
      }
    }

    .repayment-head {
      // margin-top: 46px;
      height: 84px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // justify-content: flex-end;
      padding: 0 1rem;
      margin: 0 -10px 16px;
      color: #4a4a4a;
      background: #396899;
      .repayment-head-left {
        font-size: 18px;
        display: flex;
        // align-items: center;
        flex-direction: column;
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
        flex-direction: column;;
        .repayment-head-right-num {
          color: #69a5ff;
        }
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
      margin: 1rem 0;
      color: #9b9b9b;

      &.repayment-footer1{
        margin-top: 0.9375rem;
      }
    }

    .btnApply{
      background-color: #0D436F;
      border-color: #0D436F;
      border-radius: 25px;
      margin: 30px 0;
    }
  }
}
</style>