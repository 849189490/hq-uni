<template>
	<view class="setting" v-for="(item, idx) of cellData">
		<uni-group :key="idx" :title="item.title">
			<view v-for="(itemChild, index) in item.children" :key="itemChild.value" >
				<cell class="item" :class="index === 0 && item.children.length >1? 'border': '' " @click="handleItemClick(itemChild)">
					{{itemChild.title}}
				</cell>
			</view>
		</uni-group>
	</view>
	<view color="#ffffff" class="btn" @click="handleLogin"><span>退出</span></view>
	<view color="#ffffff" class="btn" style="marginBottom:20px" @click="handleCancel"><span>注销</span></view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import Cookies from "js-cookie";
	import {logout, cancellation } from "@/apis/setting";
	
	const cellData = ref([
		{
			group: 'bbb',
			title: '修改密码/手机',
			children: [
				{
					title: "修改密码",
					value: "bbbb",
				},
				{
					title: "修改手机号",
					value: "cccc",
				},
			]
		},
		{
			group: 'ccc',
			title: '其他',
			children: [
				{
					title: "隐私政策协议",
					value: "aaaaa",
				},
			]
		}
	])
	const handleItemClick = (date?: any) => {
		console.log('handleItemClick>', date );
		// 点击单元格时触发，会携带当前点击的单元格的信息
		if (date.value === 'aaaaa') {
			console.log(12);
			// 隐私政策协议
			// this.$router.push({
			// 	path: "/privacyPolicy",
			// 	query: {
			// 		id: 0
			// 	}
			// })
		}
		if (date.value === 'bbbb') {
			// 修改密码
			const query = this.$route.query
			// this.$router.push({
			// 	path: "/retrievePassword",
			// 	query: {
			// 		...query,
			// 		title: date.title
			// 	}
			// })
		}
		if (date.value === 'cccc') {
			// 修改手机号码
			// this.$router.push({
			// 	path: "/hq/setting/modifyTel"
			// })
		}
	}
	const handleLogin = (date?: any) => {
		console.log('handleLogin>');
		const params = {
			token: Cookies.get('token') || Cookies.get('Authorization')
		}
		logout(params).then(res => {
			jumpTo();
		})
	}
	const handleCancel = (date?: any) => {
		console.log('cancellation>');
		uni.showToast({
			title: '注销账号无法找回，请慎重考虑！',
		}).then(()=>{
			cancellation().then(res => {
				if(res.code === '0'){
					uni.showToast({title:'注销成功'})
					this.jumpTo();
				}
			})
		})
	}
	const jumpTo = () => {
		uni.navigateTo({
			url: `/pages/toc/no-login-home/index`
		});
	}
</script>

<style  scoped lang="scss">
 :deep(.uni-page-head__title) {
	 max-width: 60%;
	 margin: 0 auto;
	 color: #323233;
	 font-weight: 500;
	 font-size: 16px;
 }
 :deep(.uni-group) {
	 margin-top: 0 !important;
 }
 :deep(.uni-group__content) {
	 padding: 0;
 }
 :deep(.uni-page-head) {
	 background-color: #fff !important;
 }
 :deep(.uni-button:after) {
	 border: none !important;
 }
 .setting {
	 font-size: 14px;
	 font-family: "PingFangSC-Regular";
	 color: #323233
 }
 .border {
	 border-bottom: 1px solid #eee;
 }
 .item {
	 display: block;
	 width: 100%;
	 padding: 10px 16px;
	 line-height: 24px;
 }
 .btn {
	font-size: 14px;
	margin-top: 20px;
	background: rgb(255, 255, 255);
	border-color: rgb(255, 255, 255);
	height: 44px;
	line-height: 44px;
	text-align: center;
	border-radius: 2px;
	cursor: pointer;
 }
</style>
