"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../../utils/encrypt.js");
require("../../../utils/dayjs/index.js");
const _sfc_main = {};
if (!Array) {
  const _component_Card = common_vendor.resolveComponent("Card");
  const _component_list = common_vendor.resolveComponent("list");
  (_component_Card + _component_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !_ctx.cardList.length
  }, !_ctx.cardList.length ? {} : {}, {
    b: common_vendor.f(_ctx.cardList, (item, k0, i0) => {
      return {
        a: item.settleFile,
        b: common_vendor.o(_ctx.handleClick, item.settleFile),
        c: "273ee572-1-" + i0 + ",273ee572-0",
        d: common_vendor.p({
          cardData: item
        })
      };
    }),
    c: common_vendor.o(_ctx.onLoad),
    d: common_vendor.o(($event) => _ctx.loading = $event),
    e: common_vendor.p({
      finished: _ctx.finished,
      error: _ctx.error,
      ["error-text"]: _ctx.errorText,
      modelValue: _ctx.loading
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/pages/toc/settleProve/index.vue"]]);
wx.createPage(MiniProgramPage);
