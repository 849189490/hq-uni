"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key2, val] of props) {
    target[key2] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i2 = 0; i2 < list.length; i2++) {
    map2[list[i2]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
function normalizeStyle(value) {
  if (isArray$5(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString$2(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key2 in normalized) {
          res[key2] = normalized[key2];
        }
      }
    }
    return res;
  } else if (isString$2(value)) {
    return value;
  } else if (isObject$2(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$2(value)) {
    res = value;
  } else if (isArray$5(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$2(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString$2(val) ? val : val == null ? "" : isArray$5(val) || isObject$2(val) && (val.toString === objectToString$1 || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap$1(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key2, val2]) => {
        entries[`${key2} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet$1(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$2(val) && !isArray$5(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key2) => onRE.test(key2);
const isModelListener = (key2) => key2.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn$2 = (val, key2) => hasOwnProperty$1.call(val, key2);
const isArray$5 = Array.isArray;
const isMap$1 = (val) => toTypeString(val) === "[object Map]";
const isSet$1 = (val) => toTypeString(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString$2 = (val) => typeof val === "string";
const isSymbol$1 = (val) => typeof val === "symbol";
const isObject$2 = (val) => val !== null && typeof val === "object";
const isPromise$1 = (val) => {
  return isObject$2(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString$1 = Object.prototype.toString;
const toTypeString = (value) => objectToString$1.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key2) => isString$2(key2) && key2 !== "NaN" && key2[0] !== "-" && "" + parseInt(key2, 10) === key2;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj2, key2, value) => {
  Object.defineProperty(obj2, key2, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i2 = 0; i2 < fns.length; i2++) {
    ret = fns[i2](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj2, path) {
  if (!isString$2(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts2 = path.split(".");
  let key2 = parts2[0];
  if (!obj2) {
    obj2 = {};
  }
  if (parts2.length === 1) {
    return obj2[key2];
  }
  return getValueByDataPath(obj2[key2], parts2.slice(1).join("."));
}
function sortObject(obj2) {
  let sortObj = {};
  if (isPlainObject(obj2)) {
    Object.keys(obj2).sort().forEach((key2) => {
      const _key = key2;
      sortObj[_key] = obj2[_key];
    });
  }
  return !Object.keys(sortObj) ? obj2 : sortObj;
}
const encode$1 = encodeURIComponent;
function stringifyQuery(obj2, encodeStr = encode$1) {
  const res = obj2 ? Object.keys(obj2).map((key2) => {
    let val = obj2[key2];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key2) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction$1(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction$1(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E = function() {
};
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len = evtArr.length;
    for (i2; i2 < len; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i2 = 0, len = evts.length; i2 < len; i2++) {
        if (evts[i2].fn !== callback && evts[i2].fn._ !== callback)
          liveEvents.push(evts[i2]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts2) {
  return !!parts2.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts2) {
  return parts2.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale$1(locale2, messages) {
  if (!locale2) {
    return;
  }
  locale2 = locale2.trim().replace(/_/g, "-");
  if (messages && messages[locale2]) {
    return locale2;
  }
  locale2 = locale2.toLowerCase();
  if (locale2 === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale2.indexOf("zh") === 0) {
    if (locale2.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale2.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale2, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales2 = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales2 = Object.keys(messages);
  }
  const lang2 = startsWith(locale2, locales2);
  if (lang2) {
    return lang2;
  }
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key2 in protocol) {
    const errMsg = validateProp$1(key2, data[key2], protocol[key2], !hasOwn$2(data, key2));
    if (isString$2(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray$5(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len; i2++) {
    const opts = protocol[i2];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i2) {
      data[opts.name] = args[i2];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid2 = false;
    const types = isArray$5(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid2; i2++) {
      const { valid, expectedType } = assertType$1(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid2 = valid;
    }
    if (!isValid2) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$2(value);
  } else if (expectedType === "Array") {
    valid = isArray$5(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$2(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$2(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction$1(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction$1(success);
  const hasFail = isFunction$1(fail);
  const hasComplete = isFunction$1(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction$1(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction$1(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params2) {
  return function(data) {
    return hook(data, params2) || data;
  };
}
function queue$1(hooks2, data, params2) {
  let promise = false;
  for (let i2 = 0; i2 < hooks2.length; i2++) {
    const hook = hooks2[i2];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params2));
    } else {
      const res = hook(data, params2);
      if (isPromise$1(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options2 = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks2 = interceptors2[name];
    if (!isArray$5(hooks2)) {
      return;
    }
    const oldCallback = options2[name];
    options2[name] = function callbackInterceptor(res) {
      queue$1(hooks2, res, options2).then((res2) => {
        return isFunction$1(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options2;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray$5(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray$5(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api2, options2, params2) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray$5(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options2);
      return res.then((options3) => {
        return api2(wrapperOptions(getApiInterceptorHooks(method), options3), ...params2);
      });
    } else {
      return api2(wrapperOptions(interceptor, options2), ...params2);
    }
  }
  return api2(options2, ...params2);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction$1(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend$1(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options2) {
  const params2 = args[0];
  if (!options2 || !isPlainObject(options2.formatArgs) && isPlainObject(params2)) {
    return;
  }
  const formatArgs = options2.formatArgs;
  const keys2 = Object.keys(formatArgs);
  for (let i2 = 0; i2 < keys2.length; i2++) {
    const name = keys2[i2];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction$1(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params2);
      if (isString$2(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn$2(params2, name)) {
        params2[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  return invokeCallback(id, extend$1(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend$1({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options2) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options2 && options2.beforeInvoke) {
    const errMsg2 = options2.beforeInvoke(args);
    if (isString$2(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options2);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString$2(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options2) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options2);
    const errMsg = beforeInvokeApi(name, [args], protocol, options2);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options2) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options2);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options2) {
  return wrapperTaskApi(name, fn, protocol, options2);
}
function defineSyncApi(name, fn, protocol, options2) {
  return wrapperSyncApi(name, fn, protocol, options2);
}
function defineAsyncApi(name, fn, protocol, options2) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options2));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction$1(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks2 = interceptors2[name];
    const hook = interceptor[name];
    if (isArray$5(hooks2) && isFunction$1(hook)) {
      remove(hooks2, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$5(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks2) {
  const res = [];
  for (let i2 = 0; i2 < hooks2.length; i2++) {
    if (res.indexOf(hooks2[i2]) === -1) {
      res.push(hooks2[i2]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString$2(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString$2(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray$5(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i2 = 0; i2 < onPushMessageCallbacks.length; i2++) {
      const callback = onPushMessageCallbacks[i2];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api2) {
  if (!shouldPromise(name)) {
    return api2;
  }
  if (!isFunction$1(api2)) {
    return api2;
  }
  return function promiseApi(options2 = {}, ...rest) {
    if (isFunction$1(options2.success) || isFunction$1(options2.fail) || isFunction$1(options2.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api2, options2, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api2, extend$1({}, options2, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction$1(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key2 in fromArgs) {
        if (hasOwn$2(argsOption, key2)) {
          let keyOption = argsOption[key2];
          if (isFunction$1(keyOption)) {
            keyOption = keyOption(fromArgs[key2], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key2}`);
          } else if (isString$2(keyOption)) {
            toArgs[keyOption] = fromArgs[key2];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key2] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key2) !== -1) {
          const callback = fromArgs[key2];
          if (isFunction$1(callback)) {
            toArgs[key2] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$2(toArgs, key2)) {
            toArgs[key2] = fromArgs[key2];
          }
        }
      }
      return toArgs;
    } else if (isFunction$1(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction$1(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn$2(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options2 = protocol;
      if (isFunction$1(protocol)) {
        options2 = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options2.args, options2.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options2.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options2.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale$1 = () => {
  const app = isFunction$1(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale$1(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale2) => {
  const app = isFunction$1(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale2) {
    app.$vm.$locale = locale2;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale: locale2 }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale$1;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__1EEB9FD",
    appName: "hq",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.8.12",
    uniRuntimeVersion: "3.8.12",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend$1(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray$5(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend$1(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend$1(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__1EEB9FD",
      appName: "hq",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend$1(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale: getLocale$1,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api2, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key2) {
      if (hasOwn$2(target, key2)) {
        return target[key2];
      }
      if (hasOwn$2(api2, key2)) {
        return promisify(key2, api2[key2]);
      }
      if (hasOwn$2(baseApis, key2)) {
        return promisify(key2, baseApis[key2]);
      }
      return promisify(key2, wrapper(key2, platform[key2]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction$1(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction$1(fail) && fail(res);
    }
    isFunction$1(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key2) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key2)) {
    return false;
  }
  return objectKeys.indexOf(key2) > -1 || typeof wx[key2] === "function";
}
function initWx() {
  const newWx = {};
  for (const key2 in wx) {
    if (isWxKey(key2)) {
      newWx[key2] = wx[key2];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i2, l;
      for (i2 = 0, l = this.effects.length; i2 < l; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l = this.cleanups.length; i2 < l; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l = this.scopes.length; i2 < l; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i2 = 0; i2 < deps.length; i2++) {
      const dep = deps[i2];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key2) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key2);
    if (!dep) {
      depsMap.set(key2, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key: key2 };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key2, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key2 === "length" && isArray$5(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key3) => {
      if (key3 === "length" || key3 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key2 !== void 0) {
      deps.push(depsMap.get(key2));
    }
    switch (type) {
      case "add":
        if (!isArray$5(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap$1(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key2)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$5(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap$1(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key: key2, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$5(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend$1({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key2) => key2 !== "arguments" && key2 !== "caller").map((key2) => Symbol[key2]).filter(isSymbol$1)
);
const get$1$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key2) => {
    instrumentations[key2] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l = this.length; i2 < l; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key2](...args);
      if (res === -1 || res === false) {
        return arr[key2](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key2) => {
    instrumentations[key2] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key2].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key2) {
  const obj2 = toRaw(this);
  track(obj2, "has", key2);
  return obj2.hasOwnProperty(key2);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get3(target, key2, receiver) {
    if (key2 === "__v_isReactive") {
      return !isReadonly2;
    } else if (key2 === "__v_isReadonly") {
      return isReadonly2;
    } else if (key2 === "__v_isShallow") {
      return shallow;
    } else if (key2 === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$5(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$2(arrayInstrumentations, key2)) {
        return Reflect.get(arrayInstrumentations, key2, receiver);
      }
      if (key2 === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key2, receiver);
    if (isSymbol$1(key2) ? builtInSymbols.has(key2) : isNonTrackableKeys(key2)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key2);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key2) ? res : res.value;
    }
    if (isObject$2(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key2, value, receiver) {
    let oldValue = target[key2];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$5(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$5(target) && isIntegerKey(key2) ? Number(key2) < target.length : hasOwn$2(target, key2);
    const result = Reflect.set(target, key2, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key2, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key2, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key2) {
  const hadKey = hasOwn$2(target, key2);
  const oldValue = target[key2];
  const result = Reflect.deleteProperty(target, key2);
  if (result && hadKey) {
    trigger(target, "delete", key2, void 0, oldValue);
  }
  return result;
}
function has$1$1(target, key2) {
  const result = Reflect.has(target, key2);
  if (!isSymbol$1(key2) || !builtInSymbols.has(key2)) {
    track(target, "has", key2);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$5(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1$1,
  set: set$1$1,
  deleteProperty,
  has: has$1$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key2) {
    {
      warn$1(`Set operation on key "${String(key2)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key2) {
    {
      warn$1(`Delete operation on key "${String(key2)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend$1({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend$1({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto$1 = (v) => Reflect.getPrototypeOf(v);
function get$3(target, key2, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key2);
  if (!isReadonly2) {
    if (key2 !== rawKey) {
      track(rawTarget, "get", key2);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto$1(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key2)) {
    return wrap(target.get(key2));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key2);
  }
}
function has$4(key2, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key2);
  if (!isReadonly2) {
    if (key2 !== rawKey) {
      track(rawTarget, "has", key2);
    }
    track(rawTarget, "has", rawKey);
  }
  return key2 === rawKey ? target.has(key2) : target.has(key2) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add$2(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto2 = getProto$1(target);
  const hadKey = proto2.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$2(key2, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto$1(target);
  let hadKey = has2.call(target, key2);
  if (!hadKey) {
    key2 = toRaw(key2);
    hadKey = has2.call(target, key2);
  } else {
    checkIdentityKeys(target, has2, key2);
  }
  const oldValue = get3.call(target, key2);
  target.set(key2, value);
  if (!hadKey) {
    trigger(target, "add", key2, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key2, value, oldValue);
  }
  return this;
}
function deleteEntry(key2) {
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto$1(target);
  let hadKey = has2.call(target, key2);
  if (!hadKey) {
    key2 = toRaw(key2);
    hadKey = has2.call(target, key2);
  } else {
    checkIdentityKeys(target, has2, key2);
  }
  const oldValue = get3 ? get3.call(target, key2) : void 0;
  const result = target.delete(key2);
  if (hadKey) {
    trigger(target, "delete", key2, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap$1(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key2) => {
      return callback.call(thisArg, wrap(value), wrap(key2), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap$1(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key2 = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key2}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key2) {
      return get$3(this, key2);
    },
    get size() {
      return size(this);
    },
    has: has$4,
    add: add$2,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key2) {
      return get$3(this, key2, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$4,
    add: add$2,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key2) {
      return get$3(this, key2, true);
    },
    get size() {
      return size(this, true);
    },
    has(key2) {
      return has$4.call(this, key2, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key2) {
      return get$3(this, key2, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key2) {
      return has$4.call(this, key2, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key2, receiver) => {
    if (key2 === "__v_isReactive") {
      return !isReadonly2;
    } else if (key2 === "__v_isReadonly") {
      return isReadonly2;
    } else if (key2 === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn$2(instrumentations, key2) && key2 in target ? instrumentations : target, key2, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key2) {
  const rawKey = toRaw(key2);
  if (rawKey !== key2 && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$2(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$2(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$2(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key2, receiver) => unref(Reflect.get(target, key2, receiver)),
  set: (target, key2, value, receiver) => {
    const oldValue = target[key2];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key2, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a$1;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a$1] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a$1 = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$2(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys2 = Object.keys(props);
  keys2.slice(0, 3).forEach((key2) => {
    res.push(...formatProp(key2, props[key2]));
  });
  if (keys2.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key2, value, raw) {
  if (isString$2(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key2}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key2}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key2, toRaw(value.value), true);
    return raw ? value : [`${key2}=Ref<`, value, `>`];
  } else if (isFunction$1(value)) {
    return [`${key2}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key2}=`, value];
  }
}
const ErrorTypeStrings = {
  [
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  ]: "serverPrefetch hook",
  [
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  ]: "beforeCreate hook",
  [
    "c"
    /* LifecycleHooks.CREATED */
  ]: "created hook",
  [
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  ]: "beforeMount hook",
  [
    "m"
    /* LifecycleHooks.MOUNTED */
  ]: "mounted hook",
  [
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  ]: "beforeUpdate hook",
  [
    "u"
    /* LifecycleHooks.UPDATED */
  ]: "updated",
  [
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  ]: "beforeUnmount hook",
  [
    "um"
    /* LifecycleHooks.UNMOUNTED */
  ]: "unmounted hook",
  [
    "a"
    /* LifecycleHooks.ACTIVATED */
  ]: "activated hook",
  [
    "da"
    /* LifecycleHooks.DEACTIVATED */
  ]: "deactivated hook",
  [
    "ec"
    /* LifecycleHooks.ERROR_CAPTURED */
  ]: "errorCaptured hook",
  [
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  ]: "renderTracked hook",
  [
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  ]: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise$1(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$2(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$5(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i2 = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i2 < queue.length; i2++) {
    const cb = queue[i2];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i2, 1);
      i2--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count2 = seen.get(fn);
    if (count2 > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$2(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count2 + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    // eslint-disable-next-line no-restricted-globals
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-globals
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params2) {
  emit$1("component:emit", component.appContext.app, component, event, params2);
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$2(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction$1(validator)) {
          const isValid2 = validator(...rawArgs);
          if (!isValid2) {
            warn$2(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString$2(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$2(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend$1(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$5(raw)) {
    raw.forEach((key2) => normalized[key2] = null);
  } else {
    extend$1(normalized, raw);
  }
  if (isObject$2(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options2, key2) {
  if (!options2 || !isOn(key2)) {
    return false;
  }
  key2 = key2.slice(2).replace(/Once$/, "");
  return hasOwn$2(options2, key2[0].toLowerCase() + key2.slice(1)) || hasOwn$2(options2, hyphenate(key2)) || hasOwn$2(options2, key2);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key2, value) {
  if (!currentInstance) {
    {
      warn$2(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key2] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key2, value);
    }
  }
}
function inject(key2, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key2 in provides) {
      return provides[key2];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$2(`injection "${String(key2)}" not found.`);
    }
  } else {
    warn$2(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options2) {
  if (!isFunction$1(cb)) {
    warn$2(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options2);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$2(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$2(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn$2(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$5(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction$1(s2)) {
        return callWithErrorHandling(
          s2,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i2) => hasChanged(v, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  return unwatch;
}
function instanceWatch(source, value, options2) {
  const publicThis = this.proxy;
  const getter = isString$2(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options2 = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options2);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$2(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$5(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], seen);
    }
  } else if (isSet$1(value) || isMap$1(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key2 in value) {
      traverse(value[key2], seen);
    }
  }
  return value;
}
function defineComponent(options2) {
  return isFunction$1(options2) ? { setup: options2, name: options2.name } : options2;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks2 = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks2.unshift(wrappedHook);
    } else {
      hooks2.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn$2(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$2("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$2(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$2(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
    $: (i2) => i2,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i2) => i2.__$el || (i2.__$el = {}),
    $data: (i2) => i2.data,
    $props: (i2) => shallowReadonly(i2.props),
    $attrs: (i2) => shallowReadonly(i2.attrs),
    $slots: (i2) => shallowReadonly(i2.slots),
    $refs: (i2) => shallowReadonly(i2.refs),
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => i2.f || (i2.f = () => queueJob(i2.update)),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i2) => instanceWatch.bind(i2)
  })
);
const isReservedPrefix = (key2) => key2 === "_" || key2 === "$";
const hasSetupBinding = (state, key2) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$2(state, key2);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key2) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key2 === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key2[0] !== "$") {
      const n2 = accessCache[key2];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key2];
          case 2:
            return data[key2];
          case 4:
            return ctx[key2];
          case 3:
            return props[key2];
        }
      } else if (hasSetupBinding(setupState, key2)) {
        accessCache[key2] = 1;
        return setupState[key2];
      } else if (data !== EMPTY_OBJ && hasOwn$2(data, key2)) {
        accessCache[key2] = 2;
        return data[key2];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn$2(normalizedProps, key2)
      ) {
        accessCache[key2] = 3;
        return props[key2];
      } else if (ctx !== EMPTY_OBJ && hasOwn$2(ctx, key2)) {
        accessCache[key2] = 4;
        return ctx[key2];
      } else if (shouldCacheAccess) {
        accessCache[key2] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key2];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key2 === "$attrs") {
        track(instance, "get", key2);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key2])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$2(ctx, key2)) {
      accessCache[key2] = 4;
      return ctx[key2];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$2(globalProperties, key2)
    ) {
      {
        return globalProperties[key2];
      }
    } else if (currentRenderingInstance && (!isString$2(key2) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key2.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key2[0]) && hasOwn$2(data, key2)) {
        warn$2(`Property ${JSON.stringify(key2)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$2(`Property ${JSON.stringify(key2)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key2, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key2)) {
      setupState[key2] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$2(setupState, key2)) {
      warn$2(`Cannot mutate <script setup> binding "${key2}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn$2(data, key2)) {
      data[key2] = value;
      return true;
    } else if (hasOwn$2(instance.props, key2)) {
      warn$2(`Attempting to mutate prop "${key2}". Props are readonly.`);
      return false;
    }
    if (key2[0] === "$" && key2.slice(1) in instance) {
      warn$2(`Attempting to mutate public property "${key2}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key2 in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key2, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key2] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key2) {
    let normalizedProps;
    return !!accessCache[key2] || data !== EMPTY_OBJ && hasOwn$2(data, key2) || hasSetupBinding(setupState, key2) || (normalizedProps = propsOptions[0]) && hasOwn$2(normalizedProps, key2) || hasOwn$2(ctx, key2) || hasOwn$2(publicPropertiesMap, key2) || hasOwn$2(appContext.config.globalProperties, key2);
  },
  defineProperty(target, key2, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key2] = 0;
    } else if (hasOwn$2(descriptor, "value")) {
      this.set(target, key2, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key2, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$2(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key2) => {
    Object.defineProperty(target, key2, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key2](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key2) => {
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key2],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key2) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key2[0])) {
        warn$2(`setup() return property ${JSON.stringify(key2)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key2],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key2) => {
    if (cache[key2]) {
      warn$2(`${type} property "${key2}" is already defined in ${cache[key2]}.`);
    } else {
      cache[key2] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options2 = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options2.beforeCreate) {
    callHook$1(
      options2.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options2;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key2 in propsOptions) {
        checkDuplicateProperties("Props", key2);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key2 in methods) {
      const methodHandler = methods[key2];
      if (isFunction$1(methodHandler)) {
        {
          Object.defineProperty(ctx, key2, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key2);
        }
      } else {
        warn$2(`Method "${key2}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction$1(dataOptions)) {
      warn$2(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise$1(data)) {
      warn$2(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$2(data)) {
      warn$2(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key2 in data) {
          checkDuplicateProperties("Data", key2);
          if (!isReservedPrefix(key2[0])) {
            Object.defineProperty(ctx, key2, {
              configurable: true,
              enumerable: true,
              get: () => data[key2],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key2 in computedOptions) {
      const opt = computedOptions[key2];
      const get3 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get3 === NOOP) {
        warn$2(`Computed property "${key2}" has no getter.`);
      }
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$2(`Write operation failed: computed property "${key2}" is readonly.`);
      };
      const c = computed({
        get: get3,
        set: set2
      });
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key2);
      }
    }
  }
  if (watchOptions) {
    for (const key2 in watchOptions) {
      createWatcher(watchOptions[key2], ctx, publicThis, key2);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key2) => {
        provide(key2, provides[key2]);
      });
    }
  }
  {
    if (created) {
      callHook$1(
        created,
        instance,
        "c"
        /* LifecycleHooks.CREATED */
      );
    }
  }
  function registerLifecycleHook(register2, hook) {
    if (isArray$5(hook)) {
      hook.forEach((_hook) => register2(_hook.bind(publicThis)));
    } else if (hook) {
      register2(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$5(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key2) => {
        Object.defineProperty(exposed, key2, {
          get: () => publicThis[key2],
          set: (val) => publicThis[key2] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options2, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$5(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key2 in injectOptions) {
    const opt = injectOptions[key2];
    let injected;
    if (isObject$2(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key2,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key2);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key2, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn$2(`injected property "${key2}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key2] = injected;
      }
    } else {
      ctx[key2] = injected;
    }
    {
      checkDuplicateProperties("Inject", key2);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$5(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key2) {
  const getter = key2.includes(".") ? createPathGetter(publicThis, key2) : () => publicThis[key2];
  if (isString$2(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    } else {
      warn$2(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$2(raw)) {
    if (isArray$5(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key2));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$2(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$2(`Invalid watch option: "${key2}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$2(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to2, from2, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from2;
  if (extendsOptions) {
    mergeOptions(to2, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to2, m, strats, true));
  }
  for (const key2 in from2) {
    if (asMixin && key2 === "expose") {
      warn$2(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key2] || strats && strats[key2];
      to2[key2] = strat ? strat(to2[key2], from2[key2]) : from2[key2];
    }
  }
  return to2;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to2, from2) {
  if (!from2) {
    return to2;
  }
  if (!to2) {
    return from2;
  }
  return function mergedDataFn() {
    return extend$1(isFunction$1(to2) ? to2.call(this, this) : to2, isFunction$1(from2) ? from2.call(this, this) : from2);
  };
}
function mergeInject(to2, from2) {
  return mergeObjectOptions(normalizeInject(to2), normalizeInject(from2));
}
function normalizeInject(raw) {
  if (isArray$5(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to2, from2) {
  return to2 ? [...new Set([].concat(to2, from2))] : from2;
}
function mergeObjectOptions(to2, from2) {
  return to2 ? extend$1(extend$1(/* @__PURE__ */ Object.create(null), to2), from2) : from2;
}
function mergeWatchOptions(to2, from2) {
  if (!to2)
    return from2;
  if (!from2)
    return to2;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to2);
  for (const key2 in from2) {
    merged[key2] = mergeAsArray$1(to2[key2], from2[key2]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key2 in instance.propsOptions[0]) {
    if (!(key2 in props)) {
      props[key2] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options2] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key2 = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key2)) {
          continue;
        }
        const value = rawProps[key2];
        if (options2) {
          if (hasOwn$2(attrs, key2)) {
            if (value !== attrs[key2]) {
              attrs[key2] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key2);
            props[camelizedKey] = resolvePropValue(
              options2,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key2]) {
            attrs[key2] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key2 in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$2(rawProps, key2) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key2)) === key2 || !hasOwn$2(rawProps, kebabKey))) {
        if (options2) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key2] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key2] = resolvePropValue(
              options2,
              rawCurrentProps,
              key2,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key2];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key2 in attrs) {
        if (!rawProps || !hasOwn$2(rawProps, key2) && true) {
          delete attrs[key2];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options2, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key2 in rawProps) {
      if (isReservedProp(key2)) {
        continue;
      }
      const value = rawProps[key2];
      let camelKey;
      if (options2 && hasOwn$2(options2, camelKey = camelize(key2))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key2)) {
        if (!(key2 in attrs) || value !== attrs[key2]) {
          attrs[key2] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key2 = needCastKeys[i2];
      props[key2] = resolvePropValue(options2, rawCurrentProps, key2, castValues[key2], instance, !hasOwn$2(castValues, key2));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options2, props, key2, value, instance, isAbsent) {
  const opt = options2[key2];
  if (opt != null) {
    const hasDefault = hasOwn$2(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key2 in propsDefaults) {
          value = propsDefaults[key2];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key2] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key2))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
      extend$1(normalized, props);
      if (keys2)
        needCastKeys.push(...keys2);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$5(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString$2(raw[i2])) {
        warn$2(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$2(raw)) {
      warn$2(`invalid props options`, raw);
    }
    for (const key2 in raw) {
      const normalizedKey = camelize(key2);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key2];
        const prop = normalized[normalizedKey] = isArray$5(opt) || isFunction$1(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$2(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$2(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key2) {
  if (key2[0] !== "$") {
    return true;
  } else {
    warn$2(`Invalid prop name: "${key2}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$5(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options2 = instance.propsOptions[0];
  for (const key2 in options2) {
    let opt = options2[key2];
    if (opt == null)
      continue;
    validateProp(key2, resolvedValues[key2], opt, !hasOwn$2(rawProps, key2) && !hasOwn$2(rawProps, hyphenate(key2)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$2('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid2 = false;
    const types = isArray$5(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid2; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid2 = valid;
    }
    if (!isValid2) {
      warn$2(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$2('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$2(value);
  } else if (expectedType === "Array") {
    valid = isArray$5(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$2(rootProps)) {
      warn$2(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version: version$1,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$2(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options2) {
        if (installedPlugins.has(plugin2)) {
          warn$2(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction$1(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options2);
        } else if (isFunction$1(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options2);
        } else {
          warn$2(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$2("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$2(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$2(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key2, value) {
        if (key2 in context.provides) {
          warn$2(`App already provides property with key "${String(key2)}". It will be overwritten with the new value.`);
        }
        context.provides[key2] = value;
        return app;
      }
    };
    return app;
  };
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend$1({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$2("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$2(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise$1(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$2(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$2(setupResult)) {
    if (isVNode(setupResult)) {
      warn$2(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$2(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$2(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn$2(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key2) {
        track(instance, "get", "$attrs");
        return target[key2];
      },
      set() {
        warn$2(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$2(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$2(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray$5(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$2(`expose() should be passed a plain object, received ${exposedType}.`);
        }
      }
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key2) {
        if (key2 in target) {
          return target[key2];
        }
        return instance.proxy[key2];
      },
      has(target, key2) {
        return key2 in target || key2 in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction$1(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key2 in registry) {
        if (registry[key2] === Component2) {
          return key2;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version$1 = "3.2.47";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff$1(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key2 in pre) {
      const currentValue = current[key2];
      if (currentValue === void 0) {
        current[key2] = null;
      } else {
        syncKeys(currentValue, pre[key2]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key2 in current) {
        const currentValue = unwrapper(current[key2]);
        const preValue = pre[key2];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key2, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key2, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key2, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key2 + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key2, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key2 + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i2 = 0; i2 < copies.length; i2++) {
      copies[i2]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
        /* ErrorCodes.SCHEDULER */
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone$2(src2, seen) {
  src2 = unwrapper(src2);
  const type = typeof src2;
  if (type === "object" && src2 !== null) {
    let copy = seen.get(src2);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray$5(src2)) {
      const len = src2.length;
      copy = new Array(len);
      seen.set(src2, copy);
      for (let i2 = 0; i2 < len; i2++) {
        copy[i2] = clone$2(src2[i2], seen);
      }
    } else {
      copy = {};
      seen.set(src2, copy);
      for (const name in src2) {
        if (hasOwn$2(src2, name)) {
          copy[name] = clone$2(src2[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src2;
  }
}
function deepCopy(src2) {
  return clone$2(src2, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys2) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys2.forEach((key2) => {
    ret[key2] = data[key2];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys2 = Object.keys(data);
    const diffData = diff$1(data, oldData || getMPInstanceData(mpInstance, keys2));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options2, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options2, instance, publicThis);
  const computedOptions = options2.computed;
  if (computedOptions) {
    const keys2 = Object.keys(computedOptions);
    if (keys2.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys2);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat($scope.selectAllComponents(".r-i-f") || [])
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$2(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r, f: f2 }, refValue, setupState) {
  if (isFunction$1(r)) {
    r(refValue, {});
  } else {
    const _isString = isString$2(r);
    const _isRef = isRef(r);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray$5(r.value)) {
          r.value = [];
        }
        const existing = r.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn$2(setupState, r)) {
          setupState[r] = refValue;
        }
      } else if (isRef(r)) {
        r.value = refValue;
      } else {
        warnRef(r);
      }
    } else {
      warnRef(r);
    }
  }
}
function warnRef(ref2) {
  warn$2("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options2) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options2.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options2.mpType === "app") {
    instance.render = NOOP;
  }
  if (options2.onBeforeSetup) {
    options2.onBeforeSetup(instance, options2);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options2.parentComponent && instance.proxy) {
      options2.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key2 in attrs) {
    if (key2 === "class" || key2 === "style" || isOn(key2)) {
      (res || (res = {}))[key2] = attrs[key2];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys2 = Object.keys(fallthroughAttrs2).filter((key2) => key2 !== "class" && key2 !== "style");
    if (!keys2.length) {
      return;
    }
    if (propsOptions && keys2.some(isModelListener)) {
      keys2.forEach((key2) => {
        if (!isModelListener(key2) || !(key2.slice(9) in propsOptions)) {
          props[key2] = fallthroughAttrs2[key2];
        }
      });
    } else {
      keys2.forEach((key2) => props[key2] = fallthroughAttrs2[key2]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString$2(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff$1(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update: update3 }, allowed) {
  effect.allowRecurse = update3.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope
    // track it in component's effect scope
  );
  const update3 = instance.update = effect.run.bind(effect);
  update3.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update3.ownerInstance = instance;
  }
  update3();
}
function unmountComponent(instance) {
  const { bum, scope, update: update3, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update3) {
    update3.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options2) {
    return mountComponent(createVNode(initialVNode), options2);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version$1);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn$2(`Cannot unmount an app.`);
  };
  return app;
}
function useCssVars(getter) {
  const instance = getCurrentInstance();
  if (!instance) {
    warn$2(`useCssVars is called without current active component instance.`);
    return;
  }
  initCssVarsRender(instance, getter);
}
function initCssVarsRender(instance, getter) {
  instance.ctx.__cssVars = () => {
    const vars = getter(instance.proxy);
    const cssVars = {};
    for (const key2 in vars) {
      cssVars[`--${key2}`] = vars[key2];
    }
    return cssVars;
  };
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction$1(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options2, instance, publicThis) {
  const mpType = options2.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options2).forEach((name) => {
    if (isUniLifecycleHook(name, options2[name], false)) {
      const hooks2 = options2[name];
      if (isArray$5(hooks2)) {
        hooks2.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks2, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options2, instance, publicThis) {
  initHooks$1(options2, instance, publicThis);
}
function set$3(target, key2, val) {
  return target[key2] = val;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to2, from2) {
  return to2 ? [...new Set([].concat(to2, from2))] : from2;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i2 = 0;
    for (; i2 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i2++)) << 18 | b64.indexOf(str.charAt(i2++)) << 12 | (r1 = b64.indexOf(str.charAt(i2++))) << 6 | (r2 = b64.indexOf(str.charAt(i2++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token2 = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token2.split(".");
  if (!token2 || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set$3;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key2) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key2 !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString$2(key2) || typeof key2 === "number") ? "_" + key2 : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray$5(res) || isPromise$1(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$2(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$2(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn$2(event.detail, "checked") && !hasOwn$2(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend$1({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$5(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray$5(source) || isString$2(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l = source.length; i2 < l; i2++) {
      ret[i2] = renderItem(source[i2], i2, i2);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$2(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, i2);
    }
  } else if (isObject$2(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys2 = Object.keys(source);
      ret = new Array(keys2.length);
      for (let i2 = 0, l = keys2.length; i2 < l; i2++) {
        const key2 = keys2[i2];
        ret[i2] = renderItem(source[key2], key2, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString$2(value)) {
    return value;
  }
  return stringify$2(normalizeStyle(value));
}
function stringify$2(styles) {
  let ret = "";
  if (!styles || isString$2(styles)) {
    return ret;
  }
  for (const key2 in styles) {
    ret += `${key2.startsWith(`--`) ? key2 : hyphenate(key2)}:${styles[key2]};`;
  }
  return ret;
}
const o = (value, key2) => vOn(value, key2);
const f = (source, renderItem) => vFor(source, renderItem);
const s = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend$1(target, ...sources);
const n = (value) => normalizeClass(value);
const t$1 = (val) => toDisplayString(val);
const p = (props) => renderProps(props);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options2) {
  const ctx = instance.ctx;
  ctx.mpType = options2.mpType;
  ctx.$mpType = options2.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options2.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray$5(options2.slots) && options2.slots.length) {
    options2.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options2.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options2) {
  initBaseInstance(instance, options2);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock2) => {
    if (hasOwn$2(mpInstance, mock2)) {
      instance[mock2] = ctx[mock2] = mpInstance[mock2];
    }
  });
}
function hasHook(name) {
  const hooks2 = this.$[name];
  if (hooks2 && hooks2.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks2 = this.$[name];
  return hooks2 && invokeArrayFns(hooks2, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks2 = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks2.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks2));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks2);
      }
    }
  }
  return hooks2;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$2(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks2, excludes = EXCLUDE_HOOKS) {
  hooks2.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks2 = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks2.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction$1(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray$5(mixins)) {
      const hooks2 = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks2.forEach((hook) => {
          if (hasOwn$2(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options2) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options2);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend$1(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = isFunction$1(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$2(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$2(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction$1(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction$1(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction$1(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale2 = ref(normalizeLocale$1(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale2.value;
    },
    set(v) {
      locale2.value = v;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$2(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray$5(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    const childVm = $children[i2];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    parentVm = findVmByVueId($children[i2], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options2, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options2.behaviors) {
    if (options2.behaviors.includes("wx://form-field")) {
      if (!options2.properties || !options2.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options2.properties || !options2.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options2) {
  const properties = {};
  {
    if (options2 && options2.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend$1(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray$5(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray$5(rawProps)) {
    rawProps.forEach((key2) => {
      properties[key2] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key2) => {
      const opts = rawProps[key2];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction$1(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key2] = {
          type: opts.type,
          value
        };
      } else {
        properties[key2] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray$5(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key2 = nextKeys[i2];
    if (nextProps[key2] !== prevProps[key2]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray$5(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray$5(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options2 = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray$5(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$2(item.options)) {
        extend$1(options2, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend$1(options2, vueOptions.options);
  }
  const mpComponentOptions = {
    options: options2,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options2) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options2);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options2, isComponent) {
  const oldHook = options2[name];
  if (!oldHook) {
    options2[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options2[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options2) {
  initMiniProgramHook(ON_LOAD, options2);
  return MPPage(options2);
};
Component = function(options2) {
  initMiniProgramHook("created", options2);
  const isVueComponent = options2.properties && options2.properties.uP;
  if (!isVueComponent) {
    initProps(options2);
    initPropsObserver(options2);
  }
  return MPComponent(options2);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options2) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options2);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var f2 = n2.default;
  if (typeof f2 == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        var args = [null];
        args.push.apply(args, arguments);
        var Ctor = Function.bind.apply(f2, args);
        return new Ctor();
      }
      return f2.apply(this, arguments);
    };
    a.prototype = f2.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n2, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n2[k];
      }
    });
  });
  return a;
}
var cryptoJsExports = {};
var cryptoJs = {
  get exports() {
    return cryptoJsExports;
  },
  set exports(v) {
    cryptoJsExports = v;
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
  set exports(v) {
    coreExports = v;
  }
};
const __viteBrowserExternal = new Proxy({}, {
  get(_, key2) {
    throw new Error(`Module "" has been externalized for browser compatibility. Cannot access ".${key2}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
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
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory();
      }
    })(commonjsGlobal, function() {
      var CryptoJS2 = CryptoJS2 || function(Math2, undefined$12) {
        var crypto;
        if (typeof window !== "undefined" && window.crypto) {
          crypto = window.crypto;
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
          function F() {
          }
          return function(obj2) {
            var subtype;
            F.prototype = obj2;
            subtype = new F();
            F.prototype = null;
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
              for (var j = 0; j < thatSigBytes; j += 4) {
                thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
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
            var clone2 = Base.clone.call(this);
            clone2.words = this.words.slice(0);
            return clone2;
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
            } catch (e2) {
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
              for (var offset2 = 0; offset2 < nWordsReady; offset2 += blockSize) {
                this._doProcessBlock(dataWords, offset2);
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
            var clone2 = Base.clone.call(this);
            clone2._data = this._data.clone();
            return clone2;
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
            return function(message, key2) {
              return new C_algo.HMAC.init(hasher, key2).finalize(message);
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
  set exports(v) {
    x64CoreExports = v;
  }
};
var hasRequiredX64Core;
function requireX64Core() {
  if (hasRequiredX64Core)
    return x64CoreExports;
  hasRequiredX64Core = 1;
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory(requireCore());
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
            var clone2 = Base.clone.call(this);
            var words = clone2.words = this.words.slice(0);
            var wordsLength = words.length;
            for (var i2 = 0; i2 < wordsLength; i2++) {
              words[i2] = words[i2].clone();
            }
            return clone2;
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
  set exports(v) {
    libTypedarraysExports = v;
  }
};
var hasRequiredLibTypedarrays;
function requireLibTypedarrays() {
  if (hasRequiredLibTypedarrays)
    return libTypedarraysExports;
  hasRequiredLibTypedarrays = 1;
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory(requireCore());
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
  set exports(v) {
    encUtf16Exports = v;
  }
};
var hasRequiredEncUtf16;
function requireEncUtf16() {
  if (hasRequiredEncUtf16)
    return encUtf16Exports;
  hasRequiredEncUtf16 = 1;
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory(requireCore());
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
  set exports(v) {
    encBase64Exports = v;
  }
};
var hasRequiredEncBase64;
function requireEncBase64() {
  if (hasRequiredEncBase64)
    return encBase64Exports;
  hasRequiredEncBase64 = 1;
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory(requireCore());
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
            var map2 = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i2 = 0; i2 < sigBytes; i2 += 3) {
              var byte1 = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
              var byte2 = words[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255;
              var byte3 = words[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i2 + j * 0.75 < sigBytes; j++) {
                base64Chars.push(map2.charAt(triplet >>> 6 * (3 - j) & 63));
              }
            }
            var paddingChar = map2.charAt(64);
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
            var map2 = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map2.length; j++) {
                reverseMap[map2.charCodeAt(j)] = j;
              }
            }
            var paddingChar = map2.charAt(64);
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
  set exports(v) {
    encBase64urlExports = v;
  }
};
var hasRequiredEncBase64url;
function requireEncBase64url() {
  if (hasRequiredEncBase64url)
    return encBase64urlExports;
  hasRequiredEncBase64url = 1;
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory(requireCore());
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
            var map2 = urlSafe ? this._safe_map : this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i2 = 0; i2 < sigBytes; i2 += 3) {
              var byte1 = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
              var byte2 = words[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255;
              var byte3 = words[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i2 + j * 0.75 < sigBytes; j++) {
                base64Chars.push(map2.charAt(triplet >>> 6 * (3 - j) & 63));
              }
            }
            var paddingChar = map2.charAt(64);
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
            var map2 = urlSafe ? this._safe_map : this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map2.length; j++) {
                reverseMap[map2.charCodeAt(j)] = j;
              }
            }
            var paddingChar = map2.charAt(64);
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
  set exports(v) {
    md5Exports = v;
  }
};
var hasRequiredMd5;
function requireMd5() {
  if (hasRequiredMd5)
    return md5Exports;
  hasRequiredMd5 = 1;
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory(requireCore());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      (function(Math2) {
        var C = CryptoJS2;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T = [];
        (function() {
          for (var i2 = 0; i2 < 64; i2++) {
            T[i2] = Math2.abs(Math2.sin(i2 + 1)) * 4294967296 | 0;
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
          _doProcessBlock: function(M, offset2) {
            for (var i2 = 0; i2 < 16; i2++) {
              var offset_i = offset2 + i2;
              var M_offset_i = M[offset_i];
              M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset2 + 0];
            var M_offset_1 = M[offset2 + 1];
            var M_offset_2 = M[offset2 + 2];
            var M_offset_3 = M[offset2 + 3];
            var M_offset_4 = M[offset2 + 4];
            var M_offset_5 = M[offset2 + 5];
            var M_offset_6 = M[offset2 + 6];
            var M_offset_7 = M[offset2 + 7];
            var M_offset_8 = M[offset2 + 8];
            var M_offset_9 = M[offset2 + 9];
            var M_offset_10 = M[offset2 + 10];
            var M_offset_11 = M[offset2 + 11];
            var M_offset_12 = M[offset2 + 12];
            var M_offset_13 = M[offset2 + 13];
            var M_offset_14 = M[offset2 + 14];
            var M_offset_15 = M[offset2 + 15];
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);
            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
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
            var H = hash.words;
            for (var i2 = 0; i2 < 4; i2++) {
              var H_i = H[i2];
              H[i2] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
            }
            return hash;
          },
          clone: function() {
            var clone2 = Hasher.clone.call(this);
            clone2._hash = this._hash.clone();
            return clone2;
          }
        });
        function FF(a, b, c, d, x, s2, t2) {
          var n2 = a + (b & c | ~b & d) + x + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b;
        }
        function GG(a, b, c, d, x, s2, t2) {
          var n2 = a + (b & d | c & ~d) + x + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b;
        }
        function HH(a, b, c, d, x, s2, t2) {
          var n2 = a + (b ^ c ^ d) + x + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b;
        }
        function II(a, b, c, d, x, s2, t2) {
          var n2 = a + (c ^ (b | ~d)) + x + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b;
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
  set exports(v) {
    sha1Exports = v;
  }
};
var hasRequiredSha1;
function requireSha1() {
  if (hasRequiredSha1)
    return sha1Exports;
  hasRequiredSha1 = 1;
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory(requireCore());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      (function() {
        var C = CryptoJS2;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
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
          _doProcessBlock: function(M, offset2) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e2 = H[4];
            for (var i2 = 0; i2 < 80; i2++) {
              if (i2 < 16) {
                W[i2] = M[offset2 + i2] | 0;
              } else {
                var n2 = W[i2 - 3] ^ W[i2 - 8] ^ W[i2 - 14] ^ W[i2 - 16];
                W[i2] = n2 << 1 | n2 >>> 31;
              }
              var t2 = (a << 5 | a >>> 27) + e2 + W[i2];
              if (i2 < 20) {
                t2 += (b & c | ~b & d) + 1518500249;
              } else if (i2 < 40) {
                t2 += (b ^ c ^ d) + 1859775393;
              } else if (i2 < 60) {
                t2 += (b & c | b & d | c & d) - 1894007588;
              } else {
                t2 += (b ^ c ^ d) - 899497514;
              }
              e2 = d;
              d = c;
              c = b << 30 | b >>> 2;
              b = a;
              a = t2;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e2 | 0;
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
            var clone2 = Hasher.clone.call(this);
            clone2._hash = this._hash.clone();
            return clone2;
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
  set exports(v) {
    sha256Exports = v;
  }
};
var hasRequiredSha256;
function requireSha256() {
  if (hasRequiredSha256)
    return sha256Exports;
  hasRequiredSha256 = 1;
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory(requireCore());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      (function(Math2) {
        var C = CryptoJS2;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var H = [];
        var K = [];
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
                H[nPrime] = getFractionalBits(Math2.pow(n2, 1 / 2));
              }
              K[nPrime] = getFractionalBits(Math2.pow(n2, 1 / 3));
              nPrime++;
            }
            n2++;
          }
        })();
        var W = [];
        var SHA256 = C_algo.SHA256 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init(H.slice(0));
          },
          _doProcessBlock: function(M, offset2) {
            var H2 = this._hash.words;
            var a = H2[0];
            var b = H2[1];
            var c = H2[2];
            var d = H2[3];
            var e2 = H2[4];
            var f2 = H2[5];
            var g = H2[6];
            var h = H2[7];
            for (var i2 = 0; i2 < 64; i2++) {
              if (i2 < 16) {
                W[i2] = M[offset2 + i2] | 0;
              } else {
                var gamma0x = W[i2 - 15];
                var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                var gamma1x = W[i2 - 2];
                var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                W[i2] = gamma0 + W[i2 - 7] + gamma1 + W[i2 - 16];
              }
              var ch = e2 & f2 ^ ~e2 & g;
              var maj = a & b ^ a & c ^ b & c;
              var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
              var sigma1 = (e2 << 26 | e2 >>> 6) ^ (e2 << 21 | e2 >>> 11) ^ (e2 << 7 | e2 >>> 25);
              var t1 = h + sigma1 + ch + K[i2] + W[i2];
              var t2 = sigma0 + maj;
              h = g;
              g = f2;
              f2 = e2;
              e2 = d + t1 | 0;
              d = c;
              c = b;
              b = a;
              a = t1 + t2 | 0;
            }
            H2[0] = H2[0] + a | 0;
            H2[1] = H2[1] + b | 0;
            H2[2] = H2[2] + c | 0;
            H2[3] = H2[3] + d | 0;
            H2[4] = H2[4] + e2 | 0;
            H2[5] = H2[5] + f2 | 0;
            H2[6] = H2[6] + g | 0;
            H2[7] = H2[7] + h | 0;
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
            var clone2 = Hasher.clone.call(this);
            clone2._hash = this._hash.clone();
            return clone2;
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
  set exports(v) {
    sha224Exports = v;
  }
};
var hasRequiredSha224;
function requireSha224() {
  if (hasRequiredSha224)
    return sha224Exports;
  hasRequiredSha224 = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireSha256());
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
  set exports(v) {
    sha512Exports = v;
  }
};
var hasRequiredSha512;
function requireSha512() {
  if (hasRequiredSha512)
    return sha512Exports;
  hasRequiredSha512 = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireX64Core());
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
        var K = [
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
        var W = [];
        (function() {
          for (var i2 = 0; i2 < 80; i2++) {
            W[i2] = X64Word_create();
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
          _doProcessBlock: function(M, offset2) {
            var H = this._hash.words;
            var H0 = H[0];
            var H1 = H[1];
            var H2 = H[2];
            var H3 = H[3];
            var H4 = H[4];
            var H5 = H[5];
            var H6 = H[6];
            var H7 = H[7];
            var H0h = H0.high;
            var H0l = H0.low;
            var H1h = H1.high;
            var H1l = H1.low;
            var H2h = H2.high;
            var H2l = H2.low;
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
              var Wi = W[i2];
              if (i2 < 16) {
                Wih = Wi.high = M[offset2 + i2 * 2] | 0;
                Wil = Wi.low = M[offset2 + i2 * 2 + 1] | 0;
              } else {
                var gamma0x = W[i2 - 15];
                var gamma0xh = gamma0x.high;
                var gamma0xl = gamma0x.low;
                var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                var gamma1x = W[i2 - 2];
                var gamma1xh = gamma1x.high;
                var gamma1xl = gamma1x.low;
                var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                var Wi7 = W[i2 - 7];
                var Wi7h = Wi7.high;
                var Wi7l = Wi7.low;
                var Wi16 = W[i2 - 16];
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
              var Ki = K[i2];
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
            H2l = H2.low = H2l + cl;
            H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
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
            var clone2 = Hasher.clone.call(this);
            clone2._hash = this._hash.clone();
            return clone2;
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
  set exports(v) {
    sha384Exports = v;
  }
};
var hasRequiredSha384;
function requireSha384() {
  if (hasRequiredSha384)
    return sha384Exports;
  hasRequiredSha384 = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireX64Core(), requireSha512());
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
  set exports(v) {
    sha3Exports = v;
  }
};
var hasRequiredSha3;
function requireSha3() {
  if (hasRequiredSha3)
    return sha3Exports;
  hasRequiredSha3 = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireX64Core());
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
          var x = 1, y = 0;
          for (var t2 = 0; t2 < 24; t2++) {
            RHO_OFFSETS[x + 5 * y] = (t2 + 1) * (t2 + 2) / 2 % 64;
            var newX = y % 5;
            var newY = (2 * x + 3 * y) % 5;
            x = newX;
            y = newY;
          }
          for (var x = 0; x < 5; x++) {
            for (var y = 0; y < 5; y++) {
              PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
            }
          }
          var LFSR = 1;
          for (var i2 = 0; i2 < 24; i2++) {
            var roundConstantMsw = 0;
            var roundConstantLsw = 0;
            for (var j = 0; j < 7; j++) {
              if (LFSR & 1) {
                var bitPosition = (1 << j) - 1;
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
        var T = [];
        (function() {
          for (var i2 = 0; i2 < 25; i2++) {
            T[i2] = X64Word.create();
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
          _doProcessBlock: function(M, offset2) {
            var state = this._state;
            var nBlockSizeLanes = this.blockSize / 2;
            for (var i2 = 0; i2 < nBlockSizeLanes; i2++) {
              var M2i = M[offset2 + 2 * i2];
              var M2i1 = M[offset2 + 2 * i2 + 1];
              M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
              M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
              var lane = state[i2];
              lane.high ^= M2i1;
              lane.low ^= M2i;
            }
            for (var round2 = 0; round2 < 24; round2++) {
              for (var x = 0; x < 5; x++) {
                var tMsw = 0, tLsw = 0;
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  tMsw ^= lane.high;
                  tLsw ^= lane.low;
                }
                var Tx = T[x];
                Tx.high = tMsw;
                Tx.low = tLsw;
              }
              for (var x = 0; x < 5; x++) {
                var Tx4 = T[(x + 4) % 5];
                var Tx1 = T[(x + 1) % 5];
                var Tx1Msw = Tx1.high;
                var Tx1Lsw = Tx1.low;
                var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
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
                var TPiLane = T[PI_INDEXES[laneIndex]];
                TPiLane.high = tMsw;
                TPiLane.low = tLsw;
              }
              var T0 = T[0];
              var state0 = state[0];
              T0.high = state0.high;
              T0.low = state0.low;
              for (var x = 0; x < 5; x++) {
                for (var y = 0; y < 5; y++) {
                  var laneIndex = x + 5 * y;
                  var lane = state[laneIndex];
                  var TLane = T[laneIndex];
                  var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                  var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                  lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                  lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                }
              }
              var lane = state[0];
              var roundConstant = ROUND_CONSTANTS[round2];
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
            var clone2 = Hasher.clone.call(this);
            var state = clone2._state = this._state.slice(0);
            for (var i2 = 0; i2 < 25; i2++) {
              state[i2] = state[i2].clone();
            }
            return clone2;
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
  set exports(v) {
    ripemd160Exports = v;
  }
};
var hasRequiredRipemd160;
function requireRipemd160() {
  if (hasRequiredRipemd160)
    return ripemd160Exports;
  hasRequiredRipemd160 = 1;
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory(requireCore());
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
          _doProcessBlock: function(M, offset2) {
            for (var i2 = 0; i2 < 16; i2++) {
              var offset_i = offset2 + i2;
              var M_offset_i = M[offset_i];
              M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
            }
            var H = this._hash.words;
            var hl = _hl.words;
            var hr = _hr.words;
            var zl = _zl.words;
            var zr = _zr.words;
            var sl = _sl.words;
            var sr = _sr.words;
            var al, bl, cl, dl, el;
            var ar, br, cr, dr, er;
            ar = al = H[0];
            br = bl = H[1];
            cr = cl = H[2];
            dr = dl = H[3];
            er = el = H[4];
            var t2;
            for (var i2 = 0; i2 < 80; i2 += 1) {
              t2 = al + M[offset2 + zl[i2]] | 0;
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
              t2 = ar + M[offset2 + zr[i2]] | 0;
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
            t2 = H[1] + cl + dr | 0;
            H[1] = H[2] + dl + er | 0;
            H[2] = H[3] + el + ar | 0;
            H[3] = H[4] + al + br | 0;
            H[4] = H[0] + bl + cr | 0;
            H[0] = t2;
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
            var H = hash.words;
            for (var i2 = 0; i2 < 5; i2++) {
              var H_i = H[i2];
              H[i2] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
            }
            return hash;
          },
          clone: function() {
            var clone2 = Hasher.clone.call(this);
            clone2._hash = this._hash.clone();
            return clone2;
          }
        });
        function f1(x, y, z2) {
          return x ^ y ^ z2;
        }
        function f2(x, y, z2) {
          return x & y | ~x & z2;
        }
        function f3(x, y, z2) {
          return (x | ~y) ^ z2;
        }
        function f4(x, y, z2) {
          return x & z2 | y & ~z2;
        }
        function f5(x, y, z2) {
          return x ^ (y | ~z2);
        }
        function rotl(x, n2) {
          return x << n2 | x >>> 32 - n2;
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
  set exports(v) {
    hmacExports = v;
  }
};
var hasRequiredHmac;
function requireHmac() {
  if (hasRequiredHmac)
    return hmacExports;
  hasRequiredHmac = 1;
  (function(module2, exports2) {
    (function(root, factory) {
      {
        module2.exports = factory(requireCore());
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
          init: function(hasher, key2) {
            hasher = this._hasher = new hasher.init();
            if (typeof key2 == "string") {
              key2 = Utf8.parse(key2);
            }
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = hasherBlockSize * 4;
            if (key2.sigBytes > hasherBlockSizeBytes) {
              key2 = hasher.finalize(key2);
            }
            key2.clamp();
            var oKey = this._oKey = key2.clone();
            var iKey = this._iKey = key2.clone();
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
  set exports(v) {
    pbkdf2Exports = v;
  }
};
var hasRequiredPbkdf2;
function requirePbkdf2() {
  if (hasRequiredPbkdf2)
    return pbkdf2Exports;
  hasRequiredPbkdf2 = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireSha1(), requireHmac());
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
                for (var j = 0; j < blockWordsLength; j++) {
                  blockWords[j] ^= intermediateWords[j];
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
  set exports(v) {
    evpkdfExports = v;
  }
};
var hasRequiredEvpkdf;
function requireEvpkdf() {
  if (hasRequiredEvpkdf)
    return evpkdfExports;
  hasRequiredEvpkdf = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireSha1(), requireHmac());
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
  set exports(v) {
    cipherCoreExports = v;
  }
};
var hasRequiredCipherCore;
function requireCipherCore() {
  if (hasRequiredCipherCore)
    return cipherCoreExports;
  hasRequiredCipherCore = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireEvpkdf());
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
          createEncryptor: function(key2, cfg) {
            return this.create(this._ENC_XFORM_MODE, key2, cfg);
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
          createDecryptor: function(key2, cfg) {
            return this.create(this._DEC_XFORM_MODE, key2, cfg);
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
          init: function(xformMode, key2, cfg) {
            this.cfg = this.cfg.extend(cfg);
            this._xformMode = xformMode;
            this._key = key2;
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
            function selectCipherStrategy(key2) {
              if (typeof key2 == "string") {
                return PasswordBasedCipher;
              } else {
                return SerializableCipher;
              }
            }
            return function(cipher) {
              return {
                encrypt: function(message, key2, cfg) {
                  return selectCipherStrategy(key2).encrypt(cipher, message, key2, cfg);
                },
                decrypt: function(ciphertext, key2, cfg) {
                  return selectCipherStrategy(key2).decrypt(cipher, ciphertext, key2, cfg);
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
            processBlock: function(words, offset2) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              xorBlock.call(this, words, offset2, blockSize);
              cipher.encryptBlock(words, offset2);
              this._prevBlock = words.slice(offset2, offset2 + blockSize);
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
            processBlock: function(words, offset2) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset2, offset2 + blockSize);
              cipher.decryptBlock(words, offset2);
              xorBlock.call(this, words, offset2, blockSize);
              this._prevBlock = thisBlock;
            }
          });
          function xorBlock(words, offset2, blockSize) {
            var block;
            var iv = this._iv;
            if (iv) {
              block = iv;
              this._iv = undefined$12;
            } else {
              block = this._prevBlock;
            }
            for (var i2 = 0; i2 < blockSize; i2++) {
              words[offset2 + i2] ^= block[i2];
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
          _doProcessBlock: function(words, offset2) {
            this._mode.processBlock(words, offset2);
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
          encrypt: function(cipher, message, key2, cfg) {
            cfg = this.cfg.extend(cfg);
            var encryptor = cipher.createEncryptor(key2, cfg);
            var ciphertext = encryptor.finalize(message);
            var cipherCfg = encryptor.cfg;
            return CipherParams.create({
              ciphertext,
              key: key2,
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
          decrypt: function(cipher, ciphertext, key2, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var plaintext = cipher.createDecryptor(key2, cfg).finalize(ciphertext.ciphertext);
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
          _parse: function(ciphertext, format2) {
            if (typeof ciphertext == "string") {
              return format2.parse(ciphertext, this);
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
            var key2 = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
            var iv = WordArray.create(key2.words.slice(keySize), ivSize * 4);
            key2.sigBytes = keySize * 4;
            return CipherParams.create({ key: key2, iv, salt });
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
  set exports(v) {
    modeCfbExports = v;
  }
};
var hasRequiredModeCfb;
function requireModeCfb() {
  if (hasRequiredModeCfb)
    return modeCfbExports;
  hasRequiredModeCfb = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      CryptoJS2.mode.CFB = function() {
        var CFB = CryptoJS2.lib.BlockCipherMode.extend();
        CFB.Encryptor = CFB.extend({
          processBlock: function(words, offset2) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            generateKeystreamAndEncrypt.call(this, words, offset2, blockSize, cipher);
            this._prevBlock = words.slice(offset2, offset2 + blockSize);
          }
        });
        CFB.Decryptor = CFB.extend({
          processBlock: function(words, offset2) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var thisBlock = words.slice(offset2, offset2 + blockSize);
            generateKeystreamAndEncrypt.call(this, words, offset2, blockSize, cipher);
            this._prevBlock = thisBlock;
          }
        });
        function generateKeystreamAndEncrypt(words, offset2, blockSize, cipher) {
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
            words[offset2 + i2] ^= keystream[i2];
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
  set exports(v) {
    modeCtrExports = v;
  }
};
var hasRequiredModeCtr;
function requireModeCtr() {
  if (hasRequiredModeCtr)
    return modeCtrExports;
  hasRequiredModeCtr = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      CryptoJS2.mode.CTR = function() {
        var CTR = CryptoJS2.lib.BlockCipherMode.extend();
        var Encryptor = CTR.Encryptor = CTR.extend({
          processBlock: function(words, offset2) {
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
              words[offset2 + i2] ^= keystream[i2];
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
  set exports(v) {
    modeCtrGladmanExports = v;
  }
};
var hasRequiredModeCtrGladman;
function requireModeCtrGladman() {
  if (hasRequiredModeCtrGladman)
    return modeCtrGladmanExports;
  hasRequiredModeCtrGladman = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
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
          processBlock: function(words, offset2) {
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
              words[offset2 + i2] ^= keystream[i2];
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
  set exports(v) {
    modeOfbExports = v;
  }
};
var hasRequiredModeOfb;
function requireModeOfb() {
  if (hasRequiredModeOfb)
    return modeOfbExports;
  hasRequiredModeOfb = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      CryptoJS2.mode.OFB = function() {
        var OFB = CryptoJS2.lib.BlockCipherMode.extend();
        var Encryptor = OFB.Encryptor = OFB.extend({
          processBlock: function(words, offset2) {
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
              words[offset2 + i2] ^= keystream[i2];
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
  set exports(v) {
    modeEcbExports = v;
  }
};
var hasRequiredModeEcb;
function requireModeEcb() {
  if (hasRequiredModeEcb)
    return modeEcbExports;
  hasRequiredModeEcb = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      CryptoJS2.mode.ECB = function() {
        var ECB = CryptoJS2.lib.BlockCipherMode.extend();
        ECB.Encryptor = ECB.extend({
          processBlock: function(words, offset2) {
            this._cipher.encryptBlock(words, offset2);
          }
        });
        ECB.Decryptor = ECB.extend({
          processBlock: function(words, offset2) {
            this._cipher.decryptBlock(words, offset2);
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
  set exports(v) {
    padAnsix923Exports = v;
  }
};
var hasRequiredPadAnsix923;
function requirePadAnsix923() {
  if (hasRequiredPadAnsix923)
    return padAnsix923Exports;
  hasRequiredPadAnsix923 = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
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
  set exports(v) {
    padIso10126Exports = v;
  }
};
var hasRequiredPadIso10126;
function requirePadIso10126() {
  if (hasRequiredPadIso10126)
    return padIso10126Exports;
  hasRequiredPadIso10126 = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
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
  set exports(v) {
    padIso97971Exports = v;
  }
};
var hasRequiredPadIso97971;
function requirePadIso97971() {
  if (hasRequiredPadIso97971)
    return padIso97971Exports;
  hasRequiredPadIso97971 = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
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
  set exports(v) {
    padZeropaddingExports = v;
  }
};
var hasRequiredPadZeropadding;
function requirePadZeropadding() {
  if (hasRequiredPadZeropadding)
    return padZeropaddingExports;
  hasRequiredPadZeropadding = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
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
  set exports(v) {
    padNopaddingExports = v;
  }
};
var hasRequiredPadNopadding;
function requirePadNopadding() {
  if (hasRequiredPadNopadding)
    return padNopaddingExports;
  hasRequiredPadNopadding = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
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
  set exports(v) {
    formatHexExports = v;
  }
};
var hasRequiredFormatHex;
function requireFormatHex() {
  if (hasRequiredFormatHex)
    return formatHexExports;
  hasRequiredFormatHex = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireCipherCore());
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
  set exports(v) {
    aesExports = v;
  }
};
var hasRequiredAes;
function requireAes() {
  if (hasRequiredAes)
    return aesExports;
  hasRequiredAes = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
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
          var d = [];
          for (var i2 = 0; i2 < 256; i2++) {
            if (i2 < 128) {
              d[i2] = i2 << 1;
            } else {
              d[i2] = i2 << 1 ^ 283;
            }
          }
          var x = 0;
          var xi = 0;
          for (var i2 = 0; i2 < 256; i2++) {
            var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
            sx = sx >>> 8 ^ sx & 255 ^ 99;
            SBOX[x] = sx;
            INV_SBOX[sx] = x;
            var x2 = d[x];
            var x4 = d[x2];
            var x8 = d[x4];
            var t2 = d[sx] * 257 ^ sx * 16843008;
            SUB_MIX_0[x] = t2 << 24 | t2 >>> 8;
            SUB_MIX_1[x] = t2 << 16 | t2 >>> 16;
            SUB_MIX_2[x] = t2 << 8 | t2 >>> 24;
            SUB_MIX_3[x] = t2;
            var t2 = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
            INV_SUB_MIX_0[sx] = t2 << 24 | t2 >>> 8;
            INV_SUB_MIX_1[sx] = t2 << 16 | t2 >>> 16;
            INV_SUB_MIX_2[sx] = t2 << 8 | t2 >>> 24;
            INV_SUB_MIX_3[sx] = t2;
            if (!x) {
              x = xi = 1;
            } else {
              x = x2 ^ d[d[d[x8 ^ x2]]];
              xi ^= d[d[xi]];
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
            var key2 = this._keyPriorReset = this._key;
            var keyWords = key2.words;
            var keySize = key2.sigBytes / 4;
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
          encryptBlock: function(M, offset2) {
            this._doCryptBlock(M, offset2, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
          },
          decryptBlock: function(M, offset2) {
            var t2 = M[offset2 + 1];
            M[offset2 + 1] = M[offset2 + 3];
            M[offset2 + 3] = t2;
            this._doCryptBlock(M, offset2, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
            var t2 = M[offset2 + 1];
            M[offset2 + 1] = M[offset2 + 3];
            M[offset2 + 3] = t2;
          },
          _doCryptBlock: function(M, offset2, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
            var nRounds = this._nRounds;
            var s0 = M[offset2] ^ keySchedule[0];
            var s1 = M[offset2 + 1] ^ keySchedule[1];
            var s2 = M[offset2 + 2] ^ keySchedule[2];
            var s3 = M[offset2 + 3] ^ keySchedule[3];
            var ksRow = 4;
            for (var round2 = 1; round2 < nRounds; round2++) {
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
            M[offset2] = t0;
            M[offset2 + 1] = t1;
            M[offset2 + 2] = t2;
            M[offset2 + 3] = t3;
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
  set exports(v) {
    tripledesExports = v;
  }
};
var hasRequiredTripledes;
function requireTripledes() {
  if (hasRequiredTripledes)
    return tripledesExports;
  hasRequiredTripledes = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
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
            var key2 = this._key;
            var keyWords = key2.words;
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
          encryptBlock: function(M, offset2) {
            this._doCryptBlock(M, offset2, this._subKeys);
          },
          decryptBlock: function(M, offset2) {
            this._doCryptBlock(M, offset2, this._invSubKeys);
          },
          _doCryptBlock: function(M, offset2, subKeys) {
            this._lBlock = M[offset2];
            this._rBlock = M[offset2 + 1];
            exchangeLR.call(this, 4, 252645135);
            exchangeLR.call(this, 16, 65535);
            exchangeRL.call(this, 2, 858993459);
            exchangeRL.call(this, 8, 16711935);
            exchangeLR.call(this, 1, 1431655765);
            for (var round2 = 0; round2 < 16; round2++) {
              var subKey = subKeys[round2];
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
            M[offset2] = this._lBlock;
            M[offset2 + 1] = this._rBlock;
          },
          keySize: 64 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        function exchangeLR(offset2, mask) {
          var t2 = (this._lBlock >>> offset2 ^ this._rBlock) & mask;
          this._rBlock ^= t2;
          this._lBlock ^= t2 << offset2;
        }
        function exchangeRL(offset2, mask) {
          var t2 = (this._rBlock >>> offset2 ^ this._lBlock) & mask;
          this._lBlock ^= t2;
          this._rBlock ^= t2 << offset2;
        }
        C.DES = BlockCipher._createHelper(DES);
        var TripleDES = C_algo.TripleDES = BlockCipher.extend({
          _doReset: function() {
            var key2 = this._key;
            var keyWords = key2.words;
            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            }
            var key1 = keyWords.slice(0, 2);
            var key22 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
            this._des1 = DES.createEncryptor(WordArray.create(key1));
            this._des2 = DES.createEncryptor(WordArray.create(key22));
            this._des3 = DES.createEncryptor(WordArray.create(key3));
          },
          encryptBlock: function(M, offset2) {
            this._des1.encryptBlock(M, offset2);
            this._des2.decryptBlock(M, offset2);
            this._des3.encryptBlock(M, offset2);
          },
          decryptBlock: function(M, offset2) {
            this._des3.decryptBlock(M, offset2);
            this._des2.encryptBlock(M, offset2);
            this._des1.decryptBlock(M, offset2);
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
  set exports(v) {
    rc4Exports = v;
  }
};
var hasRequiredRc4;
function requireRc4() {
  if (hasRequiredRc4)
    return rc4Exports;
  hasRequiredRc4 = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      (function() {
        var C = CryptoJS2;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var RC4 = C_algo.RC4 = StreamCipher.extend({
          _doReset: function() {
            var key2 = this._key;
            var keyWords = key2.words;
            var keySigBytes = key2.sigBytes;
            var S = this._S = [];
            for (var i2 = 0; i2 < 256; i2++) {
              S[i2] = i2;
            }
            for (var i2 = 0, j = 0; i2 < 256; i2++) {
              var keyByteIndex = i2 % keySigBytes;
              var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
              j = (j + S[i2] + keyByte) % 256;
              var t2 = S[i2];
              S[i2] = S[j];
              S[j] = t2;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function(M, offset2) {
            M[offset2] ^= generateKeystreamWord.call(this);
          },
          keySize: 256 / 32,
          ivSize: 0
        });
        function generateKeystreamWord() {
          var S = this._S;
          var i2 = this._i;
          var j = this._j;
          var keystreamWord = 0;
          for (var n2 = 0; n2 < 4; n2++) {
            i2 = (i2 + 1) % 256;
            j = (j + S[i2]) % 256;
            var t2 = S[i2];
            S[i2] = S[j];
            S[j] = t2;
            keystreamWord |= S[(S[i2] + S[j]) % 256] << 24 - n2 * 8;
          }
          this._i = i2;
          this._j = j;
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
  set exports(v) {
    rabbitExports = v;
  }
};
var hasRequiredRabbit;
function requireRabbit() {
  if (hasRequiredRabbit)
    return rabbitExports;
  hasRequiredRabbit = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      (function() {
        var C = CryptoJS2;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var Rabbit = C_algo.Rabbit = StreamCipher.extend({
          _doReset: function() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            for (var i2 = 0; i2 < 4; i2++) {
              K[i2] = (K[i2] << 8 | K[i2] >>> 24) & 16711935 | (K[i2] << 24 | K[i2] >>> 8) & 4278255360;
            }
            var X = this._X = [
              K[0],
              K[3] << 16 | K[2] >>> 16,
              K[1],
              K[0] << 16 | K[3] >>> 16,
              K[2],
              K[1] << 16 | K[0] >>> 16,
              K[3],
              K[2] << 16 | K[1] >>> 16
            ];
            var C2 = this._C = [
              K[2] << 16 | K[2] >>> 16,
              K[0] & 4294901760 | K[1] & 65535,
              K[3] << 16 | K[3] >>> 16,
              K[1] & 4294901760 | K[2] & 65535,
              K[0] << 16 | K[0] >>> 16,
              K[2] & 4294901760 | K[3] & 65535,
              K[1] << 16 | K[1] >>> 16,
              K[3] & 4294901760 | K[0] & 65535
            ];
            this._b = 0;
            for (var i2 = 0; i2 < 4; i2++) {
              nextState.call(this);
            }
            for (var i2 = 0; i2 < 8; i2++) {
              C2[i2] ^= X[i2 + 4 & 7];
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
          _doProcessBlock: function(M, offset2) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i2 = 0; i2 < 4; i2++) {
              S[i2] = (S[i2] << 8 | S[i2] >>> 24) & 16711935 | (S[i2] << 24 | S[i2] >>> 8) & 4278255360;
              M[offset2 + i2] ^= S[i2];
            }
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function nextState() {
          var X = this._X;
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
            var gx = X[i2] + C2[i2];
            var ga = gx & 65535;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
            G[i2] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
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
  set exports(v) {
    rabbitLegacyExports = v;
  }
};
var hasRequiredRabbitLegacy;
function requireRabbitLegacy() {
  if (hasRequiredRabbitLegacy)
    return rabbitLegacyExports;
  hasRequiredRabbitLegacy = 1;
  (function(module2, exports2) {
    (function(root, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
      }
    })(commonjsGlobal, function(CryptoJS2) {
      (function() {
        var C = CryptoJS2;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
          _doReset: function() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            var X = this._X = [
              K[0],
              K[3] << 16 | K[2] >>> 16,
              K[1],
              K[0] << 16 | K[3] >>> 16,
              K[2],
              K[1] << 16 | K[0] >>> 16,
              K[3],
              K[2] << 16 | K[1] >>> 16
            ];
            var C2 = this._C = [
              K[2] << 16 | K[2] >>> 16,
              K[0] & 4294901760 | K[1] & 65535,
              K[3] << 16 | K[3] >>> 16,
              K[1] & 4294901760 | K[2] & 65535,
              K[0] << 16 | K[0] >>> 16,
              K[2] & 4294901760 | K[3] & 65535,
              K[1] << 16 | K[1] >>> 16,
              K[3] & 4294901760 | K[0] & 65535
            ];
            this._b = 0;
            for (var i2 = 0; i2 < 4; i2++) {
              nextState.call(this);
            }
            for (var i2 = 0; i2 < 8; i2++) {
              C2[i2] ^= X[i2 + 4 & 7];
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
          _doProcessBlock: function(M, offset2) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i2 = 0; i2 < 4; i2++) {
              S[i2] = (S[i2] << 8 | S[i2] >>> 24) & 16711935 | (S[i2] << 24 | S[i2] >>> 8) & 4278255360;
              M[offset2 + i2] ^= S[i2];
            }
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function nextState() {
          var X = this._X;
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
            var gx = X[i2] + C2[i2];
            var ga = gx & 65535;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
            G[i2] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
      })();
      return CryptoJS2.RabbitLegacy;
    });
  })(rabbitLegacy);
  return rabbitLegacyExports;
}
(function(module2, exports2) {
  (function(root, factory, undef) {
    {
      module2.exports = factory(requireCore(), requireX64Core(), requireLibTypedarrays(), requireEncUtf16(), requireEncBase64(), requireEncBase64url(), requireMd5(), requireSha1(), requireSha256(), requireSha224(), requireSha512(), requireSha384(), requireSha3(), requireRipemd160(), requireHmac(), requirePbkdf2(), requireEvpkdf(), requireCipherCore(), requireModeCfb(), requireModeCtr(), requireModeCtrGladman(), requireModeOfb(), requireModeEcb(), requirePadAnsix923(), requirePadIso10126(), requirePadIso97971(), requirePadZeropadding(), requirePadNopadding(), requireFormatHex(), requireAes(), requireTripledes(), requireRc4(), requireRabbit(), requireRabbitLegacy());
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
function op_and(x, y) {
  return x & y;
}
function op_or(x, y) {
  return x | y;
}
function op_xor(x, y) {
  return x ^ y;
}
function op_andnot(x, y) {
  return x & ~y;
}
function lbit(x) {
  if (x == 0) {
    return -1;
  }
  var r = 0;
  if ((x & 65535) == 0) {
    x >>= 16;
    r += 16;
  }
  if ((x & 255) == 0) {
    x >>= 8;
    r += 8;
  }
  if ((x & 15) == 0) {
    x >>= 4;
    r += 4;
  }
  if ((x & 3) == 0) {
    x >>= 2;
    r += 2;
  }
  if ((x & 1) == 0) {
    ++r;
  }
  return r;
}
function cbit(x) {
  var r = 0;
  while (x != 0) {
    x &= x - 1;
    ++r;
  }
  return r;
}
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(h) {
  var i2;
  var c;
  var ret = "";
  for (i2 = 0; i2 + 3 <= h.length; i2 += 3) {
    c = parseInt(h.substring(i2, i2 + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i2 + 1 == h.length) {
    c = parseInt(h.substring(i2, i2 + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i2 + 2 == h.length) {
    c = parseInt(h.substring(i2, i2 + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }
  return ret;
}
function b64tohex(s2) {
  var ret = "";
  var i2;
  var k = 0;
  var slop = 0;
  for (i2 = 0; i2 < s2.length; ++i2) {
    if (s2.charAt(i2) == b64pad) {
      break;
    }
    var v = b64map.indexOf(s2.charAt(i2));
    if (v < 0) {
      continue;
    }
    if (k == 0) {
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 1;
    } else if (k == 1) {
      ret += int2char(slop << 2 | v >> 4);
      slop = v & 15;
      k = 2;
    } else if (k == 2) {
      ret += int2char(slop);
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 3;
    } else {
      ret += int2char(slop << 2 | v >> 4);
      ret += int2char(v & 15);
      k = 0;
    }
  }
  if (k == 1) {
    ret += int2char(slop << 2);
  }
  return ret;
}
var decoder$1;
var Hex = {
  decode: function(a) {
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
    for (i2 = 0; i2 < a.length; ++i2) {
      var c = a.charAt(i2);
      if (c == "=") {
        break;
      }
      c = decoder$1[c];
      if (c == -1) {
        continue;
      }
      if (c === void 0) {
        throw new Error("Illegal character at offset " + i2);
      }
      bits |= c;
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
  decode: function(a) {
    var i2;
    if (decoder === void 0) {
      var b642 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var ignore = "= \f\n\r	 \u2028\u2029";
      decoder = /* @__PURE__ */ Object.create(null);
      for (i2 = 0; i2 < 64; ++i2) {
        decoder[b642.charAt(i2)] = i2;
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
    for (i2 = 0; i2 < a.length; ++i2) {
      var c = a.charAt(i2);
      if (c == "=") {
        break;
      }
      c = decoder[c];
      if (c == -1) {
        continue;
      }
      if (c === void 0) {
        throw new Error("Illegal character at offset " + i2);
      }
      bits |= c;
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
  unarmor: function(a) {
    var m = Base64.re.exec(a);
    if (m) {
      if (m[1]) {
        a = m[1];
      } else if (m[2]) {
        a = m[2];
      } else {
        throw new Error("RegExp out of sync");
      }
    }
    return Base64.decode(a);
  }
};
var max$1 = 1e13;
var Int10 = (
  /** @class */
  function() {
    function Int102(value) {
      this.buf = [+value || 0];
    }
    Int102.prototype.mulAdd = function(m, c) {
      var b = this.buf;
      var l = b.length;
      var i2;
      var t2;
      for (i2 = 0; i2 < l; ++i2) {
        t2 = b[i2] * m + c;
        if (t2 < max$1) {
          c = 0;
        } else {
          c = 0 | t2 / max$1;
          t2 -= c * max$1;
        }
        b[i2] = t2;
      }
      if (c > 0) {
        b[i2] = c;
      }
    };
    Int102.prototype.sub = function(c) {
      var b = this.buf;
      var l = b.length;
      var i2;
      var t2;
      for (i2 = 0; i2 < l; ++i2) {
        t2 = b[i2] - c;
        if (t2 < 0) {
          t2 += max$1;
          c = 1;
        } else {
          c = 0;
        }
        b[i2] = t2;
      }
      while (b[b.length - 1] === 0) {
        b.pop();
      }
    };
    Int102.prototype.toString = function(base) {
      if ((base || 10) != 10) {
        throw new Error("only base 10 is supported");
      }
      var b = this.buf;
      var s2 = b[b.length - 1].toString();
      for (var i2 = b.length - 2; i2 >= 0; --i2) {
        s2 += (max$1 + b[i2]).toString().substring(1);
      }
      return s2;
    };
    Int102.prototype.valueOf = function() {
      var b = this.buf;
      var v = 0;
      for (var i2 = b.length - 1; i2 >= 0; --i2) {
        v = v * max$1 + b[i2];
      }
      return v;
    };
    Int102.prototype.simplify = function() {
      var b = this.buf;
      return b.length == 1 ? b[0] : this;
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
    Stream2.prototype.hexByte = function(b) {
      return this.hexDigits.charAt(b >> 4 & 15) + this.hexDigits.charAt(b & 15);
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
        var c = this.get(i2);
        if (c < 32 || c > 176) {
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
        var c = this.get(i2++);
        if (c < 128) {
          s2 += String.fromCharCode(c);
        } else if (c > 191 && c < 224) {
          s2 += String.fromCharCode((c & 31) << 6 | this.get(i2++) & 63);
        } else {
          s2 += String.fromCharCode((c & 15) << 12 | (this.get(i2++) & 63) << 6 | this.get(i2++) & 63);
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
      var m = (shortYear ? reTimeS : reTimeL).exec(s2);
      if (!m) {
        return "Unrecognized time: " + s2;
      }
      if (shortYear) {
        m[1] = +m[1];
        m[1] += +m[1] < 70 ? 2e3 : 1900;
      }
      s2 = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
      if (m[5]) {
        s2 += ":" + m[5];
        if (m[6]) {
          s2 += ":" + m[6];
          if (m[7]) {
            s2 += "." + m[7];
          }
        }
      }
      if (m[8]) {
        s2 += " UTC";
        if (m[8] != "Z") {
          s2 += m[8];
          if (m[9]) {
            s2 += ":" + m[9];
          }
        }
      }
      return s2;
    };
    Stream2.prototype.parseInteger = function(start, end) {
      var v = this.get(start);
      var neg = v > 127;
      var pad = neg ? 255 : 0;
      var len;
      var s2 = "";
      while (v == pad && ++start < end) {
        v = this.get(start);
      }
      len = end - start;
      if (len === 0) {
        return neg ? -1 : 0;
      }
      if (len > 4) {
        s2 = v;
        len <<= 3;
        while (((+s2 ^ pad) & 128) == 0) {
          s2 = +s2 << 1;
          --len;
        }
        s2 = "(" + len + " bit)\n";
      }
      if (neg) {
        v = v - 256;
      }
      var n2 = new Int10(v);
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
        var b = this.get(i2);
        var skip = i2 == end - 1 ? unusedBit : 0;
        for (var j = 7; j >= skip; --j) {
          s2 += b >> j & 1 ? "1" : "0";
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
        var v = this.get(i2);
        n2.mulAdd(128, v & 127);
        bits += 7;
        if (!(v & 128)) {
          if (s2 === "") {
            n2 = n2.simplify();
            if (n2 instanceof Int10) {
              n2.sub(80);
              s2 = "2." + n2.toString();
            } else {
              var m = n2 < 80 ? n2 < 40 ? 0 : 1 : 2;
              s2 = m + "." + (n2 - m * 40);
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
      var offset2 = this.header * 2;
      var length = this.length * 2;
      return hexString.substr(offset2, length);
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
          } catch (e2) {
            throw new Error("Exception while decoding undefined length content: " + e2);
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
        } catch (e2) {
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
    function BigInteger2(a, b, c) {
      if (a != null) {
        if ("number" == typeof a) {
          this.fromNumber(a, b, c);
        } else if (b == null && "string" != typeof a) {
          this.fromString(a, 256);
        } else {
          this.fromString(a, b);
        }
      }
    }
    BigInteger2.prototype.toString = function(b) {
      if (this.s < 0) {
        return "-" + this.negate().toString(b);
      }
      var k;
      if (b == 16) {
        k = 4;
      } else if (b == 8) {
        k = 3;
      } else if (b == 2) {
        k = 1;
      } else if (b == 32) {
        k = 5;
      } else if (b == 4) {
        k = 2;
      } else {
        return this.toRadix(b);
      }
      var km = (1 << k) - 1;
      var d;
      var m = false;
      var r = "";
      var i2 = this.t;
      var p2 = this.DB - i2 * this.DB % k;
      if (i2-- > 0) {
        if (p2 < this.DB && (d = this[i2] >> p2) > 0) {
          m = true;
          r = int2char(d);
        }
        while (i2 >= 0) {
          if (p2 < k) {
            d = (this[i2] & (1 << p2) - 1) << k - p2;
            d |= this[--i2] >> (p2 += this.DB - k);
          } else {
            d = this[i2] >> (p2 -= k) & km;
            if (p2 <= 0) {
              p2 += this.DB;
              --i2;
            }
          }
          if (d > 0) {
            m = true;
          }
          if (m) {
            r += int2char(d);
          }
        }
      }
      return m ? r : "0";
    };
    BigInteger2.prototype.negate = function() {
      var r = nbi();
      BigInteger2.ZERO.subTo(this, r);
      return r;
    };
    BigInteger2.prototype.abs = function() {
      return this.s < 0 ? this.negate() : this;
    };
    BigInteger2.prototype.compareTo = function(a) {
      var r = this.s - a.s;
      if (r != 0) {
        return r;
      }
      var i2 = this.t;
      r = i2 - a.t;
      if (r != 0) {
        return this.s < 0 ? -r : r;
      }
      while (--i2 >= 0) {
        if ((r = this[i2] - a[i2]) != 0) {
          return r;
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
    BigInteger2.prototype.mod = function(a) {
      var r = nbi();
      this.abs().divRemTo(a, null, r);
      if (this.s < 0 && r.compareTo(BigInteger2.ZERO) > 0) {
        a.subTo(r, r);
      }
      return r;
    };
    BigInteger2.prototype.modPowInt = function(e2, m) {
      var z2;
      if (e2 < 256 || m.isEven()) {
        z2 = new Classic(m);
      } else {
        z2 = new Montgomery(m);
      }
      return this.exp(e2, z2);
    };
    BigInteger2.prototype.clone = function() {
      var r = nbi();
      this.copyTo(r);
      return r;
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
      var r = [];
      r[0] = this.s;
      var p2 = this.DB - i2 * this.DB % 8;
      var d;
      var k = 0;
      if (i2-- > 0) {
        if (p2 < this.DB && (d = this[i2] >> p2) != (this.s & this.DM) >> p2) {
          r[k++] = d | this.s << this.DB - p2;
        }
        while (i2 >= 0) {
          if (p2 < 8) {
            d = (this[i2] & (1 << p2) - 1) << 8 - p2;
            d |= this[--i2] >> (p2 += this.DB - 8);
          } else {
            d = this[i2] >> (p2 -= 8) & 255;
            if (p2 <= 0) {
              p2 += this.DB;
              --i2;
            }
          }
          if ((d & 128) != 0) {
            d |= -256;
          }
          if (k == 0 && (this.s & 128) != (d & 128)) {
            ++k;
          }
          if (k > 0 || d != this.s) {
            r[k++] = d;
          }
        }
      }
      return r;
    };
    BigInteger2.prototype.equals = function(a) {
      return this.compareTo(a) == 0;
    };
    BigInteger2.prototype.min = function(a) {
      return this.compareTo(a) < 0 ? this : a;
    };
    BigInteger2.prototype.max = function(a) {
      return this.compareTo(a) > 0 ? this : a;
    };
    BigInteger2.prototype.and = function(a) {
      var r = nbi();
      this.bitwiseTo(a, op_and, r);
      return r;
    };
    BigInteger2.prototype.or = function(a) {
      var r = nbi();
      this.bitwiseTo(a, op_or, r);
      return r;
    };
    BigInteger2.prototype.xor = function(a) {
      var r = nbi();
      this.bitwiseTo(a, op_xor, r);
      return r;
    };
    BigInteger2.prototype.andNot = function(a) {
      var r = nbi();
      this.bitwiseTo(a, op_andnot, r);
      return r;
    };
    BigInteger2.prototype.not = function() {
      var r = nbi();
      for (var i2 = 0; i2 < this.t; ++i2) {
        r[i2] = this.DM & ~this[i2];
      }
      r.t = this.t;
      r.s = ~this.s;
      return r;
    };
    BigInteger2.prototype.shiftLeft = function(n2) {
      var r = nbi();
      if (n2 < 0) {
        this.rShiftTo(-n2, r);
      } else {
        this.lShiftTo(n2, r);
      }
      return r;
    };
    BigInteger2.prototype.shiftRight = function(n2) {
      var r = nbi();
      if (n2 < 0) {
        this.lShiftTo(-n2, r);
      } else {
        this.rShiftTo(n2, r);
      }
      return r;
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
      var r = 0;
      var x = this.s & this.DM;
      for (var i2 = 0; i2 < this.t; ++i2) {
        r += cbit(this[i2] ^ x);
      }
      return r;
    };
    BigInteger2.prototype.testBit = function(n2) {
      var j = Math.floor(n2 / this.DB);
      if (j >= this.t) {
        return this.s != 0;
      }
      return (this[j] & 1 << n2 % this.DB) != 0;
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
    BigInteger2.prototype.add = function(a) {
      var r = nbi();
      this.addTo(a, r);
      return r;
    };
    BigInteger2.prototype.subtract = function(a) {
      var r = nbi();
      this.subTo(a, r);
      return r;
    };
    BigInteger2.prototype.multiply = function(a) {
      var r = nbi();
      this.multiplyTo(a, r);
      return r;
    };
    BigInteger2.prototype.divide = function(a) {
      var r = nbi();
      this.divRemTo(a, r, null);
      return r;
    };
    BigInteger2.prototype.remainder = function(a) {
      var r = nbi();
      this.divRemTo(a, null, r);
      return r;
    };
    BigInteger2.prototype.divideAndRemainder = function(a) {
      var q = nbi();
      var r = nbi();
      this.divRemTo(a, q, r);
      return [q, r];
    };
    BigInteger2.prototype.modPow = function(e2, m) {
      var i2 = e2.bitLength();
      var k;
      var r = nbv(1);
      var z2;
      if (i2 <= 0) {
        return r;
      } else if (i2 < 18) {
        k = 1;
      } else if (i2 < 48) {
        k = 3;
      } else if (i2 < 144) {
        k = 4;
      } else if (i2 < 768) {
        k = 5;
      } else {
        k = 6;
      }
      if (i2 < 8) {
        z2 = new Classic(m);
      } else if (m.isEven()) {
        z2 = new Barrett(m);
      } else {
        z2 = new Montgomery(m);
      }
      var g = [];
      var n2 = 3;
      var k1 = k - 1;
      var km = (1 << k) - 1;
      g[1] = z2.convert(this);
      if (k > 1) {
        var g2 = nbi();
        z2.sqrTo(g[1], g2);
        while (n2 <= km) {
          g[n2] = nbi();
          z2.mulTo(g2, g[n2 - 2], g[n2]);
          n2 += 2;
        }
      }
      var j = e2.t - 1;
      var w;
      var is1 = true;
      var r2 = nbi();
      var t2;
      i2 = nbits(e2[j]) - 1;
      while (j >= 0) {
        if (i2 >= k1) {
          w = e2[j] >> i2 - k1 & km;
        } else {
          w = (e2[j] & (1 << i2 + 1) - 1) << k1 - i2;
          if (j > 0) {
            w |= e2[j - 1] >> this.DB + i2 - k1;
          }
        }
        n2 = k;
        while ((w & 1) == 0) {
          w >>= 1;
          --n2;
        }
        if ((i2 -= n2) < 0) {
          i2 += this.DB;
          --j;
        }
        if (is1) {
          g[w].copyTo(r);
          is1 = false;
        } else {
          while (n2 > 1) {
            z2.sqrTo(r, r2);
            z2.sqrTo(r2, r);
            n2 -= 2;
          }
          if (n2 > 0) {
            z2.sqrTo(r, r2);
          } else {
            t2 = r;
            r = r2;
            r2 = t2;
          }
          z2.mulTo(r2, g[w], r);
        }
        while (j >= 0 && (e2[j] & 1 << i2) == 0) {
          z2.sqrTo(r, r2);
          t2 = r;
          r = r2;
          r2 = t2;
          if (--i2 < 0) {
            i2 = this.DB - 1;
            --j;
          }
        }
      }
      return z2.revert(r);
    };
    BigInteger2.prototype.modInverse = function(m) {
      var ac = m.isEven();
      if (this.isEven() && ac || m.signum() == 0) {
        return BigInteger2.ZERO;
      }
      var u = m.clone();
      var v = this.clone();
      var a = nbv(1);
      var b = nbv(0);
      var c = nbv(0);
      var d = nbv(1);
      while (u.signum() != 0) {
        while (u.isEven()) {
          u.rShiftTo(1, u);
          if (ac) {
            if (!a.isEven() || !b.isEven()) {
              a.addTo(this, a);
              b.subTo(m, b);
            }
            a.rShiftTo(1, a);
          } else if (!b.isEven()) {
            b.subTo(m, b);
          }
          b.rShiftTo(1, b);
        }
        while (v.isEven()) {
          v.rShiftTo(1, v);
          if (ac) {
            if (!c.isEven() || !d.isEven()) {
              c.addTo(this, c);
              d.subTo(m, d);
            }
            c.rShiftTo(1, c);
          } else if (!d.isEven()) {
            d.subTo(m, d);
          }
          d.rShiftTo(1, d);
        }
        if (u.compareTo(v) >= 0) {
          u.subTo(v, u);
          if (ac) {
            a.subTo(c, a);
          }
          b.subTo(d, b);
        } else {
          v.subTo(u, v);
          if (ac) {
            c.subTo(a, c);
          }
          d.subTo(b, d);
        }
      }
      if (v.compareTo(BigInteger2.ONE) != 0) {
        return BigInteger2.ZERO;
      }
      if (d.compareTo(m) >= 0) {
        return d.subtract(m);
      }
      if (d.signum() < 0) {
        d.addTo(m, d);
      } else {
        return d;
      }
      if (d.signum() < 0) {
        return d.add(m);
      } else {
        return d;
      }
    };
    BigInteger2.prototype.pow = function(e2) {
      return this.exp(e2, new NullExp());
    };
    BigInteger2.prototype.gcd = function(a) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t2 = x;
        x = y;
        y = t2;
      }
      var i2 = x.getLowestSetBit();
      var g = y.getLowestSetBit();
      if (g < 0) {
        return x;
      }
      if (i2 < g) {
        g = i2;
      }
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      while (x.signum() > 0) {
        if ((i2 = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i2, x);
        }
        if ((i2 = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i2, y);
        }
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
      }
      if (g > 0) {
        y.lShiftTo(g, y);
      }
      return y;
    };
    BigInteger2.prototype.isProbablePrime = function(t2) {
      var i2;
      var x = this.abs();
      if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
        for (i2 = 0; i2 < lowprimes.length; ++i2) {
          if (x[0] == lowprimes[i2]) {
            return true;
          }
        }
        return false;
      }
      if (x.isEven()) {
        return false;
      }
      i2 = 1;
      while (i2 < lowprimes.length) {
        var m = lowprimes[i2];
        var j = i2 + 1;
        while (j < lowprimes.length && m < lplim) {
          m *= lowprimes[j++];
        }
        m = x.modInt(m);
        while (i2 < j) {
          if (m % lowprimes[i2++] == 0) {
            return false;
          }
        }
      }
      return x.millerRabin(t2);
    };
    BigInteger2.prototype.copyTo = function(r) {
      for (var i2 = this.t - 1; i2 >= 0; --i2) {
        r[i2] = this[i2];
      }
      r.t = this.t;
      r.s = this.s;
    };
    BigInteger2.prototype.fromInt = function(x) {
      this.t = 1;
      this.s = x < 0 ? -1 : 0;
      if (x > 0) {
        this[0] = x;
      } else if (x < -1) {
        this[0] = x + this.DV;
      } else {
        this.t = 0;
      }
    };
    BigInteger2.prototype.fromString = function(s2, b) {
      var k;
      if (b == 16) {
        k = 4;
      } else if (b == 8) {
        k = 3;
      } else if (b == 256) {
        k = 8;
      } else if (b == 2) {
        k = 1;
      } else if (b == 32) {
        k = 5;
      } else if (b == 4) {
        k = 2;
      } else {
        this.fromRadix(s2, b);
        return;
      }
      this.t = 0;
      this.s = 0;
      var i2 = s2.length;
      var mi = false;
      var sh = 0;
      while (--i2 >= 0) {
        var x = k == 8 ? +s2[i2] & 255 : intAt(s2, i2);
        if (x < 0) {
          if (s2.charAt(i2) == "-") {
            mi = true;
          }
          continue;
        }
        mi = false;
        if (sh == 0) {
          this[this.t++] = x;
        } else if (sh + k > this.DB) {
          this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
          this[this.t++] = x >> this.DB - sh;
        } else {
          this[this.t - 1] |= x << sh;
        }
        sh += k;
        if (sh >= this.DB) {
          sh -= this.DB;
        }
      }
      if (k == 8 && (+s2[0] & 128) != 0) {
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
      var c = this.s & this.DM;
      while (this.t > 0 && this[this.t - 1] == c) {
        --this.t;
      }
    };
    BigInteger2.prototype.dlShiftTo = function(n2, r) {
      var i2;
      for (i2 = this.t - 1; i2 >= 0; --i2) {
        r[i2 + n2] = this[i2];
      }
      for (i2 = n2 - 1; i2 >= 0; --i2) {
        r[i2] = 0;
      }
      r.t = this.t + n2;
      r.s = this.s;
    };
    BigInteger2.prototype.drShiftTo = function(n2, r) {
      for (var i2 = n2; i2 < this.t; ++i2) {
        r[i2 - n2] = this[i2];
      }
      r.t = Math.max(this.t - n2, 0);
      r.s = this.s;
    };
    BigInteger2.prototype.lShiftTo = function(n2, r) {
      var bs = n2 % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n2 / this.DB);
      var c = this.s << bs & this.DM;
      for (var i2 = this.t - 1; i2 >= 0; --i2) {
        r[i2 + ds + 1] = this[i2] >> cbs | c;
        c = (this[i2] & bm) << bs;
      }
      for (var i2 = ds - 1; i2 >= 0; --i2) {
        r[i2] = 0;
      }
      r[ds] = c;
      r.t = this.t + ds + 1;
      r.s = this.s;
      r.clamp();
    };
    BigInteger2.prototype.rShiftTo = function(n2, r) {
      r.s = this.s;
      var ds = Math.floor(n2 / this.DB);
      if (ds >= this.t) {
        r.t = 0;
        return;
      }
      var bs = n2 % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r[0] = this[ds] >> bs;
      for (var i2 = ds + 1; i2 < this.t; ++i2) {
        r[i2 - ds - 1] |= (this[i2] & bm) << cbs;
        r[i2 - ds] = this[i2] >> bs;
      }
      if (bs > 0) {
        r[this.t - ds - 1] |= (this.s & bm) << cbs;
      }
      r.t = this.t - ds;
      r.clamp();
    };
    BigInteger2.prototype.subTo = function(a, r) {
      var i2 = 0;
      var c = 0;
      var m = Math.min(a.t, this.t);
      while (i2 < m) {
        c += this[i2] - a[i2];
        r[i2++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c -= a.s;
        while (i2 < this.t) {
          c += this[i2];
          r[i2++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i2 < a.t) {
          c -= a[i2];
          r[i2++] = c & this.DM;
          c >>= this.DB;
        }
        c -= a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c < -1) {
        r[i2++] = this.DV + c;
      } else if (c > 0) {
        r[i2++] = c;
      }
      r.t = i2;
      r.clamp();
    };
    BigInteger2.prototype.multiplyTo = function(a, r) {
      var x = this.abs();
      var y = a.abs();
      var i2 = x.t;
      r.t = i2 + y.t;
      while (--i2 >= 0) {
        r[i2] = 0;
      }
      for (i2 = 0; i2 < y.t; ++i2) {
        r[i2 + x.t] = x.am(0, y[i2], r, i2, 0, x.t);
      }
      r.s = 0;
      r.clamp();
      if (this.s != a.s) {
        BigInteger2.ZERO.subTo(r, r);
      }
    };
    BigInteger2.prototype.squareTo = function(r) {
      var x = this.abs();
      var i2 = r.t = 2 * x.t;
      while (--i2 >= 0) {
        r[i2] = 0;
      }
      for (i2 = 0; i2 < x.t - 1; ++i2) {
        var c = x.am(i2, x[i2], r, 2 * i2, 0, 1);
        if ((r[i2 + x.t] += x.am(i2 + 1, 2 * x[i2], r, 2 * i2 + 1, c, x.t - i2 - 1)) >= x.DV) {
          r[i2 + x.t] -= x.DV;
          r[i2 + x.t + 1] = 1;
        }
      }
      if (r.t > 0) {
        r[r.t - 1] += x.am(i2, x[i2], r, 2 * i2, 0, 1);
      }
      r.s = 0;
      r.clamp();
    };
    BigInteger2.prototype.divRemTo = function(m, q, r) {
      var pm = m.abs();
      if (pm.t <= 0) {
        return;
      }
      var pt = this.abs();
      if (pt.t < pm.t) {
        if (q != null) {
          q.fromInt(0);
        }
        if (r != null) {
          this.copyTo(r);
        }
        return;
      }
      if (r == null) {
        r = nbi();
      }
      var y = nbi();
      var ts = this.s;
      var ms = m.s;
      var nsh = this.DB - nbits(pm[pm.t - 1]);
      if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
      } else {
        pm.copyTo(y);
        pt.copyTo(r);
      }
      var ys = y.t;
      var y0 = y[ys - 1];
      if (y0 == 0) {
        return;
      }
      var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt;
      var d2 = (1 << this.F1) / yt;
      var e2 = 1 << this.F2;
      var i2 = r.t;
      var j = i2 - ys;
      var t2 = q == null ? nbi() : q;
      y.dlShiftTo(j, t2);
      if (r.compareTo(t2) >= 0) {
        r[r.t++] = 1;
        r.subTo(t2, r);
      }
      BigInteger2.ONE.dlShiftTo(ys, t2);
      t2.subTo(y, y);
      while (y.t < ys) {
        y[y.t++] = 0;
      }
      while (--j >= 0) {
        var qd = r[--i2] == y0 ? this.DM : Math.floor(r[i2] * d1 + (r[i2 - 1] + e2) * d2);
        if ((r[i2] += y.am(0, qd, r, j, 0, ys)) < qd) {
          y.dlShiftTo(j, t2);
          r.subTo(t2, r);
          while (r[i2] < --qd) {
            r.subTo(t2, r);
          }
        }
      }
      if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms) {
          BigInteger2.ZERO.subTo(q, q);
        }
      }
      r.t = ys;
      r.clamp();
      if (nsh > 0) {
        r.rShiftTo(nsh, r);
      }
      if (ts < 0) {
        BigInteger2.ZERO.subTo(r, r);
      }
    };
    BigInteger2.prototype.invDigit = function() {
      if (this.t < 1) {
        return 0;
      }
      var x = this[0];
      if ((x & 1) == 0) {
        return 0;
      }
      var y = x & 3;
      y = y * (2 - (x & 15) * y) & 15;
      y = y * (2 - (x & 255) * y) & 255;
      y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
      y = y * (2 - x * y % this.DV) % this.DV;
      return y > 0 ? this.DV - y : -y;
    };
    BigInteger2.prototype.isEven = function() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    };
    BigInteger2.prototype.exp = function(e2, z2) {
      if (e2 > 4294967295 || e2 < 1) {
        return BigInteger2.ONE;
      }
      var r = nbi();
      var r2 = nbi();
      var g = z2.convert(this);
      var i2 = nbits(e2) - 1;
      g.copyTo(r);
      while (--i2 >= 0) {
        z2.sqrTo(r, r2);
        if ((e2 & 1 << i2) > 0) {
          z2.mulTo(r2, g, r);
        } else {
          var t2 = r;
          r = r2;
          r2 = t2;
        }
      }
      return z2.revert(r);
    };
    BigInteger2.prototype.chunkSize = function(r) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r));
    };
    BigInteger2.prototype.toRadix = function(b) {
      if (b == null) {
        b = 10;
      }
      if (this.signum() == 0 || b < 2 || b > 36) {
        return "0";
      }
      var cs = this.chunkSize(b);
      var a = Math.pow(b, cs);
      var d = nbv(a);
      var y = nbi();
      var z2 = nbi();
      var r = "";
      this.divRemTo(d, y, z2);
      while (y.signum() > 0) {
        r = (a + z2.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d, y, z2);
      }
      return z2.intValue().toString(b) + r;
    };
    BigInteger2.prototype.fromRadix = function(s2, b) {
      this.fromInt(0);
      if (b == null) {
        b = 10;
      }
      var cs = this.chunkSize(b);
      var d = Math.pow(b, cs);
      var mi = false;
      var j = 0;
      var w = 0;
      for (var i2 = 0; i2 < s2.length; ++i2) {
        var x = intAt(s2, i2);
        if (x < 0) {
          if (s2.charAt(i2) == "-" && this.signum() == 0) {
            mi = true;
          }
          continue;
        }
        w = b * w + x;
        if (++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w, 0);
          j = 0;
          w = 0;
        }
      }
      if (j > 0) {
        this.dMultiply(Math.pow(b, j));
        this.dAddOffset(w, 0);
      }
      if (mi) {
        BigInteger2.ZERO.subTo(this, this);
      }
    };
    BigInteger2.prototype.fromNumber = function(a, b, c) {
      if ("number" == typeof b) {
        if (a < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1)) {
            this.bitwiseTo(BigInteger2.ONE.shiftLeft(a - 1), op_or, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }
          while (!this.isProbablePrime(b)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > a) {
              this.subTo(BigInteger2.ONE.shiftLeft(a - 1), this);
            }
          }
        }
      } else {
        var x = [];
        var t2 = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t2 > 0) {
          x[0] &= (1 << t2) - 1;
        } else {
          x[0] = 0;
        }
        this.fromString(x, 256);
      }
    };
    BigInteger2.prototype.bitwiseTo = function(a, op, r) {
      var i2;
      var f2;
      var m = Math.min(a.t, this.t);
      for (i2 = 0; i2 < m; ++i2) {
        r[i2] = op(this[i2], a[i2]);
      }
      if (a.t < this.t) {
        f2 = a.s & this.DM;
        for (i2 = m; i2 < this.t; ++i2) {
          r[i2] = op(this[i2], f2);
        }
        r.t = this.t;
      } else {
        f2 = this.s & this.DM;
        for (i2 = m; i2 < a.t; ++i2) {
          r[i2] = op(f2, a[i2]);
        }
        r.t = a.t;
      }
      r.s = op(this.s, a.s);
      r.clamp();
    };
    BigInteger2.prototype.changeBit = function(n2, op) {
      var r = BigInteger2.ONE.shiftLeft(n2);
      this.bitwiseTo(r, op, r);
      return r;
    };
    BigInteger2.prototype.addTo = function(a, r) {
      var i2 = 0;
      var c = 0;
      var m = Math.min(a.t, this.t);
      while (i2 < m) {
        c += this[i2] + a[i2];
        r[i2++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c += a.s;
        while (i2 < this.t) {
          c += this[i2];
          r[i2++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i2 < a.t) {
          c += a[i2];
          r[i2++] = c & this.DM;
          c >>= this.DB;
        }
        c += a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c > 0) {
        r[i2++] = c;
      } else if (c < -1) {
        r[i2++] = this.DV + c;
      }
      r.t = i2;
      r.clamp();
    };
    BigInteger2.prototype.dMultiply = function(n2) {
      this[this.t] = this.am(0, n2 - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    };
    BigInteger2.prototype.dAddOffset = function(n2, w) {
      if (n2 == 0) {
        return;
      }
      while (this.t <= w) {
        this[this.t++] = 0;
      }
      this[w] += n2;
      while (this[w] >= this.DV) {
        this[w] -= this.DV;
        if (++w >= this.t) {
          this[this.t++] = 0;
        }
        ++this[w];
      }
    };
    BigInteger2.prototype.multiplyLowerTo = function(a, n2, r) {
      var i2 = Math.min(this.t + a.t, n2);
      r.s = 0;
      r.t = i2;
      while (i2 > 0) {
        r[--i2] = 0;
      }
      for (var j = r.t - this.t; i2 < j; ++i2) {
        r[i2 + this.t] = this.am(0, a[i2], r, i2, 0, this.t);
      }
      for (var j = Math.min(a.t, n2); i2 < j; ++i2) {
        this.am(0, a[i2], r, i2, 0, n2 - i2);
      }
      r.clamp();
    };
    BigInteger2.prototype.multiplyUpperTo = function(a, n2, r) {
      --n2;
      var i2 = r.t = this.t + a.t - n2;
      r.s = 0;
      while (--i2 >= 0) {
        r[i2] = 0;
      }
      for (i2 = Math.max(n2 - this.t, 0); i2 < a.t; ++i2) {
        r[this.t + i2 - n2] = this.am(n2 - i2, a[i2], r, 0, 0, this.t + i2 - n2);
      }
      r.clamp();
      r.drShiftTo(1, r);
    };
    BigInteger2.prototype.modInt = function(n2) {
      if (n2 <= 0) {
        return 0;
      }
      var d = this.DV % n2;
      var r = this.s < 0 ? n2 - 1 : 0;
      if (this.t > 0) {
        if (d == 0) {
          r = this[0] % n2;
        } else {
          for (var i2 = this.t - 1; i2 >= 0; --i2) {
            r = (d * r + this[i2]) % n2;
          }
        }
      }
      return r;
    };
    BigInteger2.prototype.millerRabin = function(t2) {
      var n1 = this.subtract(BigInteger2.ONE);
      var k = n1.getLowestSetBit();
      if (k <= 0) {
        return false;
      }
      var r = n1.shiftRight(k);
      t2 = t2 + 1 >> 1;
      if (t2 > lowprimes.length) {
        t2 = lowprimes.length;
      }
      var a = nbi();
      for (var i2 = 0; i2 < t2; ++i2) {
        a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var y = a.modPow(r, this);
        if (y.compareTo(BigInteger2.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;
          while (j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2, this);
            if (y.compareTo(BigInteger2.ONE) == 0) {
              return false;
            }
          }
          if (y.compareTo(n1) != 0) {
            return false;
          }
        }
      }
      return true;
    };
    BigInteger2.prototype.square = function() {
      var r = nbi();
      this.squareTo(r);
      return r;
    };
    BigInteger2.prototype.gcda = function(a, callback) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t2 = x;
        x = y;
        y = t2;
      }
      var i2 = x.getLowestSetBit();
      var g = y.getLowestSetBit();
      if (g < 0) {
        callback(x);
        return;
      }
      if (i2 < g) {
        g = i2;
      }
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      var gcda1 = function() {
        if ((i2 = x.getLowestSetBit()) > 0) {
          x.rShiftTo(i2, x);
        }
        if ((i2 = y.getLowestSetBit()) > 0) {
          y.rShiftTo(i2, y);
        }
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
        if (!(x.signum() > 0)) {
          if (g > 0) {
            y.lShiftTo(g, y);
          }
          setTimeout(function() {
            callback(y);
          }, 0);
        } else {
          setTimeout(gcda1, 0);
        }
      };
      setTimeout(gcda1, 10);
    };
    BigInteger2.prototype.fromNumberAsync = function(a, b, c, callback) {
      if ("number" == typeof b) {
        if (a < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1)) {
            this.bitwiseTo(BigInteger2.ONE.shiftLeft(a - 1), op_or, this);
          }
          if (this.isEven()) {
            this.dAddOffset(1, 0);
          }
          var bnp_1 = this;
          var bnpfn1_1 = function() {
            bnp_1.dAddOffset(2, 0);
            if (bnp_1.bitLength() > a) {
              bnp_1.subTo(BigInteger2.ONE.shiftLeft(a - 1), bnp_1);
            }
            if (bnp_1.isProbablePrime(b)) {
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
        var x = [];
        var t2 = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t2 > 0) {
          x[0] &= (1 << t2) - 1;
        } else {
          x[0] = 0;
        }
        this.fromString(x, 256);
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
    NullExp2.prototype.convert = function(x) {
      return x;
    };
    NullExp2.prototype.revert = function(x) {
      return x;
    };
    NullExp2.prototype.mulTo = function(x, y, r) {
      x.multiplyTo(y, r);
    };
    NullExp2.prototype.sqrTo = function(x, r) {
      x.squareTo(r);
    };
    return NullExp2;
  }()
);
var Classic = (
  /** @class */
  function() {
    function Classic2(m) {
      this.m = m;
    }
    Classic2.prototype.convert = function(x) {
      if (x.s < 0 || x.compareTo(this.m) >= 0) {
        return x.mod(this.m);
      } else {
        return x;
      }
    };
    Classic2.prototype.revert = function(x) {
      return x;
    };
    Classic2.prototype.reduce = function(x) {
      x.divRemTo(this.m, null, x);
    };
    Classic2.prototype.mulTo = function(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    Classic2.prototype.sqrTo = function(x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Classic2;
  }()
);
var Montgomery = (
  /** @class */
  function() {
    function Montgomery2(m) {
      this.m = m;
      this.mp = m.invDigit();
      this.mpl = this.mp & 32767;
      this.mph = this.mp >> 15;
      this.um = (1 << m.DB - 15) - 1;
      this.mt2 = 2 * m.t;
    }
    Montgomery2.prototype.convert = function(x) {
      var r = nbi();
      x.abs().dlShiftTo(this.m.t, r);
      r.divRemTo(this.m, null, r);
      if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(r, r);
      }
      return r;
    };
    Montgomery2.prototype.revert = function(x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    };
    Montgomery2.prototype.reduce = function(x) {
      while (x.t <= this.mt2) {
        x[x.t++] = 0;
      }
      for (var i2 = 0; i2 < this.m.t; ++i2) {
        var j = x[i2] & 32767;
        var u0 = j * this.mpl + ((j * this.mph + (x[i2] >> 15) * this.mpl & this.um) << 15) & x.DM;
        j = i2 + this.m.t;
        x[j] += this.m.am(0, u0, x, i2, 0, this.m.t);
        while (x[j] >= x.DV) {
          x[j] -= x.DV;
          x[++j]++;
        }
      }
      x.clamp();
      x.drShiftTo(this.m.t, x);
      if (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
      }
    };
    Montgomery2.prototype.mulTo = function(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    Montgomery2.prototype.sqrTo = function(x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Montgomery2;
  }()
);
var Barrett = (
  /** @class */
  function() {
    function Barrett2(m) {
      this.m = m;
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
      this.mu = this.r2.divide(m);
    }
    Barrett2.prototype.convert = function(x) {
      if (x.s < 0 || x.t > 2 * this.m.t) {
        return x.mod(this.m);
      } else if (x.compareTo(this.m) < 0) {
        return x;
      } else {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
    };
    Barrett2.prototype.revert = function(x) {
      return x;
    };
    Barrett2.prototype.reduce = function(x) {
      x.drShiftTo(this.m.t - 1, this.r2);
      if (x.t > this.m.t + 1) {
        x.t = this.m.t + 1;
        x.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (x.compareTo(this.r2) < 0) {
        x.dAddOffset(1, this.m.t + 1);
      }
      x.subTo(this.r2, x);
      while (x.compareTo(this.m) >= 0) {
        x.subTo(this.m, x);
      }
    };
    Barrett2.prototype.mulTo = function(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    };
    Barrett2.prototype.sqrTo = function(x, r) {
      x.squareTo(r);
      this.reduce(r);
    };
    return Barrett2;
  }()
);
function nbi() {
  return new BigInteger(null);
}
function parseBigInt(str, r) {
  return new BigInteger(str, r);
}
var inBrowser = typeof navigator !== "undefined";
if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
  BigInteger.prototype.am = function am2(i2, x, w, j, c, n2) {
    var xl = x & 32767;
    var xh = x >> 15;
    while (--n2 >= 0) {
      var l = this[i2] & 32767;
      var h = this[i2++] >> 15;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
      c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
      w[j++] = l & 1073741823;
    }
    return c;
  };
  dbits = 30;
} else if (inBrowser && j_lm && navigator.appName != "Netscape") {
  BigInteger.prototype.am = function am1(i2, x, w, j, c, n2) {
    while (--n2 >= 0) {
      var v = x * this[i2++] + w[j] + c;
      c = Math.floor(v / 67108864);
      w[j++] = v & 67108863;
    }
    return c;
  };
  dbits = 26;
} else {
  BigInteger.prototype.am = function am3(i2, x, w, j, c, n2) {
    var xl = x & 16383;
    var xh = x >> 14;
    while (--n2 >= 0) {
      var l = this[i2] & 16383;
      var h = this[i2++] >> 14;
      var m = xh * l + h * xl;
      l = xl * l + ((m & 16383) << 14) + w[j] + c;
      c = (l >> 28) + (m >> 14) + xh * h;
      w[j++] = l & 268435455;
    }
    return c;
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
  var c = BI_RC[s2.charCodeAt(i2)];
  return c == null ? -1 : c;
}
function nbv(i2) {
  var r = nbi();
  r.fromInt(i2);
  return r;
}
function nbits(x) {
  var r = 1;
  var t2;
  if ((t2 = x >>> 16) != 0) {
    x = t2;
    r += 16;
  }
  if ((t2 = x >> 8) != 0) {
    x = t2;
    r += 8;
  }
  if ((t2 = x >> 4) != 0) {
    x = t2;
    r += 4;
  }
  if ((t2 = x >> 2) != 0) {
    x = t2;
    r += 2;
  }
  if ((t2 = x >> 1) != 0) {
    x = t2;
    r += 1;
  }
  return r;
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
    Arcfour2.prototype.init = function(key2) {
      var i2;
      var j;
      var t2;
      for (i2 = 0; i2 < 256; ++i2) {
        this.S[i2] = i2;
      }
      j = 0;
      for (i2 = 0; i2 < 256; ++i2) {
        j = j + this.S[i2] + key2[i2 % key2.length] & 255;
        t2 = this.S[i2];
        this.S[i2] = this.S[j];
        this.S[j] = t2;
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
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    var z = new Uint32Array(256);
    window.crypto.getRandomValues(z);
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
    } catch (e2) {
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
    console.error("Message too long for RSA");
    return null;
  }
  var len = n2 - s2.length - 6;
  var filler = "";
  for (var f2 = 0; f2 < len; f2 += 2) {
    filler += "ff";
  }
  var m = "0001" + filler + "00" + s2;
  return parseBigInt(m, 16);
}
function pkcs1pad2(s2, n2) {
  if (n2 < s2.length + 11) {
    console.error("Message too long for RSA");
    return null;
  }
  var ba = [];
  var i2 = s2.length - 1;
  while (i2 >= 0 && n2 > 0) {
    var c = s2.charCodeAt(i2--);
    if (c < 128) {
      ba[--n2] = c;
    } else if (c > 127 && c < 2048) {
      ba[--n2] = c & 63 | 128;
      ba[--n2] = c >> 6 | 192;
    } else {
      ba[--n2] = c & 63 | 128;
      ba[--n2] = c >> 6 & 63 | 128;
      ba[--n2] = c >> 12 | 224;
    }
  }
  ba[--n2] = 0;
  var rng = new SecureRandom();
  var x = [];
  while (n2 > 2) {
    x[0] = 0;
    while (x[0] == 0) {
      rng.nextBytes(x);
    }
    ba[--n2] = x[0];
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
    RSAKey2.prototype.doPublic = function(x) {
      return x.modPowInt(this.e, this.n);
    };
    RSAKey2.prototype.doPrivate = function(x) {
      if (this.p == null || this.q == null) {
        return x.modPow(this.d, this.n);
      }
      var xp = x.mod(this.p).modPow(this.dmp1, this.p);
      var xq = x.mod(this.q).modPow(this.dmq1, this.q);
      while (xp.compareTo(xq) < 0) {
        xp = xp.add(this.p);
      }
      return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
    };
    RSAKey2.prototype.setPublic = function(N, E2) {
      if (N != null && E2 != null && N.length > 0 && E2.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E2, 16);
      } else {
        console.error("Invalid RSA public key");
      }
    };
    RSAKey2.prototype.encrypt = function(text) {
      var maxLength = this.n.bitLength() + 7 >> 3;
      var m = pkcs1pad2(text, maxLength);
      if (m == null) {
        return null;
      }
      var c = this.doPublic(m);
      if (c == null) {
        return null;
      }
      var h = c.toString(16);
      var length = h.length;
      for (var i2 = 0; i2 < maxLength * 2 - length; i2++) {
        h = "0" + h;
      }
      return h;
    };
    RSAKey2.prototype.setPrivate = function(N, E2, D) {
      if (N != null && E2 != null && N.length > 0 && E2.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E2, 16);
        this.d = parseBigInt(D, 16);
      } else {
        console.error("Invalid RSA private key");
      }
    };
    RSAKey2.prototype.setPrivateEx = function(N, E2, D, P, Q, DP, DQ, C) {
      if (N != null && E2 != null && N.length > 0 && E2.length > 0) {
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E2, 16);
        this.d = parseBigInt(D, 16);
        this.p = parseBigInt(P, 16);
        this.q = parseBigInt(Q, 16);
        this.dmp1 = parseBigInt(DP, 16);
        this.dmq1 = parseBigInt(DQ, 16);
        this.coeff = parseBigInt(C, 16);
      } else {
        console.error("Invalid RSA private key");
      }
    };
    RSAKey2.prototype.generate = function(B, E2) {
      var rng = new SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E2, 16);
      var ee = new BigInteger(E2, 16);
      for (; ; ) {
        for (; ; ) {
          this.p = new BigInteger(B - qs, 1, rng);
          if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
            break;
          }
        }
        for (; ; ) {
          this.q = new BigInteger(qs, 1, rng);
          if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
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
        if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
          this.n = this.p.multiply(this.q);
          this.d = ee.modInverse(phi);
          this.dmp1 = this.d.mod(p1);
          this.dmq1 = this.d.mod(q1);
          this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    };
    RSAKey2.prototype.decrypt = function(ctext) {
      var c = parseBigInt(ctext, 16);
      var m = this.doPrivate(c);
      if (m == null) {
        return null;
      }
      return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3);
    };
    RSAKey2.prototype.generateAsync = function(B, E2, callback) {
      var rng = new SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E2, 16);
      var ee = new BigInteger(E2, 16);
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
          if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
            rsa.n = rsa.p.multiply(rsa.q);
            rsa.d = ee.modInverse(phi);
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
            rsa.q.subtract(BigInteger.ONE).gcda(ee, function(r) {
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                setTimeout(loop4, 0);
              } else {
                setTimeout(loop3, 0);
              }
            });
          });
        };
        var loop2 = function() {
          rsa.p = nbi();
          rsa.p.fromNumberAsync(B - qs, 1, rng, function() {
            rsa.p.subtract(BigInteger.ONE).gcda(ee, function(r) {
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
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
      var m = pkcs1pad1(digest, this.n.bitLength() / 4);
      if (m == null) {
        return null;
      }
      var c = this.doPrivate(m);
      if (c == null) {
        return null;
      }
      var h = c.toString(16);
      if ((h.length & 1) == 0) {
        return h;
      } else {
        return "0" + h;
      }
    };
    RSAKey2.prototype.verify = function(text, signature, digestMethod) {
      var c = parseBigInt(signature, 16);
      var m = this.doPublic(c);
      if (m == null) {
        return null;
      }
      var unpadded = m.toString(16).replace(/^1f+00/, "");
      var digest = removeDigestHeader(unpadded);
      return digest == digestMethod(text).toString();
    };
    return RSAKey2;
  }()
);
function pkcs1unpad2(d, n2) {
  var b = d.toByteArray();
  var i2 = 0;
  while (i2 < b.length && b[i2] == 0) {
    ++i2;
  }
  if (b.length - i2 != n2 - 1 || b[i2] != 2) {
    return null;
  }
  ++i2;
  while (b[i2] != 0) {
    if (++i2 >= b.length) {
      return null;
    }
  }
  var ret = "";
  while (++i2 < b.length) {
    var c = b[i2] & 255;
    if (c < 128) {
      ret += String.fromCharCode(c);
    } else if (c > 191 && c < 224) {
      ret += String.fromCharCode((c & 31) << 6 | b[i2 + 1] & 63);
      ++i2;
    } else {
      ret += String.fromCharCode((c & 15) << 12 | (b[i2 + 1] & 63) << 6 | b[i2 + 2] & 63);
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
    var F = function() {
    };
    F.prototype = superc.prototype;
    subc.prototype = new F();
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
          _IEEnumFix = function(r, s2) {
            for (i2 = 0; i2 < ADD.length; i2 = i2 + 1) {
              var fname = ADD[i2], f2 = s2[fname];
              if (typeof f2 === "function" && f2 != Object.prototype[fname]) {
                r[fname] = f2;
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
    var h = i2.toString(16);
    if (h.length % 2 == 1)
      h = "0" + h;
    return h;
  };
  this.bigIntToMinTwosComplementsHex = function(bigIntegerValue) {
    var h = bigIntegerValue.toString(16);
    if (h.substr(0, 1) != "-") {
      if (h.length % 2 == 1) {
        h = "0" + h;
      } else {
        if (!h.match(/^[0-7]/)) {
          h = "00" + h;
        }
      }
    } else {
      var hPos = h.substr(1);
      var xorLen = hPos.length;
      if (xorLen % 2 == 1) {
        xorLen += 1;
      } else {
        if (!h.match(/^[0-7]/)) {
          xorLen += 2;
        }
      }
      var hMask = "";
      for (var i2 = 0; i2 < xorLen; i2++) {
        hMask += "f";
      }
      var biMask = new BigInteger(hMask, 16);
      var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
      h = biNeg.toString(16).replace(/^-/, "");
    }
    return h;
  };
  this.getPEMStringFromHex = function(dataHex, pemHeader) {
    return hextopem(dataHex, pemHeader);
  };
  this.newObject = function(param) {
    var _KJUR = KJUR, _KJUR_asn1 = _KJUR.asn1, _DERBoolean = _KJUR_asn1.DERBoolean, _DERInteger = _KJUR_asn1.DERInteger, _DERBitString = _KJUR_asn1.DERBitString, _DEROctetString = _KJUR_asn1.DEROctetString, _DERNull = _KJUR_asn1.DERNull, _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier, _DEREnumerated = _KJUR_asn1.DEREnumerated, _DERUTF8String = _KJUR_asn1.DERUTF8String, _DERNumericString = _KJUR_asn1.DERNumericString, _DERPrintableString = _KJUR_asn1.DERPrintableString, _DERTeletexString = _KJUR_asn1.DERTeletexString, _DERIA5String = _KJUR_asn1.DERIA5String, _DERUTCTime = _KJUR_asn1.DERUTCTime, _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime, _DERSequence = _KJUR_asn1.DERSequence, _DERSet = _KJUR_asn1.DERSet, _DERTaggedObject = _KJUR_asn1.DERTaggedObject, _newObject = _KJUR_asn1.ASN1Util.newObject;
    var keys2 = Object.keys(param);
    if (keys2.length != 1)
      throw "key of param shall be only one.";
    var key2 = keys2[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key2 + ":") == -1)
      throw "undefined key: " + key2;
    if (key2 == "bool")
      return new _DERBoolean(param[key2]);
    if (key2 == "int")
      return new _DERInteger(param[key2]);
    if (key2 == "bitstr")
      return new _DERBitString(param[key2]);
    if (key2 == "octstr")
      return new _DEROctetString(param[key2]);
    if (key2 == "null")
      return new _DERNull(param[key2]);
    if (key2 == "oid")
      return new _DERObjectIdentifier(param[key2]);
    if (key2 == "enum")
      return new _DEREnumerated(param[key2]);
    if (key2 == "utf8str")
      return new _DERUTF8String(param[key2]);
    if (key2 == "numstr")
      return new _DERNumericString(param[key2]);
    if (key2 == "prnstr")
      return new _DERPrintableString(param[key2]);
    if (key2 == "telstr")
      return new _DERTeletexString(param[key2]);
    if (key2 == "ia5str")
      return new _DERIA5String(param[key2]);
    if (key2 == "utctime")
      return new _DERUTCTime(param[key2]);
    if (key2 == "gentime")
      return new _DERGeneralizedTime(param[key2]);
    if (key2 == "seq") {
      var paramList = param[key2];
      var a = [];
      for (var i2 = 0; i2 < paramList.length; i2++) {
        var asn1Obj = _newObject(paramList[i2]);
        a.push(asn1Obj);
      }
      return new _DERSequence({ "array": a });
    }
    if (key2 == "set") {
      var paramList = param[key2];
      var a = [];
      for (var i2 = 0; i2 < paramList.length; i2++) {
        var asn1Obj = _newObject(paramList[i2]);
        a.push(asn1Obj);
      }
      return new _DERSet({ "array": a });
    }
    if (key2 == "tag") {
      var tagParam = param[key2];
      if (Object.prototype.toString.call(tagParam) === "[object Array]" && tagParam.length == 3) {
        var obj2 = _newObject(tagParam[2]);
        return new _DERTaggedObject({
          tag: tagParam[0],
          explicit: tagParam[1],
          obj: obj2
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
    var h2 = i3.toString(16);
    if (h2.length == 1)
      h2 = "0" + h2;
    return h2;
  };
  var roidtox = function(roid) {
    var h2 = "";
    var bi = new BigInteger(roid, 10);
    var b = bi.toString(2);
    var padLen = 7 - b.length % 7;
    if (padLen == 7)
      padLen = 0;
    var bPad = "";
    for (var i3 = 0; i3 < padLen; i3++)
      bPad += "0";
    b = bPad + b;
    for (var i3 = 0; i3 < b.length - 1; i3 += 7) {
      var b8 = b.substr(i3, 7);
      if (i3 != b.length - 7)
        b8 = "1" + b8;
      h2 += itox(parseInt(b8, 2));
    }
    return h2;
  };
  if (!oidString.match(/^[0-9.]+$/)) {
    throw "malformed oid string: " + oidString;
  }
  var h = "";
  var a = oidString.split(".");
  var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
  h += itox(i0);
  a.splice(0, 2);
  for (var i2 = 0; i2 < a.length; i2++) {
    h += roidtox(a[i2]);
  }
  return h;
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
KJUR.asn1.DERAbstractString = function(params2) {
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
  if (typeof params2 != "undefined") {
    if (typeof params2 == "string") {
      this.setString(params2);
    } else if (typeof params2["str"] != "undefined") {
      this.setString(params2["str"]);
    } else if (typeof params2["hex"] != "undefined") {
      this.setStringHex(params2["hex"]);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractTime = function(params2) {
  KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
  this.localDateToUTC = function(d) {
    utc = d.getTime() + d.getTimezoneOffset() * 6e4;
    var utcDate = new Date(utc);
    return utcDate;
  };
  this.formatDate = function(dateObject, type, withMillis) {
    var pad = this.zeroPadding;
    var d = this.localDateToUTC(dateObject);
    var year = String(d.getFullYear());
    if (type == "utc")
      year = year.substr(2, 2);
    var month = pad(String(d.getMonth() + 1), 2);
    var day = pad(String(d.getDate()), 2);
    var hour = pad(String(d.getHours()), 2);
    var min2 = pad(String(d.getMinutes()), 2);
    var sec = pad(String(d.getSeconds()), 2);
    var s2 = year + month + day + hour + min2 + sec;
    if (withMillis === true) {
      var millis = d.getMilliseconds();
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
  this.setByDateValue = function(year, month, day, hour, min2, sec) {
    var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min2, sec, 0));
    this.setByDate(dateObject);
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
};
YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractStructured = function(params2) {
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
  if (typeof params2 != "undefined") {
    if (typeof params2["array"] != "undefined") {
      this.asn1Array = params2["array"];
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
KJUR.asn1.DERInteger = function(params2) {
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
  if (typeof params2 != "undefined") {
    if (typeof params2["bigint"] != "undefined") {
      this.setByBigInteger(params2["bigint"]);
    } else if (typeof params2["int"] != "undefined") {
      this.setByInteger(params2["int"]);
    } else if (typeof params2 == "number") {
      this.setByInteger(params2);
    } else if (typeof params2["hex"] != "undefined") {
      this.setValueHex(params2["hex"]);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBitString = function(params2) {
  if (params2 !== void 0 && typeof params2.obj !== "undefined") {
    var o2 = KJUR.asn1.ASN1Util.newObject(params2.obj);
    params2.hex = "00" + o2.getEncodedHex();
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
    var h = "";
    for (var i2 = 0; i2 < binaryString.length - 1; i2 += 8) {
      var b = binaryString.substr(i2, 8);
      var x = parseInt(b, 2).toString(16);
      if (x.length == 1)
        x = "0" + x;
      h += x;
    }
    this.hTLV = null;
    this.isModified = true;
    this.hV = "0" + unusedBits + h;
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
    var a = new Array(nLength);
    for (var i2 = 0; i2 < nLength; i2++) {
      a[i2] = false;
    }
    return a;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params2 != "undefined") {
    if (typeof params2 == "string" && params2.toLowerCase().match(/^[0-9a-f]+$/)) {
      this.setHexValueIncludingUnusedBits(params2);
    } else if (typeof params2["hex"] != "undefined") {
      this.setHexValueIncludingUnusedBits(params2["hex"]);
    } else if (typeof params2["bin"] != "undefined") {
      this.setByBinaryString(params2["bin"]);
    } else if (typeof params2["array"] != "undefined") {
      this.setByBooleanArray(params2["array"]);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
KJUR.asn1.DEROctetString = function(params2) {
  if (params2 !== void 0 && typeof params2.obj !== "undefined") {
    var o2 = KJUR.asn1.ASN1Util.newObject(params2.obj);
    params2.hex = o2.getEncodedHex();
  }
  KJUR.asn1.DEROctetString.superclass.constructor.call(this, params2);
  this.hT = "04";
};
YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNull = function() {
  KJUR.asn1.DERNull.superclass.constructor.call(this);
  this.hT = "05";
  this.hTLV = "0500";
};
YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
KJUR.asn1.DERObjectIdentifier = function(params2) {
  var itox = function(i2) {
    var h = i2.toString(16);
    if (h.length == 1)
      h = "0" + h;
    return h;
  };
  var roidtox = function(roid) {
    var h = "";
    var bi = new BigInteger(roid, 10);
    var b = bi.toString(2);
    var padLen = 7 - b.length % 7;
    if (padLen == 7)
      padLen = 0;
    var bPad = "";
    for (var i2 = 0; i2 < padLen; i2++)
      bPad += "0";
    b = bPad + b;
    for (var i2 = 0; i2 < b.length - 1; i2 += 7) {
      var b8 = b.substr(i2, 7);
      if (i2 != b.length - 7)
        b8 = "1" + b8;
      h += itox(parseInt(b8, 2));
    }
    return h;
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
    var h = "";
    var a = oidString.split(".");
    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
    h += itox(i0);
    a.splice(0, 2);
    for (var i2 = 0; i2 < a.length; i2++) {
      h += roidtox(a[i2]);
    }
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = h;
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
  if (params2 !== void 0) {
    if (typeof params2 === "string") {
      if (params2.match(/^[0-2].[0-9.]+$/)) {
        this.setValueOidString(params2);
      } else {
        this.setValueName(params2);
      }
    } else if (params2.oid !== void 0) {
      this.setValueOidString(params2.oid);
    } else if (params2.hex !== void 0) {
      this.setValueHex(params2.hex);
    } else if (params2.name !== void 0) {
      this.setValueName(params2.name);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.DEREnumerated = function(params2) {
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
  if (typeof params2 != "undefined") {
    if (typeof params2["int"] != "undefined") {
      this.setByInteger(params2["int"]);
    } else if (typeof params2 == "number") {
      this.setByInteger(params2);
    } else if (typeof params2["hex"] != "undefined") {
      this.setValueHex(params2["hex"]);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);
KJUR.asn1.DERUTF8String = function(params2) {
  KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params2);
  this.hT = "0c";
};
YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNumericString = function(params2) {
  KJUR.asn1.DERNumericString.superclass.constructor.call(this, params2);
  this.hT = "12";
};
YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERPrintableString = function(params2) {
  KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params2);
  this.hT = "13";
};
YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERTeletexString = function(params2) {
  KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params2);
  this.hT = "14";
};
YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERIA5String = function(params2) {
  KJUR.asn1.DERIA5String.superclass.constructor.call(this, params2);
  this.hT = "16";
};
YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERUTCTime = function(params2) {
  KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params2);
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
  if (params2 !== void 0) {
    if (params2.str !== void 0) {
      this.setString(params2.str);
    } else if (typeof params2 == "string" && params2.match(/^[0-9]{12}Z$/)) {
      this.setString(params2);
    } else if (params2.hex !== void 0) {
      this.setStringHex(params2.hex);
    } else if (params2.date !== void 0) {
      this.setByDate(params2.date);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERGeneralizedTime = function(params2) {
  KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params2);
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
  if (params2 !== void 0) {
    if (params2.str !== void 0) {
      this.setString(params2.str);
    } else if (typeof params2 == "string" && params2.match(/^[0-9]{14}Z$/)) {
      this.setString(params2);
    } else if (params2.hex !== void 0) {
      this.setStringHex(params2.hex);
    } else if (params2.date !== void 0) {
      this.setByDate(params2.date);
    }
    if (params2.millis === true) {
      this.withMillis = true;
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERSequence = function(params2) {
  KJUR.asn1.DERSequence.superclass.constructor.call(this, params2);
  this.hT = "30";
  this.getFreshValueHex = function() {
    var h = "";
    for (var i2 = 0; i2 < this.asn1Array.length; i2++) {
      var asn1Obj = this.asn1Array[i2];
      h += asn1Obj.getEncodedHex();
    }
    this.hV = h;
    return this.hV;
  };
};
YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERSet = function(params2) {
  KJUR.asn1.DERSet.superclass.constructor.call(this, params2);
  this.hT = "31";
  this.sortFlag = true;
  this.getFreshValueHex = function() {
    var a = new Array();
    for (var i2 = 0; i2 < this.asn1Array.length; i2++) {
      var asn1Obj = this.asn1Array[i2];
      a.push(asn1Obj.getEncodedHex());
    }
    if (this.sortFlag == true)
      a.sort();
    this.hV = a.join("");
    return this.hV;
  };
  if (typeof params2 != "undefined") {
    if (typeof params2.sortflag != "undefined" && params2.sortflag == false)
      this.sortFlag = false;
  }
};
YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERTaggedObject = function(params2) {
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
  if (typeof params2 != "undefined") {
    if (typeof params2["tag"] != "undefined") {
      this.hT = params2["tag"];
    }
    if (typeof params2["explicit"] != "undefined") {
      this.isExplicit = params2["explicit"];
    }
    if (typeof params2["obj"] != "undefined") {
      this.asn1Object = params2["obj"];
      this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
    }
  }
};
YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
var __extends = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p2 in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p2))
          d2[p2] = b2[p2];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var JSEncryptRSAKey = (
  /** @class */
  function(_super) {
    __extends(JSEncryptRSAKey2, _super);
    function JSEncryptRSAKey2(key2) {
      var _this = _super.call(this) || this;
      if (key2) {
        if (typeof key2 === "string") {
          _this.parseKey(key2);
        } else if (JSEncryptRSAKey2.hasPrivateKeyProperty(key2) || JSEncryptRSAKey2.hasPublicKeyProperty(key2)) {
          _this.parsePropertiesFrom(key2);
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
      var options2 = {
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
      var seq = new KJUR.asn1.DERSequence(options2);
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
      var key2 = "-----BEGIN RSA PRIVATE KEY-----\n";
      key2 += JSEncryptRSAKey2.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
      key2 += "-----END RSA PRIVATE KEY-----";
      return key2;
    };
    JSEncryptRSAKey2.prototype.getPublicKey = function() {
      var key2 = "-----BEGIN PUBLIC KEY-----\n";
      key2 += JSEncryptRSAKey2.wordwrap(this.getPublicBaseKeyB64()) + "\n";
      key2 += "-----END PUBLIC KEY-----";
      return key2;
    };
    JSEncryptRSAKey2.hasPublicKeyProperty = function(obj2) {
      obj2 = obj2 || {};
      return obj2.hasOwnProperty("n") && obj2.hasOwnProperty("e");
    };
    JSEncryptRSAKey2.hasPrivateKeyProperty = function(obj2) {
      obj2 = obj2 || {};
      return obj2.hasOwnProperty("n") && obj2.hasOwnProperty("e") && obj2.hasOwnProperty("d") && obj2.hasOwnProperty("p") && obj2.hasOwnProperty("q") && obj2.hasOwnProperty("dmp1") && obj2.hasOwnProperty("dmq1") && obj2.hasOwnProperty("coeff");
    };
    JSEncryptRSAKey2.prototype.parsePropertiesFrom = function(obj2) {
      this.n = obj2.n;
      this.e = obj2.e;
      if (obj2.hasOwnProperty("d")) {
        this.d = obj2.d;
        this.p = obj2.p;
        this.q = obj2.q;
        this.dmp1 = obj2.dmp1;
        this.dmq1 = obj2.dmq1;
        this.coeff = obj2.coeff;
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
    function JSEncrypt2(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      options2 = options2 || {};
      this.default_key_size = options2.default_key_size ? parseInt(options2.default_key_size, 10) : 1024;
      this.default_public_exponent = options2.default_public_exponent || "010001";
      this.log = options2.log || false;
      this.key = null;
    }
    JSEncrypt2.prototype.setKey = function(key2) {
      if (this.log && this.key) {
        console.warn("A key was already set, overriding existing.");
      }
      this.key = new JSEncryptRSAKey(key2);
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
var dayjs_minExports = {};
var dayjs_min = {
  get exports() {
    return dayjs_minExports;
  },
  set exports(v) {
    dayjs_minExports = v;
  }
};
(function(module2, exports2) {
  !function(t2, e2) {
    module2.exports = e2();
  }(commonjsGlobal, function() {
    var t2 = 1e3, e2 = 6e4, n2 = 36e5, r = "millisecond", i2 = "second", s2 = "minute", u = "hour", a = "day", o2 = "week", c = "month", f2 = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
      var e3 = ["th", "st", "nd", "rd"], n3 = t3 % 100;
      return "[" + t3 + (e3[(n3 - 20) % 10] || e3[n3] || e3[0]) + "]";
    } }, m = function(t3, e3, n3) {
      var r2 = String(t3);
      return !r2 || r2.length >= e3 ? t3 : "" + Array(e3 + 1 - r2.length).join(n3) + t3;
    }, v = { s: m, z: function(t3) {
      var e3 = -t3.utcOffset(), n3 = Math.abs(e3), r2 = Math.floor(n3 / 60), i3 = n3 % 60;
      return (e3 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i3, 2, "0");
    }, m: function t3(e3, n3) {
      if (e3.date() < n3.date())
        return -t3(n3, e3);
      var r2 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i3 = e3.clone().add(r2, c), s3 = n3 - i3 < 0, u2 = e3.clone().add(r2 + (s3 ? -1 : 1), c);
      return +(-(r2 + (n3 - i3) / (s3 ? i3 - u2 : u2 - i3)) || 0);
    }, a: function(t3) {
      return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
    }, p: function(t3) {
      return { M: c, y: h, w: o2, d: a, D: d, h: u, m: s2, s: i2, ms: r, Q: f2 }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t3) {
      return void 0 === t3;
    } }, g = "en", D = {};
    D[g] = M;
    var p2 = function(t3) {
      return t3 instanceof b;
    }, S = function t3(e3, n3, r2) {
      var i3;
      if (!e3)
        return g;
      if ("string" == typeof e3) {
        var s3 = e3.toLowerCase();
        D[s3] && (i3 = s3), n3 && (D[s3] = n3, i3 = s3);
        var u2 = e3.split("-");
        if (!i3 && u2.length > 1)
          return t3(u2[0]);
      } else {
        var a2 = e3.name;
        D[a2] = e3, i3 = a2;
      }
      return !r2 && i3 && (g = i3), i3 || !r2 && g;
    }, w = function(t3, e3) {
      if (p2(t3))
        return t3.clone();
      var n3 = "object" == typeof e3 ? e3 : {};
      return n3.date = t3, n3.args = arguments, new b(n3);
    }, O = v;
    O.l = S, O.i = p2, O.w = function(t3, e3) {
      return w(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
    };
    var b = function() {
      function M2(t3) {
        this.$L = S(t3.locale, null, true), this.parse(t3);
      }
      var m2 = M2.prototype;
      return m2.parse = function(t3) {
        this.$d = function(t4) {
          var e3 = t4.date, n3 = t4.utc;
          if (null === e3)
            return /* @__PURE__ */ new Date(NaN);
          if (O.u(e3))
            return /* @__PURE__ */ new Date();
          if (e3 instanceof Date)
            return new Date(e3);
          if ("string" == typeof e3 && !/Z$/i.test(e3)) {
            var r2 = e3.match($);
            if (r2) {
              var i3 = r2[2] - 1 || 0, s3 = (r2[7] || "0").substring(0, 3);
              return n3 ? new Date(Date.UTC(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s3)) : new Date(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s3);
            }
          }
          return new Date(e3);
        }(t3), this.$x = t3.x || {}, this.init();
      }, m2.init = function() {
        var t3 = this.$d;
        this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
      }, m2.$utils = function() {
        return O;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t3, e3) {
        var n3 = w(t3);
        return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
      }, m2.isAfter = function(t3, e3) {
        return w(t3) < this.startOf(e3);
      }, m2.isBefore = function(t3, e3) {
        return this.endOf(e3) < w(t3);
      }, m2.$g = function(t3, e3, n3) {
        return O.u(t3) ? this[e3] : this.set(n3, t3);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t3, e3) {
        var n3 = this, r2 = !!O.u(e3) || e3, f3 = O.p(t3), l2 = function(t4, e4) {
          var i3 = O.w(n3.$u ? Date.UTC(n3.$y, e4, t4) : new Date(n3.$y, e4, t4), n3);
          return r2 ? i3 : i3.endOf(a);
        }, $2 = function(t4, e4) {
          return O.w(n3.toDate()[t4].apply(n3.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (f3) {
          case h:
            return r2 ? l2(1, 0) : l2(31, 11);
          case c:
            return r2 ? l2(1, M3) : l2(0, M3 + 1);
          case o2:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
          case a:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s2:
            return $2(v2 + "Seconds", 2);
          case i2:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t3) {
        return this.startOf(t3, false);
      }, m2.$set = function(t3, e3) {
        var n3, o3 = O.p(t3), f3 = "set" + (this.$u ? "UTC" : ""), l2 = (n3 = {}, n3[a] = f3 + "Date", n3[d] = f3 + "Date", n3[c] = f3 + "Month", n3[h] = f3 + "FullYear", n3[u] = f3 + "Hours", n3[s2] = f3 + "Minutes", n3[i2] = f3 + "Seconds", n3[r] = f3 + "Milliseconds", n3)[o3], $2 = o3 === a ? this.$D + (e3 - this.$W) : e3;
        if (o3 === c || o3 === h) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else
          l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t3, e3) {
        return this.clone().$set(t3, e3);
      }, m2.get = function(t3) {
        return this[O.p(t3)]();
      }, m2.add = function(r2, f3) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = O.p(f3), y2 = function(t3) {
          var e3 = w(l2);
          return O.w(e3.date(e3.date() + Math.round(t3 * r2)), l2);
        };
        if ($2 === c)
          return this.set(c, this.$M + r2);
        if ($2 === h)
          return this.set(h, this.$y + r2);
        if ($2 === a)
          return y2(1);
        if ($2 === o2)
          return y2(7);
        var M3 = (d2 = {}, d2[s2] = e2, d2[u] = n2, d2[i2] = t2, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
        return O.w(m3, this);
      }, m2.subtract = function(t3, e3) {
        return this.add(-1 * t3, e3);
      }, m2.format = function(t3) {
        var e3 = this, n3 = this.$locale();
        if (!this.isValid())
          return n3.invalidDate || l;
        var r2 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i3 = O.z(this), s3 = this.$H, u2 = this.$m, a2 = this.$M, o3 = n3.weekdays, c2 = n3.months, f3 = n3.meridiem, h2 = function(t4, n4, i4, s4) {
          return t4 && (t4[n4] || t4(e3, r2)) || i4[n4].slice(0, s4);
        }, d2 = function(t4) {
          return O.s(s3 % 12 || 12, t4, "0");
        }, $2 = f3 || function(t4, e4, n4) {
          var r3 = t4 < 12 ? "AM" : "PM";
          return n4 ? r3.toLowerCase() : r3;
        };
        return r2.replace(y, function(t4, r3) {
          return r3 || function(t5) {
            switch (t5) {
              case "YY":
                return String(e3.$y).slice(-2);
              case "YYYY":
                return O.s(e3.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return O.s(a2 + 1, 2, "0");
              case "MMM":
                return h2(n3.monthsShort, a2, c2, 3);
              case "MMMM":
                return h2(c2, a2);
              case "D":
                return e3.$D;
              case "DD":
                return O.s(e3.$D, 2, "0");
              case "d":
                return String(e3.$W);
              case "dd":
                return h2(n3.weekdaysMin, e3.$W, o3, 2);
              case "ddd":
                return h2(n3.weekdaysShort, e3.$W, o3, 3);
              case "dddd":
                return o3[e3.$W];
              case "H":
                return String(s3);
              case "HH":
                return O.s(s3, 2, "0");
              case "h":
                return d2(1);
              case "hh":
                return d2(2);
              case "a":
                return $2(s3, u2, true);
              case "A":
                return $2(s3, u2, false);
              case "m":
                return String(u2);
              case "mm":
                return O.s(u2, 2, "0");
              case "s":
                return String(e3.$s);
              case "ss":
                return O.s(e3.$s, 2, "0");
              case "SSS":
                return O.s(e3.$ms, 3, "0");
              case "Z":
                return i3;
            }
            return null;
          }(t4) || i3.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y2 = this, M3 = O.p(d2), m3 = w(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e2, g2 = this - m3, D2 = function() {
          return O.m(y2, m3);
        };
        switch (M3) {
          case h:
            $2 = D2() / 12;
            break;
          case c:
            $2 = D2();
            break;
          case f2:
            $2 = D2() / 3;
            break;
          case o2:
            $2 = (g2 - v2) / 6048e5;
            break;
          case a:
            $2 = (g2 - v2) / 864e5;
            break;
          case u:
            $2 = g2 / n2;
            break;
          case s2:
            $2 = g2 / e2;
            break;
          case i2:
            $2 = g2 / t2;
            break;
          default:
            $2 = g2;
        }
        return l2 ? $2 : O.a($2);
      }, m2.daysInMonth = function() {
        return this.endOf(c).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t3, e3) {
        if (!t3)
          return this.$L;
        var n3 = this.clone(), r2 = S(t3, e3, true);
        return r2 && (n3.$L = r2), n3;
      }, m2.clone = function() {
        return O.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), _ = b.prototype;
    return w.prototype = _, [["$ms", r], ["$s", i2], ["$m", s2], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t3) {
      _[t3[1]] = function(e3) {
        return this.$g(e3, t3[0], t3[1]);
      };
    }), w.extend = function(t3, e3) {
      return t3.$i || (t3(e3, b, w), t3.$i = true), w;
    }, w.locale = S, w.isDayjs = p2, w.unix = function(t3) {
      return w(1e3 * t3);
    }, w.en = D[g], w.Ls = D, w.p = {}, w;
  });
})(dayjs_min);
const dayjs = dayjs_minExports;
var zhCnExports = {};
var zhCn = {
  get exports() {
    return zhCnExports;
  },
  set exports(v) {
    zhCnExports = v;
  }
};
(function(module2, exports2) {
  !function(e2, _) {
    module2.exports = _(dayjs_minExports);
  }(commonjsGlobal, function(e2) {
    function _(e3) {
      return e3 && "object" == typeof e3 && "default" in e3 ? e3 : { default: e3 };
    }
    var t2 = _(e2), d = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(e3, _2) {
      return "W" === _2 ? e3 + "周" : e3 + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(e3, _2) {
      var t3 = 100 * e3 + _2;
      return t3 < 600 ? "凌晨" : t3 < 900 ? "早上" : t3 < 1100 ? "上午" : t3 < 1300 ? "中午" : t3 < 1800 ? "下午" : "晚上";
    } };
    return t2.default.locale(d, null, true), d;
  });
})(zhCn);
var shams = function hasSymbols2() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj2 = {};
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
  obj2[sym] = symVal;
  for (sym in obj2) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj2).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj2).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj2);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj2, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor = Object.getOwnPropertyDescriptor(obj2, sym);
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
  } catch (e2) {
  }
};
var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
  try {
    $gOPD({}, "");
  } catch (e2) {
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
var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
  return x.__proto__;
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
  } catch (e2) {
    var errorProto = getProto(getProto(e2));
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
  var parts2 = stringToPath(name);
  var intrinsicBaseName = parts2.length > 0 ? parts2[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts2, $concat$1([0, 1], alias));
  }
  for (var i2 = 1, isOwn = true; i2 < parts2.length; i2 += 1) {
    var part = parts2[i2];
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
      if ($gOPD && i2 + 1 >= parts2.length) {
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
  set exports(v) {
    callBindExports = v;
  }
};
(function(module2) {
  var bind3 = functionBind;
  var GetIntrinsic3 = getIntrinsic;
  var $apply = GetIntrinsic3("%Function.prototype.apply%");
  var $call = GetIntrinsic3("%Function.prototype.call%");
  var $reflectApply = GetIntrinsic3("%Reflect.apply%", true) || bind3.call($call, $apply);
  var $gOPD2 = GetIntrinsic3("%Object.getOwnPropertyDescriptor%", true);
  var $defineProperty = GetIntrinsic3("%Object.defineProperty%", true);
  var $max = GetIntrinsic3("%Math.max%");
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
    } catch (e2) {
      $defineProperty = null;
    }
  }
  module2.exports = function callBind2(originalFunction) {
    var func = $reflectApply(bind3, $call, arguments);
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
    return $reflectApply(bind3, $apply, arguments);
  };
  if ($defineProperty) {
    $defineProperty(module2.exports, "apply", { value: applyBind });
  } else {
    module2.exports.apply = applyBind;
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
var objectInspect = function inspect_(obj2, options2, depth, seen) {
  var opts = options2 || {};
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
  if (typeof obj2 === "undefined") {
    return "undefined";
  }
  if (obj2 === null) {
    return "null";
  }
  if (typeof obj2 === "boolean") {
    return obj2 ? "true" : "false";
  }
  if (typeof obj2 === "string") {
    return inspectString(obj2, opts);
  }
  if (typeof obj2 === "number") {
    if (obj2 === 0) {
      return Infinity / obj2 > 0 ? "0" : "-0";
    }
    var str = String(obj2);
    return numericSeparator ? addNumericSeparator(obj2, str) : str;
  }
  if (typeof obj2 === "bigint") {
    var bigIntStr = String(obj2) + "n";
    return numericSeparator ? addNumericSeparator(obj2, bigIntStr) : bigIntStr;
  }
  var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
  if (typeof depth === "undefined") {
    depth = 0;
  }
  if (depth >= maxDepth && maxDepth > 0 && typeof obj2 === "object") {
    return isArray$4(obj2) ? "[Array]" : "[Object]";
  }
  var indent = getIndent(opts, depth);
  if (typeof seen === "undefined") {
    seen = [];
  } else if (indexOf$1(seen, obj2) >= 0) {
    return "[Circular]";
  }
  function inspect2(value, from2, noIndent) {
    if (from2) {
      seen = $arrSlice.call(seen);
      seen.push(from2);
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
  if (typeof obj2 === "function" && !isRegExp$1(obj2)) {
    var name = nameOf(obj2);
    var keys2 = arrObjKeys(obj2, inspect2);
    return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys2.length > 0 ? " { " + $join.call(keys2, ", ") + " }" : "");
  }
  if (isSymbol(obj2)) {
    var symString = hasShammedSymbols ? $replace.call(String(obj2), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj2);
    return typeof obj2 === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
  }
  if (isElement(obj2)) {
    var s2 = "<" + $toLowerCase.call(String(obj2.nodeName));
    var attrs = obj2.attributes || [];
    for (var i2 = 0; i2 < attrs.length; i2++) {
      s2 += " " + attrs[i2].name + "=" + wrapQuotes(quote(attrs[i2].value), "double", opts);
    }
    s2 += ">";
    if (obj2.childNodes && obj2.childNodes.length) {
      s2 += "...";
    }
    s2 += "</" + $toLowerCase.call(String(obj2.nodeName)) + ">";
    return s2;
  }
  if (isArray$4(obj2)) {
    if (obj2.length === 0) {
      return "[]";
    }
    var xs = arrObjKeys(obj2, inspect2);
    if (indent && !singleLineValues(xs)) {
      return "[" + indentedJoin(xs, indent) + "]";
    }
    return "[ " + $join.call(xs, ", ") + " ]";
  }
  if (isError(obj2)) {
    var parts2 = arrObjKeys(obj2, inspect2);
    if (!("cause" in Error.prototype) && "cause" in obj2 && !isEnumerable.call(obj2, "cause")) {
      return "{ [" + String(obj2) + "] " + $join.call($concat.call("[cause]: " + inspect2(obj2.cause), parts2), ", ") + " }";
    }
    if (parts2.length === 0) {
      return "[" + String(obj2) + "]";
    }
    return "{ [" + String(obj2) + "] " + $join.call(parts2, ", ") + " }";
  }
  if (typeof obj2 === "object" && customInspect) {
    if (inspectSymbol && typeof obj2[inspectSymbol] === "function" && utilInspect) {
      return utilInspect(obj2, { depth: maxDepth - depth });
    } else if (customInspect !== "symbol" && typeof obj2.inspect === "function") {
      return obj2.inspect();
    }
  }
  if (isMap(obj2)) {
    var mapParts = [];
    if (mapForEach) {
      mapForEach.call(obj2, function(value, key2) {
        mapParts.push(inspect2(key2, obj2, true) + " => " + inspect2(value, obj2));
      });
    }
    return collectionOf("Map", mapSize.call(obj2), mapParts, indent);
  }
  if (isSet(obj2)) {
    var setParts = [];
    if (setForEach) {
      setForEach.call(obj2, function(value) {
        setParts.push(inspect2(value, obj2));
      });
    }
    return collectionOf("Set", setSize.call(obj2), setParts, indent);
  }
  if (isWeakMap(obj2)) {
    return weakCollectionOf("WeakMap");
  }
  if (isWeakSet(obj2)) {
    return weakCollectionOf("WeakSet");
  }
  if (isWeakRef(obj2)) {
    return weakCollectionOf("WeakRef");
  }
  if (isNumber$1(obj2)) {
    return markBoxed(inspect2(Number(obj2)));
  }
  if (isBigInt(obj2)) {
    return markBoxed(inspect2(bigIntValueOf.call(obj2)));
  }
  if (isBoolean(obj2)) {
    return markBoxed(booleanValueOf.call(obj2));
  }
  if (isString$1(obj2)) {
    return markBoxed(inspect2(String(obj2)));
  }
  if (!isDate$1(obj2) && !isRegExp$1(obj2)) {
    var ys = arrObjKeys(obj2, inspect2);
    var isPlainObject2 = gPO ? gPO(obj2) === Object.prototype : obj2 instanceof Object || obj2.constructor === Object;
    var protoTag = obj2 instanceof Object ? "" : "null prototype";
    var stringTag = !isPlainObject2 && toStringTag && Object(obj2) === obj2 && toStringTag in obj2 ? $slice.call(toStr(obj2), 8, -1) : protoTag ? "Object" : "";
    var constructorTag = isPlainObject2 || typeof obj2.constructor !== "function" ? "" : obj2.constructor.name ? obj2.constructor.name + " " : "";
    var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
    if (ys.length === 0) {
      return tag + "{}";
    }
    if (indent) {
      return tag + "{" + indentedJoin(ys, indent) + "}";
    }
    return tag + "{ " + $join.call(ys, ", ") + " }";
  }
  return String(obj2);
};
function wrapQuotes(s2, defaultStyle, opts) {
  var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
  return quoteChar + s2 + quoteChar;
}
function quote(s2) {
  return $replace.call(String(s2), /"/g, "&quot;");
}
function isArray$4(obj2) {
  return toStr(obj2) === "[object Array]" && (!toStringTag || !(typeof obj2 === "object" && toStringTag in obj2));
}
function isDate$1(obj2) {
  return toStr(obj2) === "[object Date]" && (!toStringTag || !(typeof obj2 === "object" && toStringTag in obj2));
}
function isRegExp$1(obj2) {
  return toStr(obj2) === "[object RegExp]" && (!toStringTag || !(typeof obj2 === "object" && toStringTag in obj2));
}
function isError(obj2) {
  return toStr(obj2) === "[object Error]" && (!toStringTag || !(typeof obj2 === "object" && toStringTag in obj2));
}
function isString$1(obj2) {
  return toStr(obj2) === "[object String]" && (!toStringTag || !(typeof obj2 === "object" && toStringTag in obj2));
}
function isNumber$1(obj2) {
  return toStr(obj2) === "[object Number]" && (!toStringTag || !(typeof obj2 === "object" && toStringTag in obj2));
}
function isBoolean(obj2) {
  return toStr(obj2) === "[object Boolean]" && (!toStringTag || !(typeof obj2 === "object" && toStringTag in obj2));
}
function isSymbol(obj2) {
  if (hasShammedSymbols) {
    return obj2 && typeof obj2 === "object" && obj2 instanceof Symbol;
  }
  if (typeof obj2 === "symbol") {
    return true;
  }
  if (!obj2 || typeof obj2 !== "object" || !symToString) {
    return false;
  }
  try {
    symToString.call(obj2);
    return true;
  } catch (e2) {
  }
  return false;
}
function isBigInt(obj2) {
  if (!obj2 || typeof obj2 !== "object" || !bigIntValueOf) {
    return false;
  }
  try {
    bigIntValueOf.call(obj2);
    return true;
  } catch (e2) {
  }
  return false;
}
var hasOwn = Object.prototype.hasOwnProperty || function(key2) {
  return key2 in this;
};
function has$3(obj2, key2) {
  return hasOwn.call(obj2, key2);
}
function toStr(obj2) {
  return objectToString.call(obj2);
}
function nameOf(f2) {
  if (f2.name) {
    return f2.name;
  }
  var m = $match.call(functionToString.call(f2), /^function\s*([\w$]+)/);
  if (m) {
    return m[1];
  }
  return null;
}
function indexOf$1(xs, x) {
  if (xs.indexOf) {
    return xs.indexOf(x);
  }
  for (var i2 = 0, l = xs.length; i2 < l; i2++) {
    if (xs[i2] === x) {
      return i2;
    }
  }
  return -1;
}
function isMap(x) {
  if (!mapSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    mapSize.call(x);
    try {
      setSize.call(x);
    } catch (s2) {
      return true;
    }
    return x instanceof Map;
  } catch (e2) {
  }
  return false;
}
function isWeakMap(x) {
  if (!weakMapHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakMapHas.call(x, weakMapHas);
    try {
      weakSetHas.call(x, weakSetHas);
    } catch (s2) {
      return true;
    }
    return x instanceof WeakMap;
  } catch (e2) {
  }
  return false;
}
function isWeakRef(x) {
  if (!weakRefDeref || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakRefDeref.call(x);
    return true;
  } catch (e2) {
  }
  return false;
}
function isSet(x) {
  if (!setSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    setSize.call(x);
    try {
      mapSize.call(x);
    } catch (m) {
      return true;
    }
    return x instanceof Set;
  } catch (e2) {
  }
  return false;
}
function isWeakSet(x) {
  if (!weakSetHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakSetHas.call(x, weakSetHas);
    try {
      weakMapHas.call(x, weakMapHas);
    } catch (s2) {
      return true;
    }
    return x instanceof WeakSet;
  } catch (e2) {
  }
  return false;
}
function isElement(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
    return true;
  }
  return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
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
function lowbyte(c) {
  var n2 = c.charCodeAt(0);
  var x = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[n2];
  if (x) {
    return "\\" + x;
  }
  return "\\x" + (n2 < 16 ? "0" : "") + $toUpperCase.call(n2.toString(16));
}
function markBoxed(str) {
  return "Object(" + str + ")";
}
function weakCollectionOf(type) {
  return type + " { ? }";
}
function collectionOf(type, size2, entries, indent) {
  var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
  return type + " (" + size2 + ") {" + joinedEntries + "}";
}
function singleLineValues(xs) {
  for (var i2 = 0; i2 < xs.length; i2++) {
    if (indexOf$1(xs[i2], "\n") >= 0) {
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
function indentedJoin(xs, indent) {
  if (xs.length === 0) {
    return "";
  }
  var lineJoiner = "\n" + indent.prev + indent.base;
  return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
}
function arrObjKeys(obj2, inspect2) {
  var isArr = isArray$4(obj2);
  var xs = [];
  if (isArr) {
    xs.length = obj2.length;
    for (var i2 = 0; i2 < obj2.length; i2++) {
      xs[i2] = has$3(obj2, i2) ? inspect2(obj2[i2], obj2) : "";
    }
  }
  var syms = typeof gOPS === "function" ? gOPS(obj2) : [];
  var symMap;
  if (hasShammedSymbols) {
    symMap = {};
    for (var k = 0; k < syms.length; k++) {
      symMap["$" + syms[k]] = syms[k];
    }
  }
  for (var key2 in obj2) {
    if (!has$3(obj2, key2)) {
      continue;
    }
    if (isArr && String(Number(key2)) === key2 && key2 < obj2.length) {
      continue;
    }
    if (hasShammedSymbols && symMap["$" + key2] instanceof Symbol) {
      continue;
    } else if ($test.call(/[^\w$]/, key2)) {
      xs.push(inspect2(key2, obj2) + ": " + inspect2(obj2[key2], obj2));
    } else {
      xs.push(key2 + ": " + inspect2(obj2[key2], obj2));
    }
  }
  if (typeof gOPS === "function") {
    for (var j = 0; j < syms.length; j++) {
      if (isEnumerable.call(obj2, syms[j])) {
        xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj2[syms[j]], obj2));
      }
    }
  }
  return xs;
}
var GetIntrinsic = getIntrinsic;
var callBound = callBound$1;
var inspect$1 = objectInspect;
var $TypeError = GetIntrinsic("%TypeError%");
var $WeakMap = GetIntrinsic("%WeakMap%", true);
var $Map = GetIntrinsic("%Map%", true);
var $weakMapGet = callBound("WeakMap.prototype.get", true);
var $weakMapSet = callBound("WeakMap.prototype.set", true);
var $weakMapHas = callBound("WeakMap.prototype.has", true);
var $mapGet = callBound("Map.prototype.get", true);
var $mapSet = callBound("Map.prototype.set", true);
var $mapHas = callBound("Map.prototype.has", true);
var listGetNode = function(list, key2) {
  for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
    if (curr.key === key2) {
      prev.next = curr.next;
      curr.next = list.next;
      list.next = curr;
      return curr;
    }
  }
};
var listGet = function(objects, key2) {
  var node = listGetNode(objects, key2);
  return node && node.value;
};
var listSet = function(objects, key2, value) {
  var node = listGetNode(objects, key2);
  if (node) {
    node.value = value;
  } else {
    objects.next = {
      // eslint-disable-line no-param-reassign
      key: key2,
      next: objects.next,
      value
    };
  }
};
var listHas = function(objects, key2) {
  return !!listGetNode(objects, key2);
};
var sideChannel = function getSideChannel2() {
  var $wm;
  var $m;
  var $o;
  var channel = {
    assert: function(key2) {
      if (!channel.has(key2)) {
        throw new $TypeError("Side channel does not contain " + inspect$1(key2));
      }
    },
    get: function(key2) {
      if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
        if ($wm) {
          return $weakMapGet($wm, key2);
        }
      } else if ($Map) {
        if ($m) {
          return $mapGet($m, key2);
        }
      } else {
        if ($o) {
          return listGet($o, key2);
        }
      }
    },
    has: function(key2) {
      if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
        if ($wm) {
          return $weakMapHas($wm, key2);
        }
      } else if ($Map) {
        if ($m) {
          return $mapHas($m, key2);
        }
      } else {
        if ($o) {
          return listHas($o, key2);
        }
      }
      return false;
    },
    set: function(key2, value) {
      if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
        if (!$wm) {
          $wm = new $WeakMap();
        }
        $weakMapSet($wm, key2, value);
      } else if ($Map) {
        if (!$m) {
          $m = new $Map();
        }
        $mapSet($m, key2, value);
      } else {
        if (!$o) {
          $o = { key: {}, next: null };
        }
        listSet($o, key2, value);
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
var isArray$3 = Array.isArray;
var hexTable = function() {
  var array = [];
  for (var i2 = 0; i2 < 256; ++i2) {
    array.push("%" + ((i2 < 16 ? "0" : "") + i2.toString(16)).toUpperCase());
  }
  return array;
}();
var compactQueue = function compactQueue2(queue2) {
  while (queue2.length > 1) {
    var item = queue2.pop();
    var obj2 = item.obj[item.prop];
    if (isArray$3(obj2)) {
      var compacted = [];
      for (var j = 0; j < obj2.length; ++j) {
        if (typeof obj2[j] !== "undefined") {
          compacted.push(obj2[j]);
        }
      }
      item.obj[item.prop] = compacted;
    }
  }
};
var arrayToObject = function arrayToObject2(source, options2) {
  var obj2 = options2 && options2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var i2 = 0; i2 < source.length; ++i2) {
    if (typeof source[i2] !== "undefined") {
      obj2[i2] = source[i2];
    }
  }
  return obj2;
};
var merge = function merge2(target, source, options2) {
  if (!source) {
    return target;
  }
  if (typeof source !== "object") {
    if (isArray$3(target)) {
      target.push(source);
    } else if (target && typeof target === "object") {
      if (options2 && (options2.plainObjects || options2.allowPrototypes) || !has$2.call(Object.prototype, source)) {
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
  if (isArray$3(target) && !isArray$3(source)) {
    mergeTarget = arrayToObject(target, options2);
  }
  if (isArray$3(target) && isArray$3(source)) {
    source.forEach(function(item, i2) {
      if (has$2.call(target, i2)) {
        var targetItem = target[i2];
        if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
          target[i2] = merge2(targetItem, item, options2);
        } else {
          target.push(item);
        }
      } else {
        target[i2] = item;
      }
    });
    return target;
  }
  return Object.keys(source).reduce(function(acc, key2) {
    var value = source[key2];
    if (has$2.call(acc, key2)) {
      acc[key2] = merge2(acc[key2], value, options2);
    } else {
      acc[key2] = value;
    }
    return acc;
  }, mergeTarget);
};
var assign$1 = function assignSingleSource(target, source) {
  return Object.keys(source).reduce(function(acc, key2) {
    acc[key2] = source[key2];
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
  } catch (e2) {
    return strWithoutPlus;
  }
};
var encode = function encode2(str, defaultEncoder, charset, kind, format2) {
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
    var c = string.charCodeAt(i2);
    if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format2 === formats$2.RFC1738 && (c === 40 || c === 41)) {
      out += string.charAt(i2);
      continue;
    }
    if (c < 128) {
      out = out + hexTable[c];
      continue;
    }
    if (c < 2048) {
      out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
      continue;
    }
    if (c < 55296 || c >= 57344) {
      out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
      continue;
    }
    i2 += 1;
    c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i2) & 1023);
    out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
  }
  return out;
};
var compact = function compact2(value) {
  var queue2 = [{ obj: { o: value }, prop: "o" }];
  var refs = [];
  for (var i2 = 0; i2 < queue2.length; ++i2) {
    var item = queue2[i2];
    var obj2 = item.obj[item.prop];
    var keys2 = Object.keys(obj2);
    for (var j = 0; j < keys2.length; ++j) {
      var key2 = keys2[j];
      var val = obj2[key2];
      if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
        queue2.push({ obj: obj2, prop: key2 });
        refs.push(val);
      }
    }
  }
  compactQueue(queue2);
  return value;
};
var isRegExp = function isRegExp2(obj2) {
  return Object.prototype.toString.call(obj2) === "[object RegExp]";
};
var isBuffer = function isBuffer2(obj2) {
  if (!obj2 || typeof obj2 !== "object") {
    return false;
  }
  return !!(obj2.constructor && obj2.constructor.isBuffer && obj2.constructor.isBuffer(obj2));
};
var combine = function combine2(a, b) {
  return [].concat(a, b);
};
var maybeMap = function maybeMap2(val, fn) {
  if (isArray$3(val)) {
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
  indices: function indices(prefix, key2) {
    return prefix + "[" + key2 + "]";
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray$2 = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function(arr, valueOrArray) {
  push.apply(arr, isArray$2(valueOrArray) ? valueOrArray : [valueOrArray]);
};
var toISO = Date.prototype.toISOString;
var defaultFormat = formats$1["default"];
var defaults$2 = {
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
var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
};
var sentinel = {};
var stringify$1 = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate2, format2, formatter, encodeValuesOnly, charset, sideChannel2) {
  var obj2 = object;
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
    obj2 = filter(prefix, obj2);
  } else if (obj2 instanceof Date) {
    obj2 = serializeDate2(obj2);
  } else if (generateArrayPrefix === "comma" && isArray$2(obj2)) {
    obj2 = utils$1.maybeMap(obj2, function(value2) {
      if (value2 instanceof Date) {
        return serializeDate2(value2);
      }
      return value2;
    });
  }
  if (obj2 === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults$2.encoder, charset, "key", format2) : prefix;
    }
    obj2 = "";
  }
  if (isNonNullishPrimitive(obj2) || utils$1.isBuffer(obj2)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$2.encoder, charset, "key", format2);
      return [formatter(keyValue) + "=" + formatter(encoder(obj2, defaults$2.encoder, charset, "value", format2))];
    }
    return [formatter(prefix) + "=" + formatter(String(obj2))];
  }
  var values = [];
  if (typeof obj2 === "undefined") {
    return values;
  }
  var objKeys;
  if (generateArrayPrefix === "comma" && isArray$2(obj2)) {
    if (encodeValuesOnly && encoder) {
      obj2 = utils$1.maybeMap(obj2, encoder);
    }
    objKeys = [{ value: obj2.length > 0 ? obj2.join(",") || null : void 0 }];
  } else if (isArray$2(filter)) {
    objKeys = filter;
  } else {
    var keys2 = Object.keys(obj2);
    objKeys = sort ? keys2.sort(sort) : keys2;
  }
  var adjustedPrefix = commaRoundTrip && isArray$2(obj2) && obj2.length === 1 ? prefix + "[]" : prefix;
  for (var j = 0; j < objKeys.length; ++j) {
    var key2 = objKeys[j];
    var value = typeof key2 === "object" && typeof key2.value !== "undefined" ? key2.value : obj2[key2];
    if (skipNulls && value === null) {
      continue;
    }
    var keyPrefix = isArray$2(obj2) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key2) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key2 : "[" + key2 + "]");
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
      generateArrayPrefix === "comma" && encodeValuesOnly && isArray$2(obj2) ? null : encoder,
      filter,
      sort,
      allowDots,
      serializeDate2,
      format2,
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
    return defaults$2;
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  var charset = opts.charset || defaults$2.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var format2 = formats$1["default"];
  if (typeof opts.format !== "undefined") {
    if (!has$1.call(formats$1.formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format2 = opts.format;
  }
  var formatter = formats$1.formatters[format2];
  var filter = defaults$2.filter;
  if (typeof opts.filter === "function" || isArray$2(opts.filter)) {
    filter = opts.filter;
  }
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults$2.addQueryPrefix,
    allowDots: typeof opts.allowDots === "undefined" ? defaults$2.allowDots : !!opts.allowDots,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$2.charsetSentinel,
    delimiter: typeof opts.delimiter === "undefined" ? defaults$2.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults$2.encode,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults$2.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults$2.encodeValuesOnly,
    filter,
    format: format2,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults$2.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults$2.skipNulls,
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$2.strictNullHandling
  };
};
var stringify_1 = function(object, opts) {
  var obj2 = object;
  var options2 = normalizeStringifyOptions(opts);
  var objKeys;
  var filter;
  if (typeof options2.filter === "function") {
    filter = options2.filter;
    obj2 = filter("", obj2);
  } else if (isArray$2(options2.filter)) {
    filter = options2.filter;
    objKeys = filter;
  }
  var keys2 = [];
  if (typeof obj2 !== "object" || obj2 === null) {
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
    objKeys = Object.keys(obj2);
  }
  if (options2.sort) {
    objKeys.sort(options2.sort);
  }
  var sideChannel2 = getSideChannel();
  for (var i2 = 0; i2 < objKeys.length; ++i2) {
    var key2 = objKeys[i2];
    if (options2.skipNulls && obj2[key2] === null) {
      continue;
    }
    pushToArray(keys2, stringify$1(
      obj2[key2],
      key2,
      generateArrayPrefix,
      commaRoundTrip,
      options2.strictNullHandling,
      options2.skipNulls,
      options2.encode ? options2.encoder : null,
      options2.filter,
      options2.sort,
      options2.allowDots,
      options2.serializeDate,
      options2.format,
      options2.formatter,
      options2.encodeValuesOnly,
      options2.charset,
      sideChannel2
    ));
  }
  var joined = keys2.join(options2.delimiter);
  var prefix = options2.addQueryPrefix === true ? "?" : "";
  if (options2.charsetSentinel) {
    if (options2.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
};
var utils = utils$2;
var has = Object.prototype.hasOwnProperty;
var isArray$1 = Array.isArray;
var defaults$1 = {
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
var parseArrayValue = function(val, options2) {
  if (val && typeof val === "string" && options2.comma && val.indexOf(",") > -1) {
    return val.split(",");
  }
  return val;
};
var isoSentinel = "utf8=%26%2310003%3B";
var charsetSentinel = "utf8=%E2%9C%93";
var parseValues = function parseQueryStringValues(str, options2) {
  var obj2 = { __proto__: null };
  var cleanStr = options2.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
  var limit = options2.parameterLimit === Infinity ? void 0 : options2.parameterLimit;
  var parts2 = cleanStr.split(options2.delimiter, limit);
  var skipIndex = -1;
  var i2;
  var charset = options2.charset;
  if (options2.charsetSentinel) {
    for (i2 = 0; i2 < parts2.length; ++i2) {
      if (parts2[i2].indexOf("utf8=") === 0) {
        if (parts2[i2] === charsetSentinel) {
          charset = "utf-8";
        } else if (parts2[i2] === isoSentinel) {
          charset = "iso-8859-1";
        }
        skipIndex = i2;
        i2 = parts2.length;
      }
    }
  }
  for (i2 = 0; i2 < parts2.length; ++i2) {
    if (i2 === skipIndex) {
      continue;
    }
    var part = parts2[i2];
    var bracketEqualsPos = part.indexOf("]=");
    var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
    var key2, val;
    if (pos === -1) {
      key2 = options2.decoder(part, defaults$1.decoder, charset, "key");
      val = options2.strictNullHandling ? null : "";
    } else {
      key2 = options2.decoder(part.slice(0, pos), defaults$1.decoder, charset, "key");
      val = utils.maybeMap(
        parseArrayValue(part.slice(pos + 1), options2),
        function(encodedVal) {
          return options2.decoder(encodedVal, defaults$1.decoder, charset, "value");
        }
      );
    }
    if (val && options2.interpretNumericEntities && charset === "iso-8859-1") {
      val = interpretNumericEntities(val);
    }
    if (part.indexOf("[]=") > -1) {
      val = isArray$1(val) ? [val] : val;
    }
    if (has.call(obj2, key2)) {
      obj2[key2] = utils.combine(obj2[key2], val);
    } else {
      obj2[key2] = val;
    }
  }
  return obj2;
};
var parseObject = function(chain, val, options2, valuesParsed) {
  var leaf = valuesParsed ? val : parseArrayValue(val, options2);
  for (var i2 = chain.length - 1; i2 >= 0; --i2) {
    var obj2;
    var root = chain[i2];
    if (root === "[]" && options2.parseArrays) {
      obj2 = [].concat(leaf);
    } else {
      obj2 = options2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
      var index2 = parseInt(cleanRoot, 10);
      if (!options2.parseArrays && cleanRoot === "") {
        obj2 = { 0: leaf };
      } else if (!isNaN(index2) && root !== cleanRoot && String(index2) === cleanRoot && index2 >= 0 && (options2.parseArrays && index2 <= options2.arrayLimit)) {
        obj2 = [];
        obj2[index2] = leaf;
      } else if (cleanRoot !== "__proto__") {
        obj2[cleanRoot] = leaf;
      }
    }
    leaf = obj2;
  }
  return leaf;
};
var parseKeys = function parseQueryStringKeys(givenKey, val, options2, valuesParsed) {
  if (!givenKey) {
    return;
  }
  var key2 = options2.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
  var brackets2 = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g;
  var segment = options2.depth > 0 && brackets2.exec(key2);
  var parent = segment ? key2.slice(0, segment.index) : key2;
  var keys2 = [];
  if (parent) {
    if (!options2.plainObjects && has.call(Object.prototype, parent)) {
      if (!options2.allowPrototypes) {
        return;
      }
    }
    keys2.push(parent);
  }
  var i2 = 0;
  while (options2.depth > 0 && (segment = child.exec(key2)) !== null && i2 < options2.depth) {
    i2 += 1;
    if (!options2.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options2.allowPrototypes) {
        return;
      }
    }
    keys2.push(segment[1]);
  }
  if (segment) {
    keys2.push("[" + key2.slice(segment.index) + "]");
  }
  return parseObject(keys2, val, options2, valuesParsed);
};
var normalizeParseOptions = function normalizeParseOptions2(opts) {
  if (!opts) {
    return defaults$1;
  }
  if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
    throw new TypeError("Decoder has to be a function.");
  }
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var charset = typeof opts.charset === "undefined" ? defaults$1.charset : opts.charset;
  return {
    allowDots: typeof opts.allowDots === "undefined" ? defaults$1.allowDots : !!opts.allowDots,
    allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults$1.allowPrototypes,
    allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults$1.allowSparse,
    arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults$1.arrayLimit,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$1.charsetSentinel,
    comma: typeof opts.comma === "boolean" ? opts.comma : defaults$1.comma,
    decoder: typeof opts.decoder === "function" ? opts.decoder : defaults$1.decoder,
    delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults$1.depth,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults$1.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults$1.plainObjects,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$1.strictNullHandling
  };
};
var parse$1 = function(str, opts) {
  var options2 = normalizeParseOptions(opts);
  if (str === "" || str === null || typeof str === "undefined") {
    return options2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  }
  var tempObj = typeof str === "string" ? parseValues(str, options2) : str;
  var obj2 = options2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  var keys2 = Object.keys(tempObj);
  for (var i2 = 0; i2 < keys2.length; ++i2) {
    var key2 = keys2[i2];
    var newObj = parseKeys(key2, tempObj[key2], options2, typeof str === "string");
    obj2 = utils.merge(obj2, newObj, options2);
  }
  if (options2.allowSparse === true) {
    return obj2;
  }
  return utils.compact(obj2);
};
var stringify = stringify_1;
var parse = parse$1;
var formats = formats$3;
var lib = {
  formats,
  parse,
  stringify
};
/*! js-cookie v3.0.5 | MIT */
function assign(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key2 in source) {
      target[key2] = source[key2];
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
  function set2(name, value, attributes) {
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
  function get3(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i2 = 0; i2 < cookies.length; i2++) {
      var parts2 = cookies[i2].split("=");
      var value = parts2.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts2[0]);
        jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (e2) {
      }
    }
    return name ? jar[name] : jar;
  }
  return Object.create(
    {
      set: set2,
      get: get3,
      remove: function(name, attributes) {
        set2(
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
var api = init(defaultConverter, { path: "/" });
var mockExports = {};
var mock = {
  get exports() {
    return mockExports;
  },
  set exports(v) {
    mockExports = v;
  }
};
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    return (
      /******/
      function(modules) {
        var installedModules = {};
        function __webpack_require__2(moduleId) {
          if (installedModules[moduleId])
            return installedModules[moduleId].exports;
          var module2 = installedModules[moduleId] = {
            /******/
            exports: {},
            /******/
            id: moduleId,
            /******/
            loaded: false
            /******/
          };
          modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__2);
          module2.loaded = true;
          return module2.exports;
        }
        __webpack_require__2.m = modules;
        __webpack_require__2.c = installedModules;
        __webpack_require__2.p = "";
        return __webpack_require__2(0);
      }([
        /* 0 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Handler2 = __webpack_require__2(1);
          var Util2 = __webpack_require__2(3);
          var Random2 = __webpack_require__2(5);
          var RE2 = __webpack_require__2(20);
          var toJSONSchema = __webpack_require__2(23);
          var valid = __webpack_require__2(25);
          var XHR;
          if (typeof window !== "undefined")
            XHR = __webpack_require__2(27);
          /*!
              Mock - 模拟请求 & 模拟数据
              https://github.com/nuysoft/Mock
              墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
          */
          var Mock = {
            Handler: Handler2,
            Random: Random2,
            Util: Util2,
            XHR,
            RE: RE2,
            toJSONSchema,
            valid,
            heredoc: Util2.heredoc,
            setup: function(settings) {
              return XHR.setup(settings);
            },
            _mocked: {}
          };
          Mock.version = "1.0.1-beta3";
          if (XHR)
            XHR.Mock = Mock;
          Mock.mock = function(rurl, rtype, template) {
            if (arguments.length === 1) {
              return Handler2.gen(rurl);
            }
            if (arguments.length === 2) {
              template = rtype;
              rtype = void 0;
            }
            if (XHR)
              window.XMLHttpRequest = XHR;
            Mock._mocked[rurl + (rtype || "")] = {
              rurl,
              rtype,
              template
            };
            return Mock;
          };
          module2.exports = Mock;
        },
        /* 1 */
        /***/
        function(module, exports, __webpack_require__) {
          var Constant = __webpack_require__(2);
          var Util = __webpack_require__(3);
          var Parser = __webpack_require__(4);
          var Random = __webpack_require__(5);
          var RE = __webpack_require__(20);
          var Handler = {
            extend: Util.extend
          };
          Handler.gen = function(template, name, context) {
            name = name == void 0 ? "" : name + "";
            context = context || {};
            context = {
              // 当前访问路径，只有属性名，不包括生成规则
              path: context.path || [Constant.GUID],
              templatePath: context.templatePath || [Constant.GUID++],
              // 最终属性值的上下文
              currentContext: context.currentContext,
              // 属性值模板的上下文
              templateCurrentContext: context.templateCurrentContext || template,
              // 最终值的根
              root: context.root || context.currentContext,
              // 模板的根
              templateRoot: context.templateRoot || context.templateCurrentContext || template
            };
            var rule = Parser.parse(name);
            var type = Util.type(template);
            var data;
            if (Handler[type]) {
              data = Handler[type]({
                // 属性值类型
                type,
                // 属性值模板
                template,
                // 属性名 + 生成规则
                name,
                // 属性名
                parsedName: name ? name.replace(Constant.RE_KEY, "$1") : name,
                // 解析后的生成规则
                rule,
                // 相关上下文
                context
              });
              if (!context.root)
                context.root = data;
              return data;
            }
            return template;
          };
          Handler.extend({
            array: function(options2) {
              var result = [], i2, ii;
              if (options2.template.length === 0)
                return result;
              if (!options2.rule.parameters) {
                for (i2 = 0; i2 < options2.template.length; i2++) {
                  options2.context.path.push(i2);
                  options2.context.templatePath.push(i2);
                  result.push(
                    Handler.gen(options2.template[i2], i2, {
                      path: options2.context.path,
                      templatePath: options2.context.templatePath,
                      currentContext: result,
                      templateCurrentContext: options2.template,
                      root: options2.context.root || result,
                      templateRoot: options2.context.templateRoot || options2.template
                    })
                  );
                  options2.context.path.pop();
                  options2.context.templatePath.pop();
                }
              } else {
                if (options2.rule.min === 1 && options2.rule.max === void 0) {
                  options2.context.path.push(options2.name);
                  options2.context.templatePath.push(options2.name);
                  result = Random.pick(
                    Handler.gen(options2.template, void 0, {
                      path: options2.context.path,
                      templatePath: options2.context.templatePath,
                      currentContext: result,
                      templateCurrentContext: options2.template,
                      root: options2.context.root || result,
                      templateRoot: options2.context.templateRoot || options2.template
                    })
                  );
                  options2.context.path.pop();
                  options2.context.templatePath.pop();
                } else {
                  if (options2.rule.parameters[2]) {
                    options2.template.__order_index = options2.template.__order_index || 0;
                    options2.context.path.push(options2.name);
                    options2.context.templatePath.push(options2.name);
                    result = Handler.gen(options2.template, void 0, {
                      path: options2.context.path,
                      templatePath: options2.context.templatePath,
                      currentContext: result,
                      templateCurrentContext: options2.template,
                      root: options2.context.root || result,
                      templateRoot: options2.context.templateRoot || options2.template
                    })[options2.template.__order_index % options2.template.length];
                    options2.template.__order_index += +options2.rule.parameters[2];
                    options2.context.path.pop();
                    options2.context.templatePath.pop();
                  } else {
                    for (i2 = 0; i2 < options2.rule.count; i2++) {
                      for (ii = 0; ii < options2.template.length; ii++) {
                        options2.context.path.push(result.length);
                        options2.context.templatePath.push(ii);
                        result.push(
                          Handler.gen(options2.template[ii], result.length, {
                            path: options2.context.path,
                            templatePath: options2.context.templatePath,
                            currentContext: result,
                            templateCurrentContext: options2.template,
                            root: options2.context.root || result,
                            templateRoot: options2.context.templateRoot || options2.template
                          })
                        );
                        options2.context.path.pop();
                        options2.context.templatePath.pop();
                      }
                    }
                  }
                }
              }
              return result;
            },
            object: function(options2) {
              var result = {}, keys2, fnKeys, key2, parsedKey, inc, i2;
              if (options2.rule.min != void 0) {
                keys2 = Util.keys(options2.template);
                keys2 = Random.shuffle(keys2);
                keys2 = keys2.slice(0, options2.rule.count);
                for (i2 = 0; i2 < keys2.length; i2++) {
                  key2 = keys2[i2];
                  parsedKey = key2.replace(Constant.RE_KEY, "$1");
                  options2.context.path.push(parsedKey);
                  options2.context.templatePath.push(key2);
                  result[parsedKey] = Handler.gen(options2.template[key2], key2, {
                    path: options2.context.path,
                    templatePath: options2.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options2.template,
                    root: options2.context.root || result,
                    templateRoot: options2.context.templateRoot || options2.template
                  });
                  options2.context.path.pop();
                  options2.context.templatePath.pop();
                }
              } else {
                keys2 = [];
                fnKeys = [];
                for (key2 in options2.template) {
                  (typeof options2.template[key2] === "function" ? fnKeys : keys2).push(key2);
                }
                keys2 = keys2.concat(fnKeys);
                for (i2 = 0; i2 < keys2.length; i2++) {
                  key2 = keys2[i2];
                  parsedKey = key2.replace(Constant.RE_KEY, "$1");
                  options2.context.path.push(parsedKey);
                  options2.context.templatePath.push(key2);
                  result[parsedKey] = Handler.gen(options2.template[key2], key2, {
                    path: options2.context.path,
                    templatePath: options2.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options2.template,
                    root: options2.context.root || result,
                    templateRoot: options2.context.templateRoot || options2.template
                  });
                  options2.context.path.pop();
                  options2.context.templatePath.pop();
                  inc = key2.match(Constant.RE_KEY);
                  if (inc && inc[2] && Util.type(options2.template[key2]) === "number") {
                    options2.template[key2] += parseInt(inc[2], 10);
                  }
                }
              }
              return result;
            },
            number: function(options2) {
              var result, parts2;
              if (options2.rule.decimal) {
                options2.template += "";
                parts2 = options2.template.split(".");
                parts2[0] = options2.rule.range ? options2.rule.count : parts2[0];
                parts2[1] = (parts2[1] || "").slice(0, options2.rule.dcount);
                while (parts2[1].length < options2.rule.dcount) {
                  parts2[1] += // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
                  parts2[1].length < options2.rule.dcount - 1 ? Random.character("number") : Random.character("123456789");
                }
                result = parseFloat(parts2.join("."), 10);
              } else {
                result = options2.rule.range && !options2.rule.parameters[2] ? options2.rule.count : options2.template;
              }
              return result;
            },
            boolean: function(options2) {
              var result;
              result = options2.rule.parameters ? Random.bool(options2.rule.min, options2.rule.max, options2.template) : options2.template;
              return result;
            },
            string: function(options2) {
              var result = "", i2, placeholders, ph, phed;
              if (options2.template.length) {
                if (options2.rule.count == void 0) {
                  result += options2.template;
                }
                for (i2 = 0; i2 < options2.rule.count; i2++) {
                  result += options2.template;
                }
                placeholders = result.match(Constant.RE_PLACEHOLDER) || [];
                for (i2 = 0; i2 < placeholders.length; i2++) {
                  ph = placeholders[i2];
                  if (/^\\/.test(ph)) {
                    placeholders.splice(i2--, 1);
                    continue;
                  }
                  phed = Handler.placeholder(ph, options2.context.currentContext, options2.context.templateCurrentContext, options2);
                  if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) {
                    result = phed;
                    break;
                  }
                  result = result.replace(ph, phed);
                }
              } else {
                result = options2.rule.range ? Random.string(options2.rule.count) : options2.template;
              }
              return result;
            },
            "function": function(options2) {
              return options2.template.call(options2.context.currentContext, options2);
            },
            "regexp": function(options2) {
              var source = "";
              if (options2.rule.count == void 0) {
                source += options2.template.source;
              }
              for (var i2 = 0; i2 < options2.rule.count; i2++) {
                source += options2.template.source;
              }
              return RE.Handler.gen(
                RE.Parser.parse(
                  source
                )
              );
            }
          });
          Handler.extend({
            _all: function() {
              var re2 = {};
              for (var key2 in Random)
                re2[key2.toLowerCase()] = key2;
              return re2;
            },
            // 处理占位符，转换为最终值
            placeholder: function(placeholder, obj, templateContext, options) {
              Constant.RE_PLACEHOLDER.exec("");
              var parts = Constant.RE_PLACEHOLDER.exec(placeholder), key = parts && parts[1], lkey = key && key.toLowerCase(), okey = this._all()[lkey], params = parts && parts[2] || "";
              var pathParts = this.splitPathToArray(key);
              try {
                params = eval("(function(){ return [].splice.call(arguments, 0 ) })(" + params + ")");
              } catch (error) {
                params = parts[2].split(/,\s*/);
              }
              if (obj && key in obj)
                return obj[key];
              if (key.charAt(0) === "/" || pathParts.length > 1)
                return this.getValueByKeyPath(key, options);
              if (templateContext && typeof templateContext === "object" && key in templateContext && placeholder !== templateContext[key]) {
                templateContext[key] = Handler.gen(templateContext[key], key, {
                  currentContext: obj,
                  templateCurrentContext: templateContext
                });
                return templateContext[key];
              }
              if (!(key in Random) && !(lkey in Random) && !(okey in Random))
                return placeholder;
              for (var i = 0; i < params.length; i++) {
                Constant.RE_PLACEHOLDER.exec("");
                if (Constant.RE_PLACEHOLDER.test(params[i])) {
                  params[i] = Handler.placeholder(params[i], obj, templateContext, options);
                }
              }
              var handle = Random[key] || Random[lkey] || Random[okey];
              switch (Util.type(handle)) {
                case "array":
                  return Random.pick(handle);
                case "function":
                  handle.options = options;
                  var re = handle.apply(Random, params);
                  if (re === void 0)
                    re = "";
                  delete handle.options;
                  return re;
              }
            },
            getValueByKeyPath: function(key2, options2) {
              var originalKey = key2;
              var keyPathParts = this.splitPathToArray(key2);
              var absolutePathParts = [];
              if (key2.charAt(0) === "/") {
                absolutePathParts = [options2.context.path[0]].concat(
                  this.normalizePath(keyPathParts)
                );
              } else {
                if (keyPathParts.length > 1) {
                  absolutePathParts = options2.context.path.slice(0);
                  absolutePathParts.pop();
                  absolutePathParts = this.normalizePath(
                    absolutePathParts.concat(keyPathParts)
                  );
                }
              }
              try {
                key2 = keyPathParts[keyPathParts.length - 1];
                var currentContext = options2.context.root;
                var templateCurrentContext = options2.context.templateRoot;
                for (var i2 = 1; i2 < absolutePathParts.length - 1; i2++) {
                  currentContext = currentContext[absolutePathParts[i2]];
                  templateCurrentContext = templateCurrentContext[absolutePathParts[i2]];
                }
                if (currentContext && key2 in currentContext)
                  return currentContext[key2];
                if (templateCurrentContext && typeof templateCurrentContext === "object" && key2 in templateCurrentContext && originalKey !== templateCurrentContext[key2]) {
                  templateCurrentContext[key2] = Handler.gen(templateCurrentContext[key2], key2, {
                    currentContext,
                    templateCurrentContext
                  });
                  return templateCurrentContext[key2];
                }
              } catch (err) {
              }
              return "@" + keyPathParts.join("/");
            },
            // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
            normalizePath: function(pathParts2) {
              var newPathParts = [];
              for (var i2 = 0; i2 < pathParts2.length; i2++) {
                switch (pathParts2[i2]) {
                  case "..":
                    newPathParts.pop();
                    break;
                  case ".":
                    break;
                  default:
                    newPathParts.push(pathParts2[i2]);
                }
              }
              return newPathParts;
            },
            splitPathToArray: function(path) {
              var parts2 = path.split(/\/+/);
              if (!parts2[parts2.length - 1])
                parts2 = parts2.slice(0, -1);
              if (!parts2[0])
                parts2 = parts2.slice(1);
              return parts2;
            }
          });
          module.exports = Handler;
        },
        /* 2 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            GUID: 1,
            RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
            RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
            RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
            // /\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g
            // RE_INDEX: /^index$/,
            // RE_KEY: /^key$/
          };
        },
        /* 3 */
        /***/
        function(module2, exports2) {
          var Util2 = {};
          Util2.extend = function extend2() {
            var target = arguments[0] || {}, i2 = 1, length = arguments.length, options2, name, src2, copy, clone2;
            if (length === 1) {
              target = this;
              i2 = 0;
            }
            for (; i2 < length; i2++) {
              options2 = arguments[i2];
              if (!options2)
                continue;
              for (name in options2) {
                src2 = target[name];
                copy = options2[name];
                if (target === copy)
                  continue;
                if (copy === void 0)
                  continue;
                if (Util2.isArray(copy) || Util2.isObject(copy)) {
                  if (Util2.isArray(copy))
                    clone2 = src2 && Util2.isArray(src2) ? src2 : [];
                  if (Util2.isObject(copy))
                    clone2 = src2 && Util2.isObject(src2) ? src2 : {};
                  target[name] = Util2.extend(clone2, copy);
                } else {
                  target[name] = copy;
                }
              }
            }
            return target;
          };
          Util2.each = function each(obj2, iterator, context) {
            var i2, key2;
            if (this.type(obj2) === "number") {
              for (i2 = 0; i2 < obj2; i2++) {
                iterator(i2, i2);
              }
            } else if (obj2.length === +obj2.length) {
              for (i2 = 0; i2 < obj2.length; i2++) {
                if (iterator.call(context, obj2[i2], i2, obj2) === false)
                  break;
              }
            } else {
              for (key2 in obj2) {
                if (iterator.call(context, obj2[key2], key2, obj2) === false)
                  break;
              }
            }
          };
          Util2.type = function type(obj2) {
            return obj2 === null || obj2 === void 0 ? String(obj2) : Object.prototype.toString.call(obj2).match(/\[object (\w+)\]/)[1].toLowerCase();
          };
          Util2.each("String Object Array RegExp Function".split(" "), function(value) {
            Util2["is" + value] = function(obj2) {
              return Util2.type(obj2) === value.toLowerCase();
            };
          });
          Util2.isObjectOrArray = function(value) {
            return Util2.isObject(value) || Util2.isArray(value);
          };
          Util2.isNumeric = function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
          };
          Util2.keys = function(obj2) {
            var keys2 = [];
            for (var key2 in obj2) {
              if (obj2.hasOwnProperty(key2))
                keys2.push(key2);
            }
            return keys2;
          };
          Util2.values = function(obj2) {
            var values = [];
            for (var key2 in obj2) {
              if (obj2.hasOwnProperty(key2))
                values.push(obj2[key2]);
            }
            return values;
          };
          Util2.heredoc = function heredoc(fn) {
            return fn.toString().replace(/^[^\/]+\/\*!?/, "").replace(/\*\/[^\/]+$/, "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
          };
          Util2.noop = function() {
          };
          module2.exports = Util2;
        },
        /* 4 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Constant2 = __webpack_require__2(2);
          var Random2 = __webpack_require__2(5);
          module2.exports = {
            parse: function(name) {
              name = name == void 0 ? "" : name + "";
              var parameters = (name || "").match(Constant2.RE_KEY);
              var range = parameters && parameters[3] && parameters[3].match(Constant2.RE_RANGE);
              var min2 = range && range[1] && parseInt(range[1], 10);
              var max2 = range && range[2] && parseInt(range[2], 10);
              var count2 = range ? !range[2] ? parseInt(range[1], 10) : Random2.integer(min2, max2) : void 0;
              var decimal = parameters && parameters[4] && parameters[4].match(Constant2.RE_RANGE);
              var dmin = decimal && decimal[1] && parseInt(decimal[1], 10);
              var dmax = decimal && decimal[2] && parseInt(decimal[2], 10);
              var dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random2.integer(dmin, dmax) : void 0;
              var result = {
                // 1 name, 2 inc, 3 range, 4 decimal
                parameters,
                // 1 min, 2 max
                range,
                min: min2,
                max: max2,
                // min-max
                count: count2,
                // 是否有 decimal
                decimal,
                dmin,
                dmax,
                // dmin-dimax
                dcount
              };
              for (var r in result) {
                if (result[r] != void 0)
                  return result;
              }
              return {};
            }
          };
        },
        /* 5 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Util2 = __webpack_require__2(3);
          var Random2 = {
            extend: Util2.extend
          };
          Random2.extend(__webpack_require__2(6));
          Random2.extend(__webpack_require__2(7));
          Random2.extend(__webpack_require__2(8));
          Random2.extend(__webpack_require__2(10));
          Random2.extend(__webpack_require__2(13));
          Random2.extend(__webpack_require__2(15));
          Random2.extend(__webpack_require__2(16));
          Random2.extend(__webpack_require__2(17));
          Random2.extend(__webpack_require__2(14));
          Random2.extend(__webpack_require__2(19));
          module2.exports = Random2;
        },
        /* 6 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            // 返回一个随机的布尔值。
            boolean: function(min2, max2, cur) {
              if (cur !== void 0) {
                min2 = typeof min2 !== "undefined" && !isNaN(min2) ? parseInt(min2, 10) : 1;
                max2 = typeof max2 !== "undefined" && !isNaN(max2) ? parseInt(max2, 10) : 1;
                return Math.random() > 1 / (min2 + max2) * min2 ? !cur : cur;
              }
              return Math.random() >= 0.5;
            },
            bool: function(min2, max2, cur) {
              return this.boolean(min2, max2, cur);
            },
            // 返回一个随机的自然数（大于等于 0 的整数）。
            natural: function(min2, max2) {
              min2 = typeof min2 !== "undefined" ? parseInt(min2, 10) : 0;
              max2 = typeof max2 !== "undefined" ? parseInt(max2, 10) : 9007199254740992;
              return Math.round(Math.random() * (max2 - min2)) + min2;
            },
            // 返回一个随机的整数。
            integer: function(min2, max2) {
              min2 = typeof min2 !== "undefined" ? parseInt(min2, 10) : -9007199254740992;
              max2 = typeof max2 !== "undefined" ? parseInt(max2, 10) : 9007199254740992;
              return Math.round(Math.random() * (max2 - min2)) + min2;
            },
            int: function(min2, max2) {
              return this.integer(min2, max2);
            },
            // 返回一个随机的浮点数。
            float: function(min2, max2, dmin, dmax) {
              dmin = dmin === void 0 ? 0 : dmin;
              dmin = Math.max(Math.min(dmin, 17), 0);
              dmax = dmax === void 0 ? 17 : dmax;
              dmax = Math.max(Math.min(dmax, 17), 0);
              var ret = this.integer(min2, max2) + ".";
              for (var i2 = 0, dcount = this.natural(dmin, dmax); i2 < dcount; i2++) {
                ret += // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
                i2 < dcount - 1 ? this.character("number") : this.character("123456789");
              }
              return parseFloat(ret, 10);
            },
            // 返回一个随机字符。
            character: function(pool) {
              var pools = {
                lower: "abcdefghijklmnopqrstuvwxyz",
                upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                number: "0123456789",
                symbol: "!@#$%^&*()[]"
              };
              pools.alpha = pools.lower + pools.upper;
              pools["undefined"] = pools.lower + pools.upper + pools.number + pools.symbol;
              pool = pools[("" + pool).toLowerCase()] || pool;
              return pool.charAt(this.natural(0, pool.length - 1));
            },
            char: function(pool) {
              return this.character(pool);
            },
            // 返回一个随机字符串。
            string: function(pool, min2, max2) {
              var len;
              switch (arguments.length) {
                case 0:
                  len = this.natural(3, 7);
                  break;
                case 1:
                  len = pool;
                  pool = void 0;
                  break;
                case 2:
                  if (typeof arguments[0] === "string") {
                    len = min2;
                  } else {
                    len = this.natural(pool, min2);
                    pool = void 0;
                  }
                  break;
                case 3:
                  len = this.natural(min2, max2);
                  break;
              }
              var text = "";
              for (var i2 = 0; i2 < len; i2++) {
                text += this.character(pool);
              }
              return text;
            },
            str: function() {
              return this.string.apply(this, arguments);
            },
            // 返回一个整型数组。
            range: function(start, stop, step) {
              if (arguments.length <= 1) {
                stop = start || 0;
                start = 0;
              }
              step = arguments[2] || 1;
              start = +start;
              stop = +stop;
              step = +step;
              var len = Math.max(Math.ceil((stop - start) / step), 0);
              var idx = 0;
              var range = new Array(len);
              while (idx < len) {
                range[idx++] = start;
                start += step;
              }
              return range;
            }
          };
        },
        /* 7 */
        /***/
        function(module2, exports2) {
          var patternLetters = {
            yyyy: "getFullYear",
            yy: function(date) {
              return ("" + date.getFullYear()).slice(2);
            },
            y: "yy",
            MM: function(date) {
              var m = date.getMonth() + 1;
              return m < 10 ? "0" + m : m;
            },
            M: function(date) {
              return date.getMonth() + 1;
            },
            dd: function(date) {
              var d = date.getDate();
              return d < 10 ? "0" + d : d;
            },
            d: "getDate",
            HH: function(date) {
              var h = date.getHours();
              return h < 10 ? "0" + h : h;
            },
            H: "getHours",
            hh: function(date) {
              var h = date.getHours() % 12;
              return h < 10 ? "0" + h : h;
            },
            h: function(date) {
              return date.getHours() % 12;
            },
            mm: function(date) {
              var m = date.getMinutes();
              return m < 10 ? "0" + m : m;
            },
            m: "getMinutes",
            ss: function(date) {
              var s2 = date.getSeconds();
              return s2 < 10 ? "0" + s2 : s2;
            },
            s: "getSeconds",
            SS: function(date) {
              var ms = date.getMilliseconds();
              return ms < 10 && "00" + ms || ms < 100 && "0" + ms || ms;
            },
            S: "getMilliseconds",
            A: function(date) {
              return date.getHours() < 12 ? "AM" : "PM";
            },
            a: function(date) {
              return date.getHours() < 12 ? "am" : "pm";
            },
            T: "getTime"
          };
          module2.exports = {
            // 日期占位符集合。
            _patternLetters: patternLetters,
            // 日期占位符正则。
            _rformat: new RegExp(function() {
              var re2 = [];
              for (var i2 in patternLetters)
                re2.push(i2);
              return "(" + re2.join("|") + ")";
            }(), "g"),
            // 格式化日期。
            _formatDate: function(date, format2) {
              return format2.replace(this._rformat, function creatNewSubString($0, flag) {
                return typeof patternLetters[flag] === "function" ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? creatNewSubString($0, patternLetters[flag]) : date[patternLetters[flag]]();
              });
            },
            // 生成一个随机的 Date 对象。
            _randomDate: function(min2, max2) {
              min2 = min2 === void 0 ? /* @__PURE__ */ new Date(0) : min2;
              max2 = max2 === void 0 ? /* @__PURE__ */ new Date() : max2;
              return new Date(Math.random() * (max2.getTime() - min2.getTime()));
            },
            // 返回一个随机的日期字符串。
            date: function(format2) {
              format2 = format2 || "yyyy-MM-dd";
              return this._formatDate(this._randomDate(), format2);
            },
            // 返回一个随机的时间字符串。
            time: function(format2) {
              format2 = format2 || "HH:mm:ss";
              return this._formatDate(this._randomDate(), format2);
            },
            // 返回一个随机的日期和时间字符串。
            datetime: function(format2) {
              format2 = format2 || "yyyy-MM-dd HH:mm:ss";
              return this._formatDate(this._randomDate(), format2);
            },
            // 返回当前的日期和时间字符串。
            now: function(unit, format2) {
              if (arguments.length === 1) {
                if (!/year|month|day|hour|minute|second|week/.test(unit)) {
                  format2 = unit;
                  unit = "";
                }
              }
              unit = (unit || "").toLowerCase();
              format2 = format2 || "yyyy-MM-dd HH:mm:ss";
              var date = /* @__PURE__ */ new Date();
              switch (unit) {
                case "year":
                  date.setMonth(0);
                case "month":
                  date.setDate(1);
                case "week":
                case "day":
                  date.setHours(0);
                case "hour":
                  date.setMinutes(0);
                case "minute":
                  date.setSeconds(0);
                case "second":
                  date.setMilliseconds(0);
              }
              switch (unit) {
                case "week":
                  date.setDate(date.getDate() - date.getDay());
              }
              return this._formatDate(date, format2);
            }
          };
        },
        /* 8 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          (function(module3) {
            module3.exports = {
              // 常见的广告宽高
              _adSize: [
                "300x250",
                "250x250",
                "240x400",
                "336x280",
                "180x150",
                "720x300",
                "468x60",
                "234x60",
                "88x31",
                "120x90",
                "120x60",
                "120x240",
                "125x125",
                "728x90",
                "160x600",
                "120x600",
                "300x600"
              ],
              // 常见的屏幕宽高
              _screenSize: [
                "320x200",
                "320x240",
                "640x480",
                "800x480",
                "800x480",
                "1024x600",
                "1024x768",
                "1280x800",
                "1440x900",
                "1920x1200",
                "2560x1600"
              ],
              // 常见的视频宽高
              _videoSize: ["720x480", "768x576", "1280x720", "1920x1080"],
              /*
              		        生成一个随机的图片地址。
              
              		        替代图片源
              		            http://fpoimg.com/
              		        参考自 
              		            http://rensanning.iteye.com/blog/1933310
              		            http://code.tutsplus.com/articles/the-top-8-placeholders-for-web-designers--net-19485
              		    */
              image: function(size2, background, foreground, format2, text) {
                if (arguments.length === 4) {
                  text = format2;
                  format2 = void 0;
                }
                if (arguments.length === 3) {
                  text = foreground;
                  foreground = void 0;
                }
                if (!size2)
                  size2 = this.pick(this._adSize);
                if (background && ~background.indexOf("#"))
                  background = background.slice(1);
                if (foreground && ~foreground.indexOf("#"))
                  foreground = foreground.slice(1);
                return "http://dummyimage.com/" + size2 + (background ? "/" + background : "") + (foreground ? "/" + foreground : "") + (format2 ? "." + format2 : "") + (text ? "&text=" + text : "");
              },
              img: function() {
                return this.image.apply(this, arguments);
              },
              /*
              		        BrandColors
              		        http://brandcolors.net/
              		        A collection of major brand color codes curated by Galen Gidman.
              		        大牌公司的颜色集合
              
              		        // 获取品牌和颜色
              		        $('h2').each(function(index, item){
              		            item = $(item)
              		            console.log('\'' + item.text() + '\'', ':', '\'' + item.next().text() + '\'', ',')
              		        })
              		    */
              _brandColors: {
                "4ormat": "#fb0a2a",
                "500px": "#02adea",
                "About.me (blue)": "#00405d",
                "About.me (yellow)": "#ffcc33",
                "Addvocate": "#ff6138",
                "Adobe": "#ff0000",
                "Aim": "#fcd20b",
                "Amazon": "#e47911",
                "Android": "#a4c639",
                "Angie's List": "#7fbb00",
                "AOL": "#0060a3",
                "Atlassian": "#003366",
                "Behance": "#053eff",
                "Big Cartel": "#97b538",
                "bitly": "#ee6123",
                "Blogger": "#fc4f08",
                "Boeing": "#0039a6",
                "Booking.com": "#003580",
                "Carbonmade": "#613854",
                "Cheddar": "#ff7243",
                "Code School": "#3d4944",
                "Delicious": "#205cc0",
                "Dell": "#3287c1",
                "Designmoo": "#e54a4f",
                "Deviantart": "#4e6252",
                "Designer News": "#2d72da",
                "Devour": "#fd0001",
                "DEWALT": "#febd17",
                "Disqus (blue)": "#59a3fc",
                "Disqus (orange)": "#db7132",
                "Dribbble": "#ea4c89",
                "Dropbox": "#3d9ae8",
                "Drupal": "#0c76ab",
                "Dunked": "#2a323a",
                "eBay": "#89c507",
                "Ember": "#f05e1b",
                "Engadget": "#00bdf6",
                "Envato": "#528036",
                "Etsy": "#eb6d20",
                "Evernote": "#5ba525",
                "Fab.com": "#dd0017",
                "Facebook": "#3b5998",
                "Firefox": "#e66000",
                "Flickr (blue)": "#0063dc",
                "Flickr (pink)": "#ff0084",
                "Forrst": "#5b9a68",
                "Foursquare": "#25a0ca",
                "Garmin": "#007cc3",
                "GetGlue": "#2d75a2",
                "Gimmebar": "#f70078",
                "GitHub": "#171515",
                "Google Blue": "#0140ca",
                "Google Green": "#16a61e",
                "Google Red": "#dd1812",
                "Google Yellow": "#fcca03",
                "Google+": "#dd4b39",
                "Grooveshark": "#f77f00",
                "Groupon": "#82b548",
                "Hacker News": "#ff6600",
                "HelloWallet": "#0085ca",
                "Heroku (light)": "#c7c5e6",
                "Heroku (dark)": "#6567a5",
                "HootSuite": "#003366",
                "Houzz": "#73ba37",
                "HTML5": "#ec6231",
                "IKEA": "#ffcc33",
                "IMDb": "#f3ce13",
                "Instagram": "#3f729b",
                "Intel": "#0071c5",
                "Intuit": "#365ebf",
                "Kickstarter": "#76cc1e",
                "kippt": "#e03500",
                "Kodery": "#00af81",
                "LastFM": "#c3000d",
                "LinkedIn": "#0e76a8",
                "Livestream": "#cf0005",
                "Lumo": "#576396",
                "Mixpanel": "#a086d3",
                "Meetup": "#e51937",
                "Nokia": "#183693",
                "NVIDIA": "#76b900",
                "Opera": "#cc0f16",
                "Path": "#e41f11",
                "PayPal (dark)": "#1e477a",
                "PayPal (light)": "#3b7bbf",
                "Pinboard": "#0000e6",
                "Pinterest": "#c8232c",
                "PlayStation": "#665cbe",
                "Pocket": "#ee4056",
                "Prezi": "#318bff",
                "Pusha": "#0f71b4",
                "Quora": "#a82400",
                "QUOTE.fm": "#66ceff",
                "Rdio": "#008fd5",
                "Readability": "#9c0000",
                "Red Hat": "#cc0000",
                "Resource": "#7eb400",
                "Rockpack": "#0ba6ab",
                "Roon": "#62b0d9",
                "RSS": "#ee802f",
                "Salesforce": "#1798c1",
                "Samsung": "#0c4da2",
                "Shopify": "#96bf48",
                "Skype": "#00aff0",
                "Snagajob": "#f47a20",
                "Softonic": "#008ace",
                "SoundCloud": "#ff7700",
                "Space Box": "#f86960",
                "Spotify": "#81b71a",
                "Sprint": "#fee100",
                "Squarespace": "#121212",
                "StackOverflow": "#ef8236",
                "Staples": "#cc0000",
                "Status Chart": "#d7584f",
                "Stripe": "#008cdd",
                "StudyBlue": "#00afe1",
                "StumbleUpon": "#f74425",
                "T-Mobile": "#ea0a8e",
                "Technorati": "#40a800",
                "The Next Web": "#ef4423",
                "Treehouse": "#5cb868",
                "Trulia": "#5eab1f",
                "Tumblr": "#34526f",
                "Twitch.tv": "#6441a5",
                "Twitter": "#00acee",
                "TYPO3": "#ff8700",
                "Ubuntu": "#dd4814",
                "Ustream": "#3388ff",
                "Verizon": "#ef1d1d",
                "Vimeo": "#86c9ef",
                "Vine": "#00a478",
                "Virb": "#06afd8",
                "Virgin Media": "#cc0000",
                "Wooga": "#5b009c",
                "WordPress (blue)": "#21759b",
                "WordPress (orange)": "#d54e21",
                "WordPress (grey)": "#464646",
                "Wunderlist": "#2b88d9",
                "XBOX": "#9bc848",
                "XING": "#126567",
                "Yahoo!": "#720e9e",
                "Yandex": "#ffcc00",
                "Yelp": "#c41200",
                "YouTube": "#c4302b",
                "Zalongo": "#5498dc",
                "Zendesk": "#78a300",
                "Zerply": "#9dcc7a",
                "Zootool": "#5e8b1d"
              },
              _brandNames: function() {
                var brands = [];
                for (var b in this._brandColors) {
                  brands.push(b);
                }
                return brands;
              },
              /*
              		        生成一段随机的 Base64 图片编码。
              
              		        https://github.com/imsky/holder
              		        Holder renders image placeholders entirely on the client side.
              
              		        dataImageHolder: function(size) {
              		            return 'holder.js/' + size
              		        },
              		    */
              dataImage: function(size2, text) {
                var canvas;
                if (typeof document !== "undefined") {
                  canvas = document.createElement("canvas");
                } else {
                  var Canvas = module3.require("canvas");
                  canvas = new Canvas();
                }
                var ctx = canvas && canvas.getContext && canvas.getContext("2d");
                if (!canvas || !ctx)
                  return "";
                if (!size2)
                  size2 = this.pick(this._adSize);
                text = text !== void 0 ? text : size2;
                size2 = size2.split("x");
                var width = parseInt(size2[0], 10), height = parseInt(size2[1], 10), background = this._brandColors[this.pick(this._brandNames())], foreground = "#FFF", text_height = 14, font = "sans-serif";
                canvas.width = width;
                canvas.height = height;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = background;
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = foreground;
                ctx.font = "bold " + text_height + "px " + font;
                ctx.fillText(text, width / 2, height / 2, width);
                return canvas.toDataURL("image/png");
              }
            };
          }).call(exports2, __webpack_require__2(9)(module2));
        },
        /* 9 */
        /***/
        function(module2, exports2) {
          module2.exports = function(module3) {
            if (!module3.webpackPolyfill) {
              module3.deprecate = function() {
              };
              module3.paths = [];
              module3.children = [];
              module3.webpackPolyfill = 1;
            }
            return module3;
          };
        },
        /* 10 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Convert = __webpack_require__2(11);
          var DICT = __webpack_require__2(12);
          module2.exports = {
            // 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
            color: function(name) {
              if (name || DICT[name])
                return DICT[name].nicer;
              return this.hex();
            },
            // #DAC0DE
            hex: function() {
              var hsv = this._goldenRatioColor();
              var rgb = Convert.hsv2rgb(hsv);
              var hex = Convert.rgb2hex(rgb[0], rgb[1], rgb[2]);
              return hex;
            },
            // rgb(128,255,255)
            rgb: function() {
              var hsv = this._goldenRatioColor();
              var rgb = Convert.hsv2rgb(hsv);
              return "rgb(" + parseInt(rgb[0], 10) + ", " + parseInt(rgb[1], 10) + ", " + parseInt(rgb[2], 10) + ")";
            },
            // rgba(128,255,255,0.3)
            rgba: function() {
              var hsv = this._goldenRatioColor();
              var rgb = Convert.hsv2rgb(hsv);
              return "rgba(" + parseInt(rgb[0], 10) + ", " + parseInt(rgb[1], 10) + ", " + parseInt(rgb[2], 10) + ", " + Math.random().toFixed(2) + ")";
            },
            // hsl(300,80%,90%)
            hsl: function() {
              var hsv = this._goldenRatioColor();
              var hsl = Convert.hsv2hsl(hsv);
              return "hsl(" + parseInt(hsl[0], 10) + ", " + parseInt(hsl[1], 10) + ", " + parseInt(hsl[2], 10) + ")";
            },
            // http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
            // https://github.com/devongovett/color-generator/blob/master/index.js
            // 随机生成一个有吸引力的颜色。
            _goldenRatioColor: function(saturation, value) {
              this._goldenRatio = 0.618033988749895;
              this._hue = this._hue || Math.random();
              this._hue += this._goldenRatio;
              this._hue %= 1;
              if (typeof saturation !== "number")
                saturation = 0.5;
              if (typeof value !== "number")
                value = 0.95;
              return [
                this._hue * 360,
                saturation * 100,
                value * 100
              ];
            }
          };
        },
        /* 11 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            rgb2hsl: function rgb2hsl(rgb) {
              var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), delta = max2 - min2, h, s2, l;
              if (max2 == min2)
                h = 0;
              else if (r == max2)
                h = (g - b) / delta;
              else if (g == max2)
                h = 2 + (b - r) / delta;
              else if (b == max2)
                h = 4 + (r - g) / delta;
              h = Math.min(h * 60, 360);
              if (h < 0)
                h += 360;
              l = (min2 + max2) / 2;
              if (max2 == min2)
                s2 = 0;
              else if (l <= 0.5)
                s2 = delta / (max2 + min2);
              else
                s2 = delta / (2 - max2 - min2);
              return [h, s2 * 100, l * 100];
            },
            rgb2hsv: function rgb2hsv(rgb) {
              var r = rgb[0], g = rgb[1], b = rgb[2], min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), delta = max2 - min2, h, s2, v;
              if (max2 === 0)
                s2 = 0;
              else
                s2 = delta / max2 * 1e3 / 10;
              if (max2 == min2)
                h = 0;
              else if (r == max2)
                h = (g - b) / delta;
              else if (g == max2)
                h = 2 + (b - r) / delta;
              else if (b == max2)
                h = 4 + (r - g) / delta;
              h = Math.min(h * 60, 360);
              if (h < 0)
                h += 360;
              v = max2 / 255 * 1e3 / 10;
              return [h, s2, v];
            },
            hsl2rgb: function hsl2rgb(hsl) {
              var h = hsl[0] / 360, s2 = hsl[1] / 100, l = hsl[2] / 100, t1, t2, t3, rgb, val;
              if (s2 === 0) {
                val = l * 255;
                return [val, val, val];
              }
              if (l < 0.5)
                t2 = l * (1 + s2);
              else
                t2 = l + s2 - l * s2;
              t1 = 2 * l - t2;
              rgb = [0, 0, 0];
              for (var i2 = 0; i2 < 3; i2++) {
                t3 = h + 1 / 3 * -(i2 - 1);
                if (t3 < 0)
                  t3++;
                if (t3 > 1)
                  t3--;
                if (6 * t3 < 1)
                  val = t1 + (t2 - t1) * 6 * t3;
                else if (2 * t3 < 1)
                  val = t2;
                else if (3 * t3 < 2)
                  val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
                else
                  val = t1;
                rgb[i2] = val * 255;
              }
              return rgb;
            },
            hsl2hsv: function hsl2hsv(hsl) {
              var h = hsl[0], s2 = hsl[1] / 100, l = hsl[2] / 100, sv, v;
              l *= 2;
              s2 *= l <= 1 ? l : 2 - l;
              v = (l + s2) / 2;
              sv = 2 * s2 / (l + s2);
              return [h, sv * 100, v * 100];
            },
            hsv2rgb: function hsv2rgb(hsv) {
              var h = hsv[0] / 60;
              var s2 = hsv[1] / 100;
              var v = hsv[2] / 100;
              var hi = Math.floor(h) % 6;
              var f2 = h - Math.floor(h);
              var p2 = 255 * v * (1 - s2);
              var q = 255 * v * (1 - s2 * f2);
              var t2 = 255 * v * (1 - s2 * (1 - f2));
              v = 255 * v;
              switch (hi) {
                case 0:
                  return [v, t2, p2];
                case 1:
                  return [q, v, p2];
                case 2:
                  return [p2, v, t2];
                case 3:
                  return [p2, q, v];
                case 4:
                  return [t2, p2, v];
                case 5:
                  return [v, p2, q];
              }
            },
            hsv2hsl: function hsv2hsl(hsv) {
              var h = hsv[0], s2 = hsv[1] / 100, v = hsv[2] / 100, sl, l;
              l = (2 - s2) * v;
              sl = s2 * v;
              sl /= l <= 1 ? l : 2 - l;
              l /= 2;
              return [h, sl * 100, l * 100];
            },
            // http://www.140byt.es/keywords/color
            rgb2hex: function(a, b, c) {
              return "#" + ((256 + a << 8 | b) << 8 | c).toString(16).slice(1);
            },
            hex2rgb: function(a) {
              a = "0x" + a.slice(1).replace(a.length > 4 ? a : /./g, "$&$&") | 0;
              return [a >> 16, a >> 8 & 255, a & 255];
            }
          };
        },
        /* 12 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            // name value nicer
            navy: {
              value: "#000080",
              nicer: "#001F3F"
            },
            blue: {
              value: "#0000ff",
              nicer: "#0074D9"
            },
            aqua: {
              value: "#00ffff",
              nicer: "#7FDBFF"
            },
            teal: {
              value: "#008080",
              nicer: "#39CCCC"
            },
            olive: {
              value: "#008000",
              nicer: "#3D9970"
            },
            green: {
              value: "#008000",
              nicer: "#2ECC40"
            },
            lime: {
              value: "#00ff00",
              nicer: "#01FF70"
            },
            yellow: {
              value: "#ffff00",
              nicer: "#FFDC00"
            },
            orange: {
              value: "#ffa500",
              nicer: "#FF851B"
            },
            red: {
              value: "#ff0000",
              nicer: "#FF4136"
            },
            maroon: {
              value: "#800000",
              nicer: "#85144B"
            },
            fuchsia: {
              value: "#ff00ff",
              nicer: "#F012BE"
            },
            purple: {
              value: "#800080",
              nicer: "#B10DC9"
            },
            silver: {
              value: "#c0c0c0",
              nicer: "#DDDDDD"
            },
            gray: {
              value: "#808080",
              nicer: "#AAAAAA"
            },
            black: {
              value: "#000000",
              nicer: "#111111"
            },
            white: {
              value: "#FFFFFF",
              nicer: "#FFFFFF"
            }
          };
        },
        /* 13 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Basic = __webpack_require__2(6);
          var Helper = __webpack_require__2(14);
          function range(defaultMin, defaultMax, min2, max2) {
            return min2 === void 0 ? Basic.natural(defaultMin, defaultMax) : (
              // ()
              max2 === void 0 ? min2 : (
                // ( len )
                Basic.natural(parseInt(min2, 10), parseInt(max2, 10))
              )
            );
          }
          module2.exports = {
            // 随机生成一段文本。
            paragraph: function(min2, max2) {
              var len = range(3, 7, min2, max2);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.sentence());
              }
              return result.join(" ");
            },
            // 
            cparagraph: function(min2, max2) {
              var len = range(3, 7, min2, max2);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.csentence());
              }
              return result.join("");
            },
            // 随机生成一个句子，第一个单词的首字母大写。
            sentence: function(min2, max2) {
              var len = range(12, 18, min2, max2);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.word());
              }
              return Helper.capitalize(result.join(" ")) + ".";
            },
            // 随机生成一个中文句子。
            csentence: function(min2, max2) {
              var len = range(12, 18, min2, max2);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.cword());
              }
              return result.join("") + "。";
            },
            // 随机生成一个单词。
            word: function(min2, max2) {
              var len = range(3, 10, min2, max2);
              var result = "";
              for (var i2 = 0; i2 < len; i2++) {
                result += Basic.character("lower");
              }
              return result;
            },
            // 随机生成一个或多个汉字。
            cword: function(pool, min2, max2) {
              var DICT_KANZI = "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞";
              var len;
              switch (arguments.length) {
                case 0:
                  pool = DICT_KANZI;
                  len = 1;
                  break;
                case 1:
                  if (typeof arguments[0] === "string") {
                    len = 1;
                  } else {
                    len = pool;
                    pool = DICT_KANZI;
                  }
                  break;
                case 2:
                  if (typeof arguments[0] === "string") {
                    len = min2;
                  } else {
                    len = this.natural(pool, min2);
                    pool = DICT_KANZI;
                  }
                  break;
                case 3:
                  len = this.natural(min2, max2);
                  break;
              }
              var result = "";
              for (var i2 = 0; i2 < len; i2++) {
                result += pool.charAt(this.natural(0, pool.length - 1));
              }
              return result;
            },
            // 随机生成一句标题，其中每个单词的首字母大写。
            title: function(min2, max2) {
              var len = range(3, 7, min2, max2);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.capitalize(this.word()));
              }
              return result.join(" ");
            },
            // 随机生成一句中文标题。
            ctitle: function(min2, max2) {
              var len = range(3, 7, min2, max2);
              var result = [];
              for (var i2 = 0; i2 < len; i2++) {
                result.push(this.cword());
              }
              return result.join("");
            }
          };
        },
        /* 14 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Util2 = __webpack_require__2(3);
          module2.exports = {
            // 把字符串的第一个字母转换为大写。
            capitalize: function(word) {
              return (word + "").charAt(0).toUpperCase() + (word + "").substr(1);
            },
            // 把字符串转换为大写。
            upper: function(str) {
              return (str + "").toUpperCase();
            },
            // 把字符串转换为小写。
            lower: function(str) {
              return (str + "").toLowerCase();
            },
            // 从数组中随机选取一个元素，并返回。
            pick: function pick(arr, min2, max2) {
              if (!Util2.isArray(arr)) {
                arr = [].slice.call(arguments);
                min2 = 1;
                max2 = 1;
              } else {
                if (min2 === void 0)
                  min2 = 1;
                if (max2 === void 0)
                  max2 = min2;
              }
              if (min2 === 1 && max2 === 1)
                return arr[this.natural(0, arr.length - 1)];
              return this.shuffle(arr, min2, max2);
            },
            /*
            			    打乱数组中元素的顺序，并返回。
            			    Given an array, scramble the order and return it.
            
            			    其他的实现思路：
            			        // https://code.google.com/p/jslibs/wiki/JavascriptTips
            			        result = result.sort(function() {
            			            return Math.random() - 0.5
            			        })
            			*/
            shuffle: function shuffle(arr, min2, max2) {
              arr = arr || [];
              var old = arr.slice(0), result = [], index2 = 0, length = old.length;
              for (var i2 = 0; i2 < length; i2++) {
                index2 = this.natural(0, old.length - 1);
                result.push(old[index2]);
                old.splice(index2, 1);
              }
              switch (arguments.length) {
                case 0:
                case 1:
                  return result;
                case 2:
                  max2 = min2;
                case 3:
                  min2 = parseInt(min2, 10);
                  max2 = parseInt(max2, 10);
                  return result.slice(0, this.natural(min2, max2));
              }
            },
            /*
            			    * Random.order(item, item)
            			    * Random.order([item, item ...])
            
            			    顺序获取数组中的元素
            
            			    [JSON导入数组支持数组数据录入](https://github.com/thx/RAP/issues/22)
            
            			    不支持单独调用！
            			*/
            order: function order(array) {
              order.cache = order.cache || {};
              if (arguments.length > 1)
                array = [].slice.call(arguments, 0);
              var options2 = order.options;
              var templatePath = options2.context.templatePath.join(".");
              var cache = order.cache[templatePath] = order.cache[templatePath] || {
                index: 0,
                array
              };
              return cache.array[cache.index++ % cache.array.length];
            }
          };
        },
        /* 15 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            // 随机生成一个常见的英文名。
            first: function() {
              var names = [
                // male
                "James",
                "John",
                "Robert",
                "Michael",
                "William",
                "David",
                "Richard",
                "Charles",
                "Joseph",
                "Thomas",
                "Christopher",
                "Daniel",
                "Paul",
                "Mark",
                "Donald",
                "George",
                "Kenneth",
                "Steven",
                "Edward",
                "Brian",
                "Ronald",
                "Anthony",
                "Kevin",
                "Jason",
                "Matthew",
                "Gary",
                "Timothy",
                "Jose",
                "Larry",
                "Jeffrey",
                "Frank",
                "Scott",
                "Eric"
              ].concat([
                // female
                "Mary",
                "Patricia",
                "Linda",
                "Barbara",
                "Elizabeth",
                "Jennifer",
                "Maria",
                "Susan",
                "Margaret",
                "Dorothy",
                "Lisa",
                "Nancy",
                "Karen",
                "Betty",
                "Helen",
                "Sandra",
                "Donna",
                "Carol",
                "Ruth",
                "Sharon",
                "Michelle",
                "Laura",
                "Sarah",
                "Kimberly",
                "Deborah",
                "Jessica",
                "Shirley",
                "Cynthia",
                "Angela",
                "Melissa",
                "Brenda",
                "Amy",
                "Anna"
              ]);
              return this.pick(names);
            },
            // 随机生成一个常见的英文姓。
            last: function() {
              var names = [
                "Smith",
                "Johnson",
                "Williams",
                "Brown",
                "Jones",
                "Miller",
                "Davis",
                "Garcia",
                "Rodriguez",
                "Wilson",
                "Martinez",
                "Anderson",
                "Taylor",
                "Thomas",
                "Hernandez",
                "Moore",
                "Martin",
                "Jackson",
                "Thompson",
                "White",
                "Lopez",
                "Lee",
                "Gonzalez",
                "Harris",
                "Clark",
                "Lewis",
                "Robinson",
                "Walker",
                "Perez",
                "Hall",
                "Young",
                "Allen"
              ];
              return this.pick(names);
            },
            // 随机生成一个常见的英文姓名。
            name: function(middle) {
              return this.first() + " " + (middle ? this.first() + " " : "") + this.last();
            },
            /*
                随机生成一个常见的中文姓。
                [世界常用姓氏排行](http://baike.baidu.com/view/1719115.htm)
                [玄派网 - 网络小说创作辅助平台](http://xuanpai.sinaapp.com/)
             */
            cfirst: function() {
              var names = "王 李 张 刘 陈 杨 赵 黄 周 吴 徐 孙 胡 朱 高 林 何 郭 马 罗 梁 宋 郑 谢 韩 唐 冯 于 董 萧 程 曹 袁 邓 许 傅 沈 曾 彭 吕 苏 卢 蒋 蔡 贾 丁 魏 薛 叶 阎 余 潘 杜 戴 夏 锺 汪 田 任 姜 范 方 石 姚 谭 廖 邹 熊 金 陆 郝 孔 白 崔 康 毛 邱 秦 江 史 顾 侯 邵 孟 龙 万 段 雷 钱 汤 尹 黎 易 常 武 乔 贺 赖 龚 文".split(" ");
              return this.pick(names);
            },
            /*
                随机生成一个常见的中文名。
                [中国最常见名字前50名_三九算命网](http://www.name999.net/xingming/xingshi/20131004/48.html)
             */
            clast: function() {
              var names = "伟 芳 娜 秀英 敏 静 丽 强 磊 军 洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 平 刚 桂英".split(" ");
              return this.pick(names);
            },
            // 随机生成一个常见的中文姓名。
            cname: function() {
              return this.cfirst() + this.clast();
            }
          };
        },
        /* 16 */
        /***/
        function(module2, exports2) {
          module2.exports = {
            /*
            		        随机生成一个 URL。
            
            		        [URL 规范](http://www.w3.org/Addressing/URL/url-spec.txt)
            		            http                    Hypertext Transfer Protocol 
            		            ftp                     File Transfer protocol 
            		            gopher                  The Gopher protocol 
            		            mailto                  Electronic mail address 
            		            mid                     Message identifiers for electronic mail 
            		            cid                     Content identifiers for MIME body part 
            		            news                    Usenet news 
            		            nntp                    Usenet news for local NNTP access only 
            		            prospero                Access using the prospero protocols 
            		            telnet rlogin tn3270    Reference to interactive sessions
            		            wais                    Wide Area Information Servers 
            		    */
            url: function(protocol, host2) {
              return (protocol || this.protocol()) + "://" + // protocol?
              (host2 || this.domain()) + // host?
              "/" + this.word();
            },
            // 随机生成一个 URL 协议。
            protocol: function() {
              return this.pick(
                // 协议簇
                "http ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais".split(" ")
              );
            },
            // 随机生成一个域名。
            domain: function(tld) {
              return this.word() + "." + (tld || this.tld());
            },
            /*
                随机生成一个顶级域名。
                国际顶级域名 international top-level domain-names, iTLDs
                国家顶级域名 national top-level domainnames, nTLDs
                [域名后缀大全](http://www.163ns.com/zixun/post/4417.html)
            */
            tld: function() {
              return this.pick(
                // 域名后缀
                "com net org edu gov int mil cn com.cn net.cn gov.cn org.cn 中国 中国互联.公司 中国互联.网络 tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw".split(" ")
              );
            },
            // 随机生成一个邮件地址。
            email: function(domain) {
              return this.character("lower") + "." + this.word() + "@" + (domain || this.word() + "." + this.tld());
            },
            // 随机生成一个 IP 地址。
            ip: function() {
              return this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255);
            }
          };
        },
        /* 17 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var DICT = __webpack_require__2(18);
          var REGION = ["东北", "华北", "华东", "华中", "华南", "西南", "西北"];
          module2.exports = {
            // 随机生成一个大区。
            region: function() {
              return this.pick(REGION);
            },
            // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
            province: function() {
              return this.pick(DICT).name;
            },
            // 随机生成一个（中国）市。
            city: function(prefix) {
              var province = this.pick(DICT);
              var city = this.pick(province.children);
              return prefix ? [province.name, city.name].join(" ") : city.name;
            },
            // 随机生成一个（中国）县。
            county: function(prefix) {
              var province = this.pick(DICT);
              var city = this.pick(province.children);
              var county = this.pick(city.children) || {
                name: "-"
              };
              return prefix ? [province.name, city.name, county.name].join(" ") : county.name;
            },
            // 随机生成一个邮政编码（六位数字）。
            zip: function(len) {
              var zip = "";
              for (var i2 = 0; i2 < (len || 6); i2++)
                zip += this.natural(0, 9);
              return zip;
            }
            // address: function() {},
            // phone: function() {},
            // areacode: function() {},
            // street: function() {},
            // street_suffixes: function() {},
            // street_suffix: function() {},
            // states: function() {},
            // state: function() {},
          };
        },
        /* 18 */
        /***/
        function(module2, exports2) {
          var DICT = {
            "110000": "北京",
            "110100": "北京市",
            "110101": "东城区",
            "110102": "西城区",
            "110105": "朝阳区",
            "110106": "丰台区",
            "110107": "石景山区",
            "110108": "海淀区",
            "110109": "门头沟区",
            "110111": "房山区",
            "110112": "通州区",
            "110113": "顺义区",
            "110114": "昌平区",
            "110115": "大兴区",
            "110116": "怀柔区",
            "110117": "平谷区",
            "110228": "密云县",
            "110229": "延庆县",
            "110230": "其它区",
            "120000": "天津",
            "120100": "天津市",
            "120101": "和平区",
            "120102": "河东区",
            "120103": "河西区",
            "120104": "南开区",
            "120105": "河北区",
            "120106": "红桥区",
            "120110": "东丽区",
            "120111": "西青区",
            "120112": "津南区",
            "120113": "北辰区",
            "120114": "武清区",
            "120115": "宝坻区",
            "120116": "滨海新区",
            "120221": "宁河县",
            "120223": "静海县",
            "120225": "蓟县",
            "120226": "其它区",
            "130000": "河北省",
            "130100": "石家庄市",
            "130102": "长安区",
            "130103": "桥东区",
            "130104": "桥西区",
            "130105": "新华区",
            "130107": "井陉矿区",
            "130108": "裕华区",
            "130121": "井陉县",
            "130123": "正定县",
            "130124": "栾城县",
            "130125": "行唐县",
            "130126": "灵寿县",
            "130127": "高邑县",
            "130128": "深泽县",
            "130129": "赞皇县",
            "130130": "无极县",
            "130131": "平山县",
            "130132": "元氏县",
            "130133": "赵县",
            "130181": "辛集市",
            "130182": "藁城市",
            "130183": "晋州市",
            "130184": "新乐市",
            "130185": "鹿泉市",
            "130186": "其它区",
            "130200": "唐山市",
            "130202": "路南区",
            "130203": "路北区",
            "130204": "古冶区",
            "130205": "开平区",
            "130207": "丰南区",
            "130208": "丰润区",
            "130223": "滦县",
            "130224": "滦南县",
            "130225": "乐亭县",
            "130227": "迁西县",
            "130229": "玉田县",
            "130230": "曹妃甸区",
            "130281": "遵化市",
            "130283": "迁安市",
            "130284": "其它区",
            "130300": "秦皇岛市",
            "130302": "海港区",
            "130303": "山海关区",
            "130304": "北戴河区",
            "130321": "青龙满族自治县",
            "130322": "昌黎县",
            "130323": "抚宁县",
            "130324": "卢龙县",
            "130398": "其它区",
            "130400": "邯郸市",
            "130402": "邯山区",
            "130403": "丛台区",
            "130404": "复兴区",
            "130406": "峰峰矿区",
            "130421": "邯郸县",
            "130423": "临漳县",
            "130424": "成安县",
            "130425": "大名县",
            "130426": "涉县",
            "130427": "磁县",
            "130428": "肥乡县",
            "130429": "永年县",
            "130430": "邱县",
            "130431": "鸡泽县",
            "130432": "广平县",
            "130433": "馆陶县",
            "130434": "魏县",
            "130435": "曲周县",
            "130481": "武安市",
            "130482": "其它区",
            "130500": "邢台市",
            "130502": "桥东区",
            "130503": "桥西区",
            "130521": "邢台县",
            "130522": "临城县",
            "130523": "内丘县",
            "130524": "柏乡县",
            "130525": "隆尧县",
            "130526": "任县",
            "130527": "南和县",
            "130528": "宁晋县",
            "130529": "巨鹿县",
            "130530": "新河县",
            "130531": "广宗县",
            "130532": "平乡县",
            "130533": "威县",
            "130534": "清河县",
            "130535": "临西县",
            "130581": "南宫市",
            "130582": "沙河市",
            "130583": "其它区",
            "130600": "保定市",
            "130602": "新市区",
            "130603": "北市区",
            "130604": "南市区",
            "130621": "满城县",
            "130622": "清苑县",
            "130623": "涞水县",
            "130624": "阜平县",
            "130625": "徐水县",
            "130626": "定兴县",
            "130627": "唐县",
            "130628": "高阳县",
            "130629": "容城县",
            "130630": "涞源县",
            "130631": "望都县",
            "130632": "安新县",
            "130633": "易县",
            "130634": "曲阳县",
            "130635": "蠡县",
            "130636": "顺平县",
            "130637": "博野县",
            "130638": "雄县",
            "130681": "涿州市",
            "130682": "定州市",
            "130683": "安国市",
            "130684": "高碑店市",
            "130699": "其它区",
            "130700": "张家口市",
            "130702": "桥东区",
            "130703": "桥西区",
            "130705": "宣化区",
            "130706": "下花园区",
            "130721": "宣化县",
            "130722": "张北县",
            "130723": "康保县",
            "130724": "沽源县",
            "130725": "尚义县",
            "130726": "蔚县",
            "130727": "阳原县",
            "130728": "怀安县",
            "130729": "万全县",
            "130730": "怀来县",
            "130731": "涿鹿县",
            "130732": "赤城县",
            "130733": "崇礼县",
            "130734": "其它区",
            "130800": "承德市",
            "130802": "双桥区",
            "130803": "双滦区",
            "130804": "鹰手营子矿区",
            "130821": "承德县",
            "130822": "兴隆县",
            "130823": "平泉县",
            "130824": "滦平县",
            "130825": "隆化县",
            "130826": "丰宁满族自治县",
            "130827": "宽城满族自治县",
            "130828": "围场满族蒙古族自治县",
            "130829": "其它区",
            "130900": "沧州市",
            "130902": "新华区",
            "130903": "运河区",
            "130921": "沧县",
            "130922": "青县",
            "130923": "东光县",
            "130924": "海兴县",
            "130925": "盐山县",
            "130926": "肃宁县",
            "130927": "南皮县",
            "130928": "吴桥县",
            "130929": "献县",
            "130930": "孟村回族自治县",
            "130981": "泊头市",
            "130982": "任丘市",
            "130983": "黄骅市",
            "130984": "河间市",
            "130985": "其它区",
            "131000": "廊坊市",
            "131002": "安次区",
            "131003": "广阳区",
            "131022": "固安县",
            "131023": "永清县",
            "131024": "香河县",
            "131025": "大城县",
            "131026": "文安县",
            "131028": "大厂回族自治县",
            "131081": "霸州市",
            "131082": "三河市",
            "131083": "其它区",
            "131100": "衡水市",
            "131102": "桃城区",
            "131121": "枣强县",
            "131122": "武邑县",
            "131123": "武强县",
            "131124": "饶阳县",
            "131125": "安平县",
            "131126": "故城县",
            "131127": "景县",
            "131128": "阜城县",
            "131181": "冀州市",
            "131182": "深州市",
            "131183": "其它区",
            "140000": "山西省",
            "140100": "太原市",
            "140105": "小店区",
            "140106": "迎泽区",
            "140107": "杏花岭区",
            "140108": "尖草坪区",
            "140109": "万柏林区",
            "140110": "晋源区",
            "140121": "清徐县",
            "140122": "阳曲县",
            "140123": "娄烦县",
            "140181": "古交市",
            "140182": "其它区",
            "140200": "大同市",
            "140202": "城区",
            "140203": "矿区",
            "140211": "南郊区",
            "140212": "新荣区",
            "140221": "阳高县",
            "140222": "天镇县",
            "140223": "广灵县",
            "140224": "灵丘县",
            "140225": "浑源县",
            "140226": "左云县",
            "140227": "大同县",
            "140228": "其它区",
            "140300": "阳泉市",
            "140302": "城区",
            "140303": "矿区",
            "140311": "郊区",
            "140321": "平定县",
            "140322": "盂县",
            "140323": "其它区",
            "140400": "长治市",
            "140421": "长治县",
            "140423": "襄垣县",
            "140424": "屯留县",
            "140425": "平顺县",
            "140426": "黎城县",
            "140427": "壶关县",
            "140428": "长子县",
            "140429": "武乡县",
            "140430": "沁县",
            "140431": "沁源县",
            "140481": "潞城市",
            "140482": "城区",
            "140483": "郊区",
            "140485": "其它区",
            "140500": "晋城市",
            "140502": "城区",
            "140521": "沁水县",
            "140522": "阳城县",
            "140524": "陵川县",
            "140525": "泽州县",
            "140581": "高平市",
            "140582": "其它区",
            "140600": "朔州市",
            "140602": "朔城区",
            "140603": "平鲁区",
            "140621": "山阴县",
            "140622": "应县",
            "140623": "右玉县",
            "140624": "怀仁县",
            "140625": "其它区",
            "140700": "晋中市",
            "140702": "榆次区",
            "140721": "榆社县",
            "140722": "左权县",
            "140723": "和顺县",
            "140724": "昔阳县",
            "140725": "寿阳县",
            "140726": "太谷县",
            "140727": "祁县",
            "140728": "平遥县",
            "140729": "灵石县",
            "140781": "介休市",
            "140782": "其它区",
            "140800": "运城市",
            "140802": "盐湖区",
            "140821": "临猗县",
            "140822": "万荣县",
            "140823": "闻喜县",
            "140824": "稷山县",
            "140825": "新绛县",
            "140826": "绛县",
            "140827": "垣曲县",
            "140828": "夏县",
            "140829": "平陆县",
            "140830": "芮城县",
            "140881": "永济市",
            "140882": "河津市",
            "140883": "其它区",
            "140900": "忻州市",
            "140902": "忻府区",
            "140921": "定襄县",
            "140922": "五台县",
            "140923": "代县",
            "140924": "繁峙县",
            "140925": "宁武县",
            "140926": "静乐县",
            "140927": "神池县",
            "140928": "五寨县",
            "140929": "岢岚县",
            "140930": "河曲县",
            "140931": "保德县",
            "140932": "偏关县",
            "140981": "原平市",
            "140982": "其它区",
            "141000": "临汾市",
            "141002": "尧都区",
            "141021": "曲沃县",
            "141022": "翼城县",
            "141023": "襄汾县",
            "141024": "洪洞县",
            "141025": "古县",
            "141026": "安泽县",
            "141027": "浮山县",
            "141028": "吉县",
            "141029": "乡宁县",
            "141030": "大宁县",
            "141031": "隰县",
            "141032": "永和县",
            "141033": "蒲县",
            "141034": "汾西县",
            "141081": "侯马市",
            "141082": "霍州市",
            "141083": "其它区",
            "141100": "吕梁市",
            "141102": "离石区",
            "141121": "文水县",
            "141122": "交城县",
            "141123": "兴县",
            "141124": "临县",
            "141125": "柳林县",
            "141126": "石楼县",
            "141127": "岚县",
            "141128": "方山县",
            "141129": "中阳县",
            "141130": "交口县",
            "141181": "孝义市",
            "141182": "汾阳市",
            "141183": "其它区",
            "150000": "内蒙古自治区",
            "150100": "呼和浩特市",
            "150102": "新城区",
            "150103": "回民区",
            "150104": "玉泉区",
            "150105": "赛罕区",
            "150121": "土默特左旗",
            "150122": "托克托县",
            "150123": "和林格尔县",
            "150124": "清水河县",
            "150125": "武川县",
            "150126": "其它区",
            "150200": "包头市",
            "150202": "东河区",
            "150203": "昆都仑区",
            "150204": "青山区",
            "150205": "石拐区",
            "150206": "白云鄂博矿区",
            "150207": "九原区",
            "150221": "土默特右旗",
            "150222": "固阳县",
            "150223": "达尔罕茂明安联合旗",
            "150224": "其它区",
            "150300": "乌海市",
            "150302": "海勃湾区",
            "150303": "海南区",
            "150304": "乌达区",
            "150305": "其它区",
            "150400": "赤峰市",
            "150402": "红山区",
            "150403": "元宝山区",
            "150404": "松山区",
            "150421": "阿鲁科尔沁旗",
            "150422": "巴林左旗",
            "150423": "巴林右旗",
            "150424": "林西县",
            "150425": "克什克腾旗",
            "150426": "翁牛特旗",
            "150428": "喀喇沁旗",
            "150429": "宁城县",
            "150430": "敖汉旗",
            "150431": "其它区",
            "150500": "通辽市",
            "150502": "科尔沁区",
            "150521": "科尔沁左翼中旗",
            "150522": "科尔沁左翼后旗",
            "150523": "开鲁县",
            "150524": "库伦旗",
            "150525": "奈曼旗",
            "150526": "扎鲁特旗",
            "150581": "霍林郭勒市",
            "150582": "其它区",
            "150600": "鄂尔多斯市",
            "150602": "东胜区",
            "150621": "达拉特旗",
            "150622": "准格尔旗",
            "150623": "鄂托克前旗",
            "150624": "鄂托克旗",
            "150625": "杭锦旗",
            "150626": "乌审旗",
            "150627": "伊金霍洛旗",
            "150628": "其它区",
            "150700": "呼伦贝尔市",
            "150702": "海拉尔区",
            "150703": "扎赉诺尔区",
            "150721": "阿荣旗",
            "150722": "莫力达瓦达斡尔族自治旗",
            "150723": "鄂伦春自治旗",
            "150724": "鄂温克族自治旗",
            "150725": "陈巴尔虎旗",
            "150726": "新巴尔虎左旗",
            "150727": "新巴尔虎右旗",
            "150781": "满洲里市",
            "150782": "牙克石市",
            "150783": "扎兰屯市",
            "150784": "额尔古纳市",
            "150785": "根河市",
            "150786": "其它区",
            "150800": "巴彦淖尔市",
            "150802": "临河区",
            "150821": "五原县",
            "150822": "磴口县",
            "150823": "乌拉特前旗",
            "150824": "乌拉特中旗",
            "150825": "乌拉特后旗",
            "150826": "杭锦后旗",
            "150827": "其它区",
            "150900": "乌兰察布市",
            "150902": "集宁区",
            "150921": "卓资县",
            "150922": "化德县",
            "150923": "商都县",
            "150924": "兴和县",
            "150925": "凉城县",
            "150926": "察哈尔右翼前旗",
            "150927": "察哈尔右翼中旗",
            "150928": "察哈尔右翼后旗",
            "150929": "四子王旗",
            "150981": "丰镇市",
            "150982": "其它区",
            "152200": "兴安盟",
            "152201": "乌兰浩特市",
            "152202": "阿尔山市",
            "152221": "科尔沁右翼前旗",
            "152222": "科尔沁右翼中旗",
            "152223": "扎赉特旗",
            "152224": "突泉县",
            "152225": "其它区",
            "152500": "锡林郭勒盟",
            "152501": "二连浩特市",
            "152502": "锡林浩特市",
            "152522": "阿巴嘎旗",
            "152523": "苏尼特左旗",
            "152524": "苏尼特右旗",
            "152525": "东乌珠穆沁旗",
            "152526": "西乌珠穆沁旗",
            "152527": "太仆寺旗",
            "152528": "镶黄旗",
            "152529": "正镶白旗",
            "152530": "正蓝旗",
            "152531": "多伦县",
            "152532": "其它区",
            "152900": "阿拉善盟",
            "152921": "阿拉善左旗",
            "152922": "阿拉善右旗",
            "152923": "额济纳旗",
            "152924": "其它区",
            "210000": "辽宁省",
            "210100": "沈阳市",
            "210102": "和平区",
            "210103": "沈河区",
            "210104": "大东区",
            "210105": "皇姑区",
            "210106": "铁西区",
            "210111": "苏家屯区",
            "210112": "东陵区",
            "210113": "新城子区",
            "210114": "于洪区",
            "210122": "辽中县",
            "210123": "康平县",
            "210124": "法库县",
            "210181": "新民市",
            "210184": "沈北新区",
            "210185": "其它区",
            "210200": "大连市",
            "210202": "中山区",
            "210203": "西岗区",
            "210204": "沙河口区",
            "210211": "甘井子区",
            "210212": "旅顺口区",
            "210213": "金州区",
            "210224": "长海县",
            "210281": "瓦房店市",
            "210282": "普兰店市",
            "210283": "庄河市",
            "210298": "其它区",
            "210300": "鞍山市",
            "210302": "铁东区",
            "210303": "铁西区",
            "210304": "立山区",
            "210311": "千山区",
            "210321": "台安县",
            "210323": "岫岩满族自治县",
            "210381": "海城市",
            "210382": "其它区",
            "210400": "抚顺市",
            "210402": "新抚区",
            "210403": "东洲区",
            "210404": "望花区",
            "210411": "顺城区",
            "210421": "抚顺县",
            "210422": "新宾满族自治县",
            "210423": "清原满族自治县",
            "210424": "其它区",
            "210500": "本溪市",
            "210502": "平山区",
            "210503": "溪湖区",
            "210504": "明山区",
            "210505": "南芬区",
            "210521": "本溪满族自治县",
            "210522": "桓仁满族自治县",
            "210523": "其它区",
            "210600": "丹东市",
            "210602": "元宝区",
            "210603": "振兴区",
            "210604": "振安区",
            "210624": "宽甸满族自治县",
            "210681": "东港市",
            "210682": "凤城市",
            "210683": "其它区",
            "210700": "锦州市",
            "210702": "古塔区",
            "210703": "凌河区",
            "210711": "太和区",
            "210726": "黑山县",
            "210727": "义县",
            "210781": "凌海市",
            "210782": "北镇市",
            "210783": "其它区",
            "210800": "营口市",
            "210802": "站前区",
            "210803": "西市区",
            "210804": "鲅鱼圈区",
            "210811": "老边区",
            "210881": "盖州市",
            "210882": "大石桥市",
            "210883": "其它区",
            "210900": "阜新市",
            "210902": "海州区",
            "210903": "新邱区",
            "210904": "太平区",
            "210905": "清河门区",
            "210911": "细河区",
            "210921": "阜新蒙古族自治县",
            "210922": "彰武县",
            "210923": "其它区",
            "211000": "辽阳市",
            "211002": "白塔区",
            "211003": "文圣区",
            "211004": "宏伟区",
            "211005": "弓长岭区",
            "211011": "太子河区",
            "211021": "辽阳县",
            "211081": "灯塔市",
            "211082": "其它区",
            "211100": "盘锦市",
            "211102": "双台子区",
            "211103": "兴隆台区",
            "211121": "大洼县",
            "211122": "盘山县",
            "211123": "其它区",
            "211200": "铁岭市",
            "211202": "银州区",
            "211204": "清河区",
            "211221": "铁岭县",
            "211223": "西丰县",
            "211224": "昌图县",
            "211281": "调兵山市",
            "211282": "开原市",
            "211283": "其它区",
            "211300": "朝阳市",
            "211302": "双塔区",
            "211303": "龙城区",
            "211321": "朝阳县",
            "211322": "建平县",
            "211324": "喀喇沁左翼蒙古族自治县",
            "211381": "北票市",
            "211382": "凌源市",
            "211383": "其它区",
            "211400": "葫芦岛市",
            "211402": "连山区",
            "211403": "龙港区",
            "211404": "南票区",
            "211421": "绥中县",
            "211422": "建昌县",
            "211481": "兴城市",
            "211482": "其它区",
            "220000": "吉林省",
            "220100": "长春市",
            "220102": "南关区",
            "220103": "宽城区",
            "220104": "朝阳区",
            "220105": "二道区",
            "220106": "绿园区",
            "220112": "双阳区",
            "220122": "农安县",
            "220181": "九台市",
            "220182": "榆树市",
            "220183": "德惠市",
            "220188": "其它区",
            "220200": "吉林市",
            "220202": "昌邑区",
            "220203": "龙潭区",
            "220204": "船营区",
            "220211": "丰满区",
            "220221": "永吉县",
            "220281": "蛟河市",
            "220282": "桦甸市",
            "220283": "舒兰市",
            "220284": "磐石市",
            "220285": "其它区",
            "220300": "四平市",
            "220302": "铁西区",
            "220303": "铁东区",
            "220322": "梨树县",
            "220323": "伊通满族自治县",
            "220381": "公主岭市",
            "220382": "双辽市",
            "220383": "其它区",
            "220400": "辽源市",
            "220402": "龙山区",
            "220403": "西安区",
            "220421": "东丰县",
            "220422": "东辽县",
            "220423": "其它区",
            "220500": "通化市",
            "220502": "东昌区",
            "220503": "二道江区",
            "220521": "通化县",
            "220523": "辉南县",
            "220524": "柳河县",
            "220581": "梅河口市",
            "220582": "集安市",
            "220583": "其它区",
            "220600": "白山市",
            "220602": "浑江区",
            "220621": "抚松县",
            "220622": "靖宇县",
            "220623": "长白朝鲜族自治县",
            "220625": "江源区",
            "220681": "临江市",
            "220682": "其它区",
            "220700": "松原市",
            "220702": "宁江区",
            "220721": "前郭尔罗斯蒙古族自治县",
            "220722": "长岭县",
            "220723": "乾安县",
            "220724": "扶余市",
            "220725": "其它区",
            "220800": "白城市",
            "220802": "洮北区",
            "220821": "镇赉县",
            "220822": "通榆县",
            "220881": "洮南市",
            "220882": "大安市",
            "220883": "其它区",
            "222400": "延边朝鲜族自治州",
            "222401": "延吉市",
            "222402": "图们市",
            "222403": "敦化市",
            "222404": "珲春市",
            "222405": "龙井市",
            "222406": "和龙市",
            "222424": "汪清县",
            "222426": "安图县",
            "222427": "其它区",
            "230000": "黑龙江省",
            "230100": "哈尔滨市",
            "230102": "道里区",
            "230103": "南岗区",
            "230104": "道外区",
            "230106": "香坊区",
            "230108": "平房区",
            "230109": "松北区",
            "230111": "呼兰区",
            "230123": "依兰县",
            "230124": "方正县",
            "230125": "宾县",
            "230126": "巴彦县",
            "230127": "木兰县",
            "230128": "通河县",
            "230129": "延寿县",
            "230181": "阿城区",
            "230182": "双城市",
            "230183": "尚志市",
            "230184": "五常市",
            "230186": "其它区",
            "230200": "齐齐哈尔市",
            "230202": "龙沙区",
            "230203": "建华区",
            "230204": "铁锋区",
            "230205": "昂昂溪区",
            "230206": "富拉尔基区",
            "230207": "碾子山区",
            "230208": "梅里斯达斡尔族区",
            "230221": "龙江县",
            "230223": "依安县",
            "230224": "泰来县",
            "230225": "甘南县",
            "230227": "富裕县",
            "230229": "克山县",
            "230230": "克东县",
            "230231": "拜泉县",
            "230281": "讷河市",
            "230282": "其它区",
            "230300": "鸡西市",
            "230302": "鸡冠区",
            "230303": "恒山区",
            "230304": "滴道区",
            "230305": "梨树区",
            "230306": "城子河区",
            "230307": "麻山区",
            "230321": "鸡东县",
            "230381": "虎林市",
            "230382": "密山市",
            "230383": "其它区",
            "230400": "鹤岗市",
            "230402": "向阳区",
            "230403": "工农区",
            "230404": "南山区",
            "230405": "兴安区",
            "230406": "东山区",
            "230407": "兴山区",
            "230421": "萝北县",
            "230422": "绥滨县",
            "230423": "其它区",
            "230500": "双鸭山市",
            "230502": "尖山区",
            "230503": "岭东区",
            "230505": "四方台区",
            "230506": "宝山区",
            "230521": "集贤县",
            "230522": "友谊县",
            "230523": "宝清县",
            "230524": "饶河县",
            "230525": "其它区",
            "230600": "大庆市",
            "230602": "萨尔图区",
            "230603": "龙凤区",
            "230604": "让胡路区",
            "230605": "红岗区",
            "230606": "大同区",
            "230621": "肇州县",
            "230622": "肇源县",
            "230623": "林甸县",
            "230624": "杜尔伯特蒙古族自治县",
            "230625": "其它区",
            "230700": "伊春市",
            "230702": "伊春区",
            "230703": "南岔区",
            "230704": "友好区",
            "230705": "西林区",
            "230706": "翠峦区",
            "230707": "新青区",
            "230708": "美溪区",
            "230709": "金山屯区",
            "230710": "五营区",
            "230711": "乌马河区",
            "230712": "汤旺河区",
            "230713": "带岭区",
            "230714": "乌伊岭区",
            "230715": "红星区",
            "230716": "上甘岭区",
            "230722": "嘉荫县",
            "230781": "铁力市",
            "230782": "其它区",
            "230800": "佳木斯市",
            "230803": "向阳区",
            "230804": "前进区",
            "230805": "东风区",
            "230811": "郊区",
            "230822": "桦南县",
            "230826": "桦川县",
            "230828": "汤原县",
            "230833": "抚远县",
            "230881": "同江市",
            "230882": "富锦市",
            "230883": "其它区",
            "230900": "七台河市",
            "230902": "新兴区",
            "230903": "桃山区",
            "230904": "茄子河区",
            "230921": "勃利县",
            "230922": "其它区",
            "231000": "牡丹江市",
            "231002": "东安区",
            "231003": "阳明区",
            "231004": "爱民区",
            "231005": "西安区",
            "231024": "东宁县",
            "231025": "林口县",
            "231081": "绥芬河市",
            "231083": "海林市",
            "231084": "宁安市",
            "231085": "穆棱市",
            "231086": "其它区",
            "231100": "黑河市",
            "231102": "爱辉区",
            "231121": "嫩江县",
            "231123": "逊克县",
            "231124": "孙吴县",
            "231181": "北安市",
            "231182": "五大连池市",
            "231183": "其它区",
            "231200": "绥化市",
            "231202": "北林区",
            "231221": "望奎县",
            "231222": "兰西县",
            "231223": "青冈县",
            "231224": "庆安县",
            "231225": "明水县",
            "231226": "绥棱县",
            "231281": "安达市",
            "231282": "肇东市",
            "231283": "海伦市",
            "231284": "其它区",
            "232700": "大兴安岭地区",
            "232702": "松岭区",
            "232703": "新林区",
            "232704": "呼中区",
            "232721": "呼玛县",
            "232722": "塔河县",
            "232723": "漠河县",
            "232724": "加格达奇区",
            "232725": "其它区",
            "310000": "上海",
            "310100": "上海市",
            "310101": "黄浦区",
            "310104": "徐汇区",
            "310105": "长宁区",
            "310106": "静安区",
            "310107": "普陀区",
            "310108": "闸北区",
            "310109": "虹口区",
            "310110": "杨浦区",
            "310112": "闵行区",
            "310113": "宝山区",
            "310114": "嘉定区",
            "310115": "浦东新区",
            "310116": "金山区",
            "310117": "松江区",
            "310118": "青浦区",
            "310120": "奉贤区",
            "310230": "崇明县",
            "310231": "其它区",
            "320000": "江苏省",
            "320100": "南京市",
            "320102": "玄武区",
            "320104": "秦淮区",
            "320105": "建邺区",
            "320106": "鼓楼区",
            "320111": "浦口区",
            "320113": "栖霞区",
            "320114": "雨花台区",
            "320115": "江宁区",
            "320116": "六合区",
            "320124": "溧水区",
            "320125": "高淳区",
            "320126": "其它区",
            "320200": "无锡市",
            "320202": "崇安区",
            "320203": "南长区",
            "320204": "北塘区",
            "320205": "锡山区",
            "320206": "惠山区",
            "320211": "滨湖区",
            "320281": "江阴市",
            "320282": "宜兴市",
            "320297": "其它区",
            "320300": "徐州市",
            "320302": "鼓楼区",
            "320303": "云龙区",
            "320305": "贾汪区",
            "320311": "泉山区",
            "320321": "丰县",
            "320322": "沛县",
            "320323": "铜山区",
            "320324": "睢宁县",
            "320381": "新沂市",
            "320382": "邳州市",
            "320383": "其它区",
            "320400": "常州市",
            "320402": "天宁区",
            "320404": "钟楼区",
            "320405": "戚墅堰区",
            "320411": "新北区",
            "320412": "武进区",
            "320481": "溧阳市",
            "320482": "金坛市",
            "320483": "其它区",
            "320500": "苏州市",
            "320505": "虎丘区",
            "320506": "吴中区",
            "320507": "相城区",
            "320508": "姑苏区",
            "320581": "常熟市",
            "320582": "张家港市",
            "320583": "昆山市",
            "320584": "吴江区",
            "320585": "太仓市",
            "320596": "其它区",
            "320600": "南通市",
            "320602": "崇川区",
            "320611": "港闸区",
            "320612": "通州区",
            "320621": "海安县",
            "320623": "如东县",
            "320681": "启东市",
            "320682": "如皋市",
            "320684": "海门市",
            "320694": "其它区",
            "320700": "连云港市",
            "320703": "连云区",
            "320705": "新浦区",
            "320706": "海州区",
            "320721": "赣榆县",
            "320722": "东海县",
            "320723": "灌云县",
            "320724": "灌南县",
            "320725": "其它区",
            "320800": "淮安市",
            "320802": "清河区",
            "320803": "淮安区",
            "320804": "淮阴区",
            "320811": "清浦区",
            "320826": "涟水县",
            "320829": "洪泽县",
            "320830": "盱眙县",
            "320831": "金湖县",
            "320832": "其它区",
            "320900": "盐城市",
            "320902": "亭湖区",
            "320903": "盐都区",
            "320921": "响水县",
            "320922": "滨海县",
            "320923": "阜宁县",
            "320924": "射阳县",
            "320925": "建湖县",
            "320981": "东台市",
            "320982": "大丰市",
            "320983": "其它区",
            "321000": "扬州市",
            "321002": "广陵区",
            "321003": "邗江区",
            "321023": "宝应县",
            "321081": "仪征市",
            "321084": "高邮市",
            "321088": "江都区",
            "321093": "其它区",
            "321100": "镇江市",
            "321102": "京口区",
            "321111": "润州区",
            "321112": "丹徒区",
            "321181": "丹阳市",
            "321182": "扬中市",
            "321183": "句容市",
            "321184": "其它区",
            "321200": "泰州市",
            "321202": "海陵区",
            "321203": "高港区",
            "321281": "兴化市",
            "321282": "靖江市",
            "321283": "泰兴市",
            "321284": "姜堰区",
            "321285": "其它区",
            "321300": "宿迁市",
            "321302": "宿城区",
            "321311": "宿豫区",
            "321322": "沭阳县",
            "321323": "泗阳县",
            "321324": "泗洪县",
            "321325": "其它区",
            "330000": "浙江省",
            "330100": "杭州市",
            "330102": "上城区",
            "330103": "下城区",
            "330104": "江干区",
            "330105": "拱墅区",
            "330106": "西湖区",
            "330108": "滨江区",
            "330109": "萧山区",
            "330110": "余杭区",
            "330122": "桐庐县",
            "330127": "淳安县",
            "330182": "建德市",
            "330183": "富阳市",
            "330185": "临安市",
            "330186": "其它区",
            "330200": "宁波市",
            "330203": "海曙区",
            "330204": "江东区",
            "330205": "江北区",
            "330206": "北仑区",
            "330211": "镇海区",
            "330212": "鄞州区",
            "330225": "象山县",
            "330226": "宁海县",
            "330281": "余姚市",
            "330282": "慈溪市",
            "330283": "奉化市",
            "330284": "其它区",
            "330300": "温州市",
            "330302": "鹿城区",
            "330303": "龙湾区",
            "330304": "瓯海区",
            "330322": "洞头县",
            "330324": "永嘉县",
            "330326": "平阳县",
            "330327": "苍南县",
            "330328": "文成县",
            "330329": "泰顺县",
            "330381": "瑞安市",
            "330382": "乐清市",
            "330383": "其它区",
            "330400": "嘉兴市",
            "330402": "南湖区",
            "330411": "秀洲区",
            "330421": "嘉善县",
            "330424": "海盐县",
            "330481": "海宁市",
            "330482": "平湖市",
            "330483": "桐乡市",
            "330484": "其它区",
            "330500": "湖州市",
            "330502": "吴兴区",
            "330503": "南浔区",
            "330521": "德清县",
            "330522": "长兴县",
            "330523": "安吉县",
            "330524": "其它区",
            "330600": "绍兴市",
            "330602": "越城区",
            "330621": "绍兴县",
            "330624": "新昌县",
            "330681": "诸暨市",
            "330682": "上虞市",
            "330683": "嵊州市",
            "330684": "其它区",
            "330700": "金华市",
            "330702": "婺城区",
            "330703": "金东区",
            "330723": "武义县",
            "330726": "浦江县",
            "330727": "磐安县",
            "330781": "兰溪市",
            "330782": "义乌市",
            "330783": "东阳市",
            "330784": "永康市",
            "330785": "其它区",
            "330800": "衢州市",
            "330802": "柯城区",
            "330803": "衢江区",
            "330822": "常山县",
            "330824": "开化县",
            "330825": "龙游县",
            "330881": "江山市",
            "330882": "其它区",
            "330900": "舟山市",
            "330902": "定海区",
            "330903": "普陀区",
            "330921": "岱山县",
            "330922": "嵊泗县",
            "330923": "其它区",
            "331000": "台州市",
            "331002": "椒江区",
            "331003": "黄岩区",
            "331004": "路桥区",
            "331021": "玉环县",
            "331022": "三门县",
            "331023": "天台县",
            "331024": "仙居县",
            "331081": "温岭市",
            "331082": "临海市",
            "331083": "其它区",
            "331100": "丽水市",
            "331102": "莲都区",
            "331121": "青田县",
            "331122": "缙云县",
            "331123": "遂昌县",
            "331124": "松阳县",
            "331125": "云和县",
            "331126": "庆元县",
            "331127": "景宁畲族自治县",
            "331181": "龙泉市",
            "331182": "其它区",
            "340000": "安徽省",
            "340100": "合肥市",
            "340102": "瑶海区",
            "340103": "庐阳区",
            "340104": "蜀山区",
            "340111": "包河区",
            "340121": "长丰县",
            "340122": "肥东县",
            "340123": "肥西县",
            "340192": "其它区",
            "340200": "芜湖市",
            "340202": "镜湖区",
            "340203": "弋江区",
            "340207": "鸠江区",
            "340208": "三山区",
            "340221": "芜湖县",
            "340222": "繁昌县",
            "340223": "南陵县",
            "340224": "其它区",
            "340300": "蚌埠市",
            "340302": "龙子湖区",
            "340303": "蚌山区",
            "340304": "禹会区",
            "340311": "淮上区",
            "340321": "怀远县",
            "340322": "五河县",
            "340323": "固镇县",
            "340324": "其它区",
            "340400": "淮南市",
            "340402": "大通区",
            "340403": "田家庵区",
            "340404": "谢家集区",
            "340405": "八公山区",
            "340406": "潘集区",
            "340421": "凤台县",
            "340422": "其它区",
            "340500": "马鞍山市",
            "340503": "花山区",
            "340504": "雨山区",
            "340506": "博望区",
            "340521": "当涂县",
            "340522": "其它区",
            "340600": "淮北市",
            "340602": "杜集区",
            "340603": "相山区",
            "340604": "烈山区",
            "340621": "濉溪县",
            "340622": "其它区",
            "340700": "铜陵市",
            "340702": "铜官山区",
            "340703": "狮子山区",
            "340711": "郊区",
            "340721": "铜陵县",
            "340722": "其它区",
            "340800": "安庆市",
            "340802": "迎江区",
            "340803": "大观区",
            "340811": "宜秀区",
            "340822": "怀宁县",
            "340823": "枞阳县",
            "340824": "潜山县",
            "340825": "太湖县",
            "340826": "宿松县",
            "340827": "望江县",
            "340828": "岳西县",
            "340881": "桐城市",
            "340882": "其它区",
            "341000": "黄山市",
            "341002": "屯溪区",
            "341003": "黄山区",
            "341004": "徽州区",
            "341021": "歙县",
            "341022": "休宁县",
            "341023": "黟县",
            "341024": "祁门县",
            "341025": "其它区",
            "341100": "滁州市",
            "341102": "琅琊区",
            "341103": "南谯区",
            "341122": "来安县",
            "341124": "全椒县",
            "341125": "定远县",
            "341126": "凤阳县",
            "341181": "天长市",
            "341182": "明光市",
            "341183": "其它区",
            "341200": "阜阳市",
            "341202": "颍州区",
            "341203": "颍东区",
            "341204": "颍泉区",
            "341221": "临泉县",
            "341222": "太和县",
            "341225": "阜南县",
            "341226": "颍上县",
            "341282": "界首市",
            "341283": "其它区",
            "341300": "宿州市",
            "341302": "埇桥区",
            "341321": "砀山县",
            "341322": "萧县",
            "341323": "灵璧县",
            "341324": "泗县",
            "341325": "其它区",
            "341400": "巢湖市",
            "341421": "庐江县",
            "341422": "无为县",
            "341423": "含山县",
            "341424": "和县",
            "341500": "六安市",
            "341502": "金安区",
            "341503": "裕安区",
            "341521": "寿县",
            "341522": "霍邱县",
            "341523": "舒城县",
            "341524": "金寨县",
            "341525": "霍山县",
            "341526": "其它区",
            "341600": "亳州市",
            "341602": "谯城区",
            "341621": "涡阳县",
            "341622": "蒙城县",
            "341623": "利辛县",
            "341624": "其它区",
            "341700": "池州市",
            "341702": "贵池区",
            "341721": "东至县",
            "341722": "石台县",
            "341723": "青阳县",
            "341724": "其它区",
            "341800": "宣城市",
            "341802": "宣州区",
            "341821": "郎溪县",
            "341822": "广德县",
            "341823": "泾县",
            "341824": "绩溪县",
            "341825": "旌德县",
            "341881": "宁国市",
            "341882": "其它区",
            "350000": "福建省",
            "350100": "福州市",
            "350102": "鼓楼区",
            "350103": "台江区",
            "350104": "仓山区",
            "350105": "马尾区",
            "350111": "晋安区",
            "350121": "闽侯县",
            "350122": "连江县",
            "350123": "罗源县",
            "350124": "闽清县",
            "350125": "永泰县",
            "350128": "平潭县",
            "350181": "福清市",
            "350182": "长乐市",
            "350183": "其它区",
            "350200": "厦门市",
            "350203": "思明区",
            "350205": "海沧区",
            "350206": "湖里区",
            "350211": "集美区",
            "350212": "同安区",
            "350213": "翔安区",
            "350214": "其它区",
            "350300": "莆田市",
            "350302": "城厢区",
            "350303": "涵江区",
            "350304": "荔城区",
            "350305": "秀屿区",
            "350322": "仙游县",
            "350323": "其它区",
            "350400": "三明市",
            "350402": "梅列区",
            "350403": "三元区",
            "350421": "明溪县",
            "350423": "清流县",
            "350424": "宁化县",
            "350425": "大田县",
            "350426": "尤溪县",
            "350427": "沙县",
            "350428": "将乐县",
            "350429": "泰宁县",
            "350430": "建宁县",
            "350481": "永安市",
            "350482": "其它区",
            "350500": "泉州市",
            "350502": "鲤城区",
            "350503": "丰泽区",
            "350504": "洛江区",
            "350505": "泉港区",
            "350521": "惠安县",
            "350524": "安溪县",
            "350525": "永春县",
            "350526": "德化县",
            "350527": "金门县",
            "350581": "石狮市",
            "350582": "晋江市",
            "350583": "南安市",
            "350584": "其它区",
            "350600": "漳州市",
            "350602": "芗城区",
            "350603": "龙文区",
            "350622": "云霄县",
            "350623": "漳浦县",
            "350624": "诏安县",
            "350625": "长泰县",
            "350626": "东山县",
            "350627": "南靖县",
            "350628": "平和县",
            "350629": "华安县",
            "350681": "龙海市",
            "350682": "其它区",
            "350700": "南平市",
            "350702": "延平区",
            "350721": "顺昌县",
            "350722": "浦城县",
            "350723": "光泽县",
            "350724": "松溪县",
            "350725": "政和县",
            "350781": "邵武市",
            "350782": "武夷山市",
            "350783": "建瓯市",
            "350784": "建阳市",
            "350785": "其它区",
            "350800": "龙岩市",
            "350802": "新罗区",
            "350821": "长汀县",
            "350822": "永定县",
            "350823": "上杭县",
            "350824": "武平县",
            "350825": "连城县",
            "350881": "漳平市",
            "350882": "其它区",
            "350900": "宁德市",
            "350902": "蕉城区",
            "350921": "霞浦县",
            "350922": "古田县",
            "350923": "屏南县",
            "350924": "寿宁县",
            "350925": "周宁县",
            "350926": "柘荣县",
            "350981": "福安市",
            "350982": "福鼎市",
            "350983": "其它区",
            "360000": "江西省",
            "360100": "南昌市",
            "360102": "东湖区",
            "360103": "西湖区",
            "360104": "青云谱区",
            "360105": "湾里区",
            "360111": "青山湖区",
            "360121": "南昌县",
            "360122": "新建县",
            "360123": "安义县",
            "360124": "进贤县",
            "360128": "其它区",
            "360200": "景德镇市",
            "360202": "昌江区",
            "360203": "珠山区",
            "360222": "浮梁县",
            "360281": "乐平市",
            "360282": "其它区",
            "360300": "萍乡市",
            "360302": "安源区",
            "360313": "湘东区",
            "360321": "莲花县",
            "360322": "上栗县",
            "360323": "芦溪县",
            "360324": "其它区",
            "360400": "九江市",
            "360402": "庐山区",
            "360403": "浔阳区",
            "360421": "九江县",
            "360423": "武宁县",
            "360424": "修水县",
            "360425": "永修县",
            "360426": "德安县",
            "360427": "星子县",
            "360428": "都昌县",
            "360429": "湖口县",
            "360430": "彭泽县",
            "360481": "瑞昌市",
            "360482": "其它区",
            "360483": "共青城市",
            "360500": "新余市",
            "360502": "渝水区",
            "360521": "分宜县",
            "360522": "其它区",
            "360600": "鹰潭市",
            "360602": "月湖区",
            "360622": "余江县",
            "360681": "贵溪市",
            "360682": "其它区",
            "360700": "赣州市",
            "360702": "章贡区",
            "360721": "赣县",
            "360722": "信丰县",
            "360723": "大余县",
            "360724": "上犹县",
            "360725": "崇义县",
            "360726": "安远县",
            "360727": "龙南县",
            "360728": "定南县",
            "360729": "全南县",
            "360730": "宁都县",
            "360731": "于都县",
            "360732": "兴国县",
            "360733": "会昌县",
            "360734": "寻乌县",
            "360735": "石城县",
            "360781": "瑞金市",
            "360782": "南康市",
            "360783": "其它区",
            "360800": "吉安市",
            "360802": "吉州区",
            "360803": "青原区",
            "360821": "吉安县",
            "360822": "吉水县",
            "360823": "峡江县",
            "360824": "新干县",
            "360825": "永丰县",
            "360826": "泰和县",
            "360827": "遂川县",
            "360828": "万安县",
            "360829": "安福县",
            "360830": "永新县",
            "360881": "井冈山市",
            "360882": "其它区",
            "360900": "宜春市",
            "360902": "袁州区",
            "360921": "奉新县",
            "360922": "万载县",
            "360923": "上高县",
            "360924": "宜丰县",
            "360925": "靖安县",
            "360926": "铜鼓县",
            "360981": "丰城市",
            "360982": "樟树市",
            "360983": "高安市",
            "360984": "其它区",
            "361000": "抚州市",
            "361002": "临川区",
            "361021": "南城县",
            "361022": "黎川县",
            "361023": "南丰县",
            "361024": "崇仁县",
            "361025": "乐安县",
            "361026": "宜黄县",
            "361027": "金溪县",
            "361028": "资溪县",
            "361029": "东乡县",
            "361030": "广昌县",
            "361031": "其它区",
            "361100": "上饶市",
            "361102": "信州区",
            "361121": "上饶县",
            "361122": "广丰县",
            "361123": "玉山县",
            "361124": "铅山县",
            "361125": "横峰县",
            "361126": "弋阳县",
            "361127": "余干县",
            "361128": "鄱阳县",
            "361129": "万年县",
            "361130": "婺源县",
            "361181": "德兴市",
            "361182": "其它区",
            "370000": "山东省",
            "370100": "济南市",
            "370102": "历下区",
            "370103": "市中区",
            "370104": "槐荫区",
            "370105": "天桥区",
            "370112": "历城区",
            "370113": "长清区",
            "370124": "平阴县",
            "370125": "济阳县",
            "370126": "商河县",
            "370181": "章丘市",
            "370182": "其它区",
            "370200": "青岛市",
            "370202": "市南区",
            "370203": "市北区",
            "370211": "黄岛区",
            "370212": "崂山区",
            "370213": "李沧区",
            "370214": "城阳区",
            "370281": "胶州市",
            "370282": "即墨市",
            "370283": "平度市",
            "370285": "莱西市",
            "370286": "其它区",
            "370300": "淄博市",
            "370302": "淄川区",
            "370303": "张店区",
            "370304": "博山区",
            "370305": "临淄区",
            "370306": "周村区",
            "370321": "桓台县",
            "370322": "高青县",
            "370323": "沂源县",
            "370324": "其它区",
            "370400": "枣庄市",
            "370402": "市中区",
            "370403": "薛城区",
            "370404": "峄城区",
            "370405": "台儿庄区",
            "370406": "山亭区",
            "370481": "滕州市",
            "370482": "其它区",
            "370500": "东营市",
            "370502": "东营区",
            "370503": "河口区",
            "370521": "垦利县",
            "370522": "利津县",
            "370523": "广饶县",
            "370591": "其它区",
            "370600": "烟台市",
            "370602": "芝罘区",
            "370611": "福山区",
            "370612": "牟平区",
            "370613": "莱山区",
            "370634": "长岛县",
            "370681": "龙口市",
            "370682": "莱阳市",
            "370683": "莱州市",
            "370684": "蓬莱市",
            "370685": "招远市",
            "370686": "栖霞市",
            "370687": "海阳市",
            "370688": "其它区",
            "370700": "潍坊市",
            "370702": "潍城区",
            "370703": "寒亭区",
            "370704": "坊子区",
            "370705": "奎文区",
            "370724": "临朐县",
            "370725": "昌乐县",
            "370781": "青州市",
            "370782": "诸城市",
            "370783": "寿光市",
            "370784": "安丘市",
            "370785": "高密市",
            "370786": "昌邑市",
            "370787": "其它区",
            "370800": "济宁市",
            "370802": "市中区",
            "370811": "任城区",
            "370826": "微山县",
            "370827": "鱼台县",
            "370828": "金乡县",
            "370829": "嘉祥县",
            "370830": "汶上县",
            "370831": "泗水县",
            "370832": "梁山县",
            "370881": "曲阜市",
            "370882": "兖州市",
            "370883": "邹城市",
            "370884": "其它区",
            "370900": "泰安市",
            "370902": "泰山区",
            "370903": "岱岳区",
            "370921": "宁阳县",
            "370923": "东平县",
            "370982": "新泰市",
            "370983": "肥城市",
            "370984": "其它区",
            "371000": "威海市",
            "371002": "环翠区",
            "371081": "文登市",
            "371082": "荣成市",
            "371083": "乳山市",
            "371084": "其它区",
            "371100": "日照市",
            "371102": "东港区",
            "371103": "岚山区",
            "371121": "五莲县",
            "371122": "莒县",
            "371123": "其它区",
            "371200": "莱芜市",
            "371202": "莱城区",
            "371203": "钢城区",
            "371204": "其它区",
            "371300": "临沂市",
            "371302": "兰山区",
            "371311": "罗庄区",
            "371312": "河东区",
            "371321": "沂南县",
            "371322": "郯城县",
            "371323": "沂水县",
            "371324": "苍山县",
            "371325": "费县",
            "371326": "平邑县",
            "371327": "莒南县",
            "371328": "蒙阴县",
            "371329": "临沭县",
            "371330": "其它区",
            "371400": "德州市",
            "371402": "德城区",
            "371421": "陵县",
            "371422": "宁津县",
            "371423": "庆云县",
            "371424": "临邑县",
            "371425": "齐河县",
            "371426": "平原县",
            "371427": "夏津县",
            "371428": "武城县",
            "371481": "乐陵市",
            "371482": "禹城市",
            "371483": "其它区",
            "371500": "聊城市",
            "371502": "东昌府区",
            "371521": "阳谷县",
            "371522": "莘县",
            "371523": "茌平县",
            "371524": "东阿县",
            "371525": "冠县",
            "371526": "高唐县",
            "371581": "临清市",
            "371582": "其它区",
            "371600": "滨州市",
            "371602": "滨城区",
            "371621": "惠民县",
            "371622": "阳信县",
            "371623": "无棣县",
            "371624": "沾化县",
            "371625": "博兴县",
            "371626": "邹平县",
            "371627": "其它区",
            "371700": "菏泽市",
            "371702": "牡丹区",
            "371721": "曹县",
            "371722": "单县",
            "371723": "成武县",
            "371724": "巨野县",
            "371725": "郓城县",
            "371726": "鄄城县",
            "371727": "定陶县",
            "371728": "东明县",
            "371729": "其它区",
            "410000": "河南省",
            "410100": "郑州市",
            "410102": "中原区",
            "410103": "二七区",
            "410104": "管城回族区",
            "410105": "金水区",
            "410106": "上街区",
            "410108": "惠济区",
            "410122": "中牟县",
            "410181": "巩义市",
            "410182": "荥阳市",
            "410183": "新密市",
            "410184": "新郑市",
            "410185": "登封市",
            "410188": "其它区",
            "410200": "开封市",
            "410202": "龙亭区",
            "410203": "顺河回族区",
            "410204": "鼓楼区",
            "410205": "禹王台区",
            "410211": "金明区",
            "410221": "杞县",
            "410222": "通许县",
            "410223": "尉氏县",
            "410224": "开封县",
            "410225": "兰考县",
            "410226": "其它区",
            "410300": "洛阳市",
            "410302": "老城区",
            "410303": "西工区",
            "410304": "瀍河回族区",
            "410305": "涧西区",
            "410306": "吉利区",
            "410307": "洛龙区",
            "410322": "孟津县",
            "410323": "新安县",
            "410324": "栾川县",
            "410325": "嵩县",
            "410326": "汝阳县",
            "410327": "宜阳县",
            "410328": "洛宁县",
            "410329": "伊川县",
            "410381": "偃师市",
            "410400": "平顶山市",
            "410402": "新华区",
            "410403": "卫东区",
            "410404": "石龙区",
            "410411": "湛河区",
            "410421": "宝丰县",
            "410422": "叶县",
            "410423": "鲁山县",
            "410425": "郏县",
            "410481": "舞钢市",
            "410482": "汝州市",
            "410483": "其它区",
            "410500": "安阳市",
            "410502": "文峰区",
            "410503": "北关区",
            "410505": "殷都区",
            "410506": "龙安区",
            "410522": "安阳县",
            "410523": "汤阴县",
            "410526": "滑县",
            "410527": "内黄县",
            "410581": "林州市",
            "410582": "其它区",
            "410600": "鹤壁市",
            "410602": "鹤山区",
            "410603": "山城区",
            "410611": "淇滨区",
            "410621": "浚县",
            "410622": "淇县",
            "410623": "其它区",
            "410700": "新乡市",
            "410702": "红旗区",
            "410703": "卫滨区",
            "410704": "凤泉区",
            "410711": "牧野区",
            "410721": "新乡县",
            "410724": "获嘉县",
            "410725": "原阳县",
            "410726": "延津县",
            "410727": "封丘县",
            "410728": "长垣县",
            "410781": "卫辉市",
            "410782": "辉县市",
            "410783": "其它区",
            "410800": "焦作市",
            "410802": "解放区",
            "410803": "中站区",
            "410804": "马村区",
            "410811": "山阳区",
            "410821": "修武县",
            "410822": "博爱县",
            "410823": "武陟县",
            "410825": "温县",
            "410881": "济源市",
            "410882": "沁阳市",
            "410883": "孟州市",
            "410884": "其它区",
            "410900": "濮阳市",
            "410902": "华龙区",
            "410922": "清丰县",
            "410923": "南乐县",
            "410926": "范县",
            "410927": "台前县",
            "410928": "濮阳县",
            "410929": "其它区",
            "411000": "许昌市",
            "411002": "魏都区",
            "411023": "许昌县",
            "411024": "鄢陵县",
            "411025": "襄城县",
            "411081": "禹州市",
            "411082": "长葛市",
            "411083": "其它区",
            "411100": "漯河市",
            "411102": "源汇区",
            "411103": "郾城区",
            "411104": "召陵区",
            "411121": "舞阳县",
            "411122": "临颍县",
            "411123": "其它区",
            "411200": "三门峡市",
            "411202": "湖滨区",
            "411221": "渑池县",
            "411222": "陕县",
            "411224": "卢氏县",
            "411281": "义马市",
            "411282": "灵宝市",
            "411283": "其它区",
            "411300": "南阳市",
            "411302": "宛城区",
            "411303": "卧龙区",
            "411321": "南召县",
            "411322": "方城县",
            "411323": "西峡县",
            "411324": "镇平县",
            "411325": "内乡县",
            "411326": "淅川县",
            "411327": "社旗县",
            "411328": "唐河县",
            "411329": "新野县",
            "411330": "桐柏县",
            "411381": "邓州市",
            "411382": "其它区",
            "411400": "商丘市",
            "411402": "梁园区",
            "411403": "睢阳区",
            "411421": "民权县",
            "411422": "睢县",
            "411423": "宁陵县",
            "411424": "柘城县",
            "411425": "虞城县",
            "411426": "夏邑县",
            "411481": "永城市",
            "411482": "其它区",
            "411500": "信阳市",
            "411502": "浉河区",
            "411503": "平桥区",
            "411521": "罗山县",
            "411522": "光山县",
            "411523": "新县",
            "411524": "商城县",
            "411525": "固始县",
            "411526": "潢川县",
            "411527": "淮滨县",
            "411528": "息县",
            "411529": "其它区",
            "411600": "周口市",
            "411602": "川汇区",
            "411621": "扶沟县",
            "411622": "西华县",
            "411623": "商水县",
            "411624": "沈丘县",
            "411625": "郸城县",
            "411626": "淮阳县",
            "411627": "太康县",
            "411628": "鹿邑县",
            "411681": "项城市",
            "411682": "其它区",
            "411700": "驻马店市",
            "411702": "驿城区",
            "411721": "西平县",
            "411722": "上蔡县",
            "411723": "平舆县",
            "411724": "正阳县",
            "411725": "确山县",
            "411726": "泌阳县",
            "411727": "汝南县",
            "411728": "遂平县",
            "411729": "新蔡县",
            "411730": "其它区",
            "420000": "湖北省",
            "420100": "武汉市",
            "420102": "江岸区",
            "420103": "江汉区",
            "420104": "硚口区",
            "420105": "汉阳区",
            "420106": "武昌区",
            "420107": "青山区",
            "420111": "洪山区",
            "420112": "东西湖区",
            "420113": "汉南区",
            "420114": "蔡甸区",
            "420115": "江夏区",
            "420116": "黄陂区",
            "420117": "新洲区",
            "420118": "其它区",
            "420200": "黄石市",
            "420202": "黄石港区",
            "420203": "西塞山区",
            "420204": "下陆区",
            "420205": "铁山区",
            "420222": "阳新县",
            "420281": "大冶市",
            "420282": "其它区",
            "420300": "十堰市",
            "420302": "茅箭区",
            "420303": "张湾区",
            "420321": "郧县",
            "420322": "郧西县",
            "420323": "竹山县",
            "420324": "竹溪县",
            "420325": "房县",
            "420381": "丹江口市",
            "420383": "其它区",
            "420500": "宜昌市",
            "420502": "西陵区",
            "420503": "伍家岗区",
            "420504": "点军区",
            "420505": "猇亭区",
            "420506": "夷陵区",
            "420525": "远安县",
            "420526": "兴山县",
            "420527": "秭归县",
            "420528": "长阳土家族自治县",
            "420529": "五峰土家族自治县",
            "420581": "宜都市",
            "420582": "当阳市",
            "420583": "枝江市",
            "420584": "其它区",
            "420600": "襄阳市",
            "420602": "襄城区",
            "420606": "樊城区",
            "420607": "襄州区",
            "420624": "南漳县",
            "420625": "谷城县",
            "420626": "保康县",
            "420682": "老河口市",
            "420683": "枣阳市",
            "420684": "宜城市",
            "420685": "其它区",
            "420700": "鄂州市",
            "420702": "梁子湖区",
            "420703": "华容区",
            "420704": "鄂城区",
            "420705": "其它区",
            "420800": "荆门市",
            "420802": "东宝区",
            "420804": "掇刀区",
            "420821": "京山县",
            "420822": "沙洋县",
            "420881": "钟祥市",
            "420882": "其它区",
            "420900": "孝感市",
            "420902": "孝南区",
            "420921": "孝昌县",
            "420922": "大悟县",
            "420923": "云梦县",
            "420981": "应城市",
            "420982": "安陆市",
            "420984": "汉川市",
            "420985": "其它区",
            "421000": "荆州市",
            "421002": "沙市区",
            "421003": "荆州区",
            "421022": "公安县",
            "421023": "监利县",
            "421024": "江陵县",
            "421081": "石首市",
            "421083": "洪湖市",
            "421087": "松滋市",
            "421088": "其它区",
            "421100": "黄冈市",
            "421102": "黄州区",
            "421121": "团风县",
            "421122": "红安县",
            "421123": "罗田县",
            "421124": "英山县",
            "421125": "浠水县",
            "421126": "蕲春县",
            "421127": "黄梅县",
            "421181": "麻城市",
            "421182": "武穴市",
            "421183": "其它区",
            "421200": "咸宁市",
            "421202": "咸安区",
            "421221": "嘉鱼县",
            "421222": "通城县",
            "421223": "崇阳县",
            "421224": "通山县",
            "421281": "赤壁市",
            "421283": "其它区",
            "421300": "随州市",
            "421302": "曾都区",
            "421321": "随县",
            "421381": "广水市",
            "421382": "其它区",
            "422800": "恩施土家族苗族自治州",
            "422801": "恩施市",
            "422802": "利川市",
            "422822": "建始县",
            "422823": "巴东县",
            "422825": "宣恩县",
            "422826": "咸丰县",
            "422827": "来凤县",
            "422828": "鹤峰县",
            "422829": "其它区",
            "429004": "仙桃市",
            "429005": "潜江市",
            "429006": "天门市",
            "429021": "神农架林区",
            "430000": "湖南省",
            "430100": "长沙市",
            "430102": "芙蓉区",
            "430103": "天心区",
            "430104": "岳麓区",
            "430105": "开福区",
            "430111": "雨花区",
            "430121": "长沙县",
            "430122": "望城区",
            "430124": "宁乡县",
            "430181": "浏阳市",
            "430182": "其它区",
            "430200": "株洲市",
            "430202": "荷塘区",
            "430203": "芦淞区",
            "430204": "石峰区",
            "430211": "天元区",
            "430221": "株洲县",
            "430223": "攸县",
            "430224": "茶陵县",
            "430225": "炎陵县",
            "430281": "醴陵市",
            "430282": "其它区",
            "430300": "湘潭市",
            "430302": "雨湖区",
            "430304": "岳塘区",
            "430321": "湘潭县",
            "430381": "湘乡市",
            "430382": "韶山市",
            "430383": "其它区",
            "430400": "衡阳市",
            "430405": "珠晖区",
            "430406": "雁峰区",
            "430407": "石鼓区",
            "430408": "蒸湘区",
            "430412": "南岳区",
            "430421": "衡阳县",
            "430422": "衡南县",
            "430423": "衡山县",
            "430424": "衡东县",
            "430426": "祁东县",
            "430481": "耒阳市",
            "430482": "常宁市",
            "430483": "其它区",
            "430500": "邵阳市",
            "430502": "双清区",
            "430503": "大祥区",
            "430511": "北塔区",
            "430521": "邵东县",
            "430522": "新邵县",
            "430523": "邵阳县",
            "430524": "隆回县",
            "430525": "洞口县",
            "430527": "绥宁县",
            "430528": "新宁县",
            "430529": "城步苗族自治县",
            "430581": "武冈市",
            "430582": "其它区",
            "430600": "岳阳市",
            "430602": "岳阳楼区",
            "430603": "云溪区",
            "430611": "君山区",
            "430621": "岳阳县",
            "430623": "华容县",
            "430624": "湘阴县",
            "430626": "平江县",
            "430681": "汨罗市",
            "430682": "临湘市",
            "430683": "其它区",
            "430700": "常德市",
            "430702": "武陵区",
            "430703": "鼎城区",
            "430721": "安乡县",
            "430722": "汉寿县",
            "430723": "澧县",
            "430724": "临澧县",
            "430725": "桃源县",
            "430726": "石门县",
            "430781": "津市市",
            "430782": "其它区",
            "430800": "张家界市",
            "430802": "永定区",
            "430811": "武陵源区",
            "430821": "慈利县",
            "430822": "桑植县",
            "430823": "其它区",
            "430900": "益阳市",
            "430902": "资阳区",
            "430903": "赫山区",
            "430921": "南县",
            "430922": "桃江县",
            "430923": "安化县",
            "430981": "沅江市",
            "430982": "其它区",
            "431000": "郴州市",
            "431002": "北湖区",
            "431003": "苏仙区",
            "431021": "桂阳县",
            "431022": "宜章县",
            "431023": "永兴县",
            "431024": "嘉禾县",
            "431025": "临武县",
            "431026": "汝城县",
            "431027": "桂东县",
            "431028": "安仁县",
            "431081": "资兴市",
            "431082": "其它区",
            "431100": "永州市",
            "431102": "零陵区",
            "431103": "冷水滩区",
            "431121": "祁阳县",
            "431122": "东安县",
            "431123": "双牌县",
            "431124": "道县",
            "431125": "江永县",
            "431126": "宁远县",
            "431127": "蓝山县",
            "431128": "新田县",
            "431129": "江华瑶族自治县",
            "431130": "其它区",
            "431200": "怀化市",
            "431202": "鹤城区",
            "431221": "中方县",
            "431222": "沅陵县",
            "431223": "辰溪县",
            "431224": "溆浦县",
            "431225": "会同县",
            "431226": "麻阳苗族自治县",
            "431227": "新晃侗族自治县",
            "431228": "芷江侗族自治县",
            "431229": "靖州苗族侗族自治县",
            "431230": "通道侗族自治县",
            "431281": "洪江市",
            "431282": "其它区",
            "431300": "娄底市",
            "431302": "娄星区",
            "431321": "双峰县",
            "431322": "新化县",
            "431381": "冷水江市",
            "431382": "涟源市",
            "431383": "其它区",
            "433100": "湘西土家族苗族自治州",
            "433101": "吉首市",
            "433122": "泸溪县",
            "433123": "凤凰县",
            "433124": "花垣县",
            "433125": "保靖县",
            "433126": "古丈县",
            "433127": "永顺县",
            "433130": "龙山县",
            "433131": "其它区",
            "440000": "广东省",
            "440100": "广州市",
            "440103": "荔湾区",
            "440104": "越秀区",
            "440105": "海珠区",
            "440106": "天河区",
            "440111": "白云区",
            "440112": "黄埔区",
            "440113": "番禺区",
            "440114": "花都区",
            "440115": "南沙区",
            "440116": "萝岗区",
            "440183": "增城市",
            "440184": "从化市",
            "440189": "其它区",
            "440200": "韶关市",
            "440203": "武江区",
            "440204": "浈江区",
            "440205": "曲江区",
            "440222": "始兴县",
            "440224": "仁化县",
            "440229": "翁源县",
            "440232": "乳源瑶族自治县",
            "440233": "新丰县",
            "440281": "乐昌市",
            "440282": "南雄市",
            "440283": "其它区",
            "440300": "深圳市",
            "440303": "罗湖区",
            "440304": "福田区",
            "440305": "南山区",
            "440306": "宝安区",
            "440307": "龙岗区",
            "440308": "盐田区",
            "440309": "其它区",
            "440320": "光明新区",
            "440321": "坪山新区",
            "440322": "大鹏新区",
            "440323": "龙华新区",
            "440400": "珠海市",
            "440402": "香洲区",
            "440403": "斗门区",
            "440404": "金湾区",
            "440488": "其它区",
            "440500": "汕头市",
            "440507": "龙湖区",
            "440511": "金平区",
            "440512": "濠江区",
            "440513": "潮阳区",
            "440514": "潮南区",
            "440515": "澄海区",
            "440523": "南澳县",
            "440524": "其它区",
            "440600": "佛山市",
            "440604": "禅城区",
            "440605": "南海区",
            "440606": "顺德区",
            "440607": "三水区",
            "440608": "高明区",
            "440609": "其它区",
            "440700": "江门市",
            "440703": "蓬江区",
            "440704": "江海区",
            "440705": "新会区",
            "440781": "台山市",
            "440783": "开平市",
            "440784": "鹤山市",
            "440785": "恩平市",
            "440786": "其它区",
            "440800": "湛江市",
            "440802": "赤坎区",
            "440803": "霞山区",
            "440804": "坡头区",
            "440811": "麻章区",
            "440823": "遂溪县",
            "440825": "徐闻县",
            "440881": "廉江市",
            "440882": "雷州市",
            "440883": "吴川市",
            "440884": "其它区",
            "440900": "茂名市",
            "440902": "茂南区",
            "440903": "茂港区",
            "440923": "电白县",
            "440981": "高州市",
            "440982": "化州市",
            "440983": "信宜市",
            "440984": "其它区",
            "441200": "肇庆市",
            "441202": "端州区",
            "441203": "鼎湖区",
            "441223": "广宁县",
            "441224": "怀集县",
            "441225": "封开县",
            "441226": "德庆县",
            "441283": "高要市",
            "441284": "四会市",
            "441285": "其它区",
            "441300": "惠州市",
            "441302": "惠城区",
            "441303": "惠阳区",
            "441322": "博罗县",
            "441323": "惠东县",
            "441324": "龙门县",
            "441325": "其它区",
            "441400": "梅州市",
            "441402": "梅江区",
            "441421": "梅县",
            "441422": "大埔县",
            "441423": "丰顺县",
            "441424": "五华县",
            "441426": "平远县",
            "441427": "蕉岭县",
            "441481": "兴宁市",
            "441482": "其它区",
            "441500": "汕尾市",
            "441502": "城区",
            "441521": "海丰县",
            "441523": "陆河县",
            "441581": "陆丰市",
            "441582": "其它区",
            "441600": "河源市",
            "441602": "源城区",
            "441621": "紫金县",
            "441622": "龙川县",
            "441623": "连平县",
            "441624": "和平县",
            "441625": "东源县",
            "441626": "其它区",
            "441700": "阳江市",
            "441702": "江城区",
            "441721": "阳西县",
            "441723": "阳东县",
            "441781": "阳春市",
            "441782": "其它区",
            "441800": "清远市",
            "441802": "清城区",
            "441821": "佛冈县",
            "441823": "阳山县",
            "441825": "连山壮族瑶族自治县",
            "441826": "连南瑶族自治县",
            "441827": "清新区",
            "441881": "英德市",
            "441882": "连州市",
            "441883": "其它区",
            "441900": "东莞市",
            "442000": "中山市",
            "442101": "东沙群岛",
            "445100": "潮州市",
            "445102": "湘桥区",
            "445121": "潮安区",
            "445122": "饶平县",
            "445186": "其它区",
            "445200": "揭阳市",
            "445202": "榕城区",
            "445221": "揭东区",
            "445222": "揭西县",
            "445224": "惠来县",
            "445281": "普宁市",
            "445285": "其它区",
            "445300": "云浮市",
            "445302": "云城区",
            "445321": "新兴县",
            "445322": "郁南县",
            "445323": "云安县",
            "445381": "罗定市",
            "445382": "其它区",
            "450000": "广西壮族自治区",
            "450100": "南宁市",
            "450102": "兴宁区",
            "450103": "青秀区",
            "450105": "江南区",
            "450107": "西乡塘区",
            "450108": "良庆区",
            "450109": "邕宁区",
            "450122": "武鸣县",
            "450123": "隆安县",
            "450124": "马山县",
            "450125": "上林县",
            "450126": "宾阳县",
            "450127": "横县",
            "450128": "其它区",
            "450200": "柳州市",
            "450202": "城中区",
            "450203": "鱼峰区",
            "450204": "柳南区",
            "450205": "柳北区",
            "450221": "柳江县",
            "450222": "柳城县",
            "450223": "鹿寨县",
            "450224": "融安县",
            "450225": "融水苗族自治县",
            "450226": "三江侗族自治县",
            "450227": "其它区",
            "450300": "桂林市",
            "450302": "秀峰区",
            "450303": "叠彩区",
            "450304": "象山区",
            "450305": "七星区",
            "450311": "雁山区",
            "450321": "阳朔县",
            "450322": "临桂区",
            "450323": "灵川县",
            "450324": "全州县",
            "450325": "兴安县",
            "450326": "永福县",
            "450327": "灌阳县",
            "450328": "龙胜各族自治县",
            "450329": "资源县",
            "450330": "平乐县",
            "450331": "荔浦县",
            "450332": "恭城瑶族自治县",
            "450333": "其它区",
            "450400": "梧州市",
            "450403": "万秀区",
            "450405": "长洲区",
            "450406": "龙圩区",
            "450421": "苍梧县",
            "450422": "藤县",
            "450423": "蒙山县",
            "450481": "岑溪市",
            "450482": "其它区",
            "450500": "北海市",
            "450502": "海城区",
            "450503": "银海区",
            "450512": "铁山港区",
            "450521": "合浦县",
            "450522": "其它区",
            "450600": "防城港市",
            "450602": "港口区",
            "450603": "防城区",
            "450621": "上思县",
            "450681": "东兴市",
            "450682": "其它区",
            "450700": "钦州市",
            "450702": "钦南区",
            "450703": "钦北区",
            "450721": "灵山县",
            "450722": "浦北县",
            "450723": "其它区",
            "450800": "贵港市",
            "450802": "港北区",
            "450803": "港南区",
            "450804": "覃塘区",
            "450821": "平南县",
            "450881": "桂平市",
            "450882": "其它区",
            "450900": "玉林市",
            "450902": "玉州区",
            "450903": "福绵区",
            "450921": "容县",
            "450922": "陆川县",
            "450923": "博白县",
            "450924": "兴业县",
            "450981": "北流市",
            "450982": "其它区",
            "451000": "百色市",
            "451002": "右江区",
            "451021": "田阳县",
            "451022": "田东县",
            "451023": "平果县",
            "451024": "德保县",
            "451025": "靖西县",
            "451026": "那坡县",
            "451027": "凌云县",
            "451028": "乐业县",
            "451029": "田林县",
            "451030": "西林县",
            "451031": "隆林各族自治县",
            "451032": "其它区",
            "451100": "贺州市",
            "451102": "八步区",
            "451119": "平桂管理区",
            "451121": "昭平县",
            "451122": "钟山县",
            "451123": "富川瑶族自治县",
            "451124": "其它区",
            "451200": "河池市",
            "451202": "金城江区",
            "451221": "南丹县",
            "451222": "天峨县",
            "451223": "凤山县",
            "451224": "东兰县",
            "451225": "罗城仫佬族自治县",
            "451226": "环江毛南族自治县",
            "451227": "巴马瑶族自治县",
            "451228": "都安瑶族自治县",
            "451229": "大化瑶族自治县",
            "451281": "宜州市",
            "451282": "其它区",
            "451300": "来宾市",
            "451302": "兴宾区",
            "451321": "忻城县",
            "451322": "象州县",
            "451323": "武宣县",
            "451324": "金秀瑶族自治县",
            "451381": "合山市",
            "451382": "其它区",
            "451400": "崇左市",
            "451402": "江州区",
            "451421": "扶绥县",
            "451422": "宁明县",
            "451423": "龙州县",
            "451424": "大新县",
            "451425": "天等县",
            "451481": "凭祥市",
            "451482": "其它区",
            "460000": "海南省",
            "460100": "海口市",
            "460105": "秀英区",
            "460106": "龙华区",
            "460107": "琼山区",
            "460108": "美兰区",
            "460109": "其它区",
            "460200": "三亚市",
            "460300": "三沙市",
            "460321": "西沙群岛",
            "460322": "南沙群岛",
            "460323": "中沙群岛的岛礁及其海域",
            "469001": "五指山市",
            "469002": "琼海市",
            "469003": "儋州市",
            "469005": "文昌市",
            "469006": "万宁市",
            "469007": "东方市",
            "469025": "定安县",
            "469026": "屯昌县",
            "469027": "澄迈县",
            "469028": "临高县",
            "469030": "白沙黎族自治县",
            "469031": "昌江黎族自治县",
            "469033": "乐东黎族自治县",
            "469034": "陵水黎族自治县",
            "469035": "保亭黎族苗族自治县",
            "469036": "琼中黎族苗族自治县",
            "471005": "其它区",
            "500000": "重庆",
            "500100": "重庆市",
            "500101": "万州区",
            "500102": "涪陵区",
            "500103": "渝中区",
            "500104": "大渡口区",
            "500105": "江北区",
            "500106": "沙坪坝区",
            "500107": "九龙坡区",
            "500108": "南岸区",
            "500109": "北碚区",
            "500110": "万盛区",
            "500111": "双桥区",
            "500112": "渝北区",
            "500113": "巴南区",
            "500114": "黔江区",
            "500115": "长寿区",
            "500222": "綦江区",
            "500223": "潼南县",
            "500224": "铜梁县",
            "500225": "大足区",
            "500226": "荣昌县",
            "500227": "璧山县",
            "500228": "梁平县",
            "500229": "城口县",
            "500230": "丰都县",
            "500231": "垫江县",
            "500232": "武隆县",
            "500233": "忠县",
            "500234": "开县",
            "500235": "云阳县",
            "500236": "奉节县",
            "500237": "巫山县",
            "500238": "巫溪县",
            "500240": "石柱土家族自治县",
            "500241": "秀山土家族苗族自治县",
            "500242": "酉阳土家族苗族自治县",
            "500243": "彭水苗族土家族自治县",
            "500381": "江津区",
            "500382": "合川区",
            "500383": "永川区",
            "500384": "南川区",
            "500385": "其它区",
            "510000": "四川省",
            "510100": "成都市",
            "510104": "锦江区",
            "510105": "青羊区",
            "510106": "金牛区",
            "510107": "武侯区",
            "510108": "成华区",
            "510112": "龙泉驿区",
            "510113": "青白江区",
            "510114": "新都区",
            "510115": "温江区",
            "510121": "金堂县",
            "510122": "双流县",
            "510124": "郫县",
            "510129": "大邑县",
            "510131": "蒲江县",
            "510132": "新津县",
            "510181": "都江堰市",
            "510182": "彭州市",
            "510183": "邛崃市",
            "510184": "崇州市",
            "510185": "其它区",
            "510300": "自贡市",
            "510302": "自流井区",
            "510303": "贡井区",
            "510304": "大安区",
            "510311": "沿滩区",
            "510321": "荣县",
            "510322": "富顺县",
            "510323": "其它区",
            "510400": "攀枝花市",
            "510402": "东区",
            "510403": "西区",
            "510411": "仁和区",
            "510421": "米易县",
            "510422": "盐边县",
            "510423": "其它区",
            "510500": "泸州市",
            "510502": "江阳区",
            "510503": "纳溪区",
            "510504": "龙马潭区",
            "510521": "泸县",
            "510522": "合江县",
            "510524": "叙永县",
            "510525": "古蔺县",
            "510526": "其它区",
            "510600": "德阳市",
            "510603": "旌阳区",
            "510623": "中江县",
            "510626": "罗江县",
            "510681": "广汉市",
            "510682": "什邡市",
            "510683": "绵竹市",
            "510684": "其它区",
            "510700": "绵阳市",
            "510703": "涪城区",
            "510704": "游仙区",
            "510722": "三台县",
            "510723": "盐亭县",
            "510724": "安县",
            "510725": "梓潼县",
            "510726": "北川羌族自治县",
            "510727": "平武县",
            "510781": "江油市",
            "510782": "其它区",
            "510800": "广元市",
            "510802": "利州区",
            "510811": "昭化区",
            "510812": "朝天区",
            "510821": "旺苍县",
            "510822": "青川县",
            "510823": "剑阁县",
            "510824": "苍溪县",
            "510825": "其它区",
            "510900": "遂宁市",
            "510903": "船山区",
            "510904": "安居区",
            "510921": "蓬溪县",
            "510922": "射洪县",
            "510923": "大英县",
            "510924": "其它区",
            "511000": "内江市",
            "511002": "市中区",
            "511011": "东兴区",
            "511024": "威远县",
            "511025": "资中县",
            "511028": "隆昌县",
            "511029": "其它区",
            "511100": "乐山市",
            "511102": "市中区",
            "511111": "沙湾区",
            "511112": "五通桥区",
            "511113": "金口河区",
            "511123": "犍为县",
            "511124": "井研县",
            "511126": "夹江县",
            "511129": "沐川县",
            "511132": "峨边彝族自治县",
            "511133": "马边彝族自治县",
            "511181": "峨眉山市",
            "511182": "其它区",
            "511300": "南充市",
            "511302": "顺庆区",
            "511303": "高坪区",
            "511304": "嘉陵区",
            "511321": "南部县",
            "511322": "营山县",
            "511323": "蓬安县",
            "511324": "仪陇县",
            "511325": "西充县",
            "511381": "阆中市",
            "511382": "其它区",
            "511400": "眉山市",
            "511402": "东坡区",
            "511421": "仁寿县",
            "511422": "彭山县",
            "511423": "洪雅县",
            "511424": "丹棱县",
            "511425": "青神县",
            "511426": "其它区",
            "511500": "宜宾市",
            "511502": "翠屏区",
            "511521": "宜宾县",
            "511522": "南溪区",
            "511523": "江安县",
            "511524": "长宁县",
            "511525": "高县",
            "511526": "珙县",
            "511527": "筠连县",
            "511528": "兴文县",
            "511529": "屏山县",
            "511530": "其它区",
            "511600": "广安市",
            "511602": "广安区",
            "511603": "前锋区",
            "511621": "岳池县",
            "511622": "武胜县",
            "511623": "邻水县",
            "511681": "华蓥市",
            "511683": "其它区",
            "511700": "达州市",
            "511702": "通川区",
            "511721": "达川区",
            "511722": "宣汉县",
            "511723": "开江县",
            "511724": "大竹县",
            "511725": "渠县",
            "511781": "万源市",
            "511782": "其它区",
            "511800": "雅安市",
            "511802": "雨城区",
            "511821": "名山区",
            "511822": "荥经县",
            "511823": "汉源县",
            "511824": "石棉县",
            "511825": "天全县",
            "511826": "芦山县",
            "511827": "宝兴县",
            "511828": "其它区",
            "511900": "巴中市",
            "511902": "巴州区",
            "511903": "恩阳区",
            "511921": "通江县",
            "511922": "南江县",
            "511923": "平昌县",
            "511924": "其它区",
            "512000": "资阳市",
            "512002": "雁江区",
            "512021": "安岳县",
            "512022": "乐至县",
            "512081": "简阳市",
            "512082": "其它区",
            "513200": "阿坝藏族羌族自治州",
            "513221": "汶川县",
            "513222": "理县",
            "513223": "茂县",
            "513224": "松潘县",
            "513225": "九寨沟县",
            "513226": "金川县",
            "513227": "小金县",
            "513228": "黑水县",
            "513229": "马尔康县",
            "513230": "壤塘县",
            "513231": "阿坝县",
            "513232": "若尔盖县",
            "513233": "红原县",
            "513234": "其它区",
            "513300": "甘孜藏族自治州",
            "513321": "康定县",
            "513322": "泸定县",
            "513323": "丹巴县",
            "513324": "九龙县",
            "513325": "雅江县",
            "513326": "道孚县",
            "513327": "炉霍县",
            "513328": "甘孜县",
            "513329": "新龙县",
            "513330": "德格县",
            "513331": "白玉县",
            "513332": "石渠县",
            "513333": "色达县",
            "513334": "理塘县",
            "513335": "巴塘县",
            "513336": "乡城县",
            "513337": "稻城县",
            "513338": "得荣县",
            "513339": "其它区",
            "513400": "凉山彝族自治州",
            "513401": "西昌市",
            "513422": "木里藏族自治县",
            "513423": "盐源县",
            "513424": "德昌县",
            "513425": "会理县",
            "513426": "会东县",
            "513427": "宁南县",
            "513428": "普格县",
            "513429": "布拖县",
            "513430": "金阳县",
            "513431": "昭觉县",
            "513432": "喜德县",
            "513433": "冕宁县",
            "513434": "越西县",
            "513435": "甘洛县",
            "513436": "美姑县",
            "513437": "雷波县",
            "513438": "其它区",
            "520000": "贵州省",
            "520100": "贵阳市",
            "520102": "南明区",
            "520103": "云岩区",
            "520111": "花溪区",
            "520112": "乌当区",
            "520113": "白云区",
            "520121": "开阳县",
            "520122": "息烽县",
            "520123": "修文县",
            "520151": "观山湖区",
            "520181": "清镇市",
            "520182": "其它区",
            "520200": "六盘水市",
            "520201": "钟山区",
            "520203": "六枝特区",
            "520221": "水城县",
            "520222": "盘县",
            "520223": "其它区",
            "520300": "遵义市",
            "520302": "红花岗区",
            "520303": "汇川区",
            "520321": "遵义县",
            "520322": "桐梓县",
            "520323": "绥阳县",
            "520324": "正安县",
            "520325": "道真仡佬族苗族自治县",
            "520326": "务川仡佬族苗族自治县",
            "520327": "凤冈县",
            "520328": "湄潭县",
            "520329": "余庆县",
            "520330": "习水县",
            "520381": "赤水市",
            "520382": "仁怀市",
            "520383": "其它区",
            "520400": "安顺市",
            "520402": "西秀区",
            "520421": "平坝县",
            "520422": "普定县",
            "520423": "镇宁布依族苗族自治县",
            "520424": "关岭布依族苗族自治县",
            "520425": "紫云苗族布依族自治县",
            "520426": "其它区",
            "522200": "铜仁市",
            "522201": "碧江区",
            "522222": "江口县",
            "522223": "玉屏侗族自治县",
            "522224": "石阡县",
            "522225": "思南县",
            "522226": "印江土家族苗族自治县",
            "522227": "德江县",
            "522228": "沿河土家族自治县",
            "522229": "松桃苗族自治县",
            "522230": "万山区",
            "522231": "其它区",
            "522300": "黔西南布依族苗族自治州",
            "522301": "兴义市",
            "522322": "兴仁县",
            "522323": "普安县",
            "522324": "晴隆县",
            "522325": "贞丰县",
            "522326": "望谟县",
            "522327": "册亨县",
            "522328": "安龙县",
            "522329": "其它区",
            "522400": "毕节市",
            "522401": "七星关区",
            "522422": "大方县",
            "522423": "黔西县",
            "522424": "金沙县",
            "522425": "织金县",
            "522426": "纳雍县",
            "522427": "威宁彝族回族苗族自治县",
            "522428": "赫章县",
            "522429": "其它区",
            "522600": "黔东南苗族侗族自治州",
            "522601": "凯里市",
            "522622": "黄平县",
            "522623": "施秉县",
            "522624": "三穗县",
            "522625": "镇远县",
            "522626": "岑巩县",
            "522627": "天柱县",
            "522628": "锦屏县",
            "522629": "剑河县",
            "522630": "台江县",
            "522631": "黎平县",
            "522632": "榕江县",
            "522633": "从江县",
            "522634": "雷山县",
            "522635": "麻江县",
            "522636": "丹寨县",
            "522637": "其它区",
            "522700": "黔南布依族苗族自治州",
            "522701": "都匀市",
            "522702": "福泉市",
            "522722": "荔波县",
            "522723": "贵定县",
            "522725": "瓮安县",
            "522726": "独山县",
            "522727": "平塘县",
            "522728": "罗甸县",
            "522729": "长顺县",
            "522730": "龙里县",
            "522731": "惠水县",
            "522732": "三都水族自治县",
            "522733": "其它区",
            "530000": "云南省",
            "530100": "昆明市",
            "530102": "五华区",
            "530103": "盘龙区",
            "530111": "官渡区",
            "530112": "西山区",
            "530113": "东川区",
            "530121": "呈贡区",
            "530122": "晋宁县",
            "530124": "富民县",
            "530125": "宜良县",
            "530126": "石林彝族自治县",
            "530127": "嵩明县",
            "530128": "禄劝彝族苗族自治县",
            "530129": "寻甸回族彝族自治县",
            "530181": "安宁市",
            "530182": "其它区",
            "530300": "曲靖市",
            "530302": "麒麟区",
            "530321": "马龙县",
            "530322": "陆良县",
            "530323": "师宗县",
            "530324": "罗平县",
            "530325": "富源县",
            "530326": "会泽县",
            "530328": "沾益县",
            "530381": "宣威市",
            "530382": "其它区",
            "530400": "玉溪市",
            "530402": "红塔区",
            "530421": "江川县",
            "530422": "澄江县",
            "530423": "通海县",
            "530424": "华宁县",
            "530425": "易门县",
            "530426": "峨山彝族自治县",
            "530427": "新平彝族傣族自治县",
            "530428": "元江哈尼族彝族傣族自治县",
            "530429": "其它区",
            "530500": "保山市",
            "530502": "隆阳区",
            "530521": "施甸县",
            "530522": "腾冲县",
            "530523": "龙陵县",
            "530524": "昌宁县",
            "530525": "其它区",
            "530600": "昭通市",
            "530602": "昭阳区",
            "530621": "鲁甸县",
            "530622": "巧家县",
            "530623": "盐津县",
            "530624": "大关县",
            "530625": "永善县",
            "530626": "绥江县",
            "530627": "镇雄县",
            "530628": "彝良县",
            "530629": "威信县",
            "530630": "水富县",
            "530631": "其它区",
            "530700": "丽江市",
            "530702": "古城区",
            "530721": "玉龙纳西族自治县",
            "530722": "永胜县",
            "530723": "华坪县",
            "530724": "宁蒗彝族自治县",
            "530725": "其它区",
            "530800": "普洱市",
            "530802": "思茅区",
            "530821": "宁洱哈尼族彝族自治县",
            "530822": "墨江哈尼族自治县",
            "530823": "景东彝族自治县",
            "530824": "景谷傣族彝族自治县",
            "530825": "镇沅彝族哈尼族拉祜族自治县",
            "530826": "江城哈尼族彝族自治县",
            "530827": "孟连傣族拉祜族佤族自治县",
            "530828": "澜沧拉祜族自治县",
            "530829": "西盟佤族自治县",
            "530830": "其它区",
            "530900": "临沧市",
            "530902": "临翔区",
            "530921": "凤庆县",
            "530922": "云县",
            "530923": "永德县",
            "530924": "镇康县",
            "530925": "双江拉祜族佤族布朗族傣族自治县",
            "530926": "耿马傣族佤族自治县",
            "530927": "沧源佤族自治县",
            "530928": "其它区",
            "532300": "楚雄彝族自治州",
            "532301": "楚雄市",
            "532322": "双柏县",
            "532323": "牟定县",
            "532324": "南华县",
            "532325": "姚安县",
            "532326": "大姚县",
            "532327": "永仁县",
            "532328": "元谋县",
            "532329": "武定县",
            "532331": "禄丰县",
            "532332": "其它区",
            "532500": "红河哈尼族彝族自治州",
            "532501": "个旧市",
            "532502": "开远市",
            "532522": "蒙自市",
            "532523": "屏边苗族自治县",
            "532524": "建水县",
            "532525": "石屏县",
            "532526": "弥勒市",
            "532527": "泸西县",
            "532528": "元阳县",
            "532529": "红河县",
            "532530": "金平苗族瑶族傣族自治县",
            "532531": "绿春县",
            "532532": "河口瑶族自治县",
            "532533": "其它区",
            "532600": "文山壮族苗族自治州",
            "532621": "文山市",
            "532622": "砚山县",
            "532623": "西畴县",
            "532624": "麻栗坡县",
            "532625": "马关县",
            "532626": "丘北县",
            "532627": "广南县",
            "532628": "富宁县",
            "532629": "其它区",
            "532800": "西双版纳傣族自治州",
            "532801": "景洪市",
            "532822": "勐海县",
            "532823": "勐腊县",
            "532824": "其它区",
            "532900": "大理白族自治州",
            "532901": "大理市",
            "532922": "漾濞彝族自治县",
            "532923": "祥云县",
            "532924": "宾川县",
            "532925": "弥渡县",
            "532926": "南涧彝族自治县",
            "532927": "巍山彝族回族自治县",
            "532928": "永平县",
            "532929": "云龙县",
            "532930": "洱源县",
            "532931": "剑川县",
            "532932": "鹤庆县",
            "532933": "其它区",
            "533100": "德宏傣族景颇族自治州",
            "533102": "瑞丽市",
            "533103": "芒市",
            "533122": "梁河县",
            "533123": "盈江县",
            "533124": "陇川县",
            "533125": "其它区",
            "533300": "怒江傈僳族自治州",
            "533321": "泸水县",
            "533323": "福贡县",
            "533324": "贡山独龙族怒族自治县",
            "533325": "兰坪白族普米族自治县",
            "533326": "其它区",
            "533400": "迪庆藏族自治州",
            "533421": "香格里拉县",
            "533422": "德钦县",
            "533423": "维西傈僳族自治县",
            "533424": "其它区",
            "540000": "西藏自治区",
            "540100": "拉萨市",
            "540102": "城关区",
            "540121": "林周县",
            "540122": "当雄县",
            "540123": "尼木县",
            "540124": "曲水县",
            "540125": "堆龙德庆县",
            "540126": "达孜县",
            "540127": "墨竹工卡县",
            "540128": "其它区",
            "542100": "昌都地区",
            "542121": "昌都县",
            "542122": "江达县",
            "542123": "贡觉县",
            "542124": "类乌齐县",
            "542125": "丁青县",
            "542126": "察雅县",
            "542127": "八宿县",
            "542128": "左贡县",
            "542129": "芒康县",
            "542132": "洛隆县",
            "542133": "边坝县",
            "542134": "其它区",
            "542200": "山南地区",
            "542221": "乃东县",
            "542222": "扎囊县",
            "542223": "贡嘎县",
            "542224": "桑日县",
            "542225": "琼结县",
            "542226": "曲松县",
            "542227": "措美县",
            "542228": "洛扎县",
            "542229": "加查县",
            "542231": "隆子县",
            "542232": "错那县",
            "542233": "浪卡子县",
            "542234": "其它区",
            "542300": "日喀则地区",
            "542301": "日喀则市",
            "542322": "南木林县",
            "542323": "江孜县",
            "542324": "定日县",
            "542325": "萨迦县",
            "542326": "拉孜县",
            "542327": "昂仁县",
            "542328": "谢通门县",
            "542329": "白朗县",
            "542330": "仁布县",
            "542331": "康马县",
            "542332": "定结县",
            "542333": "仲巴县",
            "542334": "亚东县",
            "542335": "吉隆县",
            "542336": "聂拉木县",
            "542337": "萨嘎县",
            "542338": "岗巴县",
            "542339": "其它区",
            "542400": "那曲地区",
            "542421": "那曲县",
            "542422": "嘉黎县",
            "542423": "比如县",
            "542424": "聂荣县",
            "542425": "安多县",
            "542426": "申扎县",
            "542427": "索县",
            "542428": "班戈县",
            "542429": "巴青县",
            "542430": "尼玛县",
            "542431": "其它区",
            "542432": "双湖县",
            "542500": "阿里地区",
            "542521": "普兰县",
            "542522": "札达县",
            "542523": "噶尔县",
            "542524": "日土县",
            "542525": "革吉县",
            "542526": "改则县",
            "542527": "措勤县",
            "542528": "其它区",
            "542600": "林芝地区",
            "542621": "林芝县",
            "542622": "工布江达县",
            "542623": "米林县",
            "542624": "墨脱县",
            "542625": "波密县",
            "542626": "察隅县",
            "542627": "朗县",
            "542628": "其它区",
            "610000": "陕西省",
            "610100": "西安市",
            "610102": "新城区",
            "610103": "碑林区",
            "610104": "莲湖区",
            "610111": "灞桥区",
            "610112": "未央区",
            "610113": "雁塔区",
            "610114": "阎良区",
            "610115": "临潼区",
            "610116": "长安区",
            "610122": "蓝田县",
            "610124": "周至县",
            "610125": "户县",
            "610126": "高陵县",
            "610127": "其它区",
            "610200": "铜川市",
            "610202": "王益区",
            "610203": "印台区",
            "610204": "耀州区",
            "610222": "宜君县",
            "610223": "其它区",
            "610300": "宝鸡市",
            "610302": "渭滨区",
            "610303": "金台区",
            "610304": "陈仓区",
            "610322": "凤翔县",
            "610323": "岐山县",
            "610324": "扶风县",
            "610326": "眉县",
            "610327": "陇县",
            "610328": "千阳县",
            "610329": "麟游县",
            "610330": "凤县",
            "610331": "太白县",
            "610332": "其它区",
            "610400": "咸阳市",
            "610402": "秦都区",
            "610403": "杨陵区",
            "610404": "渭城区",
            "610422": "三原县",
            "610423": "泾阳县",
            "610424": "乾县",
            "610425": "礼泉县",
            "610426": "永寿县",
            "610427": "彬县",
            "610428": "长武县",
            "610429": "旬邑县",
            "610430": "淳化县",
            "610431": "武功县",
            "610481": "兴平市",
            "610482": "其它区",
            "610500": "渭南市",
            "610502": "临渭区",
            "610521": "华县",
            "610522": "潼关县",
            "610523": "大荔县",
            "610524": "合阳县",
            "610525": "澄城县",
            "610526": "蒲城县",
            "610527": "白水县",
            "610528": "富平县",
            "610581": "韩城市",
            "610582": "华阴市",
            "610583": "其它区",
            "610600": "延安市",
            "610602": "宝塔区",
            "610621": "延长县",
            "610622": "延川县",
            "610623": "子长县",
            "610624": "安塞县",
            "610625": "志丹县",
            "610626": "吴起县",
            "610627": "甘泉县",
            "610628": "富县",
            "610629": "洛川县",
            "610630": "宜川县",
            "610631": "黄龙县",
            "610632": "黄陵县",
            "610633": "其它区",
            "610700": "汉中市",
            "610702": "汉台区",
            "610721": "南郑县",
            "610722": "城固县",
            "610723": "洋县",
            "610724": "西乡县",
            "610725": "勉县",
            "610726": "宁强县",
            "610727": "略阳县",
            "610728": "镇巴县",
            "610729": "留坝县",
            "610730": "佛坪县",
            "610731": "其它区",
            "610800": "榆林市",
            "610802": "榆阳区",
            "610821": "神木县",
            "610822": "府谷县",
            "610823": "横山县",
            "610824": "靖边县",
            "610825": "定边县",
            "610826": "绥德县",
            "610827": "米脂县",
            "610828": "佳县",
            "610829": "吴堡县",
            "610830": "清涧县",
            "610831": "子洲县",
            "610832": "其它区",
            "610900": "安康市",
            "610902": "汉滨区",
            "610921": "汉阴县",
            "610922": "石泉县",
            "610923": "宁陕县",
            "610924": "紫阳县",
            "610925": "岚皋县",
            "610926": "平利县",
            "610927": "镇坪县",
            "610928": "旬阳县",
            "610929": "白河县",
            "610930": "其它区",
            "611000": "商洛市",
            "611002": "商州区",
            "611021": "洛南县",
            "611022": "丹凤县",
            "611023": "商南县",
            "611024": "山阳县",
            "611025": "镇安县",
            "611026": "柞水县",
            "611027": "其它区",
            "620000": "甘肃省",
            "620100": "兰州市",
            "620102": "城关区",
            "620103": "七里河区",
            "620104": "西固区",
            "620105": "安宁区",
            "620111": "红古区",
            "620121": "永登县",
            "620122": "皋兰县",
            "620123": "榆中县",
            "620124": "其它区",
            "620200": "嘉峪关市",
            "620300": "金昌市",
            "620302": "金川区",
            "620321": "永昌县",
            "620322": "其它区",
            "620400": "白银市",
            "620402": "白银区",
            "620403": "平川区",
            "620421": "靖远县",
            "620422": "会宁县",
            "620423": "景泰县",
            "620424": "其它区",
            "620500": "天水市",
            "620502": "秦州区",
            "620503": "麦积区",
            "620521": "清水县",
            "620522": "秦安县",
            "620523": "甘谷县",
            "620524": "武山县",
            "620525": "张家川回族自治县",
            "620526": "其它区",
            "620600": "武威市",
            "620602": "凉州区",
            "620621": "民勤县",
            "620622": "古浪县",
            "620623": "天祝藏族自治县",
            "620624": "其它区",
            "620700": "张掖市",
            "620702": "甘州区",
            "620721": "肃南裕固族自治县",
            "620722": "民乐县",
            "620723": "临泽县",
            "620724": "高台县",
            "620725": "山丹县",
            "620726": "其它区",
            "620800": "平凉市",
            "620802": "崆峒区",
            "620821": "泾川县",
            "620822": "灵台县",
            "620823": "崇信县",
            "620824": "华亭县",
            "620825": "庄浪县",
            "620826": "静宁县",
            "620827": "其它区",
            "620900": "酒泉市",
            "620902": "肃州区",
            "620921": "金塔县",
            "620922": "瓜州县",
            "620923": "肃北蒙古族自治县",
            "620924": "阿克塞哈萨克族自治县",
            "620981": "玉门市",
            "620982": "敦煌市",
            "620983": "其它区",
            "621000": "庆阳市",
            "621002": "西峰区",
            "621021": "庆城县",
            "621022": "环县",
            "621023": "华池县",
            "621024": "合水县",
            "621025": "正宁县",
            "621026": "宁县",
            "621027": "镇原县",
            "621028": "其它区",
            "621100": "定西市",
            "621102": "安定区",
            "621121": "通渭县",
            "621122": "陇西县",
            "621123": "渭源县",
            "621124": "临洮县",
            "621125": "漳县",
            "621126": "岷县",
            "621127": "其它区",
            "621200": "陇南市",
            "621202": "武都区",
            "621221": "成县",
            "621222": "文县",
            "621223": "宕昌县",
            "621224": "康县",
            "621225": "西和县",
            "621226": "礼县",
            "621227": "徽县",
            "621228": "两当县",
            "621229": "其它区",
            "622900": "临夏回族自治州",
            "622901": "临夏市",
            "622921": "临夏县",
            "622922": "康乐县",
            "622923": "永靖县",
            "622924": "广河县",
            "622925": "和政县",
            "622926": "东乡族自治县",
            "622927": "积石山保安族东乡族撒拉族自治县",
            "622928": "其它区",
            "623000": "甘南藏族自治州",
            "623001": "合作市",
            "623021": "临潭县",
            "623022": "卓尼县",
            "623023": "舟曲县",
            "623024": "迭部县",
            "623025": "玛曲县",
            "623026": "碌曲县",
            "623027": "夏河县",
            "623028": "其它区",
            "630000": "青海省",
            "630100": "西宁市",
            "630102": "城东区",
            "630103": "城中区",
            "630104": "城西区",
            "630105": "城北区",
            "630121": "大通回族土族自治县",
            "630122": "湟中县",
            "630123": "湟源县",
            "630124": "其它区",
            "632100": "海东市",
            "632121": "平安县",
            "632122": "民和回族土族自治县",
            "632123": "乐都区",
            "632126": "互助土族自治县",
            "632127": "化隆回族自治县",
            "632128": "循化撒拉族自治县",
            "632129": "其它区",
            "632200": "海北藏族自治州",
            "632221": "门源回族自治县",
            "632222": "祁连县",
            "632223": "海晏县",
            "632224": "刚察县",
            "632225": "其它区",
            "632300": "黄南藏族自治州",
            "632321": "同仁县",
            "632322": "尖扎县",
            "632323": "泽库县",
            "632324": "河南蒙古族自治县",
            "632325": "其它区",
            "632500": "海南藏族自治州",
            "632521": "共和县",
            "632522": "同德县",
            "632523": "贵德县",
            "632524": "兴海县",
            "632525": "贵南县",
            "632526": "其它区",
            "632600": "果洛藏族自治州",
            "632621": "玛沁县",
            "632622": "班玛县",
            "632623": "甘德县",
            "632624": "达日县",
            "632625": "久治县",
            "632626": "玛多县",
            "632627": "其它区",
            "632700": "玉树藏族自治州",
            "632721": "玉树市",
            "632722": "杂多县",
            "632723": "称多县",
            "632724": "治多县",
            "632725": "囊谦县",
            "632726": "曲麻莱县",
            "632727": "其它区",
            "632800": "海西蒙古族藏族自治州",
            "632801": "格尔木市",
            "632802": "德令哈市",
            "632821": "乌兰县",
            "632822": "都兰县",
            "632823": "天峻县",
            "632824": "其它区",
            "640000": "宁夏回族自治区",
            "640100": "银川市",
            "640104": "兴庆区",
            "640105": "西夏区",
            "640106": "金凤区",
            "640121": "永宁县",
            "640122": "贺兰县",
            "640181": "灵武市",
            "640182": "其它区",
            "640200": "石嘴山市",
            "640202": "大武口区",
            "640205": "惠农区",
            "640221": "平罗县",
            "640222": "其它区",
            "640300": "吴忠市",
            "640302": "利通区",
            "640303": "红寺堡区",
            "640323": "盐池县",
            "640324": "同心县",
            "640381": "青铜峡市",
            "640382": "其它区",
            "640400": "固原市",
            "640402": "原州区",
            "640422": "西吉县",
            "640423": "隆德县",
            "640424": "泾源县",
            "640425": "彭阳县",
            "640426": "其它区",
            "640500": "中卫市",
            "640502": "沙坡头区",
            "640521": "中宁县",
            "640522": "海原县",
            "640523": "其它区",
            "650000": "新疆维吾尔自治区",
            "650100": "乌鲁木齐市",
            "650102": "天山区",
            "650103": "沙依巴克区",
            "650104": "新市区",
            "650105": "水磨沟区",
            "650106": "头屯河区",
            "650107": "达坂城区",
            "650109": "米东区",
            "650121": "乌鲁木齐县",
            "650122": "其它区",
            "650200": "克拉玛依市",
            "650202": "独山子区",
            "650203": "克拉玛依区",
            "650204": "白碱滩区",
            "650205": "乌尔禾区",
            "650206": "其它区",
            "652100": "吐鲁番地区",
            "652101": "吐鲁番市",
            "652122": "鄯善县",
            "652123": "托克逊县",
            "652124": "其它区",
            "652200": "哈密地区",
            "652201": "哈密市",
            "652222": "巴里坤哈萨克自治县",
            "652223": "伊吾县",
            "652224": "其它区",
            "652300": "昌吉回族自治州",
            "652301": "昌吉市",
            "652302": "阜康市",
            "652323": "呼图壁县",
            "652324": "玛纳斯县",
            "652325": "奇台县",
            "652327": "吉木萨尔县",
            "652328": "木垒哈萨克自治县",
            "652329": "其它区",
            "652700": "博尔塔拉蒙古自治州",
            "652701": "博乐市",
            "652702": "阿拉山口市",
            "652722": "精河县",
            "652723": "温泉县",
            "652724": "其它区",
            "652800": "巴音郭楞蒙古自治州",
            "652801": "库尔勒市",
            "652822": "轮台县",
            "652823": "尉犁县",
            "652824": "若羌县",
            "652825": "且末县",
            "652826": "焉耆回族自治县",
            "652827": "和静县",
            "652828": "和硕县",
            "652829": "博湖县",
            "652830": "其它区",
            "652900": "阿克苏地区",
            "652901": "阿克苏市",
            "652922": "温宿县",
            "652923": "库车县",
            "652924": "沙雅县",
            "652925": "新和县",
            "652926": "拜城县",
            "652927": "乌什县",
            "652928": "阿瓦提县",
            "652929": "柯坪县",
            "652930": "其它区",
            "653000": "克孜勒苏柯尔克孜自治州",
            "653001": "阿图什市",
            "653022": "阿克陶县",
            "653023": "阿合奇县",
            "653024": "乌恰县",
            "653025": "其它区",
            "653100": "喀什地区",
            "653101": "喀什市",
            "653121": "疏附县",
            "653122": "疏勒县",
            "653123": "英吉沙县",
            "653124": "泽普县",
            "653125": "莎车县",
            "653126": "叶城县",
            "653127": "麦盖提县",
            "653128": "岳普湖县",
            "653129": "伽师县",
            "653130": "巴楚县",
            "653131": "塔什库尔干塔吉克自治县",
            "653132": "其它区",
            "653200": "和田地区",
            "653201": "和田市",
            "653221": "和田县",
            "653222": "墨玉县",
            "653223": "皮山县",
            "653224": "洛浦县",
            "653225": "策勒县",
            "653226": "于田县",
            "653227": "民丰县",
            "653228": "其它区",
            "654000": "伊犁哈萨克自治州",
            "654002": "伊宁市",
            "654003": "奎屯市",
            "654021": "伊宁县",
            "654022": "察布查尔锡伯自治县",
            "654023": "霍城县",
            "654024": "巩留县",
            "654025": "新源县",
            "654026": "昭苏县",
            "654027": "特克斯县",
            "654028": "尼勒克县",
            "654029": "其它区",
            "654200": "塔城地区",
            "654201": "塔城市",
            "654202": "乌苏市",
            "654221": "额敏县",
            "654223": "沙湾县",
            "654224": "托里县",
            "654225": "裕民县",
            "654226": "和布克赛尔蒙古自治县",
            "654227": "其它区",
            "654300": "阿勒泰地区",
            "654301": "阿勒泰市",
            "654321": "布尔津县",
            "654322": "富蕴县",
            "654323": "福海县",
            "654324": "哈巴河县",
            "654325": "青河县",
            "654326": "吉木乃县",
            "654327": "其它区",
            "659001": "石河子市",
            "659002": "阿拉尔市",
            "659003": "图木舒克市",
            "659004": "五家渠市",
            "710000": "台湾",
            "710100": "台北市",
            "710101": "中正区",
            "710102": "大同区",
            "710103": "中山区",
            "710104": "松山区",
            "710105": "大安区",
            "710106": "万华区",
            "710107": "信义区",
            "710108": "士林区",
            "710109": "北投区",
            "710110": "内湖区",
            "710111": "南港区",
            "710112": "文山区",
            "710113": "其它区",
            "710200": "高雄市",
            "710201": "新兴区",
            "710202": "前金区",
            "710203": "芩雅区",
            "710204": "盐埕区",
            "710205": "鼓山区",
            "710206": "旗津区",
            "710207": "前镇区",
            "710208": "三民区",
            "710209": "左营区",
            "710210": "楠梓区",
            "710211": "小港区",
            "710212": "其它区",
            "710241": "苓雅区",
            "710242": "仁武区",
            "710243": "大社区",
            "710244": "冈山区",
            "710245": "路竹区",
            "710246": "阿莲区",
            "710247": "田寮区",
            "710248": "燕巢区",
            "710249": "桥头区",
            "710250": "梓官区",
            "710251": "弥陀区",
            "710252": "永安区",
            "710253": "湖内区",
            "710254": "凤山区",
            "710255": "大寮区",
            "710256": "林园区",
            "710257": "鸟松区",
            "710258": "大树区",
            "710259": "旗山区",
            "710260": "美浓区",
            "710261": "六龟区",
            "710262": "内门区",
            "710263": "杉林区",
            "710264": "甲仙区",
            "710265": "桃源区",
            "710266": "那玛夏区",
            "710267": "茂林区",
            "710268": "茄萣区",
            "710300": "台南市",
            "710301": "中西区",
            "710302": "东区",
            "710303": "南区",
            "710304": "北区",
            "710305": "安平区",
            "710306": "安南区",
            "710307": "其它区",
            "710339": "永康区",
            "710340": "归仁区",
            "710341": "新化区",
            "710342": "左镇区",
            "710343": "玉井区",
            "710344": "楠西区",
            "710345": "南化区",
            "710346": "仁德区",
            "710347": "关庙区",
            "710348": "龙崎区",
            "710349": "官田区",
            "710350": "麻豆区",
            "710351": "佳里区",
            "710352": "西港区",
            "710353": "七股区",
            "710354": "将军区",
            "710355": "学甲区",
            "710356": "北门区",
            "710357": "新营区",
            "710358": "后壁区",
            "710359": "白河区",
            "710360": "东山区",
            "710361": "六甲区",
            "710362": "下营区",
            "710363": "柳营区",
            "710364": "盐水区",
            "710365": "善化区",
            "710366": "大内区",
            "710367": "山上区",
            "710368": "新市区",
            "710369": "安定区",
            "710400": "台中市",
            "710401": "中区",
            "710402": "东区",
            "710403": "南区",
            "710404": "西区",
            "710405": "北区",
            "710406": "北屯区",
            "710407": "西屯区",
            "710408": "南屯区",
            "710409": "其它区",
            "710431": "太平区",
            "710432": "大里区",
            "710433": "雾峰区",
            "710434": "乌日区",
            "710435": "丰原区",
            "710436": "后里区",
            "710437": "石冈区",
            "710438": "东势区",
            "710439": "和平区",
            "710440": "新社区",
            "710441": "潭子区",
            "710442": "大雅区",
            "710443": "神冈区",
            "710444": "大肚区",
            "710445": "沙鹿区",
            "710446": "龙井区",
            "710447": "梧栖区",
            "710448": "清水区",
            "710449": "大甲区",
            "710450": "外埔区",
            "710451": "大安区",
            "710500": "金门县",
            "710507": "金沙镇",
            "710508": "金湖镇",
            "710509": "金宁乡",
            "710510": "金城镇",
            "710511": "烈屿乡",
            "710512": "乌坵乡",
            "710600": "南投县",
            "710614": "南投市",
            "710615": "中寮乡",
            "710616": "草屯镇",
            "710617": "国姓乡",
            "710618": "埔里镇",
            "710619": "仁爱乡",
            "710620": "名间乡",
            "710621": "集集镇",
            "710622": "水里乡",
            "710623": "鱼池乡",
            "710624": "信义乡",
            "710625": "竹山镇",
            "710626": "鹿谷乡",
            "710700": "基隆市",
            "710701": "仁爱区",
            "710702": "信义区",
            "710703": "中正区",
            "710704": "中山区",
            "710705": "安乐区",
            "710706": "暖暖区",
            "710707": "七堵区",
            "710708": "其它区",
            "710800": "新竹市",
            "710801": "东区",
            "710802": "北区",
            "710803": "香山区",
            "710804": "其它区",
            "710900": "嘉义市",
            "710901": "东区",
            "710902": "西区",
            "710903": "其它区",
            "711100": "新北市",
            "711130": "万里区",
            "711131": "金山区",
            "711132": "板桥区",
            "711133": "汐止区",
            "711134": "深坑区",
            "711135": "石碇区",
            "711136": "瑞芳区",
            "711137": "平溪区",
            "711138": "双溪区",
            "711139": "贡寮区",
            "711140": "新店区",
            "711141": "坪林区",
            "711142": "乌来区",
            "711143": "永和区",
            "711144": "中和区",
            "711145": "土城区",
            "711146": "三峡区",
            "711147": "树林区",
            "711148": "莺歌区",
            "711149": "三重区",
            "711150": "新庄区",
            "711151": "泰山区",
            "711152": "林口区",
            "711153": "芦洲区",
            "711154": "五股区",
            "711155": "八里区",
            "711156": "淡水区",
            "711157": "三芝区",
            "711158": "石门区",
            "711200": "宜兰县",
            "711214": "宜兰市",
            "711215": "头城镇",
            "711216": "礁溪乡",
            "711217": "壮围乡",
            "711218": "员山乡",
            "711219": "罗东镇",
            "711220": "三星乡",
            "711221": "大同乡",
            "711222": "五结乡",
            "711223": "冬山乡",
            "711224": "苏澳镇",
            "711225": "南澳乡",
            "711226": "钓鱼台",
            "711300": "新竹县",
            "711314": "竹北市",
            "711315": "湖口乡",
            "711316": "新丰乡",
            "711317": "新埔镇",
            "711318": "关西镇",
            "711319": "芎林乡",
            "711320": "宝山乡",
            "711321": "竹东镇",
            "711322": "五峰乡",
            "711323": "横山乡",
            "711324": "尖石乡",
            "711325": "北埔乡",
            "711326": "峨眉乡",
            "711400": "桃园县",
            "711414": "中坜市",
            "711415": "平镇市",
            "711416": "龙潭乡",
            "711417": "杨梅市",
            "711418": "新屋乡",
            "711419": "观音乡",
            "711420": "桃园市",
            "711421": "龟山乡",
            "711422": "八德市",
            "711423": "大溪镇",
            "711424": "复兴乡",
            "711425": "大园乡",
            "711426": "芦竹乡",
            "711500": "苗栗县",
            "711519": "竹南镇",
            "711520": "头份镇",
            "711521": "三湾乡",
            "711522": "南庄乡",
            "711523": "狮潭乡",
            "711524": "后龙镇",
            "711525": "通霄镇",
            "711526": "苑里镇",
            "711527": "苗栗市",
            "711528": "造桥乡",
            "711529": "头屋乡",
            "711530": "公馆乡",
            "711531": "大湖乡",
            "711532": "泰安乡",
            "711533": "铜锣乡",
            "711534": "三义乡",
            "711535": "西湖乡",
            "711536": "卓兰镇",
            "711700": "彰化县",
            "711727": "彰化市",
            "711728": "芬园乡",
            "711729": "花坛乡",
            "711730": "秀水乡",
            "711731": "鹿港镇",
            "711732": "福兴乡",
            "711733": "线西乡",
            "711734": "和美镇",
            "711735": "伸港乡",
            "711736": "员林镇",
            "711737": "社头乡",
            "711738": "永靖乡",
            "711739": "埔心乡",
            "711740": "溪湖镇",
            "711741": "大村乡",
            "711742": "埔盐乡",
            "711743": "田中镇",
            "711744": "北斗镇",
            "711745": "田尾乡",
            "711746": "埤头乡",
            "711747": "溪州乡",
            "711748": "竹塘乡",
            "711749": "二林镇",
            "711750": "大城乡",
            "711751": "芳苑乡",
            "711752": "二水乡",
            "711900": "嘉义县",
            "711919": "番路乡",
            "711920": "梅山乡",
            "711921": "竹崎乡",
            "711922": "阿里山乡",
            "711923": "中埔乡",
            "711924": "大埔乡",
            "711925": "水上乡",
            "711926": "鹿草乡",
            "711927": "太保市",
            "711928": "朴子市",
            "711929": "东石乡",
            "711930": "六脚乡",
            "711931": "新港乡",
            "711932": "民雄乡",
            "711933": "大林镇",
            "711934": "溪口乡",
            "711935": "义竹乡",
            "711936": "布袋镇",
            "712100": "云林县",
            "712121": "斗南镇",
            "712122": "大埤乡",
            "712123": "虎尾镇",
            "712124": "土库镇",
            "712125": "褒忠乡",
            "712126": "东势乡",
            "712127": "台西乡",
            "712128": "仑背乡",
            "712129": "麦寮乡",
            "712130": "斗六市",
            "712131": "林内乡",
            "712132": "古坑乡",
            "712133": "莿桐乡",
            "712134": "西螺镇",
            "712135": "二仑乡",
            "712136": "北港镇",
            "712137": "水林乡",
            "712138": "口湖乡",
            "712139": "四湖乡",
            "712140": "元长乡",
            "712400": "屏东县",
            "712434": "屏东市",
            "712435": "三地门乡",
            "712436": "雾台乡",
            "712437": "玛家乡",
            "712438": "九如乡",
            "712439": "里港乡",
            "712440": "高树乡",
            "712441": "盐埔乡",
            "712442": "长治乡",
            "712443": "麟洛乡",
            "712444": "竹田乡",
            "712445": "内埔乡",
            "712446": "万丹乡",
            "712447": "潮州镇",
            "712448": "泰武乡",
            "712449": "来义乡",
            "712450": "万峦乡",
            "712451": "崁顶乡",
            "712452": "新埤乡",
            "712453": "南州乡",
            "712454": "林边乡",
            "712455": "东港镇",
            "712456": "琉球乡",
            "712457": "佳冬乡",
            "712458": "新园乡",
            "712459": "枋寮乡",
            "712460": "枋山乡",
            "712461": "春日乡",
            "712462": "狮子乡",
            "712463": "车城乡",
            "712464": "牡丹乡",
            "712465": "恒春镇",
            "712466": "满州乡",
            "712500": "台东县",
            "712517": "台东市",
            "712518": "绿岛乡",
            "712519": "兰屿乡",
            "712520": "延平乡",
            "712521": "卑南乡",
            "712522": "鹿野乡",
            "712523": "关山镇",
            "712524": "海端乡",
            "712525": "池上乡",
            "712526": "东河乡",
            "712527": "成功镇",
            "712528": "长滨乡",
            "712529": "金峰乡",
            "712530": "大武乡",
            "712531": "达仁乡",
            "712532": "太麻里乡",
            "712600": "花莲县",
            "712615": "花莲市",
            "712616": "新城乡",
            "712617": "太鲁阁",
            "712618": "秀林乡",
            "712619": "吉安乡",
            "712620": "寿丰乡",
            "712621": "凤林镇",
            "712622": "光复乡",
            "712623": "丰滨乡",
            "712624": "瑞穗乡",
            "712625": "万荣乡",
            "712626": "玉里镇",
            "712627": "卓溪乡",
            "712628": "富里乡",
            "712700": "澎湖县",
            "712707": "马公市",
            "712708": "西屿乡",
            "712709": "望安乡",
            "712710": "七美乡",
            "712711": "白沙乡",
            "712712": "湖西乡",
            "712800": "连江县",
            "712805": "南竿乡",
            "712806": "北竿乡",
            "712807": "莒光乡",
            "712808": "东引乡",
            "810000": "香港特别行政区",
            "810100": "香港岛",
            "810101": "中西区",
            "810102": "湾仔",
            "810103": "东区",
            "810104": "南区",
            "810200": "九龙",
            "810201": "九龙城区",
            "810202": "油尖旺区",
            "810203": "深水埗区",
            "810204": "黄大仙区",
            "810205": "观塘区",
            "810300": "新界",
            "810301": "北区",
            "810302": "大埔区",
            "810303": "沙田区",
            "810304": "西贡区",
            "810305": "元朗区",
            "810306": "屯门区",
            "810307": "荃湾区",
            "810308": "葵青区",
            "810309": "离岛区",
            "820000": "澳门特别行政区",
            "820100": "澳门半岛",
            "820200": "离岛",
            "990000": "海外",
            "990100": "海外"
          };
          function tree(list) {
            var mapped = {};
            for (var i2 = 0, item; i2 < list.length; i2++) {
              item = list[i2];
              if (!item || !item.id)
                continue;
              mapped[item.id] = item;
            }
            var result = [];
            for (var ii = 0; ii < list.length; ii++) {
              item = list[ii];
              if (!item)
                continue;
              if (item.pid == void 0 && item.parentId == void 0) {
                result.push(item);
                continue;
              }
              var parent = mapped[item.pid] || mapped[item.parentId];
              if (!parent)
                continue;
              if (!parent.children)
                parent.children = [];
              parent.children.push(item);
            }
            return result;
          }
          var DICT_FIXED = function() {
            var fixed = [];
            for (var id in DICT) {
              var pid = id.slice(2, 6) === "0000" ? void 0 : id.slice(4, 6) == "00" ? id.slice(0, 2) + "0000" : id.slice(0, 4) + "00";
              fixed.push({
                id,
                pid,
                name: DICT[id]
              });
            }
            return tree(fixed);
          }();
          module2.exports = DICT_FIXED;
        },
        /* 19 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var DICT = __webpack_require__2(18);
          module2.exports = {
            // Dice
            d4: function() {
              return this.natural(1, 4);
            },
            d6: function() {
              return this.natural(1, 6);
            },
            d8: function() {
              return this.natural(1, 8);
            },
            d12: function() {
              return this.natural(1, 12);
            },
            d20: function() {
              return this.natural(1, 20);
            },
            d100: function() {
              return this.natural(1, 100);
            },
            /*
            			    随机生成一个 GUID。
            
            			    http://www.broofa.com/2008/09/javascript-uuid-function/
            			    [UUID 规范](http://www.ietf.org/rfc/rfc4122.txt)
            			        UUIDs (Universally Unique IDentifier)
            			        GUIDs (Globally Unique IDentifier)
            			        The formal definition of the UUID string representation is provided by the following ABNF [7]:
            			            UUID                   = time-low "-" time-mid "-"
            			                                   time-high-and-version "-"
            			                                   clock-seq-and-reserved
            			                                   clock-seq-low "-" node
            			            time-low               = 4hexOctet
            			            time-mid               = 2hexOctet
            			            time-high-and-version  = 2hexOctet
            			            clock-seq-and-reserved = hexOctet
            			            clock-seq-low          = hexOctet
            			            node                   = 6hexOctet
            			            hexOctet               = hexDigit hexDigit
            			            hexDigit =
            			                "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" /
            			                "a" / "b" / "c" / "d" / "e" / "f" /
            			                "A" / "B" / "C" / "D" / "E" / "F"
            			    
            			    https://github.com/victorquinn/chancejs/blob/develop/chance.js#L1349
            			*/
            guid: function() {
              var pool = "abcdefABCDEF1234567890", guid = this.string(pool, 8) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 12);
              return guid;
            },
            uuid: function() {
              return this.guid();
            },
            /*
            			    随机生成一个 18 位身份证。
            
            			    [身份证](http://baike.baidu.com/view/1697.htm#4)
            			        地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
            			    [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
            			*/
            id: function() {
              var id, sum = 0, rank = [
                "7",
                "9",
                "10",
                "5",
                "8",
                "4",
                "2",
                "1",
                "6",
                "3",
                "7",
                "9",
                "10",
                "5",
                "8",
                "4",
                "2"
              ], last = [
                "1",
                "0",
                "X",
                "9",
                "8",
                "7",
                "6",
                "5",
                "4",
                "3",
                "2"
              ];
              id = this.pick(DICT).id + this.date("yyyyMMdd") + this.string("number", 3);
              for (var i2 = 0; i2 < id.length; i2++) {
                sum += id[i2] * rank[i2];
              }
              id += last[sum % 11];
              return id;
            },
            /*
                生成一个全局的自增整数。
                类似自增主键（auto increment primary key）。
            */
            increment: function() {
              var key2 = 0;
              return function(step) {
                return key2 += +step || 1;
              };
            }(),
            inc: function(step) {
              return this.increment(step);
            }
          };
        },
        /* 20 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Parser2 = __webpack_require__2(21);
          var Handler2 = __webpack_require__2(22);
          module2.exports = {
            Parser: Parser2,
            Handler: Handler2
          };
        },
        /* 21 */
        /***/
        function(module2, exports2) {
          function Token(n2) {
            this.type = n2, this.offset = Token.offset(), this.text = Token.text();
          }
          function Alternate(n2, l) {
            Token.call(this, "alternate"), this.left = n2, this.right = l;
          }
          function Match(n2) {
            Token.call(this, "match"), this.body = n2.filter(Boolean);
          }
          function Group(n2, l) {
            Token.call(this, n2), this.body = l;
          }
          function CaptureGroup(n2) {
            Group.call(this, "capture-group"), this.index = cgs[this.offset] || (cgs[this.offset] = index2++), this.body = n2;
          }
          function Quantified(n2, l) {
            Token.call(this, "quantified"), this.body = n2, this.quantifier = l;
          }
          function Quantifier(n2, l) {
            Token.call(this, "quantifier"), this.min = n2, this.max = l, this.greedy = true;
          }
          function CharSet(n2, l) {
            Token.call(this, "charset"), this.invert = n2, this.body = l;
          }
          function CharacterRange(n2, l) {
            Token.call(this, "range"), this.start = n2, this.end = l;
          }
          function Literal(n2) {
            Token.call(this, "literal"), this.body = n2, this.escaped = this.body != this.text;
          }
          function Unicode(n2) {
            Token.call(this, "unicode"), this.code = n2.toUpperCase();
          }
          function Hex2(n2) {
            Token.call(this, "hex"), this.code = n2.toUpperCase();
          }
          function Octal(n2) {
            Token.call(this, "octal"), this.code = n2.toUpperCase();
          }
          function BackReference(n2) {
            Token.call(this, "back-reference"), this.code = n2.toUpperCase();
          }
          function ControlCharacter(n2) {
            Token.call(this, "control-character"), this.code = n2.toUpperCase();
          }
          var parser = function() {
            function n2(n3, l2) {
              function u2() {
                this.constructor = n3;
              }
              u2.prototype = l2.prototype, n3.prototype = new u2();
            }
            function l(n3, l2, u2, t2, r) {
              function e2(n4, l3) {
                function u3(n5) {
                  function l4(n6) {
                    return n6.charCodeAt(0).toString(16).toUpperCase();
                  }
                  return n5.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(n6) {
                    return "\\x0" + l4(n6);
                  }).replace(/[\x10-\x1F\x80-\xFF]/g, function(n6) {
                    return "\\x" + l4(n6);
                  }).replace(/[\u0180-\u0FFF]/g, function(n6) {
                    return "\\u0" + l4(n6);
                  }).replace(/[\u1080-\uFFFF]/g, function(n6) {
                    return "\\u" + l4(n6);
                  });
                }
                var t3, r2;
                switch (n4.length) {
                  case 0:
                    t3 = "end of input";
                    break;
                  case 1:
                    t3 = n4[0];
                    break;
                  default:
                    t3 = n4.slice(0, -1).join(", ") + " or " + n4[n4.length - 1];
                }
                return r2 = l3 ? '"' + u3(l3) + '"' : "end of input", "Expected " + t3 + " but " + r2 + " found.";
              }
              this.expected = n3, this.found = l2, this.offset = u2, this.line = t2, this.column = r, this.name = "SyntaxError", this.message = e2(n3, l2);
            }
            function u(n3) {
              function u2() {
                return n3.substring(Lt, qt);
              }
              function t2() {
                return Lt;
              }
              function r(l2) {
                function u3(l3, u4, t3) {
                  var r2, e3;
                  for (r2 = u4; t3 > r2; r2++)
                    e3 = n3.charAt(r2), "\n" === e3 ? (l3.seenCR || l3.line++, l3.column = 1, l3.seenCR = false) : "\r" === e3 || "\u2028" === e3 || "\u2029" === e3 ? (l3.line++, l3.column = 1, l3.seenCR = true) : (l3.column++, l3.seenCR = false);
                }
                return Mt !== l2 && (Mt > l2 && (Mt = 0, Dt = {
                  line: 1,
                  column: 1,
                  seenCR: false
                }), u3(Dt, Mt, l2), Mt = l2), Dt;
              }
              function e2(n4) {
                Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n4));
              }
              function o2(n4) {
                var l2 = 0;
                for (n4.sort(); l2 < n4.length; )
                  n4[l2 - 1] === n4[l2] ? n4.splice(l2, 1) : l2++;
              }
              function c() {
                var l2, u3, t3, r2, o3;
                return l2 = qt, u3 = i2(), null !== u3 ? (t3 = qt, 124 === n3.charCodeAt(qt) ? (r2 = fl, qt++) : (r2 = null, 0 === Wt && e2(sl)), null !== r2 ? (o3 = c(), null !== o3 ? (r2 = [r2, o3], t3 = r2) : (qt = t3, t3 = il)) : (qt = t3, t3 = il), null === t3 && (t3 = al), null !== t3 ? (Lt = l2, u3 = hl(u3, t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function i2() {
                var n4, l2, u3, t3, r2;
                if (n4 = qt, l2 = f2(), null === l2 && (l2 = al), null !== l2)
                  if (u3 = qt, Wt++, t3 = d(), Wt--, null === t3 ? u3 = al : (qt = u3, u3 = il), null !== u3) {
                    for (t3 = [], r2 = h(), null === r2 && (r2 = a()); null !== r2; )
                      t3.push(r2), r2 = h(), null === r2 && (r2 = a());
                    null !== t3 ? (r2 = s2(), null === r2 && (r2 = al), null !== r2 ? (Lt = n4, l2 = dl(l2, t3, r2), null === l2 ? (qt = n4, n4 = l2) : n4 = l2) : (qt = n4, n4 = il)) : (qt = n4, n4 = il);
                  } else
                    qt = n4, n4 = il;
                else
                  qt = n4, n4 = il;
                return n4;
              }
              function a() {
                var n4;
                return n4 = x(), null === n4 && (n4 = Q(), null === n4 && (n4 = B())), n4;
              }
              function f2() {
                var l2, u3;
                return l2 = qt, 94 === n3.charCodeAt(qt) ? (u3 = pl, qt++) : (u3 = null, 0 === Wt && e2(vl)), null !== u3 && (Lt = l2, u3 = wl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function s2() {
                var l2, u3;
                return l2 = qt, 36 === n3.charCodeAt(qt) ? (u3 = Al, qt++) : (u3 = null, 0 === Wt && e2(Cl)), null !== u3 && (Lt = l2, u3 = gl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function h() {
                var n4, l2, u3;
                return n4 = qt, l2 = a(), null !== l2 ? (u3 = d(), null !== u3 ? (Lt = n4, l2 = bl(l2, u3), null === l2 ? (qt = n4, n4 = l2) : n4 = l2) : (qt = n4, n4 = il)) : (qt = n4, n4 = il), n4;
              }
              function d() {
                var n4, l2, u3;
                return Wt++, n4 = qt, l2 = p2(), null !== l2 ? (u3 = k(), null === u3 && (u3 = al), null !== u3 ? (Lt = n4, l2 = Tl(l2, u3), null === l2 ? (qt = n4, n4 = l2) : n4 = l2) : (qt = n4, n4 = il)) : (qt = n4, n4 = il), Wt--, null === n4 && (l2 = null, 0 === Wt && e2(kl)), n4;
              }
              function p2() {
                var n4;
                return n4 = v(), null === n4 && (n4 = w(), null === n4 && (n4 = A(), null === n4 && (n4 = C(), null === n4 && (n4 = g(), null === n4 && (n4 = b()))))), n4;
              }
              function v() {
                var l2, u3, t3, r2, o3, c2;
                return l2 = qt, 123 === n3.charCodeAt(qt) ? (u3 = xl, qt++) : (u3 = null, 0 === Wt && e2(yl)), null !== u3 ? (t3 = T(), null !== t3 ? (44 === n3.charCodeAt(qt) ? (r2 = ml, qt++) : (r2 = null, 0 === Wt && e2(Rl)), null !== r2 ? (o3 = T(), null !== o3 ? (125 === n3.charCodeAt(qt) ? (c2 = Fl, qt++) : (c2 = null, 0 === Wt && e2(Ql)), null !== c2 ? (Lt = l2, u3 = Sl(t3, o3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function w() {
                var l2, u3, t3, r2;
                return l2 = qt, 123 === n3.charCodeAt(qt) ? (u3 = xl, qt++) : (u3 = null, 0 === Wt && e2(yl)), null !== u3 ? (t3 = T(), null !== t3 ? (n3.substr(qt, 2) === Ul ? (r2 = Ul, qt += 2) : (r2 = null, 0 === Wt && e2(El)), null !== r2 ? (Lt = l2, u3 = Gl(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function A() {
                var l2, u3, t3, r2;
                return l2 = qt, 123 === n3.charCodeAt(qt) ? (u3 = xl, qt++) : (u3 = null, 0 === Wt && e2(yl)), null !== u3 ? (t3 = T(), null !== t3 ? (125 === n3.charCodeAt(qt) ? (r2 = Fl, qt++) : (r2 = null, 0 === Wt && e2(Ql)), null !== r2 ? (Lt = l2, u3 = Bl(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function C() {
                var l2, u3;
                return l2 = qt, 43 === n3.charCodeAt(qt) ? (u3 = jl, qt++) : (u3 = null, 0 === Wt && e2($l)), null !== u3 && (Lt = l2, u3 = ql()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function g() {
                var l2, u3;
                return l2 = qt, 42 === n3.charCodeAt(qt) ? (u3 = Ll, qt++) : (u3 = null, 0 === Wt && e2(Ml)), null !== u3 && (Lt = l2, u3 = Dl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function b() {
                var l2, u3;
                return l2 = qt, 63 === n3.charCodeAt(qt) ? (u3 = Hl, qt++) : (u3 = null, 0 === Wt && e2(Ol)), null !== u3 && (Lt = l2, u3 = Wl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function k() {
                var l2;
                return 63 === n3.charCodeAt(qt) ? (l2 = Hl, qt++) : (l2 = null, 0 === Wt && e2(Ol)), l2;
              }
              function T() {
                var l2, u3, t3;
                if (l2 = qt, u3 = [], zl.test(n3.charAt(qt)) ? (t3 = n3.charAt(qt), qt++) : (t3 = null, 0 === Wt && e2(Il)), null !== t3)
                  for (; null !== t3; )
                    u3.push(t3), zl.test(n3.charAt(qt)) ? (t3 = n3.charAt(qt), qt++) : (t3 = null, 0 === Wt && e2(Il));
                else
                  u3 = il;
                return null !== u3 && (Lt = l2, u3 = Jl(u3)), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function x() {
                var l2, u3, t3, r2;
                return l2 = qt, 40 === n3.charCodeAt(qt) ? (u3 = Kl, qt++) : (u3 = null, 0 === Wt && e2(Nl)), null !== u3 ? (t3 = R(), null === t3 && (t3 = F(), null === t3 && (t3 = m(), null === t3 && (t3 = y()))), null !== t3 ? (41 === n3.charCodeAt(qt) ? (r2 = Pl, qt++) : (r2 = null, 0 === Wt && e2(Vl)), null !== r2 ? (Lt = l2, u3 = Xl(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function y() {
                var n4, l2;
                return n4 = qt, l2 = c(), null !== l2 && (Lt = n4, l2 = Yl(l2)), null === l2 ? (qt = n4, n4 = l2) : n4 = l2, n4;
              }
              function m() {
                var l2, u3, t3;
                return l2 = qt, n3.substr(qt, 2) === Zl ? (u3 = Zl, qt += 2) : (u3 = null, 0 === Wt && e2(_l)), null !== u3 ? (t3 = c(), null !== t3 ? (Lt = l2, u3 = nu(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function R() {
                var l2, u3, t3;
                return l2 = qt, n3.substr(qt, 2) === lu ? (u3 = lu, qt += 2) : (u3 = null, 0 === Wt && e2(uu)), null !== u3 ? (t3 = c(), null !== t3 ? (Lt = l2, u3 = tu(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function F() {
                var l2, u3, t3;
                return l2 = qt, n3.substr(qt, 2) === ru ? (u3 = ru, qt += 2) : (u3 = null, 0 === Wt && e2(eu)), null !== u3 ? (t3 = c(), null !== t3 ? (Lt = l2, u3 = ou(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function Q() {
                var l2, u3, t3, r2, o3;
                if (Wt++, l2 = qt, 91 === n3.charCodeAt(qt) ? (u3 = iu, qt++) : (u3 = null, 0 === Wt && e2(au)), null !== u3)
                  if (94 === n3.charCodeAt(qt) ? (t3 = pl, qt++) : (t3 = null, 0 === Wt && e2(vl)), null === t3 && (t3 = al), null !== t3) {
                    for (r2 = [], o3 = S(), null === o3 && (o3 = U()); null !== o3; )
                      r2.push(o3), o3 = S(), null === o3 && (o3 = U());
                    null !== r2 ? (93 === n3.charCodeAt(qt) ? (o3 = fu, qt++) : (o3 = null, 0 === Wt && e2(su)), null !== o3 ? (Lt = l2, u3 = hu(t3, r2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il);
                  } else
                    qt = l2, l2 = il;
                else
                  qt = l2, l2 = il;
                return Wt--, null === l2 && (u3 = null, 0 === Wt && e2(cu)), l2;
              }
              function S() {
                var l2, u3, t3, r2;
                return Wt++, l2 = qt, u3 = U(), null !== u3 ? (45 === n3.charCodeAt(qt) ? (t3 = pu, qt++) : (t3 = null, 0 === Wt && e2(vu)), null !== t3 ? (r2 = U(), null !== r2 ? (Lt = l2, u3 = wu(u3, r2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), Wt--, null === l2 && (u3 = null, 0 === Wt && e2(du)), l2;
              }
              function U() {
                var n4;
                return Wt++, n4 = G(), null === n4 && (n4 = E2()), Wt--, null === n4 && (0 === Wt && e2(Au)), n4;
              }
              function E2() {
                var l2, u3;
                return l2 = qt, Cu.test(n3.charAt(qt)) ? (u3 = n3.charAt(qt), qt++) : (u3 = null, 0 === Wt && e2(gu)), null !== u3 && (Lt = l2, u3 = bu(u3)), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function G() {
                var n4;
                return n4 = L(), null === n4 && (n4 = Y(), null === n4 && (n4 = H(), null === n4 && (n4 = O(), null === n4 && (n4 = W(), null === n4 && (n4 = z2(), null === n4 && (n4 = I(), null === n4 && (n4 = J(), null === n4 && (n4 = K(), null === n4 && (n4 = N(), null === n4 && (n4 = P(), null === n4 && (n4 = V(), null === n4 && (n4 = X(), null === n4 && (n4 = _(), null === n4 && (n4 = nl(), null === n4 && (n4 = ll(), null === n4 && (n4 = ul(), null === n4 && (n4 = tl()))))))))))))))))), n4;
              }
              function B() {
                var n4;
                return n4 = j(), null === n4 && (n4 = q(), null === n4 && (n4 = $())), n4;
              }
              function j() {
                var l2, u3;
                return l2 = qt, 46 === n3.charCodeAt(qt) ? (u3 = ku, qt++) : (u3 = null, 0 === Wt && e2(Tu)), null !== u3 && (Lt = l2, u3 = xu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function $() {
                var l2, u3;
                return Wt++, l2 = qt, mu.test(n3.charAt(qt)) ? (u3 = n3.charAt(qt), qt++) : (u3 = null, 0 === Wt && e2(Ru)), null !== u3 && (Lt = l2, u3 = bu(u3)), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, Wt--, null === l2 && (u3 = null, 0 === Wt && e2(yu)), l2;
              }
              function q() {
                var n4;
                return n4 = M(), null === n4 && (n4 = D(), null === n4 && (n4 = Y(), null === n4 && (n4 = H(), null === n4 && (n4 = O(), null === n4 && (n4 = W(), null === n4 && (n4 = z2(), null === n4 && (n4 = I(), null === n4 && (n4 = J(), null === n4 && (n4 = K(), null === n4 && (n4 = N(), null === n4 && (n4 = P(), null === n4 && (n4 = V(), null === n4 && (n4 = X(), null === n4 && (n4 = Z(), null === n4 && (n4 = _(), null === n4 && (n4 = nl(), null === n4 && (n4 = ll(), null === n4 && (n4 = ul(), null === n4 && (n4 = tl()))))))))))))))))))), n4;
              }
              function L() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === Fu ? (u3 = Fu, qt += 2) : (u3 = null, 0 === Wt && e2(Qu)), null !== u3 && (Lt = l2, u3 = Su()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function M() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === Fu ? (u3 = Fu, qt += 2) : (u3 = null, 0 === Wt && e2(Qu)), null !== u3 && (Lt = l2, u3 = Uu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function D() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === Eu ? (u3 = Eu, qt += 2) : (u3 = null, 0 === Wt && e2(Gu)), null !== u3 && (Lt = l2, u3 = Bu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function H() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === ju ? (u3 = ju, qt += 2) : (u3 = null, 0 === Wt && e2($u)), null !== u3 && (Lt = l2, u3 = qu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function O() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === Lu ? (u3 = Lu, qt += 2) : (u3 = null, 0 === Wt && e2(Mu)), null !== u3 && (Lt = l2, u3 = Du()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function W() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === Hu ? (u3 = Hu, qt += 2) : (u3 = null, 0 === Wt && e2(Ou)), null !== u3 && (Lt = l2, u3 = Wu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function z2() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === zu ? (u3 = zu, qt += 2) : (u3 = null, 0 === Wt && e2(Iu)), null !== u3 && (Lt = l2, u3 = Ju()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function I() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === Ku ? (u3 = Ku, qt += 2) : (u3 = null, 0 === Wt && e2(Nu)), null !== u3 && (Lt = l2, u3 = Pu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function J() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === Vu ? (u3 = Vu, qt += 2) : (u3 = null, 0 === Wt && e2(Xu)), null !== u3 && (Lt = l2, u3 = Yu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function K() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === Zu ? (u3 = Zu, qt += 2) : (u3 = null, 0 === Wt && e2(_u)), null !== u3 && (Lt = l2, u3 = nt()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function N() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === lt ? (u3 = lt, qt += 2) : (u3 = null, 0 === Wt && e2(ut)), null !== u3 && (Lt = l2, u3 = tt()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function P() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === rt ? (u3 = rt, qt += 2) : (u3 = null, 0 === Wt && e2(et)), null !== u3 && (Lt = l2, u3 = ot()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function V() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === ct ? (u3 = ct, qt += 2) : (u3 = null, 0 === Wt && e2(it)), null !== u3 && (Lt = l2, u3 = at()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function X() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === ft ? (u3 = ft, qt += 2) : (u3 = null, 0 === Wt && e2(st)), null !== u3 && (Lt = l2, u3 = ht()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function Y() {
                var l2, u3, t3;
                return l2 = qt, n3.substr(qt, 2) === dt ? (u3 = dt, qt += 2) : (u3 = null, 0 === Wt && e2(pt)), null !== u3 ? (n3.length > qt ? (t3 = n3.charAt(qt), qt++) : (t3 = null, 0 === Wt && e2(vt)), null !== t3 ? (Lt = l2, u3 = wt(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function Z() {
                var l2, u3, t3;
                return l2 = qt, 92 === n3.charCodeAt(qt) ? (u3 = At, qt++) : (u3 = null, 0 === Wt && e2(Ct)), null !== u3 ? (gt.test(n3.charAt(qt)) ? (t3 = n3.charAt(qt), qt++) : (t3 = null, 0 === Wt && e2(bt)), null !== t3 ? (Lt = l2, u3 = kt(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              function _() {
                var l2, u3, t3, r2;
                if (l2 = qt, n3.substr(qt, 2) === Tt ? (u3 = Tt, qt += 2) : (u3 = null, 0 === Wt && e2(xt)), null !== u3) {
                  if (t3 = [], yt.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(mt)), null !== r2)
                    for (; null !== r2; )
                      t3.push(r2), yt.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(mt));
                  else
                    t3 = il;
                  null !== t3 ? (Lt = l2, u3 = Rt(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il);
                } else
                  qt = l2, l2 = il;
                return l2;
              }
              function nl() {
                var l2, u3, t3, r2;
                if (l2 = qt, n3.substr(qt, 2) === Ft ? (u3 = Ft, qt += 2) : (u3 = null, 0 === Wt && e2(Qt)), null !== u3) {
                  if (t3 = [], St.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(Ut)), null !== r2)
                    for (; null !== r2; )
                      t3.push(r2), St.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(Ut));
                  else
                    t3 = il;
                  null !== t3 ? (Lt = l2, u3 = Et(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il);
                } else
                  qt = l2, l2 = il;
                return l2;
              }
              function ll() {
                var l2, u3, t3, r2;
                if (l2 = qt, n3.substr(qt, 2) === Gt ? (u3 = Gt, qt += 2) : (u3 = null, 0 === Wt && e2(Bt)), null !== u3) {
                  if (t3 = [], St.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(Ut)), null !== r2)
                    for (; null !== r2; )
                      t3.push(r2), St.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(Ut));
                  else
                    t3 = il;
                  null !== t3 ? (Lt = l2, u3 = jt(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il);
                } else
                  qt = l2, l2 = il;
                return l2;
              }
              function ul() {
                var l2, u3;
                return l2 = qt, n3.substr(qt, 2) === Tt ? (u3 = Tt, qt += 2) : (u3 = null, 0 === Wt && e2(xt)), null !== u3 && (Lt = l2, u3 = $t()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
              }
              function tl() {
                var l2, u3, t3;
                return l2 = qt, 92 === n3.charCodeAt(qt) ? (u3 = At, qt++) : (u3 = null, 0 === Wt && e2(Ct)), null !== u3 ? (n3.length > qt ? (t3 = n3.charAt(qt), qt++) : (t3 = null, 0 === Wt && e2(vt)), null !== t3 ? (Lt = l2, u3 = bu(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
              }
              var rl, el = arguments.length > 1 ? arguments[1] : {}, ol = {
                regexp: c
              }, cl = c, il = null, al = "", fl = "|", sl = '"|"', hl = function(n4, l2) {
                return l2 ? new Alternate(n4, l2[1]) : n4;
              }, dl = function(n4, l2, u3) {
                return new Match([n4].concat(l2).concat([u3]));
              }, pl = "^", vl = '"^"', wl = function() {
                return new Token("start");
              }, Al = "$", Cl = '"$"', gl = function() {
                return new Token("end");
              }, bl = function(n4, l2) {
                return new Quantified(n4, l2);
              }, kl = "Quantifier", Tl = function(n4, l2) {
                return l2 && (n4.greedy = false), n4;
              }, xl = "{", yl = '"{"', ml = ",", Rl = '","', Fl = "}", Ql = '"}"', Sl = function(n4, l2) {
                return new Quantifier(n4, l2);
              }, Ul = ",}", El = '",}"', Gl = function(n4) {
                return new Quantifier(n4, 1 / 0);
              }, Bl = function(n4) {
                return new Quantifier(n4, n4);
              }, jl = "+", $l = '"+"', ql = function() {
                return new Quantifier(1, 1 / 0);
              }, Ll = "*", Ml = '"*"', Dl = function() {
                return new Quantifier(0, 1 / 0);
              }, Hl = "?", Ol = '"?"', Wl = function() {
                return new Quantifier(0, 1);
              }, zl = /^[0-9]/, Il = "[0-9]", Jl = function(n4) {
                return +n4.join("");
              }, Kl = "(", Nl = '"("', Pl = ")", Vl = '")"', Xl = function(n4) {
                return n4;
              }, Yl = function(n4) {
                return new CaptureGroup(n4);
              }, Zl = "?:", _l = '"?:"', nu = function(n4) {
                return new Group("non-capture-group", n4);
              }, lu = "?=", uu = '"?="', tu = function(n4) {
                return new Group("positive-lookahead", n4);
              }, ru = "?!", eu = '"?!"', ou = function(n4) {
                return new Group("negative-lookahead", n4);
              }, cu = "CharacterSet", iu = "[", au = '"["', fu = "]", su = '"]"', hu = function(n4, l2) {
                return new CharSet(!!n4, l2);
              }, du = "CharacterRange", pu = "-", vu = '"-"', wu = function(n4, l2) {
                return new CharacterRange(n4, l2);
              }, Au = "Character", Cu = /^[^\\\]]/, gu = "[^\\\\\\]]", bu = function(n4) {
                return new Literal(n4);
              }, ku = ".", Tu = '"."', xu = function() {
                return new Token("any-character");
              }, yu = "Literal", mu = /^[^|\\\/.[()?+*$\^]/, Ru = "[^|\\\\\\/.[()?+*$\\^]", Fu = "\\b", Qu = '"\\\\b"', Su = function() {
                return new Token("backspace");
              }, Uu = function() {
                return new Token("word-boundary");
              }, Eu = "\\B", Gu = '"\\\\B"', Bu = function() {
                return new Token("non-word-boundary");
              }, ju = "\\d", $u = '"\\\\d"', qu = function() {
                return new Token("digit");
              }, Lu = "\\D", Mu = '"\\\\D"', Du = function() {
                return new Token("non-digit");
              }, Hu = "\\f", Ou = '"\\\\f"', Wu = function() {
                return new Token("form-feed");
              }, zu = "\\n", Iu = '"\\\\n"', Ju = function() {
                return new Token("line-feed");
              }, Ku = "\\r", Nu = '"\\\\r"', Pu = function() {
                return new Token("carriage-return");
              }, Vu = "\\s", Xu = '"\\\\s"', Yu = function() {
                return new Token("white-space");
              }, Zu = "\\S", _u = '"\\\\S"', nt = function() {
                return new Token("non-white-space");
              }, lt = "\\t", ut = '"\\\\t"', tt = function() {
                return new Token("tab");
              }, rt = "\\v", et = '"\\\\v"', ot = function() {
                return new Token("vertical-tab");
              }, ct = "\\w", it = '"\\\\w"', at = function() {
                return new Token("word");
              }, ft = "\\W", st = '"\\\\W"', ht = function() {
                return new Token("non-word");
              }, dt = "\\c", pt = '"\\\\c"', vt = "any character", wt = function(n4) {
                return new ControlCharacter(n4);
              }, At = "\\", Ct = '"\\\\"', gt = /^[1-9]/, bt = "[1-9]", kt = function(n4) {
                return new BackReference(n4);
              }, Tt = "\\0", xt = '"\\\\0"', yt = /^[0-7]/, mt = "[0-7]", Rt = function(n4) {
                return new Octal(n4.join(""));
              }, Ft = "\\x", Qt = '"\\\\x"', St = /^[0-9a-fA-F]/, Ut = "[0-9a-fA-F]", Et = function(n4) {
                return new Hex2(n4.join(""));
              }, Gt = "\\u", Bt = '"\\\\u"', jt = function(n4) {
                return new Unicode(n4.join(""));
              }, $t = function() {
                return new Token("null-character");
              }, qt = 0, Lt = 0, Mt = 0, Dt = {
                line: 1,
                column: 1,
                seenCR: false
              }, Ht = 0, Ot = [], Wt = 0;
              if ("startRule" in el) {
                if (!(el.startRule in ol))
                  throw new Error(`Can't start parsing from rule "` + el.startRule + '".');
                cl = ol[el.startRule];
              }
              if (Token.offset = t2, Token.text = u2, rl = cl(), null !== rl && qt === n3.length)
                return rl;
              throw o2(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n3.length ? n3.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column);
            }
            return n2(l, Error), {
              SyntaxError: l,
              parse: u
            };
          }(), index2 = 1, cgs = {};
          module2.exports = parser;
        },
        /* 22 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Util2 = __webpack_require__2(3);
          var Random2 = __webpack_require__2(5);
          var Handler2 = {
            extend: Util2.extend
          };
          var LOWER = ascii(97, 122);
          var UPPER = ascii(65, 90);
          var NUMBER = ascii(48, 57);
          var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126);
          var PRINTABLE = ascii(32, 126);
          var SPACE = " \f\n\r	\v \u2028\u2029";
          var CHARACTER_CLASSES = {
            "\\w": LOWER + UPPER + NUMBER + "_",
            // ascii(95, 95)
            "\\W": OTHER.replace("_", ""),
            "\\s": SPACE,
            "\\S": function() {
              var result = PRINTABLE;
              for (var i2 = 0; i2 < SPACE.length; i2++) {
                result = result.replace(SPACE[i2], "");
              }
              return result;
            }(),
            "\\d": NUMBER,
            "\\D": LOWER + UPPER + OTHER
          };
          function ascii(from2, to2) {
            var result = "";
            for (var i2 = from2; i2 <= to2; i2++) {
              result += String.fromCharCode(i2);
            }
            return result;
          }
          Handler2.gen = function(node, result, cache) {
            cache = cache || {
              guid: 1
            };
            return Handler2[node.type] ? Handler2[node.type](node, result, cache) : Handler2.token(node, result, cache);
          };
          Handler2.extend({
            /* jshint unused:false */
            token: function(node, result, cache) {
              switch (node.type) {
                case "start":
                case "end":
                  return "";
                case "any-character":
                  return Random2.character();
                case "backspace":
                  return "";
                case "word-boundary":
                  return "";
                case "non-word-boundary":
                  break;
                case "digit":
                  return Random2.pick(
                    NUMBER.split("")
                  );
                case "non-digit":
                  return Random2.pick(
                    (LOWER + UPPER + OTHER).split("")
                  );
                case "form-feed":
                  break;
                case "line-feed":
                  return node.body || node.text;
                case "carriage-return":
                  break;
                case "white-space":
                  return Random2.pick(
                    SPACE.split("")
                  );
                case "non-white-space":
                  return Random2.pick(
                    (LOWER + UPPER + NUMBER).split("")
                  );
                case "tab":
                  break;
                case "vertical-tab":
                  break;
                case "word":
                  return Random2.pick(
                    (LOWER + UPPER + NUMBER).split("")
                  );
                case "non-word":
                  return Random2.pick(
                    OTHER.replace("_", "").split("")
                  );
              }
              return node.body || node.text;
            },
            /*
                {
                    type: 'alternate',
                    offset: 0,
                    text: '',
                    left: {
                        boyd: []
                    },
                    right: {
                        boyd: []
                    }
                }
            */
            alternate: function(node, result, cache) {
              return this.gen(
                Random2.boolean() ? node.left : node.right,
                result,
                cache
              );
            },
            /*
                {
                    type: 'match',
                    offset: 0,
                    text: '',
                    body: []
                }
            */
            match: function(node, result, cache) {
              result = "";
              for (var i2 = 0; i2 < node.body.length; i2++) {
                result += this.gen(node.body[i2], result, cache);
              }
              return result;
            },
            // ()
            "capture-group": function(node, result, cache) {
              result = this.gen(node.body, result, cache);
              cache[cache.guid++] = result;
              return result;
            },
            // (?:...)
            "non-capture-group": function(node, result, cache) {
              return this.gen(node.body, result, cache);
            },
            // (?=p)
            "positive-lookahead": function(node, result, cache) {
              return this.gen(node.body, result, cache);
            },
            // (?!p)
            "negative-lookahead": function(node, result, cache) {
              return "";
            },
            /*
                {
                    type: 'quantified',
                    offset: 3,
                    text: 'c*',
                    body: {
                        type: 'literal',
                        offset: 3,
                        text: 'c',
                        body: 'c',
                        escaped: false
                    },
                    quantifier: {
                        type: 'quantifier',
                        offset: 4,
                        text: '*',
                        min: 0,
                        max: Infinity,
                        greedy: true
                    }
                }
            */
            quantified: function(node, result, cache) {
              result = "";
              var count2 = this.quantifier(node.quantifier);
              for (var i2 = 0; i2 < count2; i2++) {
                result += this.gen(node.body, result, cache);
              }
              return result;
            },
            /*
                quantifier: {
                    type: 'quantifier',
                    offset: 4,
                    text: '*',
                    min: 0,
                    max: Infinity,
                    greedy: true
                }
            */
            quantifier: function(node, result, cache) {
              var min2 = Math.max(node.min, 0);
              var max2 = isFinite(node.max) ? node.max : min2 + Random2.integer(3, 7);
              return Random2.integer(min2, max2);
            },
            /*
                
            */
            charset: function(node, result, cache) {
              if (node.invert)
                return this["invert-charset"](node, result, cache);
              var literal = Random2.pick(node.body);
              return this.gen(literal, result, cache);
            },
            "invert-charset": function(node, result, cache) {
              var pool = PRINTABLE;
              for (var i2 = 0, item; i2 < node.body.length; i2++) {
                item = node.body[i2];
                switch (item.type) {
                  case "literal":
                    pool = pool.replace(item.body, "");
                    break;
                  case "range":
                    var min2 = this.gen(item.start, result, cache).charCodeAt();
                    var max2 = this.gen(item.end, result, cache).charCodeAt();
                    for (var ii = min2; ii <= max2; ii++) {
                      pool = pool.replace(String.fromCharCode(ii), "");
                    }
                  default:
                    var characters = CHARACTER_CLASSES[item.text];
                    if (characters) {
                      for (var iii = 0; iii <= characters.length; iii++) {
                        pool = pool.replace(characters[iii], "");
                      }
                    }
                }
              }
              return Random2.pick(pool.split(""));
            },
            range: function(node, result, cache) {
              var min2 = this.gen(node.start, result, cache).charCodeAt();
              var max2 = this.gen(node.end, result, cache).charCodeAt();
              return String.fromCharCode(
                Random2.integer(min2, max2)
              );
            },
            literal: function(node, result, cache) {
              return node.escaped ? node.body : node.text;
            },
            // Unicode \u
            unicode: function(node, result, cache) {
              return String.fromCharCode(
                parseInt(node.code, 16)
              );
            },
            // 十六进制 \xFF
            hex: function(node, result, cache) {
              return String.fromCharCode(
                parseInt(node.code, 16)
              );
            },
            // 八进制 \0
            octal: function(node, result, cache) {
              return String.fromCharCode(
                parseInt(node.code, 8)
              );
            },
            // 反向引用
            "back-reference": function(node, result, cache) {
              return cache[node.code] || "";
            },
            /*
                http://en.wikipedia.org/wiki/C0_and_C1_control_codes
            */
            CONTROL_CHARACTER_MAP: function() {
              var CONTROL_CHARACTER = "@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _".split(" ");
              var CONTROL_CHARACTER_UNICODE = "\0       \x07 \b 	 \n \v \f \r              \x1B    ".split(" ");
              var map2 = {};
              for (var i2 = 0; i2 < CONTROL_CHARACTER.length; i2++) {
                map2[CONTROL_CHARACTER[i2]] = CONTROL_CHARACTER_UNICODE[i2];
              }
              return map2;
            }(),
            "control-character": function(node, result, cache) {
              return this.CONTROL_CHARACTER_MAP[node.code];
            }
          });
          module2.exports = Handler2;
        },
        /* 23 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          module2.exports = __webpack_require__2(24);
        },
        /* 24 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Constant2 = __webpack_require__2(2);
          var Util2 = __webpack_require__2(3);
          var Parser2 = __webpack_require__2(4);
          function toJSONSchema(template, name, path) {
            path = path || [];
            var result = {
              name: typeof name === "string" ? name.replace(Constant2.RE_KEY, "$1") : name,
              template,
              type: Util2.type(template),
              // 可能不准确，例如 { 'name|1': [{}, {} ...] }
              rule: Parser2.parse(name)
            };
            result.path = path.slice(0);
            result.path.push(name === void 0 ? "ROOT" : result.name);
            switch (result.type) {
              case "array":
                result.items = [];
                Util2.each(template, function(value, index2) {
                  result.items.push(
                    toJSONSchema(value, index2, result.path)
                  );
                });
                break;
              case "object":
                result.properties = [];
                Util2.each(template, function(value, name2) {
                  result.properties.push(
                    toJSONSchema(value, name2, result.path)
                  );
                });
                break;
            }
            return result;
          }
          module2.exports = toJSONSchema;
        },
        /* 25 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          module2.exports = __webpack_require__2(26);
        },
        /* 26 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Constant2 = __webpack_require__2(2);
          var Util2 = __webpack_require__2(3);
          var toJSONSchema = __webpack_require__2(23);
          function valid(template, data) {
            var schema = toJSONSchema(template);
            var result = Diff.diff(schema, data);
            for (var i2 = 0; i2 < result.length; i2++) {
            }
            return result;
          }
          var Diff = {
            diff: function diff2(schema, data, name) {
              var result = [];
              if (this.name(schema, data, name, result) && this.type(schema, data, name, result)) {
                this.value(schema, data, name, result);
                this.properties(schema, data, name, result);
                this.items(schema, data, name, result);
              }
              return result;
            },
            /* jshint unused:false */
            name: function(schema, data, name, result) {
              var length = result.length;
              Assert.equal("name", schema.path, name + "", schema.name + "", result);
              return result.length === length;
            },
            type: function(schema, data, name, result) {
              var length = result.length;
              switch (schema.type) {
                case "string":
                  if (schema.template.match(Constant2.RE_PLACEHOLDER))
                    return true;
                  break;
                case "array":
                  if (schema.rule.parameters) {
                    if (schema.rule.min !== void 0 && schema.rule.max === void 0) {
                      if (schema.rule.count === 1)
                        return true;
                    }
                    if (schema.rule.parameters[2])
                      return true;
                  }
                  break;
                case "function":
                  return true;
              }
              Assert.equal("type", schema.path, Util2.type(data), schema.type, result);
              return result.length === length;
            },
            value: function(schema, data, name, result) {
              var length = result.length;
              var rule = schema.rule;
              var templateType = schema.type;
              if (templateType === "object" || templateType === "array" || templateType === "function")
                return true;
              if (!rule.parameters) {
                switch (templateType) {
                  case "regexp":
                    Assert.match("value", schema.path, data, schema.template, result);
                    return result.length === length;
                  case "string":
                    if (schema.template.match(Constant2.RE_PLACEHOLDER))
                      return result.length === length;
                    break;
                }
                Assert.equal("value", schema.path, data, schema.template, result);
                return result.length === length;
              }
              var actualRepeatCount;
              switch (templateType) {
                case "number":
                  var parts2 = (data + "").split(".");
                  parts2[0] = +parts2[0];
                  if (rule.min !== void 0 && rule.max !== void 0) {
                    Assert.greaterThanOrEqualTo("value", schema.path, parts2[0], Math.min(rule.min, rule.max), result);
                    Assert.lessThanOrEqualTo("value", schema.path, parts2[0], Math.max(rule.min, rule.max), result);
                  }
                  if (rule.min !== void 0 && rule.max === void 0) {
                    Assert.equal("value", schema.path, parts2[0], rule.min, result, "[value] " + name);
                  }
                  if (rule.decimal) {
                    if (rule.dmin !== void 0 && rule.dmax !== void 0) {
                      Assert.greaterThanOrEqualTo("value", schema.path, parts2[1].length, rule.dmin, result);
                      Assert.lessThanOrEqualTo("value", schema.path, parts2[1].length, rule.dmax, result);
                    }
                    if (rule.dmin !== void 0 && rule.dmax === void 0) {
                      Assert.equal("value", schema.path, parts2[1].length, rule.dmin, result);
                    }
                  }
                  break;
                case "boolean":
                  break;
                case "string":
                  actualRepeatCount = data.match(new RegExp(schema.template, "g"));
                  actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
                  if (rule.min !== void 0 && rule.max !== void 0) {
                    Assert.greaterThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.min, result);
                    Assert.lessThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.max, result);
                  }
                  if (rule.min !== void 0 && rule.max === void 0) {
                    Assert.equal("repeat count", schema.path, actualRepeatCount, rule.min, result);
                  }
                  break;
                case "regexp":
                  actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ""), "g"));
                  actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
                  if (rule.min !== void 0 && rule.max !== void 0) {
                    Assert.greaterThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.min, result);
                    Assert.lessThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.max, result);
                  }
                  if (rule.min !== void 0 && rule.max === void 0) {
                    Assert.equal("repeat count", schema.path, actualRepeatCount, rule.min, result);
                  }
                  break;
              }
              return result.length === length;
            },
            properties: function(schema, data, name, result) {
              var length = result.length;
              var rule = schema.rule;
              var keys2 = Util2.keys(data);
              if (!schema.properties)
                return;
              if (!schema.rule.parameters) {
                Assert.equal("properties length", schema.path, keys2.length, schema.properties.length, result);
              } else {
                if (rule.min !== void 0 && rule.max !== void 0) {
                  Assert.greaterThanOrEqualTo("properties length", schema.path, keys2.length, Math.min(rule.min, rule.max), result);
                  Assert.lessThanOrEqualTo("properties length", schema.path, keys2.length, Math.max(rule.min, rule.max), result);
                }
                if (rule.min !== void 0 && rule.max === void 0) {
                  if (rule.count !== 1)
                    Assert.equal("properties length", schema.path, keys2.length, rule.min, result);
                }
              }
              if (result.length !== length)
                return false;
              for (var i2 = 0; i2 < keys2.length; i2++) {
                result.push.apply(
                  result,
                  this.diff(
                    function() {
                      var property;
                      Util2.each(schema.properties, function(item) {
                        if (item.name === keys2[i2])
                          property = item;
                      });
                      return property || schema.properties[i2];
                    }(),
                    data[keys2[i2]],
                    keys2[i2]
                  )
                );
              }
              return result.length === length;
            },
            items: function(schema, data, name, result) {
              var length = result.length;
              if (!schema.items)
                return;
              var rule = schema.rule;
              if (!schema.rule.parameters) {
                Assert.equal("items length", schema.path, data.length, schema.items.length, result);
              } else {
                if (rule.min !== void 0 && rule.max !== void 0) {
                  Assert.greaterThanOrEqualTo(
                    "items",
                    schema.path,
                    data.length,
                    Math.min(rule.min, rule.max) * schema.items.length,
                    result,
                    "[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements"
                  );
                  Assert.lessThanOrEqualTo(
                    "items",
                    schema.path,
                    data.length,
                    Math.max(rule.min, rule.max) * schema.items.length,
                    result,
                    "[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements"
                  );
                }
                if (rule.min !== void 0 && rule.max === void 0) {
                  if (rule.count === 1)
                    return result.length === length;
                  else
                    Assert.equal("items length", schema.path, data.length, rule.min * schema.items.length, result);
                }
                if (rule.parameters[2])
                  return result.length === length;
              }
              if (result.length !== length)
                return false;
              for (var i2 = 0; i2 < data.length; i2++) {
                result.push.apply(
                  result,
                  this.diff(
                    schema.items[i2 % schema.items.length],
                    data[i2],
                    i2 % schema.items.length
                  )
                );
              }
              return result.length === length;
            }
          };
          var Assert = {
            message: function(item) {
              return (item.message || "[{utype}] Expect {path}'{ltype} {action} {expected}, but is {actual}").replace("{utype}", item.type.toUpperCase()).replace("{ltype}", item.type.toLowerCase()).replace("{path}", Util2.isArray(item.path) && item.path.join(".") || item.path).replace("{action}", item.action).replace("{expected}", item.expected).replace("{actual}", item.actual);
            },
            equal: function(type, path, actual, expected, result, message) {
              if (actual === expected)
                return true;
              switch (type) {
                case "type":
                  if (expected === "regexp" && actual === "string")
                    return true;
                  break;
              }
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is equal to",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            // actual matches expected
            match: function(type, path, actual, expected, result, message) {
              if (expected.test(actual))
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "matches",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            notEqual: function(type, path, actual, expected, result, message) {
              if (actual !== expected)
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is not equal to",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            greaterThan: function(type, path, actual, expected, result, message) {
              if (actual > expected)
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is greater than",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            lessThan: function(type, path, actual, expected, result, message) {
              if (actual < expected)
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is less to",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            greaterThanOrEqualTo: function(type, path, actual, expected, result, message) {
              if (actual >= expected)
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is greater than or equal to",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            },
            lessThanOrEqualTo: function(type, path, actual, expected, result, message) {
              if (actual <= expected)
                return true;
              var item = {
                path,
                type,
                actual,
                expected,
                action: "is less than or equal to",
                message
              };
              item.message = Assert.message(item);
              result.push(item);
              return false;
            }
          };
          valid.Diff = Diff;
          valid.Assert = Assert;
          module2.exports = valid;
        },
        /* 27 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          module2.exports = __webpack_require__2(28);
        },
        /* 28 */
        /***/
        function(module2, exports2, __webpack_require__2) {
          var Util2 = __webpack_require__2(3);
          window._XMLHttpRequest = window.XMLHttpRequest;
          window._ActiveXObject = window.ActiveXObject;
          try {
            new window.Event("custom");
          } catch (exception) {
            window.Event = function(type, bubbles2, cancelable, detail) {
              var event = document.createEvent("CustomEvent");
              event.initCustomEvent(type, bubbles2, cancelable, detail);
              return event;
            };
          }
          var XHR_STATES = {
            // The object has been constructed.
            UNSENT: 0,
            // The open() method has been successfully invoked.
            OPENED: 1,
            // All redirects (if any) have been followed and all HTTP headers of the response have been received.
            HEADERS_RECEIVED: 2,
            // The response's body is being received.
            LOADING: 3,
            // The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects).
            DONE: 4
          };
          var XHR_EVENTS = "readystatechange loadstart progress abort error load timeout loadend".split(" ");
          var XHR_REQUEST_PROPERTIES = "timeout withCredentials".split(" ");
          var XHR_RESPONSE_PROPERTIES = "readyState responseURL status statusText responseType response responseText responseXML".split(" ");
          var HTTP_STATUS_CODES = {
            100: "Continue",
            101: "Switching Protocols",
            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-Authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            300: "Multiple Choice",
            301: "Moved Permanently",
            302: "Found",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            307: "Temporary Redirect",
            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Timeout",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Request Entity Too Large",
            414: "Request-URI Too Long",
            415: "Unsupported Media Type",
            416: "Requested Range Not Satisfiable",
            417: "Expectation Failed",
            422: "Unprocessable Entity",
            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Timeout",
            505: "HTTP Version Not Supported"
          };
          function MockXMLHttpRequest() {
            this.custom = {
              events: {},
              requestHeaders: {},
              responseHeaders: {}
            };
          }
          MockXMLHttpRequest._settings = {
            timeout: "10-100"
            /*
                timeout: 50,
                timeout: '10-100',
             */
          };
          MockXMLHttpRequest.setup = function(settings) {
            Util2.extend(MockXMLHttpRequest._settings, settings);
            return MockXMLHttpRequest._settings;
          };
          Util2.extend(MockXMLHttpRequest, XHR_STATES);
          Util2.extend(MockXMLHttpRequest.prototype, XHR_STATES);
          MockXMLHttpRequest.prototype.mock = true;
          MockXMLHttpRequest.prototype.match = false;
          Util2.extend(MockXMLHttpRequest.prototype, {
            // https://xhr.spec.whatwg.org/#the-open()-method
            // Sets the request method, request URL, and synchronous flag.
            open: function(method, url, async, username, password) {
              var that = this;
              Util2.extend(this.custom, {
                method,
                url,
                async: typeof async === "boolean" ? async : true,
                username,
                password,
                options: {
                  url,
                  type: method
                }
              });
              this.custom.timeout = function(timeout) {
                if (typeof timeout === "number")
                  return timeout;
                if (typeof timeout === "string" && !~timeout.indexOf("-"))
                  return parseInt(timeout, 10);
                if (typeof timeout === "string" && ~timeout.indexOf("-")) {
                  var tmp = timeout.split("-");
                  var min2 = parseInt(tmp[0], 10);
                  var max2 = parseInt(tmp[1], 10);
                  return Math.round(Math.random() * (max2 - min2)) + min2;
                }
              }(MockXMLHttpRequest._settings.timeout);
              var item = find(this.custom.options);
              function handle2(event) {
                for (var i3 = 0; i3 < XHR_RESPONSE_PROPERTIES.length; i3++) {
                  try {
                    that[XHR_RESPONSE_PROPERTIES[i3]] = xhr[XHR_RESPONSE_PROPERTIES[i3]];
                  } catch (e2) {
                  }
                }
                that.dispatchEvent(new Event(
                  event.type
                  /*, false, false, that*/
                ));
              }
              if (!item) {
                var xhr = createNativeXMLHttpRequest();
                this.custom.xhr = xhr;
                for (var i2 = 0; i2 < XHR_EVENTS.length; i2++) {
                  xhr.addEventListener(XHR_EVENTS[i2], handle2);
                }
                if (username)
                  xhr.open(method, url, async, username, password);
                else
                  xhr.open(method, url, async);
                for (var j = 0; j < XHR_REQUEST_PROPERTIES.length; j++) {
                  try {
                    xhr[XHR_REQUEST_PROPERTIES[j]] = that[XHR_REQUEST_PROPERTIES[j]];
                  } catch (e2) {
                  }
                }
                return;
              }
              this.match = true;
              this.custom.template = item;
              this.readyState = MockXMLHttpRequest.OPENED;
              this.dispatchEvent(new Event(
                "readystatechange"
                /*, false, false, this*/
              ));
            },
            // https://xhr.spec.whatwg.org/#the-setrequestheader()-method
            // Combines a header in author request headers.
            setRequestHeader: function(name, value) {
              if (!this.match) {
                this.custom.xhr.setRequestHeader(name, value);
                return;
              }
              var requestHeaders = this.custom.requestHeaders;
              if (requestHeaders[name])
                requestHeaders[name] += "," + value;
              else
                requestHeaders[name] = value;
            },
            timeout: 0,
            withCredentials: false,
            upload: {},
            // https://xhr.spec.whatwg.org/#the-send()-method
            // Initiates the request.
            send: function send(data) {
              var that = this;
              this.custom.options.body = data;
              if (!this.match) {
                this.custom.xhr.send(data);
                return;
              }
              this.setRequestHeader("X-Requested-With", "MockXMLHttpRequest");
              this.dispatchEvent(new Event(
                "loadstart"
                /*, false, false, this*/
              ));
              if (this.custom.async)
                setTimeout(done, this.custom.timeout);
              else
                done();
              function done() {
                that.readyState = MockXMLHttpRequest.HEADERS_RECEIVED;
                that.dispatchEvent(new Event(
                  "readystatechange"
                  /*, false, false, that*/
                ));
                that.readyState = MockXMLHttpRequest.LOADING;
                that.dispatchEvent(new Event(
                  "readystatechange"
                  /*, false, false, that*/
                ));
                that.status = 200;
                that.statusText = HTTP_STATUS_CODES[200];
                that.response = that.responseText = JSON.stringify(
                  convert(that.custom.template, that.custom.options),
                  null,
                  4
                );
                that.readyState = MockXMLHttpRequest.DONE;
                that.dispatchEvent(new Event(
                  "readystatechange"
                  /*, false, false, that*/
                ));
                that.dispatchEvent(new Event(
                  "load"
                  /*, false, false, that*/
                ));
                that.dispatchEvent(new Event(
                  "loadend"
                  /*, false, false, that*/
                ));
              }
            },
            // https://xhr.spec.whatwg.org/#the-abort()-method
            // Cancels any network activity.
            abort: function abort() {
              if (!this.match) {
                this.custom.xhr.abort();
                return;
              }
              this.readyState = MockXMLHttpRequest.UNSENT;
              this.dispatchEvent(new Event("abort", false, false, this));
              this.dispatchEvent(new Event("error", false, false, this));
            }
          });
          Util2.extend(MockXMLHttpRequest.prototype, {
            responseURL: "",
            status: MockXMLHttpRequest.UNSENT,
            statusText: "",
            // https://xhr.spec.whatwg.org/#the-getresponseheader()-method
            getResponseHeader: function(name) {
              if (!this.match) {
                return this.custom.xhr.getResponseHeader(name);
              }
              return this.custom.responseHeaders[name.toLowerCase()];
            },
            // https://xhr.spec.whatwg.org/#the-getallresponseheaders()-method
            // http://www.utf8-chartable.de/
            getAllResponseHeaders: function() {
              if (!this.match) {
                return this.custom.xhr.getAllResponseHeaders();
              }
              var responseHeaders = this.custom.responseHeaders;
              var headers = "";
              for (var h in responseHeaders) {
                if (!responseHeaders.hasOwnProperty(h))
                  continue;
                headers += h + ": " + responseHeaders[h] + "\r\n";
              }
              return headers;
            },
            overrideMimeType: function() {
            },
            responseType: "",
            // '', 'text', 'arraybuffer', 'blob', 'document', 'json'
            response: null,
            responseText: "",
            responseXML: null
          });
          Util2.extend(MockXMLHttpRequest.prototype, {
            addEventListener: function addEventListener(type, handle2) {
              var events = this.custom.events;
              if (!events[type])
                events[type] = [];
              events[type].push(handle2);
            },
            removeEventListener: function removeEventListener(type, handle2) {
              var handles = this.custom.events[type] || [];
              for (var i2 = 0; i2 < handles.length; i2++) {
                if (handles[i2] === handle2) {
                  handles.splice(i2--, 1);
                }
              }
            },
            dispatchEvent: function dispatchEvent(event) {
              var handles = this.custom.events[event.type] || [];
              for (var i2 = 0; i2 < handles.length; i2++) {
                handles[i2].call(this, event);
              }
              var ontype = "on" + event.type;
              if (this[ontype])
                this[ontype](event);
            }
          });
          function createNativeXMLHttpRequest() {
            var isLocal2 = function() {
              var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
              var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
              var ajaxLocation = location.href;
              var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
              return rlocalProtocol.test(ajaxLocParts[1]);
            }();
            return window.ActiveXObject ? !isLocal2 && createStandardXHR() || createActiveXHR() : createStandardXHR();
            function createStandardXHR() {
              try {
                return new window._XMLHttpRequest();
              } catch (e2) {
              }
            }
            function createActiveXHR() {
              try {
                return new window._ActiveXObject("Microsoft.XMLHTTP");
              } catch (e2) {
              }
            }
          }
          function find(options2) {
            for (var sUrlType in MockXMLHttpRequest.Mock._mocked) {
              var item = MockXMLHttpRequest.Mock._mocked[sUrlType];
              if ((!item.rurl || match(item.rurl, options2.url)) && (!item.rtype || match(item.rtype, options2.type.toLowerCase()))) {
                return item;
              }
            }
            function match(expected, actual) {
              if (Util2.type(expected) === "string") {
                return expected === actual;
              }
              if (Util2.type(expected) === "regexp") {
                return expected.test(actual);
              }
            }
          }
          function convert(item, options2) {
            return Util2.isFunction(item.template) ? item.template(options2) : MockXMLHttpRequest.Mock.mock(item.template);
          }
          module2.exports = MockXMLHttpRequest;
        }
        /******/
      ])
    );
  });
})(mock);
const Mockjs = mockExports;
//! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var hookCallback;
function hooks() {
  return hookCallback.apply(null, arguments);
}
function setHookCallback(callback) {
  hookCallback = callback;
}
function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
}
function isObject$1(input) {
  return input != null && Object.prototype.toString.call(input) === "[object Object]";
}
function hasOwnProp(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
function isObjectEmpty(obj2) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj2).length === 0;
  } else {
    var k;
    for (k in obj2) {
      if (hasOwnProp(obj2, k)) {
        return false;
      }
    }
    return true;
  }
}
function isUndefined(input) {
  return input === void 0;
}
function isNumber(input) {
  return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
}
function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
function map(arr, fn) {
  var res = [], i2, arrLen = arr.length;
  for (i2 = 0; i2 < arrLen; ++i2) {
    res.push(fn(arr[i2], i2));
  }
  return res;
}
function extend(a, b) {
  for (var i2 in b) {
    if (hasOwnProp(b, i2)) {
      a[i2] = b[i2];
    }
  }
  if (hasOwnProp(b, "toString")) {
    a.toString = b.toString;
  }
  if (hasOwnProp(b, "valueOf")) {
    a.valueOf = b.valueOf;
  }
  return a;
}
function createUTC(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, true).utc();
}
function defaultParsingFlags() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function getParsingFlags(m) {
  if (m._pf == null) {
    m._pf = defaultParsingFlags();
  }
  return m._pf;
}
var some;
if (Array.prototype.some) {
  some = Array.prototype.some;
} else {
  some = function(fun) {
    var t2 = Object(this), len = t2.length >>> 0, i2;
    for (i2 = 0; i2 < len; i2++) {
      if (i2 in t2 && fun.call(this, t2[i2], i2, t2)) {
        return true;
      }
    }
    return false;
  };
}
function isValid(m) {
  if (m._isValid == null) {
    var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i2) {
      return i2 != null;
    }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
    if (m._strict) {
      isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
    }
    if (Object.isFrozen == null || !Object.isFrozen(m)) {
      m._isValid = isNowValid;
    } else {
      return isNowValid;
    }
  }
  return m._isValid;
}
function createInvalid(flags) {
  var m = createUTC(NaN);
  if (flags != null) {
    extend(getParsingFlags(m), flags);
  } else {
    getParsingFlags(m).userInvalidated = true;
  }
  return m;
}
var momentProperties = hooks.momentProperties = [], updateInProgress = false;
function copyConfig(to2, from2) {
  var i2, prop, val, momentPropertiesLen = momentProperties.length;
  if (!isUndefined(from2._isAMomentObject)) {
    to2._isAMomentObject = from2._isAMomentObject;
  }
  if (!isUndefined(from2._i)) {
    to2._i = from2._i;
  }
  if (!isUndefined(from2._f)) {
    to2._f = from2._f;
  }
  if (!isUndefined(from2._l)) {
    to2._l = from2._l;
  }
  if (!isUndefined(from2._strict)) {
    to2._strict = from2._strict;
  }
  if (!isUndefined(from2._tzm)) {
    to2._tzm = from2._tzm;
  }
  if (!isUndefined(from2._isUTC)) {
    to2._isUTC = from2._isUTC;
  }
  if (!isUndefined(from2._offset)) {
    to2._offset = from2._offset;
  }
  if (!isUndefined(from2._pf)) {
    to2._pf = getParsingFlags(from2);
  }
  if (!isUndefined(from2._locale)) {
    to2._locale = from2._locale;
  }
  if (momentPropertiesLen > 0) {
    for (i2 = 0; i2 < momentPropertiesLen; i2++) {
      prop = momentProperties[i2];
      val = from2[prop];
      if (!isUndefined(val)) {
        to2[prop] = val;
      }
    }
  }
  return to2;
}
function Moment(config) {
  copyConfig(this, config);
  this._d = new Date(config._d != null ? config._d.getTime() : NaN);
  if (!this.isValid()) {
    this._d = /* @__PURE__ */ new Date(NaN);
  }
  if (updateInProgress === false) {
    updateInProgress = true;
    hooks.updateOffset(this);
    updateInProgress = false;
  }
}
function isMoment(obj2) {
  return obj2 instanceof Moment || obj2 != null && obj2._isAMomentObject != null;
}
function warn(msg) {
  if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
    console.warn("Deprecation warning: " + msg);
  }
}
function deprecate(msg, fn) {
  var firstTime = true;
  return extend(function() {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(null, msg);
    }
    if (firstTime) {
      var args = [], arg, i2, key2, argLen = arguments.length;
      for (i2 = 0; i2 < argLen; i2++) {
        arg = "";
        if (typeof arguments[i2] === "object") {
          arg += "\n[" + i2 + "] ";
          for (key2 in arguments[0]) {
            if (hasOwnProp(arguments[0], key2)) {
              arg += key2 + ": " + arguments[0][key2] + ", ";
            }
          }
          arg = arg.slice(0, -2);
        } else {
          arg = arguments[i2];
        }
        args.push(arg);
      }
      warn(
        msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
      );
      firstTime = false;
    }
    return fn.apply(this, arguments);
  }, fn);
}
var deprecations = {};
function deprecateSimple(name, msg) {
  if (hooks.deprecationHandler != null) {
    hooks.deprecationHandler(name, msg);
  }
  if (!deprecations[name]) {
    warn(msg);
    deprecations[name] = true;
  }
}
hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;
function isFunction(input) {
  return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
}
function set(config) {
  var prop, i2;
  for (i2 in config) {
    if (hasOwnProp(config, i2)) {
      prop = config[i2];
      if (isFunction(prop)) {
        this[i2] = prop;
      } else {
        this["_" + i2] = prop;
      }
    }
  }
  this._config = config;
  this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function mergeConfigs(parentConfig, childConfig) {
  var res = extend({}, parentConfig), prop;
  for (prop in childConfig) {
    if (hasOwnProp(childConfig, prop)) {
      if (isObject$1(parentConfig[prop]) && isObject$1(childConfig[prop])) {
        res[prop] = {};
        extend(res[prop], parentConfig[prop]);
        extend(res[prop], childConfig[prop]);
      } else if (childConfig[prop] != null) {
        res[prop] = childConfig[prop];
      } else {
        delete res[prop];
      }
    }
  }
  for (prop in parentConfig) {
    if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject$1(parentConfig[prop])) {
      res[prop] = extend({}, res[prop]);
    }
  }
  return res;
}
function Locale(config) {
  if (config != null) {
    this.set(config);
  }
}
var keys;
if (Object.keys) {
  keys = Object.keys;
} else {
  keys = function(obj2) {
    var i2, res = [];
    for (i2 in obj2) {
      if (hasOwnProp(obj2, i2)) {
        res.push(i2);
      }
    }
    return res;
  };
}
var defaultCalendar = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function calendar(key2, mom, now2) {
  var output = this._calendar[key2] || this._calendar["sameElse"];
  return isFunction(output) ? output.call(mom, now2) : output;
}
function zeroFill(number, targetLength, forceSign) {
  var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
  return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(token2, padded, ordinal2, callback) {
  var func = callback;
  if (typeof callback === "string") {
    func = function() {
      return this[callback]();
    };
  }
  if (token2) {
    formatTokenFunctions[token2] = func;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function() {
      return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
    };
  }
  if (ordinal2) {
    formatTokenFunctions[ordinal2] = function() {
      return this.localeData().ordinal(
        func.apply(this, arguments),
        token2
      );
    };
  }
}
function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function makeFormatFunction(format2) {
  var array = format2.match(formattingTokens), i2, length;
  for (i2 = 0, length = array.length; i2 < length; i2++) {
    if (formatTokenFunctions[array[i2]]) {
      array[i2] = formatTokenFunctions[array[i2]];
    } else {
      array[i2] = removeFormattingTokens(array[i2]);
    }
  }
  return function(mom) {
    var output = "", i3;
    for (i3 = 0; i3 < length; i3++) {
      output += isFunction(array[i3]) ? array[i3].call(mom, format2) : array[i3];
    }
    return output;
  };
}
function formatMoment(m, format2) {
  if (!m.isValid()) {
    return m.localeData().invalidDate();
  }
  format2 = expandFormat(format2, m.localeData());
  formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
  return formatFunctions[format2](m);
}
function expandFormat(format2, locale2) {
  var i2 = 5;
  function replaceLongDateFormatTokens(input) {
    return locale2.longDateFormat(input) || input;
  }
  localFormattingTokens.lastIndex = 0;
  while (i2 >= 0 && localFormattingTokens.test(format2)) {
    format2 = format2.replace(
      localFormattingTokens,
      replaceLongDateFormatTokens
    );
    localFormattingTokens.lastIndex = 0;
    i2 -= 1;
  }
  return format2;
}
var defaultLongDateFormat = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function longDateFormat(key2) {
  var format2 = this._longDateFormat[key2], formatUpper = this._longDateFormat[key2.toUpperCase()];
  if (format2 || !formatUpper) {
    return format2;
  }
  this._longDateFormat[key2] = formatUpper.match(formattingTokens).map(function(tok) {
    if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
      return tok.slice(1);
    }
    return tok;
  }).join("");
  return this._longDateFormat[key2];
}
var defaultInvalidDate = "Invalid date";
function invalidDate() {
  return this._invalidDate;
}
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(number) {
  return this._ordinal.replace("%d", number);
}
var defaultRelativeTime = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function relativeTime(number, withoutSuffix, string, isFuture) {
  var output = this._relativeTime[string];
  return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
}
function pastFuture(diff2, output) {
  var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
  return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
}
var aliases = {};
function addUnitAlias(unit, shorthand) {
  var lowerCase = unit.toLowerCase();
  aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
}
function normalizeUnits(units) {
  return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
}
function normalizeObjectUnits(inputObject) {
  var normalizedInput = {}, normalizedProp, prop;
  for (prop in inputObject) {
    if (hasOwnProp(inputObject, prop)) {
      normalizedProp = normalizeUnits(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }
  return normalizedInput;
}
var priorities = {};
function addUnitPriority(unit, priority) {
  priorities[unit] = priority;
}
function getPrioritizedUnits(unitsObj) {
  var units = [], u;
  for (u in unitsObj) {
    if (hasOwnProp(unitsObj, u)) {
      units.push({ unit: u, priority: priorities[u] });
    }
  }
  units.sort(function(a, b) {
    return a.priority - b.priority;
  });
  return units;
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function absFloor(number) {
  if (number < 0) {
    return Math.ceil(number) || 0;
  } else {
    return Math.floor(number);
  }
}
function toInt(argumentForCoercion) {
  var coercedNumber = +argumentForCoercion, value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }
  return value;
}
function makeGetSet(unit, keepTime) {
  return function(value) {
    if (value != null) {
      set$1(this, unit, value);
      hooks.updateOffset(this, keepTime);
      return this;
    } else {
      return get(this, unit);
    }
  };
}
function get(mom, unit) {
  return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
}
function set$1(mom, unit, value) {
  if (mom.isValid() && !isNaN(value)) {
    if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
      value = toInt(value);
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
        value,
        mom.month(),
        daysInMonth(value, mom.month())
      );
    } else {
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
    }
  }
}
function stringGet(units) {
  units = normalizeUnits(units);
  if (isFunction(this[units])) {
    return this[units]();
  }
  return this;
}
function stringSet(units, value) {
  if (typeof units === "object") {
    units = normalizeObjectUnits(units);
    var prioritized = getPrioritizedUnits(units), i2, prioritizedLen = prioritized.length;
    for (i2 = 0; i2 < prioritizedLen; i2++) {
      this[prioritized[i2].unit](units[prioritized[i2].unit]);
    }
  } else {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units](value);
    }
  }
  return this;
}
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
regexes = {};
function addRegexToken(token2, regex, strictRegex) {
  regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
    return isStrict && strictRegex ? strictRegex : regex;
  };
}
function getParseRegexForToken(token2, config) {
  if (!hasOwnProp(regexes, token2)) {
    return new RegExp(unescapeFormat(token2));
  }
  return regexes[token2](config._strict, config._locale);
}
function unescapeFormat(s2) {
  return regexEscape(
    s2.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
      }
    )
  );
}
function regexEscape(s2) {
  return s2.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var tokens = {};
function addParseToken(token2, callback) {
  var i2, func = callback, tokenLen;
  if (typeof token2 === "string") {
    token2 = [token2];
  }
  if (isNumber(callback)) {
    func = function(input, array) {
      array[callback] = toInt(input);
    };
  }
  tokenLen = token2.length;
  for (i2 = 0; i2 < tokenLen; i2++) {
    tokens[token2[i2]] = func;
  }
}
function addWeekParseToken(token2, callback) {
  addParseToken(token2, function(input, array, config, token3) {
    config._w = config._w || {};
    callback(input, config._w, config, token3);
  });
}
function addTimeToArrayFromToken(token2, input, config) {
  if (input != null && hasOwnProp(tokens, token2)) {
    tokens[token2](input, config._a, config, token2);
  }
}
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
function mod(n2, x) {
  return (n2 % x + x) % x;
}
var indexOf;
if (Array.prototype.indexOf) {
  indexOf = Array.prototype.indexOf;
} else {
  indexOf = function(o2) {
    var i2;
    for (i2 = 0; i2 < this.length; ++i2) {
      if (this[i2] === o2) {
        return i2;
      }
    }
    return -1;
  };
}
function daysInMonth(year, month) {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  var modMonth = mod(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
}
addFormatToken("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
addFormatToken("MMM", 0, 0, function(format2) {
  return this.localeData().monthsShort(this, format2);
});
addFormatToken("MMMM", 0, 0, function(format2) {
  return this.localeData().months(this, format2);
});
addUnitAlias("month", "M");
addUnitPriority("month", 8);
addRegexToken("M", match1to2);
addRegexToken("MM", match1to2, match2);
addRegexToken("MMM", function(isStrict, locale2) {
  return locale2.monthsShortRegex(isStrict);
});
addRegexToken("MMMM", function(isStrict, locale2) {
  return locale2.monthsRegex(isStrict);
});
addParseToken(["M", "MM"], function(input, array) {
  array[MONTH] = toInt(input) - 1;
});
addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
  var month = config._locale.monthsParse(input, token2, config._strict);
  if (month != null) {
    array[MONTH] = month;
  } else {
    getParsingFlags(config).invalidMonth = input;
  }
});
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
function localeMonths(m, format2) {
  if (!m) {
    return isArray(this._months) ? this._months : this._months["standalone"];
  }
  return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
}
function localeMonthsShort(m, format2) {
  if (!m) {
    return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
  }
  return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
}
function handleStrictParse(monthName, format2, strict) {
  var i2, ii, mom, llc = monthName.toLocaleLowerCase();
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (i2 = 0; i2 < 12; ++i2) {
      mom = createUTC([2e3, i2]);
      this._shortMonthsParse[i2] = this.monthsShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._longMonthsParse[i2] = this.months(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeMonthsParse(monthName, format2, strict) {
  var i2, mom, regex;
  if (this._monthsParseExact) {
    return handleStrictParse.call(this, monthName, format2, strict);
  }
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }
  for (i2 = 0; i2 < 12; i2++) {
    mom = createUTC([2e3, i2]);
    if (strict && !this._longMonthsParse[i2]) {
      this._longMonthsParse[i2] = new RegExp(
        "^" + this.months(mom, "").replace(".", "") + "$",
        "i"
      );
      this._shortMonthsParse[i2] = new RegExp(
        "^" + this.monthsShort(mom, "").replace(".", "") + "$",
        "i"
      );
    }
    if (!strict && !this._monthsParse[i2]) {
      regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
      this._monthsParse[i2] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "MMMM" && this._longMonthsParse[i2].test(monthName)) {
      return i2;
    } else if (strict && format2 === "MMM" && this._shortMonthsParse[i2].test(monthName)) {
      return i2;
    } else if (!strict && this._monthsParse[i2].test(monthName)) {
      return i2;
    }
  }
}
function setMonth(mom, value) {
  var dayOfMonth;
  if (!mom.isValid()) {
    return mom;
  }
  if (typeof value === "string") {
    if (/^\d+$/.test(value)) {
      value = toInt(value);
    } else {
      value = mom.localeData().monthsParse(value);
      if (!isNumber(value)) {
        return mom;
      }
    }
  }
  dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
  mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
  return mom;
}
function getSetMonth(value) {
  if (value != null) {
    setMonth(this, value);
    hooks.updateOffset(this, true);
    return this;
  } else {
    return get(this, "Month");
  }
}
function getDaysInMonth() {
  return daysInMonth(this.year(), this.month());
}
function monthsShortRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    } else {
      return this._monthsShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsShortRegex")) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }
    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }
}
function monthsRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    } else {
      return this._monthsRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsRegex")) {
      this._monthsRegex = defaultMonthsRegex;
    }
    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  }
}
function computeMonthsParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var shortPieces = [], longPieces = [], mixedPieces = [], i2, mom;
  for (i2 = 0; i2 < 12; i2++) {
    mom = createUTC([2e3, i2]);
    shortPieces.push(this.monthsShort(mom, ""));
    longPieces.push(this.months(mom, ""));
    mixedPieces.push(this.months(mom, ""));
    mixedPieces.push(this.monthsShort(mom, ""));
  }
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  for (i2 = 0; i2 < 12; i2++) {
    shortPieces[i2] = regexEscape(shortPieces[i2]);
    longPieces[i2] = regexEscape(longPieces[i2]);
  }
  for (i2 = 0; i2 < 24; i2++) {
    mixedPieces[i2] = regexEscape(mixedPieces[i2]);
  }
  this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._monthsShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
}
addFormatToken("Y", 0, 0, function() {
  var y = this.year();
  return y <= 9999 ? zeroFill(y, 4) : "+" + y;
});
addFormatToken(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
addFormatToken(0, ["YYYY", 4], 0, "year");
addFormatToken(0, ["YYYYY", 5], 0, "year");
addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
addUnitAlias("year", "y");
addUnitPriority("year", 1);
addRegexToken("Y", matchSigned);
addRegexToken("YY", match1to2, match2);
addRegexToken("YYYY", match1to4, match4);
addRegexToken("YYYYY", match1to6, match6);
addRegexToken("YYYYYY", match1to6, match6);
addParseToken(["YYYYY", "YYYYYY"], YEAR);
addParseToken("YYYY", function(input, array) {
  array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken("YY", function(input, array) {
  array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken("Y", function(input, array) {
  array[YEAR] = parseInt(input, 10);
});
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
hooks.parseTwoDigitYear = function(input) {
  return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
};
var getSetYear = makeGetSet("FullYear", true);
function getIsLeapYear() {
  return isLeapYear(this.year());
}
function createDate(y, m, d, h, M, s2, ms) {
  var date;
  if (y < 100 && y >= 0) {
    date = new Date(y + 400, m, d, h, M, s2, ms);
    if (isFinite(date.getFullYear())) {
      date.setFullYear(y);
    }
  } else {
    date = new Date(y, m, d, h, M, s2, ms);
  }
  return date;
}
function createUTCDate(y) {
  var date, args;
  if (y < 100 && y >= 0) {
    args = Array.prototype.slice.call(arguments);
    args[0] = y + 400;
    date = new Date(Date.UTC.apply(null, args));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y);
    }
  } else {
    date = new Date(Date.UTC.apply(null, arguments));
  }
  return date;
}
function firstWeekOffset(year, dow, doy) {
  var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
  var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
  if (dayOfYear <= 0) {
    resYear = year - 1;
    resDayOfYear = daysInYear(resYear) + dayOfYear;
  } else if (dayOfYear > daysInYear(year)) {
    resYear = year + 1;
    resDayOfYear = dayOfYear - daysInYear(year);
  } else {
    resYear = year;
    resDayOfYear = dayOfYear;
  }
  return {
    year: resYear,
    dayOfYear: resDayOfYear
  };
}
function weekOfYear(mom, dow, doy) {
  var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
  if (week < 1) {
    resYear = mom.year() - 1;
    resWeek = week + weeksInYear(resYear, dow, doy);
  } else if (week > weeksInYear(mom.year(), dow, doy)) {
    resWeek = week - weeksInYear(mom.year(), dow, doy);
    resYear = mom.year() + 1;
  } else {
    resYear = mom.year();
    resWeek = week;
  }
  return {
    week: resWeek,
    year: resYear
  };
}
function weeksInYear(year, dow, doy) {
  var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
  return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
addUnitAlias("week", "w");
addUnitAlias("isoWeek", "W");
addUnitPriority("week", 5);
addUnitPriority("isoWeek", 5);
addRegexToken("w", match1to2);
addRegexToken("ww", match1to2, match2);
addRegexToken("W", match1to2);
addRegexToken("WW", match1to2, match2);
addWeekParseToken(
  ["w", "ww", "W", "WW"],
  function(input, week, config, token2) {
    week[token2.substr(0, 1)] = toInt(input);
  }
);
function localeWeek(mom) {
  return weekOfYear(mom, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function localeFirstDayOfWeek() {
  return this._week.dow;
}
function localeFirstDayOfYear() {
  return this._week.doy;
}
function getSetWeek(input) {
  var week = this.localeData().week(this);
  return input == null ? week : this.add((input - week) * 7, "d");
}
function getSetISOWeek(input) {
  var week = weekOfYear(this, 1, 4).week;
  return input == null ? week : this.add((input - week) * 7, "d");
}
addFormatToken("d", 0, "do", "day");
addFormatToken("dd", 0, 0, function(format2) {
  return this.localeData().weekdaysMin(this, format2);
});
addFormatToken("ddd", 0, 0, function(format2) {
  return this.localeData().weekdaysShort(this, format2);
});
addFormatToken("dddd", 0, 0, function(format2) {
  return this.localeData().weekdays(this, format2);
});
addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");
addUnitAlias("day", "d");
addUnitAlias("weekday", "e");
addUnitAlias("isoWeekday", "E");
addUnitPriority("day", 11);
addUnitPriority("weekday", 11);
addUnitPriority("isoWeekday", 11);
addRegexToken("d", match1to2);
addRegexToken("e", match1to2);
addRegexToken("E", match1to2);
addRegexToken("dd", function(isStrict, locale2) {
  return locale2.weekdaysMinRegex(isStrict);
});
addRegexToken("ddd", function(isStrict, locale2) {
  return locale2.weekdaysShortRegex(isStrict);
});
addRegexToken("dddd", function(isStrict, locale2) {
  return locale2.weekdaysRegex(isStrict);
});
addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
  var weekday = config._locale.weekdaysParse(input, token2, config._strict);
  if (weekday != null) {
    week.d = weekday;
  } else {
    getParsingFlags(config).invalidWeekday = input;
  }
});
addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
  week[token2] = toInt(input);
});
function parseWeekday(input, locale2) {
  if (typeof input !== "string") {
    return input;
  }
  if (!isNaN(input)) {
    return parseInt(input, 10);
  }
  input = locale2.weekdaysParse(input);
  if (typeof input === "number") {
    return input;
  }
  return null;
}
function parseIsoWeekday(input, locale2) {
  if (typeof input === "string") {
    return locale2.weekdaysParse(input) % 7 || 7;
  }
  return isNaN(input) ? null : input;
}
function shiftWeekdays(ws, n2) {
  return ws.slice(n2, 7).concat(ws.slice(0, n2));
}
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
function localeWeekdays(m, format2) {
  var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
  return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
}
function localeWeekdaysShort(m) {
  return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}
function localeWeekdaysMin(m) {
  return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}
function handleStrictParse$1(weekdayName, format2, strict) {
  var i2, ii, mom, llc = weekdayName.toLocaleLowerCase();
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._minWeekdaysParse = [];
    for (i2 = 0; i2 < 7; ++i2) {
      mom = createUTC([2e3, 1]).day(i2);
      this._minWeekdaysParse[i2] = this.weekdaysMin(
        mom,
        ""
      ).toLocaleLowerCase();
      this._shortWeekdaysParse[i2] = this.weekdaysShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._weekdaysParse[i2] = this.weekdays(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeWeekdaysParse(weekdayName, format2, strict) {
  var i2, mom, regex;
  if (this._weekdaysParseExact) {
    return handleStrictParse$1.call(this, weekdayName, format2, strict);
  }
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._minWeekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._fullWeekdaysParse = [];
  }
  for (i2 = 0; i2 < 7; i2++) {
    mom = createUTC([2e3, 1]).day(i2);
    if (strict && !this._fullWeekdaysParse[i2]) {
      this._fullWeekdaysParse[i2] = new RegExp(
        "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._shortWeekdaysParse[i2] = new RegExp(
        "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._minWeekdaysParse[i2] = new RegExp(
        "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
    }
    if (!this._weekdaysParse[i2]) {
      regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
      this._weekdaysParse[i2] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "dddd" && this._fullWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (strict && format2 === "dd" && this._minWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (!strict && this._weekdaysParse[i2].test(weekdayName)) {
      return i2;
    }
  }
}
function getSetDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  if (input != null) {
    input = parseWeekday(input, this.localeData());
    return this.add(input - day, "d");
  } else {
    return day;
  }
}
function getSetLocaleDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return input == null ? weekday : this.add(input - weekday, "d");
}
function getSetISODayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    var weekday = parseIsoWeekday(input, this.localeData());
    return this.day(this.day() % 7 ? weekday : weekday - 7);
  } else {
    return this.day() || 7;
  }
}
function weekdaysRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysStrictRegex;
    } else {
      return this._weekdaysRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      this._weekdaysRegex = defaultWeekdaysRegex;
    }
    return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
  }
}
function weekdaysShortRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysShortStrictRegex;
    } else {
      return this._weekdaysShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysShortRegex")) {
      this._weekdaysShortRegex = defaultWeekdaysShortRegex;
    }
    return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  }
}
function weekdaysMinRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysMinStrictRegex;
    } else {
      return this._weekdaysMinRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysMinRegex")) {
      this._weekdaysMinRegex = defaultWeekdaysMinRegex;
    }
    return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  }
}
function computeWeekdaysParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i2, mom, minp, shortp, longp;
  for (i2 = 0; i2 < 7; i2++) {
    mom = createUTC([2e3, 1]).day(i2);
    minp = regexEscape(this.weekdaysMin(mom, ""));
    shortp = regexEscape(this.weekdaysShort(mom, ""));
    longp = regexEscape(this.weekdays(mom, ""));
    minPieces.push(minp);
    shortPieces.push(shortp);
    longPieces.push(longp);
    mixedPieces.push(minp);
    mixedPieces.push(shortp);
    mixedPieces.push(longp);
  }
  minPieces.sort(cmpLenRev);
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._weekdaysShortRegex = this._weekdaysRegex;
  this._weekdaysMinRegex = this._weekdaysRegex;
  this._weekdaysStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._weekdaysShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
  this._weekdaysMinStrictRegex = new RegExp(
    "^(" + minPieces.join("|") + ")",
    "i"
  );
}
function hFormat() {
  return this.hours() % 12 || 12;
}
function kFormat() {
  return this.hours() || 24;
}
addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, hFormat);
addFormatToken("k", ["kk", 2], 0, kFormat);
addFormatToken("hmm", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});
addFormatToken("hmmss", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
addFormatToken("Hmm", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2);
});
addFormatToken("Hmmss", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
function meridiem(token2, lowercase) {
  addFormatToken(token2, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      lowercase
    );
  });
}
meridiem("a", true);
meridiem("A", false);
addUnitAlias("hour", "h");
addUnitPriority("hour", 13);
function matchMeridiem(isStrict, locale2) {
  return locale2._meridiemParse;
}
addRegexToken("a", matchMeridiem);
addRegexToken("A", matchMeridiem);
addRegexToken("H", match1to2);
addRegexToken("h", match1to2);
addRegexToken("k", match1to2);
addRegexToken("HH", match1to2, match2);
addRegexToken("hh", match1to2, match2);
addRegexToken("kk", match1to2, match2);
addRegexToken("hmm", match3to4);
addRegexToken("hmmss", match5to6);
addRegexToken("Hmm", match3to4);
addRegexToken("Hmmss", match5to6);
addParseToken(["H", "HH"], HOUR);
addParseToken(["k", "kk"], function(input, array, config) {
  var kInput = toInt(input);
  array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(["a", "A"], function(input, array, config) {
  config._isPm = config._locale.isPM(input);
  config._meridiem = input;
});
addParseToken(["h", "hh"], function(input, array, config) {
  array[HOUR] = toInt(input);
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
  getParsingFlags(config).bigHour = true;
});
addParseToken("Hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
});
addParseToken("Hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
});
function localeIsPM(input) {
  return (input + "").toLowerCase().charAt(0) === "p";
}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
function localeMeridiem(hours2, minutes2, isLower) {
  if (hours2 > 11) {
    return isLower ? "pm" : "PM";
  } else {
    return isLower ? "am" : "AM";
  }
}
var baseConfig = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,
  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,
  week: defaultLocaleWeek,
  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,
  meridiemParse: defaultLocaleMeridiemParse
};
var locales = {}, localeFamilies = {}, globalLocale;
function commonPrefix(arr1, arr2) {
  var i2, minl = Math.min(arr1.length, arr2.length);
  for (i2 = 0; i2 < minl; i2 += 1) {
    if (arr1[i2] !== arr2[i2]) {
      return i2;
    }
  }
  return minl;
}
function normalizeLocale(key2) {
  return key2 ? key2.toLowerCase().replace("_", "-") : key2;
}
function chooseLocale(names) {
  var i2 = 0, j, next, locale2, split;
  while (i2 < names.length) {
    split = normalizeLocale(names[i2]).split("-");
    j = split.length;
    next = normalizeLocale(names[i2 + 1]);
    next = next ? next.split("-") : null;
    while (j > 0) {
      locale2 = loadLocale(split.slice(0, j).join("-"));
      if (locale2) {
        return locale2;
      }
      if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
        break;
      }
      j--;
    }
    i2++;
  }
  return globalLocale;
}
function isLocaleNameSane(name) {
  return name.match("^[^/\\\\]*$") != null;
}
function loadLocale(name) {
  var oldLocale = null, aliasedRequire;
  if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
    try {
      oldLocale = globalLocale._abbr;
      aliasedRequire = require;
      aliasedRequire("./locale/" + name);
      getSetGlobalLocale(oldLocale);
    } catch (e2) {
      locales[name] = null;
    }
  }
  return locales[name];
}
function getSetGlobalLocale(key2, values) {
  var data;
  if (key2) {
    if (isUndefined(values)) {
      data = getLocale(key2);
    } else {
      data = defineLocale(key2, values);
    }
    if (data) {
      globalLocale = data;
    } else {
      if (typeof console !== "undefined" && console.warn) {
        console.warn(
          "Locale " + key2 + " not found. Did you forget to load it?"
        );
      }
    }
  }
  return globalLocale._abbr;
}
function defineLocale(name, config) {
  if (config !== null) {
    var locale2, parentConfig = baseConfig;
    config.abbr = name;
    if (locales[name] != null) {
      deprecateSimple(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      );
      parentConfig = locales[name]._config;
    } else if (config.parentLocale != null) {
      if (locales[config.parentLocale] != null) {
        parentConfig = locales[config.parentLocale]._config;
      } else {
        locale2 = loadLocale(config.parentLocale);
        if (locale2 != null) {
          parentConfig = locale2._config;
        } else {
          if (!localeFamilies[config.parentLocale]) {
            localeFamilies[config.parentLocale] = [];
          }
          localeFamilies[config.parentLocale].push({
            name,
            config
          });
          return null;
        }
      }
    }
    locales[name] = new Locale(mergeConfigs(parentConfig, config));
    if (localeFamilies[name]) {
      localeFamilies[name].forEach(function(x) {
        defineLocale(x.name, x.config);
      });
    }
    getSetGlobalLocale(name);
    return locales[name];
  } else {
    delete locales[name];
    return null;
  }
}
function updateLocale(name, config) {
  if (config != null) {
    var locale2, tmpLocale, parentConfig = baseConfig;
    if (locales[name] != null && locales[name].parentLocale != null) {
      locales[name].set(mergeConfigs(locales[name]._config, config));
    } else {
      tmpLocale = loadLocale(name);
      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }
      config = mergeConfigs(parentConfig, config);
      if (tmpLocale == null) {
        config.abbr = name;
      }
      locale2 = new Locale(config);
      locale2.parentLocale = locales[name];
      locales[name] = locale2;
    }
    getSetGlobalLocale(name);
  } else {
    if (locales[name] != null) {
      if (locales[name].parentLocale != null) {
        locales[name] = locales[name].parentLocale;
        if (name === getSetGlobalLocale()) {
          getSetGlobalLocale(name);
        }
      } else if (locales[name] != null) {
        delete locales[name];
      }
    }
  }
  return locales[name];
}
function getLocale(key2) {
  var locale2;
  if (key2 && key2._locale && key2._locale._abbr) {
    key2 = key2._locale._abbr;
  }
  if (!key2) {
    return globalLocale;
  }
  if (!isArray(key2)) {
    locale2 = loadLocale(key2);
    if (locale2) {
      return locale2;
    }
    key2 = [key2];
  }
  return chooseLocale(key2);
}
function listLocales() {
  return keys(locales);
}
function checkOverflow(m) {
  var overflow, a = m._a;
  if (a && getParsingFlags(m).overflow === -2) {
    overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
    if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
      overflow = DATE;
    }
    if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
      overflow = WEEK;
    }
    if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
      overflow = WEEKDAY;
    }
    getParsingFlags(m).overflow = overflow;
  }
  return m;
}
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, false],
  ["YYYY", /\d{4}/, false]
], isoTimes = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function configFromISO(config) {
  var i2, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
  if (match) {
    getParsingFlags(config).iso = true;
    for (i2 = 0, l = isoDatesLen; i2 < l; i2++) {
      if (isoDates[i2][1].exec(match[1])) {
        dateFormat = isoDates[i2][0];
        allowTime = isoDates[i2][2] !== false;
        break;
      }
    }
    if (dateFormat == null) {
      config._isValid = false;
      return;
    }
    if (match[3]) {
      for (i2 = 0, l = isoTimesLen; i2 < l; i2++) {
        if (isoTimes[i2][1].exec(match[3])) {
          timeFormat = (match[2] || " ") + isoTimes[i2][0];
          break;
        }
      }
      if (timeFormat == null) {
        config._isValid = false;
        return;
      }
    }
    if (!allowTime && timeFormat != null) {
      config._isValid = false;
      return;
    }
    if (match[4]) {
      if (tzRegex.exec(match[4])) {
        tzFormat = "Z";
      } else {
        config._isValid = false;
        return;
      }
    }
    config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
    configFromStringAndFormat(config);
  } else {
    config._isValid = false;
  }
}
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = [
    untruncateYear(yearStr),
    defaultLocaleMonthsShort.indexOf(monthStr),
    parseInt(dayStr, 10),
    parseInt(hourStr, 10),
    parseInt(minuteStr, 10)
  ];
  if (secondStr) {
    result.push(parseInt(secondStr, 10));
  }
  return result;
}
function untruncateYear(yearStr) {
  var year = parseInt(yearStr, 10);
  if (year <= 49) {
    return 2e3 + year;
  } else if (year <= 999) {
    return 1900 + year;
  }
  return year;
}
function preprocessRFC2822(s2) {
  return s2.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function checkWeekday(weekdayStr, parsedInput, config) {
  if (weekdayStr) {
    var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
      parsedInput[0],
      parsedInput[1],
      parsedInput[2]
    ).getDay();
    if (weekdayProvided !== weekdayActual) {
      getParsingFlags(config).weekdayMismatch = true;
      config._isValid = false;
      return false;
    }
  }
  return true;
}
function calculateOffset(obsOffset, militaryOffset, numOffset) {
  if (obsOffset) {
    return obsOffsets[obsOffset];
  } else if (militaryOffset) {
    return 0;
  } else {
    var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
    return h * 60 + m;
  }
}
function configFromRFC2822(config) {
  var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
  if (match) {
    parsedArray = extractFromRFC2822Strings(
      match[4],
      match[3],
      match[2],
      match[5],
      match[6],
      match[7]
    );
    if (!checkWeekday(match[1], parsedArray, config)) {
      return;
    }
    config._a = parsedArray;
    config._tzm = calculateOffset(match[8], match[9], match[10]);
    config._d = createUTCDate.apply(null, config._a);
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    getParsingFlags(config).rfc2822 = true;
  } else {
    config._isValid = false;
  }
}
function configFromString(config) {
  var matched = aspNetJsonRegex.exec(config._i);
  if (matched !== null) {
    config._d = /* @__PURE__ */ new Date(+matched[1]);
    return;
  }
  configFromISO(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  configFromRFC2822(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  if (config._strict) {
    config._isValid = false;
  } else {
    hooks.createFromInputFallback(config);
  }
}
hooks.createFromInputFallback = deprecate(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(config) {
    config._d = /* @__PURE__ */ new Date(config._i + (config._useUTC ? " UTC" : ""));
  }
);
function defaults(a, b, c) {
  if (a != null) {
    return a;
  }
  if (b != null) {
    return b;
  }
  return c;
}
function currentDateArray(config) {
  var nowValue = new Date(hooks.now());
  if (config._useUTC) {
    return [
      nowValue.getUTCFullYear(),
      nowValue.getUTCMonth(),
      nowValue.getUTCDate()
    ];
  }
  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
function configFromArray(config) {
  var i2, date, input = [], currentDate, expectedWeekday, yearToUse;
  if (config._d) {
    return;
  }
  currentDate = currentDateArray(config);
  if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
    dayOfYearFromWeekInfo(config);
  }
  if (config._dayOfYear != null) {
    yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
    if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
      getParsingFlags(config)._overflowDayOfYear = true;
    }
    date = createUTCDate(yearToUse, 0, config._dayOfYear);
    config._a[MONTH] = date.getUTCMonth();
    config._a[DATE] = date.getUTCDate();
  }
  for (i2 = 0; i2 < 3 && config._a[i2] == null; ++i2) {
    config._a[i2] = input[i2] = currentDate[i2];
  }
  for (; i2 < 7; i2++) {
    config._a[i2] = input[i2] = config._a[i2] == null ? i2 === 2 ? 1 : 0 : config._a[i2];
  }
  if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
    config._nextDay = true;
    config._a[HOUR] = 0;
  }
  config._d = (config._useUTC ? createUTCDate : createDate).apply(
    null,
    input
  );
  expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
  if (config._tzm != null) {
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  }
  if (config._nextDay) {
    config._a[HOUR] = 24;
  }
  if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
    getParsingFlags(config).weekdayMismatch = true;
  }
}
function dayOfYearFromWeekInfo(config) {
  var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  w = config._w;
  if (w.GG != null || w.W != null || w.E != null) {
    dow = 1;
    doy = 4;
    weekYear = defaults(
      w.GG,
      config._a[YEAR],
      weekOfYear(createLocal(), 1, 4).year
    );
    week = defaults(w.W, 1);
    weekday = defaults(w.E, 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config._locale._week.dow;
    doy = config._locale._week.doy;
    curWeek = weekOfYear(createLocal(), dow, doy);
    weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
    week = defaults(w.w, curWeek.week);
    if (w.d != null) {
      weekday = w.d;
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w.e != null) {
      weekday = w.e + dow;
      if (w.e < 0 || w.e > 6) {
        weekdayOverflow = true;
      }
    } else {
      weekday = dow;
    }
  }
  if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
    getParsingFlags(config)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags(config)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }
}
hooks.ISO_8601 = function() {
};
hooks.RFC_2822 = function() {
};
function configFromStringAndFormat(config) {
  if (config._f === hooks.ISO_8601) {
    configFromISO(config);
    return;
  }
  if (config._f === hooks.RFC_2822) {
    configFromRFC2822(config);
    return;
  }
  config._a = [];
  getParsingFlags(config).empty = true;
  var string = "" + config._i, i2, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
  tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
  tokenLen = tokens2.length;
  for (i2 = 0; i2 < tokenLen; i2++) {
    token2 = tokens2[i2];
    parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
    if (parsedInput) {
      skipped = string.substr(0, string.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags(config).unusedInput.push(skipped);
      }
      string = string.slice(
        string.indexOf(parsedInput) + parsedInput.length
      );
      totalParsedInputLength += parsedInput.length;
    }
    if (formatTokenFunctions[token2]) {
      if (parsedInput) {
        getParsingFlags(config).empty = false;
      } else {
        getParsingFlags(config).unusedTokens.push(token2);
      }
      addTimeToArrayFromToken(token2, parsedInput, config);
    } else if (config._strict && !parsedInput) {
      getParsingFlags(config).unusedTokens.push(token2);
    }
  }
  getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
  if (string.length > 0) {
    getParsingFlags(config).unusedInput.push(string);
  }
  if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
    getParsingFlags(config).bigHour = void 0;
  }
  getParsingFlags(config).parsedDateParts = config._a.slice(0);
  getParsingFlags(config).meridiem = config._meridiem;
  config._a[HOUR] = meridiemFixWrap(
    config._locale,
    config._a[HOUR],
    config._meridiem
  );
  era = getParsingFlags(config).era;
  if (era !== null) {
    config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
  }
  configFromArray(config);
  checkOverflow(config);
}
function meridiemFixWrap(locale2, hour, meridiem2) {
  var isPm;
  if (meridiem2 == null) {
    return hour;
  }
  if (locale2.meridiemHour != null) {
    return locale2.meridiemHour(hour, meridiem2);
  } else if (locale2.isPM != null) {
    isPm = locale2.isPM(meridiem2);
    if (isPm && hour < 12) {
      hour += 12;
    }
    if (!isPm && hour === 12) {
      hour = 0;
    }
    return hour;
  } else {
    return hour;
  }
}
function configFromStringAndArray(config) {
  var tempConfig, bestMoment, scoreToBeat, i2, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
  if (configfLen === 0) {
    getParsingFlags(config).invalidFormat = true;
    config._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (i2 = 0; i2 < configfLen; i2++) {
    currentScore = 0;
    validFormatFound = false;
    tempConfig = copyConfig({}, config);
    if (config._useUTC != null) {
      tempConfig._useUTC = config._useUTC;
    }
    tempConfig._f = config._f[i2];
    configFromStringAndFormat(tempConfig);
    if (isValid(tempConfig)) {
      validFormatFound = true;
    }
    currentScore += getParsingFlags(tempConfig).charsLeftOver;
    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
    getParsingFlags(tempConfig).score = currentScore;
    if (!bestFormatIsValid) {
      if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
        if (validFormatFound) {
          bestFormatIsValid = true;
        }
      }
    } else {
      if (currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
  }
  extend(config, bestMoment || tempConfig);
}
function configFromObject(config) {
  if (config._d) {
    return;
  }
  var i2 = normalizeObjectUnits(config._i), dayOrDate = i2.day === void 0 ? i2.date : i2.day;
  config._a = map(
    [i2.year, i2.month, dayOrDate, i2.hour, i2.minute, i2.second, i2.millisecond],
    function(obj2) {
      return obj2 && parseInt(obj2, 10);
    }
  );
  configFromArray(config);
}
function createFromConfig(config) {
  var res = new Moment(checkOverflow(prepareConfig(config)));
  if (res._nextDay) {
    res.add(1, "d");
    res._nextDay = void 0;
  }
  return res;
}
function prepareConfig(config) {
  var input = config._i, format2 = config._f;
  config._locale = config._locale || getLocale(config._l);
  if (input === null || format2 === void 0 && input === "") {
    return createInvalid({ nullInput: true });
  }
  if (typeof input === "string") {
    config._i = input = config._locale.preparse(input);
  }
  if (isMoment(input)) {
    return new Moment(checkOverflow(input));
  } else if (isDate(input)) {
    config._d = input;
  } else if (isArray(format2)) {
    configFromStringAndArray(config);
  } else if (format2) {
    configFromStringAndFormat(config);
  } else {
    configFromInput(config);
  }
  if (!isValid(config)) {
    config._d = null;
  }
  return config;
}
function configFromInput(config) {
  var input = config._i;
  if (isUndefined(input)) {
    config._d = new Date(hooks.now());
  } else if (isDate(input)) {
    config._d = new Date(input.valueOf());
  } else if (typeof input === "string") {
    configFromString(config);
  } else if (isArray(input)) {
    config._a = map(input.slice(0), function(obj2) {
      return parseInt(obj2, 10);
    });
    configFromArray(config);
  } else if (isObject$1(input)) {
    configFromObject(config);
  } else if (isNumber(input)) {
    config._d = new Date(input);
  } else {
    hooks.createFromInputFallback(config);
  }
}
function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
  var c = {};
  if (format2 === true || format2 === false) {
    strict = format2;
    format2 = void 0;
  }
  if (locale2 === true || locale2 === false) {
    strict = locale2;
    locale2 = void 0;
  }
  if (isObject$1(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
    input = void 0;
  }
  c._isAMomentObject = true;
  c._useUTC = c._isUTC = isUTC;
  c._l = locale2;
  c._i = input;
  c._f = format2;
  c._strict = strict;
  return createFromConfig(c);
}
function createLocal(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, false);
}
var prototypeMin = deprecate(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  }
), prototypeMax = deprecate(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  }
);
function pickBy(fn, moments) {
  var res, i2;
  if (moments.length === 1 && isArray(moments[0])) {
    moments = moments[0];
  }
  if (!moments.length) {
    return createLocal();
  }
  res = moments[0];
  for (i2 = 1; i2 < moments.length; ++i2) {
    if (!moments[i2].isValid() || moments[i2][fn](res)) {
      res = moments[i2];
    }
  }
  return res;
}
function min() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isBefore", args);
}
function max() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isAfter", args);
}
var now = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
};
var ordering = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function isDurationValid(m) {
  var key2, unitHasDecimal = false, i2, orderLen = ordering.length;
  for (key2 in m) {
    if (hasOwnProp(m, key2) && !(indexOf.call(ordering, key2) !== -1 && (m[key2] == null || !isNaN(m[key2])))) {
      return false;
    }
  }
  for (i2 = 0; i2 < orderLen; ++i2) {
    if (m[ordering[i2]]) {
      if (unitHasDecimal) {
        return false;
      }
      if (parseFloat(m[ordering[i2]]) !== toInt(m[ordering[i2]])) {
        unitHasDecimal = true;
      }
    }
  }
  return true;
}
function isValid$1() {
  return this._isValid;
}
function createInvalid$1() {
  return createDuration(NaN);
}
function Duration(duration) {
  var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
  this._isValid = isDurationValid(normalizedInput);
  this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
  minutes2 * 6e4 + // 1000 * 60
  hours2 * 1e3 * 60 * 60;
  this._days = +days2 + weeks2 * 7;
  this._months = +months2 + quarters * 3 + years2 * 12;
  this._data = {};
  this._locale = getLocale();
  this._bubble();
}
function isDuration(obj2) {
  return obj2 instanceof Duration;
}
function absRound(number) {
  if (number < 0) {
    return Math.round(-1 * number) * -1;
  } else {
    return Math.round(number);
  }
}
function compareArrays(array1, array2, dontConvert) {
  var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i2;
  for (i2 = 0; i2 < len; i2++) {
    if (dontConvert && array1[i2] !== array2[i2] || !dontConvert && toInt(array1[i2]) !== toInt(array2[i2])) {
      diffs++;
    }
  }
  return diffs + lengthDiff;
}
function offset(token2, separator) {
  addFormatToken(token2, 0, 0, function() {
    var offset2 = this.utcOffset(), sign2 = "+";
    if (offset2 < 0) {
      offset2 = -offset2;
      sign2 = "-";
    }
    return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
  });
}
offset("Z", ":");
offset("ZZ", "");
addRegexToken("Z", matchShortOffset);
addRegexToken("ZZ", matchShortOffset);
addParseToken(["Z", "ZZ"], function(input, array, config) {
  config._useUTC = true;
  config._tzm = offsetFromString(matchShortOffset, input);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher, string) {
  var matches = (string || "").match(matcher), chunk, parts2, minutes2;
  if (matches === null) {
    return null;
  }
  chunk = matches[matches.length - 1] || [];
  parts2 = (chunk + "").match(chunkOffset) || ["-", 0, 0];
  minutes2 = +(parts2[1] * 60) + toInt(parts2[2]);
  return minutes2 === 0 ? 0 : parts2[0] === "+" ? minutes2 : -minutes2;
}
function cloneWithOffset(input, model) {
  var res, diff2;
  if (model._isUTC) {
    res = model.clone();
    diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
    res._d.setTime(res._d.valueOf() + diff2);
    hooks.updateOffset(res, false);
    return res;
  } else {
    return createLocal(input).local();
  }
}
function getDateOffset(m) {
  return -Math.round(m._d.getTimezoneOffset());
}
hooks.updateOffset = function() {
};
function getSetOffset(input, keepLocalTime, keepMinutes) {
  var offset2 = this._offset || 0, localAdjust;
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    if (typeof input === "string") {
      input = offsetFromString(matchShortOffset, input);
      if (input === null) {
        return this;
      }
    } else if (Math.abs(input) < 16 && !keepMinutes) {
      input = input * 60;
    }
    if (!this._isUTC && keepLocalTime) {
      localAdjust = getDateOffset(this);
    }
    this._offset = input;
    this._isUTC = true;
    if (localAdjust != null) {
      this.add(localAdjust, "m");
    }
    if (offset2 !== input) {
      if (!keepLocalTime || this._changeInProgress) {
        addSubtract(
          this,
          createDuration(input - offset2, "m"),
          1,
          false
        );
      } else if (!this._changeInProgress) {
        this._changeInProgress = true;
        hooks.updateOffset(this, true);
        this._changeInProgress = null;
      }
    }
    return this;
  } else {
    return this._isUTC ? offset2 : getDateOffset(this);
  }
}
function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== "string") {
      input = -input;
    }
    this.utcOffset(input, keepLocalTime);
    return this;
  } else {
    return -this.utcOffset();
  }
}
function setOffsetToUTC(keepLocalTime) {
  return this.utcOffset(0, keepLocalTime);
}
function setOffsetToLocal(keepLocalTime) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;
    if (keepLocalTime) {
      this.subtract(getDateOffset(this), "m");
    }
  }
  return this;
}
function setOffsetToParsedOffset() {
  if (this._tzm != null) {
    this.utcOffset(this._tzm, false, true);
  } else if (typeof this._i === "string") {
    var tZone = offsetFromString(matchOffset, this._i);
    if (tZone != null) {
      this.utcOffset(tZone);
    } else {
      this.utcOffset(0, true);
    }
  }
  return this;
}
function hasAlignedHourOffset(input) {
  if (!this.isValid()) {
    return false;
  }
  input = input ? createLocal(input).utcOffset() : 0;
  return (this.utcOffset() - input) % 60 === 0;
}
function isDaylightSavingTime() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }
  var c = {}, other;
  copyConfig(c, this);
  c = prepareConfig(c);
  if (c._a) {
    other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
    this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }
  return this._isDSTShifted;
}
function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}
function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}
function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(input, key2) {
  var duration = input, match = null, sign2, ret, diffRes;
  if (isDuration(input)) {
    duration = {
      ms: input._milliseconds,
      d: input._days,
      M: input._months
    };
  } else if (isNumber(input) || !isNaN(+input)) {
    duration = {};
    if (key2) {
      duration[key2] = +input;
    } else {
      duration.milliseconds = +input;
    }
  } else if (match = aspNetRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: 0,
      d: toInt(match[DATE]) * sign2,
      h: toInt(match[HOUR]) * sign2,
      m: toInt(match[MINUTE]) * sign2,
      s: toInt(match[SECOND]) * sign2,
      ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
      // the millisecond decimal point is included in the match
    };
  } else if (match = isoRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: parseIso(match[2], sign2),
      M: parseIso(match[3], sign2),
      w: parseIso(match[4], sign2),
      d: parseIso(match[5], sign2),
      h: parseIso(match[6], sign2),
      m: parseIso(match[7], sign2),
      s: parseIso(match[8], sign2)
    };
  } else if (duration == null) {
    duration = {};
  } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
    diffRes = momentsDifference(
      createLocal(duration.from),
      createLocal(duration.to)
    );
    duration = {};
    duration.ms = diffRes.milliseconds;
    duration.M = diffRes.months;
  }
  ret = new Duration(duration);
  if (isDuration(input) && hasOwnProp(input, "_locale")) {
    ret._locale = input._locale;
  }
  if (isDuration(input) && hasOwnProp(input, "_isValid")) {
    ret._isValid = input._isValid;
  }
  return ret;
}
createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;
function parseIso(inp, sign2) {
  var res = inp && parseFloat(inp.replace(",", "."));
  return (isNaN(res) ? 0 : res) * sign2;
}
function positiveMomentsDifference(base, other) {
  var res = {};
  res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
  if (base.clone().add(res.months, "M").isAfter(other)) {
    --res.months;
  }
  res.milliseconds = +other - +base.clone().add(res.months, "M");
  return res;
}
function momentsDifference(base, other) {
  var res;
  if (!(base.isValid() && other.isValid())) {
    return { milliseconds: 0, months: 0 };
  }
  other = cloneWithOffset(other, base);
  if (base.isBefore(other)) {
    res = positiveMomentsDifference(base, other);
  } else {
    res = positiveMomentsDifference(other, base);
    res.milliseconds = -res.milliseconds;
    res.months = -res.months;
  }
  return res;
}
function createAdder(direction, name) {
  return function(val, period) {
    var dur, tmp;
    if (period !== null && !isNaN(+period)) {
      deprecateSimple(
        name,
        "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
      );
      tmp = val;
      val = period;
      period = tmp;
    }
    dur = createDuration(val, period);
    addSubtract(this, dur, direction);
    return this;
  };
}
function addSubtract(mom, duration, isAdding, updateOffset) {
  var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
  if (!mom.isValid()) {
    return;
  }
  updateOffset = updateOffset == null ? true : updateOffset;
  if (months2) {
    setMonth(mom, get(mom, "Month") + months2 * isAdding);
  }
  if (days2) {
    set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
  }
  if (milliseconds2) {
    mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
  }
  if (updateOffset) {
    hooks.updateOffset(mom, days2 || months2);
  }
}
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function isString(input) {
  return typeof input === "string" || input instanceof String;
}
function isMomentInput(input) {
  return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
}
function isMomentInputObject(input) {
  var objectTest = isObject$1(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i2, property, propertyLen = properties.length;
  for (i2 = 0; i2 < propertyLen; i2 += 1) {
    property = properties[i2];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function isNumberOrStringArray(input) {
  var arrayTest = isArray(input), dataTypeTest = false;
  if (arrayTest) {
    dataTypeTest = input.filter(function(item) {
      return !isNumber(item) && isString(input);
    }).length === 0;
  }
  return arrayTest && dataTypeTest;
}
function isCalendarSpec(input) {
  var objectTest = isObject$1(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i2, property;
  for (i2 = 0; i2 < properties.length; i2 += 1) {
    property = properties[i2];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function getCalendarFormat(myMoment, now2) {
  var diff2 = myMoment.diff(now2, "days", true);
  return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
}
function calendar$1(time, formats2) {
  if (arguments.length === 1) {
    if (!arguments[0]) {
      time = void 0;
      formats2 = void 0;
    } else if (isMomentInput(arguments[0])) {
      time = arguments[0];
      formats2 = void 0;
    } else if (isCalendarSpec(arguments[0])) {
      formats2 = arguments[0];
      time = void 0;
    }
  }
  var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats2 && (isFunction(formats2[format2]) ? formats2[format2].call(this, now2) : formats2[format2]);
  return this.format(
    output || this.localeData().calendar(format2, this, createLocal(now2))
  );
}
function clone() {
  return new Moment(this);
}
function isAfter(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() > localInput.valueOf();
  } else {
    return localInput.valueOf() < this.clone().startOf(units).valueOf();
  }
}
function isBefore(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() < localInput.valueOf();
  } else {
    return this.clone().endOf(units).valueOf() < localInput.valueOf();
  }
}
function isBetween(from2, to2, units, inclusivity) {
  var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
  if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
    return false;
  }
  inclusivity = inclusivity || "()";
  return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
}
function isSame(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input), inputMs;
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() === localInput.valueOf();
  } else {
    inputMs = localInput.valueOf();
    return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
  }
}
function isSameOrAfter(input, units) {
  return this.isSame(input, units) || this.isAfter(input, units);
}
function isSameOrBefore(input, units) {
  return this.isSame(input, units) || this.isBefore(input, units);
}
function diff(input, units, asFloat) {
  var that, zoneDelta, output;
  if (!this.isValid()) {
    return NaN;
  }
  that = cloneWithOffset(input, this);
  if (!that.isValid()) {
    return NaN;
  }
  zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  units = normalizeUnits(units);
  switch (units) {
    case "year":
      output = monthDiff(this, that) / 12;
      break;
    case "month":
      output = monthDiff(this, that);
      break;
    case "quarter":
      output = monthDiff(this, that) / 3;
      break;
    case "second":
      output = (this - that) / 1e3;
      break;
    case "minute":
      output = (this - that) / 6e4;
      break;
    case "hour":
      output = (this - that) / 36e5;
      break;
    case "day":
      output = (this - that - zoneDelta) / 864e5;
      break;
    case "week":
      output = (this - that - zoneDelta) / 6048e5;
      break;
    default:
      output = this - that;
  }
  return asFloat ? output : absFloor(output);
}
function monthDiff(a, b) {
  if (a.date() < b.date()) {
    return -monthDiff(b, a);
  }
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
  if (b - anchor < 0) {
    anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
    adjust = (b - anchor) / (anchor - anchor2);
  } else {
    anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
    adjust = (b - anchor) / (anchor2 - anchor);
  }
  return -(wholeMonthDiff + adjust) || 0;
}
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function toString() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function toISOString(keepOffset) {
  if (!this.isValid()) {
    return null;
  }
  var utc2 = keepOffset !== true, m = utc2 ? this.clone().utc() : this;
  if (m.year() < 0 || m.year() > 9999) {
    return formatMoment(
      m,
      utc2 ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
    );
  }
  if (isFunction(Date.prototype.toISOString)) {
    if (utc2) {
      return this.toDate().toISOString();
    } else {
      return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
    }
  }
  return formatMoment(
    m,
    utc2 ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function inspect() {
  if (!this.isValid()) {
    return "moment.invalid(/* " + this._i + " */)";
  }
  var func = "moment", zone = "", prefix, year, datetime, suffix;
  if (!this.isLocal()) {
    func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
    zone = "Z";
  }
  prefix = "[" + func + '("]';
  year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
  datetime = "-MM-DD[T]HH:mm:ss.SSS";
  suffix = zone + '[")]';
  return this.format(prefix + year + datetime + suffix);
}
function format(inputString) {
  if (!inputString) {
    inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
  }
  var output = formatMoment(this, inputString);
  return this.localeData().postformat(output);
}
function from(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function fromNow(withoutSuffix) {
  return this.from(createLocal(), withoutSuffix);
}
function to(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function toNow(withoutSuffix) {
  return this.to(createLocal(), withoutSuffix);
}
function locale(key2) {
  var newLocaleData;
  if (key2 === void 0) {
    return this._locale._abbr;
  } else {
    newLocaleData = getLocale(key2);
    if (newLocaleData != null) {
      this._locale = newLocaleData;
    }
    return this;
  }
}
var lang = deprecate(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(key2) {
    if (key2 === void 0) {
      return this.localeData();
    } else {
      return this.locale(key2);
    }
  }
);
function localeData() {
  return this._locale;
}
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
function mod$1(dividend, divisor) {
  return (dividend % divisor + divisor) % divisor;
}
function localStartOfDate(y, m, d) {
  if (y < 100 && y >= 0) {
    return new Date(y + 400, m, d) - MS_PER_400_YEARS;
  } else {
    return new Date(y, m, d).valueOf();
  }
}
function utcStartOfDate(y, m, d) {
  if (y < 100 && y >= 0) {
    return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
  } else {
    return Date.UTC(y, m, d);
  }
}
function startOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year(), 0, 1);
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      time = startOfDate(this.year(), this.month(), 1);
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date());
      break;
    case "hour":
      time = this._d.valueOf();
      time -= mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      );
      break;
    case "minute":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_MINUTE);
      break;
    case "second":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_SECOND);
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function endOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      time = startOfDate(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      time = this._d.valueOf();
      time += MS_PER_HOUR - mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      ) - 1;
      break;
    case "minute":
      time = this._d.valueOf();
      time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
      break;
    case "second":
      time = this._d.valueOf();
      time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function valueOf() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function unix() {
  return Math.floor(this.valueOf() / 1e3);
}
function toDate() {
  return new Date(this.valueOf());
}
function toArray() {
  var m = this;
  return [
    m.year(),
    m.month(),
    m.date(),
    m.hour(),
    m.minute(),
    m.second(),
    m.millisecond()
  ];
}
function toObject() {
  var m = this;
  return {
    years: m.year(),
    months: m.month(),
    date: m.date(),
    hours: m.hours(),
    minutes: m.minutes(),
    seconds: m.seconds(),
    milliseconds: m.milliseconds()
  };
}
function toJSON() {
  return this.isValid() ? this.toISOString() : null;
}
function isValid$2() {
  return isValid(this);
}
function parsingFlags() {
  return extend({}, getParsingFlags(this));
}
function invalidAt() {
  return getParsingFlags(this).overflow;
}
function creationData() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
addFormatToken("N", 0, 0, "eraAbbr");
addFormatToken("NN", 0, 0, "eraAbbr");
addFormatToken("NNN", 0, 0, "eraAbbr");
addFormatToken("NNNN", 0, 0, "eraName");
addFormatToken("NNNNN", 0, 0, "eraNarrow");
addFormatToken("y", ["y", 1], "yo", "eraYear");
addFormatToken("y", ["yy", 2], 0, "eraYear");
addFormatToken("y", ["yyy", 3], 0, "eraYear");
addFormatToken("y", ["yyyy", 4], 0, "eraYear");
addRegexToken("N", matchEraAbbr);
addRegexToken("NN", matchEraAbbr);
addRegexToken("NNN", matchEraAbbr);
addRegexToken("NNNN", matchEraName);
addRegexToken("NNNNN", matchEraNarrow);
addParseToken(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(input, array, config, token2) {
    var era = config._locale.erasParse(input, token2, config._strict);
    if (era) {
      getParsingFlags(config).era = era;
    } else {
      getParsingFlags(config).invalidEra = input;
    }
  }
);
addRegexToken("y", matchUnsigned);
addRegexToken("yy", matchUnsigned);
addRegexToken("yyy", matchUnsigned);
addRegexToken("yyyy", matchUnsigned);
addRegexToken("yo", matchEraYearOrdinal);
addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
addParseToken(["yo"], function(input, array, config, token2) {
  var match;
  if (config._locale._eraYearOrdinalRegex) {
    match = input.match(config._locale._eraYearOrdinalRegex);
  }
  if (config._locale.eraYearOrdinalParse) {
    array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
  } else {
    array[YEAR] = parseInt(input, 10);
  }
});
function localeEras(m, format2) {
  var i2, l, date, eras = this._eras || getLocale("en")._eras;
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    switch (typeof eras[i2].since) {
      case "string":
        date = hooks(eras[i2].since).startOf("day");
        eras[i2].since = date.valueOf();
        break;
    }
    switch (typeof eras[i2].until) {
      case "undefined":
        eras[i2].until = Infinity;
        break;
      case "string":
        date = hooks(eras[i2].until).startOf("day").valueOf();
        eras[i2].until = date.valueOf();
        break;
    }
  }
  return eras;
}
function localeErasParse(eraName, format2, strict) {
  var i2, l, eras = this.eras(), name, abbr, narrow;
  eraName = eraName.toUpperCase();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    name = eras[i2].name.toUpperCase();
    abbr = eras[i2].abbr.toUpperCase();
    narrow = eras[i2].narrow.toUpperCase();
    if (strict) {
      switch (format2) {
        case "N":
        case "NN":
        case "NNN":
          if (abbr === eraName) {
            return eras[i2];
          }
          break;
        case "NNNN":
          if (name === eraName) {
            return eras[i2];
          }
          break;
        case "NNNNN":
          if (narrow === eraName) {
            return eras[i2];
          }
          break;
      }
    } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
      return eras[i2];
    }
  }
}
function localeErasConvertYear(era, year) {
  var dir = era.since <= era.until ? 1 : -1;
  if (year === void 0) {
    return hooks(era.since).year();
  } else {
    return hooks(era.since).year() + (year - era.offset) * dir;
  }
}
function getEraName() {
  var i2, l, val, eras = this.localeData().eras();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].name;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].name;
    }
  }
  return "";
}
function getEraNarrow() {
  var i2, l, val, eras = this.localeData().eras();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].narrow;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].narrow;
    }
  }
  return "";
}
function getEraAbbr() {
  var i2, l, val, eras = this.localeData().eras();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].abbr;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].abbr;
    }
  }
  return "";
}
function getEraYear() {
  var i2, l, dir, val, eras = this.localeData().eras();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    dir = eras[i2].since <= eras[i2].until ? 1 : -1;
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until || eras[i2].until <= val && val <= eras[i2].since) {
      return (this.year() - hooks(eras[i2].since).year()) * dir + eras[i2].offset;
    }
  }
  return this.year();
}
function erasNameRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNameRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNameRegex : this._erasRegex;
}
function erasAbbrRegex(isStrict) {
  if (!hasOwnProp(this, "_erasAbbrRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasAbbrRegex : this._erasRegex;
}
function erasNarrowRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNarrowRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNarrowRegex : this._erasRegex;
}
function matchEraAbbr(isStrict, locale2) {
  return locale2.erasAbbrRegex(isStrict);
}
function matchEraName(isStrict, locale2) {
  return locale2.erasNameRegex(isStrict);
}
function matchEraNarrow(isStrict, locale2) {
  return locale2.erasNarrowRegex(isStrict);
}
function matchEraYearOrdinal(isStrict, locale2) {
  return locale2._eraYearOrdinalRegex || matchUnsigned;
}
function computeErasParse() {
  var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i2, l, eras = this.eras();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    namePieces.push(regexEscape(eras[i2].name));
    abbrPieces.push(regexEscape(eras[i2].abbr));
    narrowPieces.push(regexEscape(eras[i2].narrow));
    mixedPieces.push(regexEscape(eras[i2].name));
    mixedPieces.push(regexEscape(eras[i2].abbr));
    mixedPieces.push(regexEscape(eras[i2].narrow));
  }
  this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
  this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
  this._erasNarrowRegex = new RegExp(
    "^(" + narrowPieces.join("|") + ")",
    "i"
  );
}
addFormatToken(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
addFormatToken(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken(token2, getter) {
  addFormatToken(0, [token2, token2.length], 0, getter);
}
addWeekYearFormatToken("gggg", "weekYear");
addWeekYearFormatToken("ggggg", "weekYear");
addWeekYearFormatToken("GGGG", "isoWeekYear");
addWeekYearFormatToken("GGGGG", "isoWeekYear");
addUnitAlias("weekYear", "gg");
addUnitAlias("isoWeekYear", "GG");
addUnitPriority("weekYear", 1);
addUnitPriority("isoWeekYear", 1);
addRegexToken("G", matchSigned);
addRegexToken("g", matchSigned);
addRegexToken("GG", match1to2, match2);
addRegexToken("gg", match1to2, match2);
addRegexToken("GGGG", match1to4, match4);
addRegexToken("gggg", match1to4, match4);
addRegexToken("GGGGG", match1to6, match6);
addRegexToken("ggggg", match1to6, match6);
addWeekParseToken(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(input, week, config, token2) {
    week[token2.substr(0, 2)] = toInt(input);
  }
);
addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
  week[token2] = hooks.parseTwoDigitYear(input);
});
function getSetWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function getSetISOWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function getISOWeeksInYear() {
  return weeksInYear(this.year(), 1, 4);
}
function getISOWeeksInISOWeekYear() {
  return weeksInYear(this.isoWeekYear(), 1, 4);
}
function getWeeksInYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}
function getWeeksInWeekYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
}
function getSetWeekYearHelper(input, week, weekday, dow, doy) {
  var weeksTarget;
  if (input == null) {
    return weekOfYear(this, dow, doy).year;
  } else {
    weeksTarget = weeksInYear(input, dow, doy);
    if (week > weeksTarget) {
      week = weeksTarget;
    }
    return setWeekAll.call(this, input, week, weekday, dow, doy);
  }
}
function setWeekAll(weekYear, week, weekday, dow, doy) {
  var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  this.year(date.getUTCFullYear());
  this.month(date.getUTCMonth());
  this.date(date.getUTCDate());
  return this;
}
addFormatToken("Q", 0, "Qo", "quarter");
addUnitAlias("quarter", "Q");
addUnitPriority("quarter", 7);
addRegexToken("Q", match1);
addParseToken("Q", function(input, array) {
  array[MONTH] = (toInt(input) - 1) * 3;
});
function getSetQuarter(input) {
  return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
addFormatToken("D", ["DD", 2], "Do", "date");
addUnitAlias("date", "D");
addUnitPriority("date", 9);
addRegexToken("D", match1to2);
addRegexToken("DD", match1to2, match2);
addRegexToken("Do", function(isStrict, locale2) {
  return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
});
addParseToken(["D", "DD"], DATE);
addParseToken("Do", function(input, array) {
  array[DATE] = toInt(input.match(match1to2)[0]);
});
var getSetDayOfMonth = makeGetSet("Date", true);
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
addUnitAlias("dayOfYear", "DDD");
addUnitPriority("dayOfYear", 4);
addRegexToken("DDD", match1to3);
addRegexToken("DDDD", match3);
addParseToken(["DDD", "DDDD"], function(input, array, config) {
  config._dayOfYear = toInt(input);
});
function getSetDayOfYear(input) {
  var dayOfYear = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
}
addFormatToken("m", ["mm", 2], 0, "minute");
addUnitAlias("minute", "m");
addUnitPriority("minute", 14);
addRegexToken("m", match1to2);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", false);
addFormatToken("s", ["ss", 2], 0, "second");
addUnitAlias("second", "s");
addUnitPriority("second", 15);
addRegexToken("s", match1to2);
addRegexToken("ss", match1to2, match2);
addParseToken(["s", "ss"], SECOND);
var getSetSecond = makeGetSet("Seconds", false);
addFormatToken("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
addFormatToken(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
addFormatToken(0, ["SSS", 3], 0, "millisecond");
addFormatToken(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
addFormatToken(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
addFormatToken(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
addFormatToken(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
addUnitAlias("millisecond", "ms");
addUnitPriority("millisecond", 16);
addRegexToken("S", match1to3, match1);
addRegexToken("SS", match1to3, match2);
addRegexToken("SSS", match1to3, match3);
var token, getSetMillisecond;
for (token = "SSSS"; token.length <= 9; token += "S") {
  addRegexToken(token, matchUnsigned);
}
function parseMs(input, array) {
  array[MILLISECOND] = toInt(("0." + input) * 1e3);
}
for (token = "S"; token.length <= 9; token += "S") {
  addParseToken(token, parseMs);
}
getSetMillisecond = makeGetSet("Milliseconds", false);
addFormatToken("z", 0, 0, "zoneAbbr");
addFormatToken("zz", 0, 0, "zoneName");
function getZoneAbbr() {
  return this._isUTC ? "UTC" : "";
}
function getZoneName() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var proto = Moment.prototype;
proto.add = add;
proto.calendar = calendar$1;
proto.clone = clone;
proto.diff = diff;
proto.endOf = endOf;
proto.format = format;
proto.from = from;
proto.fromNow = fromNow;
proto.to = to;
proto.toNow = toNow;
proto.get = stringGet;
proto.invalidAt = invalidAt;
proto.isAfter = isAfter;
proto.isBefore = isBefore;
proto.isBetween = isBetween;
proto.isSame = isSame;
proto.isSameOrAfter = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid = isValid$2;
proto.lang = lang;
proto.locale = locale;
proto.localeData = localeData;
proto.max = prototypeMax;
proto.min = prototypeMin;
proto.parsingFlags = parsingFlags;
proto.set = stringSet;
proto.startOf = startOf;
proto.subtract = subtract;
proto.toArray = toArray;
proto.toObject = toObject;
proto.toDate = toDate;
proto.toISOString = toISOString;
proto.inspect = inspect;
if (typeof Symbol !== "undefined" && Symbol.for != null) {
  proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
    return "Moment<" + this.format() + ">";
  };
}
proto.toJSON = toJSON;
proto.toString = toString;
proto.unix = unix;
proto.valueOf = valueOf;
proto.creationData = creationData;
proto.eraName = getEraName;
proto.eraNarrow = getEraNarrow;
proto.eraAbbr = getEraAbbr;
proto.eraYear = getEraYear;
proto.year = getSetYear;
proto.isLeapYear = getIsLeapYear;
proto.weekYear = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;
proto.quarter = proto.quarters = getSetQuarter;
proto.month = getSetMonth;
proto.daysInMonth = getDaysInMonth;
proto.week = proto.weeks = getSetWeek;
proto.isoWeek = proto.isoWeeks = getSetISOWeek;
proto.weeksInYear = getWeeksInYear;
proto.weeksInWeekYear = getWeeksInWeekYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
proto.date = getSetDayOfMonth;
proto.day = proto.days = getSetDayOfWeek;
proto.weekday = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear = getSetDayOfYear;
proto.hour = proto.hours = getSetHour;
proto.minute = proto.minutes = getSetMinute;
proto.second = proto.seconds = getSetSecond;
proto.millisecond = proto.milliseconds = getSetMillisecond;
proto.utcOffset = getSetOffset;
proto.utc = setOffsetToUTC;
proto.local = setOffsetToLocal;
proto.parseZone = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST = isDaylightSavingTime;
proto.isLocal = isLocal;
proto.isUtcOffset = isUtcOffset;
proto.isUtc = isUtc;
proto.isUTC = isUtc;
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;
proto.dates = deprecate(
  "dates accessor is deprecated. Use date instead.",
  getSetDayOfMonth
);
proto.months = deprecate(
  "months accessor is deprecated. Use month instead",
  getSetMonth
);
proto.years = deprecate(
  "years accessor is deprecated. Use year instead",
  getSetYear
);
proto.zone = deprecate(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  getSetZone
);
proto.isDSTShifted = deprecate(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  isDaylightSavingTimeShifted
);
function createUnix(input) {
  return createLocal(input * 1e3);
}
function createInZone() {
  return createLocal.apply(null, arguments).parseZone();
}
function preParsePostFormat(string) {
  return string;
}
var proto$1 = Locale.prototype;
proto$1.calendar = calendar;
proto$1.longDateFormat = longDateFormat;
proto$1.invalidDate = invalidDate;
proto$1.ordinal = ordinal;
proto$1.preparse = preParsePostFormat;
proto$1.postformat = preParsePostFormat;
proto$1.relativeTime = relativeTime;
proto$1.pastFuture = pastFuture;
proto$1.set = set;
proto$1.eras = localeEras;
proto$1.erasParse = localeErasParse;
proto$1.erasConvertYear = localeErasConvertYear;
proto$1.erasAbbrRegex = erasAbbrRegex;
proto$1.erasNameRegex = erasNameRegex;
proto$1.erasNarrowRegex = erasNarrowRegex;
proto$1.months = localeMonths;
proto$1.monthsShort = localeMonthsShort;
proto$1.monthsParse = localeMonthsParse;
proto$1.monthsRegex = monthsRegex;
proto$1.monthsShortRegex = monthsShortRegex;
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;
proto$1.weekdays = localeWeekdays;
proto$1.weekdaysMin = localeWeekdaysMin;
proto$1.weekdaysShort = localeWeekdaysShort;
proto$1.weekdaysParse = localeWeekdaysParse;
proto$1.weekdaysRegex = weekdaysRegex;
proto$1.weekdaysShortRegex = weekdaysShortRegex;
proto$1.weekdaysMinRegex = weekdaysMinRegex;
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;
function get$1(format2, index2, field, setter) {
  var locale2 = getLocale(), utc2 = createUTC().set(setter, index2);
  return locale2[field](utc2, format2);
}
function listMonthsImpl(format2, index2, field) {
  if (isNumber(format2)) {
    index2 = format2;
    format2 = void 0;
  }
  format2 = format2 || "";
  if (index2 != null) {
    return get$1(format2, index2, field, "month");
  }
  var i2, out = [];
  for (i2 = 0; i2 < 12; i2++) {
    out[i2] = get$1(format2, i2, field, "month");
  }
  return out;
}
function listWeekdaysImpl(localeSorted, format2, index2, field) {
  if (typeof localeSorted === "boolean") {
    if (isNumber(format2)) {
      index2 = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  } else {
    format2 = localeSorted;
    index2 = format2;
    localeSorted = false;
    if (isNumber(format2)) {
      index2 = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  }
  var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i2, out = [];
  if (index2 != null) {
    return get$1(format2, (index2 + shift) % 7, field, "day");
  }
  for (i2 = 0; i2 < 7; i2++) {
    out[i2] = get$1(format2, (i2 + shift) % 7, field, "day");
  }
  return out;
}
function listMonths(format2, index2) {
  return listMonthsImpl(format2, index2, "months");
}
function listMonthsShort(format2, index2) {
  return listMonthsImpl(format2, index2, "monthsShort");
}
function listWeekdays(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdays");
}
function listWeekdaysShort(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysShort");
}
function listWeekdaysMin(localeSorted, format2, index2) {
  return listWeekdaysImpl(localeSorted, format2, index2, "weekdaysMin");
}
getSetGlobalLocale("en", {
  eras: [
    {
      since: "0001-01-01",
      until: Infinity,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -Infinity,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(number) {
    var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }
});
hooks.lang = deprecate(
  "moment.lang is deprecated. Use moment.locale instead.",
  getSetGlobalLocale
);
hooks.langData = deprecate(
  "moment.langData is deprecated. Use moment.localeData instead.",
  getLocale
);
var mathAbs = Math.abs;
function abs() {
  var data = this._data;
  this._milliseconds = mathAbs(this._milliseconds);
  this._days = mathAbs(this._days);
  this._months = mathAbs(this._months);
  data.milliseconds = mathAbs(data.milliseconds);
  data.seconds = mathAbs(data.seconds);
  data.minutes = mathAbs(data.minutes);
  data.hours = mathAbs(data.hours);
  data.months = mathAbs(data.months);
  data.years = mathAbs(data.years);
  return this;
}
function addSubtract$1(duration, input, value, direction) {
  var other = createDuration(input, value);
  duration._milliseconds += direction * other._milliseconds;
  duration._days += direction * other._days;
  duration._months += direction * other._months;
  return duration._bubble();
}
function add$1(input, value) {
  return addSubtract$1(this, input, value, 1);
}
function subtract$1(input, value) {
  return addSubtract$1(this, input, value, -1);
}
function absCeil(number) {
  if (number < 0) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
}
function bubble() {
  var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
  if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
    milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
    days2 = 0;
    months2 = 0;
  }
  data.milliseconds = milliseconds2 % 1e3;
  seconds2 = absFloor(milliseconds2 / 1e3);
  data.seconds = seconds2 % 60;
  minutes2 = absFloor(seconds2 / 60);
  data.minutes = minutes2 % 60;
  hours2 = absFloor(minutes2 / 60);
  data.hours = hours2 % 24;
  days2 += absFloor(hours2 / 24);
  monthsFromDays = absFloor(daysToMonths(days2));
  months2 += monthsFromDays;
  days2 -= absCeil(monthsToDays(monthsFromDays));
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  data.days = days2;
  data.months = months2;
  data.years = years2;
  return this;
}
function daysToMonths(days2) {
  return days2 * 4800 / 146097;
}
function monthsToDays(months2) {
  return months2 * 146097 / 4800;
}
function as(units) {
  if (!this.isValid()) {
    return NaN;
  }
  var days2, months2, milliseconds2 = this._milliseconds;
  units = normalizeUnits(units);
  if (units === "month" || units === "quarter" || units === "year") {
    days2 = this._days + milliseconds2 / 864e5;
    months2 = this._months + daysToMonths(days2);
    switch (units) {
      case "month":
        return months2;
      case "quarter":
        return months2 / 3;
      case "year":
        return months2 / 12;
    }
  } else {
    days2 = this._days + Math.round(monthsToDays(this._months));
    switch (units) {
      case "week":
        return days2 / 7 + milliseconds2 / 6048e5;
      case "day":
        return days2 + milliseconds2 / 864e5;
      case "hour":
        return days2 * 24 + milliseconds2 / 36e5;
      case "minute":
        return days2 * 1440 + milliseconds2 / 6e4;
      case "second":
        return days2 * 86400 + milliseconds2 / 1e3;
      case "millisecond":
        return Math.floor(days2 * 864e5) + milliseconds2;
      default:
        throw new Error("Unknown unit " + units);
    }
  }
}
function valueOf$1() {
  if (!this.isValid()) {
    return NaN;
  }
  return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
}
function makeAs(alias) {
  return function() {
    return this.as(alias);
  };
}
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
function clone$1() {
  return createDuration(this);
}
function get$2(units) {
  units = normalizeUnits(units);
  return this.isValid() ? this[units + "s"]() : NaN;
}
function makeGetter(name) {
  return function() {
    return this.isValid() ? this._data[name] : NaN;
  };
}
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() {
  return absFloor(this.days() / 7);
}
var round = Math.round, thresholds = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
  return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
  var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
  if (thresholds2.w != null) {
    a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
  }
  a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
  a[2] = withoutSuffix;
  a[3] = +posNegDuration > 0;
  a[4] = locale2;
  return substituteTimeAgo.apply(null, a);
}
function getSetRelativeTimeRounding(roundingFunction) {
  if (roundingFunction === void 0) {
    return round;
  }
  if (typeof roundingFunction === "function") {
    round = roundingFunction;
    return true;
  }
  return false;
}
function getSetRelativeTimeThreshold(threshold, limit) {
  if (thresholds[threshold] === void 0) {
    return false;
  }
  if (limit === void 0) {
    return thresholds[threshold];
  }
  thresholds[threshold] = limit;
  if (threshold === "s") {
    thresholds.ss = limit - 1;
  }
  return true;
}
function humanize(argWithSuffix, argThresholds) {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var withSuffix = false, th = thresholds, locale2, output;
  if (typeof argWithSuffix === "object") {
    argThresholds = argWithSuffix;
    argWithSuffix = false;
  }
  if (typeof argWithSuffix === "boolean") {
    withSuffix = argWithSuffix;
  }
  if (typeof argThresholds === "object") {
    th = Object.assign({}, thresholds, argThresholds);
    if (argThresholds.s != null && argThresholds.ss == null) {
      th.ss = argThresholds.s - 1;
    }
  }
  locale2 = this.localeData();
  output = relativeTime$1(this, !withSuffix, th, locale2);
  if (withSuffix) {
    output = locale2.pastFuture(+this, output);
  }
  return locale2.postformat(output);
}
var abs$1 = Math.abs;
function sign(x) {
  return (x > 0) - (x < 0) || +x;
}
function toISOString$1() {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s2, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
  if (!total) {
    return "P0D";
  }
  minutes2 = absFloor(seconds2 / 60);
  hours2 = absFloor(minutes2 / 60);
  seconds2 %= 60;
  minutes2 %= 60;
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  s2 = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
  totalSign = total < 0 ? "-" : "";
  ymSign = sign(this._months) !== sign(total) ? "-" : "";
  daysSign = sign(this._days) !== sign(total) ? "-" : "";
  hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
  return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s2 + "S" : "");
}
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1;
proto$2.abs = abs;
proto$2.add = add$1;
proto$2.subtract = subtract$1;
proto$2.as = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds = asSeconds;
proto$2.asMinutes = asMinutes;
proto$2.asHours = asHours;
proto$2.asDays = asDays;
proto$2.asWeeks = asWeeks;
proto$2.asMonths = asMonths;
proto$2.asQuarters = asQuarters;
proto$2.asYears = asYears;
proto$2.valueOf = valueOf$1;
proto$2._bubble = bubble;
proto$2.clone = clone$1;
proto$2.get = get$2;
proto$2.milliseconds = milliseconds;
proto$2.seconds = seconds;
proto$2.minutes = minutes;
proto$2.hours = hours;
proto$2.days = days;
proto$2.weeks = weeks;
proto$2.months = months;
proto$2.years = years;
proto$2.humanize = humanize;
proto$2.toISOString = toISOString$1;
proto$2.toString = toISOString$1;
proto$2.toJSON = toISOString$1;
proto$2.locale = locale;
proto$2.localeData = localeData;
proto$2.toIsoString = deprecate(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  toISOString$1
);
proto$2.lang = lang;
addFormatToken("X", 0, 0, "unix");
addFormatToken("x", 0, 0, "valueOf");
addRegexToken("x", matchSigned);
addRegexToken("X", matchTimestamp);
addParseToken("X", function(input, array, config) {
  config._d = new Date(parseFloat(input) * 1e3);
});
addParseToken("x", function(input, array, config) {
  config._d = new Date(toInt(input));
});
//! moment.js
hooks.version = "2.29.4";
setHookCallback(createLocal);
hooks.fn = proto;
hooks.min = min;
hooks.max = max;
hooks.now = now;
hooks.utc = createUTC;
hooks.unix = createUnix;
hooks.months = listMonths;
hooks.isDate = isDate;
hooks.locale = getSetGlobalLocale;
hooks.invalid = createInvalid;
hooks.duration = createDuration;
hooks.isMoment = isMoment;
hooks.weekdays = listWeekdays;
hooks.parseZone = createInZone;
hooks.localeData = getLocale;
hooks.isDuration = isDuration;
hooks.monthsShort = listMonthsShort;
hooks.weekdaysMin = listWeekdaysMin;
hooks.defineLocale = defineLocale;
hooks.updateLocale = updateLocale;
hooks.locales = listLocales;
hooks.weekdaysShort = listWeekdaysShort;
hooks.normalizeUnits = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat = getCalendarFormat;
hooks.prototype = proto;
hooks.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */
var storeKey = "store";
function forEachValue(obj2, fn) {
  Object.keys(obj2).forEach(function(key2) {
    return fn(obj2[key2], key2);
  });
}
function isObject(obj2) {
  return obj2 !== null && typeof obj2 === "object";
}
function isPromise(val) {
  return val && typeof val.then === "function";
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error("[vuex] " + msg);
  }
}
function partial(fn, arg) {
  return function() {
    return fn(arg);
  };
}
function genericSubscribe(fn, subs, options2) {
  if (subs.indexOf(fn) < 0) {
    options2 && options2.prepend ? subs.unshift(fn) : subs.push(fn);
  }
  return function() {
    var i2 = subs.indexOf(fn);
    if (i2 > -1) {
      subs.splice(i2, 1);
    }
  };
}
function resetStore(store, hot) {
  store._actions = /* @__PURE__ */ Object.create(null);
  store._mutations = /* @__PURE__ */ Object.create(null);
  store._wrappedGetters = /* @__PURE__ */ Object.create(null);
  store._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var state = store.state;
  installModule(store, state, [], store._modules.root, true);
  resetStoreState(store, state, hot);
}
function resetStoreState(store, state, hot) {
  var oldState = store._state;
  var oldScope = store._scope;
  store.getters = {};
  store._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computedObj = {};
  var computedCache = {};
  var scope = effectScope(true);
  scope.run(function() {
    forEachValue(wrappedGetters, function(fn, key2) {
      computedObj[key2] = partial(fn, store);
      computedCache[key2] = computed(function() {
        return computedObj[key2]();
      });
      Object.defineProperty(store.getters, key2, {
        get: function() {
          return computedCache[key2].value;
        },
        enumerable: true
        // for local getters
      });
    });
  });
  store._state = reactive({
    data: state
  });
  store._scope = scope;
  if (store.strict) {
    enableStrictMode(store);
  }
  if (oldState) {
    if (hot) {
      store._withCommit(function() {
        oldState.data = null;
      });
    }
  }
  if (oldScope) {
    oldScope.stop();
  }
}
function installModule(store, rootState, path, module2, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);
  if (module2.namespaced) {
    if (store._modulesNamespaceMap[namespace] && true) {
      console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
    }
    store._modulesNamespaceMap[namespace] = module2;
  }
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function() {
      {
        if (moduleName in parentState) {
          console.warn(
            '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
          );
        }
      }
      parentState[moduleName] = module2.state;
    });
  }
  var local = module2.context = makeLocalContext(store, namespace, path);
  module2.forEachMutation(function(mutation, key2) {
    var namespacedType = namespace + key2;
    registerMutation(store, namespacedType, mutation, local);
  });
  module2.forEachAction(function(action, key2) {
    var type = action.root ? key2 : namespace + key2;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });
  module2.forEachGetter(function(getter, key2) {
    var namespacedType = namespace + key2;
    registerGetter(store, namespacedType, getter, local);
  });
  module2.forEachChild(function(child, key2) {
    installModule(store, rootState, path.concat(key2), child, hot);
  });
}
function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === "";
  var local = {
    dispatch: noNamespace ? store.dispatch : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options2 = args.options;
      var type = args.type;
      if (!options2 || !options2.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }
      return store.dispatch(type, payload);
    },
    commit: noNamespace ? store.commit : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options2 = args.options;
      var type = args.type;
      if (!options2 || !options2.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }
      store.commit(type, payload, options2);
    }
  };
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function() {
        return store.getters;
      } : function() {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function() {
        return getNestedState(store.state, path);
      }
    }
  });
  return local;
}
function makeLocalGetters(store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function(type) {
      if (type.slice(0, splitPos) !== namespace) {
        return;
      }
      var localType = type.slice(splitPos);
      Object.defineProperty(gettersProxy, localType, {
        get: function() {
          return store.getters[type];
        },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }
  return store._makeLocalGettersCache[namespace];
}
function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}
function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function(err) {
        store._devtoolHook.emit("vuex:error", err);
        throw err;
      });
    } else {
      return res;
    }
  });
}
function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    {
      console.error("[vuex] duplicate getter key: " + type);
    }
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store2) {
    return rawGetter(
      local.state,
      // local state
      local.getters,
      // local getters
      store2.state,
      // root state
      store2.getters
      // root getters
    );
  };
}
function enableStrictMode(store) {
  watch(function() {
    return store._state.data;
  }, function() {
    {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, flush: "sync" });
}
function getNestedState(state, path) {
  return path.reduce(function(state2, key2) {
    return state2[key2];
  }, state);
}
function unifyObjectStyle(type, payload, options2) {
  if (isObject(type) && type.type) {
    options2 = payload;
    payload = type;
    type = type.type;
  }
  {
    assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
  }
  return { type, payload, options: options2 };
}
var Module = function Module2(rawModule, runtime) {
  this.runtime = runtime;
  this._children = /* @__PURE__ */ Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
};
var prototypeAccessors$1 = { namespaced: { configurable: true } };
prototypeAccessors$1.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
Module.prototype.addChild = function addChild(key2, module2) {
  this._children[key2] = module2;
};
Module.prototype.removeChild = function removeChild(key2) {
  delete this._children[key2];
};
Module.prototype.getChild = function getChild(key2) {
  return this._children[key2];
};
Module.prototype.hasChild = function hasChild(key2) {
  return key2 in this._children;
};
Module.prototype.update = function update2(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};
Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};
Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};
Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};
Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};
Object.defineProperties(Module.prototype, prototypeAccessors$1);
var ModuleCollection = function ModuleCollection2(rawRootModule) {
  this.register([], rawRootModule, false);
};
ModuleCollection.prototype.get = function get2(path) {
  return path.reduce(function(module2, key2) {
    return module2.getChild(key2);
  }, this.root);
};
ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module2 = this.root;
  return path.reduce(function(namespace, key2) {
    module2 = module2.getChild(key2);
    return namespace + (module2.namespaced ? key2 + "/" : "");
  }, "");
};
ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update([], this.root, rawRootModule);
};
ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1$1 = this;
  if (runtime === void 0)
    runtime = true;
  {
    assertRawModule(path, rawModule);
  }
  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function(rawChildModule, key2) {
      this$1$1.register(path.concat(key2), rawChildModule, runtime);
    });
  }
};
ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key2 = path[path.length - 1];
  var child = parent.getChild(key2);
  if (!child) {
    {
      console.warn(
        "[vuex] trying to unregister module '" + key2 + "', which is not registered"
      );
    }
    return;
  }
  if (!child.runtime) {
    return;
  }
  parent.removeChild(key2);
};
ModuleCollection.prototype.isRegistered = function isRegistered(path) {
  var parent = this.get(path.slice(0, -1));
  var key2 = path[path.length - 1];
  if (parent) {
    return parent.hasChild(key2);
  }
  return false;
};
function update(path, targetModule, newModule) {
  {
    assertRawModule(path, newModule);
  }
  targetModule.update(newModule);
  if (newModule.modules) {
    for (var key2 in newModule.modules) {
      if (!targetModule.getChild(key2)) {
        {
          console.warn(
            "[vuex] trying to add a new module '" + key2 + "' on hot reloading, manual reload is needed"
          );
        }
        return;
      }
      update(
        path.concat(key2),
        targetModule.getChild(key2),
        newModule.modules[key2]
      );
    }
  }
}
var functionAssert = {
  assert: function(value) {
    return typeof value === "function";
  },
  expected: "function"
};
var objectAssert = {
  assert: function(value) {
    return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
  },
  expected: 'function or object with "handler" function'
};
var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};
function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach(function(key2) {
    if (!rawModule[key2]) {
      return;
    }
    var assertOptions = assertTypes[key2];
    forEachValue(rawModule[key2], function(value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key2, type, value, assertOptions.expected)
      );
    });
  });
}
function makeAssertionMessage(path, key2, type, value, expected) {
  var buf = key2 + " should be " + expected + ' but "' + key2 + "." + type + '"';
  if (path.length > 0) {
    buf += ' in module "' + path.join(".") + '"';
  }
  buf += " is " + JSON.stringify(value) + ".";
  return buf;
}
var Store = function Store2(options2) {
  var this$1$1 = this;
  if (options2 === void 0)
    options2 = {};
  {
    assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store2, "store must be called with the new operator.");
  }
  var plugins = options2.plugins;
  if (plugins === void 0)
    plugins = [];
  var strict = options2.strict;
  if (strict === void 0)
    strict = false;
  var devtools2 = options2.devtools;
  this._committing = false;
  this._actions = /* @__PURE__ */ Object.create(null);
  this._actionSubscribers = [];
  this._mutations = /* @__PURE__ */ Object.create(null);
  this._wrappedGetters = /* @__PURE__ */ Object.create(null);
  this._modules = new ModuleCollection(options2);
  this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  this._subscribers = [];
  this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  this._scope = null;
  this._devtools = devtools2;
  var store = this;
  var ref2 = this;
  var dispatch2 = ref2.dispatch;
  var commit2 = ref2.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch2.call(store, type, payload);
  };
  this.commit = function boundCommit(type, payload, options3) {
    return commit2.call(store, type, payload, options3);
  };
  this.strict = strict;
  var state = this._modules.root.state;
  installModule(this, state, [], this._modules.root);
  resetStoreState(this, state);
  plugins.forEach(function(plugin2) {
    return plugin2(this$1$1);
  });
};
var prototypeAccessors = { state: { configurable: true } };
Store.prototype.install = function install(app, injectKey) {
  app.provide(injectKey || storeKey, this);
  app.config.globalProperties.$store = this;
  this._devtools !== void 0 ? this._devtools : true;
};
prototypeAccessors.state.get = function() {
  return this._state.data;
};
prototypeAccessors.state.set = function(v) {
  {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};
Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload, _options);
  var type = ref2.type;
  var payload = ref2.payload;
  var options2 = ref2.options;
  var mutation = { type, payload };
  var entry = this._mutations[type];
  if (!entry) {
    {
      console.error("[vuex] unknown mutation type: " + type);
    }
    return;
  }
  this._withCommit(function() {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.slice().forEach(function(sub) {
    return sub(mutation, this$1$1.state);
  });
  if (options2 && options2.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
    );
  }
};
Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload);
  var type = ref2.type;
  var payload = ref2.payload;
  var action = { type, payload };
  var entry = this._actions[type];
  if (!entry) {
    {
      console.error("[vuex] unknown action type: " + type);
    }
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(sub) {
      return sub.before;
    }).forEach(function(sub) {
      return sub.before(action, this$1$1.state);
    });
  } catch (e2) {
    {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e2);
    }
  }
  var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
    return handler(payload);
  })) : entry[0](payload);
  return new Promise(function(resolve2, reject) {
    result.then(function(res) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.after;
        }).forEach(function(sub) {
          return sub.after(action, this$1$1.state);
        });
      } catch (e2) {
        {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e2);
        }
      }
      resolve2(res);
    }, function(error) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.error;
        }).forEach(function(sub) {
          return sub.error(action, this$1$1.state, error);
        });
      } catch (e2) {
        {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e2);
        }
      }
      reject(error);
    });
  });
};
Store.prototype.subscribe = function subscribe(fn, options2) {
  return genericSubscribe(fn, this._subscribers, options2);
};
Store.prototype.subscribeAction = function subscribeAction(fn, options2) {
  var subs = typeof fn === "function" ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options2);
};
Store.prototype.watch = function watch$1(getter, cb, options2) {
  var this$1$1 = this;
  {
    assert(typeof getter === "function", "store.watch only accepts a function.");
  }
  return watch(function() {
    return getter(this$1$1.state, this$1$1.getters);
  }, cb, Object.assign({}, options2));
};
Store.prototype.replaceState = function replaceState(state) {
  var this$1$1 = this;
  this._withCommit(function() {
    this$1$1._state.data = state;
  });
};
Store.prototype.registerModule = function registerModule(path, rawModule, options2) {
  if (options2 === void 0)
    options2 = {};
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, "cannot register the root module by using registerModule.");
  }
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options2.preserveState);
  resetStoreState(this, this.state);
};
Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1$1 = this;
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }
  this._modules.unregister(path);
  this._withCommit(function() {
    var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
    delete parentState[path[path.length - 1]];
  });
  resetStore(this);
};
Store.prototype.hasModule = function hasModule(path) {
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }
  return this._modules.isRegistered(path);
};
Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};
Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};
Object.defineProperties(Store.prototype, prototypeAccessors);
exports.CryptoJS = CryptoJS;
exports.JSEncrypt = JSEncrypt;
exports.Mockjs = Mockjs;
exports._export_sfc = _export_sfc;
exports.api = api;
exports.computed = computed;
exports.createSSRApp = createSSRApp;
exports.dayjs = dayjs;
exports.defineComponent = defineComponent;
exports.e = e;
exports.f = f;
exports.hooks = hooks;
exports.index = index;
exports.isRef = isRef;
exports.lib = lib;
exports.n = n;
exports.o = o;
exports.onMounted = onMounted;
exports.onUpdated = onUpdated;
exports.p = p;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s;
exports.t = t$1;
exports.unref = unref;
exports.useCssVars = useCssVars;
exports.version = version$1;
exports.watch = watch;
