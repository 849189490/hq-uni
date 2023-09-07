"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const token = common_vendor.ref(common_vendor.index.getStorageSync("token"));
    const gotoLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/toc/login/index"
      });
    };
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 9
      }).then((res) => {
        console.log(res.tempFilePaths);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(token.value),
        b: common_vendor.o(gotoLogin),
        c: common_vendor.o(chooseImage)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/pages/toc/home/index.vue"]]);
wx.createPage(MiniProgramPage);
