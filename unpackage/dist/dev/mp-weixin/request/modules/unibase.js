"use strict";
const common_vendor = require("../../common/vendor.js");
const request_utils = require("../utils.js");
const utils_encrypt = require("../../utils/encrypt.js");
const baseURL = "";
const baseOptions = {
  method: "POST",
  header: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "*/*"
  },
  timeout: 3e5,
  withCredentials: true,
  data: {},
  url: ""
};
async function request(options, config = {}) {
  const token = common_vendor.index.getStorageSync("token");
  const payload = {
    ...baseOptions,
    ...options,
    url: `${baseURL}${options.url}`,
    header: {
      ...baseOptions.header,
      ...options.header || {},
      Authorization: token,
      token,
      jxbClientId: common_vendor.index.getStorageSync("jxbClientId"),
      lang: "zh-CN"
    }
  };
  const params = { isLoading: true, isError: true, isToken: true, ...config };
  try {
    if (params.isToken) {
      const token2 = common_vendor.index.getStorageSync("token");
      payload.data = { ...payload.data, token: token2 };
    }
    if (params.isQs) {
      payload.header["Content-Type"] = "application/x-www-form-urlencoded";
      payload.data = common_vendor.lib.stringify(payload.data);
    }
    if (params.isEncrypt) {
      payload.data = utils_encrypt.processRequest(payload.data, { req: true });
      console.log(payload.data);
    }
    if (params.isLoading) {
      common_vendor.index.showLoading({
        title: "全力加载中...",
        mask: true
      });
    }
    console.log(payload);
    const data = await common_vendor.index.request(payload);
    params.isLoading && common_vendor.index.hideLoading();
    console.log("------", data);
    const res = await request_utils.responseHandle(data.data, params.isMessage);
    return res;
  } catch (e) {
    params.isLoading && common_vendor.index.hideLoading();
    const error = await request_utils.rejectHandle(e);
    return error;
  }
}
exports.request = request;
