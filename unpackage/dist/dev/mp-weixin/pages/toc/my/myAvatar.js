"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  const _component_van_nav_bar = common_vendor.resolveComponent("van-nav-bar");
  (_component_van_icon + _component_van_nav_bar)();
}
const _sfc_main = {
  __name: "myAvatar",
  setup(__props) {
    common_vendor.ref(true);
    common_vendor.ref(false);
    common_vendor.ref("");
    common_vendor.computed(() => {
      return this.businessInfo.fileId || "";
    });
    common_vendor.computed(() => {
      return navigator.userAgent.includes("ToCred_Android");
    });
    const onClickLeft = () => {
      console.log("onClickLeft");
      if (this.inAndroidApp) {
        closeAllPage();
      } else {
        this.$router.go(-1);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "more-o",
          size: "18"
        }),
        b: common_vendor.o(onClickLeft),
        c: common_vendor.o(_ctx.onClickRight),
        d: common_vendor.p({
          title: "头像",
          ["left-arrow"]: true
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3620af33"], ["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/pages/toc/my/myAvatar.vue"]]);
wx.createComponent(Component);
