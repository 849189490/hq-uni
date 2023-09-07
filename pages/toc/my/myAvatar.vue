<template>
	<view class="my-avatar">
		<van-nav-bar title="头像" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
			<template #right>
				<van-icon name="more-o" size="18" />
			</template>
		</van-nav-bar>
		
	</view>
</template>

<script setup>
	import { mapActions, mapGetters } from "vuex";
	import { computed, reactive, ref} from 'vue';
	
	const show = ref(true)
	const sheetIsShow = ref(false)
	// const actions = reactive([{ name: "修改头像", value: "1" }])
	const src = ref("")
	
	const documentId = computed(() => {
		return this.businessInfo.fileId || "";
	})
	
	const inAndroidApp = computed(() => {
		// get() {
			return navigator.userAgent.includes("ToCred_Android")
		// }
		// set(val) {}
	})
	
	const onClickLeft = () => {
		console.log('onClickLeft');
		if(this.inAndroidApp){
				closeAllPage()
		}else{
			// this.$router.go(-1);
			uni.navigateBack();
		}
	}
</script>

<style lang="scss" scoped>
.my-avatar {
  height: 100%;
  background: #000;
  .van-nav-bar {
    background: #000;

    &::after {
      display: none;
    }
    :deep(.van-icon) {
      color: #fff;
    }
    :deep(.van-nav-bar__title) {
      color: #eee;
    }
  }
  .self-image {
    width: 100vw;
    height: 100vw;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    outline: none;
    background: #f9f9f9;
  }
  .image-padding {
    box-sizing: border-box;
    padding: 40px;
  }
  .my-uploader {
    position: absolute;
    visibility: hidden;
  }
}
</style>
