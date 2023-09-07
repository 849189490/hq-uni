"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/toc/home/index.js";
  "./pages/toc/my/index.js";
  "./pages/toc/login/index.js";
  "./pages/toc/setting/index.js";
  "./pages/toc/noLoginHome/index.js";
  "./pages/toc/quota/loanRecordList.js";
  "./pages/toc/quota/quotaRepaymentRecord.js";
  "./pages/toc/quota/payPlan.js";
  "./pages/toc/quota/myCard.js";
  "./pages/toc/myCard/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  // // tob
  // globalData: {
  //   sceneID: 'S20220104151854218R2222305613',
  // },
  // toc
  globalData: {
    sceneID: "S20220104144928197R3452008444",
    ["GAMMA-UC-LOGIN-TYPE"]: "loginToC"
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
