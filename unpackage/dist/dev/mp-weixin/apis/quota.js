"use strict";
const request_modules_unibase = require("../request/modules/unibase.js");
require("../common/vendor.js");
require("../utils/encrypt.js");
function repayQuery(data) {
  return request_modules_unibase.request({
    url: "/gamma-uc/btp/repayQuery",
    method: "POST",
    data
  }, {
    isEncrypt: true
  });
}
exports.repayQuery = repayQuery;
