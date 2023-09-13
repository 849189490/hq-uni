"use strict";
const common_vendor = require("../../../common/vendor.js");
const mock_index = require("../../../mock/index.js");
const utils_data = require("../../../utils/data.js");
require("../../../mock/modules/order-query.data.js");
require("../../../mock/modules/order-re-payment-flow-schedule.data.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "loanRecordList",
  setup(__props) {
    const loanRecordList = common_vendor.ref([]);
    common_vendor.ref("");
    common_vendor.ref("");
    common_vendor.ref({
      "A": "正常",
      "P": "逾期",
      // 'PRE_CLOSE': '提前结清',
      "C": "结清"
    });
    const formatDateMoment = common_vendor.computed((date) => {
      return date ? common_vendor.hooks(date).format("YYYY-MM-DD") : "";
    });
    const statusMaping = common_vendor.computed(() => (item) => {
      console.log(item, "item>>");
      if (["ZHC"].includes(item.accountingStatus) && ["N", "A", "P"].includes(item.acctStatus)) {
        return "正常";
      } else if (!["ZHC"].includes(item.accountingStatus) && ["N", "A", "P"].includes(item.acctStatus)) {
        return "逾期";
      } else if (["C"].includes(item.acctStatus)) {
        return "结清";
      }
    });
    const getList = () => {
      const mockData = mock_index.useGammaApply();
      console.log("mockData> ", mockData);
      if (mockData) {
        console.log(mockData.data.data, "mockData.data.data>");
        loanRecordList.value = mockData.data.data || [];
      }
    };
    const viewPlan = (item) => {
      console.log(encodeURI(JSON.stringify(item)), "JSON.stringify(item)>>");
      common_vendor.index.navigateTo({
        url: `/pages/toc/pay-plan/index`
        // ?order=` + encodeURI(JSON.stringify(item)) + `receiptNo?=` + item?.receiptNo || ''
      });
    };
    const viewRecord = (item) => {
      console.log("viewRecord");
      common_vendor.index.navigateTo({
        url: `/pages/toc/quota-repayment-record/index?receiptNo?=` + (item == null ? void 0 : item.receiptNo) || ""
      });
    };
    getList();
    console.log(loanRecordList.value, "loanRecordList>");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !loanRecordList.value
      }, !loanRecordList.value ? {
        b: common_vendor.t(!loanRecordList.value)
      } : {}, {
        c: common_vendor.f(loanRecordList.value, (item, i, i0) => {
          return common_vendor.e({
            a: common_vendor.t(common_vendor.unref(statusMaping)(item)),
            b: common_vendor.t(item.loanAmt || common_vendor.unref(utils_data.toThousands)),
            c: common_vendor.t(item.balance || common_vendor.unref(utils_data.toThousands)),
            d: common_vendor.t(item.agreementNo),
            e: item.maturityDate
          }, item.maturityDate ? {
            f: common_vendor.t(item.maturityDate | common_vendor.unref(formatDateMoment))
          } : {}, {
            g: ["A", "P"].includes(item.acctStatus)
          }, ["A", "P"].includes(item.acctStatus) ? {
            h: common_vendor.o(($event) => viewPlan(item), i)
          } : {}, {
            i: common_vendor.o(($event) => viewRecord(item), i),
            j: i,
            k: ["ZHC"].includes(item.accountingStatus) && ["N", "A", "P"].includes(item.acctStatus) ? 1 : "",
            l: !["ZHC"].includes(item.accountingStatus) && ["N", "A", "P"].includes(item.acctStatus) ? 1 : "",
            m: ["C"].includes(item.acctStatus) ? 1 : ""
          });
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2276cd9c"], ["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/pages/toc/quota/loanRecordList.vue"]]);
wx.createPage(MiniProgramPage);
