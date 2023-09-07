"use strict";
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
exports.route = route;
