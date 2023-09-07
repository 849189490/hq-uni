"use strict";
const request_modules_unibase = require("../request/modules/unibase.js");
require("../common/vendor.js");
require("../utils/encrypt.js");
function logout(data) {
  return request_modules_unibase.request({
    url: "/gamma-qqd/wx/nologin/logout.do",
    method: "POST",
    data
  }, {
    isEncrypt: true
  });
}
function cancellation(data) {
  return request_modules_unibase.request({
    url: "/gamma-uc/uc/cancel",
    method: "POST",
    data
  }, {
    isEncrypt: true
  });
}
exports.cancellation = cancellation;
exports.logout = logout;
