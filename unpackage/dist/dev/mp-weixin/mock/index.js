"use strict";
const common_vendor = require("../common/vendor.js");
const mock_modules_orderQuery_data = require("./modules/order-query.data.js");
const mock_modules_orderRePaymentFlowSchedule_data = require("./modules/order-re-payment-flow-schedule.data.js");
const Mock = (url, response) => {
  const log = common_vendor.Mockjs.mock({
    "string|1-10": "★"
  });
  console.log(log);
  return common_vendor.Mockjs.mock({
    message: "success",
    code: "0",
    data: response
  });
};
const useGammaApply = () => Mock(/\/gamma-uc\/btp\/orderQuery/, mock_modules_orderQuery_data.orderQueryData);
const useGammaORPaymentFlowschedule = () => Mock(/\/gamma-uc\/btp\/orderRePaymentFlowSchedule/, mock_modules_orderRePaymentFlowSchedule_data.orderRePaymentFlowscheduleData);
exports.useGammaApply = useGammaApply;
exports.useGammaORPaymentFlowschedule = useGammaORPaymentFlowschedule;
