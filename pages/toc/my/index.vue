<template>
  <view class="home-wrap">
		<view class="screen">
			<view class="screen-body">
				<view :class="loginType === 'loginToC' ? 'top' : 'top top1'">
					<view class="infoBox topBox">
						<view class="left">
							<image class="img image-padding" src='@/static/image/hq/none-avatar.svg' />
							<MyAvatar></MyAvatar>
							<view class="mid">
								<p class="title">尊贵的客户</p>
								<span v-if="userInfo.mobileNo" class="tip">{{userInfo.mobileNo}}</span>
							</view>
						</view>
						<uni-icons type="gear-filled" size="30" color="#FFFFFF" class="setIcon" @click="jumpTo(setUrl)"/>
						<!-- <view class="qr-arrow" v-if="loginType === 'loginToB'" @click="goToVisiting" >
							<uni-icon name="qr"  size="18px" :style="{marginRight:'12px'}"/>
							<uni-icon name="arrow" size="20px" />
						</view> -->
					</view>
				</view>
				<ul class="nav" v-if="loginType === 'loginToC'">
					<li v-for="(item) in navList" :key="item.name" @click="jumpTo(item)" class="navBox">
						<view :class="item.icon" />
						<span class="navName">{{item.name}}</span>
					</li>
				</ul>
				<view :class="loginType === 'loginToC' ? 'card' : 'card card1'">
					<cell
						v-for="(item) in cardList1"
						:key="item.name"
						@click="jumpTo(item)"
						class="cardBox"
					>
						<view class="cardBox_tem">
							<view :class="item.icon" />
							<span class="custom-title">{{item.name}}</span>
						</view>
						<uni-icons type="forward" color="#969799" class="forward"/>
					</cell>
				</view>
			</view>
		</view>
  </view>
</template>

<script lang="ts" setup>
	import { ref, watch, version, onMounted, onUpdated } from 'vue';
	import { getJlList, orderQuery } from '@/apis/my'
	import MyAvatar from './myAvatar';

	const setUrl = { url: '/pages/toc/setting/index'}
	// const avatarInfo = [
	// 		url: '../../assets/check.png',
	// 		// status: 'uploading',
	// 		// message: '上传中...'
	// 	}
	// ]
	const userInfoList = uni.getStorageSync('businessInfo');
	// const loginType = localStorage.getItem("GAMMA-UC-LOGIN-TYPE");
	const loginType = getApp().globalData['GAMMA-UC-LOGIN-TYPE'];
	console.log(loginType, 'loginType>');
	const userInfo = ref({
		img: "",
		cnName: '',
		mobileNo: '',
	})
	const navList = [
		{
			icon: "borrowRecord iconBox",
			name: "借款记录",
			// url: "/loanRecordList"
			url: "/pages/toc/quota/loanRecordList"
		},
		{
			icon: "repayRecord iconBox",
			name: "还款记录",
			url: "/pages/toc/quota/quotaRepaymentRecord"
		},
		{
			icon: "repayPlan iconBox",
			name: "还款计划",
			url: "/pages/toc/quota/payPlan"
		},
		{
			icon: "myCard iconBox",
			name: "我的银行卡",
			key: "myCard",
			url: "/pages/toc/quota/myCard"
		}
	]
	const cardList1 = [
		{
			icon: "myContract iconBox",
			name: "我的合同",
			url: "/pages/toc/my-contract/index"
		},
		{
			icon: "certificate iconBox",
			name: "结清证明",
			url: "/pages/toc/settleProve/settleProve"
		},
		{
			icon: "bill iconBox",
			name: "发票服务",
			url: "/bill"
		}
	]
	const cardList2 =  [
		{
			icon: "myScan iconBox",
			name: "产品二维码",
			url: "/hq/myScan"
		},
		{
			icon: "myTask iconBox",
			name: "我的任务",
			url: "/hqm/myTask"
		},
		{
			icon: "myOrder iconBox",
			name: "订单管理",
			url: "/hqm/myOrder"
		}
	]
	let cardList = []
	let jlList = []
	
	
	onUpdated(()=> {
		console.log('onUpdated> 状态变更更新Dom后');
	})
	if (loginType === "loginToC") {
		cardList = cardList1;
		getJlList().then(res => {
			jlList = (res.data || []).map(item => ({
				...item,
				managerMobileNo: item.managerMobileNo
				// managerMobileNo: this.formatMobile(item.managerMobileNo)
			}));
		});
		orderQuery().then((res) => {
			if (res.code == 0) {
				const loanRecordList = res.data || []
				localStorage.setItem('loanRecordList', JSON.stringify(loanRecordList))
				// localStorage.getItem('loanRecordList')
			}
		})
	} else {
		cardList = cardList2;
	}
	const noPassByName = (str) => {
		const len = str.length;
		if (len === 0) return "";
		if (len <= 2) {
			return str.substr(0, 1) + "*";
		} else {
			return (
				str.substr(0, 1) + "*".repeat(len - 2) + str.substr(len - 1, len)
			);
		}
	}
	
	onMounted(() => {
		console.log(version, 'version>');
		console.log('onMounted> 组件挂载完成后' , );
		
		userInfo.value = ({
			...userInfo.value,
			cnName: noPassByName(userInfoList.cnName || ''),
			mobileNo: (userInfoList.mobileNo || '').replace(
				/^(\d{3})\d{4}(\d+)/,
				"$1****$2"
			)
		})
	})
	watch(userInfo.value,
	(val) => {
		console.log(val, userInfo, 'watch>');
	
	})
	const jumpTo = (item: any) => {
		console.log(item, 'jumpTo>');
		const isAndroid = navigator?.userAgent?.includes("ToCred_Android");
		if (item.key === "myCard"&&isAndroid) {
			const url = `${window.location.origin}/gamma-uc/h5/index.html#/hq/myCard`
			// goToNewApplyWeb(url)
		} else {
			uni.navigateTo({
				url: item.url
			});
			
			// this.$router.push({
			// 	path: item.url
			// 	// query: {
			// 	//   name: this.name,
			// 	// }
			// });
		}
	}

