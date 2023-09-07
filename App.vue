<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
    // // tob
    // globalData: {
    //   sceneID: 'S20220104151854218R2222305613',
    // },
    // toc
    globalData: {
      sceneID: 'S20220104144928197R3452008444',
			['GAMMA-UC-LOGIN-TYPE']: 'loginToC'
			
    }
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import '@/static/style/normalize.css';
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
  @import '@/static/iconfont/iconfont.css';
	// 设置整个项目的背景色
	page {
    width: 100%;
    height: 100%;
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
