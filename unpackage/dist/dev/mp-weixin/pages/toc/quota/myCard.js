"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_van_nav_bar = common_vendor.resolveComponent("van-nav-bar");
  const _component_LoanResult = common_vendor.resolveComponent("LoanResult");
  const _component_Card = common_vendor.resolveComponent("Card");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_BankCard = common_vendor.resolveComponent("BankCard");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  (_component_van_nav_bar + _component_LoanResult + _component_Card + _component_van_button + _component_BankCard + _component_van_popup)();
}
const _sfc_main = {
  __name: "myCard",
  setup(__props) {
    const bindCardList = ref([]);
    ref([]);
    ref([]);
    const loanResult = ref({});
    ref({});
    const isLoanResult = ref(false);
    const title = ref("我的银行卡");
    const repaymentListArr = ref([]);
    const isShow = ref(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(_ctx.back),
        b: common_vendor.p({
          title: common_vendor.unref(title),
          fixed: true,
          ["left-arrow"]: true
        }),
        c: common_vendor.unref(isLoanResult)
      }, common_vendor.unref(isLoanResult) ? {
        d: common_vendor.p({
          info: common_vendor.unref(loanResult)
        })
      } : {}, {
        e: common_vendor.unref(isLoanResult)
      }, common_vendor.unref(isLoanResult) ? {} : {}, {
        f: common_vendor.f(common_vendor.unref(bindCardList), (item, indx, i0) => {
          return {
            a: indx,
            b: "944910b6-2-" + i0,
            c: common_vendor.p({
              loanCard: true,
              data: item
            })
          };
        }),
        g: common_vendor.unref(isLoanResult)
      }, common_vendor.unref(isLoanResult) ? {
        h: common_vendor.o(_ctx.handleClick),
        i: common_vendor.p({
          block: true,
          type: "primary"
        })
      } : {}, {
        j: common_vendor.o(_ctx.confirm),
        k: common_vendor.p({
          list: common_vendor.unref(repaymentListArr)
        }),
        l: common_vendor.o(($event) => common_vendor.isRef(isShow) ? isShow.value = $event : null),
        m: common_vendor.p({
          closeable: true,
          position: "bottom",
          ["overlay-style"]: {
            backgroundColor: "#cccccc80"
          },
          modelValue: common_vendor.unref(isShow)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/pages/toc/quota/myCard.vue"]]);
wx.createPage(MiniProgramPage);
