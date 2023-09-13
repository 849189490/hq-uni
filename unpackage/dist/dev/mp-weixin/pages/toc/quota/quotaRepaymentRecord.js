"use strict";
const common_vendor = require("../../../common/vendor.js");
const mock_index = require("../../../mock/index.js");
require("../../../mock/modules/order-query.data.js");
require("../../../mock/modules/order-re-payment-flow-schedule.data.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_icons2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const _sfc_main = {
  __name: "quotaRepaymentRecord",
  setup(__props) {
    common_vendor.ref({});
    const repaymentList = common_vendor.ref([]);
    const currentYear = common_vendor.ref(`${(/* @__PURE__ */ new Date()).getFullYear()}`);
    common_vendor.ref(false);
    const activeNames = common_vendor.ref([]);
    const getDate = (type) => {
      const date2 = /* @__PURE__ */ new Date();
      console.log("getDate>>>>>>>", date2);
      let year = date2.getFullYear();
      return `${year}`;
    };
    const date = common_vendor.ref(
      getDate()
    );
    const bindDateChange = (e) => {
      console.log("bindDateChange> ", e, e.detail.value);
      date.value = e.detail.value;
    };
    const bindDateCancel = (e) => {
      console.log("bindDateCancel> ", e.detail.value);
    };
    common_vendor.computed(() => {
      const year = (/* @__PURE__ */ new Date()).getFullYear();
      const result = [];
      for (let i = year - 50; i <= year + 50; i++) {
        result.push({
          name: `${i}年`,
          value: `${i}`
        });
      }
      return result;
    });
    const currentYearList = common_vendor.computed(() => {
      console.log(repaymentList.value, "repaymentList>");
      return (repaymentList.value || []).filter((v) => common_vendor.hooks(v.recycleDate).year() == currentYear.value);
    });
    const formatPayType = common_vendor.computed((val) => {
      if (!val) {
        return "--";
      }
      const map = {
        "A": "系统扣款",
        "M": "主动还款"
      };
      return map[val] || val;
    });
    const getList = (params) => {
      console.log("getList", params);
      const res = mock_index.useGammaORPaymentFlowschedule();
      console.log(res, "res data>");
      if ((res == null ? void 0 : res.code) == "0") {
        console.log(res.data.recArray, "res>");
        repaymentList.value = ((res == null ? void 0 : res.data) || {}).recArray || [];
      }
    };
    getList();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(date.value),
        b: common_vendor.p({
          type: "bottom",
          size: "15",
          color: "#aaa"
        }),
        c: date.value,
        d: common_vendor.o(($event) => bindDateChange($event)),
        e: common_vendor.o(($event) => bindDateCancel($event)),
        f: common_vendor.t(common_vendor.unref(currentYearList).length),
        g: common_vendor.unref(currentYearList).length
      }, common_vendor.unref(currentYearList).length ? {
        h: common_vendor.f(common_vendor.unref(currentYearList), (item, i, i0) => {
          return common_vendor.e({
            a: item.repaidAmtPri && Number(item.repaidAmtPri) !== 0
          }, item.repaidAmtPri && Number(item.repaidAmtPri) !== 0 ? {
            b: common_vendor.t(item.repaidAmtPri)
          } : {}, {
            c: item.repaidAmtInt && Number(item.repaidAmtInt) !== 0
          }, item.repaidAmtInt && Number(item.repaidAmtInt) !== 0 ? {
            d: common_vendor.t(item.repaidAmtInt)
          } : {}, {
            e: item.repaidAmtOdp && Number(item.repaidAmtOdp) !== 0
          }, item.repaidAmtOdp && Number(item.repaidAmtOdp) !== 0 ? {
            f: common_vendor.t(item.repaidAmtOdp)
          } : {}, {
            g: item.pretermPri && Number(item.pretermPri) !== 0
          }, item.pretermPri && Number(item.pretermPri) !== 0 ? {
            h: common_vendor.t(item.pretermPri)
          } : {}, {
            i: item.pretermInt && Number(item.pretermInt) !== 0
          }, item.pretermInt && Number(item.pretermInt) !== 0 ? {
            j: common_vendor.t(item.pretermInt)
          } : {}, {
            k: item.recGrt && Number(item.recGrt) !== 0
          }, item.recGrt && Number(item.recGrt) !== 0 ? {
            l: common_vendor.t(item.recGrt)
          } : {}, {
            m: item.recGrtOdp && Number(item.recGrtOdp) !== 0
          }, item.recGrtOdp && Number(item.recGrtOdp) !== 0 ? {
            n: common_vendor.t(item.recGrtOdp)
          } : {}, {
            o: item.pretermTra && Number(item.pretermTra) !== 0
          }, item.pretermTra && Number(item.pretermTra) !== 0 ? {
            p: common_vendor.t(item.pretermTra)
          } : {}, {
            q: "d6b7f0bb-2-" + i0 + ",d6b7f0bb-1",
            r: common_vendor.p({
              title: "¥" + item.recAmt || _ctx.toThousands,
              value: item.recycleGenerateMode || common_vendor.unref(formatPayType)
            }),
            s: common_vendor.t(item.lastSettleDate || _ctx.formatTransDate),
            t: i
          });
        }),
        i: common_vendor.o(($event) => activeNames.value = $event),
        j: common_vendor.p({
          modelValue: activeNames.value
        })
      } : {}, {
        k: common_vendor.unref(currentYearList).length
      }, common_vendor.unref(currentYearList).length ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6b7f0bb"], ["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/pages/toc/quota/quotaRepaymentRecord.vue"]]);
wx.createPage(MiniProgramPage);
