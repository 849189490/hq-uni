"use strict";
const common_vendor = require("../../../common/vendor.js");
const apis_setting = require("../../../apis/setting.js");
require("../../../request/modules/unibase.js");
require("../../../request/utils.js");
require("../../../request/to-uc.js");
require("../../../utils/encrypt.js");
require("../../../utils/dayjs/index.js");
if (!Array) {
  const _component_cell = common_vendor.resolveComponent("cell");
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  (_component_cell + _easycom_uni_group2)();
}
const _easycom_uni_group = () => "../../../uni_modules/uni-group/components/uni-group/uni-group.js";
if (!Math) {
  _easycom_uni_group();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const cellData = common_vendor.ref([
      {
        group: "bbb",
        title: "修改密码/手机",
        children: [
          {
            title: "修改密码",
            value: "bbbb"
          },
          {
            title: "修改手机号",
            value: "cccc"
          }
        ]
      },
      {
        group: "ccc",
        title: "其他",
        children: [
          {
            title: "隐私政策协议",
            value: "aaaaa"
          }
        ]
      }
    ]);
    const handleItemClick = (date) => {
      console.log("handleItemClick>", date);
      if (date.value === "aaaaa") {
        console.log(12);
      }
      if (date.value === "bbbb") {
        this.$route.query;
      }
      if (date.value === "cccc")
        ;
    };
    const handleLogin = (date) => {
      console.log("handleLogin>");
      const params = {
        token: common_vendor.api.get("token") || common_vendor.api.get("Authorization")
      };
      apis_setting.logout(params).then((res) => {
        jumpTo();
      });
    };
    const handleCancel = (date) => {
      console.log("cancellation>");
      common_vendor.index.showToast({
        title: "注销账号无法找回，请慎重考虑！"
      }).then(() => {
        apis_setting.cancellation().then((res) => {
          if (res.code === "0") {
            common_vendor.index.showToast({ title: "注销成功" });
            this.jumpTo();
          }
        });
      });
    };
    const jumpTo = () => {
      common_vendor.index.navigateTo({
        url: `/pages/toc/no-login-home/index`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(cellData.value, (item, idx, i0) => {
          return {
            a: common_vendor.f(item.children, (itemChild, index, i1) => {
              return {
                a: common_vendor.t(itemChild.title),
                b: common_vendor.n(index === 0 && item.children.length > 1 ? "border" : ""),
                c: common_vendor.o(($event) => handleItemClick(itemChild), itemChild.value),
                d: "b87a6dae-1-" + i0 + "-" + i1 + "," + ("b87a6dae-0-" + i0),
                e: itemChild.value
              };
            }),
            b: idx,
            c: "b87a6dae-0-" + i0,
            d: common_vendor.p({
              title: item.title
            })
          };
        }),
        b: common_vendor.o(handleLogin),
        c: common_vendor.o(handleCancel)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b87a6dae"], ["__file", "/Users/mbp/Documents/item/HBuilderX/hq-uni/pages/toc/setting/index.vue"]]);
wx.createPage(MiniProgramPage);
