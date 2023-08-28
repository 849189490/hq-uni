"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const utils_hex2base64 = require("../../../utils/hex2base64.js");
const apis_login = require("../../../apis/login.js");
require("../../../request/modules/unibase.js");
require("../../../request/utils.js");
require("../../../request/to-uc.js");
require("../../../utils/encrypt.js");
require("../../../utils/dayjs/index.js");
if (!Math) {
  (AwesomeInput + AwesomePrivacyAgreement + AwesomeButtonMain)();
}
const AwesomeInput = () => "../../../components/input/index.js";
const AwesomeButtonMain = () => "../../../components/button-main/index.js";
const AwesomePrivacyAgreement = () => "../../../components/privacy-agreement/index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const loginMethod = common_vendor.ref("2");
    const wxSceneCode = common_vendor.ref("");
    const privacyAgreement = common_vendor.ref({});
    const account = common_vendor.ref("");
    const password = common_vendor.ref("");
    const mobileNo = common_vendor.ref("");
    const imgValidCode = common_vendor.ref("");
    const smsCode = common_vendor.ref("");
    const imgValidId = common_vendor.ref("");
    const smsCodeImg = common_vendor.ref("");
    const sendCode = common_vendor.ref(false);
    const allowSend = common_vendor.ref(false);
    const smsFlag = common_vendor.ref("");
    const remainder = common_vendor.ref(119);
    common_vendor.watch(imgValidCode, (val) => {
      if ((val == null ? void 0 : val.length) === 4) {
        allowSend.value = true;
      } else {
        allowSend.value = false;
      }
    });
    const handleSendCode = () => {
      if (!mobileNo.value || !/^1[0-9]{10}$/.test(mobileNo.value)) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请输入正确手机号"
        });
        return;
      }
      if (!imgValidCode.value) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请输入图形验证码"
        });
        return;
      }
      apis_login.sendSmsOtp({
        mobileNo: mobileNo.value,
        otpType: "2",
        imgValidId: imgValidId.value,
        imgValidCode: imgValidCode.value,
        wxSceneCode: wxSceneCode.value,
        userType: "C"
      }).then((res) => {
        console.log(res);
        sendCode.value = true;
        smsFlag.value = res.smsFlag;
        const timer = setInterval(() => {
          remainder.value = remainder.value - 1;
          if (remainder.value <= 0) {
            sendCode.value = false;
            clearInterval(timer);
          }
        }, 1e3);
      });
    };
    const checked = common_vendor.ref(false);
    const queryLoginConfig = () => {
      apis_login.getLoginConfig().then((res) => {
        const { appConfig, authData, fpsConfig, qqdConfig } = res.SDKConfig;
        common_vendor.index.setStorageSync("fpsUrl", fpsConfig.fpsServer);
        common_vendor.index.setStorageSync("orgCode", appConfig.orgCode);
        common_vendor.index.setStorageSync("jxbClientId", authData.jxbClientId);
        common_vendor.index.setStorageSync("tenantCode", authData.tenantCode);
        common_vendor.index.setStorageSync("GAMMA-UC-wxSeneCode", qqdConfig.wx_scene_code);
        wxSceneCode.value = qqdConfig.wx_scene_code;
        const privacyAgreementObj = JSON.parse(res.loginConfig);
        privacyAgreement.value = privacyAgreementObj.privacyAgreementList;
      });
    };
    const queryImgValid = () => {
      apis_login.getImgValid().then((res) => {
        imgValidId.value = res.imgValidId;
        smsCodeImg.value = `data:image/png;base64,${res.imgValidCode}`;
      });
    };
    if (common_vendor.index.getStorageSync("GAMMA-UC-PUBLICKEY")) {
      queryLoginConfig();
      queryImgValid();
    } else {
      apis_login.getPublicKey().then((res) => {
        const PublicKey = res.publicKey.rsaPublicKey[0];
        common_vendor.index.setStorageSync("GAMMA-UC-PUBLICKEY", utils_hex2base64.hex2base64(PublicKey));
        queryLoginConfig();
        queryImgValid();
      });
    }
    const forgotPwd = () => {
      console.log("forgot");
    };
    const handleLogin = () => {
      let data = {
        loginType: loginMethod.value,
        wxSceneCode: wxSceneCode.value
      };
      console.log(data);
      if (loginMethod.value === "0") {
        data = {
          ...data,
          mobilePhone: account.value,
          password: password.value
        };
      } else {
        data = {
          ...data,
          mobilePhone: mobileNo.value,
          imgValidId: imgValidId.value,
          imgValidCode: imgValidCode.value,
          smsFlag: smsFlag.value,
          smsCode: smsCode.value
        };
      }
      console.log(data);
      apis_login.login(data).then((res) => {
        var _a, _b;
        const Authorization = (_a = res.userInfo) == null ? void 0 : _a.authenticateTicket;
        const customerId = (_b = res.userInfo) == null ? void 0 : _b.customerId;
        common_vendor.index.setStorageSync("token", Authorization);
        common_vendor.index.setStorageSync("Authorization", Authorization);
        common_vendor.index.setStorageSync("GAMMA-UC-USERID", customerId);
        common_vendor.index.setStorageSync("businessInfo", res.userInfo);
        if (res.userInfo.isNew === "0") {
          console.log("设置密码");
        }
        common_vendor.index.switchTab({
          url: "/pages/toc/home/index"
        });
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(common_assets.logo),
        b: loginMethod.value === "0"
      }, loginMethod.value === "0" ? {
        c: common_vendor.o(($event) => account.value = $event),
        d: common_vendor.p({
          placeholder: "请输入账号",
          modelValue: account.value
        }),
        e: common_vendor.o(($event) => password.value = $event),
        f: common_vendor.p({
          placeholder: "请输入密码",
          type: "password",
          modelValue: password.value
        })
      } : common_vendor.e({
        g: common_vendor.o(($event) => mobileNo.value = $event),
        h: common_vendor.p({
          placeholder: "请输入手机号码",
          modelValue: mobileNo.value
        }),
        i: common_vendor.o(queryImgValid),
        j: smsCodeImg.value,
        k: common_vendor.o(($event) => imgValidCode.value = $event),
        l: common_vendor.p({
          placeholder: "请输入图形验证码",
          modelValue: imgValidCode.value
        }),
        m: !sendCode.value
      }, !sendCode.value ? {
        n: common_vendor.n(!allowSend.value && "send-disabled"),
        o: common_vendor.o(handleSendCode)
      } : {
        p: common_vendor.t(remainder.value)
      }, {
        q: common_vendor.o(($event) => smsCode.value = $event),
        r: common_vendor.p({
          placeholder: "请输入验证码",
          modelValue: smsCode.value
        })
      }), {
        s: common_vendor.o(($event) => checked.value = $event),
        t: common_vendor.p({
          list: privacyAgreement.value,
          modelValue: checked.value
        }),
        v: common_vendor.o(handleLogin),
        w: loginMethod.value === "0"
      }, loginMethod.value === "0" ? {
        x: common_vendor.o(($event) => loginMethod.value = "2")
      } : {
        y: common_vendor.o(($event) => loginMethod.value = "0")
      }, {
        z: loginMethod.value === "0"
      }, loginMethod.value === "0" ? {
        A: common_vendor.o(forgotPwd)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8917eb8f"], ["__file", "/Users/liyang/Desktop/hq/pages/toc/login/index.vue"]]);
wx.createPage(MiniProgramPage);
