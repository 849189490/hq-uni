<template>
	<div class="settle-wrapper">
	    <list
	      v-model="loading"
	      :finished="finished"
	      :error.sync="error"
	      :error-text="errorText"
	      @load="onLoad"
	    >
			<view class="text">
				<span class="span" v-if="!cardList.length">暂无内容</span>
	      <Card v-for="item of cardList" :key="item.settleFile" :cardData="item" @titleClick="handleClick" />
	    </view>
			</list>
	  </div>
</template>

<script>
	import { ref } from 'vue';
	import { mySettleProof, querySign, getTicket, getTicket1 } from '@/apis/my';
	
	export default {
		
	}
</script>

<style>
.text {
	display: flex;
}
.span {
	color: #9b9b9b;
	margin: 20px auto;
	height: 23px;
	display: inline-block;
}
</style>
