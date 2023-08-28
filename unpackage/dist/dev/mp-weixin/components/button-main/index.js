"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    root: null,
    disabled: { type: [Boolean, Function] },
    label: null,
    icon: null,
    color: null
  },
  emits: ["click"],
  setup(__props, { emit }) {
    const props = __props;
    const handleClick = (e) => {
      emit("click", e);
    };
    const isDisabled = () => {
      const disabled = props.disabled;
      if (disabled instanceof Function) {
        return disabled(props.root);
      } else {
        return disabled || false;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: "icon-" + __props.icon,
          color: __props.color,
          size: "18"
        }),
        b: common_vendor.t(__props.label),
        c: __props.color,
        d: common_vendor.n(isDisabled() && "disabled"),
        e: isDisabled(),
        f: common_vendor.o(handleClick)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-997cc755"], ["__file", "/Users/liyang/Desktop/hq/components/button-main/index.vue"]]);
wx.createComponent(Component);
