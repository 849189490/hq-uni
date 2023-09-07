<template>
	<view class="root">
		<!-- <van-nav-bar title="借款记录" left-arrow @click-left="$router.go(-1)" fixed /> -->
		<view class="text">
			<span class="span" v-if="!loanRecordList">暂无数据</span>
		</view>
	</view>
</template>

<script>
	import { ref, watch, version, onMounted, onUpdated } from 'vue';
	
	const loanRecordList = ref([])
	
</script>
	
<style scoped lang="scss">
	.root {
		display: flex;
	}
	.text {
		color: #9b9b9b;
		margin: 20px auto;
	}
	.span {
		// border: 1px solid red;
		height: 23px;
		display: inline-block;
	}
</style>