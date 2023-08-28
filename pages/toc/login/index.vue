<template>
	<view class="container">
    <view class="logo">
      <image class="image" :src="logo" alt="logo" />
      <view class="subtitle">值得信赖的企业融资服务平台</view>
    </view>
    <!-- 密码登录 -->
		<template v-if="loginMethod === '0'">
      <AwesomeInput v-model="account" placeholder="请输入账号" />
      <AwesomeInput v-model="password" placeholder="请输入密码" type="password" />
    </template>
    <!-- 验证码登录 -->
    <template v-else>
      <AwesomeInput v-model="mobileNo" placeholder="请输入手机号码" />
      <AwesomeInput v-model="imgValidCode" placeholder="请输入图形验证码">
        <template #right>
          <image class="code-image" @click="queryImgValid" width="60" :src="smsCodeImg" alt="" />
        </template>
      </AwesomeInput>
      <AwesomeInput v-model="smsCode" placeholder="请输入验证码">
        <template #right>
          <view v-if="!sendCode" :class="!allowSend && 'send-disabled'" class="send-code" @click="handleSendCode">
            获取验证码
          </view>
          <view v-else class="wait-code">
            {{ remainder }}S
          </view>
        </template>
      </AwesomeInput>
    </template>
    <AwesomePrivacyAgreement style="margin: 30rpx 0;" v-model="checked" :list="privacyAgreement" />
    <AwesomeButtonMain @click="handleLogin">登录</AwesomeButtonMain>
    <view class="switch">
      <text v-if="loginMethod === '0'" @click="loginMethod = '2'">手机验证码登录</text>
      <text v-else @click="loginMethod = '0'">密码登录</text>
      <text v-if="loginMethod === '0'" @click="forgotPwd">忘记密码</text>
    </view>
	</view>
</template>

<script lang="ts" setup>
import logo from '@/static/logo.png'
import { ref, watch } from 'vue'
import { hex2base64 } from '@/utils/hex2base64'
// import { AwesomeInput, AwesomeButtonMain, AwesomePrivacyAgreement } from '@/components'
import AwesomeInput from '@/components/input/index.vue'
import AwesomeButtonMain from '@/components/button-main/index.vue'
import AwesomePrivacyAgreement from '@/components/privacy-agreement/index.vue'
import { getLoginConfig, getImgValid, getPublicKey, sendSmsOtp, login } from '@/apis/login'
// 登录模式，2：手机号，0: 账号
const loginMethod = ref<'0' | '2'>('2')
const wxSceneCode = ref('')
const privacyAgreement = ref({})
// 账号密码登录
const account = ref('')
const password = ref('')
// 手机号码登录
const mobileNo = ref('')
const imgValidCode = ref('')
const smsCode = ref('')
// 图形验证码
const imgValidId = ref('')
const smsCodeImg = ref('')
// 手机验证码
// 当前是否已发送
const sendCode = ref(false)
// 是否允许发送
const allowSend = ref(false)
const smsFlag = ref('')
const remainder = ref(119)
watch(imgValidCode, (val) => {
  if (val?.length === 4) {
    allowSend.value = true
  } else {
    allowSend.value = false
  }
})
const handleSendCode = () => {
  if (!mobileNo.value || !/^1[0-9]{10}$/.test(mobileNo.value)) {
    uni.showToast({
      icon: 'error',
      title: '请输入正确手机号'
    })
    return
  }
  if (!imgValidCode.value) {
    uni.showToast({
      icon: 'error',
      title: '请输入图形验证码'
    })
    return
  }

  sendSmsOtp({
    mobileNo: mobileNo.value,
    otpType: '2',
    imgValidId: imgValidId.value,
    imgValidCode: imgValidCode.value,
    wxSceneCode: wxSceneCode.value,
    userType: 'C'
  }).then(res => {
    console.log(res)
    sendCode.value = true
    smsFlag.value = res.smsFlag
    const timer = setInterval(() => {
      remainder.value = remainder.value - 1
      if (remainder.value <= 0) {
        sendCode.value = false
        clearInterval(timer)
      }
    }, 1000)
  })
}
// 同意协议
const checked = ref(false)
const queryLoginConfig = () => {
  getLoginConfig().then(res => {
    const { appConfig, authData, fpsConfig, qqdConfig } = res.SDKConfig
    uni.setStorageSync('fpsUrl', fpsConfig.fpsServer)
    uni.setStorageSync('orgCode', appConfig.orgCode)
    uni.setStorageSync('jxbClientId', authData.jxbClientId)
    uni.setStorageSync('tenantCode', authData.tenantCode)
    uni.setStorageSync('GAMMA-UC-wxSeneCode', qqdConfig.wx_scene_code)
    wxSceneCode.value = qqdConfig.wx_scene_code
    const privacyAgreementObj = JSON.parse(res.loginConfig)
    privacyAgreement.value = privacyAgreementObj.privacyAgreementList
  })
}

