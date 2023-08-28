"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    rawProps: null,
    modelValue: null,
    root: null,
    textAlign: null,
    thousandth: { type: Boolean },
    rightText: null,
    disabled: { type: [Boolean, Function] }
  },
  emits: ["update:modelValue", "onBlur"],
  setup(__props, { emit }) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "4e6b50c4": __props.textAlign
    }));
    const delDot = (val) => {
      if (val === "" || val === void 0 || val === null)
        return "";
      return `${val}`.replace(/,/g, "");
    };
    const addDot = (val) => {
      if (val === "" || val === void 0 || val === null)
        return "";
      if (delDot(val) === "")
        return "";
      const [a, b = ""] = `${val}`.split(".");
      const dec = b ? `.${b}` : b;
      return delDot(a).replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + dec;
    };
    const inputValue = common_vendor.computed(() => {
      if (props.thousandth) {
        return addDot(props.modelValue);
      } else {
        return props.modelValue;
      }
    });
    const handleChange = (val) => {
      emit("update:modelValue", delDot(val));
    };
    const onBlur = (val) => {
      emit("onBlur", val.detail.value);
    };
    const isDisabled = () => {
      var _a;
      let disabled = (_a = props.rawProps) == null ? void 0 : _a.disabled;
      if (props.disabled === true || props.disabled === false) {
        disabled = props.disabled;
      }
      if (disabled instanceof Function) {
        return disabled(props.root);
      } else {
        return disabled || false;
      }
    };
    const setPlaceholder = () => {
      var _a, _b;
      const placeholder = (_a = props.rawProps) == null ? void 0 : _a.placeholder;
      if (!placeholder || ((_b = props.rawProps) == null ? void 0 : _b.disabled)) {
        return "";
      }
      if (placeholder instanceof Function) {
        return placeholder(props.root);
      } else {
        return placeholder;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.rightText
      }, __props.rightText ? {
        b: common_vendor.t(__props.rightText)
      } : {}, {
        c: common_vendor.o(onBlur),
        d: common_vendor.o(handleChange),
        e: common_vendor.s(_ctx.__cssVars()),
        f: common_vendor.p({
          clearable: false,
          modelValue: common_vendor.unref(inputValue),
          placeholder: setPlaceholder(),
          disabled: isDisabled()
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bc93c4a9"], ["__file", "/Users/liyang/Desktop/hq/components/input/index.vue"]]);
wx.createComponent(Component);