</script>

<style scoped lang="scss">
	:deep(.uni-page-head) {
		background-color: #1c67a6 !important;
	}
	:deep(.uni-page-head-bd) {
		color: #F8F8F8;
	}
	.home-wrap {
		width: 100%;
	}
	.screen {
		position: relative;
		background: #f4f4f4;
		// height: 100%;
		height: calc(100% - 46px);
		// padding-top: 46px;
		overflow: auto;
	}
	.screen-body {
		margin-bottom: 80px;
		.qr-arrow{
			display: flex;
			align-items: center;
			color:#fff;
		}
		.top {
			width: 100%;
			height: 193px;
			background: url("../../../static/image/hq/my-top-bg.png") center center no-repeat;
			background-size: 100% 100%;
			.topBox {
				width: 100%;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 20px 15px;

				.left {
					display: flex;
					justify-content: center;
				}

				&.infoBox {
					.left {
						.img {
							width: 78px;
							height: 78px;
							margin-right: 9px;
							border-radius: 4px;
						}
						.image-padding {
							box-sizing: border-box;
							padding: 24px;
							background: #F9F9F9;

						}
						.mid {
							color: #fff;
							margin: 11px 0;

							.title {
								margin: 0 0 5px 0;
								font-size: 20px;
							}
							.tip {
								font-size: 12px;
								border-radius: 10px;
								background: rgba(255, 255, 255, 0.3);
								padding: 4px 13px;
							}
						}
					}
				}

				&.noLoginBox {
					padding: 7px 8px;
					background: #fff;

					.left {
						.topLeft {
							font-size: 24px;
							margin-top: 8px;
							margin-right: 10px;
						}

						.mid {
							.title {
								margin: 0;
								font-size: 15px;
								font-weight: 500;
							}
							.tip {
								font-size: 12px;
							}
						}

						.right {
							margin-left: 15px;
							background-color: #aaa;
							border-color: #aaa;
							height: 90%;
						}
					}

					.setIcon {
						margin-top: 8px;
						font-size: 24px;
					}
				}
			}

			&.top1 {
				height: 115px;
				background-size: inherit;
			}
		}
		.nav {
			width: calc(100% - 30px);
			margin: -70px 15px 5px;
			height: 90px;
			display: flex;
			justify-content: space-around;
			background: #fff;
			padding: 15px 0;
			box-sizing: border-box;
			border-radius: 8px;
			font-size: 12px;
			box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
			color: #333;

			.navBox {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				.iconBox {
					width: 25px;
					height: 25px;
					margin-bottom: 8px;

					&.borrowRecord {
						background: url("../../../static/image/hq/my-icon2.png") center center
							no-repeat;
						background-size: 100% 100%;
					}
					&.repayRecord {
						background: url("../../../static/image/hq/my-icon3.png") center center
							no-repeat;
						background-size: 100% 100%;
					}
					&.repayPlan {
						background: url("../../../static/image/hq/my-icon4.png") center center
							no-repeat;
						background-size: 100% 100%;
					}
					&.myCard {
						background: url("../../../static/image/hq/my-icon5.png") center center
							no-repeat;
						background-size: 100% 100%;
					}
				}
			}
		}
		.card {
      width: calc(100% - 30px);
      margin: 0 15px;
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: 14px;

      .cardBox {
        width: 100%;
        height: 64px;
        margin: 5px 0;
        display: flex;
        align-items: center;
        border-radius: 8px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
				background-color: #fff;
        .cardBox_tem {
          display: flex;
          justify-content: flex-start;
					width: 90%;
          .iconBox {
            width: 25px;
            height: 25px;
            margin: 0 13px;
            &.myContract {
              background: url("../../../static/image/hq/my-icon6.png") center center
                no-repeat;
              background-size: 100% 100%;
            }
            &.certificate {
              background: url("../../../static/image/hq/my-icon7.png") center center
                no-repeat;
              background-size: 100% 100%;
            }
            &.bill {
              background: url("../../../static/image/hq/my-icon8.png") center center
                no-repeat;
              background-size: 100% 100%;
            }
            &.refinance {
              background: url("../../../static/image/hq/my-icon9.png") center center
                no-repeat;
              background-size: 100% 100%;
            }
            &.defer {
              background: url("../../../static/image/hq/my-icon10.png") center center
                no-repeat;
              background-size: 100% 100%;
            }
            &.myScan {
              background: url("../../../static/image/hq/my-icon12.png") center center
                no-repeat;
              background-size: 100% 100%;
            }
            &.myTask {
              background: url("../../../static/image/hq/my-icon13.png") center center
                no-repeat;
              background-size: 100% 100%;
            }
            &.myOrder {
              background: url("../../../static/image/hq/my-icon14.png") center center
                no-repeat;
              background-size: 100% 100%;
            }
          }

          .custom-title {
            line-height: 25px;
          }
					
					.forward {
						float: right;
					}
        }
      }

      &.card1 {
        margin: 10px 15px 5px;
      }
    }
	}
</style>
