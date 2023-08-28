import request from '@/request'
export const getLoginConfig = async () => {
  return request({
    url: '/gamma-uc/config/nologin/getLoginConfig',
    method: 'POST',
    data: {
      sceneID: getApp().globalData.sceneID,
      orgCode: '601',
    }
  }, {
    isQs: true,
  })
}
export function getPublicKey() {
  return request({
    url: "/gamma-qqd/imp/sat/app/common/getPublicKey.do",
    method: "POST",
    data: {
      requestId: new Date().getTime(),
      sign: "",
      encodeKey: "",
      platform: "H5",
      version: "1.0",
      encodeKeyEncrytMethod: "RSA",
      requestDataEncrytMethod: "AES",
      requestData: JSON.stringify({ publicKeyType: "01" })
    }
  });
}
// 获取图形验证码
export function getImgValid() {
  return request({
    url: "/gamma-qqd/wx/nologin/getImgValid.do",
    method: "POST",
    data: {}
  }, {
    isEncrypt: true
  })
}
// 发送短信验证码
export function sendSmsOtp(data: Record<string, any>) {
  return request({
    url: "/gamma-qqd/wx/nologin/sendSmsOtp.do",
    method: "POST",
    data,
  }, {
    isEncrypt: true
  })
}
export function login(data: Record<string, any>) {
  return request({
    url: "/gamma-qqd/wx/nologin/binder.do",
    method: "POST",
    data,
  }, {
    isEncrypt: true
  })
}