"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  props: {
    modelValue: { type: Boolean },
    list: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const changeRadio = () => {
      emit("update:modelValue", !props.modelValue);
    };
    const openFile = (url) => {
      console.log(url);
    };
    return (_ctx, _cache) => {
      return {
        a: __props.modelValue,
        b: common_vendor.o(changeRadio),
        c: common_vendor.f(__props.list, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.privacyAgreementName),
            b: common_vendor.o(($event) => openFile(item.privacyAgreementURL), item.privacyAgreementURL),
            c: item.privacyAgreementURL
          };
        }),
        d: common_vendor.o(changeRadio)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bf788ac4"], ["__file", "/Users/liyang/Desktop/hq/components/privacy-agreement/index.vue"]]);
wx.createComponent(Component);
