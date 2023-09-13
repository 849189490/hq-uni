<template>
	<view class="settle-wrapper">
		<list
			v-model="loading"
			:finished="finished"
			:error.sync="error"
			:error-text="errorText"
			@load="onLoad"
		>
			<view class="text">
				<span class="span" v-if="!cardList.length">暂无内容</span>
				<uni-card
					v-else
					v-for="item of cardList"
					:key="item.id_order"
					:cardData="item"
					@titleClick="handleClick(item)"
				/>
			</view>
		</list>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { getMyContract, querySign, getTicket, getTicket1 } from '@/apis/my';
	
	const pageIndex = ref(1)
	const pageSize = ref(10)
	const finished = ref(false)
	const loading = ref(false)
	const error = ref(false)
	const errorText = ref("")
	const cardList = ref([])
	
	const onLoad = () => {
		getMyContract({
			pageIndex: pageIndex.value,
			pageSize: pageSize.value,
			// pagingFlag: true,
			pagingFlag: false,
			orgId: localStorage.getItem('GAMMA-UC-ORGID'),
		})
			.then((res) => {
				if (!res.data.list) {
					loading.value= false;
					error.value= true;
					errorText.value= "暂无数据，点击重新加载";
					return;
				}
				pageIndex.value++;
				loading.value= false;
				cardList.value= [...cardList.value, ...res.data.list];
				cardList.value= cardList.value.reduce((pre, cur) => {
					return [ ...pre, {...cur,...cur.fieldList}]
				},[])
				if (cardList.value.length === res.data.count || !res.data.count) {
					finished.value= true
				}
			})
			.catch((err) => {
				loading.value= false;
				error.value= true;
				errorText.value= "请求失败，点击重新加载";
			});
	}

	//获取签
	const getSign = (type, url) => {
		return querySign({
			type: type,
			url: url
		})
	}
	//获取ticket
	// const getTicket = (queryObj) => {
	// 	return getTicket(queryObj)
	// }
	const getImageUrl = async(type, url, id, mediaType) => {
		try {
			const params = {
				url: `/large-file/download/${id}`,
			}
			let ticket = await getTicket1(params);
			console.log('ttt',ticket)
				uni.navigateTo({
					url: `pages/toc/show-pdf?title=我的合同?ticket=${ticket.data.ticket}?id=${id}?type=${mediaType}`
				});
		} catch (error) {
			console.log(error)
		}
	}
	const handleClick = (payload) => {
		// const id = ((((payload || {}).fieldList || {}).contract_scan_image || [])[0] || {}).attach_im_id || '';
		// const mediaType = ((((payload || {}).fieldList || {}).contract_scan_image || [])[0] || {}).attach_suffix === 'pdf' ? 'pdf' : 'img';
		const img = payload?.fieldList?.contract_scan_image || [];
		const id = img[0]?.attach_im_id || '';
		const mediaType = img[0]?.attach_suffix === 'pdf' ? 'pdf' : 'img';
		
		console.log('pppp',id, mediaType)
		if(id){
			this.getImageUrl('download', `/large-file/download/${id}`, id, mediaType)
		}
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
.settle-wrapper {
  position: relative;
  height: calc(100% - 46px);
  overflow-y: auto;
  background: #fff;
}
</style>
