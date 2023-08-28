if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  function requireNativePlugin(name) {
    return weex.requireModule(name);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const token = vue.ref(uni.getStorageSync("token"));
      const gotoLogin = () => {
        uni.navigateTo({
          url: "/pages/toc/login/index"
        });
      };
      const chooseImage = () => {
        uni.chooseMedia({
          count: 9,
          success(res) {
            formatAppLog("log", "at pages/toc/home/index.vue:21", res);
          },
          fail(error) {
            formatAppLog("log", "at pages/toc/home/index.vue:24", error);
          }
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "home-wrap" }, [
          vue.createTextVNode(
            " 首页 " + vue.toDisplayString(token.value) + " ",
            1
            /* TEXT */
          ),
          vue.createElementVNode("button", { onClick: gotoLogin }, "登录"),
          vue.createElementVNode("button", { onClick: chooseImage }, "相机")
        ]);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const PagesTocHomeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "/Users/liyang/Documents/HBuilderProjects/hq/pages/toc/home/index.vue"]]);
  const _sfc_main$7 = {};
  function _sfc_render$2(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "home-wrap" }, " 我的 ");
  }
  const PagesTocMyIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$2], ["__file", "/Users/liyang/Documents/HBuilderProjects/hq/pages/toc/my/index.vue"]]);
  const logo = "/static/logo.png";
  if (!globalThis.atob) {
    var tableStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var table = tableStr.split("");
    globalThis.atob = function(base64) {
      if (/(=[^=]+|={3,})$/.test(base64))
        throw new Error("String contains an invalid character");
      base64 = base64.replace(/=/g, "");
      var n2 = base64.length & 3;
      if (n2 === 1)
        throw new Error("String contains an invalid character");
      for (var i2 = 0, j2 = 0, len = base64.length / 4, bin = []; i2 < len; ++i2) {
        var a2 = tableStr.indexOf(base64[j2++] || "A"), b2 = tableStr.indexOf(base64[j2++] || "A");
        var c2 = tableStr.indexOf(base64[j2++] || "A"), d2 = tableStr.indexOf(base64[j2++] || "A");
        if ((a2 | b2 | c2 | d2) < 0)
          throw new Error("String contains an invalid character");
        bin[bin.length] = (a2 << 2 | b2 >> 4) & 255;
        bin[bin.length] = (b2 << 4 | c2 >> 2) & 255;
        bin[bin.length] = (c2 << 6 | d2) & 255;
      }
      return String.fromCharCode.apply(null, bin).substr(0, bin.length + n2 - 4);
    };
    globalThis.btoa = function(bin) {
      for (var i2 = 0, j2 = 0, len = bin.length / 3, base64 = []; i2 < len; ++i2) {
        var a2 = bin.charCodeAt(j2++), b2 = bin.charCodeAt(j2++), c2 = bin.charCodeAt(j2++);
        if ((a2 | b2 | c2) > 255)
          throw new Error("String contains an invalid character");
        base64[base64.length] = table[a2 >> 2] + table[a2 << 4 & 63 | b2 >> 4] + (isNaN(b2) ? "=" : table[b2 << 2 & 63 | c2 >> 6]) + (isNaN(b2 + c2) ? "=" : table[c2 & 63]);
      }
      return base64.join("");
    };
  }
  function hex2base64(str) {
    return btoa(
      String.fromCharCode.apply(
        null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")
      )
    );
  }
  const icons = {
    "id": "2852637",
    "name": "uniui图标库",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$6 = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons.glyphs
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v2) => v2.font_class === this.type);
        if (code) {
          return unescape(`%u${code.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$1], ["__scopeId", "data-v-d31e1c47"], ["__file", "/Users/liyang/Documents/HBuilderProjects/hq/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$5 = {
    name: "uni-easyinput",
    emits: ["click", "iconClick", "update:modelValue", "input", "focus", "blur", "confirm", "clear", "eyes", "change", "keyboardheightchange"],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      },
      modelValue(newVal) {
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = null;
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("focus", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render], ["__scopeId", "data-v-09fd5285"], ["__file", "/Users/liyang/Documents/HBuilderProjects/hq/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      rawProps: { type: Object, required: false },
      modelValue: { type: [String, Number], required: false },
      root: { type: Object, required: false },
      textAlign: { type: String, required: false },
      thousandth: { type: Boolean, required: false },
      rightText: { type: String, required: false },
      disabled: { type: [Boolean, Function], required: false }
    },
    emits: ["update:modelValue", "onBlur"],
    setup(__props, { emit }) {
      const props = __props;
      vue.useCssVars((_ctx) => ({
        "bc93c4a9-textAlign": __props.textAlign
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
        const [a2, b2 = ""] = `${val}`.split(".");
        const dec = b2 ? `.${b2}` : b2;
        return delDot(a2).replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + dec;
      };
      const inputValue = vue.computed(() => {
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
        var _a2;
        let disabled = (_a2 = props.rawProps) == null ? void 0 : _a2.disabled;
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
        var _a2, _b;
        const placeholder = (_a2 = props.rawProps) == null ? void 0 : _a2.placeholder;
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
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_1);
        return vue.openBlock(), vue.createBlock(_component_uni_easyinput, vue.mergeProps({ clearable: false }, __props.rawProps || {}, {
          modelValue: vue.unref(inputValue),
          placeholder: setPlaceholder(),
          disabled: isDisabled(),
          onBlur,
          "onUpdate:modelValue": handleChange
        }), {
          right: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "right", {}, () => [
              __props.rightText ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "right-text"
                },
                vue.toDisplayString(__props.rightText),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ], true)
          ]),
          _: 3
          /* FORWARDED */
        }, 16, ["modelValue", "placeholder", "disabled"]);
      };
    }
  });
  const AwesomeInput = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-bc93c4a9"], ["__file", "/Users/liyang/Documents/HBuilderProjects/hq/components/input/index.vue"]]);
  const isObject$1 = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse$2(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse$2(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject$1(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn$2 = (val, key) => hasOwnProperty$1.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn$2(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn$2(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages2] = [
        messages2,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en$3 = {
    "uni-load-more.contentdown": "Pull up to show more",
    "uni-load-more.contentrefresh": "loading...",
    "uni-load-more.contentnomore": "No more data"
  };
  const zhHans$3 = {
    "uni-load-more.contentdown": "上拉显示更多",
    "uni-load-more.contentrefresh": "正在加载...",
    "uni-load-more.contentnomore": "没有更多数据了"
  };
  const zhHant$3 = {
    "uni-load-more.contentdown": "上拉顯示更多",
    "uni-load-more.contentrefresh": "正在加載...",
    "uni-load-more.contentnomore": "沒有更多數據了"
  };
  const messages$2 = {
    en: en$3,
    "zh-Hans": zhHans$3,
    "zh-Hant": zhHant$3
  };
  setTimeout(() => {
    uni.getSystemInfoSync().platform;
  }, 16);
  initVueI18n(messages$2);
  const pages = [
    {
      path: "pages/toc/home/index",
      style: {
        navigationBarTitleText: "首页",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/toc/my/index",
      style: {
        navigationBarTitleText: "我的",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/toc/login/index",
      style: {
        navigationBarTitleText: "登录",
        enablePullDownRefresh: false
      }
    }
  ];
  const tabBar = {
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    borderStyle: "black",
    backgroundColor: "#ffffff",
    height: "50px",
    fontSize: "10px",
    iconWidth: "24px",
    spacing: "3px",
    iconfontSrc: "static/iconfont/iconfont.ttf",
    list: [
      {
        pagePath: "pages/toc/home/index",
        iconPath: "static/image/tabbar/homepage.png",
        selectedIconPath: "static/image/tabbar/homepage_hl.png",
        text: "首页"
      },
      {
        pagePath: "pages/toc/my/index",
        iconPath: "static/image/tabbar/people.png",
        selectedIconPath: "static/image/tabbar/people_hl.png",
        text: "我的"
      }
    ]
  };
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "华强金融",
    navigationBarBackgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8",
    "app-plus": {
      background: "#efeff4"
    }
  };
  const condition = {
    current: 0,
    list: [
      {
        name: "",
        path: "",
        query: ""
      }
    ]
  };
  const t$1 = {
    pages,
    tabBar,
    globalStyle,
    condition
  };
  function n(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  function s(e, t2, n2) {
    return e(n2 = { path: t2, exports: {}, require: function(e2, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var r = s(function(e, t2) {
    var n2;
    e.exports = (n2 = n2 || function(e2, t3) {
      var n3 = Object.create || function() {
        function e3() {
        }
        return function(t4) {
          var n4;
          return e3.prototype = t4, n4 = new e3(), e3.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e3) {
        var t4 = n3(this);
        return e3 && t4.mixIn(e3), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e3 = this.extend();
        return e3.init.apply(e3, arguments), e3;
      }, init: function() {
      }, mixIn: function(e3) {
        for (var t4 in e3)
          e3.hasOwnProperty(t4) && (this[t4] = e3[t4]);
        e3.hasOwnProperty("toString") && (this.toString = e3.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e3, n4) {
        e3 = this.words = e3 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e3.length;
      }, toString: function(e3) {
        return (e3 || c2).stringify(this);
      }, concat: function(e3) {
        var t4 = this.words, n4 = e3.words, s3 = this.sigBytes, r3 = e3.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e2.ceil(n4 / 4);
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3.words = this.words.slice(0), e3;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e2.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e2.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e3) {
        for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e3.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e3) {
        for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e3.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, h2 = a2.Utf8 = { stringify: function(e3) {
        try {
          return decodeURIComponent(escape(u2.stringify(e3)));
        } catch (e4) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e3) {
        return u2.parse(unescape(encodeURIComponent(e3)));
      } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e3) {
        "string" == typeof e3 && (e3 = h2.parse(e3)), this._data.concat(e3), this._nDataBytes += e3.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e2.ceil(a3) : e2.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e2.min(4 * c3, r3);
        if (c3) {
          for (var h3 = 0; h3 < c3; h3 += i3)
            this._doProcessBlock(s3, h3);
          var l3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(l3, u3);
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3._data = this._data.clone(), e3;
      }, _minBufferSize: 0 });
      r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e3) {
        this.cfg = this.cfg.extend(e3), this.reset();
      }, reset: function() {
        l2.reset.call(this), this._doReset();
      }, update: function(e3) {
        return this._append(e3), this._process(), this;
      }, finalize: function(e3) {
        return e3 && this._append(e3), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e3) {
        return function(t4, n4) {
          return new e3.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e3) {
        return function(t4, n4) {
          return new d2.HMAC.init(e3, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), i = r, o = (s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, function(e2) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e2.abs(e2.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e3, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e3[s3];
          e3[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e3[t4 + 0], c3 = e3[t4 + 1], p2 = e3[t4 + 2], f2 = e3[t4 + 3], g2 = e3[t4 + 4], m2 = e3[t4 + 5], y2 = e3[t4 + 6], _2 = e3[t4 + 7], w2 = e3[t4 + 8], v2 = e3[t4 + 9], I2 = e3[t4 + 10], S2 = e3[t4 + 11], b2 = e3[t4 + 12], k2 = e3[t4 + 13], C = e3[t4 + 14], T2 = e3[t4 + 15], P2 = i3[0], A2 = i3[1], E2 = i3[2], O = i3[3];
        P2 = u2(P2, A2, E2, O, o3, 7, a2[0]), O = u2(O, P2, A2, E2, c3, 12, a2[1]), E2 = u2(E2, O, P2, A2, p2, 17, a2[2]), A2 = u2(A2, E2, O, P2, f2, 22, a2[3]), P2 = u2(P2, A2, E2, O, g2, 7, a2[4]), O = u2(O, P2, A2, E2, m2, 12, a2[5]), E2 = u2(E2, O, P2, A2, y2, 17, a2[6]), A2 = u2(A2, E2, O, P2, _2, 22, a2[7]), P2 = u2(P2, A2, E2, O, w2, 7, a2[8]), O = u2(O, P2, A2, E2, v2, 12, a2[9]), E2 = u2(E2, O, P2, A2, I2, 17, a2[10]), A2 = u2(A2, E2, O, P2, S2, 22, a2[11]), P2 = u2(P2, A2, E2, O, b2, 7, a2[12]), O = u2(O, P2, A2, E2, k2, 12, a2[13]), E2 = u2(E2, O, P2, A2, C, 17, a2[14]), P2 = h2(P2, A2 = u2(A2, E2, O, P2, T2, 22, a2[15]), E2, O, c3, 5, a2[16]), O = h2(O, P2, A2, E2, y2, 9, a2[17]), E2 = h2(E2, O, P2, A2, S2, 14, a2[18]), A2 = h2(A2, E2, O, P2, o3, 20, a2[19]), P2 = h2(P2, A2, E2, O, m2, 5, a2[20]), O = h2(O, P2, A2, E2, I2, 9, a2[21]), E2 = h2(E2, O, P2, A2, T2, 14, a2[22]), A2 = h2(A2, E2, O, P2, g2, 20, a2[23]), P2 = h2(P2, A2, E2, O, v2, 5, a2[24]), O = h2(O, P2, A2, E2, C, 9, a2[25]), E2 = h2(E2, O, P2, A2, f2, 14, a2[26]), A2 = h2(A2, E2, O, P2, w2, 20, a2[27]), P2 = h2(P2, A2, E2, O, k2, 5, a2[28]), O = h2(O, P2, A2, E2, p2, 9, a2[29]), E2 = h2(E2, O, P2, A2, _2, 14, a2[30]), P2 = l2(P2, A2 = h2(A2, E2, O, P2, b2, 20, a2[31]), E2, O, m2, 4, a2[32]), O = l2(O, P2, A2, E2, w2, 11, a2[33]), E2 = l2(E2, O, P2, A2, S2, 16, a2[34]), A2 = l2(A2, E2, O, P2, C, 23, a2[35]), P2 = l2(P2, A2, E2, O, c3, 4, a2[36]), O = l2(O, P2, A2, E2, g2, 11, a2[37]), E2 = l2(E2, O, P2, A2, _2, 16, a2[38]), A2 = l2(A2, E2, O, P2, I2, 23, a2[39]), P2 = l2(P2, A2, E2, O, k2, 4, a2[40]), O = l2(O, P2, A2, E2, o3, 11, a2[41]), E2 = l2(E2, O, P2, A2, f2, 16, a2[42]), A2 = l2(A2, E2, O, P2, y2, 23, a2[43]), P2 = l2(P2, A2, E2, O, v2, 4, a2[44]), O = l2(O, P2, A2, E2, b2, 11, a2[45]), E2 = l2(E2, O, P2, A2, T2, 16, a2[46]), P2 = d2(P2, A2 = l2(A2, E2, O, P2, p2, 23, a2[47]), E2, O, o3, 6, a2[48]), O = d2(O, P2, A2, E2, _2, 10, a2[49]), E2 = d2(E2, O, P2, A2, C, 15, a2[50]), A2 = d2(A2, E2, O, P2, m2, 21, a2[51]), P2 = d2(P2, A2, E2, O, b2, 6, a2[52]), O = d2(O, P2, A2, E2, f2, 10, a2[53]), E2 = d2(E2, O, P2, A2, I2, 15, a2[54]), A2 = d2(A2, E2, O, P2, c3, 21, a2[55]), P2 = d2(P2, A2, E2, O, w2, 6, a2[56]), O = d2(O, P2, A2, E2, T2, 10, a2[57]), E2 = d2(E2, O, P2, A2, y2, 15, a2[58]), A2 = d2(A2, E2, O, P2, k2, 21, a2[59]), P2 = d2(P2, A2, E2, O, g2, 6, a2[60]), O = d2(O, P2, A2, E2, S2, 10, a2[61]), E2 = d2(E2, O, P2, A2, p2, 15, a2[62]), A2 = d2(A2, E2, O, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + A2 | 0, i3[2] = i3[2] + E2 | 0, i3[3] = i3[3] + O | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e2.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var h3 = c3[u3];
          c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3._hash = this._hash.clone(), e3;
      } });
      function u2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, void function() {
      var e2 = n2, t3 = e2.lib.Base, s2 = e2.enc.Utf8;
      e2.algo.HMAC = t3.extend({ init: function(e3, t4) {
        e3 = this._hasher = new e3.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e3.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e3.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e3 = this._hasher;
        e3.reset(), e3.update(this._iKey);
      }, update: function(e3) {
        return this._hasher.update(e3), this;
      }, finalize: function(e3) {
        var t4 = this._hasher, n3 = t4.finalize(e3);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), s(function(e, t2) {
    e.exports = i.HmacMD5;
  })), a = s(function(e, t2) {
    e.exports = i.enc.Utf8;
  }), c = s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, function() {
      var e2 = n2, t3 = e2.lib.WordArray;
      function s2(e3, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e3.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e3.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e2.enc.Base64 = { stringify: function(e3) {
        var t4 = e3.words, n3 = e3.sigBytes, s3 = this._map;
        e3.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e3) {
        var t4 = e3.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e3.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e3, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const u = "FUNCTION", h = "OBJECT", l = "CLIENT_DB", d = "pending", p = "fullfilled", f = "rejected";
  function g(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
  }
  function m(e) {
    return "object" === g(e);
  }
  function y(e) {
    return "function" == typeof e;
  }
  function _(e) {
    return function() {
      try {
        return e.apply(e, arguments);
      } catch (e2) {
        console.error(e2);
      }
    };
  }
  const w = "REJECTED", v = "NOT_PENDING";
  class I {
    constructor({ createPromise: e, retryRule: t2 = w } = {}) {
      this.createPromise = e, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case w:
          return this.status === f;
        case v:
          return this.status !== d;
      }
    }
    exec() {
      return this.needRetry ? (this.status = d, this.promise = this.createPromise().then((e) => (this.status = p, Promise.resolve(e)), (e) => (this.status = f, Promise.reject(e))), this.promise) : this.promise;
    }
  }
  function S(e) {
    return e && "string" == typeof e ? JSON.parse(e) : e;
  }
  const b = true, k = "app", T = S([]), P = k, A = S(""), E = S("[]") || [];
  let x = "";
  try {
    x = "";
  } catch (e) {
  }
  let R = {};
  function U(e, t2 = {}) {
    var n2, s2;
    return n2 = R, s2 = e, Object.prototype.hasOwnProperty.call(n2, s2) || (R[e] = t2), R[e];
  }
  R = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const L = ["invoke", "success", "fail", "complete"], N = U("_globalUniCloudInterceptor");
  function D(e, t2) {
    N[e] || (N[e] = {}), m(t2) && Object.keys(t2).forEach((n2) => {
      L.indexOf(n2) > -1 && function(e2, t3, n3) {
        let s2 = N[e2][t3];
        s2 || (s2 = N[e2][t3] = []), -1 === s2.indexOf(n3) && y(n3) && s2.push(n3);
      }(e, n2, t2[n2]);
    });
  }
  function F(e, t2) {
    N[e] || (N[e] = {}), m(t2) ? Object.keys(t2).forEach((n2) => {
      L.indexOf(n2) > -1 && function(e2, t3, n3) {
        const s2 = N[e2][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e, n2, t2[n2]);
    }) : delete N[e];
  }
  function M(e, t2) {
    return e && 0 !== e.length ? e.reduce((e2, n2) => e2.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function q(e, t2) {
    return N[e] && N[e][t2] || [];
  }
  function K(e) {
    D("callObject", e);
  }
  const j = U("_globalUniCloudListener"), B = "response", $ = "needLogin", W = "refreshToken", z$1 = "clientdb", J = "cloudfunction", H = "cloudobject";
  function G(e) {
    return j[e] || (j[e] = []), j[e];
  }
  function V(e, t2) {
    const n2 = G(e);
    n2.includes(t2) || n2.push(t2);
  }
  function Y(e, t2) {
    const n2 = G(e), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function Q(e, t2) {
    const n2 = G(e);
    for (let e2 = 0; e2 < n2.length; e2++) {
      (0, n2[e2])(t2);
    }
  }
  let X, Z = false;
  function ee() {
    return X || (X = new Promise((e) => {
      Z && e(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (Z = true, e());
        }
        Z || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), X);
  }
  function te(e) {
    const t2 = {};
    for (const n2 in e) {
      const s2 = e[n2];
      y(s2) && (t2[n2] = _(s2));
    }
    return t2;
  }
  class ne extends Error {
    constructor(e) {
      super(e.message), this.errMsg = e.message || e.errMsg || "unknown system error", this.code = this.errCode = e.code || e.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e.subject || e.errSubject, this.cause = e.cause, this.requestId = e.requestId;
    }
    toJson(e = 0) {
      if (!(e >= 10))
        return e++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e) : this.cause };
    }
  }
  var se = { request: (e) => uni.request(e), uploadFile: (e) => uni.uploadFile(e), setStorageSync: (e, t2) => uni.setStorageSync(e, t2), getStorageSync: (e) => uni.getStorageSync(e), removeStorageSync: (e) => uni.removeStorageSync(e), clearStorageSync: () => uni.clearStorageSync() };
  function re(e) {
    return e && re(e.__v_raw) || e;
  }
  function ie() {
    return { token: se.getStorageSync("uni_id_token") || se.getStorageSync("uniIdToken"), tokenExpired: se.getStorageSync("uni_id_token_expired") };
  }
  function oe({ token: e, tokenExpired: t2 } = {}) {
    e && se.setStorageSync("uni_id_token", e), t2 && se.setStorageSync("uni_id_token_expired", t2);
  }
  let ae, ce;
  function ue() {
    return ae || (ae = uni.getSystemInfoSync()), ae;
  }
  function he() {
    let e, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e = s2, t2 = n2;
      }
    } catch (e2) {
    }
    return { channel: e, scene: t2 };
  }
  function le() {
    const e = uni.getLocale && uni.getLocale() || "en";
    if (ce)
      return { ...ce, locale: e, LOCALE: e };
    const t2 = ue(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
    for (let e2 = 0; e2 < o2.length; e2++) {
      delete t2[o2[e2]];
    }
    return ce = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...he(), ...t2 }, { ...ce, locale: e, LOCALE: e };
  }
  var de = { sign: function(e, t2) {
    let n2 = "";
    return Object.keys(e).sort().forEach(function(t3) {
      e[t3] && (n2 = n2 + "&" + t3 + "=" + e[t3]);
    }), n2 = n2.slice(1), o(n2, t2).toString();
  }, wrappedRequest: function(e, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e, { complete(e2) {
        e2 || (e2 = {});
        const t3 = e2.data && e2.data.header && e2.data.header["x-serverless-request-id"] || e2.header && e2.header["request-id"];
        if (!e2.statusCode || e2.statusCode >= 400)
          return s2(new ne({ code: "SYS_ERR", message: e2.errMsg || "request:fail", requestId: t3 }));
        const r2 = e2.data;
        if (r2.error)
          return s2(new ne({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e) {
    return c.stringify(a.parse(e));
  } }, pe = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
  const { t: fe } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: pe, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: pe }, "zh-Hans");
  var ge = class {
    constructor(e) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e, t2))
          throw new Error(fe("uniCloud.init.paramRequired", { param: t2 }));
      }), this.config = Object.assign({}, { endpoint: 0 === e.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = se, this._getAccessTokenPromiseHub = new I({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e2) => {
        if (!e2.result || !e2.result.accessToken)
          throw new ne({ code: "AUTH_FAILED", message: "获取accessToken失败" });
        this.setAccessToken(e2.result.accessToken);
      }), retryRule: v });
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e) {
      this.accessToken = e;
    }
    requestWrapped(e) {
      return de.wrappedRequest(e, this.adapter.request);
    }
    requestAuth(e) {
      return this.requestWrapped(e);
    }
    request(e, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e) : this.requestWrapped(e).catch((t3) => new Promise((e2, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e2();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e) {
      const t2 = Object.assign({}, e);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = de.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e, t2) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
    async authorize() {
      await this.getAccessToken();
    }
    callFunction(e) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };
      return this.request(this.setupRequest(t2));
    }
    getOSSUploadOptionsFromPath(e) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e2) {
          e2 && e2.statusCode < 400 ? o2(e2) : a2(new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e2) {
          a2(new ne({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e2) => {
          i2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
      if ("string" !== g(t2))
        throw new ne({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new ne({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new ne({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const o2 = i2 && i2.envType || this.config.envType;
      if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
        throw new ne({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
      const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: f2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: f2, key: p2, policy: m2, success_action_status: 200 };
      if (u2 && (_2["x-oss-security-token"] = u2), y2) {
        const e2 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: f2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        _2.callback = de.toBase64(e2);
      }
      const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
        return { success: true, filePath: e, fileID: c2 };
      if ((await this.reportOSSUpload({ id: f2 })).success)
        return { success: true, filePath: e, fileID: c2 };
      throw new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e) && 0 !== e.length || n2(new ne({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e.map((e2) => ({ fileID: e2, tempFileURL: e2 })) });
      });
    }
    async getFileInfo({ fileList: e } = {}) {
      if (!Array.isArray(e) || 0 === e.length)
        throw new ne({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e.map((e2) => e2.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var me = { init(e) {
    const t2 = new ge(e), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const ye = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var _e;
  !function(e) {
    e.local = "local", e.none = "none", e.session = "session";
  }(_e || (_e = {}));
  var we = function() {
  };
  const ve = () => {
    let e;
    if (!Promise) {
      e = () => {
      }, e.promise = {};
      const t3 = () => {
        throw new ne({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e.promise, "then", { get: t3 }), Object.defineProperty(e.promise, "catch", { get: t3 }), e;
    }
    const t2 = new Promise((t3, n2) => {
      e = (e2, s2) => e2 ? n2(e2) : t3(s2);
    });
    return e.promise = t2, e;
  };
  function Ie(e) {
    return void 0 === e;
  }
  function Se(e) {
    return "[object Null]" === Object.prototype.toString.call(e);
  }
  var be;
  function ke(e) {
    const t2 = (n2 = e, "[object Array]" === Object.prototype.toString.call(n2) ? e : [e]);
    var n2;
    for (const e2 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e2;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e) {
    e.WEB = "web", e.WX_MP = "wx_mp";
  }(be || (be = {}));
  const Ce = { adapter: null, runtime: void 0 }, Te = ["anonymousUuidKey"];
  class Pe extends we {
    constructor() {
      super(), Ce.adapter.root.tcbObject || (Ce.adapter.root.tcbObject = {});
    }
    setItem(e, t2) {
      Ce.adapter.root.tcbObject[e] = t2;
    }
    getItem(e) {
      return Ce.adapter.root.tcbObject[e];
    }
    removeItem(e) {
      delete Ce.adapter.root.tcbObject[e];
    }
    clear() {
      delete Ce.adapter.root.tcbObject;
    }
  }
  function Ae(e, t2) {
    switch (e) {
      case "local":
        return t2.localStorage || new Pe();
      case "none":
        return new Pe();
      default:
        return t2.sessionStorage || new Pe();
    }
  }
  class Ee {
    constructor(e) {
      if (!this._storage) {
        this._persistence = Ce.adapter.primaryStorage || e.persistence, this._storage = Ae(this._persistence, Ce.adapter);
        const t2 = `access_token_${e.env}`, n2 = `access_token_expire_${e.env}`, s2 = `refresh_token_${e.env}`, r2 = `anonymous_uuid_${e.env}`, i2 = `login_type_${e.env}`, o2 = `user_info_${e.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
      }
    }
    updatePersistence(e) {
      if (e === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e;
      const n2 = Ae(e, Ce.adapter);
      for (const e2 in this.keys) {
        const s2 = this.keys[e2];
        if (t2 && Te.includes(e2))
          continue;
        const r2 = this._storage.getItem(s2);
        Ie(r2) || Se(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e, r2);
      } catch (e2) {
        throw e2;
      }
    }
    getStore(e, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e2) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e) {
      this._storage.removeItem(e);
    }
  }
  const Oe = {}, xe = {};
  function Re(e) {
    return Oe[e];
  }
  class Ue {
    constructor(e, t2) {
      this.data = t2 || null, this.name = e;
    }
  }
  class Le extends Ue {
    constructor(e, t2) {
      super("error", { error: e, data: t2 }), this.error = e;
    }
  }
  const Ne = new class {
    constructor() {
      this._listeners = {};
    }
    on(e, t2) {
      return function(e2, t3, n2) {
        n2[e2] = n2[e2] || [], n2[e2].push(t3);
      }(e, t2, this._listeners), this;
    }
    off(e, t2) {
      return function(e2, t3, n2) {
        if (n2 && n2[e2]) {
          const s2 = n2[e2].indexOf(t3);
          -1 !== s2 && n2[e2].splice(s2, 1);
        }
      }(e, t2, this._listeners), this;
    }
    fire(e, t2) {
      if (e instanceof Le)
        return console.error(e.error), this;
      const n2 = "string" == typeof e ? new Ue(e, t2 || {}) : e;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e2 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e2)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e) {
      return this._listeners[e] && this._listeners[e].length > 0;
    }
  }();
  function De(e, t2) {
    Ne.on(e, t2);
  }
  function Fe(e, t2 = {}) {
    Ne.fire(e, t2);
  }
  function Me(e, t2) {
    Ne.off(e, t2);
  }
  const qe = "loginStateChanged", Ke = "loginStateExpire", je = "loginTypeChanged", Be = "anonymousConverted", $e = "refreshAccessToken";
  var We;
  !function(e) {
    e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";
  }(We || (We = {}));
  const ze = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Je = { "X-SDK-Version": "1.3.5" };
  function He(e, t2, n2) {
    const s2 = e[t2];
    e[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e2;
        if (e2 = o2, "[object FormData]" !== Object.prototype.toString.call(e2))
          t3.data = { ...o2, ...r2 };
        else
          for (const e3 in r2)
            o2.append(e3, r2[e3]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e, t3);
    };
  }
  function Ge() {
    const e = Math.random().toString(16).slice(2);
    return { data: { seqId: e }, headers: { ...Je, "x-seqid": e } };
  }
  class Ve {
    constructor(e = {}) {
      var t2;
      this.config = e, this._reqClass = new Ce.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Re(this.config.env), this._localCache = (t2 = this.config.env, xe[t2]), He(this._reqClass, "post", [Ge]), He(this._reqClass, "upload", [Ge]), He(this._reqClass, "download", [Ge]);
    }
    async post(e) {
      return await this._reqClass.post(e);
    }
    async upload(e) {
      return await this._reqClass.upload(e);
    }
    async download(e) {
      return await this._reqClass.download(e);
    }
    async refreshAccessToken() {
      let e, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e = await this._refreshAccessTokenPromise;
      } catch (e2) {
        t2 = e2;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new ne({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e2 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e2 || "REFRESH_TOKEN_EXPIRED" === e2 || "INVALID_REFRESH_TOKEN" === e2) {
          if (this._cache.getStore(s2) === We.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e2) {
            const e3 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e3, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          Fe(Ke), this._cache.removeStore(n2);
        }
        throw new ne({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return Fe($e), this._cache.setStore(e, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new ne({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      if (-1 === ze.indexOf(e)) {
        const { refreshTokenKey: e2 } = this._cache.keys;
        this._cache.getStore(e2) && (i2.access_token = (await this.getAccessToken()).accessToken);
      }
      let o2;
      if ("storage.uploadFile" === e) {
        o2 = new FormData();
        for (let e2 in o2)
          o2.hasOwnProperty(e2) && void 0 !== o2[e2] && o2.append(e2, i2[e2]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e2 in i2)
          void 0 !== i2[e2] && (o2[e2] = i2[e2]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: h2, search: l2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
      let p2 = function(e2, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e3 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e3}=${encodeURIComponent(n3[e3])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e2}${t3}`;
      }(ye, "//tcb-api.tencentcloudapi.com/web", d2);
      l2 && (p2 += l2);
      const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
        throw new ne({ code: "NETWORK_ERROR", message: "network request error" });
      return f2;
    }
    async send(e, t2 = {}) {
      const n2 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
      if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === ze.indexOf(e)) {
        await this.refreshAccessToken();
        const n3 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
        if (n3.data.code)
          throw new ne({ code: n3.data.code, message: n3.data.message });
        return n3.data;
      }
      if (n2.data.code)
        throw new ne({ code: n2.data.code, message: n2.data.message });
      return n2.data;
    }
    setRefreshToken(e) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
  }
  const Ye = {};
  function Qe(e) {
    return Ye[e];
  }
  class Xe {
    constructor(e) {
      this.config = e, this._cache = Re(e.env), this._request = Qe(e.env);
    }
    setRefreshToken(e) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
    setAccessToken(e, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e);
    }
  }
  class Ze {
    constructor(e) {
      if (!e)
        throw new ne({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e, this._cache = Re(this._envId), this._request = Qe(this._envId), this.setUserInfo();
    }
    linkWithTicket(e) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e });
    }
    linkWithRedirect(e) {
      e.signInWithRedirect();
    }
    updatePassword(e, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e });
    }
    updateEmail(e) {
      return this._request.send("auth.updateEmail", { newEmail: e });
    }
    updateUsername(e) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e });
    }
    async getLinkedUidList() {
      const { data: e } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e;
      return n2.forEach((e2) => {
        e2.wxOpenId && e2.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e) {
      return this._request.send("auth.setPrimaryUid", { uid: e });
    }
    unlink(e) {
      return this._request.send("auth.unlink", { platform: e });
    }
    async update(e) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setUserInfo() {
      const { userInfoKey: e } = this._cache.keys, t2 = this._cache.getStore(e);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e2) => {
        this[e2] = t2[e2];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e), this.setUserInfo();
    }
  }
  class et {
    constructor(e) {
      if (!e)
        throw new ne({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Re(e);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new Ze(e);
    }
    get isAnonymousAuth() {
      return this.loginType === We.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === We.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === We.WECHAT || this.loginType === We.WECHAT_OPEN || this.loginType === We.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class tt extends Xe {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (r2.uuid && r2.refresh_token) {
        this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Fe(qe), Fe(je, { env: this.config.env, loginType: We.ANONYMOUS, persistence: "local" });
        const e2 = new et(this.config.env);
        return await e2.user.refresh(), e2;
      }
      throw new ne({ message: "匿名登录失败" });
    }
    async linkAndRetrieveDataWithTicket(e) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Fe(Be, { env: this.config.env }), Fe(je, { loginType: We.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new ne({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e), this._cache.setStore(n2, We.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class nt extends Xe {
    async signIn(e) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Fe(qe), Fe(je, { env: this.config.env, loginType: We.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new et(this.config.env);
      throw new ne({ message: "自定义登录失败" });
    }
  }
  class st extends Xe {
    async signIn(e, t2) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Fe(qe), Fe(je, { env: this.config.env, loginType: We.EMAIL, persistence: this.config.persistence }), new et(this.config.env);
      throw s2.code ? new ne({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new ne({ message: "邮箱登录失败" });
    }
    async activate(e) {
      return this._request.send("auth.activateEndUserMail", { token: e });
    }
    async resetPasswordWithToken(e, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t2 });
    }
  }
  class rt extends Xe {
    async signIn(e, t2) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: We.USERNAME, username: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Fe(qe), Fe(je, { env: this.config.env, loginType: We.USERNAME, persistence: this.config.persistence }), new et(this.config.env);
      throw s2.code ? new ne({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new ne({ message: "用户名密码登录失败" });
    }
  }
  class it {
    constructor(e) {
      this.config = e, this._cache = Re(e.env), this._request = Qe(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), De(je, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e = this.hasLoginState();
      return e && e.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new tt(this.config);
    }
    customAuthProvider() {
      return new nt(this.config);
    }
    emailAuthProvider() {
      return new st(this.config);
    }
    usernameAuthProvider() {
      return new rt(this.config);
    }
    async signInAnonymously() {
      return new tt(this.config).signIn();
    }
    async signInWithEmailAndPassword(e, t2) {
      return new st(this.config).signIn(e, t2);
    }
    signInWithUsernameAndPassword(e, t2) {
      return new rt(this.config).signIn(e, t2);
    }
    async linkAndRetrieveDataWithTicket(e) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new tt(this.config)), De(Be, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);
    }
    async signOut() {
      if (this.loginType === We.ANONYMOUS)
        throw new ne({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e), this._cache.removeStore(t2), this._cache.removeStore(n2), Fe(qe), Fe(je, { env: this.config.env, loginType: We.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t2 });
    }
    async sendPasswordResetEmail(e) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e });
    }
    onLoginStateChanged(e) {
      De(qe, () => {
        const t3 = this.hasLoginState();
        e.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e.call(this, t2);
    }
    onLoginStateExpired(e) {
      De(Ke, e.bind(this));
    }
    onAccessTokenRefreshed(e) {
      De($e, e.bind(this));
    }
    onAnonymousConverted(e) {
      De(Be, e.bind(this));
    }
    onLoginTypeChanged(e) {
      De(je, () => {
        const t2 = this.hasLoginState();
        e.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e } = this._cache.keys;
      return this._cache.getStore(e) ? new et(this.config.env) : null;
    }
    async isUsernameRegistered(e) {
      if ("string" != typeof e)
        throw new ne({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e) {
      return new nt(this.config).signIn(e);
    }
    shouldRefreshAccessToken(e) {
      this._request._shouldRefreshAccessTokenHook = e.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e) => e.code ? e : { ...e.data, requestId: e.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e) {
      const { env: t2 } = e.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e) {
      const { loginType: t2, persistence: n2, env: s2 } = e.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const ot = function(e, t2) {
    t2 = t2 || ve();
    const n2 = Qe(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e2, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e3) => {
        201 === e3.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new ne({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e3.data}` }));
      }).catch((e3) => {
        t2(e3);
      });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, at = function(e, t2) {
    t2 = t2 || ve();
    const n2 = Qe(this.config.env), { cloudPath: s2 } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      t2(null, e2);
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, ct = function({ fileList: e }, t2) {
    if (t2 = t2 || ve(), !e || !Array.isArray(e))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e };
    return Qe(this.config.env).send("storage.batchDeleteFile", n2).then((e2) => {
      e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.delete_list, requestId: e2.requestId });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, ut = function({ fileList: e }, t2) {
    t2 = t2 || ve(), e && Array.isArray(e) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return Qe(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e2) => {
      e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.download_list, requestId: e2.requestId });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, ht = async function({ fileID: e }, t2) {
    const n2 = (await ut.call(this, { fileList: [{ fileID: e, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e2) => {
        e2(n2);
      });
    const s2 = Qe(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, lt = function({ name: e, data: t2, query: n2, parse: s2, search: r2 }, i2) {
    const o2 = i2 || ve();
    let a2;
    try {
      a2 = t2 ? JSON.stringify(t2) : "";
    } catch (e2) {
      return Promise.reject(e2);
    }
    if (!e)
      return Promise.reject(new ne({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e, request_data: a2 };
    return Qe(this.config.env).send("functions.invokeFunction", c2).then((e2) => {
      if (e2.code)
        o2(null, e2);
      else {
        let t3 = e2.data.response_data;
        if (s2)
          o2(null, { result: t3, requestId: e2.requestId });
        else
          try {
            t3 = JSON.parse(e2.data.response_data), o2(null, { result: t3, requestId: e2.requestId });
          } catch (e3) {
            o2(new ne({ message: "response data must be json" }));
          }
      }
      return o2.promise;
    }).catch((e2) => {
      o2(e2);
    }), o2.promise;
  }, dt = { timeout: 15e3, persistence: "session" }, pt = {};
  class ft {
    constructor(e) {
      this.config = e || this.config, this.authObj = void 0;
    }
    init(e) {
      switch (Ce.adapter || (this.requestClient = new Ce.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: `请求在${(e.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...dt, ...e }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new ft(this.config);
    }
    auth({ persistence: e } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e || Ce.adapter.primaryStorage || dt.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e2) {
        const { env: t3 } = e2;
        Oe[t3] = new Ee(e2), xe[t3] = new Ee({ ...e2, persistence: "local" });
      }(this.config), n2 = this.config, Ye[n2.env] = new Ve(n2), this.authObj = new it(this.config), this.authObj;
    }
    on(e, t2) {
      return De.apply(this, [e, t2]);
    }
    off(e, t2) {
      return Me.apply(this, [e, t2]);
    }
    callFunction(e, t2) {
      return lt.apply(this, [e, t2]);
    }
    deleteFile(e, t2) {
      return ct.apply(this, [e, t2]);
    }
    getTempFileURL(e, t2) {
      return ut.apply(this, [e, t2]);
    }
    downloadFile(e, t2) {
      return ht.apply(this, [e, t2]);
    }
    uploadFile(e, t2) {
      return ot.apply(this, [e, t2]);
    }
    getUploadMetadata(e, t2) {
      return at.apply(this, [e, t2]);
    }
    registerExtension(e) {
      pt[e.name] = e;
    }
    async invokeExtension(e, t2) {
      const n2 = pt[e];
      if (!n2)
        throw new ne({ message: `扩展${e} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e) {
      const { adapter: t2, runtime: n2 } = ke(e) || {};
      t2 && (Ce.adapter = t2), n2 && (Ce.runtime = n2);
    }
  }
  var gt = new ft();
  function mt(e, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e + t2;
  }
  class yt {
    post(e) {
      const { url: t2, data: n2, headers: s2 } = e;
      return new Promise((e2, r2) => {
        se.request({ url: mt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
          e2(t3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    }
    upload(e) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e, c2 = se.uploadFile({ url: mt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e2) {
          const n3 = { statusCode: e2.statusCode, data: e2.data || {} };
          200 === e2.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e2) {
          n2(new Error(e2.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const _t = { setItem(e, t2) {
    se.setStorageSync(e, t2);
  }, getItem: (e) => se.getStorageSync(e), removeItem(e) {
    se.removeStorageSync(e);
  }, clear() {
    se.clearStorageSync();
  } };
  var wt = { genAdapter: function() {
    return { root: {}, reqClass: yt, localStorage: _t, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  gt.useAdapters(wt);
  const vt = gt, It = vt.init;
  vt.init = function(e) {
    e.env = e.spaceId;
    const t2 = It.call(this, e);
    t2.config.provider = "tencent", t2.config.spaceId = e.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e2) {
      const t3 = n2.call(this, e2);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e3) => {
        var n3;
        t3[e3] = (n3 = t3[e3], function(e4) {
          e4 = e4 || {};
          const { success: t4, fail: s2, complete: r2 } = te(e4);
          if (!(t4 || s2 || r2))
            return n3.call(this, e4);
          n3.call(this, e4).then((e5) => {
            t4 && t4(e5), r2 && r2(e5);
          }, (e5) => {
            s2 && s2(e5), r2 && r2(e5);
          });
        }).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var St = vt;
  var bt = class extends ge {
    getAccessToken() {
      return new Promise((e, t2) => {
        const n2 = "Anonymous_Access_token";
        this.setAccessToken(n2), e(n2);
      });
    }
    setupRequest(e, t2) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret);
      const r2 = le();
      s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
      const { token: i2 } = ie();
      return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
    }
    uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, success(e2) {
          e2 && e2.statusCode < 400 ? o2(e2) : a2(new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e2) {
          a2(new ne({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e2) => {
          i2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new ne({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        r2 = t3.result.fileUrl;
        const c2 = { url: i2, formData: o2, name: a2, filePath: e, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e, fileID: r2 }) : s3(new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t2)).then((e2) => {
        if (e2.success)
          return e2.result;
        throw new ne({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e } = {}) {
      if (!Array.isArray(e) || 0 === e.length)
        throw new ne({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t2)).then((e2) => {
        if (e2.success)
          return { fileList: e2.result.fileList.map((e3) => ({ fileID: e3.fileID, tempFileURL: e3.tempFileURL })) };
        throw new ne({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var kt = { init(e) {
    const t2 = new bt(e), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  function Ct({ data: e }) {
    let t2;
    t2 = le();
    const n2 = JSON.parse(JSON.stringify(e || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e2 } = ie();
      e2 && (n2.uniIdToken = e2);
    }
    return n2;
  }
  async function Tt({ name: e, data: t2 } = {}) {
    await this.__dev__.initLocalNetwork();
    const { localAddress: n2, localPort: s2 } = this.__dev__, r2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], i2 = this.config.spaceId, o2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e}`;
    return new Promise((t3, n3) => {
      se.request({ method: "POST", url: o2, data: { name: e, platform: P, provider: r2, spaceId: i2 }, timeout: 3e3, success(e2) {
        t3(e2);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e2 } = {}) => {
      const { code: t3, message: n3 } = e2 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: n3, message: s3 }) => {
      if (0 !== n3) {
        switch (n3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(s3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR": {
            const e2 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";
            throw console.error(e2), new Error(e2);
          }
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e2 = `检测本地调试服务出现错误：${s3}，请检查网络环境或重启客户端再试`;
            throw console.error(e2), new Error(e2);
          }
        }
        return this._callCloudFunction({ name: e, data: t2 });
      }
      return new Promise((e2, n4) => {
        const s4 = Ct.call(this, { data: t2 });
        se.request({ method: "POST", url: a2, data: { provider: r2, platform: P, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new ne({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e2({ result: s5 }), fail(e3) {
          n4(new ne({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const Pt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var At = /[\\^$.*+?()[\]{}|]/g, Et = RegExp(At.source);
  function Ot(e, t2, n2) {
    return e.replace(new RegExp((s2 = t2) && Et.test(s2) ? s2.replace(At, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Rt = "request", Ut = "response", Lt = "both";
  const yn = { code: 2e4, message: "System error" }, _n = { code: 20101, message: "Invalid client" };
  function In(e) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e || {};
    return new ne({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || yn.code, message: r2 || o2, cause: a2 });
  }
  let bn;
  function An({ secretType: e } = {}) {
    return e === Rt || e === Ut || e === Lt;
  }
  function En({ name: e, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function On({ provider: e, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = ue();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e2, spaceId: t3 } = {}) {
      const n3 = T;
      if (!n3)
        return {};
      e2 = function(e3) {
        return "tencent" === e3 ? "tcb" : e3;
      }(e2);
      const s3 = n3.find((n4) => n4.provider === e2 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const h2 = function(e2, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e2.length; i3++) {
        const o3 = e2[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e3) => e3.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!h2)
      return false;
    if ((c2[h2] || []).find((e2 = {}) => e2.appId === s2 && (e2.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), In(_n);
  }
  function xn({ functionName: e, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Rn(e) {
    const t2 = e.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = Ct.call(e, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider], i2 = An(n3), o2 = En(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e2) => (e2.errCode = 0, !a2 && xn.call(this, { functionName: s2, result: e2, logPvd: r2 }), Promise.resolve(e2)), (e2) => (!a2 && xn.call(this, { functionName: s2, result: e2, logPvd: r2 }), e2 && e2.message && (e2.message = function({ message: e3 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e3.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e4 = 1; e4 < a3.length; e4++)
            c2 = Ot(c2, `{$${e4}}`, a3[e4]);
          for (const e4 in t3)
            c2 = Ot(c2, `{${e4}}`, t3[e4]);
          return "replace" === o3 ? c2 : e3 + c2;
        }
        return e3;
      }({ message: `[${n3.name}]: ${e2.message}`, formatter: Pt, extraInfo: { functionName: s2 } })), Promise.reject(e2)));
    };
    e.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e.__dev__.debugInfo && !e.__dev__.debugInfo.forceRemote && E ? (e._callCloudFunction || (e._callCloudFunction = n2, e._callLocalFunction = Tt), o2 = Tt) : o2 = n2, o2 = o2.bind(e), En(t3))
        a2 = n2.call(e, t3);
      else if (An(t3)) {
        a2 = new bn({ secretType: t3.secretType, uniCloudIns: e }).wrapEncryptDataCallFunction(n2.bind(e))(t3);
      } else if (On({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new bn({ secretType: t3.secretType, uniCloudIns: e }).wrapVerifyClientCallFunction(n2.bind(e))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2;
    };
  }
  bn = class {
    constructor() {
      throw In({ message: `Platform ${P} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const Un = Symbol("CLIENT_DB_INTERNAL");
  function Ln(e, t2) {
    return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Un, e.inspect = null, e.__v_raw = void 0, new Proxy(e, { get(e2, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e2[n2];
      if (n2 in e2 || "string" != typeof n2) {
        const t3 = e2[n2];
        return "function" == typeof t3 ? t3.bind(e2) : t3;
      }
      return t2.get(e2, n2, s2);
    } });
  }
  function Nn(e) {
    return { on: (t2, n2) => {
      e[t2] = e[t2] || [], e[t2].indexOf(n2) > -1 || e[t2].push(n2);
    }, off: (t2, n2) => {
      e[t2] = e[t2] || [];
      const s2 = e[t2].indexOf(n2);
      -1 !== s2 && e[t2].splice(s2, 1);
    } };
  }
  const Dn = ["db.Geo", "db.command", "command.aggregate"];
  function Fn(e, t2) {
    return Dn.indexOf(`${e}.${t2}`) > -1;
  }
  function Mn(e) {
    switch (g(e = re(e))) {
      case "array":
        return e.map((e2) => Mn(e2));
      case "object":
        return e._internalType === Un || Object.keys(e).forEach((t2) => {
          e[t2] = Mn(e[t2]);
        }), e;
      case "regexp":
        return { $regexp: { source: e.source, flags: e.flags } };
      case "date":
        return { $date: e.toISOString() };
      default:
        return e;
    }
  }
  function qn(e) {
    return e && e.content && e.content.$method;
  }
  class Kn {
    constructor(e, t2, n2) {
      this.content = e, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e = this;
      const t2 = [e.content];
      for (; e.prevStage; )
        e = e.prevStage, t2.push(e.content);
      return { $db: t2.reverse().map((e2) => ({ $method: e2.$method, $param: Mn(e2.$param) })) };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    getAction() {
      const e = this.toJSON().$db.find((e2) => "action" === e2.$method);
      return e && e.$param && e.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e) => "action" !== e.$method) };
    }
    get isAggregate() {
      let e = this;
      for (; e; ) {
        const t2 = qn(e), n2 = qn(e.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e = this;
      for (; e; ) {
        if ("command" === qn(e))
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e = this;
      for (; e; ) {
        const t2 = qn(e), n2 = qn(e.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e = e.prevStage;
      }
      return false;
    }
    getNextStageFn(e) {
      const t2 = this;
      return function() {
        return jn({ $method: e, $param: Mn(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e, $param: Mn(t2) }), b) {
        const e2 = s2.$db.find((e3) => "collection" === e3.$method), t3 = e2 && e2.$param;
        t3 && 1 === t3.length && "string" == typeof e2.$param[0] && e2.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function jn(e, t2, n2) {
    return Ln(new Kn(e, t2, n2), { get(e2, t3) {
      let s2 = "db";
      return e2 && e2.content && (s2 = e2.content.$method), Fn(s2, t3) ? jn({ $method: t3 }, e2, n2) : function() {
        return jn({ $method: t3, $param: Mn(Array.from(arguments)) }, e2, n2);
      };
    } });
  }
  function Bn({ path: e, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e.map((e2) => ({ $method: e2 })), { $method: t2, $param: this.param }] };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
  }
  function $n(e, t2 = {}) {
    return Ln(new e(t2), { get: (e2, t3) => Fn("db", t3) ? jn({ $method: t3 }, null, e2) : function() {
      return jn({ $method: t3, $param: Mn(Array.from(arguments)) }, null, e2);
    } });
  }
  class Wn extends class {
    constructor({ uniClient: e = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e._isDefault && (this._dbCallBacks = U("_globalUniCloudDatabaseCallback")), t2 || (this.auth = Nn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, Nn(this._dbCallBacks)), this.env = Ln({}, { get: (e2, t3) => ({ $env: t3 }) }), this.Geo = Ln({}, { get: (e2, t3) => Bn({ path: ["Geo"], method: t3 }) }), this.serverDate = Bn({ path: [], method: "serverDate" }), this.RegExp = Bn({ path: [], method: "RegExp" });
    }
    getCloudEnv(e) {
      if ("string" != typeof e || !e.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e.replace("$cloudEnv_", "") };
    }
    _callback(e, t2) {
      const n2 = this._dbCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t2);
      });
    }
    _callbackAuth(e, t2) {
      const n2 = this._authCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t2);
      });
    }
    multiSend() {
      const e = Array.from(arguments), t2 = e.map((e2) => {
        const t3 = e2.getAction(), n2 = e2.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e });
    }
  } {
    _parseResult(e) {
      return this._isJQL ? e.result : e;
    }
    _callCloudFunction({ action: e, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e2, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e2.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e2) {
        return i2._callback("error", [e2]), M(q(o2, "fail"), e2).then(() => M(q(o2, "complete"), e2)).then(() => (r2(null, e2), Q(B, { type: z$1, content: e2 }), Promise.reject(e2)));
      }
      const c2 = M(q(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: l, data: { action: e, command: t2, multiCommand: n2 } })).then((e2) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e2.result;
        if (u3)
          for (let e3 = 0; e3 < u3.length; e3++) {
            const { level: t4, message: n4, detail: s4 } = u3[e3], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new ne({ code: t3, message: n3, requestId: e2.requestId }));
        }
        e2.result.errCode = e2.result.errCode || e2.result.code, e2.result.errMsg = e2.result.errMsg || e2.result.message, s3 && c3 && (oe({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Q(W, { token: s3, tokenExpired: c3 }));
        const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < h2.length; t4++) {
          const { prop: n4, tips: s4 } = h2[t4];
          if (n4 in e2.result) {
            const t5 = e2.result[n4];
            Object.defineProperty(e2.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e3) {
          return M(q(o2, "success"), e3).then(() => M(q(o2, "complete"), e3)).then(() => {
            r2(e3, null);
            const t4 = i2._parseResult(e3);
            return Q(B, { type: z$1, content: t4 }), Promise.resolve(t4);
          });
        }(e2);
      }, (e2) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e2.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new ne({ code: e2.code || "SYSTEM_ERROR", message: e2.message, requestId: e2.requestId }));
      });
    }
  }
  const zn = "token无效，跳转登录页面", Jn = "token过期，跳转登录页面", Hn = { TOKEN_INVALID_TOKEN_EXPIRED: Jn, TOKEN_INVALID_INVALID_CLIENTID: zn, TOKEN_INVALID: zn, TOKEN_INVALID_WRONG_TOKEN: zn, TOKEN_INVALID_ANONYMOUS_USER: zn }, Gn = { "uni-id-token-expired": Jn, "uni-id-check-token-failed": zn, "uni-id-token-not-exist": zn, "uni-id-check-device-feature-failed": zn };
  function Vn(e, t2) {
    let n2 = "";
    return n2 = e ? `${e}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function Yn(e = [], t2 = "") {
    const n2 = [], s2 = [];
    return e.forEach((e2) => {
      true === e2.needLogin ? n2.push(Vn(t2, e2.path)) : false === e2.needLogin && s2.push(Vn(t2, e2.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function Qn(e) {
    return e.split("?")[0].replace(/^\//, "");
  }
  function Xn() {
    return function(e) {
      let t2 = e && e.$page && e.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e = getCurrentPages();
      return e[e.length - 1];
    }());
  }
  function Zn() {
    return Qn(Xn());
  }
  function es$1(e = "", t2 = {}) {
    if (!e)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = Qn(e);
    return n2.some((e2) => e2.pagePath === s2);
  }
  const ts = !!t$1.uniIdRouter;
  const { loginPage: ns, routerNeedLogin: ss, resToLogin: rs, needLoginPage: is, notNeedLoginPage: os, loginPageInTabBar: as } = function({ pages: e = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = t$1) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = Yn(e), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
      const t2 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = Yn(r3, s3);
        t2.push(...i3), n3.push(...o3);
      }), { needLoginPage: t2, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: es$1(i2, r2) };
  }();
  if (is.indexOf(ns) > -1)
    throw new Error(`Login page [${ns}] should not be "needLogin", please check your pages.json`);
  function cs(e) {
    const t2 = Zn();
    if ("/" === e.charAt(0))
      return e;
    const [n2, s2] = e.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e2 = 0; e2 < r2.length; e2++) {
      const t3 = r2[e2];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function us(e) {
    const t2 = Qn(cs(e));
    return !(os.indexOf(t2) > -1) && (is.indexOf(t2) > -1 || ss.some((t3) => function(e2, t4) {
      return new RegExp(t4).test(e2);
    }(e, t3)));
  }
  function hs({ redirect: e }) {
    const t2 = Qn(e), n2 = Qn(ns);
    return Zn() !== n2 && t2 !== n2;
  }
  function ls({ api: e, redirect: t2 } = {}) {
    if (!t2 || !hs({ redirect: t2 }))
      return;
    const n2 = function(e2, t3) {
      return "/" !== e2.charAt(0) && (e2 = "/" + e2), t3 ? e2.indexOf("?") > -1 ? e2 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e2 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e2;
    }(ns, t2);
    as ? "navigateTo" !== e && "redirectTo" !== e || (e = "switchTab") : "switchTab" === e && (e = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e]({ url: n2 });
    });
  }
  function ds({ url: e } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e2, tokenExpired: t3 } = ie();
      let n3;
      if (e2) {
        if (t3 < Date.now()) {
          const e3 = "uni-id-token-expired";
          n3 = { errCode: e3, errMsg: Gn[e3] };
        }
      } else {
        const e3 = "uni-id-check-token-failed";
        n3 = { errCode: e3, errMsg: Gn[e3] };
      }
      return n3;
    }();
    if (us(e) && n2) {
      n2.uniIdRedirectUrl = e;
      if (G($).length > 0)
        return setTimeout(() => {
          Q($, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function ps() {
    !function() {
      const e2 = Xn(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = ds({ url: e2 });
      t2 || n2 && ls({ api: "redirectTo", redirect: e2 });
    }();
    const e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e.length; t2++) {
      const n2 = e[t2];
      uni.addInterceptor(n2, { invoke(e2) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = ds({ url: e2.url });
        return t3 ? e2 : s2 ? (ls({ api: n2, redirect: cs(e2.url) }), false) : e2;
      } });
    }
  }
  function fs() {
    this.onResponse((e) => {
      const { type: t2, content: n2 } = e;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e2) {
            if ("object" != typeof e2)
              return false;
            const { errCode: t3 } = e2 || {};
            return t3 in Gn;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e2) {
            if ("object" != typeof e2)
              return false;
            const { errCode: t3 } = e2 || {};
            return t3 in Hn;
          }(n2);
      }
      s2 && function(e2 = {}) {
        const t3 = G($);
        ee().then(() => {
          const n3 = Xn();
          if (n3 && hs({ redirect: n3 }))
            return t3.length > 0 ? Q($, Object.assign({ uniIdRedirectUrl: n3 }, e2)) : void (ns && ls({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function gs(e) {
    !function(e2) {
      e2.onResponse = function(e3) {
        V(B, e3);
      }, e2.offResponse = function(e3) {
        Y(B, e3);
      };
    }(e), function(e2) {
      e2.onNeedLogin = function(e3) {
        V($, e3);
      }, e2.offNeedLogin = function(e3) {
        Y($, e3);
      }, ts && (U("_globalUniCloudStatus").needLoginInit || (U("_globalUniCloudStatus").needLoginInit = true, ee().then(() => {
        ps.call(e2);
      }), rs && fs.call(e2)));
    }(e), function(e2) {
      e2.onRefreshToken = function(e3) {
        V(W, e3);
      }, e2.offRefreshToken = function(e3) {
        Y(W, e3);
      };
    }(e);
  }
  let ms;
  const ys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _s = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function ws() {
    const e = ie().token || "", t2 = e.split(".");
    if (!e || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(ms(s2).split("").map(function(e2) {
        return "%" + ("00" + e2.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e2) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e2.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  ms = "function" != typeof atob ? function(e) {
    if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !_s.test(e))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e += "==".slice(2 - (3 & e.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e.length; )
      t2 = ys.indexOf(e.charAt(i2++)) << 18 | ys.indexOf(e.charAt(i2++)) << 12 | (n2 = ys.indexOf(e.charAt(i2++))) << 6 | (s2 = ys.indexOf(e.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var vs = s(function(e, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e2, t3) {
      return e2.tempFiles.forEach((e3, n3) => {
        e3.name || (e3.name = e3.path.substring(e3.path.lastIndexOf("/") + 1)), t3 && (e3.fileType = t3), e3.cloudPath = Date.now() + "_" + n3 + e3.name.substring(e3.name.lastIndexOf("."));
      }), e2.tempFilePaths || (e2.tempFilePaths = e2.tempFiles.map((e3) => e3.path)), e2;
    }
    function i2(e2, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e3) => {
        if (s3) {
          const t4 = s3(e3);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e3 : t5);
        }
        return e3;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e3, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e4) => !e4.url && !e4.errMsg) && n3(t5));
            const u2 = i3[s5];
            e3.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e4) {
              e4.index = s5, e4.tempFile = u2, e4.tempFilePath = u2.path, r4 && r4(e4);
            } }).then((e4) => {
              u2.url = e4.fileID, s5 < o2 && c2();
            }).catch((e4) => {
              u2.errMsg = e4.errMsg || e4.message, s5 < o2 && c2();
            });
          }
        });
      }(e2, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e2) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e2, function(e3) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e3;
          return new Promise((e4, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e4(r2(t5, "image"));
            }, fail(e5) {
              a2({ errMsg: e5.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e2, function(e3) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e3;
          return new Promise((e4, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e4(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e5) {
              c2({ errMsg: e5.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e2, function(e3) {
          const { count: t4, extension: n3 } = e3;
          return new Promise((e4, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e4(r2(t5));
            }, fail(e5) {
              i3({ errMsg: e5.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), Is = n(vs);
  const Ss = "manual";
  function bs(e) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e2 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e2.push(this[t2]);
        }), e2;
      }, (e2, t2) => {
        if (this.loadtime === Ss)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e2.length; r2++)
          e2[r2] !== t2[r2] && (s2.push(e2[r2]), n2 = true);
        e2[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e2, t2) {
    }, mixinDatacomEasyGet({ getone: e2 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e2 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e3) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e3, n2 && n2(e3);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2 = e.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const h2 = t2.orderby || this.orderby;
      h2 && (n2 = n2.orderBy(h2));
      const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function ks(e) {
    return function(t2, n2 = {}) {
      n2 = function(e2, t3 = {}) {
        return e2.customUI = t3.customUI || e2.customUI, e2.parseSystemError = t3.parseSystemError || e2.parseSystemError, Object.assign(e2.loadingOptions, t3.loadingOptions), Object.assign(e2.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e2.secretMethods = t3.secretMethods), e2;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get: (s3, c2) => function({ fn: e2, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await M(q(t3, "invoke"), { ...r3 }), i3 = await e2(...s4), await M(q(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e3) {
            throw o3 = e3, await M(q(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await M(q(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...u2) {
        let l2;
        a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
        const d2 = { name: t2, type: h, data: { method: c2, params: u2 } };
        "object" == typeof n2.secretMethods && function(e2, t3) {
          const n3 = t3.data.method, s5 = e2.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d2);
        let p2 = false;
        try {
          l2 = await e.callFunction(d2);
        } catch (e2) {
          p2 = true, l2 = { result: new ne(e2) };
        }
        const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
        if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (oe(y2), Q(W, { ...y2 })), g2) {
          let e2 = m2;
          if (p2 && o2) {
            e2 = (await o2({ objectName: t2, methodName: c2, params: u2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
          }
          if (a2)
            if ("toast" === i2.type)
              uni.showToast({ title: e2, icon: "none" });
            else {
              if ("modal" !== i2.type)
                throw new Error(`Invalid errorOptions.type: ${i2.type}`);
              {
                const { confirm: t3 } = await async function({ title: e3, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    uni.showModal({ title: e3, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e4) {
                      i3(e4);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "提示", content: e2, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                if (i2.retry && t3)
                  return s4(...u2);
              }
            }
          const n3 = new ne({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
          throw n3.detail = l2.result, Q(B, { type: H, content: n3 }), n3;
        }
        return Q(B, { type: H, content: l2.result }), l2.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e2 } = {}) {
        return { objectName: t2, methodName: c2, params: e2 };
      } }) });
    };
  }
  function Cs(e) {
    return U("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e.config.spaceId));
  }
  async function Ts({ openid: e, callLoginByWeixin: t2 = false } = {}) {
    Cs(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${P}\``);
  }
  async function Ps(e) {
    const t2 = Cs(this);
    return t2.initPromise || (t2.initPromise = Ts.call(this, e)), t2.initPromise;
  }
  function As(e) {
    return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
      return Ps.call(e, { openid: t2, callLoginByWeixin: n2 });
    };
  }
  function Es(e) {
    const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
    return function(n2) {
      return new Promise((s2, r2) => {
        t2[e]({ ...n2, success(e2) {
          s2(e2);
        }, fail(e2) {
          r2(e2);
        } });
      });
    };
  }
  class Os extends class {
    constructor() {
      this._callback = {};
    }
    addListener(e, t2) {
      this._callback[e] || (this._callback[e] = []), this._callback[e].push(t2);
    }
    on(e, t2) {
      return this.addListener(e, t2);
    }
    removeListener(e, t2) {
      if (!t2)
        throw new Error('The "listener" argument must be of type function. Received undefined');
      const n2 = this._callback[e];
      if (!n2)
        return;
      const s2 = function(e2, t3) {
        for (let n3 = e2.length - 1; n3 >= 0; n3--)
          if (e2[n3] === t3)
            return n3;
        return -1;
      }(n2, t2);
      n2.splice(s2, 1);
    }
    off(e, t2) {
      return this.removeListener(e, t2);
    }
    removeAllListener(e) {
      delete this._callback[e];
    }
    emit(e, ...t2) {
      const n2 = this._callback[e];
      if (n2)
        for (let e2 = 0; e2 < n2.length; e2++)
          n2[e2](...t2);
    }
  } {
    constructor() {
      super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
    }
    init() {
      return Promise.all([Es("getSystemInfo")(), Es("getPushClientId")()]).then(([{ appId: e } = {}, { cid: t2 } = {}] = []) => {
        if (!e)
          throw new Error("Invalid appId, please check the manifest.json file");
        if (!t2)
          throw new Error("Invalid push client id");
        this._appId = e, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
      }, (e) => {
        throw this.emit("error", e), this.close(), e;
      });
    }
    async open() {
      return this.init();
    }
    _isUniCloudSSE(e) {
      if ("receive" !== e.type)
        return false;
      const t2 = e && e.data && e.data.payload;
      return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
    }
    _receivePushMessage(e) {
      if (!this._isUniCloudSSE(e))
        return;
      const t2 = e && e.data && e.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
      this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
    }
    _consumMessage() {
      for (; ; ) {
        const e = this._payloadQueue.find((e2) => e2.messageId === this._currentMessageId + 1);
        if (!e)
          break;
        this._currentMessageId++, this._parseMessagePayload(e);
      }
    }
    _parseMessagePayload(e) {
      const { action: t2, messageId: n2, message: s2 } = e;
      "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
    }
    _appendMessage({ messageId: e, message: t2 } = {}) {
      this.emit("message", t2);
    }
    _end({ messageId: e, message: t2 } = {}) {
      this.emit("end", t2), this.close();
    }
    _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
    _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
    toJSON() {
      return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
    }
    close() {
      this._destroy(), this.emit("close");
    }
  }
  async function xs(e, t2) {
    const n2 = `http://${e}:${t2}/system/ping`;
    try {
      const e2 = await (s2 = { url: n2, timeout: 500 }, new Promise((e3, t3) => {
        se.request({ ...s2, success(t4) {
          e3(t4);
        }, fail(e4) {
          t3(e4);
        } });
      }));
      return !(!e2.data || 0 !== e2.data.code);
    } catch (e2) {
      return false;
    }
    var s2;
  }
  async function Rs(e) {
    {
      const { osName: e2, osVersion: t3 } = ue();
      "ios" === e2 && function(e3) {
        if (!e3 || "string" != typeof e3)
          return 0;
        const t4 = e3.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）");
    }
    const t2 = e.__dev__;
    if (!t2.debugInfo)
      return;
    const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await async function(e2, t3) {
      let n3;
      for (let s3 = 0; s3 < e2.length; s3++) {
        const r3 = e2[s3];
        if (await xs(r3, t3)) {
          n3 = r3;
          break;
        }
      }
      return { address: n3, port: t3 };
    }(n2, s2);
    if (r2)
      return t2.localAddress = r2, void (t2.localPort = s2);
    const i2 = console["error"];
    let o2 = "";
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === P.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function Us(e) {
    e._initPromiseHub || (e._initPromiseHub = new I({ createPromise: function() {
      let t2 = Promise.resolve();
      var n2;
      n2 = 1, t2 = new Promise((e2) => {
        setTimeout(() => {
          e2();
        }, n2);
      });
      const s2 = e.auth();
      return t2.then(() => s2.getLoginState()).then((e2) => e2 ? Promise.resolve() : s2.signInAnonymously());
    } }));
  }
  const Ls = { tcb: St, tencent: St, aliyun: me, private: kt };
  let Ns = new class {
    init(e) {
      let t2 = {};
      const n2 = Ls[e.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e), function(e2) {
        const t3 = {};
        e2.__dev__ = t3, t3.debugLog = "app" === P;
        const n3 = A;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new I({ createPromise: function() {
          return Rs(e2);
        } });
        t3.initLocalNetwork = function() {
          return s2.exec();
        };
      }(t2), Us(t2), Rn(t2), function(e2) {
        const t3 = e2.uploadFile;
        e2.uploadFile = function(e3) {
          return t3.call(this, e3);
        };
      }(t2), function(e2) {
        e2.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e2.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = $n(Wn, { uniClient: e2 });
          return this._database = n3, n3;
        }, e2.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e2.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = $n(Wn, { uniClient: e2, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e2) {
        e2.getCurrentUserInfo = ws, e2.chooseAndUploadFile = Is.initChooseAndUploadFile(e2), Object.assign(e2, { get mixinDatacom() {
          return bs(e2);
        } }), e2.SSEChannel = Os, e2.initSecureNetworkByWeixin = As(e2), e2.importObject = ks(e2);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e2) => {
        if (!t2[e2])
          return;
        const n3 = t2[e2];
        t2[e2] = function() {
          return n3.apply(t2, Array.from(arguments));
        }, t2[e2] = function(e3, t3) {
          return function(n4) {
            let s2 = false;
            if ("callFunction" === t3) {
              const e4 = n4 && n4.type || u;
              s2 = e4 !== u;
            }
            const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
            n4 = n4 || {};
            const { success: o2, fail: a2, complete: c2 } = te(n4), h2 = i2.then(() => s2 ? Promise.resolve() : M(q(t3, "invoke"), n4)).then(() => e3.call(this, n4)).then((e4) => s2 ? Promise.resolve(e4) : M(q(t3, "success"), e4).then(() => M(q(t3, "complete"), e4)).then(() => (r2 && Q(B, { type: J, content: e4 }), Promise.resolve(e4))), (e4) => s2 ? Promise.reject(e4) : M(q(t3, "fail"), e4).then(() => M(q(t3, "complete"), e4)).then(() => (Q(B, { type: J, content: e4 }), Promise.reject(e4))));
            if (!(o2 || a2 || c2))
              return h2;
            h2.then((e4) => {
              o2 && o2(e4), c2 && c2(e4), r2 && Q(B, { type: J, content: e4 });
            }, (e4) => {
              a2 && a2(e4), c2 && c2(e4), r2 && Q(B, { type: J, content: e4 });
            });
          };
        }(t2[e2], e2).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e = E;
    let t2 = {};
    if (e && 1 === e.length)
      t2 = e[0], Ns = Ns.init(t2), Ns._isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e2) => {
        Ns[e2] = function() {
          return console.error(n2), Promise.reject(new ne({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(Ns, { get mixinDatacom() {
      return bs(Ns);
    } }), gs(Ns), Ns.addInterceptor = D, Ns.removeInterceptor = F, Ns.interceptObject = K;
  })();
  const en$2 = {
    "uni-datetime-picker.selectDate": "select date",
    "uni-datetime-picker.selectTime": "select time",
    "uni-datetime-picker.selectDateTime": "select date and time",
    "uni-datetime-picker.startDate": "start date",
    "uni-datetime-picker.endDate": "end date",
    "uni-datetime-picker.startTime": "start time",
    "uni-datetime-picker.endTime": "end time",
    "uni-datetime-picker.ok": "ok",
    "uni-datetime-picker.clear": "clear",
    "uni-datetime-picker.cancel": "cancel",
    "uni-datetime-picker.year": "-",
    "uni-datetime-picker.month": "",
    "uni-calender.MON": "MON",
    "uni-calender.TUE": "TUE",
    "uni-calender.WED": "WED",
    "uni-calender.THU": "THU",
    "uni-calender.FRI": "FRI",
    "uni-calender.SAT": "SAT",
    "uni-calender.SUN": "SUN",
    "uni-calender.confirm": "confirm"
  };
  const zhHans$2 = {
    "uni-datetime-picker.selectDate": "选择日期",
    "uni-datetime-picker.selectTime": "选择时间",
    "uni-datetime-picker.selectDateTime": "选择日期时间",
    "uni-datetime-picker.startDate": "开始日期",
    "uni-datetime-picker.endDate": "结束日期",
    "uni-datetime-picker.startTime": "开始时间",
    "uni-datetime-picker.endTime": "结束时间",
    "uni-datetime-picker.ok": "确定",
    "uni-datetime-picker.clear": "清除",
    "uni-datetime-picker.cancel": "取消",
    "uni-datetime-picker.year": "年",
    "uni-datetime-picker.month": "月",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六",
    "uni-calender.confirm": "确认"
  };
  const zhHant$2 = {
    "uni-datetime-picker.selectDate": "選擇日期",
    "uni-datetime-picker.selectTime": "選擇時間",
    "uni-datetime-picker.selectDateTime": "選擇日期時間",
    "uni-datetime-picker.startDate": "開始日期",
    "uni-datetime-picker.endDate": "結束日期",
    "uni-datetime-picker.startTime": "開始时间",
    "uni-datetime-picker.endTime": "結束时间",
    "uni-datetime-picker.ok": "確定",
    "uni-datetime-picker.clear": "清除",
    "uni-datetime-picker.cancel": "取消",
    "uni-datetime-picker.year": "年",
    "uni-datetime-picker.month": "月",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六",
    "uni-calender.confirm": "確認"
  };
  const i18nMessages = {
    en: en$2,
    "zh-Hans": zhHans$2,
    "zh-Hant": zhHant$2
  };
  initVueI18n(i18nMessages);
  initVueI18n(i18nMessages);
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  function getAugmentedNamespace(n2) {
    if (n2.__esModule)
      return n2;
    var f2 = n2.default;
    if (typeof f2 == "function") {
      var a2 = function a3() {
        if (this instanceof a3) {
          var args = [null];
          args.push.apply(args, arguments);
          var Ctor = Function.bind.apply(f2, args);
          return new Ctor();
        }
        return f2.apply(this, arguments);
      };
      a2.prototype = f2.prototype;
    } else
      a2 = {};
    Object.defineProperty(a2, "__esModule", { value: true });
    Object.keys(n2).forEach(function(k2) {
      var d2 = Object.getOwnPropertyDescriptor(n2, k2);
      Object.defineProperty(a2, k2, d2.get ? d2 : {
        enumerable: true,
        get: function() {
          return n2[k2];
        }
      });
    });
    return a2;
  }
  var dayjs_minExports$1 = {};
  var dayjs_min = {
    get exports() {
      return dayjs_minExports$1;
    },
    set exports(v2) {
      dayjs_minExports$1 = v2;
    }
  };
  var hasRequiredDayjs_min;
  function requireDayjs_min() {
    if (hasRequiredDayjs_min)
      return dayjs_minExports$1;
    hasRequiredDayjs_min = 1;
    (function(module, exports) {
      !function(t2, e) {
        module.exports = e();
      }(commonjsGlobal, function() {
        var t2 = 1e3, e = 6e4, n2 = 36e5, r2 = "millisecond", i2 = "second", s2 = "minute", u2 = "hour", a2 = "day", o2 = "week", c2 = "month", f2 = "quarter", h2 = "year", d2 = "date", l2 = "Invalid Date", $2 = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y2 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M2 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
          var e2 = ["th", "st", "nd", "rd"], n3 = t3 % 100;
          return "[" + t3 + (e2[(n3 - 20) % 10] || e2[n3] || e2[0]) + "]";
        } }, m2 = function(t3, e2, n3) {
          var r3 = String(t3);
          return !r3 || r3.length >= e2 ? t3 : "" + Array(e2 + 1 - r3.length).join(n3) + t3;
        }, v2 = { s: m2, z: function(t3) {
          var e2 = -t3.utcOffset(), n3 = Math.abs(e2), r3 = Math.floor(n3 / 60), i3 = n3 % 60;
          return (e2 <= 0 ? "+" : "-") + m2(r3, 2, "0") + ":" + m2(i3, 2, "0");
        }, m: function t3(e2, n3) {
          if (e2.date() < n3.date())
            return -t3(n3, e2);
          var r3 = 12 * (n3.year() - e2.year()) + (n3.month() - e2.month()), i3 = e2.clone().add(r3, c2), s3 = n3 - i3 < 0, u3 = e2.clone().add(r3 + (s3 ? -1 : 1), c2);
          return +(-(r3 + (n3 - i3) / (s3 ? i3 - u3 : u3 - i3)) || 0);
        }, a: function(t3) {
          return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
        }, p: function(t3) {
          return { M: c2, y: h2, w: o2, d: a2, D: d2, h: u2, m: s2, s: i2, ms: r2, Q: f2 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t3) {
          return void 0 === t3;
        } }, g2 = "en", D2 = {};
        D2[g2] = M2;
        var p2 = function(t3) {
          return t3 instanceof b2;
        }, S2 = function t3(e2, n3, r3) {
          var i3;
          if (!e2)
            return g2;
          if ("string" == typeof e2) {
            var s3 = e2.toLowerCase();
            D2[s3] && (i3 = s3), n3 && (D2[s3] = n3, i3 = s3);
            var u3 = e2.split("-");
            if (!i3 && u3.length > 1)
              return t3(u3[0]);
          } else {
            var a3 = e2.name;
            D2[a3] = e2, i3 = a3;
          }
          return !r3 && i3 && (g2 = i3), i3 || !r3 && g2;
        }, w2 = function(t3, e2) {
          if (p2(t3))
            return t3.clone();
          var n3 = "object" == typeof e2 ? e2 : {};
          return n3.date = t3, n3.args = arguments, new b2(n3);
        }, O = v2;
        O.l = S2, O.i = p2, O.w = function(t3, e2) {
          return w2(t3, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
        };
        var b2 = function() {
          function M3(t3) {
            this.$L = S2(t3.locale, null, true), this.parse(t3);
          }
          var m3 = M3.prototype;
          return m3.parse = function(t3) {
            this.$d = function(t4) {
              var e2 = t4.date, n3 = t4.utc;
              if (null === e2)
                return /* @__PURE__ */ new Date(NaN);
              if (O.u(e2))
                return /* @__PURE__ */ new Date();
              if (e2 instanceof Date)
                return new Date(e2);
              if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                var r3 = e2.match($2);
                if (r3) {
                  var i3 = r3[2] - 1 || 0, s3 = (r3[7] || "0").substring(0, 3);
                  return n3 ? new Date(Date.UTC(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3)) : new Date(r3[1], i3, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s3);
                }
              }
              return new Date(e2);
            }(t3), this.$x = t3.x || {}, this.init();
          }, m3.init = function() {
            var t3 = this.$d;
            this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
          }, m3.$utils = function() {
            return O;
          }, m3.isValid = function() {
            return !(this.$d.toString() === l2);
          }, m3.isSame = function(t3, e2) {
            var n3 = w2(t3);
            return this.startOf(e2) <= n3 && n3 <= this.endOf(e2);
          }, m3.isAfter = function(t3, e2) {
            return w2(t3) < this.startOf(e2);
          }, m3.isBefore = function(t3, e2) {
            return this.endOf(e2) < w2(t3);
          }, m3.$g = function(t3, e2, n3) {
            return O.u(t3) ? this[e2] : this.set(n3, t3);
          }, m3.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m3.valueOf = function() {
            return this.$d.getTime();
          }, m3.startOf = function(t3, e2) {
            var n3 = this, r3 = !!O.u(e2) || e2, f3 = O.p(t3), l3 = function(t4, e3) {
              var i3 = O.w(n3.$u ? Date.UTC(n3.$y, e3, t4) : new Date(n3.$y, e3, t4), n3);
              return r3 ? i3 : i3.endOf(a2);
            }, $3 = function(t4, e3) {
              return O.w(n3.toDate()[t4].apply(n3.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n3);
            }, y3 = this.$W, M4 = this.$M, m4 = this.$D, v3 = "set" + (this.$u ? "UTC" : "");
            switch (f3) {
              case h2:
                return r3 ? l3(1, 0) : l3(31, 11);
              case c2:
                return r3 ? l3(1, M4) : l3(0, M4 + 1);
              case o2:
                var g3 = this.$locale().weekStart || 0, D3 = (y3 < g3 ? y3 + 7 : y3) - g3;
                return l3(r3 ? m4 - D3 : m4 + (6 - D3), M4);
              case a2:
              case d2:
                return $3(v3 + "Hours", 0);
              case u2:
                return $3(v3 + "Minutes", 1);
              case s2:
                return $3(v3 + "Seconds", 2);
              case i2:
                return $3(v3 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m3.endOf = function(t3) {
            return this.startOf(t3, false);
          }, m3.$set = function(t3, e2) {
            var n3, o3 = O.p(t3), f3 = "set" + (this.$u ? "UTC" : ""), l3 = (n3 = {}, n3[a2] = f3 + "Date", n3[d2] = f3 + "Date", n3[c2] = f3 + "Month", n3[h2] = f3 + "FullYear", n3[u2] = f3 + "Hours", n3[s2] = f3 + "Minutes", n3[i2] = f3 + "Seconds", n3[r2] = f3 + "Milliseconds", n3)[o3], $3 = o3 === a2 ? this.$D + (e2 - this.$W) : e2;
            if (o3 === c2 || o3 === h2) {
              var y3 = this.clone().set(d2, 1);
              y3.$d[l3]($3), y3.init(), this.$d = y3.set(d2, Math.min(this.$D, y3.daysInMonth())).$d;
            } else
              l3 && this.$d[l3]($3);
            return this.init(), this;
          }, m3.set = function(t3, e2) {
            return this.clone().$set(t3, e2);
          }, m3.get = function(t3) {
            return this[O.p(t3)]();
          }, m3.add = function(r3, f3) {
            var d3, l3 = this;
            r3 = Number(r3);
            var $3 = O.p(f3), y3 = function(t3) {
              var e2 = w2(l3);
              return O.w(e2.date(e2.date() + Math.round(t3 * r3)), l3);
            };
            if ($3 === c2)
              return this.set(c2, this.$M + r3);
            if ($3 === h2)
              return this.set(h2, this.$y + r3);
            if ($3 === a2)
              return y3(1);
            if ($3 === o2)
              return y3(7);
            var M4 = (d3 = {}, d3[s2] = e, d3[u2] = n2, d3[i2] = t2, d3)[$3] || 1, m4 = this.$d.getTime() + r3 * M4;
            return O.w(m4, this);
          }, m3.subtract = function(t3, e2) {
            return this.add(-1 * t3, e2);
          }, m3.format = function(t3) {
            var e2 = this, n3 = this.$locale();
            if (!this.isValid())
              return n3.invalidDate || l2;
            var r3 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i3 = O.z(this), s3 = this.$H, u3 = this.$m, a3 = this.$M, o3 = n3.weekdays, c3 = n3.months, f3 = n3.meridiem, h3 = function(t4, n4, i4, s4) {
              return t4 && (t4[n4] || t4(e2, r3)) || i4[n4].slice(0, s4);
            }, d3 = function(t4) {
              return O.s(s3 % 12 || 12, t4, "0");
            }, $3 = f3 || function(t4, e3, n4) {
              var r4 = t4 < 12 ? "AM" : "PM";
              return n4 ? r4.toLowerCase() : r4;
            };
            return r3.replace(y2, function(t4, r4) {
              return r4 || function(t5) {
                switch (t5) {
                  case "YY":
                    return String(e2.$y).slice(-2);
                  case "YYYY":
                    return O.s(e2.$y, 4, "0");
                  case "M":
                    return a3 + 1;
                  case "MM":
                    return O.s(a3 + 1, 2, "0");
                  case "MMM":
                    return h3(n3.monthsShort, a3, c3, 3);
                  case "MMMM":
                    return h3(c3, a3);
                  case "D":
                    return e2.$D;
                  case "DD":
                    return O.s(e2.$D, 2, "0");
                  case "d":
                    return String(e2.$W);
                  case "dd":
                    return h3(n3.weekdaysMin, e2.$W, o3, 2);
                  case "ddd":
                    return h3(n3.weekdaysShort, e2.$W, o3, 3);
                  case "dddd":
                    return o3[e2.$W];
                  case "H":
                    return String(s3);
                  case "HH":
                    return O.s(s3, 2, "0");
                  case "h":
                    return d3(1);
                  case "hh":
                    return d3(2);
                  case "a":
                    return $3(s3, u3, true);
                  case "A":
                    return $3(s3, u3, false);
                  case "m":
                    return String(u3);
                  case "mm":
                    return O.s(u3, 2, "0");
                  case "s":
                    return String(e2.$s);
                  case "ss":
                    return O.s(e2.$s, 2, "0");
                  case "SSS":
                    return O.s(e2.$ms, 3, "0");
                  case "Z":
                    return i3;
                }
                return null;
              }(t4) || i3.replace(":", "");
            });
          }, m3.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m3.diff = function(r3, d3, l3) {
            var $3, y3 = this, M4 = O.p(d3), m4 = w2(r3), v3 = (m4.utcOffset() - this.utcOffset()) * e, g3 = this - m4, D3 = function() {
              return O.m(y3, m4);
            };
            switch (M4) {
              case h2:
                $3 = D3() / 12;
                break;
              case c2:
                $3 = D3();
                break;
              case f2:
                $3 = D3() / 3;
                break;
              case o2:
                $3 = (g3 - v3) / 6048e5;
                break;
              case a2:
                $3 = (g3 - v3) / 864e5;
                break;
              case u2:
                $3 = g3 / n2;
                break;
              case s2:
                $3 = g3 / e;
                break;
              case i2:
                $3 = g3 / t2;
                break;
              default:
                $3 = g3;
            }
            return l3 ? $3 : O.a($3);
          }, m3.daysInMonth = function() {
            return this.endOf(c2).$D;
          }, m3.$locale = function() {
            return D2[this.$L];
          }, m3.locale = function(t3, e2) {
            if (!t3)
              return this.$L;
            var n3 = this.clone(), r3 = S2(t3, e2, true);
            return r3 && (n3.$L = r3), n3;
          }, m3.clone = function() {
            return O.w(this.$d, this);
          }, m3.toDate = function() {
            return new Date(this.valueOf());
          }, m3.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m3.toISOString = function() {
            return this.$d.toISOString();
          }, m3.toString = function() {
            return this.$d.toUTCString();
          }, M3;
        }(), _2 = b2.prototype;
        return w2.prototype = _2, [["$ms", r2], ["$s", i2], ["$m", s2], ["$H", u2], ["$W", a2], ["$M", c2], ["$y", h2], ["$D", d2]].forEach(function(t3) {
          _2[t3[1]] = function(e2) {
            return this.$g(e2, t3[0], t3[1]);
          };
        }), w2.extend = function(t3, e2) {
          return t3.$i || (t3(e2, b2, w2), t3.$i = true), w2;
        }, w2.locale = S2, w2.isDayjs = p2, w2.unix = function(t3) {
          return w2(1e3 * t3);
        }, w2.en = D2[g2], w2.Ls = D2, w2.p = {}, w2;
      });
    })(dayjs_min);
    return dayjs_minExports$1;
  }
  var dayjs_minExports = requireDayjs_min();
  const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
  var zhCnExports = {};
  var zhCn = {
    get exports() {
      return zhCnExports;
    },
    set exports(v2) {
      zhCnExports = v2;
    }
  };
  (function(module, exports) {
    !function(e, _2) {
      module.exports = _2(requireDayjs_min());
    }(commonjsGlobal, function(e) {
      function _2(e2) {
        return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
      }
      var t2 = _2(e), d2 = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(e2, _3) {
        return "W" === _3 ? e2 + "周" : e2 + "日";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(e2, _3) {
        var t3 = 100 * e2 + _3;
        return t3 < 600 ? "凌晨" : t3 < 900 ? "早上" : t3 < 1100 ? "上午" : t3 < 1300 ? "中午" : t3 < 1800 ? "下午" : "晚上";
      } };
      return t2.default.locale(d2, null, true), d2;
    });
  })(zhCn);
  dayjs.locale("zh-cn");
  function bind$2(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }
  const { toString } = Object.prototype;
  const { getPrototypeOf } = Object;
  const kindOf = ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  };
  const typeOfTest = (type) => (thing) => typeof thing === type;
  const { isArray: isArray$4 } = Array;
  const isUndefined = typeOfTest("undefined");
  function isBuffer$1(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  const isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  const isString$1 = typeOfTest("string");
  const isFunction = typeOfTest("function");
  const isNumber$1 = typeOfTest("number");
  const isObject = (thing) => thing !== null && typeof thing === "object";
  const isBoolean$1 = (thing) => thing === true || thing === false;
  const isPlainObject = (val) => {
    if (kindOf(val) !== "object") {
      return false;
    }
    const prototype2 = getPrototypeOf(val);
    return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };
  const isDate$1 = kindOfTest("Date");
  const isFile = kindOfTest("File");
  const isBlob = kindOfTest("Blob");
  const isFileList = kindOfTest("FileList");
  const isStream = (val) => isObject(val) && isFunction(val.pipe);
  const isFormData = (thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
  };
  const isURLSearchParams = kindOfTest("URLSearchParams");
  const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i2;
    let l2;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray$4(obj)) {
      for (i2 = 0, l2 = obj.length; i2 < l2; i2++) {
        fn.call(null, obj[i2], i2, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i2 = 0; i2 < len; i2++) {
        key = keys[i2];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i2 = keys.length;
    let _key;
    while (i2-- > 0) {
      _key = keys[i2];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  const _global = (() => {
    if (typeof globalThis !== "undefined")
      return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  const isContextDefined = (context) => !isUndefined(context) && context !== _global;
  function merge$1() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge$1(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge$1({}, val);
      } else if (isArray$4(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i2 = 0, l2 = arguments.length; i2 < l2; i2++) {
      arguments[i2] && forEach(arguments[i2], assignValue);
    }
    return result;
  }
  const extend = (a2, b2, thisArg, { allOwnKeys } = {}) => {
    forEach(b2, (val, key) => {
      if (thisArg && isFunction(val)) {
        a2[key] = bind$2(val, thisArg);
      } else {
        a2[key] = val;
      }
    }, { allOwnKeys });
    return a2;
  };
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  };
  const inherits = (constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i2;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null)
      return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i2 = props.length;
      while (i2-- > 0) {
        prop = props[i2];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
  const toArray = (thing) => {
    if (!thing)
      return null;
    if (isArray$4(thing))
      return thing;
    let i2 = thing.length;
    if (!isNumber$1(i2))
      return null;
    const arr = new Array(i2);
    while (i2-- > 0) {
      arr[i2] = thing[i2];
    }
    return arr;
  };
  const isTypedArray = ((TypedArray2) => {
    return (thing) => {
      return TypedArray2 && thing instanceof TypedArray2;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };
  const isHTMLForm = kindOfTest("HTMLFormElement");
  const toCamelCase = (str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      function replacer(m2, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };
  const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  const isRegExp$2 = kindOfTest("RegExp");
  const reduceDescriptors = (obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors2, (descriptor, name) => {
      if (reducer(descriptor, name, obj) !== false) {
        reducedDescriptors[name] = descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };
  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction(value))
        return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  };
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    };
    isArray$4(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  const noop = () => {
  };
  const toFiniteNumber = (value, defaultValue) => {
    value = +value;
    return Number.isFinite(value) ? value : defaultValue;
  };
  const ALPHA = "abcdefghijklmnopqrstuvwxyz";
  const DIGIT = "0123456789";
  const ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };
  const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = "";
    const { length } = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length | 0];
    }
    return str;
  };
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
  }
  const toJSONObject = (obj) => {
    const stack = new Array(10);
    const visit = (source, i2) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack[i2] = source;
          const target = isArray$4(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i2 + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i2] = void 0;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  const isAsyncFn = kindOfTest("AsyncFunction");
  const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
  const utils$3 = {
    isArray: isArray$4,
    isArrayBuffer,
    isBuffer: isBuffer$1,
    isFormData,
    isArrayBufferView,
    isString: isString$1,
    isNumber: isNumber$1,
    isBoolean: isBoolean$1,
    isObject,
    isPlainObject,
    isUndefined,
    isDate: isDate$1,
    isFile,
    isBlob,
    isRegExp: isRegExp$2,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge: merge$1,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
  };
  function AxiosError(message, code, config, request2, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request2 && (this.request = request2);
    response && (this.response = response);
  }
  utils$3.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$3.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });
  const prototype$1 = AxiosError.prototype;
  const descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((code) => {
    descriptors[code] = { value: code };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype$1, "isAxiosError", { value: true });
  AxiosError.from = (error, code, config, request2, response, customProps) => {
    const axiosError = Object.create(prototype$1);
    utils$3.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    }, (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError.call(axiosError, error.message, code, config, request2, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  const httpAdapter = null;
  function isVisitable(thing) {
    return utils$3.isPlainObject(thing) || utils$3.isArray(thing);
  }
  function removeBrackets(key) {
    return utils$3.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path)
      return key;
    return path.concat(key).map(function each(token, i2) {
      token = removeBrackets(token);
      return !dots && i2 ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils$3.isArray(arr) && !arr.some(isVisitable);
  }
  const predicates = utils$3.toFlatObject(utils$3, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });
  function toFormData(obj, formData, options) {
    if (!utils$3.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new FormData();
    options = utils$3.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      return !utils$3.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils$3.isSpecCompliantForm(formData);
    if (!utils$3.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null)
        return "";
      if (utils$3.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils$3.isBlob(value)) {
        throw new AxiosError("Blob is not supported. Use a Buffer instead.");
      }
      if (utils$3.isArrayBuffer(value) || utils$3.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils$3.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils$3.isArray(value) && isFlatArray(value) || (utils$3.isFileList(value) || utils$3.endsWith(key, "[]")) && (arr = utils$3.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils$3.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils$3.isUndefined(value))
        return;
      if (stack.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils$3.forEach(value, function each(el, key) {
        const result = !(utils$3.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils$3.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils$3.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  function encode$2(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData(params, this, options);
  }
  const prototype = AxiosURLSearchParams.prototype;
  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };
  prototype.toString = function toString2(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode$2);
    } : encode$2;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
  };
  function encode$1(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode$1;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils$3.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$3.forEach(this.handlers, function forEachHandler(h2) {
        if (h2 !== null) {
          fn(h2);
        }
      });
    }
  }
  const InterceptorManager$1 = InterceptorManager;
  const transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };
  const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
  const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
  const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
  const isStandardBrowserEnv = (() => {
    let product;
    if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  })();
  const isStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  const platform = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    isStandardBrowserEnv,
    isStandardBrowserWebWorkerEnv,
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };
  function toURLEncodedForm(data, options) {
    return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform.isNode && utils$3.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }
  function parsePropPath(name) {
    return utils$3.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  function arrayToObject$1(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i2;
    const len = keys.length;
    let key;
    for (i2 = 0; i2 < len; i2++) {
      key = keys[i2];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils$3.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils$3.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils$3.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils$3.isArray(target[name])) {
        target[name] = arrayToObject$1(target[name]);
      }
      return !isNumericKey;
    }
    if (utils$3.isFormData(formData) && utils$3.isFunction(formData.entries)) {
      const obj = {};
      utils$3.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  const DEFAULT_CONTENT_TYPE = {
    "Content-Type": void 0
  };
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$3.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$3.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  const defaults$2 = {
    transitional: transitionalDefaults,
    adapter: ["xhr", "http"],
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils$3.isObject(data);
      if (isObjectPayload && utils$3.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils$3.isFormData(data);
      if (isFormData2) {
        if (!hasJSONContentType) {
          return data;
        }
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils$3.isArrayBuffer(data) || utils$3.isBuffer(data) || utils$3.isStream(data) || utils$3.isFile(data) || utils$3.isBlob(data)) {
        return data;
      }
      if (utils$3.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$3.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils$3.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional = this.transitional || defaults$2.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (data && utils$3.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    }
  };
  utils$3.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
    defaults$2.headers[method] = {};
  });
  utils$3.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    defaults$2.headers[method] = utils$3.merge(DEFAULT_CONTENT_TYPE);
  });
  const defaults$3 = defaults$2;
  const ignoreDuplicateOf = utils$3.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  const parseHeaders = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i2;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
      i2 = line.indexOf(":");
      key = line.substring(0, i2).trim().toLowerCase();
      val = line.substring(i2 + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  };
  const $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils$3.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$3.isFunction(filter)) {
      return filter.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils$3.isString(value))
      return;
    if (utils$3.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }
    if (utils$3.isRegExp(filter)) {
      return filter.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils$3.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils$3.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils$3.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils$3.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils$3.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$3.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils$3.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils$3.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$3.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils$3.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      if (utils$3.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i2 = keys.length;
      let deleted = false;
      while (i2--) {
        const key = keys[i2];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self2 = this;
      const headers = {};
      utils$3.forEach(this, (value, header) => {
        const key = utils$3.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils$3.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils$3.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach((target) => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype2 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype2, _header);
          accessors[lHeader] = true;
        }
      }
      utils$3.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  }
  AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils$3.freezeMethods(AxiosHeaders.prototype);
  utils$3.freezeMethods(AxiosHeaders);
  const AxiosHeaders$1 = AxiosHeaders;
  function transformData(fns, response) {
    const config = this || defaults$3;
    const context = response || config;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;
    utils$3.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }
  function CanceledError(message, config, request2) {
    AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request2);
    this.name = "CanceledError";
  }
  utils$3.inherits(CanceledError, AxiosError, {
    __CANCEL__: true
  });
  function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError(
        "Request failed with status code " + response.status,
        [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }
  const cookies = platform.isStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          const cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils$3.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils$3.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils$3.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }()
  );
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  const isURLSameOrigin = platform.isStandardBrowserEnv ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      const msie = /(msie|trident)/i.test(navigator.userAgent);
      const urlParsingNode = document.createElement("a");
      let originURL;
      function resolveURL(url) {
        let href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin2(requestURL) {
        const parsed = utils$3.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return function isURLSameOrigin2() {
        return true;
      };
    }()
  );
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  }
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push2(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i2 = tail;
      let bytesCount = 0;
      while (i2 !== head) {
        bytesCount += bytes[i2++];
        i2 = i2 % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  function progressEventReducer(listener, isDownloadStream) {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);
    return (e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e
      };
      data[isDownloadStream ? "download" : "upload"] = true;
      listener(data);
    };
  }
  const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  const xhrAdapter = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      let requestData = config.data;
      const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
      const responseType = config.responseType;
      let onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils$3.isFormData(requestData)) {
        if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
          requestHeaders.setContentType(false);
        } else {
          requestHeaders.setContentType("multipart/form-data;", false);
        }
      }
      let request2 = new XMLHttpRequest();
      if (config.auth) {
        const username = config.auth.username || "";
        const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
      }
      const fullPath = buildFullPath(config.baseURL, config.url);
      request2.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
      request2.timeout = config.timeout;
      function onloadend() {
        if (!request2) {
          return;
        }
        const responseHeaders = AxiosHeaders$1.from(
          "getAllResponseHeaders" in request2 && request2.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
        const response = {
          data: responseData,
          status: request2.status,
          statusText: request2.statusText,
          headers: responseHeaders,
          config,
          request: request2
        };
        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request2 = null;
      }
      if ("onloadend" in request2) {
        request2.onloadend = onloadend;
      } else {
        request2.onreadystatechange = function handleLoad() {
          if (!request2 || request2.readyState !== 4) {
            return;
          }
          if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request2.onabort = function handleAbort() {
        if (!request2) {
          return;
        }
        reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request2));
        request2 = null;
      };
      request2.onerror = function handleError() {
        reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request2));
        request2 = null;
      };
      request2.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional = config.transitional || transitionalDefaults;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError(
          timeoutErrorMessage,
          transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
          config,
          request2
        ));
        request2 = null;
      };
      if (platform.isStandardBrowserEnv) {
        const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName && cookies.read(config.xsrfCookieName);
        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request2) {
        utils$3.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request2.setRequestHeader(key, val);
        });
      }
      if (!utils$3.isUndefined(config.withCredentials)) {
        request2.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request2.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request2.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
      }
      if (typeof config.onUploadProgress === "function" && request2.upload) {
        request2.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
      }
      if (config.cancelToken || config.signal) {
        onCanceled = (cancel) => {
          if (!request2) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config, request2) : cancel);
          request2.abort();
          request2 = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(fullPath);
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
        return;
      }
      request2.send(requestData || null);
    });
  };
  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter
  };
  utils$3.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value });
    }
  });
  const adapters = {
    getAdapter: (adapters2) => {
      adapters2 = utils$3.isArray(adapters2) ? adapters2 : [adapters2];
      const { length } = adapters2;
      let nameOrAdapter;
      let adapter;
      for (let i2 = 0; i2 < length; i2++) {
        nameOrAdapter = adapters2[i2];
        if (adapter = utils$3.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
          break;
        }
      }
      if (!adapter) {
        if (adapter === false) {
          throw new AxiosError(
            `Adapter ${nameOrAdapter} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          );
        }
        throw new Error(
          utils$3.hasOwnProp(knownAdapters, nameOrAdapter) ? `Adapter '${nameOrAdapter}' is not available in the build` : `Unknown adapter '${nameOrAdapter}'`
        );
      }
      if (!utils$3.isFunction(adapter)) {
        throw new TypeError("adapter is not a function");
      }
      return adapter;
    },
    adapters: knownAdapters
  };
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError(null, config);
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders$1.from(config.headers);
    config.data = transformData.call(
      config,
      config.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters.getAdapter(config.adapter || defaults$3.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );
      response.headers = AxiosHeaders$1.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }
  const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
      if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source)) {
        return utils$3.merge.call({ caseless }, target, source);
      } else if (utils$3.isPlainObject(source)) {
        return utils$3.merge({}, source);
      } else if (utils$3.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a2, b2, caseless) {
      if (!utils$3.isUndefined(b2)) {
        return getMergedValue(a2, b2, caseless);
      } else if (!utils$3.isUndefined(a2)) {
        return getMergedValue(void 0, a2, caseless);
      }
    }
    function valueFromConfig2(a2, b2) {
      if (!utils$3.isUndefined(b2)) {
        return getMergedValue(void 0, b2);
      }
    }
    function defaultToConfig2(a2, b2) {
      if (!utils$3.isUndefined(b2)) {
        return getMergedValue(void 0, b2);
      } else if (!utils$3.isUndefined(a2)) {
        return getMergedValue(void 0, a2);
      }
    }
    function mergeDirectKeys(a2, b2, prop) {
      if (prop in config2) {
        return getMergedValue(a2, b2);
      } else if (prop in config1) {
        return getMergedValue(void 0, a2);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a2, b2) => mergeDeepProperties(headersToObject(a2), headersToObject(b2), true)
    };
    utils$3.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils$3.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }
  const VERSION = "1.4.0";
  const validators$1 = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i2) => {
    validators$1[type] = function validator2(thing) {
      return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
    };
  });
  const deprecatedWarnings = {};
  validators$1.transitional = function transitional(validator2, version2, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return (value, opt, opts) => {
      if (validator2 === false) {
        throw new AxiosError(
          formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
          AxiosError.ERR_DEPRECATED
        );
      }
      if (version2 && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        formatAppLog(
          "warn",
          "at node_modules/axios/lib/helpers/validator.js:43",
          formatMessage(
            opt,
            " has been deprecated since v" + version2 + " and will be removed in the near future"
          )
        );
      }
      return validator2 ? validator2(value, opt, opts) : true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i2 = keys.length;
    while (i2-- > 0) {
      const opt = keys[i2];
      const validator2 = schema[opt];
      if (validator2) {
        const value = options[opt];
        const result = value === void 0 || validator2(value, opt, options);
        if (result !== true) {
          throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
      }
    }
  }
  const validator = {
    assertOptions,
    validators: validators$1
  };
  const validators = validator.validators;
  class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager$1(),
        response: new InterceptorManager$1()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      const { transitional, paramsSerializer, headers } = config;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils$3.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders;
      contextHeaders = headers && utils$3.merge(
        headers.common,
        headers[config.method]
      );
      contextHeaders && utils$3.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method) => {
          delete headers[method];
        }
      );
      config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i2 = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i2 < len) {
          promise = promise.then(chain[i2++], chain[i2++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i2 = 0;
      while (i2 < len) {
        const onFulfilled = requestInterceptorChain[i2++];
        const onRejected = requestInterceptorChain[i2++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i2 = 0;
      len = responseInterceptorChain.length;
      while (i2 < len) {
        promise = promise.then(responseInterceptorChain[i2++], responseInterceptorChain[i2++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  }
  utils$3.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils$3.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        }));
      };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + "Form"] = generateHTTPMethod(true);
  });
  const Axios$1 = Axios;
  class CancelToken {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners)
          return;
        let i2 = token._listeners.length;
        while (i2-- > 0) {
          token._listeners[i2](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request2) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message, config, request2);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c2) {
        cancel = c2;
      });
      return {
        token,
        cancel
      };
    }
  }
  const CancelToken$1 = CancelToken;
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }
  function isAxiosError(payload) {
    return utils$3.isObject(payload) && payload.isAxiosError === true;
  }
  const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });
  const HttpStatusCode$1 = HttpStatusCode;
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance = bind$2(Axios$1.prototype.request, context);
    utils$3.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
    utils$3.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  const axios = createInstance(defaults$3);
  axios.Axios = Axios$1;
  axios.CanceledError = CanceledError;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData;
  axios.AxiosError = AxiosError;
  axios.Cancel = axios.CanceledError;
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders$1;
  axios.formToJSON = (thing) => formDataToJSON(utils$3.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.HttpStatusCode = HttpStatusCode$1;
  axios.default = axios;
  const axios$1 = axios;
  const backToUc = () => {
    uni.reLaunch({
      url: `${location.origin}/gamma-uc/h5/index.html#/home`
    });
  };
  var cryptoJsExports = {};
  var cryptoJs = {
    get exports() {
      return cryptoJsExports;
    },
    set exports(v2) {
      cryptoJsExports = v2;
    }
  };
  var lookup = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    62,
    0,
    62,
    0,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    0,
    0,
    0,
    0,
    63,
    0,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51
  ];
  function base64Decode(source, target) {
    var sourceLength = source.length;
    var paddingLength = source[sourceLength - 2] === "=" ? 2 : source[sourceLength - 1] === "=" ? 1 : 0;
    var tmp;
    var byteIndex = 0;
    var baseLength = sourceLength - paddingLength & 4294967292;
    for (var i2 = 0; i2 < baseLength; i2 += 4) {
      tmp = lookup[source.charCodeAt(i2)] << 18 | lookup[source.charCodeAt(i2 + 1)] << 12 | lookup[source.charCodeAt(i2 + 2)] << 6 | lookup[source.charCodeAt(i2 + 3)];
      target[byteIndex++] = tmp >> 16 & 255;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 1) {
      tmp = lookup[source.charCodeAt(i2)] << 10 | lookup[source.charCodeAt(i2 + 1)] << 4 | lookup[source.charCodeAt(i2 + 2)] >> 2;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 2) {
      tmp = lookup[source.charCodeAt(i2)] << 2 | lookup[source.charCodeAt(i2 + 1)] >> 4;
      target[byteIndex++] = tmp & 255;
    }
  }
  const $inject_window_crypto = {
    getRandomValues(arr) {
      if (!(arr instanceof Int8Array || arr instanceof Uint8Array || arr instanceof Int16Array || arr instanceof Uint16Array || arr instanceof Int32Array || arr instanceof Uint32Array || arr instanceof Uint8ClampedArray)) {
        throw new Error("Expected an integer array");
      }
      if (arr.byteLength > 65536) {
        throw new Error("Can only request a maximum of 65536 bytes");
      }
      var crypto = requireNativePlugin("DCloud-Crypto");
      base64Decode(crypto.getRandomValues(arr.byteLength), new Uint8Array(
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      ));
      return arr;
    }
  };
  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var coreExports = {};
  var core = {
    get exports() {
      return coreExports;
    },
    set exports(v2) {
      coreExports = v2;
    }
  };
  const __viteBrowserExternal = new Proxy({}, {
    get(_2, key) {
      throw new Error(`Module "" has been externalized for browser compatibility. Cannot access ".${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
    }
  });
  const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
  }, Symbol.toStringTag, { value: "Module" }));
  const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  var hasRequiredCore;
  function requireCore() {
    if (hasRequiredCore)
      return coreExports;
    hasRequiredCore = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory();
        }
      })(commonjsGlobal, function() {
        var CryptoJS2 = CryptoJS2 || function(Math2, undefined$12) {
          var crypto;
          if (typeof window !== "undefined" && $inject_window_crypto) {
            crypto = $inject_window_crypto;
          }
          if (typeof self !== "undefined" && self.crypto) {
            crypto = self.crypto;
          }
          if (typeof globalThis !== "undefined" && globalThis.crypto) {
            crypto = globalThis.crypto;
          }
          if (!crypto && typeof window !== "undefined" && window.msCrypto) {
            crypto = window.msCrypto;
          }
          if (!crypto && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
            crypto = commonjsGlobal.crypto;
          }
          if (!crypto && typeof commonjsRequire === "function") {
            try {
              crypto = require$$0;
            } catch (err) {
            }
          }
          var cryptoSecureRandomInt = function() {
            if (crypto) {
              if (typeof crypto.getRandomValues === "function") {
                try {
                  return crypto.getRandomValues(new Uint32Array(1))[0];
                } catch (err) {
                }
              }
              if (typeof crypto.randomBytes === "function") {
                try {
                  return crypto.randomBytes(4).readInt32LE();
                } catch (err) {
                }
              }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var create = Object.create || function() {
            function F2() {
            }
            return function(obj) {
              var subtype;
              F2.prototype = obj;
              subtype = new F2();
              F2.prototype = null;
              return subtype;
            };
          }();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = function() {
            return {
              /**
               * Creates a new object that inherits from this object.
               *
               * @param {Object} overrides Properties to copy into the new object.
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         field: 'value',
               *
               *         method: function () {
               *         }
               *     });
               */
              extend: function(overrides) {
                var subtype = create(this);
                if (overrides) {
                  subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                  subtype.init = function() {
                    subtype.$super.init.apply(this, arguments);
                  };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              /**
               * Extends this object and runs the init method.
               * Arguments to create() will be passed to init().
               *
               * @return {Object} The new object.
               *
               * @static
               *
               * @example
               *
               *     var instance = MyType.create();
               */
              create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              /**
               * Initializes a newly created object.
               * Override this method to add some logic when your objects are created.
               *
               * @example
               *
               *     var MyType = CryptoJS.lib.Base.extend({
               *         init: function () {
               *             // ...
               *         }
               *     });
               */
              init: function() {
              },
              /**
               * Copies properties into this object.
               *
               * @param {Object} properties The properties to mix in.
               *
               * @example
               *
               *     MyType.mixIn({
               *         field: 'value'
               *     });
               */
              mixIn: function(properties) {
                for (var propertyName in properties) {
                  if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                  }
                }
                if (properties.hasOwnProperty("toString")) {
                  this.toString = properties.toString;
                }
              },
              /**
               * Creates a copy of this object.
               *
               * @return {Object} The clone.
               *
               * @example
               *
               *     var clone = instance.clone();
               */
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of 32-bit words.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.create();
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined$12) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 4;
              }
            },
            /**
             * Converts this word array to a string.
             *
             * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
             *
             * @return {string} The stringified word array.
             *
             * @example
             *
             *     var string = wordArray + '';
             *     var string = wordArray.toString();
             *     var string = wordArray.toString(CryptoJS.enc.Utf8);
             */
            toString: function(encoder) {
              return (encoder || Hex2).stringify(this);
            },
            /**
             * Concatenates a word array to this word array.
             *
             * @param {WordArray} wordArray The word array to append.
             *
             * @return {WordArray} This word array.
             *
             * @example
             *
             *     wordArray1.concat(wordArray2);
             */
            concat: function(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) {
                for (var i2 = 0; i2 < thatSigBytes; i2++) {
                  var thatByte = thatWords[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                  thisWords[thisSigBytes + i2 >>> 2] |= thatByte << 24 - (thisSigBytes + i2) % 4 * 8;
                }
              } else {
                for (var j2 = 0; j2 < thatSigBytes; j2 += 4) {
                  thisWords[thisSigBytes + j2 >>> 2] = thatWords[j2 >>> 2];
                }
              }
              this.sigBytes += thatSigBytes;
              return this;
            },
            /**
             * Removes insignificant bits.
             *
             * @example
             *
             *     wordArray.clamp();
             */
            clamp: function() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math2.ceil(sigBytes / 4);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {WordArray} The clone.
             *
             * @example
             *
             *     var clone = wordArray.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              clone.words = this.words.slice(0);
              return clone;
            },
            /**
             * Creates a word array filled with random bytes.
             *
             * @param {number} nBytes The number of random bytes to generate.
             *
             * @return {WordArray} The random word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.random(16);
             */
            random: function(nBytes) {
              var words = [];
              for (var i2 = 0; i2 < nBytes; i2 += 4) {
                words.push(cryptoSecureRandomInt());
              }
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex2 = C_enc.Hex = {
            /**
             * Converts a word array to a hex string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The hex string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i2 = 0; i2 < sigBytes; i2++) {
                var bite = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 15).toString(16));
              }
              return hexChars.join("");
            },
            /**
             * Converts a hex string to a word array.
             *
             * @param {string} hexStr The hex string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
             */
            parse: function(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i2 = 0; i2 < hexStrLength; i2 += 2) {
                words[i2 >>> 3] |= parseInt(hexStr.substr(i2, 2), 16) << 24 - i2 % 8 * 4;
              }
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            /**
             * Converts a word array to a Latin1 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Latin1 string.
             *
             * @static
             *
             * @example
             *
             *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i2 = 0; i2 < sigBytes; i2++) {
                var bite = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            /**
             * Converts a Latin1 string to a word array.
             *
             * @param {string} latin1Str The Latin1 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
             */
            parse: function(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i2 = 0; i2 < latin1StrLength; i2++) {
                words[i2 >>> 2] |= (latin1Str.charCodeAt(i2) & 255) << 24 - i2 % 4 * 8;
              }
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            /**
             * Converts a word array to a UTF-8 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-8 string.
             *
             * @static
             *
             * @example
             *
             *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
             */
            stringify: function(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            /**
             * Converts a UTF-8 string to a word array.
             *
             * @param {string} utf8Str The UTF-8 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
             */
            parse: function(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            /**
             * Resets this block algorithm's data buffer to its initial state.
             *
             * @example
             *
             *     bufferedBlockAlgorithm.reset();
             */
            reset: function() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            /**
             * Adds new data to this block algorithm's buffer.
             *
             * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
             *
             * @example
             *
             *     bufferedBlockAlgorithm._append('data');
             *     bufferedBlockAlgorithm._append(wordArray);
             */
            _append: function(data) {
              if (typeof data == "string") {
                data = Utf8.parse(data);
              }
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            /**
             * Processes available data blocks.
             *
             * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
             *
             * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
             *
             * @return {WordArray} The processed data.
             *
             * @example
             *
             *     var processedData = bufferedBlockAlgorithm._process();
             *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
             */
            _process: function(doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = blockSize * 4;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              if (doFlush) {
                nBlocksReady = Math2.ceil(nBlocksReady);
              } else {
                nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
              }
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                  this._doProcessBlock(dataWords, offset);
                }
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = bufferedBlockAlgorithm.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              clone._data = this._data.clone();
              return clone;
            },
            _minBufferSize: 0
          });
          C_lib.Hasher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             */
            cfg: Base.extend(),
            /**
             * Initializes a newly created hasher.
             *
             * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
             *
             * @example
             *
             *     var hasher = CryptoJS.algo.SHA256.create();
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            /**
             * Resets this hasher to its initial state.
             *
             * @example
             *
             *     hasher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Updates this hasher with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {Hasher} This hasher.
             *
             * @example
             *
             *     hasher.update('message');
             *     hasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            /**
             * Finalizes the hash computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The hash.
             *
             * @example
             *
             *     var hash = hasher.finalize();
             *     var hash = hasher.finalize('message');
             *     var hash = hasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              if (messageUpdate) {
                this._append(messageUpdate);
              }
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 512 / 32,
            /**
             * Creates a shortcut function to a hasher's object interface.
             *
             * @param {Hasher} hasher The hasher to create a helper for.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
             */
            _createHelper: function(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            /**
             * Creates a shortcut function to the HMAC's object interface.
             *
             * @param {Hasher} hasher The hasher to use in this HMAC helper.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
             */
            _createHmacHelper: function(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        }(Math);
        return CryptoJS2;
      });
    })(core);
    return coreExports;
  }
  var x64CoreExports = {};
  var x64Core = {
    get exports() {
      return x64CoreExports;
    },
    set exports(v2) {
      x64CoreExports = v2;
    }
  };
  var hasRequiredX64Core;
  function requireX64Core() {
    if (hasRequiredX64Core)
      return x64CoreExports;
    hasRequiredX64Core = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function(undefined$12) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var X32WordArray = C_lib.WordArray;
          var C_x64 = C.x64 = {};
          C_x64.Word = Base.extend({
            /**
             * Initializes a newly created 64-bit word.
             *
             * @param {number} high The high 32 bits.
             * @param {number} low The low 32 bits.
             *
             * @example
             *
             *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
             */
            init: function(high, low) {
              this.high = high;
              this.low = low;
            }
            /**
             * Bitwise NOTs this word.
             *
             * @return {X64Word} A new x64-Word object after negating.
             *
             * @example
             *
             *     var negated = x64Word.not();
             */
            // not: function () {
            // var high = ~this.high;
            // var low = ~this.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ANDs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to AND with this word.
             *
             * @return {X64Word} A new x64-Word object after ANDing.
             *
             * @example
             *
             *     var anded = x64Word.and(anotherX64Word);
             */
            // and: function (word) {
            // var high = this.high & word.high;
            // var low = this.low & word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise ORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to OR with this word.
             *
             * @return {X64Word} A new x64-Word object after ORing.
             *
             * @example
             *
             *     var ored = x64Word.or(anotherX64Word);
             */
            // or: function (word) {
            // var high = this.high | word.high;
            // var low = this.low | word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Bitwise XORs this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to XOR with this word.
             *
             * @return {X64Word} A new x64-Word object after XORing.
             *
             * @example
             *
             *     var xored = x64Word.xor(anotherX64Word);
             */
            // xor: function (word) {
            // var high = this.high ^ word.high;
            // var low = this.low ^ word.low;
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the left.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftL(25);
             */
            // shiftL: function (n) {
            // if (n < 32) {
            // var high = (this.high << n) | (this.low >>> (32 - n));
            // var low = this.low << n;
            // } else {
            // var high = this.low << (n - 32);
            // var low = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Shifts this word n bits to the right.
             *
             * @param {number} n The number of bits to shift.
             *
             * @return {X64Word} A new x64-Word object after shifting.
             *
             * @example
             *
             *     var shifted = x64Word.shiftR(7);
             */
            // shiftR: function (n) {
            // if (n < 32) {
            // var low = (this.low >>> n) | (this.high << (32 - n));
            // var high = this.high >>> n;
            // } else {
            // var low = this.high >>> (n - 32);
            // var high = 0;
            // }
            // return X64Word.create(high, low);
            // },
            /**
             * Rotates this word n bits to the left.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotL(25);
             */
            // rotL: function (n) {
            // return this.shiftL(n).or(this.shiftR(64 - n));
            // },
            /**
             * Rotates this word n bits to the right.
             *
             * @param {number} n The number of bits to rotate.
             *
             * @return {X64Word} A new x64-Word object after rotating.
             *
             * @example
             *
             *     var rotated = x64Word.rotR(7);
             */
            // rotR: function (n) {
            // return this.shiftR(n).or(this.shiftL(64 - n));
            // },
            /**
             * Adds this word with the passed word.
             *
             * @param {X64Word} word The x64-Word to add with this word.
             *
             * @return {X64Word} A new x64-Word object after adding.
             *
             * @example
             *
             *     var added = x64Word.add(anotherX64Word);
             */
            // add: function (word) {
            // var low = (this.low + word.low) | 0;
            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
            // var high = (this.high + word.high + carry) | 0;
            // return X64Word.create(high, low);
            // }
          });
          C_x64.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.x64.WordArray.create();
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ]);
             *
             *     var wordArray = CryptoJS.x64.WordArray.create([
             *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
             *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
             *     ], 10);
             */
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined$12) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 8;
              }
            },
            /**
             * Converts this 64-bit word array to a 32-bit word array.
             *
             * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
             *
             * @example
             *
             *     var x32WordArray = x64WordArray.toX32();
             */
            toX32: function() {
              var x64Words = this.words;
              var x64WordsLength = x64Words.length;
              var x32Words = [];
              for (var i2 = 0; i2 < x64WordsLength; i2++) {
                var x64Word = x64Words[i2];
                x32Words.push(x64Word.high);
                x32Words.push(x64Word.low);
              }
              return X32WordArray.create(x32Words, this.sigBytes);
            },
            /**
             * Creates a copy of this word array.
             *
             * @return {X64WordArray} The clone.
             *
             * @example
             *
             *     var clone = x64WordArray.clone();
             */
            clone: function() {
              var clone = Base.clone.call(this);
              var words = clone.words = this.words.slice(0);
              var wordsLength = words.length;
              for (var i2 = 0; i2 < wordsLength; i2++) {
                words[i2] = words[i2].clone();
              }
              return clone;
            }
          });
        })();
        return CryptoJS2;
      });
    })(x64Core);
    return x64CoreExports;
  }
  var libTypedarraysExports = {};
  var libTypedarrays = {
    get exports() {
      return libTypedarraysExports;
    },
    set exports(v2) {
      libTypedarraysExports = v2;
    }
  };
  var hasRequiredLibTypedarrays;
  function requireLibTypedarrays() {
    if (hasRequiredLibTypedarrays)
      return libTypedarraysExports;
    hasRequiredLibTypedarrays = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          if (typeof ArrayBuffer != "function") {
            return;
          }
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var superInit = WordArray.init;
          var subInit = WordArray.init = function(typedArray) {
            if (typedArray instanceof ArrayBuffer) {
              typedArray = new Uint8Array(typedArray);
            }
            if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
              typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }
            if (typedArray instanceof Uint8Array) {
              var typedArrayByteLength = typedArray.byteLength;
              var words = [];
              for (var i2 = 0; i2 < typedArrayByteLength; i2++) {
                words[i2 >>> 2] |= typedArray[i2] << 24 - i2 % 4 * 8;
              }
              superInit.call(this, words, typedArrayByteLength);
            } else {
              superInit.apply(this, arguments);
            }
          };
          subInit.prototype = WordArray;
        })();
        return CryptoJS2.lib.WordArray;
      });
    })(libTypedarrays);
    return libTypedarraysExports;
  }
  var encUtf16Exports = {};
  var encUtf16 = {
    get exports() {
      return encUtf16Exports;
    },
    set exports(v2) {
      encUtf16Exports = v2;
    }
  };
  var hasRequiredEncUtf16;
  function requireEncUtf16() {
    if (hasRequiredEncUtf16)
      return encUtf16Exports;
    hasRequiredEncUtf16 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          C_enc.Utf16 = C_enc.Utf16BE = {
            /**
             * Converts a word array to a UTF-16 BE string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-16 BE string.
             *
             * @static
             *
             * @example
             *
             *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i2 = 0; i2 < sigBytes; i2 += 2) {
                var codePoint = words[i2 >>> 2] >>> 16 - i2 % 4 * 8 & 65535;
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
             * Converts a UTF-16 BE string to a word array.
             *
             * @param {string} utf16Str The UTF-16 BE string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
             */
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i2 = 0; i2 < utf16StrLength; i2++) {
                words[i2 >>> 1] |= utf16Str.charCodeAt(i2) << 16 - i2 % 2 * 16;
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          C_enc.Utf16LE = {
            /**
             * Converts a word array to a UTF-16 LE string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-16 LE string.
             *
             * @static
             *
             * @example
             *
             *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var utf16Chars = [];
              for (var i2 = 0; i2 < sigBytes; i2 += 2) {
                var codePoint = swapEndian(words[i2 >>> 2] >>> 16 - i2 % 4 * 8 & 65535);
                utf16Chars.push(String.fromCharCode(codePoint));
              }
              return utf16Chars.join("");
            },
            /**
             * Converts a UTF-16 LE string to a word array.
             *
             * @param {string} utf16Str The UTF-16 LE string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
             */
            parse: function(utf16Str) {
              var utf16StrLength = utf16Str.length;
              var words = [];
              for (var i2 = 0; i2 < utf16StrLength; i2++) {
                words[i2 >>> 1] |= swapEndian(utf16Str.charCodeAt(i2) << 16 - i2 % 2 * 16);
              }
              return WordArray.create(words, utf16StrLength * 2);
            }
          };
          function swapEndian(word) {
            return word << 8 & 4278255360 | word >>> 8 & 16711935;
          }
        })();
        return CryptoJS2.enc.Utf16;
      });
    })(encUtf16);
    return encUtf16Exports;
  }
  var encBase64Exports = {};
  var encBase64 = {
    get exports() {
      return encBase64Exports;
    },
    set exports(v2) {
      encBase64Exports = v2;
    }
  };
  var hasRequiredEncBase64;
  function requireEncBase64() {
    if (hasRequiredEncBase64)
      return encBase64Exports;
    hasRequiredEncBase64 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          C_enc.Base64 = {
            /**
             * Converts a word array to a Base64 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Base64 string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
             */
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i2 = 0; i2 < sigBytes; i2 += 3) {
                var byte1 = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                var byte2 = words[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255;
                var byte3 = words[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j2 = 0; j2 < 4 && i2 + j2 * 0.75 < sigBytes; j2++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j2) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
             * Converts a Base64 string to a word array.
             *
             * @param {string} base64Str The Base64 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
             */
            parse: function(base64Str) {
              var base64StrLength = base64Str.length;
              var map = this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j2 = 0; j2 < map.length; j2++) {
                  reverseMap[map.charCodeAt(j2)] = j2;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i2 = 0; i2 < base64StrLength; i2++) {
              if (i2 % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i2 - 1)] << i2 % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i2)] >>> 6 - i2 % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS2.enc.Base64;
      });
    })(encBase64);
    return encBase64Exports;
  }
  var encBase64urlExports = {};
  var encBase64url = {
    get exports() {
      return encBase64urlExports;
    },
    set exports(v2) {
      encBase64urlExports = v2;
    }
  };
  var hasRequiredEncBase64url;
  function requireEncBase64url() {
    if (hasRequiredEncBase64url)
      return encBase64urlExports;
    hasRequiredEncBase64url = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          C_enc.Base64url = {
            /**
             * Converts a word array to a Base64url string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @param {boolean} urlSafe Whether to use url safe
             *
             * @return {string} The Base64url string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
             */
            stringify: function(wordArray, urlSafe = true) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = urlSafe ? this._safe_map : this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i2 = 0; i2 < sigBytes; i2 += 3) {
                var byte1 = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                var byte2 = words[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255;
                var byte3 = words[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j2 = 0; j2 < 4 && i2 + j2 * 0.75 < sigBytes; j2++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j2) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            /**
             * Converts a Base64url string to a word array.
             *
             * @param {string} base64Str The Base64url string.
             *
             * @param {boolean} urlSafe Whether to use url safe
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
             */
            parse: function(base64Str, urlSafe = true) {
              var base64StrLength = base64Str.length;
              var map = urlSafe ? this._safe_map : this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j2 = 0; j2 < map.length; j2++) {
                  reverseMap[map.charCodeAt(j2)] = j2;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i2 = 0; i2 < base64StrLength; i2++) {
              if (i2 % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i2 - 1)] << i2 % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i2)] >>> 6 - i2 % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS2.enc.Base64url;
      });
    })(encBase64url);
    return encBase64urlExports;
  }
  var md5Exports = {};
  var md5 = {
    get exports() {
      return md5Exports;
    },
    set exports(v2) {
      md5Exports = v2;
    }
  };
  var hasRequiredMd5;
  function requireMd5() {
    if (hasRequiredMd5)
      return md5Exports;
    hasRequiredMd5 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var T2 = [];
          (function() {
            for (var i2 = 0; i2 < 64; i2++) {
              T2[i2] = Math2.abs(Math2.sin(i2 + 1)) * 4294967296 | 0;
            }
          })();
          var MD5 = C_algo.MD5 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878
              ]);
            },
            _doProcessBlock: function(M2, offset) {
              for (var i2 = 0; i2 < 16; i2++) {
                var offset_i = offset + i2;
                var M_offset_i = M2[offset_i];
                M2[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H2 = this._hash.words;
              var M_offset_0 = M2[offset + 0];
              var M_offset_1 = M2[offset + 1];
              var M_offset_2 = M2[offset + 2];
              var M_offset_3 = M2[offset + 3];
              var M_offset_4 = M2[offset + 4];
              var M_offset_5 = M2[offset + 5];
              var M_offset_6 = M2[offset + 6];
              var M_offset_7 = M2[offset + 7];
              var M_offset_8 = M2[offset + 8];
              var M_offset_9 = M2[offset + 9];
              var M_offset_10 = M2[offset + 10];
              var M_offset_11 = M2[offset + 11];
              var M_offset_12 = M2[offset + 12];
              var M_offset_13 = M2[offset + 13];
              var M_offset_14 = M2[offset + 14];
              var M_offset_15 = M2[offset + 15];
              var a2 = H2[0];
              var b2 = H2[1];
              var c2 = H2[2];
              var d2 = H2[3];
              a2 = FF(a2, b2, c2, d2, M_offset_0, 7, T2[0]);
              d2 = FF(d2, a2, b2, c2, M_offset_1, 12, T2[1]);
              c2 = FF(c2, d2, a2, b2, M_offset_2, 17, T2[2]);
              b2 = FF(b2, c2, d2, a2, M_offset_3, 22, T2[3]);
              a2 = FF(a2, b2, c2, d2, M_offset_4, 7, T2[4]);
              d2 = FF(d2, a2, b2, c2, M_offset_5, 12, T2[5]);
              c2 = FF(c2, d2, a2, b2, M_offset_6, 17, T2[6]);
              b2 = FF(b2, c2, d2, a2, M_offset_7, 22, T2[7]);
              a2 = FF(a2, b2, c2, d2, M_offset_8, 7, T2[8]);
              d2 = FF(d2, a2, b2, c2, M_offset_9, 12, T2[9]);
              c2 = FF(c2, d2, a2, b2, M_offset_10, 17, T2[10]);
              b2 = FF(b2, c2, d2, a2, M_offset_11, 22, T2[11]);
              a2 = FF(a2, b2, c2, d2, M_offset_12, 7, T2[12]);
              d2 = FF(d2, a2, b2, c2, M_offset_13, 12, T2[13]);
              c2 = FF(c2, d2, a2, b2, M_offset_14, 17, T2[14]);
              b2 = FF(b2, c2, d2, a2, M_offset_15, 22, T2[15]);
              a2 = GG(a2, b2, c2, d2, M_offset_1, 5, T2[16]);
              d2 = GG(d2, a2, b2, c2, M_offset_6, 9, T2[17]);
              c2 = GG(c2, d2, a2, b2, M_offset_11, 14, T2[18]);
              b2 = GG(b2, c2, d2, a2, M_offset_0, 20, T2[19]);
              a2 = GG(a2, b2, c2, d2, M_offset_5, 5, T2[20]);
              d2 = GG(d2, a2, b2, c2, M_offset_10, 9, T2[21]);
              c2 = GG(c2, d2, a2, b2, M_offset_15, 14, T2[22]);
              b2 = GG(b2, c2, d2, a2, M_offset_4, 20, T2[23]);
              a2 = GG(a2, b2, c2, d2, M_offset_9, 5, T2[24]);
              d2 = GG(d2, a2, b2, c2, M_offset_14, 9, T2[25]);
              c2 = GG(c2, d2, a2, b2, M_offset_3, 14, T2[26]);
              b2 = GG(b2, c2, d2, a2, M_offset_8, 20, T2[27]);
              a2 = GG(a2, b2, c2, d2, M_offset_13, 5, T2[28]);
              d2 = GG(d2, a2, b2, c2, M_offset_2, 9, T2[29]);
              c2 = GG(c2, d2, a2, b2, M_offset_7, 14, T2[30]);
              b2 = GG(b2, c2, d2, a2, M_offset_12, 20, T2[31]);
              a2 = HH(a2, b2, c2, d2, M_offset_5, 4, T2[32]);
              d2 = HH(d2, a2, b2, c2, M_offset_8, 11, T2[33]);
              c2 = HH(c2, d2, a2, b2, M_offset_11, 16, T2[34]);
              b2 = HH(b2, c2, d2, a2, M_offset_14, 23, T2[35]);
              a2 = HH(a2, b2, c2, d2, M_offset_1, 4, T2[36]);
              d2 = HH(d2, a2, b2, c2, M_offset_4, 11, T2[37]);
              c2 = HH(c2, d2, a2, b2, M_offset_7, 16, T2[38]);
              b2 = HH(b2, c2, d2, a2, M_offset_10, 23, T2[39]);
              a2 = HH(a2, b2, c2, d2, M_offset_13, 4, T2[40]);
              d2 = HH(d2, a2, b2, c2, M_offset_0, 11, T2[41]);
              c2 = HH(c2, d2, a2, b2, M_offset_3, 16, T2[42]);
              b2 = HH(b2, c2, d2, a2, M_offset_6, 23, T2[43]);
              a2 = HH(a2, b2, c2, d2, M_offset_9, 4, T2[44]);
              d2 = HH(d2, a2, b2, c2, M_offset_12, 11, T2[45]);
              c2 = HH(c2, d2, a2, b2, M_offset_15, 16, T2[46]);
              b2 = HH(b2, c2, d2, a2, M_offset_2, 23, T2[47]);
              a2 = II(a2, b2, c2, d2, M_offset_0, 6, T2[48]);
              d2 = II(d2, a2, b2, c2, M_offset_7, 10, T2[49]);
              c2 = II(c2, d2, a2, b2, M_offset_14, 15, T2[50]);
              b2 = II(b2, c2, d2, a2, M_offset_5, 21, T2[51]);
              a2 = II(a2, b2, c2, d2, M_offset_12, 6, T2[52]);
              d2 = II(d2, a2, b2, c2, M_offset_3, 10, T2[53]);
              c2 = II(c2, d2, a2, b2, M_offset_10, 15, T2[54]);
              b2 = II(b2, c2, d2, a2, M_offset_1, 21, T2[55]);
              a2 = II(a2, b2, c2, d2, M_offset_8, 6, T2[56]);
              d2 = II(d2, a2, b2, c2, M_offset_15, 10, T2[57]);
              c2 = II(c2, d2, a2, b2, M_offset_6, 15, T2[58]);
              b2 = II(b2, c2, d2, a2, M_offset_13, 21, T2[59]);
              a2 = II(a2, b2, c2, d2, M_offset_4, 6, T2[60]);
              d2 = II(d2, a2, b2, c2, M_offset_11, 10, T2[61]);
              c2 = II(c2, d2, a2, b2, M_offset_2, 15, T2[62]);
              b2 = II(b2, c2, d2, a2, M_offset_9, 21, T2[63]);
              H2[0] = H2[0] + a2 | 0;
              H2[1] = H2[1] + b2 | 0;
              H2[2] = H2[2] + c2 | 0;
              H2[3] = H2[3] + d2 | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
              var nBitsTotalL = nBitsTotal;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H2 = hash.words;
              for (var i2 = 0; i2 < 4; i2++) {
                var H_i = H2[i2];
                H2[i2] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function FF(a2, b2, c2, d2, x2, s2, t2) {
            var n2 = a2 + (b2 & c2 | ~b2 & d2) + x2 + t2;
            return (n2 << s2 | n2 >>> 32 - s2) + b2;
          }
          function GG(a2, b2, c2, d2, x2, s2, t2) {
            var n2 = a2 + (b2 & d2 | c2 & ~d2) + x2 + t2;
            return (n2 << s2 | n2 >>> 32 - s2) + b2;
          }
          function HH(a2, b2, c2, d2, x2, s2, t2) {
            var n2 = a2 + (b2 ^ c2 ^ d2) + x2 + t2;
            return (n2 << s2 | n2 >>> 32 - s2) + b2;
          }
          function II(a2, b2, c2, d2, x2, s2, t2) {
            var n2 = a2 + (c2 ^ (b2 | ~d2)) + x2 + t2;
            return (n2 << s2 | n2 >>> 32 - s2) + b2;
          }
          C.MD5 = Hasher._createHelper(MD5);
          C.HmacMD5 = Hasher._createHmacHelper(MD5);
        })(Math);
        return CryptoJS2.MD5;
      });
    })(md5);
    return md5Exports;
  }
  var sha1Exports = {};
  var sha1 = {
    get exports() {
      return sha1Exports;
    },
    set exports(v2) {
      sha1Exports = v2;
    }
  };
  var hasRequiredSha1;
  function requireSha1() {
    if (hasRequiredSha1)
      return sha1Exports;
    hasRequiredSha1 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var W2 = [];
          var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                1732584193,
                4023233417,
                2562383102,
                271733878,
                3285377520
              ]);
            },
            _doProcessBlock: function(M2, offset) {
              var H2 = this._hash.words;
              var a2 = H2[0];
              var b2 = H2[1];
              var c2 = H2[2];
              var d2 = H2[3];
              var e = H2[4];
              for (var i2 = 0; i2 < 80; i2++) {
                if (i2 < 16) {
                  W2[i2] = M2[offset + i2] | 0;
                } else {
                  var n2 = W2[i2 - 3] ^ W2[i2 - 8] ^ W2[i2 - 14] ^ W2[i2 - 16];
                  W2[i2] = n2 << 1 | n2 >>> 31;
                }
                var t2 = (a2 << 5 | a2 >>> 27) + e + W2[i2];
                if (i2 < 20) {
                  t2 += (b2 & c2 | ~b2 & d2) + 1518500249;
                } else if (i2 < 40) {
                  t2 += (b2 ^ c2 ^ d2) + 1859775393;
                } else if (i2 < 60) {
                  t2 += (b2 & c2 | b2 & d2 | c2 & d2) - 1894007588;
                } else {
                  t2 += (b2 ^ c2 ^ d2) - 899497514;
                }
                e = d2;
                d2 = c2;
                c2 = b2 << 30 | b2 >>> 2;
                b2 = a2;
                a2 = t2;
              }
              H2[0] = H2[0] + a2 | 0;
              H2[1] = H2[1] + b2 | 0;
              H2[2] = H2[2] + c2 | 0;
              H2[3] = H2[3] + d2 | 0;
              H2[4] = H2[4] + e | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA1 = Hasher._createHelper(SHA1);
          C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
        })();
        return CryptoJS2.SHA1;
      });
    })(sha1);
    return sha1Exports;
  }
  var sha256Exports = {};
  var sha256 = {
    get exports() {
      return sha256Exports;
    },
    set exports(v2) {
      sha256Exports = v2;
    }
  };
  var hasRequiredSha256;
  function requireSha256() {
    if (hasRequiredSha256)
      return sha256Exports;
    hasRequiredSha256 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var H2 = [];
          var K2 = [];
          (function() {
            function isPrime(n3) {
              var sqrtN = Math2.sqrt(n3);
              for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n3 % factor)) {
                  return false;
                }
              }
              return true;
            }
            function getFractionalBits(n3) {
              return (n3 - (n3 | 0)) * 4294967296 | 0;
            }
            var n2 = 2;
            var nPrime = 0;
            while (nPrime < 64) {
              if (isPrime(n2)) {
                if (nPrime < 8) {
                  H2[nPrime] = getFractionalBits(Math2.pow(n2, 1 / 2));
                }
                K2[nPrime] = getFractionalBits(Math2.pow(n2, 1 / 3));
                nPrime++;
              }
              n2++;
            }
          })();
          var W2 = [];
          var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init(H2.slice(0));
            },
            _doProcessBlock: function(M2, offset) {
              var H3 = this._hash.words;
              var a2 = H3[0];
              var b2 = H3[1];
              var c2 = H3[2];
              var d2 = H3[3];
              var e = H3[4];
              var f2 = H3[5];
              var g2 = H3[6];
              var h2 = H3[7];
              for (var i2 = 0; i2 < 64; i2++) {
                if (i2 < 16) {
                  W2[i2] = M2[offset + i2] | 0;
                } else {
                  var gamma0x = W2[i2 - 15];
                  var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                  var gamma1x = W2[i2 - 2];
                  var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                  W2[i2] = gamma0 + W2[i2 - 7] + gamma1 + W2[i2 - 16];
                }
                var ch = e & f2 ^ ~e & g2;
                var maj = a2 & b2 ^ a2 & c2 ^ b2 & c2;
                var sigma0 = (a2 << 30 | a2 >>> 2) ^ (a2 << 19 | a2 >>> 13) ^ (a2 << 10 | a2 >>> 22);
                var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
                var t1 = h2 + sigma1 + ch + K2[i2] + W2[i2];
                var t2 = sigma0 + maj;
                h2 = g2;
                g2 = f2;
                f2 = e;
                e = d2 + t1 | 0;
                d2 = c2;
                c2 = b2;
                b2 = a2;
                a2 = t1 + t2 | 0;
              }
              H3[0] = H3[0] + a2 | 0;
              H3[1] = H3[1] + b2 | 0;
              H3[2] = H3[2] + c2 | 0;
              H3[3] = H3[3] + d2 | 0;
              H3[4] = H3[4] + e | 0;
              H3[5] = H3[5] + f2 | 0;
              H3[6] = H3[6] + g2 | 0;
              H3[7] = H3[7] + h2 | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA256 = Hasher._createHelper(SHA256);
          C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
        })(Math);
        return CryptoJS2.SHA256;
      });
    })(sha256);
    return sha256Exports;
  }
  var sha224Exports = {};
  var sha224 = {
    get exports() {
      return sha224Exports;
    },
    set exports(v2) {
      sha224Exports = v2;
    }
  };
  var hasRequiredSha224;
  function requireSha224() {
    if (hasRequiredSha224)
      return sha224Exports;
    hasRequiredSha224 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha256());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA256 = C_algo.SHA256;
          var SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function() {
              this._hash = new WordArray.init([
                3238371032,
                914150663,
                812702999,
                4144912697,
                4290775857,
                1750603025,
                1694076839,
                3204075428
              ]);
            },
            _doFinalize: function() {
              var hash = SHA256._doFinalize.call(this);
              hash.sigBytes -= 4;
              return hash;
            }
          });
          C.SHA224 = SHA256._createHelper(SHA224);
          C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
        })();
        return CryptoJS2.SHA224;
      });
    })(sha224);
    return sha224Exports;
  }
  var sha512Exports = {};
  var sha512 = {
    get exports() {
      return sha512Exports;
    },
    set exports(v2) {
      sha512Exports = v2;
    }
  };
  var hasRequiredSha512;
  function requireSha512() {
    if (hasRequiredSha512)
      return sha512Exports;
    hasRequiredSha512 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          function X64Word_create() {
            return X64Word.create.apply(X64Word, arguments);
          }
          var K2 = [
            X64Word_create(1116352408, 3609767458),
            X64Word_create(1899447441, 602891725),
            X64Word_create(3049323471, 3964484399),
            X64Word_create(3921009573, 2173295548),
            X64Word_create(961987163, 4081628472),
            X64Word_create(1508970993, 3053834265),
            X64Word_create(2453635748, 2937671579),
            X64Word_create(2870763221, 3664609560),
            X64Word_create(3624381080, 2734883394),
            X64Word_create(310598401, 1164996542),
            X64Word_create(607225278, 1323610764),
            X64Word_create(1426881987, 3590304994),
            X64Word_create(1925078388, 4068182383),
            X64Word_create(2162078206, 991336113),
            X64Word_create(2614888103, 633803317),
            X64Word_create(3248222580, 3479774868),
            X64Word_create(3835390401, 2666613458),
            X64Word_create(4022224774, 944711139),
            X64Word_create(264347078, 2341262773),
            X64Word_create(604807628, 2007800933),
            X64Word_create(770255983, 1495990901),
            X64Word_create(1249150122, 1856431235),
            X64Word_create(1555081692, 3175218132),
            X64Word_create(1996064986, 2198950837),
            X64Word_create(2554220882, 3999719339),
            X64Word_create(2821834349, 766784016),
            X64Word_create(2952996808, 2566594879),
            X64Word_create(3210313671, 3203337956),
            X64Word_create(3336571891, 1034457026),
            X64Word_create(3584528711, 2466948901),
            X64Word_create(113926993, 3758326383),
            X64Word_create(338241895, 168717936),
            X64Word_create(666307205, 1188179964),
            X64Word_create(773529912, 1546045734),
            X64Word_create(1294757372, 1522805485),
            X64Word_create(1396182291, 2643833823),
            X64Word_create(1695183700, 2343527390),
            X64Word_create(1986661051, 1014477480),
            X64Word_create(2177026350, 1206759142),
            X64Word_create(2456956037, 344077627),
            X64Word_create(2730485921, 1290863460),
            X64Word_create(2820302411, 3158454273),
            X64Word_create(3259730800, 3505952657),
            X64Word_create(3345764771, 106217008),
            X64Word_create(3516065817, 3606008344),
            X64Word_create(3600352804, 1432725776),
            X64Word_create(4094571909, 1467031594),
            X64Word_create(275423344, 851169720),
            X64Word_create(430227734, 3100823752),
            X64Word_create(506948616, 1363258195),
            X64Word_create(659060556, 3750685593),
            X64Word_create(883997877, 3785050280),
            X64Word_create(958139571, 3318307427),
            X64Word_create(1322822218, 3812723403),
            X64Word_create(1537002063, 2003034995),
            X64Word_create(1747873779, 3602036899),
            X64Word_create(1955562222, 1575990012),
            X64Word_create(2024104815, 1125592928),
            X64Word_create(2227730452, 2716904306),
            X64Word_create(2361852424, 442776044),
            X64Word_create(2428436474, 593698344),
            X64Word_create(2756734187, 3733110249),
            X64Word_create(3204031479, 2999351573),
            X64Word_create(3329325298, 3815920427),
            X64Word_create(3391569614, 3928383900),
            X64Word_create(3515267271, 566280711),
            X64Word_create(3940187606, 3454069534),
            X64Word_create(4118630271, 4000239992),
            X64Word_create(116418474, 1914138554),
            X64Word_create(174292421, 2731055270),
            X64Word_create(289380356, 3203993006),
            X64Word_create(460393269, 320620315),
            X64Word_create(685471733, 587496836),
            X64Word_create(852142971, 1086792851),
            X64Word_create(1017036298, 365543100),
            X64Word_create(1126000580, 2618297676),
            X64Word_create(1288033470, 3409855158),
            X64Word_create(1501505948, 4234509866),
            X64Word_create(1607167915, 987167468),
            X64Word_create(1816402316, 1246189591)
          ];
          var W2 = [];
          (function() {
            for (var i2 = 0; i2 < 80; i2++) {
              W2[i2] = X64Word_create();
            }
          })();
          var SHA512 = C_algo.SHA512 = Hasher.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(1779033703, 4089235720),
                new X64Word.init(3144134277, 2227873595),
                new X64Word.init(1013904242, 4271175723),
                new X64Word.init(2773480762, 1595750129),
                new X64Word.init(1359893119, 2917565137),
                new X64Word.init(2600822924, 725511199),
                new X64Word.init(528734635, 4215389547),
                new X64Word.init(1541459225, 327033209)
              ]);
            },
            _doProcessBlock: function(M2, offset) {
              var H2 = this._hash.words;
              var H0 = H2[0];
              var H1 = H2[1];
              var H22 = H2[2];
              var H3 = H2[3];
              var H4 = H2[4];
              var H5 = H2[5];
              var H6 = H2[6];
              var H7 = H2[7];
              var H0h = H0.high;
              var H0l = H0.low;
              var H1h = H1.high;
              var H1l = H1.low;
              var H2h = H22.high;
              var H2l = H22.low;
              var H3h = H3.high;
              var H3l = H3.low;
              var H4h = H4.high;
              var H4l = H4.low;
              var H5h = H5.high;
              var H5l = H5.low;
              var H6h = H6.high;
              var H6l = H6.low;
              var H7h = H7.high;
              var H7l = H7.low;
              var ah = H0h;
              var al = H0l;
              var bh = H1h;
              var bl = H1l;
              var ch = H2h;
              var cl = H2l;
              var dh = H3h;
              var dl = H3l;
              var eh = H4h;
              var el = H4l;
              var fh = H5h;
              var fl = H5l;
              var gh = H6h;
              var gl = H6l;
              var hh = H7h;
              var hl = H7l;
              for (var i2 = 0; i2 < 80; i2++) {
                var Wil;
                var Wih;
                var Wi = W2[i2];
                if (i2 < 16) {
                  Wih = Wi.high = M2[offset + i2 * 2] | 0;
                  Wil = Wi.low = M2[offset + i2 * 2 + 1] | 0;
                } else {
                  var gamma0x = W2[i2 - 15];
                  var gamma0xh = gamma0x.high;
                  var gamma0xl = gamma0x.low;
                  var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                  var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                  var gamma1x = W2[i2 - 2];
                  var gamma1xh = gamma1x.high;
                  var gamma1xl = gamma1x.low;
                  var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                  var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                  var Wi7 = W2[i2 - 7];
                  var Wi7h = Wi7.high;
                  var Wi7l = Wi7.low;
                  var Wi16 = W2[i2 - 16];
                  var Wi16h = Wi16.high;
                  var Wi16l = Wi16.low;
                  Wil = gamma0l + Wi7l;
                  Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                  Wil = Wil + gamma1l;
                  Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                  Wil = Wil + Wi16l;
                  Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                  Wi.high = Wih;
                  Wi.low = Wil;
                }
                var chh = eh & fh ^ ~eh & gh;
                var chl = el & fl ^ ~el & gl;
                var majh = ah & bh ^ ah & ch ^ bh & ch;
                var majl = al & bl ^ al & cl ^ bl & cl;
                var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
                var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
                var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
                var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
                var Ki = K2[i2];
                var Kih = Ki.high;
                var Kil = Ki.low;
                var t1l = hl + sigma1l;
                var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
                var t1l = t1l + chl;
                var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
                var t1l = t1l + Kil;
                var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
                var t1l = t1l + Wil;
                var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
                var t2l = sigma0l + majl;
                var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
                hh = gh;
                hl = gl;
                gh = fh;
                gl = fl;
                fh = eh;
                fl = el;
                el = dl + t1l | 0;
                eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
                dh = ch;
                dl = cl;
                ch = bh;
                cl = bl;
                bh = ah;
                bl = al;
                al = t1l + t2l | 0;
                ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
              }
              H0l = H0.low = H0l + al;
              H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
              H1l = H1.low = H1l + bl;
              H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
              H2l = H22.low = H2l + cl;
              H22.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
              H3l = H3.low = H3l + dl;
              H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
              H4l = H4.low = H4l + el;
              H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
              H5l = H5.low = H5l + fl;
              H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
              H6l = H6.low = H6l + gl;
              H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
              H7l = H7.low = H7l + hl;
              H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var hash = this._hash.toX32();
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            },
            blockSize: 1024 / 32
          });
          C.SHA512 = Hasher._createHelper(SHA512);
          C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
        })();
        return CryptoJS2.SHA512;
      });
    })(sha512);
    return sha512Exports;
  }
  var sha384Exports = {};
  var sha384 = {
    get exports() {
      return sha384Exports;
    },
    set exports(v2) {
      sha384Exports = v2;
    }
  };
  var hasRequiredSha384;
  function requireSha384() {
    if (hasRequiredSha384)
      return sha384Exports;
    hasRequiredSha384 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core(), requireSha512());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var X64WordArray = C_x64.WordArray;
          var C_algo = C.algo;
          var SHA512 = C_algo.SHA512;
          var SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function() {
              this._hash = new X64WordArray.init([
                new X64Word.init(3418070365, 3238371032),
                new X64Word.init(1654270250, 914150663),
                new X64Word.init(2438529370, 812702999),
                new X64Word.init(355462360, 4144912697),
                new X64Word.init(1731405415, 4290775857),
                new X64Word.init(2394180231, 1750603025),
                new X64Word.init(3675008525, 1694076839),
                new X64Word.init(1203062813, 3204075428)
              ]);
            },
            _doFinalize: function() {
              var hash = SHA512._doFinalize.call(this);
              hash.sigBytes -= 16;
              return hash;
            }
          });
          C.SHA384 = SHA512._createHelper(SHA384);
          C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
        })();
        return CryptoJS2.SHA384;
      });
    })(sha384);
    return sha384Exports;
  }
  var sha3Exports = {};
  var sha3 = {
    get exports() {
      return sha3Exports;
    },
    set exports(v2) {
      sha3Exports = v2;
    }
  };
  var hasRequiredSha3;
  function requireSha3() {
    if (hasRequiredSha3)
      return sha3Exports;
    hasRequiredSha3 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireX64Core());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_x64 = C.x64;
          var X64Word = C_x64.Word;
          var C_algo = C.algo;
          var RHO_OFFSETS = [];
          var PI_INDEXES = [];
          var ROUND_CONSTANTS = [];
          (function() {
            var x2 = 1, y2 = 0;
            for (var t2 = 0; t2 < 24; t2++) {
              RHO_OFFSETS[x2 + 5 * y2] = (t2 + 1) * (t2 + 2) / 2 % 64;
              var newX = y2 % 5;
              var newY = (2 * x2 + 3 * y2) % 5;
              x2 = newX;
              y2 = newY;
            }
            for (var x2 = 0; x2 < 5; x2++) {
              for (var y2 = 0; y2 < 5; y2++) {
                PI_INDEXES[x2 + 5 * y2] = y2 + (2 * x2 + 3 * y2) % 5 * 5;
              }
            }
            var LFSR = 1;
            for (var i2 = 0; i2 < 24; i2++) {
              var roundConstantMsw = 0;
              var roundConstantLsw = 0;
              for (var j2 = 0; j2 < 7; j2++) {
                if (LFSR & 1) {
                  var bitPosition = (1 << j2) - 1;
                  if (bitPosition < 32) {
                    roundConstantLsw ^= 1 << bitPosition;
                  } else {
                    roundConstantMsw ^= 1 << bitPosition - 32;
                  }
                }
                if (LFSR & 128) {
                  LFSR = LFSR << 1 ^ 113;
                } else {
                  LFSR <<= 1;
                }
              }
              ROUND_CONSTANTS[i2] = X64Word.create(roundConstantMsw, roundConstantLsw);
            }
          })();
          var T2 = [];
          (function() {
            for (var i2 = 0; i2 < 25; i2++) {
              T2[i2] = X64Word.create();
            }
          })();
          var SHA3 = C_algo.SHA3 = Hasher.extend({
            /**
             * Configuration options.
             *
             * @property {number} outputLength
             *   The desired number of bits in the output hash.
             *   Only values permitted are: 224, 256, 384, 512.
             *   Default: 512
             */
            cfg: Hasher.cfg.extend({
              outputLength: 512
            }),
            _doReset: function() {
              var state = this._state = [];
              for (var i2 = 0; i2 < 25; i2++) {
                state[i2] = new X64Word.init();
              }
              this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(M2, offset) {
              var state = this._state;
              var nBlockSizeLanes = this.blockSize / 2;
              for (var i2 = 0; i2 < nBlockSizeLanes; i2++) {
                var M2i = M2[offset + 2 * i2];
                var M2i1 = M2[offset + 2 * i2 + 1];
                M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
                M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
                var lane = state[i2];
                lane.high ^= M2i1;
                lane.low ^= M2i;
              }
              for (var round = 0; round < 24; round++) {
                for (var x2 = 0; x2 < 5; x2++) {
                  var tMsw = 0, tLsw = 0;
                  for (var y2 = 0; y2 < 5; y2++) {
                    var lane = state[x2 + 5 * y2];
                    tMsw ^= lane.high;
                    tLsw ^= lane.low;
                  }
                  var Tx = T2[x2];
                  Tx.high = tMsw;
                  Tx.low = tLsw;
                }
                for (var x2 = 0; x2 < 5; x2++) {
                  var Tx4 = T2[(x2 + 4) % 5];
                  var Tx1 = T2[(x2 + 1) % 5];
                  var Tx1Msw = Tx1.high;
                  var Tx1Lsw = Tx1.low;
                  var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                  var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                  for (var y2 = 0; y2 < 5; y2++) {
                    var lane = state[x2 + 5 * y2];
                    lane.high ^= tMsw;
                    lane.low ^= tLsw;
                  }
                }
                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                  var tMsw;
                  var tLsw;
                  var lane = state[laneIndex];
                  var laneMsw = lane.high;
                  var laneLsw = lane.low;
                  var rhoOffset = RHO_OFFSETS[laneIndex];
                  if (rhoOffset < 32) {
                    tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                    tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                  } else {
                    tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                    tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                  }
                  var TPiLane = T2[PI_INDEXES[laneIndex]];
                  TPiLane.high = tMsw;
                  TPiLane.low = tLsw;
                }
                var T0 = T2[0];
                var state0 = state[0];
                T0.high = state0.high;
                T0.low = state0.low;
                for (var x2 = 0; x2 < 5; x2++) {
                  for (var y2 = 0; y2 < 5; y2++) {
                    var laneIndex = x2 + 5 * y2;
                    var lane = state[laneIndex];
                    var TLane = T2[laneIndex];
                    var Tx1Lane = T2[(x2 + 1) % 5 + 5 * y2];
                    var Tx2Lane = T2[(x2 + 2) % 5 + 5 * y2];
                    lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                    lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                  }
                }
                var lane = state[0];
                var roundConstant = ROUND_CONSTANTS[round];
                lane.high ^= roundConstant.high;
                lane.low ^= roundConstant.low;
              }
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              var blockSizeBits = this.blockSize * 32;
              dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
              dataWords[(Math2.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
              data.sigBytes = dataWords.length * 4;
              this._process();
              var state = this._state;
              var outputLengthBytes = this.cfg.outputLength / 8;
              var outputLengthLanes = outputLengthBytes / 8;
              var hashWords = [];
              for (var i2 = 0; i2 < outputLengthLanes; i2++) {
                var lane = state[i2];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
                laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
                hashWords.push(laneLsw);
                hashWords.push(laneMsw);
              }
              return new WordArray.init(hashWords, outputLengthBytes);
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              var state = clone._state = this._state.slice(0);
              for (var i2 = 0; i2 < 25; i2++) {
                state[i2] = state[i2].clone();
              }
              return clone;
            }
          });
          C.SHA3 = Hasher._createHelper(SHA3);
          C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
        })(Math);
        return CryptoJS2.SHA3;
      });
    })(sha3);
    return sha3Exports;
  }
  var ripemd160Exports = {};
  var ripemd160 = {
    get exports() {
      return ripemd160Exports;
    },
    set exports(v2) {
      ripemd160Exports = v2;
    }
  };
  var hasRequiredRipemd160;
  function requireRipemd160() {
    if (hasRequiredRipemd160)
      return ripemd160Exports;
    hasRequiredRipemd160 = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        /** @preserve
            			(c) 2012 by Cédric Mesnil. All rights reserved.
        
            			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
        
            			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
            			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
        
            			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
            			*/
        (function(Math2) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var _zl = WordArray.create([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            7,
            4,
            13,
            1,
            10,
            6,
            15,
            3,
            12,
            0,
            9,
            5,
            2,
            14,
            11,
            8,
            3,
            10,
            14,
            4,
            9,
            15,
            8,
            1,
            2,
            7,
            0,
            6,
            13,
            11,
            5,
            12,
            1,
            9,
            11,
            10,
            0,
            8,
            12,
            4,
            13,
            3,
            7,
            15,
            14,
            5,
            6,
            2,
            4,
            0,
            5,
            9,
            7,
            12,
            2,
            10,
            14,
            1,
            3,
            8,
            11,
            6,
            15,
            13
          ]);
          var _zr = WordArray.create([
            5,
            14,
            7,
            0,
            9,
            2,
            11,
            4,
            13,
            6,
            15,
            8,
            1,
            10,
            3,
            12,
            6,
            11,
            3,
            7,
            0,
            13,
            5,
            10,
            14,
            15,
            8,
            12,
            4,
            9,
            1,
            2,
            15,
            5,
            1,
            3,
            7,
            14,
            6,
            9,
            11,
            8,
            12,
            2,
            10,
            0,
            4,
            13,
            8,
            6,
            4,
            1,
            3,
            11,
            15,
            0,
            5,
            12,
            2,
            13,
            9,
            7,
            10,
            14,
            12,
            15,
            10,
            4,
            1,
            5,
            8,
            7,
            6,
            2,
            13,
            14,
            0,
            3,
            9,
            11
          ]);
          var _sl = WordArray.create([
            11,
            14,
            15,
            12,
            5,
            8,
            7,
            9,
            11,
            13,
            14,
            15,
            6,
            7,
            9,
            8,
            7,
            6,
            8,
            13,
            11,
            9,
            7,
            15,
            7,
            12,
            15,
            9,
            11,
            7,
            13,
            12,
            11,
            13,
            6,
            7,
            14,
            9,
            13,
            15,
            14,
            8,
            13,
            6,
            5,
            12,
            7,
            5,
            11,
            12,
            14,
            15,
            14,
            15,
            9,
            8,
            9,
            14,
            5,
            6,
            8,
            6,
            5,
            12,
            9,
            15,
            5,
            11,
            6,
            8,
            13,
            12,
            5,
            12,
            13,
            14,
            11,
            8,
            5,
            6
          ]);
          var _sr = WordArray.create([
            8,
            9,
            9,
            11,
            13,
            15,
            15,
            5,
            7,
            7,
            8,
            11,
            14,
            14,
            12,
            6,
            9,
            13,
            15,
            7,
            12,
            8,
            9,
            11,
            7,
            7,
            12,
            7,
            6,
            15,
            13,
            11,
            9,
            7,
            15,
            11,
            8,
            6,
            6,
            14,
            12,
            13,
            5,
            14,
            13,
            13,
            7,
            5,
            15,
            5,
            8,
            11,
            14,
            14,
            6,
            14,
            6,
            9,
            12,
            9,
            12,
            5,
            15,
            8,
            8,
            5,
            12,
            9,
            12,
            5,
            14,
            6,
            8,
            13,
            6,
            5,
            15,
            13,
            11,
            11
          ]);
          var _hl = WordArray.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var _hr = WordArray.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function() {
              this._hash = WordArray.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
            },
            _doProcessBlock: function(M2, offset) {
              for (var i2 = 0; i2 < 16; i2++) {
                var offset_i = offset + i2;
                var M_offset_i = M2[offset_i];
                M2[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
              }
              var H2 = this._hash.words;
              var hl = _hl.words;
              var hr = _hr.words;
              var zl = _zl.words;
              var zr = _zr.words;
              var sl = _sl.words;
              var sr = _sr.words;
              var al, bl, cl, dl, el;
              var ar, br, cr, dr, er;
              ar = al = H2[0];
              br = bl = H2[1];
              cr = cl = H2[2];
              dr = dl = H2[3];
              er = el = H2[4];
              var t2;
              for (var i2 = 0; i2 < 80; i2 += 1) {
                t2 = al + M2[offset + zl[i2]] | 0;
                if (i2 < 16) {
                  t2 += f1(bl, cl, dl) + hl[0];
                } else if (i2 < 32) {
                  t2 += f2(bl, cl, dl) + hl[1];
                } else if (i2 < 48) {
                  t2 += f3(bl, cl, dl) + hl[2];
                } else if (i2 < 64) {
                  t2 += f4(bl, cl, dl) + hl[3];
                } else {
                  t2 += f5(bl, cl, dl) + hl[4];
                }
                t2 = t2 | 0;
                t2 = rotl(t2, sl[i2]);
                t2 = t2 + el | 0;
                al = el;
                el = dl;
                dl = rotl(cl, 10);
                cl = bl;
                bl = t2;
                t2 = ar + M2[offset + zr[i2]] | 0;
                if (i2 < 16) {
                  t2 += f5(br, cr, dr) + hr[0];
                } else if (i2 < 32) {
                  t2 += f4(br, cr, dr) + hr[1];
                } else if (i2 < 48) {
                  t2 += f3(br, cr, dr) + hr[2];
                } else if (i2 < 64) {
                  t2 += f2(br, cr, dr) + hr[3];
                } else {
                  t2 += f1(br, cr, dr) + hr[4];
                }
                t2 = t2 | 0;
                t2 = rotl(t2, sr[i2]);
                t2 = t2 + er | 0;
                ar = er;
                er = dr;
                dr = rotl(cr, 10);
                cr = br;
                br = t2;
              }
              t2 = H2[1] + cl + dr | 0;
              H2[1] = H2[2] + dl + er | 0;
              H2[2] = H2[3] + el + ar | 0;
              H2[3] = H2[4] + al + br | 0;
              H2[4] = H2[0] + bl + cr | 0;
              H2[0] = t2;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
              data.sigBytes = (dataWords.length + 1) * 4;
              this._process();
              var hash = this._hash;
              var H2 = hash.words;
              for (var i2 = 0; i2 < 5; i2++) {
                var H_i = H2[i2];
                H2[i2] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
              }
              return hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          function f1(x2, y2, z2) {
            return x2 ^ y2 ^ z2;
          }
          function f2(x2, y2, z2) {
            return x2 & y2 | ~x2 & z2;
          }
          function f3(x2, y2, z2) {
            return (x2 | ~y2) ^ z2;
          }
          function f4(x2, y2, z2) {
            return x2 & z2 | y2 & ~z2;
          }
          function f5(x2, y2, z2) {
            return x2 ^ (y2 | ~z2);
          }
          function rotl(x2, n2) {
            return x2 << n2 | x2 >>> 32 - n2;
          }
          C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
          C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
        })();
        return CryptoJS2.RIPEMD160;
      });
    })(ripemd160);
    return ripemd160Exports;
  }
  var hmacExports = {};
  var hmac = {
    get exports() {
      return hmacExports;
    },
    set exports(v2) {
      hmacExports = v2;
    }
  };
  var hasRequiredHmac;
  function requireHmac() {
    if (hasRequiredHmac)
      return hmacExports;
    hasRequiredHmac = 1;
    (function(module, exports) {
      (function(root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var C_algo = C.algo;
          C_algo.HMAC = Base.extend({
            /**
             * Initializes a newly created HMAC.
             *
             * @param {Hasher} hasher The hash algorithm to use.
             * @param {WordArray|string} key The secret key.
             *
             * @example
             *
             *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
             */
            init: function(hasher, key) {
              hasher = this._hasher = new hasher.init();
              if (typeof key == "string") {
                key = Utf8.parse(key);
              }
              var hasherBlockSize = hasher.blockSize;
              var hasherBlockSizeBytes = hasherBlockSize * 4;
              if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
              }
              key.clamp();
              var oKey = this._oKey = key.clone();
              var iKey = this._iKey = key.clone();
              var oKeyWords = oKey.words;
              var iKeyWords = iKey.words;
              for (var i2 = 0; i2 < hasherBlockSize; i2++) {
                oKeyWords[i2] ^= 1549556828;
                iKeyWords[i2] ^= 909522486;
              }
              oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
              this.reset();
            },
            /**
             * Resets this HMAC to its initial state.
             *
             * @example
             *
             *     hmacHasher.reset();
             */
            reset: function() {
              var hasher = this._hasher;
              hasher.reset();
              hasher.update(this._iKey);
            },
            /**
             * Updates this HMAC with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {HMAC} This HMAC instance.
             *
             * @example
             *
             *     hmacHasher.update('message');
             *     hmacHasher.update(wordArray);
             */
            update: function(messageUpdate) {
              this._hasher.update(messageUpdate);
              return this;
            },
            /**
             * Finalizes the HMAC computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The HMAC.
             *
             * @example
             *
             *     var hmac = hmacHasher.finalize();
             *     var hmac = hmacHasher.finalize('message');
             *     var hmac = hmacHasher.finalize(wordArray);
             */
            finalize: function(messageUpdate) {
              var hasher = this._hasher;
              var innerHash = hasher.finalize(messageUpdate);
              hasher.reset();
              var hmac2 = hasher.finalize(this._oKey.clone().concat(innerHash));
              return hmac2;
            }
          });
        })();
      });
    })(hmac);
    return hmacExports;
  }
  var pbkdf2Exports = {};
  var pbkdf2 = {
    get exports() {
      return pbkdf2Exports;
    },
    set exports(v2) {
      pbkdf2Exports = v2;
    }
  };
  var hasRequiredPbkdf2;
  function requirePbkdf2() {
    if (hasRequiredPbkdf2)
      return pbkdf2Exports;
    hasRequiredPbkdf2 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha1(), requireHmac());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var SHA1 = C_algo.SHA1;
          var HMAC = C_algo.HMAC;
          var PBKDF2 = C_algo.PBKDF2 = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hasher to use. Default: SHA1
             * @property {number} iterations The number of iterations to perform. Default: 1
             */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: SHA1,
              iterations: 1
            }),
            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.PBKDF2.create();
             *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
             * Computes the Password-Based Key Derivation Function 2.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function(password, salt) {
              var cfg = this.cfg;
              var hmac2 = HMAC.create(cfg.hasher, password);
              var derivedKey = WordArray.create();
              var blockIndex = WordArray.create([1]);
              var derivedKeyWords = derivedKey.words;
              var blockIndexWords = blockIndex.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                var block = hmac2.update(salt).finalize(blockIndex);
                hmac2.reset();
                var blockWords = block.words;
                var blockWordsLength = blockWords.length;
                var intermediate = block;
                for (var i2 = 1; i2 < iterations; i2++) {
                  intermediate = hmac2.finalize(intermediate);
                  hmac2.reset();
                  var intermediateWords = intermediate.words;
                  for (var j2 = 0; j2 < blockWordsLength; j2++) {
                    blockWords[j2] ^= intermediateWords[j2];
                  }
                }
                derivedKey.concat(block);
                blockIndexWords[0]++;
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.PBKDF2 = function(password, salt, cfg) {
            return PBKDF2.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS2.PBKDF2;
      });
    })(pbkdf2);
    return pbkdf2Exports;
  }
  var evpkdfExports = {};
  var evpkdf = {
    get exports() {
      return evpkdfExports;
    },
    set exports(v2) {
      evpkdfExports = v2;
    }
  };
  var hasRequiredEvpkdf;
  function requireEvpkdf() {
    if (hasRequiredEvpkdf)
      return evpkdfExports;
    hasRequiredEvpkdf = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha1(), requireHmac());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var MD5 = C_algo.MD5;
          var EvpKDF = C_algo.EvpKDF = Base.extend({
            /**
             * Configuration options.
             *
             * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
             * @property {Hasher} hasher The hash algorithm to use. Default: MD5
             * @property {number} iterations The number of iterations to perform. Default: 1
             */
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: MD5,
              iterations: 1
            }),
            /**
             * Initializes a newly created key derivation function.
             *
             * @param {Object} cfg (Optional) The configuration options to use for the derivation.
             *
             * @example
             *
             *     var kdf = CryptoJS.algo.EvpKDF.create();
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
             *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
             */
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            /**
             * Derives a key from a password.
             *
             * @param {WordArray|string} password The password.
             * @param {WordArray|string} salt A salt.
             *
             * @return {WordArray} The derived key.
             *
             * @example
             *
             *     var key = kdf.compute(password, salt);
             */
            compute: function(password, salt) {
              var block;
              var cfg = this.cfg;
              var hasher = cfg.hasher.create();
              var derivedKey = WordArray.create();
              var derivedKeyWords = derivedKey.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                if (block) {
                  hasher.update(block);
                }
                block = hasher.update(password).finalize(salt);
                hasher.reset();
                for (var i2 = 1; i2 < iterations; i2++) {
                  block = hasher.finalize(block);
                  hasher.reset();
                }
                derivedKey.concat(block);
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.EvpKDF = function(password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS2.EvpKDF;
      });
    })(evpkdf);
    return evpkdfExports;
  }
  var cipherCoreExports = {};
  var cipherCore = {
    get exports() {
      return cipherCoreExports;
    },
    set exports(v2) {
      cipherCoreExports = v2;
    }
  };
  var hasRequiredCipherCore;
  function requireCipherCore() {
    if (hasRequiredCipherCore)
      return cipherCoreExports;
    hasRequiredCipherCore = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEvpkdf());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        CryptoJS2.lib.Cipher || function(undefined$12) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
          var C_enc = C.enc;
          C_enc.Utf8;
          var Base642 = C_enc.Base64;
          var C_algo = C.algo;
          var EvpKDF = C_algo.EvpKDF;
          var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             *
             * @property {WordArray} iv The IV to use for this operation.
             */
            cfg: Base.extend(),
            /**
             * Creates this cipher in encryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
             */
            createEncryptor: function(key, cfg) {
              return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            /**
             * Creates this cipher in decryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
             */
            createDecryptor: function(key, cfg) {
              return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            /**
             * Initializes a newly created cipher.
             *
             * @param {number} xformMode Either the encryption or decryption transormation mode constant.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
             */
            init: function(xformMode, key, cfg) {
              this.cfg = this.cfg.extend(cfg);
              this._xformMode = xformMode;
              this._key = key;
              this.reset();
            },
            /**
             * Resets this cipher to its initial state.
             *
             * @example
             *
             *     cipher.reset();
             */
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            /**
             * Adds data to be encrypted or decrypted.
             *
             * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
             *
             * @return {WordArray} The data after processing.
             *
             * @example
             *
             *     var encrypted = cipher.process('data');
             *     var encrypted = cipher.process(wordArray);
             */
            process: function(dataUpdate) {
              this._append(dataUpdate);
              return this._process();
            },
            /**
             * Finalizes the encryption or decryption process.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
             *
             * @return {WordArray} The data after final processing.
             *
             * @example
             *
             *     var encrypted = cipher.finalize();
             *     var encrypted = cipher.finalize('data');
             *     var encrypted = cipher.finalize(wordArray);
             */
            finalize: function(dataUpdate) {
              if (dataUpdate) {
                this._append(dataUpdate);
              }
              var finalProcessedData = this._doFinalize();
              return finalProcessedData;
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            /**
             * Creates shortcut functions to a cipher's object interface.
             *
             * @param {Cipher} cipher The cipher to create a helper for.
             *
             * @return {Object} An object with encrypt and decrypt shortcut functions.
             *
             * @static
             *
             * @example
             *
             *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
             */
            _createHelper: function() {
              function selectCipherStrategy(key) {
                if (typeof key == "string") {
                  return PasswordBasedCipher;
                } else {
                  return SerializableCipher;
                }
              }
              return function(cipher) {
                return {
                  encrypt: function(message, key, cfg) {
                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                  },
                  decrypt: function(ciphertext, key, cfg) {
                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                  }
                };
              };
            }()
          });
          C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function() {
              var finalProcessedBlocks = this._process(true);
              return finalProcessedBlocks;
            },
            blockSize: 1
          });
          var C_mode = C.mode = {};
          var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            /**
             * Creates this mode for encryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
             */
            createEncryptor: function(cipher, iv) {
              return this.Encryptor.create(cipher, iv);
            },
            /**
             * Creates this mode for decryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
             */
            createDecryptor: function(cipher, iv) {
              return this.Decryptor.create(cipher, iv);
            },
            /**
             * Initializes a newly created mode.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
             */
            init: function(cipher, iv) {
              this._cipher = cipher;
              this._iv = iv;
            }
          });
          var CBC = C_mode.CBC = function() {
            var CBC2 = BlockCipherMode.extend();
            CBC2.Encryptor = CBC2.extend({
              /**
               * Processes the data block at offset.
               *
               * @param {Array} words The data words to operate on.
               * @param {number} offset The offset where the block starts.
               *
               * @example
               *
               *     mode.processBlock(data.words, offset);
               */
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                xorBlock.call(this, words, offset, blockSize);
                cipher.encryptBlock(words, offset);
                this._prevBlock = words.slice(offset, offset + blockSize);
              }
            });
            CBC2.Decryptor = CBC2.extend({
              /**
               * Processes the data block at offset.
               *
               * @param {Array} words The data words to operate on.
               * @param {number} offset The offset where the block starts.
               *
               * @example
               *
               *     mode.processBlock(data.words, offset);
               */
              processBlock: function(words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                cipher.decryptBlock(words, offset);
                xorBlock.call(this, words, offset, blockSize);
                this._prevBlock = thisBlock;
              }
            });
            function xorBlock(words, offset, blockSize) {
              var block;
              var iv = this._iv;
              if (iv) {
                block = iv;
                this._iv = undefined$12;
              } else {
                block = this._prevBlock;
              }
              for (var i2 = 0; i2 < blockSize; i2++) {
                words[offset + i2] ^= block[i2];
              }
            }
            return CBC2;
          }();
          var C_pad = C.pad = {};
          var Pkcs7 = C_pad.Pkcs7 = {
            /**
             * Pads data using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to pad.
             * @param {number} blockSize The multiple that the data should be padded to.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
             */
            pad: function(data, blockSize) {
              var blockSizeBytes = blockSize * 4;
              var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
              var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
              var paddingWords = [];
              for (var i2 = 0; i2 < nPaddingBytes; i2 += 4) {
                paddingWords.push(paddingWord);
              }
              var padding = WordArray.create(paddingWords, nPaddingBytes);
              data.concat(padding);
            },
            /**
             * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to unpad.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.unpad(wordArray);
             */
            unpad: function(data) {
              var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
              data.sigBytes -= nPaddingBytes;
            }
          };
          C_lib.BlockCipher = Cipher.extend({
            /**
             * Configuration options.
             *
             * @property {Mode} mode The block mode to use. Default: CBC
             * @property {Padding} padding The padding strategy to use. Default: Pkcs7
             */
            cfg: Cipher.cfg.extend({
              mode: CBC,
              padding: Pkcs7
            }),
            reset: function() {
              var modeCreator;
              Cipher.reset.call(this);
              var cfg = this.cfg;
              var iv = cfg.iv;
              var mode = cfg.mode;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                modeCreator = mode.createEncryptor;
              } else {
                modeCreator = mode.createDecryptor;
                this._minBufferSize = 1;
              }
              if (this._mode && this._mode.__creator == modeCreator) {
                this._mode.init(this, iv && iv.words);
              } else {
                this._mode = modeCreator.call(mode, this, iv && iv.words);
                this._mode.__creator = modeCreator;
              }
            },
            _doProcessBlock: function(words, offset) {
              this._mode.processBlock(words, offset);
            },
            _doFinalize: function() {
              var finalProcessedBlocks;
              var padding = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                padding.pad(this._data, this.blockSize);
                finalProcessedBlocks = this._process(true);
              } else {
                finalProcessedBlocks = this._process(true);
                padding.unpad(finalProcessedBlocks);
              }
              return finalProcessedBlocks;
            },
            blockSize: 128 / 32
          });
          var CipherParams = C_lib.CipherParams = Base.extend({
            /**
             * Initializes a newly created cipher params object.
             *
             * @param {Object} cipherParams An object with any of the possible cipher parameters.
             *
             * @example
             *
             *     var cipherParams = CryptoJS.lib.CipherParams.create({
             *         ciphertext: ciphertextWordArray,
             *         key: keyWordArray,
             *         iv: ivWordArray,
             *         salt: saltWordArray,
             *         algorithm: CryptoJS.algo.AES,
             *         mode: CryptoJS.mode.CBC,
             *         padding: CryptoJS.pad.PKCS7,
             *         blockSize: 4,
             *         formatter: CryptoJS.format.OpenSSL
             *     });
             */
            init: function(cipherParams) {
              this.mixIn(cipherParams);
            },
            /**
             * Converts this cipher params object to a string.
             *
             * @param {Format} formatter (Optional) The formatting strategy to use.
             *
             * @return {string} The stringified cipher params.
             *
             * @throws Error If neither the formatter nor the default formatter is set.
             *
             * @example
             *
             *     var string = cipherParams + '';
             *     var string = cipherParams.toString();
             *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
             */
            toString: function(formatter) {
              return (formatter || this.formatter).stringify(this);
            }
          });
          var C_format = C.format = {};
          var OpenSSLFormatter = C_format.OpenSSL = {
            /**
             * Converts a cipher params object to an OpenSSL-compatible string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The OpenSSL-compatible string.
             *
             * @static
             *
             * @example
             *
             *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
             */
            stringify: function(cipherParams) {
              var wordArray;
              var ciphertext = cipherParams.ciphertext;
              var salt = cipherParams.salt;
              if (salt) {
                wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
              } else {
                wordArray = ciphertext;
              }
              return wordArray.toString(Base642);
            },
            /**
             * Converts an OpenSSL-compatible string to a cipher params object.
             *
             * @param {string} openSSLStr The OpenSSL-compatible string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
             */
            parse: function(openSSLStr) {
              var salt;
              var ciphertext = Base642.parse(openSSLStr);
              var ciphertextWords = ciphertext.words;
              if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
                salt = WordArray.create(ciphertextWords.slice(2, 4));
                ciphertextWords.splice(0, 4);
                ciphertext.sigBytes -= 16;
              }
              return CipherParams.create({ ciphertext, salt });
            }
          };
          var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            /**
             * Configuration options.
             *
             * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
             */
            cfg: Base.extend({
              format: OpenSSLFormatter
            }),
            /**
             * Encrypts a message.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            encrypt: function(cipher, message, key, cfg) {
              cfg = this.cfg.extend(cfg);
              var encryptor = cipher.createEncryptor(key, cfg);
              var ciphertext = encryptor.finalize(message);
              var cipherCfg = encryptor.cfg;
              return CipherParams.create({
                ciphertext,
                key,
                iv: cipherCfg.iv,
                algorithm: cipher,
                mode: cipherCfg.mode,
                padding: cipherCfg.padding,
                blockSize: cipher.blockSize,
                formatter: cfg.format
              });
            },
            /**
             * Decrypts serialized ciphertext.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            decrypt: function(cipher, ciphertext, key, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
              return plaintext;
            },
            /**
             * Converts serialized ciphertext to CipherParams,
             * else assumed CipherParams already and returns ciphertext unchanged.
             *
             * @param {CipherParams|string} ciphertext The ciphertext.
             * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
             *
             * @return {CipherParams} The unserialized ciphertext.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
             */
            _parse: function(ciphertext, format) {
              if (typeof ciphertext == "string") {
                return format.parse(ciphertext, this);
              } else {
                return ciphertext;
              }
            }
          });
          var C_kdf = C.kdf = {};
          var OpenSSLKdf = C_kdf.OpenSSL = {
            /**
             * Derives a key and IV from a password.
             *
             * @param {string} password The password to derive from.
             * @param {number} keySize The size in words of the key to generate.
             * @param {number} ivSize The size in words of the IV to generate.
             * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
             *
             * @return {CipherParams} A cipher params object with the key, IV, and salt.
             *
             * @static
             *
             * @example
             *
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
             */
            execute: function(password, keySize, ivSize, salt) {
              if (!salt) {
                salt = WordArray.random(64 / 8);
              }
              var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
              var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
              key.sigBytes = keySize * 4;
              return CipherParams.create({ key, iv, salt });
            }
          };
          var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            /**
             * Configuration options.
             *
             * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
             */
            cfg: SerializableCipher.cfg.extend({
              kdf: OpenSSLKdf
            }),
            /**
             * Encrypts a message using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
             */
            encrypt: function(cipher, message, password, cfg) {
              cfg = this.cfg.extend(cfg);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
              cfg.iv = derivedParams.iv;
              var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
              ciphertext.mixIn(derivedParams);
              return ciphertext;
            },
            /**
             * Decrypts serialized ciphertext using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
             */
            decrypt: function(cipher, ciphertext, password, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
              cfg.iv = derivedParams.iv;
              var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
              return plaintext;
            }
          });
        }();
      });
    })(cipherCore);
    return cipherCoreExports;
  }
  var modeCfbExports = {};
  var modeCfb = {
    get exports() {
      return modeCfbExports;
    },
    set exports(v2) {
      modeCfbExports = v2;
    }
  };
  var hasRequiredModeCfb;
  function requireModeCfb() {
    if (hasRequiredModeCfb)
      return modeCfbExports;
    hasRequiredModeCfb = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        CryptoJS2.mode.CFB = function() {
          var CFB = CryptoJS2.lib.BlockCipherMode.extend();
          CFB.Encryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CFB.Decryptor = CFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
              this._prevBlock = thisBlock;
            }
          });
          function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
            var keystream;
            var iv = this._iv;
            if (iv) {
              keystream = iv.slice(0);
              this._iv = void 0;
            } else {
              keystream = this._prevBlock;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i2 = 0; i2 < blockSize; i2++) {
              words[offset + i2] ^= keystream[i2];
            }
          }
          return CFB;
        }();
        return CryptoJS2.mode.CFB;
      });
    })(modeCfb);
    return modeCfbExports;
  }
  var modeCtrExports = {};
  var modeCtr = {
    get exports() {
      return modeCtrExports;
    },
    set exports(v2) {
      modeCtrExports = v2;
    }
  };
  var hasRequiredModeCtr;
  function requireModeCtr() {
    if (hasRequiredModeCtr)
      return modeCtrExports;
    hasRequiredModeCtr = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        CryptoJS2.mode.CTR = function() {
          var CTR = CryptoJS2.lib.BlockCipherMode.extend();
          var Encryptor = CTR.Encryptor = CTR.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
              for (var i2 = 0; i2 < blockSize; i2++) {
                words[offset + i2] ^= keystream[i2];
              }
            }
          });
          CTR.Decryptor = Encryptor;
          return CTR;
        }();
        return CryptoJS2.mode.CTR;
      });
    })(modeCtr);
    return modeCtrExports;
  }
  var modeCtrGladmanExports = {};
  var modeCtrGladman = {
    get exports() {
      return modeCtrGladmanExports;
    },
    set exports(v2) {
      modeCtrGladmanExports = v2;
    }
  };
  var hasRequiredModeCtrGladman;
  function requireModeCtrGladman() {
    if (hasRequiredModeCtrGladman)
      return modeCtrGladmanExports;
    hasRequiredModeCtrGladman = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        /** @preserve
         * Counter block mode compatible with  Dr Brian Gladman fileenc.c
         * derived from CryptoJS.mode.CTR
         * Jan Hruby jhruby.web@gmail.com
         */
        CryptoJS2.mode.CTRGladman = function() {
          var CTRGladman = CryptoJS2.lib.BlockCipherMode.extend();
          function incWord(word) {
            if ((word >> 24 & 255) === 255) {
              var b1 = word >> 16 & 255;
              var b2 = word >> 8 & 255;
              var b3 = word & 255;
              if (b1 === 255) {
                b1 = 0;
                if (b2 === 255) {
                  b2 = 0;
                  if (b3 === 255) {
                    b3 = 0;
                  } else {
                    ++b3;
                  }
                } else {
                  ++b2;
                }
              } else {
                ++b1;
              }
              word = 0;
              word += b1 << 16;
              word += b2 << 8;
              word += b3;
            } else {
              word += 1 << 24;
            }
            return word;
          }
          function incCounter(counter) {
            if ((counter[0] = incWord(counter[0])) === 0) {
              counter[1] = incWord(counter[1]);
            }
            return counter;
          }
          var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var counter = this._counter;
              if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = void 0;
              }
              incCounter(counter);
              var keystream = counter.slice(0);
              cipher.encryptBlock(keystream, 0);
              for (var i2 = 0; i2 < blockSize; i2++) {
                words[offset + i2] ^= keystream[i2];
              }
            }
          });
          CTRGladman.Decryptor = Encryptor;
          return CTRGladman;
        }();
        return CryptoJS2.mode.CTRGladman;
      });
    })(modeCtrGladman);
    return modeCtrGladmanExports;
  }
  var modeOfbExports = {};
  var modeOfb = {
    get exports() {
      return modeOfbExports;
    },
    set exports(v2) {
      modeOfbExports = v2;
    }
  };
  var hasRequiredModeOfb;
  function requireModeOfb() {
    if (hasRequiredModeOfb)
      return modeOfbExports;
    hasRequiredModeOfb = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        CryptoJS2.mode.OFB = function() {
          var OFB = CryptoJS2.lib.BlockCipherMode.extend();
          var Encryptor = OFB.Encryptor = OFB.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var iv = this._iv;
              var keystream = this._keystream;
              if (iv) {
                keystream = this._keystream = iv.slice(0);
                this._iv = void 0;
              }
              cipher.encryptBlock(keystream, 0);
              for (var i2 = 0; i2 < blockSize; i2++) {
                words[offset + i2] ^= keystream[i2];
              }
            }
          });
          OFB.Decryptor = Encryptor;
          return OFB;
        }();
        return CryptoJS2.mode.OFB;
      });
    })(modeOfb);
    return modeOfbExports;
  }
  var modeEcbExports = {};
  var modeEcb = {
    get exports() {
      return modeEcbExports;
    },
    set exports(v2) {
      modeEcbExports = v2;
    }
  };
  var hasRequiredModeEcb;
  function requireModeEcb() {
    if (hasRequiredModeEcb)
      return modeEcbExports;
    hasRequiredModeEcb = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        CryptoJS2.mode.ECB = function() {
          var ECB = CryptoJS2.lib.BlockCipherMode.extend();
          ECB.Encryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.encryptBlock(words, offset);
            }
          });
          ECB.Decryptor = ECB.extend({
            processBlock: function(words, offset) {
              this._cipher.decryptBlock(words, offset);
            }
          });
          return ECB;
        }();
        return CryptoJS2.mode.ECB;
      });
    })(modeEcb);
    return modeEcbExports;
  }
  var padAnsix923Exports = {};
  var padAnsix923 = {
    get exports() {
      return padAnsix923Exports;
    },
    set exports(v2) {
      padAnsix923Exports = v2;
    }
  };
  var hasRequiredPadAnsix923;
  function requirePadAnsix923() {
    if (hasRequiredPadAnsix923)
      return padAnsix923Exports;
    hasRequiredPadAnsix923 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        CryptoJS2.pad.AnsiX923 = {
          pad: function(data, blockSize) {
            var dataSigBytes = data.sigBytes;
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
            var lastBytePos = dataSigBytes + nPaddingBytes - 1;
            data.clamp();
            data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
            data.sigBytes += nPaddingBytes;
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS2.pad.Ansix923;
      });
    })(padAnsix923);
    return padAnsix923Exports;
  }
  var padIso10126Exports = {};
  var padIso10126 = {
    get exports() {
      return padIso10126Exports;
    },
    set exports(v2) {
      padIso10126Exports = v2;
    }
  };
  var hasRequiredPadIso10126;
  function requirePadIso10126() {
    if (hasRequiredPadIso10126)
      return padIso10126Exports;
    hasRequiredPadIso10126 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        CryptoJS2.pad.Iso10126 = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            data.concat(CryptoJS2.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS2.lib.WordArray.create([nPaddingBytes << 24], 1));
          },
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        return CryptoJS2.pad.Iso10126;
      });
    })(padIso10126);
    return padIso10126Exports;
  }
  var padIso97971Exports = {};
  var padIso97971 = {
    get exports() {
      return padIso97971Exports;
    },
    set exports(v2) {
      padIso97971Exports = v2;
    }
  };
  var hasRequiredPadIso97971;
  function requirePadIso97971() {
    if (hasRequiredPadIso97971)
      return padIso97971Exports;
    hasRequiredPadIso97971 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        CryptoJS2.pad.Iso97971 = {
          pad: function(data, blockSize) {
            data.concat(CryptoJS2.lib.WordArray.create([2147483648], 1));
            CryptoJS2.pad.ZeroPadding.pad(data, blockSize);
          },
          unpad: function(data) {
            CryptoJS2.pad.ZeroPadding.unpad(data);
            data.sigBytes--;
          }
        };
        return CryptoJS2.pad.Iso97971;
      });
    })(padIso97971);
    return padIso97971Exports;
  }
  var padZeropaddingExports = {};
  var padZeropadding = {
    get exports() {
      return padZeropaddingExports;
    },
    set exports(v2) {
      padZeropaddingExports = v2;
    }
  };
  var hasRequiredPadZeropadding;
  function requirePadZeropadding() {
    if (hasRequiredPadZeropadding)
      return padZeropaddingExports;
    hasRequiredPadZeropadding = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        CryptoJS2.pad.ZeroPadding = {
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            data.clamp();
            data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
          },
          unpad: function(data) {
            var dataWords = data.words;
            var i2 = data.sigBytes - 1;
            for (var i2 = data.sigBytes - 1; i2 >= 0; i2--) {
              if (dataWords[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) {
                data.sigBytes = i2 + 1;
                break;
              }
            }
          }
        };
        return CryptoJS2.pad.ZeroPadding;
      });
    })(padZeropadding);
    return padZeropaddingExports;
  }
  var padNopaddingExports = {};
  var padNopadding = {
    get exports() {
      return padNopaddingExports;
    },
    set exports(v2) {
      padNopaddingExports = v2;
    }
  };
  var hasRequiredPadNopadding;
  function requirePadNopadding() {
    if (hasRequiredPadNopadding)
      return padNopaddingExports;
    hasRequiredPadNopadding = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        CryptoJS2.pad.NoPadding = {
          pad: function() {
          },
          unpad: function() {
          }
        };
        return CryptoJS2.pad.NoPadding;
      });
    })(padNopadding);
    return padNopaddingExports;
  }
  var formatHexExports = {};
  var formatHex = {
    get exports() {
      return formatHexExports;
    },
    set exports(v2) {
      formatHexExports = v2;
    }
  };
  var hasRequiredFormatHex;
  function requireFormatHex() {
    if (hasRequiredFormatHex)
      return formatHexExports;
    hasRequiredFormatHex = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function(undefined$12) {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var CipherParams = C_lib.CipherParams;
          var C_enc = C.enc;
          var Hex2 = C_enc.Hex;
          var C_format = C.format;
          C_format.Hex = {
            /**
             * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The hexadecimally encoded string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
             */
            stringify: function(cipherParams) {
              return cipherParams.ciphertext.toString(Hex2);
            },
            /**
             * Converts a hexadecimally encoded ciphertext string to a cipher params object.
             *
             * @param {string} input The hexadecimally encoded string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
             */
            parse: function(input) {
              var ciphertext = Hex2.parse(input);
              return CipherParams.create({ ciphertext });
            }
          };
        })();
        return CryptoJS2.format.Hex;
      });
    })(formatHex);
    return formatHexExports;
  }
  var aesExports = {};
  var aes = {
    get exports() {
      return aesExports;
    },
    set exports(v2) {
      aesExports = v2;
    }
  };
  var hasRequiredAes;
  function requireAes() {
    if (hasRequiredAes)
      return aesExports;
    hasRequiredAes = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var SBOX = [];
          var INV_SBOX = [];
          var SUB_MIX_0 = [];
          var SUB_MIX_1 = [];
          var SUB_MIX_2 = [];
          var SUB_MIX_3 = [];
          var INV_SUB_MIX_0 = [];
          var INV_SUB_MIX_1 = [];
          var INV_SUB_MIX_2 = [];
          var INV_SUB_MIX_3 = [];
          (function() {
            var d2 = [];
            for (var i2 = 0; i2 < 256; i2++) {
              if (i2 < 128) {
                d2[i2] = i2 << 1;
              } else {
                d2[i2] = i2 << 1 ^ 283;
              }
            }
            var x2 = 0;
            var xi = 0;
            for (var i2 = 0; i2 < 256; i2++) {
              var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
              sx = sx >>> 8 ^ sx & 255 ^ 99;
              SBOX[x2] = sx;
              INV_SBOX[sx] = x2;
              var x22 = d2[x2];
              var x4 = d2[x22];
              var x8 = d2[x4];
              var t2 = d2[sx] * 257 ^ sx * 16843008;
              SUB_MIX_0[x2] = t2 << 24 | t2 >>> 8;
              SUB_MIX_1[x2] = t2 << 16 | t2 >>> 16;
              SUB_MIX_2[x2] = t2 << 8 | t2 >>> 24;
              SUB_MIX_3[x2] = t2;
              var t2 = x8 * 16843009 ^ x4 * 65537 ^ x22 * 257 ^ x2 * 16843008;
              INV_SUB_MIX_0[sx] = t2 << 24 | t2 >>> 8;
              INV_SUB_MIX_1[sx] = t2 << 16 | t2 >>> 16;
              INV_SUB_MIX_2[sx] = t2 << 8 | t2 >>> 24;
              INV_SUB_MIX_3[sx] = t2;
              if (!x2) {
                x2 = xi = 1;
              } else {
                x2 = x22 ^ d2[d2[d2[x8 ^ x22]]];
                xi ^= d2[d2[xi]];
              }
            }
          })();
          var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
          var AES = C_algo.AES = BlockCipher.extend({
            _doReset: function() {
              var t2;
              if (this._nRounds && this._keyPriorReset === this._key) {
                return;
              }
              var key = this._keyPriorReset = this._key;
              var keyWords = key.words;
              var keySize = key.sigBytes / 4;
              var nRounds = this._nRounds = keySize + 6;
              var ksRows = (nRounds + 1) * 4;
              var keySchedule = this._keySchedule = [];
              for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                if (ksRow < keySize) {
                  keySchedule[ksRow] = keyWords[ksRow];
                } else {
                  t2 = keySchedule[ksRow - 1];
                  if (!(ksRow % keySize)) {
                    t2 = t2 << 8 | t2 >>> 24;
                    t2 = SBOX[t2 >>> 24] << 24 | SBOX[t2 >>> 16 & 255] << 16 | SBOX[t2 >>> 8 & 255] << 8 | SBOX[t2 & 255];
                    t2 ^= RCON[ksRow / keySize | 0] << 24;
                  } else if (keySize > 6 && ksRow % keySize == 4) {
                    t2 = SBOX[t2 >>> 24] << 24 | SBOX[t2 >>> 16 & 255] << 16 | SBOX[t2 >>> 8 & 255] << 8 | SBOX[t2 & 255];
                  }
                  keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t2;
                }
              }
              var invKeySchedule = this._invKeySchedule = [];
              for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                var ksRow = ksRows - invKsRow;
                if (invKsRow % 4) {
                  var t2 = keySchedule[ksRow];
                } else {
                  var t2 = keySchedule[ksRow - 4];
                }
                if (invKsRow < 4 || ksRow <= 4) {
                  invKeySchedule[invKsRow] = t2;
                } else {
                  invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t2 >>> 24]] ^ INV_SUB_MIX_1[SBOX[t2 >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t2 >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t2 & 255]];
                }
              }
            },
            encryptBlock: function(M2, offset) {
              this._doCryptBlock(M2, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },
            decryptBlock: function(M2, offset) {
              var t2 = M2[offset + 1];
              M2[offset + 1] = M2[offset + 3];
              M2[offset + 3] = t2;
              this._doCryptBlock(M2, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
              var t2 = M2[offset + 1];
              M2[offset + 1] = M2[offset + 3];
              M2[offset + 3] = t2;
            },
            _doCryptBlock: function(M2, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
              var nRounds = this._nRounds;
              var s0 = M2[offset] ^ keySchedule[0];
              var s1 = M2[offset + 1] ^ keySchedule[1];
              var s2 = M2[offset + 2] ^ keySchedule[2];
              var s3 = M2[offset + 3] ^ keySchedule[3];
              var ksRow = 4;
              for (var round = 1; round < nRounds; round++) {
                var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
                var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
                var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
                var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
                s0 = t0;
                s1 = t1;
                s2 = t2;
                s3 = t3;
              }
              var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
              var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
              var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
              var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
              M2[offset] = t0;
              M2[offset + 1] = t1;
              M2[offset + 2] = t2;
              M2[offset + 3] = t3;
            },
            keySize: 256 / 32
          });
          C.AES = BlockCipher._createHelper(AES);
        })();
        return CryptoJS2.AES;
      });
    })(aes);
    return aesExports;
  }
  var tripledesExports = {};
  var tripledes = {
    get exports() {
      return tripledesExports;
    },
    set exports(v2) {
      tripledesExports = v2;
    }
  };
  var hasRequiredTripledes;
  function requireTripledes() {
    if (hasRequiredTripledes)
      return tripledesExports;
    hasRequiredTripledes = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var BlockCipher = C_lib.BlockCipher;
          var C_algo = C.algo;
          var PC1 = [
            57,
            49,
            41,
            33,
            25,
            17,
            9,
            1,
            58,
            50,
            42,
            34,
            26,
            18,
            10,
            2,
            59,
            51,
            43,
            35,
            27,
            19,
            11,
            3,
            60,
            52,
            44,
            36,
            63,
            55,
            47,
            39,
            31,
            23,
            15,
            7,
            62,
            54,
            46,
            38,
            30,
            22,
            14,
            6,
            61,
            53,
            45,
            37,
            29,
            21,
            13,
            5,
            28,
            20,
            12,
            4
          ];
          var PC2 = [
            14,
            17,
            11,
            24,
            1,
            5,
            3,
            28,
            15,
            6,
            21,
            10,
            23,
            19,
            12,
            4,
            26,
            8,
            16,
            7,
            27,
            20,
            13,
            2,
            41,
            52,
            31,
            37,
            47,
            55,
            30,
            40,
            51,
            45,
            33,
            48,
            44,
            49,
            39,
            56,
            34,
            53,
            46,
            42,
            50,
            36,
            29,
            32
          ];
          var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
          var SBOX_P = [
            {
              0: 8421888,
              268435456: 32768,
              536870912: 8421378,
              805306368: 2,
              1073741824: 512,
              1342177280: 8421890,
              1610612736: 8389122,
              1879048192: 8388608,
              2147483648: 514,
              2415919104: 8389120,
              2684354560: 33280,
              2952790016: 8421376,
              3221225472: 32770,
              3489660928: 8388610,
              3758096384: 0,
              4026531840: 33282,
              134217728: 0,
              402653184: 8421890,
              671088640: 33282,
              939524096: 32768,
              1207959552: 8421888,
              1476395008: 512,
              1744830464: 8421378,
              2013265920: 2,
              2281701376: 8389120,
              2550136832: 33280,
              2818572288: 8421376,
              3087007744: 8389122,
              3355443200: 8388610,
              3623878656: 32770,
              3892314112: 514,
              4160749568: 8388608,
              1: 32768,
              268435457: 2,
              536870913: 8421888,
              805306369: 8388608,
              1073741825: 8421378,
              1342177281: 33280,
              1610612737: 512,
              1879048193: 8389122,
              2147483649: 8421890,
              2415919105: 8421376,
              2684354561: 8388610,
              2952790017: 33282,
              3221225473: 514,
              3489660929: 8389120,
              3758096385: 32770,
              4026531841: 0,
              134217729: 8421890,
              402653185: 8421376,
              671088641: 8388608,
              939524097: 512,
              1207959553: 32768,
              1476395009: 8388610,
              1744830465: 2,
              2013265921: 33282,
              2281701377: 32770,
              2550136833: 8389122,
              2818572289: 514,
              3087007745: 8421888,
              3355443201: 8389120,
              3623878657: 0,
              3892314113: 33280,
              4160749569: 8421378
            },
            {
              0: 1074282512,
              16777216: 16384,
              33554432: 524288,
              50331648: 1074266128,
              67108864: 1073741840,
              83886080: 1074282496,
              100663296: 1073758208,
              117440512: 16,
              134217728: 540672,
              150994944: 1073758224,
              167772160: 1073741824,
              184549376: 540688,
              201326592: 524304,
              218103808: 0,
              234881024: 16400,
              251658240: 1074266112,
              8388608: 1073758208,
              25165824: 540688,
              41943040: 16,
              58720256: 1073758224,
              75497472: 1074282512,
              92274688: 1073741824,
              109051904: 524288,
              125829120: 1074266128,
              142606336: 524304,
              159383552: 0,
              176160768: 16384,
              192937984: 1074266112,
              209715200: 1073741840,
              226492416: 540672,
              243269632: 1074282496,
              260046848: 16400,
              268435456: 0,
              285212672: 1074266128,
              301989888: 1073758224,
              318767104: 1074282496,
              335544320: 1074266112,
              352321536: 16,
              369098752: 540688,
              385875968: 16384,
              402653184: 16400,
              419430400: 524288,
              436207616: 524304,
              452984832: 1073741840,
              469762048: 540672,
              486539264: 1073758208,
              503316480: 1073741824,
              520093696: 1074282512,
              276824064: 540688,
              293601280: 524288,
              310378496: 1074266112,
              327155712: 16384,
              343932928: 1073758208,
              360710144: 1074282512,
              377487360: 16,
              394264576: 1073741824,
              411041792: 1074282496,
              427819008: 1073741840,
              444596224: 1073758224,
              461373440: 524304,
              478150656: 0,
              494927872: 16400,
              511705088: 1074266128,
              528482304: 540672
            },
            {
              0: 260,
              1048576: 0,
              2097152: 67109120,
              3145728: 65796,
              4194304: 65540,
              5242880: 67108868,
              6291456: 67174660,
              7340032: 67174400,
              8388608: 67108864,
              9437184: 67174656,
              10485760: 65792,
              11534336: 67174404,
              12582912: 67109124,
              13631488: 65536,
              14680064: 4,
              15728640: 256,
              524288: 67174656,
              1572864: 67174404,
              2621440: 0,
              3670016: 67109120,
              4718592: 67108868,
              5767168: 65536,
              6815744: 65540,
              7864320: 260,
              8912896: 4,
              9961472: 256,
              11010048: 67174400,
              12058624: 65796,
              13107200: 65792,
              14155776: 67109124,
              15204352: 67174660,
              16252928: 67108864,
              16777216: 67174656,
              17825792: 65540,
              18874368: 65536,
              19922944: 67109120,
              20971520: 256,
              22020096: 67174660,
              23068672: 67108868,
              24117248: 0,
              25165824: 67109124,
              26214400: 67108864,
              27262976: 4,
              28311552: 65792,
              29360128: 67174400,
              30408704: 260,
              31457280: 65796,
              32505856: 67174404,
              17301504: 67108864,
              18350080: 260,
              19398656: 67174656,
              20447232: 0,
              21495808: 65540,
              22544384: 67109120,
              23592960: 256,
              24641536: 67174404,
              25690112: 65536,
              26738688: 67174660,
              27787264: 65796,
              28835840: 67108868,
              29884416: 67109124,
              30932992: 67174400,
              31981568: 4,
              33030144: 65792
            },
            {
              0: 2151682048,
              65536: 2147487808,
              131072: 4198464,
              196608: 2151677952,
              262144: 0,
              327680: 4198400,
              393216: 2147483712,
              458752: 4194368,
              524288: 2147483648,
              589824: 4194304,
              655360: 64,
              720896: 2147487744,
              786432: 2151678016,
              851968: 4160,
              917504: 4096,
              983040: 2151682112,
              32768: 2147487808,
              98304: 64,
              163840: 2151678016,
              229376: 2147487744,
              294912: 4198400,
              360448: 2151682112,
              425984: 0,
              491520: 2151677952,
              557056: 4096,
              622592: 2151682048,
              688128: 4194304,
              753664: 4160,
              819200: 2147483648,
              884736: 4194368,
              950272: 4198464,
              1015808: 2147483712,
              1048576: 4194368,
              1114112: 4198400,
              1179648: 2147483712,
              1245184: 0,
              1310720: 4160,
              1376256: 2151678016,
              1441792: 2151682048,
              1507328: 2147487808,
              1572864: 2151682112,
              1638400: 2147483648,
              1703936: 2151677952,
              1769472: 4198464,
              1835008: 2147487744,
              1900544: 4194304,
              1966080: 64,
              2031616: 4096,
              1081344: 2151677952,
              1146880: 2151682112,
              1212416: 0,
              1277952: 4198400,
              1343488: 4194368,
              1409024: 2147483648,
              1474560: 2147487808,
              1540096: 64,
              1605632: 2147483712,
              1671168: 4096,
              1736704: 2147487744,
              1802240: 2151678016,
              1867776: 4160,
              1933312: 2151682048,
              1998848: 4194304,
              2064384: 4198464
            },
            {
              0: 128,
              4096: 17039360,
              8192: 262144,
              12288: 536870912,
              16384: 537133184,
              20480: 16777344,
              24576: 553648256,
              28672: 262272,
              32768: 16777216,
              36864: 537133056,
              40960: 536871040,
              45056: 553910400,
              49152: 553910272,
              53248: 0,
              57344: 17039488,
              61440: 553648128,
              2048: 17039488,
              6144: 553648256,
              10240: 128,
              14336: 17039360,
              18432: 262144,
              22528: 537133184,
              26624: 553910272,
              30720: 536870912,
              34816: 537133056,
              38912: 0,
              43008: 553910400,
              47104: 16777344,
              51200: 536871040,
              55296: 553648128,
              59392: 16777216,
              63488: 262272,
              65536: 262144,
              69632: 128,
              73728: 536870912,
              77824: 553648256,
              81920: 16777344,
              86016: 553910272,
              90112: 537133184,
              94208: 16777216,
              98304: 553910400,
              102400: 553648128,
              106496: 17039360,
              110592: 537133056,
              114688: 262272,
              118784: 536871040,
              122880: 0,
              126976: 17039488,
              67584: 553648256,
              71680: 16777216,
              75776: 17039360,
              79872: 537133184,
              83968: 536870912,
              88064: 17039488,
              92160: 128,
              96256: 553910272,
              100352: 262272,
              104448: 553910400,
              108544: 0,
              112640: 553648128,
              116736: 16777344,
              120832: 262144,
              124928: 537133056,
              129024: 536871040
            },
            {
              0: 268435464,
              256: 8192,
              512: 270532608,
              768: 270540808,
              1024: 268443648,
              1280: 2097152,
              1536: 2097160,
              1792: 268435456,
              2048: 0,
              2304: 268443656,
              2560: 2105344,
              2816: 8,
              3072: 270532616,
              3328: 2105352,
              3584: 8200,
              3840: 270540800,
              128: 270532608,
              384: 270540808,
              640: 8,
              896: 2097152,
              1152: 2105352,
              1408: 268435464,
              1664: 268443648,
              1920: 8200,
              2176: 2097160,
              2432: 8192,
              2688: 268443656,
              2944: 270532616,
              3200: 0,
              3456: 270540800,
              3712: 2105344,
              3968: 268435456,
              4096: 268443648,
              4352: 270532616,
              4608: 270540808,
              4864: 8200,
              5120: 2097152,
              5376: 268435456,
              5632: 268435464,
              5888: 2105344,
              6144: 2105352,
              6400: 0,
              6656: 8,
              6912: 270532608,
              7168: 8192,
              7424: 268443656,
              7680: 270540800,
              7936: 2097160,
              4224: 8,
              4480: 2105344,
              4736: 2097152,
              4992: 268435464,
              5248: 268443648,
              5504: 8200,
              5760: 270540808,
              6016: 270532608,
              6272: 270540800,
              6528: 270532616,
              6784: 8192,
              7040: 2105352,
              7296: 2097160,
              7552: 0,
              7808: 268435456,
              8064: 268443656
            },
            {
              0: 1048576,
              16: 33555457,
              32: 1024,
              48: 1049601,
              64: 34604033,
              80: 0,
              96: 1,
              112: 34603009,
              128: 33555456,
              144: 1048577,
              160: 33554433,
              176: 34604032,
              192: 34603008,
              208: 1025,
              224: 1049600,
              240: 33554432,
              8: 34603009,
              24: 0,
              40: 33555457,
              56: 34604032,
              72: 1048576,
              88: 33554433,
              104: 33554432,
              120: 1025,
              136: 1049601,
              152: 33555456,
              168: 34603008,
              184: 1048577,
              200: 1024,
              216: 34604033,
              232: 1,
              248: 1049600,
              256: 33554432,
              272: 1048576,
              288: 33555457,
              304: 34603009,
              320: 1048577,
              336: 33555456,
              352: 34604032,
              368: 1049601,
              384: 1025,
              400: 34604033,
              416: 1049600,
              432: 1,
              448: 0,
              464: 34603008,
              480: 33554433,
              496: 1024,
              264: 1049600,
              280: 33555457,
              296: 34603009,
              312: 1,
              328: 33554432,
              344: 1048576,
              360: 1025,
              376: 34604032,
              392: 33554433,
              408: 34603008,
              424: 0,
              440: 34604033,
              456: 1049601,
              472: 1024,
              488: 33555456,
              504: 1048577
            },
            {
              0: 134219808,
              1: 131072,
              2: 134217728,
              3: 32,
              4: 131104,
              5: 134350880,
              6: 134350848,
              7: 2048,
              8: 134348800,
              9: 134219776,
              10: 133120,
              11: 134348832,
              12: 2080,
              13: 0,
              14: 134217760,
              15: 133152,
              2147483648: 2048,
              2147483649: 134350880,
              2147483650: 134219808,
              2147483651: 134217728,
              2147483652: 134348800,
              2147483653: 133120,
              2147483654: 133152,
              2147483655: 32,
              2147483656: 134217760,
              2147483657: 2080,
              2147483658: 131104,
              2147483659: 134350848,
              2147483660: 0,
              2147483661: 134348832,
              2147483662: 134219776,
              2147483663: 131072,
              16: 133152,
              17: 134350848,
              18: 32,
              19: 2048,
              20: 134219776,
              21: 134217760,
              22: 134348832,
              23: 131072,
              24: 0,
              25: 131104,
              26: 134348800,
              27: 134219808,
              28: 134350880,
              29: 133120,
              30: 2080,
              31: 134217728,
              2147483664: 131072,
              2147483665: 2048,
              2147483666: 134348832,
              2147483667: 133152,
              2147483668: 32,
              2147483669: 134348800,
              2147483670: 134217728,
              2147483671: 134219808,
              2147483672: 134350880,
              2147483673: 134217760,
              2147483674: 134219776,
              2147483675: 0,
              2147483676: 133120,
              2147483677: 2080,
              2147483678: 131104,
              2147483679: 134350848
            }
          ];
          var SBOX_MASK = [
            4160749569,
            528482304,
            33030144,
            2064384,
            129024,
            8064,
            504,
            2147483679
          ];
          var DES = C_algo.DES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keyBits = [];
              for (var i2 = 0; i2 < 56; i2++) {
                var keyBitPos = PC1[i2] - 1;
                keyBits[i2] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
              }
              var subKeys = this._subKeys = [];
              for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
                var subKey = subKeys[nSubKey] = [];
                var bitShift = BIT_SHIFTS[nSubKey];
                for (var i2 = 0; i2 < 24; i2++) {
                  subKey[i2 / 6 | 0] |= keyBits[(PC2[i2] - 1 + bitShift) % 28] << 31 - i2 % 6;
                  subKey[4 + (i2 / 6 | 0)] |= keyBits[28 + (PC2[i2 + 24] - 1 + bitShift) % 28] << 31 - i2 % 6;
                }
                subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
                for (var i2 = 1; i2 < 7; i2++) {
                  subKey[i2] = subKey[i2] >>> (i2 - 1) * 4 + 3;
                }
                subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
              }
              var invSubKeys = this._invSubKeys = [];
              for (var i2 = 0; i2 < 16; i2++) {
                invSubKeys[i2] = subKeys[15 - i2];
              }
            },
            encryptBlock: function(M2, offset) {
              this._doCryptBlock(M2, offset, this._subKeys);
            },
            decryptBlock: function(M2, offset) {
              this._doCryptBlock(M2, offset, this._invSubKeys);
            },
            _doCryptBlock: function(M2, offset, subKeys) {
              this._lBlock = M2[offset];
              this._rBlock = M2[offset + 1];
              exchangeLR.call(this, 4, 252645135);
              exchangeLR.call(this, 16, 65535);
              exchangeRL.call(this, 2, 858993459);
              exchangeRL.call(this, 8, 16711935);
              exchangeLR.call(this, 1, 1431655765);
              for (var round = 0; round < 16; round++) {
                var subKey = subKeys[round];
                var lBlock = this._lBlock;
                var rBlock = this._rBlock;
                var f2 = 0;
                for (var i2 = 0; i2 < 8; i2++) {
                  f2 |= SBOX_P[i2][((rBlock ^ subKey[i2]) & SBOX_MASK[i2]) >>> 0];
                }
                this._lBlock = rBlock;
                this._rBlock = lBlock ^ f2;
              }
              var t2 = this._lBlock;
              this._lBlock = this._rBlock;
              this._rBlock = t2;
              exchangeLR.call(this, 1, 1431655765);
              exchangeRL.call(this, 8, 16711935);
              exchangeRL.call(this, 2, 858993459);
              exchangeLR.call(this, 16, 65535);
              exchangeLR.call(this, 4, 252645135);
              M2[offset] = this._lBlock;
              M2[offset + 1] = this._rBlock;
            },
            keySize: 64 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          function exchangeLR(offset, mask) {
            var t2 = (this._lBlock >>> offset ^ this._rBlock) & mask;
            this._rBlock ^= t2;
            this._lBlock ^= t2 << offset;
          }
          function exchangeRL(offset, mask) {
            var t2 = (this._rBlock >>> offset ^ this._lBlock) & mask;
            this._lBlock ^= t2;
            this._rBlock ^= t2 << offset;
          }
          C.DES = BlockCipher._createHelper(DES);
          var TripleDES = C_algo.TripleDES = BlockCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
                throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
              }
              var key1 = keyWords.slice(0, 2);
              var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
              var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
              this._des1 = DES.createEncryptor(WordArray.create(key1));
              this._des2 = DES.createEncryptor(WordArray.create(key2));
              this._des3 = DES.createEncryptor(WordArray.create(key3));
            },
            encryptBlock: function(M2, offset) {
              this._des1.encryptBlock(M2, offset);
              this._des2.decryptBlock(M2, offset);
              this._des3.encryptBlock(M2, offset);
            },
            decryptBlock: function(M2, offset) {
              this._des3.decryptBlock(M2, offset);
              this._des2.encryptBlock(M2, offset);
              this._des1.decryptBlock(M2, offset);
            },
            keySize: 192 / 32,
            ivSize: 64 / 32,
            blockSize: 64 / 32
          });
          C.TripleDES = BlockCipher._createHelper(TripleDES);
        })();
        return CryptoJS2.TripleDES;
      });
    })(tripledes);
    return tripledesExports;
  }
  var rc4Exports = {};
  var rc4 = {
    get exports() {
      return rc4Exports;
    },
    set exports(v2) {
      rc4Exports = v2;
    }
  };
  var hasRequiredRc4;
  function requireRc4() {
    if (hasRequiredRc4)
      return rc4Exports;
    hasRequiredRc4 = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var RC4 = C_algo.RC4 = StreamCipher.extend({
            _doReset: function() {
              var key = this._key;
              var keyWords = key.words;
              var keySigBytes = key.sigBytes;
              var S2 = this._S = [];
              for (var i2 = 0; i2 < 256; i2++) {
                S2[i2] = i2;
              }
              for (var i2 = 0, j2 = 0; i2 < 256; i2++) {
                var keyByteIndex = i2 % keySigBytes;
                var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
                j2 = (j2 + S2[i2] + keyByte) % 256;
                var t2 = S2[i2];
                S2[i2] = S2[j2];
                S2[j2] = t2;
              }
              this._i = this._j = 0;
            },
            _doProcessBlock: function(M2, offset) {
              M2[offset] ^= generateKeystreamWord.call(this);
            },
            keySize: 256 / 32,
            ivSize: 0
          });
          function generateKeystreamWord() {
            var S2 = this._S;
            var i2 = this._i;
            var j2 = this._j;
            var keystreamWord = 0;
            for (var n2 = 0; n2 < 4; n2++) {
              i2 = (i2 + 1) % 256;
              j2 = (j2 + S2[i2]) % 256;
              var t2 = S2[i2];
              S2[i2] = S2[j2];
              S2[j2] = t2;
              keystreamWord |= S2[(S2[i2] + S2[j2]) % 256] << 24 - n2 * 8;
            }
            this._i = i2;
            this._j = j2;
            return keystreamWord;
          }
          C.RC4 = StreamCipher._createHelper(RC4);
          var RC4Drop = C_algo.RC4Drop = RC4.extend({
            /**
             * Configuration options.
             *
             * @property {number} drop The number of keystream words to drop. Default 192
             */
            cfg: RC4.cfg.extend({
              drop: 192
            }),
            _doReset: function() {
              RC4._doReset.call(this);
              for (var i2 = this.cfg.drop; i2 > 0; i2--) {
                generateKeystreamWord.call(this);
              }
            }
          });
          C.RC4Drop = StreamCipher._createHelper(RC4Drop);
        })();
        return CryptoJS2.RC4;
      });
    })(rc4);
    return rc4Exports;
  }
  var rabbitExports = {};
  var rabbit = {
    get exports() {
      return rabbitExports;
    },
    set exports(v2) {
      rabbitExports = v2;
    }
  };
  var hasRequiredRabbit;
  function requireRabbit() {
    if (hasRequiredRabbit)
      return rabbitExports;
    hasRequiredRabbit = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S2 = [];
          var C_ = [];
          var G2 = [];
          var Rabbit = C_algo.Rabbit = StreamCipher.extend({
            _doReset: function() {
              var K2 = this._key.words;
              var iv = this.cfg.iv;
              for (var i2 = 0; i2 < 4; i2++) {
                K2[i2] = (K2[i2] << 8 | K2[i2] >>> 24) & 16711935 | (K2[i2] << 24 | K2[i2] >>> 8) & 4278255360;
              }
              var X2 = this._X = [
                K2[0],
                K2[3] << 16 | K2[2] >>> 16,
                K2[1],
                K2[0] << 16 | K2[3] >>> 16,
                K2[2],
                K2[1] << 16 | K2[0] >>> 16,
                K2[3],
                K2[2] << 16 | K2[1] >>> 16
              ];
              var C2 = this._C = [
                K2[2] << 16 | K2[2] >>> 16,
                K2[0] & 4294901760 | K2[1] & 65535,
                K2[3] << 16 | K2[3] >>> 16,
                K2[1] & 4294901760 | K2[2] & 65535,
                K2[0] << 16 | K2[0] >>> 16,
                K2[2] & 4294901760 | K2[3] & 65535,
                K2[1] << 16 | K2[1] >>> 16,
                K2[3] & 4294901760 | K2[0] & 65535
              ];
              this._b = 0;
              for (var i2 = 0; i2 < 4; i2++) {
                nextState.call(this);
              }
              for (var i2 = 0; i2 < 8; i2++) {
                C2[i2] ^= X2[i2 + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i22 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i22 & 4294901760;
                var i3 = i22 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i22;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i22;
                C2[7] ^= i3;
                for (var i2 = 0; i2 < 4; i2++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M2, offset) {
              var X2 = this._X;
              nextState.call(this);
              S2[0] = X2[0] ^ X2[5] >>> 16 ^ X2[3] << 16;
              S2[1] = X2[2] ^ X2[7] >>> 16 ^ X2[5] << 16;
              S2[2] = X2[4] ^ X2[1] >>> 16 ^ X2[7] << 16;
              S2[3] = X2[6] ^ X2[3] >>> 16 ^ X2[1] << 16;
              for (var i2 = 0; i2 < 4; i2++) {
                S2[i2] = (S2[i2] << 8 | S2[i2] >>> 24) & 16711935 | (S2[i2] << 24 | S2[i2] >>> 8) & 4278255360;
                M2[offset + i2] ^= S2[i2];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X2 = this._X;
            var C2 = this._C;
            for (var i2 = 0; i2 < 8; i2++) {
              C_[i2] = C2[i2];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i2 = 0; i2 < 8; i2++) {
              var gx = X2[i2] + C2[i2];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G2[i2] = gh ^ gl;
            }
            X2[0] = G2[0] + (G2[7] << 16 | G2[7] >>> 16) + (G2[6] << 16 | G2[6] >>> 16) | 0;
            X2[1] = G2[1] + (G2[0] << 8 | G2[0] >>> 24) + G2[7] | 0;
            X2[2] = G2[2] + (G2[1] << 16 | G2[1] >>> 16) + (G2[0] << 16 | G2[0] >>> 16) | 0;
            X2[3] = G2[3] + (G2[2] << 8 | G2[2] >>> 24) + G2[1] | 0;
            X2[4] = G2[4] + (G2[3] << 16 | G2[3] >>> 16) + (G2[2] << 16 | G2[2] >>> 16) | 0;
            X2[5] = G2[5] + (G2[4] << 8 | G2[4] >>> 24) + G2[3] | 0;
            X2[6] = G2[6] + (G2[5] << 16 | G2[5] >>> 16) + (G2[4] << 16 | G2[4] >>> 16) | 0;
            X2[7] = G2[7] + (G2[6] << 8 | G2[6] >>> 24) + G2[5] | 0;
          }
          C.Rabbit = StreamCipher._createHelper(Rabbit);
        })();
        return CryptoJS2.Rabbit;
      });
    })(rabbit);
    return rabbitExports;
  }
  var rabbitLegacyExports = {};
  var rabbitLegacy = {
    get exports() {
      return rabbitLegacyExports;
    },
    set exports(v2) {
      rabbitLegacyExports = v2;
    }
  };
  var hasRequiredRabbitLegacy;
  function requireRabbitLegacy() {
    if (hasRequiredRabbitLegacy)
      return rabbitLegacyExports;
    hasRequiredRabbitLegacy = 1;
    (function(module, exports) {
      (function(root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
        }
      })(commonjsGlobal, function(CryptoJS2) {
        (function() {
          var C = CryptoJS2;
          var C_lib = C.lib;
          var StreamCipher = C_lib.StreamCipher;
          var C_algo = C.algo;
          var S2 = [];
          var C_ = [];
          var G2 = [];
          var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
            _doReset: function() {
              var K2 = this._key.words;
              var iv = this.cfg.iv;
              var X2 = this._X = [
                K2[0],
                K2[3] << 16 | K2[2] >>> 16,
                K2[1],
                K2[0] << 16 | K2[3] >>> 16,
                K2[2],
                K2[1] << 16 | K2[0] >>> 16,
                K2[3],
                K2[2] << 16 | K2[1] >>> 16
              ];
              var C2 = this._C = [
                K2[2] << 16 | K2[2] >>> 16,
                K2[0] & 4294901760 | K2[1] & 65535,
                K2[3] << 16 | K2[3] >>> 16,
                K2[1] & 4294901760 | K2[2] & 65535,
                K2[0] << 16 | K2[0] >>> 16,
                K2[2] & 4294901760 | K2[3] & 65535,
                K2[1] << 16 | K2[1] >>> 16,
                K2[3] & 4294901760 | K2[0] & 65535
              ];
              this._b = 0;
              for (var i2 = 0; i2 < 4; i2++) {
                nextState.call(this);
              }
              for (var i2 = 0; i2 < 8; i2++) {
                C2[i2] ^= X2[i2 + 4 & 7];
              }
              if (iv) {
                var IV = iv.words;
                var IV_0 = IV[0];
                var IV_1 = IV[1];
                var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
                var i22 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
                var i1 = i0 >>> 16 | i22 & 4294901760;
                var i3 = i22 << 16 | i0 & 65535;
                C2[0] ^= i0;
                C2[1] ^= i1;
                C2[2] ^= i22;
                C2[3] ^= i3;
                C2[4] ^= i0;
                C2[5] ^= i1;
                C2[6] ^= i22;
                C2[7] ^= i3;
                for (var i2 = 0; i2 < 4; i2++) {
                  nextState.call(this);
                }
              }
            },
            _doProcessBlock: function(M2, offset) {
              var X2 = this._X;
              nextState.call(this);
              S2[0] = X2[0] ^ X2[5] >>> 16 ^ X2[3] << 16;
              S2[1] = X2[2] ^ X2[7] >>> 16 ^ X2[5] << 16;
              S2[2] = X2[4] ^ X2[1] >>> 16 ^ X2[7] << 16;
              S2[3] = X2[6] ^ X2[3] >>> 16 ^ X2[1] << 16;
              for (var i2 = 0; i2 < 4; i2++) {
                S2[i2] = (S2[i2] << 8 | S2[i2] >>> 24) & 16711935 | (S2[i2] << 24 | S2[i2] >>> 8) & 4278255360;
                M2[offset + i2] ^= S2[i2];
              }
            },
            blockSize: 128 / 32,
            ivSize: 64 / 32
          });
          function nextState() {
            var X2 = this._X;
            var C2 = this._C;
            for (var i2 = 0; i2 < 8; i2++) {
              C_[i2] = C2[i2];
            }
            C2[0] = C2[0] + 1295307597 + this._b | 0;
            C2[1] = C2[1] + 3545052371 + (C2[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
            C2[2] = C2[2] + 886263092 + (C2[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
            C2[3] = C2[3] + 1295307597 + (C2[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
            C2[4] = C2[4] + 3545052371 + (C2[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
            C2[5] = C2[5] + 886263092 + (C2[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
            C2[6] = C2[6] + 1295307597 + (C2[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
            C2[7] = C2[7] + 3545052371 + (C2[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
            this._b = C2[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i2 = 0; i2 < 8; i2++) {
              var gx = X2[i2] + C2[i2];
              var ga = gx & 65535;
              var gb = gx >>> 16;
              var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
              var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
              G2[i2] = gh ^ gl;
            }
            X2[0] = G2[0] + (G2[7] << 16 | G2[7] >>> 16) + (G2[6] << 16 | G2[6] >>> 16) | 0;
            X2[1] = G2[1] + (G2[0] << 8 | G2[0] >>> 24) + G2[7] | 0;
            X2[2] = G2[2] + (G2[1] << 16 | G2[1] >>> 16) + (G2[0] << 16 | G2[0] >>> 16) | 0;
            X2[3] = G2[3] + (G2[2] << 8 | G2[2] >>> 24) + G2[1] | 0;
            X2[4] = G2[4] + (G2[3] << 16 | G2[3] >>> 16) + (G2[2] << 16 | G2[2] >>> 16) | 0;
            X2[5] = G2[5] + (G2[4] << 8 | G2[4] >>> 24) + G2[3] | 0;
            X2[6] = G2[6] + (G2[5] << 16 | G2[5] >>> 16) + (G2[4] << 16 | G2[4] >>> 16) | 0;
            X2[7] = G2[7] + (G2[6] << 8 | G2[6] >>> 24) + G2[5] | 0;
          }
          C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
        })();
        return CryptoJS2.RabbitLegacy;
      });
    })(rabbitLegacy);
    return rabbitLegacyExports;
  }
  (function(module, exports) {
    (function(root, factory, undef) {
      {
        module.exports = factory(requireCore(), requireX64Core(), requireLibTypedarrays(), requireEncUtf16(), requireEncBase64(), requireEncBase64url(), requireMd5(), requireSha1(), requireSha256(), requireSha224(), requireSha512(), requireSha384(), requireSha3(), requireRipemd160(), requireHmac(), requirePbkdf2(), requireEvpkdf(), requireCipherCore(), requireModeCfb(), requireModeCtr(), requireModeCtrGladman(), requireModeOfb(), requireModeEcb(), requirePadAnsix923(), requirePadIso10126(), requirePadIso97971(), requirePadZeropadding(), requirePadNopadding(), requireFormatHex(), requireAes(), requireTripledes(), requireRc4(), requireRabbit(), requireRabbitLegacy());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      return CryptoJS2;
    });
  })(cryptoJs);
  const CryptoJS = cryptoJsExports;
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  function int2char(n2) {
    return BI_RM.charAt(n2);
  }
  function op_and(x2, y2) {
    return x2 & y2;
  }
  function op_or(x2, y2) {
    return x2 | y2;
  }
  function op_xor(x2, y2) {
    return x2 ^ y2;
  }
  function op_andnot(x2, y2) {
    return x2 & ~y2;
  }
  function lbit(x2) {
    if (x2 == 0) {
      return -1;
    }
    var r2 = 0;
    if ((x2 & 65535) == 0) {
      x2 >>= 16;
      r2 += 16;
    }
    if ((x2 & 255) == 0) {
      x2 >>= 8;
      r2 += 8;
    }
    if ((x2 & 15) == 0) {
      x2 >>= 4;
      r2 += 4;
    }
    if ((x2 & 3) == 0) {
      x2 >>= 2;
      r2 += 2;
    }
    if ((x2 & 1) == 0) {
      ++r2;
    }
    return r2;
  }
  function cbit(x2) {
    var r2 = 0;
    while (x2 != 0) {
      x2 &= x2 - 1;
      ++r2;
    }
    return r2;
  }
  var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64pad = "=";
  function hex2b64(h2) {
    var i2;
    var c2;
    var ret = "";
    for (i2 = 0; i2 + 3 <= h2.length; i2 += 3) {
      c2 = parseInt(h2.substring(i2, i2 + 3), 16);
      ret += b64map.charAt(c2 >> 6) + b64map.charAt(c2 & 63);
    }
    if (i2 + 1 == h2.length) {
      c2 = parseInt(h2.substring(i2, i2 + 1), 16);
      ret += b64map.charAt(c2 << 2);
    } else if (i2 + 2 == h2.length) {
      c2 = parseInt(h2.substring(i2, i2 + 2), 16);
      ret += b64map.charAt(c2 >> 2) + b64map.charAt((c2 & 3) << 4);
    }
    while ((ret.length & 3) > 0) {
      ret += b64pad;
    }
    return ret;
  }
  function b64tohex(s2) {
    var ret = "";
    var i2;
    var k2 = 0;
    var slop = 0;
    for (i2 = 0; i2 < s2.length; ++i2) {
      if (s2.charAt(i2) == b64pad) {
        break;
      }
      var v2 = b64map.indexOf(s2.charAt(i2));
      if (v2 < 0) {
        continue;
      }
      if (k2 == 0) {
        ret += int2char(v2 >> 2);
        slop = v2 & 3;
        k2 = 1;
      } else if (k2 == 1) {
        ret += int2char(slop << 2 | v2 >> 4);
        slop = v2 & 15;
        k2 = 2;
      } else if (k2 == 2) {
        ret += int2char(slop);
        ret += int2char(v2 >> 2);
        slop = v2 & 3;
        k2 = 3;
      } else {
        ret += int2char(slop << 2 | v2 >> 4);
        ret += int2char(v2 & 15);
        k2 = 0;
      }
    }
    if (k2 == 1) {
      ret += int2char(slop << 2);
    }
    return ret;
  }
  var decoder$1;
  var Hex = {
    decode: function(a2) {
      var i2;
      if (decoder$1 === void 0) {
        var hex = "0123456789ABCDEF";
        var ignore = " \f\n\r	 \u2028\u2029";
        decoder$1 = {};
        for (i2 = 0; i2 < 16; ++i2) {
          decoder$1[hex.charAt(i2)] = i2;
        }
        hex = hex.toLowerCase();
        for (i2 = 10; i2 < 16; ++i2) {
          decoder$1[hex.charAt(i2)] = i2;
        }
        for (i2 = 0; i2 < ignore.length; ++i2) {
          decoder$1[ignore.charAt(i2)] = -1;
        }
      }
      var out = [];
      var bits = 0;
      var char_count = 0;
      for (i2 = 0; i2 < a2.length; ++i2) {
        var c2 = a2.charAt(i2);
        if (c2 == "=") {
          break;
        }
        c2 = decoder$1[c2];
        if (c2 == -1) {
          continue;
        }
        if (c2 === void 0) {
          throw new Error("Illegal character at offset " + i2);
        }
        bits |= c2;
        if (++char_count >= 2) {
          out[out.length] = bits;
          bits = 0;
          char_count = 0;
        } else {
          bits <<= 4;
        }
      }
      if (char_count) {
        throw new Error("Hex encoding incomplete: 4 bits missing");
      }
      return out;
    }
  };
  var decoder;
  var Base64 = {
    decode: function(a2) {
      var i2;
      if (decoder === void 0) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var ignore = "= \f\n\r	 \u2028\u2029";
        decoder = /* @__PURE__ */ Object.create(null);
        for (i2 = 0; i2 < 64; ++i2) {
          decoder[b64.charAt(i2)] = i2;
        }
        decoder["-"] = 62;
        decoder["_"] = 63;
        for (i2 = 0; i2 < ignore.length; ++i2) {
          decoder[ignore.charAt(i2)] = -1;
        }
      }
      var out = [];
      var bits = 0;
      var char_count = 0;
      for (i2 = 0; i2 < a2.length; ++i2) {
        var c2 = a2.charAt(i2);
        if (c2 == "=") {
          break;
        }
        c2 = decoder[c2];
        if (c2 == -1) {
          continue;
        }
        if (c2 === void 0) {
          throw new Error("Illegal character at offset " + i2);
        }
        bits |= c2;
        if (++char_count >= 4) {
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 255;
          out[out.length] = bits & 255;
          bits = 0;
          char_count = 0;
        } else {
          bits <<= 6;
        }
      }
      switch (char_count) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");
        case 2:
          out[out.length] = bits >> 10;
          break;
        case 3:
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 255;
          break;
      }
      return out;
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function(a2) {
      var m2 = Base64.re.exec(a2);
      if (m2) {
        if (m2[1]) {
          a2 = m2[1];
        } else if (m2[2]) {
          a2 = m2[2];
        } else {
          throw new Error("RegExp out of sync");
        }
      }
      return Base64.decode(a2);
    }
  };
  var max = 1e13;
  var Int10 = (
    /** @class */
    function() {
      function Int102(value) {
        this.buf = [+value || 0];
      }
      Int102.prototype.mulAdd = function(m2, c2) {
        var b2 = this.buf;
        var l2 = b2.length;
        var i2;
        var t2;
        for (i2 = 0; i2 < l2; ++i2) {
          t2 = b2[i2] * m2 + c2;
          if (t2 < max) {
            c2 = 0;
          } else {
            c2 = 0 | t2 / max;
            t2 -= c2 * max;
          }
          b2[i2] = t2;
        }
        if (c2 > 0) {
          b2[i2] = c2;
        }
      };
      Int102.prototype.sub = function(c2) {
        var b2 = this.buf;
        var l2 = b2.length;
        var i2;
        var t2;
        for (i2 = 0; i2 < l2; ++i2) {
          t2 = b2[i2] - c2;
          if (t2 < 0) {
            t2 += max;
            c2 = 1;
          } else {
            c2 = 0;
          }
          b2[i2] = t2;
        }
        while (b2[b2.length - 1] === 0) {
          b2.pop();
        }
      };
      Int102.prototype.toString = function(base) {
        if ((base || 10) != 10) {
          throw new Error("only base 10 is supported");
        }
        var b2 = this.buf;
        var s2 = b2[b2.length - 1].toString();
        for (var i2 = b2.length - 2; i2 >= 0; --i2) {
          s2 += (max + b2[i2]).toString().substring(1);
        }
        return s2;
      };
      Int102.prototype.valueOf = function() {
        var b2 = this.buf;
        var v2 = 0;
        for (var i2 = b2.length - 1; i2 >= 0; --i2) {
          v2 = v2 * max + b2[i2];
        }
        return v2;
      };
      Int102.prototype.simplify = function() {
        var b2 = this.buf;
        return b2.length == 1 ? b2[0] : this;
      };
      return Int102;
    }()
  );
  var ellipsis = "…";
  var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
  var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
  function stringCut(str, len) {
    if (str.length > len) {
      str = str.substring(0, len) + ellipsis;
    }
    return str;
  }
  var Stream = (
    /** @class */
    function() {
      function Stream2(enc, pos) {
        this.hexDigits = "0123456789ABCDEF";
        if (enc instanceof Stream2) {
          this.enc = enc.enc;
          this.pos = enc.pos;
        } else {
          this.enc = enc;
          this.pos = pos;
        }
      }
      Stream2.prototype.get = function(pos) {
        if (pos === void 0) {
          pos = this.pos++;
        }
        if (pos >= this.enc.length) {
          throw new Error("Requesting byte offset ".concat(pos, " on a stream of length ").concat(this.enc.length));
        }
        return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos];
      };
      Stream2.prototype.hexByte = function(b2) {
        return this.hexDigits.charAt(b2 >> 4 & 15) + this.hexDigits.charAt(b2 & 15);
      };
      Stream2.prototype.hexDump = function(start, end, raw) {
        var s2 = "";
        for (var i2 = start; i2 < end; ++i2) {
          s2 += this.hexByte(this.get(i2));
          if (raw !== true) {
            switch (i2 & 15) {
              case 7:
                s2 += "  ";
                break;
              case 15:
                s2 += "\n";
                break;
              default:
                s2 += " ";
            }
          }
        }
        return s2;
      };
      Stream2.prototype.isASCII = function(start, end) {
        for (var i2 = start; i2 < end; ++i2) {
          var c2 = this.get(i2);
          if (c2 < 32 || c2 > 176) {
            return false;
          }
        }
        return true;
      };
      Stream2.prototype.parseStringISO = function(start, end) {
        var s2 = "";
        for (var i2 = start; i2 < end; ++i2) {
          s2 += String.fromCharCode(this.get(i2));
        }
        return s2;
      };
      Stream2.prototype.parseStringUTF = function(start, end) {
        var s2 = "";
        for (var i2 = start; i2 < end; ) {
          var c2 = this.get(i2++);
          if (c2 < 128) {
            s2 += String.fromCharCode(c2);
          } else if (c2 > 191 && c2 < 224) {
            s2 += String.fromCharCode((c2 & 31) << 6 | this.get(i2++) & 63);
          } else {
            s2 += String.fromCharCode((c2 & 15) << 12 | (this.get(i2++) & 63) << 6 | this.get(i2++) & 63);
          }
        }
        return s2;
      };
      Stream2.prototype.parseStringBMP = function(start, end) {
        var str = "";
        var hi;
        var lo;
        for (var i2 = start; i2 < end; ) {
          hi = this.get(i2++);
          lo = this.get(i2++);
          str += String.fromCharCode(hi << 8 | lo);
        }
        return str;
      };
      Stream2.prototype.parseTime = function(start, end, shortYear) {
        var s2 = this.parseStringISO(start, end);
        var m2 = (shortYear ? reTimeS : reTimeL).exec(s2);
        if (!m2) {
          return "Unrecognized time: " + s2;
        }
        if (shortYear) {
          m2[1] = +m2[1];
          m2[1] += +m2[1] < 70 ? 2e3 : 1900;
        }
        s2 = m2[1] + "-" + m2[2] + "-" + m2[3] + " " + m2[4];
        if (m2[5]) {
          s2 += ":" + m2[5];
          if (m2[6]) {
            s2 += ":" + m2[6];
            if (m2[7]) {
              s2 += "." + m2[7];
            }
          }
        }
        if (m2[8]) {
          s2 += " UTC";
          if (m2[8] != "Z") {
            s2 += m2[8];
            if (m2[9]) {
              s2 += ":" + m2[9];
            }
          }
        }
        return s2;
      };
      Stream2.prototype.parseInteger = function(start, end) {
        var v2 = this.get(start);
        var neg = v2 > 127;
        var pad = neg ? 255 : 0;
        var len;
        var s2 = "";
        while (v2 == pad && ++start < end) {
          v2 = this.get(start);
        }
        len = end - start;
        if (len === 0) {
          return neg ? -1 : 0;
        }
        if (len > 4) {
          s2 = v2;
          len <<= 3;
          while (((+s2 ^ pad) & 128) == 0) {
            s2 = +s2 << 1;
            --len;
          }
          s2 = "(" + len + " bit)\n";
        }
        if (neg) {
          v2 = v2 - 256;
        }
        var n2 = new Int10(v2);
        for (var i2 = start + 1; i2 < end; ++i2) {
          n2.mulAdd(256, this.get(i2));
        }
        return s2 + n2.toString();
      };
      Stream2.prototype.parseBitString = function(start, end, maxLength) {
        var unusedBit = this.get(start);
        var lenBit = (end - start - 1 << 3) - unusedBit;
        var intro = "(" + lenBit + " bit)\n";
        var s2 = "";
        for (var i2 = start + 1; i2 < end; ++i2) {
          var b2 = this.get(i2);
          var skip = i2 == end - 1 ? unusedBit : 0;
          for (var j2 = 7; j2 >= skip; --j2) {
            s2 += b2 >> j2 & 1 ? "1" : "0";
          }
          if (s2.length > maxLength) {
            return intro + stringCut(s2, maxLength);
          }
        }
        return intro + s2;
      };
      Stream2.prototype.parseOctetString = function(start, end, maxLength) {
        if (this.isASCII(start, end)) {
          return stringCut(this.parseStringISO(start, end), maxLength);
        }
        var len = end - start;
        var s2 = "(" + len + " byte)\n";
        maxLength /= 2;
        if (len > maxLength) {
          end = start + maxLength;
        }
        for (var i2 = start; i2 < end; ++i2) {
          s2 += this.hexByte(this.get(i2));
        }
        if (len > maxLength) {
          s2 += ellipsis;
        }
        return s2;
      };
      Stream2.prototype.parseOID = function(start, end, maxLength) {
        var s2 = "";
        var n2 = new Int10();
        var bits = 0;
        for (var i2 = start; i2 < end; ++i2) {
          var v2 = this.get(i2);
          n2.mulAdd(128, v2 & 127);
          bits += 7;
          if (!(v2 & 128)) {
            if (s2 === "") {
              n2 = n2.simplify();
              if (n2 instanceof Int10) {
                n2.sub(80);
                s2 = "2." + n2.toString();
              } else {
                var m2 = n2 < 80 ? n2 < 40 ? 0 : 1 : 2;
                s2 = m2 + "." + (n2 - m2 * 40);
              }
            } else {
              s2 += "." + n2.toString();
            }
            if (s2.length > maxLength) {
              return stringCut(s2, maxLength);
            }
            n2 = new Int10();
            bits = 0;
          }
        }
        if (bits > 0) {
          s2 += ".incomplete";
        }
        return s2;
      };
      return Stream2;
    }()
  );
  var ASN1 = (
    /** @class */
    function() {
      function ASN12(stream, header, length, tag, sub) {
        if (!(tag instanceof ASN1Tag)) {
          throw new Error("Invalid tag value.");
        }
        this.stream = stream;
        this.header = header;
        this.length = length;
        this.tag = tag;
        this.sub = sub;
      }
      ASN12.prototype.typeName = function() {
        switch (this.tag.tagClass) {
          case 0:
            switch (this.tag.tagNumber) {
              case 0:
                return "EOC";
              case 1:
                return "BOOLEAN";
              case 2:
                return "INTEGER";
              case 3:
                return "BIT_STRING";
              case 4:
                return "OCTET_STRING";
              case 5:
                return "NULL";
              case 6:
                return "OBJECT_IDENTIFIER";
              case 7:
                return "ObjectDescriptor";
              case 8:
                return "EXTERNAL";
              case 9:
                return "REAL";
              case 10:
                return "ENUMERATED";
              case 11:
                return "EMBEDDED_PDV";
              case 12:
                return "UTF8String";
              case 16:
                return "SEQUENCE";
              case 17:
                return "SET";
              case 18:
                return "NumericString";
              case 19:
                return "PrintableString";
              case 20:
                return "TeletexString";
              case 21:
                return "VideotexString";
              case 22:
                return "IA5String";
              case 23:
                return "UTCTime";
              case 24:
                return "GeneralizedTime";
              case 25:
                return "GraphicString";
              case 26:
                return "VisibleString";
              case 27:
                return "GeneralString";
              case 28:
                return "UniversalString";
              case 30:
                return "BMPString";
            }
            return "Universal_" + this.tag.tagNumber.toString();
          case 1:
            return "Application_" + this.tag.tagNumber.toString();
          case 2:
            return "[" + this.tag.tagNumber.toString() + "]";
          case 3:
            return "Private_" + this.tag.tagNumber.toString();
        }
      };
      ASN12.prototype.content = function(maxLength) {
        if (this.tag === void 0) {
          return null;
        }
        if (maxLength === void 0) {
          maxLength = Infinity;
        }
        var content = this.posContent();
        var len = Math.abs(this.length);
        if (!this.tag.isUniversal()) {
          if (this.sub !== null) {
            return "(" + this.sub.length + " elem)";
          }
          return this.stream.parseOctetString(content, content + len, maxLength);
        }
        switch (this.tag.tagNumber) {
          case 1:
            return this.stream.get(content) === 0 ? "false" : "true";
          case 2:
            return this.stream.parseInteger(content, content + len);
          case 3:
            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len, maxLength);
          case 4:
            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len, maxLength);
          case 6:
            return this.stream.parseOID(content, content + len, maxLength);
          case 16:
          case 17:
            if (this.sub !== null) {
              return "(" + this.sub.length + " elem)";
            } else {
              return "(no elem)";
            }
          case 12:
            return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 26:
            return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
          case 30:
            return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
          case 23:
          case 24:
            return this.stream.parseTime(content, content + len, this.tag.tagNumber == 23);
        }
        return null;
      };
      ASN12.prototype.toString = function() {
        return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
      };
      ASN12.prototype.toPrettyString = function(indent) {
        if (indent === void 0) {
          indent = "";
        }
        var s2 = indent + this.typeName() + " @" + this.stream.pos;
        if (this.length >= 0) {
          s2 += "+";
        }
        s2 += this.length;
        if (this.tag.tagConstructed) {
          s2 += " (constructed)";
        } else if (this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null) {
          s2 += " (encapsulates)";
        }
        s2 += "\n";
        if (this.sub !== null) {
          indent += "  ";
          for (var i2 = 0, max2 = this.sub.length; i2 < max2; ++i2) {
            s2 += this.sub[i2].toPrettyString(indent);
          }
        }
        return s2;
      };
      ASN12.prototype.posStart = function() {
        return this.stream.pos;
      };
      ASN12.prototype.posContent = function() {
        return this.stream.pos + this.header;
      };
      ASN12.prototype.posEnd = function() {
        return this.stream.pos + this.header + Math.abs(this.length);
      };
      ASN12.prototype.toHexString = function() {
        return this.stream.hexDump(this.posStart(), this.posEnd(), true);
      };
      ASN12.decodeLength = function(stream) {
        var buf = stream.get();
        var len = buf & 127;
        if (len == buf) {
          return len;
        }
        if (len > 6) {
          throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
        }
        if (len === 0) {
          return null;
        }
        buf = 0;
        for (var i2 = 0; i2 < len; ++i2) {
          buf = buf * 256 + stream.get();
        }
        return buf;
      };
      ASN12.prototype.getHexStringValue = function() {
        var hexString = this.toHexString();
        var offset = this.header * 2;
        var length = this.length * 2;
        return hexString.substr(offset, length);
      };
      ASN12.decode = function(str) {
        var stream;
        if (!(str instanceof Stream)) {
          stream = new Stream(str, 0);
        } else {
          stream = str;
        }
        var streamStart = new Stream(stream);
        var tag = new ASN1Tag(stream);
        var len = ASN12.decodeLength(stream);
        var start = stream.pos;
        var header = start - streamStart.pos;
        var sub = null;
        var getSub = function() {
          var ret = [];
          if (len !== null) {
            var end = start + len;
            while (stream.pos < end) {
              ret[ret.length] = ASN12.decode(stream);
            }
            if (stream.pos != end) {
              throw new Error("Content size is not correct for container starting at offset " + start);
            }
          } else {
            try {
              for (; ; ) {
                var s2 = ASN12.decode(stream);
                if (s2.tag.isEOC()) {
                  break;
                }
                ret[ret.length] = s2;
              }
              len = start - stream.pos;
            } catch (e) {
              throw new Error("Exception while decoding undefined length content: " + e);
            }
          }
          return ret;
        };
        if (tag.tagConstructed) {
          sub = getSub();
        } else if (tag.isUniversal() && (tag.tagNumber == 3 || tag.tagNumber == 4)) {
          try {
            if (tag.tagNumber == 3) {
              if (stream.get() != 0) {
                throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
              }
            }
            sub = getSub();
            for (var i2 = 0; i2 < sub.length; ++i2) {
              if (sub[i2].tag.isEOC()) {
                throw new Error("EOC is not supposed to be actual content.");
              }
            }
          } catch (e) {
            sub = null;
          }
        }
        if (sub === null) {
          if (len === null) {
            throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
          }
          stream.pos = start + Math.abs(len);
        }
        return new ASN12(streamStart, header, len, tag, sub);
      };
      return ASN12;
    }()
  );
  var ASN1Tag = (
    /** @class */
    function() {
      function ASN1Tag2(stream) {
        var buf = stream.get();
        this.tagClass = buf >> 6;
        this.tagConstructed = (buf & 32) !== 0;
        this.tagNumber = buf & 31;
        if (this.tagNumber == 31) {
          var n2 = new Int10();
          do {
            buf = stream.get();
            n2.mulAdd(128, buf & 127);
          } while (buf & 128);
          this.tagNumber = n2.simplify();
        }
      }
      ASN1Tag2.prototype.isUniversal = function() {
        return this.tagClass === 0;
      };
      ASN1Tag2.prototype.isEOC = function() {
        return this.tagClass === 0 && this.tagNumber === 0;
      };
      return ASN1Tag2;
    }()
  );
  var dbits;
  var canary = 244837814094590;
  var j_lm = (canary & 16777215) == 15715070;
  var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
  var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
  var BigInteger = (
    /** @class */
    function() {
      function BigInteger2(a2, b2, c2) {
        if (a2 != null) {
          if ("number" == typeof a2) {
            this.fromNumber(a2, b2, c2);
          } else if (b2 == null && "string" != typeof a2) {
            this.fromString(a2, 256);
          } else {
            this.fromString(a2, b2);
          }
        }
      }
      BigInteger2.prototype.toString = function(b2) {
        if (this.s < 0) {
          return "-" + this.negate().toString(b2);
        }
        var k2;
        if (b2 == 16) {
          k2 = 4;
        } else if (b2 == 8) {
          k2 = 3;
        } else if (b2 == 2) {
          k2 = 1;
        } else if (b2 == 32) {
          k2 = 5;
        } else if (b2 == 4) {
          k2 = 2;
        } else {
          return this.toRadix(b2);
        }
        var km = (1 << k2) - 1;
        var d2;
        var m2 = false;
        var r2 = "";
        var i2 = this.t;
        var p2 = this.DB - i2 * this.DB % k2;
        if (i2-- > 0) {
          if (p2 < this.DB && (d2 = this[i2] >> p2) > 0) {
            m2 = true;
            r2 = int2char(d2);
          }
          while (i2 >= 0) {
            if (p2 < k2) {
              d2 = (this[i2] & (1 << p2) - 1) << k2 - p2;
              d2 |= this[--i2] >> (p2 += this.DB - k2);
            } else {
              d2 = this[i2] >> (p2 -= k2) & km;
              if (p2 <= 0) {
                p2 += this.DB;
                --i2;
              }
            }
            if (d2 > 0) {
              m2 = true;
            }
            if (m2) {
              r2 += int2char(d2);
            }
          }
        }
        return m2 ? r2 : "0";
      };
      BigInteger2.prototype.negate = function() {
        var r2 = nbi();
        BigInteger2.ZERO.subTo(this, r2);
        return r2;
      };
      BigInteger2.prototype.abs = function() {
        return this.s < 0 ? this.negate() : this;
      };
      BigInteger2.prototype.compareTo = function(a2) {
        var r2 = this.s - a2.s;
        if (r2 != 0) {
          return r2;
        }
        var i2 = this.t;
        r2 = i2 - a2.t;
        if (r2 != 0) {
          return this.s < 0 ? -r2 : r2;
        }
        while (--i2 >= 0) {
          if ((r2 = this[i2] - a2[i2]) != 0) {
            return r2;
          }
        }
        return 0;
      };
      BigInteger2.prototype.bitLength = function() {
        if (this.t <= 0) {
          return 0;
        }
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
      };
      BigInteger2.prototype.mod = function(a2) {
        var r2 = nbi();
        this.abs().divRemTo(a2, null, r2);
        if (this.s < 0 && r2.compareTo(BigInteger2.ZERO) > 0) {
          a2.subTo(r2, r2);
        }
        return r2;
      };
      BigInteger2.prototype.modPowInt = function(e, m2) {
        var z2;
        if (e < 256 || m2.isEven()) {
          z2 = new Classic(m2);
        } else {
          z2 = new Montgomery(m2);
        }
        return this.exp(e, z2);
      };
      BigInteger2.prototype.clone = function() {
        var r2 = nbi();
        this.copyTo(r2);
        return r2;
      };
      BigInteger2.prototype.intValue = function() {
        if (this.s < 0) {
          if (this.t == 1) {
            return this[0] - this.DV;
          } else if (this.t == 0) {
            return -1;
          }
        } else if (this.t == 1) {
          return this[0];
        } else if (this.t == 0) {
          return 0;
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
      };
      BigInteger2.prototype.byteValue = function() {
        return this.t == 0 ? this.s : this[0] << 24 >> 24;
      };
      BigInteger2.prototype.shortValue = function() {
        return this.t == 0 ? this.s : this[0] << 16 >> 16;
      };
      BigInteger2.prototype.signum = function() {
        if (this.s < 0) {
          return -1;
        } else if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
          return 0;
        } else {
          return 1;
        }
      };
      BigInteger2.prototype.toByteArray = function() {
        var i2 = this.t;
        var r2 = [];
        r2[0] = this.s;
        var p2 = this.DB - i2 * this.DB % 8;
        var d2;
        var k2 = 0;
        if (i2-- > 0) {
          if (p2 < this.DB && (d2 = this[i2] >> p2) != (this.s & this.DM) >> p2) {
            r2[k2++] = d2 | this.s << this.DB - p2;
          }
          while (i2 >= 0) {
            if (p2 < 8) {
              d2 = (this[i2] & (1 << p2) - 1) << 8 - p2;
              d2 |= this[--i2] >> (p2 += this.DB - 8);
            } else {
              d2 = this[i2] >> (p2 -= 8) & 255;
              if (p2 <= 0) {
                p2 += this.DB;
                --i2;
              }
            }
            if ((d2 & 128) != 0) {
              d2 |= -256;
            }
            if (k2 == 0 && (this.s & 128) != (d2 & 128)) {
              ++k2;
            }
            if (k2 > 0 || d2 != this.s) {
              r2[k2++] = d2;
            }
          }
        }
        return r2;
      };
      BigInteger2.prototype.equals = function(a2) {
        return this.compareTo(a2) == 0;
      };
      BigInteger2.prototype.min = function(a2) {
        return this.compareTo(a2) < 0 ? this : a2;
      };
      BigInteger2.prototype.max = function(a2) {
        return this.compareTo(a2) > 0 ? this : a2;
      };
      BigInteger2.prototype.and = function(a2) {
        var r2 = nbi();
        this.bitwiseTo(a2, op_and, r2);
        return r2;
      };
      BigInteger2.prototype.or = function(a2) {
        var r2 = nbi();
        this.bitwiseTo(a2, op_or, r2);
        return r2;
      };
      BigInteger2.prototype.xor = function(a2) {
        var r2 = nbi();
        this.bitwiseTo(a2, op_xor, r2);
        return r2;
      };
      BigInteger2.prototype.andNot = function(a2) {
        var r2 = nbi();
        this.bitwiseTo(a2, op_andnot, r2);
        return r2;
      };
      BigInteger2.prototype.not = function() {
        var r2 = nbi();
        for (var i2 = 0; i2 < this.t; ++i2) {
          r2[i2] = this.DM & ~this[i2];
        }
        r2.t = this.t;
        r2.s = ~this.s;
        return r2;
      };
      BigInteger2.prototype.shiftLeft = function(n2) {
        var r2 = nbi();
        if (n2 < 0) {
          this.rShiftTo(-n2, r2);
        } else {
          this.lShiftTo(n2, r2);
        }
        return r2;
      };
      BigInteger2.prototype.shiftRight = function(n2) {
        var r2 = nbi();
        if (n2 < 0) {
          this.lShiftTo(-n2, r2);
        } else {
          this.rShiftTo(n2, r2);
        }
        return r2;
      };
      BigInteger2.prototype.getLowestSetBit = function() {
        for (var i2 = 0; i2 < this.t; ++i2) {
          if (this[i2] != 0) {
            return i2 * this.DB + lbit(this[i2]);
          }
        }
        if (this.s < 0) {
          return this.t * this.DB;
        }
        return -1;
      };
      BigInteger2.prototype.bitCount = function() {
        var r2 = 0;
        var x2 = this.s & this.DM;
        for (var i2 = 0; i2 < this.t; ++i2) {
          r2 += cbit(this[i2] ^ x2);
        }
        return r2;
      };
      BigInteger2.prototype.testBit = function(n2) {
        var j2 = Math.floor(n2 / this.DB);
        if (j2 >= this.t) {
          return this.s != 0;
        }
        return (this[j2] & 1 << n2 % this.DB) != 0;
      };
      BigInteger2.prototype.setBit = function(n2) {
        return this.changeBit(n2, op_or);
      };
      BigInteger2.prototype.clearBit = function(n2) {
        return this.changeBit(n2, op_andnot);
      };
      BigInteger2.prototype.flipBit = function(n2) {
        return this.changeBit(n2, op_xor);
      };
      BigInteger2.prototype.add = function(a2) {
        var r2 = nbi();
        this.addTo(a2, r2);
        return r2;
      };
      BigInteger2.prototype.subtract = function(a2) {
        var r2 = nbi();
        this.subTo(a2, r2);
        return r2;
      };
      BigInteger2.prototype.multiply = function(a2) {
        var r2 = nbi();
        this.multiplyTo(a2, r2);
        return r2;
      };
      BigInteger2.prototype.divide = function(a2) {
        var r2 = nbi();
        this.divRemTo(a2, r2, null);
        return r2;
      };
      BigInteger2.prototype.remainder = function(a2) {
        var r2 = nbi();
        this.divRemTo(a2, null, r2);
        return r2;
      };
      BigInteger2.prototype.divideAndRemainder = function(a2) {
        var q2 = nbi();
        var r2 = nbi();
        this.divRemTo(a2, q2, r2);
        return [q2, r2];
      };
      BigInteger2.prototype.modPow = function(e, m2) {
        var i2 = e.bitLength();
        var k2;
        var r2 = nbv(1);
        var z2;
        if (i2 <= 0) {
          return r2;
        } else if (i2 < 18) {
          k2 = 1;
        } else if (i2 < 48) {
          k2 = 3;
        } else if (i2 < 144) {
          k2 = 4;
        } else if (i2 < 768) {
          k2 = 5;
        } else {
          k2 = 6;
        }
        if (i2 < 8) {
          z2 = new Classic(m2);
        } else if (m2.isEven()) {
          z2 = new Barrett(m2);
        } else {
          z2 = new Montgomery(m2);
        }
        var g2 = [];
        var n2 = 3;
        var k1 = k2 - 1;
        var km = (1 << k2) - 1;
        g2[1] = z2.convert(this);
        if (k2 > 1) {
          var g22 = nbi();
          z2.sqrTo(g2[1], g22);
          while (n2 <= km) {
            g2[n2] = nbi();
            z2.mulTo(g22, g2[n2 - 2], g2[n2]);
            n2 += 2;
          }
        }
        var j2 = e.t - 1;
        var w2;
        var is1 = true;
        var r22 = nbi();
        var t2;
        i2 = nbits(e[j2]) - 1;
        while (j2 >= 0) {
          if (i2 >= k1) {
            w2 = e[j2] >> i2 - k1 & km;
          } else {
            w2 = (e[j2] & (1 << i2 + 1) - 1) << k1 - i2;
            if (j2 > 0) {
              w2 |= e[j2 - 1] >> this.DB + i2 - k1;
            }
          }
          n2 = k2;
          while ((w2 & 1) == 0) {
            w2 >>= 1;
            --n2;
          }
          if ((i2 -= n2) < 0) {
            i2 += this.DB;
            --j2;
          }
          if (is1) {
            g2[w2].copyTo(r2);
            is1 = false;
          } else {
            while (n2 > 1) {
              z2.sqrTo(r2, r22);
              z2.sqrTo(r22, r2);
              n2 -= 2;
            }
            if (n2 > 0) {
              z2.sqrTo(r2, r22);
            } else {
              t2 = r2;
              r2 = r22;
              r22 = t2;
            }
            z2.mulTo(r22, g2[w2], r2);
          }
          while (j2 >= 0 && (e[j2] & 1 << i2) == 0) {
            z2.sqrTo(r2, r22);
            t2 = r2;
            r2 = r22;
            r22 = t2;
            if (--i2 < 0) {
              i2 = this.DB - 1;
              --j2;
            }
          }
        }
        return z2.revert(r2);
      };
      BigInteger2.prototype.modInverse = function(m2) {
        var ac = m2.isEven();
        if (this.isEven() && ac || m2.signum() == 0) {
          return BigInteger2.ZERO;
        }
        var u2 = m2.clone();
        var v2 = this.clone();
        var a2 = nbv(1);
        var b2 = nbv(0);
        var c2 = nbv(0);
        var d2 = nbv(1);
        while (u2.signum() != 0) {
          while (u2.isEven()) {
            u2.rShiftTo(1, u2);
            if (ac) {
              if (!a2.isEven() || !b2.isEven()) {
                a2.addTo(this, a2);
                b2.subTo(m2, b2);
              }
              a2.rShiftTo(1, a2);
            } else if (!b2.isEven()) {
              b2.subTo(m2, b2);
            }
            b2.rShiftTo(1, b2);
          }
          while (v2.isEven()) {
            v2.rShiftTo(1, v2);
            if (ac) {
              if (!c2.isEven() || !d2.isEven()) {
                c2.addTo(this, c2);
                d2.subTo(m2, d2);
              }
              c2.rShiftTo(1, c2);
            } else if (!d2.isEven()) {
              d2.subTo(m2, d2);
            }
            d2.rShiftTo(1, d2);
          }
          if (u2.compareTo(v2) >= 0) {
            u2.subTo(v2, u2);
            if (ac) {
              a2.subTo(c2, a2);
            }
            b2.subTo(d2, b2);
          } else {
            v2.subTo(u2, v2);
            if (ac) {
              c2.subTo(a2, c2);
            }
            d2.subTo(b2, d2);
          }
        }
        if (v2.compareTo(BigInteger2.ONE) != 0) {
          return BigInteger2.ZERO;
        }
        if (d2.compareTo(m2) >= 0) {
          return d2.subtract(m2);
        }
        if (d2.signum() < 0) {
          d2.addTo(m2, d2);
        } else {
          return d2;
        }
        if (d2.signum() < 0) {
          return d2.add(m2);
        } else {
          return d2;
        }
      };
      BigInteger2.prototype.pow = function(e) {
        return this.exp(e, new NullExp());
      };
      BigInteger2.prototype.gcd = function(a2) {
        var x2 = this.s < 0 ? this.negate() : this.clone();
        var y2 = a2.s < 0 ? a2.negate() : a2.clone();
        if (x2.compareTo(y2) < 0) {
          var t2 = x2;
          x2 = y2;
          y2 = t2;
        }
        var i2 = x2.getLowestSetBit();
        var g2 = y2.getLowestSetBit();
        if (g2 < 0) {
          return x2;
        }
        if (i2 < g2) {
          g2 = i2;
        }
        if (g2 > 0) {
          x2.rShiftTo(g2, x2);
          y2.rShiftTo(g2, y2);
        }
        while (x2.signum() > 0) {
          if ((i2 = x2.getLowestSetBit()) > 0) {
            x2.rShiftTo(i2, x2);
          }
          if ((i2 = y2.getLowestSetBit()) > 0) {
            y2.rShiftTo(i2, y2);
          }
          if (x2.compareTo(y2) >= 0) {
            x2.subTo(y2, x2);
            x2.rShiftTo(1, x2);
          } else {
            y2.subTo(x2, y2);
            y2.rShiftTo(1, y2);
          }
        }
        if (g2 > 0) {
          y2.lShiftTo(g2, y2);
        }
        return y2;
      };
      BigInteger2.prototype.isProbablePrime = function(t2) {
        var i2;
        var x2 = this.abs();
        if (x2.t == 1 && x2[0] <= lowprimes[lowprimes.length - 1]) {
          for (i2 = 0; i2 < lowprimes.length; ++i2) {
            if (x2[0] == lowprimes[i2]) {
              return true;
            }
          }
          return false;
        }
        if (x2.isEven()) {
          return false;
        }
        i2 = 1;
        while (i2 < lowprimes.length) {
          var m2 = lowprimes[i2];
          var j2 = i2 + 1;
          while (j2 < lowprimes.length && m2 < lplim) {
            m2 *= lowprimes[j2++];
          }
          m2 = x2.modInt(m2);
          while (i2 < j2) {
            if (m2 % lowprimes[i2++] == 0) {
              return false;
            }
          }
        }
        return x2.millerRabin(t2);
      };
      BigInteger2.prototype.copyTo = function(r2) {
        for (var i2 = this.t - 1; i2 >= 0; --i2) {
          r2[i2] = this[i2];
        }
        r2.t = this.t;
        r2.s = this.s;
      };
      BigInteger2.prototype.fromInt = function(x2) {
        this.t = 1;
        this.s = x2 < 0 ? -1 : 0;
        if (x2 > 0) {
          this[0] = x2;
        } else if (x2 < -1) {
          this[0] = x2 + this.DV;
        } else {
          this.t = 0;
        }
      };
      BigInteger2.prototype.fromString = function(s2, b2) {
        var k2;
        if (b2 == 16) {
          k2 = 4;
        } else if (b2 == 8) {
          k2 = 3;
        } else if (b2 == 256) {
          k2 = 8;
        } else if (b2 == 2) {
          k2 = 1;
        } else if (b2 == 32) {
          k2 = 5;
        } else if (b2 == 4) {
          k2 = 2;
        } else {
          this.fromRadix(s2, b2);
          return;
        }
        this.t = 0;
        this.s = 0;
        var i2 = s2.length;
        var mi = false;
        var sh = 0;
        while (--i2 >= 0) {
          var x2 = k2 == 8 ? +s2[i2] & 255 : intAt(s2, i2);
          if (x2 < 0) {
            if (s2.charAt(i2) == "-") {
              mi = true;
            }
            continue;
          }
          mi = false;
          if (sh == 0) {
            this[this.t++] = x2;
          } else if (sh + k2 > this.DB) {
            this[this.t - 1] |= (x2 & (1 << this.DB - sh) - 1) << sh;
            this[this.t++] = x2 >> this.DB - sh;
          } else {
            this[this.t - 1] |= x2 << sh;
          }
          sh += k2;
          if (sh >= this.DB) {
            sh -= this.DB;
          }
        }
        if (k2 == 8 && (+s2[0] & 128) != 0) {
          this.s = -1;
          if (sh > 0) {
            this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
          }
        }
        this.clamp();
        if (mi) {
          BigInteger2.ZERO.subTo(this, this);
        }
      };
      BigInteger2.prototype.clamp = function() {
        var c2 = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c2) {
          --this.t;
        }
      };
      BigInteger2.prototype.dlShiftTo = function(n2, r2) {
        var i2;
        for (i2 = this.t - 1; i2 >= 0; --i2) {
          r2[i2 + n2] = this[i2];
        }
        for (i2 = n2 - 1; i2 >= 0; --i2) {
          r2[i2] = 0;
        }
        r2.t = this.t + n2;
        r2.s = this.s;
      };
      BigInteger2.prototype.drShiftTo = function(n2, r2) {
        for (var i2 = n2; i2 < this.t; ++i2) {
          r2[i2 - n2] = this[i2];
        }
        r2.t = Math.max(this.t - n2, 0);
        r2.s = this.s;
      };
      BigInteger2.prototype.lShiftTo = function(n2, r2) {
        var bs2 = n2 % this.DB;
        var cbs = this.DB - bs2;
        var bm = (1 << cbs) - 1;
        var ds2 = Math.floor(n2 / this.DB);
        var c2 = this.s << bs2 & this.DM;
        for (var i2 = this.t - 1; i2 >= 0; --i2) {
          r2[i2 + ds2 + 1] = this[i2] >> cbs | c2;
          c2 = (this[i2] & bm) << bs2;
        }
        for (var i2 = ds2 - 1; i2 >= 0; --i2) {
          r2[i2] = 0;
        }
        r2[ds2] = c2;
        r2.t = this.t + ds2 + 1;
        r2.s = this.s;
        r2.clamp();
      };
      BigInteger2.prototype.rShiftTo = function(n2, r2) {
        r2.s = this.s;
        var ds2 = Math.floor(n2 / this.DB);
        if (ds2 >= this.t) {
          r2.t = 0;
          return;
        }
        var bs2 = n2 % this.DB;
        var cbs = this.DB - bs2;
        var bm = (1 << bs2) - 1;
        r2[0] = this[ds2] >> bs2;
        for (var i2 = ds2 + 1; i2 < this.t; ++i2) {
          r2[i2 - ds2 - 1] |= (this[i2] & bm) << cbs;
          r2[i2 - ds2] = this[i2] >> bs2;
        }
        if (bs2 > 0) {
          r2[this.t - ds2 - 1] |= (this.s & bm) << cbs;
        }
        r2.t = this.t - ds2;
        r2.clamp();
      };
      BigInteger2.prototype.subTo = function(a2, r2) {
        var i2 = 0;
        var c2 = 0;
        var m2 = Math.min(a2.t, this.t);
        while (i2 < m2) {
          c2 += this[i2] - a2[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        if (a2.t < this.t) {
          c2 -= a2.s;
          while (i2 < this.t) {
            c2 += this[i2];
            r2[i2++] = c2 & this.DM;
            c2 >>= this.DB;
          }
          c2 += this.s;
        } else {
          c2 += this.s;
          while (i2 < a2.t) {
            c2 -= a2[i2];
            r2[i2++] = c2 & this.DM;
            c2 >>= this.DB;
          }
          c2 -= a2.s;
        }
        r2.s = c2 < 0 ? -1 : 0;
        if (c2 < -1) {
          r2[i2++] = this.DV + c2;
        } else if (c2 > 0) {
          r2[i2++] = c2;
        }
        r2.t = i2;
        r2.clamp();
      };
      BigInteger2.prototype.multiplyTo = function(a2, r2) {
        var x2 = this.abs();
        var y2 = a2.abs();
        var i2 = x2.t;
        r2.t = i2 + y2.t;
        while (--i2 >= 0) {
          r2[i2] = 0;
        }
        for (i2 = 0; i2 < y2.t; ++i2) {
          r2[i2 + x2.t] = x2.am(0, y2[i2], r2, i2, 0, x2.t);
        }
        r2.s = 0;
        r2.clamp();
        if (this.s != a2.s) {
          BigInteger2.ZERO.subTo(r2, r2);
        }
      };
      BigInteger2.prototype.squareTo = function(r2) {
        var x2 = this.abs();
        var i2 = r2.t = 2 * x2.t;
        while (--i2 >= 0) {
          r2[i2] = 0;
        }
        for (i2 = 0; i2 < x2.t - 1; ++i2) {
          var c2 = x2.am(i2, x2[i2], r2, 2 * i2, 0, 1);
          if ((r2[i2 + x2.t] += x2.am(i2 + 1, 2 * x2[i2], r2, 2 * i2 + 1, c2, x2.t - i2 - 1)) >= x2.DV) {
            r2[i2 + x2.t] -= x2.DV;
            r2[i2 + x2.t + 1] = 1;
          }
        }
        if (r2.t > 0) {
          r2[r2.t - 1] += x2.am(i2, x2[i2], r2, 2 * i2, 0, 1);
        }
        r2.s = 0;
        r2.clamp();
      };
      BigInteger2.prototype.divRemTo = function(m2, q2, r2) {
        var pm = m2.abs();
        if (pm.t <= 0) {
          return;
        }
        var pt2 = this.abs();
        if (pt2.t < pm.t) {
          if (q2 != null) {
            q2.fromInt(0);
          }
          if (r2 != null) {
            this.copyTo(r2);
          }
          return;
        }
        if (r2 == null) {
          r2 = nbi();
        }
        var y2 = nbi();
        var ts2 = this.s;
        var ms2 = m2.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]);
        if (nsh > 0) {
          pm.lShiftTo(nsh, y2);
          pt2.lShiftTo(nsh, r2);
        } else {
          pm.copyTo(y2);
          pt2.copyTo(r2);
        }
        var ys2 = y2.t;
        var y0 = y2[ys2 - 1];
        if (y0 == 0) {
          return;
        }
        var yt2 = y0 * (1 << this.F1) + (ys2 > 1 ? y2[ys2 - 2] >> this.F2 : 0);
        var d1 = this.FV / yt2;
        var d2 = (1 << this.F1) / yt2;
        var e = 1 << this.F2;
        var i2 = r2.t;
        var j2 = i2 - ys2;
        var t2 = q2 == null ? nbi() : q2;
        y2.dlShiftTo(j2, t2);
        if (r2.compareTo(t2) >= 0) {
          r2[r2.t++] = 1;
          r2.subTo(t2, r2);
        }
        BigInteger2.ONE.dlShiftTo(ys2, t2);
        t2.subTo(y2, y2);
        while (y2.t < ys2) {
          y2[y2.t++] = 0;
        }
        while (--j2 >= 0) {
          var qd = r2[--i2] == y0 ? this.DM : Math.floor(r2[i2] * d1 + (r2[i2 - 1] + e) * d2);
          if ((r2[i2] += y2.am(0, qd, r2, j2, 0, ys2)) < qd) {
            y2.dlShiftTo(j2, t2);
            r2.subTo(t2, r2);
            while (r2[i2] < --qd) {
              r2.subTo(t2, r2);
            }
          }
        }
        if (q2 != null) {
          r2.drShiftTo(ys2, q2);
          if (ts2 != ms2) {
            BigInteger2.ZERO.subTo(q2, q2);
          }
        }
        r2.t = ys2;
        r2.clamp();
        if (nsh > 0) {
          r2.rShiftTo(nsh, r2);
        }
        if (ts2 < 0) {
          BigInteger2.ZERO.subTo(r2, r2);
        }
      };
      BigInteger2.prototype.invDigit = function() {
        if (this.t < 1) {
          return 0;
        }
        var x2 = this[0];
        if ((x2 & 1) == 0) {
          return 0;
        }
        var y2 = x2 & 3;
        y2 = y2 * (2 - (x2 & 15) * y2) & 15;
        y2 = y2 * (2 - (x2 & 255) * y2) & 255;
        y2 = y2 * (2 - ((x2 & 65535) * y2 & 65535)) & 65535;
        y2 = y2 * (2 - x2 * y2 % this.DV) % this.DV;
        return y2 > 0 ? this.DV - y2 : -y2;
      };
      BigInteger2.prototype.isEven = function() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0;
      };
      BigInteger2.prototype.exp = function(e, z2) {
        if (e > 4294967295 || e < 1) {
          return BigInteger2.ONE;
        }
        var r2 = nbi();
        var r22 = nbi();
        var g2 = z2.convert(this);
        var i2 = nbits(e) - 1;
        g2.copyTo(r2);
        while (--i2 >= 0) {
          z2.sqrTo(r2, r22);
          if ((e & 1 << i2) > 0) {
            z2.mulTo(r22, g2, r2);
          } else {
            var t2 = r2;
            r2 = r22;
            r22 = t2;
          }
        }
        return z2.revert(r2);
      };
      BigInteger2.prototype.chunkSize = function(r2) {
        return Math.floor(Math.LN2 * this.DB / Math.log(r2));
      };
      BigInteger2.prototype.toRadix = function(b2) {
        if (b2 == null) {
          b2 = 10;
        }
        if (this.signum() == 0 || b2 < 2 || b2 > 36) {
          return "0";
        }
        var cs2 = this.chunkSize(b2);
        var a2 = Math.pow(b2, cs2);
        var d2 = nbv(a2);
        var y2 = nbi();
        var z2 = nbi();
        var r2 = "";
        this.divRemTo(d2, y2, z2);
        while (y2.signum() > 0) {
          r2 = (a2 + z2.intValue()).toString(b2).substr(1) + r2;
          y2.divRemTo(d2, y2, z2);
        }
        return z2.intValue().toString(b2) + r2;
      };
      BigInteger2.prototype.fromRadix = function(s2, b2) {
        this.fromInt(0);
        if (b2 == null) {
          b2 = 10;
        }
        var cs2 = this.chunkSize(b2);
        var d2 = Math.pow(b2, cs2);
        var mi = false;
        var j2 = 0;
        var w2 = 0;
        for (var i2 = 0; i2 < s2.length; ++i2) {
          var x2 = intAt(s2, i2);
          if (x2 < 0) {
            if (s2.charAt(i2) == "-" && this.signum() == 0) {
              mi = true;
            }
            continue;
          }
          w2 = b2 * w2 + x2;
          if (++j2 >= cs2) {
            this.dMultiply(d2);
            this.dAddOffset(w2, 0);
            j2 = 0;
            w2 = 0;
          }
        }
        if (j2 > 0) {
          this.dMultiply(Math.pow(b2, j2));
          this.dAddOffset(w2, 0);
        }
        if (mi) {
          BigInteger2.ZERO.subTo(this, this);
        }
      };
      BigInteger2.prototype.fromNumber = function(a2, b2, c2) {
        if ("number" == typeof b2) {
          if (a2 < 2) {
            this.fromInt(1);
          } else {
            this.fromNumber(a2, c2);
            if (!this.testBit(a2 - 1)) {
              this.bitwiseTo(BigInteger2.ONE.shiftLeft(a2 - 1), op_or, this);
            }
            if (this.isEven()) {
              this.dAddOffset(1, 0);
            }
            while (!this.isProbablePrime(b2)) {
              this.dAddOffset(2, 0);
              if (this.bitLength() > a2) {
                this.subTo(BigInteger2.ONE.shiftLeft(a2 - 1), this);
              }
            }
          }
        } else {
          var x2 = [];
          var t2 = a2 & 7;
          x2.length = (a2 >> 3) + 1;
          b2.nextBytes(x2);
          if (t2 > 0) {
            x2[0] &= (1 << t2) - 1;
          } else {
            x2[0] = 0;
          }
          this.fromString(x2, 256);
        }
      };
      BigInteger2.prototype.bitwiseTo = function(a2, op, r2) {
        var i2;
        var f2;
        var m2 = Math.min(a2.t, this.t);
        for (i2 = 0; i2 < m2; ++i2) {
          r2[i2] = op(this[i2], a2[i2]);
        }
        if (a2.t < this.t) {
          f2 = a2.s & this.DM;
          for (i2 = m2; i2 < this.t; ++i2) {
            r2[i2] = op(this[i2], f2);
          }
          r2.t = this.t;
        } else {
          f2 = this.s & this.DM;
          for (i2 = m2; i2 < a2.t; ++i2) {
            r2[i2] = op(f2, a2[i2]);
          }
          r2.t = a2.t;
        }
        r2.s = op(this.s, a2.s);
        r2.clamp();
      };
      BigInteger2.prototype.changeBit = function(n2, op) {
        var r2 = BigInteger2.ONE.shiftLeft(n2);
        this.bitwiseTo(r2, op, r2);
        return r2;
      };
      BigInteger2.prototype.addTo = function(a2, r2) {
        var i2 = 0;
        var c2 = 0;
        var m2 = Math.min(a2.t, this.t);
        while (i2 < m2) {
          c2 += this[i2] + a2[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        if (a2.t < this.t) {
          c2 += a2.s;
          while (i2 < this.t) {
            c2 += this[i2];
            r2[i2++] = c2 & this.DM;
            c2 >>= this.DB;
          }
          c2 += this.s;
        } else {
          c2 += this.s;
          while (i2 < a2.t) {
            c2 += a2[i2];
            r2[i2++] = c2 & this.DM;
            c2 >>= this.DB;
          }
          c2 += a2.s;
        }
        r2.s = c2 < 0 ? -1 : 0;
        if (c2 > 0) {
          r2[i2++] = c2;
        } else if (c2 < -1) {
          r2[i2++] = this.DV + c2;
        }
        r2.t = i2;
        r2.clamp();
      };
      BigInteger2.prototype.dMultiply = function(n2) {
        this[this.t] = this.am(0, n2 - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
      };
      BigInteger2.prototype.dAddOffset = function(n2, w2) {
        if (n2 == 0) {
          return;
        }
        while (this.t <= w2) {
          this[this.t++] = 0;
        }
        this[w2] += n2;
        while (this[w2] >= this.DV) {
          this[w2] -= this.DV;
          if (++w2 >= this.t) {
            this[this.t++] = 0;
          }
          ++this[w2];
        }
      };
      BigInteger2.prototype.multiplyLowerTo = function(a2, n2, r2) {
        var i2 = Math.min(this.t + a2.t, n2);
        r2.s = 0;
        r2.t = i2;
        while (i2 > 0) {
          r2[--i2] = 0;
        }
        for (var j2 = r2.t - this.t; i2 < j2; ++i2) {
          r2[i2 + this.t] = this.am(0, a2[i2], r2, i2, 0, this.t);
        }
        for (var j2 = Math.min(a2.t, n2); i2 < j2; ++i2) {
          this.am(0, a2[i2], r2, i2, 0, n2 - i2);
        }
        r2.clamp();
      };
      BigInteger2.prototype.multiplyUpperTo = function(a2, n2, r2) {
        --n2;
        var i2 = r2.t = this.t + a2.t - n2;
        r2.s = 0;
        while (--i2 >= 0) {
          r2[i2] = 0;
        }
        for (i2 = Math.max(n2 - this.t, 0); i2 < a2.t; ++i2) {
          r2[this.t + i2 - n2] = this.am(n2 - i2, a2[i2], r2, 0, 0, this.t + i2 - n2);
        }
        r2.clamp();
        r2.drShiftTo(1, r2);
      };
      BigInteger2.prototype.modInt = function(n2) {
        if (n2 <= 0) {
          return 0;
        }
        var d2 = this.DV % n2;
        var r2 = this.s < 0 ? n2 - 1 : 0;
        if (this.t > 0) {
          if (d2 == 0) {
            r2 = this[0] % n2;
          } else {
            for (var i2 = this.t - 1; i2 >= 0; --i2) {
              r2 = (d2 * r2 + this[i2]) % n2;
            }
          }
        }
        return r2;
      };
      BigInteger2.prototype.millerRabin = function(t2) {
        var n1 = this.subtract(BigInteger2.ONE);
        var k2 = n1.getLowestSetBit();
        if (k2 <= 0) {
          return false;
        }
        var r2 = n1.shiftRight(k2);
        t2 = t2 + 1 >> 1;
        if (t2 > lowprimes.length) {
          t2 = lowprimes.length;
        }
        var a2 = nbi();
        for (var i2 = 0; i2 < t2; ++i2) {
          a2.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
          var y2 = a2.modPow(r2, this);
          if (y2.compareTo(BigInteger2.ONE) != 0 && y2.compareTo(n1) != 0) {
            var j2 = 1;
            while (j2++ < k2 && y2.compareTo(n1) != 0) {
              y2 = y2.modPowInt(2, this);
              if (y2.compareTo(BigInteger2.ONE) == 0) {
                return false;
              }
            }
            if (y2.compareTo(n1) != 0) {
              return false;
            }
          }
        }
        return true;
      };
      BigInteger2.prototype.square = function() {
        var r2 = nbi();
        this.squareTo(r2);
        return r2;
      };
      BigInteger2.prototype.gcda = function(a2, callback) {
        var x2 = this.s < 0 ? this.negate() : this.clone();
        var y2 = a2.s < 0 ? a2.negate() : a2.clone();
        if (x2.compareTo(y2) < 0) {
          var t2 = x2;
          x2 = y2;
          y2 = t2;
        }
        var i2 = x2.getLowestSetBit();
        var g2 = y2.getLowestSetBit();
        if (g2 < 0) {
          callback(x2);
          return;
        }
        if (i2 < g2) {
          g2 = i2;
        }
        if (g2 > 0) {
          x2.rShiftTo(g2, x2);
          y2.rShiftTo(g2, y2);
        }
        var gcda1 = function() {
          if ((i2 = x2.getLowestSetBit()) > 0) {
            x2.rShiftTo(i2, x2);
          }
          if ((i2 = y2.getLowestSetBit()) > 0) {
            y2.rShiftTo(i2, y2);
          }
          if (x2.compareTo(y2) >= 0) {
            x2.subTo(y2, x2);
            x2.rShiftTo(1, x2);
          } else {
            y2.subTo(x2, y2);
            y2.rShiftTo(1, y2);
          }
          if (!(x2.signum() > 0)) {
            if (g2 > 0) {
              y2.lShiftTo(g2, y2);
            }
            setTimeout(function() {
              callback(y2);
            }, 0);
          } else {
            setTimeout(gcda1, 0);
          }
        };
        setTimeout(gcda1, 10);
      };
      BigInteger2.prototype.fromNumberAsync = function(a2, b2, c2, callback) {
        if ("number" == typeof b2) {
          if (a2 < 2) {
            this.fromInt(1);
          } else {
            this.fromNumber(a2, c2);
            if (!this.testBit(a2 - 1)) {
              this.bitwiseTo(BigInteger2.ONE.shiftLeft(a2 - 1), op_or, this);
            }
            if (this.isEven()) {
              this.dAddOffset(1, 0);
            }
            var bnp_1 = this;
            var bnpfn1_1 = function() {
              bnp_1.dAddOffset(2, 0);
              if (bnp_1.bitLength() > a2) {
                bnp_1.subTo(BigInteger2.ONE.shiftLeft(a2 - 1), bnp_1);
              }
              if (bnp_1.isProbablePrime(b2)) {
                setTimeout(function() {
                  callback();
                }, 0);
              } else {
                setTimeout(bnpfn1_1, 0);
              }
            };
            setTimeout(bnpfn1_1, 0);
          }
        } else {
          var x2 = [];
          var t2 = a2 & 7;
          x2.length = (a2 >> 3) + 1;
          b2.nextBytes(x2);
          if (t2 > 0) {
            x2[0] &= (1 << t2) - 1;
          } else {
            x2[0] = 0;
          }
          this.fromString(x2, 256);
        }
      };
      return BigInteger2;
    }()
  );
  var NullExp = (
    /** @class */
    function() {
      function NullExp2() {
      }
      NullExp2.prototype.convert = function(x2) {
        return x2;
      };
      NullExp2.prototype.revert = function(x2) {
        return x2;
      };
      NullExp2.prototype.mulTo = function(x2, y2, r2) {
        x2.multiplyTo(y2, r2);
      };
      NullExp2.prototype.sqrTo = function(x2, r2) {
        x2.squareTo(r2);
      };
      return NullExp2;
    }()
  );
  var Classic = (
    /** @class */
    function() {
      function Classic2(m2) {
        this.m = m2;
      }
      Classic2.prototype.convert = function(x2) {
        if (x2.s < 0 || x2.compareTo(this.m) >= 0) {
          return x2.mod(this.m);
        } else {
          return x2;
        }
      };
      Classic2.prototype.revert = function(x2) {
        return x2;
      };
      Classic2.prototype.reduce = function(x2) {
        x2.divRemTo(this.m, null, x2);
      };
      Classic2.prototype.mulTo = function(x2, y2, r2) {
        x2.multiplyTo(y2, r2);
        this.reduce(r2);
      };
      Classic2.prototype.sqrTo = function(x2, r2) {
        x2.squareTo(r2);
        this.reduce(r2);
      };
      return Classic2;
    }()
  );
  var Montgomery = (
    /** @class */
    function() {
      function Montgomery2(m2) {
        this.m = m2;
        this.mp = m2.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << m2.DB - 15) - 1;
        this.mt2 = 2 * m2.t;
      }
      Montgomery2.prototype.convert = function(x2) {
        var r2 = nbi();
        x2.abs().dlShiftTo(this.m.t, r2);
        r2.divRemTo(this.m, null, r2);
        if (x2.s < 0 && r2.compareTo(BigInteger.ZERO) > 0) {
          this.m.subTo(r2, r2);
        }
        return r2;
      };
      Montgomery2.prototype.revert = function(x2) {
        var r2 = nbi();
        x2.copyTo(r2);
        this.reduce(r2);
        return r2;
      };
      Montgomery2.prototype.reduce = function(x2) {
        while (x2.t <= this.mt2) {
          x2[x2.t++] = 0;
        }
        for (var i2 = 0; i2 < this.m.t; ++i2) {
          var j2 = x2[i2] & 32767;
          var u0 = j2 * this.mpl + ((j2 * this.mph + (x2[i2] >> 15) * this.mpl & this.um) << 15) & x2.DM;
          j2 = i2 + this.m.t;
          x2[j2] += this.m.am(0, u0, x2, i2, 0, this.m.t);
          while (x2[j2] >= x2.DV) {
            x2[j2] -= x2.DV;
            x2[++j2]++;
          }
        }
        x2.clamp();
        x2.drShiftTo(this.m.t, x2);
        if (x2.compareTo(this.m) >= 0) {
          x2.subTo(this.m, x2);
        }
      };
      Montgomery2.prototype.mulTo = function(x2, y2, r2) {
        x2.multiplyTo(y2, r2);
        this.reduce(r2);
      };
      Montgomery2.prototype.sqrTo = function(x2, r2) {
        x2.squareTo(r2);
        this.reduce(r2);
      };
      return Montgomery2;
    }()
  );
  var Barrett = (
    /** @class */
    function() {
      function Barrett2(m2) {
        this.m = m2;
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger.ONE.dlShiftTo(2 * m2.t, this.r2);
        this.mu = this.r2.divide(m2);
      }
      Barrett2.prototype.convert = function(x2) {
        if (x2.s < 0 || x2.t > 2 * this.m.t) {
          return x2.mod(this.m);
        } else if (x2.compareTo(this.m) < 0) {
          return x2;
        } else {
          var r2 = nbi();
          x2.copyTo(r2);
          this.reduce(r2);
          return r2;
        }
      };
      Barrett2.prototype.revert = function(x2) {
        return x2;
      };
      Barrett2.prototype.reduce = function(x2) {
        x2.drShiftTo(this.m.t - 1, this.r2);
        if (x2.t > this.m.t + 1) {
          x2.t = this.m.t + 1;
          x2.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (x2.compareTo(this.r2) < 0) {
          x2.dAddOffset(1, this.m.t + 1);
        }
        x2.subTo(this.r2, x2);
        while (x2.compareTo(this.m) >= 0) {
          x2.subTo(this.m, x2);
        }
      };
      Barrett2.prototype.mulTo = function(x2, y2, r2) {
        x2.multiplyTo(y2, r2);
        this.reduce(r2);
      };
      Barrett2.prototype.sqrTo = function(x2, r2) {
        x2.squareTo(r2);
        this.reduce(r2);
      };
      return Barrett2;
    }()
  );
  function nbi() {
    return new BigInteger(null);
  }
  function parseBigInt(str, r2) {
    return new BigInteger(str, r2);
  }
  var inBrowser = typeof navigator !== "undefined";
  if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
    BigInteger.prototype.am = function am2(i2, x2, w2, j2, c2, n2) {
      var xl = x2 & 32767;
      var xh = x2 >> 15;
      while (--n2 >= 0) {
        var l2 = this[i2] & 32767;
        var h2 = this[i2++] >> 15;
        var m2 = xh * l2 + h2 * xl;
        l2 = xl * l2 + ((m2 & 32767) << 15) + w2[j2] + (c2 & 1073741823);
        c2 = (l2 >>> 30) + (m2 >>> 15) + xh * h2 + (c2 >>> 30);
        w2[j2++] = l2 & 1073741823;
      }
      return c2;
    };
    dbits = 30;
  } else if (inBrowser && j_lm && navigator.appName != "Netscape") {
    BigInteger.prototype.am = function am1(i2, x2, w2, j2, c2, n2) {
      while (--n2 >= 0) {
        var v2 = x2 * this[i2++] + w2[j2] + c2;
        c2 = Math.floor(v2 / 67108864);
        w2[j2++] = v2 & 67108863;
      }
      return c2;
    };
    dbits = 26;
  } else {
    BigInteger.prototype.am = function am3(i2, x2, w2, j2, c2, n2) {
      var xl = x2 & 16383;
      var xh = x2 >> 14;
      while (--n2 >= 0) {
        var l2 = this[i2] & 16383;
        var h2 = this[i2++] >> 14;
        var m2 = xh * l2 + h2 * xl;
        l2 = xl * l2 + ((m2 & 16383) << 14) + w2[j2] + c2;
        c2 = (l2 >> 28) + (m2 >> 14) + xh * h2;
        w2[j2++] = l2 & 268435455;
      }
      return c2;
    };
    dbits = 28;
  }
  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = (1 << dbits) - 1;
  BigInteger.prototype.DV = 1 << dbits;
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2, BI_FP);
  BigInteger.prototype.F1 = BI_FP - dbits;
  BigInteger.prototype.F2 = 2 * dbits - BI_FP;
  var BI_RC = [];
  var rr;
  var vv;
  rr = "0".charCodeAt(0);
  for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
  }
  rr = "a".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }
  rr = "A".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }
  function intAt(s2, i2) {
    var c2 = BI_RC[s2.charCodeAt(i2)];
    return c2 == null ? -1 : c2;
  }
  function nbv(i2) {
    var r2 = nbi();
    r2.fromInt(i2);
    return r2;
  }
  function nbits(x2) {
    var r2 = 1;
    var t2;
    if ((t2 = x2 >>> 16) != 0) {
      x2 = t2;
      r2 += 16;
    }
    if ((t2 = x2 >> 8) != 0) {
      x2 = t2;
      r2 += 8;
    }
    if ((t2 = x2 >> 4) != 0) {
      x2 = t2;
      r2 += 4;
    }
    if ((t2 = x2 >> 2) != 0) {
      x2 = t2;
      r2 += 2;
    }
    if ((t2 = x2 >> 1) != 0) {
      x2 = t2;
      r2 += 1;
    }
    return r2;
  }
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);
  var Arcfour = (
    /** @class */
    function() {
      function Arcfour2() {
        this.i = 0;
        this.j = 0;
        this.S = [];
      }
      Arcfour2.prototype.init = function(key) {
        var i2;
        var j2;
        var t2;
        for (i2 = 0; i2 < 256; ++i2) {
          this.S[i2] = i2;
        }
        j2 = 0;
        for (i2 = 0; i2 < 256; ++i2) {
          j2 = j2 + this.S[i2] + key[i2 % key.length] & 255;
          t2 = this.S[i2];
          this.S[i2] = this.S[j2];
          this.S[j2] = t2;
        }
        this.i = 0;
        this.j = 0;
      };
      Arcfour2.prototype.next = function() {
        var t2;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        t2 = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t2;
        return this.S[t2 + this.S[this.i] & 255];
      };
      return Arcfour2;
    }()
  );
  function prng_newstate() {
    return new Arcfour();
  }
  var rng_psize = 256;
  var rng_state;
  var rng_pool = null;
  var rng_pptr;
  if (rng_pool == null) {
    rng_pool = [];
    rng_pptr = 0;
    var t = void 0;
    if (typeof window !== "undefined" && $inject_window_crypto && $inject_window_crypto.getRandomValues) {
      var z = new Uint32Array(256);
      $inject_window_crypto.getRandomValues(z);
      for (t = 0; t < z.length; ++t) {
        rng_pool[rng_pptr++] = z[t] & 255;
      }
    }
    var count = 0;
    var onMouseMoveListener_1 = function(ev) {
      count = count || 0;
      if (count >= 256 || rng_pptr >= rng_psize) {
        if (window.removeEventListener) {
          window.removeEventListener("mousemove", onMouseMoveListener_1, false);
        } else if (window.detachEvent) {
          window.detachEvent("onmousemove", onMouseMoveListener_1);
        }
        return;
      }
      try {
        var mouseCoordinates = ev.x + ev.y;
        rng_pool[rng_pptr++] = mouseCoordinates & 255;
        count += 1;
      } catch (e) {
      }
    };
    if (typeof window !== "undefined") {
      if (window.addEventListener) {
        window.addEventListener("mousemove", onMouseMoveListener_1, false);
      } else if (window.attachEvent) {
        window.attachEvent("onmousemove", onMouseMoveListener_1);
      }
    }
  }
  function rng_get_byte() {
    if (rng_state == null) {
      rng_state = prng_newstate();
      while (rng_pptr < rng_psize) {
        var random = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = random & 255;
      }
      rng_state.init(rng_pool);
      for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
        rng_pool[rng_pptr] = 0;
      }
      rng_pptr = 0;
    }
    return rng_state.next();
  }
  var SecureRandom = (
    /** @class */
    function() {
      function SecureRandom2() {
      }
      SecureRandom2.prototype.nextBytes = function(ba) {
        for (var i2 = 0; i2 < ba.length; ++i2) {
          ba[i2] = rng_get_byte();
        }
      };
      return SecureRandom2;
    }()
  );
  function pkcs1pad1(s2, n2) {
    if (n2 < s2.length + 22) {
      formatAppLog("error", "at node_modules/jsencrypt/lib/lib/jsbn/rsa.js:23", "Message too long for RSA");
      return null;
    }
    var len = n2 - s2.length - 6;
    var filler = "";
    for (var f2 = 0; f2 < len; f2 += 2) {
      filler += "ff";
    }
    var m2 = "0001" + filler + "00" + s2;
    return parseBigInt(m2, 16);
  }
  function pkcs1pad2(s2, n2) {
    if (n2 < s2.length + 11) {
      formatAppLog("error", "at node_modules/jsencrypt/lib/lib/jsbn/rsa.js:37", "Message too long for RSA");
      return null;
    }
    var ba = [];
    var i2 = s2.length - 1;
    while (i2 >= 0 && n2 > 0) {
      var c2 = s2.charCodeAt(i2--);
      if (c2 < 128) {
        ba[--n2] = c2;
      } else if (c2 > 127 && c2 < 2048) {
        ba[--n2] = c2 & 63 | 128;
        ba[--n2] = c2 >> 6 | 192;
      } else {
        ba[--n2] = c2 & 63 | 128;
        ba[--n2] = c2 >> 6 & 63 | 128;
        ba[--n2] = c2 >> 12 | 224;
      }
    }
    ba[--n2] = 0;
    var rng = new SecureRandom();
    var x2 = [];
    while (n2 > 2) {
      x2[0] = 0;
      while (x2[0] == 0) {
        rng.nextBytes(x2);
      }
      ba[--n2] = x2[0];
    }
    ba[--n2] = 2;
    ba[--n2] = 0;
    return new BigInteger(ba);
  }
  var RSAKey = (
    /** @class */
    function() {
      function RSAKey2() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null;
      }
      RSAKey2.prototype.doPublic = function(x2) {
        return x2.modPowInt(this.e, this.n);
      };
      RSAKey2.prototype.doPrivate = function(x2) {
        if (this.p == null || this.q == null) {
          return x2.modPow(this.d, this.n);
        }
        var xp = x2.mod(this.p).modPow(this.dmp1, this.p);
        var xq = x2.mod(this.q).modPow(this.dmq1, this.q);
        while (xp.compareTo(xq) < 0) {
          xp = xp.add(this.p);
        }
        return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
      };
      RSAKey2.prototype.setPublic = function(N2, E2) {
        if (N2 != null && E2 != null && N2.length > 0 && E2.length > 0) {
          this.n = parseBigInt(N2, 16);
          this.e = parseInt(E2, 16);
        } else {
          formatAppLog("error", "at node_modules/jsencrypt/lib/lib/jsbn/rsa.js:114", "Invalid RSA public key");
        }
      };
      RSAKey2.prototype.encrypt = function(text) {
        var maxLength = this.n.bitLength() + 7 >> 3;
        var m2 = pkcs1pad2(text, maxLength);
        if (m2 == null) {
          return null;
        }
        var c2 = this.doPublic(m2);
        if (c2 == null) {
          return null;
        }
        var h2 = c2.toString(16);
        var length = h2.length;
        for (var i2 = 0; i2 < maxLength * 2 - length; i2++) {
          h2 = "0" + h2;
        }
        return h2;
      };
      RSAKey2.prototype.setPrivate = function(N2, E2, D2) {
        if (N2 != null && E2 != null && N2.length > 0 && E2.length > 0) {
          this.n = parseBigInt(N2, 16);
          this.e = parseInt(E2, 16);
          this.d = parseBigInt(D2, 16);
        } else {
          formatAppLog("error", "at node_modules/jsencrypt/lib/lib/jsbn/rsa.js:146", "Invalid RSA private key");
        }
      };
      RSAKey2.prototype.setPrivateEx = function(N2, E2, D2, P2, Q2, DP, DQ, C) {
        if (N2 != null && E2 != null && N2.length > 0 && E2.length > 0) {
          this.n = parseBigInt(N2, 16);
          this.e = parseInt(E2, 16);
          this.d = parseBigInt(D2, 16);
          this.p = parseBigInt(P2, 16);
          this.q = parseBigInt(Q2, 16);
          this.dmp1 = parseBigInt(DP, 16);
          this.dmq1 = parseBigInt(DQ, 16);
          this.coeff = parseBigInt(C, 16);
        } else {
          formatAppLog("error", "at node_modules/jsencrypt/lib/lib/jsbn/rsa.js:163", "Invalid RSA private key");
        }
      };
      RSAKey2.prototype.generate = function(B2, E2) {
        var rng = new SecureRandom();
        var qs = B2 >> 1;
        this.e = parseInt(E2, 16);
        var ee2 = new BigInteger(E2, 16);
        for (; ; ) {
          for (; ; ) {
            this.p = new BigInteger(B2 - qs, 1, rng);
            if (this.p.subtract(BigInteger.ONE).gcd(ee2).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
              break;
            }
          }
          for (; ; ) {
            this.q = new BigInteger(qs, 1, rng);
            if (this.q.subtract(BigInteger.ONE).gcd(ee2).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
              break;
            }
          }
          if (this.p.compareTo(this.q) <= 0) {
            var t2 = this.p;
            this.p = this.q;
            this.q = t2;
          }
          var p1 = this.p.subtract(BigInteger.ONE);
          var q1 = this.q.subtract(BigInteger.ONE);
          var phi = p1.multiply(q1);
          if (phi.gcd(ee2).compareTo(BigInteger.ONE) == 0) {
            this.n = this.p.multiply(this.q);
            this.d = ee2.modInverse(phi);
            this.dmp1 = this.d.mod(p1);
            this.dmq1 = this.d.mod(q1);
            this.coeff = this.q.modInverse(this.p);
            break;
          }
        }
      };
      RSAKey2.prototype.decrypt = function(ctext) {
        var c2 = parseBigInt(ctext, 16);
        var m2 = this.doPrivate(c2);
        if (m2 == null) {
          return null;
        }
        return pkcs1unpad2(m2, this.n.bitLength() + 7 >> 3);
      };
      RSAKey2.prototype.generateAsync = function(B2, E2, callback) {
        var rng = new SecureRandom();
        var qs = B2 >> 1;
        this.e = parseInt(E2, 16);
        var ee2 = new BigInteger(E2, 16);
        var rsa = this;
        var loop1 = function() {
          var loop4 = function() {
            if (rsa.p.compareTo(rsa.q) <= 0) {
              var t2 = rsa.p;
              rsa.p = rsa.q;
              rsa.q = t2;
            }
            var p1 = rsa.p.subtract(BigInteger.ONE);
            var q1 = rsa.q.subtract(BigInteger.ONE);
            var phi = p1.multiply(q1);
            if (phi.gcd(ee2).compareTo(BigInteger.ONE) == 0) {
              rsa.n = rsa.p.multiply(rsa.q);
              rsa.d = ee2.modInverse(phi);
              rsa.dmp1 = rsa.d.mod(p1);
              rsa.dmq1 = rsa.d.mod(q1);
              rsa.coeff = rsa.q.modInverse(rsa.p);
              setTimeout(function() {
                callback();
              }, 0);
            } else {
              setTimeout(loop1, 0);
            }
          };
          var loop3 = function() {
            rsa.q = nbi();
            rsa.q.fromNumberAsync(qs, 1, rng, function() {
              rsa.q.subtract(BigInteger.ONE).gcda(ee2, function(r2) {
                if (r2.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                  setTimeout(loop4, 0);
                } else {
                  setTimeout(loop3, 0);
                }
              });
            });
          };
          var loop2 = function() {
            rsa.p = nbi();
            rsa.p.fromNumberAsync(B2 - qs, 1, rng, function() {
              rsa.p.subtract(BigInteger.ONE).gcda(ee2, function(r2) {
                if (r2.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                  setTimeout(loop3, 0);
                } else {
                  setTimeout(loop2, 0);
                }
              });
            });
          };
          setTimeout(loop2, 0);
        };
        setTimeout(loop1, 0);
      };
      RSAKey2.prototype.sign = function(text, digestMethod, digestName) {
        var header = getDigestHeader(digestName);
        var digest = header + digestMethod(text).toString();
        var m2 = pkcs1pad1(digest, this.n.bitLength() / 4);
        if (m2 == null) {
          return null;
        }
        var c2 = this.doPrivate(m2);
        if (c2 == null) {
          return null;
        }
        var h2 = c2.toString(16);
        if ((h2.length & 1) == 0) {
          return h2;
        } else {
          return "0" + h2;
        }
      };
      RSAKey2.prototype.verify = function(text, signature, digestMethod) {
        var c2 = parseBigInt(signature, 16);
        var m2 = this.doPublic(c2);
        if (m2 == null) {
          return null;
        }
        var unpadded = m2.toString(16).replace(/^1f+00/, "");
        var digest = removeDigestHeader(unpadded);
        return digest == digestMethod(text).toString();
      };
      return RSAKey2;
    }()
  );
  function pkcs1unpad2(d2, n2) {
    var b2 = d2.toByteArray();
    var i2 = 0;
    while (i2 < b2.length && b2[i2] == 0) {
      ++i2;
    }
    if (b2.length - i2 != n2 - 1 || b2[i2] != 2) {
      return null;
    }
    ++i2;
    while (b2[i2] != 0) {
      if (++i2 >= b2.length) {
        return null;
      }
    }
    var ret = "";
    while (++i2 < b2.length) {
      var c2 = b2[i2] & 255;
      if (c2 < 128) {
        ret += String.fromCharCode(c2);
      } else if (c2 > 191 && c2 < 224) {
        ret += String.fromCharCode((c2 & 31) << 6 | b2[i2 + 1] & 63);
        ++i2;
      } else {
        ret += String.fromCharCode((c2 & 15) << 12 | (b2[i2 + 1] & 63) << 6 | b2[i2 + 2] & 63);
        i2 += 2;
      }
    }
    return ret;
  }
  var DIGEST_HEADERS = {
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    ripemd160: "3021300906052b2403020105000414"
  };
  function getDigestHeader(name) {
    return DIGEST_HEADERS[name] || "";
  }
  function removeDigestHeader(str) {
    for (var name_1 in DIGEST_HEADERS) {
      if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
        var header = DIGEST_HEADERS[name_1];
        var len = header.length;
        if (str.substr(0, len) == header) {
          return str.substr(len);
        }
      }
    }
    return str;
  }
  /*!
  Copyright (c) 2011, Yahoo! Inc. All rights reserved.
  Code licensed under the BSD License:
  http://developer.yahoo.com/yui/license.html
  version: 2.9.0
  */
  var YAHOO = {};
  YAHOO.lang = {
    /**
     * Utility to set up the prototype, constructor and superclass properties to
     * support an inheritance strategy that can chain constructors and methods.
     * Static members will not be inherited.
     *
     * @method extend
     * @static
     * @param {Function} subc   the object to modify
     * @param {Function} superc the object to inherit
     * @param {Object} overrides  additional properties/methods to add to the
     *                              subclass prototype.  These will override the
     *                              matching items obtained from the superclass
     *                              if present.
     */
    extend: function(subc, superc, overrides) {
      if (!superc || !subc) {
        throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
      }
      var F2 = function() {
      };
      F2.prototype = superc.prototype;
      subc.prototype = new F2();
      subc.prototype.constructor = subc;
      subc.superclass = superc.prototype;
      if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor = superc;
      }
      if (overrides) {
        var i2;
        for (i2 in overrides) {
          subc.prototype[i2] = overrides[i2];
        }
        var _IEEnumFix = function() {
        }, ADD = ["toString", "valueOf"];
        try {
          if (/MSIE/.test(navigator.userAgent)) {
            _IEEnumFix = function(r2, s2) {
              for (i2 = 0; i2 < ADD.length; i2 = i2 + 1) {
                var fname = ADD[i2], f2 = s2[fname];
                if (typeof f2 === "function" && f2 != Object.prototype[fname]) {
                  r2[fname] = f2;
                }
              }
            };
          }
        } catch (ex) {
        }
        _IEEnumFix(subc.prototype, overrides);
      }
    }
  };
  /**
   * @fileOverview
   * @name asn1-1.0.js
   * @author Kenji Urushima kenji.urushima@gmail.com
   * @version asn1 1.0.13 (2017-Jun-02)
   * @since jsrsasign 2.1
   * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
   */
  var KJUR = {};
  if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1)
    KJUR.asn1 = {};
  KJUR.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(i2) {
      var h2 = i2.toString(16);
      if (h2.length % 2 == 1)
        h2 = "0" + h2;
      return h2;
    };
    this.bigIntToMinTwosComplementsHex = function(bigIntegerValue) {
      var h2 = bigIntegerValue.toString(16);
      if (h2.substr(0, 1) != "-") {
        if (h2.length % 2 == 1) {
          h2 = "0" + h2;
        } else {
          if (!h2.match(/^[0-7]/)) {
            h2 = "00" + h2;
          }
        }
      } else {
        var hPos = h2.substr(1);
        var xorLen = hPos.length;
        if (xorLen % 2 == 1) {
          xorLen += 1;
        } else {
          if (!h2.match(/^[0-7]/)) {
            xorLen += 2;
          }
        }
        var hMask = "";
        for (var i2 = 0; i2 < xorLen; i2++) {
          hMask += "f";
        }
        var biMask = new BigInteger(hMask, 16);
        var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
        h2 = biNeg.toString(16).replace(/^-/, "");
      }
      return h2;
    };
    this.getPEMStringFromHex = function(dataHex, pemHeader) {
      return hextopem(dataHex, pemHeader);
    };
    this.newObject = function(param) {
      var _KJUR = KJUR, _KJUR_asn1 = _KJUR.asn1, _DERBoolean = _KJUR_asn1.DERBoolean, _DERInteger = _KJUR_asn1.DERInteger, _DERBitString = _KJUR_asn1.DERBitString, _DEROctetString = _KJUR_asn1.DEROctetString, _DERNull = _KJUR_asn1.DERNull, _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier, _DEREnumerated = _KJUR_asn1.DEREnumerated, _DERUTF8String = _KJUR_asn1.DERUTF8String, _DERNumericString = _KJUR_asn1.DERNumericString, _DERPrintableString = _KJUR_asn1.DERPrintableString, _DERTeletexString = _KJUR_asn1.DERTeletexString, _DERIA5String = _KJUR_asn1.DERIA5String, _DERUTCTime = _KJUR_asn1.DERUTCTime, _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime, _DERSequence = _KJUR_asn1.DERSequence, _DERSet = _KJUR_asn1.DERSet, _DERTaggedObject = _KJUR_asn1.DERTaggedObject, _newObject = _KJUR_asn1.ASN1Util.newObject;
      var keys = Object.keys(param);
      if (keys.length != 1)
        throw "key of param shall be only one.";
      var key = keys[0];
      if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1)
        throw "undefined key: " + key;
      if (key == "bool")
        return new _DERBoolean(param[key]);
      if (key == "int")
        return new _DERInteger(param[key]);
      if (key == "bitstr")
        return new _DERBitString(param[key]);
      if (key == "octstr")
        return new _DEROctetString(param[key]);
      if (key == "null")
        return new _DERNull(param[key]);
      if (key == "oid")
        return new _DERObjectIdentifier(param[key]);
      if (key == "enum")
        return new _DEREnumerated(param[key]);
      if (key == "utf8str")
        return new _DERUTF8String(param[key]);
      if (key == "numstr")
        return new _DERNumericString(param[key]);
      if (key == "prnstr")
        return new _DERPrintableString(param[key]);
      if (key == "telstr")
        return new _DERTeletexString(param[key]);
      if (key == "ia5str")
        return new _DERIA5String(param[key]);
      if (key == "utctime")
        return new _DERUTCTime(param[key]);
      if (key == "gentime")
        return new _DERGeneralizedTime(param[key]);
      if (key == "seq") {
        var paramList = param[key];
        var a2 = [];
        for (var i2 = 0; i2 < paramList.length; i2++) {
          var asn1Obj = _newObject(paramList[i2]);
          a2.push(asn1Obj);
        }
        return new _DERSequence({ "array": a2 });
      }
      if (key == "set") {
        var paramList = param[key];
        var a2 = [];
        for (var i2 = 0; i2 < paramList.length; i2++) {
          var asn1Obj = _newObject(paramList[i2]);
          a2.push(asn1Obj);
        }
        return new _DERSet({ "array": a2 });
      }
      if (key == "tag") {
        var tagParam = param[key];
        if (Object.prototype.toString.call(tagParam) === "[object Array]" && tagParam.length == 3) {
          var obj = _newObject(tagParam[2]);
          return new _DERTaggedObject({
            tag: tagParam[0],
            explicit: tagParam[1],
            obj
          });
        } else {
          var newParam = {};
          if (tagParam.explicit !== void 0)
            newParam.explicit = tagParam.explicit;
          if (tagParam.tag !== void 0)
            newParam.tag = tagParam.tag;
          if (tagParam.obj === void 0)
            throw "obj shall be specified for 'tag'.";
          newParam.obj = _newObject(tagParam.obj);
          return new _DERTaggedObject(newParam);
        }
      }
    };
    this.jsonToASN1HEX = function(param) {
      var asn1Obj = this.newObject(param);
      return asn1Obj.getEncodedHex();
    };
  }();
  KJUR.asn1.ASN1Util.oidHexToInt = function(hex) {
    var s2 = "";
    var i01 = parseInt(hex.substr(0, 2), 16);
    var i0 = Math.floor(i01 / 40);
    var i1 = i01 % 40;
    var s2 = i0 + "." + i1;
    var binbuf = "";
    for (var i2 = 2; i2 < hex.length; i2 += 2) {
      var value = parseInt(hex.substr(i2, 2), 16);
      var bin = ("00000000" + value.toString(2)).slice(-8);
      binbuf = binbuf + bin.substr(1, 7);
      if (bin.substr(0, 1) == "0") {
        var bi = new BigInteger(binbuf, 2);
        s2 = s2 + "." + bi.toString(10);
        binbuf = "";
      }
    }
    return s2;
  };
  KJUR.asn1.ASN1Util.oidIntToHex = function(oidString) {
    var itox = function(i3) {
      var h3 = i3.toString(16);
      if (h3.length == 1)
        h3 = "0" + h3;
      return h3;
    };
    var roidtox = function(roid) {
      var h3 = "";
      var bi = new BigInteger(roid, 10);
      var b2 = bi.toString(2);
      var padLen = 7 - b2.length % 7;
      if (padLen == 7)
        padLen = 0;
      var bPad = "";
      for (var i3 = 0; i3 < padLen; i3++)
        bPad += "0";
      b2 = bPad + b2;
      for (var i3 = 0; i3 < b2.length - 1; i3 += 7) {
        var b8 = b2.substr(i3, 7);
        if (i3 != b2.length - 7)
          b8 = "1" + b8;
        h3 += itox(parseInt(b8, 2));
      }
      return h3;
    };
    if (!oidString.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + oidString;
    }
    var h2 = "";
    var a2 = oidString.split(".");
    var i0 = parseInt(a2[0]) * 40 + parseInt(a2[1]);
    h2 += itox(i0);
    a2.splice(0, 2);
    for (var i2 = 0; i2 < a2.length; i2++) {
      h2 += roidtox(a2[i2]);
    }
    return h2;
  };
  KJUR.asn1.ASN1Object = function() {
    var hV = "";
    this.getLengthHexFromValue = function() {
      if (typeof this.hV == "undefined" || this.hV == null) {
        throw "this.hV is null or undefined.";
      }
      if (this.hV.length % 2 == 1) {
        throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
      }
      var n2 = this.hV.length / 2;
      var hN = n2.toString(16);
      if (hN.length % 2 == 1) {
        hN = "0" + hN;
      }
      if (n2 < 128) {
        return hN;
      } else {
        var hNlen = hN.length / 2;
        if (hNlen > 15) {
          throw "ASN.1 length too long to represent by 8x: n = " + n2.toString(16);
        }
        var head = 128 + hNlen;
        return head.toString(16) + hN;
      }
    };
    this.getEncodedHex = function() {
      if (this.hTLV == null || this.isModified) {
        this.hV = this.getFreshValueHex();
        this.hL = this.getLengthHexFromValue();
        this.hTLV = this.hT + this.hL + this.hV;
        this.isModified = false;
      }
      return this.hTLV;
    };
    this.getValueHex = function() {
      this.getEncodedHex();
      return this.hV;
    };
    this.getFreshValueHex = function() {
      return "";
    };
  };
  KJUR.asn1.DERAbstractString = function(params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    this.getString = function() {
      return this.s;
    };
    this.setString = function(newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(this.s);
    };
    this.setStringHex = function(newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params == "string") {
        this.setString(params);
      } else if (typeof params["str"] != "undefined") {
        this.setString(params["str"]);
      } else if (typeof params["hex"] != "undefined") {
        this.setStringHex(params["hex"]);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERAbstractTime = function(params) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
    this.localDateToUTC = function(d2) {
      utc = d2.getTime() + d2.getTimezoneOffset() * 6e4;
      var utcDate = new Date(utc);
      return utcDate;
    };
    this.formatDate = function(dateObject, type, withMillis) {
      var pad = this.zeroPadding;
      var d2 = this.localDateToUTC(dateObject);
      var year = String(d2.getFullYear());
      if (type == "utc")
        year = year.substr(2, 2);
      var month = pad(String(d2.getMonth() + 1), 2);
      var day = pad(String(d2.getDate()), 2);
      var hour = pad(String(d2.getHours()), 2);
      var min = pad(String(d2.getMinutes()), 2);
      var sec = pad(String(d2.getSeconds()), 2);
      var s2 = year + month + day + hour + min + sec;
      if (withMillis === true) {
        var millis = d2.getMilliseconds();
        if (millis != 0) {
          var sMillis = pad(String(millis), 3);
          sMillis = sMillis.replace(/[0]+$/, "");
          s2 = s2 + "." + sMillis;
        }
      }
      return s2 + "Z";
    };
    this.zeroPadding = function(s2, len) {
      if (s2.length >= len)
        return s2;
      return new Array(len - s2.length + 1).join("0") + s2;
    };
    this.getString = function() {
      return this.s;
    };
    this.setString = function(newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(newS);
    };
    this.setByDateValue = function(year, month, day, hour, min, sec) {
      var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
      this.setByDate(dateObject);
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERAbstractStructured = function(params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    this.setByASN1ObjectArray = function(asn1ObjectArray) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array = asn1ObjectArray;
    };
    this.appendASN1Object = function(asn1Object) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array.push(asn1Object);
    };
    this.asn1Array = new Array();
    if (typeof params != "undefined") {
      if (typeof params["array"] != "undefined") {
        this.asn1Array = params["array"];
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERBoolean = function() {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff";
  };
  YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERInteger = function(params) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";
    this.setByBigInteger = function(bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };
    this.setByInteger = function(intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };
    this.setValueHex = function(newHexString) {
      this.hV = newHexString;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params["bigint"] != "undefined") {
        this.setByBigInteger(params["bigint"]);
      } else if (typeof params["int"] != "undefined") {
        this.setByInteger(params["int"]);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params["hex"] != "undefined") {
        this.setValueHex(params["hex"]);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERBitString = function(params) {
    if (params !== void 0 && typeof params.obj !== "undefined") {
      var o2 = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = "00" + o2.getEncodedHex();
    }
    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";
    this.setHexValueIncludingUnusedBits = function(newHexStringIncludingUnusedBits) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = newHexStringIncludingUnusedBits;
    };
    this.setUnusedBitsAndHexValue = function(unusedBits, hValue) {
      if (unusedBits < 0 || 7 < unusedBits) {
        throw "unused bits shall be from 0 to 7: u = " + unusedBits;
      }
      var hUnusedBits = "0" + unusedBits;
      this.hTLV = null;
      this.isModified = true;
      this.hV = hUnusedBits + hValue;
    };
    this.setByBinaryString = function(binaryString) {
      binaryString = binaryString.replace(/0+$/, "");
      var unusedBits = 8 - binaryString.length % 8;
      if (unusedBits == 8)
        unusedBits = 0;
      for (var i2 = 0; i2 <= unusedBits; i2++) {
        binaryString += "0";
      }
      var h2 = "";
      for (var i2 = 0; i2 < binaryString.length - 1; i2 += 8) {
        var b2 = binaryString.substr(i2, 8);
        var x2 = parseInt(b2, 2).toString(16);
        if (x2.length == 1)
          x2 = "0" + x2;
        h2 += x2;
      }
      this.hTLV = null;
      this.isModified = true;
      this.hV = "0" + unusedBits + h2;
    };
    this.setByBooleanArray = function(booleanArray) {
      var s2 = "";
      for (var i2 = 0; i2 < booleanArray.length; i2++) {
        if (booleanArray[i2] == true) {
          s2 += "1";
        } else {
          s2 += "0";
        }
      }
      this.setByBinaryString(s2);
    };
    this.newFalseArray = function(nLength) {
      var a2 = new Array(nLength);
      for (var i2 = 0; i2 < nLength; i2++) {
        a2[i2] = false;
      }
      return a2;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
        this.setHexValueIncludingUnusedBits(params);
      } else if (typeof params["hex"] != "undefined") {
        this.setHexValueIncludingUnusedBits(params["hex"]);
      } else if (typeof params["bin"] != "undefined") {
        this.setByBinaryString(params["bin"]);
      } else if (typeof params["array"] != "undefined") {
        this.setByBooleanArray(params["array"]);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
  KJUR.asn1.DEROctetString = function(params) {
    if (params !== void 0 && typeof params.obj !== "undefined") {
      var o2 = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = o2.getEncodedHex();
    }
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
    this.hT = "04";
  };
  YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERNull = function() {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500";
  };
  YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERObjectIdentifier = function(params) {
    var itox = function(i2) {
      var h2 = i2.toString(16);
      if (h2.length == 1)
        h2 = "0" + h2;
      return h2;
    };
    var roidtox = function(roid) {
      var h2 = "";
      var bi = new BigInteger(roid, 10);
      var b2 = bi.toString(2);
      var padLen = 7 - b2.length % 7;
      if (padLen == 7)
        padLen = 0;
      var bPad = "";
      for (var i2 = 0; i2 < padLen; i2++)
        bPad += "0";
      b2 = bPad + b2;
      for (var i2 = 0; i2 < b2.length - 1; i2 += 7) {
        var b8 = b2.substr(i2, 7);
        if (i2 != b2.length - 7)
          b8 = "1" + b8;
        h2 += itox(parseInt(b8, 2));
      }
      return h2;
    };
    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";
    this.setValueHex = function(newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };
    this.setValueOidString = function(oidString) {
      if (!oidString.match(/^[0-9.]+$/)) {
        throw "malformed oid string: " + oidString;
      }
      var h2 = "";
      var a2 = oidString.split(".");
      var i0 = parseInt(a2[0]) * 40 + parseInt(a2[1]);
      h2 += itox(i0);
      a2.splice(0, 2);
      for (var i2 = 0; i2 < a2.length; i2++) {
        h2 += roidtox(a2[i2]);
      }
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = h2;
    };
    this.setValueName = function(oidName) {
      var oid = KJUR.asn1.x509.OID.name2oid(oidName);
      if (oid !== "") {
        this.setValueOidString(oid);
      } else {
        throw "DERObjectIdentifier oidName undefined: " + oidName;
      }
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (params !== void 0) {
      if (typeof params === "string") {
        if (params.match(/^[0-2].[0-9.]+$/)) {
          this.setValueOidString(params);
        } else {
          this.setValueName(params);
        }
      } else if (params.oid !== void 0) {
        this.setValueOidString(params.oid);
      } else if (params.hex !== void 0) {
        this.setValueHex(params.hex);
      } else if (params.name !== void 0) {
        this.setValueName(params.name);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
  KJUR.asn1.DEREnumerated = function(params) {
    KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
    this.hT = "0a";
    this.setByBigInteger = function(bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };
    this.setByInteger = function(intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };
    this.setValueHex = function(newHexString) {
      this.hV = newHexString;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params["int"] != "undefined") {
        this.setByInteger(params["int"]);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params["hex"] != "undefined") {
        this.setValueHex(params["hex"]);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERUTF8String = function(params) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
    this.hT = "0c";
  };
  YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERNumericString = function(params) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
    this.hT = "12";
  };
  YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERPrintableString = function(params) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
    this.hT = "13";
  };
  YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERTeletexString = function(params) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
    this.hT = "14";
  };
  YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERIA5String = function(params) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
    this.hT = "16";
  };
  YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERUTCTime = function(params) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
    this.hT = "17";
    this.setByDate = function(dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, "utc");
      this.hV = stohex(this.s);
    };
    this.getFreshValueHex = function() {
      if (typeof this.date == "undefined" && typeof this.s == "undefined") {
        this.date = /* @__PURE__ */ new Date();
        this.s = this.formatDate(this.date, "utc");
        this.hV = stohex(this.s);
      }
      return this.hV;
    };
    if (params !== void 0) {
      if (params.str !== void 0) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
        this.setString(params);
      } else if (params.hex !== void 0) {
        this.setStringHex(params.hex);
      } else if (params.date !== void 0) {
        this.setByDate(params.date);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
  KJUR.asn1.DERGeneralizedTime = function(params) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
    this.hT = "18";
    this.withMillis = false;
    this.setByDate = function(dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, "gen", this.withMillis);
      this.hV = stohex(this.s);
    };
    this.getFreshValueHex = function() {
      if (this.date === void 0 && this.s === void 0) {
        this.date = /* @__PURE__ */ new Date();
        this.s = this.formatDate(this.date, "gen", this.withMillis);
        this.hV = stohex(this.s);
      }
      return this.hV;
    };
    if (params !== void 0) {
      if (params.str !== void 0) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
        this.setString(params);
      } else if (params.hex !== void 0) {
        this.setStringHex(params.hex);
      } else if (params.date !== void 0) {
        this.setByDate(params.date);
      }
      if (params.millis === true) {
        this.withMillis = true;
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
  KJUR.asn1.DERSequence = function(params) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
    this.hT = "30";
    this.getFreshValueHex = function() {
      var h2 = "";
      for (var i2 = 0; i2 < this.asn1Array.length; i2++) {
        var asn1Obj = this.asn1Array[i2];
        h2 += asn1Obj.getEncodedHex();
      }
      this.hV = h2;
      return this.hV;
    };
  };
  YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
  KJUR.asn1.DERSet = function(params) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, params);
    this.hT = "31";
    this.sortFlag = true;
    this.getFreshValueHex = function() {
      var a2 = new Array();
      for (var i2 = 0; i2 < this.asn1Array.length; i2++) {
        var asn1Obj = this.asn1Array[i2];
        a2.push(asn1Obj.getEncodedHex());
      }
      if (this.sortFlag == true)
        a2.sort();
      this.hV = a2.join("");
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params.sortflag != "undefined" && params.sortflag == false)
        this.sortFlag = false;
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
  KJUR.asn1.DERTaggedObject = function(params) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = "";
    this.isExplicit = true;
    this.asn1Object = null;
    this.setASN1Object = function(isExplicitFlag, tagNoHex, asn1Object) {
      this.hT = tagNoHex;
      this.isExplicit = isExplicitFlag;
      this.asn1Object = asn1Object;
      if (this.isExplicit) {
        this.hV = this.asn1Object.getEncodedHex();
        this.hTLV = null;
        this.isModified = true;
      } else {
        this.hV = null;
        this.hTLV = asn1Object.getEncodedHex();
        this.hTLV = this.hTLV.replace(/^../, tagNoHex);
        this.isModified = false;
      }
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params["tag"] != "undefined") {
        this.hT = params["tag"];
      }
      if (typeof params["explicit"] != "undefined") {
        this.isExplicit = params["explicit"];
      }
      if (typeof params["obj"] != "undefined") {
        this.asn1Object = params["obj"];
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
  var __extends = globalThis && globalThis.__extends || function() {
    var extendStatics = function(d2, b2) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
        d3.__proto__ = b3;
      } || function(d3, b3) {
        for (var p2 in b3)
          if (Object.prototype.hasOwnProperty.call(b3, p2))
            d3[p2] = b3[p2];
      };
      return extendStatics(d2, b2);
    };
    return function(d2, b2) {
      if (typeof b2 !== "function" && b2 !== null)
        throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
      extendStatics(d2, b2);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
    };
  }();
  var JSEncryptRSAKey = (
    /** @class */
    function(_super) {
      __extends(JSEncryptRSAKey2, _super);
      function JSEncryptRSAKey2(key) {
        var _this = _super.call(this) || this;
        if (key) {
          if (typeof key === "string") {
            _this.parseKey(key);
          } else if (JSEncryptRSAKey2.hasPrivateKeyProperty(key) || JSEncryptRSAKey2.hasPublicKeyProperty(key)) {
            _this.parsePropertiesFrom(key);
          }
        }
        return _this;
      }
      JSEncryptRSAKey2.prototype.parseKey = function(pem) {
        try {
          var modulus = 0;
          var public_exponent = 0;
          var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
          var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
          var asn1 = ASN1.decode(der);
          if (asn1.sub.length === 3) {
            asn1 = asn1.sub[2].sub[0];
          }
          if (asn1.sub.length === 9) {
            modulus = asn1.sub[1].getHexStringValue();
            this.n = parseBigInt(modulus, 16);
            public_exponent = asn1.sub[2].getHexStringValue();
            this.e = parseInt(public_exponent, 16);
            var private_exponent = asn1.sub[3].getHexStringValue();
            this.d = parseBigInt(private_exponent, 16);
            var prime1 = asn1.sub[4].getHexStringValue();
            this.p = parseBigInt(prime1, 16);
            var prime2 = asn1.sub[5].getHexStringValue();
            this.q = parseBigInt(prime2, 16);
            var exponent1 = asn1.sub[6].getHexStringValue();
            this.dmp1 = parseBigInt(exponent1, 16);
            var exponent2 = asn1.sub[7].getHexStringValue();
            this.dmq1 = parseBigInt(exponent2, 16);
            var coefficient = asn1.sub[8].getHexStringValue();
            this.coeff = parseBigInt(coefficient, 16);
          } else if (asn1.sub.length === 2) {
            if (asn1.sub[0].sub) {
              var bit_string = asn1.sub[1];
              var sequence = bit_string.sub[0];
              modulus = sequence.sub[0].getHexStringValue();
              this.n = parseBigInt(modulus, 16);
              public_exponent = sequence.sub[1].getHexStringValue();
              this.e = parseInt(public_exponent, 16);
            } else {
              modulus = asn1.sub[0].getHexStringValue();
              this.n = parseBigInt(modulus, 16);
              public_exponent = asn1.sub[1].getHexStringValue();
              this.e = parseInt(public_exponent, 16);
            }
          } else {
            return false;
          }
          return true;
        } catch (ex) {
          return false;
        }
      };
      JSEncryptRSAKey2.prototype.getPrivateBaseKey = function() {
        var options = {
          array: [
            new KJUR.asn1.DERInteger({ int: 0 }),
            new KJUR.asn1.DERInteger({ bigint: this.n }),
            new KJUR.asn1.DERInteger({ int: this.e }),
            new KJUR.asn1.DERInteger({ bigint: this.d }),
            new KJUR.asn1.DERInteger({ bigint: this.p }),
            new KJUR.asn1.DERInteger({ bigint: this.q }),
            new KJUR.asn1.DERInteger({ bigint: this.dmp1 }),
            new KJUR.asn1.DERInteger({ bigint: this.dmq1 }),
            new KJUR.asn1.DERInteger({ bigint: this.coeff })
          ]
        };
        var seq = new KJUR.asn1.DERSequence(options);
        return seq.getEncodedHex();
      };
      JSEncryptRSAKey2.prototype.getPrivateBaseKeyB64 = function() {
        return hex2b64(this.getPrivateBaseKey());
      };
      JSEncryptRSAKey2.prototype.getPublicBaseKey = function() {
        var first_sequence = new KJUR.asn1.DERSequence({
          array: [
            new KJUR.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
            new KJUR.asn1.DERNull()
          ]
        });
        var second_sequence = new KJUR.asn1.DERSequence({
          array: [
            new KJUR.asn1.DERInteger({ bigint: this.n }),
            new KJUR.asn1.DERInteger({ int: this.e })
          ]
        });
        var bit_string = new KJUR.asn1.DERBitString({
          hex: "00" + second_sequence.getEncodedHex()
        });
        var seq = new KJUR.asn1.DERSequence({
          array: [first_sequence, bit_string]
        });
        return seq.getEncodedHex();
      };
      JSEncryptRSAKey2.prototype.getPublicBaseKeyB64 = function() {
        return hex2b64(this.getPublicBaseKey());
      };
      JSEncryptRSAKey2.wordwrap = function(str, width) {
        width = width || 64;
        if (!str) {
          return str;
        }
        var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
        return str.match(RegExp(regex, "g")).join("\n");
      };
      JSEncryptRSAKey2.prototype.getPrivateKey = function() {
        var key = "-----BEGIN RSA PRIVATE KEY-----\n";
        key += JSEncryptRSAKey2.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
        key += "-----END RSA PRIVATE KEY-----";
        return key;
      };
      JSEncryptRSAKey2.prototype.getPublicKey = function() {
        var key = "-----BEGIN PUBLIC KEY-----\n";
        key += JSEncryptRSAKey2.wordwrap(this.getPublicBaseKeyB64()) + "\n";
        key += "-----END PUBLIC KEY-----";
        return key;
      };
      JSEncryptRSAKey2.hasPublicKeyProperty = function(obj) {
        obj = obj || {};
        return obj.hasOwnProperty("n") && obj.hasOwnProperty("e");
      };
      JSEncryptRSAKey2.hasPrivateKeyProperty = function(obj) {
        obj = obj || {};
        return obj.hasOwnProperty("n") && obj.hasOwnProperty("e") && obj.hasOwnProperty("d") && obj.hasOwnProperty("p") && obj.hasOwnProperty("q") && obj.hasOwnProperty("dmp1") && obj.hasOwnProperty("dmq1") && obj.hasOwnProperty("coeff");
      };
      JSEncryptRSAKey2.prototype.parsePropertiesFrom = function(obj) {
        this.n = obj.n;
        this.e = obj.e;
        if (obj.hasOwnProperty("d")) {
          this.d = obj.d;
          this.p = obj.p;
          this.q = obj.q;
          this.dmp1 = obj.dmp1;
          this.dmq1 = obj.dmq1;
          this.coeff = obj.coeff;
        }
      };
      return JSEncryptRSAKey2;
    }(RSAKey)
  );
  var _a;
  var version = typeof process !== "undefined" ? (_a = process.env) === null || _a === void 0 ? void 0 : _a.npm_package_version : void 0;
  var JSEncrypt = (
    /** @class */
    function() {
      function JSEncrypt2(options) {
        if (options === void 0) {
          options = {};
        }
        options = options || {};
        this.default_key_size = options.default_key_size ? parseInt(options.default_key_size, 10) : 1024;
        this.default_public_exponent = options.default_public_exponent || "010001";
        this.log = options.log || false;
        this.key = null;
      }
      JSEncrypt2.prototype.setKey = function(key) {
        if (this.log && this.key) {
          formatAppLog("warn", "at node_modules/jsencrypt/lib/JSEncrypt.js:37", "A key was already set, overriding existing.");
        }
        this.key = new JSEncryptRSAKey(key);
      };
      JSEncrypt2.prototype.setPrivateKey = function(privkey) {
        this.setKey(privkey);
      };
      JSEncrypt2.prototype.setPublicKey = function(pubkey) {
        this.setKey(pubkey);
      };
      JSEncrypt2.prototype.decrypt = function(str) {
        try {
          return this.getKey().decrypt(b64tohex(str));
        } catch (ex) {
          return false;
        }
      };
      JSEncrypt2.prototype.encrypt = function(str) {
        try {
          return hex2b64(this.getKey().encrypt(str));
        } catch (ex) {
          return false;
        }
      };
      JSEncrypt2.prototype.sign = function(str, digestMethod, digestName) {
        try {
          return hex2b64(this.getKey().sign(str, digestMethod, digestName));
        } catch (ex) {
          return false;
        }
      };
      JSEncrypt2.prototype.verify = function(str, signature, digestMethod) {
        try {
          return this.getKey().verify(str, b64tohex(signature), digestMethod);
        } catch (ex) {
          return false;
        }
      };
      JSEncrypt2.prototype.getKey = function(cb) {
        if (!this.key) {
          this.key = new JSEncryptRSAKey();
          if (cb && {}.toString.call(cb) === "[object Function]") {
            this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
            return;
          }
          this.key.generate(this.default_key_size, this.default_public_exponent);
        }
        return this.key;
      };
      JSEncrypt2.prototype.getPrivateKey = function() {
        return this.getKey().getPrivateKey();
      };
      JSEncrypt2.prototype.getPrivateKeyB64 = function() {
        return this.getKey().getPrivateBaseKeyB64();
      };
      JSEncrypt2.prototype.getPublicKey = function() {
        return this.getKey().getPublicKey();
      };
      JSEncrypt2.prototype.getPublicKeyB64 = function() {
        return this.getKey().getPublicBaseKeyB64();
      };
      JSEncrypt2.version = version;
      return JSEncrypt2;
    }()
  );
  const site = {
    version: "1.0",
    signMethod: "sha256",
    format: "json",
    secret: "563fc0e9-44b4-475e-90eb-d0b72414d7e1",
    ssoTicket: "a"
  };
  const ucPublic = "oAGtloqrG2FVry1O";
  function getAESKey() {
    let key = [];
    for (let i2 = 0; i2 < 16; i2++) {
      let num = Math.floor(Math.random() * 26);
      let charStr = String.fromCharCode(97 + num);
      key.push(charStr.toUpperCase());
    }
    let result = key.join("");
    return result;
  }
  const aesPub = getAESKey();
  function decodeAES(value, aesPub2) {
    var aeskey = CryptoJS.enc.Utf8.parse(aesPub2);
    var decrypted = CryptoJS.AES.decrypt(value, aeskey, {
      iv: CryptoJS.enc.Utf8.parse("1234567812345678"),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return CryptoJS.enc.Utf8.stringify(decrypted).trim();
  }
  function decodeUCResponse(data) {
    if (data) {
      if (typeof data == "string") {
        const result = JSON.parse(decodeAES(data, ucPublic));
        return result;
      } else {
        return data;
      }
    }
    return data;
  }
  function addSign(params) {
    let source = "";
    Object.keys(params).sort().forEach((key) => {
      source += `${key}=${params[key]}, `;
    });
    source = source.slice(0, -2);
    return CryptoJS.SHA256(`{${source}}`).toString(CryptoJS.enc.Hex);
  }
  function encryptRSA(value) {
    let encryptObj = new JSEncrypt();
    encryptObj.setPublicKey(uni.getStorageSync("GAMMA-UC-PUBLICKEY"));
    return encryptObj.encrypt(value);
  }
  function encryptAES(value, aesPub2) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(aesPub2), {
      iv: CryptoJS.enc.Utf8.parse("1234567812345678"),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).ciphertext);
  }
  function processRequest(params, cfg) {
    const nowtime = /* @__PURE__ */ new Date();
    const timestamp = nowtime.getTime();
    let result = {};
    let requestData = null;
    let encodeKey = null;
    if (cfg.req !== false) {
      requestData = encryptAES(JSON.stringify(Object.assign({}, params)), aesPub);
      encodeKey = encryptRSA(aesPub);
      Object.assign(result, site, {
        requestId: timestamp,
        timestamp: dayjs(nowtime).locale("en-us").format("YYYYMMddHHmmss"),
        requestData,
        encodeKey,
        encodeKeyEncryptMethod: "RSA",
        requestDataEncryptMethod: "AES",
        platform: "H5"
      });
      const sign = addSign(result);
      result.sign = sign;
    } else {
      result = Object.assign(site, params, {
        requestId: timestamp,
        timestamp: dayjs(nowtime).locale("en-us").format("YYYYMMddHHmmss")
      });
    }
    return result;
  }
  function processResponse(data) {
    if (data) {
      if (typeof data == "string") {
        const result = JSON.parse(decodeAES(data, aesPub));
        return result;
      } else {
        return data;
      }
    }
    return data;
  }
  const responseHandle = (res, isMessage) => {
    var _a2;
    if (`${res.code}` === "0000" || `${res.code}` === "0" || `${res.responseCode}` === "000000") {
      isMessage && uni.showToast({
        title: res.message
      });
      if (res.encode) {
        return decodeUCResponse(res.data);
      }
      if (res.responseData) {
        if (res.responseEncode) {
          return processResponse(res.responseData);
        }
        return res.responseData;
      }
      return res.data;
    }
    if (`${res.respHeader}` && `${(_a2 = res.respHeader) == null ? void 0 : _a2.respCode}` === "200") {
      isMessage !== false && uni.showToast({
        title: res.respHeader.respMsg
      });
      if (res.encode == true) {
        return decodeUCResponse(res.data);
      }
      return res.data;
    }
    if (`${res.rtCode}` === "E000000") {
      return res.resArr;
    } else if (`${res.code}` === "9999") {
      const message = res.message || res.msg || res.retMessage || res.responseMessage || JSON.stringify(res);
      isMessage !== false && uni.showToast({
        title: message,
        icon: "error",
        duration: 2 * 1e3
      });
      return Promise.reject(message);
    } else if (`${res.code}` === "9900" || `${res.code}` === "-5" || `${res.code}` === "000002" || `${res.code}` === "000003" || `${res.code}` === "000004") {
      backToUc();
      return;
    } else {
      const message = res.message || res.msg || res.retMessage || JSON.stringify(res);
      uni.showToast({
        title: message,
        icon: "error",
        duration: 3 * 1e3
      });
      return Promise.reject(message);
    }
  };
  const rejectHandle = (error) => {
    if (error.response) {
      if (error.response.status && error.response.status === 504 || error.message === "Network Error" || error.message === "Request failed with status code 504" || error.message === "timeout of 15000ms exceeded") {
        error.message = "NetworkError";
      } else if (typeof error === "string" && error.indexOf("Network Error") != -1) {
        error = "SystemError";
      } else if (error.response.status && error.response.status === 500) {
        error.message = error.response.data && error.response.data.message || "public.UnknownError";
      }
      uni.showToast({
        title: error.message || error.response.message || error.response.data.message,
        icon: "error",
        duration: 3 * 1e3
      });
    } else if (error.request) {
      uni.showToast({
        title: "NetworkError",
        icon: "error",
        duration: 3 * 1e3
      });
    } else {
      uni.showToast({
        title: error.message || "public.SystemError",
        icon: "error",
        duration: 3 * 1e3
      });
    }
    return Promise.reject(error);
  };
  var shams = function hasSymbols2() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (sym in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = shams;
  var hasSymbols$1 = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
  var test = {
    foo: {}
  };
  var $Object = Object;
  var hasProto$1 = function hasProto2() {
    return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
  };
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var slice = Array.prototype.slice;
  var toStr$1 = Object.prototype.toString;
  var funcType = "[object Function]";
  var implementation$1 = function bind2(that) {
    var target = this;
    if (typeof target !== "function" || toStr$1.call(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);
    var bound;
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(
          this,
          args.concat(slice.call(arguments))
        );
        if (Object(result) === result) {
          return result;
        }
        return this;
      } else {
        return target.apply(
          that,
          args.concat(slice.call(arguments))
        );
      }
    };
    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i2 = 0; i2 < boundLength; i2++) {
      boundArgs.push("$" + i2);
    }
    bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {
      };
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound;
  };
  var implementation = implementation$1;
  var functionBind = Function.prototype.bind || implementation;
  var bind$1 = functionBind;
  var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);
  var undefined$1;
  var $SyntaxError = SyntaxError;
  var $Function = Function;
  var $TypeError$1 = TypeError;
  var getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {
    }
  };
  var $gOPD = Object.getOwnPropertyDescriptor;
  if ($gOPD) {
    try {
      $gOPD({}, "");
    } catch (e) {
      $gOPD = null;
    }
  }
  var throwTypeError = function() {
    throw new $TypeError$1();
  };
  var ThrowTypeError = $gOPD ? function() {
    try {
      arguments.callee;
      return throwTypeError;
    } catch (calleeThrows) {
      try {
        return $gOPD(arguments, "callee").get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  }() : throwTypeError;
  var hasSymbols = hasSymbols$1();
  var hasProto = hasProto$1();
  var getProto = Object.getPrototypeOf || (hasProto ? function(x2) {
    return x2.__proto__;
  } : null);
  var needsEval = {};
  var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined$1 : getProto(Uint8Array);
  var INTRINSICS = {
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
    "%AsyncFromSyncIteratorPrototype%": undefined$1,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
    "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Error,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": EvalError,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
    "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
    "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
    "%RangeError%": RangeError,
    "%ReferenceError%": ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined$1,
    "%Symbol%": hasSymbols ? Symbol : undefined$1,
    "%SyntaxError%": $SyntaxError,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError$1,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
    "%URIError%": URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
  };
  if (getProto) {
    try {
      null.error;
    } catch (e) {
      var errorProto = getProto(getProto(e));
      INTRINSICS["%Error.prototype%"] = errorProto;
    }
  }
  var doEval = function doEval2(name) {
    var value;
    if (name === "%AsyncFunction%") {
      value = getEvalledConstructor("async function () {}");
    } else if (name === "%GeneratorFunction%") {
      value = getEvalledConstructor("function* () {}");
    } else if (name === "%AsyncGeneratorFunction%") {
      value = getEvalledConstructor("async function* () {}");
    } else if (name === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) {
        value = fn.prototype;
      }
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen && getProto) {
        value = getProto(gen.prototype);
      }
    }
    INTRINSICS[name] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  };
  var bind = functionBind;
  var hasOwn$1 = src;
  var $concat$1 = bind.call(Function.call, Array.prototype.concat);
  var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
  var $replace$1 = bind.call(Function.call, String.prototype.replace);
  var $strSlice = bind.call(Function.call, String.prototype.slice);
  var $exec = bind.call(Function.call, RegExp.prototype.exec);
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    } else if (last === "%" && first !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    }
    var result = [];
    $replace$1(string, rePropName, function(match, number, quote2, subString) {
      result[result.length] = quote2 ? $replace$1(subString, reEscapeChar, "$1") : number || match;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn$1(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) {
        value = doEval(intrinsicName);
      }
      if (typeof value === "undefined" && !allowMissing) {
        throw new $TypeError$1("intrinsic " + name + " exists, but is not available. Please file an issue!");
      }
      return {
        alias,
        name: intrinsicName,
        value
      };
    }
    throw new $SyntaxError("intrinsic " + name + " does not exist!");
  };
  var getIntrinsic = function GetIntrinsic2(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) {
      throw new $TypeError$1("intrinsic name must be a non-empty string");
    }
    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
      throw new $TypeError$1('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name) === null) {
      throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat$1([0, 1], alias));
    }
    for (var i2 = 1, isOwn = true; i2 < parts.length; i2 += 1) {
      var part = parts[i2];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
        throw new $SyntaxError("property names with quotes must have matching quotes");
      }
      if (part === "constructor" || !isOwn) {
        skipFurtherCaching = true;
      }
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
        value = INTRINSICS[intrinsicRealName];
      } else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) {
            throw new $TypeError$1("base intrinsic for " + name + " exists, but the property is not available.");
          }
          return void 0;
        }
        if ($gOPD && i2 + 1 >= parts.length) {
          var desc = $gOPD(value, part);
          isOwn = !!desc;
          if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
            value = desc.get;
          } else {
            value = value[part];
          }
        } else {
          isOwn = hasOwn$1(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) {
          INTRINSICS[intrinsicRealName] = value;
        }
      }
    }
    return value;
  };
  var callBindExports = {};
  var callBind$1 = {
    get exports() {
      return callBindExports;
    },
    set exports(v2) {
      callBindExports = v2;
    }
  };
  (function(module) {
    var bind2 = functionBind;
    var GetIntrinsic2 = getIntrinsic;
    var $apply = GetIntrinsic2("%Function.prototype.apply%");
    var $call = GetIntrinsic2("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic2("%Reflect.apply%", true) || bind2.call($call, $apply);
    var $gOPD2 = GetIntrinsic2("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic2("%Object.defineProperty%", true);
    var $max = GetIntrinsic2("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module.exports = function callBind2(originalFunction) {
      var func = $reflectApply(bind2, $call, arguments);
      if ($gOPD2 && $defineProperty) {
        var desc = $gOPD2(func, "length");
        if (desc.configurable) {
          $defineProperty(
            func,
            "length",
            { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
          );
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind2, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  })(callBind$1);
  var GetIntrinsic$1 = getIntrinsic;
  var callBind = callBindExports;
  var $indexOf = callBind(GetIntrinsic$1("String.prototype.indexOf"));
  var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic$1(name, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
      return callBind(intrinsic);
    }
    return intrinsic;
  };
  var hasMap = typeof Map === "function" && Map.prototype;
  var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
  var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
  var mapForEach = hasMap && Map.prototype.forEach;
  var hasSet = typeof Set === "function" && Set.prototype;
  var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
  var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
  var setForEach = hasSet && Set.prototype.forEach;
  var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
  var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
  var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
  var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
  var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
  var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
  var booleanValueOf = Boolean.prototype.valueOf;
  var objectToString = Object.prototype.toString;
  var functionToString = Function.prototype.toString;
  var $match = String.prototype.match;
  var $slice = String.prototype.slice;
  var $replace = String.prototype.replace;
  var $toUpperCase = String.prototype.toUpperCase;
  var $toLowerCase = String.prototype.toLowerCase;
  var $test = RegExp.prototype.test;
  var $concat = Array.prototype.concat;
  var $join = Array.prototype.join;
  var $arrSlice = Array.prototype.slice;
  var $floor = Math.floor;
  var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
  var gOPS = Object.getOwnPropertySymbols;
  var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
  var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
  var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
    return O.__proto__;
  } : null);
  function addNumericSeparator(num, str) {
    if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
      return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === "number") {
      var int = num < 0 ? -$floor(-num) : $floor(num);
      if (int !== num) {
        var intStr = String(int);
        var dec = $slice.call(str, intStr.length + 1);
        return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return $replace.call(str, sepRegex, "$&_");
  }
  var utilInspect = require$$0;
  var inspectCustom = utilInspect.custom;
  var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
  var objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};
    if (has$3(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (has$3(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has$3(opts, "customInspect") ? opts.customInspect : true;
    if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    }
    if (has$3(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has$3(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;
    if (typeof obj === "undefined") {
      return "undefined";
    }
    if (obj === null) {
      return "null";
    }
    if (typeof obj === "boolean") {
      return obj ? "true" : "false";
    }
    if (typeof obj === "string") {
      return inspectString(obj, opts);
    }
    if (typeof obj === "number") {
      if (obj === 0) {
        return Infinity / obj > 0 ? "0" : "-0";
      }
      var str = String(obj);
      return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === "bigint") {
      var bigIntStr = String(obj) + "n";
      return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }
    var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
    if (typeof depth === "undefined") {
      depth = 0;
    }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
      return isArray$3(obj) ? "[Array]" : "[Object]";
    }
    var indent = getIndent(opts, depth);
    if (typeof seen === "undefined") {
      seen = [];
    } else if (indexOf(seen, obj) >= 0) {
      return "[Circular]";
    }
    function inspect2(value, from, noIndent) {
      if (from) {
        seen = $arrSlice.call(seen);
        seen.push(from);
      }
      if (noIndent) {
        var newOpts = {
          depth: opts.depth
        };
        if (has$3(opts, "quoteStyle")) {
          newOpts.quoteStyle = opts.quoteStyle;
        }
        return inspect_(value, newOpts, depth + 1, seen);
      }
      return inspect_(value, opts, depth + 1, seen);
    }
    if (typeof obj === "function" && !isRegExp$1(obj)) {
      var name = nameOf(obj);
      var keys = arrObjKeys(obj, inspect2);
      return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
    }
    if (isSymbol(obj)) {
      var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
      return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
      var s2 = "<" + $toLowerCase.call(String(obj.nodeName));
      var attrs = obj.attributes || [];
      for (var i2 = 0; i2 < attrs.length; i2++) {
        s2 += " " + attrs[i2].name + "=" + wrapQuotes(quote(attrs[i2].value), "double", opts);
      }
      s2 += ">";
      if (obj.childNodes && obj.childNodes.length) {
        s2 += "...";
      }
      s2 += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
      return s2;
    }
    if (isArray$3(obj)) {
      if (obj.length === 0) {
        return "[]";
      }
      var xs2 = arrObjKeys(obj, inspect2);
      if (indent && !singleLineValues(xs2)) {
        return "[" + indentedJoin(xs2, indent) + "]";
      }
      return "[ " + $join.call(xs2, ", ") + " ]";
    }
    if (isError(obj)) {
      var parts = arrObjKeys(obj, inspect2);
      if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
        return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect2(obj.cause), parts), ", ") + " }";
      }
      if (parts.length === 0) {
        return "[" + String(obj) + "]";
      }
      return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
    }
    if (typeof obj === "object" && customInspect) {
      if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
        return utilInspect(obj, { depth: maxDepth - depth });
      } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
        return obj.inspect();
      }
    }
    if (isMap(obj)) {
      var mapParts = [];
      if (mapForEach) {
        mapForEach.call(obj, function(value, key) {
          mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
        });
      }
      return collectionOf("Map", mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
      var setParts = [];
      if (setForEach) {
        setForEach.call(obj, function(value) {
          setParts.push(inspect2(value, obj));
        });
      }
      return collectionOf("Set", setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
      return weakCollectionOf("WeakMap");
    }
    if (isWeakSet(obj)) {
      return weakCollectionOf("WeakSet");
    }
    if (isWeakRef(obj)) {
      return weakCollectionOf("WeakRef");
    }
    if (isNumber(obj)) {
      return markBoxed(inspect2(Number(obj)));
    }
    if (isBigInt(obj)) {
      return markBoxed(inspect2(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
      return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
      return markBoxed(inspect2(String(obj)));
    }
    if (!isDate(obj) && !isRegExp$1(obj)) {
      var ys2 = arrObjKeys(obj, inspect2);
      var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
      var protoTag = obj instanceof Object ? "" : "null prototype";
      var stringTag = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
      var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
      var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
      if (ys2.length === 0) {
        return tag + "{}";
      }
      if (indent) {
        return tag + "{" + indentedJoin(ys2, indent) + "}";
      }
      return tag + "{ " + $join.call(ys2, ", ") + " }";
    }
    return String(obj);
  };
  function wrapQuotes(s2, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
    return quoteChar + s2 + quoteChar;
  }
  function quote(s2) {
    return $replace.call(String(s2), /"/g, "&quot;");
  }
  function isArray$3(obj) {
    return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isDate(obj) {
    return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isRegExp$1(obj) {
    return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isError(obj) {
    return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isString(obj) {
    return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isNumber(obj) {
    return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isBoolean(obj) {
    return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }
  function isSymbol(obj) {
    if (hasShammedSymbols) {
      return obj && typeof obj === "object" && obj instanceof Symbol;
    }
    if (typeof obj === "symbol") {
      return true;
    }
    if (!obj || typeof obj !== "object" || !symToString) {
      return false;
    }
    try {
      symToString.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }
  function isBigInt(obj) {
    if (!obj || typeof obj !== "object" || !bigIntValueOf) {
      return false;
    }
    try {
      bigIntValueOf.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }
  var hasOwn = Object.prototype.hasOwnProperty || function(key) {
    return key in this;
  };
  function has$3(obj, key) {
    return hasOwn.call(obj, key);
  }
  function toStr(obj) {
    return objectToString.call(obj);
  }
  function nameOf(f2) {
    if (f2.name) {
      return f2.name;
    }
    var m2 = $match.call(functionToString.call(f2), /^function\s*([\w$]+)/);
    if (m2) {
      return m2[1];
    }
    return null;
  }
  function indexOf(xs2, x2) {
    if (xs2.indexOf) {
      return xs2.indexOf(x2);
    }
    for (var i2 = 0, l2 = xs2.length; i2 < l2; i2++) {
      if (xs2[i2] === x2) {
        return i2;
      }
    }
    return -1;
  }
  function isMap(x2) {
    if (!mapSize || !x2 || typeof x2 !== "object") {
      return false;
    }
    try {
      mapSize.call(x2);
      try {
        setSize.call(x2);
      } catch (s2) {
        return true;
      }
      return x2 instanceof Map;
    } catch (e) {
    }
    return false;
  }
  function isWeakMap(x2) {
    if (!weakMapHas || !x2 || typeof x2 !== "object") {
      return false;
    }
    try {
      weakMapHas.call(x2, weakMapHas);
      try {
        weakSetHas.call(x2, weakSetHas);
      } catch (s2) {
        return true;
      }
      return x2 instanceof WeakMap;
    } catch (e) {
    }
    return false;
  }
  function isWeakRef(x2) {
    if (!weakRefDeref || !x2 || typeof x2 !== "object") {
      return false;
    }
    try {
      weakRefDeref.call(x2);
      return true;
    } catch (e) {
    }
    return false;
  }
  function isSet(x2) {
    if (!setSize || !x2 || typeof x2 !== "object") {
      return false;
    }
    try {
      setSize.call(x2);
      try {
        mapSize.call(x2);
      } catch (m2) {
        return true;
      }
      return x2 instanceof Set;
    } catch (e) {
    }
    return false;
  }
  function isWeakSet(x2) {
    if (!weakSetHas || !x2 || typeof x2 !== "object") {
      return false;
    }
    try {
      weakSetHas.call(x2, weakSetHas);
      try {
        weakMapHas.call(x2, weakMapHas);
      } catch (s2) {
        return true;
      }
      return x2 instanceof WeakSet;
    } catch (e) {
    }
    return false;
  }
  function isElement(x2) {
    if (!x2 || typeof x2 !== "object") {
      return false;
    }
    if (typeof HTMLElement !== "undefined" && x2 instanceof HTMLElement) {
      return true;
    }
    return typeof x2.nodeName === "string" && typeof x2.getAttribute === "function";
  }
  function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
      var remaining = str.length - opts.maxStringLength;
      var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
      return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    var s2 = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s2, "single", opts);
  }
  function lowbyte(c2) {
    var n2 = c2.charCodeAt(0);
    var x2 = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[n2];
    if (x2) {
      return "\\" + x2;
    }
    return "\\x" + (n2 < 16 ? "0" : "") + $toUpperCase.call(n2.toString(16));
  }
  function markBoxed(str) {
    return "Object(" + str + ")";
  }
  function weakCollectionOf(type) {
    return type + " { ? }";
  }
  function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
    return type + " (" + size + ") {" + joinedEntries + "}";
  }
  function singleLineValues(xs2) {
    for (var i2 = 0; i2 < xs2.length; i2++) {
      if (indexOf(xs2[i2], "\n") >= 0) {
        return false;
      }
    }
    return true;
  }
  function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === "	") {
      baseIndent = "	";
    } else if (typeof opts.indent === "number" && opts.indent > 0) {
      baseIndent = $join.call(Array(opts.indent + 1), " ");
    } else {
      return null;
    }
    return {
      base: baseIndent,
      prev: $join.call(Array(depth + 1), baseIndent)
    };
  }
  function indentedJoin(xs2, indent) {
    if (xs2.length === 0) {
      return "";
    }
    var lineJoiner = "\n" + indent.prev + indent.base;
    return lineJoiner + $join.call(xs2, "," + lineJoiner) + "\n" + indent.prev;
  }
  function arrObjKeys(obj, inspect2) {
    var isArr = isArray$3(obj);
    var xs2 = [];
    if (isArr) {
      xs2.length = obj.length;
      for (var i2 = 0; i2 < obj.length; i2++) {
        xs2[i2] = has$3(obj, i2) ? inspect2(obj[i2], obj) : "";
      }
    }
    var syms = typeof gOPS === "function" ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
      symMap = {};
      for (var k2 = 0; k2 < syms.length; k2++) {
        symMap["$" + syms[k2]] = syms[k2];
      }
    }
    for (var key in obj) {
      if (!has$3(obj, key)) {
        continue;
      }
      if (isArr && String(Number(key)) === key && key < obj.length) {
        continue;
      }
      if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
        continue;
      } else if ($test.call(/[^\w$]/, key)) {
        xs2.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
      } else {
        xs2.push(key + ": " + inspect2(obj[key], obj));
      }
    }
    if (typeof gOPS === "function") {
      for (var j2 = 0; j2 < syms.length; j2++) {
        if (isEnumerable.call(obj, syms[j2])) {
          xs2.push("[" + inspect2(syms[j2]) + "]: " + inspect2(obj[syms[j2]], obj));
        }
      }
    }
    return xs2;
  }
  var GetIntrinsic = getIntrinsic;
  var callBound = callBound$1;
  var inspect = objectInspect;
  var $TypeError = GetIntrinsic("%TypeError%");
  var $WeakMap = GetIntrinsic("%WeakMap%", true);
  var $Map = GetIntrinsic("%Map%", true);
  var $weakMapGet = callBound("WeakMap.prototype.get", true);
  var $weakMapSet = callBound("WeakMap.prototype.set", true);
  var $weakMapHas = callBound("WeakMap.prototype.has", true);
  var $mapGet = callBound("Map.prototype.get", true);
  var $mapSet = callBound("Map.prototype.set", true);
  var $mapHas = callBound("Map.prototype.has", true);
  var listGetNode = function(list, key) {
    for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
      if (curr.key === key) {
        prev.next = curr.next;
        curr.next = list.next;
        list.next = curr;
        return curr;
      }
    }
  };
  var listGet = function(objects, key) {
    var node = listGetNode(objects, key);
    return node && node.value;
  };
  var listSet = function(objects, key, value) {
    var node = listGetNode(objects, key);
    if (node) {
      node.value = value;
    } else {
      objects.next = {
        // eslint-disable-line no-param-reassign
        key,
        next: objects.next,
        value
      };
    }
  };
  var listHas = function(objects, key) {
    return !!listGetNode(objects, key);
  };
  var sideChannel = function getSideChannel2() {
    var $wm;
    var $m;
    var $o;
    var channel = {
      assert: function(key) {
        if (!channel.has(key)) {
          throw new $TypeError("Side channel does not contain " + inspect(key));
        }
      },
      get: function(key) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if ($wm) {
            return $weakMapGet($wm, key);
          }
        } else if ($Map) {
          if ($m) {
            return $mapGet($m, key);
          }
        } else {
          if ($o) {
            return listGet($o, key);
          }
        }
      },
      has: function(key) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if ($wm) {
            return $weakMapHas($wm, key);
          }
        } else if ($Map) {
          if ($m) {
            return $mapHas($m, key);
          }
        } else {
          if ($o) {
            return listHas($o, key);
          }
        }
        return false;
      },
      set: function(key, value) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if (!$wm) {
            $wm = new $WeakMap();
          }
          $weakMapSet($wm, key, value);
        } else if ($Map) {
          if (!$m) {
            $m = new $Map();
          }
          $mapSet($m, key, value);
        } else {
          if (!$o) {
            $o = { key: {}, next: null };
          }
          listSet($o, key, value);
        }
      }
    };
    return channel;
  };
  var replace = String.prototype.replace;
  var percentTwenties = /%20/g;
  var Format = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  var formats$3 = {
    "default": Format.RFC3986,
    formatters: {
      RFC1738: function(value) {
        return replace.call(value, percentTwenties, "+");
      },
      RFC3986: function(value) {
        return String(value);
      }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
  };
  var formats$2 = formats$3;
  var has$2 = Object.prototype.hasOwnProperty;
  var isArray$2 = Array.isArray;
  var hexTable = function() {
    var array = [];
    for (var i2 = 0; i2 < 256; ++i2) {
      array.push("%" + ((i2 < 16 ? "0" : "") + i2.toString(16)).toUpperCase());
    }
    return array;
  }();
  var compactQueue = function compactQueue2(queue) {
    while (queue.length > 1) {
      var item = queue.pop();
      var obj = item.obj[item.prop];
      if (isArray$2(obj)) {
        var compacted = [];
        for (var j2 = 0; j2 < obj.length; ++j2) {
          if (typeof obj[j2] !== "undefined") {
            compacted.push(obj[j2]);
          }
        }
        item.obj[item.prop] = compacted;
      }
    }
  };
  var arrayToObject = function arrayToObject2(source, options) {
    var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var i2 = 0; i2 < source.length; ++i2) {
      if (typeof source[i2] !== "undefined") {
        obj[i2] = source[i2];
      }
    }
    return obj;
  };
  var merge = function merge2(target, source, options) {
    if (!source) {
      return target;
    }
    if (typeof source !== "object") {
      if (isArray$2(target)) {
        target.push(source);
      } else if (target && typeof target === "object") {
        if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source)) {
          target[source] = true;
        }
      } else {
        return [target, source];
      }
      return target;
    }
    if (!target || typeof target !== "object") {
      return [target].concat(source);
    }
    var mergeTarget = target;
    if (isArray$2(target) && !isArray$2(source)) {
      mergeTarget = arrayToObject(target, options);
    }
    if (isArray$2(target) && isArray$2(source)) {
      source.forEach(function(item, i2) {
        if (has$2.call(target, i2)) {
          var targetItem = target[i2];
          if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
            target[i2] = merge2(targetItem, item, options);
          } else {
            target.push(item);
          }
        } else {
          target[i2] = item;
        }
      });
      return target;
    }
    return Object.keys(source).reduce(function(acc, key) {
      var value = source[key];
      if (has$2.call(acc, key)) {
        acc[key] = merge2(acc[key], value, options);
      } else {
        acc[key] = value;
      }
      return acc;
    }, mergeTarget);
  };
  var assign$1 = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function(acc, key) {
      acc[key] = source[key];
      return acc;
    }, target);
  };
  var decode = function(str, decoder2, charset) {
    var strWithoutPlus = str.replace(/\+/g, " ");
    if (charset === "iso-8859-1") {
      return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    try {
      return decodeURIComponent(strWithoutPlus);
    } catch (e) {
      return strWithoutPlus;
    }
  };
  var encode = function encode2(str, defaultEncoder, charset, kind, format) {
    if (str.length === 0) {
      return str;
    }
    var string = str;
    if (typeof str === "symbol") {
      string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== "string") {
      string = String(str);
    }
    if (charset === "iso-8859-1") {
      return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
        return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
      });
    }
    var out = "";
    for (var i2 = 0; i2 < string.length; ++i2) {
      var c2 = string.charCodeAt(i2);
      if (c2 === 45 || c2 === 46 || c2 === 95 || c2 === 126 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || format === formats$2.RFC1738 && (c2 === 40 || c2 === 41)) {
        out += string.charAt(i2);
        continue;
      }
      if (c2 < 128) {
        out = out + hexTable[c2];
        continue;
      }
      if (c2 < 2048) {
        out = out + (hexTable[192 | c2 >> 6] + hexTable[128 | c2 & 63]);
        continue;
      }
      if (c2 < 55296 || c2 >= 57344) {
        out = out + (hexTable[224 | c2 >> 12] + hexTable[128 | c2 >> 6 & 63] + hexTable[128 | c2 & 63]);
        continue;
      }
      i2 += 1;
      c2 = 65536 + ((c2 & 1023) << 10 | string.charCodeAt(i2) & 1023);
      out += hexTable[240 | c2 >> 18] + hexTable[128 | c2 >> 12 & 63] + hexTable[128 | c2 >> 6 & 63] + hexTable[128 | c2 & 63];
    }
    return out;
  };
  var compact = function compact2(value) {
    var queue = [{ obj: { o: value }, prop: "o" }];
    var refs = [];
    for (var i2 = 0; i2 < queue.length; ++i2) {
      var item = queue[i2];
      var obj = item.obj[item.prop];
      var keys = Object.keys(obj);
      for (var j2 = 0; j2 < keys.length; ++j2) {
        var key = keys[j2];
        var val = obj[key];
        if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
          queue.push({ obj, prop: key });
          refs.push(val);
        }
      }
    }
    compactQueue(queue);
    return value;
  };
  var isRegExp = function isRegExp2(obj) {
    return Object.prototype.toString.call(obj) === "[object RegExp]";
  };
  var isBuffer = function isBuffer2(obj) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };
  var combine = function combine2(a2, b2) {
    return [].concat(a2, b2);
  };
  var maybeMap = function maybeMap2(val, fn) {
    if (isArray$2(val)) {
      var mapped = [];
      for (var i2 = 0; i2 < val.length; i2 += 1) {
        mapped.push(fn(val[i2]));
      }
      return mapped;
    }
    return fn(val);
  };
  var utils$2 = {
    arrayToObject,
    assign: assign$1,
    combine,
    compact,
    decode,
    encode,
    isBuffer,
    isRegExp,
    maybeMap,
    merge
  };
  var getSideChannel = sideChannel;
  var utils$1 = utils$2;
  var formats$1 = formats$3;
  var has$1 = Object.prototype.hasOwnProperty;
  var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
      return prefix + "[]";
    },
    comma: "comma",
    indices: function indices(prefix, key) {
      return prefix + "[" + key + "]";
    },
    repeat: function repeat(prefix) {
      return prefix;
    }
  };
  var isArray$1 = Array.isArray;
  var push = Array.prototype.push;
  var pushToArray = function(arr, valueOrArray) {
    push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
  };
  var toISO = Date.prototype.toISOString;
  var defaultFormat = formats$1["default"];
  var defaults$1 = {
    addQueryPrefix: false,
    allowDots: false,
    charset: "utf-8",
    charsetSentinel: false,
    delimiter: "&",
    encode: true,
    encoder: utils$1.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats$1.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
      return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
  };
  var isNonNullishPrimitive = function isNonNullishPrimitive2(v2) {
    return typeof v2 === "string" || typeof v2 === "number" || typeof v2 === "boolean" || typeof v2 === "symbol" || typeof v2 === "bigint";
  };
  var sentinel = {};
  var stringify$1 = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel2) {
    var obj = object;
    var tmpSc = sideChannel2;
    var step = 0;
    var findFlag = false;
    while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
      var pos = tmpSc.get(object);
      step += 1;
      if (typeof pos !== "undefined") {
        if (pos === step) {
          throw new RangeError("Cyclic object value");
        } else {
          findFlag = true;
        }
      }
      if (typeof tmpSc.get(sentinel) === "undefined") {
        step = 0;
      }
    }
    if (typeof filter === "function") {
      obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
      obj = serializeDate(obj);
    } else if (generateArrayPrefix === "comma" && isArray$1(obj)) {
      obj = utils$1.maybeMap(obj, function(value2) {
        if (value2 instanceof Date) {
          return serializeDate(value2);
        }
        return value2;
      });
    }
    if (obj === null) {
      if (strictNullHandling) {
        return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, "key", format) : prefix;
      }
      obj = "";
    }
    if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
      if (encoder) {
        var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, "key", format);
        return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults$1.encoder, charset, "value", format))];
      }
      return [formatter(prefix) + "=" + formatter(String(obj))];
    }
    var values = [];
    if (typeof obj === "undefined") {
      return values;
    }
    var objKeys;
    if (generateArrayPrefix === "comma" && isArray$1(obj)) {
      if (encodeValuesOnly && encoder) {
        obj = utils$1.maybeMap(obj, encoder);
      }
      objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
    } else if (isArray$1(filter)) {
      objKeys = filter;
    } else {
      var keys = Object.keys(obj);
      objKeys = sort ? keys.sort(sort) : keys;
    }
    var adjustedPrefix = commaRoundTrip && isArray$1(obj) && obj.length === 1 ? prefix + "[]" : prefix;
    for (var j2 = 0; j2 < objKeys.length; ++j2) {
      var key = objKeys[j2];
      var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
      if (skipNulls && value === null) {
        continue;
      }
      var keyPrefix = isArray$1(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key : "[" + key + "]");
      sideChannel2.set(object, step);
      var valueSideChannel = getSideChannel();
      valueSideChannel.set(sentinel, sideChannel2);
      pushToArray(values, stringify2(
        value,
        keyPrefix,
        generateArrayPrefix,
        commaRoundTrip,
        strictNullHandling,
        skipNulls,
        generateArrayPrefix === "comma" && encodeValuesOnly && isArray$1(obj) ? null : encoder,
        filter,
        sort,
        allowDots,
        serializeDate,
        format,
        formatter,
        encodeValuesOnly,
        charset,
        valueSideChannel
      ));
    }
    return values;
  };
  var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
    if (!opts) {
      return defaults$1;
    }
    if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
      throw new TypeError("Encoder has to be a function.");
    }
    var charset = opts.charset || defaults$1.charset;
    if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    }
    var format = formats$1["default"];
    if (typeof opts.format !== "undefined") {
      if (!has$1.call(formats$1.formatters, opts.format)) {
        throw new TypeError("Unknown format option provided.");
      }
      format = opts.format;
    }
    var formatter = formats$1.formatters[format];
    var filter = defaults$1.filter;
    if (typeof opts.filter === "function" || isArray$1(opts.filter)) {
      filter = opts.filter;
    }
    return {
      addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
      allowDots: typeof opts.allowDots === "undefined" ? defaults$1.allowDots : !!opts.allowDots,
      charset,
      charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$1.charsetSentinel,
      delimiter: typeof opts.delimiter === "undefined" ? defaults$1.delimiter : opts.delimiter,
      encode: typeof opts.encode === "boolean" ? opts.encode : defaults$1.encode,
      encoder: typeof opts.encoder === "function" ? opts.encoder : defaults$1.encoder,
      encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
      filter,
      format,
      formatter,
      serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults$1.serializeDate,
      skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults$1.skipNulls,
      sort: typeof opts.sort === "function" ? opts.sort : null,
      strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$1.strictNullHandling
    };
  };
  var stringify_1 = function(object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);
    var objKeys;
    var filter;
    if (typeof options.filter === "function") {
      filter = options.filter;
      obj = filter("", obj);
    } else if (isArray$1(options.filter)) {
      filter = options.filter;
      objKeys = filter;
    }
    var keys = [];
    if (typeof obj !== "object" || obj === null) {
      return "";
    }
    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
      arrayFormat = opts.arrayFormat;
    } else if (opts && "indices" in opts) {
      arrayFormat = opts.indices ? "indices" : "repeat";
    } else {
      arrayFormat = "indices";
    }
    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
    if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    }
    var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
    if (!objKeys) {
      objKeys = Object.keys(obj);
    }
    if (options.sort) {
      objKeys.sort(options.sort);
    }
    var sideChannel2 = getSideChannel();
    for (var i2 = 0; i2 < objKeys.length; ++i2) {
      var key = objKeys[i2];
      if (options.skipNulls && obj[key] === null) {
        continue;
      }
      pushToArray(keys, stringify$1(
        obj[key],
        key,
        generateArrayPrefix,
        commaRoundTrip,
        options.strictNullHandling,
        options.skipNulls,
        options.encode ? options.encoder : null,
        options.filter,
        options.sort,
        options.allowDots,
        options.serializeDate,
        options.format,
        options.formatter,
        options.encodeValuesOnly,
        options.charset,
        sideChannel2
      ));
    }
    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? "?" : "";
    if (options.charsetSentinel) {
      if (options.charset === "iso-8859-1") {
        prefix += "utf8=%26%2310003%3B&";
      } else {
        prefix += "utf8=%E2%9C%93&";
      }
    }
    return joined.length > 0 ? prefix + joined : "";
  };
  var utils = utils$2;
  var has = Object.prototype.hasOwnProperty;
  var isArray = Array.isArray;
  var defaults = {
    allowDots: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: "&",
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1e3,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
  };
  var interpretNumericEntities = function(str) {
    return str.replace(/&#(\d+);/g, function($0, numberStr) {
      return String.fromCharCode(parseInt(numberStr, 10));
    });
  };
  var parseArrayValue = function(val, options) {
    if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
      return val.split(",");
    }
    return val;
  };
  var isoSentinel = "utf8=%26%2310003%3B";
  var charsetSentinel = "utf8=%E2%9C%93";
  var parseValues = function parseQueryStringValues(str, options) {
    var obj = { __proto__: null };
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
    var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1;
    var i2;
    var charset = options.charset;
    if (options.charsetSentinel) {
      for (i2 = 0; i2 < parts.length; ++i2) {
        if (parts[i2].indexOf("utf8=") === 0) {
          if (parts[i2] === charsetSentinel) {
            charset = "utf-8";
          } else if (parts[i2] === isoSentinel) {
            charset = "iso-8859-1";
          }
          skipIndex = i2;
          i2 = parts.length;
        }
      }
    }
    for (i2 = 0; i2 < parts.length; ++i2) {
      if (i2 === skipIndex) {
        continue;
      }
      var part = parts[i2];
      var bracketEqualsPos = part.indexOf("]=");
      var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
      var key, val;
      if (pos === -1) {
        key = options.decoder(part, defaults.decoder, charset, "key");
        val = options.strictNullHandling ? null : "";
      } else {
        key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
        val = utils.maybeMap(
          parseArrayValue(part.slice(pos + 1), options),
          function(encodedVal) {
            return options.decoder(encodedVal, defaults.decoder, charset, "value");
          }
        );
      }
      if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
        val = interpretNumericEntities(val);
      }
      if (part.indexOf("[]=") > -1) {
        val = isArray(val) ? [val] : val;
      }
      if (has.call(obj, key)) {
        obj[key] = utils.combine(obj[key], val);
      } else {
        obj[key] = val;
      }
    }
    return obj;
  };
  var parseObject = function(chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);
    for (var i2 = chain.length - 1; i2 >= 0; --i2) {
      var obj;
      var root = chain[i2];
      if (root === "[]" && options.parseArrays) {
        obj = [].concat(leaf);
      } else {
        obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (!options.parseArrays && cleanRoot === "") {
          obj = { 0: leaf };
        } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
          obj = [];
          obj[index] = leaf;
        } else if (cleanRoot !== "__proto__") {
          obj[cleanRoot] = leaf;
        }
      }
      leaf = obj;
    }
    return leaf;
  };
  var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
      return;
    }
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;
    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;
    var keys = [];
    if (parent) {
      if (!options.plainObjects && has.call(Object.prototype, parent)) {
        if (!options.allowPrototypes) {
          return;
        }
      }
      keys.push(parent);
    }
    var i2 = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i2 < options.depth) {
      i2 += 1;
      if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
        if (!options.allowPrototypes) {
          return;
        }
      }
      keys.push(segment[1]);
    }
    if (segment) {
      keys.push("[" + key.slice(segment.index) + "]");
    }
    return parseObject(keys, val, options, valuesParsed);
  };
  var normalizeParseOptions = function normalizeParseOptions2(opts) {
    if (!opts) {
      return defaults;
    }
    if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
      throw new TypeError("Decoder has to be a function.");
    }
    if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    }
    var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
    return {
      allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
      allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
      allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
      arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
      charset,
      charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
      comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
      decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
      delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
      ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
      interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
      parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
      parseArrays: opts.parseArrays !== false,
      plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
      strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
    };
  };
  var parse$1 = function(str, opts) {
    var options = normalizeParseOptions(opts);
    if (str === "" || str === null || typeof str === "undefined") {
      return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    }
    var tempObj = typeof str === "string" ? parseValues(str, options) : str;
    var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    var keys = Object.keys(tempObj);
    for (var i2 = 0; i2 < keys.length; ++i2) {
      var key = keys[i2];
      var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
      obj = utils.merge(obj, newObj, options);
    }
    if (options.allowSparse === true) {
      return obj;
    }
    return utils.compact(obj);
  };
  var stringify = stringify_1;
  var parse = parse$1;
  var formats = formats$3;
  var lib = {
    formats,
    parse,
    stringify
  };
  const baseOptions = {
    method: "POST",
    baseURL: "/",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*"
    },
    timeout: 3e5,
    withCredentials: true,
    data: {}
  };
  function request(options, config = {}) {
    const token = uni.getStorageSync("token");
    const instance = axios$1.create({
      ...baseOptions,
      ...options,
      headers: {
        ...baseOptions.headers,
        ...options.headers || {},
        Authorization: token,
        token,
        jxbClientId: uni.getStorageSync("jxbClientId"),
        lang: "zh-CN"
      }
    });
    const params = { isLoading: true, isError: true, isToken: true, ...config };
    instance.interceptors.request.use((req) => {
      var _a2, _b;
      if (params.isToken) {
        const token2 = uni.getStorageSync("token");
        if (((_a2 = req.method) == null ? void 0 : _a2.toLocaleLowerCase()) === "get") {
          req.params = { ...req.params, token: token2 };
        }
        if (((_b = req.method) == null ? void 0 : _b.toLocaleLowerCase()) === "post") {
          req.params = { ...req.params || {}, token: token2 };
          req.data = { ...req.data, token: token2 };
        }
      }
      if (params.isQs) {
        req.headers["Content-Type"] = "application/x-www-form-urlencoded";
        req.data = lib.stringify(req.data);
      }
      if (params.isEncrypt) {
        req.data = processRequest(req.data, { req: true });
        formatAppLog("log", "at request/modules/base.ts:58", req.data);
      }
      if (params.isLoading) {
        uni.showLoading({
          title: "全力加载中...",
          mask: true
        });
      }
      return req;
    });
    instance.interceptors.response.use(
      async ({ data }) => {
        params.isLoading && uni.hideLoading();
        const res = await responseHandle(data, params.isMessage);
        return res;
      },
      async (err) => {
        params.isLoading && uni.hideLoading();
        const error = await rejectHandle(err);
        return error;
      }
    );
    return instance(options);
  }
  /*! js-cookie v3.0.5 | MIT */
  function assign(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies2 = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i2 = 0; i2 < cookies2.length; i2++) {
        var parts = cookies2[i2].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set,
        get,
        remove: function(name, attributes) {
          set(
            name,
            "",
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init(assign({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  init(defaultConverter, { path: "/" });
  const en$1 = {
    "uni-pagination.prevText": "prev",
    "uni-pagination.nextText": "next",
    "uni-pagination.piecePerPage": "piece/page"
  };
  const es = {
    "uni-pagination.prevText": "anterior",
    "uni-pagination.nextText": "prxima",
    "uni-pagination.piecePerPage": "Art��culo/P��gina"
  };
  const fr = {
    "uni-pagination.prevText": "précédente",
    "uni-pagination.nextText": "suivante",
    "uni-pagination.piecePerPage": "Articles/Pages"
  };
  const zhHans$1 = {
    "uni-pagination.prevText": "上一页",
    "uni-pagination.nextText": "下一页",
    "uni-pagination.piecePerPage": "条/页"
  };
  const zhHant$1 = {
    "uni-pagination.prevText": "上一頁",
    "uni-pagination.nextText": "下一頁",
    "uni-pagination.piecePerPage": "條/頁"
  };
  const messages$1 = {
    en: en$1,
    es,
    fr,
    "zh-Hans": zhHans$1,
    "zh-Hant": zhHant$1
  };
  initVueI18n(messages$1);
  const en = {
    "uni-popup.cancel": "cancel",
    "uni-popup.ok": "ok",
    "uni-popup.placeholder": "pleace enter",
    "uni-popup.title": "Hint",
    "uni-popup.shareTitle": "Share to"
  };
  const zhHans = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "确定",
    "uni-popup.placeholder": "请输入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const zhHant = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "確定",
    "uni-popup.placeholder": "請輸入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  initVueI18n(messages);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      root: { type: Object, required: false },
      disabled: { type: [Boolean, Function], required: false },
      label: { type: String, required: false },
      icon: { type: String, required: false },
      color: { type: String, required: false }
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
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", {
          class: vue.normalizeClass(["button-wrap", isDisabled() && "disabled"]),
          disabled: isDisabled(),
          onClick: handleClick
        }, [
          vue.createCommentVNode(' <uni-icons :type="icon" :color="color" size="20" /> '),
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createVNode(_component_uni_icons, {
              "custom-prefix": "iconfont",
              type: "icon-" + __props.icon,
              color: __props.color,
              size: "18"
            }, null, 8, ["type", "color"]),
            vue.createElementVNode(
              "view",
              {
                style: vue.normalizeStyle({ color: __props.color })
              },
              vue.toDisplayString(__props.label),
              5
              /* TEXT, STYLE */
            )
          ], true)
        ], 10, ["disabled"]);
      };
    }
  });
  const AwesomeButtonMain = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-997cc755"], ["__file", "/Users/liyang/Documents/HBuilderProjects/hq/components/button-main/index.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      modelValue: { type: Boolean, required: true },
      list: { type: Array, required: true }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit }) {
      const props = __props;
      const changeRadio = () => {
        emit("update:modelValue", !props.modelValue);
      };
      const openFile = (url) => {
        formatAppLog("log", "at components/privacy-agreement/index.vue:15", url);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("div", {
            class: "radio",
            onClick: changeRadio
          }, [
            vue.createElementVNode("radio", {
              style: { "transform": "scale(0.8)" },
              checked: __props.modelValue,
              onClick: vue.withModifiers(changeRadio, ["stop"])
            }, null, 8, ["checked", "onClick"]),
            vue.createTextVNode(" 我已阅读并同意 "),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.list, (item) => {
                return vue.openBlock(), vue.createElementBlock("text", {
                  key: item.privacyAgreementURL,
                  class: "privacy",
                  onClick: vue.withModifiers(($event) => openFile(item.privacyAgreementURL), ["stop"])
                }, "《" + vue.toDisplayString(item.privacyAgreementName) + "》", 9, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  });
  const AwesomePrivacyAgreement = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bf788ac4"], ["__file", "/Users/liyang/Documents/HBuilderProjects/hq/components/privacy-agreement/index.vue"]]);
  const getLoginConfig = async () => {
    return request({
      url: "/gamma-uc/config/nologin/getLoginConfig",
      method: "POST",
      data: {
        sceneID: getApp().globalData.sceneID,
        orgCode: "601"
      }
    }, {
      isQs: true
    });
  };
  function getPublicKey() {
    return request({
      url: "/gamma-qqd/imp/sat/app/common/getPublicKey.do",
      method: "post",
      data: {
        requestId: (/* @__PURE__ */ new Date()).getTime(),
        sign: "",
        encodeKey: "",
        platform: "H5",
        version: "1.0",
        encodeKeyEncrytMethod: "RSA",
        requestDataEncrytMethod: "AES",
        requestData: JSON.stringify({ publicKeyType: "01" })
      }
    });
  }
  function getImgValid() {
    return request({
      url: "/gamma-qqd/wx/nologin/getImgValid.do",
      method: "post",
      data: {}
    }, {
      isEncrypt: true
    });
  }
  function sendSmsOtp(data) {
    return request({
      url: "/gamma-qqd/wx/nologin/sendSmsOtp.do",
      method: "post",
      data
    }, {
      isEncrypt: true
    });
  }
  function login(data) {
    return request({
      url: "/gamma-qqd/wx/nologin/binder.do",
      method: "post",
      data
    }, {
      isEncrypt: true
    });
  }
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const loginMethod = vue.ref("2");
      const wxSceneCode = vue.ref("");
      const privacyAgreement = vue.ref({});
      const account = vue.ref("");
      const password = vue.ref("");
      const mobileNo = vue.ref("");
      const imgValidCode = vue.ref("");
      const smsCode = vue.ref("");
      const imgValidId = vue.ref("");
      const smsCodeImg = vue.ref("");
      const sendCode = vue.ref(false);
      const allowSend = vue.ref(false);
      const smsFlag = vue.ref("");
      const remainder = vue.ref(119);
      vue.watch(imgValidCode, (val) => {
        if ((val == null ? void 0 : val.length) === 4) {
          allowSend.value = true;
        } else {
          allowSend.value = false;
        }
      });
      const handleSendCode = () => {
        if (!mobileNo.value || !/^1[0-9]{10}$/.test(mobileNo.value)) {
          uni.showToast({
            icon: "error",
            title: "请输入正确手机号"
          });
          return;
        }
        if (!imgValidCode.value) {
          uni.showToast({
            icon: "error",
            title: "请输入图形验证码"
          });
          return;
        }
        sendSmsOtp({
          mobileNo: mobileNo.value,
          otpType: "2",
          imgValidId: imgValidId.value,
          imgValidCode: imgValidCode.value,
          wxSceneCode: wxSceneCode.value,
          userType: "C"
        }).then((res) => {
          formatAppLog("log", "at pages/toc/login/index.vue:99", res);
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
      const checked = vue.ref(false);
      const queryLoginConfig = () => {
        getLoginConfig().then((res) => {
          const { appConfig, authData, fpsConfig, qqdConfig } = res.SDKConfig;
          uni.setStorageSync("fpsUrl", fpsConfig.fpsServer);
          uni.setStorageSync("orgCode", appConfig.orgCode);
          uni.setStorageSync("jxbClientId", authData.jxbClientId);
          uni.setStorageSync("tenantCode", authData.tenantCode);
          uni.setStorageSync("GAMMA-UC-wxSeneCode", qqdConfig.wx_scene_code);
          wxSceneCode.value = qqdConfig.wx_scene_code;
          const privacyAgreementObj = JSON.parse(res.loginConfig);
          privacyAgreement.value = privacyAgreementObj.privacyAgreementList;
        });
      };
      const queryImgValid = () => {
        getImgValid().then((res) => {
          imgValidId.value = res.imgValidId;
          smsCodeImg.value = `data:image/png;base64,${res.imgValidCode}`;
        });
      };
      if (uni.getStorageSync("GAMMA-UC-PUBLICKEY")) {
        queryLoginConfig();
        queryImgValid();
      } else {
        getPublicKey().then((res) => {
          const PublicKey = res.publicKey.rsaPublicKey[0];
          uni.setStorageSync("GAMMA-UC-PUBLICKEY", hex2base64(PublicKey));
          queryLoginConfig();
          queryImgValid();
        });
      }
      const forgotPwd = () => {
        formatAppLog("log", "at pages/toc/login/index.vue:145", "forgot");
      };
      const handleLogin = () => {
        let data = {
          loginType: loginMethod.value,
          wxSceneCode: wxSceneCode.value
        };
        formatAppLog("log", "at pages/toc/login/index.vue:152", data);
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
        formatAppLog("log", "at pages/toc/login/index.vue:169", data);
        login(data).then((res) => {
          var _a2, _b;
          const Authorization = (_a2 = res.userInfo) == null ? void 0 : _a2.authenticateTicket;
          const customerId = (_b = res.userInfo) == null ? void 0 : _b.customerId;
          uni.setStorageSync("token", Authorization);
          uni.setStorageSync("Authorization", Authorization);
          uni.setStorageSync("GAMMA-UC-USERID", customerId);
          uni.setStorageSync("businessInfo", res.userInfo);
          if (res.userInfo.isNew === "0") {
            formatAppLog("log", "at pages/toc/login/index.vue:178", "设置密码");
          }
          uni.switchTab({
            url: "/pages/toc/home/index"
          });
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", { class: "logo" }, [
            vue.createElementVNode("img", {
              src: vue.unref(logo),
              alt: "logo"
            }, null, 8, ["src"]),
            vue.createElementVNode("view", { class: "subtitle" }, "值得信赖的企业融资服务平台")
          ]),
          vue.createCommentVNode(" 密码登录 "),
          loginMethod.value === "0" ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createVNode(vue.unref(AwesomeInput), {
                modelValue: account.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => account.value = $event),
                placeholder: "请输入账号"
              }, null, 8, ["modelValue"]),
              vue.createVNode(vue.unref(AwesomeInput), {
                modelValue: password.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => password.value = $event),
                placeholder: "请输入密码",
                type: "password"
              }, null, 8, ["modelValue"])
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createCommentVNode(" 验证码登录 "),
              vue.createVNode(vue.unref(AwesomeInput), {
                modelValue: mobileNo.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => mobileNo.value = $event),
                placeholder: "请输入手机号码"
              }, null, 8, ["modelValue"]),
              vue.createVNode(vue.unref(AwesomeInput), {
                modelValue: imgValidCode.value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => imgValidCode.value = $event),
                placeholder: "请输入图形验证码"
              }, {
                right: vue.withCtx(() => [
                  vue.createElementVNode("img", {
                    onClick: queryImgValid,
                    width: "60",
                    src: smsCodeImg.value,
                    alt: ""
                  }, null, 8, ["src"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue"]),
              vue.createVNode(vue.unref(AwesomeInput), {
                modelValue: smsCode.value,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => smsCode.value = $event),
                placeholder: "请输入验证码"
              }, {
                right: vue.withCtx(() => [
                  !sendCode.value ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: vue.normalizeClass([!allowSend.value && "send-disabled", "send-code"]),
                      onClick: handleSendCode
                    },
                    " 获取验证码 ",
                    2
                    /* CLASS */
                  )) : (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 1,
                      class: "wait-code"
                    },
                    vue.toDisplayString(remainder.value) + "S ",
                    1
                    /* TEXT */
                  ))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue"])
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          vue.createVNode(vue.unref(AwesomePrivacyAgreement), {
            style: { "margin": "30rpx 0" },
            modelValue: checked.value,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => checked.value = $event),
            list: privacyAgreement.value
          }, null, 8, ["modelValue", "list"]),
          vue.createVNode(vue.unref(AwesomeButtonMain), { onClick: handleLogin }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("登录")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "switch" }, [
            loginMethod.value === "0" ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              onClick: _cache[6] || (_cache[6] = ($event) => loginMethod.value = "2")
            }, "手机验证码登录")) : (vue.openBlock(), vue.createElementBlock("text", {
              key: 1,
              onClick: _cache[7] || (_cache[7] = ($event) => loginMethod.value = "0")
            }, "密码登录")),
            loginMethod.value === "0" ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 2,
              onClick: forgotPwd
            }, "忘记密码")) : vue.createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  });
  const PagesTocLoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8917eb8f"], ["__file", "/Users/liyang/Documents/HBuilderProjects/hq/pages/toc/login/index.vue"]]);
  __definePage("pages/toc/home/index", PagesTocHomeIndex);
  __definePage("pages/toc/my/index", PagesTocMyIndex);
  __definePage("pages/toc/login/index", PagesTocLoginIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("warn", "at App.vue:4", "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    },
    // // tob
    // globalData: {
    //   sceneID: 'S20220104151854218R2222305613',
    // },
    // toc
    globalData: {
      sceneID: "S20220104144928197R3452008444"
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/liyang/Documents/HBuilderProjects/hq/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
