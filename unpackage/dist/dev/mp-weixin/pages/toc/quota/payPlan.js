"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_data = require("../../../utils/data.js");
const apis_quota = require("../../../apis/quota.js");
require("../../../request/modules/unibase.js");
require("../../../request/utils.js");
require("../../../request/to-uc.js");
require("../../../utils/encrypt.js");
require("../../../utils/dayjs/index.js");
if (!Array) {
  const _component_cell = common_vendor.resolveComponent("cell");
  _component_cell();
}
const _sfc_main = {
  __name: "payPlan",
  setup(__props) {
    const repaymentList = common_vendor.ref([]);
    `${(/* @__PURE__ */ new Date()).getFullYear()}`;
    const year = [`${(/* @__PURE__ */ new Date()).getFullYear()}`];
    const pickDataFlag = common_vendor.ref(false);
    const count = common_vendor.ref(0);
    const amountSources = common_vendor.ref("");
    const oslAmt = common_vendor.ref("");
    const remainPeriod = common_vendor.ref("");
    common_vendor.computed(() => count.value + 1);
    const params = {
      receiptNo: utils_data.route.query().receiptNo || ""
      // this.$route.query.receiptNo || '',
    };
    const pickerData = common_vendor.computed(() => {
      console.log("pickerData");
      const year2 = (/* @__PURE__ */ new Date()).getFullYear();
      const result = [];
      for (let i = year2 - 50; i <= year2 + 50; i++) {
        result.push({
          name: `${i}年`,
          value: `${i}`
        });
      }
      return result;
    });
    const currentYearList = common_vendor.computed(() => {
      console.log("currentYearList");
      return repaymentList.value;
    });
    common_vendor.computed(() => {
      if (!val) {
        return "--";
      }
      return val.slice(0, 8).split("").reduce((result, v, i) => {
        if ([4, 6].includes(i)) {
          result += `-${v}`;
        } else {
          result += v;
        }
        return result;
      }, "");
    });
    const pickData = () => {
      this.currentYear = this.year[0];
      pickDataFlag.value = false;
    };
    const formateMoney = (str) => {
      console.log("str", str);
      if (!str)
        return "-";
      return str.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
    };
    const getList = (params2) => {
      apis_quota.repayQuery(params2).then((res) => {
        if ((res == null ? void 0 : res.code) == "0") {
          const { amountSources: amountSources2, oslAmt: oslAmt2, remainPeriod: remainPeriod2 } = res.data;
          count.value = res.data.total;
          amountSources2.value = amountSources2;
          oslAmt2.value = oslAmt2;
          remainPeriod2.value = remainPeriod2;
          console.log("amountSources", amountSources2);
          repaymentList.value = ((res.data && res.data || {}).detail || []).reduce((pre, cur, index) => {
            return [
              ...pre,
              {
                repayDate: cur.repayDate,
                group: cur.stageNo,
                title: amountSources2 === "2" ? `¥ ${this.formateMoney(cur.schedAmtOdi)}` : `¥ ${this.formateMoney(cur.schedAmtAll)}`,
                value: `第${cur.stageNo}期/共${this.count}期`,
                children: [{
                  modelVale: index + "",
                  label: amountSources2 === "2" ? `担保费: ${cur.schedAmtOdi || "-"}` : `${cur.schedAmtPri ? "本金: " + (cur.schedAmtPri || "-") + " +" : ""} 利息: ${cur.schedAmtInt || "-"}`,
                  value: this.formateDate(cur.repayDate) || ""
                }]
              }
            ];
          }, []);
        }
      });
    };
    getList(params);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(amountSources.value === "1" ? "本金" : "担保费"),
        b: common_vendor.t(formateMoney(oslAmt.value) || "-"),
        c: common_vendor.t(remainPeriod.value || "-"),
        d: common_vendor.p({
          data: common_vendor.unref(currentYearList)
        }),
        e: pickDataFlag.value
      }, pickDataFlag.value ? {
        f: common_vendor.o(($event) => pickDataFlag.value = false),
        g: common_vendor.o(pickData),
        h: common_vendor.t(year),
        i: year,
        j: [common_vendor.unref(pickerData)]
      } : {}, {
        k: common_vendor.unref(currentYearList).length
      }, common_vendor.unref(currentYearList).length ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-692d2f80"], ["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/pages/toc/quota/payPlan.vue"]]);
wx.createPage(MiniProgramPage);
