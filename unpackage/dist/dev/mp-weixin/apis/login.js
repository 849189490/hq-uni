"use strict";
const request_modules_unibase = require("../request/modules/unibase.js");
require("../common/vendor.js");
require("../utils/encrypt.js");
const getLoginConfig = async () => {
  return request_modules_unibase.request({
    url: "/gamma-uc/config/nologin/getLoginConfig",
    method: "POST",
    data: {
      sceneID: getApp().globalData.sceneID,
      orgCode: "601"
    }
  }, {
    isQs: true
  });
};
function getPublicKey() {
  return request_modules_unibase.request({
    url: "/gamma-qqd/imp/sat/app/common/getPublicKey.do",
    method: "POST",
    data: {
      requestId: (/* @__PURE__ */ new Date()).getTime(),
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
function getImgValid() {
  return request_modules_unibase.request({
    url: "/gamma-qqd/wx/nologin/getImgValid.do",
    method: "POST",
    data: {}
  }, {
    isEncrypt: true
  });
}
function sendSmsOtp(data) {
  return request_modules_unibase.request({
    url: "/gamma-qqd/wx/nologin/sendSmsOtp.do",
    method: "POST",
    data
  }, {
    isEncrypt: true
  });
}
function login(data) {
  return request_modules_unibase.request({
    url: "/gamma-qqd/wx/nologin/binder.do",
    method: "POST",
    data
  }, {
    isEncrypt: true
  });
}
exports.getImgValid = getImgValid;
exports.getLoginConfig = getLoginConfig;
exports.getPublicKey = getPublicKey;
exports.login = login;
exports.sendSmsOtp = sendSmsOtp;
