import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt'
import dayjs from '@/utils/dayjs'
const site = {
  version: '1.0',
  signMethod: 'sha256',
  format: 'json',
  secret: '563fc0e9-44b4-475e-90eb-d0b72414d7e1',
  ssoTicket: 'a'
}
const ucPublic = 'oAGtloqrG2FVry1O'
// 随机生成16位的aeskey
function getAESKey() {
  let key = [];
  for (let i = 0; i < 16; i++) {
    let num = Math.floor(Math.random() * 26);
    let charStr = String.fromCharCode(97 + num);
    key.push(charStr.toUpperCase());
  }
  let result = key.join('');
  return result;
}
const aesPub = getAESKey();
// aes 数据解密
function decodeAES(value, aesPub) {
  var aeskey = CryptoJS.enc.Utf8.parse(aesPub);
  var decrypted = CryptoJS.AES.decrypt(value, aeskey, {
    iv: CryptoJS.enc.Utf8.parse('1234567812345678'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  return CryptoJS.enc.Utf8.stringify(decrypted).trim();
};
// 解密数据
export function decodeUCResponse(data) {
  if (data) {
    if (typeof data == 'string') {
      const result = JSON.parse(decodeAES(data, ucPublic))
      return result;
    } else {
      return data;
    }
  }
  return data;
}
// 加签
function addSign(params) {
  let source = '';
  Object.keys(params).sort().forEach((key) => {
    source += `${key}=${params[key]}, `;
  });
  source = source.slice(0, -2);
  return CryptoJS.SHA256(`{${source}}`).toString(CryptoJS.enc.Hex);
};
// rsa 加密
function encryptRSA(value) {
  let encryptObj = new JSEncrypt();
  encryptObj.setPublicKey(uni.getStorageSync('GAMMA-UC-PUBLICKEY'))
  return encryptObj.encrypt(value);
};
// aes 参数加密
function encryptAES(value, aesPub) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(aesPub), {
    iv: CryptoJS.enc.Utf8.parse('1234567812345678'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  }).ciphertext);
}
// 加密请求参数
export function processRequest(params, cfg) {
  const nowtime = new Date();
  const timestamp = nowtime.getTime();
  // 业务参数，使用AES加密
  let result = {};
  let requestData = null;
  let encodeKey = null;
  // 加签
  if (cfg.req !== false) {
    requestData = encryptAES(JSON.stringify(Object.assign({}, params)), aesPub)
    encodeKey = encryptRSA(aesPub)
    Object.assign(result, site, {
      requestId: timestamp,
      timestamp: dayjs(nowtime).locale('en-us').format('YYYYMMddHHmmss'),
      requestData,
      encodeKey,
      encodeKeyEncryptMethod: 'RSA',
      requestDataEncryptMethod: 'AES',
      platform: 'H5'
    });
    const sign = addSign(result)
    result.sign = sign
  } else {
    result = Object.assign(site, params, {
      requestId: timestamp,
      timestamp: dayjs(nowtime).locale('en-us').format('YYYYMMddHHmmss')
    })
  }
  return result
}
// 解密数据
export function processResponse(data) {
  if (data) {
    if (typeof data == 'string') {
      const result = JSON.parse(decodeAES(data, aesPub))
      return result
    } else {
      return data
    }
  }
  return data
}