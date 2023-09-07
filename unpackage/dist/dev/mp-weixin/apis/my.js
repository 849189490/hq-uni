"use strict";
const request_modules_unibase = require("../request/modules/unibase.js");
require("../common/vendor.js");
require("../utils/encrypt.js");
function getJlList() {
  return request_modules_unibase.request({
    url: "/gamma-uc/uc/queryManagerList",
    method: "GET"
  }, {
    isEncrypt: true
  });
}
function orderQuery(data) {
  return request_modules_unibase.request({
    url: "/gamma-uc/btp/orderQuery",
    method: "POST",
    data
  }, {
    isEncrypt: true
  });
}
function getMyContract(data) {
  return request_modules_unibase.request({
    url: "/gamma-uc/uc/myContract",
    method: "POST",
    data
  });
}
exports.getJlList = getJlList;
exports.getMyContract = getMyContract;
exports.orderQuery = orderQuery;
