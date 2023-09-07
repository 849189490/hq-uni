"use strict";
const common_vendor = require("../../../common/vendor.js");
const apis_my = require("../../../apis/my.js");
require("../../../request/modules/unibase.js");
require("../../../request/utils.js");
require("../../../request/to-uc.js");
require("../../../utils/encrypt.js");
require("../../../utils/dayjs/index.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _component_list = common_vendor.resolveComponent("list");
  (_easycom_uni_card2 + _component_list)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const pageIndex = common_vendor.ref(1);
    const pageSize = common_vendor.ref(10);
    const finished = common_vendor.ref(false);
    const loading = common_vendor.ref(false);
    const error = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    const cardList = common_vendor.ref([]);
    const onLoad = () => {
      apis_my.getMyContract({
        pageIndex: pageIndex.value,
        pageSize: pageSize.value,
        // pagingFlag: true,
        pagingFlag: false,
        orgId: localStorage.getItem("GAMMA-UC-ORGID")
      }).then((res) => {
        if (!res.data.list) {
          loading.value = false;
          error.value = true;
          errorText.value = "暂无数据，点击重新加载";
          return;
        }
        pageIndex.value++;
        loading.value = false;
        cardList.value = [...cardList.value, ...res.data.list];
        cardList.value = cardList.value.reduce((pre, cur) => {
          return [...pre, { ...cur, ...cur.fieldList }];
        }, []);
        if (cardList.value.length === res.data.count || !res.data.count) {
          finished.value = true;
        }
      }).catch((err) => {
        loading.value = false;
        error.value = true;
        errorText.value = "请求失败，点击重新加载";
      });
    };
    const handleClick = (payload) => {
      const id = ((((payload || {}).fieldList || {}).contract_scan_image || [])[0] || {}).attach_im_id || "";
      const mediaType = ((((payload || {}).fieldList || {}).contract_scan_image || [])[0] || {}).attach_suffix === "pdf" ? "pdf" : "img";
      console.log("pppp", id, mediaType);
      if (id) {
        this.getImageUrl("download", `/large-file/download/${id}`, id, mediaType);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !cardList.value.length
      }, !cardList.value.length ? {} : {
        b: common_vendor.f(cardList.value, (item, k0, i0) => {
          return {
            a: item.id_order,
            b: common_vendor.o(($event) => handleClick(item), item.id_order),
            c: "14a3819e-1-" + i0 + ",14a3819e-0",
            d: common_vendor.p({
              cardData: item
            })
          };
        })
      }, {
        c: common_vendor.o(onLoad),
        d: common_vendor.o(($event) => loading.value = $event),
        e: common_vendor.p({
          finished: finished.value,
          error: error.value,
          ["error-text"]: errorText.value,
          modelValue: loading.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/pages/toc/myCard/index.vue"]]);
wx.createPage(MiniProgramPage);
