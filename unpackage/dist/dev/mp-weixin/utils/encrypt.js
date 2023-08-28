"use strict";
const common_vendor = require("../common/vendor.js");
require("./dayjs/index.js");
const site = {
  version: "1.0",
  signMethod: "sha256",
  format: "json",
  secret: "563fc0e9-44b4-475e-90eb-d0b72414d7e1",
  ssoTicket: "a"
};
const ucPublic = "oAGtloqrG2FVry1O";
function getAESKey() {
  let key = [];
  for (let i = 0; i < 16; i++) {
    let num = Math.floor(Math.random() * 26);
    let charStr = String.fromCharCode(97 + num);
    key.push(charStr.toUpperCase());
  }
  let result = key.join("");
  return result;
}
const aesPub = getAESKey();
function decodeAES(value, aesPub2) {
  var aeskey = common_vendor.CryptoJS.enc.Utf8.parse(aesPub2);
  var decrypted = common_vendor.CryptoJS.AES.decrypt(value, aeskey, {
    iv: common_vendor.CryptoJS.enc.Utf8.parse("1234567812345678"),
    mode: common_vendor.CryptoJS.mode.CBC,
    padding: common_vendor.CryptoJS.pad.ZeroPadding
  });
  return common_vendor.CryptoJS.enc.Utf8.stringify(decrypted).trim();
}
function decodeUCResponse(data) {
  if (data) {
    if (typeof data == "string") {
      const result = JSON.parse(decodeAES(data, ucPublic));
      return result;
    } else {
      return data;
    }
  }
  return data;
}
function addSign(params) {
  let source = "";
  Object.keys(params).sort().forEach((key) => {
    source += `${key}=${params[key]}, `;
  });
  source = source.slice(0, -2);
  return common_vendor.CryptoJS.SHA256(`{${source}}`).toString(common_vendor.CryptoJS.enc.Hex);
}
function encryptRSA(value) {
  let encryptObj = new common_vendor.JSEncrypt();
  encryptObj.setPublicKey(common_vendor.index.getStorageSync("GAMMA-UC-PUBLICKEY"));
  return encryptObj.encrypt(value);
}
function encryptAES(value, aesPub2) {
  return common_vendor.CryptoJS.enc.Base64.stringify(common_vendor.CryptoJS.AES.encrypt(value, common_vendor.CryptoJS.enc.Utf8.parse(aesPub2), {
    iv: common_vendor.CryptoJS.enc.Utf8.parse("1234567812345678"),
    mode: common_vendor.CryptoJS.mode.CBC,
    padding: common_vendor.CryptoJS.pad.ZeroPadding
  }).ciphertext);
}
function processRequest(params, cfg) {
  const nowtime = /* @__PURE__ */ new Date();
  const timestamp = nowtime.getTime();
  let result = {};
  let requestData = null;
  let encodeKey = null;
  if (cfg.req !== false) {
    requestData = encryptAES(JSON.stringify(Object.assign({}, params)), aesPub);
    encodeKey = encryptRSA(aesPub);
    Object.assign(result, site, {
      requestId: timestamp,
      timestamp: common_vendor.dayjs(nowtime).locale("en-us").format("YYYYMMddHHmmss"),
      requestData,
      encodeKey,
      encodeKeyEncryptMethod: "RSA",
      requestDataEncryptMethod: "AES",
      platform: "H5"
    });
    const sign = addSign(result);
    result.sign = sign;
  } else {
    result = Object.assign(site, params, {
      requestId: timestamp,
      timestamp: common_vendor.dayjs(nowtime).locale("en-us").format("YYYYMMddHHmmss")
    });
  }
  return result;
}
function processResponse(data) {
  if (data) {
    if (typeof data == "string") {
      const result = JSON.parse(decodeAES(data, aesPub));
      return result;
    } else {
      return data;
    }
  }
  return data;
}
exports.decodeUCResponse = decodeUCResponse;
exports.processRequest = processRequest;
exports.processResponse = processResponse;
