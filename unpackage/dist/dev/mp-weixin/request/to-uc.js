"use strict";
const common_vendor = require("../common/vendor.js");
const backToUc = () => {
  common_vendor.index.reLaunch({
    url: `${location.origin}/gamma-uc/h5/index.html#/home`
  });
};
exports.backToUc = backToUc;
