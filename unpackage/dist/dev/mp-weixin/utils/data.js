"use strict";
require("../common/vendor.js");
const route = {
  query: () => {
    var _a;
    const search = ((_a = location.hash) == null ? void 0 : _a.split("?")[1]) ?? "";
    const mapper = search.split("&").reduce((pre, cur) => {
      const [key, value] = cur.split("=");
      return { ...pre, [key]: value };
    }, {});
    return mapper;
  }
};
const toThousands = (num, length) => {
  if (!num && num != 0)
    return "--";
  num = num + "";
  if (num.indexOf(".") > -1) {
    var s = num.split(".")[0];
    var n = num.split(".")[1];
    if (length != void 0) {
      n = n.substr(0, length);
      for (let i = n.length; i < length; i++) {
        n = "" + n + "0";
      }
    }
    if (length === 0) {
      return (s || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    }
    return (s || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + "." + n;
  } else {
    if (length) {
      return Number(num || 0).toFixed(length);
    } else {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    }
  }
};
exports.route = route;
exports.toThousands = toThousands;
