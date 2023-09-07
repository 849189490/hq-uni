<template>
	<view>
		<view class="my-card-wrap">
			<van-nav-bar :title="title" fixed left-arrow @click-left="back">
			</van-nav-bar>
			<LoanResult v-if="isLoanResult" :info="loanResult" />
			<view v-if="isLoanResult" class="tit">完成确认</view>
			<view class="card-group">
				<Card v-for="(item,indx) in bindCardList" loanCard :data="item" :key="indx"></Card>
			</view>
		</view>
		<view class="btn-content">
		<van-button
			v-if="isLoanResult"
			@click="handleClick"
			class="bottom-button"
			block
			type="primary"
		>提交</van-button>
		<!-- <van-button
			v-if="!isLoanResult"
			@click="handleClick"
			class="bottom-button"
			block
			plain
			type="info"
			icon="plus"
		>添加还款银行卡</van-button> -->
		</view>
		<!-- <view class="bottom-tip">最多添加4张还款卡，需要选择1张主还款卡。</view> -->
		<van-popup
			v-model="isShow"
			closeable
			position="bottom"
			:overlay-style="{ backgroundColor: '#cccccc80' }"
		>
			<BankCard :list="repaymentListArr" @confirm="confirm"></BankCard>
		</van-popup>
	</view>
</template>

<script setup>
	const bindCardList = ref([])
	const loanList = ref([])
	const repaymentList = ref([])
	const loanResult = ref({})
	const orderDetail = ref({})
	const isLoanResult = ref(false)
	const title = ref("我的银行卡")
	const repaymentListArr = ref([])
	const isShow = ref(false)
	
	
</script>

<style scoped lang="scss">

</style>