const queryImgValid = () => {
  getImgValid().then(res => {
    imgValidId.value = res.imgValidId
    smsCodeImg.value = `data:image/png;base64,${res.imgValidCode}`
  })
}
if (uni.getStorageSync("GAMMA-UC-PUBLICKEY")) {
  queryLoginConfig()
  queryImgValid()
} else {
  getPublicKey().then(res => {
    const PublicKey = res.publicKey.rsaPublicKey[0]
    uni.setStorageSync("GAMMA-UC-PUBLICKEY", hex2base64(PublicKey))
    queryLoginConfig()
    queryImgValid()
  })
}
const forgotPwd = () => {
  console.log('forgot')
}
const handleLogin = () => {
  let data: Record<string, any> = {
    loginType: loginMethod.value,
    wxSceneCode: wxSceneCode.value
  }
  console.log(data)
  if (loginMethod.value === '0') {
    data = {
      ...data,
      mobilePhone: account.value,
      password: password.value
    }
  } else {
    data = {
      ...data,
      mobilePhone: mobileNo.value,
      imgValidId: imgValidId.value,
      imgValidCode: imgValidCode.value,
      smsFlag: smsFlag.value,
      smsCode: smsCode.value
    }
  }
  console.log(data)
  login(data).then(res => {
    const Authorization = res.userInfo?.authenticateTicket
    const customerId = res.userInfo?.customerId
    uni.setStorageSync('token', Authorization)
    uni.setStorageSync('Authorization', Authorization)
    uni.setStorageSync('GAMMA-UC-USERID', customerId)
    uni.setStorageSync('businessInfo', res.userInfo)
    if (res.userInfo.isNew === '0') {
      console.log('设置密码')
    } 
    // else {
    //   uni.switchTab({
    //     url: '/pages/toc/home/index'
    //   })
    // }
    uni.switchTab({
      url: '/pages/toc/home/index'
    })
  })
}
</script>

<style scoped lang="scss">
.container {
  box-sizing: border-box;
  padding: 20px;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  height: 100%;
  .logo {
    text-align: center;
    margin: 80rpx 0;
    .image {
      width: 500rpx;
      height: 125rpx;;
    }
    .subtitle {
      font-size: 12px;
      color: #a3a3a3;
    }
  }
  :deep(.uni-easyinput) {
    margin-bottom: 50rpx;
  }
  .code-image {
    width: 120rpx;
    height: 60rpx;
  }
  .send-code {
    padding-right: 10rpx;
    color: #579ff8;
  }
  .wait-code {
    padding-right: 10rpx;
    color: #999;
  }
  .send-disabled {
    color: #9a9a9a;
  }
  :deep(.button-wrap) {
    margin-top: 20rpx;
  }
  .switch {
    display: flex;
    justify-content: space-evenly;
    margin-top: 30rpx;
    color: #62a4ff;
    font-size: 24rpx;
  }
}
</style>
