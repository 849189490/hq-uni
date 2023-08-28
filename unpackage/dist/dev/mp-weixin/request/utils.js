"use strict";
const common_vendor = require("../common/vendor.js");
const request_toUc = require("./to-uc.js");
const utils_encrypt = require("../utils/encrypt.js");
const responseHandle = (res, isMessage) => {
  var _a;
  if (`${res.code}` === "0000" || `${res.code}` === "0" || `${res.responseCode}` === "000000") {
    isMessage && common_vendor.index.showToast({
      title: res.message
    });
    if (res.encode) {
      return utils_encrypt.decodeUCResponse(res.data);
    }
    if (res.responseData) {
      if (res.responseEncode) {
        return utils_encrypt.processResponse(res.responseData);
      }
      return res.responseData;
    }
    return res.data;
  }
  if (`${res.respHeader}` && `${(_a = res.respHeader) == null ? void 0 : _a.respCode}` === "200") {
    isMessage !== false && common_vendor.index.showToast({
      title: res.respHeader.respMsg
    });
    if (res.encode == true) {
      return utils_encrypt.decodeUCResponse(res.data);
    }
    return res.data;
  }
  if (`${res.rtCode}` === "E000000") {
    return res.resArr;
  } else if (`${res.code}` === "9999") {
    const message = res.message || res.msg || res.retMessage || res.responseMessage || JSON.stringify(res);
    isMessage !== false && common_vendor.index.showToast({
      title: message,
      icon: "error",
      duration: 2 * 1e3
    });
    return Promise.reject(message);
  } else if (`${res.code}` === "9900" || `${res.code}` === "-5" || `${res.code}` === "000002" || `${res.code}` === "000003" || `${res.code}` === "000004") {
    request_toUc.backToUc();
    return;
  } else {
    const message = res.message || res.msg || res.retMessage || JSON.stringify(res);
    common_vendor.index.showToast({
      title: message,
      icon: "error",
      duration: 3 * 1e3
    });
    return Promise.reject(message);
  }
};
const rejectHandle = (error) => {
  if (error.response) {
    if (error.response.status && error.response.status === 504 || error.message === "Network Error" || error.message === "Request failed with status code 504" || error.message === "timeout of 15000ms exceeded") {
      error.message = "NetworkError";
    } else if (typeof error === "string" && error.indexOf("Network Error") != -1) {
      error = "SystemError";
    } else if (error.response.status && error.response.status === 500) {
      error.message = error.response.data && error.response.data.message || "public.UnknownError";
    }
    common_vendor.index.showToast({
      title: error.message || error.response.message || error.response.data.message,
      icon: "error",
      duration: 3 * 1e3
    });
  } else if (error.request) {
    common_vendor.index.showToast({
      title: "NetworkError",
      icon: "error",
      duration: 3 * 1e3
    });
  } else {
    common_vendor.index.showToast({
      title: error.message || "public.SystemError",
      icon: "error",
      duration: 3 * 1e3
    });
  }
  return Promise.reject(error);
};
exports.rejectHandle = rejectHandle;
exports.responseHandle = responseHandle;
