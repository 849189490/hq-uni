"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const apis_my = require("../../../apis/my.js");
require("../../../request/modules/unibase.js");
require("../../../request/utils.js");
require("../../../request/to-uc.js");
require("../../../utils/encrypt.js");
require("../../../utils/dayjs/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_cell = common_vendor.resolveComponent("cell");
  (_easycom_uni_icons2 + _component_cell)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (common_vendor.unref(MyAvatar) + _easycom_uni_icons)();
}
const MyAvatar = () => "./myAvatar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const setUrl = { url: "/pages/toc/setting/index" };
    const userInfoList = common_vendor.index.getStorageSync("businessInfo");
    const loginType = getApp().globalData["GAMMA-UC-LOGIN-TYPE"];
    console.log(loginType, "loginType>");
    const userInfo = common_vendor.ref({
      img: "",
      cnName: "",
      mobileNo: ""
    });
    const navList = [
      {
        icon: "borrowRecord iconBox",
        name: "借款记录",
        // url: "/loanRecordList"
        url: "/pages/toc/quota/loanRecordList"
      },
      {
        icon: "repayRecord iconBox",
        name: "还款记录",
        url: "/pages/toc/quota/quotaRepaymentRecord"
      },
      {
        icon: "repayPlan iconBox",
        name: "还款计划",
        url: "/pages/toc/quota/payPlan"
      },
      {
        icon: "myCard iconBox",
        name: "我的银行卡",
        key: "myCard",
        url: "/pages/toc/quota/myCard"
      }
    ];
    const cardList1 = [
      {
        icon: "myContract iconBox",
        name: "我的合同",
        url: "/pages/toc/my-contract/index"
      },
      {
        icon: "certificate iconBox",
        name: "结清证明",
        url: "/pages/toc/settleProve/settleProve"
      },
      {
        icon: "bill iconBox",
        name: "发票服务",
        url: "/bill"
      }
    ];
    common_vendor.onUpdated(() => {
      console.log("onUpdated> 状态变更更新Dom后");
    });
    if (loginType === "loginToC") {
      apis_my.getJlList().then((res) => {
        (res.data || []).map((item) => ({
          ...item,
          managerMobileNo: item.managerMobileNo
          // managerMobileNo: this.formatMobile(item.managerMobileNo)
        }));
      });
      apis_my.orderQuery().then((res) => {
        if (res.code == 0) {
          const loanRecordList = res.data || [];
          localStorage.setItem("loanRecordList", JSON.stringify(loanRecordList));
        }
      });
    }
    const noPassByName = (str) => {
      const len = str.length;
      if (len === 0)
        return "";
      if (len <= 2) {
        return str.substr(0, 1) + "*";
      } else {
        return str.substr(0, 1) + "*".repeat(len - 2) + str.substr(len - 1, len);
      }
    };
    common_vendor.onMounted(() => {
      console.log(common_vendor.version, "version>");
      console.log("onMounted> 组件挂载完成后");
      userInfo.value = {
        ...userInfo.value,
        cnName: noPassByName(userInfoList.cnName || ""),
        mobileNo: (userInfoList.mobileNo || "").replace(
          /^(\d{3})\d{4}(\d+)/,
          "$1****$2"
        )
      };
    });
    common_vendor.watch(
      userInfo.value,
      (val) => {
        console.log(val, userInfo, "watch>");
      }
    );
    const jumpTo = (item) => {
      var _a;
      console.log(item, "jumpTo>");
      const isAndroid = (_a = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : _a.includes("ToCred_Android");
      if (item.key === "myCard" && isAndroid)
        ;
      else {
        common_vendor.index.navigateTo({
          url: item.url
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: userInfo.value.mobileNo
      }, userInfo.value.mobileNo ? {
        c: common_vendor.t(userInfo.value.mobileNo)
      } : {}, {
        d: common_vendor.o(($event) => jumpTo(setUrl)),
        e: common_vendor.p({
          type: "gear-filled",
          size: "30",
          color: "#FFFFFF"
        }),
        f: common_vendor.n(common_vendor.unref(loginType) === "loginToC" ? "top" : "top top1"),
        g: common_vendor.unref(loginType) === "loginToC"
      }, common_vendor.unref(loginType) === "loginToC" ? {
        h: common_vendor.f(navList, (item, k0, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: common_vendor.t(item.name),
            c: item.name,
            d: common_vendor.o(($event) => jumpTo(item), item.name)
          };
        })
      } : {}, {
        i: common_vendor.f(cardList1, (item, k0, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: common_vendor.t(item.name),
            c: "4f32f56a-3-" + i0 + "," + ("4f32f56a-2-" + i0),
            d: item.name,
            e: common_vendor.o(($event) => jumpTo(item), item.name),
            f: "4f32f56a-2-" + i0
          };
        }),
        j: common_vendor.p({
          type: "forward",
          color: "#969799"
        }),
        k: common_vendor.n(common_vendor.unref(loginType) === "loginToC" ? "card" : "card card1")
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4f32f56a"], ["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/pages/toc/my/index.vue"]]);
wx.createPage(MiniProgramPage);
