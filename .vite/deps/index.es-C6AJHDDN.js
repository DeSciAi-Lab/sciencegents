import "./chunk-FYS4FHAD.js";
import {
  LruMap,
  checksumAddress,
  defineFormatter,
  hexToBigInt,
  hexToNumber,
  isHex,
  keccak256,
  numberToHex,
  toHex
} from "./chunk-TEHE3LLO.js";
import {
  require_buffer,
  require_inherits_browser
} from "./chunk-5VHUUPRP.js";
import {
  require_events
} from "./chunk-A4GMWHWS.js";
import "./chunk-4JB4Q5MT.js";
import "./chunk-LNHBLBI5.js";
import {
  keccak_256
} from "./chunk-KRQMJTXE.js";
import "./chunk-MH4SXD7W.js";
import "./chunk-LEJNOBVI.js";
import {
  __commonJS,
  __esm,
  __export,
  __reExport,
  __toCommonJS,
  __toESM
} from "./chunk-4CFW2BUT.js";

// node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __read: () => __read,
  __rest: () => __rest,
  __spread: () => __spread,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values
});
function __extends(d6, b6) {
  extendStatics(d6, b6);
  function __() {
    this.constructor = d6;
  }
  d6.prototype = b6 === null ? Object.create(b6) : (__.prototype = b6.prototype, new __());
}
function __rest(s3, e2) {
  var t = {};
  for (var p6 in s3) if (Object.prototype.hasOwnProperty.call(s3, p6) && e2.indexOf(p6) < 0)
    t[p6] = s3[p6];
  if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i4 = 0, p6 = Object.getOwnPropertySymbols(s3); i4 < p6.length; i4++) {
      if (e2.indexOf(p6[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p6[i4]))
        t[p6[i4]] = s3[p6[i4]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c7 = arguments.length, r3 = c7 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d6;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
  else for (var i4 = decorators.length - 1; i4 >= 0; i4--) if (d6 = decorators[i4]) r3 = (c7 < 3 ? d6(r3) : c7 > 3 ? d6(target, key, r3) : d6(target, key)) || r3;
  return c7 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P7, generator) {
  function adopt(value) {
    return value instanceof P7 ? value : new P7(function(resolve) {
      resolve(value);
    });
  }
  return new (P7 || (P7 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _5 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f6, y7, t, g6;
  return g6 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g6[Symbol.iterator] = function() {
    return this;
  }), g6;
  function verb(n5) {
    return function(v8) {
      return step([n5, v8]);
    };
  }
  function step(op) {
    if (f6) throw new TypeError("Generator is already executing.");
    while (_5) try {
      if (f6 = 1, y7 && (t = op[0] & 2 ? y7["return"] : op[0] ? y7["throw"] || ((t = y7["return"]) && t.call(y7), 0) : y7.next) && !(t = t.call(y7, op[1])).done) return t;
      if (y7 = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _5.label++;
          return { value: op[1], done: false };
        case 5:
          _5.label++;
          y7 = op[1];
          op = [0];
          continue;
        case 7:
          op = _5.ops.pop();
          _5.trys.pop();
          continue;
        default:
          if (!(t = _5.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _5 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _5.label = op[1];
            break;
          }
          if (op[0] === 6 && _5.label < t[1]) {
            _5.label = t[1];
            t = op;
            break;
          }
          if (t && _5.label < t[2]) {
            _5.label = t[2];
            _5.ops.push(op);
            break;
          }
          if (t[2]) _5.ops.pop();
          _5.trys.pop();
          continue;
      }
      op = body.call(thisArg, _5);
    } catch (e2) {
      op = [6, e2];
      y7 = 0;
    } finally {
      f6 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding(o7, m5, k7, k22) {
  if (k22 === void 0) k22 = k7;
  o7[k22] = m5[k7];
}
function __exportStar(m5, exports) {
  for (var p6 in m5) if (p6 !== "default" && !exports.hasOwnProperty(p6)) exports[p6] = m5[p6];
}
function __values(o7) {
  var s3 = typeof Symbol === "function" && Symbol.iterator, m5 = s3 && o7[s3], i4 = 0;
  if (m5) return m5.call(o7);
  if (o7 && typeof o7.length === "number") return {
    next: function() {
      if (o7 && i4 >= o7.length) o7 = void 0;
      return { value: o7 && o7[i4++], done: !o7 };
    }
  };
  throw new TypeError(s3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o7, n5) {
  var m5 = typeof Symbol === "function" && o7[Symbol.iterator];
  if (!m5) return o7;
  var i4 = m5.call(o7), r3, ar4 = [], e2;
  try {
    while ((n5 === void 0 || n5-- > 0) && !(r3 = i4.next()).done) ar4.push(r3.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r3 && !r3.done && (m5 = i4["return"])) m5.call(i4);
    } finally {
      if (e2) throw e2.error;
    }
  }
  return ar4;
}
function __spread() {
  for (var ar4 = [], i4 = 0; i4 < arguments.length; i4++)
    ar4 = ar4.concat(__read(arguments[i4]));
  return ar4;
}
function __spreadArrays() {
  for (var s3 = 0, i4 = 0, il = arguments.length; i4 < il; i4++) s3 += arguments[i4].length;
  for (var r3 = Array(s3), k7 = 0, i4 = 0; i4 < il; i4++)
    for (var a3 = arguments[i4], j5 = 0, jl = a3.length; j5 < jl; j5++, k7++)
      r3[k7] = a3[j5];
  return r3;
}
function __await(v8) {
  return this instanceof __await ? (this.v = v8, this) : new __await(v8);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g6 = generator.apply(thisArg, _arguments || []), i4, q3 = [];
  return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4;
  function verb(n5) {
    if (g6[n5]) i4[n5] = function(v8) {
      return new Promise(function(a3, b6) {
        q3.push([n5, v8, a3, b6]) > 1 || resume(n5, v8);
      });
    };
  }
  function resume(n5, v8) {
    try {
      step(g6[n5](v8));
    } catch (e2) {
      settle(q3[0][3], e2);
    }
  }
  function step(r3) {
    r3.value instanceof __await ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q3[0][2], r3);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f6, v8) {
    if (f6(v8), q3.shift(), q3.length) resume(q3[0][0], q3[0][1]);
  }
}
function __asyncDelegator(o7) {
  var i4, p6;
  return i4 = {}, verb("next"), verb("throw", function(e2) {
    throw e2;
  }), verb("return"), i4[Symbol.iterator] = function() {
    return this;
  }, i4;
  function verb(n5, f6) {
    i4[n5] = o7[n5] ? function(v8) {
      return (p6 = !p6) ? { value: __await(o7[n5](v8)), done: n5 === "return" } : f6 ? f6(v8) : v8;
    } : f6;
  }
}
function __asyncValues(o7) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m5 = o7[Symbol.asyncIterator], i4;
  return m5 ? m5.call(o7) : (o7 = typeof __values === "function" ? __values(o7) : o7[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4);
  function verb(n5) {
    i4[n5] = o7[n5] && function(v8) {
      return new Promise(function(resolve, reject) {
        v8 = o7[n5](v8), settle(resolve, reject, v8.done, v8.value);
      });
    };
  }
  function settle(resolve, reject, d6, v8) {
    Promise.resolve(v8).then(function(v9) {
      resolve({ value: v9, done: d6 });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k7 in mod) if (Object.hasOwnProperty.call(mod, k7)) result[k7] = mod[k7];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics, __assign;
var init_tslib_es6 = __esm({
  "node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js"() {
    extendStatics = function(d6, b6) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d7, b7) {
        d7.__proto__ = b7;
      } || function(d7, b7) {
        for (var p6 in b7) if (b7.hasOwnProperty(p6)) d7[p6] = b7[p6];
      };
      return extendStatics(d6, b6);
    };
    __assign = function() {
      __assign = Object.assign || function __assign3(t) {
        for (var s3, i4 = 1, n5 = arguments.length; i4 < n5; i4++) {
          s3 = arguments[i4];
          for (var p6 in s3) if (Object.prototype.hasOwnProperty.call(s3, p6)) t[p6] = s3[p6];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/delay.js
var require_delay = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delay = void 0;
    function delay(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, timeout);
      });
    }
    exports.delay = delay;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/misc.js
var require_misc = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/misc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
    exports.ONE_HUNDRED = 100;
    exports.ONE_THOUSAND = 1e3;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/time.js
var require_time = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
    exports.ONE_SECOND = 1;
    exports.FIVE_SECONDS = 5;
    exports.TEN_SECONDS = 10;
    exports.THIRTY_SECONDS = 30;
    exports.SIXTY_SECONDS = 60;
    exports.ONE_MINUTE = exports.SIXTY_SECONDS;
    exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
    exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
    exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
    exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
    exports.ONE_HOUR = exports.SIXTY_MINUTES;
    exports.THREE_HOURS = exports.ONE_HOUR * 3;
    exports.SIX_HOURS = exports.ONE_HOUR * 6;
    exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
    exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
    exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
    exports.THREE_DAYS = exports.ONE_DAY * 3;
    exports.FIVE_DAYS = exports.ONE_DAY * 5;
    exports.SEVEN_DAYS = exports.ONE_DAY * 7;
    exports.THIRTY_DAYS = exports.ONE_DAY * 30;
    exports.ONE_WEEK = exports.SEVEN_DAYS;
    exports.TWO_WEEKS = exports.ONE_WEEK * 2;
    exports.THREE_WEEKS = exports.ONE_WEEK * 3;
    exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
    exports.ONE_YEAR = exports.ONE_DAY * 365;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/index.js
var require_constants = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_misc(), exports);
    tslib_1.__exportStar(require_time(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/convert.js
var require_convert = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/convert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromMiliseconds = exports.toMiliseconds = void 0;
    var constants_1 = require_constants();
    function toMiliseconds(seconds) {
      return seconds * constants_1.ONE_THOUSAND;
    }
    exports.toMiliseconds = toMiliseconds;
    function fromMiliseconds(miliseconds) {
      return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
    }
    exports.fromMiliseconds = fromMiliseconds;
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/index.js
var require_utils = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_delay(), exports);
    tslib_1.__exportStar(require_convert(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/watch.js
var require_watch = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Watch = void 0;
    var Watch = class {
      constructor() {
        this.timestamps = /* @__PURE__ */ new Map();
      }
      start(label) {
        if (this.timestamps.has(label)) {
          throw new Error(`Watch already started for label: ${label}`);
        }
        this.timestamps.set(label, { started: Date.now() });
      }
      stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") {
          throw new Error(`Watch already stopped for label: ${label}`);
        }
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, { started: timestamp.started, elapsed });
      }
      get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") {
          throw new Error(`No timestamp found for label: ${label}`);
        }
        return timestamp;
      }
      elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
      }
    };
    exports.Watch = Watch;
    exports.default = Watch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/watch.js
var require_watch2 = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IWatch = void 0;
    var IWatch = class {
    };
    exports.IWatch = IWatch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/index.js
var require_types = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_watch2(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_utils(), exports);
    tslib_1.__exportStar(require_watch(), exports);
    tslib_1.__exportStar(require_types(), exports);
    tslib_1.__exportStar(require_constants(), exports);
  }
});

// node_modules/@walletconnect/window-getters/dist/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/@walletconnect/window-getters/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
    function getFromWindow(name2) {
      let res = void 0;
      if (typeof window !== "undefined" && typeof window[name2] !== "undefined") {
        res = window[name2];
      }
      return res;
    }
    exports.getFromWindow = getFromWindow;
    function getFromWindowOrThrow(name2) {
      const res = getFromWindow(name2);
      if (!res) {
        throw new Error(`${name2} is not defined in Window`);
      }
      return res;
    }
    exports.getFromWindowOrThrow = getFromWindowOrThrow;
    function getDocumentOrThrow() {
      return getFromWindowOrThrow("document");
    }
    exports.getDocumentOrThrow = getDocumentOrThrow;
    function getDocument() {
      return getFromWindow("document");
    }
    exports.getDocument = getDocument;
    function getNavigatorOrThrow() {
      return getFromWindowOrThrow("navigator");
    }
    exports.getNavigatorOrThrow = getNavigatorOrThrow;
    function getNavigator() {
      return getFromWindow("navigator");
    }
    exports.getNavigator = getNavigator;
    function getLocationOrThrow() {
      return getFromWindowOrThrow("location");
    }
    exports.getLocationOrThrow = getLocationOrThrow;
    function getLocation() {
      return getFromWindow("location");
    }
    exports.getLocation = getLocation;
    function getCryptoOrThrow() {
      return getFromWindowOrThrow("crypto");
    }
    exports.getCryptoOrThrow = getCryptoOrThrow;
    function getCrypto() {
      return getFromWindow("crypto");
    }
    exports.getCrypto = getCrypto;
    function getLocalStorageOrThrow() {
      return getFromWindowOrThrow("localStorage");
    }
    exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
    function getLocalStorage() {
      return getFromWindow("localStorage");
    }
    exports.getLocalStorage = getLocalStorage;
  }
});

// node_modules/@walletconnect/window-metadata/dist/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/@walletconnect/window-metadata/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWindowMetadata = void 0;
    var window_getters_1 = require_cjs2();
    function getWindowMetadata() {
      let doc;
      let loc;
      try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
      } catch (e2) {
        return null;
      }
      function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons2 = [];
        for (let i4 = 0; i4 < links.length; i4++) {
          const link = links[i4];
          const rel = link.getAttribute("rel");
          if (rel) {
            if (rel.toLowerCase().indexOf("icon") > -1) {
              const href = link.getAttribute("href");
              if (href) {
                if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                  let absoluteHref = loc.protocol + "//" + loc.host;
                  if (href.indexOf("/") === 0) {
                    absoluteHref += href;
                  } else {
                    const path = loc.pathname.split("/");
                    path.pop();
                    const finalPath = path.join("/");
                    absoluteHref += finalPath + "/" + href;
                  }
                  icons2.push(absoluteHref);
                } else if (href.indexOf("//") === 0) {
                  const absoluteUrl = loc.protocol + href;
                  icons2.push(absoluteUrl);
                } else {
                  icons2.push(href);
                }
              }
            }
          }
        }
        return icons2;
      }
      function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for (let i4 = 0; i4 < metaTags.length; i4++) {
          const tag = metaTags[i4];
          const attributes = ["itemprop", "property", "name"].map((target) => tag.getAttribute(target)).filter((attr) => {
            if (attr) {
              return args.includes(attr);
            }
            return false;
          });
          if (attributes.length && attributes) {
            const content = tag.getAttribute("content");
            if (content) {
              return content;
            }
          }
        }
        return "";
      }
      function getName() {
        let name3 = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name3) {
          name3 = doc.title;
        }
        return name3;
      }
      function getDescription() {
        const description2 = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description2;
      }
      const name2 = getName();
      const description = getDescription();
      const url = loc.origin;
      const icons = getIcons();
      const meta = {
        description,
        url,
        icons,
        name: name2
      };
      return meta;
    }
    exports.getWindowMetadata = getWindowMetadata;
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/package.json
var require_package = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/package.json"(exports, module) {
    module.exports = {
      name: "elliptic",
      version: "6.6.1",
      description: "EC cryptography",
      main: "lib/elliptic.js",
      files: [
        "lib"
      ],
      scripts: {
        lint: "eslint lib test",
        "lint:fix": "npm run lint -- --fix",
        unit: "istanbul test _mocha --reporter=spec test/index.js",
        test: "npm run lint && npm run unit",
        version: "grunt dist && git add dist/"
      },
      repository: {
        type: "git",
        url: "git@github.com:indutny/elliptic"
      },
      keywords: [
        "EC",
        "Elliptic",
        "curve",
        "Cryptography"
      ],
      author: "Fedor Indutny <fedor@indutny.com>",
      license: "MIT",
      bugs: {
        url: "https://github.com/indutny/elliptic/issues"
      },
      homepage: "https://github.com/indutny/elliptic",
      devDependencies: {
        brfs: "^2.0.2",
        coveralls: "^3.1.0",
        eslint: "^7.6.0",
        grunt: "^1.2.1",
        "grunt-browserify": "^5.3.0",
        "grunt-cli": "^1.3.2",
        "grunt-contrib-connect": "^3.0.0",
        "grunt-contrib-copy": "^1.0.0",
        "grunt-contrib-uglify": "^5.0.0",
        "grunt-mocha-istanbul": "^5.0.2",
        "grunt-saucelabs": "^9.0.1",
        istanbul: "^0.4.5",
        mocha: "^8.0.1"
      },
      dependencies: {
        "bn.js": "^4.11.9",
        brorand: "^1.1.0",
        "hash.js": "^1.0.0",
        "hmac-drbg": "^1.0.1",
        inherits: "^2.0.4",
        "minimalistic-assert": "^1.0.1",
        "minimalistic-crypto-utils": "^1.0.1"
      }
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert2(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN(number, base3, endian) {
        if (BN.isBN(number)) {
          return number;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number !== null) {
          if (base3 === "le" || base3 === "be") {
            endian = base3;
            base3 = 10;
          }
          this._init(number || 0, base3 || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN;
      } else {
        exports2.BN = BN;
      }
      BN.BN = BN;
      BN.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = require_buffer().Buffer;
        }
      } catch (e2) {
      }
      BN.isBN = function isBN(num) {
        if (num instanceof BN) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
      };
      BN.max = function max(left, right) {
        if (left.cmp(right) > 0) return left;
        return right;
      };
      BN.min = function min(left, right) {
        if (left.cmp(right) < 0) return left;
        return right;
      };
      BN.prototype._init = function init(number, base3, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base3, endian);
        }
        if (typeof number === "object") {
          return this._initArray(number, base3, endian);
        }
        if (base3 === "hex") {
          base3 = 16;
        }
        assert2(base3 === (base3 | 0) && base3 >= 2 && base3 <= 36);
        number = number.toString().replace(/\s+/g, "");
        var start = 0;
        if (number[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number.length) {
          if (base3 === 16) {
            this._parseHex(number, start, endian);
          } else {
            this._parseBase(number, base3, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base3, endian);
            }
          }
        }
      };
      BN.prototype._initNumber = function _initNumber(number, base3, endian) {
        if (number < 0) {
          this.negative = 1;
          number = -number;
        }
        if (number < 67108864) {
          this.words = [number & 67108863];
          this.length = 1;
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert2(number < 9007199254740992);
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le") return;
        this._initArray(this.toArray(), base3, endian);
      };
      BN.prototype._initArray = function _initArray(number, base3, endian) {
        assert2(typeof number.length === "number");
        if (number.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number.length / 3);
        this.words = new Array(this.length);
        for (var i4 = 0; i4 < this.length; i4++) {
          this.words[i4] = 0;
        }
        var j5, w7;
        var off = 0;
        if (endian === "be") {
          for (i4 = number.length - 1, j5 = 0; i4 >= 0; i4 -= 3) {
            w7 = number[i4] | number[i4 - 1] << 8 | number[i4 - 2] << 16;
            this.words[j5] |= w7 << off & 67108863;
            this.words[j5 + 1] = w7 >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j5++;
            }
          }
        } else if (endian === "le") {
          for (i4 = 0, j5 = 0; i4 < number.length; i4 += 3) {
            w7 = number[i4] | number[i4 + 1] << 8 | number[i4 + 2] << 16;
            this.words[j5] |= w7 << off & 67108863;
            this.words[j5 + 1] = w7 >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j5++;
            }
          }
        }
        return this.strip();
      };
      function parseHex4Bits(string2, index) {
        var c7 = string2.charCodeAt(index);
        if (c7 >= 65 && c7 <= 70) {
          return c7 - 55;
        } else if (c7 >= 97 && c7 <= 102) {
          return c7 - 87;
        } else {
          return c7 - 48 & 15;
        }
      }
      function parseHexByte(string2, lowerBound, index) {
        var r3 = parseHex4Bits(string2, index);
        if (index - 1 >= lowerBound) {
          r3 |= parseHex4Bits(string2, index - 1) << 4;
        }
        return r3;
      }
      BN.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6);
        this.words = new Array(this.length);
        for (var i4 = 0; i4 < this.length; i4++) {
          this.words[i4] = 0;
        }
        var off = 0;
        var j5 = 0;
        var w7;
        if (endian === "be") {
          for (i4 = number.length - 1; i4 >= start; i4 -= 2) {
            w7 = parseHexByte(number, start, i4) << off;
            this.words[j5] |= w7 & 67108863;
            if (off >= 18) {
              off -= 18;
              j5 += 1;
              this.words[j5] |= w7 >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number.length - start;
          for (i4 = parseLength % 2 === 0 ? start + 1 : start; i4 < number.length; i4 += 2) {
            w7 = parseHexByte(number, start, i4) << off;
            this.words[j5] |= w7 & 67108863;
            if (off >= 18) {
              off -= 18;
              j5 += 1;
              this.words[j5] |= w7 >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this.strip();
      };
      function parseBase(str, start, end, mul) {
        var r3 = 0;
        var len = Math.min(str.length, end);
        for (var i4 = start; i4 < len; i4++) {
          var c7 = str.charCodeAt(i4) - 48;
          r3 *= mul;
          if (c7 >= 49) {
            r3 += c7 - 49 + 10;
          } else if (c7 >= 17) {
            r3 += c7 - 17 + 10;
          } else {
            r3 += c7;
          }
        }
        return r3;
      }
      BN.prototype._parseBase = function _parseBase(number, base3, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base3) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base3 | 0;
        var total = number.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i4 = start; i4 < end; i4 += limbLen) {
          word = parseBase(number, i4, i4 + limbLen, base3);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number, i4, number.length, base3);
          for (i4 = 0; i4 < mod; i4++) {
            pow *= base3;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this.strip();
      };
      BN.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i4 = 0; i4 < this.length; i4++) {
          dest.words[i4] = this.words[i4];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      BN.prototype.clone = function clone() {
        var r3 = new BN(null);
        this.copy(r3);
        return r3;
      };
      BN.prototype._expand = function _expand(size4) {
        while (this.length < size4) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN.prototype.strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      BN.prototype.inspect = function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN.prototype.toString = function toString4(base3, padding) {
        base3 = base3 || 10;
        padding = padding | 0 || 1;
        var out;
        if (base3 === 16 || base3 === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i4 = 0; i4 < this.length; i4++) {
            var w7 = this.words[i4];
            var word = ((w7 << off | carry) & 16777215).toString(16);
            carry = w7 >>> 24 - off & 16777215;
            off += 2;
            if (off >= 26) {
              off -= 26;
              i4--;
            }
            if (carry !== 0 || i4 !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base3 === (base3 | 0) && base3 >= 2 && base3 <= 36) {
          var groupSize = groupSizes[base3];
          var groupBase = groupBases[base3];
          out = "";
          var c7 = this.clone();
          c7.negative = 0;
          while (!c7.isZero()) {
            var r3 = c7.modn(groupBase).toString(base3);
            c7 = c7.idivn(groupBase);
            if (!c7.isZero()) {
              out = zeros[groupSize - r3.length] + r3 + out;
            } else {
              out = r3 + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert2(false, "Base should be between 2 and 36");
      };
      BN.prototype.toNumber = function toNumber3() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert2(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN.prototype.toJSON = function toJSON() {
        return this.toString(16);
      };
      BN.prototype.toBuffer = function toBuffer(endian, length2) {
        assert2(typeof Buffer2 !== "undefined");
        return this.toArrayLike(Buffer2, endian, length2);
      };
      BN.prototype.toArray = function toArray(endian, length2) {
        return this.toArrayLike(Array, endian, length2);
      };
      BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length2) {
        var byteLength = this.byteLength();
        var reqLength = length2 || Math.max(1, byteLength);
        assert2(byteLength <= reqLength, "byte array longer than desired length");
        assert2(reqLength > 0, "Requested array length <= 0");
        this.strip();
        var littleEndian = endian === "le";
        var res = new ArrayType(reqLength);
        var b6, i4;
        var q3 = this.clone();
        if (!littleEndian) {
          for (i4 = 0; i4 < reqLength - byteLength; i4++) {
            res[i4] = 0;
          }
          for (i4 = 0; !q3.isZero(); i4++) {
            b6 = q3.andln(255);
            q3.iushrn(8);
            res[reqLength - i4 - 1] = b6;
          }
        } else {
          for (i4 = 0; !q3.isZero(); i4++) {
            b6 = q3.andln(255);
            q3.iushrn(8);
            res[i4] = b6;
          }
          for (; i4 < reqLength; i4++) {
            res[i4] = 0;
          }
        }
        return res;
      };
      if (Math.clz32) {
        BN.prototype._countBits = function _countBits(w7) {
          return 32 - Math.clz32(w7);
        };
      } else {
        BN.prototype._countBits = function _countBits(w7) {
          var t = w7;
          var r3 = 0;
          if (t >= 4096) {
            r3 += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r3 += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r3 += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r3 += 2;
            t >>>= 2;
          }
          return r3 + t;
        };
      }
      BN.prototype._zeroBits = function _zeroBits(w7) {
        if (w7 === 0) return 26;
        var t = w7;
        var r3 = 0;
        if ((t & 8191) === 0) {
          r3 += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r3 += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r3 += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r3 += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r3++;
        }
        return r3;
      };
      BN.prototype.bitLength = function bitLength() {
        var w7 = this.words[this.length - 1];
        var hi3 = this._countBits(w7);
        return (this.length - 1) * 26 + hi3;
      };
      function toBitArray(num) {
        var w7 = new Array(num.bitLength());
        for (var bit = 0; bit < w7.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w7[bit] = (num.words[off] & 1 << wbit) >>> wbit;
        }
        return w7;
      }
      BN.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0;
        var r3 = 0;
        for (var i4 = 0; i4 < this.length; i4++) {
          var b6 = this._zeroBits(this.words[i4]);
          r3 += b6;
          if (b6 !== 26) break;
        }
        return r3;
      };
      BN.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i4 = 0; i4 < num.length; i4++) {
          this.words[i4] = this.words[i4] | num.words[i4];
        }
        return this.strip();
      };
      BN.prototype.ior = function ior(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN.prototype.or = function or5(num) {
        if (this.length > num.length) return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN.prototype.iuand = function iuand(num) {
        var b6;
        if (this.length > num.length) {
          b6 = num;
        } else {
          b6 = this;
        }
        for (var i4 = 0; i4 < b6.length; i4++) {
          this.words[i4] = this.words[i4] & num.words[i4];
        }
        this.length = b6.length;
        return this.strip();
      };
      BN.prototype.iand = function iand(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN.prototype.iuxor = function iuxor(num) {
        var a3;
        var b6;
        if (this.length > num.length) {
          a3 = this;
          b6 = num;
        } else {
          a3 = num;
          b6 = this;
        }
        for (var i4 = 0; i4 < b6.length; i4++) {
          this.words[i4] = a3.words[i4] ^ b6.words[i4];
        }
        if (this !== a3) {
          for (; i4 < a3.length; i4++) {
            this.words[i4] = a3.words[i4];
          }
        }
        this.length = a3.length;
        return this.strip();
      };
      BN.prototype.ixor = function ixor(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN.prototype.xor = function xor2(num) {
        if (this.length > num.length) return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN.prototype.inotn = function inotn(width) {
        assert2(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i4 = 0; i4 < bytesNeeded; i4++) {
          this.words[i4] = ~this.words[i4] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i4] = ~this.words[i4] & 67108863 >> 26 - bitsLeft;
        }
        return this.strip();
      };
      BN.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN.prototype.setn = function setn(bit, val) {
        assert2(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this.strip();
      };
      BN.prototype.iadd = function iadd(num) {
        var r3;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r3 = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r3 = this.isub(num);
          num.negative = 1;
          return r3._normSign();
        }
        var a3, b6;
        if (this.length > num.length) {
          a3 = this;
          b6 = num;
        } else {
          a3 = num;
          b6 = this;
        }
        var carry = 0;
        for (var i4 = 0; i4 < b6.length; i4++) {
          r3 = (a3.words[i4] | 0) + (b6.words[i4] | 0) + carry;
          this.words[i4] = r3 & 67108863;
          carry = r3 >>> 26;
        }
        for (; carry !== 0 && i4 < a3.length; i4++) {
          r3 = (a3.words[i4] | 0) + carry;
          this.words[i4] = r3 & 67108863;
          carry = r3 >>> 26;
        }
        this.length = a3.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a3 !== this) {
          for (; i4 < a3.length; i4++) {
            this.words[i4] = a3.words[i4];
          }
        }
        return this;
      };
      BN.prototype.add = function add(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length) return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r3 = this.iadd(num);
          num.negative = 1;
          return r3._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a3, b6;
        if (cmp > 0) {
          a3 = this;
          b6 = num;
        } else {
          a3 = num;
          b6 = this;
        }
        var carry = 0;
        for (var i4 = 0; i4 < b6.length; i4++) {
          r3 = (a3.words[i4] | 0) - (b6.words[i4] | 0) + carry;
          carry = r3 >> 26;
          this.words[i4] = r3 & 67108863;
        }
        for (; carry !== 0 && i4 < a3.length; i4++) {
          r3 = (a3.words[i4] | 0) + carry;
          carry = r3 >> 26;
          this.words[i4] = r3 & 67108863;
        }
        if (carry === 0 && i4 < a3.length && a3 !== this) {
          for (; i4 < a3.length; i4++) {
            this.words[i4] = a3.words[i4];
          }
        }
        this.length = Math.max(this.length, i4);
        if (a3 !== this) {
          this.negative = 1;
        }
        return this.strip();
      };
      BN.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        var len = self2.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a3 = self2.words[0] | 0;
        var b6 = num.words[0] | 0;
        var r3 = a3 * b6;
        var lo4 = r3 & 67108863;
        var carry = r3 / 67108864 | 0;
        out.words[0] = lo4;
        for (var k7 = 1; k7 < len; k7++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k7, num.length - 1);
          for (var j5 = Math.max(0, k7 - self2.length + 1); j5 <= maxJ; j5++) {
            var i4 = k7 - j5 | 0;
            a3 = self2.words[i4] | 0;
            b6 = num.words[j5] | 0;
            r3 = a3 * b6 + rword;
            ncarry += r3 / 67108864 | 0;
            rword = r3 & 67108863;
          }
          out.words[k7] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k7] = carry | 0;
        } else {
          out.length--;
        }
        return out.strip();
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a3 = self2.words;
        var b6 = num.words;
        var o7 = out.words;
        var c7 = 0;
        var lo4;
        var mid;
        var hi3;
        var a0 = a3[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a3[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a22 = a3[2] | 0;
        var al2 = a22 & 8191;
        var ah2 = a22 >>> 13;
        var a32 = a3[3] | 0;
        var al3 = a32 & 8191;
        var ah3 = a32 >>> 13;
        var a4 = a3[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a3[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a3[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a3[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a3[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a3[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b6[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b6[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b22 = b6[2] | 0;
        var bl2 = b22 & 8191;
        var bh2 = b22 >>> 13;
        var b32 = b6[3] | 0;
        var bl3 = b32 & 8191;
        var bh3 = b32 >>> 13;
        var b42 = b6[4] | 0;
        var bl4 = b42 & 8191;
        var bh4 = b42 >>> 13;
        var b52 = b6[5] | 0;
        var bl5 = b52 & 8191;
        var bh5 = b52 >>> 13;
        var b62 = b6[6] | 0;
        var bl6 = b62 & 8191;
        var bh6 = b62 >>> 13;
        var b7 = b6[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b6[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b6[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self2.negative ^ num.negative;
        out.length = 19;
        lo4 = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi3 = Math.imul(ah0, bh0);
        var w0 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo4 = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi3 = Math.imul(ah1, bh0);
        lo4 = lo4 + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi3 = hi3 + Math.imul(ah0, bh1) | 0;
        var w1 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo4 = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi3 = Math.imul(ah2, bh0);
        lo4 = lo4 + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi3 = hi3 + Math.imul(ah1, bh1) | 0;
        lo4 = lo4 + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi3 = hi3 + Math.imul(ah0, bh2) | 0;
        var w22 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w22 >>> 26) | 0;
        w22 &= 67108863;
        lo4 = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi3 = Math.imul(ah3, bh0);
        lo4 = lo4 + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi3 = hi3 + Math.imul(ah2, bh1) | 0;
        lo4 = lo4 + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi3 = hi3 + Math.imul(ah1, bh2) | 0;
        lo4 = lo4 + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi3 = hi3 + Math.imul(ah0, bh3) | 0;
        var w32 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w32 >>> 26) | 0;
        w32 &= 67108863;
        lo4 = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi3 = Math.imul(ah4, bh0);
        lo4 = lo4 + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi3 = hi3 + Math.imul(ah3, bh1) | 0;
        lo4 = lo4 + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi3 = hi3 + Math.imul(ah2, bh2) | 0;
        lo4 = lo4 + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi3 = hi3 + Math.imul(ah1, bh3) | 0;
        lo4 = lo4 + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi3 = hi3 + Math.imul(ah0, bh4) | 0;
        var w42 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w42 >>> 26) | 0;
        w42 &= 67108863;
        lo4 = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi3 = Math.imul(ah5, bh0);
        lo4 = lo4 + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi3 = hi3 + Math.imul(ah4, bh1) | 0;
        lo4 = lo4 + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi3 = hi3 + Math.imul(ah3, bh2) | 0;
        lo4 = lo4 + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi3 = hi3 + Math.imul(ah2, bh3) | 0;
        lo4 = lo4 + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi3 = hi3 + Math.imul(ah1, bh4) | 0;
        lo4 = lo4 + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi3 = hi3 + Math.imul(ah0, bh5) | 0;
        var w52 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w52 >>> 26) | 0;
        w52 &= 67108863;
        lo4 = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi3 = Math.imul(ah6, bh0);
        lo4 = lo4 + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi3 = hi3 + Math.imul(ah5, bh1) | 0;
        lo4 = lo4 + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi3 = hi3 + Math.imul(ah4, bh2) | 0;
        lo4 = lo4 + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi3 = hi3 + Math.imul(ah3, bh3) | 0;
        lo4 = lo4 + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi3 = hi3 + Math.imul(ah2, bh4) | 0;
        lo4 = lo4 + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi3 = hi3 + Math.imul(ah1, bh5) | 0;
        lo4 = lo4 + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi3 = hi3 + Math.imul(ah0, bh6) | 0;
        var w62 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w62 >>> 26) | 0;
        w62 &= 67108863;
        lo4 = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi3 = Math.imul(ah7, bh0);
        lo4 = lo4 + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi3 = hi3 + Math.imul(ah6, bh1) | 0;
        lo4 = lo4 + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi3 = hi3 + Math.imul(ah5, bh2) | 0;
        lo4 = lo4 + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi3 = hi3 + Math.imul(ah4, bh3) | 0;
        lo4 = lo4 + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi3 = hi3 + Math.imul(ah3, bh4) | 0;
        lo4 = lo4 + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi3 = hi3 + Math.imul(ah2, bh5) | 0;
        lo4 = lo4 + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi3 = hi3 + Math.imul(ah1, bh6) | 0;
        lo4 = lo4 + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi3 = hi3 + Math.imul(ah0, bh7) | 0;
        var w7 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo4 = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi3 = Math.imul(ah8, bh0);
        lo4 = lo4 + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi3 = hi3 + Math.imul(ah7, bh1) | 0;
        lo4 = lo4 + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi3 = hi3 + Math.imul(ah6, bh2) | 0;
        lo4 = lo4 + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi3 = hi3 + Math.imul(ah5, bh3) | 0;
        lo4 = lo4 + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi3 = hi3 + Math.imul(ah4, bh4) | 0;
        lo4 = lo4 + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi3 = hi3 + Math.imul(ah3, bh5) | 0;
        lo4 = lo4 + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi3 = hi3 + Math.imul(ah2, bh6) | 0;
        lo4 = lo4 + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi3 = hi3 + Math.imul(ah1, bh7) | 0;
        lo4 = lo4 + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi3 = hi3 + Math.imul(ah0, bh8) | 0;
        var w8 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo4 = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi3 = Math.imul(ah9, bh0);
        lo4 = lo4 + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi3 = hi3 + Math.imul(ah8, bh1) | 0;
        lo4 = lo4 + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi3 = hi3 + Math.imul(ah7, bh2) | 0;
        lo4 = lo4 + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi3 = hi3 + Math.imul(ah6, bh3) | 0;
        lo4 = lo4 + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi3 = hi3 + Math.imul(ah5, bh4) | 0;
        lo4 = lo4 + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi3 = hi3 + Math.imul(ah4, bh5) | 0;
        lo4 = lo4 + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi3 = hi3 + Math.imul(ah3, bh6) | 0;
        lo4 = lo4 + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi3 = hi3 + Math.imul(ah2, bh7) | 0;
        lo4 = lo4 + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi3 = hi3 + Math.imul(ah1, bh8) | 0;
        lo4 = lo4 + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi3 = hi3 + Math.imul(ah0, bh9) | 0;
        var w9 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo4 = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi3 = Math.imul(ah9, bh1);
        lo4 = lo4 + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi3 = hi3 + Math.imul(ah8, bh2) | 0;
        lo4 = lo4 + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi3 = hi3 + Math.imul(ah7, bh3) | 0;
        lo4 = lo4 + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi3 = hi3 + Math.imul(ah6, bh4) | 0;
        lo4 = lo4 + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi3 = hi3 + Math.imul(ah5, bh5) | 0;
        lo4 = lo4 + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi3 = hi3 + Math.imul(ah4, bh6) | 0;
        lo4 = lo4 + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi3 = hi3 + Math.imul(ah3, bh7) | 0;
        lo4 = lo4 + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi3 = hi3 + Math.imul(ah2, bh8) | 0;
        lo4 = lo4 + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi3 = hi3 + Math.imul(ah1, bh9) | 0;
        var w10 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo4 = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi3 = Math.imul(ah9, bh2);
        lo4 = lo4 + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi3 = hi3 + Math.imul(ah8, bh3) | 0;
        lo4 = lo4 + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi3 = hi3 + Math.imul(ah7, bh4) | 0;
        lo4 = lo4 + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi3 = hi3 + Math.imul(ah6, bh5) | 0;
        lo4 = lo4 + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi3 = hi3 + Math.imul(ah5, bh6) | 0;
        lo4 = lo4 + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi3 = hi3 + Math.imul(ah4, bh7) | 0;
        lo4 = lo4 + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi3 = hi3 + Math.imul(ah3, bh8) | 0;
        lo4 = lo4 + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi3 = hi3 + Math.imul(ah2, bh9) | 0;
        var w11 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo4 = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi3 = Math.imul(ah9, bh3);
        lo4 = lo4 + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi3 = hi3 + Math.imul(ah8, bh4) | 0;
        lo4 = lo4 + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi3 = hi3 + Math.imul(ah7, bh5) | 0;
        lo4 = lo4 + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi3 = hi3 + Math.imul(ah6, bh6) | 0;
        lo4 = lo4 + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi3 = hi3 + Math.imul(ah5, bh7) | 0;
        lo4 = lo4 + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi3 = hi3 + Math.imul(ah4, bh8) | 0;
        lo4 = lo4 + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi3 = hi3 + Math.imul(ah3, bh9) | 0;
        var w12 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo4 = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi3 = Math.imul(ah9, bh4);
        lo4 = lo4 + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi3 = hi3 + Math.imul(ah8, bh5) | 0;
        lo4 = lo4 + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi3 = hi3 + Math.imul(ah7, bh6) | 0;
        lo4 = lo4 + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi3 = hi3 + Math.imul(ah6, bh7) | 0;
        lo4 = lo4 + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi3 = hi3 + Math.imul(ah5, bh8) | 0;
        lo4 = lo4 + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi3 = hi3 + Math.imul(ah4, bh9) | 0;
        var w13 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo4 = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi3 = Math.imul(ah9, bh5);
        lo4 = lo4 + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi3 = hi3 + Math.imul(ah8, bh6) | 0;
        lo4 = lo4 + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi3 = hi3 + Math.imul(ah7, bh7) | 0;
        lo4 = lo4 + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi3 = hi3 + Math.imul(ah6, bh8) | 0;
        lo4 = lo4 + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi3 = hi3 + Math.imul(ah5, bh9) | 0;
        var w14 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo4 = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi3 = Math.imul(ah9, bh6);
        lo4 = lo4 + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi3 = hi3 + Math.imul(ah8, bh7) | 0;
        lo4 = lo4 + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi3 = hi3 + Math.imul(ah7, bh8) | 0;
        lo4 = lo4 + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi3 = hi3 + Math.imul(ah6, bh9) | 0;
        var w15 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo4 = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi3 = Math.imul(ah9, bh7);
        lo4 = lo4 + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi3 = hi3 + Math.imul(ah8, bh8) | 0;
        lo4 = lo4 + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi3 = hi3 + Math.imul(ah7, bh9) | 0;
        var w16 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo4 = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi3 = Math.imul(ah9, bh8);
        lo4 = lo4 + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi3 = hi3 + Math.imul(ah8, bh9) | 0;
        var w17 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo4 = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi3 = Math.imul(ah9, bh9);
        var w18 = (c7 + lo4 | 0) + ((mid & 8191) << 13) | 0;
        c7 = (hi3 + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o7[0] = w0;
        o7[1] = w1;
        o7[2] = w22;
        o7[3] = w32;
        o7[4] = w42;
        o7[5] = w52;
        o7[6] = w62;
        o7[7] = w7;
        o7[8] = w8;
        o7[9] = w9;
        o7[10] = w10;
        o7[11] = w11;
        o7[12] = w12;
        o7[13] = w13;
        o7[14] = w14;
        o7[15] = w15;
        o7[16] = w16;
        o7[17] = w17;
        o7[18] = w18;
        if (c7 !== 0) {
          o7[19] = c7;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        out.length = self2.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k7 = 0; k7 < out.length - 1; k7++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k7, num.length - 1);
          for (var j5 = Math.max(0, k7 - self2.length + 1); j5 <= maxJ; j5++) {
            var i4 = k7 - j5;
            var a3 = self2.words[i4] | 0;
            var b6 = num.words[j5] | 0;
            var r3 = a3 * b6;
            var lo4 = r3 & 67108863;
            ncarry = ncarry + (r3 / 67108864 | 0) | 0;
            lo4 = lo4 + rword | 0;
            rword = lo4 & 67108863;
            ncarry = ncarry + (lo4 >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k7] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k7] = carry;
        } else {
          out.length--;
        }
        return out.strip();
      }
      function jumboMulTo(self2, num, out) {
        var fftm = new FFTM();
        return fftm.mulp(self2, num, out);
      }
      BN.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x7, y7) {
        this.x = x7;
        this.y = y7;
      }
      FFTM.prototype.makeRBT = function makeRBT(N14) {
        var t = new Array(N14);
        var l7 = BN.prototype._countBits(N14) - 1;
        for (var i4 = 0; i4 < N14; i4++) {
          t[i4] = this.revBin(i4, l7, N14);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x7, l7, N14) {
        if (x7 === 0 || x7 === N14 - 1) return x7;
        var rb = 0;
        for (var i4 = 0; i4 < l7; i4++) {
          rb |= (x7 & 1) << l7 - i4 - 1;
          x7 >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N14) {
        for (var i4 = 0; i4 < N14; i4++) {
          rtws[i4] = rws[rbt[i4]];
          itws[i4] = iws[rbt[i4]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N14, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N14);
        for (var s3 = 1; s3 < N14; s3 <<= 1) {
          var l7 = s3 << 1;
          var rtwdf = Math.cos(2 * Math.PI / l7);
          var itwdf = Math.sin(2 * Math.PI / l7);
          for (var p6 = 0; p6 < N14; p6 += l7) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j5 = 0; j5 < s3; j5++) {
              var re4 = rtws[p6 + j5];
              var ie4 = itws[p6 + j5];
              var ro4 = rtws[p6 + j5 + s3];
              var io3 = itws[p6 + j5 + s3];
              var rx = rtwdf_ * ro4 - itwdf_ * io3;
              io3 = rtwdf_ * io3 + itwdf_ * ro4;
              ro4 = rx;
              rtws[p6 + j5] = re4 + ro4;
              itws[p6 + j5] = ie4 + io3;
              rtws[p6 + j5 + s3] = re4 - ro4;
              itws[p6 + j5 + s3] = ie4 - io3;
              if (j5 !== l7) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n5, m5) {
        var N14 = Math.max(m5, n5) | 1;
        var odd = N14 & 1;
        var i4 = 0;
        for (N14 = N14 / 2 | 0; N14; N14 = N14 >>> 1) {
          i4++;
        }
        return 1 << i4 + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N14) {
        if (N14 <= 1) return;
        for (var i4 = 0; i4 < N14 / 2; i4++) {
          var t = rws[i4];
          rws[i4] = rws[N14 - i4 - 1];
          rws[N14 - i4 - 1] = t;
          t = iws[i4];
          iws[i4] = -iws[N14 - i4 - 1];
          iws[N14 - i4 - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws2, N14) {
        var carry = 0;
        for (var i4 = 0; i4 < N14 / 2; i4++) {
          var w7 = Math.round(ws2[2 * i4 + 1] / N14) * 8192 + Math.round(ws2[2 * i4] / N14) + carry;
          ws2[i4] = w7 & 67108863;
          if (w7 < 67108864) {
            carry = 0;
          } else {
            carry = w7 / 67108864 | 0;
          }
        }
        return ws2;
      };
      FFTM.prototype.convert13b = function convert13b(ws2, len, rws, N14) {
        var carry = 0;
        for (var i4 = 0; i4 < len; i4++) {
          carry = carry + (ws2[i4] | 0);
          rws[2 * i4] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i4 + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i4 = 2 * len; i4 < N14; ++i4) {
          rws[i4] = 0;
        }
        assert2(carry === 0);
        assert2((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N14) {
        var ph = new Array(N14);
        for (var i4 = 0; i4 < N14; i4++) {
          ph[i4] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x7, y7, out) {
        var N14 = 2 * this.guessLen13b(x7.length, y7.length);
        var rbt = this.makeRBT(N14);
        var _5 = this.stub(N14);
        var rws = new Array(N14);
        var rwst = new Array(N14);
        var iwst = new Array(N14);
        var nrws = new Array(N14);
        var nrwst = new Array(N14);
        var niwst = new Array(N14);
        var rmws = out.words;
        rmws.length = N14;
        this.convert13b(x7.words, x7.length, rws, N14);
        this.convert13b(y7.words, y7.length, nrws, N14);
        this.transform(rws, _5, rwst, iwst, N14, rbt);
        this.transform(nrws, _5, nrwst, niwst, N14, rbt);
        for (var i4 = 0; i4 < N14; i4++) {
          var rx = rwst[i4] * nrwst[i4] - iwst[i4] * niwst[i4];
          iwst[i4] = rwst[i4] * niwst[i4] + iwst[i4] * nrwst[i4];
          rwst[i4] = rx;
        }
        this.conjugate(rwst, iwst, N14);
        this.transform(rwst, iwst, rmws, _5, N14, rbt);
        this.conjugate(rmws, _5, N14);
        this.normalize13b(rmws, N14);
        out.negative = x7.negative ^ y7.negative;
        out.length = x7.length + y7.length;
        return out.strip();
      };
      BN.prototype.mul = function mul(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN.prototype.mulf = function mulf(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN.prototype.imuln = function imuln(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        var carry = 0;
        for (var i4 = 0; i4 < this.length; i4++) {
          var w7 = (this.words[i4] | 0) * num;
          var lo4 = (w7 & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w7 / 67108864 | 0;
          carry += lo4 >>> 26;
          this.words[i4] = lo4 & 67108863;
        }
        if (carry !== 0) {
          this.words[i4] = carry;
          this.length++;
        }
        return this;
      };
      BN.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN.prototype.pow = function pow(num) {
        var w7 = toBitArray(num);
        if (w7.length === 0) return new BN(1);
        var res = this;
        for (var i4 = 0; i4 < w7.length; i4++, res = res.sqr()) {
          if (w7[i4] !== 0) break;
        }
        if (++i4 < w7.length) {
          for (var q3 = res.sqr(); i4 < w7.length; i4++, q3 = q3.sqr()) {
            if (w7[i4] === 0) continue;
            res = res.mul(q3);
          }
        }
        return res;
      };
      BN.prototype.iushln = function iushln(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r3 = bits % 26;
        var s3 = (bits - r3) / 26;
        var carryMask = 67108863 >>> 26 - r3 << 26 - r3;
        var i4;
        if (r3 !== 0) {
          var carry = 0;
          for (i4 = 0; i4 < this.length; i4++) {
            var newCarry = this.words[i4] & carryMask;
            var c7 = (this.words[i4] | 0) - newCarry << r3;
            this.words[i4] = c7 | carry;
            carry = newCarry >>> 26 - r3;
          }
          if (carry) {
            this.words[i4] = carry;
            this.length++;
          }
        }
        if (s3 !== 0) {
          for (i4 = this.length - 1; i4 >= 0; i4--) {
            this.words[i4 + s3] = this.words[i4];
          }
          for (i4 = 0; i4 < s3; i4++) {
            this.words[i4] = 0;
          }
          this.length += s3;
        }
        return this.strip();
      };
      BN.prototype.ishln = function ishln(bits) {
        assert2(this.negative === 0);
        return this.iushln(bits);
      };
      BN.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert2(typeof bits === "number" && bits >= 0);
        var h5;
        if (hint) {
          h5 = (hint - hint % 26) / 26;
        } else {
          h5 = 0;
        }
        var r3 = bits % 26;
        var s3 = Math.min((bits - r3) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r3 << r3;
        var maskedWords = extended;
        h5 -= s3;
        h5 = Math.max(0, h5);
        if (maskedWords) {
          for (var i4 = 0; i4 < s3; i4++) {
            maskedWords.words[i4] = this.words[i4];
          }
          maskedWords.length = s3;
        }
        if (s3 === 0) {
        } else if (this.length > s3) {
          this.length -= s3;
          for (i4 = 0; i4 < this.length; i4++) {
            this.words[i4] = this.words[i4 + s3];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i4 = this.length - 1; i4 >= 0 && (carry !== 0 || i4 >= h5); i4--) {
          var word = this.words[i4] | 0;
          this.words[i4] = carry << 26 - r3 | word >>> r3;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this.strip();
      };
      BN.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert2(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN.prototype.testn = function testn(bit) {
        assert2(typeof bit === "number" && bit >= 0);
        var r3 = bit % 26;
        var s3 = (bit - r3) / 26;
        var q3 = 1 << r3;
        if (this.length <= s3) return false;
        var w7 = this.words[s3];
        return !!(w7 & q3);
      };
      BN.prototype.imaskn = function imaskn(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r3 = bits % 26;
        var s3 = (bits - r3) / 26;
        assert2(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s3) {
          return this;
        }
        if (r3 !== 0) {
          s3++;
        }
        this.length = Math.min(s3, this.length);
        if (r3 !== 0) {
          var mask = 67108863 ^ 67108863 >>> r3 << r3;
          this.words[this.length - 1] &= mask;
        }
        return this.strip();
      };
      BN.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN.prototype.iaddn = function iaddn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0) return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) < num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i4 = 0; i4 < this.length && this.words[i4] >= 67108864; i4++) {
          this.words[i4] -= 67108864;
          if (i4 === this.length - 1) {
            this.words[i4 + 1] = 1;
          } else {
            this.words[i4 + 1]++;
          }
        }
        this.length = Math.max(this.length, i4 + 1);
        return this;
      };
      BN.prototype.isubn = function isubn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0) return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i4 = 0; i4 < this.length && this.words[i4] < 0; i4++) {
            this.words[i4] += 67108864;
            this.words[i4 + 1] -= 1;
          }
        }
        return this.strip();
      };
      BN.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i4;
        this._expand(len);
        var w7;
        var carry = 0;
        for (i4 = 0; i4 < num.length; i4++) {
          w7 = (this.words[i4 + shift] | 0) + carry;
          var right = (num.words[i4] | 0) * mul;
          w7 -= right & 67108863;
          carry = (w7 >> 26) - (right / 67108864 | 0);
          this.words[i4 + shift] = w7 & 67108863;
        }
        for (; i4 < this.length - shift; i4++) {
          w7 = (this.words[i4 + shift] | 0) + carry;
          carry = w7 >> 26;
          this.words[i4 + shift] = w7 & 67108863;
        }
        if (carry === 0) return this.strip();
        assert2(carry === -1);
        carry = 0;
        for (i4 = 0; i4 < this.length; i4++) {
          w7 = -(this.words[i4] | 0) + carry;
          carry = w7 >> 26;
          this.words[i4] = w7 & 67108863;
        }
        this.negative = 1;
        return this.strip();
      };
      BN.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a3 = this.clone();
        var b6 = num;
        var bhi = b6.words[b6.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b6 = b6.ushln(shift);
          a3.iushln(shift);
          bhi = b6.words[b6.length - 1] | 0;
        }
        var m5 = a3.length - b6.length;
        var q3;
        if (mode !== "mod") {
          q3 = new BN(null);
          q3.length = m5 + 1;
          q3.words = new Array(q3.length);
          for (var i4 = 0; i4 < q3.length; i4++) {
            q3.words[i4] = 0;
          }
        }
        var diff = a3.clone()._ishlnsubmul(b6, 1, m5);
        if (diff.negative === 0) {
          a3 = diff;
          if (q3) {
            q3.words[m5] = 1;
          }
        }
        for (var j5 = m5 - 1; j5 >= 0; j5--) {
          var qj = (a3.words[b6.length + j5] | 0) * 67108864 + (a3.words[b6.length + j5 - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a3._ishlnsubmul(b6, qj, j5);
          while (a3.negative !== 0) {
            qj--;
            a3.negative = 0;
            a3._ishlnsubmul(b6, 1, j5);
            if (!a3.isZero()) {
              a3.negative ^= 1;
            }
          }
          if (q3) {
            q3.words[j5] = qj;
          }
        }
        if (q3) {
          q3.strip();
        }
        a3.strip();
        if (mode !== "div" && shift !== 0) {
          a3.iushrn(shift);
        }
        return {
          div: q3 || null,
          mod: a3
        };
      };
      BN.prototype.divmod = function divmod(num, mode, positive) {
        assert2(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN(0),
            mod: new BN(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN(this.modn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN(this.modn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero()) return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r22 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r22 === 1 && cmp === 0) return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN.prototype.modn = function modn(num) {
        assert2(num <= 67108863);
        var p6 = (1 << 26) % num;
        var acc = 0;
        for (var i4 = this.length - 1; i4 >= 0; i4--) {
          acc = (p6 * acc + (this.words[i4] | 0)) % num;
        }
        return acc;
      };
      BN.prototype.idivn = function idivn(num) {
        assert2(num <= 67108863);
        var carry = 0;
        for (var i4 = this.length - 1; i4 >= 0; i4--) {
          var w7 = (this.words[i4] | 0) + carry * 67108864;
          this.words[i4] = w7 / num | 0;
          carry = w7 % num;
        }
        return this.strip();
      };
      BN.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN.prototype.egcd = function egcd(p6) {
        assert2(p6.negative === 0);
        assert2(!p6.isZero());
        var x7 = this;
        var y7 = p6.clone();
        if (x7.negative !== 0) {
          x7 = x7.umod(p6);
        } else {
          x7 = x7.clone();
        }
        var A5 = new BN(1);
        var B4 = new BN(0);
        var C7 = new BN(0);
        var D4 = new BN(1);
        var g6 = 0;
        while (x7.isEven() && y7.isEven()) {
          x7.iushrn(1);
          y7.iushrn(1);
          ++g6;
        }
        var yp = y7.clone();
        var xp = x7.clone();
        while (!x7.isZero()) {
          for (var i4 = 0, im = 1; (x7.words[0] & im) === 0 && i4 < 26; ++i4, im <<= 1) ;
          if (i4 > 0) {
            x7.iushrn(i4);
            while (i4-- > 0) {
              if (A5.isOdd() || B4.isOdd()) {
                A5.iadd(yp);
                B4.isub(xp);
              }
              A5.iushrn(1);
              B4.iushrn(1);
            }
          }
          for (var j5 = 0, jm = 1; (y7.words[0] & jm) === 0 && j5 < 26; ++j5, jm <<= 1) ;
          if (j5 > 0) {
            y7.iushrn(j5);
            while (j5-- > 0) {
              if (C7.isOdd() || D4.isOdd()) {
                C7.iadd(yp);
                D4.isub(xp);
              }
              C7.iushrn(1);
              D4.iushrn(1);
            }
          }
          if (x7.cmp(y7) >= 0) {
            x7.isub(y7);
            A5.isub(C7);
            B4.isub(D4);
          } else {
            y7.isub(x7);
            C7.isub(A5);
            D4.isub(B4);
          }
        }
        return {
          a: C7,
          b: D4,
          gcd: y7.iushln(g6)
        };
      };
      BN.prototype._invmp = function _invmp(p6) {
        assert2(p6.negative === 0);
        assert2(!p6.isZero());
        var a3 = this;
        var b6 = p6.clone();
        if (a3.negative !== 0) {
          a3 = a3.umod(p6);
        } else {
          a3 = a3.clone();
        }
        var x1 = new BN(1);
        var x22 = new BN(0);
        var delta = b6.clone();
        while (a3.cmpn(1) > 0 && b6.cmpn(1) > 0) {
          for (var i4 = 0, im = 1; (a3.words[0] & im) === 0 && i4 < 26; ++i4, im <<= 1) ;
          if (i4 > 0) {
            a3.iushrn(i4);
            while (i4-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j5 = 0, jm = 1; (b6.words[0] & jm) === 0 && j5 < 26; ++j5, jm <<= 1) ;
          if (j5 > 0) {
            b6.iushrn(j5);
            while (j5-- > 0) {
              if (x22.isOdd()) {
                x22.iadd(delta);
              }
              x22.iushrn(1);
            }
          }
          if (a3.cmp(b6) >= 0) {
            a3.isub(b6);
            x1.isub(x22);
          } else {
            b6.isub(a3);
            x22.isub(x1);
          }
        }
        var res;
        if (a3.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x22;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p6);
        }
        return res;
      };
      BN.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs();
        if (num.isZero()) return this.abs();
        var a3 = this.clone();
        var b6 = num.clone();
        a3.negative = 0;
        b6.negative = 0;
        for (var shift = 0; a3.isEven() && b6.isEven(); shift++) {
          a3.iushrn(1);
          b6.iushrn(1);
        }
        do {
          while (a3.isEven()) {
            a3.iushrn(1);
          }
          while (b6.isEven()) {
            b6.iushrn(1);
          }
          var r3 = a3.cmp(b6);
          if (r3 < 0) {
            var t = a3;
            a3 = b6;
            b6 = t;
          } else if (r3 === 0 || b6.cmpn(1) === 0) {
            break;
          }
          a3.isub(b6);
        } while (true);
        return b6.iushln(shift);
      };
      BN.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN.prototype.bincn = function bincn(bit) {
        assert2(typeof bit === "number");
        var r3 = bit % 26;
        var s3 = (bit - r3) / 26;
        var q3 = 1 << r3;
        if (this.length <= s3) {
          this._expand(s3 + 1);
          this.words[s3] |= q3;
          return this;
        }
        var carry = q3;
        for (var i4 = s3; carry !== 0 && i4 < this.length; i4++) {
          var w7 = this.words[i4] | 0;
          w7 += carry;
          carry = w7 >>> 26;
          w7 &= 67108863;
          this.words[i4] = w7;
        }
        if (carry !== 0) {
          this.words[i4] = carry;
          this.length++;
        }
        return this;
      };
      BN.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative) return -1;
        if (this.negative === 0 && negative) return 1;
        this.strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert2(num <= 67108863, "Number is too big");
          var w7 = this.words[0] | 0;
          res = w7 === num ? 0 : w7 < num ? -1 : 1;
        }
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1;
        if (this.negative === 0 && num.negative !== 0) return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0) return -res | 0;
        return res;
      };
      BN.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length) return 1;
        if (this.length < num.length) return -1;
        var res = 0;
        for (var i4 = this.length - 1; i4 >= 0; i4--) {
          var a3 = this.words[i4] | 0;
          var b6 = num.words[i4] | 0;
          if (a3 === b6) continue;
          if (a3 < b6) {
            res = -1;
          } else if (a3 > b6) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN.prototype.gt = function gt5(num) {
        return this.cmp(num) === 1;
      };
      BN.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN.prototype.lt = function lt4(num) {
        return this.cmp(num) === -1;
      };
      BN.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN.red = function red(num) {
        return new Red(num);
      };
      BN.prototype.toRed = function toRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        assert2(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN.prototype.fromRed = function fromRed() {
        assert2(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN.prototype.forceRed = function forceRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN.prototype.redAdd = function redAdd(num) {
        assert2(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN.prototype.redIAdd = function redIAdd(num) {
        assert2(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN.prototype.redSub = function redSub(num) {
        assert2(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN.prototype.redISub = function redISub(num) {
        assert2(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN.prototype.redShl = function redShl(num) {
        assert2(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN.prototype.redMul = function redMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN.prototype.redIMul = function redIMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN.prototype.redSqr = function redSqr() {
        assert2(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN.prototype.redISqr = function redISqr() {
        assert2(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN.prototype.redSqrt = function redSqrt() {
        assert2(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN.prototype.redInvm = function redInvm() {
        assert2(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN.prototype.redNeg = function redNeg() {
        assert2(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN.prototype.redPow = function redPow(num) {
        assert2(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name2, p6) {
        this.name = name2;
        this.p = new BN(p6, 16);
        this.n = this.p.bitLength();
        this.k = new BN(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r3 = num;
        var rlen;
        do {
          this.split(r3, this.tmp);
          r3 = this.imulK(r3);
          r3 = r3.iadd(this.tmp);
          rlen = r3.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r3.ucmp(this.p);
        if (cmp === 0) {
          r3.words[0] = 0;
          r3.length = 1;
        } else if (cmp > 0) {
          r3.isub(this.p);
        } else {
          if (r3.strip !== void 0) {
            r3.strip();
          } else {
            r3._strip();
          }
        }
        return r3;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i4 = 0; i4 < outLen; i4++) {
          output.words[i4] = input.words[i4];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask;
        for (i4 = 10; i4 < input.length; i4++) {
          var next = input.words[i4] | 0;
          input.words[i4 - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i4 - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo4 = 0;
        for (var i4 = 0; i4 < num.length; i4++) {
          var w7 = num.words[i4] | 0;
          lo4 += w7 * 977;
          num.words[i4] = lo4 & 67108863;
          lo4 = w7 * 64 + (lo4 / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i4 = 0; i4 < num.length; i4++) {
          var hi3 = (num.words[i4] | 0) * 19 + carry;
          var lo4 = hi3 & 67108863;
          hi3 >>>= 26;
          num.words[i4] = lo4;
          carry = hi3;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN._prime = function prime(name2) {
        if (primes[name2]) return primes[name2];
        var prime2;
        if (name2 === "k256") {
          prime2 = new K256();
        } else if (name2 === "p224") {
          prime2 = new P224();
        } else if (name2 === "p192") {
          prime2 = new P192();
        } else if (name2 === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name2);
        }
        primes[name2] = prime2;
        return prime2;
      };
      function Red(m5) {
        if (typeof m5 === "string") {
          var prime = BN._prime(m5);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert2(m5.gtn(1), "modulus must be greater than 1");
          this.m = m5;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a3) {
        assert2(a3.negative === 0, "red works only with positives");
        assert2(a3.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a3, b6) {
        assert2((a3.negative | b6.negative) === 0, "red works only with positives");
        assert2(
          a3.red && a3.red === b6.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a3) {
        if (this.prime) return this.prime.ireduce(a3)._forceRed(this);
        return a3.umod(this.m)._forceRed(this);
      };
      Red.prototype.neg = function neg(a3) {
        if (a3.isZero()) {
          return a3.clone();
        }
        return this.m.sub(a3)._forceRed(this);
      };
      Red.prototype.add = function add(a3, b6) {
        this._verify2(a3, b6);
        var res = a3.add(b6);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a3, b6) {
        this._verify2(a3, b6);
        var res = a3.iadd(b6);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a3, b6) {
        this._verify2(a3, b6);
        var res = a3.sub(b6);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a3, b6) {
        this._verify2(a3, b6);
        var res = a3.isub(b6);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a3, num) {
        this._verify1(a3);
        return this.imod(a3.ushln(num));
      };
      Red.prototype.imul = function imul(a3, b6) {
        this._verify2(a3, b6);
        return this.imod(a3.imul(b6));
      };
      Red.prototype.mul = function mul(a3, b6) {
        this._verify2(a3, b6);
        return this.imod(a3.mul(b6));
      };
      Red.prototype.isqr = function isqr(a3) {
        return this.imul(a3, a3.clone());
      };
      Red.prototype.sqr = function sqr(a3) {
        return this.mul(a3, a3);
      };
      Red.prototype.sqrt = function sqrt(a3) {
        if (a3.isZero()) return a3.clone();
        var mod3 = this.m.andln(3);
        assert2(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN(1)).iushrn(2);
          return this.pow(a3, pow);
        }
        var q3 = this.m.subn(1);
        var s3 = 0;
        while (!q3.isZero() && q3.andln(1) === 0) {
          s3++;
          q3.iushrn(1);
        }
        assert2(!q3.isZero());
        var one = new BN(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z7 = this.m.bitLength();
        z7 = new BN(2 * z7 * z7).toRed(this);
        while (this.pow(z7, lpow).cmp(nOne) !== 0) {
          z7.redIAdd(nOne);
        }
        var c7 = this.pow(z7, q3);
        var r3 = this.pow(a3, q3.addn(1).iushrn(1));
        var t = this.pow(a3, q3);
        var m5 = s3;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i4 = 0; tmp.cmp(one) !== 0; i4++) {
            tmp = tmp.redSqr();
          }
          assert2(i4 < m5);
          var b6 = this.pow(c7, new BN(1).iushln(m5 - i4 - 1));
          r3 = r3.redMul(b6);
          c7 = b6.redSqr();
          t = t.redMul(c7);
          m5 = i4;
        }
        return r3;
      };
      Red.prototype.invm = function invm(a3) {
        var inv = a3._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a3, num) {
        if (num.isZero()) return new BN(1).toRed(this);
        if (num.cmpn(1) === 0) return a3.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN(1).toRed(this);
        wnd[1] = a3;
        for (var i4 = 2; i4 < wnd.length; i4++) {
          wnd[i4] = this.mul(wnd[i4 - 1], a3);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i4 = num.length - 1; i4 >= 0; i4--) {
          var word = num.words[i4];
          for (var j5 = start - 1; j5 >= 0; j5--) {
            var bit = word >> j5 & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i4 !== 0 || j5 !== 0)) continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r3 = num.umod(this.m);
        return r3 === num ? r3.clone() : r3;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m5) {
        Red.call(this, m5);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r3 = this.imod(num.mul(this.rinv));
        r3.red = null;
        return r3;
      };
      Mont.prototype.imul = function imul(a3, b6) {
        if (a3.isZero() || b6.isZero()) {
          a3.words[0] = 0;
          a3.length = 1;
          return a3;
        }
        var t = a3.imul(b6);
        var c7 = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u4 = t.isub(c7).iushrn(this.shift);
        var res = u4;
        if (u4.cmp(this.m) >= 0) {
          res = u4.isub(this.m);
        } else if (u4.cmpn(0) < 0) {
          res = u4.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a3, b6) {
        if (a3.isZero() || b6.isZero()) return new BN(0)._forceRed(this);
        var t = a3.mul(b6);
        var c7 = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u4 = t.isub(c7).iushrn(this.shift);
        var res = u4;
        if (u4.cmp(this.m) >= 0) {
          res = u4.isub(this.m);
        } else if (u4.cmpn(0) < 0) {
          res = u4.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a3) {
        var res = this.imod(a3._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// node_modules/minimalistic-assert/index.js
var require_minimalistic_assert = __commonJS({
  "node_modules/minimalistic-assert/index.js"(exports, module) {
    module.exports = assert2;
    function assert2(val, msg) {
      if (!val)
        throw new Error(msg || "Assertion failed");
    }
    assert2.equal = function assertEqual(l7, r3, msg) {
      if (l7 != r3)
        throw new Error(msg || "Assertion failed: " + l7 + " != " + r3);
    };
  }
});

// node_modules/minimalistic-crypto-utils/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/minimalistic-crypto-utils/lib/utils.js"(exports) {
    "use strict";
    var utils = exports;
    function toArray(msg, enc) {
      if (Array.isArray(msg))
        return msg.slice();
      if (!msg)
        return [];
      var res = [];
      if (typeof msg !== "string") {
        for (var i4 = 0; i4 < msg.length; i4++)
          res[i4] = msg[i4] | 0;
        return res;
      }
      if (enc === "hex") {
        msg = msg.replace(/[^a-z0-9]+/ig, "");
        if (msg.length % 2 !== 0)
          msg = "0" + msg;
        for (var i4 = 0; i4 < msg.length; i4 += 2)
          res.push(parseInt(msg[i4] + msg[i4 + 1], 16));
      } else {
        for (var i4 = 0; i4 < msg.length; i4++) {
          var c7 = msg.charCodeAt(i4);
          var hi3 = c7 >> 8;
          var lo4 = c7 & 255;
          if (hi3)
            res.push(hi3, lo4);
          else
            res.push(lo4);
        }
      }
      return res;
    }
    utils.toArray = toArray;
    function zero2(word) {
      if (word.length === 1)
        return "0" + word;
      else
        return word;
    }
    utils.zero2 = zero2;
    function toHex3(msg) {
      var res = "";
      for (var i4 = 0; i4 < msg.length; i4++)
        res += zero2(msg[i4].toString(16));
      return res;
    }
    utils.toHex = toHex3;
    utils.encode = function encode8(arr, enc) {
      if (enc === "hex")
        return toHex3(arr);
      else
        return arr;
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/utils.js
var require_utils3 = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/utils.js"(exports) {
    "use strict";
    var utils = exports;
    var BN = require_bn();
    var minAssert = require_minimalistic_assert();
    var minUtils = require_utils2();
    utils.assert = minAssert;
    utils.toArray = minUtils.toArray;
    utils.zero2 = minUtils.zero2;
    utils.toHex = minUtils.toHex;
    utils.encode = minUtils.encode;
    function getNAF(num, w7, bits) {
      var naf = new Array(Math.max(num.bitLength(), bits) + 1);
      var i4;
      for (i4 = 0; i4 < naf.length; i4 += 1) {
        naf[i4] = 0;
      }
      var ws2 = 1 << w7 + 1;
      var k7 = num.clone();
      for (i4 = 0; i4 < naf.length; i4++) {
        var z7;
        var mod = k7.andln(ws2 - 1);
        if (k7.isOdd()) {
          if (mod > (ws2 >> 1) - 1)
            z7 = (ws2 >> 1) - mod;
          else
            z7 = mod;
          k7.isubn(z7);
        } else {
          z7 = 0;
        }
        naf[i4] = z7;
        k7.iushrn(1);
      }
      return naf;
    }
    utils.getNAF = getNAF;
    function getJSF(k1, k22) {
      var jsf = [
        [],
        []
      ];
      k1 = k1.clone();
      k22 = k22.clone();
      var d1 = 0;
      var d22 = 0;
      var m8;
      while (k1.cmpn(-d1) > 0 || k22.cmpn(-d22) > 0) {
        var m14 = k1.andln(3) + d1 & 3;
        var m24 = k22.andln(3) + d22 & 3;
        if (m14 === 3)
          m14 = -1;
        if (m24 === 3)
          m24 = -1;
        var u1;
        if ((m14 & 1) === 0) {
          u1 = 0;
        } else {
          m8 = k1.andln(7) + d1 & 7;
          if ((m8 === 3 || m8 === 5) && m24 === 2)
            u1 = -m14;
          else
            u1 = m14;
        }
        jsf[0].push(u1);
        var u22;
        if ((m24 & 1) === 0) {
          u22 = 0;
        } else {
          m8 = k22.andln(7) + d22 & 7;
          if ((m8 === 3 || m8 === 5) && m14 === 2)
            u22 = -m24;
          else
            u22 = m24;
        }
        jsf[1].push(u22);
        if (2 * d1 === u1 + 1)
          d1 = 1 - d1;
        if (2 * d22 === u22 + 1)
          d22 = 1 - d22;
        k1.iushrn(1);
        k22.iushrn(1);
      }
      return jsf;
    }
    utils.getJSF = getJSF;
    function cachedProperty(obj, name2, computer) {
      var key = "_" + name2;
      obj.prototype[name2] = function cachedProperty2() {
        return this[key] !== void 0 ? this[key] : this[key] = computer.call(this);
      };
    }
    utils.cachedProperty = cachedProperty;
    function parseBytes(bytes) {
      return typeof bytes === "string" ? utils.toArray(bytes, "hex") : bytes;
    }
    utils.parseBytes = parseBytes;
    function intFromLE(bytes) {
      return new BN(bytes, "hex", "le");
    }
    utils.intFromLE = intFromLE;
  }
});

// browser-external:crypto
var require_crypto = __commonJS({
  "browser-external:crypto"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_5, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/brorand/index.js
var require_brorand = __commonJS({
  "node_modules/brorand/index.js"(exports, module) {
    var r3;
    module.exports = function rand(len) {
      if (!r3)
        r3 = new Rand(null);
      return r3.generate(len);
    };
    function Rand(rand) {
      this.rand = rand;
    }
    module.exports.Rand = Rand;
    Rand.prototype.generate = function generate(len) {
      return this._rand(len);
    };
    Rand.prototype._rand = function _rand(n5) {
      if (this.rand.getBytes)
        return this.rand.getBytes(n5);
      var res = new Uint8Array(n5);
      for (var i4 = 0; i4 < res.length; i4++)
        res[i4] = this.rand.getByte();
      return res;
    };
    if (typeof self === "object") {
      if (self.crypto && self.crypto.getRandomValues) {
        Rand.prototype._rand = function _rand(n5) {
          var arr = new Uint8Array(n5);
          self.crypto.getRandomValues(arr);
          return arr;
        };
      } else if (self.msCrypto && self.msCrypto.getRandomValues) {
        Rand.prototype._rand = function _rand(n5) {
          var arr = new Uint8Array(n5);
          self.msCrypto.getRandomValues(arr);
          return arr;
        };
      } else if (typeof window === "object") {
        Rand.prototype._rand = function() {
          throw new Error("Not implemented yet");
        };
      }
    } else {
      try {
        crypto2 = require_crypto();
        if (typeof crypto2.randomBytes !== "function")
          throw new Error("Not supported");
        Rand.prototype._rand = function _rand(n5) {
          return crypto2.randomBytes(n5);
        };
      } catch (e2) {
      }
    }
    var crypto2;
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curve/base.js
var require_base = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curve/base.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils3();
    var getNAF = utils.getNAF;
    var getJSF = utils.getJSF;
    var assert2 = utils.assert;
    function BaseCurve(type, conf) {
      this.type = type;
      this.p = new BN(conf.p, 16);
      this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);
      this.zero = new BN(0).toRed(this.red);
      this.one = new BN(1).toRed(this.red);
      this.two = new BN(2).toRed(this.red);
      this.n = conf.n && new BN(conf.n, 16);
      this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
      this._wnafT1 = new Array(4);
      this._wnafT2 = new Array(4);
      this._wnafT3 = new Array(4);
      this._wnafT4 = new Array(4);
      this._bitLength = this.n ? this.n.bitLength() : 0;
      var adjustCount = this.n && this.p.div(this.n);
      if (!adjustCount || adjustCount.cmpn(100) > 0) {
        this.redN = null;
      } else {
        this._maxwellTrick = true;
        this.redN = this.n.toRed(this.red);
      }
    }
    module.exports = BaseCurve;
    BaseCurve.prototype.point = function point() {
      throw new Error("Not implemented");
    };
    BaseCurve.prototype.validate = function validate4() {
      throw new Error("Not implemented");
    };
    BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p6, k7) {
      assert2(p6.precomputed);
      var doubles = p6._getDoubles();
      var naf = getNAF(k7, 1, this._bitLength);
      var I4 = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
      I4 /= 3;
      var repr = [];
      var j5;
      var nafW;
      for (j5 = 0; j5 < naf.length; j5 += doubles.step) {
        nafW = 0;
        for (var l7 = j5 + doubles.step - 1; l7 >= j5; l7--)
          nafW = (nafW << 1) + naf[l7];
        repr.push(nafW);
      }
      var a3 = this.jpoint(null, null, null);
      var b6 = this.jpoint(null, null, null);
      for (var i4 = I4; i4 > 0; i4--) {
        for (j5 = 0; j5 < repr.length; j5++) {
          nafW = repr[j5];
          if (nafW === i4)
            b6 = b6.mixedAdd(doubles.points[j5]);
          else if (nafW === -i4)
            b6 = b6.mixedAdd(doubles.points[j5].neg());
        }
        a3 = a3.add(b6);
      }
      return a3.toP();
    };
    BaseCurve.prototype._wnafMul = function _wnafMul(p6, k7) {
      var w7 = 4;
      var nafPoints = p6._getNAFPoints(w7);
      w7 = nafPoints.wnd;
      var wnd = nafPoints.points;
      var naf = getNAF(k7, w7, this._bitLength);
      var acc = this.jpoint(null, null, null);
      for (var i4 = naf.length - 1; i4 >= 0; i4--) {
        for (var l7 = 0; i4 >= 0 && naf[i4] === 0; i4--)
          l7++;
        if (i4 >= 0)
          l7++;
        acc = acc.dblp(l7);
        if (i4 < 0)
          break;
        var z7 = naf[i4];
        assert2(z7 !== 0);
        if (p6.type === "affine") {
          if (z7 > 0)
            acc = acc.mixedAdd(wnd[z7 - 1 >> 1]);
          else
            acc = acc.mixedAdd(wnd[-z7 - 1 >> 1].neg());
        } else {
          if (z7 > 0)
            acc = acc.add(wnd[z7 - 1 >> 1]);
          else
            acc = acc.add(wnd[-z7 - 1 >> 1].neg());
        }
      }
      return p6.type === "affine" ? acc.toP() : acc;
    };
    BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
      var wndWidth = this._wnafT1;
      var wnd = this._wnafT2;
      var naf = this._wnafT3;
      var max = 0;
      var i4;
      var j5;
      var p6;
      for (i4 = 0; i4 < len; i4++) {
        p6 = points[i4];
        var nafPoints = p6._getNAFPoints(defW);
        wndWidth[i4] = nafPoints.wnd;
        wnd[i4] = nafPoints.points;
      }
      for (i4 = len - 1; i4 >= 1; i4 -= 2) {
        var a3 = i4 - 1;
        var b6 = i4;
        if (wndWidth[a3] !== 1 || wndWidth[b6] !== 1) {
          naf[a3] = getNAF(coeffs[a3], wndWidth[a3], this._bitLength);
          naf[b6] = getNAF(coeffs[b6], wndWidth[b6], this._bitLength);
          max = Math.max(naf[a3].length, max);
          max = Math.max(naf[b6].length, max);
          continue;
        }
        var comb = [
          points[a3],
          /* 1 */
          null,
          /* 3 */
          null,
          /* 5 */
          points[b6]
          /* 7 */
        ];
        if (points[a3].y.cmp(points[b6].y) === 0) {
          comb[1] = points[a3].add(points[b6]);
          comb[2] = points[a3].toJ().mixedAdd(points[b6].neg());
        } else if (points[a3].y.cmp(points[b6].y.redNeg()) === 0) {
          comb[1] = points[a3].toJ().mixedAdd(points[b6]);
          comb[2] = points[a3].add(points[b6].neg());
        } else {
          comb[1] = points[a3].toJ().mixedAdd(points[b6]);
          comb[2] = points[a3].toJ().mixedAdd(points[b6].neg());
        }
        var index = [
          -3,
          /* -1 -1 */
          -1,
          /* -1 0 */
          -5,
          /* -1 1 */
          -7,
          /* 0 -1 */
          0,
          /* 0 0 */
          7,
          /* 0 1 */
          5,
          /* 1 -1 */
          1,
          /* 1 0 */
          3
          /* 1 1 */
        ];
        var jsf = getJSF(coeffs[a3], coeffs[b6]);
        max = Math.max(jsf[0].length, max);
        naf[a3] = new Array(max);
        naf[b6] = new Array(max);
        for (j5 = 0; j5 < max; j5++) {
          var ja = jsf[0][j5] | 0;
          var jb = jsf[1][j5] | 0;
          naf[a3][j5] = index[(ja + 1) * 3 + (jb + 1)];
          naf[b6][j5] = 0;
          wnd[a3] = comb;
        }
      }
      var acc = this.jpoint(null, null, null);
      var tmp = this._wnafT4;
      for (i4 = max; i4 >= 0; i4--) {
        var k7 = 0;
        while (i4 >= 0) {
          var zero = true;
          for (j5 = 0; j5 < len; j5++) {
            tmp[j5] = naf[j5][i4] | 0;
            if (tmp[j5] !== 0)
              zero = false;
          }
          if (!zero)
            break;
          k7++;
          i4--;
        }
        if (i4 >= 0)
          k7++;
        acc = acc.dblp(k7);
        if (i4 < 0)
          break;
        for (j5 = 0; j5 < len; j5++) {
          var z7 = tmp[j5];
          p6;
          if (z7 === 0)
            continue;
          else if (z7 > 0)
            p6 = wnd[j5][z7 - 1 >> 1];
          else if (z7 < 0)
            p6 = wnd[j5][-z7 - 1 >> 1].neg();
          if (p6.type === "affine")
            acc = acc.mixedAdd(p6);
          else
            acc = acc.add(p6);
        }
      }
      for (i4 = 0; i4 < len; i4++)
        wnd[i4] = null;
      if (jacobianResult)
        return acc;
      else
        return acc.toP();
    };
    function BasePoint(curve, type) {
      this.curve = curve;
      this.type = type;
      this.precomputed = null;
    }
    BaseCurve.BasePoint = BasePoint;
    BasePoint.prototype.eq = function eq() {
      throw new Error("Not implemented");
    };
    BasePoint.prototype.validate = function validate4() {
      return this.curve.validate(this);
    };
    BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
      bytes = utils.toArray(bytes, enc);
      var len = this.p.byteLength();
      if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
        if (bytes[0] === 6)
          assert2(bytes[bytes.length - 1] % 2 === 0);
        else if (bytes[0] === 7)
          assert2(bytes[bytes.length - 1] % 2 === 1);
        var res = this.point(
          bytes.slice(1, 1 + len),
          bytes.slice(1 + len, 1 + 2 * len)
        );
        return res;
      } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
        return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
      }
      throw new Error("Unknown point format");
    };
    BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
      return this.encode(enc, true);
    };
    BasePoint.prototype._encode = function _encode(compact) {
      var len = this.curve.p.byteLength();
      var x7 = this.getX().toArray("be", len);
      if (compact)
        return [this.getY().isEven() ? 2 : 3].concat(x7);
      return [4].concat(x7, this.getY().toArray("be", len));
    };
    BasePoint.prototype.encode = function encode8(enc, compact) {
      return utils.encode(this._encode(compact), enc);
    };
    BasePoint.prototype.precompute = function precompute(power) {
      if (this.precomputed)
        return this;
      var precomputed = {
        doubles: null,
        naf: null,
        beta: null
      };
      precomputed.naf = this._getNAFPoints(8);
      precomputed.doubles = this._getDoubles(4, power);
      precomputed.beta = this._getBeta();
      this.precomputed = precomputed;
      return this;
    };
    BasePoint.prototype._hasDoubles = function _hasDoubles(k7) {
      if (!this.precomputed)
        return false;
      var doubles = this.precomputed.doubles;
      if (!doubles)
        return false;
      return doubles.points.length >= Math.ceil((k7.bitLength() + 1) / doubles.step);
    };
    BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
      if (this.precomputed && this.precomputed.doubles)
        return this.precomputed.doubles;
      var doubles = [this];
      var acc = this;
      for (var i4 = 0; i4 < power; i4 += step) {
        for (var j5 = 0; j5 < step; j5++)
          acc = acc.dbl();
        doubles.push(acc);
      }
      return {
        step,
        points: doubles
      };
    };
    BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
      if (this.precomputed && this.precomputed.naf)
        return this.precomputed.naf;
      var res = [this];
      var max = (1 << wnd) - 1;
      var dbl = max === 1 ? null : this.dbl();
      for (var i4 = 1; i4 < max; i4++)
        res[i4] = res[i4 - 1].add(dbl);
      return {
        wnd,
        points: res
      };
    };
    BasePoint.prototype._getBeta = function _getBeta() {
      return null;
    };
    BasePoint.prototype.dblp = function dblp(k7) {
      var r3 = this;
      for (var i4 = 0; i4 < k7; i4++)
        r3 = r3.dbl();
      return r3;
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curve/short.js
var require_short = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curve/short.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var BN = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var assert2 = utils.assert;
    function ShortCurve(conf) {
      Base.call(this, "short", conf);
      this.a = new BN(conf.a, 16).toRed(this.red);
      this.b = new BN(conf.b, 16).toRed(this.red);
      this.tinv = this.two.redInvm();
      this.zeroA = this.a.fromRed().cmpn(0) === 0;
      this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
      this.endo = this._getEndomorphism(conf);
      this._endoWnafT1 = new Array(4);
      this._endoWnafT2 = new Array(4);
    }
    inherits(ShortCurve, Base);
    module.exports = ShortCurve;
    ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
      if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
        return;
      var beta;
      var lambda;
      if (conf.beta) {
        beta = new BN(conf.beta, 16).toRed(this.red);
      } else {
        var betas = this._getEndoRoots(this.p);
        beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
        beta = beta.toRed(this.red);
      }
      if (conf.lambda) {
        lambda = new BN(conf.lambda, 16);
      } else {
        var lambdas = this._getEndoRoots(this.n);
        if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
          lambda = lambdas[0];
        } else {
          lambda = lambdas[1];
          assert2(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
        }
      }
      var basis;
      if (conf.basis) {
        basis = conf.basis.map(function(vec) {
          return {
            a: new BN(vec.a, 16),
            b: new BN(vec.b, 16)
          };
        });
      } else {
        basis = this._getEndoBasis(lambda);
      }
      return {
        beta,
        lambda,
        basis
      };
    };
    ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
      var red = num === this.p ? this.red : BN.mont(num);
      var tinv = new BN(2).toRed(red).redInvm();
      var ntinv = tinv.redNeg();
      var s3 = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);
      var l1 = ntinv.redAdd(s3).fromRed();
      var l22 = ntinv.redSub(s3).fromRed();
      return [l1, l22];
    };
    ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
      var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
      var u4 = lambda;
      var v8 = this.n.clone();
      var x1 = new BN(1);
      var y1 = new BN(0);
      var x22 = new BN(0);
      var y22 = new BN(1);
      var a0;
      var b0;
      var a1;
      var b1;
      var a22;
      var b22;
      var prevR;
      var i4 = 0;
      var r3;
      var x7;
      while (u4.cmpn(0) !== 0) {
        var q3 = v8.div(u4);
        r3 = v8.sub(q3.mul(u4));
        x7 = x22.sub(q3.mul(x1));
        var y7 = y22.sub(q3.mul(y1));
        if (!a1 && r3.cmp(aprxSqrt) < 0) {
          a0 = prevR.neg();
          b0 = x1;
          a1 = r3.neg();
          b1 = x7;
        } else if (a1 && ++i4 === 2) {
          break;
        }
        prevR = r3;
        v8 = u4;
        u4 = r3;
        x22 = x1;
        x1 = x7;
        y22 = y1;
        y1 = y7;
      }
      a22 = r3.neg();
      b22 = x7;
      var len1 = a1.sqr().add(b1.sqr());
      var len2 = a22.sqr().add(b22.sqr());
      if (len2.cmp(len1) >= 0) {
        a22 = a0;
        b22 = b0;
      }
      if (a1.negative) {
        a1 = a1.neg();
        b1 = b1.neg();
      }
      if (a22.negative) {
        a22 = a22.neg();
        b22 = b22.neg();
      }
      return [
        { a: a1, b: b1 },
        { a: a22, b: b22 }
      ];
    };
    ShortCurve.prototype._endoSplit = function _endoSplit(k7) {
      var basis = this.endo.basis;
      var v1 = basis[0];
      var v22 = basis[1];
      var c1 = v22.b.mul(k7).divRound(this.n);
      var c22 = v1.b.neg().mul(k7).divRound(this.n);
      var p1 = c1.mul(v1.a);
      var p22 = c22.mul(v22.a);
      var q1 = c1.mul(v1.b);
      var q22 = c22.mul(v22.b);
      var k1 = k7.sub(p1).sub(p22);
      var k22 = q1.add(q22).neg();
      return { k1, k2: k22 };
    };
    ShortCurve.prototype.pointFromX = function pointFromX(x7, odd) {
      x7 = new BN(x7, 16);
      if (!x7.red)
        x7 = x7.toRed(this.red);
      var y22 = x7.redSqr().redMul(x7).redIAdd(x7.redMul(this.a)).redIAdd(this.b);
      var y7 = y22.redSqrt();
      if (y7.redSqr().redSub(y22).cmp(this.zero) !== 0)
        throw new Error("invalid point");
      var isOdd = y7.fromRed().isOdd();
      if (odd && !isOdd || !odd && isOdd)
        y7 = y7.redNeg();
      return this.point(x7, y7);
    };
    ShortCurve.prototype.validate = function validate4(point) {
      if (point.inf)
        return true;
      var x7 = point.x;
      var y7 = point.y;
      var ax = this.a.redMul(x7);
      var rhs = x7.redSqr().redMul(x7).redIAdd(ax).redIAdd(this.b);
      return y7.redSqr().redISub(rhs).cmpn(0) === 0;
    };
    ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
      var npoints = this._endoWnafT1;
      var ncoeffs = this._endoWnafT2;
      for (var i4 = 0; i4 < points.length; i4++) {
        var split = this._endoSplit(coeffs[i4]);
        var p6 = points[i4];
        var beta = p6._getBeta();
        if (split.k1.negative) {
          split.k1.ineg();
          p6 = p6.neg(true);
        }
        if (split.k2.negative) {
          split.k2.ineg();
          beta = beta.neg(true);
        }
        npoints[i4 * 2] = p6;
        npoints[i4 * 2 + 1] = beta;
        ncoeffs[i4 * 2] = split.k1;
        ncoeffs[i4 * 2 + 1] = split.k2;
      }
      var res = this._wnafMulAdd(1, npoints, ncoeffs, i4 * 2, jacobianResult);
      for (var j5 = 0; j5 < i4 * 2; j5++) {
        npoints[j5] = null;
        ncoeffs[j5] = null;
      }
      return res;
    };
    function Point(curve, x7, y7, isRed) {
      Base.BasePoint.call(this, curve, "affine");
      if (x7 === null && y7 === null) {
        this.x = null;
        this.y = null;
        this.inf = true;
      } else {
        this.x = new BN(x7, 16);
        this.y = new BN(y7, 16);
        if (isRed) {
          this.x.forceRed(this.curve.red);
          this.y.forceRed(this.curve.red);
        }
        if (!this.x.red)
          this.x = this.x.toRed(this.curve.red);
        if (!this.y.red)
          this.y = this.y.toRed(this.curve.red);
        this.inf = false;
      }
    }
    inherits(Point, Base.BasePoint);
    ShortCurve.prototype.point = function point(x7, y7, isRed) {
      return new Point(this, x7, y7, isRed);
    };
    ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
      return Point.fromJSON(this, obj, red);
    };
    Point.prototype._getBeta = function _getBeta() {
      if (!this.curve.endo)
        return;
      var pre = this.precomputed;
      if (pre && pre.beta)
        return pre.beta;
      var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (pre) {
        var curve = this.curve;
        var endoMul = function(p6) {
          return curve.point(p6.x.redMul(curve.endo.beta), p6.y);
        };
        pre.beta = beta;
        beta.precomputed = {
          beta: null,
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: pre.naf.points.map(endoMul)
          },
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: pre.doubles.points.map(endoMul)
          }
        };
      }
      return beta;
    };
    Point.prototype.toJSON = function toJSON() {
      if (!this.precomputed)
        return [this.x, this.y];
      return [this.x, this.y, this.precomputed && {
        doubles: this.precomputed.doubles && {
          step: this.precomputed.doubles.step,
          points: this.precomputed.doubles.points.slice(1)
        },
        naf: this.precomputed.naf && {
          wnd: this.precomputed.naf.wnd,
          points: this.precomputed.naf.points.slice(1)
        }
      }];
    };
    Point.fromJSON = function fromJSON(curve, obj, red) {
      if (typeof obj === "string")
        obj = JSON.parse(obj);
      var res = curve.point(obj[0], obj[1], red);
      if (!obj[2])
        return res;
      function obj2point(obj2) {
        return curve.point(obj2[0], obj2[1], red);
      }
      var pre = obj[2];
      res.precomputed = {
        beta: null,
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: [res].concat(pre.doubles.points.map(obj2point))
        },
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: [res].concat(pre.naf.points.map(obj2point))
        }
      };
      return res;
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.inf;
    };
    Point.prototype.add = function add(p6) {
      if (this.inf)
        return p6;
      if (p6.inf)
        return this;
      if (this.eq(p6))
        return this.dbl();
      if (this.neg().eq(p6))
        return this.curve.point(null, null);
      if (this.x.cmp(p6.x) === 0)
        return this.curve.point(null, null);
      var c7 = this.y.redSub(p6.y);
      if (c7.cmpn(0) !== 0)
        c7 = c7.redMul(this.x.redSub(p6.x).redInvm());
      var nx = c7.redSqr().redISub(this.x).redISub(p6.x);
      var ny = c7.redMul(this.x.redSub(nx)).redISub(this.y);
      return this.curve.point(nx, ny);
    };
    Point.prototype.dbl = function dbl() {
      if (this.inf)
        return this;
      var ys1 = this.y.redAdd(this.y);
      if (ys1.cmpn(0) === 0)
        return this.curve.point(null, null);
      var a3 = this.curve.a;
      var x22 = this.x.redSqr();
      var dyinv = ys1.redInvm();
      var c7 = x22.redAdd(x22).redIAdd(x22).redIAdd(a3).redMul(dyinv);
      var nx = c7.redSqr().redISub(this.x.redAdd(this.x));
      var ny = c7.redMul(this.x.redSub(nx)).redISub(this.y);
      return this.curve.point(nx, ny);
    };
    Point.prototype.getX = function getX() {
      return this.x.fromRed();
    };
    Point.prototype.getY = function getY() {
      return this.y.fromRed();
    };
    Point.prototype.mul = function mul(k7) {
      k7 = new BN(k7, 16);
      if (this.isInfinity())
        return this;
      else if (this._hasDoubles(k7))
        return this.curve._fixedNafMul(this, k7);
      else if (this.curve.endo)
        return this.curve._endoWnafMulAdd([this], [k7]);
      else
        return this.curve._wnafMul(this, k7);
    };
    Point.prototype.mulAdd = function mulAdd(k1, p22, k22) {
      var points = [this, p22];
      var coeffs = [k1, k22];
      if (this.curve.endo)
        return this.curve._endoWnafMulAdd(points, coeffs);
      else
        return this.curve._wnafMulAdd(1, points, coeffs, 2);
    };
    Point.prototype.jmulAdd = function jmulAdd(k1, p22, k22) {
      var points = [this, p22];
      var coeffs = [k1, k22];
      if (this.curve.endo)
        return this.curve._endoWnafMulAdd(points, coeffs, true);
      else
        return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
    };
    Point.prototype.eq = function eq(p6) {
      return this === p6 || this.inf === p6.inf && (this.inf || this.x.cmp(p6.x) === 0 && this.y.cmp(p6.y) === 0);
    };
    Point.prototype.neg = function neg(_precompute) {
      if (this.inf)
        return this;
      var res = this.curve.point(this.x, this.y.redNeg());
      if (_precompute && this.precomputed) {
        var pre = this.precomputed;
        var negate = function(p6) {
          return p6.neg();
        };
        res.precomputed = {
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: pre.naf.points.map(negate)
          },
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: pre.doubles.points.map(negate)
          }
        };
      }
      return res;
    };
    Point.prototype.toJ = function toJ() {
      if (this.inf)
        return this.curve.jpoint(null, null, null);
      var res = this.curve.jpoint(this.x, this.y, this.curve.one);
      return res;
    };
    function JPoint(curve, x7, y7, z7) {
      Base.BasePoint.call(this, curve, "jacobian");
      if (x7 === null && y7 === null && z7 === null) {
        this.x = this.curve.one;
        this.y = this.curve.one;
        this.z = new BN(0);
      } else {
        this.x = new BN(x7, 16);
        this.y = new BN(y7, 16);
        this.z = new BN(z7, 16);
      }
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.y.red)
        this.y = this.y.toRed(this.curve.red);
      if (!this.z.red)
        this.z = this.z.toRed(this.curve.red);
      this.zOne = this.z === this.curve.one;
    }
    inherits(JPoint, Base.BasePoint);
    ShortCurve.prototype.jpoint = function jpoint(x7, y7, z7) {
      return new JPoint(this, x7, y7, z7);
    };
    JPoint.prototype.toP = function toP() {
      if (this.isInfinity())
        return this.curve.point(null, null);
      var zinv = this.z.redInvm();
      var zinv2 = zinv.redSqr();
      var ax = this.x.redMul(zinv2);
      var ay = this.y.redMul(zinv2).redMul(zinv);
      return this.curve.point(ax, ay);
    };
    JPoint.prototype.neg = function neg() {
      return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
    };
    JPoint.prototype.add = function add(p6) {
      if (this.isInfinity())
        return p6;
      if (p6.isInfinity())
        return this;
      var pz2 = p6.z.redSqr();
      var z22 = this.z.redSqr();
      var u1 = this.x.redMul(pz2);
      var u22 = p6.x.redMul(z22);
      var s1 = this.y.redMul(pz2.redMul(p6.z));
      var s22 = p6.y.redMul(z22.redMul(this.z));
      var h5 = u1.redSub(u22);
      var r3 = s1.redSub(s22);
      if (h5.cmpn(0) === 0) {
        if (r3.cmpn(0) !== 0)
          return this.curve.jpoint(null, null, null);
        else
          return this.dbl();
      }
      var h22 = h5.redSqr();
      var h32 = h22.redMul(h5);
      var v8 = u1.redMul(h22);
      var nx = r3.redSqr().redIAdd(h32).redISub(v8).redISub(v8);
      var ny = r3.redMul(v8.redISub(nx)).redISub(s1.redMul(h32));
      var nz = this.z.redMul(p6.z).redMul(h5);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.mixedAdd = function mixedAdd(p6) {
      if (this.isInfinity())
        return p6.toJ();
      if (p6.isInfinity())
        return this;
      var z22 = this.z.redSqr();
      var u1 = this.x;
      var u22 = p6.x.redMul(z22);
      var s1 = this.y;
      var s22 = p6.y.redMul(z22).redMul(this.z);
      var h5 = u1.redSub(u22);
      var r3 = s1.redSub(s22);
      if (h5.cmpn(0) === 0) {
        if (r3.cmpn(0) !== 0)
          return this.curve.jpoint(null, null, null);
        else
          return this.dbl();
      }
      var h22 = h5.redSqr();
      var h32 = h22.redMul(h5);
      var v8 = u1.redMul(h22);
      var nx = r3.redSqr().redIAdd(h32).redISub(v8).redISub(v8);
      var ny = r3.redMul(v8.redISub(nx)).redISub(s1.redMul(h32));
      var nz = this.z.redMul(h5);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.dblp = function dblp(pow) {
      if (pow === 0)
        return this;
      if (this.isInfinity())
        return this;
      if (!pow)
        return this.dbl();
      var i4;
      if (this.curve.zeroA || this.curve.threeA) {
        var r3 = this;
        for (i4 = 0; i4 < pow; i4++)
          r3 = r3.dbl();
        return r3;
      }
      var a3 = this.curve.a;
      var tinv = this.curve.tinv;
      var jx = this.x;
      var jy = this.y;
      var jz = this.z;
      var jz4 = jz.redSqr().redSqr();
      var jyd = jy.redAdd(jy);
      for (i4 = 0; i4 < pow; i4++) {
        var jx2 = jx.redSqr();
        var jyd2 = jyd.redSqr();
        var jyd4 = jyd2.redSqr();
        var c7 = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a3.redMul(jz4));
        var t1 = jx.redMul(jyd2);
        var nx = c7.redSqr().redISub(t1.redAdd(t1));
        var t2 = t1.redISub(nx);
        var dny = c7.redMul(t2);
        dny = dny.redIAdd(dny).redISub(jyd4);
        var nz = jyd.redMul(jz);
        if (i4 + 1 < pow)
          jz4 = jz4.redMul(jyd4);
        jx = nx;
        jz = nz;
        jyd = dny;
      }
      return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
    };
    JPoint.prototype.dbl = function dbl() {
      if (this.isInfinity())
        return this;
      if (this.curve.zeroA)
        return this._zeroDbl();
      else if (this.curve.threeA)
        return this._threeDbl();
      else
        return this._dbl();
    };
    JPoint.prototype._zeroDbl = function _zeroDbl() {
      var nx;
      var ny;
      var nz;
      if (this.zOne) {
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var yyyy = yy.redSqr();
        var s3 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        s3 = s3.redIAdd(s3);
        var m5 = xx.redAdd(xx).redIAdd(xx);
        var t = m5.redSqr().redISub(s3).redISub(s3);
        var yyyy8 = yyyy.redIAdd(yyyy);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        nx = t;
        ny = m5.redMul(s3.redISub(t)).redISub(yyyy8);
        nz = this.y.redAdd(this.y);
      } else {
        var a3 = this.x.redSqr();
        var b6 = this.y.redSqr();
        var c7 = b6.redSqr();
        var d6 = this.x.redAdd(b6).redSqr().redISub(a3).redISub(c7);
        d6 = d6.redIAdd(d6);
        var e2 = a3.redAdd(a3).redIAdd(a3);
        var f6 = e2.redSqr();
        var c8 = c7.redIAdd(c7);
        c8 = c8.redIAdd(c8);
        c8 = c8.redIAdd(c8);
        nx = f6.redISub(d6).redISub(d6);
        ny = e2.redMul(d6.redISub(nx)).redISub(c8);
        nz = this.y.redMul(this.z);
        nz = nz.redIAdd(nz);
      }
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype._threeDbl = function _threeDbl() {
      var nx;
      var ny;
      var nz;
      if (this.zOne) {
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var yyyy = yy.redSqr();
        var s3 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        s3 = s3.redIAdd(s3);
        var m5 = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
        var t = m5.redSqr().redISub(s3).redISub(s3);
        nx = t;
        var yyyy8 = yyyy.redIAdd(yyyy);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        ny = m5.redMul(s3.redISub(t)).redISub(yyyy8);
        nz = this.y.redAdd(this.y);
      } else {
        var delta = this.z.redSqr();
        var gamma = this.y.redSqr();
        var beta = this.x.redMul(gamma);
        var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
        alpha = alpha.redAdd(alpha).redIAdd(alpha);
        var beta4 = beta.redIAdd(beta);
        beta4 = beta4.redIAdd(beta4);
        var beta8 = beta4.redAdd(beta4);
        nx = alpha.redSqr().redISub(beta8);
        nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
        var ggamma8 = gamma.redSqr();
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
      }
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype._dbl = function _dbl() {
      var a3 = this.curve.a;
      var jx = this.x;
      var jy = this.y;
      var jz = this.z;
      var jz4 = jz.redSqr().redSqr();
      var jx2 = jx.redSqr();
      var jy2 = jy.redSqr();
      var c7 = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a3.redMul(jz4));
      var jxd4 = jx.redAdd(jx);
      jxd4 = jxd4.redIAdd(jxd4);
      var t1 = jxd4.redMul(jy2);
      var nx = c7.redSqr().redISub(t1.redAdd(t1));
      var t2 = t1.redISub(nx);
      var jyd8 = jy2.redSqr();
      jyd8 = jyd8.redIAdd(jyd8);
      jyd8 = jyd8.redIAdd(jyd8);
      jyd8 = jyd8.redIAdd(jyd8);
      var ny = c7.redMul(t2).redISub(jyd8);
      var nz = jy.redAdd(jy).redMul(jz);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.trpl = function trpl() {
      if (!this.curve.zeroA)
        return this.dbl().add(this);
      var xx = this.x.redSqr();
      var yy = this.y.redSqr();
      var zz = this.z.redSqr();
      var yyyy = yy.redSqr();
      var m5 = xx.redAdd(xx).redIAdd(xx);
      var mm = m5.redSqr();
      var e2 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      e2 = e2.redIAdd(e2);
      e2 = e2.redAdd(e2).redIAdd(e2);
      e2 = e2.redISub(mm);
      var ee4 = e2.redSqr();
      var t = yyyy.redIAdd(yyyy);
      t = t.redIAdd(t);
      t = t.redIAdd(t);
      t = t.redIAdd(t);
      var u4 = m5.redIAdd(e2).redSqr().redISub(mm).redISub(ee4).redISub(t);
      var yyu4 = yy.redMul(u4);
      yyu4 = yyu4.redIAdd(yyu4);
      yyu4 = yyu4.redIAdd(yyu4);
      var nx = this.x.redMul(ee4).redISub(yyu4);
      nx = nx.redIAdd(nx);
      nx = nx.redIAdd(nx);
      var ny = this.y.redMul(u4.redMul(t.redISub(u4)).redISub(e2.redMul(ee4)));
      ny = ny.redIAdd(ny);
      ny = ny.redIAdd(ny);
      ny = ny.redIAdd(ny);
      var nz = this.z.redAdd(e2).redSqr().redISub(zz).redISub(ee4);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.mul = function mul(k7, kbase) {
      k7 = new BN(k7, kbase);
      return this.curve._wnafMul(this, k7);
    };
    JPoint.prototype.eq = function eq(p6) {
      if (p6.type === "affine")
        return this.eq(p6.toJ());
      if (this === p6)
        return true;
      var z22 = this.z.redSqr();
      var pz2 = p6.z.redSqr();
      if (this.x.redMul(pz2).redISub(p6.x.redMul(z22)).cmpn(0) !== 0)
        return false;
      var z32 = z22.redMul(this.z);
      var pz3 = pz2.redMul(p6.z);
      return this.y.redMul(pz3).redISub(p6.y.redMul(z32)).cmpn(0) === 0;
    };
    JPoint.prototype.eqXToP = function eqXToP(x7) {
      var zs2 = this.z.redSqr();
      var rx = x7.toRed(this.curve.red).redMul(zs2);
      if (this.x.cmp(rx) === 0)
        return true;
      var xc = x7.clone();
      var t = this.curve.redN.redMul(zs2);
      for (; ; ) {
        xc.iadd(this.curve.n);
        if (xc.cmp(this.curve.p) >= 0)
          return false;
        rx.redIAdd(t);
        if (this.x.cmp(rx) === 0)
          return true;
      }
    };
    JPoint.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC JPoint Infinity>";
      return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
    };
    JPoint.prototype.isInfinity = function isInfinity() {
      return this.z.cmpn(0) === 0;
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curve/mont.js
var require_mont = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curve/mont.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var utils = require_utils3();
    function MontCurve(conf) {
      Base.call(this, "mont", conf);
      this.a = new BN(conf.a, 16).toRed(this.red);
      this.b = new BN(conf.b, 16).toRed(this.red);
      this.i4 = new BN(4).toRed(this.red).redInvm();
      this.two = new BN(2).toRed(this.red);
      this.a24 = this.i4.redMul(this.a.redAdd(this.two));
    }
    inherits(MontCurve, Base);
    module.exports = MontCurve;
    MontCurve.prototype.validate = function validate4(point) {
      var x7 = point.normalize().x;
      var x22 = x7.redSqr();
      var rhs = x22.redMul(x7).redAdd(x22.redMul(this.a)).redAdd(x7);
      var y7 = rhs.redSqrt();
      return y7.redSqr().cmp(rhs) === 0;
    };
    function Point(curve, x7, z7) {
      Base.BasePoint.call(this, curve, "projective");
      if (x7 === null && z7 === null) {
        this.x = this.curve.one;
        this.z = this.curve.zero;
      } else {
        this.x = new BN(x7, 16);
        this.z = new BN(z7, 16);
        if (!this.x.red)
          this.x = this.x.toRed(this.curve.red);
        if (!this.z.red)
          this.z = this.z.toRed(this.curve.red);
      }
    }
    inherits(Point, Base.BasePoint);
    MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
      return this.point(utils.toArray(bytes, enc), 1);
    };
    MontCurve.prototype.point = function point(x7, z7) {
      return new Point(this, x7, z7);
    };
    MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
      return Point.fromJSON(this, obj);
    };
    Point.prototype.precompute = function precompute() {
    };
    Point.prototype._encode = function _encode() {
      return this.getX().toArray("be", this.curve.p.byteLength());
    };
    Point.fromJSON = function fromJSON(curve, obj) {
      return new Point(curve, obj[0], obj[1] || curve.one);
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.z.cmpn(0) === 0;
    };
    Point.prototype.dbl = function dbl() {
      var a3 = this.x.redAdd(this.z);
      var aa = a3.redSqr();
      var b6 = this.x.redSub(this.z);
      var bb = b6.redSqr();
      var c7 = aa.redSub(bb);
      var nx = aa.redMul(bb);
      var nz = c7.redMul(bb.redAdd(this.curve.a24.redMul(c7)));
      return this.curve.point(nx, nz);
    };
    Point.prototype.add = function add() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.diffAdd = function diffAdd(p6, diff) {
      var a3 = this.x.redAdd(this.z);
      var b6 = this.x.redSub(this.z);
      var c7 = p6.x.redAdd(p6.z);
      var d6 = p6.x.redSub(p6.z);
      var da = d6.redMul(a3);
      var cb = c7.redMul(b6);
      var nx = diff.z.redMul(da.redAdd(cb).redSqr());
      var nz = diff.x.redMul(da.redISub(cb).redSqr());
      return this.curve.point(nx, nz);
    };
    Point.prototype.mul = function mul(k7) {
      var t = k7.clone();
      var a3 = this;
      var b6 = this.curve.point(null, null);
      var c7 = this;
      for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
        bits.push(t.andln(1));
      for (var i4 = bits.length - 1; i4 >= 0; i4--) {
        if (bits[i4] === 0) {
          a3 = a3.diffAdd(b6, c7);
          b6 = b6.dbl();
        } else {
          b6 = a3.diffAdd(b6, c7);
          a3 = a3.dbl();
        }
      }
      return b6;
    };
    Point.prototype.mulAdd = function mulAdd() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.jumlAdd = function jumlAdd() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.eq = function eq(other) {
      return this.getX().cmp(other.getX()) === 0;
    };
    Point.prototype.normalize = function normalize() {
      this.x = this.x.redMul(this.z.redInvm());
      this.z = this.curve.one;
      return this;
    };
    Point.prototype.getX = function getX() {
      this.normalize();
      return this.x.fromRed();
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curve/edwards.js
var require_edwards = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curve/edwards.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var BN = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var assert2 = utils.assert;
    function EdwardsCurve(conf) {
      this.twisted = (conf.a | 0) !== 1;
      this.mOneA = this.twisted && (conf.a | 0) === -1;
      this.extended = this.mOneA;
      Base.call(this, "edwards", conf);
      this.a = new BN(conf.a, 16).umod(this.red.m);
      this.a = this.a.toRed(this.red);
      this.c = new BN(conf.c, 16).toRed(this.red);
      this.c2 = this.c.redSqr();
      this.d = new BN(conf.d, 16).toRed(this.red);
      this.dd = this.d.redAdd(this.d);
      assert2(!this.twisted || this.c.fromRed().cmpn(1) === 0);
      this.oneC = (conf.c | 0) === 1;
    }
    inherits(EdwardsCurve, Base);
    module.exports = EdwardsCurve;
    EdwardsCurve.prototype._mulA = function _mulA(num) {
      if (this.mOneA)
        return num.redNeg();
      else
        return this.a.redMul(num);
    };
    EdwardsCurve.prototype._mulC = function _mulC(num) {
      if (this.oneC)
        return num;
      else
        return this.c.redMul(num);
    };
    EdwardsCurve.prototype.jpoint = function jpoint(x7, y7, z7, t) {
      return this.point(x7, y7, z7, t);
    };
    EdwardsCurve.prototype.pointFromX = function pointFromX(x7, odd) {
      x7 = new BN(x7, 16);
      if (!x7.red)
        x7 = x7.toRed(this.red);
      var x22 = x7.redSqr();
      var rhs = this.c2.redSub(this.a.redMul(x22));
      var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x22));
      var y22 = rhs.redMul(lhs.redInvm());
      var y7 = y22.redSqrt();
      if (y7.redSqr().redSub(y22).cmp(this.zero) !== 0)
        throw new Error("invalid point");
      var isOdd = y7.fromRed().isOdd();
      if (odd && !isOdd || !odd && isOdd)
        y7 = y7.redNeg();
      return this.point(x7, y7);
    };
    EdwardsCurve.prototype.pointFromY = function pointFromY(y7, odd) {
      y7 = new BN(y7, 16);
      if (!y7.red)
        y7 = y7.toRed(this.red);
      var y22 = y7.redSqr();
      var lhs = y22.redSub(this.c2);
      var rhs = y22.redMul(this.d).redMul(this.c2).redSub(this.a);
      var x22 = lhs.redMul(rhs.redInvm());
      if (x22.cmp(this.zero) === 0) {
        if (odd)
          throw new Error("invalid point");
        else
          return this.point(this.zero, y7);
      }
      var x7 = x22.redSqrt();
      if (x7.redSqr().redSub(x22).cmp(this.zero) !== 0)
        throw new Error("invalid point");
      if (x7.fromRed().isOdd() !== odd)
        x7 = x7.redNeg();
      return this.point(x7, y7);
    };
    EdwardsCurve.prototype.validate = function validate4(point) {
      if (point.isInfinity())
        return true;
      point.normalize();
      var x22 = point.x.redSqr();
      var y22 = point.y.redSqr();
      var lhs = x22.redMul(this.a).redAdd(y22);
      var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x22).redMul(y22)));
      return lhs.cmp(rhs) === 0;
    };
    function Point(curve, x7, y7, z7, t) {
      Base.BasePoint.call(this, curve, "projective");
      if (x7 === null && y7 === null && z7 === null) {
        this.x = this.curve.zero;
        this.y = this.curve.one;
        this.z = this.curve.one;
        this.t = this.curve.zero;
        this.zOne = true;
      } else {
        this.x = new BN(x7, 16);
        this.y = new BN(y7, 16);
        this.z = z7 ? new BN(z7, 16) : this.curve.one;
        this.t = t && new BN(t, 16);
        if (!this.x.red)
          this.x = this.x.toRed(this.curve.red);
        if (!this.y.red)
          this.y = this.y.toRed(this.curve.red);
        if (!this.z.red)
          this.z = this.z.toRed(this.curve.red);
        if (this.t && !this.t.red)
          this.t = this.t.toRed(this.curve.red);
        this.zOne = this.z === this.curve.one;
        if (this.curve.extended && !this.t) {
          this.t = this.x.redMul(this.y);
          if (!this.zOne)
            this.t = this.t.redMul(this.z.redInvm());
        }
      }
    }
    inherits(Point, Base.BasePoint);
    EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
      return Point.fromJSON(this, obj);
    };
    EdwardsCurve.prototype.point = function point(x7, y7, z7, t) {
      return new Point(this, x7, y7, z7, t);
    };
    Point.fromJSON = function fromJSON(curve, obj) {
      return new Point(curve, obj[0], obj[1], obj[2]);
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
    };
    Point.prototype._extDbl = function _extDbl() {
      var a3 = this.x.redSqr();
      var b6 = this.y.redSqr();
      var c7 = this.z.redSqr();
      c7 = c7.redIAdd(c7);
      var d6 = this.curve._mulA(a3);
      var e2 = this.x.redAdd(this.y).redSqr().redISub(a3).redISub(b6);
      var g6 = d6.redAdd(b6);
      var f6 = g6.redSub(c7);
      var h5 = d6.redSub(b6);
      var nx = e2.redMul(f6);
      var ny = g6.redMul(h5);
      var nt3 = e2.redMul(h5);
      var nz = f6.redMul(g6);
      return this.curve.point(nx, ny, nz, nt3);
    };
    Point.prototype._projDbl = function _projDbl() {
      var b6 = this.x.redAdd(this.y).redSqr();
      var c7 = this.x.redSqr();
      var d6 = this.y.redSqr();
      var nx;
      var ny;
      var nz;
      var e2;
      var h5;
      var j5;
      if (this.curve.twisted) {
        e2 = this.curve._mulA(c7);
        var f6 = e2.redAdd(d6);
        if (this.zOne) {
          nx = b6.redSub(c7).redSub(d6).redMul(f6.redSub(this.curve.two));
          ny = f6.redMul(e2.redSub(d6));
          nz = f6.redSqr().redSub(f6).redSub(f6);
        } else {
          h5 = this.z.redSqr();
          j5 = f6.redSub(h5).redISub(h5);
          nx = b6.redSub(c7).redISub(d6).redMul(j5);
          ny = f6.redMul(e2.redSub(d6));
          nz = f6.redMul(j5);
        }
      } else {
        e2 = c7.redAdd(d6);
        h5 = this.curve._mulC(this.z).redSqr();
        j5 = e2.redSub(h5).redSub(h5);
        nx = this.curve._mulC(b6.redISub(e2)).redMul(j5);
        ny = this.curve._mulC(e2).redMul(c7.redISub(d6));
        nz = e2.redMul(j5);
      }
      return this.curve.point(nx, ny, nz);
    };
    Point.prototype.dbl = function dbl() {
      if (this.isInfinity())
        return this;
      if (this.curve.extended)
        return this._extDbl();
      else
        return this._projDbl();
    };
    Point.prototype._extAdd = function _extAdd(p6) {
      var a3 = this.y.redSub(this.x).redMul(p6.y.redSub(p6.x));
      var b6 = this.y.redAdd(this.x).redMul(p6.y.redAdd(p6.x));
      var c7 = this.t.redMul(this.curve.dd).redMul(p6.t);
      var d6 = this.z.redMul(p6.z.redAdd(p6.z));
      var e2 = b6.redSub(a3);
      var f6 = d6.redSub(c7);
      var g6 = d6.redAdd(c7);
      var h5 = b6.redAdd(a3);
      var nx = e2.redMul(f6);
      var ny = g6.redMul(h5);
      var nt3 = e2.redMul(h5);
      var nz = f6.redMul(g6);
      return this.curve.point(nx, ny, nz, nt3);
    };
    Point.prototype._projAdd = function _projAdd(p6) {
      var a3 = this.z.redMul(p6.z);
      var b6 = a3.redSqr();
      var c7 = this.x.redMul(p6.x);
      var d6 = this.y.redMul(p6.y);
      var e2 = this.curve.d.redMul(c7).redMul(d6);
      var f6 = b6.redSub(e2);
      var g6 = b6.redAdd(e2);
      var tmp = this.x.redAdd(this.y).redMul(p6.x.redAdd(p6.y)).redISub(c7).redISub(d6);
      var nx = a3.redMul(f6).redMul(tmp);
      var ny;
      var nz;
      if (this.curve.twisted) {
        ny = a3.redMul(g6).redMul(d6.redSub(this.curve._mulA(c7)));
        nz = f6.redMul(g6);
      } else {
        ny = a3.redMul(g6).redMul(d6.redSub(c7));
        nz = this.curve._mulC(f6).redMul(g6);
      }
      return this.curve.point(nx, ny, nz);
    };
    Point.prototype.add = function add(p6) {
      if (this.isInfinity())
        return p6;
      if (p6.isInfinity())
        return this;
      if (this.curve.extended)
        return this._extAdd(p6);
      else
        return this._projAdd(p6);
    };
    Point.prototype.mul = function mul(k7) {
      if (this._hasDoubles(k7))
        return this.curve._fixedNafMul(this, k7);
      else
        return this.curve._wnafMul(this, k7);
    };
    Point.prototype.mulAdd = function mulAdd(k1, p6, k22) {
      return this.curve._wnafMulAdd(1, [this, p6], [k1, k22], 2, false);
    };
    Point.prototype.jmulAdd = function jmulAdd(k1, p6, k22) {
      return this.curve._wnafMulAdd(1, [this, p6], [k1, k22], 2, true);
    };
    Point.prototype.normalize = function normalize() {
      if (this.zOne)
        return this;
      var zi3 = this.z.redInvm();
      this.x = this.x.redMul(zi3);
      this.y = this.y.redMul(zi3);
      if (this.t)
        this.t = this.t.redMul(zi3);
      this.z = this.curve.one;
      this.zOne = true;
      return this;
    };
    Point.prototype.neg = function neg() {
      return this.curve.point(
        this.x.redNeg(),
        this.y,
        this.z,
        this.t && this.t.redNeg()
      );
    };
    Point.prototype.getX = function getX() {
      this.normalize();
      return this.x.fromRed();
    };
    Point.prototype.getY = function getY() {
      this.normalize();
      return this.y.fromRed();
    };
    Point.prototype.eq = function eq(other) {
      return this === other || this.getX().cmp(other.getX()) === 0 && this.getY().cmp(other.getY()) === 0;
    };
    Point.prototype.eqXToP = function eqXToP(x7) {
      var rx = x7.toRed(this.curve.red).redMul(this.z);
      if (this.x.cmp(rx) === 0)
        return true;
      var xc = x7.clone();
      var t = this.curve.redN.redMul(this.z);
      for (; ; ) {
        xc.iadd(this.curve.n);
        if (xc.cmp(this.curve.p) >= 0)
          return false;
        rx.redIAdd(t);
        if (this.x.cmp(rx) === 0)
          return true;
      }
    };
    Point.prototype.toP = Point.prototype.normalize;
    Point.prototype.mixedAdd = Point.prototype.add;
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curve/index.js
var require_curve = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curve/index.js"(exports) {
    "use strict";
    var curve = exports;
    curve.base = require_base();
    curve.short = require_short();
    curve.mont = require_mont();
    curve.edwards = require_edwards();
  }
});

// node_modules/hash.js/lib/hash/utils.js
var require_utils4 = __commonJS({
  "node_modules/hash.js/lib/hash/utils.js"(exports) {
    "use strict";
    var assert2 = require_minimalistic_assert();
    var inherits = require_inherits_browser();
    exports.inherits = inherits;
    function isSurrogatePair(msg, i4) {
      if ((msg.charCodeAt(i4) & 64512) !== 55296) {
        return false;
      }
      if (i4 < 0 || i4 + 1 >= msg.length) {
        return false;
      }
      return (msg.charCodeAt(i4 + 1) & 64512) === 56320;
    }
    function toArray(msg, enc) {
      if (Array.isArray(msg))
        return msg.slice();
      if (!msg)
        return [];
      var res = [];
      if (typeof msg === "string") {
        if (!enc) {
          var p6 = 0;
          for (var i4 = 0; i4 < msg.length; i4++) {
            var c7 = msg.charCodeAt(i4);
            if (c7 < 128) {
              res[p6++] = c7;
            } else if (c7 < 2048) {
              res[p6++] = c7 >> 6 | 192;
              res[p6++] = c7 & 63 | 128;
            } else if (isSurrogatePair(msg, i4)) {
              c7 = 65536 + ((c7 & 1023) << 10) + (msg.charCodeAt(++i4) & 1023);
              res[p6++] = c7 >> 18 | 240;
              res[p6++] = c7 >> 12 & 63 | 128;
              res[p6++] = c7 >> 6 & 63 | 128;
              res[p6++] = c7 & 63 | 128;
            } else {
              res[p6++] = c7 >> 12 | 224;
              res[p6++] = c7 >> 6 & 63 | 128;
              res[p6++] = c7 & 63 | 128;
            }
          }
        } else if (enc === "hex") {
          msg = msg.replace(/[^a-z0-9]+/ig, "");
          if (msg.length % 2 !== 0)
            msg = "0" + msg;
          for (i4 = 0; i4 < msg.length; i4 += 2)
            res.push(parseInt(msg[i4] + msg[i4 + 1], 16));
        }
      } else {
        for (i4 = 0; i4 < msg.length; i4++)
          res[i4] = msg[i4] | 0;
      }
      return res;
    }
    exports.toArray = toArray;
    function toHex3(msg) {
      var res = "";
      for (var i4 = 0; i4 < msg.length; i4++)
        res += zero2(msg[i4].toString(16));
      return res;
    }
    exports.toHex = toHex3;
    function htonl(w7) {
      var res = w7 >>> 24 | w7 >>> 8 & 65280 | w7 << 8 & 16711680 | (w7 & 255) << 24;
      return res >>> 0;
    }
    exports.htonl = htonl;
    function toHex32(msg, endian) {
      var res = "";
      for (var i4 = 0; i4 < msg.length; i4++) {
        var w7 = msg[i4];
        if (endian === "little")
          w7 = htonl(w7);
        res += zero8(w7.toString(16));
      }
      return res;
    }
    exports.toHex32 = toHex32;
    function zero2(word) {
      if (word.length === 1)
        return "0" + word;
      else
        return word;
    }
    exports.zero2 = zero2;
    function zero8(word) {
      if (word.length === 7)
        return "0" + word;
      else if (word.length === 6)
        return "00" + word;
      else if (word.length === 5)
        return "000" + word;
      else if (word.length === 4)
        return "0000" + word;
      else if (word.length === 3)
        return "00000" + word;
      else if (word.length === 2)
        return "000000" + word;
      else if (word.length === 1)
        return "0000000" + word;
      else
        return word;
    }
    exports.zero8 = zero8;
    function join32(msg, start, end, endian) {
      var len = end - start;
      assert2(len % 4 === 0);
      var res = new Array(len / 4);
      for (var i4 = 0, k7 = start; i4 < res.length; i4++, k7 += 4) {
        var w7;
        if (endian === "big")
          w7 = msg[k7] << 24 | msg[k7 + 1] << 16 | msg[k7 + 2] << 8 | msg[k7 + 3];
        else
          w7 = msg[k7 + 3] << 24 | msg[k7 + 2] << 16 | msg[k7 + 1] << 8 | msg[k7];
        res[i4] = w7 >>> 0;
      }
      return res;
    }
    exports.join32 = join32;
    function split32(msg, endian) {
      var res = new Array(msg.length * 4);
      for (var i4 = 0, k7 = 0; i4 < msg.length; i4++, k7 += 4) {
        var m5 = msg[i4];
        if (endian === "big") {
          res[k7] = m5 >>> 24;
          res[k7 + 1] = m5 >>> 16 & 255;
          res[k7 + 2] = m5 >>> 8 & 255;
          res[k7 + 3] = m5 & 255;
        } else {
          res[k7 + 3] = m5 >>> 24;
          res[k7 + 2] = m5 >>> 16 & 255;
          res[k7 + 1] = m5 >>> 8 & 255;
          res[k7] = m5 & 255;
        }
      }
      return res;
    }
    exports.split32 = split32;
    function rotr32(w7, b6) {
      return w7 >>> b6 | w7 << 32 - b6;
    }
    exports.rotr32 = rotr32;
    function rotl32(w7, b6) {
      return w7 << b6 | w7 >>> 32 - b6;
    }
    exports.rotl32 = rotl32;
    function sum32(a3, b6) {
      return a3 + b6 >>> 0;
    }
    exports.sum32 = sum32;
    function sum32_3(a3, b6, c7) {
      return a3 + b6 + c7 >>> 0;
    }
    exports.sum32_3 = sum32_3;
    function sum32_4(a3, b6, c7, d6) {
      return a3 + b6 + c7 + d6 >>> 0;
    }
    exports.sum32_4 = sum32_4;
    function sum32_5(a3, b6, c7, d6, e2) {
      return a3 + b6 + c7 + d6 + e2 >>> 0;
    }
    exports.sum32_5 = sum32_5;
    function sum64(buf, pos, ah, al) {
      var bh = buf[pos];
      var bl = buf[pos + 1];
      var lo4 = al + bl >>> 0;
      var hi3 = (lo4 < al ? 1 : 0) + ah + bh;
      buf[pos] = hi3 >>> 0;
      buf[pos + 1] = lo4;
    }
    exports.sum64 = sum64;
    function sum64_hi(ah, al, bh, bl) {
      var lo4 = al + bl >>> 0;
      var hi3 = (lo4 < al ? 1 : 0) + ah + bh;
      return hi3 >>> 0;
    }
    exports.sum64_hi = sum64_hi;
    function sum64_lo(ah, al, bh, bl) {
      var lo4 = al + bl;
      return lo4 >>> 0;
    }
    exports.sum64_lo = sum64_lo;
    function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
      var carry = 0;
      var lo4 = al;
      lo4 = lo4 + bl >>> 0;
      carry += lo4 < al ? 1 : 0;
      lo4 = lo4 + cl >>> 0;
      carry += lo4 < cl ? 1 : 0;
      lo4 = lo4 + dl >>> 0;
      carry += lo4 < dl ? 1 : 0;
      var hi3 = ah + bh + ch + dh + carry;
      return hi3 >>> 0;
    }
    exports.sum64_4_hi = sum64_4_hi;
    function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
      var lo4 = al + bl + cl + dl;
      return lo4 >>> 0;
    }
    exports.sum64_4_lo = sum64_4_lo;
    function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
      var carry = 0;
      var lo4 = al;
      lo4 = lo4 + bl >>> 0;
      carry += lo4 < al ? 1 : 0;
      lo4 = lo4 + cl >>> 0;
      carry += lo4 < cl ? 1 : 0;
      lo4 = lo4 + dl >>> 0;
      carry += lo4 < dl ? 1 : 0;
      lo4 = lo4 + el >>> 0;
      carry += lo4 < el ? 1 : 0;
      var hi3 = ah + bh + ch + dh + eh + carry;
      return hi3 >>> 0;
    }
    exports.sum64_5_hi = sum64_5_hi;
    function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
      var lo4 = al + bl + cl + dl + el;
      return lo4 >>> 0;
    }
    exports.sum64_5_lo = sum64_5_lo;
    function rotr64_hi(ah, al, num) {
      var r3 = al << 32 - num | ah >>> num;
      return r3 >>> 0;
    }
    exports.rotr64_hi = rotr64_hi;
    function rotr64_lo(ah, al, num) {
      var r3 = ah << 32 - num | al >>> num;
      return r3 >>> 0;
    }
    exports.rotr64_lo = rotr64_lo;
    function shr64_hi(ah, al, num) {
      return ah >>> num;
    }
    exports.shr64_hi = shr64_hi;
    function shr64_lo(ah, al, num) {
      var r3 = ah << 32 - num | al >>> num;
      return r3 >>> 0;
    }
    exports.shr64_lo = shr64_lo;
  }
});

// node_modules/hash.js/lib/hash/common.js
var require_common = __commonJS({
  "node_modules/hash.js/lib/hash/common.js"(exports) {
    "use strict";
    var utils = require_utils4();
    var assert2 = require_minimalistic_assert();
    function BlockHash() {
      this.pending = null;
      this.pendingTotal = 0;
      this.blockSize = this.constructor.blockSize;
      this.outSize = this.constructor.outSize;
      this.hmacStrength = this.constructor.hmacStrength;
      this.padLength = this.constructor.padLength / 8;
      this.endian = "big";
      this._delta8 = this.blockSize / 8;
      this._delta32 = this.blockSize / 32;
    }
    exports.BlockHash = BlockHash;
    BlockHash.prototype.update = function update(msg, enc) {
      msg = utils.toArray(msg, enc);
      if (!this.pending)
        this.pending = msg;
      else
        this.pending = this.pending.concat(msg);
      this.pendingTotal += msg.length;
      if (this.pending.length >= this._delta8) {
        msg = this.pending;
        var r3 = msg.length % this._delta8;
        this.pending = msg.slice(msg.length - r3, msg.length);
        if (this.pending.length === 0)
          this.pending = null;
        msg = utils.join32(msg, 0, msg.length - r3, this.endian);
        for (var i4 = 0; i4 < msg.length; i4 += this._delta32)
          this._update(msg, i4, i4 + this._delta32);
      }
      return this;
    };
    BlockHash.prototype.digest = function digest2(enc) {
      this.update(this._pad());
      assert2(this.pending === null);
      return this._digest(enc);
    };
    BlockHash.prototype._pad = function pad4() {
      var len = this.pendingTotal;
      var bytes = this._delta8;
      var k7 = bytes - (len + this.padLength) % bytes;
      var res = new Array(k7 + this.padLength);
      res[0] = 128;
      for (var i4 = 1; i4 < k7; i4++)
        res[i4] = 0;
      len <<= 3;
      if (this.endian === "big") {
        for (var t = 8; t < this.padLength; t++)
          res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = len >>> 24 & 255;
        res[i4++] = len >>> 16 & 255;
        res[i4++] = len >>> 8 & 255;
        res[i4++] = len & 255;
      } else {
        res[i4++] = len & 255;
        res[i4++] = len >>> 8 & 255;
        res[i4++] = len >>> 16 & 255;
        res[i4++] = len >>> 24 & 255;
        res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = 0;
        res[i4++] = 0;
        for (t = 8; t < this.padLength; t++)
          res[i4++] = 0;
      }
      return res;
    };
  }
});

// node_modules/hash.js/lib/hash/sha/common.js
var require_common2 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/common.js"(exports) {
    "use strict";
    var utils = require_utils4();
    var rotr32 = utils.rotr32;
    function ft_1(s3, x7, y7, z7) {
      if (s3 === 0)
        return ch32(x7, y7, z7);
      if (s3 === 1 || s3 === 3)
        return p32(x7, y7, z7);
      if (s3 === 2)
        return maj32(x7, y7, z7);
    }
    exports.ft_1 = ft_1;
    function ch32(x7, y7, z7) {
      return x7 & y7 ^ ~x7 & z7;
    }
    exports.ch32 = ch32;
    function maj32(x7, y7, z7) {
      return x7 & y7 ^ x7 & z7 ^ y7 & z7;
    }
    exports.maj32 = maj32;
    function p32(x7, y7, z7) {
      return x7 ^ y7 ^ z7;
    }
    exports.p32 = p32;
    function s0_256(x7) {
      return rotr32(x7, 2) ^ rotr32(x7, 13) ^ rotr32(x7, 22);
    }
    exports.s0_256 = s0_256;
    function s1_256(x7) {
      return rotr32(x7, 6) ^ rotr32(x7, 11) ^ rotr32(x7, 25);
    }
    exports.s1_256 = s1_256;
    function g0_256(x7) {
      return rotr32(x7, 7) ^ rotr32(x7, 18) ^ x7 >>> 3;
    }
    exports.g0_256 = g0_256;
    function g1_256(x7) {
      return rotr32(x7, 17) ^ rotr32(x7, 19) ^ x7 >>> 10;
    }
    exports.g1_256 = g1_256;
  }
});

// node_modules/hash.js/lib/hash/sha/1.js
var require__ = __commonJS({
  "node_modules/hash.js/lib/hash/sha/1.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var common = require_common();
    var shaCommon = require_common2();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_5 = utils.sum32_5;
    var ft_1 = shaCommon.ft_1;
    var BlockHash = common.BlockHash;
    var sha1_K = [
      1518500249,
      1859775393,
      2400959708,
      3395469782
    ];
    function SHA1() {
      if (!(this instanceof SHA1))
        return new SHA1();
      BlockHash.call(this);
      this.h = [
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
      ];
      this.W = new Array(80);
    }
    utils.inherits(SHA1, BlockHash);
    module.exports = SHA1;
    SHA1.blockSize = 512;
    SHA1.outSize = 160;
    SHA1.hmacStrength = 80;
    SHA1.padLength = 64;
    SHA1.prototype._update = function _update(msg, start) {
      var W4 = this.W;
      for (var i4 = 0; i4 < 16; i4++)
        W4[i4] = msg[start + i4];
      for (; i4 < W4.length; i4++)
        W4[i4] = rotl32(W4[i4 - 3] ^ W4[i4 - 8] ^ W4[i4 - 14] ^ W4[i4 - 16], 1);
      var a3 = this.h[0];
      var b6 = this.h[1];
      var c7 = this.h[2];
      var d6 = this.h[3];
      var e2 = this.h[4];
      for (i4 = 0; i4 < W4.length; i4++) {
        var s3 = ~~(i4 / 20);
        var t = sum32_5(rotl32(a3, 5), ft_1(s3, b6, c7, d6), e2, W4[i4], sha1_K[s3]);
        e2 = d6;
        d6 = c7;
        c7 = rotl32(b6, 30);
        b6 = a3;
        a3 = t;
      }
      this.h[0] = sum32(this.h[0], a3);
      this.h[1] = sum32(this.h[1], b6);
      this.h[2] = sum32(this.h[2], c7);
      this.h[3] = sum32(this.h[3], d6);
      this.h[4] = sum32(this.h[4], e2);
    };
    SHA1.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/256.js
var require__2 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/256.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var common = require_common();
    var shaCommon = require_common2();
    var assert2 = require_minimalistic_assert();
    var sum32 = utils.sum32;
    var sum32_4 = utils.sum32_4;
    var sum32_5 = utils.sum32_5;
    var ch32 = shaCommon.ch32;
    var maj32 = shaCommon.maj32;
    var s0_256 = shaCommon.s0_256;
    var s1_256 = shaCommon.s1_256;
    var g0_256 = shaCommon.g0_256;
    var g1_256 = shaCommon.g1_256;
    var BlockHash = common.BlockHash;
    var sha256_K = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ];
    function SHA256() {
      if (!(this instanceof SHA256))
        return new SHA256();
      BlockHash.call(this);
      this.h = [
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ];
      this.k = sha256_K;
      this.W = new Array(64);
    }
    utils.inherits(SHA256, BlockHash);
    module.exports = SHA256;
    SHA256.blockSize = 512;
    SHA256.outSize = 256;
    SHA256.hmacStrength = 192;
    SHA256.padLength = 64;
    SHA256.prototype._update = function _update(msg, start) {
      var W4 = this.W;
      for (var i4 = 0; i4 < 16; i4++)
        W4[i4] = msg[start + i4];
      for (; i4 < W4.length; i4++)
        W4[i4] = sum32_4(g1_256(W4[i4 - 2]), W4[i4 - 7], g0_256(W4[i4 - 15]), W4[i4 - 16]);
      var a3 = this.h[0];
      var b6 = this.h[1];
      var c7 = this.h[2];
      var d6 = this.h[3];
      var e2 = this.h[4];
      var f6 = this.h[5];
      var g6 = this.h[6];
      var h5 = this.h[7];
      assert2(this.k.length === W4.length);
      for (i4 = 0; i4 < W4.length; i4++) {
        var T1 = sum32_5(h5, s1_256(e2), ch32(e2, f6, g6), this.k[i4], W4[i4]);
        var T22 = sum32(s0_256(a3), maj32(a3, b6, c7));
        h5 = g6;
        g6 = f6;
        f6 = e2;
        e2 = sum32(d6, T1);
        d6 = c7;
        c7 = b6;
        b6 = a3;
        a3 = sum32(T1, T22);
      }
      this.h[0] = sum32(this.h[0], a3);
      this.h[1] = sum32(this.h[1], b6);
      this.h[2] = sum32(this.h[2], c7);
      this.h[3] = sum32(this.h[3], d6);
      this.h[4] = sum32(this.h[4], e2);
      this.h[5] = sum32(this.h[5], f6);
      this.h[6] = sum32(this.h[6], g6);
      this.h[7] = sum32(this.h[7], h5);
    };
    SHA256.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/224.js
var require__3 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/224.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var SHA256 = require__2();
    function SHA224() {
      if (!(this instanceof SHA224))
        return new SHA224();
      SHA256.call(this);
      this.h = [
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ];
    }
    utils.inherits(SHA224, SHA256);
    module.exports = SHA224;
    SHA224.blockSize = 512;
    SHA224.outSize = 224;
    SHA224.hmacStrength = 192;
    SHA224.padLength = 64;
    SHA224.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h.slice(0, 7), "big");
      else
        return utils.split32(this.h.slice(0, 7), "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/512.js
var require__4 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/512.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var common = require_common();
    var assert2 = require_minimalistic_assert();
    var rotr64_hi = utils.rotr64_hi;
    var rotr64_lo = utils.rotr64_lo;
    var shr64_hi = utils.shr64_hi;
    var shr64_lo = utils.shr64_lo;
    var sum64 = utils.sum64;
    var sum64_hi = utils.sum64_hi;
    var sum64_lo = utils.sum64_lo;
    var sum64_4_hi = utils.sum64_4_hi;
    var sum64_4_lo = utils.sum64_4_lo;
    var sum64_5_hi = utils.sum64_5_hi;
    var sum64_5_lo = utils.sum64_5_lo;
    var BlockHash = common.BlockHash;
    var sha512_K = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    function SHA512() {
      if (!(this instanceof SHA512))
        return new SHA512();
      BlockHash.call(this);
      this.h = [
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ];
      this.k = sha512_K;
      this.W = new Array(160);
    }
    utils.inherits(SHA512, BlockHash);
    module.exports = SHA512;
    SHA512.blockSize = 1024;
    SHA512.outSize = 512;
    SHA512.hmacStrength = 192;
    SHA512.padLength = 128;
    SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
      var W4 = this.W;
      for (var i4 = 0; i4 < 32; i4++)
        W4[i4] = msg[start + i4];
      for (; i4 < W4.length; i4 += 2) {
        var c0_hi = g1_512_hi(W4[i4 - 4], W4[i4 - 3]);
        var c0_lo = g1_512_lo(W4[i4 - 4], W4[i4 - 3]);
        var c1_hi = W4[i4 - 14];
        var c1_lo = W4[i4 - 13];
        var c2_hi = g0_512_hi(W4[i4 - 30], W4[i4 - 29]);
        var c2_lo = g0_512_lo(W4[i4 - 30], W4[i4 - 29]);
        var c3_hi = W4[i4 - 32];
        var c3_lo = W4[i4 - 31];
        W4[i4] = sum64_4_hi(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo
        );
        W4[i4 + 1] = sum64_4_lo(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo
        );
      }
    };
    SHA512.prototype._update = function _update(msg, start) {
      this._prepareBlock(msg, start);
      var W4 = this.W;
      var ah = this.h[0];
      var al = this.h[1];
      var bh = this.h[2];
      var bl = this.h[3];
      var ch = this.h[4];
      var cl = this.h[5];
      var dh = this.h[6];
      var dl = this.h[7];
      var eh = this.h[8];
      var el = this.h[9];
      var fh = this.h[10];
      var fl = this.h[11];
      var gh = this.h[12];
      var gl = this.h[13];
      var hh = this.h[14];
      var hl = this.h[15];
      assert2(this.k.length === W4.length);
      for (var i4 = 0; i4 < W4.length; i4 += 2) {
        var c0_hi = hh;
        var c0_lo = hl;
        var c1_hi = s1_512_hi(eh, el);
        var c1_lo = s1_512_lo(eh, el);
        var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
        var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
        var c3_hi = this.k[i4];
        var c3_lo = this.k[i4 + 1];
        var c4_hi = W4[i4];
        var c4_lo = W4[i4 + 1];
        var T1_hi = sum64_5_hi(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo,
          c4_hi,
          c4_lo
        );
        var T1_lo = sum64_5_lo(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo,
          c4_hi,
          c4_lo
        );
        c0_hi = s0_512_hi(ah, al);
        c0_lo = s0_512_lo(ah, al);
        c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
        c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
        var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
        var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
        hh = gh;
        hl = gl;
        gh = fh;
        gl = fl;
        fh = eh;
        fl = el;
        eh = sum64_hi(dh, dl, T1_hi, T1_lo);
        el = sum64_lo(dl, dl, T1_hi, T1_lo);
        dh = ch;
        dl = cl;
        ch = bh;
        cl = bl;
        bh = ah;
        bl = al;
        ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
        al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
      }
      sum64(this.h, 0, ah, al);
      sum64(this.h, 2, bh, bl);
      sum64(this.h, 4, ch, cl);
      sum64(this.h, 6, dh, dl);
      sum64(this.h, 8, eh, el);
      sum64(this.h, 10, fh, fl);
      sum64(this.h, 12, gh, gl);
      sum64(this.h, 14, hh, hl);
    };
    SHA512.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
    function ch64_hi(xh, xl, yh, yl, zh) {
      var r3 = xh & yh ^ ~xh & zh;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function ch64_lo(xh, xl, yh, yl, zh, zl) {
      var r3 = xl & yl ^ ~xl & zl;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function maj64_hi(xh, xl, yh, yl, zh) {
      var r3 = xh & yh ^ xh & zh ^ yh & zh;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function maj64_lo(xh, xl, yh, yl, zh, zl) {
      var r3 = xl & yl ^ xl & zl ^ yl & zl;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s0_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 28);
      var c1_hi = rotr64_hi(xl, xh, 2);
      var c2_hi = rotr64_hi(xl, xh, 7);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s0_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 28);
      var c1_lo = rotr64_lo(xl, xh, 2);
      var c2_lo = rotr64_lo(xl, xh, 7);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s1_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 14);
      var c1_hi = rotr64_hi(xh, xl, 18);
      var c2_hi = rotr64_hi(xl, xh, 9);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s1_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 14);
      var c1_lo = rotr64_lo(xh, xl, 18);
      var c2_lo = rotr64_lo(xl, xh, 9);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g0_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 1);
      var c1_hi = rotr64_hi(xh, xl, 8);
      var c2_hi = shr64_hi(xh, xl, 7);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g0_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 1);
      var c1_lo = rotr64_lo(xh, xl, 8);
      var c2_lo = shr64_lo(xh, xl, 7);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g1_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 19);
      var c1_hi = rotr64_hi(xl, xh, 29);
      var c2_hi = shr64_hi(xh, xl, 6);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g1_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 19);
      var c1_lo = rotr64_lo(xl, xh, 29);
      var c2_lo = shr64_lo(xh, xl, 6);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
  }
});

// node_modules/hash.js/lib/hash/sha/384.js
var require__5 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/384.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var SHA512 = require__4();
    function SHA384() {
      if (!(this instanceof SHA384))
        return new SHA384();
      SHA512.call(this);
      this.h = [
        3418070365,
        3238371032,
        1654270250,
        914150663,
        2438529370,
        812702999,
        355462360,
        4144912697,
        1731405415,
        4290775857,
        2394180231,
        1750603025,
        3675008525,
        1694076839,
        1203062813,
        3204075428
      ];
    }
    utils.inherits(SHA384, SHA512);
    module.exports = SHA384;
    SHA384.blockSize = 1024;
    SHA384.outSize = 384;
    SHA384.hmacStrength = 192;
    SHA384.padLength = 128;
    SHA384.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h.slice(0, 12), "big");
      else
        return utils.split32(this.h.slice(0, 12), "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha.js
var require_sha = __commonJS({
  "node_modules/hash.js/lib/hash/sha.js"(exports) {
    "use strict";
    exports.sha1 = require__();
    exports.sha224 = require__3();
    exports.sha256 = require__2();
    exports.sha384 = require__5();
    exports.sha512 = require__4();
  }
});

// node_modules/hash.js/lib/hash/ripemd.js
var require_ripemd = __commonJS({
  "node_modules/hash.js/lib/hash/ripemd.js"(exports) {
    "use strict";
    var utils = require_utils4();
    var common = require_common();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_3 = utils.sum32_3;
    var sum32_4 = utils.sum32_4;
    var BlockHash = common.BlockHash;
    function RIPEMD160() {
      if (!(this instanceof RIPEMD160))
        return new RIPEMD160();
      BlockHash.call(this);
      this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      this.endian = "little";
    }
    utils.inherits(RIPEMD160, BlockHash);
    exports.ripemd160 = RIPEMD160;
    RIPEMD160.blockSize = 512;
    RIPEMD160.outSize = 160;
    RIPEMD160.hmacStrength = 192;
    RIPEMD160.padLength = 64;
    RIPEMD160.prototype._update = function update(msg, start) {
      var A5 = this.h[0];
      var B4 = this.h[1];
      var C7 = this.h[2];
      var D4 = this.h[3];
      var E7 = this.h[4];
      var Ah = A5;
      var Bh = B4;
      var Ch = C7;
      var Dh = D4;
      var Eh = E7;
      for (var j5 = 0; j5 < 80; j5++) {
        var T5 = sum32(
          rotl32(
            sum32_4(A5, f6(j5, B4, C7, D4), msg[r3[j5] + start], K5(j5)),
            s3[j5]
          ),
          E7
        );
        A5 = E7;
        E7 = D4;
        D4 = rotl32(C7, 10);
        C7 = B4;
        B4 = T5;
        T5 = sum32(
          rotl32(
            sum32_4(Ah, f6(79 - j5, Bh, Ch, Dh), msg[rh[j5] + start], Kh(j5)),
            sh[j5]
          ),
          Eh
        );
        Ah = Eh;
        Eh = Dh;
        Dh = rotl32(Ch, 10);
        Ch = Bh;
        Bh = T5;
      }
      T5 = sum32_3(this.h[1], C7, Dh);
      this.h[1] = sum32_3(this.h[2], D4, Eh);
      this.h[2] = sum32_3(this.h[3], E7, Ah);
      this.h[3] = sum32_3(this.h[4], A5, Bh);
      this.h[4] = sum32_3(this.h[0], B4, Ch);
      this.h[0] = T5;
    };
    RIPEMD160.prototype._digest = function digest2(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "little");
      else
        return utils.split32(this.h, "little");
    };
    function f6(j5, x7, y7, z7) {
      if (j5 <= 15)
        return x7 ^ y7 ^ z7;
      else if (j5 <= 31)
        return x7 & y7 | ~x7 & z7;
      else if (j5 <= 47)
        return (x7 | ~y7) ^ z7;
      else if (j5 <= 63)
        return x7 & z7 | y7 & ~z7;
      else
        return x7 ^ (y7 | ~z7);
    }
    function K5(j5) {
      if (j5 <= 15)
        return 0;
      else if (j5 <= 31)
        return 1518500249;
      else if (j5 <= 47)
        return 1859775393;
      else if (j5 <= 63)
        return 2400959708;
      else
        return 2840853838;
    }
    function Kh(j5) {
      if (j5 <= 15)
        return 1352829926;
      else if (j5 <= 31)
        return 1548603684;
      else if (j5 <= 47)
        return 1836072691;
      else if (j5 <= 63)
        return 2053994217;
      else
        return 0;
    }
    var r3 = [
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
    ];
    var rh = [
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
    ];
    var s3 = [
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
    ];
    var sh = [
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
    ];
  }
});

// node_modules/hash.js/lib/hash/hmac.js
var require_hmac = __commonJS({
  "node_modules/hash.js/lib/hash/hmac.js"(exports, module) {
    "use strict";
    var utils = require_utils4();
    var assert2 = require_minimalistic_assert();
    function Hmac(hash, key, enc) {
      if (!(this instanceof Hmac))
        return new Hmac(hash, key, enc);
      this.Hash = hash;
      this.blockSize = hash.blockSize / 8;
      this.outSize = hash.outSize / 8;
      this.inner = null;
      this.outer = null;
      this._init(utils.toArray(key, enc));
    }
    module.exports = Hmac;
    Hmac.prototype._init = function init(key) {
      if (key.length > this.blockSize)
        key = new this.Hash().update(key).digest();
      assert2(key.length <= this.blockSize);
      for (var i4 = key.length; i4 < this.blockSize; i4++)
        key.push(0);
      for (i4 = 0; i4 < key.length; i4++)
        key[i4] ^= 54;
      this.inner = new this.Hash().update(key);
      for (i4 = 0; i4 < key.length; i4++)
        key[i4] ^= 106;
      this.outer = new this.Hash().update(key);
    };
    Hmac.prototype.update = function update(msg, enc) {
      this.inner.update(msg, enc);
      return this;
    };
    Hmac.prototype.digest = function digest2(enc) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc);
    };
  }
});

// node_modules/hash.js/lib/hash.js
var require_hash = __commonJS({
  "node_modules/hash.js/lib/hash.js"(exports) {
    var hash = exports;
    hash.utils = require_utils4();
    hash.common = require_common();
    hash.sha = require_sha();
    hash.ripemd = require_ripemd();
    hash.hmac = require_hmac();
    hash.sha1 = hash.sha.sha1;
    hash.sha256 = hash.sha.sha256;
    hash.sha224 = hash.sha.sha224;
    hash.sha384 = hash.sha.sha384;
    hash.sha512 = hash.sha.sha512;
    hash.ripemd160 = hash.ripemd.ripemd160;
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js
var require_secp256k1 = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"(exports, module) {
    module.exports = {
      doubles: {
        step: 4,
        points: [
          [
            "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
            "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
          ],
          [
            "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
            "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
          ],
          [
            "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
            "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
          ],
          [
            "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
            "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
          ],
          [
            "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
            "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
          ],
          [
            "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
            "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
          ],
          [
            "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
            "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
          ],
          [
            "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
            "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
          ],
          [
            "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
            "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
          ],
          [
            "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
            "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
          ],
          [
            "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
            "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
          ],
          [
            "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
            "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
          ],
          [
            "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
            "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
          ],
          [
            "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
            "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
          ],
          [
            "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
            "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
          ],
          [
            "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
            "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
          ],
          [
            "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
            "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
          ],
          [
            "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
            "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
          ],
          [
            "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
            "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
          ],
          [
            "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
            "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
          ],
          [
            "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
            "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
          ],
          [
            "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
            "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
          ],
          [
            "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
            "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
          ],
          [
            "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
            "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
          ],
          [
            "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
            "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
          ],
          [
            "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
            "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
          ],
          [
            "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
            "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
          ],
          [
            "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
            "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
          ],
          [
            "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
            "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
          ],
          [
            "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
            "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
          ],
          [
            "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
            "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
          ],
          [
            "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
            "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
          ],
          [
            "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
            "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
          ],
          [
            "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
            "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
          ],
          [
            "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
            "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
          ],
          [
            "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
            "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
          ],
          [
            "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
            "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
          ],
          [
            "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
            "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
          ],
          [
            "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
            "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
          ],
          [
            "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
            "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
          ],
          [
            "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
            "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
          ],
          [
            "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
            "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
          ],
          [
            "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
            "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
          ],
          [
            "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
            "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
          ],
          [
            "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
            "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
          ],
          [
            "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
            "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
          ],
          [
            "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
            "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
          ],
          [
            "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
            "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
          ],
          [
            "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
            "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
          ],
          [
            "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
            "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
          ],
          [
            "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
            "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
          ],
          [
            "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
            "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
          ],
          [
            "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
            "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
          ],
          [
            "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
            "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
          ],
          [
            "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
            "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
          ],
          [
            "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
            "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
          ],
          [
            "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
            "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
          ],
          [
            "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
            "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
          ],
          [
            "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
            "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
          ],
          [
            "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
            "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
          ],
          [
            "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
            "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
          ],
          [
            "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
            "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
          ],
          [
            "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
            "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
          ],
          [
            "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
            "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
          ],
          [
            "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
            "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
          ]
        ]
      },
      naf: {
        wnd: 7,
        points: [
          [
            "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
            "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
          ],
          [
            "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
            "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
          ],
          [
            "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
            "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
          ],
          [
            "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
            "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
          ],
          [
            "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
            "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
          ],
          [
            "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
            "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
          ],
          [
            "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
            "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
          ],
          [
            "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
            "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
          ],
          [
            "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
            "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
          ],
          [
            "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
            "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
          ],
          [
            "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
            "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
          ],
          [
            "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
            "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
          ],
          [
            "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
            "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
          ],
          [
            "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
            "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
          ],
          [
            "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
            "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
          ],
          [
            "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
            "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
          ],
          [
            "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
            "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
          ],
          [
            "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
            "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
          ],
          [
            "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
            "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
          ],
          [
            "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
            "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
          ],
          [
            "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
            "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
          ],
          [
            "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
            "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
          ],
          [
            "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
            "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
          ],
          [
            "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
            "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
          ],
          [
            "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
            "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
          ],
          [
            "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
            "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
          ],
          [
            "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
            "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
          ],
          [
            "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
            "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
          ],
          [
            "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
            "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
          ],
          [
            "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
            "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
          ],
          [
            "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
            "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
          ],
          [
            "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
            "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
          ],
          [
            "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
            "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
          ],
          [
            "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
            "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
          ],
          [
            "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
            "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
          ],
          [
            "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
            "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
          ],
          [
            "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
            "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
          ],
          [
            "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
            "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
          ],
          [
            "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
            "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
          ],
          [
            "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
            "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
          ],
          [
            "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
            "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
          ],
          [
            "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
            "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
          ],
          [
            "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
            "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
          ],
          [
            "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
            "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
          ],
          [
            "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
            "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
          ],
          [
            "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
            "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
          ],
          [
            "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
            "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
          ],
          [
            "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
            "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
          ],
          [
            "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
            "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
          ],
          [
            "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
            "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
          ],
          [
            "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
            "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
          ],
          [
            "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
            "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
          ],
          [
            "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
            "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
          ],
          [
            "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
            "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
          ],
          [
            "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
            "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
          ],
          [
            "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
            "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
          ],
          [
            "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
            "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
          ],
          [
            "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
            "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
          ],
          [
            "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
            "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
          ],
          [
            "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
            "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
          ],
          [
            "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
            "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
          ],
          [
            "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
            "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
          ],
          [
            "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
            "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
          ],
          [
            "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
            "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
          ],
          [
            "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
            "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
          ],
          [
            "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
            "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
          ],
          [
            "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
            "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
          ],
          [
            "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
            "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
          ],
          [
            "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
            "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
          ],
          [
            "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
            "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
          ],
          [
            "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
            "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
          ],
          [
            "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
            "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
          ],
          [
            "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
            "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
          ],
          [
            "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
            "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
          ],
          [
            "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
            "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
          ],
          [
            "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
            "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
          ],
          [
            "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
            "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
          ],
          [
            "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
            "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
          ],
          [
            "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
            "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
          ],
          [
            "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
            "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
          ],
          [
            "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
            "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
          ],
          [
            "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
            "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
          ],
          [
            "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
            "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
          ],
          [
            "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
            "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
          ],
          [
            "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
            "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
          ],
          [
            "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
            "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
          ],
          [
            "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
            "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
          ],
          [
            "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
            "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
          ],
          [
            "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
            "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
          ],
          [
            "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
            "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
          ],
          [
            "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
            "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
          ],
          [
            "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
            "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
          ],
          [
            "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
            "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
          ],
          [
            "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
            "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
          ],
          [
            "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
            "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
          ],
          [
            "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
            "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
          ],
          [
            "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
            "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
          ],
          [
            "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
            "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
          ],
          [
            "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
            "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
          ],
          [
            "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
            "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
          ],
          [
            "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
            "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
          ],
          [
            "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
            "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
          ],
          [
            "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
            "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
          ],
          [
            "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
            "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
          ],
          [
            "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
            "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
          ],
          [
            "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
            "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
          ],
          [
            "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
            "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
          ],
          [
            "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
            "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
          ],
          [
            "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
            "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
          ],
          [
            "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
            "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
          ],
          [
            "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
            "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
          ],
          [
            "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
            "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
          ],
          [
            "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
            "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
          ],
          [
            "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
            "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
          ],
          [
            "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
            "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
          ],
          [
            "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
            "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
          ],
          [
            "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
            "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
          ],
          [
            "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
            "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
          ],
          [
            "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
            "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
          ],
          [
            "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
            "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
          ],
          [
            "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
            "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
          ],
          [
            "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
            "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
          ],
          [
            "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
            "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
          ],
          [
            "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
            "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
          ],
          [
            "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
            "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
          ],
          [
            "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
            "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
          ],
          [
            "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
            "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
          ]
        ]
      }
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curves.js
var require_curves = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/curves.js"(exports) {
    "use strict";
    var curves = exports;
    var hash = require_hash();
    var curve = require_curve();
    var utils = require_utils3();
    var assert2 = utils.assert;
    function PresetCurve(options) {
      if (options.type === "short")
        this.curve = new curve.short(options);
      else if (options.type === "edwards")
        this.curve = new curve.edwards(options);
      else
        this.curve = new curve.mont(options);
      this.g = this.curve.g;
      this.n = this.curve.n;
      this.hash = options.hash;
      assert2(this.g.validate(), "Invalid curve");
      assert2(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    curves.PresetCurve = PresetCurve;
    function defineCurve(name2, options) {
      Object.defineProperty(curves, name2, {
        configurable: true,
        enumerable: true,
        get: function() {
          var curve2 = new PresetCurve(options);
          Object.defineProperty(curves, name2, {
            configurable: true,
            enumerable: true,
            value: curve2
          });
          return curve2;
        }
      });
    }
    defineCurve("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: hash.sha256,
      gRed: false,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
      ]
    });
    defineCurve("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: hash.sha256,
      gRed: false,
      g: [
        "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
        "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
      ]
    });
    defineCurve("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: hash.sha256,
      gRed: false,
      g: [
        "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
        "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
      ]
    });
    defineCurve("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: hash.sha384,
      gRed: false,
      g: [
        "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
        "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
      ]
    });
    defineCurve("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: hash.sha512,
      gRed: false,
      g: [
        "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
        "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
      ]
    });
    defineCurve("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: hash.sha256,
      gRed: false,
      g: [
        "9"
      ]
    });
    defineCurve("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      // -121665 * (121666^(-1)) (mod P)
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: hash.sha256,
      gRed: false,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        // 4/5
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var pre;
    try {
      pre = require_secp256k1();
    } catch (e2) {
      pre = void 0;
    }
    defineCurve("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: hash.sha256,
      // Precomputed endomorphism
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3"
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15"
        }
      ],
      gRed: false,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        pre
      ]
    });
  }
});

// node_modules/hmac-drbg/lib/hmac-drbg.js
var require_hmac_drbg = __commonJS({
  "node_modules/hmac-drbg/lib/hmac-drbg.js"(exports, module) {
    "use strict";
    var hash = require_hash();
    var utils = require_utils2();
    var assert2 = require_minimalistic_assert();
    function HmacDRBG(options) {
      if (!(this instanceof HmacDRBG))
        return new HmacDRBG(options);
      this.hash = options.hash;
      this.predResist = !!options.predResist;
      this.outLen = this.hash.outSize;
      this.minEntropy = options.minEntropy || this.hash.hmacStrength;
      this._reseed = null;
      this.reseedInterval = null;
      this.K = null;
      this.V = null;
      var entropy = utils.toArray(options.entropy, options.entropyEnc || "hex");
      var nonce = utils.toArray(options.nonce, options.nonceEnc || "hex");
      var pers = utils.toArray(options.pers, options.persEnc || "hex");
      assert2(
        entropy.length >= this.minEntropy / 8,
        "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
      );
      this._init(entropy, nonce, pers);
    }
    module.exports = HmacDRBG;
    HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
      var seed = entropy.concat(nonce).concat(pers);
      this.K = new Array(this.outLen / 8);
      this.V = new Array(this.outLen / 8);
      for (var i4 = 0; i4 < this.V.length; i4++) {
        this.K[i4] = 0;
        this.V[i4] = 1;
      }
      this._update(seed);
      this._reseed = 1;
      this.reseedInterval = 281474976710656;
    };
    HmacDRBG.prototype._hmac = function hmac() {
      return new hash.hmac(this.hash, this.K);
    };
    HmacDRBG.prototype._update = function update(seed) {
      var kmac = this._hmac().update(this.V).update([0]);
      if (seed)
        kmac = kmac.update(seed);
      this.K = kmac.digest();
      this.V = this._hmac().update(this.V).digest();
      if (!seed)
        return;
      this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
      this.V = this._hmac().update(this.V).digest();
    };
    HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
      if (typeof entropyEnc !== "string") {
        addEnc = add;
        add = entropyEnc;
        entropyEnc = null;
      }
      entropy = utils.toArray(entropy, entropyEnc);
      add = utils.toArray(add, addEnc);
      assert2(
        entropy.length >= this.minEntropy / 8,
        "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
      );
      this._update(entropy.concat(add || []));
      this._reseed = 1;
    };
    HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
      if (this._reseed > this.reseedInterval)
        throw new Error("Reseed is required");
      if (typeof enc !== "string") {
        addEnc = add;
        add = enc;
        enc = null;
      }
      if (add) {
        add = utils.toArray(add, addEnc || "hex");
        this._update(add);
      }
      var temp = [];
      while (temp.length < len) {
        this.V = this._hmac().update(this.V).digest();
        temp = temp.concat(this.V);
      }
      var res = temp.slice(0, len);
      this._update(add);
      this._reseed++;
      return utils.encode(res, enc);
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/ec/key.js
var require_key = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/ec/key.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils3();
    var assert2 = utils.assert;
    function KeyPair(ec2, options) {
      this.ec = ec2;
      this.priv = null;
      this.pub = null;
      if (options.priv)
        this._importPrivate(options.priv, options.privEnc);
      if (options.pub)
        this._importPublic(options.pub, options.pubEnc);
    }
    module.exports = KeyPair;
    KeyPair.fromPublic = function fromPublic(ec2, pub, enc) {
      if (pub instanceof KeyPair)
        return pub;
      return new KeyPair(ec2, {
        pub,
        pubEnc: enc
      });
    };
    KeyPair.fromPrivate = function fromPrivate(ec2, priv, enc) {
      if (priv instanceof KeyPair)
        return priv;
      return new KeyPair(ec2, {
        priv,
        privEnc: enc
      });
    };
    KeyPair.prototype.validate = function validate4() {
      var pub = this.getPublic();
      if (pub.isInfinity())
        return { result: false, reason: "Invalid public key" };
      if (!pub.validate())
        return { result: false, reason: "Public key is not a point" };
      if (!pub.mul(this.ec.curve.n).isInfinity())
        return { result: false, reason: "Public key * N != O" };
      return { result: true, reason: null };
    };
    KeyPair.prototype.getPublic = function getPublic(compact, enc) {
      if (typeof compact === "string") {
        enc = compact;
        compact = null;
      }
      if (!this.pub)
        this.pub = this.ec.g.mul(this.priv);
      if (!enc)
        return this.pub;
      return this.pub.encode(enc, compact);
    };
    KeyPair.prototype.getPrivate = function getPrivate(enc) {
      if (enc === "hex")
        return this.priv.toString(16, 2);
      else
        return this.priv;
    };
    KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
      this.priv = new BN(key, enc || 16);
      this.priv = this.priv.umod(this.ec.curve.n);
    };
    KeyPair.prototype._importPublic = function _importPublic(key, enc) {
      if (key.x || key.y) {
        if (this.ec.curve.type === "mont") {
          assert2(key.x, "Need x coordinate");
        } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
          assert2(key.x && key.y, "Need both x and y coordinate");
        }
        this.pub = this.ec.curve.point(key.x, key.y);
        return;
      }
      this.pub = this.ec.curve.decodePoint(key, enc);
    };
    KeyPair.prototype.derive = function derive(pub) {
      if (!pub.validate()) {
        assert2(pub.validate(), "public point not validated");
      }
      return pub.mul(this.priv).getX();
    };
    KeyPair.prototype.sign = function sign(msg, enc, options) {
      return this.ec.sign(msg, this, enc, options);
    };
    KeyPair.prototype.verify = function verify(msg, signature, options) {
      return this.ec.verify(msg, signature, this, void 0, options);
    };
    KeyPair.prototype.inspect = function inspect() {
      return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/ec/signature.js
var require_signature = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/ec/signature.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils3();
    var assert2 = utils.assert;
    function Signature(options, enc) {
      if (options instanceof Signature)
        return options;
      if (this._importDER(options, enc))
        return;
      assert2(options.r && options.s, "Signature without r or s");
      this.r = new BN(options.r, 16);
      this.s = new BN(options.s, 16);
      if (options.recoveryParam === void 0)
        this.recoveryParam = null;
      else
        this.recoveryParam = options.recoveryParam;
    }
    module.exports = Signature;
    function Position() {
      this.place = 0;
    }
    function getLength(buf, p6) {
      var initial = buf[p6.place++];
      if (!(initial & 128)) {
        return initial;
      }
      var octetLen = initial & 15;
      if (octetLen === 0 || octetLen > 4) {
        return false;
      }
      if (buf[p6.place] === 0) {
        return false;
      }
      var val = 0;
      for (var i4 = 0, off = p6.place; i4 < octetLen; i4++, off++) {
        val <<= 8;
        val |= buf[off];
        val >>>= 0;
      }
      if (val <= 127) {
        return false;
      }
      p6.place = off;
      return val;
    }
    function rmPadding(buf) {
      var i4 = 0;
      var len = buf.length - 1;
      while (!buf[i4] && !(buf[i4 + 1] & 128) && i4 < len) {
        i4++;
      }
      if (i4 === 0) {
        return buf;
      }
      return buf.slice(i4);
    }
    Signature.prototype._importDER = function _importDER(data, enc) {
      data = utils.toArray(data, enc);
      var p6 = new Position();
      if (data[p6.place++] !== 48) {
        return false;
      }
      var len = getLength(data, p6);
      if (len === false) {
        return false;
      }
      if (len + p6.place !== data.length) {
        return false;
      }
      if (data[p6.place++] !== 2) {
        return false;
      }
      var rlen = getLength(data, p6);
      if (rlen === false) {
        return false;
      }
      if ((data[p6.place] & 128) !== 0) {
        return false;
      }
      var r3 = data.slice(p6.place, rlen + p6.place);
      p6.place += rlen;
      if (data[p6.place++] !== 2) {
        return false;
      }
      var slen = getLength(data, p6);
      if (slen === false) {
        return false;
      }
      if (data.length !== slen + p6.place) {
        return false;
      }
      if ((data[p6.place] & 128) !== 0) {
        return false;
      }
      var s3 = data.slice(p6.place, slen + p6.place);
      if (r3[0] === 0) {
        if (r3[1] & 128) {
          r3 = r3.slice(1);
        } else {
          return false;
        }
      }
      if (s3[0] === 0) {
        if (s3[1] & 128) {
          s3 = s3.slice(1);
        } else {
          return false;
        }
      }
      this.r = new BN(r3);
      this.s = new BN(s3);
      this.recoveryParam = null;
      return true;
    };
    function constructLength(arr, len) {
      if (len < 128) {
        arr.push(len);
        return;
      }
      var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
      arr.push(octets | 128);
      while (--octets) {
        arr.push(len >>> (octets << 3) & 255);
      }
      arr.push(len);
    }
    Signature.prototype.toDER = function toDER(enc) {
      var r3 = this.r.toArray();
      var s3 = this.s.toArray();
      if (r3[0] & 128)
        r3 = [0].concat(r3);
      if (s3[0] & 128)
        s3 = [0].concat(s3);
      r3 = rmPadding(r3);
      s3 = rmPadding(s3);
      while (!s3[0] && !(s3[1] & 128)) {
        s3 = s3.slice(1);
      }
      var arr = [2];
      constructLength(arr, r3.length);
      arr = arr.concat(r3);
      arr.push(2);
      constructLength(arr, s3.length);
      var backHalf = arr.concat(s3);
      var res = [48];
      constructLength(res, backHalf.length);
      res = res.concat(backHalf);
      return utils.encode(res, enc);
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/ec/index.js
var require_ec = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/ec/index.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var HmacDRBG = require_hmac_drbg();
    var utils = require_utils3();
    var curves = require_curves();
    var rand = require_brorand();
    var assert2 = utils.assert;
    var KeyPair = require_key();
    var Signature = require_signature();
    function EC(options) {
      if (!(this instanceof EC))
        return new EC(options);
      if (typeof options === "string") {
        assert2(
          Object.prototype.hasOwnProperty.call(curves, options),
          "Unknown curve " + options
        );
        options = curves[options];
      }
      if (options instanceof curves.PresetCurve)
        options = { curve: options };
      this.curve = options.curve.curve;
      this.n = this.curve.n;
      this.nh = this.n.ushrn(1);
      this.g = this.curve.g;
      this.g = options.curve.g;
      this.g.precompute(options.curve.n.bitLength() + 1);
      this.hash = options.hash || options.curve.hash;
    }
    module.exports = EC;
    EC.prototype.keyPair = function keyPair(options) {
      return new KeyPair(this, options);
    };
    EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
      return KeyPair.fromPrivate(this, priv, enc);
    };
    EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
      return KeyPair.fromPublic(this, pub, enc);
    };
    EC.prototype.genKeyPair = function genKeyPair(options) {
      if (!options)
        options = {};
      var drbg = new HmacDRBG({
        hash: this.hash,
        pers: options.pers,
        persEnc: options.persEnc || "utf8",
        entropy: options.entropy || rand(this.hash.hmacStrength),
        entropyEnc: options.entropy && options.entropyEnc || "utf8",
        nonce: this.n.toArray()
      });
      var bytes = this.n.byteLength();
      var ns2 = this.n.sub(new BN(2));
      for (; ; ) {
        var priv = new BN(drbg.generate(bytes));
        if (priv.cmp(ns2) > 0)
          continue;
        priv.iaddn(1);
        return this.keyFromPrivate(priv);
      }
    };
    EC.prototype._truncateToN = function _truncateToN(msg, truncOnly, bitLength) {
      var byteLength;
      if (BN.isBN(msg) || typeof msg === "number") {
        msg = new BN(msg, 16);
        byteLength = msg.byteLength();
      } else if (typeof msg === "object") {
        byteLength = msg.length;
        msg = new BN(msg, 16);
      } else {
        var str = msg.toString();
        byteLength = str.length + 1 >>> 1;
        msg = new BN(str, 16);
      }
      if (typeof bitLength !== "number") {
        bitLength = byteLength * 8;
      }
      var delta = bitLength - this.n.bitLength();
      if (delta > 0)
        msg = msg.ushrn(delta);
      if (!truncOnly && msg.cmp(this.n) >= 0)
        return msg.sub(this.n);
      else
        return msg;
    };
    EC.prototype.sign = function sign(msg, key, enc, options) {
      if (typeof enc === "object") {
        options = enc;
        enc = null;
      }
      if (!options)
        options = {};
      if (typeof msg !== "string" && typeof msg !== "number" && !BN.isBN(msg)) {
        assert2(
          typeof msg === "object" && msg && typeof msg.length === "number",
          "Expected message to be an array-like, a hex string, or a BN instance"
        );
        assert2(msg.length >>> 0 === msg.length);
        for (var i4 = 0; i4 < msg.length; i4++) assert2((msg[i4] & 255) === msg[i4]);
      }
      key = this.keyFromPrivate(key, enc);
      msg = this._truncateToN(msg, false, options.msgBitLength);
      assert2(!msg.isNeg(), "Can not sign a negative message");
      var bytes = this.n.byteLength();
      var bkey = key.getPrivate().toArray("be", bytes);
      var nonce = msg.toArray("be", bytes);
      assert2(new BN(nonce).eq(msg), "Can not sign message");
      var drbg = new HmacDRBG({
        hash: this.hash,
        entropy: bkey,
        nonce,
        pers: options.pers,
        persEnc: options.persEnc || "utf8"
      });
      var ns1 = this.n.sub(new BN(1));
      for (var iter = 0; ; iter++) {
        var k7 = options.k ? options.k(iter) : new BN(drbg.generate(this.n.byteLength()));
        k7 = this._truncateToN(k7, true);
        if (k7.cmpn(1) <= 0 || k7.cmp(ns1) >= 0)
          continue;
        var kp = this.g.mul(k7);
        if (kp.isInfinity())
          continue;
        var kpX = kp.getX();
        var r3 = kpX.umod(this.n);
        if (r3.cmpn(0) === 0)
          continue;
        var s3 = k7.invm(this.n).mul(r3.mul(key.getPrivate()).iadd(msg));
        s3 = s3.umod(this.n);
        if (s3.cmpn(0) === 0)
          continue;
        var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r3) !== 0 ? 2 : 0);
        if (options.canonical && s3.cmp(this.nh) > 0) {
          s3 = this.n.sub(s3);
          recoveryParam ^= 1;
        }
        return new Signature({ r: r3, s: s3, recoveryParam });
      }
    };
    EC.prototype.verify = function verify(msg, signature, key, enc, options) {
      if (!options)
        options = {};
      msg = this._truncateToN(msg, false, options.msgBitLength);
      key = this.keyFromPublic(key, enc);
      signature = new Signature(signature, "hex");
      var r3 = signature.r;
      var s3 = signature.s;
      if (r3.cmpn(1) < 0 || r3.cmp(this.n) >= 0)
        return false;
      if (s3.cmpn(1) < 0 || s3.cmp(this.n) >= 0)
        return false;
      var sinv = s3.invm(this.n);
      var u1 = sinv.mul(msg).umod(this.n);
      var u22 = sinv.mul(r3).umod(this.n);
      var p6;
      if (!this.curve._maxwellTrick) {
        p6 = this.g.mulAdd(u1, key.getPublic(), u22);
        if (p6.isInfinity())
          return false;
        return p6.getX().umod(this.n).cmp(r3) === 0;
      }
      p6 = this.g.jmulAdd(u1, key.getPublic(), u22);
      if (p6.isInfinity())
        return false;
      return p6.eqXToP(r3);
    };
    EC.prototype.recoverPubKey = function(msg, signature, j5, enc) {
      assert2((3 & j5) === j5, "The recovery param is more than two bits");
      signature = new Signature(signature, enc);
      var n5 = this.n;
      var e2 = new BN(msg);
      var r3 = signature.r;
      var s3 = signature.s;
      var isYOdd = j5 & 1;
      var isSecondKey = j5 >> 1;
      if (r3.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
        throw new Error("Unable to find sencond key candinate");
      if (isSecondKey)
        r3 = this.curve.pointFromX(r3.add(this.curve.n), isYOdd);
      else
        r3 = this.curve.pointFromX(r3, isYOdd);
      var rInv = signature.r.invm(n5);
      var s1 = n5.sub(e2).mul(rInv).umod(n5);
      var s22 = s3.mul(rInv).umod(n5);
      return this.g.mulAdd(s1, r3, s22);
    };
    EC.prototype.getKeyRecoveryParam = function(e2, signature, Q5, enc) {
      signature = new Signature(signature, enc);
      if (signature.recoveryParam !== null)
        return signature.recoveryParam;
      for (var i4 = 0; i4 < 4; i4++) {
        var Qprime;
        try {
          Qprime = this.recoverPubKey(e2, signature, i4);
        } catch (e3) {
          continue;
        }
        if (Qprime.eq(Q5))
          return i4;
      }
      throw new Error("Unable to find valid recovery factor");
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/eddsa/key.js
var require_key2 = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/eddsa/key.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var assert2 = utils.assert;
    var parseBytes = utils.parseBytes;
    var cachedProperty = utils.cachedProperty;
    function KeyPair(eddsa, params) {
      this.eddsa = eddsa;
      this._secret = parseBytes(params.secret);
      if (eddsa.isPoint(params.pub))
        this._pub = params.pub;
      else
        this._pubBytes = parseBytes(params.pub);
    }
    KeyPair.fromPublic = function fromPublic(eddsa, pub) {
      if (pub instanceof KeyPair)
        return pub;
      return new KeyPair(eddsa, { pub });
    };
    KeyPair.fromSecret = function fromSecret(eddsa, secret) {
      if (secret instanceof KeyPair)
        return secret;
      return new KeyPair(eddsa, { secret });
    };
    KeyPair.prototype.secret = function secret() {
      return this._secret;
    };
    cachedProperty(KeyPair, "pubBytes", function pubBytes() {
      return this.eddsa.encodePoint(this.pub());
    });
    cachedProperty(KeyPair, "pub", function pub() {
      if (this._pubBytes)
        return this.eddsa.decodePoint(this._pubBytes);
      return this.eddsa.g.mul(this.priv());
    });
    cachedProperty(KeyPair, "privBytes", function privBytes() {
      var eddsa = this.eddsa;
      var hash = this.hash();
      var lastIx = eddsa.encodingLength - 1;
      var a3 = hash.slice(0, eddsa.encodingLength);
      a3[0] &= 248;
      a3[lastIx] &= 127;
      a3[lastIx] |= 64;
      return a3;
    });
    cachedProperty(KeyPair, "priv", function priv() {
      return this.eddsa.decodeInt(this.privBytes());
    });
    cachedProperty(KeyPair, "hash", function hash() {
      return this.eddsa.hash().update(this.secret()).digest();
    });
    cachedProperty(KeyPair, "messagePrefix", function messagePrefix() {
      return this.hash().slice(this.eddsa.encodingLength);
    });
    KeyPair.prototype.sign = function sign(message) {
      assert2(this._secret, "KeyPair can only verify");
      return this.eddsa.sign(message, this);
    };
    KeyPair.prototype.verify = function verify(message, sig) {
      return this.eddsa.verify(message, sig, this);
    };
    KeyPair.prototype.getSecret = function getSecret(enc) {
      assert2(this._secret, "KeyPair is public only");
      return utils.encode(this.secret(), enc);
    };
    KeyPair.prototype.getPublic = function getPublic(enc) {
      return utils.encode(this.pubBytes(), enc);
    };
    module.exports = KeyPair;
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/eddsa/signature.js
var require_signature2 = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/eddsa/signature.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils3();
    var assert2 = utils.assert;
    var cachedProperty = utils.cachedProperty;
    var parseBytes = utils.parseBytes;
    function Signature(eddsa, sig) {
      this.eddsa = eddsa;
      if (typeof sig !== "object")
        sig = parseBytes(sig);
      if (Array.isArray(sig)) {
        assert2(sig.length === eddsa.encodingLength * 2, "Signature has invalid size");
        sig = {
          R: sig.slice(0, eddsa.encodingLength),
          S: sig.slice(eddsa.encodingLength)
        };
      }
      assert2(sig.R && sig.S, "Signature without R or S");
      if (eddsa.isPoint(sig.R))
        this._R = sig.R;
      if (sig.S instanceof BN)
        this._S = sig.S;
      this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
      this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
    }
    cachedProperty(Signature, "S", function S5() {
      return this.eddsa.decodeInt(this.Sencoded());
    });
    cachedProperty(Signature, "R", function R3() {
      return this.eddsa.decodePoint(this.Rencoded());
    });
    cachedProperty(Signature, "Rencoded", function Rencoded() {
      return this.eddsa.encodePoint(this.R());
    });
    cachedProperty(Signature, "Sencoded", function Sencoded() {
      return this.eddsa.encodeInt(this.S());
    });
    Signature.prototype.toBytes = function toBytes2() {
      return this.Rencoded().concat(this.Sencoded());
    };
    Signature.prototype.toHex = function toHex3() {
      return utils.encode(this.toBytes(), "hex").toUpperCase();
    };
    module.exports = Signature;
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/eddsa/index.js
var require_eddsa = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic/eddsa/index.js"(exports, module) {
    "use strict";
    var hash = require_hash();
    var curves = require_curves();
    var utils = require_utils3();
    var assert2 = utils.assert;
    var parseBytes = utils.parseBytes;
    var KeyPair = require_key2();
    var Signature = require_signature2();
    function EDDSA(curve) {
      assert2(curve === "ed25519", "only tested with ed25519 so far");
      if (!(this instanceof EDDSA))
        return new EDDSA(curve);
      curve = curves[curve].curve;
      this.curve = curve;
      this.g = curve.g;
      this.g.precompute(curve.n.bitLength() + 1);
      this.pointClass = curve.point().constructor;
      this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
      this.hash = hash.sha512;
    }
    module.exports = EDDSA;
    EDDSA.prototype.sign = function sign(message, secret) {
      message = parseBytes(message);
      var key = this.keyFromSecret(secret);
      var r3 = this.hashInt(key.messagePrefix(), message);
      var R3 = this.g.mul(r3);
      var Rencoded = this.encodePoint(R3);
      var s_ = this.hashInt(Rencoded, key.pubBytes(), message).mul(key.priv());
      var S5 = r3.add(s_).umod(this.curve.n);
      return this.makeSignature({ R: R3, S: S5, Rencoded });
    };
    EDDSA.prototype.verify = function verify(message, sig, pub) {
      message = parseBytes(message);
      sig = this.makeSignature(sig);
      if (sig.S().gte(sig.eddsa.curve.n) || sig.S().isNeg()) {
        return false;
      }
      var key = this.keyFromPublic(pub);
      var h5 = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
      var SG = this.g.mul(sig.S());
      var RplusAh = sig.R().add(key.pub().mul(h5));
      return RplusAh.eq(SG);
    };
    EDDSA.prototype.hashInt = function hashInt() {
      var hash2 = this.hash();
      for (var i4 = 0; i4 < arguments.length; i4++)
        hash2.update(arguments[i4]);
      return utils.intFromLE(hash2.digest()).umod(this.curve.n);
    };
    EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
      return KeyPair.fromPublic(this, pub);
    };
    EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
      return KeyPair.fromSecret(this, secret);
    };
    EDDSA.prototype.makeSignature = function makeSignature(sig) {
      if (sig instanceof Signature)
        return sig;
      return new Signature(this, sig);
    };
    EDDSA.prototype.encodePoint = function encodePoint(point) {
      var enc = point.getY().toArray("le", this.encodingLength);
      enc[this.encodingLength - 1] |= point.getX().isOdd() ? 128 : 0;
      return enc;
    };
    EDDSA.prototype.decodePoint = function decodePoint(bytes) {
      bytes = utils.parseBytes(bytes);
      var lastIx = bytes.length - 1;
      var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~128);
      var xIsOdd = (bytes[lastIx] & 128) !== 0;
      var y7 = utils.intFromLE(normed);
      return this.curve.pointFromY(y7, xIsOdd);
    };
    EDDSA.prototype.encodeInt = function encodeInt(num) {
      return num.toArray("le", this.encodingLength);
    };
    EDDSA.prototype.decodeInt = function decodeInt(bytes) {
      return utils.intFromLE(bytes);
    };
    EDDSA.prototype.isPoint = function isPoint(val) {
      return val instanceof this.pointClass;
    };
  }
});

// node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic.js
var require_elliptic = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/elliptic/lib/elliptic.js"(exports) {
    "use strict";
    var elliptic = exports;
    elliptic.version = require_package().version;
    elliptic.utils = require_utils3();
    elliptic.rand = require_brorand();
    elliptic.curve = require_curve();
    elliptic.curves = require_curves();
    elliptic.ec = require_ec();
    elliptic.eddsa = require_eddsa();
  }
});

// node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "node_modules/quick-format-unescaped/index.js"(exports, module) {
    "use strict";
    function tryStringify(o7) {
      try {
        return JSON.stringify(o7);
      } catch (e2) {
        return '"[Circular]"';
      }
    }
    module.exports = format;
    function format(f6, args, opts) {
      var ss2 = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f6 === "object" && f6 !== null) {
        var len = args.length + offset;
        if (len === 1) return f6;
        var objects = new Array(len);
        objects[0] = ss2(f6);
        for (var index = 1; index < len; index++) {
          objects[index] = ss2(args[index]);
        }
        return objects.join(" ");
      }
      if (typeof f6 !== "string") {
        return f6;
      }
      var argLen = args.length;
      if (argLen === 0) return f6;
      var str = "";
      var a3 = 1 - offset;
      var lastPos = -1;
      var flen = f6 && f6.length || 0;
      for (var i4 = 0; i4 < flen; ) {
        if (f6.charCodeAt(i4) === 37 && i4 + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f6.charCodeAt(i4 + 1)) {
            case 100:
            case 102:
              if (a3 >= argLen)
                break;
              if (args[a3] == null) break;
              if (lastPos < i4)
                str += f6.slice(lastPos, i4);
              str += Number(args[a3]);
              lastPos = i4 + 2;
              i4++;
              break;
            case 105:
              if (a3 >= argLen)
                break;
              if (args[a3] == null) break;
              if (lastPos < i4)
                str += f6.slice(lastPos, i4);
              str += Math.floor(Number(args[a3]));
              lastPos = i4 + 2;
              i4++;
              break;
            case 79:
            case 111:
            case 106:
              if (a3 >= argLen)
                break;
              if (args[a3] === void 0) break;
              if (lastPos < i4)
                str += f6.slice(lastPos, i4);
              var type = typeof args[a3];
              if (type === "string") {
                str += "'" + args[a3] + "'";
                lastPos = i4 + 2;
                i4++;
                break;
              }
              if (type === "function") {
                str += args[a3].name || "<anonymous>";
                lastPos = i4 + 2;
                i4++;
                break;
              }
              str += ss2(args[a3]);
              lastPos = i4 + 2;
              i4++;
              break;
            case 115:
              if (a3 >= argLen)
                break;
              if (lastPos < i4)
                str += f6.slice(lastPos, i4);
              str += String(args[a3]);
              lastPos = i4 + 2;
              i4++;
              break;
            case 37:
              if (lastPos < i4)
                str += f6.slice(lastPos, i4);
              str += "%";
              lastPos = i4 + 2;
              i4++;
              a3--;
              break;
          }
          ++a3;
        }
        ++i4;
      }
      if (lastPos === -1)
        return f6;
      else if (lastPos < flen) {
        str += f6.slice(lastPos);
      }
      return str;
    }
  }
});

// node_modules/pino/browser.js
var require_browser = __commonJS({
  "node_modules/pino/browser.js"(exports, module) {
    "use strict";
    var format = require_quick_format_unescaped();
    module.exports = pino;
    var _console = pfGlobalThisOrFallback().console || {};
    var stdSerializers = {
      mapHttpRequest: mock,
      mapHttpResponse: mock,
      wrapRequestSerializer: passthrough,
      wrapResponseSerializer: passthrough,
      wrapErrorSerializer: passthrough,
      req: mock,
      res: mock,
      err: asErrValue
    };
    function shouldSerialize(serialize, serializers) {
      if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k7) {
          return k7 !== "!stdSerializers.err";
        });
        return hasToFilter;
      } else if (serialize === true) {
        return Object.keys(serializers);
      }
      return false;
    }
    function pino(opts) {
      opts = opts || {};
      opts.browser = opts.browser || {};
      const transmit2 = opts.browser.transmit;
      if (transmit2 && typeof transmit2.send !== "function") {
        throw Error("pino: transmit option must have a send function");
      }
      const proto = opts.browser.write || _console;
      if (opts.browser.write) opts.browser.asObject = true;
      const serializers = opts.serializers || {};
      const serialize = shouldSerialize(opts.browser.serialize, serializers);
      let stdErrSerialize = opts.browser.serialize;
      if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1) stdErrSerialize = false;
      const levels = ["error", "fatal", "warn", "info", "debug", "trace"];
      if (typeof proto === "function") {
        proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
      }
      if (opts.enabled === false) opts.level = "silent";
      const level = opts.level || "info";
      const logger = Object.create(proto);
      if (!logger.log) logger.log = noop;
      Object.defineProperty(logger, "levelVal", {
        get: getLevelVal
      });
      Object.defineProperty(logger, "level", {
        get: getLevel,
        set: setLevel
      });
      const setOpts = {
        transmit: transmit2,
        serialize,
        asObject: opts.browser.asObject,
        levels,
        timestamp: getTimeFunction(opts)
      };
      logger.levels = pino.levels;
      logger.level = level;
      logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
      logger.serializers = serializers;
      logger._serialize = serialize;
      logger._stdErrSerialize = stdErrSerialize;
      logger.child = child;
      if (transmit2) logger._logEvent = createLogEventShape();
      function getLevelVal() {
        return this.level === "silent" ? Infinity : this.levels.values[this.level];
      }
      function getLevel() {
        return this._level;
      }
      function setLevel(level2) {
        if (level2 !== "silent" && !this.levels.values[level2]) {
          throw Error("unknown level " + level2);
        }
        this._level = level2;
        set2(setOpts, logger, "error", "log");
        set2(setOpts, logger, "fatal", "error");
        set2(setOpts, logger, "warn", "error");
        set2(setOpts, logger, "info", "log");
        set2(setOpts, logger, "debug", "log");
        set2(setOpts, logger, "trace", "log");
      }
      function child(bindings, childOptions) {
        if (!bindings) {
          throw new Error("missing bindings for child Pino");
        }
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) {
          childOptions.serializers = bindings.serializers;
        }
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
          var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
          var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
          delete bindings.serializers;
          applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
          this._childLevel = (parent._childLevel | 0) + 1;
          this.error = bind(parent, bindings, "error");
          this.fatal = bind(parent, bindings, "fatal");
          this.warn = bind(parent, bindings, "warn");
          this.info = bind(parent, bindings, "info");
          this.debug = bind(parent, bindings, "debug");
          this.trace = bind(parent, bindings, "trace");
          if (childSerializers) {
            this.serializers = childSerializers;
            this._serialize = childSerialize;
          }
          if (transmit2) {
            this._logEvent = createLogEventShape(
              [].concat(parent._logEvent.bindings, bindings)
            );
          }
        }
        Child.prototype = this;
        return new Child(this);
      }
      return logger;
    }
    pino.levels = {
      values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
      },
      labels: {
        10: "trace",
        20: "debug",
        30: "info",
        40: "warn",
        50: "error",
        60: "fatal"
      }
    };
    pino.stdSerializers = stdSerializers;
    pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
    function set2(opts, logger, level, fallback2) {
      const proto = Object.getPrototypeOf(logger);
      logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback2] || noop;
      wrap(opts, logger, level);
    }
    function wrap(opts, logger, level) {
      if (!opts.transmit && logger[level] === noop) return;
      logger[level] = /* @__PURE__ */ function(write) {
        return function LOG() {
          const ts2 = opts.timestamp();
          const args = new Array(arguments.length);
          const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
          for (var i4 = 0; i4 < args.length; i4++) args[i4] = arguments[i4];
          if (opts.serialize && !opts.asObject) {
            applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
          }
          if (opts.asObject) write.call(proto, asObject(this, level, args, ts2));
          else write.apply(proto, args);
          if (opts.transmit) {
            const transmitLevel = opts.transmit.level || logger.level;
            const transmitValue = pino.levels.values[transmitLevel];
            const methodValue = pino.levels.values[level];
            if (methodValue < transmitValue) return;
            transmit(this, {
              ts: ts2,
              methodLevel: level,
              methodValue,
              transmitLevel,
              transmitValue: pino.levels.values[opts.transmit.level || logger.level],
              send: opts.transmit.send,
              val: logger.levelVal
            }, args);
          }
        };
      }(logger[level]);
    }
    function asObject(logger, level, args, ts2) {
      if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
      const argsCloned = args.slice();
      let msg = argsCloned[0];
      const o7 = {};
      if (ts2) {
        o7.time = ts2;
      }
      o7.level = pino.levels.values[level];
      let lvl = (logger._childLevel | 0) + 1;
      if (lvl < 1) lvl = 1;
      if (msg !== null && typeof msg === "object") {
        while (lvl-- && typeof argsCloned[0] === "object") {
          Object.assign(o7, argsCloned.shift());
        }
        msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
      } else if (typeof msg === "string") msg = format(argsCloned.shift(), argsCloned);
      if (msg !== void 0) o7.msg = msg;
      return o7;
    }
    function applySerializers(args, serialize, serializers, stdErrSerialize) {
      for (const i4 in args) {
        if (stdErrSerialize && args[i4] instanceof Error) {
          args[i4] = pino.stdSerializers.err(args[i4]);
        } else if (typeof args[i4] === "object" && !Array.isArray(args[i4])) {
          for (const k7 in args[i4]) {
            if (serialize && serialize.indexOf(k7) > -1 && k7 in serializers) {
              args[i4][k7] = serializers[k7](args[i4][k7]);
            }
          }
        }
      }
    }
    function bind(parent, bindings, level) {
      return function() {
        const args = new Array(1 + arguments.length);
        args[0] = bindings;
        for (var i4 = 1; i4 < args.length; i4++) {
          args[i4] = arguments[i4 - 1];
        }
        return parent[level].apply(this, args);
      };
    }
    function transmit(logger, opts, args) {
      const send = opts.send;
      const ts2 = opts.ts;
      const methodLevel = opts.methodLevel;
      const methodValue = opts.methodValue;
      const val = opts.val;
      const bindings = logger._logEvent.bindings;
      applySerializers(
        args,
        logger._serialize || Object.keys(logger.serializers),
        logger.serializers,
        logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
      );
      logger._logEvent.ts = ts2;
      logger._logEvent.messages = args.filter(function(arg) {
        return bindings.indexOf(arg) === -1;
      });
      logger._logEvent.level.label = methodLevel;
      logger._logEvent.level.value = methodValue;
      send(methodLevel, logger._logEvent, val);
      logger._logEvent = createLogEventShape(bindings);
    }
    function createLogEventShape(bindings) {
      return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: { label: "", value: 0 }
      };
    }
    function asErrValue(err) {
      const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
      };
      for (const key in err) {
        if (obj[key] === void 0) {
          obj[key] = err[key];
        }
      }
      return obj;
    }
    function getTimeFunction(opts) {
      if (typeof opts.timestamp === "function") {
        return opts.timestamp;
      }
      if (opts.timestamp === false) {
        return nullTime;
      }
      return epochTime;
    }
    function mock() {
      return {};
    }
    function passthrough(a3) {
      return a3;
    }
    function noop() {
    }
    function nullTime() {
      return false;
    }
    function epochTime() {
      return Date.now();
    }
    function unixTime() {
      return Math.round(Date.now() / 1e3);
    }
    function isoTime() {
      return new Date(Date.now()).toISOString();
    }
    function pfGlobalThisOrFallback() {
      function defd(o7) {
        return typeof o7 !== "undefined" && o7;
      }
      try {
        if (typeof globalThis !== "undefined") return globalThis;
        Object.defineProperty(Object.prototype, "globalThis", {
          get: function() {
            delete Object.prototype.globalThis;
            return this.globalThis = this;
          },
          configurable: true
        });
        return globalThis;
      } catch (e2) {
        return defd(self) || defd(window) || defd(this) || {};
      }
    }
  }
});

// node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js
var tslib_es6_exports2 = {};
__export(tslib_es6_exports2, {
  __assign: () => __assign2,
  __asyncDelegator: () => __asyncDelegator2,
  __asyncGenerator: () => __asyncGenerator2,
  __asyncValues: () => __asyncValues2,
  __await: () => __await2,
  __awaiter: () => __awaiter2,
  __classPrivateFieldGet: () => __classPrivateFieldGet2,
  __classPrivateFieldSet: () => __classPrivateFieldSet2,
  __createBinding: () => __createBinding2,
  __decorate: () => __decorate2,
  __exportStar: () => __exportStar2,
  __extends: () => __extends2,
  __generator: () => __generator2,
  __importDefault: () => __importDefault2,
  __importStar: () => __importStar2,
  __makeTemplateObject: () => __makeTemplateObject2,
  __metadata: () => __metadata2,
  __param: () => __param2,
  __read: () => __read2,
  __rest: () => __rest2,
  __spread: () => __spread2,
  __spreadArrays: () => __spreadArrays2,
  __values: () => __values2
});
function __extends2(d6, b6) {
  extendStatics2(d6, b6);
  function __() {
    this.constructor = d6;
  }
  d6.prototype = b6 === null ? Object.create(b6) : (__.prototype = b6.prototype, new __());
}
function __rest2(s3, e2) {
  var t = {};
  for (var p6 in s3) if (Object.prototype.hasOwnProperty.call(s3, p6) && e2.indexOf(p6) < 0)
    t[p6] = s3[p6];
  if (s3 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i4 = 0, p6 = Object.getOwnPropertySymbols(s3); i4 < p6.length; i4++) {
      if (e2.indexOf(p6[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s3, p6[i4]))
        t[p6[i4]] = s3[p6[i4]];
    }
  return t;
}
function __decorate2(decorators, target, key, desc) {
  var c7 = arguments.length, r3 = c7 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d6;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
  else for (var i4 = decorators.length - 1; i4 >= 0; i4--) if (d6 = decorators[i4]) r3 = (c7 < 3 ? d6(r3) : c7 > 3 ? d6(target, key, r3) : d6(target, key)) || r3;
  return c7 > 3 && r3 && Object.defineProperty(target, key, r3), r3;
}
function __param2(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata2(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter2(thisArg, _arguments, P7, generator) {
  function adopt(value) {
    return value instanceof P7 ? value : new P7(function(resolve) {
      resolve(value);
    });
  }
  return new (P7 || (P7 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator2(thisArg, body) {
  var _5 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f6, y7, t, g6;
  return g6 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g6[Symbol.iterator] = function() {
    return this;
  }), g6;
  function verb(n5) {
    return function(v8) {
      return step([n5, v8]);
    };
  }
  function step(op) {
    if (f6) throw new TypeError("Generator is already executing.");
    while (_5) try {
      if (f6 = 1, y7 && (t = op[0] & 2 ? y7["return"] : op[0] ? y7["throw"] || ((t = y7["return"]) && t.call(y7), 0) : y7.next) && !(t = t.call(y7, op[1])).done) return t;
      if (y7 = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _5.label++;
          return { value: op[1], done: false };
        case 5:
          _5.label++;
          y7 = op[1];
          op = [0];
          continue;
        case 7:
          op = _5.ops.pop();
          _5.trys.pop();
          continue;
        default:
          if (!(t = _5.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _5 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _5.label = op[1];
            break;
          }
          if (op[0] === 6 && _5.label < t[1]) {
            _5.label = t[1];
            t = op;
            break;
          }
          if (t && _5.label < t[2]) {
            _5.label = t[2];
            _5.ops.push(op);
            break;
          }
          if (t[2]) _5.ops.pop();
          _5.trys.pop();
          continue;
      }
      op = body.call(thisArg, _5);
    } catch (e2) {
      op = [6, e2];
      y7 = 0;
    } finally {
      f6 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding2(o7, m5, k7, k22) {
  if (k22 === void 0) k22 = k7;
  o7[k22] = m5[k7];
}
function __exportStar2(m5, exports) {
  for (var p6 in m5) if (p6 !== "default" && !exports.hasOwnProperty(p6)) exports[p6] = m5[p6];
}
function __values2(o7) {
  var s3 = typeof Symbol === "function" && Symbol.iterator, m5 = s3 && o7[s3], i4 = 0;
  if (m5) return m5.call(o7);
  if (o7 && typeof o7.length === "number") return {
    next: function() {
      if (o7 && i4 >= o7.length) o7 = void 0;
      return { value: o7 && o7[i4++], done: !o7 };
    }
  };
  throw new TypeError(s3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read2(o7, n5) {
  var m5 = typeof Symbol === "function" && o7[Symbol.iterator];
  if (!m5) return o7;
  var i4 = m5.call(o7), r3, ar4 = [], e2;
  try {
    while ((n5 === void 0 || n5-- > 0) && !(r3 = i4.next()).done) ar4.push(r3.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r3 && !r3.done && (m5 = i4["return"])) m5.call(i4);
    } finally {
      if (e2) throw e2.error;
    }
  }
  return ar4;
}
function __spread2() {
  for (var ar4 = [], i4 = 0; i4 < arguments.length; i4++)
    ar4 = ar4.concat(__read2(arguments[i4]));
  return ar4;
}
function __spreadArrays2() {
  for (var s3 = 0, i4 = 0, il = arguments.length; i4 < il; i4++) s3 += arguments[i4].length;
  for (var r3 = Array(s3), k7 = 0, i4 = 0; i4 < il; i4++)
    for (var a3 = arguments[i4], j5 = 0, jl = a3.length; j5 < jl; j5++, k7++)
      r3[k7] = a3[j5];
  return r3;
}
function __await2(v8) {
  return this instanceof __await2 ? (this.v = v8, this) : new __await2(v8);
}
function __asyncGenerator2(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g6 = generator.apply(thisArg, _arguments || []), i4, q3 = [];
  return i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4;
  function verb(n5) {
    if (g6[n5]) i4[n5] = function(v8) {
      return new Promise(function(a3, b6) {
        q3.push([n5, v8, a3, b6]) > 1 || resume(n5, v8);
      });
    };
  }
  function resume(n5, v8) {
    try {
      step(g6[n5](v8));
    } catch (e2) {
      settle(q3[0][3], e2);
    }
  }
  function step(r3) {
    r3.value instanceof __await2 ? Promise.resolve(r3.value.v).then(fulfill, reject) : settle(q3[0][2], r3);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f6, v8) {
    if (f6(v8), q3.shift(), q3.length) resume(q3[0][0], q3[0][1]);
  }
}
function __asyncDelegator2(o7) {
  var i4, p6;
  return i4 = {}, verb("next"), verb("throw", function(e2) {
    throw e2;
  }), verb("return"), i4[Symbol.iterator] = function() {
    return this;
  }, i4;
  function verb(n5, f6) {
    i4[n5] = o7[n5] ? function(v8) {
      return (p6 = !p6) ? { value: __await2(o7[n5](v8)), done: n5 === "return" } : f6 ? f6(v8) : v8;
    } : f6;
  }
}
function __asyncValues2(o7) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m5 = o7[Symbol.asyncIterator], i4;
  return m5 ? m5.call(o7) : (o7 = typeof __values2 === "function" ? __values2(o7) : o7[Symbol.iterator](), i4 = {}, verb("next"), verb("throw"), verb("return"), i4[Symbol.asyncIterator] = function() {
    return this;
  }, i4);
  function verb(n5) {
    i4[n5] = o7[n5] && function(v8) {
      return new Promise(function(resolve, reject) {
        v8 = o7[n5](v8), settle(resolve, reject, v8.done, v8.value);
      });
    };
  }
  function settle(resolve, reject, d6, v8) {
    Promise.resolve(v8).then(function(v9) {
      resolve({ value: v9, done: d6 });
    }, reject);
  }
}
function __makeTemplateObject2(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar2(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k7 in mod) if (Object.hasOwnProperty.call(mod, k7)) result[k7] = mod[k7];
  }
  result.default = mod;
  return result;
}
function __importDefault2(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet2(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet2(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics2, __assign2;
var init_tslib_es62 = __esm({
  "node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js"() {
    extendStatics2 = function(d6, b6) {
      extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d7, b7) {
        d7.__proto__ = b7;
      } || function(d7, b7) {
        for (var p6 in b7) if (b7.hasOwnProperty(p6)) d7[p6] = b7[p6];
      };
      return extendStatics2(d6, b6);
    };
    __assign2 = function() {
      __assign2 = Object.assign || function __assign3(t) {
        for (var s3, i4 = 1, n5 = arguments.length; i4 < n5; i4++) {
          s3 = arguments[i4];
          for (var p6 in s3) if (Object.prototype.hasOwnProperty.call(s3, p6)) t[p6] = s3[p6];
        }
        return t;
      };
      return __assign2.apply(this, arguments);
    };
  }
});

// node_modules/@walletconnect/environment/dist/cjs/crypto.js
var require_crypto2 = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
    function getBrowerCrypto() {
      return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
    }
    exports.getBrowerCrypto = getBrowerCrypto;
    function getSubtleCrypto() {
      const browserCrypto = getBrowerCrypto();
      return browserCrypto.subtle || browserCrypto.webkitSubtle;
    }
    exports.getSubtleCrypto = getSubtleCrypto;
    function isBrowserCryptoAvailable() {
      return !!getBrowerCrypto() && !!getSubtleCrypto();
    }
    exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/env.js
var require_env = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/env.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
    function isReactNative() {
      return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
    }
    exports.isReactNative = isReactNative;
    function isNode2() {
      return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
    }
    exports.isNode = isNode2;
    function isBrowser() {
      return !isReactNative() && !isNode2();
    }
    exports.isBrowser = isBrowser;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/index.js
var require_cjs4 = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    tslib_1.__exportStar(require_crypto2(), exports);
    tslib_1.__exportStar(require_env(), exports);
  }
});

// node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/browser.js
var require_browser2 = __commonJS({
  "node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/@walletconnect/jsonrpc-http-connection/node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/@walletconnect/jsonrpc-http-connection/node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    var __global__ = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global !== "undefined" && global;
    var __globalThis__ = function() {
      function F4() {
        this.fetch = false;
        this.DOMException = __global__.DOMException;
      }
      F4.prototype = __global__;
      return new F4();
    }();
    (function(globalThis2) {
      var irrelevant = function(exports2) {
        var g6 = typeof globalThis2 !== "undefined" && globalThis2 || typeof self !== "undefined" && self || // eslint-disable-next-line no-undef
        typeof global !== "undefined" && global || {};
        var support = {
          searchParams: "URLSearchParams" in g6,
          iterable: "Symbol" in g6 && "iterator" in Symbol,
          blob: "FileReader" in g6 && "Blob" in g6 && function() {
            try {
              new Blob();
              return true;
            } catch (e2) {
              return false;
            }
          }(),
          formData: "FormData" in g6,
          arrayBuffer: "ArrayBuffer" in g6
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name2) {
          if (typeof name2 !== "string") {
            name2 = String(name2);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name2) || name2 === "") {
            throw new TypeError('Invalid character in header field name: "' + name2 + '"');
          }
          return name2.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers(headers) {
          this.map = {};
          if (headers instanceof Headers) {
            headers.forEach(function(value, name2) {
              this.append(name2, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              if (header.length != 2) {
                throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + header.length);
              }
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name2) {
              this.append(name2, headers[name2]);
            }, this);
          }
        }
        Headers.prototype.append = function(name2, value) {
          name2 = normalizeName(name2);
          value = normalizeValue(value);
          var oldValue = this.map[name2];
          this.map[name2] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name2) {
          delete this.map[normalizeName(name2)];
        };
        Headers.prototype.get = function(name2) {
          name2 = normalizeName(name2);
          return this.has(name2) ? this.map[name2] : null;
        };
        Headers.prototype.has = function(name2) {
          return this.map.hasOwnProperty(normalizeName(name2));
        };
        Headers.prototype.set = function(name2, value) {
          this.map[normalizeName(name2)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name2 in this.map) {
            if (this.map.hasOwnProperty(name2)) {
              callback.call(thisArg, this.map[name2], name2, this);
            }
          }
        };
        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name2) {
            items.push(name2);
          });
          return iteratorFor(items);
        };
        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name2) {
            items.push([name2, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
          if (body._noBody) return;
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
          var encoding = match ? match[1] : "utf-8";
          reader.readAsText(blob, encoding);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i4 = 0; i4 < view.length; i4++) {
            chars[i4] = String.fromCharCode(view[i4]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this.bodyUsed = this.bodyUsed;
            this._bodyInit = body;
            if (!body) {
              this._noBody = true;
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
          }
          this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              var isConsumed = consumed(this);
              if (isConsumed) {
                return isConsumed;
              } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
                return Promise.resolve(
                  this._bodyArrayBuffer.buffer.slice(
                    this._bodyArrayBuffer.byteOffset,
                    this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                  )
                );
              } else {
                return Promise.resolve(this._bodyArrayBuffer);
              }
            } else if (support.blob) {
              return this.blob().then(readBlobAsArrayBuffer);
            } else {
              throw new Error("could not read as ArrayBuffer");
            }
          };
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode7);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request2(input, options) {
          if (!(this instanceof Request2)) {
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          }
          options = options || {};
          var body = options.body;
          if (input instanceof Request2) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal || function() {
            if ("AbortController" in g6) {
              var ctrl = new AbortController();
              return ctrl.signal;
            }
          }();
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
          if (this.method === "GET" || this.method === "HEAD") {
            if (options.cache === "no-store" || options.cache === "no-cache") {
              var reParamSearch = /([?&])_=[^&]*/;
              if (reParamSearch.test(this.url)) {
                this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
              } else {
                var reQueryString = /\?/;
                this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
              }
            }
          }
        }
        Request2.prototype.clone = function() {
          return new Request2(this, { body: this._bodyInit });
        };
        function decode7(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name2 = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name2), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split("\r").map(function(header) {
            return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
          }).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              try {
                headers.append(key, value);
              } catch (error) {
                console.warn("Response " + error.message);
              }
            }
          });
          return headers;
        }
        Body.call(Request2.prototype);
        function Response(bodyInit, options) {
          if (!(this instanceof Response)) {
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          }
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          if (this.status < 200 || this.status > 599) {
            throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
          }
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
          this.headers = new Headers(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 200, statusText: "" });
          response.ok = false;
          response.status = 0;
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        exports2.DOMException = g6.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name2) {
            this.message = message;
            this.name = name2;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request2(input, init);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              if (request.url.indexOf("file://") === 0 && (xhr.status < 200 || xhr.status > 599)) {
                options.status = 200;
              } else {
                options.status = xhr.status;
              }
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              setTimeout(function() {
                resolve(new Response(body, options));
              }, 0);
            };
            xhr.onerror = function() {
              setTimeout(function() {
                reject(new TypeError("Network request failed"));
              }, 0);
            };
            xhr.ontimeout = function() {
              setTimeout(function() {
                reject(new TypeError("Network request timed out"));
              }, 0);
            };
            xhr.onabort = function() {
              setTimeout(function() {
                reject(new exports2.DOMException("Aborted", "AbortError"));
              }, 0);
            };
            function fixUrl(url) {
              try {
                return url === "" && g6.location.href ? g6.location.href : url;
              } catch (e2) {
                return url;
              }
            }
            xhr.open(request.method, fixUrl(request.url), true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr) {
              if (support.blob) {
                xhr.responseType = "blob";
              } else if (support.arrayBuffer) {
                xhr.responseType = "arraybuffer";
              }
            }
            if (init && typeof init.headers === "object" && !(init.headers instanceof Headers || g6.Headers && init.headers instanceof g6.Headers)) {
              var names = [];
              Object.getOwnPropertyNames(init.headers).forEach(function(name2) {
                names.push(normalizeName(name2));
                xhr.setRequestHeader(name2, normalizeValue(init.headers[name2]));
              });
              request.headers.forEach(function(value, name2) {
                if (names.indexOf(name2) === -1) {
                  xhr.setRequestHeader(name2, value);
                }
              });
            } else {
              request.headers.forEach(function(value, name2) {
                xhr.setRequestHeader(name2, value);
              });
            }
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!g6.fetch) {
          g6.fetch = fetch2;
          g6.Headers = Headers;
          g6.Request = Request2;
          g6.Response = Response;
        }
        exports2.Headers = Headers;
        exports2.Request = Request2;
        exports2.Response = Response;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__globalThis__);
    __globalThis__.fetch.ponyfill = true;
    delete __globalThis__.fetch.polyfill;
    var ctx = __global__.fetch ? __global__ : __globalThis__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/@walletconnect/ethereum-provider/dist/index.es.js
var import_events11 = __toESM(require_events());

// node_modules/detect-browser/es/index.js
var __spreadArray = function(to3, from8, pack) {
  if (pack || arguments.length === 2) for (var i4 = 0, l7 = from8.length, ar4; i4 < l7; i4++) {
    if (ar4 || !(i4 in from8)) {
      if (!ar4) ar4 = Array.prototype.slice.call(from8, 0, i4);
      ar4[i4] = from8[i4];
    }
  }
  return to3.concat(ar4 || Array.prototype.slice.call(from8));
};
var BrowserInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function BrowserInfo2(name2, version3, os2) {
      this.name = name2;
      this.version = version3;
      this.os = os2;
      this.type = "browser";
    }
    return BrowserInfo2;
  }()
);
var NodeInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function NodeInfo2(version3) {
      this.version = version3;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo2;
  }()
);
var SearchBotDeviceInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function SearchBotDeviceInfo2(name2, version3, os2, bot) {
      this.name = name2;
      this.version = version3;
      this.os = os2;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo2;
  }()
);
var BotInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo2;
  }()
);
var ReactNativeInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo2;
  }()
);
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
function matchUserAgent(ua) {
  return ua !== "" && userAgentRules.reduce(function(matched, _a) {
    var browser = _a[0], regex = _a[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser, uaMatch];
  }, false);
}
function parseUserAgent(ua) {
  var matchedRule = matchUserAgent(ua);
  if (!matchedRule) {
    return null;
  }
  var name2 = matchedRule[0], match = matchedRule[1];
  if (name2 === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version3 = versionParts.join(".");
  var os2 = detectOS(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name2, version3, os2, searchBotMatch[1]);
  }
  return new BrowserInfo(name2, version3, os2);
}
function detectOS(ua) {
  for (var ii3 = 0, count = operatingSystemRules.length; ii3 < count; ii3++) {
    var _a = operatingSystemRules[ii3], os2 = _a[0], regex = _a[1];
    var match = regex.exec(ua);
    if (match) {
      return os2;
    }
  }
  return null;
}
function getNodeVersion() {
  var isNode2 = typeof process !== "undefined" && process.version;
  return isNode2 ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
  var output = [];
  for (var ii3 = 0; ii3 < count; ii3++) {
    output.push("0");
  }
  return output;
}

// node_modules/@walletconnect/utils/dist/index.es.js
var import_time2 = __toESM(require_cjs());
var import_window_getters = __toESM(require_cjs2());
var import_window_metadata = __toESM(require_cjs3());

// node_modules/@walletconnect/utils/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
function publicKeyToAddress(publicKey) {
  const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
  return checksumAddress(`0x${address}`);
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverPublicKey.js
async function recoverPublicKey({ hash, signature }) {
  const hashHex = isHex(hash) ? hash : toHex(hash);
  const { secp256k1: secp256k12 } = await import("./secp256k1-BW4KCQ3G.js");
  const signature_ = (() => {
    if (typeof signature === "object" && "r" in signature && "s" in signature) {
      const { r: r3, s: s3, v: v8, yParity } = signature;
      const yParityOrV2 = Number(yParity ?? v8);
      const recoveryBit2 = toRecoveryBit(yParityOrV2);
      return new secp256k12.Signature(hexToBigInt(r3), hexToBigInt(s3)).addRecoveryBit(recoveryBit2);
    }
    const signatureHex = isHex(signature) ? signature : toHex(signature);
    const yParityOrV = hexToNumber(`0x${signatureHex.slice(130)}`);
    const recoveryBit = toRecoveryBit(yParityOrV);
    return secp256k12.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
  })();
  const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
  return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
  if (yParityOrV === 0 || yParityOrV === 1)
    return yParityOrV;
  if (yParityOrV === 27)
    return 0;
  if (yParityOrV === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverAddress.js
async function recoverAddress({ hash, signature }) {
  return publicKeyToAddress(await recoverPublicKey({ hash, signature }));
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/transaction.js
var transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function formatTransaction(transaction) {
  const transaction_ = {
    ...transaction,
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  };
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559") {
    delete transaction_.maxFeePerBlobGas;
  }
  return transaction_;
}
var defineTransaction = defineFormatter("transaction", formatTransaction);
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    contractAddress: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block) {
  const transactions = (block.transactions ?? []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction(transaction);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}
var defineBlock = defineFormatter("block", formatBlock);

// node_modules/@walletconnect/utils/node_modules/viem/_esm/actions/public/getTransactionCount.js
async function getTransactionCount(client, { address, blockTag = "latest", blockNumber }) {
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [address, blockNumber ? numberToHex(blockNumber) : blockTag]
  }, { dedupe: Boolean(blockNumber) });
  return hexToNumber(count);
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction = 6;
var bytesPerFieldElement = 32;
var fieldElementsPerBlob = 4096;
var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * fieldElementsPerBlob * blobsPerTransaction;

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log, { args, eventName } = {}) {
  return {
    ...log,
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/actions/wallet/sendTransaction.js
var supportsWalletNamespace = new LruMap(128);

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/promise/withDedupe.js
var promiseCache = new LruMap(8192);

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/rpc/id.js
function createIdStore() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
var idCache = createIdStore();

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/transactionReceipt.js
var receiptStatuses = {
  "0x0": "reverted",
  "0x1": "success"
};
function formatTransactionReceipt(transactionReceipt) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
var defineTransactionReceipt = defineFormatter("transactionReceipt", formatTransactionReceipt);

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/nonceManager.js
function createNonceManager(parameters) {
  const { source } = parameters;
  const deltaMap = /* @__PURE__ */ new Map();
  const nonceMap = new LruMap(8192);
  const promiseMap = /* @__PURE__ */ new Map();
  const getKey = ({ address, chainId }) => `${address}.${chainId}`;
  return {
    async consume({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      const promise = this.get({ address, chainId, client });
      this.increment({ address, chainId });
      const nonce = await promise;
      await source.set({ address, chainId }, nonce);
      nonceMap.set(key, nonce);
      return nonce;
    },
    async increment({ address, chainId }) {
      const key = getKey({ address, chainId });
      const delta = deltaMap.get(key) ?? 0;
      deltaMap.set(key, delta + 1);
    },
    async get({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      let promise = promiseMap.get(key);
      if (!promise) {
        promise = (async () => {
          try {
            const nonce = await source.get({ address, chainId, client });
            const previousNonce = nonceMap.get(key) ?? 0;
            if (previousNonce > 0 && nonce <= previousNonce)
              return previousNonce + 1;
            nonceMap.delete(key);
            return nonce;
          } finally {
            this.reset({ address, chainId });
          }
        })();
        promiseMap.set(key, promise);
      }
      const delta = deltaMap.get(key) ?? 0;
      return delta + await promise;
    },
    reset({ address, chainId }) {
      const key = getKey({ address, chainId });
      deltaMap.delete(key);
      promiseMap.delete(key);
    }
  };
}
function jsonRpc() {
  return {
    async get(parameters) {
      const { address, client } = parameters;
      return getTransactionCount(client, {
        address,
        blockTag: "pending"
      });
    },
    set() {
    }
  };
}
var nonceManager = createNonceManager({
  source: jsonRpc()
});

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/version.js
var version = "0.1.1";

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/internal/errors.js
function getVersion() {
  return version;
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Errors.js
var BaseError2 = class _BaseError extends Error {
  constructor(shortMessage, options = {}) {
    const details = (() => {
      var _a;
      if (options.cause instanceof _BaseError) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if ((_a = options.cause) == null ? void 0 : _a.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath = (() => {
      if (options.cause instanceof _BaseError)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = "https://oxlib.sh";
    const docs = `${docsBaseUrl}${docsPath ?? ""}`;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath ? `See: ${docs}` : void 0
      ] : []
    ].filter((x7) => typeof x7 === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${getVersion()}`
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsPath = docsPath;
    this.shortMessage = shortMessage;
  }
  walk(fn3) {
    return walk(this, fn3);
  }
};
function walk(err, fn3) {
  if (fn3 == null ? void 0 : fn3(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn3);
  return fn3 ? null : err;
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/internal/bytes.js
function assertSize(bytes, size_) {
  if (size2(bytes) > size_)
    throw new SizeOverflowError({
      givenSize: size2(bytes),
      maxSize: size_
    });
}
var charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function pad2(bytes, options = {}) {
  const { dir, size: size4 = 32 } = options;
  if (size4 === 0)
    return bytes;
  if (bytes.length > size4)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size4,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size4);
  for (let i4 = 0; i4 < size4; i4++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i4 : size4 - i4 - 1] = bytes[padEnd ? i4 : bytes.length - i4 - 1];
  }
  return paddedBytes;
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/internal/hex.js
function assertSize2(hex, size_) {
  if (size3(hex) > size_)
    throw new SizeOverflowError2({
      givenSize: size3(hex),
      maxSize: size_
    });
}
function pad3(hex_, options = {}) {
  const { dir, size: size4 = 32 } = options;
  if (size4 === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size4 * 2)
    throw new SizeExceedsPaddingSizeError2({
      size: Math.ceil(hex.length / 2),
      targetSize: size4,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size4 * 2, "0")}`;
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Bytes.js
var decoder = new TextDecoder();
var encoder = new TextEncoder();
function from(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex2(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex2(value, options = {}) {
  const { size: size4 } = options;
  let hex = value;
  if (size4) {
    assertSize2(value, size4);
    hex = padRight(value, size4);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length2 = hexString.length / 2;
  const bytes = new Uint8Array(length2);
  for (let index = 0, j5 = 0; index < length2; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j5++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j5++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError2(`Invalid byte sequence ("${hexString[j5 - 2]}${hexString[j5 - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function fromString(value, options = {}) {
  const { size: size4 } = options;
  const bytes = encoder.encode(value);
  if (typeof size4 === "number") {
    assertSize(bytes, size4);
    return padRight2(bytes, size4);
  }
  return bytes;
}
function padRight2(value, size4) {
  return pad2(value, { dir: "right", size: size4 });
}
function size2(value) {
  return value.length;
}
var SizeOverflowError = class extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
};
var SizeExceedsPaddingSizeError = class extends BaseError2 {
  constructor({ size: size4, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size4}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Hex.js
var encoder2 = new TextEncoder();
var hexes = Array.from({ length: 256 }, (_v, i4) => i4.toString(16).padStart(2, "0"));
function concat2(...values) {
  return `0x${values.reduce((acc, x7) => acc + x7.replace("0x", ""), "")}`;
}
function fromBoolean(value, options = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof options.size === "number") {
    assertSize2(hex, options.size);
    return padLeft(hex, options.size);
  }
  return hex;
}
function fromBytes2(value, options = {}) {
  let string2 = "";
  for (let i4 = 0; i4 < value.length; i4++)
    string2 += hexes[value[i4]];
  const hex = `0x${string2}`;
  if (typeof options.size === "number") {
    assertSize2(hex, options.size);
    return padRight(hex, options.size);
  }
  return hex;
}
function fromNumber(value, options = {}) {
  const { signed, size: size4 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size4) {
    if (signed)
      maxValue = (1n << BigInt(size4) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size4) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size4,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? (1n << BigInt(size4 * 8)) + BigInt(value_) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size4)
    return padLeft(hex, size4);
  return hex;
}
function fromString2(value, options = {}) {
  return fromBytes2(encoder2.encode(value), options);
}
function padLeft(value, size4) {
  return pad3(value, { dir: "left", size: size4 });
}
function padRight(value, size4) {
  return pad3(value, { dir: "right", size: size4 });
}
function size3(value) {
  return Math.ceil((value.length - 2) / 2);
}
var IntegerOutOfRangeError = class extends BaseError2 {
  constructor({ max, min, signed, size: size4, value }) {
    super(`Number \`${value}\` is not in safe${size4 ? ` ${size4 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
};
var SizeOverflowError2 = class extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
};
var SizeExceedsPaddingSizeError2 = class extends BaseError2 {
  constructor({ size: size4, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size4}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Hash.js
function keccak2562(value, options = {}) {
  const { as: as2 = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_256(from(value));
  if (as2 === "Bytes")
    return bytes;
  return fromBytes2(bytes);
}

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/internal/lru.js
var LruMap2 = class extends Map {
  constructor(size4) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size4;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Caches.js
var caches = {
  checksum: new LruMap2(8192)
};
var checksum = caches.checksum;

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Address.js
var addressRegex = /^0x[a-fA-F0-9]{40}$/;
function assert(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex.test(value))
    throw new InvalidAddressError2({
      address: value,
      cause: new InvalidInputError()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum2(value) !== value)
      throw new InvalidAddressError2({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum2(address) {
  if (checksum.has(address))
    return checksum.get(address);
  assert(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash = keccak2562(fromString(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i4 = 0; i4 < 40; i4 += 2) {
    if (hash[i4 >> 1] >> 4 >= 8 && characters[i4]) {
      characters[i4] = characters[i4].toUpperCase();
    }
    if ((hash[i4 >> 1] & 15) >= 8 && characters[i4 + 1]) {
      characters[i4 + 1] = characters[i4 + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum.set(address, result);
  return result;
}
var InvalidAddressError2 = class extends BaseError2 {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
};
var InvalidInputError = class extends BaseError2 {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
};
var InvalidChecksumError = class extends BaseError2 {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
};

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/Solidity.js
var arrayRegex2 = /^(.*)\[([0-9]*)\]$/;
var bytesRegex2 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex2 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
var maxInt8 = 2n ** (8n - 1n) - 1n;
var maxInt16 = 2n ** (16n - 1n) - 1n;
var maxInt24 = 2n ** (24n - 1n) - 1n;
var maxInt32 = 2n ** (32n - 1n) - 1n;
var maxInt40 = 2n ** (40n - 1n) - 1n;
var maxInt48 = 2n ** (48n - 1n) - 1n;
var maxInt56 = 2n ** (56n - 1n) - 1n;
var maxInt64 = 2n ** (64n - 1n) - 1n;
var maxInt72 = 2n ** (72n - 1n) - 1n;
var maxInt80 = 2n ** (80n - 1n) - 1n;
var maxInt88 = 2n ** (88n - 1n) - 1n;
var maxInt96 = 2n ** (96n - 1n) - 1n;
var maxInt104 = 2n ** (104n - 1n) - 1n;
var maxInt112 = 2n ** (112n - 1n) - 1n;
var maxInt120 = 2n ** (120n - 1n) - 1n;
var maxInt128 = 2n ** (128n - 1n) - 1n;
var maxInt136 = 2n ** (136n - 1n) - 1n;
var maxInt144 = 2n ** (144n - 1n) - 1n;
var maxInt152 = 2n ** (152n - 1n) - 1n;
var maxInt160 = 2n ** (160n - 1n) - 1n;
var maxInt168 = 2n ** (168n - 1n) - 1n;
var maxInt176 = 2n ** (176n - 1n) - 1n;
var maxInt184 = 2n ** (184n - 1n) - 1n;
var maxInt192 = 2n ** (192n - 1n) - 1n;
var maxInt200 = 2n ** (200n - 1n) - 1n;
var maxInt208 = 2n ** (208n - 1n) - 1n;
var maxInt216 = 2n ** (216n - 1n) - 1n;
var maxInt224 = 2n ** (224n - 1n) - 1n;
var maxInt232 = 2n ** (232n - 1n) - 1n;
var maxInt240 = 2n ** (240n - 1n) - 1n;
var maxInt248 = 2n ** (248n - 1n) - 1n;
var maxInt256 = 2n ** (256n - 1n) - 1n;
var minInt8 = -(2n ** (8n - 1n));
var minInt16 = -(2n ** (16n - 1n));
var minInt24 = -(2n ** (24n - 1n));
var minInt32 = -(2n ** (32n - 1n));
var minInt40 = -(2n ** (40n - 1n));
var minInt48 = -(2n ** (48n - 1n));
var minInt56 = -(2n ** (56n - 1n));
var minInt64 = -(2n ** (64n - 1n));
var minInt72 = -(2n ** (72n - 1n));
var minInt80 = -(2n ** (80n - 1n));
var minInt88 = -(2n ** (88n - 1n));
var minInt96 = -(2n ** (96n - 1n));
var minInt104 = -(2n ** (104n - 1n));
var minInt112 = -(2n ** (112n - 1n));
var minInt120 = -(2n ** (120n - 1n));
var minInt128 = -(2n ** (128n - 1n));
var minInt136 = -(2n ** (136n - 1n));
var minInt144 = -(2n ** (144n - 1n));
var minInt152 = -(2n ** (152n - 1n));
var minInt160 = -(2n ** (160n - 1n));
var minInt168 = -(2n ** (168n - 1n));
var minInt176 = -(2n ** (176n - 1n));
var minInt184 = -(2n ** (184n - 1n));
var minInt192 = -(2n ** (192n - 1n));
var minInt200 = -(2n ** (200n - 1n));
var minInt208 = -(2n ** (208n - 1n));
var minInt216 = -(2n ** (216n - 1n));
var minInt224 = -(2n ** (224n - 1n));
var minInt232 = -(2n ** (232n - 1n));
var minInt240 = -(2n ** (240n - 1n));
var minInt248 = -(2n ** (248n - 1n));
var minInt256 = -(2n ** (256n - 1n));
var maxUint8 = 2n ** 8n - 1n;
var maxUint16 = 2n ** 16n - 1n;
var maxUint24 = 2n ** 24n - 1n;
var maxUint32 = 2n ** 32n - 1n;
var maxUint40 = 2n ** 40n - 1n;
var maxUint48 = 2n ** 48n - 1n;
var maxUint56 = 2n ** 56n - 1n;
var maxUint64 = 2n ** 64n - 1n;
var maxUint72 = 2n ** 72n - 1n;
var maxUint80 = 2n ** 80n - 1n;
var maxUint88 = 2n ** 88n - 1n;
var maxUint96 = 2n ** 96n - 1n;
var maxUint104 = 2n ** 104n - 1n;
var maxUint112 = 2n ** 112n - 1n;
var maxUint120 = 2n ** 120n - 1n;
var maxUint128 = 2n ** 128n - 1n;
var maxUint136 = 2n ** 136n - 1n;
var maxUint144 = 2n ** 144n - 1n;
var maxUint152 = 2n ** 152n - 1n;
var maxUint160 = 2n ** 160n - 1n;
var maxUint168 = 2n ** 168n - 1n;
var maxUint176 = 2n ** 176n - 1n;
var maxUint184 = 2n ** 184n - 1n;
var maxUint192 = 2n ** 192n - 1n;
var maxUint200 = 2n ** 200n - 1n;
var maxUint208 = 2n ** 208n - 1n;
var maxUint216 = 2n ** 216n - 1n;
var maxUint224 = 2n ** 224n - 1n;
var maxUint232 = 2n ** 232n - 1n;
var maxUint240 = 2n ** 240n - 1n;
var maxUint248 = 2n ** 248n - 1n;
var maxUint2562 = 2n ** 256n - 1n;

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/internal/cursor.js
var staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError2({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length2, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length2 - 1);
    return this.bytes.subarray(position, position + length2);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & ~4294967040);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length2, size4) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length2);
    this.position += size4 ?? length2;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
var NegativeOffsetError = class extends BaseError2 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.NegativeOffsetError"
    });
  }
};
var PositionOutOfBoundsError2 = class extends BaseError2 {
  constructor({ length: length2, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length2}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.PositionOutOfBoundsError"
    });
  }
};
var RecursiveReadLimitExceededError = class extends BaseError2 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.RecursiveReadLimitExceededError"
    });
  }
};

// node_modules/@walletconnect/utils/node_modules/ox/_esm/core/AbiParameters.js
function encodePacked2(types, values) {
  if (types.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i4 = 0; i4 < types.length; i4++) {
    const type = types[i4];
    const value = values[i4];
    data.push(encodePacked2.encode(type, value));
  }
  return concat2(...data);
}
(function(encodePacked3) {
  function encode8(type, value, isArray = false) {
    if (type === "address") {
      const address = value;
      assert(address);
      return padLeft(address.toLowerCase(), isArray ? 32 : 0);
    }
    if (type === "string")
      return fromString2(value);
    if (type === "bytes")
      return value;
    if (type === "bool")
      return padLeft(fromBoolean(value), isArray ? 32 : 1);
    const intMatch = type.match(integerRegex2);
    if (intMatch) {
      const [_type, baseType, bits = "256"] = intMatch;
      const size4 = Number.parseInt(bits) / 8;
      return fromNumber(value, {
        size: isArray ? 32 : size4,
        signed: baseType === "int"
      });
    }
    const bytesMatch = type.match(bytesRegex2);
    if (bytesMatch) {
      const [_type, size4] = bytesMatch;
      if (Number.parseInt(size4) !== (value.length - 2) / 2)
        throw new BytesSizeMismatchError2({
          expectedSize: Number.parseInt(size4),
          value
        });
      return padRight(value, isArray ? 32 : 0);
    }
    const arrayMatch = type.match(arrayRegex2);
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch;
      const data = [];
      for (let i4 = 0; i4 < value.length; i4++) {
        data.push(encode8(childType, value[i4], true));
      }
      if (data.length === 0)
        return "0x";
      return concat2(...data);
    }
    throw new InvalidTypeError(type);
  }
  encodePacked3.encode = encode8;
})(encodePacked2 || (encodePacked2 = {}));
var BytesSizeMismatchError2 = class extends BaseError2 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size3(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.BytesSizeMismatchError"
    });
  }
};
var LengthMismatchError = class extends BaseError2 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding parameters/values length mismatch.",
      `Expected length (parameters): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.LengthMismatchError"
    });
  }
};
var InvalidTypeError = class extends BaseError2 {
  constructor(type) {
    super(`Type \`${type}\` is not a valid ABI Type.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidTypeError"
    });
  }
};

// node_modules/base-x/src/esm/index.js
function base(ALPHABET2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  const BASE_MAP = new Uint8Array(256);
  for (let j5 = 0; j5 < BASE_MAP.length; j5++) {
    BASE_MAP[j5] = 255;
  }
  for (let i4 = 0; i4 < ALPHABET2.length; i4++) {
    const x7 = ALPHABET2.charAt(i4);
    const xc = x7.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x7 + " is ambiguous");
    }
    BASE_MAP[xc] = i4;
  }
  const BASE = ALPHABET2.length;
  const LEADER = ALPHABET2.charAt(0);
  const FACTOR = Math.log(BASE) / Math.log(256);
  const iFACTOR = Math.log(256) / Math.log(BASE);
  function encode8(source) {
    if (source instanceof Uint8Array) {
    } else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    let zeroes = 0;
    let length2 = 0;
    let pbegin = 0;
    const pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    const size4 = (pend - pbegin) * iFACTOR + 1 >>> 0;
    const b58 = new Uint8Array(size4);
    while (pbegin !== pend) {
      let carry = source[pbegin];
      let i4 = 0;
      for (let it1 = size4 - 1; (carry !== 0 || i4 < length2) && it1 !== -1; it1--, i4++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i4;
      pbegin++;
    }
    let it22 = size4 - length2;
    while (it22 !== size4 && b58[it22] === 0) {
      it22++;
    }
    let str = LEADER.repeat(zeroes);
    for (; it22 < size4; ++it22) {
      str += ALPHABET2.charAt(b58[it22]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    let psz = 0;
    let zeroes = 0;
    let length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    const size4 = (source.length - psz) * FACTOR + 1 >>> 0;
    const b256 = new Uint8Array(size4);
    while (psz < source.length) {
      const charCode = source.charCodeAt(psz);
      if (charCode > 255) {
        return;
      }
      let carry = BASE_MAP[charCode];
      if (carry === 255) {
        return;
      }
      let i4 = 0;
      for (let it32 = size4 - 1; (carry !== 0 || i4 < length2) && it32 !== -1; it32--, i4++) {
        carry += BASE * b256[it32] >>> 0;
        b256[it32] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i4;
      psz++;
    }
    let it42 = size4 - length2;
    while (it42 !== size4 && b256[it42] === 0) {
      it42++;
    }
    const vch = new Uint8Array(zeroes + (size4 - it42));
    let j5 = zeroes;
    while (it42 !== size4) {
      vch[j5++] = b256[it42++];
    }
    return vch;
  }
  function decode7(string2) {
    const buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error("Non-base" + BASE + " character");
  }
  return {
    encode: encode8,
    decodeUnsafe,
    decode: decode7
  };
}
var esm_default = base;

// node_modules/bs58/src/esm/index.js
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var esm_default2 = esm_default(ALPHABET);

// node_modules/@walletconnect/relay-auth/dist/index.es.js
var import_time = __toESM(require_cjs());

// node_modules/@walletconnect/safe-json/dist/esm/index.js
var JSONStringify = (data) => JSON.stringify(data, (_5, value) => typeof value === "bigint" ? value.toString() + "n" : value);
var JSONParse = (json) => {
  const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
  const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
  return JSON.parse(serializedData, (_5, value) => {
    const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
    if (isCustomFormatBigInt)
      return BigInt(value.substring(0, value.length - 1));
    return value;
  });
};
function safeJsonParse(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse(value);
  } catch (_a) {
    return value;
  }
}
function safeJsonStringify(value) {
  return typeof value === "string" ? value : JSONStringify(value) || "";
}

// node_modules/@walletconnect/relay-auth/dist/index.es.js
function En(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function fe(t, ...e2) {
  if (!En(t)) throw new Error("Uint8Array expected");
  if (e2.length > 0 && !e2.includes(t.length)) throw new Error("Uint8Array expected of length " + e2 + ", got length=" + t.length);
}
function De(t, e2 = true) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e2 && t.finished) throw new Error("Hash#digest() has already been called");
}
function gn(t, e2) {
  fe(t);
  const n5 = e2.outputLen;
  if (t.length < n5) throw new Error("digestInto() expects output buffer of length at least " + n5);
}
var it = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
var _t = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength);
function yn(t) {
  if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function de(t) {
  return typeof t == "string" && (t = yn(t)), fe(t), t;
}
var xn = class {
  clone() {
    return this._cloneInto();
  }
};
function Bn(t) {
  const e2 = (r3) => t().update(de(r3)).digest(), n5 = t();
  return e2.outputLen = n5.outputLen, e2.blockLen = n5.blockLen, e2.create = () => t(), e2;
}
function he(t = 32) {
  if (it && typeof it.getRandomValues == "function") return it.getRandomValues(new Uint8Array(t));
  if (it && typeof it.randomBytes == "function") return it.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
function Cn(t, e2, n5, r3) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e2, n5, r3);
  const o7 = BigInt(32), s3 = BigInt(4294967295), a3 = Number(n5 >> o7 & s3), u4 = Number(n5 & s3), i4 = r3 ? 4 : 0, D4 = r3 ? 0 : 4;
  t.setUint32(e2 + i4, a3, r3), t.setUint32(e2 + D4, u4, r3);
}
var An = class extends xn {
  constructor(e2, n5, r3, o7) {
    super(), this.blockLen = e2, this.outputLen = n5, this.padOffset = r3, this.isLE = o7, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e2), this.view = _t(this.buffer);
  }
  update(e2) {
    De(this);
    const { view: n5, buffer: r3, blockLen: o7 } = this;
    e2 = de(e2);
    const s3 = e2.length;
    for (let a3 = 0; a3 < s3; ) {
      const u4 = Math.min(o7 - this.pos, s3 - a3);
      if (u4 === o7) {
        const i4 = _t(e2);
        for (; o7 <= s3 - a3; a3 += o7) this.process(i4, a3);
        continue;
      }
      r3.set(e2.subarray(a3, a3 + u4), this.pos), this.pos += u4, a3 += u4, this.pos === o7 && (this.process(n5, 0), this.pos = 0);
    }
    return this.length += e2.length, this.roundClean(), this;
  }
  digestInto(e2) {
    De(this), gn(e2, this), this.finished = true;
    const { buffer: n5, view: r3, blockLen: o7, isLE: s3 } = this;
    let { pos: a3 } = this;
    n5[a3++] = 128, this.buffer.subarray(a3).fill(0), this.padOffset > o7 - a3 && (this.process(r3, 0), a3 = 0);
    for (let l7 = a3; l7 < o7; l7++) n5[l7] = 0;
    Cn(r3, o7 - 8, BigInt(this.length * 8), s3), this.process(r3, 0);
    const u4 = _t(e2), i4 = this.outputLen;
    if (i4 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const D4 = i4 / 4, c7 = this.get();
    if (D4 > c7.length) throw new Error("_sha2: outputLen bigger than state");
    for (let l7 = 0; l7 < D4; l7++) u4.setUint32(4 * l7, c7[l7], s3);
  }
  digest() {
    const { buffer: e2, outputLen: n5 } = this;
    this.digestInto(e2);
    const r3 = e2.slice(0, n5);
    return this.destroy(), r3;
  }
  _cloneInto(e2) {
    e2 || (e2 = new this.constructor()), e2.set(...this.get());
    const { blockLen: n5, buffer: r3, length: o7, finished: s3, destroyed: a3, pos: u4 } = this;
    return e2.length = o7, e2.pos = u4, e2.finished = s3, e2.destroyed = a3, o7 % n5 && e2.buffer.set(r3), e2;
  }
};
var wt = BigInt(2 ** 32 - 1);
var St = BigInt(32);
function le(t, e2 = false) {
  return e2 ? { h: Number(t & wt), l: Number(t >> St & wt) } : { h: Number(t >> St & wt) | 0, l: Number(t & wt) | 0 };
}
function mn(t, e2 = false) {
  let n5 = new Uint32Array(t.length), r3 = new Uint32Array(t.length);
  for (let o7 = 0; o7 < t.length; o7++) {
    const { h: s3, l: a3 } = le(t[o7], e2);
    [n5[o7], r3[o7]] = [s3, a3];
  }
  return [n5, r3];
}
var _n = (t, e2) => BigInt(t >>> 0) << St | BigInt(e2 >>> 0);
var Sn = (t, e2, n5) => t >>> n5;
var vn = (t, e2, n5) => t << 32 - n5 | e2 >>> n5;
var In = (t, e2, n5) => t >>> n5 | e2 << 32 - n5;
var Un = (t, e2, n5) => t << 32 - n5 | e2 >>> n5;
var Tn = (t, e2, n5) => t << 64 - n5 | e2 >>> n5 - 32;
var Fn = (t, e2, n5) => t >>> n5 - 32 | e2 << 64 - n5;
var Nn = (t, e2) => e2;
var Ln = (t, e2) => t;
var On = (t, e2, n5) => t << n5 | e2 >>> 32 - n5;
var Hn = (t, e2, n5) => e2 << n5 | t >>> 32 - n5;
var zn = (t, e2, n5) => e2 << n5 - 32 | t >>> 64 - n5;
var Mn = (t, e2, n5) => t << n5 - 32 | e2 >>> 64 - n5;
function qn(t, e2, n5, r3) {
  const o7 = (e2 >>> 0) + (r3 >>> 0);
  return { h: t + n5 + (o7 / 2 ** 32 | 0) | 0, l: o7 | 0 };
}
var $n = (t, e2, n5) => (t >>> 0) + (e2 >>> 0) + (n5 >>> 0);
var kn = (t, e2, n5, r3) => e2 + n5 + r3 + (t / 2 ** 32 | 0) | 0;
var Rn = (t, e2, n5, r3) => (t >>> 0) + (e2 >>> 0) + (n5 >>> 0) + (r3 >>> 0);
var jn = (t, e2, n5, r3, o7) => e2 + n5 + r3 + o7 + (t / 2 ** 32 | 0) | 0;
var Zn = (t, e2, n5, r3, o7) => (t >>> 0) + (e2 >>> 0) + (n5 >>> 0) + (r3 >>> 0) + (o7 >>> 0);
var Gn = (t, e2, n5, r3, o7, s3) => e2 + n5 + r3 + o7 + s3 + (t / 2 ** 32 | 0) | 0;
var x = { fromBig: le, split: mn, toBig: _n, shrSH: Sn, shrSL: vn, rotrSH: In, rotrSL: Un, rotrBH: Tn, rotrBL: Fn, rotr32H: Nn, rotr32L: Ln, rotlSH: On, rotlSL: Hn, rotlBH: zn, rotlBL: Mn, add: qn, add3L: $n, add3H: kn, add4L: Rn, add4H: jn, add5H: Gn, add5L: Zn };
var [Vn, Yn] = (() => x.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t) => BigInt(t))))();
var P = new Uint32Array(80);
var Q = new Uint32Array(80);
var Jn = class extends An {
  constructor() {
    super(128, 64, 16, false), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  get() {
    const { Ah: e2, Al: n5, Bh: r3, Bl: o7, Ch: s3, Cl: a3, Dh: u4, Dl: i4, Eh: D4, El: c7, Fh: l7, Fl: p6, Gh: w7, Gl: h5, Hh: g6, Hl: S5 } = this;
    return [e2, n5, r3, o7, s3, a3, u4, i4, D4, c7, l7, p6, w7, h5, g6, S5];
  }
  set(e2, n5, r3, o7, s3, a3, u4, i4, D4, c7, l7, p6, w7, h5, g6, S5) {
    this.Ah = e2 | 0, this.Al = n5 | 0, this.Bh = r3 | 0, this.Bl = o7 | 0, this.Ch = s3 | 0, this.Cl = a3 | 0, this.Dh = u4 | 0, this.Dl = i4 | 0, this.Eh = D4 | 0, this.El = c7 | 0, this.Fh = l7 | 0, this.Fl = p6 | 0, this.Gh = w7 | 0, this.Gl = h5 | 0, this.Hh = g6 | 0, this.Hl = S5 | 0;
  }
  process(e2, n5) {
    for (let d6 = 0; d6 < 16; d6++, n5 += 4) P[d6] = e2.getUint32(n5), Q[d6] = e2.getUint32(n5 += 4);
    for (let d6 = 16; d6 < 80; d6++) {
      const m5 = P[d6 - 15] | 0, F4 = Q[d6 - 15] | 0, q3 = x.rotrSH(m5, F4, 1) ^ x.rotrSH(m5, F4, 8) ^ x.shrSH(m5, F4, 7), z7 = x.rotrSL(m5, F4, 1) ^ x.rotrSL(m5, F4, 8) ^ x.shrSL(m5, F4, 7), I4 = P[d6 - 2] | 0, O8 = Q[d6 - 2] | 0, ot3 = x.rotrSH(I4, O8, 19) ^ x.rotrBH(I4, O8, 61) ^ x.shrSH(I4, O8, 6), tt4 = x.rotrSL(I4, O8, 19) ^ x.rotrBL(I4, O8, 61) ^ x.shrSL(I4, O8, 6), st3 = x.add4L(z7, tt4, Q[d6 - 7], Q[d6 - 16]), at3 = x.add4H(st3, q3, ot3, P[d6 - 7], P[d6 - 16]);
      P[d6] = at3 | 0, Q[d6] = st3 | 0;
    }
    let { Ah: r3, Al: o7, Bh: s3, Bl: a3, Ch: u4, Cl: i4, Dh: D4, Dl: c7, Eh: l7, El: p6, Fh: w7, Fl: h5, Gh: g6, Gl: S5, Hh: v8, Hl: L6 } = this;
    for (let d6 = 0; d6 < 80; d6++) {
      const m5 = x.rotrSH(l7, p6, 14) ^ x.rotrSH(l7, p6, 18) ^ x.rotrBH(l7, p6, 41), F4 = x.rotrSL(l7, p6, 14) ^ x.rotrSL(l7, p6, 18) ^ x.rotrBL(l7, p6, 41), q3 = l7 & w7 ^ ~l7 & g6, z7 = p6 & h5 ^ ~p6 & S5, I4 = x.add5L(L6, F4, z7, Yn[d6], Q[d6]), O8 = x.add5H(I4, v8, m5, q3, Vn[d6], P[d6]), ot3 = I4 | 0, tt4 = x.rotrSH(r3, o7, 28) ^ x.rotrBH(r3, o7, 34) ^ x.rotrBH(r3, o7, 39), st3 = x.rotrSL(r3, o7, 28) ^ x.rotrBL(r3, o7, 34) ^ x.rotrBL(r3, o7, 39), at3 = r3 & s3 ^ r3 & u4 ^ s3 & u4, Ct4 = o7 & a3 ^ o7 & i4 ^ a3 & i4;
      v8 = g6 | 0, L6 = S5 | 0, g6 = w7 | 0, S5 = h5 | 0, w7 = l7 | 0, h5 = p6 | 0, { h: l7, l: p6 } = x.add(D4 | 0, c7 | 0, O8 | 0, ot3 | 0), D4 = u4 | 0, c7 = i4 | 0, u4 = s3 | 0, i4 = a3 | 0, s3 = r3 | 0, a3 = o7 | 0;
      const At3 = x.add3L(ot3, st3, Ct4);
      r3 = x.add3H(At3, O8, tt4, at3), o7 = At3 | 0;
    }
    ({ h: r3, l: o7 } = x.add(this.Ah | 0, this.Al | 0, r3 | 0, o7 | 0)), { h: s3, l: a3 } = x.add(this.Bh | 0, this.Bl | 0, s3 | 0, a3 | 0), { h: u4, l: i4 } = x.add(this.Ch | 0, this.Cl | 0, u4 | 0, i4 | 0), { h: D4, l: c7 } = x.add(this.Dh | 0, this.Dl | 0, D4 | 0, c7 | 0), { h: l7, l: p6 } = x.add(this.Eh | 0, this.El | 0, l7 | 0, p6 | 0), { h: w7, l: h5 } = x.add(this.Fh | 0, this.Fl | 0, w7 | 0, h5 | 0), { h: g6, l: S5 } = x.add(this.Gh | 0, this.Gl | 0, g6 | 0, S5 | 0), { h: v8, l: L6 } = x.add(this.Hh | 0, this.Hl | 0, v8 | 0, L6 | 0), this.set(r3, o7, s3, a3, u4, i4, D4, c7, l7, p6, w7, h5, g6, S5, v8, L6);
  }
  roundClean() {
    P.fill(0), Q.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var Kn = Bn(() => new Jn());
var vt = BigInt(0);
var be = BigInt(1);
var Wn = BigInt(2);
function It(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Ut(t) {
  if (!It(t)) throw new Error("Uint8Array expected");
}
function Tt(t, e2) {
  if (typeof e2 != "boolean") throw new Error(t + " boolean expected, got " + e2);
}
var Xn = Array.from({ length: 256 }, (t, e2) => e2.toString(16).padStart(2, "0"));
function Ft(t) {
  Ut(t);
  let e2 = "";
  for (let n5 = 0; n5 < t.length; n5++) e2 += Xn[t[n5]];
  return e2;
}
function pe(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? vt : BigInt("0x" + t);
}
var K = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function we(t) {
  if (t >= K._0 && t <= K._9) return t - K._0;
  if (t >= K.A && t <= K.F) return t - (K.A - 10);
  if (t >= K.a && t <= K.f) return t - (K.a - 10);
}
function Ee(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  const e2 = t.length, n5 = e2 / 2;
  if (e2 % 2) throw new Error("hex string expected, got unpadded hex of length " + e2);
  const r3 = new Uint8Array(n5);
  for (let o7 = 0, s3 = 0; o7 < n5; o7++, s3 += 2) {
    const a3 = we(t.charCodeAt(s3)), u4 = we(t.charCodeAt(s3 + 1));
    if (a3 === void 0 || u4 === void 0) {
      const i4 = t[s3] + t[s3 + 1];
      throw new Error('hex string expected, got non-hex character "' + i4 + '" at index ' + s3);
    }
    r3[o7] = a3 * 16 + u4;
  }
  return r3;
}
function Pn(t) {
  return pe(Ft(t));
}
function Et(t) {
  return Ut(t), pe(Ft(Uint8Array.from(t).reverse()));
}
function ge(t, e2) {
  return Ee(t.toString(16).padStart(e2 * 2, "0"));
}
function Nt(t, e2) {
  return ge(t, e2).reverse();
}
function W(t, e2, n5) {
  let r3;
  if (typeof e2 == "string") try {
    r3 = Ee(e2);
  } catch (s3) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + s3);
  }
  else if (It(e2)) r3 = Uint8Array.from(e2);
  else throw new Error(t + " must be hex string or Uint8Array");
  const o7 = r3.length;
  if (typeof n5 == "number" && o7 !== n5) throw new Error(t + " of length " + n5 + " expected, got " + o7);
  return r3;
}
function ye(...t) {
  let e2 = 0;
  for (let r3 = 0; r3 < t.length; r3++) {
    const o7 = t[r3];
    Ut(o7), e2 += o7.length;
  }
  const n5 = new Uint8Array(e2);
  for (let r3 = 0, o7 = 0; r3 < t.length; r3++) {
    const s3 = t[r3];
    n5.set(s3, o7), o7 += s3.length;
  }
  return n5;
}
var Lt = (t) => typeof t == "bigint" && vt <= t;
function Qn(t, e2, n5) {
  return Lt(t) && Lt(e2) && Lt(n5) && e2 <= t && t < n5;
}
function ft(t, e2, n5, r3) {
  if (!Qn(e2, n5, r3)) throw new Error("expected valid " + t + ": " + n5 + " <= n < " + r3 + ", got " + e2);
}
function tr(t) {
  let e2;
  for (e2 = 0; t > vt; t >>= be, e2 += 1) ;
  return e2;
}
var er = (t) => (Wn << BigInt(t - 1)) - be;
var nr = { bigint: (t) => typeof t == "bigint", function: (t) => typeof t == "function", boolean: (t) => typeof t == "boolean", string: (t) => typeof t == "string", stringOrUint8Array: (t) => typeof t == "string" || It(t), isSafeInteger: (t) => Number.isSafeInteger(t), array: (t) => Array.isArray(t), field: (t, e2) => e2.Fp.isValid(t), hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen) };
function Ot(t, e2, n5 = {}) {
  const r3 = (o7, s3, a3) => {
    const u4 = nr[s3];
    if (typeof u4 != "function") throw new Error("invalid validator function");
    const i4 = t[o7];
    if (!(a3 && i4 === void 0) && !u4(i4, t)) throw new Error("param " + String(o7) + " is invalid. Expected " + s3 + ", got " + i4);
  };
  for (const [o7, s3] of Object.entries(e2)) r3(o7, s3, false);
  for (const [o7, s3] of Object.entries(n5)) r3(o7, s3, true);
  return t;
}
function xe(t) {
  const e2 = /* @__PURE__ */ new WeakMap();
  return (n5, ...r3) => {
    const o7 = e2.get(n5);
    if (o7 !== void 0) return o7;
    const s3 = t(n5, ...r3);
    return e2.set(n5, s3), s3;
  };
}
var M = BigInt(0);
var N = BigInt(1);
var nt = BigInt(2);
var rr = BigInt(3);
var Ht = BigInt(4);
var Be = BigInt(5);
var Ce = BigInt(8);
function H(t, e2) {
  const n5 = t % e2;
  return n5 >= M ? n5 : e2 + n5;
}
function or(t, e2, n5) {
  if (e2 < M) throw new Error("invalid exponent, negatives unsupported");
  if (n5 <= M) throw new Error("invalid modulus");
  if (n5 === N) return M;
  let r3 = N;
  for (; e2 > M; ) e2 & N && (r3 = r3 * t % n5), t = t * t % n5, e2 >>= N;
  return r3;
}
function J(t, e2, n5) {
  let r3 = t;
  for (; e2-- > M; ) r3 *= r3, r3 %= n5;
  return r3;
}
function Ae(t, e2) {
  if (t === M) throw new Error("invert: expected non-zero number");
  if (e2 <= M) throw new Error("invert: expected positive modulus, got " + e2);
  let n5 = H(t, e2), r3 = e2, o7 = M, s3 = N;
  for (; n5 !== M; ) {
    const u4 = r3 / n5, i4 = r3 % n5, D4 = o7 - s3 * u4;
    r3 = n5, n5 = i4, o7 = s3, s3 = D4;
  }
  if (r3 !== N) throw new Error("invert: does not exist");
  return H(o7, e2);
}
function sr(t) {
  const e2 = (t - N) / nt;
  let n5, r3, o7;
  for (n5 = t - N, r3 = 0; n5 % nt === M; n5 /= nt, r3++) ;
  for (o7 = nt; o7 < t && or(o7, e2, t) !== t - N; o7++) if (o7 > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r3 === 1) {
    const a3 = (t + N) / Ht;
    return function(i4, D4) {
      const c7 = i4.pow(D4, a3);
      if (!i4.eql(i4.sqr(c7), D4)) throw new Error("Cannot find square root");
      return c7;
    };
  }
  const s3 = (n5 + N) / nt;
  return function(u4, i4) {
    if (u4.pow(i4, e2) === u4.neg(u4.ONE)) throw new Error("Cannot find square root");
    let D4 = r3, c7 = u4.pow(u4.mul(u4.ONE, o7), n5), l7 = u4.pow(i4, s3), p6 = u4.pow(i4, n5);
    for (; !u4.eql(p6, u4.ONE); ) {
      if (u4.eql(p6, u4.ZERO)) return u4.ZERO;
      let w7 = 1;
      for (let g6 = u4.sqr(p6); w7 < D4 && !u4.eql(g6, u4.ONE); w7++) g6 = u4.sqr(g6);
      const h5 = u4.pow(c7, N << BigInt(D4 - w7 - 1));
      c7 = u4.sqr(h5), l7 = u4.mul(l7, h5), p6 = u4.mul(p6, c7), D4 = w7;
    }
    return l7;
  };
}
function ir(t) {
  if (t % Ht === rr) {
    const e2 = (t + N) / Ht;
    return function(r3, o7) {
      const s3 = r3.pow(o7, e2);
      if (!r3.eql(r3.sqr(s3), o7)) throw new Error("Cannot find square root");
      return s3;
    };
  }
  if (t % Ce === Be) {
    const e2 = (t - Be) / Ce;
    return function(r3, o7) {
      const s3 = r3.mul(o7, nt), a3 = r3.pow(s3, e2), u4 = r3.mul(o7, a3), i4 = r3.mul(r3.mul(u4, nt), a3), D4 = r3.mul(u4, r3.sub(i4, r3.ONE));
      if (!r3.eql(r3.sqr(D4), o7)) throw new Error("Cannot find square root");
      return D4;
    };
  }
  return sr(t);
}
var ur = (t, e2) => (H(t, e2) & N) === N;
var cr = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function ar(t) {
  const e2 = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, n5 = cr.reduce((r3, o7) => (r3[o7] = "function", r3), e2);
  return Ot(t, n5);
}
function fr(t, e2, n5) {
  if (n5 < M) throw new Error("invalid exponent, negatives unsupported");
  if (n5 === M) return t.ONE;
  if (n5 === N) return e2;
  let r3 = t.ONE, o7 = e2;
  for (; n5 > M; ) n5 & N && (r3 = t.mul(r3, o7)), o7 = t.sqr(o7), n5 >>= N;
  return r3;
}
function Dr(t, e2) {
  const n5 = new Array(e2.length), r3 = e2.reduce((s3, a3, u4) => t.is0(a3) ? s3 : (n5[u4] = s3, t.mul(s3, a3)), t.ONE), o7 = t.inv(r3);
  return e2.reduceRight((s3, a3, u4) => t.is0(a3) ? s3 : (n5[u4] = t.mul(s3, n5[u4]), t.mul(s3, a3)), o7), n5;
}
function me(t, e2) {
  const n5 = e2 !== void 0 ? e2 : t.toString(2).length, r3 = Math.ceil(n5 / 8);
  return { nBitLength: n5, nByteLength: r3 };
}
function _e(t, e2, n5 = false, r3 = {}) {
  if (t <= M) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: o7, nByteLength: s3 } = me(t, e2);
  if (s3 > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a3;
  const u4 = Object.freeze({ ORDER: t, isLE: n5, BITS: o7, BYTES: s3, MASK: er(o7), ZERO: M, ONE: N, create: (i4) => H(i4, t), isValid: (i4) => {
    if (typeof i4 != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof i4);
    return M <= i4 && i4 < t;
  }, is0: (i4) => i4 === M, isOdd: (i4) => (i4 & N) === N, neg: (i4) => H(-i4, t), eql: (i4, D4) => i4 === D4, sqr: (i4) => H(i4 * i4, t), add: (i4, D4) => H(i4 + D4, t), sub: (i4, D4) => H(i4 - D4, t), mul: (i4, D4) => H(i4 * D4, t), pow: (i4, D4) => fr(u4, i4, D4), div: (i4, D4) => H(i4 * Ae(D4, t), t), sqrN: (i4) => i4 * i4, addN: (i4, D4) => i4 + D4, subN: (i4, D4) => i4 - D4, mulN: (i4, D4) => i4 * D4, inv: (i4) => Ae(i4, t), sqrt: r3.sqrt || ((i4) => (a3 || (a3 = ir(t)), a3(u4, i4))), invertBatch: (i4) => Dr(u4, i4), cmov: (i4, D4, c7) => c7 ? D4 : i4, toBytes: (i4) => n5 ? Nt(i4, s3) : ge(i4, s3), fromBytes: (i4) => {
    if (i4.length !== s3) throw new Error("Field.fromBytes: expected " + s3 + " bytes, got " + i4.length);
    return n5 ? Et(i4) : Pn(i4);
  } });
  return Object.freeze(u4);
}
var Se = BigInt(0);
var gt = BigInt(1);
function zt(t, e2) {
  const n5 = e2.negate();
  return t ? n5 : e2;
}
function ve(t, e2) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e2) throw new Error("invalid window size, expected [1.." + e2 + "], got W=" + t);
}
function Mt(t, e2) {
  ve(t, e2);
  const n5 = Math.ceil(e2 / t) + 1, r3 = 2 ** (t - 1);
  return { windows: n5, windowSize: r3 };
}
function dr(t, e2) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((n5, r3) => {
    if (!(n5 instanceof e2)) throw new Error("invalid point at index " + r3);
  });
}
function hr(t, e2) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((n5, r3) => {
    if (!e2.isValid(n5)) throw new Error("invalid scalar at index " + r3);
  });
}
var qt = /* @__PURE__ */ new WeakMap();
var Ie = /* @__PURE__ */ new WeakMap();
function $t(t) {
  return Ie.get(t) || 1;
}
function lr(t, e2) {
  return { constTimeNegate: zt, hasPrecomputes(n5) {
    return $t(n5) !== 1;
  }, unsafeLadder(n5, r3, o7 = t.ZERO) {
    let s3 = n5;
    for (; r3 > Se; ) r3 & gt && (o7 = o7.add(s3)), s3 = s3.double(), r3 >>= gt;
    return o7;
  }, precomputeWindow(n5, r3) {
    const { windows: o7, windowSize: s3 } = Mt(r3, e2), a3 = [];
    let u4 = n5, i4 = u4;
    for (let D4 = 0; D4 < o7; D4++) {
      i4 = u4, a3.push(i4);
      for (let c7 = 1; c7 < s3; c7++) i4 = i4.add(u4), a3.push(i4);
      u4 = i4.double();
    }
    return a3;
  }, wNAF(n5, r3, o7) {
    const { windows: s3, windowSize: a3 } = Mt(n5, e2);
    let u4 = t.ZERO, i4 = t.BASE;
    const D4 = BigInt(2 ** n5 - 1), c7 = 2 ** n5, l7 = BigInt(n5);
    for (let p6 = 0; p6 < s3; p6++) {
      const w7 = p6 * a3;
      let h5 = Number(o7 & D4);
      o7 >>= l7, h5 > a3 && (h5 -= c7, o7 += gt);
      const g6 = w7, S5 = w7 + Math.abs(h5) - 1, v8 = p6 % 2 !== 0, L6 = h5 < 0;
      h5 === 0 ? i4 = i4.add(zt(v8, r3[g6])) : u4 = u4.add(zt(L6, r3[S5]));
    }
    return { p: u4, f: i4 };
  }, wNAFUnsafe(n5, r3, o7, s3 = t.ZERO) {
    const { windows: a3, windowSize: u4 } = Mt(n5, e2), i4 = BigInt(2 ** n5 - 1), D4 = 2 ** n5, c7 = BigInt(n5);
    for (let l7 = 0; l7 < a3; l7++) {
      const p6 = l7 * u4;
      if (o7 === Se) break;
      let w7 = Number(o7 & i4);
      if (o7 >>= c7, w7 > u4 && (w7 -= D4, o7 += gt), w7 === 0) continue;
      let h5 = r3[p6 + Math.abs(w7) - 1];
      w7 < 0 && (h5 = h5.negate()), s3 = s3.add(h5);
    }
    return s3;
  }, getPrecomputes(n5, r3, o7) {
    let s3 = qt.get(r3);
    return s3 || (s3 = this.precomputeWindow(r3, n5), n5 !== 1 && qt.set(r3, o7(s3))), s3;
  }, wNAFCached(n5, r3, o7) {
    const s3 = $t(n5);
    return this.wNAF(s3, this.getPrecomputes(s3, n5, o7), r3);
  }, wNAFCachedUnsafe(n5, r3, o7, s3) {
    const a3 = $t(n5);
    return a3 === 1 ? this.unsafeLadder(n5, r3, s3) : this.wNAFUnsafe(a3, this.getPrecomputes(a3, n5, o7), r3, s3);
  }, setWindowSize(n5, r3) {
    ve(r3, e2), Ie.set(n5, r3), qt.delete(n5);
  } };
}
function br(t, e2, n5, r3) {
  if (dr(n5, t), hr(r3, e2), n5.length !== r3.length) throw new Error("arrays of points and scalars must have equal length");
  const o7 = t.ZERO, s3 = tr(BigInt(n5.length)), a3 = s3 > 12 ? s3 - 3 : s3 > 4 ? s3 - 2 : s3 ? 2 : 1, u4 = (1 << a3) - 1, i4 = new Array(u4 + 1).fill(o7), D4 = Math.floor((e2.BITS - 1) / a3) * a3;
  let c7 = o7;
  for (let l7 = D4; l7 >= 0; l7 -= a3) {
    i4.fill(o7);
    for (let w7 = 0; w7 < r3.length; w7++) {
      const h5 = r3[w7], g6 = Number(h5 >> BigInt(l7) & BigInt(u4));
      i4[g6] = i4[g6].add(n5[w7]);
    }
    let p6 = o7;
    for (let w7 = i4.length - 1, h5 = o7; w7 > 0; w7--) h5 = h5.add(i4[w7]), p6 = p6.add(h5);
    if (c7 = c7.add(p6), l7 !== 0) for (let w7 = 0; w7 < a3; w7++) c7 = c7.double();
  }
  return c7;
}
function pr(t) {
  return ar(t.Fp), Ot(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...me(t.n, t.nBitLength), ...t, p: t.Fp.ORDER });
}
var G = BigInt(0);
var j = BigInt(1);
var yt = BigInt(2);
var wr = BigInt(8);
var Er = { zip215: true };
function gr(t) {
  const e2 = pr(t);
  return Ot(t, { hash: "function", a: "bigint", d: "bigint", randomBytes: "function" }, { adjustScalarBytes: "function", domain: "function", uvRatio: "function", mapToCurve: "function" }), Object.freeze({ ...e2 });
}
function yr(t) {
  const e2 = gr(t), { Fp: n5, n: r3, prehash: o7, hash: s3, randomBytes: a3, nByteLength: u4, h: i4 } = e2, D4 = yt << BigInt(u4 * 8) - j, c7 = n5.create, l7 = _e(e2.n, e2.nBitLength), p6 = e2.uvRatio || ((y7, f6) => {
    try {
      return { isValid: true, value: n5.sqrt(y7 * n5.inv(f6)) };
    } catch {
      return { isValid: false, value: G };
    }
  }), w7 = e2.adjustScalarBytes || ((y7) => y7), h5 = e2.domain || ((y7, f6, b6) => {
    if (Tt("phflag", b6), f6.length || b6) throw new Error("Contexts/pre-hash are not supported");
    return y7;
  });
  function g6(y7, f6) {
    ft("coordinate " + y7, f6, G, D4);
  }
  function S5(y7) {
    if (!(y7 instanceof d6)) throw new Error("ExtendedPoint expected");
  }
  const v8 = xe((y7, f6) => {
    const { ex: b6, ey: E7, ez: B4 } = y7, C7 = y7.is0();
    f6 == null && (f6 = C7 ? wr : n5.inv(B4));
    const A5 = c7(b6 * f6), U4 = c7(E7 * f6), _5 = c7(B4 * f6);
    if (C7) return { x: G, y: j };
    if (_5 !== j) throw new Error("invZ was invalid");
    return { x: A5, y: U4 };
  }), L6 = xe((y7) => {
    const { a: f6, d: b6 } = e2;
    if (y7.is0()) throw new Error("bad point: ZERO");
    const { ex: E7, ey: B4, ez: C7, et: A5 } = y7, U4 = c7(E7 * E7), _5 = c7(B4 * B4), T5 = c7(C7 * C7), $5 = c7(T5 * T5), R3 = c7(U4 * f6), V5 = c7(T5 * c7(R3 + _5)), Y3 = c7($5 + c7(b6 * c7(U4 * _5)));
    if (V5 !== Y3) throw new Error("bad point: equation left != right (1)");
    const Z2 = c7(E7 * B4), X = c7(C7 * A5);
    if (Z2 !== X) throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class d6 {
    constructor(f6, b6, E7, B4) {
      this.ex = f6, this.ey = b6, this.ez = E7, this.et = B4, g6("x", f6), g6("y", b6), g6("z", E7), g6("t", B4), Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(f6) {
      if (f6 instanceof d6) throw new Error("extended point not allowed");
      const { x: b6, y: E7 } = f6 || {};
      return g6("x", b6), g6("y", E7), new d6(b6, E7, j, c7(b6 * E7));
    }
    static normalizeZ(f6) {
      const b6 = n5.invertBatch(f6.map((E7) => E7.ez));
      return f6.map((E7, B4) => E7.toAffine(b6[B4])).map(d6.fromAffine);
    }
    static msm(f6, b6) {
      return br(d6, l7, f6, b6);
    }
    _setWindowSize(f6) {
      q3.setWindowSize(this, f6);
    }
    assertValidity() {
      L6(this);
    }
    equals(f6) {
      S5(f6);
      const { ex: b6, ey: E7, ez: B4 } = this, { ex: C7, ey: A5, ez: U4 } = f6, _5 = c7(b6 * U4), T5 = c7(C7 * B4), $5 = c7(E7 * U4), R3 = c7(A5 * B4);
      return _5 === T5 && $5 === R3;
    }
    is0() {
      return this.equals(d6.ZERO);
    }
    negate() {
      return new d6(c7(-this.ex), this.ey, this.ez, c7(-this.et));
    }
    double() {
      const { a: f6 } = e2, { ex: b6, ey: E7, ez: B4 } = this, C7 = c7(b6 * b6), A5 = c7(E7 * E7), U4 = c7(yt * c7(B4 * B4)), _5 = c7(f6 * C7), T5 = b6 + E7, $5 = c7(c7(T5 * T5) - C7 - A5), R3 = _5 + A5, V5 = R3 - U4, Y3 = _5 - A5, Z2 = c7($5 * V5), X = c7(R3 * Y3), et3 = c7($5 * Y3), pt4 = c7(V5 * R3);
      return new d6(Z2, X, pt4, et3);
    }
    add(f6) {
      S5(f6);
      const { a: b6, d: E7 } = e2, { ex: B4, ey: C7, ez: A5, et: U4 } = this, { ex: _5, ey: T5, ez: $5, et: R3 } = f6;
      if (b6 === BigInt(-1)) {
        const re4 = c7((C7 - B4) * (T5 + _5)), oe3 = c7((C7 + B4) * (T5 - _5)), mt4 = c7(oe3 - re4);
        if (mt4 === G) return this.double();
        const se4 = c7(A5 * yt * R3), ie4 = c7(U4 * yt * $5), ue4 = ie4 + se4, ce4 = oe3 + re4, ae4 = ie4 - se4, Dn3 = c7(ue4 * mt4), dn3 = c7(ce4 * ae4), hn3 = c7(ue4 * ae4), ln3 = c7(mt4 * ce4);
        return new d6(Dn3, dn3, ln3, hn3);
      }
      const V5 = c7(B4 * _5), Y3 = c7(C7 * T5), Z2 = c7(U4 * E7 * R3), X = c7(A5 * $5), et3 = c7((B4 + C7) * (_5 + T5) - V5 - Y3), pt4 = X - Z2, ee4 = X + Z2, ne3 = c7(Y3 - b6 * V5), un3 = c7(et3 * pt4), cn3 = c7(ee4 * ne3), an3 = c7(et3 * ne3), fn3 = c7(pt4 * ee4);
      return new d6(un3, cn3, fn3, an3);
    }
    subtract(f6) {
      return this.add(f6.negate());
    }
    wNAF(f6) {
      return q3.wNAFCached(this, f6, d6.normalizeZ);
    }
    multiply(f6) {
      const b6 = f6;
      ft("scalar", b6, j, r3);
      const { p: E7, f: B4 } = this.wNAF(b6);
      return d6.normalizeZ([E7, B4])[0];
    }
    multiplyUnsafe(f6, b6 = d6.ZERO) {
      const E7 = f6;
      return ft("scalar", E7, G, r3), E7 === G ? F4 : this.is0() || E7 === j ? this : q3.wNAFCachedUnsafe(this, E7, d6.normalizeZ, b6);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(i4).is0();
    }
    isTorsionFree() {
      return q3.unsafeLadder(this, r3).is0();
    }
    toAffine(f6) {
      return v8(this, f6);
    }
    clearCofactor() {
      const { h: f6 } = e2;
      return f6 === j ? this : this.multiplyUnsafe(f6);
    }
    static fromHex(f6, b6 = false) {
      const { d: E7, a: B4 } = e2, C7 = n5.BYTES;
      f6 = W("pointHex", f6, C7), Tt("zip215", b6);
      const A5 = f6.slice(), U4 = f6[C7 - 1];
      A5[C7 - 1] = U4 & -129;
      const _5 = Et(A5), T5 = b6 ? D4 : n5.ORDER;
      ft("pointHex.y", _5, G, T5);
      const $5 = c7(_5 * _5), R3 = c7($5 - j), V5 = c7(E7 * $5 - B4);
      let { isValid: Y3, value: Z2 } = p6(R3, V5);
      if (!Y3) throw new Error("Point.fromHex: invalid y coordinate");
      const X = (Z2 & j) === j, et3 = (U4 & 128) !== 0;
      if (!b6 && Z2 === G && et3) throw new Error("Point.fromHex: x=0 and x_0=1");
      return et3 !== X && (Z2 = c7(-Z2)), d6.fromAffine({ x: Z2, y: _5 });
    }
    static fromPrivateKey(f6) {
      return O8(f6).point;
    }
    toRawBytes() {
      const { x: f6, y: b6 } = this.toAffine(), E7 = Nt(b6, n5.BYTES);
      return E7[E7.length - 1] |= f6 & j ? 128 : 0, E7;
    }
    toHex() {
      return Ft(this.toRawBytes());
    }
  }
  d6.BASE = new d6(e2.Gx, e2.Gy, j, c7(e2.Gx * e2.Gy)), d6.ZERO = new d6(G, j, j, G);
  const { BASE: m5, ZERO: F4 } = d6, q3 = lr(d6, u4 * 8);
  function z7(y7) {
    return H(y7, r3);
  }
  function I4(y7) {
    return z7(Et(y7));
  }
  function O8(y7) {
    const f6 = n5.BYTES;
    y7 = W("private key", y7, f6);
    const b6 = W("hashed private key", s3(y7), 2 * f6), E7 = w7(b6.slice(0, f6)), B4 = b6.slice(f6, 2 * f6), C7 = I4(E7), A5 = m5.multiply(C7), U4 = A5.toRawBytes();
    return { head: E7, prefix: B4, scalar: C7, point: A5, pointBytes: U4 };
  }
  function ot3(y7) {
    return O8(y7).pointBytes;
  }
  function tt4(y7 = new Uint8Array(), ...f6) {
    const b6 = ye(...f6);
    return I4(s3(h5(b6, W("context", y7), !!o7)));
  }
  function st3(y7, f6, b6 = {}) {
    y7 = W("message", y7), o7 && (y7 = o7(y7));
    const { prefix: E7, scalar: B4, pointBytes: C7 } = O8(f6), A5 = tt4(b6.context, E7, y7), U4 = m5.multiply(A5).toRawBytes(), _5 = tt4(b6.context, U4, C7, y7), T5 = z7(A5 + _5 * B4);
    ft("signature.s", T5, G, r3);
    const $5 = ye(U4, Nt(T5, n5.BYTES));
    return W("result", $5, n5.BYTES * 2);
  }
  const at3 = Er;
  function Ct4(y7, f6, b6, E7 = at3) {
    const { context: B4, zip215: C7 } = E7, A5 = n5.BYTES;
    y7 = W("signature", y7, 2 * A5), f6 = W("message", f6), b6 = W("publicKey", b6, A5), C7 !== void 0 && Tt("zip215", C7), o7 && (f6 = o7(f6));
    const U4 = Et(y7.slice(A5, 2 * A5));
    let _5, T5, $5;
    try {
      _5 = d6.fromHex(b6, C7), T5 = d6.fromHex(y7.slice(0, A5), C7), $5 = m5.multiplyUnsafe(U4);
    } catch {
      return false;
    }
    if (!C7 && _5.isSmallOrder()) return false;
    const R3 = tt4(B4, T5.toRawBytes(), _5.toRawBytes(), f6);
    return T5.add(_5.multiplyUnsafe(R3)).subtract($5).clearCofactor().equals(d6.ZERO);
  }
  return m5._setWindowSize(8), { CURVE: e2, getPublicKey: ot3, sign: st3, verify: Ct4, ExtendedPoint: d6, utils: { getExtendedPublicKey: O8, randomPrivateKey: () => a3(n5.BYTES), precompute(y7 = 8, f6 = d6.BASE) {
    return f6._setWindowSize(y7), f6.multiply(BigInt(3)), f6;
  } } };
}
BigInt(0), BigInt(1);
var kt = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
var Ue = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
var xr = BigInt(1);
var Te = BigInt(2);
BigInt(3);
var Br = BigInt(5);
var Cr = BigInt(8);
function Ar(t) {
  const e2 = BigInt(10), n5 = BigInt(20), r3 = BigInt(40), o7 = BigInt(80), s3 = kt, u4 = t * t % s3 * t % s3, i4 = J(u4, Te, s3) * u4 % s3, D4 = J(i4, xr, s3) * t % s3, c7 = J(D4, Br, s3) * D4 % s3, l7 = J(c7, e2, s3) * c7 % s3, p6 = J(l7, n5, s3) * l7 % s3, w7 = J(p6, r3, s3) * p6 % s3, h5 = J(w7, o7, s3) * w7 % s3, g6 = J(h5, o7, s3) * w7 % s3, S5 = J(g6, e2, s3) * c7 % s3;
  return { pow_p_5_8: J(S5, Te, s3) * t % s3, b2: u4 };
}
function mr(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
function _r(t, e2) {
  const n5 = kt, r3 = H(e2 * e2 * e2, n5), o7 = H(r3 * r3 * e2, n5), s3 = Ar(t * o7).pow_p_5_8;
  let a3 = H(t * r3 * s3, n5);
  const u4 = H(e2 * a3 * a3, n5), i4 = a3, D4 = H(a3 * Ue, n5), c7 = u4 === t, l7 = u4 === H(-t, n5), p6 = u4 === H(-t * Ue, n5);
  return c7 && (a3 = i4), (l7 || p6) && (a3 = D4), ur(a3, n5) && (a3 = H(-a3, n5)), { isValid: c7 || l7, value: a3 };
}
var Sr = (() => _e(kt, void 0, true))();
var vr = (() => ({ a: BigInt(-1), d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"), Fp: Sr, n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"), h: Cr, Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"), Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"), hash: Kn, randomBytes: he, adjustScalarBytes: mr, uvRatio: _r }))();
var Rt = (() => yr(vr))();
var jt = "EdDSA";
var Zt = "JWT";
var ut = ".";
var Dt = "base64url";
var Gt = "utf8";
var xt = "utf8";
var Vt = ":";
var Yt = "did";
var Jt = "key";
var dt = "base58btc";
var Kt = "z";
var Wt = "K36";
var Ne = 32;
function Xt(t) {
  return globalThis.Buffer != null ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t;
}
function Le(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Xt(globalThis.Buffer.allocUnsafe(t)) : new Uint8Array(t);
}
function Oe(t, e2) {
  e2 || (e2 = t.reduce((o7, s3) => o7 + s3.length, 0));
  const n5 = Le(e2);
  let r3 = 0;
  for (const o7 of t) n5.set(o7, r3), r3 += o7.length;
  return Xt(n5);
}
function Ir(t, e2) {
  if (t.length >= 255) throw new TypeError("Alphabet too long");
  for (var n5 = new Uint8Array(256), r3 = 0; r3 < n5.length; r3++) n5[r3] = 255;
  for (var o7 = 0; o7 < t.length; o7++) {
    var s3 = t.charAt(o7), a3 = s3.charCodeAt(0);
    if (n5[a3] !== 255) throw new TypeError(s3 + " is ambiguous");
    n5[a3] = o7;
  }
  var u4 = t.length, i4 = t.charAt(0), D4 = Math.log(u4) / Math.log(256), c7 = Math.log(256) / Math.log(u4);
  function l7(h5) {
    if (h5 instanceof Uint8Array || (ArrayBuffer.isView(h5) ? h5 = new Uint8Array(h5.buffer, h5.byteOffset, h5.byteLength) : Array.isArray(h5) && (h5 = Uint8Array.from(h5))), !(h5 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (h5.length === 0) return "";
    for (var g6 = 0, S5 = 0, v8 = 0, L6 = h5.length; v8 !== L6 && h5[v8] === 0; ) v8++, g6++;
    for (var d6 = (L6 - v8) * c7 + 1 >>> 0, m5 = new Uint8Array(d6); v8 !== L6; ) {
      for (var F4 = h5[v8], q3 = 0, z7 = d6 - 1; (F4 !== 0 || q3 < S5) && z7 !== -1; z7--, q3++) F4 += 256 * m5[z7] >>> 0, m5[z7] = F4 % u4 >>> 0, F4 = F4 / u4 >>> 0;
      if (F4 !== 0) throw new Error("Non-zero carry");
      S5 = q3, v8++;
    }
    for (var I4 = d6 - S5; I4 !== d6 && m5[I4] === 0; ) I4++;
    for (var O8 = i4.repeat(g6); I4 < d6; ++I4) O8 += t.charAt(m5[I4]);
    return O8;
  }
  function p6(h5) {
    if (typeof h5 != "string") throw new TypeError("Expected String");
    if (h5.length === 0) return new Uint8Array();
    var g6 = 0;
    if (h5[g6] !== " ") {
      for (var S5 = 0, v8 = 0; h5[g6] === i4; ) S5++, g6++;
      for (var L6 = (h5.length - g6) * D4 + 1 >>> 0, d6 = new Uint8Array(L6); h5[g6]; ) {
        var m5 = n5[h5.charCodeAt(g6)];
        if (m5 === 255) return;
        for (var F4 = 0, q3 = L6 - 1; (m5 !== 0 || F4 < v8) && q3 !== -1; q3--, F4++) m5 += u4 * d6[q3] >>> 0, d6[q3] = m5 % 256 >>> 0, m5 = m5 / 256 >>> 0;
        if (m5 !== 0) throw new Error("Non-zero carry");
        v8 = F4, g6++;
      }
      if (h5[g6] !== " ") {
        for (var z7 = L6 - v8; z7 !== L6 && d6[z7] === 0; ) z7++;
        for (var I4 = new Uint8Array(S5 + (L6 - z7)), O8 = S5; z7 !== L6; ) I4[O8++] = d6[z7++];
        return I4;
      }
    }
  }
  function w7(h5) {
    var g6 = p6(h5);
    if (g6) return g6;
    throw new Error(`Non-${e2} character`);
  }
  return { encode: l7, decodeUnsafe: p6, decode: w7 };
}
var Ur = Ir;
var Tr = Ur;
var He = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array") return t;
  if (t instanceof ArrayBuffer) return new Uint8Array(t);
  if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var Fr = (t) => new TextEncoder().encode(t);
var Nr = (t) => new TextDecoder().decode(t);
var Lr = class {
  constructor(e2, n5, r3) {
    this.name = e2, this.prefix = n5, this.baseEncode = r3;
  }
  encode(e2) {
    if (e2 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e2)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var Or = class {
  constructor(e2, n5, r3) {
    if (this.name = e2, this.prefix = n5, n5.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = n5.codePointAt(0), this.baseDecode = r3;
  }
  decode(e2) {
    if (typeof e2 == "string") {
      if (e2.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e2.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e2) {
    return ze(this, e2);
  }
};
var Hr = class {
  constructor(e2) {
    this.decoders = e2;
  }
  or(e2) {
    return ze(this, e2);
  }
  decode(e2) {
    const n5 = e2[0], r3 = this.decoders[n5];
    if (r3) return r3.decode(e2);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e2)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var ze = (t, e2) => new Hr({ ...t.decoders || { [t.prefix]: t }, ...e2.decoders || { [e2.prefix]: e2 } });
var zr = class {
  constructor(e2, n5, r3, o7) {
    this.name = e2, this.prefix = n5, this.baseEncode = r3, this.baseDecode = o7, this.encoder = new Lr(e2, n5, r3), this.decoder = new Or(e2, n5, o7);
  }
  encode(e2) {
    return this.encoder.encode(e2);
  }
  decode(e2) {
    return this.decoder.decode(e2);
  }
};
var Bt = ({ name: t, prefix: e2, encode: n5, decode: r3 }) => new zr(t, e2, n5, r3);
var ht = ({ prefix: t, name: e2, alphabet: n5 }) => {
  const { encode: r3, decode: o7 } = Tr(n5, e2);
  return Bt({ prefix: t, name: e2, encode: r3, decode: (s3) => He(o7(s3)) });
};
var Mr = (t, e2, n5, r3) => {
  const o7 = {};
  for (let c7 = 0; c7 < e2.length; ++c7) o7[e2[c7]] = c7;
  let s3 = t.length;
  for (; t[s3 - 1] === "="; ) --s3;
  const a3 = new Uint8Array(s3 * n5 / 8 | 0);
  let u4 = 0, i4 = 0, D4 = 0;
  for (let c7 = 0; c7 < s3; ++c7) {
    const l7 = o7[t[c7]];
    if (l7 === void 0) throw new SyntaxError(`Non-${r3} character`);
    i4 = i4 << n5 | l7, u4 += n5, u4 >= 8 && (u4 -= 8, a3[D4++] = 255 & i4 >> u4);
  }
  if (u4 >= n5 || 255 & i4 << 8 - u4) throw new SyntaxError("Unexpected end of data");
  return a3;
};
var qr = (t, e2, n5) => {
  const r3 = e2[e2.length - 1] === "=", o7 = (1 << n5) - 1;
  let s3 = "", a3 = 0, u4 = 0;
  for (let i4 = 0; i4 < t.length; ++i4) for (u4 = u4 << 8 | t[i4], a3 += 8; a3 > n5; ) a3 -= n5, s3 += e2[o7 & u4 >> a3];
  if (a3 && (s3 += e2[o7 & u4 << n5 - a3]), r3) for (; s3.length * n5 & 7; ) s3 += "=";
  return s3;
};
var k = ({ name: t, prefix: e2, bitsPerChar: n5, alphabet: r3 }) => Bt({ prefix: e2, name: t, encode(o7) {
  return qr(o7, r3, n5);
}, decode(o7) {
  return Mr(o7, r3, n5, t);
} });
var $r = Bt({ prefix: "\0", name: "identity", encode: (t) => Nr(t), decode: (t) => Fr(t) });
var kr = Object.freeze({ __proto__: null, identity: $r });
var Rr = k({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var jr = Object.freeze({ __proto__: null, base2: Rr });
var Zr = k({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Gr = Object.freeze({ __proto__: null, base8: Zr });
var Vr = ht({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Yr = Object.freeze({ __proto__: null, base10: Vr });
var Jr = k({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var Kr = k({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Wr = Object.freeze({ __proto__: null, base16: Jr, base16upper: Kr });
var Xr = k({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var Pr = k({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var Qr = k({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var to = k({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var eo = k({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var no = k({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var ro = k({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var oo = k({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var so = k({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var io = Object.freeze({ __proto__: null, base32: Xr, base32upper: Pr, base32pad: Qr, base32padupper: to, base32hex: eo, base32hexupper: no, base32hexpad: ro, base32hexpadupper: oo, base32z: so });
var uo = ht({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var co = ht({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var ao = Object.freeze({ __proto__: null, base36: uo, base36upper: co });
var fo = ht({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var Do = ht({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var ho = Object.freeze({ __proto__: null, base58btc: fo, base58flickr: Do });
var lo = k({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var bo = k({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var po = k({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var wo = k({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Eo = Object.freeze({ __proto__: null, base64: lo, base64pad: bo, base64url: po, base64urlpad: wo });
var Me = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var go = Me.reduce((t, e2, n5) => (t[n5] = e2, t), []);
var yo = Me.reduce((t, e2, n5) => (t[e2.codePointAt(0)] = n5, t), []);
function xo(t) {
  return t.reduce((e2, n5) => (e2 += go[n5], e2), "");
}
function Bo(t) {
  const e2 = [];
  for (const n5 of t) {
    const r3 = yo[n5.codePointAt(0)];
    if (r3 === void 0) throw new Error(`Non-base256emoji character: ${n5}`);
    e2.push(r3);
  }
  return new Uint8Array(e2);
}
var Co = Bt({ prefix: "🚀", name: "base256emoji", encode: xo, decode: Bo });
var Ao = Object.freeze({ __proto__: null, base256emoji: Co });
var mo = $e;
var qe = 128;
var _o = 127;
var So = ~_o;
var vo = Math.pow(2, 31);
function $e(t, e2, n5) {
  e2 = e2 || [], n5 = n5 || 0;
  for (var r3 = n5; t >= vo; ) e2[n5++] = t & 255 | qe, t /= 128;
  for (; t & So; ) e2[n5++] = t & 255 | qe, t >>>= 7;
  return e2[n5] = t | 0, $e.bytes = n5 - r3 + 1, e2;
}
var Io = Pt;
var Uo = 128;
var ke = 127;
function Pt(t, r3) {
  var n5 = 0, r3 = r3 || 0, o7 = 0, s3 = r3, a3, u4 = t.length;
  do {
    if (s3 >= u4) throw Pt.bytes = 0, new RangeError("Could not decode varint");
    a3 = t[s3++], n5 += o7 < 28 ? (a3 & ke) << o7 : (a3 & ke) * Math.pow(2, o7), o7 += 7;
  } while (a3 >= Uo);
  return Pt.bytes = s3 - r3, n5;
}
var To = Math.pow(2, 7);
var Fo = Math.pow(2, 14);
var No = Math.pow(2, 21);
var Lo = Math.pow(2, 28);
var Oo = Math.pow(2, 35);
var Ho = Math.pow(2, 42);
var zo = Math.pow(2, 49);
var Mo = Math.pow(2, 56);
var qo = Math.pow(2, 63);
var $o = function(t) {
  return t < To ? 1 : t < Fo ? 2 : t < No ? 3 : t < Lo ? 4 : t < Oo ? 5 : t < Ho ? 6 : t < zo ? 7 : t < Mo ? 8 : t < qo ? 9 : 10;
};
var ko = { encode: mo, decode: Io, encodingLength: $o };
var Re = ko;
var je = (t, e2, n5 = 0) => (Re.encode(t, e2, n5), e2);
var Ze = (t) => Re.encodingLength(t);
var Qt = (t, e2) => {
  const n5 = e2.byteLength, r3 = Ze(t), o7 = r3 + Ze(n5), s3 = new Uint8Array(o7 + n5);
  return je(t, s3, 0), je(n5, s3, r3), s3.set(e2, o7), new Ro(t, n5, e2, s3);
};
var Ro = class {
  constructor(e2, n5, r3, o7) {
    this.code = e2, this.size = n5, this.digest = r3, this.bytes = o7;
  }
};
var Ge = ({ name: t, code: e2, encode: n5 }) => new jo(t, e2, n5);
var jo = class {
  constructor(e2, n5, r3) {
    this.name = e2, this.code = n5, this.encode = r3;
  }
  digest(e2) {
    if (e2 instanceof Uint8Array) {
      const n5 = this.encode(e2);
      return n5 instanceof Uint8Array ? Qt(this.code, n5) : n5.then((r3) => Qt(this.code, r3));
    } else throw Error("Unknown type, must be binary type");
  }
};
var Ve = (t) => async (e2) => new Uint8Array(await crypto.subtle.digest(t, e2));
var Zo = Ge({ name: "sha2-256", code: 18, encode: Ve("SHA-256") });
var Go = Ge({ name: "sha2-512", code: 19, encode: Ve("SHA-512") });
var Vo = Object.freeze({ __proto__: null, sha256: Zo, sha512: Go });
var Ye = 0;
var Yo = "identity";
var Je = He;
var Jo = (t) => Qt(Ye, Je(t));
var Ko = { code: Ye, name: Yo, encode: Je, digest: Jo };
var Wo = Object.freeze({ __proto__: null, identity: Ko });
new TextEncoder(), new TextDecoder();
var Ke = { ...kr, ...jr, ...Gr, ...Yr, ...Wr, ...io, ...ao, ...ho, ...Eo, ...Ao };
({ ...Vo, ...Wo });
function We(t, e2, n5, r3) {
  return { name: t, prefix: e2, encoder: { name: t, prefix: e2, encode: n5 }, decoder: { decode: r3 } };
}
var Xe = We("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1)));
var te = We("ascii", "a", (t) => {
  let e2 = "a";
  for (let n5 = 0; n5 < t.length; n5++) e2 += String.fromCharCode(t[n5]);
  return e2;
}, (t) => {
  t = t.substring(1);
  const e2 = Le(t.length);
  for (let n5 = 0; n5 < t.length; n5++) e2[n5] = t.charCodeAt(n5);
  return e2;
});
var Pe = { utf8: Xe, "utf-8": Xe, hex: Ke.base16, latin1: te, ascii: te, binary: te, ...Ke };
function ct(t, e2 = "utf8") {
  const n5 = Pe[e2];
  if (!n5) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : n5.encoder.encode(t).substring(1);
}
function rt(t, e2 = "utf8") {
  const n5 = Pe[e2];
  if (!n5) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Xt(globalThis.Buffer.from(t, "utf-8")) : n5.decoder.decode(`${n5.prefix}${t}`);
}
function lt(t) {
  return safeJsonParse(ct(rt(t, Dt), Gt));
}
function bt(t) {
  return ct(rt(safeJsonStringify(t), Gt), Dt);
}
function Qe(t) {
  const e2 = rt(Wt, dt), n5 = Kt + ct(Oe([e2, t]), dt);
  return [Yt, Jt, n5].join(Vt);
}
function en(t) {
  return ct(t, Dt);
}
function nn(t) {
  return rt(t, Dt);
}
function rn(t) {
  return rt([bt(t.header), bt(t.payload)].join(ut), xt);
}
function on(t) {
  return [bt(t.header), bt(t.payload), en(t.signature)].join(ut);
}
function sn(t) {
  const e2 = t.split(ut), n5 = lt(e2[0]), r3 = lt(e2[1]), o7 = nn(e2[2]), s3 = rt(e2.slice(0, 2).join(ut), xt);
  return { header: n5, payload: r3, signature: o7, data: s3 };
}
function Po(t = he(Ne)) {
  const e2 = Rt.getPublicKey(t);
  return { secretKey: Oe([t, e2]), publicKey: e2 };
}
async function Qo(t, e2, n5, r3, o7 = (0, import_time.fromMiliseconds)(Date.now())) {
  const s3 = { alg: jt, typ: Zt }, a3 = Qe(r3.publicKey), u4 = o7 + n5, i4 = { iss: a3, sub: t, aud: e2, iat: o7, exp: u4 }, D4 = rn({ header: s3, payload: i4 }), c7 = Rt.sign(D4, r3.secretKey.slice(0, 32));
  return on({ header: s3, payload: i4, signature: c7 });
}

// node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe(size4 = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(size4);
  }
  return new Uint8Array(size4);
}

// node_modules/uint8arrays/esm/src/concat.js
function concat3(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}

// node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});

// node_modules/multiformats/esm/vendor/base-x.js
function base2(ALPHABET2, name2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j5 = 0; j5 < BASE_MAP.length; j5++) {
    BASE_MAP[j5] = 255;
  }
  for (var i4 = 0; i4 < ALPHABET2.length; i4++) {
    var x7 = ALPHABET2.charAt(i4);
    var xc = x7.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x7 + " is ambiguous");
    }
    BASE_MAP[xc] = i4;
  }
  var BASE = ALPHABET2.length;
  var LEADER = ALPHABET2.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode8(source) {
    if (source instanceof Uint8Array) ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size4 = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size4);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i5 = 0;
      for (var it1 = size4 - 1; (carry !== 0 || i5 < length2) && it1 !== -1; it1--, i5++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i5;
      pbegin++;
    }
    var it22 = size4 - length2;
    while (it22 !== size4 && b58[it22] === 0) {
      it22++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it22 < size4; ++it22) {
      str += ALPHABET2.charAt(b58[it22]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size4 = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size4);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i5 = 0;
      for (var it32 = size4 - 1; (carry !== 0 || i5 < length2) && it32 !== -1; it32--, i5++) {
        carry += BASE * b256[it32] >>> 0;
        b256[it32] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i5;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it42 = size4 - length2;
    while (it42 !== size4 && b256[it42] === 0) {
      it42++;
    }
    var vch = new Uint8Array(zeroes + (size4 - it42));
    var j6 = zeroes;
    while (it42 !== size4) {
      vch[j6++] = b256[it42++];
    }
    return vch;
  }
  function decode7(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode8,
    decodeUnsafe,
    decode: decode7
  };
}
var src = base2;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii3 = 0; ii3 < aa.byteLength; ii3++) {
    if (aa[ii3] !== bb[ii3]) {
      return false;
    }
  }
  return true;
};
var coerce = (o7) => {
  if (o7 instanceof Uint8Array && o7.constructor.name === "Uint8Array")
    return o7;
  if (o7 instanceof ArrayBuffer)
    return new Uint8Array(o7);
  if (ArrayBuffer.isView(o7)) {
    return new Uint8Array(o7.buffer, o7.byteOffset, o7.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString3 = (str) => new TextEncoder().encode(str);
var toString2 = (b6) => new TextDecoder().decode(b6);

// node_modules/multiformats/esm/src/bases/base.js
var Encoder = class {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder2) {
    return or2(this, decoder2);
  }
};
var ComposedDecoder = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder2) {
    return or2(this, decoder2);
  }
  decode(input) {
    const prefix = input[0];
    const decoder2 = this.decoders[prefix];
    if (decoder2) {
      return decoder2.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or2 = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from6 = ({ name: name2, prefix, encode: encode8, decode: decode7 }) => new Codec(name2, prefix, encode8, decode7);
var baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode8, decode: decode7 } = base_x_default(alphabet2, name2);
  return from6({
    prefix,
    name: name2,
    encode: encode8,
    decode: (text) => coerce(decode7(text))
  });
};
var decode2 = (string2, alphabet2, bitsPerChar, name2) => {
  const codes = {};
  for (let i4 = 0; i4 < alphabet2.length; ++i4) {
    codes[alphabet2[i4]] = i4;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i4 = 0; i4 < end; ++i4) {
    const value = codes[string2[i4]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode4 = (data, alphabet2, bitsPerChar) => {
  const pad4 = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i4 = 0; i4 < data.length; ++i4) {
    buffer = buffer << 8 | data[i4];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad4) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from6({
    prefix,
    name: name2,
    encode(input) {
      return encode4(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode2(input, alphabet2, bitsPerChar, name2);
    }
  });
};

// node_modules/multiformats/esm/src/bases/identity.js
var identity = from6({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString2(buf),
  decode: (str) => fromString3(str)
});

// node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base22
});
var base22 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var alphabetBytesToChars = alphabet.reduce((p6, c7, i4) => {
  p6[i4] = c7;
  return p6;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p6, c7, i4) => {
  p6[c7.codePointAt(0)] = i4;
  return p6;
}, []);
function encode5(data) {
  return data.reduce((p6, c7) => {
    p6 += alphabetBytesToChars[c7];
    return p6;
  }, "");
}
function decode3(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from6({
  prefix: "🚀",
  name: "base256emoji",
  encode: encode5,
  decode: decode3
});

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha2563,
  sha512: () => sha512
});

// node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode6;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode6(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode6.bytes = offset - oldOffset + 1;
  return out;
}
var decode4 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b6, l7 = buf.length;
  do {
    if (counter >= l7) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b6 = buf[counter++];
    res += shift < 28 ? (b6 & REST$1) << shift : (b6 & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b6 >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode4,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/multiformats/esm/src/varint.js
var decode5 = (data, offset = 0) => {
  const code2 = varint_default.decode(data, offset);
  return [
    code2,
    varint_default.decode.bytes
  ];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// node_modules/multiformats/esm/src/hashes/digest.js
var create2 = (code2, digest2) => {
  const size4 = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size4);
  const bytes = new Uint8Array(digestOffset + size4);
  encodeTo(code2, bytes, 0);
  encodeTo(size4, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code2, size4, digest2, bytes);
};
var decode6 = (multihash) => {
  const bytes = coerce(multihash);
  const [code2, sizeOffset] = decode5(bytes);
  const [size4, digestOffset] = decode5(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size4) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size4, digest2, bytes);
};
var equals2 = (a3, b6) => {
  if (a3 === b6) {
    return true;
  } else {
    return a3.code === b6.code && a3.size === b6.size && equals(a3.bytes, b6.bytes);
  }
};
var Digest = class {
  constructor(code2, size4, digest2, bytes) {
    this.code = code2;
    this.size = size4;
    this.digest = digest2;
    this.bytes = bytes;
  }
};

// node_modules/multiformats/esm/src/hashes/hasher.js
var from7 = ({ name: name2, code: code2, encode: encode8 }) => new Hasher(name2, code2, encode8);
var Hasher = class {
  constructor(name2, code2, encode8) {
    this.name = name2;
    this.code = code2;
    this.encode = encode8;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create2(this.code, result) : result.then((digest2) => create2(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
var sha2563 = from7({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from7({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode7 = coerce;
var digest = (input) => create2(code, encode7(input));
var identity2 = {
  code,
  name,
  encode: encode7,
  digest
};

// node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/multiformats/esm/src/cid.js
var CID = class _CID {
  constructor(version3, code2, multihash, bytes) {
    this.code = code2;
    this.version = version3;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create2(code2, digest2);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version3, _baseCache } = this;
    switch (version3) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof _CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version3, code: code2, multihash, bytes } = value;
      return new _CID(version3, code2, multihash, bytes || encodeCID(version3, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version3, multihash, code: code2 } = value;
      const digest2 = decode6(multihash);
      return _CID.create(version3, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version3, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version3) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version3, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version3, code2, digest2.bytes);
        return new _CID(version3, code2, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return _CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return _CID.create(1, code2, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i4, length2] = decode5(initialBytes.subarray(offset));
      offset += length2;
      return i4;
    };
    let version3 = next();
    let codec = DAG_PB_CODE;
    if (version3 === 18) {
      version3 = 0;
      offset = 0;
    } else if (version3 === 1) {
      codec = next();
    }
    if (version3 !== 0 && version3 !== 1) {
      throw new RangeError(`Invalid CID version ${version3}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size4 = offset + digestSize;
    const multihashSize = size4 - prefixSize;
    return {
      version: version3,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size: size4
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = _CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder2 = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder2.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder2 = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder2.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder2 = base3 || base32;
      return [
        base32.prefix,
        decoder2.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version3, code2, multihash) => {
  const codeOffset = encodingLength(version3);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version3, bytes, 0);
  encodeTo(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");
var readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
var hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
var version2 = "0.0.0-dev";
var deprecate = (range, message) => {
  if (range.test(version2)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// node_modules/multiformats/esm/src/basics.js
var bases = {
  ...identity_exports,
  ...base2_exports,
  ...base8_exports,
  ...base10_exports,
  ...base16_exports,
  ...base32_exports,
  ...base36_exports,
  ...base58_exports,
  ...base64_exports,
  ...base256emoji_exports
};
var hashes = {
  ...sha2_browser_exports,
  ...identity_exports2
};

// node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode8, decode7) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode8
    },
    decoder: { decode: decode7 }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder2 = new TextDecoder("utf8");
  return "u" + decoder2.decode(buf);
}, (str) => {
  const encoder3 = new TextEncoder();
  return encoder3.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i4 = 0; i4 < buf.length; i4++) {
    string2 += String.fromCharCode(buf[i4]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i4 = 0; i4 < str.length; i4++) {
    buf[i4] = str.charCodeAt(i4);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/uint8arrays/esm/src/from-string.js
function fromString4(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(string2, "utf8");
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}

// node_modules/uint8arrays/esm/src/to-string.js
function toString3(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// node_modules/@walletconnect/utils/dist/index.es.js
var import_elliptic = __toESM(require_elliptic());

// node_modules/@walletconnect/relay-api/dist/index.es.js
var C = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } };

// node_modules/@walletconnect/utils/dist/index.es.js
var Pe2 = ":";
function Ye2(e2) {
  const [t, n5] = e2.split(Pe2);
  return { namespace: t, reference: n5 };
}
function Kr2(e2, t = []) {
  const n5 = [];
  return Object.keys(e2).forEach((r3) => {
    if (t.length && !t.includes(r3)) return;
    const o7 = e2[r3];
    n5.push(...o7.accounts);
  }), n5;
}
function Be2(e2, t) {
  return e2.includes(":") ? [e2] : t.chains || [];
}
var Ft2 = "ReactNative";
var H2 = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" };
var Gt2 = "js";
function et() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function ne() {
  return !(0, import_window_getters.getDocument)() && !!(0, import_window_getters.getNavigator)() && navigator.product === Ft2;
}
function zr2() {
  return ne() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function Jr2() {
  return ne() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function Ae2() {
  return !et() && !!(0, import_window_getters.getNavigator)() && !!(0, import_window_getters.getDocument)();
}
function ue() {
  return ne() ? H2.reactNative : et() ? H2.node : Ae2() ? H2.browser : H2.unknown;
}
function Yr2() {
  var e2;
  try {
    return ne() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (e2 = global.Application) == null ? void 0 : e2.applicationId : void 0;
  } catch {
    return;
  }
}
function Wt2(e2, t) {
  const n5 = new URLSearchParams(e2);
  for (const r3 of Object.keys(t).sort()) if (t.hasOwnProperty(r3)) {
    const o7 = t[r3];
    o7 !== void 0 && n5.set(r3, o7);
  }
  return n5.toString();
}
function Xr2() {
  return (0, import_window_metadata.getWindowMetadata)() || { name: "", description: "", url: "", icons: [""] };
}
function zt2() {
  if (ue() === H2.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: n5, Version: r3 } = global.Platform;
    return [n5, r3].join("-");
  }
  const e2 = detect();
  if (e2 === null) return "unknown";
  const t = e2.os ? e2.os.replace(" ", "").toLowerCase() : "unknown";
  return e2.type === "browser" ? [t, e2.name, e2.version].join("-") : [t, e2.version].join("-");
}
function Jt2() {
  var e2;
  const t = ue();
  return t === H2.browser ? [t, ((e2 = (0, import_window_getters.getLocation)()) == null ? void 0 : e2.host) || "unknown"].join(":") : t;
}
function Yt2(e2, t, n5) {
  const r3 = zt2(), o7 = Jt2();
  return [[e2, t].join("-"), [Gt2, n5].join("-"), r3, o7].join("/");
}
function Qr2({ protocol: e2, version: t, relayUrl: n5, sdkVersion: r3, auth: o7, projectId: s3, useOnCloseEvent: i4, bundleId: c7, packageName: u4 }) {
  const a3 = n5.split("?"), l7 = Yt2(e2, t, r3), f6 = { auth: o7, ua: l7, projectId: s3, useOnCloseEvent: i4 || void 0, packageName: u4 || void 0, bundleId: c7 || void 0 }, d6 = Wt2(a3[1] || "", f6);
  return a3[0] + "?" + d6;
}
function re(e2, t) {
  return e2.filter((n5) => t.includes(n5)).length === e2.length;
}
function ro2(e2) {
  return Object.fromEntries(e2.entries());
}
function oo2(e2) {
  return new Map(Object.entries(e2));
}
function ao2(e2 = import_time2.FIVE_MINUTES, t) {
  const n5 = (0, import_time2.toMiliseconds)(e2 || import_time2.FIVE_MINUTES);
  let r3, o7, s3, i4;
  return { resolve: (c7) => {
    s3 && r3 && (clearTimeout(s3), r3(c7), i4 = Promise.resolve(c7));
  }, reject: (c7) => {
    s3 && o7 && (clearTimeout(s3), o7(c7));
  }, done: () => new Promise((c7, u4) => {
    if (i4) return c7(i4);
    s3 = setTimeout(() => {
      const a3 = new Error(t);
      i4 = Promise.reject(a3), u4(a3);
    }, n5), r3 = c7, o7 = u4;
  }) };
}
function uo2(e2, t, n5) {
  return new Promise(async (r3, o7) => {
    const s3 = setTimeout(() => o7(new Error(n5)), t);
    try {
      const i4 = await e2;
      r3(i4);
    } catch (i4) {
      o7(i4);
    }
    clearTimeout(s3);
  });
}
function tt(e2, t) {
  if (typeof t == "string" && t.startsWith(`${e2}:`)) return t;
  if (e2.toLowerCase() === "topic") {
    if (typeof t != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${t}`;
  } else if (e2.toLowerCase() === "id") {
    if (typeof t != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${t}`;
  }
  throw new Error(`Unknown expirer target type: ${e2}`);
}
function fo2(e2) {
  return tt("topic", e2);
}
function lo2(e2) {
  return tt("id", e2);
}
function ho2(e2) {
  const [t, n5] = e2.split(":"), r3 = { id: void 0, topic: void 0 };
  if (t === "topic" && typeof n5 == "string") r3.topic = n5;
  else if (t === "id" && Number.isInteger(Number(n5))) r3.id = Number(n5);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${t}:${n5}`);
  return r3;
}
function po2(e2, t) {
  return (0, import_time2.fromMiliseconds)((t || Date.now()) + (0, import_time2.toMiliseconds)(e2));
}
function go2(e2) {
  return Date.now() >= (0, import_time2.toMiliseconds)(e2);
}
function yo2(e2, t) {
  return `${e2}${t ? `:${t}` : ""}`;
}
function Q2(e2 = [], t = []) {
  return [.../* @__PURE__ */ new Set([...e2, ...t])];
}
async function mo2({ id: e2, topic: t, wcDeepLink: n5 }) {
  var r3;
  try {
    if (!n5) return;
    const o7 = typeof n5 == "string" ? JSON.parse(n5) : n5, s3 = o7 == null ? void 0 : o7.href;
    if (typeof s3 != "string") return;
    const i4 = en2(s3, e2, t), c7 = ue();
    if (c7 === H2.browser) {
      if (!((r3 = (0, import_window_getters.getDocument)()) != null && r3.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      tn(i4);
    } else c7 === H2.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(i4);
  } catch (o7) {
    console.error(o7);
  }
}
function en2(e2, t, n5) {
  const r3 = `requestId=${t}&sessionTopic=${n5}`;
  e2.endsWith("/") && (e2 = e2.slice(0, -1));
  let o7 = `${e2}`;
  if (e2.startsWith("https://t.me")) {
    const s3 = e2.includes("?") ? "&startapp=" : "?startapp=";
    o7 = `${o7}${s3}${on2(r3, true)}`;
  } else o7 = `${o7}/wc?${r3}`;
  return o7;
}
function tn(e2) {
  let t = "_self";
  rn2() ? t = "_top" : (nn2() || e2.startsWith("https://") || e2.startsWith("http://")) && (t = "_blank"), window.open(e2, t, "noreferrer noopener");
}
async function bo2(e2, t) {
  let n5 = "";
  try {
    if (Ae2() && (n5 = localStorage.getItem(t), n5)) return n5;
    n5 = await e2.getItem(t);
  } catch (r3) {
    console.error(r3);
  }
  return n5;
}
function wo2(e2, t) {
  if (!e2.includes(t)) return null;
  const n5 = e2.split(/([&,?,=])/), r3 = n5.indexOf(t);
  return n5[r3 + 2];
}
function Eo2() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e2) => {
    const t = Math.random() * 16 | 0;
    return (e2 === "x" ? t : t & 3 | 8).toString(16);
  });
}
function vo2() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function nn2() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function rn2() {
  try {
    return window.self !== window.top;
  } catch {
    return false;
  }
}
function on2(e2, t = false) {
  const n5 = Buffer.from(e2).toString("base64");
  return t ? n5.replace(/[=]/g, "") : n5;
}
function rt2(e2) {
  return Buffer.from(e2, "base64").toString("utf-8");
}
function xo2(e2) {
  return new Promise((t) => setTimeout(t, e2));
}
function Ne2(e2) {
  if (!Number.isSafeInteger(e2) || e2 < 0) throw new Error("positive integer expected, got " + e2);
}
function Io2(e2) {
  return e2 instanceof Uint8Array || ArrayBuffer.isView(e2) && e2.constructor.name === "Uint8Array";
}
function je2(e2, ...t) {
  if (!Io2(e2)) throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e2.length)) throw new Error("Uint8Array expected of length " + t + ", got length=" + e2.length);
}
function ot(e2) {
  if (typeof e2 != "function" || typeof e2.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ne2(e2.outputLen), Ne2(e2.blockLen);
}
function me2(e2, t = true) {
  if (e2.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e2.finished) throw new Error("Hash#digest() has already been called");
}
function sn2(e2, t) {
  je2(e2);
  const n5 = t.outputLen;
  if (e2.length < n5) throw new Error("digestInto() expects output buffer of length at least " + n5);
}
var Ce2 = BigInt(2 ** 32 - 1);
var cn = BigInt(32);
function Oo2(e2, t = false) {
  return t ? { h: Number(e2 & Ce2), l: Number(e2 >> cn & Ce2) } : { h: Number(e2 >> cn & Ce2) | 0, l: Number(e2 & Ce2) | 0 };
}
function Ao2(e2, t = false) {
  let n5 = new Uint32Array(e2.length), r3 = new Uint32Array(e2.length);
  for (let o7 = 0; o7 < e2.length; o7++) {
    const { h: s3, l: i4 } = Oo2(e2[o7], t);
    [n5[o7], r3[o7]] = [s3, i4];
  }
  return [n5, r3];
}
var No2 = (e2, t, n5) => e2 << n5 | t >>> 32 - n5;
var So2 = (e2, t, n5) => t << n5 | e2 >>> 32 - n5;
var Uo2 = (e2, t, n5) => t << n5 - 32 | e2 >>> 64 - n5;
var _o2 = (e2, t, n5) => e2 << n5 - 32 | t >>> 64 - n5;
var be2 = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function To2(e2) {
  return new Uint32Array(e2.buffer, e2.byteOffset, Math.floor(e2.byteLength / 4));
}
function st(e2) {
  return new DataView(e2.buffer, e2.byteOffset, e2.byteLength);
}
function J2(e2, t) {
  return e2 << 32 - t | e2 >>> t;
}
var an = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function $o2(e2) {
  return e2 << 24 & 4278190080 | e2 << 8 & 16711680 | e2 >>> 8 & 65280 | e2 >>> 24 & 255;
}
function un(e2) {
  for (let t = 0; t < e2.length; t++) e2[t] = $o2(e2[t]);
}
function Ro2(e2) {
  if (typeof e2 != "string") throw new Error("utf8ToBytes expected string, got " + typeof e2);
  return new Uint8Array(new TextEncoder().encode(e2));
}
function we2(e2) {
  return typeof e2 == "string" && (e2 = Ro2(e2)), je2(e2), e2;
}
var it2 = class {
  clone() {
    return this._cloneInto();
  }
};
function fn(e2) {
  const t = (r3) => e2().update(we2(r3)).digest(), n5 = e2();
  return t.outputLen = n5.outputLen, t.blockLen = n5.blockLen, t.create = () => e2(), t;
}
function Se2(e2 = 32) {
  if (be2 && typeof be2.getRandomValues == "function") return be2.getRandomValues(new Uint8Array(e2));
  if (be2 && typeof be2.randomBytes == "function") return be2.randomBytes(e2);
  throw new Error("crypto.getRandomValues must be defined");
}
var ln = [];
var dn = [];
var hn = [];
var Po2 = BigInt(0);
var Ue2 = BigInt(1);
var Bo2 = BigInt(2);
var Lo2 = BigInt(7);
var jo2 = BigInt(256);
var Co2 = BigInt(113);
for (let e2 = 0, t = Ue2, n5 = 1, r3 = 0; e2 < 24; e2++) {
  [n5, r3] = [r3, (2 * n5 + 3 * r3) % 5], ln.push(2 * (5 * r3 + n5)), dn.push((e2 + 1) * (e2 + 2) / 2 % 64);
  let o7 = Po2;
  for (let s3 = 0; s3 < 7; s3++) t = (t << Ue2 ^ (t >> Lo2) * Co2) % jo2, t & Bo2 && (o7 ^= Ue2 << (Ue2 << BigInt(s3)) - Ue2);
  hn.push(o7);
}
var [ko2, Do2] = Ao2(hn, true);
var pn = (e2, t, n5) => n5 > 32 ? Uo2(e2, t, n5) : No2(e2, t, n5);
var gn2 = (e2, t, n5) => n5 > 32 ? _o2(e2, t, n5) : So2(e2, t, n5);
function Mo2(e2, t = 24) {
  const n5 = new Uint32Array(10);
  for (let r3 = 24 - t; r3 < 24; r3++) {
    for (let i4 = 0; i4 < 10; i4++) n5[i4] = e2[i4] ^ e2[i4 + 10] ^ e2[i4 + 20] ^ e2[i4 + 30] ^ e2[i4 + 40];
    for (let i4 = 0; i4 < 10; i4 += 2) {
      const c7 = (i4 + 8) % 10, u4 = (i4 + 2) % 10, a3 = n5[u4], l7 = n5[u4 + 1], f6 = pn(a3, l7, 1) ^ n5[c7], d6 = gn2(a3, l7, 1) ^ n5[c7 + 1];
      for (let g6 = 0; g6 < 50; g6 += 10) e2[i4 + g6] ^= f6, e2[i4 + g6 + 1] ^= d6;
    }
    let o7 = e2[2], s3 = e2[3];
    for (let i4 = 0; i4 < 24; i4++) {
      const c7 = dn[i4], u4 = pn(o7, s3, c7), a3 = gn2(o7, s3, c7), l7 = ln[i4];
      o7 = e2[l7], s3 = e2[l7 + 1], e2[l7] = u4, e2[l7 + 1] = a3;
    }
    for (let i4 = 0; i4 < 50; i4 += 10) {
      for (let c7 = 0; c7 < 10; c7++) n5[c7] = e2[i4 + c7];
      for (let c7 = 0; c7 < 10; c7++) e2[i4 + c7] ^= ~n5[(c7 + 2) % 10] & n5[(c7 + 4) % 10];
    }
    e2[0] ^= ko2[r3], e2[1] ^= Do2[r3];
  }
  n5.fill(0);
}
var Lt2 = class _Lt extends it2 {
  constructor(t, n5, r3, o7 = false, s3 = 24) {
    if (super(), this.blockLen = t, this.suffix = n5, this.outputLen = r3, this.enableXOF = o7, this.rounds = s3, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, Ne2(r3), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = To2(this.state);
  }
  keccak() {
    an || un(this.state32), Mo2(this.state32, this.rounds), an || un(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    me2(this);
    const { blockLen: n5, state: r3 } = this;
    t = we2(t);
    const o7 = t.length;
    for (let s3 = 0; s3 < o7; ) {
      const i4 = Math.min(n5 - this.pos, o7 - s3);
      for (let c7 = 0; c7 < i4; c7++) r3[this.pos++] ^= t[s3++];
      this.pos === n5 && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = true;
    const { state: t, suffix: n5, pos: r3, blockLen: o7 } = this;
    t[r3] ^= n5, (n5 & 128) !== 0 && r3 === o7 - 1 && this.keccak(), t[o7 - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    me2(this, false), je2(t), this.finish();
    const n5 = this.state, { blockLen: r3 } = this;
    for (let o7 = 0, s3 = t.length; o7 < s3; ) {
      this.posOut >= r3 && this.keccak();
      const i4 = Math.min(r3 - this.posOut, s3 - o7);
      t.set(n5.subarray(this.posOut, this.posOut + i4), o7), this.posOut += i4, o7 += i4;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return Ne2(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (sn2(t, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, this.state.fill(0);
  }
  _cloneInto(t) {
    const { blockLen: n5, suffix: r3, outputLen: o7, rounds: s3, enableXOF: i4 } = this;
    return t || (t = new _Lt(n5, r3, o7, i4, s3)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = s3, t.suffix = r3, t.outputLen = o7, t.enableXOF = i4, t.destroyed = this.destroyed, t;
  }
};
var Vo2 = (e2, t, n5) => fn(() => new Lt2(t, e2, n5));
var Ho2 = Vo2(1, 136, 256 / 8);
var Ko2 = "https://rpc.walletconnect.org/v1";
function ct2(e2) {
  const t = `Ethereum Signed Message:
${e2.length}`, n5 = new TextEncoder().encode(t + e2);
  return "0x" + Buffer.from(Ho2(n5)).toString("hex");
}
async function yn2(e2, t, n5, r3, o7, s3) {
  switch (n5.t) {
    case "eip191":
      return await mn2(e2, t, n5.s);
    case "eip1271":
      return await bn2(e2, t, n5.s, r3, o7, s3);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${n5.t}`);
  }
}
async function mn2(e2, t, n5) {
  return (await recoverAddress({ hash: ct2(t), signature: n5 })).toLowerCase() === e2.toLowerCase();
}
async function bn2(e2, t, n5, r3, o7, s3) {
  const i4 = Ye2(r3);
  if (!i4.namespace || !i4.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r3}`);
  try {
    const c7 = "0x1626ba7e", u4 = "0000000000000000000000000000000000000000000000000000000000000040", a3 = "0000000000000000000000000000000000000000000000000000000000000041", l7 = n5.substring(2), f6 = ct2(t).substring(2), d6 = c7 + f6 + u4 + a3 + l7, g6 = await fetch(`${s3 || Ko2}/?chainId=${r3}&projectId=${o7}`, { method: "POST", body: JSON.stringify({ id: Fo2(), jsonrpc: "2.0", method: "eth_call", params: [{ to: e2, data: d6 }, "latest"] }) }), { result: y7 } = await g6.json();
    return y7 ? y7.slice(0, c7.length).toLowerCase() === c7.toLowerCase() : false;
  } catch (c7) {
    return console.error("isValidEip1271Signature: ", c7), false;
  }
}
function Fo2() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function qo2(e2) {
  const t = atob(e2), n5 = new Uint8Array(t.length);
  for (let i4 = 0; i4 < t.length; i4++) n5[i4] = t.charCodeAt(i4);
  const r3 = n5[0];
  if (r3 === 0) throw new Error("No signatures found");
  const o7 = 1 + r3 * 64;
  if (n5.length < o7) throw new Error("Transaction data too short for claimed signature count");
  if (n5.length < 100) throw new Error("Transaction too short");
  const s3 = Buffer.from(e2, "base64").slice(1, 65);
  return esm_default2.encode(s3);
}
var Go2 = Object.defineProperty;
var Wo2 = Object.defineProperties;
var zo2 = Object.getOwnPropertyDescriptors;
var wn = Object.getOwnPropertySymbols;
var Jo2 = Object.prototype.hasOwnProperty;
var Yo2 = Object.prototype.propertyIsEnumerable;
var En2 = (e2, t, n5) => t in e2 ? Go2(e2, t, { enumerable: true, configurable: true, writable: true, value: n5 }) : e2[t] = n5;
var at = (e2, t) => {
  for (var n5 in t || (t = {})) Jo2.call(t, n5) && En2(e2, n5, t[n5]);
  if (wn) for (var n5 of wn(t)) Yo2.call(t, n5) && En2(e2, n5, t[n5]);
  return e2;
};
var vn2 = (e2, t) => Wo2(e2, zo2(t));
var Xo = "did:pkh:";
var ke2 = (e2) => e2 == null ? void 0 : e2.split(":");
var xn2 = (e2) => {
  const t = e2 && ke2(e2);
  if (t) return e2.includes(Xo) ? t[3] : t[1];
};
var In2 = (e2) => {
  const t = e2 && ke2(e2);
  if (t) return t[2] + ":" + t[3];
};
var ut2 = (e2) => {
  const t = e2 && ke2(e2);
  if (t) return t.pop();
};
async function Zo2(e2) {
  const { cacao: t, projectId: n5 } = e2, { s: r3, p: o7 } = t, s3 = On2(o7, o7.iss), i4 = ut2(o7.iss);
  return await yn2(i4, s3, r3, In2(o7.iss), n5);
}
var On2 = (e2, t) => {
  const n5 = `${e2.domain} wants you to sign in with your Ethereum account:`, r3 = ut2(t);
  if (!e2.aud && !e2.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let o7 = e2.statement || void 0;
  const s3 = `URI: ${e2.aud || e2.uri}`, i4 = `Version: ${e2.version}`, c7 = `Chain ID: ${xn2(t)}`, u4 = `Nonce: ${e2.nonce}`, a3 = `Issued At: ${e2.iat}`, l7 = e2.exp ? `Expiration Time: ${e2.exp}` : void 0, f6 = e2.nbf ? `Not Before: ${e2.nbf}` : void 0, d6 = e2.requestId ? `Request ID: ${e2.requestId}` : void 0, g6 = e2.resources ? `Resources:${e2.resources.map((h5) => `
- ${h5}`).join("")}` : void 0, y7 = Me2(e2.resources);
  if (y7) {
    const h5 = oe(y7);
    o7 = dt2(o7, h5);
  }
  return [n5, r3, "", o7, "", s3, i4, c7, u4, a3, l7, f6, d6, g6].filter((h5) => h5 != null).join(`
`);
};
function Un2(e2) {
  return Buffer.from(JSON.stringify(e2)).toString("base64");
}
function _n2(e2) {
  return JSON.parse(Buffer.from(e2, "base64").toString("utf-8"));
}
function Y(e2) {
  if (!e2) throw new Error("No recap provided, value is undefined");
  if (!e2.att) throw new Error("No `att` property found");
  const t = Object.keys(e2.att);
  if (!(t != null && t.length)) throw new Error("No resources found in `att` property");
  t.forEach((n5) => {
    const r3 = e2.att[n5];
    if (Array.isArray(r3)) throw new Error(`Resource must be an object: ${n5}`);
    if (typeof r3 != "object") throw new Error(`Resource must be an object: ${n5}`);
    if (!Object.keys(r3).length) throw new Error(`Resource object is empty: ${n5}`);
    Object.keys(r3).forEach((o7) => {
      const s3 = r3[o7];
      if (!Array.isArray(s3)) throw new Error(`Ability limits ${o7} must be an array of objects, found: ${s3}`);
      if (!s3.length) throw new Error(`Value of ${o7} is empty array, must be an array with objects`);
      s3.forEach((i4) => {
        if (typeof i4 != "object") throw new Error(`Ability limits (${o7}) must be an array of objects, found: ${i4}`);
      });
    });
  });
}
function Tn2(e2, t, n5, r3 = {}) {
  return n5 == null ? void 0 : n5.sort((o7, s3) => o7.localeCompare(s3)), { att: { [e2]: ft2(t, n5, r3) } };
}
function ft2(e2, t, n5 = {}) {
  t = t == null ? void 0 : t.sort((o7, s3) => o7.localeCompare(s3));
  const r3 = t.map((o7) => ({ [`${e2}/${o7}`]: [n5] }));
  return Object.assign({}, ...r3);
}
function De2(e2) {
  return Y(e2), `urn:recap:${Un2(e2).replace(/=/g, "")}`;
}
function oe(e2) {
  const t = _n2(e2.replace("urn:recap:", ""));
  return Y(t), t;
}
function rs(e2, t, n5) {
  const r3 = Tn2(e2, t, n5);
  return De2(r3);
}
function lt2(e2) {
  return e2 && e2.includes("urn:recap:");
}
function os(e2, t) {
  const n5 = oe(e2), r3 = oe(t), o7 = Rn2(n5, r3);
  return De2(o7);
}
function Rn2(e2, t) {
  Y(e2), Y(t);
  const n5 = Object.keys(e2.att).concat(Object.keys(t.att)).sort((o7, s3) => o7.localeCompare(s3)), r3 = { att: {} };
  return n5.forEach((o7) => {
    var s3, i4;
    Object.keys(((s3 = e2.att) == null ? void 0 : s3[o7]) || {}).concat(Object.keys(((i4 = t.att) == null ? void 0 : i4[o7]) || {})).sort((c7, u4) => c7.localeCompare(u4)).forEach((c7) => {
      var u4, a3;
      r3.att[o7] = vn2(at({}, r3.att[o7]), { [c7]: ((u4 = e2.att[o7]) == null ? void 0 : u4[c7]) || ((a3 = t.att[o7]) == null ? void 0 : a3[c7]) });
    });
  }), r3;
}
function dt2(e2 = "", t) {
  Y(t);
  const n5 = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (e2.includes(n5)) return e2;
  const r3 = [];
  let o7 = 0;
  Object.keys(t.att).forEach((c7) => {
    const u4 = Object.keys(t.att[c7]).map((f6) => ({ ability: f6.split("/")[0], action: f6.split("/")[1] }));
    u4.sort((f6, d6) => f6.action.localeCompare(d6.action));
    const a3 = {};
    u4.forEach((f6) => {
      a3[f6.ability] || (a3[f6.ability] = []), a3[f6.ability].push(f6.action);
    });
    const l7 = Object.keys(a3).map((f6) => (o7++, `(${o7}) '${f6}': '${a3[f6].join("', '")}' for '${c7}'.`));
    r3.push(l7.join(", ").replace(".,", "."));
  });
  const s3 = r3.join(" "), i4 = `${n5}${s3}`;
  return `${e2 ? e2 + " " : ""}${i4}`;
}
function ss(e2) {
  var t;
  const n5 = oe(e2);
  Y(n5);
  const r3 = (t = n5.att) == null ? void 0 : t.eip155;
  return r3 ? Object.keys(r3).map((o7) => o7.split("/")[1]) : [];
}
function is(e2) {
  const t = oe(e2);
  Y(t);
  const n5 = [];
  return Object.values(t.att).forEach((r3) => {
    Object.values(r3).forEach((o7) => {
      var s3;
      (s3 = o7 == null ? void 0 : o7[0]) != null && s3.chains && n5.push(o7[0].chains);
    });
  }), [...new Set(n5.flat())];
}
function Me2(e2) {
  if (!e2) return;
  const t = e2 == null ? void 0 : e2[e2.length - 1];
  return lt2(t) ? t : void 0;
}
function ht2(e2) {
  if (!Number.isSafeInteger(e2) || e2 < 0) throw new Error("positive integer expected, got " + e2);
}
function Bn2(e2) {
  return e2 instanceof Uint8Array || ArrayBuffer.isView(e2) && e2.constructor.name === "Uint8Array";
}
function F(e2, ...t) {
  if (!Bn2(e2)) throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e2.length)) throw new Error("Uint8Array expected of length " + t + ", got length=" + e2.length);
}
function Ln2(e2, t = true) {
  if (e2.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e2.finished) throw new Error("Hash#digest() has already been called");
}
function cs(e2, t) {
  F(e2);
  const n5 = t.outputLen;
  if (e2.length < n5) throw new Error("digestInto() expects output buffer of length at least " + n5);
}
function jn2(e2) {
  if (typeof e2 != "boolean") throw new Error(`boolean expected, not ${e2}`);
}
var se = (e2) => new Uint32Array(e2.buffer, e2.byteOffset, Math.floor(e2.byteLength / 4));
var as = (e2) => new DataView(e2.buffer, e2.byteOffset, e2.byteLength);
var us = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!us) throw new Error("Non little-endian hardware is not supported");
function fs(e2) {
  if (typeof e2 != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(e2));
}
function pt(e2) {
  if (typeof e2 == "string") e2 = fs(e2);
  else if (Bn2(e2)) e2 = gt2(e2);
  else throw new Error("Uint8Array expected, got " + typeof e2);
  return e2;
}
function ls(e2, t) {
  if (t == null || typeof t != "object") throw new Error("options must be defined");
  return Object.assign(e2, t);
}
function ds(e2, t) {
  if (e2.length !== t.length) return false;
  let n5 = 0;
  for (let r3 = 0; r3 < e2.length; r3++) n5 |= e2[r3] ^ t[r3];
  return n5 === 0;
}
var hs = (e2, t) => {
  function n5(r3, ...o7) {
    if (F(r3), e2.nonceLength !== void 0) {
      const l7 = o7[0];
      if (!l7) throw new Error("nonce / iv required");
      e2.varSizeNonce ? F(l7) : F(l7, e2.nonceLength);
    }
    const s3 = e2.tagLength;
    s3 && o7[1] !== void 0 && F(o7[1]);
    const i4 = t(r3, ...o7), c7 = (l7, f6) => {
      if (f6 !== void 0) {
        if (l7 !== 2) throw new Error("cipher output not supported");
        F(f6);
      }
    };
    let u4 = false;
    return { encrypt(l7, f6) {
      if (u4) throw new Error("cannot encrypt() twice with same key + nonce");
      return u4 = true, F(l7), c7(i4.encrypt.length, f6), i4.encrypt(l7, f6);
    }, decrypt(l7, f6) {
      if (F(l7), s3 && l7.length < s3) throw new Error("invalid ciphertext length: smaller than tagLength=" + s3);
      return c7(i4.decrypt.length, f6), i4.decrypt(l7, f6);
    } };
  }
  return Object.assign(n5, e2), n5;
};
function Cn2(e2, t, n5 = true) {
  if (t === void 0) return new Uint8Array(e2);
  if (t.length !== e2) throw new Error("invalid output length, expected " + e2 + ", got: " + t.length);
  if (n5 && !ps(t)) throw new Error("invalid output, must be aligned");
  return t;
}
function kn2(e2, t, n5, r3) {
  if (typeof e2.setBigUint64 == "function") return e2.setBigUint64(t, n5, r3);
  const o7 = BigInt(32), s3 = BigInt(4294967295), i4 = Number(n5 >> o7 & s3), c7 = Number(n5 & s3), u4 = r3 ? 4 : 0, a3 = r3 ? 0 : 4;
  e2.setUint32(t + u4, i4, r3), e2.setUint32(t + a3, c7, r3);
}
function ps(e2) {
  return e2.byteOffset % 4 === 0;
}
function gt2(e2) {
  return Uint8Array.from(e2);
}
function Ee2(...e2) {
  for (let t = 0; t < e2.length; t++) e2[t].fill(0);
}
var Dn = (e2) => Uint8Array.from(e2.split("").map((t) => t.charCodeAt(0)));
var gs = Dn("expand 16-byte k");
var ys = Dn("expand 32-byte k");
var ms = se(gs);
var bs = se(ys);
function x2(e2, t) {
  return e2 << t | e2 >>> 32 - t;
}
function yt2(e2) {
  return e2.byteOffset % 4 === 0;
}
var Ve2 = 64;
var ws = 16;
var Mn2 = 2 ** 32 - 1;
var Vn2 = new Uint32Array();
function Es(e2, t, n5, r3, o7, s3, i4, c7) {
  const u4 = o7.length, a3 = new Uint8Array(Ve2), l7 = se(a3), f6 = yt2(o7) && yt2(s3), d6 = f6 ? se(o7) : Vn2, g6 = f6 ? se(s3) : Vn2;
  for (let y7 = 0; y7 < u4; i4++) {
    if (e2(t, n5, r3, l7, i4, c7), i4 >= Mn2) throw new Error("arx: counter overflow");
    const h5 = Math.min(Ve2, u4 - y7);
    if (f6 && h5 === Ve2) {
      const m5 = y7 / 4;
      if (y7 % 4 !== 0) throw new Error("arx: invalid block position");
      for (let L6 = 0, b6; L6 < ws; L6++) b6 = m5 + L6, g6[b6] = d6[b6] ^ l7[L6];
      y7 += Ve2;
      continue;
    }
    for (let m5 = 0, L6; m5 < h5; m5++) L6 = y7 + m5, s3[L6] = o7[L6] ^ a3[m5];
    y7 += h5;
  }
}
function vs(e2, t) {
  const { allowShortKeys: n5, extendNonceFn: r3, counterLength: o7, counterRight: s3, rounds: i4 } = ls({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, t);
  if (typeof e2 != "function") throw new Error("core must be a function");
  return ht2(o7), ht2(i4), jn2(s3), jn2(n5), (c7, u4, a3, l7, f6 = 0) => {
    F(c7), F(u4), F(a3);
    const d6 = a3.length;
    if (l7 === void 0 && (l7 = new Uint8Array(d6)), F(l7), ht2(f6), f6 < 0 || f6 >= Mn2) throw new Error("arx: counter overflow");
    if (l7.length < d6) throw new Error(`arx: output (${l7.length}) is shorter than data (${d6})`);
    const g6 = [];
    let y7 = c7.length, h5, m5;
    if (y7 === 32) g6.push(h5 = gt2(c7)), m5 = bs;
    else if (y7 === 16 && n5) h5 = new Uint8Array(32), h5.set(c7), h5.set(c7, 16), m5 = ms, g6.push(h5);
    else throw new Error(`arx: invalid 32-byte key, got length=${y7}`);
    yt2(u4) || g6.push(u4 = gt2(u4));
    const L6 = se(h5);
    if (r3) {
      if (u4.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      r3(m5, L6, se(u4.subarray(0, 16)), L6), u4 = u4.subarray(16);
    }
    const b6 = 16 - o7;
    if (b6 !== u4.length) throw new Error(`arx: nonce must be ${b6} or 16 bytes`);
    if (b6 !== 12) {
      const O8 = new Uint8Array(12);
      O8.set(u4, s3 ? 0 : 12 - u4.length), u4 = O8, g6.push(u4);
    }
    const _5 = se(u4);
    return Es(e2, m5, L6, _5, a3, l7, f6, i4), Ee2(...g6), l7;
  };
}
var M2 = (e2, t) => e2[t++] & 255 | (e2[t++] & 255) << 8;
var xs = class {
  constructor(t) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = false, t = pt(t), F(t, 32);
    const n5 = M2(t, 0), r3 = M2(t, 2), o7 = M2(t, 4), s3 = M2(t, 6), i4 = M2(t, 8), c7 = M2(t, 10), u4 = M2(t, 12), a3 = M2(t, 14);
    this.r[0] = n5 & 8191, this.r[1] = (n5 >>> 13 | r3 << 3) & 8191, this.r[2] = (r3 >>> 10 | o7 << 6) & 7939, this.r[3] = (o7 >>> 7 | s3 << 9) & 8191, this.r[4] = (s3 >>> 4 | i4 << 12) & 255, this.r[5] = i4 >>> 1 & 8190, this.r[6] = (i4 >>> 14 | c7 << 2) & 8191, this.r[7] = (c7 >>> 11 | u4 << 5) & 8065, this.r[8] = (u4 >>> 8 | a3 << 8) & 8191, this.r[9] = a3 >>> 5 & 127;
    for (let l7 = 0; l7 < 8; l7++) this.pad[l7] = M2(t, 16 + 2 * l7);
  }
  process(t, n5, r3 = false) {
    const o7 = r3 ? 0 : 2048, { h: s3, r: i4 } = this, c7 = i4[0], u4 = i4[1], a3 = i4[2], l7 = i4[3], f6 = i4[4], d6 = i4[5], g6 = i4[6], y7 = i4[7], h5 = i4[8], m5 = i4[9], L6 = M2(t, n5 + 0), b6 = M2(t, n5 + 2), _5 = M2(t, n5 + 4), O8 = M2(t, n5 + 6), k7 = M2(t, n5 + 8), E7 = M2(t, n5 + 10), B4 = M2(t, n5 + 12), j5 = M2(t, n5 + 14);
    let v8 = s3[0] + (L6 & 8191), I4 = s3[1] + ((L6 >>> 13 | b6 << 3) & 8191), w7 = s3[2] + ((b6 >>> 10 | _5 << 6) & 8191), R3 = s3[3] + ((_5 >>> 7 | O8 << 9) & 8191), A5 = s3[4] + ((O8 >>> 4 | k7 << 12) & 8191), T5 = s3[5] + (k7 >>> 1 & 8191), N14 = s3[6] + ((k7 >>> 14 | E7 << 2) & 8191), S5 = s3[7] + ((E7 >>> 11 | B4 << 5) & 8191), U4 = s3[8] + ((B4 >>> 8 | j5 << 8) & 8191), $5 = s3[9] + (j5 >>> 5 | o7), p6 = 0, C7 = p6 + v8 * c7 + I4 * (5 * m5) + w7 * (5 * h5) + R3 * (5 * y7) + A5 * (5 * g6);
    p6 = C7 >>> 13, C7 &= 8191, C7 += T5 * (5 * d6) + N14 * (5 * f6) + S5 * (5 * l7) + U4 * (5 * a3) + $5 * (5 * u4), p6 += C7 >>> 13, C7 &= 8191;
    let D4 = p6 + v8 * u4 + I4 * c7 + w7 * (5 * m5) + R3 * (5 * h5) + A5 * (5 * y7);
    p6 = D4 >>> 13, D4 &= 8191, D4 += T5 * (5 * g6) + N14 * (5 * d6) + S5 * (5 * f6) + U4 * (5 * l7) + $5 * (5 * a3), p6 += D4 >>> 13, D4 &= 8191;
    let P7 = p6 + v8 * a3 + I4 * u4 + w7 * c7 + R3 * (5 * m5) + A5 * (5 * h5);
    p6 = P7 >>> 13, P7 &= 8191, P7 += T5 * (5 * y7) + N14 * (5 * g6) + S5 * (5 * d6) + U4 * (5 * f6) + $5 * (5 * l7), p6 += P7 >>> 13, P7 &= 8191;
    let G4 = p6 + v8 * l7 + I4 * a3 + w7 * u4 + R3 * c7 + A5 * (5 * m5);
    p6 = G4 >>> 13, G4 &= 8191, G4 += T5 * (5 * h5) + N14 * (5 * y7) + S5 * (5 * g6) + U4 * (5 * d6) + $5 * (5 * f6), p6 += G4 >>> 13, G4 &= 8191;
    let X = p6 + v8 * f6 + I4 * l7 + w7 * a3 + R3 * u4 + A5 * c7;
    p6 = X >>> 13, X &= 8191, X += T5 * (5 * m5) + N14 * (5 * h5) + S5 * (5 * y7) + U4 * (5 * g6) + $5 * (5 * d6), p6 += X >>> 13, X &= 8191;
    let Z2 = p6 + v8 * d6 + I4 * f6 + w7 * l7 + R3 * a3 + A5 * u4;
    p6 = Z2 >>> 13, Z2 &= 8191, Z2 += T5 * c7 + N14 * (5 * m5) + S5 * (5 * h5) + U4 * (5 * y7) + $5 * (5 * g6), p6 += Z2 >>> 13, Z2 &= 8191;
    let he4 = p6 + v8 * g6 + I4 * d6 + w7 * f6 + R3 * l7 + A5 * a3;
    p6 = he4 >>> 13, he4 &= 8191, he4 += T5 * u4 + N14 * c7 + S5 * (5 * m5) + U4 * (5 * h5) + $5 * (5 * y7), p6 += he4 >>> 13, he4 &= 8191;
    let pe4 = p6 + v8 * y7 + I4 * g6 + w7 * d6 + R3 * f6 + A5 * l7;
    p6 = pe4 >>> 13, pe4 &= 8191, pe4 += T5 * a3 + N14 * u4 + S5 * c7 + U4 * (5 * m5) + $5 * (5 * h5), p6 += pe4 >>> 13, pe4 &= 8191;
    let ge4 = p6 + v8 * h5 + I4 * y7 + w7 * g6 + R3 * d6 + A5 * f6;
    p6 = ge4 >>> 13, ge4 &= 8191, ge4 += T5 * l7 + N14 * a3 + S5 * u4 + U4 * c7 + $5 * (5 * m5), p6 += ge4 >>> 13, ge4 &= 8191;
    let ye4 = p6 + v8 * m5 + I4 * h5 + w7 * y7 + R3 * g6 + A5 * d6;
    p6 = ye4 >>> 13, ye4 &= 8191, ye4 += T5 * f6 + N14 * l7 + S5 * a3 + U4 * u4 + $5 * c7, p6 += ye4 >>> 13, ye4 &= 8191, p6 = (p6 << 2) + p6 | 0, p6 = p6 + C7 | 0, C7 = p6 & 8191, p6 = p6 >>> 13, D4 += p6, s3[0] = C7, s3[1] = D4, s3[2] = P7, s3[3] = G4, s3[4] = X, s3[5] = Z2, s3[6] = he4, s3[7] = pe4, s3[8] = ge4, s3[9] = ye4;
  }
  finalize() {
    const { h: t, pad: n5 } = this, r3 = new Uint16Array(10);
    let o7 = t[1] >>> 13;
    t[1] &= 8191;
    for (let c7 = 2; c7 < 10; c7++) t[c7] += o7, o7 = t[c7] >>> 13, t[c7] &= 8191;
    t[0] += o7 * 5, o7 = t[0] >>> 13, t[0] &= 8191, t[1] += o7, o7 = t[1] >>> 13, t[1] &= 8191, t[2] += o7, r3[0] = t[0] + 5, o7 = r3[0] >>> 13, r3[0] &= 8191;
    for (let c7 = 1; c7 < 10; c7++) r3[c7] = t[c7] + o7, o7 = r3[c7] >>> 13, r3[c7] &= 8191;
    r3[9] -= 8192;
    let s3 = (o7 ^ 1) - 1;
    for (let c7 = 0; c7 < 10; c7++) r3[c7] &= s3;
    s3 = ~s3;
    for (let c7 = 0; c7 < 10; c7++) t[c7] = t[c7] & s3 | r3[c7];
    t[0] = (t[0] | t[1] << 13) & 65535, t[1] = (t[1] >>> 3 | t[2] << 10) & 65535, t[2] = (t[2] >>> 6 | t[3] << 7) & 65535, t[3] = (t[3] >>> 9 | t[4] << 4) & 65535, t[4] = (t[4] >>> 12 | t[5] << 1 | t[6] << 14) & 65535, t[5] = (t[6] >>> 2 | t[7] << 11) & 65535, t[6] = (t[7] >>> 5 | t[8] << 8) & 65535, t[7] = (t[8] >>> 8 | t[9] << 5) & 65535;
    let i4 = t[0] + n5[0];
    t[0] = i4 & 65535;
    for (let c7 = 1; c7 < 8; c7++) i4 = (t[c7] + n5[c7] | 0) + (i4 >>> 16) | 0, t[c7] = i4 & 65535;
    Ee2(r3);
  }
  update(t) {
    Ln2(this);
    const { buffer: n5, blockLen: r3 } = this;
    t = pt(t);
    const o7 = t.length;
    for (let s3 = 0; s3 < o7; ) {
      const i4 = Math.min(r3 - this.pos, o7 - s3);
      if (i4 === r3) {
        for (; r3 <= o7 - s3; s3 += r3) this.process(t, s3);
        continue;
      }
      n5.set(t.subarray(s3, s3 + i4), this.pos), this.pos += i4, s3 += i4, this.pos === r3 && (this.process(n5, 0, false), this.pos = 0);
    }
    return this;
  }
  destroy() {
    Ee2(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(t) {
    Ln2(this), cs(t, this), this.finished = true;
    const { buffer: n5, h: r3 } = this;
    let { pos: o7 } = this;
    if (o7) {
      for (n5[o7++] = 1; o7 < 16; o7++) n5[o7] = 0;
      this.process(n5, 0, true);
    }
    this.finalize();
    let s3 = 0;
    for (let i4 = 0; i4 < 8; i4++) t[s3++] = r3[i4] >>> 0, t[s3++] = r3[i4] >>> 8;
    return t;
  }
  digest() {
    const { buffer: t, outputLen: n5 } = this;
    this.digestInto(t);
    const r3 = t.slice(0, n5);
    return this.destroy(), r3;
  }
};
function Is(e2) {
  const t = (r3, o7) => e2(o7).update(pt(r3)).digest(), n5 = e2(new Uint8Array(32));
  return t.outputLen = n5.outputLen, t.blockLen = n5.blockLen, t.create = (r3) => e2(r3), t;
}
var Os = Is((e2) => new xs(e2));
function As(e2, t, n5, r3, o7, s3 = 20) {
  let i4 = e2[0], c7 = e2[1], u4 = e2[2], a3 = e2[3], l7 = t[0], f6 = t[1], d6 = t[2], g6 = t[3], y7 = t[4], h5 = t[5], m5 = t[6], L6 = t[7], b6 = o7, _5 = n5[0], O8 = n5[1], k7 = n5[2], E7 = i4, B4 = c7, j5 = u4, v8 = a3, I4 = l7, w7 = f6, R3 = d6, A5 = g6, T5 = y7, N14 = h5, S5 = m5, U4 = L6, $5 = b6, p6 = _5, C7 = O8, D4 = k7;
  for (let G4 = 0; G4 < s3; G4 += 2) E7 = E7 + I4 | 0, $5 = x2($5 ^ E7, 16), T5 = T5 + $5 | 0, I4 = x2(I4 ^ T5, 12), E7 = E7 + I4 | 0, $5 = x2($5 ^ E7, 8), T5 = T5 + $5 | 0, I4 = x2(I4 ^ T5, 7), B4 = B4 + w7 | 0, p6 = x2(p6 ^ B4, 16), N14 = N14 + p6 | 0, w7 = x2(w7 ^ N14, 12), B4 = B4 + w7 | 0, p6 = x2(p6 ^ B4, 8), N14 = N14 + p6 | 0, w7 = x2(w7 ^ N14, 7), j5 = j5 + R3 | 0, C7 = x2(C7 ^ j5, 16), S5 = S5 + C7 | 0, R3 = x2(R3 ^ S5, 12), j5 = j5 + R3 | 0, C7 = x2(C7 ^ j5, 8), S5 = S5 + C7 | 0, R3 = x2(R3 ^ S5, 7), v8 = v8 + A5 | 0, D4 = x2(D4 ^ v8, 16), U4 = U4 + D4 | 0, A5 = x2(A5 ^ U4, 12), v8 = v8 + A5 | 0, D4 = x2(D4 ^ v8, 8), U4 = U4 + D4 | 0, A5 = x2(A5 ^ U4, 7), E7 = E7 + w7 | 0, D4 = x2(D4 ^ E7, 16), S5 = S5 + D4 | 0, w7 = x2(w7 ^ S5, 12), E7 = E7 + w7 | 0, D4 = x2(D4 ^ E7, 8), S5 = S5 + D4 | 0, w7 = x2(w7 ^ S5, 7), B4 = B4 + R3 | 0, $5 = x2($5 ^ B4, 16), U4 = U4 + $5 | 0, R3 = x2(R3 ^ U4, 12), B4 = B4 + R3 | 0, $5 = x2($5 ^ B4, 8), U4 = U4 + $5 | 0, R3 = x2(R3 ^ U4, 7), j5 = j5 + A5 | 0, p6 = x2(p6 ^ j5, 16), T5 = T5 + p6 | 0, A5 = x2(A5 ^ T5, 12), j5 = j5 + A5 | 0, p6 = x2(p6 ^ j5, 8), T5 = T5 + p6 | 0, A5 = x2(A5 ^ T5, 7), v8 = v8 + I4 | 0, C7 = x2(C7 ^ v8, 16), N14 = N14 + C7 | 0, I4 = x2(I4 ^ N14, 12), v8 = v8 + I4 | 0, C7 = x2(C7 ^ v8, 8), N14 = N14 + C7 | 0, I4 = x2(I4 ^ N14, 7);
  let P7 = 0;
  r3[P7++] = i4 + E7 | 0, r3[P7++] = c7 + B4 | 0, r3[P7++] = u4 + j5 | 0, r3[P7++] = a3 + v8 | 0, r3[P7++] = l7 + I4 | 0, r3[P7++] = f6 + w7 | 0, r3[P7++] = d6 + R3 | 0, r3[P7++] = g6 + A5 | 0, r3[P7++] = y7 + T5 | 0, r3[P7++] = h5 + N14 | 0, r3[P7++] = m5 + S5 | 0, r3[P7++] = L6 + U4 | 0, r3[P7++] = b6 + $5 | 0, r3[P7++] = _5 + p6 | 0, r3[P7++] = O8 + C7 | 0, r3[P7++] = k7 + D4 | 0;
}
var Ns = vs(As, { counterRight: false, counterLength: 4, allowShortKeys: false });
var Ss = new Uint8Array(16);
var Hn2 = (e2, t) => {
  e2.update(t);
  const n5 = t.length % 16;
  n5 && e2.update(Ss.subarray(n5));
};
var Us = new Uint8Array(32);
function Kn2(e2, t, n5, r3, o7) {
  const s3 = e2(t, n5, Us), i4 = Os.create(s3);
  o7 && Hn2(i4, o7), Hn2(i4, r3);
  const c7 = new Uint8Array(16), u4 = as(c7);
  kn2(u4, 0, BigInt(o7 ? o7.length : 0), true), kn2(u4, 8, BigInt(r3.length), true), i4.update(c7);
  const a3 = i4.digest();
  return Ee2(s3, c7), a3;
}
var _s = (e2) => (t, n5, r3) => ({ encrypt(s3, i4) {
  const c7 = s3.length;
  i4 = Cn2(c7 + 16, i4, false), i4.set(s3);
  const u4 = i4.subarray(0, -16);
  e2(t, n5, u4, u4, 1);
  const a3 = Kn2(e2, t, n5, u4, r3);
  return i4.set(a3, c7), Ee2(a3), i4;
}, decrypt(s3, i4) {
  i4 = Cn2(s3.length - 16, i4, false);
  const c7 = s3.subarray(0, -16), u4 = s3.subarray(-16), a3 = Kn2(e2, t, n5, c7, r3);
  if (!ds(u4, a3)) throw new Error("invalid tag");
  return i4.set(s3.subarray(0, -16)), e2(t, n5, i4, i4, 1), Ee2(a3), i4;
} });
var Fn2 = hs({ blockSize: 64, nonceLength: 12, tagLength: 16 }, _s(Ns));
var qn2 = class extends it2 {
  constructor(t, n5) {
    super(), this.finished = false, this.destroyed = false, ot(t);
    const r3 = we2(n5);
    if (this.iHash = t.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const o7 = this.blockLen, s3 = new Uint8Array(o7);
    s3.set(r3.length > o7 ? t.create().update(r3).digest() : r3);
    for (let i4 = 0; i4 < s3.length; i4++) s3[i4] ^= 54;
    this.iHash.update(s3), this.oHash = t.create();
    for (let i4 = 0; i4 < s3.length; i4++) s3[i4] ^= 106;
    this.oHash.update(s3), s3.fill(0);
  }
  update(t) {
    return me2(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    me2(this), je2(t, this.outputLen), this.finished = true, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n5, iHash: r3, finished: o7, destroyed: s3, blockLen: i4, outputLen: c7 } = this;
    return t = t, t.finished = o7, t.destroyed = s3, t.blockLen = i4, t.outputLen = c7, t.oHash = n5._cloneInto(t.oHash), t.iHash = r3._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
};
var mt = (e2, t, n5) => new qn2(e2, t).update(n5).digest();
mt.create = (e2, t) => new qn2(e2, t);
function Ts(e2, t, n5) {
  return ot(e2), n5 === void 0 && (n5 = new Uint8Array(e2.outputLen)), mt(e2, we2(n5), we2(t));
}
var bt2 = new Uint8Array([0]);
var Gn2 = new Uint8Array();
function $s(e2, t, n5, r3 = 32) {
  if (ot(e2), Ne2(r3), r3 > 255 * e2.outputLen) throw new Error("Length should be <= 255*HashLen");
  const o7 = Math.ceil(r3 / e2.outputLen);
  n5 === void 0 && (n5 = Gn2);
  const s3 = new Uint8Array(o7 * e2.outputLen), i4 = mt.create(e2, t), c7 = i4._cloneInto(), u4 = new Uint8Array(i4.outputLen);
  for (let a3 = 0; a3 < o7; a3++) bt2[0] = a3 + 1, c7.update(a3 === 0 ? Gn2 : u4).update(n5).update(bt2).digestInto(u4), s3.set(u4, e2.outputLen * a3), i4._cloneInto(c7);
  return i4.destroy(), c7.destroy(), u4.fill(0), bt2.fill(0), s3.slice(0, r3);
}
var Rs = (e2, t, n5, r3, o7) => $s(e2, Ts(e2, t, n5), r3, o7);
function Ps(e2, t, n5, r3) {
  if (typeof e2.setBigUint64 == "function") return e2.setBigUint64(t, n5, r3);
  const o7 = BigInt(32), s3 = BigInt(4294967295), i4 = Number(n5 >> o7 & s3), c7 = Number(n5 & s3), u4 = r3 ? 4 : 0, a3 = r3 ? 0 : 4;
  e2.setUint32(t + u4, i4, r3), e2.setUint32(t + a3, c7, r3);
}
function Bs(e2, t, n5) {
  return e2 & t ^ ~e2 & n5;
}
function Ls(e2, t, n5) {
  return e2 & t ^ e2 & n5 ^ t & n5;
}
var js = class extends it2 {
  constructor(t, n5, r3, o7) {
    super(), this.blockLen = t, this.outputLen = n5, this.padOffset = r3, this.isLE = o7, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(t), this.view = st(this.buffer);
  }
  update(t) {
    me2(this);
    const { view: n5, buffer: r3, blockLen: o7 } = this;
    t = we2(t);
    const s3 = t.length;
    for (let i4 = 0; i4 < s3; ) {
      const c7 = Math.min(o7 - this.pos, s3 - i4);
      if (c7 === o7) {
        const u4 = st(t);
        for (; o7 <= s3 - i4; i4 += o7) this.process(u4, i4);
        continue;
      }
      r3.set(t.subarray(i4, i4 + c7), this.pos), this.pos += c7, i4 += c7, this.pos === o7 && (this.process(n5, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    me2(this), sn2(t, this), this.finished = true;
    const { buffer: n5, view: r3, blockLen: o7, isLE: s3 } = this;
    let { pos: i4 } = this;
    n5[i4++] = 128, this.buffer.subarray(i4).fill(0), this.padOffset > o7 - i4 && (this.process(r3, 0), i4 = 0);
    for (let f6 = i4; f6 < o7; f6++) n5[f6] = 0;
    Ps(r3, o7 - 8, BigInt(this.length * 8), s3), this.process(r3, 0);
    const c7 = st(t), u4 = this.outputLen;
    if (u4 % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const a3 = u4 / 4, l7 = this.get();
    if (a3 > l7.length) throw new Error("_sha2: outputLen bigger than state");
    for (let f6 = 0; f6 < a3; f6++) c7.setUint32(4 * f6, l7[f6], s3);
  }
  digest() {
    const { buffer: t, outputLen: n5 } = this;
    this.digestInto(t);
    const r3 = t.slice(0, n5);
    return this.destroy(), r3;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n5, buffer: r3, length: o7, finished: s3, destroyed: i4, pos: c7 } = this;
    return t.length = o7, t.pos = c7, t.finished = s3, t.destroyed = i4, o7 % n5 && t.buffer.set(r3), t;
  }
};
var Cs = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
var ie = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
var ce = new Uint32Array(64);
var ks = class extends js {
  constructor() {
    super(64, 32, 8, false), this.A = ie[0] | 0, this.B = ie[1] | 0, this.C = ie[2] | 0, this.D = ie[3] | 0, this.E = ie[4] | 0, this.F = ie[5] | 0, this.G = ie[6] | 0, this.H = ie[7] | 0;
  }
  get() {
    const { A: t, B: n5, C: r3, D: o7, E: s3, F: i4, G: c7, H: u4 } = this;
    return [t, n5, r3, o7, s3, i4, c7, u4];
  }
  set(t, n5, r3, o7, s3, i4, c7, u4) {
    this.A = t | 0, this.B = n5 | 0, this.C = r3 | 0, this.D = o7 | 0, this.E = s3 | 0, this.F = i4 | 0, this.G = c7 | 0, this.H = u4 | 0;
  }
  process(t, n5) {
    for (let f6 = 0; f6 < 16; f6++, n5 += 4) ce[f6] = t.getUint32(n5, false);
    for (let f6 = 16; f6 < 64; f6++) {
      const d6 = ce[f6 - 15], g6 = ce[f6 - 2], y7 = J2(d6, 7) ^ J2(d6, 18) ^ d6 >>> 3, h5 = J2(g6, 17) ^ J2(g6, 19) ^ g6 >>> 10;
      ce[f6] = h5 + ce[f6 - 7] + y7 + ce[f6 - 16] | 0;
    }
    let { A: r3, B: o7, C: s3, D: i4, E: c7, F: u4, G: a3, H: l7 } = this;
    for (let f6 = 0; f6 < 64; f6++) {
      const d6 = J2(c7, 6) ^ J2(c7, 11) ^ J2(c7, 25), g6 = l7 + d6 + Bs(c7, u4, a3) + Cs[f6] + ce[f6] | 0, h5 = (J2(r3, 2) ^ J2(r3, 13) ^ J2(r3, 22)) + Ls(r3, o7, s3) | 0;
      l7 = a3, a3 = u4, u4 = c7, c7 = i4 + g6 | 0, i4 = s3, s3 = o7, o7 = r3, r3 = g6 + h5 | 0;
    }
    r3 = r3 + this.A | 0, o7 = o7 + this.B | 0, s3 = s3 + this.C | 0, i4 = i4 + this.D | 0, c7 = c7 + this.E | 0, u4 = u4 + this.F | 0, a3 = a3 + this.G | 0, l7 = l7 + this.H | 0, this.set(r3, o7, s3, i4, c7, u4, a3, l7);
  }
  roundClean() {
    ce.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
var He2 = fn(() => new ks());
var Wn2 = BigInt(0);
function wt2(e2) {
  return e2 instanceof Uint8Array || ArrayBuffer.isView(e2) && e2.constructor.name === "Uint8Array";
}
function zn2(e2) {
  if (!wt2(e2)) throw new Error("Uint8Array expected");
}
var Ds = Array.from({ length: 256 }, (e2, t) => t.toString(16).padStart(2, "0"));
function Ms(e2) {
  zn2(e2);
  let t = "";
  for (let n5 = 0; n5 < e2.length; n5++) t += Ds[e2[n5]];
  return t;
}
function Vs(e2) {
  if (typeof e2 != "string") throw new Error("hex string expected, got " + typeof e2);
  return e2 === "" ? Wn2 : BigInt("0x" + e2);
}
var ee = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Jn2(e2) {
  if (e2 >= ee._0 && e2 <= ee._9) return e2 - ee._0;
  if (e2 >= ee.A && e2 <= ee.F) return e2 - (ee.A - 10);
  if (e2 >= ee.a && e2 <= ee.f) return e2 - (ee.a - 10);
}
function Yn2(e2) {
  if (typeof e2 != "string") throw new Error("hex string expected, got " + typeof e2);
  const t = e2.length, n5 = t / 2;
  if (t % 2) throw new Error("hex string expected, got unpadded hex of length " + t);
  const r3 = new Uint8Array(n5);
  for (let o7 = 0, s3 = 0; o7 < n5; o7++, s3 += 2) {
    const i4 = Jn2(e2.charCodeAt(s3)), c7 = Jn2(e2.charCodeAt(s3 + 1));
    if (i4 === void 0 || c7 === void 0) {
      const u4 = e2[s3] + e2[s3 + 1];
      throw new Error('hex string expected, got non-hex character "' + u4 + '" at index ' + s3);
    }
    r3[o7] = i4 * 16 + c7;
  }
  return r3;
}
function Xn2(e2) {
  return zn2(e2), Vs(Ms(Uint8Array.from(e2).reverse()));
}
function Hs(e2, t) {
  return Yn2(e2.toString(16).padStart(t * 2, "0"));
}
function Ks(e2, t) {
  return Hs(e2, t).reverse();
}
function Zn2(e2, t, n5) {
  let r3;
  if (typeof t == "string") try {
    r3 = Yn2(t);
  } catch (s3) {
    throw new Error(e2 + " must be hex string or Uint8Array, cause: " + s3);
  }
  else if (wt2(t)) r3 = Uint8Array.from(t);
  else throw new Error(e2 + " must be hex string or Uint8Array");
  const o7 = r3.length;
  if (typeof n5 == "number" && o7 !== n5) throw new Error(e2 + " of length " + n5 + " expected, got " + o7);
  return r3;
}
var Et2 = (e2) => typeof e2 == "bigint" && Wn2 <= e2;
function Fs(e2, t, n5) {
  return Et2(e2) && Et2(t) && Et2(n5) && t <= e2 && e2 < n5;
}
function Qn2(e2, t, n5, r3) {
  if (!Fs(t, n5, r3)) throw new Error("expected valid " + e2 + ": " + n5 + " <= n < " + r3 + ", got " + t);
}
var qs = { bigint: (e2) => typeof e2 == "bigint", function: (e2) => typeof e2 == "function", boolean: (e2) => typeof e2 == "boolean", string: (e2) => typeof e2 == "string", stringOrUint8Array: (e2) => typeof e2 == "string" || wt2(e2), isSafeInteger: (e2) => Number.isSafeInteger(e2), array: (e2) => Array.isArray(e2), field: (e2, t) => t.Fp.isValid(e2), hash: (e2) => typeof e2 == "function" && Number.isSafeInteger(e2.outputLen) };
function Gs(e2, t, n5 = {}) {
  const r3 = (o7, s3, i4) => {
    const c7 = qs[s3];
    if (typeof c7 != "function") throw new Error("invalid validator function");
    const u4 = e2[o7];
    if (!(i4 && u4 === void 0) && !c7(u4, e2)) throw new Error("param " + String(o7) + " is invalid. Expected " + s3 + ", got " + u4);
  };
  for (const [o7, s3] of Object.entries(t)) r3(o7, s3, false);
  for (const [o7, s3] of Object.entries(n5)) r3(o7, s3, true);
  return e2;
}
var ve2 = BigInt(0);
var Ke2 = BigInt(1);
function er2(e2, t) {
  const n5 = e2 % t;
  return n5 >= ve2 ? n5 : t + n5;
}
function Ws(e2, t, n5) {
  if (t < ve2) throw new Error("invalid exponent, negatives unsupported");
  if (n5 <= ve2) throw new Error("invalid modulus");
  if (n5 === Ke2) return ve2;
  let r3 = Ke2;
  for (; t > ve2; ) t & Ke2 && (r3 = r3 * e2 % n5), e2 = e2 * e2 % n5, t >>= Ke2;
  return r3;
}
function z(e2, t, n5) {
  let r3 = e2;
  for (; t-- > ve2; ) r3 *= r3, r3 %= n5;
  return r3;
}
BigInt(0), BigInt(1), BigInt(0), BigInt(1), BigInt(2), BigInt(8);
var xe2 = BigInt(0);
var vt2 = BigInt(1);
function zs(e2) {
  return Gs(e2, { a: "bigint" }, { montgomeryBits: "isSafeInteger", nByteLength: "isSafeInteger", adjustScalarBytes: "function", domain: "function", powPminus2: "function", Gu: "bigint" }), Object.freeze({ ...e2 });
}
function Js(e2) {
  const t = zs(e2), { P: n5 } = t, r3 = (b6) => er2(b6, n5), o7 = t.montgomeryBits, s3 = Math.ceil(o7 / 8), i4 = t.nByteLength, c7 = t.adjustScalarBytes || ((b6) => b6), u4 = t.powPminus2 || ((b6) => Ws(b6, n5 - BigInt(2), n5));
  function a3(b6, _5, O8) {
    const k7 = r3(b6 * (_5 - O8));
    return _5 = r3(_5 - k7), O8 = r3(O8 + k7), [_5, O8];
  }
  const l7 = (t.a - BigInt(2)) / BigInt(4);
  function f6(b6, _5) {
    Qn2("u", b6, xe2, n5), Qn2("scalar", _5, xe2, n5);
    const O8 = _5, k7 = b6;
    let E7 = vt2, B4 = xe2, j5 = b6, v8 = vt2, I4 = xe2, w7;
    for (let A5 = BigInt(o7 - 1); A5 >= xe2; A5--) {
      const T5 = O8 >> A5 & vt2;
      I4 ^= T5, w7 = a3(I4, E7, j5), E7 = w7[0], j5 = w7[1], w7 = a3(I4, B4, v8), B4 = w7[0], v8 = w7[1], I4 = T5;
      const N14 = E7 + B4, S5 = r3(N14 * N14), U4 = E7 - B4, $5 = r3(U4 * U4), p6 = S5 - $5, C7 = j5 + v8, D4 = j5 - v8, P7 = r3(D4 * N14), G4 = r3(C7 * U4), X = P7 + G4, Z2 = P7 - G4;
      j5 = r3(X * X), v8 = r3(k7 * r3(Z2 * Z2)), E7 = r3(S5 * $5), B4 = r3(p6 * (S5 + r3(l7 * p6)));
    }
    w7 = a3(I4, E7, j5), E7 = w7[0], j5 = w7[1], w7 = a3(I4, B4, v8), B4 = w7[0], v8 = w7[1];
    const R3 = u4(B4);
    return r3(E7 * R3);
  }
  function d6(b6) {
    return Ks(r3(b6), s3);
  }
  function g6(b6) {
    const _5 = Zn2("u coordinate", b6, s3);
    return i4 === 32 && (_5[31] &= 127), Xn2(_5);
  }
  function y7(b6) {
    const _5 = Zn2("scalar", b6), O8 = _5.length;
    if (O8 !== s3 && O8 !== i4) {
      let k7 = "" + s3 + " or " + i4;
      throw new Error("invalid scalar, expected " + k7 + " bytes, got " + O8);
    }
    return Xn2(c7(_5));
  }
  function h5(b6, _5) {
    const O8 = g6(_5), k7 = y7(b6), E7 = f6(O8, k7);
    if (E7 === xe2) throw new Error("invalid private or public key received");
    return d6(E7);
  }
  const m5 = d6(t.Gu);
  function L6(b6) {
    return h5(b6, m5);
  }
  return { scalarMult: h5, scalarMultBase: L6, getSharedSecret: (b6, _5) => h5(b6, _5), getPublicKey: (b6) => L6(b6), utils: { randomPrivateKey: () => t.randomBytes(t.nByteLength) }, GuBytes: m5 };
}
var xt2 = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
BigInt(0);
var Ys = BigInt(1);
var tr2 = BigInt(2);
var Xs = BigInt(3);
var Zs = BigInt(5);
BigInt(8);
function Qs(e2) {
  const t = BigInt(10), n5 = BigInt(20), r3 = BigInt(40), o7 = BigInt(80), s3 = xt2, c7 = e2 * e2 % s3 * e2 % s3, u4 = z(c7, tr2, s3) * c7 % s3, a3 = z(u4, Ys, s3) * e2 % s3, l7 = z(a3, Zs, s3) * a3 % s3, f6 = z(l7, t, s3) * l7 % s3, d6 = z(f6, n5, s3) * f6 % s3, g6 = z(d6, r3, s3) * d6 % s3, y7 = z(g6, o7, s3) * g6 % s3, h5 = z(y7, o7, s3) * g6 % s3, m5 = z(h5, t, s3) * l7 % s3;
  return { pow_p_5_8: z(m5, tr2, s3) * e2 % s3, b2: c7 };
}
function ei(e2) {
  return e2[0] &= 248, e2[31] &= 127, e2[31] |= 64, e2;
}
var It2 = Js({ P: xt2, a: BigInt(486662), montgomeryBits: 255, nByteLength: 32, Gu: BigInt(9), powPminus2: (e2) => {
  const t = xt2, { pow_p_5_8: n5, b2: r3 } = Qs(e2);
  return er2(z(n5, Xs, t) * r3, t);
}, adjustScalarBytes: ei, randomBytes: Se2 });
var Ot2 = "base10";
var V = "base16";
var At = "base64pad";
var ti = "base64url";
var Ie2 = "utf8";
var Nt2 = 0;
var Oe2 = 1;
var _e2 = 2;
var ni = 0;
var nr2 = 1;
var Te2 = 12;
var St2 = 32;
function ri() {
  const e2 = It2.utils.randomPrivateKey(), t = It2.getPublicKey(e2);
  return { privateKey: toString3(e2, V), publicKey: toString3(t, V) };
}
function oi() {
  const e2 = Se2(St2);
  return toString3(e2, V);
}
function si(e2, t) {
  const n5 = It2.getSharedSecret(fromString4(e2, V), fromString4(t, V)), r3 = Rs(He2, n5, void 0, void 0, St2);
  return toString3(r3, V);
}
function ii(e2) {
  const t = He2(fromString4(e2, V));
  return toString3(t, V);
}
function ci(e2) {
  const t = He2(fromString4(e2, Ie2));
  return toString3(t, V);
}
function Ut2(e2) {
  return fromString4(`${e2}`, Ot2);
}
function fe2(e2) {
  return Number(toString3(e2, Ot2));
}
function ai(e2) {
  const t = Ut2(typeof e2.type < "u" ? e2.type : Nt2);
  if (fe2(t) === Oe2 && typeof e2.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const n5 = typeof e2.senderPublicKey < "u" ? fromString4(e2.senderPublicKey, V) : void 0, r3 = typeof e2.iv < "u" ? fromString4(e2.iv, V) : Se2(Te2), o7 = fromString4(e2.symKey, V), s3 = Fn2(o7, r3).encrypt(fromString4(e2.message, Ie2));
  return _t2({ type: t, sealed: s3, iv: r3, senderPublicKey: n5, encoding: e2.encoding });
}
function ui(e2) {
  const t = fromString4(e2.symKey, V), { sealed: n5, iv: r3 } = Fe(e2), o7 = Fn2(t, r3).decrypt(n5);
  if (o7 === null) throw new Error("Failed to decrypt");
  return toString3(o7, Ie2);
}
function fi(e2, t) {
  const n5 = Ut2(_e2), r3 = Se2(Te2), o7 = fromString4(e2, Ie2);
  return _t2({ type: n5, sealed: o7, iv: r3, encoding: t });
}
function li(e2, t) {
  const { sealed: n5 } = Fe({ encoded: e2, encoding: t });
  return toString3(n5, Ie2);
}
function _t2(e2) {
  const { encoding: t = At } = e2;
  if (fe2(e2.type) === _e2) return toString3(concat3([e2.type, e2.sealed]), t);
  if (fe2(e2.type) === Oe2) {
    if (typeof e2.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return toString3(concat3([e2.type, e2.senderPublicKey, e2.iv, e2.sealed]), t);
  }
  return toString3(concat3([e2.type, e2.iv, e2.sealed]), t);
}
function Fe(e2) {
  const { encoded: t, encoding: n5 = At } = e2, r3 = fromString4(t, n5), o7 = r3.slice(ni, nr2), s3 = nr2;
  if (fe2(o7) === Oe2) {
    const a3 = s3 + St2, l7 = a3 + Te2, f6 = r3.slice(s3, a3), d6 = r3.slice(a3, l7), g6 = r3.slice(l7);
    return { type: o7, sealed: g6, iv: d6, senderPublicKey: f6 };
  }
  if (fe2(o7) === _e2) {
    const a3 = r3.slice(s3), l7 = Se2(Te2);
    return { type: o7, sealed: a3, iv: l7 };
  }
  const i4 = s3 + Te2, c7 = r3.slice(s3, i4), u4 = r3.slice(i4);
  return { type: o7, sealed: u4, iv: c7 };
}
function di(e2, t) {
  const n5 = Fe({ encoded: e2, encoding: t == null ? void 0 : t.encoding });
  return rr2({ type: fe2(n5.type), senderPublicKey: typeof n5.senderPublicKey < "u" ? toString3(n5.senderPublicKey, V) : void 0, receiverPublicKey: t == null ? void 0 : t.receiverPublicKey });
}
function rr2(e2) {
  const t = (e2 == null ? void 0 : e2.type) || Nt2;
  if (t === Oe2) {
    if (typeof (e2 == null ? void 0 : e2.senderPublicKey) > "u") throw new Error("missing sender public key");
    if (typeof (e2 == null ? void 0 : e2.receiverPublicKey) > "u") throw new Error("missing receiver public key");
  }
  return { type: t, senderPublicKey: e2 == null ? void 0 : e2.senderPublicKey, receiverPublicKey: e2 == null ? void 0 : e2.receiverPublicKey };
}
function hi(e2) {
  return e2.type === Oe2 && typeof e2.senderPublicKey == "string" && typeof e2.receiverPublicKey == "string";
}
function pi(e2) {
  return e2.type === _e2;
}
function or3(e2) {
  return new import_elliptic.ec("p256").keyFromPublic({ x: Buffer.from(e2.x, "base64").toString("hex"), y: Buffer.from(e2.y, "base64").toString("hex") }, "hex");
}
function gi(e2) {
  let t = e2.replace(/-/g, "+").replace(/_/g, "/");
  const n5 = t.length % 4;
  return n5 > 0 && (t += "=".repeat(4 - n5)), t;
}
function yi(e2) {
  return Buffer.from(gi(e2), "base64");
}
function mi(e2, t) {
  const [n5, r3, o7] = e2.split("."), s3 = yi(o7);
  if (s3.length !== 64) throw new Error("Invalid signature length");
  const i4 = s3.slice(0, 32).toString("hex"), c7 = s3.slice(32, 64).toString("hex"), u4 = `${n5}.${r3}`, a3 = He2(u4), l7 = or3(t), f6 = toString3(a3, V);
  if (!l7.verify(f6, { r: i4, s: c7 })) throw new Error("Invalid signature");
  return sn(e2).payload;
}
var sr2 = "irn";
function bi(e2) {
  return (e2 == null ? void 0 : e2.relay) || { protocol: sr2 };
}
function wi(e2) {
  const t = C[e2];
  if (typeof t > "u") throw new Error(`Relay Protocol not supported: ${e2}`);
  return t;
}
function ir2(e2, t = "-") {
  const n5 = {}, r3 = "relay" + t;
  return Object.keys(e2).forEach((o7) => {
    if (o7.startsWith(r3)) {
      const s3 = o7.replace(r3, ""), i4 = e2[o7];
      n5[s3] = i4;
    }
  }), n5;
}
function Ei(e2) {
  if (!e2.includes("wc:")) {
    const a3 = rt2(e2);
    a3 != null && a3.includes("wc:") && (e2 = a3);
  }
  e2 = e2.includes("wc://") ? e2.replace("wc://", "") : e2, e2 = e2.includes("wc:") ? e2.replace("wc:", "") : e2;
  const t = e2.indexOf(":"), n5 = e2.indexOf("?") !== -1 ? e2.indexOf("?") : void 0, r3 = e2.substring(0, t), o7 = e2.substring(t + 1, n5).split("@"), s3 = typeof n5 < "u" ? e2.substring(n5) : "", i4 = new URLSearchParams(s3), c7 = {};
  i4.forEach((a3, l7) => {
    c7[l7] = a3;
  });
  const u4 = typeof c7.methods == "string" ? c7.methods.split(",") : void 0;
  return { protocol: r3, topic: cr2(o7[0]), version: parseInt(o7[1], 10), symKey: c7.symKey, relay: ir2(c7), methods: u4, expiryTimestamp: c7.expiryTimestamp ? parseInt(c7.expiryTimestamp, 10) : void 0 };
}
function cr2(e2) {
  return e2.startsWith("//") ? e2.substring(2) : e2;
}
function ar2(e2, t = "-") {
  const n5 = "relay", r3 = {};
  return Object.keys(e2).forEach((o7) => {
    const s3 = o7, i4 = n5 + t + s3;
    e2[s3] && (r3[i4] = e2[s3]);
  }), r3;
}
function vi(e2) {
  const t = new URLSearchParams(), n5 = ar2(e2.relay);
  Object.keys(n5).sort().forEach((o7) => {
    t.set(o7, n5[o7]);
  }), t.set("symKey", e2.symKey), e2.expiryTimestamp && t.set("expiryTimestamp", e2.expiryTimestamp.toString()), e2.methods && t.set("methods", e2.methods.join(","));
  const r3 = t.toString();
  return `${e2.protocol}:${e2.topic}@${e2.version}?${r3}`;
}
function xi(e2, t, n5) {
  return `${e2}?wc_ev=${n5}&topic=${t}`;
}
function le2(e2) {
  const t = [];
  return e2.forEach((n5) => {
    const [r3, o7] = n5.split(":");
    t.push(`${r3}:${o7}`);
  }), t;
}
function lr2(e2) {
  const t = [];
  return Object.values(e2).forEach((n5) => {
    t.push(...le2(n5.accounts));
  }), t;
}
function dr2(e2, t) {
  const n5 = [];
  return Object.values(e2).forEach((r3) => {
    le2(r3.accounts).includes(t) && n5.push(...r3.methods);
  }), n5;
}
function hr2(e2, t) {
  const n5 = [];
  return Object.values(e2).forEach((r3) => {
    le2(r3.accounts).includes(t) && n5.push(...r3.events);
  }), n5;
}
function Tt2(e2) {
  return e2.includes(":");
}
function pr2(e2) {
  return Tt2(e2) ? e2.split(":")[0] : e2;
}
function gr2(e2) {
  const t = {};
  return e2 == null ? void 0 : e2.forEach((n5) => {
    var r3;
    const [o7, s3] = n5.split(":");
    t[o7] || (t[o7] = { accounts: [], chains: [], events: [], methods: [] }), t[o7].accounts.push(n5), (r3 = t[o7].chains) == null || r3.push(`${o7}:${s3}`);
  }), t;
}
function Ri(e2, t) {
  t = t.map((r3) => r3.replace("did:pkh:", ""));
  const n5 = gr2(t);
  for (const [r3, o7] of Object.entries(n5)) o7.methods ? o7.methods = Q2(o7.methods, e2) : o7.methods = e2, o7.events = ["chainChanged", "accountsChanged"];
  return n5;
}
var yr2 = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } };
var mr2 = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function te2(e2, t) {
  const { message: n5, code: r3 } = mr2[e2];
  return { message: t ? `${n5} ${t}` : n5, code: r3 };
}
function de2(e2, t) {
  const { message: n5, code: r3 } = yr2[e2];
  return { message: t ? `${n5} ${t}` : n5, code: r3 };
}
function $e2(e2, t) {
  return Array.isArray(e2) ? typeof t < "u" && e2.length ? e2.every(t) : true : false;
}
function qe2(e2) {
  return Object.getPrototypeOf(e2) === Object.prototype && Object.keys(e2).length;
}
function ae(e2) {
  return typeof e2 > "u";
}
function q(e2, t) {
  return t && ae(e2) ? true : typeof e2 == "string" && !!e2.trim().length;
}
function Ge2(e2, t) {
  return t && ae(e2) ? true : typeof e2 == "number" && !isNaN(e2);
}
function Pi(e2, t) {
  const { requiredNamespaces: n5 } = t, r3 = Object.keys(e2.namespaces), o7 = Object.keys(n5);
  let s3 = true;
  return re(o7, r3) ? (r3.forEach((i4) => {
    const { accounts: c7, methods: u4, events: a3 } = e2.namespaces[i4], l7 = le2(c7), f6 = n5[i4];
    (!re(Be2(i4, f6), l7) || !re(f6.methods, u4) || !re(f6.events, a3)) && (s3 = false);
  }), s3) : false;
}
function Re2(e2) {
  return q(e2, false) && e2.includes(":") ? e2.split(":").length === 2 : false;
}
function br2(e2) {
  if (q(e2, false) && e2.includes(":")) {
    const t = e2.split(":");
    if (t.length === 3) {
      const n5 = t[0] + ":" + t[1];
      return !!t[2] && Re2(n5);
    }
  }
  return false;
}
function Bi(e2) {
  function t(n5) {
    try {
      return typeof new URL(n5) < "u";
    } catch {
      return false;
    }
  }
  try {
    if (q(e2, false)) {
      if (t(e2)) return true;
      const n5 = rt2(e2);
      return t(n5);
    }
  } catch {
  }
  return false;
}
function Li(e2) {
  var t;
  return (t = e2 == null ? void 0 : e2.proposer) == null ? void 0 : t.publicKey;
}
function ji(e2) {
  return e2 == null ? void 0 : e2.topic;
}
function Ci(e2, t) {
  let n5 = null;
  return q(e2 == null ? void 0 : e2.publicKey, false) || (n5 = te2("MISSING_OR_INVALID", `${t} controller public key should be a string`)), n5;
}
function Rt2(e2) {
  let t = true;
  return $e2(e2) ? e2.length && (t = e2.every((n5) => q(n5, false))) : t = false, t;
}
function wr2(e2, t, n5) {
  let r3 = null;
  return $e2(t) && t.length ? t.forEach((o7) => {
    r3 || Re2(o7) || (r3 = de2("UNSUPPORTED_CHAINS", `${n5}, chain ${o7} should be a string and conform to "namespace:chainId" format`));
  }) : Re2(e2) || (r3 = de2("UNSUPPORTED_CHAINS", `${n5}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r3;
}
function Er2(e2, t, n5) {
  let r3 = null;
  return Object.entries(e2).forEach(([o7, s3]) => {
    if (r3) return;
    const i4 = wr2(o7, Be2(o7, s3), `${t} ${n5}`);
    i4 && (r3 = i4);
  }), r3;
}
function vr2(e2, t) {
  let n5 = null;
  return $e2(e2) ? e2.forEach((r3) => {
    n5 || br2(r3) || (n5 = de2("UNSUPPORTED_ACCOUNTS", `${t}, account ${r3} should be a string and conform to "namespace:chainId:address" format`));
  }) : n5 = de2("UNSUPPORTED_ACCOUNTS", `${t}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), n5;
}
function xr2(e2, t) {
  let n5 = null;
  return Object.values(e2).forEach((r3) => {
    if (n5) return;
    const o7 = vr2(r3 == null ? void 0 : r3.accounts, `${t} namespace`);
    o7 && (n5 = o7);
  }), n5;
}
function Ir2(e2, t) {
  let n5 = null;
  return Rt2(e2 == null ? void 0 : e2.methods) ? Rt2(e2 == null ? void 0 : e2.events) || (n5 = de2("UNSUPPORTED_EVENTS", `${t}, events should be an array of strings or empty array for no events`)) : n5 = de2("UNSUPPORTED_METHODS", `${t}, methods should be an array of strings or empty array for no methods`), n5;
}
function Pt2(e2, t) {
  let n5 = null;
  return Object.values(e2).forEach((r3) => {
    if (n5) return;
    const o7 = Ir2(r3, `${t}, namespace`);
    o7 && (n5 = o7);
  }), n5;
}
function ki(e2, t, n5) {
  let r3 = null;
  if (e2 && qe2(e2)) {
    const o7 = Pt2(e2, t);
    o7 && (r3 = o7);
    const s3 = Er2(e2, t, n5);
    s3 && (r3 = s3);
  } else r3 = te2("MISSING_OR_INVALID", `${t}, ${n5} should be an object with data`);
  return r3;
}
function Or2(e2, t) {
  let n5 = null;
  if (e2 && qe2(e2)) {
    const r3 = Pt2(e2, t);
    r3 && (n5 = r3);
    const o7 = xr2(e2, t);
    o7 && (n5 = o7);
  } else n5 = te2("MISSING_OR_INVALID", `${t}, namespaces should be an object with data`);
  return n5;
}
function Ar2(e2) {
  return q(e2.protocol, true);
}
function Di(e2, t) {
  let n5 = false;
  return t && !e2 ? n5 = true : e2 && $e2(e2) && e2.length && e2.forEach((r3) => {
    n5 = Ar2(r3);
  }), n5;
}
function Mi(e2) {
  return typeof e2 == "number";
}
function Vi(e2) {
  return typeof e2 < "u" && typeof e2 !== null;
}
function Hi(e2) {
  return !(!e2 || typeof e2 != "object" || !e2.code || !Ge2(e2.code, false) || !e2.message || !q(e2.message, false));
}
function Ki(e2) {
  return !(ae(e2) || !q(e2.method, false));
}
function Fi(e2) {
  return !(ae(e2) || ae(e2.result) && ae(e2.error) || !Ge2(e2.id, false) || !q(e2.jsonrpc, false));
}
function qi(e2) {
  return !(ae(e2) || !q(e2.name, false));
}
function Gi(e2, t) {
  return !(!Re2(t) || !lr2(e2).includes(t));
}
function Wi(e2, t, n5) {
  return q(n5, false) ? dr2(e2, t).includes(n5) : false;
}
function zi(e2, t, n5) {
  return q(n5, false) ? hr2(e2, t).includes(n5) : false;
}
function Nr2(e2, t, n5) {
  let r3 = null;
  const o7 = Ji(e2), s3 = Yi(t), i4 = Object.keys(o7), c7 = Object.keys(s3), u4 = Sr2(Object.keys(e2)), a3 = Sr2(Object.keys(t)), l7 = u4.filter((f6) => !a3.includes(f6));
  return l7.length && (r3 = te2("NON_CONFORMING_NAMESPACES", `${n5} namespaces keys don't satisfy requiredNamespaces.
      Required: ${l7.toString()}
      Received: ${Object.keys(t).toString()}`)), re(i4, c7) || (r3 = te2("NON_CONFORMING_NAMESPACES", `${n5} namespaces chains don't satisfy required namespaces.
      Required: ${i4.toString()}
      Approved: ${c7.toString()}`)), Object.keys(t).forEach((f6) => {
    if (!f6.includes(":") || r3) return;
    const d6 = le2(t[f6].accounts);
    d6.includes(f6) || (r3 = te2("NON_CONFORMING_NAMESPACES", `${n5} namespaces accounts don't satisfy namespace accounts for ${f6}
        Required: ${f6}
        Approved: ${d6.toString()}`));
  }), i4.forEach((f6) => {
    r3 || (re(o7[f6].methods, s3[f6].methods) ? re(o7[f6].events, s3[f6].events) || (r3 = te2("NON_CONFORMING_NAMESPACES", `${n5} namespaces events don't satisfy namespace events for ${f6}`)) : r3 = te2("NON_CONFORMING_NAMESPACES", `${n5} namespaces methods don't satisfy namespace methods for ${f6}`));
  }), r3;
}
function Ji(e2) {
  const t = {};
  return Object.keys(e2).forEach((n5) => {
    var r3;
    n5.includes(":") ? t[n5] = e2[n5] : (r3 = e2[n5].chains) == null || r3.forEach((o7) => {
      t[o7] = { methods: e2[n5].methods, events: e2[n5].events };
    });
  }), t;
}
function Sr2(e2) {
  return [...new Set(e2.map((t) => t.includes(":") ? t.split(":")[0] : t))];
}
function Yi(e2) {
  const t = {};
  return Object.keys(e2).forEach((n5) => {
    if (n5.includes(":")) t[n5] = e2[n5];
    else {
      const r3 = le2(e2[n5].accounts);
      r3 == null ? void 0 : r3.forEach((o7) => {
        t[o7] = { accounts: e2[n5].accounts.filter((s3) => s3.includes(`${o7}:`)), methods: e2[n5].methods, events: e2[n5].events };
      });
    }
  }), t;
}
function Xi(e2, t) {
  return Ge2(e2, false) && e2 <= t.max && e2 >= t.min;
}
function Zi() {
  const e2 = ue();
  return new Promise((t) => {
    switch (e2) {
      case H2.browser:
        t(Ur2());
        break;
      case H2.reactNative:
        t(_r2());
        break;
      case H2.node:
        t(Tr2());
        break;
      default:
        t(true);
    }
  });
}
function Ur2() {
  return Ae2() && (navigator == null ? void 0 : navigator.onLine);
}
async function _r2() {
  if (ne() && typeof global < "u" && global != null && global.NetInfo) {
    const e2 = await (global == null ? void 0 : global.NetInfo.fetch());
    return e2 == null ? void 0 : e2.isConnected;
  }
  return true;
}
function Tr2() {
  return true;
}
function Qi(e2) {
  switch (ue()) {
    case H2.browser:
      $r2(e2);
      break;
    case H2.reactNative:
      Rr2(e2);
      break;
    case H2.node:
      break;
  }
}
function $r2(e2) {
  !ne() && Ae2() && (window.addEventListener("online", () => e2(true)), window.addEventListener("offline", () => e2(false)));
}
function Rr2(e2) {
  ne() && typeof global < "u" && global != null && global.NetInfo && (global == null ? void 0 : global.NetInfo.addEventListener((t) => e2(t == null ? void 0 : t.isConnected)));
}
var Bt2 = {};
var ec = class {
  static get(t) {
    return Bt2[t];
  }
  static set(t, n5) {
    Bt2[t] = n5;
  }
  static delete(t) {
    delete Bt2[t];
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_events7 = __toESM(require_events());

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var import_events = __toESM(require_events());
var import_time3 = __toESM(require_cjs());

// node_modules/@walletconnect/events/dist/esm/events.js
var IEvents = class {
};

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var n = class extends IEvents {
  constructor(e2) {
    super();
  }
};
var s = import_time3.FIVE_SECONDS;
var r = { pulse: "heartbeat_pulse" };
var i = class _i2 extends n {
  constructor(e2) {
    super(e2), this.events = new import_events.EventEmitter(), this.interval = s, this.interval = (e2 == null ? void 0 : e2.interval) || s;
  }
  static async init(e2) {
    const t = new _i2(e2);
    return await t.init(), t;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), (0, import_time3.toMiliseconds)(this.interval));
  }
  pulse() {
    this.events.emit(r.pulse);
  }
};

// node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

// node_modules/unstorage/dist/shared/unstorage.mNKHTF5Y.mjs
function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify3(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify3(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
var BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c7) => c7.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}
function normalizeKey(key) {
  var _a;
  if (!key) {
    return "";
  }
  return ((_a = key.split("?")[0]) == null ? void 0 : _a.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "")) || "";
}
function joinKeys(...keys2) {
  return normalizeKey(keys2.join(":"));
}
function normalizeBaseKey(base3) {
  base3 = normalizeKey(base3);
  return base3 ? base3 + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base3) {
  if (base3) {
    return key.startsWith(base3) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

// node_modules/unstorage/dist/index.mjs
function defineDriver(factory) {
  return factory;
}
var DRIVER_NAME = "memory";
var memory = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});
function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base3 of context.mountpoints) {
      if (key.startsWith(base3)) {
        return {
          base: base3,
          relativeKey: key.slice(base3.length),
          driver: context.mounts[base3]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base3, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base3) || includeParent && base3.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base3.length > mountpoint.length ? base3.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r3) => r3.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r3) => r3.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify3(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify3(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify3(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base3, opts = {}) {
      var _a;
      base3 = normalizeBaseKey(base3);
      const mounts = getMounts(base3, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!((_a = mount.driver.flags) == null ? void 0 : _a.maxDepth)) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey(key);
          if (!maskedMounts.some((p6) => fullKey.startsWith(p6))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p6) => !p6.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base3)
      );
    },
    // Utils
    async clear(base3, opts = {}) {
      base3 = normalizeBaseKey(base3);
      await Promise.all(
        getMounts(base3, false).map(async (m5) => {
          if (m5.driver.clear) {
            return asyncCall(m5.driver.clear, m5.relativeBase, opts);
          }
          if (m5.driver.removeItem) {
            const keys2 = await m5.driver.getKeys(m5.relativeBase || "", opts);
            return Promise.all(
              keys2.map((key) => m5.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base3, driver) {
      base3 = normalizeBaseKey(base3);
      if (base3 && context.mounts[base3]) {
        throw new Error(`already mounted at ${base3}`);
      }
      if (base3) {
        context.mountpoints.push(base3);
        context.mountpoints.sort((a3, b6) => b6.length - a3.length);
      }
      context.mounts[base3] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base3)).then((unwatcher) => {
          context.unwatch[base3] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base3, _dispose = true) {
      var _a, _b;
      base3 = normalizeBaseKey(base3);
      if (!base3 || !context.mounts[base3]) {
        return;
      }
      if (context.watching && base3 in context.unwatch) {
        (_b = (_a = context.unwatch)[base3]) == null ? void 0 : _b.call(_a);
        delete context.unwatch[base3];
      }
      if (_dispose) {
        await dispose(context.mounts[base3]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base3);
      delete context.mounts[base3];
    },
    getMount(key = "") {
      key = normalizeKey(key) + ":";
      const m5 = getMount(key);
      return {
        driver: m5.driver,
        base: m5.base
      };
    },
    getMounts(base3 = "", opts = {}) {
      base3 = normalizeKey(base3);
      const mounts = getMounts(base3, opts.parents);
      return mounts.map((m5) => ({
        driver: m5.driver,
        base: m5.mountpoint
      }));
    },
    // Aliases
    keys: (base3, opts = {}) => storage.getKeys(base3, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base3) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base3 + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

// node_modules/idb-keyval/dist/index.js
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
var defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
function clear(customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.clear();
    return promisifyRequest(store.transaction);
  });
}
function eachCursor(store, callback) {
  store.openCursor().onsuccess = function() {
    if (!this.result)
      return;
    callback(this.result);
    this.result.continue();
  };
  return promisifyRequest(store.transaction);
}
function keys(customStore = defaultGetStore()) {
  return customStore("readonly", (store) => {
    if (store.getAllKeys) {
      return promisifyRequest(store.getAllKeys());
    }
    const items = [];
    return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
  });
}

// node_modules/@walletconnect/keyvaluestorage/dist/index.es.js
var x3 = "idb-keyval";
var z2 = (i4 = {}) => {
  const t = i4.base && i4.base.length > 0 ? `${i4.base}:` : "", e2 = (s3) => t + s3;
  let n5;
  return i4.dbName && i4.storeName && (n5 = createStore(i4.dbName, i4.storeName)), { name: x3, options: i4, async hasItem(s3) {
    return !(typeof await get(e2(s3), n5) > "u");
  }, async getItem(s3) {
    return await get(e2(s3), n5) ?? null;
  }, setItem(s3, a3) {
    return set(e2(s3), a3, n5);
  }, removeItem(s3) {
    return del(e2(s3), n5);
  }, getKeys() {
    return keys(n5);
  }, clear() {
    return clear(n5);
  } };
};
var D = "WALLET_CONNECT_V2_INDEXED_DB";
var E = "keyvaluestorage";
var _ = class {
  constructor() {
    this.indexedDb = createStorage({ driver: z2({ dbName: D, storeName: E }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t) => [t.key, t.value]);
  }
  async getItem(t) {
    const e2 = await this.indexedDb.getItem(t);
    if (e2 !== null) return e2;
  }
  async setItem(t, e2) {
    await this.indexedDb.setItem(t, safeJsonStringify(e2));
  }
  async removeItem(t) {
    await this.indexedDb.removeItem(t);
  }
};
var l2 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var c = { exports: {} };
(function() {
  let i4;
  function t() {
  }
  i4 = t, i4.prototype.getItem = function(e2) {
    return this.hasOwnProperty(e2) ? String(this[e2]) : null;
  }, i4.prototype.setItem = function(e2, n5) {
    this[e2] = String(n5);
  }, i4.prototype.removeItem = function(e2) {
    delete this[e2];
  }, i4.prototype.clear = function() {
    const e2 = this;
    Object.keys(e2).forEach(function(n5) {
      e2[n5] = void 0, delete e2[n5];
    });
  }, i4.prototype.key = function(e2) {
    return e2 = e2 || 0, Object.keys(this)[e2];
  }, i4.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof l2 < "u" && l2.localStorage ? c.exports = l2.localStorage : typeof window < "u" && window.localStorage ? c.exports = window.localStorage : c.exports = new t();
})();
function k2(i4) {
  var t;
  return [i4[0], safeJsonParse((t = i4[1]) != null ? t : "")];
}
var K2 = class {
  constructor() {
    this.localStorage = c.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(k2);
  }
  async getItem(t) {
    const e2 = this.localStorage.getItem(t);
    if (e2 !== null) return safeJsonParse(e2);
  }
  async setItem(t, e2) {
    this.localStorage.setItem(t, safeJsonStringify(e2));
  }
  async removeItem(t) {
    this.localStorage.removeItem(t);
  }
};
var N10 = "wc_storage_version";
var y = 1;
var O = async (i4, t, e2) => {
  const n5 = N10, s3 = await t.getItem(n5);
  if (s3 && s3 >= y) {
    e2(t);
    return;
  }
  const a3 = await i4.getKeys();
  if (!a3.length) {
    e2(t);
    return;
  }
  const m5 = [];
  for (; a3.length; ) {
    const r3 = a3.shift();
    if (!r3) continue;
    const o7 = r3.toLowerCase();
    if (o7.includes("wc@") || o7.includes("walletconnect") || o7.includes("wc_") || o7.includes("wallet_connect")) {
      const f6 = await i4.getItem(r3);
      await t.setItem(r3, f6), m5.push(r3);
    }
  }
  await t.setItem(n5, y), e2(t), j2(i4, m5);
};
var j2 = async (i4, t) => {
  t.length && t.forEach(async (e2) => {
    await i4.removeItem(e2);
  });
};
var h = class {
  constructor() {
    this.initialized = false, this.setInitialized = (e2) => {
      this.storage = e2, this.initialized = true;
    };
    const t = new K2();
    this.storage = t;
    try {
      const e2 = new _();
      O(t, e2, this.setInitialized);
    } catch {
      this.initialized = true;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(t) {
    return await this.initialize(), this.storage.getItem(t);
  }
  async setItem(t, e2) {
    return await this.initialize(), this.storage.setItem(t, e2);
  }
  async removeItem(t) {
    return await this.initialize(), this.storage.removeItem(t);
  }
  async initialize() {
    this.initialized || await new Promise((t) => {
      const e2 = setInterval(() => {
        this.initialized && (clearInterval(e2), t());
      }, 20);
    });
  }
};

// node_modules/@walletconnect/logger/dist/index.es.js
var import_pino = __toESM(require_browser());
var import_pino2 = __toESM(require_browser());
var c2 = { level: "info" };
var n2 = "custom_context";
var l3 = 1e3 * 1024;
var O2 = class {
  constructor(e2) {
    this.nodeValue = e2, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
};
var d = class {
  constructor(e2) {
    this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e2, this.sizeInBytes = 0;
  }
  append(e2) {
    const t = new O2(e2);
    if (t.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${e2} with size ${t.size}`);
    for (; this.size + t.size > this.maxSizeInBytes; ) this.shift();
    this.head ? (this.tail && (this.tail.next = t), this.tail = t) : (this.head = t, this.tail = t), this.lengthInNodes++, this.sizeInBytes += t.size;
  }
  shift() {
    if (!this.head) return;
    const e2 = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e2.size;
  }
  toArray() {
    const e2 = [];
    let t = this.head;
    for (; t !== null; ) e2.push(t.value), t = t.next;
    return e2;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let e2 = this.head;
    return { next: () => {
      if (!e2) return { done: true, value: null };
      const t = e2.value;
      return e2 = e2.next, { done: false, value: t };
    } };
  }
};
var L = class {
  constructor(e2, t = l3) {
    this.level = e2 ?? "error", this.levelValue = import_pino.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e2, t) {
    t === import_pino.levels.values.error ? console.error(e2) : t === import_pino.levels.values.warn ? console.warn(e2) : t === import_pino.levels.values.debug ? console.debug(e2) : t === import_pino.levels.values.trace ? console.trace(e2) : console.log(e2);
  }
  appendToLogs(e2) {
    this.logs.append(safeJsonStringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e2 }));
    const t = typeof e2 == "string" ? JSON.parse(e2).level : e2.level;
    t >= this.levelValue && this.forwardToConsole(e2, t);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e2) {
    const t = this.getLogArray();
    return t.push(safeJsonStringify({ extraMetadata: e2 })), new Blob(t, { type: "application/json" });
  }
};
var m = class {
  constructor(e2, t = l3) {
    this.baseChunkLogger = new L(e2, t);
  }
  write(e2) {
    this.baseChunkLogger.appendToLogs(e2);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e2) {
    return this.baseChunkLogger.logsToBlob(e2);
  }
  downloadLogsBlobInBrowser(e2) {
    const t = URL.createObjectURL(this.logsToBlob(e2)), o7 = document.createElement("a");
    o7.href = t, o7.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(o7), o7.click(), document.body.removeChild(o7), URL.revokeObjectURL(t);
  }
};
var B = class {
  constructor(e2, t = l3) {
    this.baseChunkLogger = new L(e2, t);
  }
  write(e2) {
    this.baseChunkLogger.appendToLogs(e2);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e2) {
    return this.baseChunkLogger.logsToBlob(e2);
  }
};
var x4 = Object.defineProperty;
var S = Object.defineProperties;
var _2 = Object.getOwnPropertyDescriptors;
var p = Object.getOwnPropertySymbols;
var T = Object.prototype.hasOwnProperty;
var z3 = Object.prototype.propertyIsEnumerable;
var f = (r3, e2, t) => e2 in r3 ? x4(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var i2 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) T.call(e2, t) && f(r3, t, e2[t]);
  if (p) for (var t of p(e2)) z3.call(e2, t) && f(r3, t, e2[t]);
  return r3;
};
var g = (r3, e2) => S(r3, _2(e2));
function k3(r3) {
  return g(i2({}, r3), { level: (r3 == null ? void 0 : r3.level) || c2.level });
}
function v(r3, e2 = n2) {
  return r3[e2] || "";
}
function b(r3, e2, t = n2) {
  return r3[t] = e2, r3;
}
function y2(r3, e2 = n2) {
  let t = "";
  return typeof r3.bindings > "u" ? t = v(r3, e2) : t = r3.bindings().context || "", t;
}
function w(r3, e2, t = n2) {
  const o7 = y2(r3, t);
  return o7.trim() ? `${o7}/${e2}` : e2;
}
function E2(r3, e2, t = n2) {
  const o7 = w(r3, e2, t), a3 = r3.child({ context: o7 });
  return b(a3, o7, t);
}
function C2(r3) {
  var e2, t;
  const o7 = new m((e2 = r3.opts) == null ? void 0 : e2.level, r3.maxSizeInBytes);
  return { logger: (0, import_pino.default)(g(i2({}, r3.opts), { level: "trace", browser: g(i2({}, (t = r3.opts) == null ? void 0 : t.browser), { write: (a3) => o7.write(a3) }) })), chunkLoggerController: o7 };
}
function I(r3) {
  var e2;
  const t = new B((e2 = r3.opts) == null ? void 0 : e2.level, r3.maxSizeInBytes);
  return { logger: (0, import_pino.default)(g(i2({}, r3.opts), { level: "trace" }), t), chunkLoggerController: t };
}
function A(r3) {
  return typeof r3.loggerOverride < "u" && typeof r3.loggerOverride != "string" ? { logger: r3.loggerOverride, chunkLoggerController: null } : typeof window < "u" ? C2(r3) : I(r3);
}

// node_modules/@walletconnect/types/dist/index.es.js
var import_events4 = __toESM(require_events());
var a2 = Object.defineProperty;
var u = (e2, s3, r3) => s3 in e2 ? a2(e2, s3, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[s3] = r3;
var c3 = (e2, s3, r3) => u(e2, typeof s3 != "symbol" ? s3 + "" : s3, r3);
var h3 = class extends IEvents {
  constructor(s3) {
    super(), this.opts = s3, c3(this, "protocol", "wc"), c3(this, "version", 2);
  }
};
var p2 = Object.defineProperty;
var b2 = (e2, s3, r3) => s3 in e2 ? p2(e2, s3, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[s3] = r3;
var v2 = (e2, s3, r3) => b2(e2, typeof s3 != "symbol" ? s3 + "" : s3, r3);
var I2 = class extends IEvents {
  constructor(s3, r3) {
    super(), this.core = s3, this.logger = r3, v2(this, "records", /* @__PURE__ */ new Map());
  }
};
var y3 = class {
  constructor(s3, r3) {
    this.logger = s3, this.core = r3;
  }
};
var m2 = class extends IEvents {
  constructor(s3, r3) {
    super(), this.relayer = s3, this.logger = r3;
  }
};
var d2 = class extends IEvents {
  constructor(s3) {
    super();
  }
};
var f2 = class {
  constructor(s3, r3, t, q3) {
    this.core = s3, this.logger = r3, this.name = t;
  }
};
var P2 = class extends IEvents {
  constructor(s3, r3) {
    super(), this.relayer = s3, this.logger = r3;
  }
};
var S2 = class extends IEvents {
  constructor(s3, r3) {
    super(), this.core = s3, this.logger = r3;
  }
};
var M3 = class {
  constructor(s3, r3, t) {
    this.core = s3, this.logger = r3, this.store = t;
  }
};
var O3 = class {
  constructor(s3, r3) {
    this.projectId = s3, this.logger = r3;
  }
};
var R = class {
  constructor(s3, r3, t) {
    this.core = s3, this.logger = r3, this.telemetryEnabled = t;
  }
};
var T2 = Object.defineProperty;
var k4 = (e2, s3, r3) => s3 in e2 ? T2(e2, s3, { enumerable: true, configurable: true, writable: true, value: r3 }) : e2[s3] = r3;
var i3 = (e2, s3, r3) => k4(e2, typeof s3 != "symbol" ? s3 + "" : s3, r3);
var J3 = class {
  constructor(s3) {
    this.opts = s3, i3(this, "protocol", "wc"), i3(this, "version", 2);
  }
};
var V2 = class {
  constructor(s3) {
    this.client = s3;
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_time4 = __toESM(require_cjs());

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var import_events5 = __toESM(require_events());

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DEFAULT_ERROR: () => DEFAULT_ERROR,
  IBaseJsonRpcProvider: () => n4,
  IEvents: () => e,
  IJsonRpcConnection: () => o2,
  IJsonRpcProvider: () => r2,
  INTERNAL_ERROR: () => INTERNAL_ERROR,
  INVALID_PARAMS: () => INVALID_PARAMS,
  INVALID_REQUEST: () => INVALID_REQUEST,
  METHOD_NOT_FOUND: () => METHOD_NOT_FOUND,
  PARSE_ERROR: () => PARSE_ERROR,
  RESERVED_ERROR_CODES: () => RESERVED_ERROR_CODES,
  SERVER_ERROR: () => SERVER_ERROR,
  SERVER_ERROR_CODE_RANGE: () => SERVER_ERROR_CODE_RANGE,
  STANDARD_ERROR_MAP: () => STANDARD_ERROR_MAP,
  formatErrorMessage: () => formatErrorMessage,
  formatJsonRpcError: () => formatJsonRpcError,
  formatJsonRpcRequest: () => formatJsonRpcRequest,
  formatJsonRpcResult: () => formatJsonRpcResult,
  getBigIntRpcId: () => getBigIntRpcId,
  getError: () => getError,
  getErrorByCode: () => getErrorByCode,
  isHttpUrl: () => isHttpUrl,
  isJsonRpcError: () => isJsonRpcError,
  isJsonRpcPayload: () => isJsonRpcPayload,
  isJsonRpcRequest: () => isJsonRpcRequest,
  isJsonRpcResponse: () => isJsonRpcResponse,
  isJsonRpcResult: () => isJsonRpcResult,
  isJsonRpcValidationInvalid: () => isJsonRpcValidationInvalid,
  isLocalhostUrl: () => isLocalhostUrl,
  isNodeJs: () => isNodeJs,
  isReservedErrorCode: () => isReservedErrorCode,
  isServerErrorCode: () => isServerErrorCode,
  isValidDefaultRoute: () => isValidDefaultRoute,
  isValidErrorCode: () => isValidErrorCode,
  isValidLeadingWildcardRoute: () => isValidLeadingWildcardRoute,
  isValidRoute: () => isValidRoute,
  isValidTrailingWildcardRoute: () => isValidTrailingWildcardRoute,
  isValidWildcardRoute: () => isValidWildcardRoute,
  isWsUrl: () => isWsUrl,
  parseConnectionError: () => parseConnectionError,
  payloadId: () => payloadId,
  validateJsonRpcError: () => validateJsonRpcError
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js
var PARSE_ERROR = "PARSE_ERROR";
var INVALID_REQUEST = "INVALID_REQUEST";
var METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
var INVALID_PARAMS = "INVALID_PARAMS";
var INTERNAL_ERROR = "INTERNAL_ERROR";
var SERVER_ERROR = "SERVER_ERROR";
var RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
var SERVER_ERROR_CODE_RANGE = [-32e3, -32099];
var STANDARD_ERROR_MAP = {
  [PARSE_ERROR]: { code: -32700, message: "Parse error" },
  [INVALID_REQUEST]: { code: -32600, message: "Invalid Request" },
  [METHOD_NOT_FOUND]: { code: -32601, message: "Method not found" },
  [INVALID_PARAMS]: { code: -32602, message: "Invalid params" },
  [INTERNAL_ERROR]: { code: -32603, message: "Internal error" },
  [SERVER_ERROR]: { code: -32e3, message: "Server error" }
};
var DEFAULT_ERROR = SERVER_ERROR;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js
function isServerErrorCode(code2) {
  return code2 <= SERVER_ERROR_CODE_RANGE[0] && code2 >= SERVER_ERROR_CODE_RANGE[1];
}
function isReservedErrorCode(code2) {
  return RESERVED_ERROR_CODES.includes(code2);
}
function isValidErrorCode(code2) {
  return typeof code2 === "number";
}
function getError(type) {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return STANDARD_ERROR_MAP[type];
}
function getErrorByCode(code2) {
  const match = Object.values(STANDARD_ERROR_MAP).find((e2) => e2.code === code2);
  if (!match) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return match;
}
function validateJsonRpcError(response) {
  if (typeof response.error.code === "undefined") {
    return { valid: false, error: "Missing code for JSON-RPC error" };
  }
  if (typeof response.error.message === "undefined") {
    return { valid: false, error: "Missing message for JSON-RPC error" };
  }
  if (!isValidErrorCode(response.error.code)) {
    return {
      valid: false,
      error: `Invalid error code type for JSON-RPC: ${response.error.code}`
    };
  }
  if (isReservedErrorCode(response.error.code)) {
    const error = getErrorByCode(response.error.code);
    if (error.message !== STANDARD_ERROR_MAP[DEFAULT_ERROR].message && response.error.message === error.message) {
      return {
        valid: false,
        error: `Invalid error code message for JSON-RPC: ${response.error.code}`
      };
    }
  }
  return { valid: true };
}
function parseConnectionError(e2, url, type) {
  return e2.message.includes("getaddrinfo ENOTFOUND") || e2.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e2;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js
var env_exports = {};
__export(env_exports, {
  isNodeJs: () => isNodeJs
});
var import_environment = __toESM(require_cjs4());
__reExport(env_exports, __toESM(require_cjs4()));
var isNodeJs = import_environment.isNode;

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
__reExport(esm_exports, env_exports);

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js
function payloadId(entropy = 3) {
  const date = Date.now() * Math.pow(10, entropy);
  const extra = Math.floor(Math.random() * Math.pow(10, entropy));
  return date + extra;
}
function getBigIntRpcId(entropy = 6) {
  return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
  return {
    id: id || payloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
}
function formatJsonRpcResult(id, result) {
  return {
    id,
    jsonrpc: "2.0",
    result
  };
}
function formatJsonRpcError(id, error, data) {
  return {
    id,
    jsonrpc: "2.0",
    error: formatErrorMessage(error, data)
  };
}
function formatErrorMessage(error, data) {
  if (typeof error === "undefined") {
    return getError(INTERNAL_ERROR);
  }
  if (typeof error === "string") {
    error = Object.assign(Object.assign({}, getError(SERVER_ERROR)), { message: error });
  }
  if (typeof data !== "undefined") {
    error.data = data;
  }
  if (isReservedErrorCode(error.code)) {
    error = getErrorByCode(error.code);
  }
  return error;
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js
function isValidRoute(route) {
  if (route.includes("*")) {
    return isValidWildcardRoute(route);
  }
  if (/\W/g.test(route)) {
    return false;
  }
  return true;
}
function isValidDefaultRoute(route) {
  return route === "*";
}
function isValidWildcardRoute(route) {
  if (isValidDefaultRoute(route)) {
    return true;
  }
  if (!route.includes("*")) {
    return false;
  }
  if (route.split("*").length !== 2) {
    return false;
  }
  if (route.split("*").filter((x7) => x7.trim() === "").length !== 1) {
    return false;
  }
  return true;
}
function isValidLeadingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}

// node_modules/@walletconnect/jsonrpc-types/dist/index.es.js
var e = class {
};
var o2 = class extends e {
  constructor(c7) {
    super();
  }
};
var n4 = class extends e {
  constructor() {
    super();
  }
};
var r2 = class extends n4 {
  constructor(c7) {
    super();
  }
};

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js
var HTTP_REGEX = "^https?:";
var WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
  const matches = url.match(new RegExp(/^\w+:/, "gi"));
  if (!matches || !matches.length)
    return;
  return matches[0];
}
function matchRegexProtocol(url, regex) {
  const protocol = getUrlProtocol(url);
  if (typeof protocol === "undefined")
    return false;
  return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
  return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
  return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js
function isJsonRpcPayload(payload) {
  return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
  return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
  return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
  return "result" in payload;
}
function isJsonRpcError(payload) {
  return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
  return "error" in validation && validation.valid === false;
}

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var o3 = class extends r2 {
  constructor(t) {
    super(t), this.events = new import_events5.EventEmitter(), this.hasRegisteredEventListeners = false, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners();
  }
  async connect(t = this.connection) {
    await this.open(t);
  }
  async disconnect() {
    await this.close();
  }
  on(t, e2) {
    this.events.on(t, e2);
  }
  once(t, e2) {
    this.events.once(t, e2);
  }
  off(t, e2) {
    this.events.off(t, e2);
  }
  removeListener(t, e2) {
    this.events.removeListener(t, e2);
  }
  async request(t, e2) {
    return this.requestStrict(formatJsonRpcRequest(t.method, t.params || [], t.id || getBigIntRpcId().toString()), e2);
  }
  async requestStrict(t, e2) {
    return new Promise(async (i4, s3) => {
      if (!this.connection.connected) try {
        await this.open();
      } catch (n5) {
        s3(n5);
      }
      this.events.on(`${t.id}`, (n5) => {
        isJsonRpcError(n5) ? s3(n5.error) : i4(n5.result);
      });
      try {
        await this.connection.send(t, e2);
      } catch (n5) {
        s3(n5);
      }
    });
  }
  setConnection(t = this.connection) {
    return t;
  }
  onPayload(t) {
    this.events.emit("payload", t), isJsonRpcResponse(t) ? this.events.emit(`${t.id}`, t) : this.events.emit("message", { type: t.method, data: t.params });
  }
  onClose(t) {
    t && t.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason ? `(${t.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(t = this.connection) {
    this.connection === t && this.connection.connected || (this.connection.connected && this.close(), typeof t == "string" && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (t) => this.onPayload(t)), this.connection.on("close", (t) => this.onClose(t)), this.connection.on("error", (t) => this.events.emit("error", t)), this.connection.on("register_error", (t) => this.onClose()), this.hasRegisteredEventListeners = true);
  }
};

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js
var import_events6 = __toESM(require_events());
var v3 = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require_browser2();
var w2 = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u";
var d3 = (r3) => r3.split("?")[0];
var h4 = 10;
var b3 = v3();
var f3 = class {
  constructor(e2) {
    if (this.url = e2, this.events = new import_events6.EventEmitter(), this.registering = false, !isWsUrl(e2)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e2}`);
    this.url = e2;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async open(e2 = this.url) {
    await this.register(e2);
  }
  async close() {
    return new Promise((e2, t) => {
      if (typeof this.socket > "u") {
        t(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (n5) => {
        this.onClose(n5), e2();
      }, this.socket.close();
    });
  }
  async send(e2) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(safeJsonStringify(e2));
    } catch (t) {
      this.onError(e2.id, t);
    }
  }
  register(e2 = this.url) {
    if (!isWsUrl(e2)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e2}`);
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((n5, s3) => {
        this.events.once("register_error", (o7) => {
          this.resetMaxListeners(), s3(o7);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u") return s3(new Error("WebSocket connection is missing or invalid"));
          n5(this.socket);
        });
      });
    }
    return this.url = e2, this.registering = true, new Promise((t, n5) => {
      const s3 = (0, esm_exports.isReactNative)() ? void 0 : { rejectUnauthorized: !isLocalhostUrl(e2) }, o7 = new b3(e2, [], s3);
      w2() ? o7.onerror = (i4) => {
        const a3 = i4;
        n5(this.emitError(a3.error));
      } : o7.on("error", (i4) => {
        n5(this.emitError(i4));
      }), o7.onopen = () => {
        this.onOpen(o7), t(o7);
      };
    });
  }
  onOpen(e2) {
    e2.onmessage = (t) => this.onPayload(t), e2.onclose = (t) => this.onClose(t), this.socket = e2, this.registering = false, this.events.emit("open");
  }
  onClose(e2) {
    this.socket = void 0, this.registering = false, this.events.emit("close", e2);
  }
  onPayload(e2) {
    if (typeof e2.data > "u") return;
    const t = typeof e2.data == "string" ? safeJsonParse(e2.data) : e2.data;
    this.events.emit("payload", t);
  }
  onError(e2, t) {
    const n5 = this.parseError(t), s3 = n5.message || n5.toString(), o7 = formatJsonRpcError(e2, s3);
    this.events.emit("payload", o7);
  }
  parseError(e2, t = this.url) {
    return parseConnectionError(e2, d3(t), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > h4 && this.events.setMaxListeners(h4);
  }
  emitError(e2) {
    const t = this.parseError(new Error((e2 == null ? void 0 : e2.message) || `WebSocket connection failed for host: ${d3(this.url)}`));
    return this.events.emit("register_error", t), t;
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_window_getters2 = __toESM(require_cjs2());
var ze3 = "wc";
var Le2 = 2;
var he2 = "core";
var B2 = `${ze3}@2:${he2}:`;
var Et3 = { name: he2, logger: "error" };
var It3 = { database: ":memory:" };
var Tt3 = "crypto";
var ke3 = "client_ed25519_seed";
var Ct2 = import_time4.ONE_DAY;
var Pt3 = "keychain";
var St3 = "0.3";
var Rt3 = "messages";
var Ot3 = "0.3";
var je3 = import_time4.SIX_HOURS;
var At2 = "publisher";
var xt3 = "irn";
var Nt3 = "error";
var Ue3 = "wss://relay.walletconnect.org";
var $t2 = "relayer";
var C3 = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" };
var zt3 = "_subscription";
var L2 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" };
var Lt3 = 0.1;
var _e3 = "2.19.1";
var Q3 = { link_mode: "link_mode", relay: "relay" };
var le3 = { inbound: "inbound", outbound: "outbound" };
var kt3 = "0.3";
var jt3 = "WALLETCONNECT_CLIENT_ID";
var Me3 = "WALLETCONNECT_LINK_MODE_APPS";
var $ = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" };
var Ut3 = "subscription";
var Mt2 = "0.3";
var Hs2 = import_time4.FIVE_SECONDS * 1e3;
var Ft3 = "pairing";
var Kt2 = "0.3";
var ie2 = { wc_pairingDelete: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: import_time4.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 0 } } };
var se2 = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" };
var M4 = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
var Bt3 = "history";
var Vt2 = "0.3";
var qt2 = "expirer";
var F2 = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" };
var Gt3 = "0.3";
var Wt3 = "verify-api";
var Xs2 = "https://verify.walletconnect.com";
var Ht2 = "https://verify.walletconnect.org";
var ue2 = Ht2;
var Yt3 = `${ue2}/v3`;
var Jt3 = [Xs2, Ht2];
var Xt2 = "echo";
var Zt2 = "https://echo.walletconnect.com";
var G2 = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" };
var Y2 = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" };
var Qs2 = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" };
var er3 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" };
var tr3 = { authenticated_session_approve_started: "authenticated_session_approve_started", authenticated_session_not_expired: "authenticated_session_not_expired", chains_caip2_compliant: "chains_caip2_compliant", chains_evm_compliant: "chains_evm_compliant", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve", authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success" };
var ir3 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", missing_session_authenticate_request: "missing_session_authenticate_request", session_authenticate_request_expired: "session_authenticate_request_expired", chains_caip2_compliant_failure: "chains_caip2_compliant_failure", chains_evm_compliant_failure: "chains_evm_compliant_failure", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" };
var Qt2 = 0.1;
var ei2 = "event-client";
var ti2 = 86400;
var ii2 = "https://pulse.walletconnect.org/batch";
function sr3(r3, e2) {
  if (r3.length >= 255) throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), s3 = 0; s3 < t.length; s3++) t[s3] = 255;
  for (var i4 = 0; i4 < r3.length; i4++) {
    var n5 = r3.charAt(i4), o7 = n5.charCodeAt(0);
    if (t[o7] !== 255) throw new TypeError(n5 + " is ambiguous");
    t[o7] = i4;
  }
  var a3 = r3.length, c7 = r3.charAt(0), h5 = Math.log(a3) / Math.log(256), u4 = Math.log(256) / Math.log(a3);
  function d6(l7) {
    if (l7 instanceof Uint8Array || (ArrayBuffer.isView(l7) ? l7 = new Uint8Array(l7.buffer, l7.byteOffset, l7.byteLength) : Array.isArray(l7) && (l7 = Uint8Array.from(l7))), !(l7 instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (l7.length === 0) return "";
    for (var b6 = 0, x7 = 0, I4 = 0, D4 = l7.length; I4 !== D4 && l7[I4] === 0; ) I4++, b6++;
    for (var j5 = (D4 - I4) * u4 + 1 >>> 0, T5 = new Uint8Array(j5); I4 !== D4; ) {
      for (var q3 = l7[I4], J6 = 0, K5 = j5 - 1; (q3 !== 0 || J6 < x7) && K5 !== -1; K5--, J6++) q3 += 256 * T5[K5] >>> 0, T5[K5] = q3 % a3 >>> 0, q3 = q3 / a3 >>> 0;
      if (q3 !== 0) throw new Error("Non-zero carry");
      x7 = J6, I4++;
    }
    for (var H4 = j5 - x7; H4 !== j5 && T5[H4] === 0; ) H4++;
    for (var me5 = c7.repeat(b6); H4 < j5; ++H4) me5 += r3.charAt(T5[H4]);
    return me5;
  }
  function g6(l7) {
    if (typeof l7 != "string") throw new TypeError("Expected String");
    if (l7.length === 0) return new Uint8Array();
    var b6 = 0;
    if (l7[b6] !== " ") {
      for (var x7 = 0, I4 = 0; l7[b6] === c7; ) x7++, b6++;
      for (var D4 = (l7.length - b6) * h5 + 1 >>> 0, j5 = new Uint8Array(D4); l7[b6]; ) {
        var T5 = t[l7.charCodeAt(b6)];
        if (T5 === 255) return;
        for (var q3 = 0, J6 = D4 - 1; (T5 !== 0 || q3 < I4) && J6 !== -1; J6--, q3++) T5 += a3 * j5[J6] >>> 0, j5[J6] = T5 % 256 >>> 0, T5 = T5 / 256 >>> 0;
        if (T5 !== 0) throw new Error("Non-zero carry");
        I4 = q3, b6++;
      }
      if (l7[b6] !== " ") {
        for (var K5 = D4 - I4; K5 !== D4 && j5[K5] === 0; ) K5++;
        for (var H4 = new Uint8Array(x7 + (D4 - K5)), me5 = x7; K5 !== D4; ) H4[me5++] = j5[K5++];
        return H4;
      }
    }
  }
  function _5(l7) {
    var b6 = g6(l7);
    if (b6) return b6;
    throw new Error(`Non-${e2} character`);
  }
  return { encode: d6, decodeUnsafe: g6, decode: _5 };
}
var rr3 = sr3;
var nr3 = rr3;
var si2 = (r3) => {
  if (r3 instanceof Uint8Array && r3.constructor.name === "Uint8Array") return r3;
  if (r3 instanceof ArrayBuffer) return new Uint8Array(r3);
  if (ArrayBuffer.isView(r3)) return new Uint8Array(r3.buffer, r3.byteOffset, r3.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var or4 = (r3) => new TextEncoder().encode(r3);
var ar3 = (r3) => new TextDecoder().decode(r3);
var cr3 = class {
  constructor(e2, t, s3) {
    this.name = e2, this.prefix = t, this.baseEncode = s3;
  }
  encode(e2) {
    if (e2 instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e2)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var hr3 = class {
  constructor(e2, t, s3) {
    if (this.name = e2, this.prefix = t, t.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = s3;
  }
  decode(e2) {
    if (typeof e2 == "string") {
      if (e2.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e2.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e2) {
    return ri2(this, e2);
  }
};
var lr3 = class {
  constructor(e2) {
    this.decoders = e2;
  }
  or(e2) {
    return ri2(this, e2);
  }
  decode(e2) {
    const t = e2[0], s3 = this.decoders[t];
    if (s3) return s3.decode(e2);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e2)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var ri2 = (r3, e2) => new lr3({ ...r3.decoders || { [r3.prefix]: r3 }, ...e2.decoders || { [e2.prefix]: e2 } });
var ur2 = class {
  constructor(e2, t, s3, i4) {
    this.name = e2, this.prefix = t, this.baseEncode = s3, this.baseDecode = i4, this.encoder = new cr3(e2, t, s3), this.decoder = new hr3(e2, t, i4);
  }
  encode(e2) {
    return this.encoder.encode(e2);
  }
  decode(e2) {
    return this.decoder.decode(e2);
  }
};
var Ee3 = ({ name: r3, prefix: e2, encode: t, decode: s3 }) => new ur2(r3, e2, t, s3);
var de3 = ({ prefix: r3, name: e2, alphabet: t }) => {
  const { encode: s3, decode: i4 } = nr3(t, e2);
  return Ee3({ prefix: r3, name: e2, encode: s3, decode: (n5) => si2(i4(n5)) });
};
var dr3 = (r3, e2, t, s3) => {
  const i4 = {};
  for (let u4 = 0; u4 < e2.length; ++u4) i4[e2[u4]] = u4;
  let n5 = r3.length;
  for (; r3[n5 - 1] === "="; ) --n5;
  const o7 = new Uint8Array(n5 * t / 8 | 0);
  let a3 = 0, c7 = 0, h5 = 0;
  for (let u4 = 0; u4 < n5; ++u4) {
    const d6 = i4[r3[u4]];
    if (d6 === void 0) throw new SyntaxError(`Non-${s3} character`);
    c7 = c7 << t | d6, a3 += t, a3 >= 8 && (a3 -= 8, o7[h5++] = 255 & c7 >> a3);
  }
  if (a3 >= t || 255 & c7 << 8 - a3) throw new SyntaxError("Unexpected end of data");
  return o7;
};
var gr3 = (r3, e2, t) => {
  const s3 = e2[e2.length - 1] === "=", i4 = (1 << t) - 1;
  let n5 = "", o7 = 0, a3 = 0;
  for (let c7 = 0; c7 < r3.length; ++c7) for (a3 = a3 << 8 | r3[c7], o7 += 8; o7 > t; ) o7 -= t, n5 += e2[i4 & a3 >> o7];
  if (o7 && (n5 += e2[i4 & a3 << t - o7]), s3) for (; n5.length * t & 7; ) n5 += "=";
  return n5;
};
var P3 = ({ name: r3, prefix: e2, bitsPerChar: t, alphabet: s3 }) => Ee3({ prefix: e2, name: r3, encode(i4) {
  return gr3(i4, s3, t);
}, decode(i4) {
  return dr3(i4, s3, t, r3);
} });
var pr3 = Ee3({ prefix: "\0", name: "identity", encode: (r3) => ar3(r3), decode: (r3) => or4(r3) });
var yr3 = Object.freeze({ __proto__: null, identity: pr3 });
var br3 = P3({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var mr3 = Object.freeze({ __proto__: null, base2: br3 });
var fr2 = P3({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Dr3 = Object.freeze({ __proto__: null, base8: fr2 });
var vr3 = de3({ prefix: "9", name: "base10", alphabet: "0123456789" });
var wr3 = Object.freeze({ __proto__: null, base10: vr3 });
var _r3 = P3({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var Er3 = P3({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Ir3 = Object.freeze({ __proto__: null, base16: _r3, base16upper: Er3 });
var Tr3 = P3({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var Cr2 = P3({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var Pr2 = P3({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var Sr3 = P3({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var Rr3 = P3({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var Or3 = P3({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var Ar3 = P3({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var xr3 = P3({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var Nr3 = P3({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var $r3 = Object.freeze({ __proto__: null, base32: Tr3, base32upper: Cr2, base32pad: Pr2, base32padupper: Sr3, base32hex: Rr3, base32hexupper: Or3, base32hexpad: Ar3, base32hexpadupper: xr3, base32z: Nr3 });
var zr3 = de3({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var Lr3 = de3({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var kr2 = Object.freeze({ __proto__: null, base36: zr3, base36upper: Lr3 });
var jr2 = de3({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var Ur3 = de3({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var Mr2 = Object.freeze({ __proto__: null, base58btc: jr2, base58flickr: Ur3 });
var Fr2 = P3({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var Kr3 = P3({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var Br3 = P3({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var Vr2 = P3({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var qr2 = Object.freeze({ __proto__: null, base64: Fr2, base64pad: Kr3, base64url: Br3, base64urlpad: Vr2 });
var ni2 = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var Gr2 = ni2.reduce((r3, e2, t) => (r3[t] = e2, r3), []);
var Wr2 = ni2.reduce((r3, e2, t) => (r3[e2.codePointAt(0)] = t, r3), []);
function Hr2(r3) {
  return r3.reduce((e2, t) => (e2 += Gr2[t], e2), "");
}
function Yr3(r3) {
  const e2 = [];
  for (const t of r3) {
    const s3 = Wr2[t.codePointAt(0)];
    if (s3 === void 0) throw new Error(`Non-base256emoji character: ${t}`);
    e2.push(s3);
  }
  return new Uint8Array(e2);
}
var Jr3 = Ee3({ prefix: "🚀", name: "base256emoji", encode: Hr2, decode: Yr3 });
var Xr3 = Object.freeze({ __proto__: null, base256emoji: Jr3 });
var Zr2 = ai2;
var oi2 = 128;
var Qr3 = 127;
var en3 = ~Qr3;
var tn2 = Math.pow(2, 31);
function ai2(r3, e2, t) {
  e2 = e2 || [], t = t || 0;
  for (var s3 = t; r3 >= tn2; ) e2[t++] = r3 & 255 | oi2, r3 /= 128;
  for (; r3 & en3; ) e2[t++] = r3 & 255 | oi2, r3 >>>= 7;
  return e2[t] = r3 | 0, ai2.bytes = t - s3 + 1, e2;
}
var sn3 = Fe2;
var rn3 = 128;
var ci2 = 127;
function Fe2(r3, s3) {
  var t = 0, s3 = s3 || 0, i4 = 0, n5 = s3, o7, a3 = r3.length;
  do {
    if (n5 >= a3) throw Fe2.bytes = 0, new RangeError("Could not decode varint");
    o7 = r3[n5++], t += i4 < 28 ? (o7 & ci2) << i4 : (o7 & ci2) * Math.pow(2, i4), i4 += 7;
  } while (o7 >= rn3);
  return Fe2.bytes = n5 - s3, t;
}
var nn3 = Math.pow(2, 7);
var on3 = Math.pow(2, 14);
var an2 = Math.pow(2, 21);
var cn2 = Math.pow(2, 28);
var hn2 = Math.pow(2, 35);
var ln2 = Math.pow(2, 42);
var un2 = Math.pow(2, 49);
var dn2 = Math.pow(2, 56);
var gn3 = Math.pow(2, 63);
var pn2 = function(r3) {
  return r3 < nn3 ? 1 : r3 < on3 ? 2 : r3 < an2 ? 3 : r3 < cn2 ? 4 : r3 < hn2 ? 5 : r3 < ln2 ? 6 : r3 < un2 ? 7 : r3 < dn2 ? 8 : r3 < gn3 ? 9 : 10;
};
var yn3 = { encode: Zr2, decode: sn3, encodingLength: pn2 };
var hi2 = yn3;
var li2 = (r3, e2, t = 0) => (hi2.encode(r3, e2, t), e2);
var ui2 = (r3) => hi2.encodingLength(r3);
var Ke3 = (r3, e2) => {
  const t = e2.byteLength, s3 = ui2(r3), i4 = s3 + ui2(t), n5 = new Uint8Array(i4 + t);
  return li2(r3, n5, 0), li2(t, n5, s3), n5.set(e2, i4), new bn3(r3, t, e2, n5);
};
var bn3 = class {
  constructor(e2, t, s3, i4) {
    this.code = e2, this.size = t, this.digest = s3, this.bytes = i4;
  }
};
var di2 = ({ name: r3, code: e2, encode: t }) => new mn3(r3, e2, t);
var mn3 = class {
  constructor(e2, t, s3) {
    this.name = e2, this.code = t, this.encode = s3;
  }
  digest(e2) {
    if (e2 instanceof Uint8Array) {
      const t = this.encode(e2);
      return t instanceof Uint8Array ? Ke3(this.code, t) : t.then((s3) => Ke3(this.code, s3));
    } else throw Error("Unknown type, must be binary type");
  }
};
var gi2 = (r3) => async (e2) => new Uint8Array(await crypto.subtle.digest(r3, e2));
var fn2 = di2({ name: "sha2-256", code: 18, encode: gi2("SHA-256") });
var Dn2 = di2({ name: "sha2-512", code: 19, encode: gi2("SHA-512") });
var vn3 = Object.freeze({ __proto__: null, sha256: fn2, sha512: Dn2 });
var pi2 = 0;
var wn2 = "identity";
var yi2 = si2;
var _n3 = (r3) => Ke3(pi2, yi2(r3));
var En3 = { code: pi2, name: wn2, encode: yi2, digest: _n3 };
var In3 = Object.freeze({ __proto__: null, identity: En3 });
new TextEncoder(), new TextDecoder();
var bi2 = { ...yr3, ...mr3, ...Dr3, ...wr3, ...Ir3, ...$r3, ...kr2, ...Mr2, ...qr2, ...Xr3 };
({ ...vn3, ...In3 });
function Tn3(r3 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(r3) : new Uint8Array(r3);
}
function mi2(r3, e2, t, s3) {
  return { name: r3, prefix: e2, encoder: { name: r3, prefix: e2, encode: t }, decoder: { decode: s3 } };
}
var fi2 = mi2("utf8", "u", (r3) => "u" + new TextDecoder("utf8").decode(r3), (r3) => new TextEncoder().encode(r3.substring(1)));
var Be3 = mi2("ascii", "a", (r3) => {
  let e2 = "a";
  for (let t = 0; t < r3.length; t++) e2 += String.fromCharCode(r3[t]);
  return e2;
}, (r3) => {
  r3 = r3.substring(1);
  const e2 = Tn3(r3.length);
  for (let t = 0; t < r3.length; t++) e2[t] = r3.charCodeAt(t);
  return e2;
});
var Cn3 = { utf8: fi2, "utf-8": fi2, hex: bi2.base16, latin1: Be3, ascii: Be3, binary: Be3, ...bi2 };
function Pn2(r3, e2 = "utf8") {
  const t = Cn3[e2];
  if (!t) throw new Error(`Unsupported encoding "${e2}"`);
  return (e2 === "utf8" || e2 === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(r3, "utf8") : t.decoder.decode(`${t.prefix}${r3}`);
}
var Sn2 = Object.defineProperty;
var Rn3 = (r3, e2, t) => e2 in r3 ? Sn2(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var W2 = (r3, e2, t) => Rn3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Di2 = class {
  constructor(e2, t) {
    this.core = e2, this.logger = t, W2(this, "keychain", /* @__PURE__ */ new Map()), W2(this, "name", Pt3), W2(this, "version", St3), W2(this, "initialized", false), W2(this, "storagePrefix", B2), W2(this, "init", async () => {
      if (!this.initialized) {
        const s3 = await this.getKeyChain();
        typeof s3 < "u" && (this.keychain = s3), this.initialized = true;
      }
    }), W2(this, "has", (s3) => (this.isInitialized(), this.keychain.has(s3))), W2(this, "set", async (s3, i4) => {
      this.isInitialized(), this.keychain.set(s3, i4), await this.persist();
    }), W2(this, "get", (s3) => {
      this.isInitialized();
      const i4 = this.keychain.get(s3);
      if (typeof i4 > "u") {
        const { message: n5 } = te2("NO_MATCHING_KEY", `${this.name}: ${s3}`);
        throw new Error(n5);
      }
      return i4;
    }), W2(this, "del", async (s3) => {
      this.isInitialized(), this.keychain.delete(s3), await this.persist();
    }), this.core = e2, this.logger = E2(t, this.name);
  }
  get context() {
    return y2(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e2) {
    await this.core.storage.setItem(this.storageKey, ro2(e2));
  }
  async getKeyChain() {
    const e2 = await this.core.storage.getItem(this.storageKey);
    return typeof e2 < "u" ? oo2(e2) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var On3 = Object.defineProperty;
var An2 = (r3, e2, t) => e2 in r3 ? On3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var S3 = (r3, e2, t) => An2(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var vi2 = class {
  constructor(e2, t, s3) {
    this.core = e2, this.logger = t, S3(this, "name", Tt3), S3(this, "keychain"), S3(this, "randomSessionIdentifier", oi()), S3(this, "initialized", false), S3(this, "init", async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }), S3(this, "hasKeys", (i4) => (this.isInitialized(), this.keychain.has(i4))), S3(this, "getClientId", async () => {
      this.isInitialized();
      const i4 = await this.getClientSeed(), n5 = Po(i4);
      return Qe(n5.publicKey);
    }), S3(this, "generateKeyPair", () => {
      this.isInitialized();
      const i4 = ri();
      return this.setPrivateKey(i4.publicKey, i4.privateKey);
    }), S3(this, "signJWT", async (i4) => {
      this.isInitialized();
      const n5 = await this.getClientSeed(), o7 = Po(n5), a3 = this.randomSessionIdentifier, c7 = Ct2;
      return await Qo(a3, i4, c7, o7);
    }), S3(this, "generateSharedKey", (i4, n5, o7) => {
      this.isInitialized();
      const a3 = this.getPrivateKey(i4), c7 = si(a3, n5);
      return this.setSymKey(c7, o7);
    }), S3(this, "setSymKey", async (i4, n5) => {
      this.isInitialized();
      const o7 = n5 || ii(i4);
      return await this.keychain.set(o7, i4), o7;
    }), S3(this, "deleteKeyPair", async (i4) => {
      this.isInitialized(), await this.keychain.del(i4);
    }), S3(this, "deleteSymKey", async (i4) => {
      this.isInitialized(), await this.keychain.del(i4);
    }), S3(this, "encode", async (i4, n5, o7) => {
      this.isInitialized();
      const a3 = rr2(o7), c7 = safeJsonStringify(n5);
      if (pi(a3)) return fi(c7, o7 == null ? void 0 : o7.encoding);
      if (hi(a3)) {
        const g6 = a3.senderPublicKey, _5 = a3.receiverPublicKey;
        i4 = await this.generateSharedKey(g6, _5);
      }
      const h5 = this.getSymKey(i4), { type: u4, senderPublicKey: d6 } = a3;
      return ai({ type: u4, symKey: h5, message: c7, senderPublicKey: d6, encoding: o7 == null ? void 0 : o7.encoding });
    }), S3(this, "decode", async (i4, n5, o7) => {
      this.isInitialized();
      const a3 = di(n5, o7);
      if (pi(a3)) {
        const c7 = li(n5, o7 == null ? void 0 : o7.encoding);
        return safeJsonParse(c7);
      }
      if (hi(a3)) {
        const c7 = a3.receiverPublicKey, h5 = a3.senderPublicKey;
        i4 = await this.generateSharedKey(c7, h5);
      }
      try {
        const c7 = this.getSymKey(i4), h5 = ui({ symKey: c7, encoded: n5, encoding: o7 == null ? void 0 : o7.encoding });
        return safeJsonParse(h5);
      } catch (c7) {
        this.logger.error(`Failed to decode message from topic: '${i4}', clientId: '${await this.getClientId()}'`), this.logger.error(c7);
      }
    }), S3(this, "getPayloadType", (i4, n5 = At) => {
      const o7 = Fe({ encoded: i4, encoding: n5 });
      return fe2(o7.type);
    }), S3(this, "getPayloadSenderPublicKey", (i4, n5 = At) => {
      const o7 = Fe({ encoded: i4, encoding: n5 });
      return o7.senderPublicKey ? toString3(o7.senderPublicKey, V) : void 0;
    }), this.core = e2, this.logger = E2(t, this.name), this.keychain = s3 || new Di2(this.core, this.logger);
  }
  get context() {
    return y2(this.logger);
  }
  async setPrivateKey(e2, t) {
    return await this.keychain.set(e2, t), e2;
  }
  getPrivateKey(e2) {
    return this.keychain.get(e2);
  }
  async getClientSeed() {
    let e2 = "";
    try {
      e2 = this.keychain.get(ke3);
    } catch {
      e2 = oi(), await this.keychain.set(ke3, e2);
    }
    return Pn2(e2, "base16");
  }
  getSymKey(e2) {
    return this.keychain.get(e2);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var xn3 = Object.defineProperty;
var Nn2 = Object.defineProperties;
var $n2 = Object.getOwnPropertyDescriptors;
var wi2 = Object.getOwnPropertySymbols;
var zn3 = Object.prototype.hasOwnProperty;
var Ln3 = Object.prototype.propertyIsEnumerable;
var Ve3 = (r3, e2, t) => e2 in r3 ? xn3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var kn3 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) zn3.call(e2, t) && Ve3(r3, t, e2[t]);
  if (wi2) for (var t of wi2(e2)) Ln3.call(e2, t) && Ve3(r3, t, e2[t]);
  return r3;
};
var jn3 = (r3, e2) => Nn2(r3, $n2(e2));
var k5 = (r3, e2, t) => Ve3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var _i = class extends y3 {
  constructor(e2, t) {
    super(e2, t), this.logger = e2, this.core = t, k5(this, "messages", /* @__PURE__ */ new Map()), k5(this, "messagesWithoutClientAck", /* @__PURE__ */ new Map()), k5(this, "name", Rt3), k5(this, "version", Ot3), k5(this, "initialized", false), k5(this, "storagePrefix", B2), k5(this, "init", async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const s3 = await this.getRelayerMessages();
          typeof s3 < "u" && (this.messages = s3);
          const i4 = await this.getRelayerMessagesWithoutClientAck();
          typeof i4 < "u" && (this.messagesWithoutClientAck = i4), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (s3) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(s3);
        } finally {
          this.initialized = true;
        }
      }
    }), k5(this, "set", async (s3, i4, n5) => {
      this.isInitialized();
      const o7 = ci(i4);
      let a3 = this.messages.get(s3);
      if (typeof a3 > "u" && (a3 = {}), typeof a3[o7] < "u") return o7;
      if (a3[o7] = i4, this.messages.set(s3, a3), n5 === le3.inbound) {
        const c7 = this.messagesWithoutClientAck.get(s3) || {};
        this.messagesWithoutClientAck.set(s3, jn3(kn3({}, c7), { [o7]: i4 }));
      }
      return await this.persist(), o7;
    }), k5(this, "get", (s3) => {
      this.isInitialized();
      let i4 = this.messages.get(s3);
      return typeof i4 > "u" && (i4 = {}), i4;
    }), k5(this, "getWithoutAck", (s3) => {
      this.isInitialized();
      const i4 = {};
      for (const n5 of s3) {
        const o7 = this.messagesWithoutClientAck.get(n5) || {};
        i4[n5] = Object.values(o7);
      }
      return i4;
    }), k5(this, "has", (s3, i4) => {
      this.isInitialized();
      const n5 = this.get(s3), o7 = ci(i4);
      return typeof n5[o7] < "u";
    }), k5(this, "ack", async (s3, i4) => {
      this.isInitialized();
      const n5 = this.messagesWithoutClientAck.get(s3);
      if (typeof n5 > "u") return;
      const o7 = ci(i4);
      delete n5[o7], Object.keys(n5).length === 0 ? this.messagesWithoutClientAck.delete(s3) : this.messagesWithoutClientAck.set(s3, n5), await this.persist();
    }), k5(this, "del", async (s3) => {
      this.isInitialized(), this.messages.delete(s3), this.messagesWithoutClientAck.delete(s3), await this.persist();
    }), this.logger = E2(e2, this.name), this.core = t;
  }
  get context() {
    return y2(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  async setRelayerMessages(e2) {
    await this.core.storage.setItem(this.storageKey, ro2(e2));
  }
  async setRelayerMessagesWithoutClientAck(e2) {
    await this.core.storage.setItem(this.storageKeyWithoutClientAck, ro2(e2));
  }
  async getRelayerMessages() {
    const e2 = await this.core.storage.getItem(this.storageKey);
    return typeof e2 < "u" ? oo2(e2) : void 0;
  }
  async getRelayerMessagesWithoutClientAck() {
    const e2 = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
    return typeof e2 < "u" ? oo2(e2) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var Un3 = Object.defineProperty;
var Mn3 = Object.defineProperties;
var Fn3 = Object.getOwnPropertyDescriptors;
var Ei2 = Object.getOwnPropertySymbols;
var Kn3 = Object.prototype.hasOwnProperty;
var Bn3 = Object.prototype.propertyIsEnumerable;
var qe3 = (r3, e2, t) => e2 in r3 ? Un3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var Ie3 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) Kn3.call(e2, t) && qe3(r3, t, e2[t]);
  if (Ei2) for (var t of Ei2(e2)) Bn3.call(e2, t) && qe3(r3, t, e2[t]);
  return r3;
};
var Ge3 = (r3, e2) => Mn3(r3, Fn3(e2));
var V3 = (r3, e2, t) => qe3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Vn3 = class extends m2 {
  constructor(e2, t) {
    super(e2, t), this.relayer = e2, this.logger = t, V3(this, "events", new import_events7.EventEmitter()), V3(this, "name", At2), V3(this, "queue", /* @__PURE__ */ new Map()), V3(this, "publishTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE)), V3(this, "initialPublishTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15)), V3(this, "needsTransportRestart", false), V3(this, "publish", async (s3, i4, n5) => {
      var o7;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: s3, message: i4, opts: n5 } });
      const a3 = (n5 == null ? void 0 : n5.ttl) || je3, c7 = bi(n5), h5 = (n5 == null ? void 0 : n5.prompt) || false, u4 = (n5 == null ? void 0 : n5.tag) || 0, d6 = (n5 == null ? void 0 : n5.id) || getBigIntRpcId().toString(), g6 = { topic: s3, message: i4, opts: { ttl: a3, relay: c7, prompt: h5, tag: u4, id: d6, attestation: n5 == null ? void 0 : n5.attestation, tvf: n5 == null ? void 0 : n5.tvf } }, _5 = `Failed to publish payload, please try again. id:${d6} tag:${u4}`;
      try {
        const l7 = new Promise(async (b6) => {
          const x7 = ({ id: D4 }) => {
            g6.opts.id === D4 && (this.removeRequestFromQueue(D4), this.relayer.events.removeListener(C3.publish, x7), b6(g6));
          };
          this.relayer.events.on(C3.publish, x7);
          const I4 = uo2(new Promise((D4, j5) => {
            this.rpcPublish({ topic: s3, message: i4, ttl: a3, prompt: h5, tag: u4, id: d6, attestation: n5 == null ? void 0 : n5.attestation, tvf: n5 == null ? void 0 : n5.tvf }).then(D4).catch((T5) => {
              this.logger.warn(T5, T5 == null ? void 0 : T5.message), j5(T5);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${d6} tag:${u4}`);
          try {
            await I4, this.events.removeListener(C3.publish, x7);
          } catch (D4) {
            this.queue.set(d6, Ge3(Ie3({}, g6), { attempt: 1 })), this.logger.warn(D4, D4 == null ? void 0 : D4.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: d6, topic: s3, message: i4, opts: n5 } }), await uo2(l7, this.publishTimeout, _5);
      } catch (l7) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(l7), (o7 = n5 == null ? void 0 : n5.internal) != null && o7.throwOnFailedPublish) throw l7;
      } finally {
        this.queue.delete(d6);
      }
    }), V3(this, "on", (s3, i4) => {
      this.events.on(s3, i4);
    }), V3(this, "once", (s3, i4) => {
      this.events.once(s3, i4);
    }), V3(this, "off", (s3, i4) => {
      this.events.off(s3, i4);
    }), V3(this, "removeListener", (s3, i4) => {
      this.events.removeListener(s3, i4);
    }), this.relayer = e2, this.logger = E2(t, this.name), this.registerEventListeners();
  }
  get context() {
    return y2(this.logger);
  }
  async rpcPublish(e2) {
    var t, s3, i4, n5;
    const { topic: o7, message: a3, ttl: c7 = je3, prompt: h5, tag: u4, id: d6, attestation: g6, tvf: _5 } = e2, l7 = { method: wi(bi().protocol).publish, params: Ie3({ topic: o7, message: a3, ttl: c7, prompt: h5, tag: u4, attestation: g6 }, _5), id: d6 };
    ae((t = l7.params) == null ? void 0 : t.prompt) && ((s3 = l7.params) == null || delete s3.prompt), ae((i4 = l7.params) == null ? void 0 : i4.tag) && ((n5 = l7.params) == null || delete n5.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: l7 });
    const b6 = await this.relayer.request(l7);
    return this.relayer.events.emit(C3.publish, e2), this.logger.debug("Successfully Published Payload"), b6;
  }
  removeRequestFromQueue(e2) {
    this.queue.delete(e2);
  }
  checkQueue() {
    this.queue.forEach(async (e2, t) => {
      const s3 = e2.attempt + 1;
      this.queue.set(t, Ge3(Ie3({}, e2), { attempt: s3 }));
      const { topic: i4, message: n5, opts: o7, attestation: a3 } = e2;
      this.logger.warn({}, `Publisher: queue->publishing: ${e2.opts.id}, tag: ${e2.opts.tag}, attempt: ${s3}`), await this.rpcPublish(Ge3(Ie3({}, e2), { topic: i4, message: n5, ttl: o7.ttl, prompt: o7.prompt, tag: o7.tag, id: o7.id, attestation: a3, tvf: o7.tvf })), this.logger.warn({}, `Publisher: queue->published: ${e2.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(C3.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(C3.message_ack, (e2) => {
      this.removeRequestFromQueue(e2.id.toString());
    });
  }
};
var qn3 = Object.defineProperty;
var Gn3 = (r3, e2, t) => e2 in r3 ? qn3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var re2 = (r3, e2, t) => Gn3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Wn3 = class {
  constructor() {
    re2(this, "map", /* @__PURE__ */ new Map()), re2(this, "set", (e2, t) => {
      const s3 = this.get(e2);
      this.exists(e2, t) || this.map.set(e2, [...s3, t]);
    }), re2(this, "get", (e2) => this.map.get(e2) || []), re2(this, "exists", (e2, t) => this.get(e2).includes(t)), re2(this, "delete", (e2, t) => {
      if (typeof t > "u") {
        this.map.delete(e2);
        return;
      }
      if (!this.map.has(e2)) return;
      const s3 = this.get(e2);
      if (!this.exists(e2, t)) return;
      const i4 = s3.filter((n5) => n5 !== t);
      if (!i4.length) {
        this.map.delete(e2);
        return;
      }
      this.map.set(e2, i4);
    }), re2(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
};
var Hn3 = Object.defineProperty;
var Yn3 = Object.defineProperties;
var Jn3 = Object.getOwnPropertyDescriptors;
var Ii = Object.getOwnPropertySymbols;
var Xn3 = Object.prototype.hasOwnProperty;
var Zn3 = Object.prototype.propertyIsEnumerable;
var We3 = (r3, e2, t) => e2 in r3 ? Hn3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var ge2 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) Xn3.call(e2, t) && We3(r3, t, e2[t]);
  if (Ii) for (var t of Ii(e2)) Zn3.call(e2, t) && We3(r3, t, e2[t]);
  return r3;
};
var He3 = (r3, e2) => Yn3(r3, Jn3(e2));
var f4 = (r3, e2, t) => We3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Ti = class extends P2 {
  constructor(e2, t) {
    super(e2, t), this.relayer = e2, this.logger = t, f4(this, "subscriptions", /* @__PURE__ */ new Map()), f4(this, "topicMap", new Wn3()), f4(this, "events", new import_events7.EventEmitter()), f4(this, "name", Ut3), f4(this, "version", Mt2), f4(this, "pending", /* @__PURE__ */ new Map()), f4(this, "cached", []), f4(this, "initialized", false), f4(this, "storagePrefix", B2), f4(this, "subscribeTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_MINUTE)), f4(this, "initialSubscribeTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15)), f4(this, "clientId"), f4(this, "batchSubscribeTopicsLimit", 500), f4(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = true;
    }), f4(this, "subscribe", async (s3, i4) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s3, opts: i4 } });
      try {
        const n5 = bi(i4), o7 = { topic: s3, relay: n5, transportType: i4 == null ? void 0 : i4.transportType };
        this.pending.set(s3, o7);
        const a3 = await this.rpcSubscribe(s3, n5, i4);
        return typeof a3 == "string" && (this.onSubscribe(a3, o7), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s3, opts: i4 } })), a3;
      } catch (n5) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n5), n5;
      }
    }), f4(this, "unsubscribe", async (s3, i4) => {
      this.isInitialized(), typeof (i4 == null ? void 0 : i4.id) < "u" ? await this.unsubscribeById(s3, i4.id, i4) : await this.unsubscribeByTopic(s3, i4);
    }), f4(this, "isSubscribed", (s3) => new Promise((i4) => {
      i4(this.topicMap.topics.includes(s3));
    })), f4(this, "isKnownTopic", (s3) => new Promise((i4) => {
      i4(this.topicMap.topics.includes(s3) || this.pending.has(s3) || this.cached.some((n5) => n5.topic === s3));
    })), f4(this, "on", (s3, i4) => {
      this.events.on(s3, i4);
    }), f4(this, "once", (s3, i4) => {
      this.events.once(s3, i4);
    }), f4(this, "off", (s3, i4) => {
      this.events.off(s3, i4);
    }), f4(this, "removeListener", (s3, i4) => {
      this.events.removeListener(s3, i4);
    }), f4(this, "start", async () => {
      await this.onConnect();
    }), f4(this, "stop", async () => {
      await this.onDisconnect();
    }), f4(this, "restart", async () => {
      await this.restore(), await this.onRestart();
    }), f4(this, "checkPending", async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const s3 = [];
      this.pending.forEach((i4) => {
        s3.push(i4);
      }), await this.batchSubscribe(s3);
    }), f4(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(r.pulse, async () => {
        await this.checkPending();
      }), this.events.on($.created, async (s3) => {
        const i4 = $.created;
        this.logger.info(`Emitting ${i4}`), this.logger.debug({ type: "event", event: i4, data: s3 }), await this.persist();
      }), this.events.on($.deleted, async (s3) => {
        const i4 = $.deleted;
        this.logger.info(`Emitting ${i4}`), this.logger.debug({ type: "event", event: i4, data: s3 }), await this.persist();
      });
    }), this.relayer = e2, this.logger = E2(t, this.name), this.clientId = "";
  }
  get context() {
    return y2(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(e2, t) {
    let s3 = false;
    try {
      s3 = this.getSubscription(e2).topic === t;
    } catch {
    }
    return s3;
  }
  reset() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e2, t) {
    const s3 = this.topicMap.get(e2);
    await Promise.all(s3.map(async (i4) => await this.unsubscribeById(e2, i4, t)));
  }
  async unsubscribeById(e2, t, s3) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e2, id: t, opts: s3 } });
    try {
      const i4 = bi(s3);
      await this.restartToComplete({ topic: e2, id: t, relay: i4 }), await this.rpcUnsubscribe(e2, t, i4);
      const n5 = de2("USER_DISCONNECTED", `${this.name}, ${e2}`);
      await this.onUnsubscribe(e2, t, n5), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e2, id: t, opts: s3 } });
    } catch (i4) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(i4), i4;
    }
  }
  async rpcSubscribe(e2, t, s3) {
    var i4;
    (!s3 || (s3 == null ? void 0 : s3.transportType) === Q3.relay) && await this.restartToComplete({ topic: e2, id: e2, relay: t });
    const n5 = { method: wi(t.protocol).subscribe, params: { topic: e2 } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n5 });
    const o7 = (i4 = s3 == null ? void 0 : s3.internal) == null ? void 0 : i4.throwOnFailedPublish;
    try {
      const a3 = await this.getSubscriptionId(e2);
      if ((s3 == null ? void 0 : s3.transportType) === Q3.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(n5).catch((u4) => this.logger.warn(u4));
      }, (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND)), a3;
      const c7 = new Promise(async (u4) => {
        const d6 = (g6) => {
          g6.topic === e2 && (this.events.removeListener($.created, d6), u4(g6.id));
        };
        this.events.on($.created, d6);
        try {
          const g6 = await uo2(new Promise((_5, l7) => {
            this.relayer.request(n5).catch((b6) => {
              this.logger.warn(b6, b6 == null ? void 0 : b6.message), l7(b6);
            }).then(_5);
          }), this.initialSubscribeTimeout, `Subscribing to ${e2} failed, please try again`);
          this.events.removeListener($.created, d6), u4(g6);
        } catch {
        }
      }), h5 = await uo2(c7, this.subscribeTimeout, `Subscribing to ${e2} failed, please try again`);
      if (!h5 && o7) throw new Error(`Subscribing to ${e2} failed, please try again`);
      return h5 ? a3 : null;
    } catch (a3) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(C3.connection_stalled), o7) throw a3;
    }
    return null;
  }
  async rpcBatchSubscribe(e2) {
    if (!e2.length) return;
    const t = e2[0].relay, s3 = { method: wi(t.protocol).batchSubscribe, params: { topics: e2.map((i4) => i4.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s3 });
    try {
      await await uo2(new Promise((i4) => {
        this.relayer.request(s3).catch((n5) => this.logger.warn(n5)).then(i4);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(C3.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e2) {
    if (!e2.length) return;
    const t = e2[0].relay, s3 = { method: wi(t.protocol).batchFetchMessages, params: { topics: e2.map((n5) => n5.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s3 });
    let i4;
    try {
      i4 = await await uo2(new Promise((n5, o7) => {
        this.relayer.request(s3).catch((a3) => {
          this.logger.warn(a3), o7(a3);
        }).then(n5);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(C3.connection_stalled);
    }
    return i4;
  }
  rpcUnsubscribe(e2, t, s3) {
    const i4 = { method: wi(s3.protocol).unsubscribe, params: { topic: e2, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i4 }), this.relayer.request(i4);
  }
  onSubscribe(e2, t) {
    this.setSubscription(e2, He3(ge2({}, t), { id: e2 })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e2) {
    e2.length && e2.forEach((t) => {
      this.setSubscription(t.id, ge2({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e2, t, s3) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e2) && this.deleteSubscription(t, s3), await this.relayer.messages.del(e2);
  }
  async setRelayerSubscriptions(e2) {
    await this.relayer.core.storage.setItem(this.storageKey, e2);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e2, t) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e2, subscription: t }), this.addSubscription(e2, t);
  }
  addSubscription(e2, t) {
    this.subscriptions.set(e2, ge2({}, t)), this.topicMap.set(t.topic, e2), this.events.emit($.created, t);
  }
  getSubscription(e2) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e2 });
    const t = this.subscriptions.get(e2);
    if (!t) {
      const { message: s3 } = te2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw new Error(s3);
    }
    return t;
  }
  deleteSubscription(e2, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e2, reason: t });
    const s3 = this.getSubscription(e2);
    this.subscriptions.delete(e2), this.topicMap.delete(s3.topic, e2), this.events.emit($.deleted, He3(ge2({}, s3), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit($.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e2 = [...this.cached], t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let s3 = 0; s3 < t; s3++) {
        const i4 = e2.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(i4);
      }
    }
    this.events.emit($.resubscribed);
  }
  async restore() {
    try {
      const e2 = await this.getRelayerSubscriptions();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.subscriptions.size) {
        const { message: t } = te2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e2);
    }
  }
  async batchSubscribe(e2) {
    e2.length && (await this.rpcBatchSubscribe(e2), this.onBatchSubscribe(await Promise.all(e2.map(async (t) => He3(ge2({}, t), { id: await this.getSubscriptionId(t.topic) })))));
  }
  async batchFetchMessages(e2) {
    if (!e2.length) return;
    this.logger.trace(`Fetching batch messages for ${e2.length} subscriptions`);
    const t = await this.rpcBatchFetchMessages(e2);
    t && t.messages && (await xo2((0, import_time4.toMiliseconds)(import_time4.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  async restartToComplete(e2) {
    !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e2), await this.relayer.transportOpen());
  }
  async getClientId() {
    return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
  }
  async getSubscriptionId(e2) {
    return ci(e2 + await this.getClientId());
  }
};
var Qn3 = Object.defineProperty;
var Ci2 = Object.getOwnPropertySymbols;
var eo2 = Object.prototype.hasOwnProperty;
var to2 = Object.prototype.propertyIsEnumerable;
var Ye3 = (r3, e2, t) => e2 in r3 ? Qn3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var Pi2 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) eo2.call(e2, t) && Ye3(r3, t, e2[t]);
  if (Ci2) for (var t of Ci2(e2)) to2.call(e2, t) && Ye3(r3, t, e2[t]);
  return r3;
};
var y4 = (r3, e2, t) => Ye3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Si = class extends d2 {
  constructor(e2) {
    super(e2), y4(this, "protocol", "wc"), y4(this, "version", 2), y4(this, "core"), y4(this, "logger"), y4(this, "events", new import_events7.EventEmitter()), y4(this, "provider"), y4(this, "messages"), y4(this, "subscriber"), y4(this, "publisher"), y4(this, "name", $t2), y4(this, "transportExplicitlyClosed", false), y4(this, "initialized", false), y4(this, "connectionAttemptInProgress", false), y4(this, "relayUrl"), y4(this, "projectId"), y4(this, "packageName"), y4(this, "bundleId"), y4(this, "hasExperiencedNetworkDisruption", false), y4(this, "pingTimeout"), y4(this, "heartBeatTimeout", (0, import_time4.toMiliseconds)(import_time4.THIRTY_SECONDS + import_time4.FIVE_SECONDS)), y4(this, "reconnectTimeout"), y4(this, "connectPromise"), y4(this, "reconnectInProgress", false), y4(this, "requestsInFlight", []), y4(this, "connectTimeout", (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND * 15)), y4(this, "request", async (t) => {
      var s3, i4;
      this.logger.debug("Publishing Request Payload");
      const n5 = t.id || getBigIntRpcId().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: n5, method: t.method, topic: (s3 = t.params) == null ? void 0 : s3.topic }, "relayer.request - publishing...");
        const o7 = `${n5}:${((i4 = t.params) == null ? void 0 : i4.tag) || ""}`;
        this.requestsInFlight.push(o7);
        const a3 = await this.provider.request(t);
        return this.requestsInFlight = this.requestsInFlight.filter((c7) => c7 !== o7), a3;
      } catch (o7) {
        throw this.logger.debug(`Failed to Publish Request: ${n5}`), o7;
      }
    }), y4(this, "resetPingTimeout", () => {
      et() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        var t, s3, i4, n5;
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (n5 = (i4 = (s3 = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : s3.socket) == null ? void 0 : i4.terminate) == null || n5.call(i4);
        } catch (o7) {
          this.logger.warn(o7, o7 == null ? void 0 : o7.message);
        }
      }, this.heartBeatTimeout));
    }), y4(this, "onPayloadHandler", (t) => {
      this.onProviderPayload(t), this.resetPingTimeout();
    }), y4(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(C3.connect);
    }), y4(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), y4(this, "onProviderErrorHandler", (t) => {
      this.logger.fatal(`Fatal socket error: ${t.message}`), this.events.emit(C3.error, t), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), y4(this, "registerProviderListeners", () => {
      this.provider.on(L2.payload, this.onPayloadHandler), this.provider.on(L2.connect, this.onConnectHandler), this.provider.on(L2.disconnect, this.onDisconnectHandler), this.provider.on(L2.error, this.onProviderErrorHandler);
    }), this.core = e2.core, this.logger = typeof e2.logger < "u" && typeof e2.logger != "string" ? E2(e2.logger, this.name) : (0, import_pino2.default)(k3({ level: e2.logger || Nt3 })), this.messages = new _i(this.logger, e2.core), this.subscriber = new Ti(this, this.logger), this.publisher = new Vn3(this, this.logger), this.relayUrl = (e2 == null ? void 0 : e2.relayUrl) || Ue3, this.projectId = e2.projectId, zr2() ? this.packageName = Yr2() : Jr2() && (this.bundleId = Yr2()), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = true, this.subscriber.hasAnyTopics) try {
      await this.transportOpen();
    } catch (e2) {
      this.logger.warn(e2, e2 == null ? void 0 : e2.message);
    }
  }
  get context() {
    return y2(this.logger);
  }
  get connected() {
    var e2, t, s3;
    return ((s3 = (t = (e2 = this.provider) == null ? void 0 : e2.connection) == null ? void 0 : t.socket) == null ? void 0 : s3.readyState) === 1 || false;
  }
  get connecting() {
    var e2, t, s3;
    return ((s3 = (t = (e2 = this.provider) == null ? void 0 : e2.connection) == null ? void 0 : t.socket) == null ? void 0 : s3.readyState) === 0 || this.connectPromise !== void 0 || false;
  }
  async publish(e2, t, s3) {
    this.isInitialized(), await this.publisher.publish(e2, t, s3), await this.recordMessageEvent({ topic: e2, message: t, publishedAt: Date.now(), transportType: Q3.relay }, le3.outbound);
  }
  async subscribe(e2, t) {
    var s3, i4, n5;
    this.isInitialized(), (!(t != null && t.transportType) || (t == null ? void 0 : t.transportType) === "relay") && await this.toEstablishConnection();
    const o7 = typeof ((s3 = t == null ? void 0 : t.internal) == null ? void 0 : s3.throwOnFailedPublish) > "u" ? true : (i4 = t == null ? void 0 : t.internal) == null ? void 0 : i4.throwOnFailedPublish;
    let a3 = ((n5 = this.subscriber.topicMap.get(e2)) == null ? void 0 : n5[0]) || "", c7;
    const h5 = (u4) => {
      u4.topic === e2 && (this.subscriber.off($.created, h5), c7());
    };
    return await Promise.all([new Promise((u4) => {
      c7 = u4, this.subscriber.on($.created, h5);
    }), new Promise(async (u4, d6) => {
      a3 = await this.subscriber.subscribe(e2, Pi2({ internal: { throwOnFailedPublish: o7 } }, t)).catch((g6) => {
        o7 && d6(g6);
      }) || a3, u4();
    })]), a3;
  }
  async unsubscribe(e2, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e2, t);
  }
  on(e2, t) {
    this.events.on(e2, t);
  }
  once(e2, t) {
    this.events.once(e2, t);
  }
  off(e2, t) {
    this.events.off(e2, t);
  }
  removeListener(e2, t) {
    this.events.removeListener(e2, t);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await uo2(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, await this.transportDisconnect();
  }
  async transportOpen(e2) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t, s3) => {
      await this.connect(e2).then(t).catch(s3).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e2) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e2 || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Zi()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e2) {
    if ((e2 == null ? void 0 : e2.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t = e2.sort((s3, i4) => s3.publishedAt - i4.publishedAt);
    this.logger.debug(`Batch of ${t.length} message events sorted`);
    for (const s3 of t) try {
      await this.onMessageEvent(s3);
    } catch (i4) {
      this.logger.warn(i4, "Error while processing batch message event: " + (i4 == null ? void 0 : i4.message));
    }
    this.logger.trace(`Batch of ${t.length} message events processed`);
  }
  async onLinkMessageEvent(e2, t) {
    const { topic: s3 } = e2;
    if (!t.sessionExists) {
      const i4 = po2(import_time4.FIVE_MINUTES), n5 = { topic: s3, expiry: i4, relay: { protocol: "irn" }, active: false };
      await this.core.pairing.pairings.set(s3, n5);
    }
    this.events.emit(C3.message, e2), await this.recordMessageEvent(e2, le3.inbound);
  }
  async connect(e2) {
    await this.confirmOnlineStateOrThrow(), e2 && e2 !== this.relayUrl && (this.relayUrl = e2, await this.transportDisconnect()), this.connectionAttemptInProgress = true, this.transportExplicitlyClosed = false;
    let t = 1;
    for (; t < 6; ) {
      try {
        if (this.transportExplicitlyClosed) break;
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t}...`), await this.createProvider(), await new Promise(async (s3, i4) => {
          const n5 = () => {
            i4(new Error("Connection interrupted while trying to subscribe"));
          };
          this.provider.once(L2.disconnect, n5), await uo2(new Promise((o7, a3) => {
            this.provider.connect().then(o7).catch(a3);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o7) => {
            i4(o7);
          }).finally(() => {
            this.provider.off(L2.disconnect, n5), clearTimeout(this.reconnectTimeout);
          }), await new Promise(async (o7, a3) => {
            const c7 = () => {
              a3(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(L2.disconnect, c7), await this.subscriber.start().then(o7).catch(a3).finally(() => {
              this.provider.off(L2.disconnect, c7);
            });
          }), this.hasExperiencedNetworkDisruption = false, s3();
        });
      } catch (s3) {
        await this.subscriber.stop();
        const i4 = s3;
        this.logger.warn({}, i4.message), this.hasExperiencedNetworkDisruption = true;
      } finally {
        this.connectionAttemptInProgress = false;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t}`);
        break;
      }
      await new Promise((s3) => setTimeout(s3, (0, import_time4.toMiliseconds)(t * 1))), t++;
    }
  }
  startPingTimeout() {
    var e2, t, s3, i4, n5;
    if (et()) try {
      (t = (e2 = this.provider) == null ? void 0 : e2.connection) != null && t.socket && ((n5 = (i4 = (s3 = this.provider) == null ? void 0 : s3.connection) == null ? void 0 : i4.socket) == null || n5.on("ping", () => {
        this.resetPingTimeout();
      })), this.resetPingTimeout();
    } catch (o7) {
      this.logger.warn(o7, o7 == null ? void 0 : o7.message);
    }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e2 = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new o3(new f3(Qr2({ sdkVersion: _e3, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e2, useOnCloseEvent: true, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e2, t) {
    const { topic: s3, message: i4 } = e2;
    await this.messages.set(s3, i4, t);
  }
  async shouldIgnoreMessageEvent(e2) {
    const { topic: t, message: s3 } = e2;
    if (!s3 || s3.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${s3}`), true;
    if (!await this.subscriber.isKnownTopic(t)) return this.logger.warn(`Ignoring message for unknown topic ${t}`), true;
    const i4 = this.messages.has(t, s3);
    return i4 && this.logger.warn(`Ignoring duplicate message: ${s3}`), i4;
  }
  async onProviderPayload(e2) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e2 }), isJsonRpcRequest(e2)) {
      if (!e2.method.endsWith(zt3)) return;
      const t = e2.params, { topic: s3, message: i4, publishedAt: n5, attestation: o7 } = t.data, a3 = { topic: s3, message: i4, publishedAt: n5, transportType: Q3.relay, attestation: o7 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Pi2({ type: "event", event: t.id }, a3)), this.events.emit(t.id, a3), await this.acknowledgePayload(e2), await this.onMessageEvent(a3);
    } else isJsonRpcResponse(e2) && this.events.emit(C3.message_ack, e2);
  }
  async onMessageEvent(e2) {
    await this.shouldIgnoreMessageEvent(e2) || (await this.recordMessageEvent(e2, le3.inbound), this.events.emit(C3.message, e2));
  }
  async acknowledgePayload(e2) {
    const t = formatJsonRpcResult(e2.id, true);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(L2.payload, this.onPayloadHandler), this.provider.off(L2.connect, this.onConnectHandler), this.provider.off(L2.disconnect, this.onDisconnectHandler), this.provider.off(L2.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e2 = await Zi();
    Qi(async (t) => {
      e2 !== t && (e2 = t, t ? await this.transportOpen().catch((s3) => this.logger.error(s3, s3 == null ? void 0 : s3.message)) : (this.hasExperiencedNetworkDisruption = true, await this.transportDisconnect(), this.transportExplicitlyClosed = false));
    });
  }
  async onProviderDisconnect() {
    clearTimeout(this.pingTimeout), this.events.emit(C3.disconnect), this.connectionAttemptInProgress = false, !this.reconnectInProgress && (this.reconnectInProgress = true, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e2) => this.logger.error(e2, e2 == null ? void 0 : e2.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = false;
    }, (0, import_time4.toMiliseconds)(Lt3)))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  async toEstablishConnection() {
    await this.confirmOnlineStateOrThrow(), !this.connected && await this.connect();
  }
};
function io2() {
}
function Ri2(r3) {
  if (!r3 || typeof r3 != "object") return false;
  const e2 = Object.getPrototypeOf(r3);
  return e2 === null || e2 === Object.prototype || Object.getPrototypeOf(e2) === null ? Object.prototype.toString.call(r3) === "[object Object]" : false;
}
function Oi(r3) {
  return Object.getOwnPropertySymbols(r3).filter((e2) => Object.prototype.propertyIsEnumerable.call(r3, e2));
}
function Ai(r3) {
  return r3 == null ? r3 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r3);
}
var so2 = "[object RegExp]";
var ro3 = "[object String]";
var no2 = "[object Number]";
var oo3 = "[object Boolean]";
var xi2 = "[object Arguments]";
var ao3 = "[object Symbol]";
var co2 = "[object Date]";
var ho3 = "[object Map]";
var lo3 = "[object Set]";
var uo3 = "[object Array]";
var go3 = "[object Function]";
var po3 = "[object ArrayBuffer]";
var Je2 = "[object Object]";
var yo3 = "[object Error]";
var bo3 = "[object DataView]";
var mo3 = "[object Uint8Array]";
var fo3 = "[object Uint8ClampedArray]";
var Do3 = "[object Uint16Array]";
var vo3 = "[object Uint32Array]";
var wo3 = "[object BigUint64Array]";
var _o3 = "[object Int8Array]";
var Eo3 = "[object Int16Array]";
var Io3 = "[object Int32Array]";
var To3 = "[object BigInt64Array]";
var Co3 = "[object Float32Array]";
var Po3 = "[object Float64Array]";
function So3(r3, e2) {
  return r3 === e2 || Number.isNaN(r3) && Number.isNaN(e2);
}
function Ro3(r3, e2, t) {
  return pe2(r3, e2, void 0, void 0, void 0, void 0, t);
}
function pe2(r3, e2, t, s3, i4, n5, o7) {
  const a3 = o7(r3, e2, t, s3, i4, n5);
  if (a3 !== void 0) return a3;
  if (typeof r3 == typeof e2) switch (typeof r3) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return r3 === e2;
    case "number":
      return r3 === e2 || Object.is(r3, e2);
    case "function":
      return r3 === e2;
    case "object":
      return ye2(r3, e2, n5, o7);
  }
  return ye2(r3, e2, n5, o7);
}
function ye2(r3, e2, t, s3) {
  if (Object.is(r3, e2)) return true;
  let i4 = Ai(r3), n5 = Ai(e2);
  if (i4 === xi2 && (i4 = Je2), n5 === xi2 && (n5 = Je2), i4 !== n5) return false;
  switch (i4) {
    case ro3:
      return r3.toString() === e2.toString();
    case no2: {
      const c7 = r3.valueOf(), h5 = e2.valueOf();
      return So3(c7, h5);
    }
    case oo3:
    case co2:
    case ao3:
      return Object.is(r3.valueOf(), e2.valueOf());
    case so2:
      return r3.source === e2.source && r3.flags === e2.flags;
    case go3:
      return r3 === e2;
  }
  t = t ?? /* @__PURE__ */ new Map();
  const o7 = t.get(r3), a3 = t.get(e2);
  if (o7 != null && a3 != null) return o7 === e2;
  t.set(r3, e2), t.set(e2, r3);
  try {
    switch (i4) {
      case ho3: {
        if (r3.size !== e2.size) return false;
        for (const [c7, h5] of r3.entries()) if (!e2.has(c7) || !pe2(h5, e2.get(c7), c7, r3, e2, t, s3)) return false;
        return true;
      }
      case lo3: {
        if (r3.size !== e2.size) return false;
        const c7 = Array.from(r3.values()), h5 = Array.from(e2.values());
        for (let u4 = 0; u4 < c7.length; u4++) {
          const d6 = c7[u4], g6 = h5.findIndex((_5) => pe2(d6, _5, void 0, r3, e2, t, s3));
          if (g6 === -1) return false;
          h5.splice(g6, 1);
        }
        return true;
      }
      case uo3:
      case mo3:
      case fo3:
      case Do3:
      case vo3:
      case wo3:
      case _o3:
      case Eo3:
      case Io3:
      case To3:
      case Co3:
      case Po3: {
        if (typeof Buffer < "u" && Buffer.isBuffer(r3) !== Buffer.isBuffer(e2) || r3.length !== e2.length) return false;
        for (let c7 = 0; c7 < r3.length; c7++) if (!pe2(r3[c7], e2[c7], c7, r3, e2, t, s3)) return false;
        return true;
      }
      case po3:
        return r3.byteLength !== e2.byteLength ? false : ye2(new Uint8Array(r3), new Uint8Array(e2), t, s3);
      case bo3:
        return r3.byteLength !== e2.byteLength || r3.byteOffset !== e2.byteOffset ? false : ye2(new Uint8Array(r3), new Uint8Array(e2), t, s3);
      case yo3:
        return r3.name === e2.name && r3.message === e2.message;
      case Je2: {
        if (!(ye2(r3.constructor, e2.constructor, t, s3) || Ri2(r3) && Ri2(e2))) return false;
        const h5 = [...Object.keys(r3), ...Oi(r3)], u4 = [...Object.keys(e2), ...Oi(e2)];
        if (h5.length !== u4.length) return false;
        for (let d6 = 0; d6 < h5.length; d6++) {
          const g6 = h5[d6], _5 = r3[g6];
          if (!Object.hasOwn(e2, g6)) return false;
          const l7 = e2[g6];
          if (!pe2(_5, l7, g6, r3, e2, t, s3)) return false;
        }
        return true;
      }
      default:
        return false;
    }
  } finally {
    t.delete(r3), t.delete(e2);
  }
}
function Oo3(r3, e2) {
  return Ro3(r3, e2, io2);
}
var Ao3 = Object.defineProperty;
var Ni = Object.getOwnPropertySymbols;
var xo3 = Object.prototype.hasOwnProperty;
var No3 = Object.prototype.propertyIsEnumerable;
var Xe2 = (r3, e2, t) => e2 in r3 ? Ao3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var $i = (r3, e2) => {
  for (var t in e2 || (e2 = {})) xo3.call(e2, t) && Xe2(r3, t, e2[t]);
  if (Ni) for (var t of Ni(e2)) No3.call(e2, t) && Xe2(r3, t, e2[t]);
  return r3;
};
var z4 = (r3, e2, t) => Xe2(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var zi2 = class extends f2 {
  constructor(e2, t, s3, i4 = B2, n5 = void 0) {
    super(e2, t, s3, i4), this.core = e2, this.logger = t, this.name = s3, z4(this, "map", /* @__PURE__ */ new Map()), z4(this, "version", kt3), z4(this, "cached", []), z4(this, "initialized", false), z4(this, "getKey"), z4(this, "storagePrefix", B2), z4(this, "recentlyDeleted", []), z4(this, "recentlyDeletedLimit", 200), z4(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o7) => {
        this.getKey && o7 !== null && !ae(o7) ? this.map.set(this.getKey(o7), o7) : Li(o7) ? this.map.set(o7.id, o7) : ji(o7) && this.map.set(o7.topic, o7);
      }), this.cached = [], this.initialized = true);
    }), z4(this, "set", async (o7, a3) => {
      this.isInitialized(), this.map.has(o7) ? await this.update(o7, a3) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o7, value: a3 }), this.map.set(o7, a3), await this.persist());
    }), z4(this, "get", (o7) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o7 }), this.getData(o7))), z4(this, "getAll", (o7) => (this.isInitialized(), o7 ? this.values.filter((a3) => Object.keys(o7).every((c7) => Oo3(a3[c7], o7[c7]))) : this.values)), z4(this, "update", async (o7, a3) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o7, update: a3 });
      const c7 = $i($i({}, this.getData(o7)), a3);
      this.map.set(o7, c7), await this.persist();
    }), z4(this, "delete", async (o7, a3) => {
      this.isInitialized(), this.map.has(o7) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o7, reason: a3 }), this.map.delete(o7), this.addToRecentlyDeleted(o7), await this.persist());
    }), this.logger = E2(t, this.name), this.storagePrefix = i4, this.getKey = n5;
  }
  get context() {
    return y2(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e2) {
    this.recentlyDeleted.push(e2), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e2) {
    const t = this.map.get(e2);
    if (!t) {
      if (this.recentlyDeleted.includes(e2)) {
        const { message: i4 } = te2("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e2}`);
        throw this.logger.error(i4), new Error(i4);
      }
      const { message: s3 } = te2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw this.logger.error(s3), new Error(s3);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e2 = await this.getDataStore();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.map.size) {
        const { message: t } = te2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e2);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var $o3 = Object.defineProperty;
var zo3 = (r3, e2, t) => e2 in r3 ? $o3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var p3 = (r3, e2, t) => zo3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Li2 = class {
  constructor(e2, t) {
    this.core = e2, this.logger = t, p3(this, "name", Ft3), p3(this, "version", Kt2), p3(this, "events", new import_events7.default()), p3(this, "pairings"), p3(this, "initialized", false), p3(this, "storagePrefix", B2), p3(this, "ignoredPayloadTypes", [Oe2]), p3(this, "registeredMethods", []), p3(this, "init", async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }), p3(this, "register", ({ methods: s3 }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...s3])];
    }), p3(this, "create", async (s3) => {
      this.isInitialized();
      const i4 = oi(), n5 = await this.core.crypto.setSymKey(i4), o7 = po2(import_time4.FIVE_MINUTES), a3 = { protocol: xt3 }, c7 = { topic: n5, expiry: o7, relay: a3, active: false, methods: s3 == null ? void 0 : s3.methods }, h5 = vi({ protocol: this.core.protocol, version: this.core.version, topic: n5, symKey: i4, relay: a3, expiryTimestamp: o7, methods: s3 == null ? void 0 : s3.methods });
      return this.events.emit(se2.create, c7), this.core.expirer.set(n5, o7), await this.pairings.set(n5, c7), await this.core.relayer.subscribe(n5, { transportType: s3 == null ? void 0 : s3.transportType }), { topic: n5, uri: h5 };
    }), p3(this, "pair", async (s3) => {
      this.isInitialized();
      const i4 = this.core.eventClient.createEvent({ properties: { topic: s3 == null ? void 0 : s3.uri, trace: [G2.pairing_started] } });
      this.isValidPair(s3, i4);
      const { topic: n5, symKey: o7, relay: a3, expiryTimestamp: c7, methods: h5 } = Ei(s3.uri);
      i4.props.properties.topic = n5, i4.addTrace(G2.pairing_uri_validation_success), i4.addTrace(G2.pairing_uri_not_expired);
      let u4;
      if (this.pairings.keys.includes(n5)) {
        if (u4 = this.pairings.get(n5), i4.addTrace(G2.existing_pairing), u4.active) throw i4.setError(Y2.active_pairing_already_exists), new Error(`Pairing already exists: ${n5}. Please try again with a new connection URI.`);
        i4.addTrace(G2.pairing_not_expired);
      }
      const d6 = c7 || po2(import_time4.FIVE_MINUTES), g6 = { topic: n5, relay: a3, expiry: d6, active: false, methods: h5 };
      this.core.expirer.set(n5, d6), await this.pairings.set(n5, g6), i4.addTrace(G2.store_new_pairing), s3.activatePairing && await this.activate({ topic: n5 }), this.events.emit(se2.create, g6), i4.addTrace(G2.emit_inactive_pairing), this.core.crypto.keychain.has(n5) || await this.core.crypto.setSymKey(o7, n5), i4.addTrace(G2.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        i4.setError(Y2.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(n5, { relay: a3 });
      } catch (_5) {
        throw i4.setError(Y2.subscribe_pairing_topic_failure), _5;
      }
      return i4.addTrace(G2.subscribe_pairing_topic_success), g6;
    }), p3(this, "activate", async ({ topic: s3 }) => {
      this.isInitialized();
      const i4 = po2(import_time4.FIVE_MINUTES);
      this.core.expirer.set(s3, i4), await this.pairings.update(s3, { active: true, expiry: i4 });
    }), p3(this, "ping", async (s3) => {
      this.isInitialized(), await this.isValidPing(s3), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: i4 } = s3;
      if (this.pairings.keys.includes(i4)) {
        const n5 = await this.sendRequest(i4, "wc_pairingPing", {}), { done: o7, resolve: a3, reject: c7 } = ao2();
        this.events.once(yo2("pairing_ping", n5), ({ error: h5 }) => {
          h5 ? c7(h5) : a3();
        }), await o7();
      }
    }), p3(this, "updateExpiry", async ({ topic: s3, expiry: i4 }) => {
      this.isInitialized(), await this.pairings.update(s3, { expiry: i4 });
    }), p3(this, "updateMetadata", async ({ topic: s3, metadata: i4 }) => {
      this.isInitialized(), await this.pairings.update(s3, { peerMetadata: i4 });
    }), p3(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), p3(this, "disconnect", async (s3) => {
      this.isInitialized(), await this.isValidDisconnect(s3);
      const { topic: i4 } = s3;
      this.pairings.keys.includes(i4) && (await this.sendRequest(i4, "wc_pairingDelete", de2("USER_DISCONNECTED")), await this.deletePairing(i4));
    }), p3(this, "formatUriFromPairing", (s3) => {
      this.isInitialized();
      const { topic: i4, relay: n5, expiry: o7, methods: a3 } = s3, c7 = this.core.crypto.keychain.get(i4);
      return vi({ protocol: this.core.protocol, version: this.core.version, topic: i4, symKey: c7, relay: n5, expiryTimestamp: o7, methods: a3 });
    }), p3(this, "sendRequest", async (s3, i4, n5) => {
      const o7 = formatJsonRpcRequest(i4, n5), a3 = await this.core.crypto.encode(s3, o7), c7 = ie2[i4].req;
      return this.core.history.set(s3, o7), this.core.relayer.publish(s3, a3, c7), o7.id;
    }), p3(this, "sendResult", async (s3, i4, n5) => {
      const o7 = formatJsonRpcResult(s3, n5), a3 = await this.core.crypto.encode(i4, o7), c7 = (await this.core.history.get(i4, s3)).request.method, h5 = ie2[c7].res;
      await this.core.relayer.publish(i4, a3, h5), await this.core.history.resolve(o7);
    }), p3(this, "sendError", async (s3, i4, n5) => {
      const o7 = formatJsonRpcError(s3, n5), a3 = await this.core.crypto.encode(i4, o7), c7 = (await this.core.history.get(i4, s3)).request.method, h5 = ie2[c7] ? ie2[c7].res : ie2.unregistered_method.res;
      await this.core.relayer.publish(i4, a3, h5), await this.core.history.resolve(o7);
    }), p3(this, "deletePairing", async (s3, i4) => {
      await this.core.relayer.unsubscribe(s3), await Promise.all([this.pairings.delete(s3, de2("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(s3), i4 ? Promise.resolve() : this.core.expirer.del(s3)]);
    }), p3(this, "cleanup", async () => {
      const s3 = this.pairings.getAll().filter((i4) => go2(i4.expiry));
      await Promise.all(s3.map((i4) => this.deletePairing(i4.topic)));
    }), p3(this, "onRelayEventRequest", async (s3) => {
      const { topic: i4, payload: n5 } = s3;
      switch (n5.method) {
        case "wc_pairingPing":
          return await this.onPairingPingRequest(i4, n5);
        case "wc_pairingDelete":
          return await this.onPairingDeleteRequest(i4, n5);
        default:
          return await this.onUnknownRpcMethodRequest(i4, n5);
      }
    }), p3(this, "onRelayEventResponse", async (s3) => {
      const { topic: i4, payload: n5 } = s3, o7 = (await this.core.history.get(i4, n5.id)).request.method;
      switch (o7) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(i4, n5);
        default:
          return this.onUnknownRpcMethodResponse(o7);
      }
    }), p3(this, "onPairingPingRequest", async (s3, i4) => {
      const { id: n5 } = i4;
      try {
        this.isValidPing({ topic: s3 }), await this.sendResult(n5, s3, true), this.events.emit(se2.ping, { id: n5, topic: s3 });
      } catch (o7) {
        await this.sendError(n5, s3, o7), this.logger.error(o7);
      }
    }), p3(this, "onPairingPingResponse", (s3, i4) => {
      const { id: n5 } = i4;
      setTimeout(() => {
        isJsonRpcResult(i4) ? this.events.emit(yo2("pairing_ping", n5), {}) : isJsonRpcError(i4) && this.events.emit(yo2("pairing_ping", n5), { error: i4.error });
      }, 500);
    }), p3(this, "onPairingDeleteRequest", async (s3, i4) => {
      const { id: n5 } = i4;
      try {
        this.isValidDisconnect({ topic: s3 }), await this.deletePairing(s3), this.events.emit(se2.delete, { id: n5, topic: s3 });
      } catch (o7) {
        await this.sendError(n5, s3, o7), this.logger.error(o7);
      }
    }), p3(this, "onUnknownRpcMethodRequest", async (s3, i4) => {
      const { id: n5, method: o7 } = i4;
      try {
        if (this.registeredMethods.includes(o7)) return;
        const a3 = de2("WC_METHOD_UNSUPPORTED", o7);
        await this.sendError(n5, s3, a3), this.logger.error(a3);
      } catch (a3) {
        await this.sendError(n5, s3, a3), this.logger.error(a3);
      }
    }), p3(this, "onUnknownRpcMethodResponse", (s3) => {
      this.registeredMethods.includes(s3) || this.logger.error(de2("WC_METHOD_UNSUPPORTED", s3));
    }), p3(this, "isValidPair", (s3, i4) => {
      var n5;
      if (!Vi(s3)) {
        const { message: a3 } = te2("MISSING_OR_INVALID", `pair() params: ${s3}`);
        throw i4.setError(Y2.malformed_pairing_uri), new Error(a3);
      }
      if (!Bi(s3.uri)) {
        const { message: a3 } = te2("MISSING_OR_INVALID", `pair() uri: ${s3.uri}`);
        throw i4.setError(Y2.malformed_pairing_uri), new Error(a3);
      }
      const o7 = Ei(s3 == null ? void 0 : s3.uri);
      if (!((n5 = o7 == null ? void 0 : o7.relay) != null && n5.protocol)) {
        const { message: a3 } = te2("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw i4.setError(Y2.malformed_pairing_uri), new Error(a3);
      }
      if (!(o7 != null && o7.symKey)) {
        const { message: a3 } = te2("MISSING_OR_INVALID", "pair() uri#symKey");
        throw i4.setError(Y2.malformed_pairing_uri), new Error(a3);
      }
      if (o7 != null && o7.expiryTimestamp && (0, import_time4.toMiliseconds)(o7 == null ? void 0 : o7.expiryTimestamp) < Date.now()) {
        i4.setError(Y2.pairing_expired);
        const { message: a3 } = te2("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a3);
      }
    }), p3(this, "isValidPing", async (s3) => {
      if (!Vi(s3)) {
        const { message: n5 } = te2("MISSING_OR_INVALID", `ping() params: ${s3}`);
        throw new Error(n5);
      }
      const { topic: i4 } = s3;
      await this.isValidPairingTopic(i4);
    }), p3(this, "isValidDisconnect", async (s3) => {
      if (!Vi(s3)) {
        const { message: n5 } = te2("MISSING_OR_INVALID", `disconnect() params: ${s3}`);
        throw new Error(n5);
      }
      const { topic: i4 } = s3;
      await this.isValidPairingTopic(i4);
    }), p3(this, "isValidPairingTopic", async (s3) => {
      if (!q(s3, false)) {
        const { message: i4 } = te2("MISSING_OR_INVALID", `pairing topic should be a string: ${s3}`);
        throw new Error(i4);
      }
      if (!this.pairings.keys.includes(s3)) {
        const { message: i4 } = te2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${s3}`);
        throw new Error(i4);
      }
      if (go2(this.pairings.get(s3).expiry)) {
        await this.deletePairing(s3);
        const { message: i4 } = te2("EXPIRED", `pairing topic: ${s3}`);
        throw new Error(i4);
      }
    }), this.core = e2, this.logger = E2(t, this.name), this.pairings = new zi2(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return y2(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(C3.message, async (e2) => {
      const { topic: t, message: s3, transportType: i4 } = e2;
      if (this.pairings.keys.includes(t) && i4 !== Q3.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(s3))) try {
        const n5 = await this.core.crypto.decode(t, s3);
        isJsonRpcRequest(n5) ? (this.core.history.set(t, n5), await this.onRelayEventRequest({ topic: t, payload: n5 })) : isJsonRpcResponse(n5) && (await this.core.history.resolve(n5), await this.onRelayEventResponse({ topic: t, payload: n5 }), this.core.history.delete(t, n5.id)), await this.core.relayer.messages.ack(t, s3);
      } catch (n5) {
        this.logger.error(n5);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(F2.expired, async (e2) => {
      const { topic: t } = ho2(e2.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, true), this.events.emit(se2.expire, { topic: t }));
    });
  }
};
var Lo3 = Object.defineProperty;
var ko3 = (r3, e2, t) => e2 in r3 ? Lo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var R2 = (r3, e2, t) => ko3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var ki2 = class extends I2 {
  constructor(e2, t) {
    super(e2, t), this.core = e2, this.logger = t, R2(this, "records", /* @__PURE__ */ new Map()), R2(this, "events", new import_events7.EventEmitter()), R2(this, "name", Bt3), R2(this, "version", Vt2), R2(this, "cached", []), R2(this, "initialized", false), R2(this, "storagePrefix", B2), R2(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s3) => this.records.set(s3.id, s3)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), R2(this, "set", (s3, i4, n5) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: s3, request: i4, chainId: n5 }), this.records.has(i4.id)) return;
      const o7 = { id: i4.id, topic: s3, request: { method: i4.method, params: i4.params || null }, chainId: n5, expiry: po2(import_time4.THIRTY_DAYS) };
      this.records.set(o7.id, o7), this.persist(), this.events.emit(M4.created, o7);
    }), R2(this, "resolve", async (s3) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: s3 }), !this.records.has(s3.id)) return;
      const i4 = await this.getRecord(s3.id);
      typeof i4.response > "u" && (i4.response = isJsonRpcError(s3) ? { error: s3.error } : { result: s3.result }, this.records.set(i4.id, i4), this.persist(), this.events.emit(M4.updated, i4));
    }), R2(this, "get", async (s3, i4) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: s3, id: i4 }), await this.getRecord(i4))), R2(this, "delete", (s3, i4) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: i4 }), this.values.forEach((n5) => {
        if (n5.topic === s3) {
          if (typeof i4 < "u" && n5.id !== i4) return;
          this.records.delete(n5.id), this.events.emit(M4.deleted, n5);
        }
      }), this.persist();
    }), R2(this, "exists", async (s3, i4) => (this.isInitialized(), this.records.has(i4) ? (await this.getRecord(i4)).topic === s3 : false)), R2(this, "on", (s3, i4) => {
      this.events.on(s3, i4);
    }), R2(this, "once", (s3, i4) => {
      this.events.once(s3, i4);
    }), R2(this, "off", (s3, i4) => {
      this.events.off(s3, i4);
    }), R2(this, "removeListener", (s3, i4) => {
      this.events.removeListener(s3, i4);
    }), this.logger = E2(t, this.name);
  }
  get context() {
    return y2(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e2 = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u") return;
      const s3 = { topic: t.topic, request: formatJsonRpcRequest(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e2.push(s3);
    }), e2;
  }
  async setJsonRpcRecords(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e2) {
    this.isInitialized();
    const t = this.records.get(e2);
    if (!t) {
      const { message: s3 } = te2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw new Error(s3);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(M4.sync);
  }
  async restore() {
    try {
      const e2 = await this.getJsonRpcRecords();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.records.size) {
        const { message: t } = te2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e2);
    }
  }
  registerEventListeners() {
    this.events.on(M4.created, (e2) => {
      const t = M4.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.events.on(M4.updated, (e2) => {
      const t = M4.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.events.on(M4.deleted, (e2) => {
      const t = M4.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e2 });
    }), this.core.heartbeat.on(r.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e2 = false;
      this.records.forEach((t) => {
        (0, import_time4.toMiliseconds)(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(M4.deleted, t, false), e2 = true);
      }), e2 && this.persist();
    } catch (e2) {
      this.logger.warn(e2);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var jo3 = Object.defineProperty;
var Uo3 = (r3, e2, t) => e2 in r3 ? jo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var A2 = (r3, e2, t) => Uo3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var ji2 = class extends S2 {
  constructor(e2, t) {
    super(e2, t), this.core = e2, this.logger = t, A2(this, "expirations", /* @__PURE__ */ new Map()), A2(this, "events", new import_events7.EventEmitter()), A2(this, "name", qt2), A2(this, "version", Gt3), A2(this, "cached", []), A2(this, "initialized", false), A2(this, "storagePrefix", B2), A2(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s3) => this.expirations.set(s3.target, s3)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), A2(this, "has", (s3) => {
      try {
        const i4 = this.formatTarget(s3);
        return typeof this.getExpiration(i4) < "u";
      } catch {
        return false;
      }
    }), A2(this, "set", (s3, i4) => {
      this.isInitialized();
      const n5 = this.formatTarget(s3), o7 = { target: n5, expiry: i4 };
      this.expirations.set(n5, o7), this.checkExpiry(n5, o7), this.events.emit(F2.created, { target: n5, expiration: o7 });
    }), A2(this, "get", (s3) => {
      this.isInitialized();
      const i4 = this.formatTarget(s3);
      return this.getExpiration(i4);
    }), A2(this, "del", (s3) => {
      if (this.isInitialized(), this.has(s3)) {
        const i4 = this.formatTarget(s3), n5 = this.getExpiration(i4);
        this.expirations.delete(i4), this.events.emit(F2.deleted, { target: i4, expiration: n5 });
      }
    }), A2(this, "on", (s3, i4) => {
      this.events.on(s3, i4);
    }), A2(this, "once", (s3, i4) => {
      this.events.once(s3, i4);
    }), A2(this, "off", (s3, i4) => {
      this.events.off(s3, i4);
    }), A2(this, "removeListener", (s3, i4) => {
      this.events.removeListener(s3, i4);
    }), this.logger = E2(t, this.name);
  }
  get context() {
    return y2(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e2) {
    if (typeof e2 == "string") return fo2(e2);
    if (typeof e2 == "number") return lo2(e2);
    const { message: t } = te2("UNKNOWN_TYPE", `Target type: ${typeof e2}`);
    throw new Error(t);
  }
  async setExpirations(e2) {
    await this.core.storage.setItem(this.storageKey, e2);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(F2.sync);
  }
  async restore() {
    try {
      const e2 = await this.getExpirations();
      if (typeof e2 > "u" || !e2.length) return;
      if (this.expirations.size) {
        const { message: t } = te2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e2, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e2) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e2);
    }
  }
  getExpiration(e2) {
    const t = this.expirations.get(e2);
    if (!t) {
      const { message: s3 } = te2("NO_MATCHING_KEY", `${this.name}: ${e2}`);
      throw this.logger.warn(s3), new Error(s3);
    }
    return t;
  }
  checkExpiry(e2, t) {
    const { expiry: s3 } = t;
    (0, import_time4.toMiliseconds)(s3) - Date.now() <= 0 && this.expire(e2, t);
  }
  expire(e2, t) {
    this.expirations.delete(e2), this.events.emit(F2.expired, { target: e2, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e2, t) => this.checkExpiry(t, e2));
  }
  registerEventListeners() {
    this.core.heartbeat.on(r.pulse, () => this.checkExpirations()), this.events.on(F2.created, (e2) => {
      const t = F2.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    }), this.events.on(F2.expired, (e2) => {
      const t = F2.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    }), this.events.on(F2.deleted, (e2) => {
      const t = F2.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e2 }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e2 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(e2);
    }
  }
};
var Mo3 = Object.defineProperty;
var Fo3 = (r3, e2, t) => e2 in r3 ? Mo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var w3 = (r3, e2, t) => Fo3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Ui = class extends M3 {
  constructor(e2, t, s3) {
    super(e2, t, s3), this.core = e2, this.logger = t, this.store = s3, w3(this, "name", Wt3), w3(this, "abortController"), w3(this, "isDevEnv"), w3(this, "verifyUrlV3", Yt3), w3(this, "storagePrefix", B2), w3(this, "version", Le2), w3(this, "publicKey"), w3(this, "fetchPromise"), w3(this, "init", async () => {
      var i4;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && (0, import_time4.toMiliseconds)((i4 = this.publicKey) == null ? void 0 : i4.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }), w3(this, "register", async (i4) => {
      if (!Ae2() || this.isDevEnv) return;
      const n5 = window.location.origin, { id: o7, decryptedId: a3 } = i4, c7 = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${n5}&id=${o7}&decryptedId=${a3}`;
      try {
        const h5 = (0, import_window_getters2.getDocument)(), u4 = this.startAbortTimer(import_time4.ONE_SECOND * 5), d6 = await new Promise((g6, _5) => {
          const l7 = () => {
            window.removeEventListener("message", x7), h5.body.removeChild(b6), _5("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", l7);
          const b6 = h5.createElement("iframe");
          b6.src = c7, b6.style.display = "none", b6.addEventListener("error", l7, { signal: this.abortController.signal });
          const x7 = (I4) => {
            if (I4.data && typeof I4.data == "string") try {
              const D4 = JSON.parse(I4.data);
              if (D4.type === "verify_attestation") {
                if (sn(D4.attestation).payload.id !== o7) return;
                clearInterval(u4), h5.body.removeChild(b6), this.abortController.signal.removeEventListener("abort", l7), window.removeEventListener("message", x7), g6(D4.attestation === null ? "" : D4.attestation);
              }
            } catch (D4) {
              this.logger.warn(D4);
            }
          };
          h5.body.appendChild(b6), window.addEventListener("message", x7, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", d6), d6;
      } catch (h5) {
        this.logger.warn(h5);
      }
      return "";
    }), w3(this, "resolve", async (i4) => {
      if (this.isDevEnv) return "";
      const { attestationId: n5, hash: o7, encryptedId: a3 } = i4;
      if (n5 === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (n5) {
        if (sn(n5).payload.id !== a3) return;
        const h5 = await this.isValidJwtAttestation(n5);
        if (h5) {
          if (!h5.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h5;
        }
      }
      if (!o7) return;
      const c7 = this.getVerifyUrl(i4 == null ? void 0 : i4.verifyUrl);
      return this.fetchAttestation(o7, c7);
    }), w3(this, "fetchAttestation", async (i4, n5) => {
      this.logger.debug(`resolving attestation: ${i4} from url: ${n5}`);
      const o7 = this.startAbortTimer(import_time4.ONE_SECOND * 5), a3 = await fetch(`${n5}/attestation/${i4}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o7), a3.status === 200 ? await a3.json() : void 0;
    }), w3(this, "getVerifyUrl", (i4) => {
      let n5 = i4 || ue2;
      return Jt3.includes(n5) || (this.logger.info(`verify url: ${n5}, not included in trusted list, assigning default: ${ue2}`), n5 = ue2), n5;
    }), w3(this, "fetchPublicKey", async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const i4 = this.startAbortTimer(import_time4.FIVE_SECONDS), n5 = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(i4), await n5.json();
      } catch (i4) {
        this.logger.warn(i4);
      }
    }), w3(this, "persistPublicKey", async (i4) => {
      this.logger.debug("persisting public key to local storage", i4), await this.store.setItem(this.storeKey, i4), this.publicKey = i4;
    }), w3(this, "removePublicKey", async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }), w3(this, "isValidJwtAttestation", async (i4) => {
      const n5 = await this.getPublicKey();
      try {
        if (n5) return this.validateAttestation(i4, n5);
      } catch (a3) {
        this.logger.error(a3), this.logger.warn("error validating attestation");
      }
      const o7 = await this.fetchAndPersistPublicKey();
      try {
        if (o7) return this.validateAttestation(i4, o7);
      } catch (a3) {
        this.logger.error(a3), this.logger.warn("error validating attestation");
      }
    }), w3(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), w3(this, "fetchAndPersistPublicKey", async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (n5) => {
        const o7 = await this.fetchPublicKey();
        o7 && (await this.persistPublicKey(o7), n5(o7));
      });
      const i4 = await this.fetchPromise;
      return this.fetchPromise = void 0, i4;
    }), w3(this, "validateAttestation", (i4, n5) => {
      const o7 = mi(i4, n5.publicKey), a3 = { hasExpired: (0, import_time4.toMiliseconds)(o7.exp) < Date.now(), payload: o7 };
      if (a3.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a3.payload.origin, isScam: a3.payload.isScam, isVerified: a3.payload.isVerified };
    }), this.logger = E2(t, this.name), this.abortController = new AbortController(), this.isDevEnv = vo2(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return y2(this.logger);
  }
  startAbortTimer(e2) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), (0, import_time4.toMiliseconds)(e2));
  }
};
var Ko3 = Object.defineProperty;
var Bo3 = (r3, e2, t) => e2 in r3 ? Ko3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var Mi2 = (r3, e2, t) => Bo3(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Fi2 = class extends O3 {
  constructor(e2, t) {
    super(e2, t), this.projectId = e2, this.logger = t, Mi2(this, "context", Xt2), Mi2(this, "registerDeviceToken", async (s3) => {
      const { clientId: i4, token: n5, notificationType: o7, enableEncrypted: a3 = false } = s3, c7 = `${Zt2}/${this.projectId}/clients`;
      await fetch(c7, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: i4, type: o7, token: n5, always_raw: a3 }) });
    }), this.logger = E2(t, this.context);
  }
};
var Vo3 = Object.defineProperty;
var Ki2 = Object.getOwnPropertySymbols;
var qo3 = Object.prototype.hasOwnProperty;
var Go3 = Object.prototype.propertyIsEnumerable;
var Ze2 = (r3, e2, t) => e2 in r3 ? Vo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var be3 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) qo3.call(e2, t) && Ze2(r3, t, e2[t]);
  if (Ki2) for (var t of Ki2(e2)) Go3.call(e2, t) && Ze2(r3, t, e2[t]);
  return r3;
};
var E3 = (r3, e2, t) => Ze2(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Bi2 = class extends R {
  constructor(e2, t, s3 = true) {
    super(e2, t, s3), this.core = e2, this.logger = t, E3(this, "context", ei2), E3(this, "storagePrefix", B2), E3(this, "storageVersion", Qt2), E3(this, "events", /* @__PURE__ */ new Map()), E3(this, "shouldPersist", false), E3(this, "init", async () => {
      if (!vo2()) try {
        const i4 = { eventId: Eo2(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: Yt2(this.core.relayer.protocol, this.core.relayer.version, _e3) } } };
        await this.sendEvent([i4]);
      } catch (i4) {
        this.logger.warn(i4);
      }
    }), E3(this, "createEvent", (i4) => {
      const { event: n5 = "ERROR", type: o7 = "", properties: { topic: a3, trace: c7 } } = i4, h5 = Eo2(), u4 = this.core.projectId || "", d6 = Date.now(), g6 = be3({ eventId: h5, timestamp: d6, props: { event: n5, type: o7, properties: { topic: a3, trace: c7 } }, bundleId: u4, domain: this.getAppDomain() }, this.setMethods(h5));
      return this.telemetryEnabled && (this.events.set(h5, g6), this.shouldPersist = true), g6;
    }), E3(this, "getEvent", (i4) => {
      const { eventId: n5, topic: o7 } = i4;
      if (n5) return this.events.get(n5);
      const a3 = Array.from(this.events.values()).find((c7) => c7.props.properties.topic === o7);
      if (a3) return be3(be3({}, a3), this.setMethods(a3.eventId));
    }), E3(this, "deleteEvent", (i4) => {
      const { eventId: n5 } = i4;
      this.events.delete(n5), this.shouldPersist = true;
    }), E3(this, "setEventListeners", () => {
      this.core.heartbeat.on(r.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((i4) => {
          (0, import_time4.fromMiliseconds)(Date.now()) - (0, import_time4.fromMiliseconds)(i4.timestamp) > ti2 && (this.events.delete(i4.eventId), this.shouldPersist = true);
        });
      });
    }), E3(this, "setMethods", (i4) => ({ addTrace: (n5) => this.addTrace(i4, n5), setError: (n5) => this.setError(i4, n5) })), E3(this, "addTrace", (i4, n5) => {
      const o7 = this.events.get(i4);
      o7 && (o7.props.properties.trace.push(n5), this.events.set(i4, o7), this.shouldPersist = true);
    }), E3(this, "setError", (i4, n5) => {
      const o7 = this.events.get(i4);
      o7 && (o7.props.type = n5, o7.timestamp = Date.now(), this.events.set(i4, o7), this.shouldPersist = true);
    }), E3(this, "persist", async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = false;
    }), E3(this, "restore", async () => {
      try {
        const i4 = await this.core.storage.getItem(this.storageKey) || [];
        if (!i4.length) return;
        i4.forEach((n5) => {
          this.events.set(n5.eventId, be3(be3({}, n5), this.setMethods(n5.eventId)));
        });
      } catch (i4) {
        this.logger.warn(i4);
      }
    }), E3(this, "submit", async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const i4 = [];
      for (const [n5, o7] of this.events) o7.props.type && i4.push(o7);
      if (i4.length !== 0) try {
        if ((await this.sendEvent(i4)).ok) for (const n5 of i4) this.events.delete(n5.eventId), this.shouldPersist = true;
      } catch (n5) {
        this.logger.warn(n5);
      }
    }), E3(this, "sendEvent", async (i4) => {
      const n5 = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${ii2}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${_e3}${n5}`, { method: "POST", body: JSON.stringify(i4) });
    }), E3(this, "getAppDomain", () => Xr2().url), this.logger = E2(t, this.context), this.telemetryEnabled = s3, s3 ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
};
var Wo3 = Object.defineProperty;
var Vi2 = Object.getOwnPropertySymbols;
var Ho3 = Object.prototype.hasOwnProperty;
var Yo3 = Object.prototype.propertyIsEnumerable;
var Qe2 = (r3, e2, t) => e2 in r3 ? Wo3(r3, e2, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e2] = t;
var qi2 = (r3, e2) => {
  for (var t in e2 || (e2 = {})) Ho3.call(e2, t) && Qe2(r3, t, e2[t]);
  if (Vi2) for (var t of Vi2(e2)) Yo3.call(e2, t) && Qe2(r3, t, e2[t]);
  return r3;
};
var v4 = (r3, e2, t) => Qe2(r3, typeof e2 != "symbol" ? e2 + "" : e2, t);
var Te3 = class _Te extends h3 {
  constructor(e2) {
    var t;
    super(e2), v4(this, "protocol", ze3), v4(this, "version", Le2), v4(this, "name", he2), v4(this, "relayUrl"), v4(this, "projectId"), v4(this, "customStoragePrefix"), v4(this, "events", new import_events7.EventEmitter()), v4(this, "logger"), v4(this, "heartbeat"), v4(this, "relayer"), v4(this, "crypto"), v4(this, "storage"), v4(this, "history"), v4(this, "expirer"), v4(this, "pairing"), v4(this, "verify"), v4(this, "echoClient"), v4(this, "linkModeSupportedApps"), v4(this, "eventClient"), v4(this, "initialized", false), v4(this, "logChunkController"), v4(this, "on", (o7, a3) => this.events.on(o7, a3)), v4(this, "once", (o7, a3) => this.events.once(o7, a3)), v4(this, "off", (o7, a3) => this.events.off(o7, a3)), v4(this, "removeListener", (o7, a3) => this.events.removeListener(o7, a3)), v4(this, "dispatchEnvelope", ({ topic: o7, message: a3, sessionExists: c7 }) => {
      if (!o7 || !a3) return;
      const h5 = { topic: o7, message: a3, publishedAt: Date.now(), transportType: Q3.link_mode };
      this.relayer.onLinkMessageEvent(h5, { sessionExists: c7 });
    }), this.projectId = e2 == null ? void 0 : e2.projectId, this.relayUrl = (e2 == null ? void 0 : e2.relayUrl) || Ue3, this.customStoragePrefix = e2 != null && e2.customStoragePrefix ? `:${e2.customStoragePrefix}` : "";
    const s3 = k3({ level: typeof (e2 == null ? void 0 : e2.logger) == "string" && e2.logger ? e2.logger : Et3.logger, name: he2 }), { logger: i4, chunkLoggerController: n5 } = A({ opts: s3, maxSizeInBytes: e2 == null ? void 0 : e2.maxLogBlobSizeInBytes, loggerOverride: e2 == null ? void 0 : e2.logger });
    this.logChunkController = n5, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var o7, a3;
      (o7 = this.logChunkController) != null && o7.downloadLogsBlobInBrowser && ((a3 = this.logChunkController) == null || a3.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = E2(i4, this.name), this.heartbeat = new i(), this.crypto = new vi2(this, this.logger, e2 == null ? void 0 : e2.keychain), this.history = new ki2(this, this.logger), this.expirer = new ji2(this, this.logger), this.storage = e2 != null && e2.storage ? e2.storage : new h(qi2(qi2({}, It3), e2 == null ? void 0 : e2.storageOptions)), this.relayer = new Si({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Li2(this, this.logger), this.verify = new Ui(this, this.logger, this.storage), this.echoClient = new Fi2(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new Bi2(this, this.logger, e2 == null ? void 0 : e2.telemetryEnabled);
  }
  static async init(e2) {
    const t = new _Te(e2);
    await t.initialize();
    const s3 = await t.crypto.getClientId();
    return await t.storage.setItem(jt3, s3), t;
  }
  get context() {
    return y2(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e2;
    return (e2 = this.logChunkController) == null ? void 0 : e2.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e2) {
    this.linkModeSupportedApps.includes(e2) || (this.linkModeSupportedApps.push(e2), await this.storage.setItem(Me3, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(Me3) || [], this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e2) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e2), this.logger.error(e2.message), e2;
    }
  }
};
var Jo3 = Te3;

// node_modules/@walletconnect/sign-client/dist/index.es.js
var import_time5 = __toESM(require_cjs());
var import_events8 = __toESM(require_events());
var De3 = "wc";
var Le3 = 2;
var ke4 = "client";
var we3 = `${De3}@${Le3}:${ke4}:`;
var me3 = { name: ke4, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.org" };
var Me4 = "WALLETCONNECT_DEEPLINK_CHOICE";
var pt2 = "proposal";
var $e3 = "Proposal expired";
var ht3 = "session";
var J4 = import_time5.SEVEN_DAYS;
var dt3 = "engine";
var N11 = { wc_sessionPropose: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1101 }, reject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1120 }, autoReject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1121 } }, wc_sessionSettle: { req: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: import_time5.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1114 }, res: { ttl: import_time5.ONE_DAY, prompt: false, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: import_time5.ONE_HOUR, prompt: true, tag: 1116 }, res: { ttl: import_time5.ONE_HOUR, prompt: false, tag: 1117 }, reject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1118 }, autoReject: { ttl: import_time5.FIVE_MINUTES, prompt: false, tag: 1119 } } };
var _e4 = { min: import_time5.FIVE_MINUTES, max: import_time5.SEVEN_DAYS };
var $2 = { idle: "IDLE", active: "ACTIVE" };
var Ue4 = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" } };
var ut3 = "request";
var gt3 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"];
var yt3 = "wc";
var wt3 = "auth";
var mt2 = "authKeys";
var _t3 = "pairingTopics";
var Et4 = "requests";
var ae2 = `${yt3}@${1.5}:${wt3}:`;
var ce2 = `${ae2}:PUB_KEY`;
var Rs2 = Object.defineProperty;
var vs2 = Object.defineProperties;
var Is2 = Object.getOwnPropertyDescriptors;
var ft3 = Object.getOwnPropertySymbols;
var Ts2 = Object.prototype.hasOwnProperty;
var qs2 = Object.prototype.propertyIsEnumerable;
var Ke4 = (S5, n5, e2) => n5 in S5 ? Rs2(S5, n5, { enumerable: true, configurable: true, writable: true, value: e2 }) : S5[n5] = e2;
var v5 = (S5, n5) => {
  for (var e2 in n5 || (n5 = {})) Ts2.call(n5, e2) && Ke4(S5, e2, n5[e2]);
  if (ft3) for (var e2 of ft3(n5)) qs2.call(n5, e2) && Ke4(S5, e2, n5[e2]);
  return S5;
};
var b4 = (S5, n5) => vs2(S5, Is2(n5));
var c5 = (S5, n5, e2) => Ke4(S5, typeof n5 != "symbol" ? n5 + "" : n5, e2);
var Ps2 = class extends V2 {
  constructor(n5) {
    super(n5), c5(this, "name", dt3), c5(this, "events", new import_events8.default()), c5(this, "initialized", false), c5(this, "requestQueue", { state: $2.idle, queue: [] }), c5(this, "sessionRequestQueue", { state: $2.idle, queue: [] }), c5(this, "requestQueueDelay", import_time5.ONE_SECOND), c5(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), c5(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), c5(this, "recentlyDeletedLimit", 200), c5(this, "relayMessageCache", []), c5(this, "pendingSessions", /* @__PURE__ */ new Map()), c5(this, "init", async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(N11) }), this.initialized = true, setTimeout(async () => {
        await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, (0, import_time5.toMiliseconds)(this.requestQueueDelay)));
    }), c5(this, "connect", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const t = b4(v5({}, e2), { requiredNamespaces: e2.requiredNamespaces || {}, optionalNamespaces: e2.optionalNamespaces || {} });
      await this.isValidConnect(t);
      const { pairingTopic: s3, requiredNamespaces: i4, optionalNamespaces: r3, sessionProperties: o7, scopedProperties: a3, relays: l7 } = t;
      let p6 = s3, h5, u4 = false;
      try {
        if (p6) {
          const T5 = this.client.core.pairing.pairings.get(p6);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), u4 = T5.active;
        }
      } catch (T5) {
        throw this.client.logger.error(`connect() -> pairing.get(${p6}) failed`), T5;
      }
      if (!p6 || !u4) {
        const { topic: T5, uri: U4 } = await this.client.core.pairing.create();
        p6 = T5, h5 = U4;
      }
      if (!p6) {
        const { message: T5 } = te2("NO_MATCHING_KEY", `connect() pairing topic: ${p6}`);
        throw new Error(T5);
      }
      const d6 = await this.client.core.crypto.generateKeyPair(), w7 = N11.wc_sessionPropose.req.ttl || import_time5.FIVE_MINUTES, m5 = po2(w7), f6 = b4(v5(v5({ requiredNamespaces: i4, optionalNamespaces: r3, relays: l7 ?? [{ protocol: xt3 }], proposer: { publicKey: d6, metadata: this.client.metadata }, expiryTimestamp: m5, pairingTopic: p6 }, o7 && { sessionProperties: o7 }), a3 && { scopedProperties: a3 }), { id: payloadId() }), _5 = yo2("session_connect", f6.id), { reject: g6, resolve: A5, done: D4 } = ao2(w7, $e3), I4 = ({ id: T5 }) => {
        T5 === f6.id && (this.client.events.off("proposal_expire", I4), this.pendingSessions.delete(f6.id), this.events.emit(_5, { error: { message: $e3, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", I4), this.events.once(_5, ({ error: T5, session: U4 }) => {
        this.client.events.off("proposal_expire", I4), T5 ? g6(T5) : U4 && A5(U4);
      }), await this.sendRequest({ topic: p6, method: "wc_sessionPropose", params: f6, throwOnFailedPublish: true, clientRpcId: f6.id }), await this.setProposal(f6.id, f6), { uri: h5, approval: D4 };
    }), c5(this, "pair", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(e2);
      } catch (t) {
        throw this.client.logger.error("pair() failed"), t;
      }
    }), c5(this, "approve", async (e2) => {
      var t, s3, i4;
      const r3 = this.client.core.eventClient.createEvent({ properties: { topic: (t = e2 == null ? void 0 : e2.id) == null ? void 0 : t.toString(), trace: [Qs2.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (q3) {
        throw r3.setError(er3.no_internet_connection), q3;
      }
      try {
        await this.isValidProposalId(e2 == null ? void 0 : e2.id);
      } catch (q3) {
        throw this.client.logger.error(`approve() -> proposal.get(${e2 == null ? void 0 : e2.id}) failed`), r3.setError(er3.proposal_not_found), q3;
      }
      try {
        await this.isValidApprove(e2);
      } catch (q3) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), r3.setError(er3.session_approve_namespace_validation_failure), q3;
      }
      const { id: o7, relayProtocol: a3, namespaces: l7, sessionProperties: p6, scopedProperties: h5, sessionConfig: u4 } = e2, d6 = this.client.proposal.get(o7);
      this.client.core.eventClient.deleteEvent({ eventId: r3.eventId });
      const { pairingTopic: w7, proposer: m5, requiredNamespaces: f6, optionalNamespaces: _5 } = d6;
      let g6 = (s3 = this.client.core.eventClient) == null ? void 0 : s3.getEvent({ topic: w7 });
      g6 || (g6 = (i4 = this.client.core.eventClient) == null ? void 0 : i4.createEvent({ type: Qs2.session_approve_started, properties: { topic: w7, trace: [Qs2.session_approve_started, Qs2.session_namespaces_validation_success] } }));
      const A5 = await this.client.core.crypto.generateKeyPair(), D4 = m5.publicKey, I4 = await this.client.core.crypto.generateSharedKey(A5, D4), T5 = v5(v5(v5({ relay: { protocol: a3 ?? "irn" }, namespaces: l7, controller: { publicKey: A5, metadata: this.client.metadata }, expiry: po2(J4) }, p6 && { sessionProperties: p6 }), h5 && { scopedProperties: h5 }), u4 && { sessionConfig: u4 }), U4 = Q3.relay;
      g6.addTrace(Qs2.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(I4, { transportType: U4 });
      } catch (q3) {
        throw g6.setError(er3.subscribe_session_topic_failure), q3;
      }
      g6.addTrace(Qs2.subscribe_session_topic_success);
      const fe5 = b4(v5({}, T5), { topic: I4, requiredNamespaces: f6, optionalNamespaces: _5, pairingTopic: w7, acknowledged: false, self: T5.controller, peer: { publicKey: m5.publicKey, metadata: m5.metadata }, controller: A5, transportType: Q3.relay });
      await this.client.session.set(I4, fe5), g6.addTrace(Qs2.store_session);
      try {
        g6.addTrace(Qs2.publishing_session_settle), await this.sendRequest({ topic: I4, method: "wc_sessionSettle", params: T5, throwOnFailedPublish: true }).catch((q3) => {
          throw g6 == null ? void 0 : g6.setError(er3.session_settle_publish_failure), q3;
        }), g6.addTrace(Qs2.session_settle_publish_success), g6.addTrace(Qs2.publishing_session_approve), await this.sendResult({ id: o7, topic: w7, result: { relay: { protocol: a3 ?? "irn" }, responderPublicKey: A5 }, throwOnFailedPublish: true }).catch((q3) => {
          throw g6 == null ? void 0 : g6.setError(er3.session_approve_publish_failure), q3;
        }), g6.addTrace(Qs2.session_approve_publish_success);
      } catch (q3) {
        throw this.client.logger.error(q3), this.client.session.delete(I4, de2("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(I4), q3;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: g6.eventId }), await this.client.core.pairing.updateMetadata({ topic: w7, metadata: m5.metadata }), await this.client.proposal.delete(o7, de2("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: w7 }), await this.setExpiry(I4, po2(J4)), { topic: I4, acknowledged: () => Promise.resolve(this.client.session.get(I4)) };
    }), c5(this, "reject", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(e2);
      } catch (r3) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), r3;
      }
      const { id: t, reason: s3 } = e2;
      let i4;
      try {
        i4 = this.client.proposal.get(t).pairingTopic;
      } catch (r3) {
        throw this.client.logger.error(`reject() -> proposal.get(${t}) failed`), r3;
      }
      i4 && (await this.sendError({ id: t, topic: i4, error: s3, rpcOpts: N11.wc_sessionPropose.reject }), await this.client.proposal.delete(t, de2("USER_DISCONNECTED")));
    }), c5(this, "update", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(e2);
      } catch (h5) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), h5;
      }
      const { topic: t, namespaces: s3 } = e2, { done: i4, resolve: r3, reject: o7 } = ao2(), a3 = payloadId(), l7 = getBigIntRpcId().toString(), p6 = this.client.session.get(t).namespaces;
      return this.events.once(yo2("session_update", a3), ({ error: h5 }) => {
        h5 ? o7(h5) : r3();
      }), await this.client.session.update(t, { namespaces: s3 }), await this.sendRequest({ topic: t, method: "wc_sessionUpdate", params: { namespaces: s3 }, throwOnFailedPublish: true, clientRpcId: a3, relayRpcId: l7 }).catch((h5) => {
        this.client.logger.error(h5), this.client.session.update(t, { namespaces: p6 }), o7(h5);
      }), { acknowledged: i4 };
    }), c5(this, "extend", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(e2);
      } catch (a3) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), a3;
      }
      const { topic: t } = e2, s3 = payloadId(), { done: i4, resolve: r3, reject: o7 } = ao2();
      return this.events.once(yo2("session_extend", s3), ({ error: a3 }) => {
        a3 ? o7(a3) : r3();
      }), await this.setExpiry(t, po2(J4)), this.sendRequest({ topic: t, method: "wc_sessionExtend", params: {}, clientRpcId: s3, throwOnFailedPublish: true }).catch((a3) => {
        o7(a3);
      }), { acknowledged: i4 };
    }), c5(this, "request", async (e2) => {
      this.isInitialized();
      try {
        await this.isValidRequest(e2);
      } catch (_5) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), _5;
      }
      const { chainId: t, request: s3, topic: i4, expiry: r3 = N11.wc_sessionRequest.req.ttl } = e2, o7 = this.client.session.get(i4);
      (o7 == null ? void 0 : o7.transportType) === Q3.relay && await this.confirmOnlineStateOrThrow();
      const a3 = payloadId(), l7 = getBigIntRpcId().toString(), { done: p6, resolve: h5, reject: u4 } = ao2(r3, "Request expired. Please try again.");
      this.events.once(yo2("session_request", a3), ({ error: _5, result: g6 }) => {
        _5 ? u4(_5) : h5(g6);
      });
      const d6 = "wc_sessionRequest", w7 = this.getAppLinkIfEnabled(o7.peer.metadata, o7.transportType);
      if (w7) return await this.sendRequest({ clientRpcId: a3, relayRpcId: l7, topic: i4, method: d6, params: { request: b4(v5({}, s3), { expiryTimestamp: po2(r3) }), chainId: t }, expiry: r3, throwOnFailedPublish: true, appLink: w7 }).catch((_5) => u4(_5)), this.client.events.emit("session_request_sent", { topic: i4, request: s3, chainId: t, id: a3 }), await p6();
      const m5 = { request: b4(v5({}, s3), { expiryTimestamp: po2(r3) }), chainId: t }, f6 = this.shouldSetTVF(d6, m5);
      return await Promise.all([new Promise(async (_5) => {
        await this.sendRequest(v5({ clientRpcId: a3, relayRpcId: l7, topic: i4, method: d6, params: m5, expiry: r3, throwOnFailedPublish: true }, f6 && { tvf: this.getTVFParams(a3, m5) })).catch((g6) => u4(g6)), this.client.events.emit("session_request_sent", { topic: i4, request: s3, chainId: t, id: a3 }), _5();
      }), new Promise(async (_5) => {
        var g6;
        if (!((g6 = o7.sessionConfig) != null && g6.disableDeepLink)) {
          const A5 = await bo2(this.client.core.storage, Me4);
          await mo2({ id: a3, topic: i4, wcDeepLink: A5 });
        }
        _5();
      }), p6()]).then((_5) => _5[2]);
    }), c5(this, "respond", async (e2) => {
      this.isInitialized(), await this.isValidRespond(e2);
      const { topic: t, response: s3 } = e2, { id: i4 } = s3, r3 = this.client.session.get(t);
      r3.transportType === Q3.relay && await this.confirmOnlineStateOrThrow();
      const o7 = this.getAppLinkIfEnabled(r3.peer.metadata, r3.transportType);
      isJsonRpcResult(s3) ? await this.sendResult({ id: i4, topic: t, result: s3.result, throwOnFailedPublish: true, appLink: o7 }) : isJsonRpcError(s3) && await this.sendError({ id: i4, topic: t, error: s3.error, appLink: o7 }), this.cleanupAfterResponse(e2);
    }), c5(this, "ping", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(e2);
      } catch (s3) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), s3;
      }
      const { topic: t } = e2;
      if (this.client.session.keys.includes(t)) {
        const s3 = payloadId(), i4 = getBigIntRpcId().toString(), { done: r3, resolve: o7, reject: a3 } = ao2();
        this.events.once(yo2("session_ping", s3), ({ error: l7 }) => {
          l7 ? a3(l7) : o7();
        }), await Promise.all([this.sendRequest({ topic: t, method: "wc_sessionPing", params: {}, throwOnFailedPublish: true, clientRpcId: s3, relayRpcId: i4 }), r3()]);
      } else this.client.core.pairing.pairings.keys.includes(t) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: t }));
    }), c5(this, "emit", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(e2);
      const { topic: t, event: s3, chainId: i4 } = e2, r3 = getBigIntRpcId().toString(), o7 = payloadId();
      await this.sendRequest({ topic: t, method: "wc_sessionEvent", params: { event: s3, chainId: i4 }, throwOnFailedPublish: true, relayRpcId: r3, clientRpcId: o7 });
    }), c5(this, "disconnect", async (e2) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(e2);
      const { topic: t } = e2;
      if (this.client.session.keys.includes(t)) await this.sendRequest({ topic: t, method: "wc_sessionDelete", params: de2("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession({ topic: t, emitEvent: false });
      else if (this.client.core.pairing.pairings.keys.includes(t)) await this.client.core.pairing.disconnect({ topic: t });
      else {
        const { message: s3 } = te2("MISMATCHED_TOPIC", `Session or pairing topic not found: ${t}`);
        throw new Error(s3);
      }
    }), c5(this, "find", (e2) => (this.isInitialized(), this.client.session.getAll().filter((t) => Pi(t, e2)))), c5(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), c5(this, "authenticate", async (e2, t) => {
      var s3;
      this.isInitialized(), this.isValidAuthenticate(e2);
      const i4 = t && this.client.core.linkModeSupportedApps.includes(t) && ((s3 = this.client.metadata.redirect) == null ? void 0 : s3.linkMode), r3 = i4 ? Q3.link_mode : Q3.relay;
      r3 === Q3.relay && await this.confirmOnlineStateOrThrow();
      const { chains: o7, statement: a3 = "", uri: l7, domain: p6, nonce: h5, type: u4, exp: d6, nbf: w7, methods: m5 = [], expiry: f6 } = e2, _5 = [...e2.resources || []], { topic: g6, uri: A5 } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: r3 });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: g6, uri: A5 } });
      const D4 = await this.client.core.crypto.generateKeyPair(), I4 = ii(D4);
      if (await Promise.all([this.client.auth.authKeys.set(ce2, { responseTopic: I4, publicKey: D4 }), this.client.auth.pairingTopics.set(I4, { topic: I4, pairingTopic: g6 })]), await this.client.core.relayer.subscribe(I4, { transportType: r3 }), this.client.logger.info(`sending request to new pairing topic: ${g6}`), m5.length > 0) {
        const { namespace: x7 } = Ye2(o7[0]);
        let L6 = rs(x7, "request", m5);
        Me2(_5) && (L6 = os(L6, _5.pop())), _5.push(L6);
      }
      const T5 = f6 && f6 > N11.wc_sessionAuthenticate.req.ttl ? f6 : N11.wc_sessionAuthenticate.req.ttl, U4 = { authPayload: { type: u4 ?? "caip122", chains: o7, statement: a3, aud: l7, domain: p6, version: "1", nonce: h5, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: d6, nbf: w7, resources: _5 }, requester: { publicKey: D4, metadata: this.client.metadata }, expiryTimestamp: po2(T5) }, fe5 = { eip155: { chains: o7, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m5])], events: ["chainChanged", "accountsChanged"] } }, q3 = { requiredNamespaces: {}, optionalNamespaces: fe5, relays: [{ protocol: "irn" }], pairingTopic: g6, proposer: { publicKey: D4, metadata: this.client.metadata }, expiryTimestamp: po2(N11.wc_sessionPropose.req.ttl), id: payloadId() }, { done: Rt5, resolve: je5, reject: Se5 } = ao2(T5, "Request expired"), te5 = payloadId(), le5 = yo2("session_connect", q3.id), Re4 = yo2("session_request", te5), pe4 = async ({ error: x7, session: L6 }) => {
        this.events.off(Re4, ve4), x7 ? Se5(x7) : L6 && je5({ session: L6 });
      }, ve4 = async (x7) => {
        var L6, Fe4, Qe4;
        if (await this.deletePendingAuthRequest(te5, { message: "fulfilled", code: 0 }), x7.error) {
          const ie4 = de2("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return x7.error.code === ie4.code ? void 0 : (this.events.off(le5, pe4), Se5(x7.error.message));
        }
        await this.deleteProposal(q3.id), this.events.off(le5, pe4);
        const { cacaos: He5, responder: Q5 } = x7.result, Te5 = [], ze5 = [];
        for (const ie4 of He5) {
          await Zo2({ cacao: ie4, projectId: this.client.core.projectId }) || (this.client.logger.error(ie4, "Signature verification failed"), Se5(de2("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: qe5 } = ie4, Pe5 = Me2(qe5.resources), Ye5 = [In2(qe5.iss)], vt4 = ut2(qe5.iss);
          if (Pe5) {
            const Ne4 = ss(Pe5), It4 = is(Pe5);
            Te5.push(...Ne4), Ye5.push(...It4);
          }
          for (const Ne4 of Ye5) ze5.push(`${Ne4}:${vt4}`);
        }
        const se4 = await this.client.core.crypto.generateSharedKey(D4, Q5.publicKey);
        let he4;
        Te5.length > 0 && (he4 = { topic: se4, acknowledged: true, self: { publicKey: D4, metadata: this.client.metadata }, peer: Q5, controller: Q5.publicKey, expiry: po2(J4), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: g6, namespaces: Ri([...new Set(Te5)], [...new Set(ze5)]), transportType: r3 }, await this.client.core.relayer.subscribe(se4, { transportType: r3 }), await this.client.session.set(se4, he4), g6 && await this.client.core.pairing.updateMetadata({ topic: g6, metadata: Q5.metadata }), he4 = this.client.session.get(se4)), (L6 = this.client.metadata.redirect) != null && L6.linkMode && (Fe4 = Q5.metadata.redirect) != null && Fe4.linkMode && (Qe4 = Q5.metadata.redirect) != null && Qe4.universal && t && (this.client.core.addLinkModeSupportedApp(Q5.metadata.redirect.universal), this.client.session.update(se4, { transportType: Q3.link_mode })), je5({ auths: He5, session: he4 });
      };
      this.events.once(le5, pe4), this.events.once(Re4, ve4);
      let Ie5;
      try {
        if (i4) {
          const x7 = formatJsonRpcRequest("wc_sessionAuthenticate", U4, te5);
          this.client.core.history.set(g6, x7);
          const L6 = await this.client.core.crypto.encode("", x7, { type: _e2, encoding: ti });
          Ie5 = xi(t, g6, L6);
        } else await Promise.all([this.sendRequest({ topic: g6, method: "wc_sessionAuthenticate", params: U4, expiry: e2.expiry, throwOnFailedPublish: true, clientRpcId: te5 }), this.sendRequest({ topic: g6, method: "wc_sessionPropose", params: q3, expiry: N11.wc_sessionPropose.req.ttl, throwOnFailedPublish: true, clientRpcId: q3.id })]);
      } catch (x7) {
        throw this.events.off(le5, pe4), this.events.off(Re4, ve4), x7;
      }
      return await this.setProposal(q3.id, q3), await this.setAuthRequest(te5, { request: b4(v5({}, U4), { verifyContext: {} }), pairingTopic: g6, transportType: r3 }), { uri: Ie5 ?? A5, response: Rt5 };
    }), c5(this, "approveSessionAuthenticate", async (e2) => {
      const { id: t, auths: s3 } = e2, i4 = this.client.core.eventClient.createEvent({ properties: { topic: t.toString(), trace: [tr3.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (f6) {
        throw i4.setError(ir3.no_internet_connection), f6;
      }
      const r3 = this.getPendingAuthRequest(t);
      if (!r3) throw i4.setError(ir3.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${t}`);
      const o7 = r3.transportType || Q3.relay;
      o7 === Q3.relay && await this.confirmOnlineStateOrThrow();
      const a3 = r3.requester.publicKey, l7 = await this.client.core.crypto.generateKeyPair(), p6 = ii(a3), h5 = { type: Oe2, receiverPublicKey: a3, senderPublicKey: l7 }, u4 = [], d6 = [];
      for (const f6 of s3) {
        if (!await Zo2({ cacao: f6, projectId: this.client.core.projectId })) {
          i4.setError(ir3.invalid_cacao);
          const I4 = de2("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: t, topic: p6, error: I4, encodeOpts: h5 }), new Error(I4.message);
        }
        i4.addTrace(tr3.cacaos_verified);
        const { p: _5 } = f6, g6 = Me2(_5.resources), A5 = [In2(_5.iss)], D4 = ut2(_5.iss);
        if (g6) {
          const I4 = ss(g6), T5 = is(g6);
          u4.push(...I4), A5.push(...T5);
        }
        for (const I4 of A5) d6.push(`${I4}:${D4}`);
      }
      const w7 = await this.client.core.crypto.generateSharedKey(l7, a3);
      i4.addTrace(tr3.create_authenticated_session_topic);
      let m5;
      if ((u4 == null ? void 0 : u4.length) > 0) {
        m5 = { topic: w7, acknowledged: true, self: { publicKey: l7, metadata: this.client.metadata }, peer: { publicKey: a3, metadata: r3.requester.metadata }, controller: a3, expiry: po2(J4), authentication: s3, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: r3.pairingTopic, namespaces: Ri([...new Set(u4)], [...new Set(d6)]), transportType: o7 }, i4.addTrace(tr3.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(w7, { transportType: o7 });
        } catch (f6) {
          throw i4.setError(ir3.subscribe_authenticated_session_topic_failure), f6;
        }
        i4.addTrace(tr3.subscribe_authenticated_session_topic_success), await this.client.session.set(w7, m5), i4.addTrace(tr3.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: r3.pairingTopic, metadata: r3.requester.metadata });
      }
      i4.addTrace(tr3.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: p6, id: t, result: { cacaos: s3, responder: { publicKey: l7, metadata: this.client.metadata } }, encodeOpts: h5, throwOnFailedPublish: true, appLink: this.getAppLinkIfEnabled(r3.requester.metadata, o7) });
      } catch (f6) {
        throw i4.setError(ir3.authenticated_session_approve_publish_failure), f6;
      }
      return await this.client.auth.requests.delete(t, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: r3.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i4.eventId }), { session: m5 };
    }), c5(this, "rejectSessionAuthenticate", async (e2) => {
      this.isInitialized();
      const { id: t, reason: s3 } = e2, i4 = this.getPendingAuthRequest(t);
      if (!i4) throw new Error(`Could not find pending auth request with id ${t}`);
      i4.transportType === Q3.relay && await this.confirmOnlineStateOrThrow();
      const r3 = i4.requester.publicKey, o7 = await this.client.core.crypto.generateKeyPair(), a3 = ii(r3), l7 = { type: Oe2, receiverPublicKey: r3, senderPublicKey: o7 };
      await this.sendError({ id: t, topic: a3, error: s3, encodeOpts: l7, rpcOpts: N11.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i4.requester.metadata, i4.transportType) }), await this.client.auth.requests.delete(t, { message: "rejected", code: 0 }), await this.client.proposal.delete(t, de2("USER_DISCONNECTED"));
    }), c5(this, "formatAuthMessage", (e2) => {
      this.isInitialized();
      const { request: t, iss: s3 } = e2;
      return On2(t, s3);
    }), c5(this, "processRelayMessageCache", () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const e2 = this.relayMessageCache.shift();
          e2 && await this.onRelayMessage(e2);
        } catch (e2) {
          this.client.logger.error(e2);
        }
      }, 50);
    }), c5(this, "cleanupDuplicatePairings", async (e2) => {
      if (e2.pairingTopic) try {
        const t = this.client.core.pairing.pairings.get(e2.pairingTopic), s3 = this.client.core.pairing.pairings.getAll().filter((i4) => {
          var r3, o7;
          return ((r3 = i4.peerMetadata) == null ? void 0 : r3.url) && ((o7 = i4.peerMetadata) == null ? void 0 : o7.url) === e2.peer.metadata.url && i4.topic && i4.topic !== t.topic;
        });
        if (s3.length === 0) return;
        this.client.logger.info(`Cleaning up ${s3.length} duplicate pairing(s)`), await Promise.all(s3.map((i4) => this.client.core.pairing.disconnect({ topic: i4.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (t) {
        this.client.logger.error(t);
      }
    }), c5(this, "deleteSession", async (e2) => {
      var t;
      const { topic: s3, expirerHasDeleted: i4 = false, emitEvent: r3 = true, id: o7 = 0 } = e2, { self: a3 } = this.client.session.get(s3);
      await this.client.core.relayer.unsubscribe(s3), await this.client.session.delete(s3, de2("USER_DISCONNECTED")), this.addToRecentlyDeleted(s3, "session"), this.client.core.crypto.keychain.has(a3.publicKey) && await this.client.core.crypto.deleteKeyPair(a3.publicKey), this.client.core.crypto.keychain.has(s3) && await this.client.core.crypto.deleteSymKey(s3), i4 || this.client.core.expirer.del(s3), this.client.core.storage.removeItem(Me4).catch((l7) => this.client.logger.warn(l7)), this.getPendingSessionRequests().forEach((l7) => {
        l7.topic === s3 && this.deletePendingSessionRequest(l7.id, de2("USER_DISCONNECTED"));
      }), s3 === ((t = this.sessionRequestQueue.queue[0]) == null ? void 0 : t.topic) && (this.sessionRequestQueue.state = $2.idle), r3 && this.client.events.emit("session_delete", { id: o7, topic: s3 });
    }), c5(this, "deleteProposal", async (e2, t) => {
      if (t) try {
        const s3 = this.client.proposal.get(e2), i4 = this.client.core.eventClient.getEvent({ topic: s3.pairingTopic });
        i4 == null ? void 0 : i4.setError(er3.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(e2, de2("USER_DISCONNECTED")), t ? Promise.resolve() : this.client.core.expirer.del(e2)]), this.addToRecentlyDeleted(e2, "proposal");
    }), c5(this, "deletePendingSessionRequest", async (e2, t, s3 = false) => {
      await Promise.all([this.client.pendingRequest.delete(e2, t), s3 ? Promise.resolve() : this.client.core.expirer.del(e2)]), this.addToRecentlyDeleted(e2, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i4) => i4.id !== e2), s3 && (this.sessionRequestQueue.state = $2.idle, this.client.events.emit("session_request_expire", { id: e2 }));
    }), c5(this, "deletePendingAuthRequest", async (e2, t, s3 = false) => {
      await Promise.all([this.client.auth.requests.delete(e2, t), s3 ? Promise.resolve() : this.client.core.expirer.del(e2)]);
    }), c5(this, "setExpiry", async (e2, t) => {
      this.client.session.keys.includes(e2) && (this.client.core.expirer.set(e2, t), await this.client.session.update(e2, { expiry: t }));
    }), c5(this, "setProposal", async (e2, t) => {
      this.client.core.expirer.set(e2, po2(N11.wc_sessionPropose.req.ttl)), await this.client.proposal.set(e2, t);
    }), c5(this, "setAuthRequest", async (e2, t) => {
      const { request: s3, pairingTopic: i4, transportType: r3 = Q3.relay } = t;
      this.client.core.expirer.set(e2, s3.expiryTimestamp), await this.client.auth.requests.set(e2, { authPayload: s3.authPayload, requester: s3.requester, expiryTimestamp: s3.expiryTimestamp, id: e2, pairingTopic: i4, verifyContext: s3.verifyContext, transportType: r3 });
    }), c5(this, "setPendingSessionRequest", async (e2) => {
      const { id: t, topic: s3, params: i4, verifyContext: r3 } = e2, o7 = i4.request.expiryTimestamp || po2(N11.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(t, o7), await this.client.pendingRequest.set(t, { id: t, topic: s3, params: i4, verifyContext: r3 });
    }), c5(this, "sendRequest", async (e2) => {
      const { topic: t, method: s3, params: i4, expiry: r3, relayRpcId: o7, clientRpcId: a3, throwOnFailedPublish: l7, appLink: p6, tvf: h5 } = e2, u4 = formatJsonRpcRequest(s3, i4, a3);
      let d6;
      const w7 = !!p6;
      try {
        const _5 = w7 ? ti : At;
        d6 = await this.client.core.crypto.encode(t, u4, { encoding: _5 });
      } catch (_5) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${t} failed`), _5;
      }
      let m5;
      if (gt3.includes(s3)) {
        const _5 = ci(JSON.stringify(u4)), g6 = ci(d6);
        m5 = await this.client.core.verify.register({ id: g6, decryptedId: _5 });
      }
      const f6 = N11[s3].req;
      if (f6.attestation = m5, r3 && (f6.ttl = r3), o7 && (f6.id = o7), this.client.core.history.set(t, u4), w7) {
        const _5 = xi(p6, t, d6);
        await global.Linking.openURL(_5, this.client.name);
      } else {
        const _5 = N11[s3].req;
        r3 && (_5.ttl = r3), o7 && (_5.id = o7), _5.tvf = b4(v5({}, h5), { correlationId: u4.id }), l7 ? (_5.internal = b4(v5({}, _5.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t, d6, _5)) : this.client.core.relayer.publish(t, d6, _5).catch((g6) => this.client.logger.error(g6));
      }
      return u4.id;
    }), c5(this, "sendResult", async (e2) => {
      const { id: t, topic: s3, result: i4, throwOnFailedPublish: r3, encodeOpts: o7, appLink: a3 } = e2, l7 = formatJsonRpcResult(t, i4);
      let p6;
      const h5 = a3 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const w7 = h5 ? ti : At;
        p6 = await this.client.core.crypto.encode(s3, l7, b4(v5({}, o7 || {}), { encoding: w7 }));
      } catch (w7) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s3} failed`), w7;
      }
      let u4, d6;
      try {
        u4 = await this.client.core.history.get(s3, t);
        const w7 = u4.request;
        try {
          this.shouldSetTVF(w7.method, w7.params) && (d6 = this.getTVFParams(t, w7.params, i4));
        } catch (m5) {
          this.client.logger.warn("sendResult() -> getTVFParams() failed", m5);
        }
      } catch (w7) {
        throw this.client.logger.error(`sendResult() -> history.get(${s3}, ${t}) failed`), w7;
      }
      if (h5) {
        const w7 = xi(a3, s3, p6);
        await global.Linking.openURL(w7, this.client.name);
      } else {
        const w7 = u4.request.method, m5 = N11[w7].res;
        m5.tvf = b4(v5({}, d6), { correlationId: t }), r3 ? (m5.internal = b4(v5({}, m5.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s3, p6, m5)) : this.client.core.relayer.publish(s3, p6, m5).catch((f6) => this.client.logger.error(f6));
      }
      await this.client.core.history.resolve(l7);
    }), c5(this, "sendError", async (e2) => {
      const { id: t, topic: s3, error: i4, encodeOpts: r3, rpcOpts: o7, appLink: a3 } = e2, l7 = formatJsonRpcError(t, i4);
      let p6;
      const h5 = a3 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const d6 = h5 ? ti : At;
        p6 = await this.client.core.crypto.encode(s3, l7, b4(v5({}, r3 || {}), { encoding: d6 }));
      } catch (d6) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s3} failed`), d6;
      }
      let u4;
      try {
        u4 = await this.client.core.history.get(s3, t);
      } catch (d6) {
        throw this.client.logger.error(`sendError() -> history.get(${s3}, ${t}) failed`), d6;
      }
      if (h5) {
        const d6 = xi(a3, s3, p6);
        await global.Linking.openURL(d6, this.client.name);
      } else {
        const d6 = u4.request.method, w7 = o7 || N11[d6].res;
        this.client.core.relayer.publish(s3, p6, w7);
      }
      await this.client.core.history.resolve(l7);
    }), c5(this, "cleanup", async () => {
      const e2 = [], t = [];
      this.client.session.getAll().forEach((s3) => {
        let i4 = false;
        go2(s3.expiry) && (i4 = true), this.client.core.crypto.keychain.has(s3.topic) || (i4 = true), i4 && e2.push(s3.topic);
      }), this.client.proposal.getAll().forEach((s3) => {
        go2(s3.expiryTimestamp) && t.push(s3.id);
      }), await Promise.all([...e2.map((s3) => this.deleteSession({ topic: s3 })), ...t.map((s3) => this.deleteProposal(s3))]);
    }), c5(this, "onProviderMessageEvent", async (e2) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(e2) : await this.onRelayMessage(e2);
    }), c5(this, "onRelayEventRequest", async (e2) => {
      this.requestQueue.queue.push(e2), await this.processRequestsQueue();
    }), c5(this, "processRequestsQueue", async () => {
      if (this.requestQueue.state === $2.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = $2.active;
        const e2 = this.requestQueue.queue.shift();
        if (e2) try {
          await this.processRequest(e2);
        } catch (t) {
          this.client.logger.warn(t);
        }
      }
      this.requestQueue.state = $2.idle;
    }), c5(this, "processRequest", async (e2) => {
      const { topic: t, payload: s3, attestation: i4, transportType: r3, encryptedId: o7 } = e2, a3 = s3.method;
      if (!this.shouldIgnorePairingRequest({ topic: t, requestMethod: a3 })) switch (a3) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: t, payload: s3, attestation: i4, encryptedId: o7 });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(t, s3);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(t, s3);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(t, s3);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(t, s3);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(t, s3);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: t, payload: s3, attestation: i4, encryptedId: o7, transportType: r3 });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(t, s3);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: t, payload: s3, attestation: i4, encryptedId: o7, transportType: r3 });
        default:
          return this.client.logger.info(`Unsupported request method ${a3}`);
      }
    }), c5(this, "onRelayEventResponse", async (e2) => {
      const { topic: t, payload: s3, transportType: i4 } = e2, r3 = (await this.client.core.history.get(t, s3.id)).request.method;
      switch (r3) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(t, s3, i4);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(t, s3);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(t, s3);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(t, s3);
        case "wc_sessionPing":
          return this.onSessionPingResponse(t, s3);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(t, s3);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(t, s3);
        default:
          return this.client.logger.info(`Unsupported response method ${r3}`);
      }
    }), c5(this, "onRelayEventUnknownPayload", (e2) => {
      const { topic: t } = e2, { message: s3 } = te2("MISSING_OR_INVALID", `Decoded payload on topic ${t} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(s3);
    }), c5(this, "shouldIgnorePairingRequest", (e2) => {
      const { topic: t, requestMethod: s3 } = e2, i4 = this.expectedPairingMethodMap.get(t);
      return !i4 || i4.includes(s3) ? false : !!(i4.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), c5(this, "onSessionProposeRequest", async (e2) => {
      const { topic: t, payload: s3, attestation: i4, encryptedId: r3 } = e2, { params: o7, id: a3 } = s3;
      try {
        const l7 = this.client.core.eventClient.getEvent({ topic: t });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l7 == null ? void 0 : l7.setError(Y2.proposal_listener_not_found)), this.isValidConnect(v5({}, s3.params));
        const p6 = o7.expiryTimestamp || po2(N11.wc_sessionPropose.req.ttl), h5 = v5({ id: a3, pairingTopic: t, expiryTimestamp: p6 }, o7);
        await this.setProposal(a3, h5);
        const u4 = await this.getVerifyContext({ attestationId: i4, hash: ci(JSON.stringify(s3)), encryptedId: r3, metadata: h5.proposer.metadata });
        l7 == null ? void 0 : l7.addTrace(G2.emit_session_proposal), this.client.events.emit("session_proposal", { id: a3, params: h5, verifyContext: u4 });
      } catch (l7) {
        await this.sendError({ id: a3, topic: t, error: l7, rpcOpts: N11.wc_sessionPropose.autoReject }), this.client.logger.error(l7);
      }
    }), c5(this, "onSessionProposeResponse", async (e2, t, s3) => {
      const { id: i4 } = t;
      if (isJsonRpcResult(t)) {
        const { result: r3 } = t;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r3 });
        const o7 = this.client.proposal.get(i4);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: o7 });
        const a3 = o7.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a3 });
        const l7 = r3.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l7 });
        const p6 = await this.client.core.crypto.generateSharedKey(a3, l7);
        this.pendingSessions.set(i4, { sessionTopic: p6, pairingTopic: e2, proposalId: i4, publicKey: a3 });
        const h5 = await this.client.core.relayer.subscribe(p6, { transportType: s3 });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: h5 }), await this.client.core.pairing.activate({ topic: e2 });
      } else if (isJsonRpcError(t)) {
        await this.client.proposal.delete(i4, de2("USER_DISCONNECTED"));
        const r3 = yo2("session_connect", i4);
        if (this.events.listenerCount(r3) === 0) throw new Error(`emitting ${r3} without any listeners, 954`);
        this.events.emit(r3, { error: t.error });
      }
    }), c5(this, "onSessionSettleRequest", async (e2, t) => {
      const { id: s3, params: i4 } = t;
      try {
        this.isValidSessionSettleRequest(i4);
        const { relay: r3, controller: o7, expiry: a3, namespaces: l7, sessionProperties: p6, scopedProperties: h5, sessionConfig: u4 } = t.params, d6 = [...this.pendingSessions.values()].find((f6) => f6.sessionTopic === e2);
        if (!d6) return this.client.logger.error(`Pending session not found for topic ${e2}`);
        const w7 = this.client.proposal.get(d6.proposalId), m5 = b4(v5(v5(v5({ topic: e2, relay: r3, expiry: a3, namespaces: l7, acknowledged: true, pairingTopic: d6.pairingTopic, requiredNamespaces: w7.requiredNamespaces, optionalNamespaces: w7.optionalNamespaces, controller: o7.publicKey, self: { publicKey: d6.publicKey, metadata: this.client.metadata }, peer: { publicKey: o7.publicKey, metadata: o7.metadata } }, p6 && { sessionProperties: p6 }), h5 && { scopedProperties: h5 }), u4 && { sessionConfig: u4 }), { transportType: Q3.relay });
        await this.client.session.set(m5.topic, m5), await this.setExpiry(m5.topic, m5.expiry), await this.client.core.pairing.updateMetadata({ topic: d6.pairingTopic, metadata: m5.peer.metadata }), this.client.events.emit("session_connect", { session: m5 }), this.events.emit(yo2("session_connect", d6.proposalId), { session: m5 }), this.pendingSessions.delete(d6.proposalId), this.deleteProposal(d6.proposalId, false), this.cleanupDuplicatePairings(m5), await this.sendResult({ id: t.id, topic: e2, result: true, throwOnFailedPublish: true });
      } catch (r3) {
        await this.sendError({ id: s3, topic: e2, error: r3 }), this.client.logger.error(r3);
      }
    }), c5(this, "onSessionSettleResponse", async (e2, t) => {
      const { id: s3 } = t;
      isJsonRpcResult(t) ? (await this.client.session.update(e2, { acknowledged: true }), this.events.emit(yo2("session_approve", s3), {})) : isJsonRpcError(t) && (await this.client.session.delete(e2, de2("USER_DISCONNECTED")), this.events.emit(yo2("session_approve", s3), { error: t.error }));
    }), c5(this, "onSessionUpdateRequest", async (e2, t) => {
      const { params: s3, id: i4 } = t;
      try {
        const r3 = `${e2}_session_update`, o7 = ec.get(r3);
        if (o7 && this.isRequestOutOfSync(o7, i4)) {
          this.client.logger.warn(`Discarding out of sync request - ${i4}`), this.sendError({ id: i4, topic: e2, error: de2("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(v5({ topic: e2 }, s3));
        try {
          ec.set(r3, i4), await this.client.session.update(e2, { namespaces: s3.namespaces }), await this.sendResult({ id: i4, topic: e2, result: true, throwOnFailedPublish: true });
        } catch (a3) {
          throw ec.delete(r3), a3;
        }
        this.client.events.emit("session_update", { id: i4, topic: e2, params: s3 });
      } catch (r3) {
        await this.sendError({ id: i4, topic: e2, error: r3 }), this.client.logger.error(r3);
      }
    }), c5(this, "isRequestOutOfSync", (e2, t) => t.toString().slice(0, -3) < e2.toString().slice(0, -3)), c5(this, "onSessionUpdateResponse", (e2, t) => {
      const { id: s3 } = t, i4 = yo2("session_update", s3);
      if (this.events.listenerCount(i4) === 0) throw new Error(`emitting ${i4} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(yo2("session_update", s3), {}) : isJsonRpcError(t) && this.events.emit(yo2("session_update", s3), { error: t.error });
    }), c5(this, "onSessionExtendRequest", async (e2, t) => {
      const { id: s3 } = t;
      try {
        this.isValidExtend({ topic: e2 }), await this.setExpiry(e2, po2(J4)), await this.sendResult({ id: s3, topic: e2, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_extend", { id: s3, topic: e2 });
      } catch (i4) {
        await this.sendError({ id: s3, topic: e2, error: i4 }), this.client.logger.error(i4);
      }
    }), c5(this, "onSessionExtendResponse", (e2, t) => {
      const { id: s3 } = t, i4 = yo2("session_extend", s3);
      if (this.events.listenerCount(i4) === 0) throw new Error(`emitting ${i4} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(yo2("session_extend", s3), {}) : isJsonRpcError(t) && this.events.emit(yo2("session_extend", s3), { error: t.error });
    }), c5(this, "onSessionPingRequest", async (e2, t) => {
      const { id: s3 } = t;
      try {
        this.isValidPing({ topic: e2 }), await this.sendResult({ id: s3, topic: e2, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_ping", { id: s3, topic: e2 });
      } catch (i4) {
        await this.sendError({ id: s3, topic: e2, error: i4 }), this.client.logger.error(i4);
      }
    }), c5(this, "onSessionPingResponse", (e2, t) => {
      const { id: s3 } = t, i4 = yo2("session_ping", s3);
      setTimeout(() => {
        if (this.events.listenerCount(i4) === 0) throw new Error(`emitting ${i4} without any listeners 2176`);
        isJsonRpcResult(t) ? this.events.emit(yo2("session_ping", s3), {}) : isJsonRpcError(t) && this.events.emit(yo2("session_ping", s3), { error: t.error });
      }, 500);
    }), c5(this, "onSessionDeleteRequest", async (e2, t) => {
      const { id: s3 } = t;
      try {
        this.isValidDisconnect({ topic: e2, reason: t.params }), Promise.all([new Promise((i4) => {
          this.client.core.relayer.once(C3.publish, async () => {
            i4(await this.deleteSession({ topic: e2, id: s3 }));
          });
        }), this.sendResult({ id: s3, topic: e2, result: true, throwOnFailedPublish: true }), this.cleanupPendingSentRequestsForTopic({ topic: e2, error: de2("USER_DISCONNECTED") })]).catch((i4) => this.client.logger.error(i4));
      } catch (i4) {
        this.client.logger.error(i4);
      }
    }), c5(this, "onSessionRequest", async (e2) => {
      var t, s3, i4;
      const { topic: r3, payload: o7, attestation: a3, encryptedId: l7, transportType: p6 } = e2, { id: h5, params: u4 } = o7;
      try {
        await this.isValidRequest(v5({ topic: r3 }, u4));
        const d6 = this.client.session.get(r3), w7 = await this.getVerifyContext({ attestationId: a3, hash: ci(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", u4, h5))), encryptedId: l7, metadata: d6.peer.metadata, transportType: p6 }), m5 = { id: h5, topic: r3, params: u4, verifyContext: w7 };
        await this.setPendingSessionRequest(m5), p6 === Q3.link_mode && (t = d6.peer.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp((s3 = d6.peer.metadata.redirect) == null ? void 0 : s3.universal), (i4 = this.client.signConfig) != null && i4.disableRequestQueue ? this.emitSessionRequest(m5) : (this.addSessionRequestToSessionRequestQueue(m5), this.processSessionRequestQueue());
      } catch (d6) {
        await this.sendError({ id: h5, topic: r3, error: d6 }), this.client.logger.error(d6);
      }
    }), c5(this, "onSessionRequestResponse", (e2, t) => {
      const { id: s3 } = t, i4 = yo2("session_request", s3);
      if (this.events.listenerCount(i4) === 0) throw new Error(`emitting ${i4} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(yo2("session_request", s3), { result: t.result }) : isJsonRpcError(t) && this.events.emit(yo2("session_request", s3), { error: t.error });
    }), c5(this, "onSessionEventRequest", async (e2, t) => {
      const { id: s3, params: i4 } = t;
      try {
        const r3 = `${e2}_session_event_${i4.event.name}`, o7 = ec.get(r3);
        if (o7 && this.isRequestOutOfSync(o7, s3)) {
          this.client.logger.info(`Discarding out of sync request - ${s3}`);
          return;
        }
        this.isValidEmit(v5({ topic: e2 }, i4)), this.client.events.emit("session_event", { id: s3, topic: e2, params: i4 }), ec.set(r3, s3);
      } catch (r3) {
        await this.sendError({ id: s3, topic: e2, error: r3 }), this.client.logger.error(r3);
      }
    }), c5(this, "onSessionAuthenticateResponse", (e2, t) => {
      const { id: s3 } = t;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: e2, payload: t }), isJsonRpcResult(t) ? this.events.emit(yo2("session_request", s3), { result: t.result }) : isJsonRpcError(t) && this.events.emit(yo2("session_request", s3), { error: t.error });
    }), c5(this, "onSessionAuthenticateRequest", async (e2) => {
      var t;
      const { topic: s3, payload: i4, attestation: r3, encryptedId: o7, transportType: a3 } = e2;
      try {
        const { requester: l7, authPayload: p6, expiryTimestamp: h5 } = i4.params, u4 = await this.getVerifyContext({ attestationId: r3, hash: ci(JSON.stringify(i4)), encryptedId: o7, metadata: l7.metadata, transportType: a3 }), d6 = { requester: l7, pairingTopic: s3, id: i4.id, authPayload: p6, verifyContext: u4, expiryTimestamp: h5 };
        await this.setAuthRequest(i4.id, { request: d6, pairingTopic: s3, transportType: a3 }), a3 === Q3.link_mode && (t = l7.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp(l7.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: s3, params: i4.params, id: i4.id, verifyContext: u4 });
      } catch (l7) {
        this.client.logger.error(l7);
        const p6 = i4.params.requester.publicKey, h5 = await this.client.core.crypto.generateKeyPair(), u4 = this.getAppLinkIfEnabled(i4.params.requester.metadata, a3), d6 = { type: Oe2, receiverPublicKey: p6, senderPublicKey: h5 };
        await this.sendError({ id: i4.id, topic: s3, error: l7, encodeOpts: d6, rpcOpts: N11.wc_sessionAuthenticate.autoReject, appLink: u4 });
      }
    }), c5(this, "addSessionRequestToSessionRequestQueue", (e2) => {
      this.sessionRequestQueue.queue.push(e2);
    }), c5(this, "cleanupAfterResponse", (e2) => {
      this.deletePendingSessionRequest(e2.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = $2.idle, this.processSessionRequestQueue();
      }, (0, import_time5.toMiliseconds)(this.requestQueueDelay));
    }), c5(this, "cleanupPendingSentRequestsForTopic", ({ topic: e2, error: t }) => {
      const s3 = this.client.core.history.pending;
      s3.length > 0 && s3.filter((i4) => i4.topic === e2 && i4.request.method === "wc_sessionRequest").forEach((i4) => {
        const r3 = i4.request.id, o7 = yo2("session_request", r3);
        if (this.events.listenerCount(o7) === 0) throw new Error(`emitting ${o7} without any listeners`);
        this.events.emit(yo2("session_request", i4.request.id), { error: t });
      });
    }), c5(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === $2.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e2 = this.sessionRequestQueue.queue[0];
      if (!e2) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = $2.active, this.emitSessionRequest(e2);
      } catch (t) {
        this.client.logger.error(t);
      }
    }), c5(this, "emitSessionRequest", (e2) => {
      this.client.events.emit("session_request", e2);
    }), c5(this, "onPairingCreated", (e2) => {
      if (e2.methods && this.expectedPairingMethodMap.set(e2.topic, e2.methods), e2.active) return;
      const t = this.client.proposal.getAll().find((s3) => s3.pairingTopic === e2.topic);
      t && this.onSessionProposeRequest({ topic: e2.topic, payload: formatJsonRpcRequest("wc_sessionPropose", b4(v5({}, t), { requiredNamespaces: t.requiredNamespaces, optionalNamespaces: t.optionalNamespaces, relays: t.relays, proposer: t.proposer, sessionProperties: t.sessionProperties, scopedProperties: t.scopedProperties }), t.id) });
    }), c5(this, "isValidConnect", async (e2) => {
      if (!Vi(e2)) {
        const { message: l7 } = te2("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e2)}`);
        throw new Error(l7);
      }
      const { pairingTopic: t, requiredNamespaces: s3, optionalNamespaces: i4, sessionProperties: r3, scopedProperties: o7, relays: a3 } = e2;
      if (ae(t) || await this.isValidPairingTopic(t), !Di(a3, true)) {
        const { message: l7 } = te2("MISSING_OR_INVALID", `connect() relays: ${a3}`);
        throw new Error(l7);
      }
      if (!ae(s3) && qe2(s3) !== 0 && this.validateNamespaces(s3, "requiredNamespaces"), !ae(i4) && qe2(i4) !== 0 && this.validateNamespaces(i4, "optionalNamespaces"), ae(r3) || this.validateSessionProps(r3, "sessionProperties"), !ae(o7)) {
        this.validateSessionProps(o7, "scopedProperties");
        const l7 = Object.keys(s3 || {}).concat(Object.keys(i4 || {}));
        if (!Object.keys(o7).every((p6) => l7.includes(p6))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(o7)}, required/optional namespaces: ${JSON.stringify(l7)}`);
      }
    }), c5(this, "validateNamespaces", (e2, t) => {
      const s3 = ki(e2, "connect()", t);
      if (s3) throw new Error(s3.message);
    }), c5(this, "isValidApprove", async (e2) => {
      if (!Vi(e2)) throw new Error(te2("MISSING_OR_INVALID", `approve() params: ${e2}`).message);
      const { id: t, namespaces: s3, relayProtocol: i4, sessionProperties: r3, scopedProperties: o7 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidProposalId(t);
      const a3 = this.client.proposal.get(t), l7 = Or2(s3, "approve()");
      if (l7) throw new Error(l7.message);
      const p6 = Nr2(a3.requiredNamespaces, s3, "approve()");
      if (p6) throw new Error(p6.message);
      if (!q(i4, true)) {
        const { message: h5 } = te2("MISSING_OR_INVALID", `approve() relayProtocol: ${i4}`);
        throw new Error(h5);
      }
      if (ae(r3) || this.validateSessionProps(r3, "sessionProperties"), !ae(o7)) {
        this.validateSessionProps(o7, "scopedProperties");
        const h5 = new Set(Object.keys(s3));
        if (!Object.keys(o7).every((u4) => h5.has(u4))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(o7)}, approved namespaces: ${Array.from(h5).join(", ")}`);
      }
    }), c5(this, "isValidReject", async (e2) => {
      if (!Vi(e2)) {
        const { message: i4 } = te2("MISSING_OR_INVALID", `reject() params: ${e2}`);
        throw new Error(i4);
      }
      const { id: t, reason: s3 } = e2;
      if (this.checkRecentlyDeleted(t), await this.isValidProposalId(t), !Hi(s3)) {
        const { message: i4 } = te2("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s3)}`);
        throw new Error(i4);
      }
    }), c5(this, "isValidSessionSettleRequest", (e2) => {
      if (!Vi(e2)) {
        const { message: l7 } = te2("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e2}`);
        throw new Error(l7);
      }
      const { relay: t, controller: s3, namespaces: i4, expiry: r3 } = e2;
      if (!Ar2(t)) {
        const { message: l7 } = te2("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l7);
      }
      const o7 = Ci(s3, "onSessionSettleRequest()");
      if (o7) throw new Error(o7.message);
      const a3 = Or2(i4, "onSessionSettleRequest()");
      if (a3) throw new Error(a3.message);
      if (go2(r3)) {
        const { message: l7 } = te2("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l7);
      }
    }), c5(this, "isValidUpdate", async (e2) => {
      if (!Vi(e2)) {
        const { message: a3 } = te2("MISSING_OR_INVALID", `update() params: ${e2}`);
        throw new Error(a3);
      }
      const { topic: t, namespaces: s3 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const i4 = this.client.session.get(t), r3 = Or2(s3, "update()");
      if (r3) throw new Error(r3.message);
      const o7 = Nr2(i4.requiredNamespaces, s3, "update()");
      if (o7) throw new Error(o7.message);
    }), c5(this, "isValidExtend", async (e2) => {
      if (!Vi(e2)) {
        const { message: s3 } = te2("MISSING_OR_INVALID", `extend() params: ${e2}`);
        throw new Error(s3);
      }
      const { topic: t } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
    }), c5(this, "isValidRequest", async (e2) => {
      if (!Vi(e2)) {
        const { message: a3 } = te2("MISSING_OR_INVALID", `request() params: ${e2}`);
        throw new Error(a3);
      }
      const { topic: t, request: s3, chainId: i4, expiry: r3 } = e2;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const { namespaces: o7 } = this.client.session.get(t);
      if (!Gi(o7, i4)) {
        const { message: a3 } = te2("MISSING_OR_INVALID", `request() chainId: ${i4}`);
        throw new Error(a3);
      }
      if (!Ki(s3)) {
        const { message: a3 } = te2("MISSING_OR_INVALID", `request() ${JSON.stringify(s3)}`);
        throw new Error(a3);
      }
      if (!Wi(o7, i4, s3.method)) {
        const { message: a3 } = te2("MISSING_OR_INVALID", `request() method: ${s3.method}`);
        throw new Error(a3);
      }
      if (r3 && !Xi(r3, _e4)) {
        const { message: a3 } = te2("MISSING_OR_INVALID", `request() expiry: ${r3}. Expiry must be a number (in seconds) between ${_e4.min} and ${_e4.max}`);
        throw new Error(a3);
      }
    }), c5(this, "isValidRespond", async (e2) => {
      var t;
      if (!Vi(e2)) {
        const { message: r3 } = te2("MISSING_OR_INVALID", `respond() params: ${e2}`);
        throw new Error(r3);
      }
      const { topic: s3, response: i4 } = e2;
      try {
        await this.isValidSessionTopic(s3);
      } catch (r3) {
        throw (t = e2 == null ? void 0 : e2.response) != null && t.id && this.cleanupAfterResponse(e2), r3;
      }
      if (!Fi(i4)) {
        const { message: r3 } = te2("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i4)}`);
        throw new Error(r3);
      }
    }), c5(this, "isValidPing", async (e2) => {
      if (!Vi(e2)) {
        const { message: s3 } = te2("MISSING_OR_INVALID", `ping() params: ${e2}`);
        throw new Error(s3);
      }
      const { topic: t } = e2;
      await this.isValidSessionOrPairingTopic(t);
    }), c5(this, "isValidEmit", async (e2) => {
      if (!Vi(e2)) {
        const { message: o7 } = te2("MISSING_OR_INVALID", `emit() params: ${e2}`);
        throw new Error(o7);
      }
      const { topic: t, event: s3, chainId: i4 } = e2;
      await this.isValidSessionTopic(t);
      const { namespaces: r3 } = this.client.session.get(t);
      if (!Gi(r3, i4)) {
        const { message: o7 } = te2("MISSING_OR_INVALID", `emit() chainId: ${i4}`);
        throw new Error(o7);
      }
      if (!qi(s3)) {
        const { message: o7 } = te2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s3)}`);
        throw new Error(o7);
      }
      if (!zi(r3, i4, s3.name)) {
        const { message: o7 } = te2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s3)}`);
        throw new Error(o7);
      }
    }), c5(this, "isValidDisconnect", async (e2) => {
      if (!Vi(e2)) {
        const { message: s3 } = te2("MISSING_OR_INVALID", `disconnect() params: ${e2}`);
        throw new Error(s3);
      }
      const { topic: t } = e2;
      await this.isValidSessionOrPairingTopic(t);
    }), c5(this, "isValidAuthenticate", (e2) => {
      const { chains: t, uri: s3, domain: i4, nonce: r3 } = e2;
      if (!Array.isArray(t) || t.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!q(s3, false)) throw new Error("uri is required parameter");
      if (!q(i4, false)) throw new Error("domain is required parameter");
      if (!q(r3, false)) throw new Error("nonce is required parameter");
      if ([...new Set(t.map((a3) => Ye2(a3).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: o7 } = Ye2(t[0]);
      if (o7 !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), c5(this, "getVerifyContext", async (e2) => {
      const { attestationId: t, hash: s3, encryptedId: i4, metadata: r3, transportType: o7 } = e2, a3 = { verified: { verifyUrl: r3.verifyUrl || ue2, validation: "UNKNOWN", origin: r3.url || "" } };
      try {
        if (o7 === Q3.link_mode) {
          const p6 = this.getAppLinkIfEnabled(r3, o7);
          return a3.verified.validation = p6 && new URL(p6).origin === new URL(r3.url).origin ? "VALID" : "INVALID", a3;
        }
        const l7 = await this.client.core.verify.resolve({ attestationId: t, hash: s3, encryptedId: i4, verifyUrl: r3.verifyUrl });
        l7 && (a3.verified.origin = l7.origin, a3.verified.isScam = l7.isScam, a3.verified.validation = l7.origin === new URL(r3.url).origin ? "VALID" : "INVALID");
      } catch (l7) {
        this.client.logger.warn(l7);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(a3)}`), a3;
    }), c5(this, "validateSessionProps", (e2, t) => {
      Object.values(e2).forEach((s3, i4) => {
        if (s3 == null) {
          const { message: r3 } = te2("MISSING_OR_INVALID", `${t} must contain an existing value for each key. Received: ${s3} for key ${Object.keys(e2)[i4]}`);
          throw new Error(r3);
        }
      });
    }), c5(this, "getPendingAuthRequest", (e2) => {
      const t = this.client.auth.requests.get(e2);
      return typeof t == "object" ? t : void 0;
    }), c5(this, "addToRecentlyDeleted", (e2, t) => {
      if (this.recentlyDeletedMap.set(e2, t), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let s3 = 0;
        const i4 = this.recentlyDeletedLimit / 2;
        for (const r3 of this.recentlyDeletedMap.keys()) {
          if (s3++ >= i4) break;
          this.recentlyDeletedMap.delete(r3);
        }
      }
    }), c5(this, "checkRecentlyDeleted", (e2) => {
      const t = this.recentlyDeletedMap.get(e2);
      if (t) {
        const { message: s3 } = te2("MISSING_OR_INVALID", `Record was recently deleted - ${t}: ${e2}`);
        throw new Error(s3);
      }
    }), c5(this, "isLinkModeEnabled", (e2, t) => {
      var s3, i4, r3, o7, a3, l7, p6, h5, u4;
      return !e2 || t !== Q3.link_mode ? false : ((i4 = (s3 = this.client.metadata) == null ? void 0 : s3.redirect) == null ? void 0 : i4.linkMode) === true && ((o7 = (r3 = this.client.metadata) == null ? void 0 : r3.redirect) == null ? void 0 : o7.universal) !== void 0 && ((l7 = (a3 = this.client.metadata) == null ? void 0 : a3.redirect) == null ? void 0 : l7.universal) !== "" && ((p6 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : p6.universal) !== void 0 && ((h5 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : h5.universal) !== "" && ((u4 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : u4.linkMode) === true && this.client.core.linkModeSupportedApps.includes(e2.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), c5(this, "getAppLinkIfEnabled", (e2, t) => {
      var s3;
      return this.isLinkModeEnabled(e2, t) ? (s3 = e2 == null ? void 0 : e2.redirect) == null ? void 0 : s3.universal : void 0;
    }), c5(this, "handleLinkModeMessage", ({ url: e2 }) => {
      if (!e2 || !e2.includes("wc_ev") || !e2.includes("topic")) return;
      const t = wo2(e2, "topic") || "", s3 = decodeURIComponent(wo2(e2, "wc_ev") || ""), i4 = this.client.session.keys.includes(t);
      i4 && this.client.session.update(t, { transportType: Q3.link_mode }), this.client.core.dispatchEnvelope({ topic: t, message: s3, sessionExists: i4 });
    }), c5(this, "registerLinkModeListeners", async () => {
      var e2;
      if (vo2() || ne() && (e2 = this.client.metadata.redirect) != null && e2.linkMode) {
        const t = global == null ? void 0 : global.Linking;
        if (typeof t < "u") {
          t.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const s3 = await t.getInitialURL();
          s3 && setTimeout(() => {
            this.handleLinkModeMessage({ url: s3 });
          }, 50);
        }
      }
    }), c5(this, "shouldSetTVF", (e2, t) => {
      if (!t || e2 !== "wc_sessionRequest") return false;
      const { request: s3 } = t;
      return Object.keys(Ue4).includes(s3.method);
    }), c5(this, "getTVFParams", (e2, t, s3) => {
      var i4, r3;
      try {
        const o7 = t.request.method, a3 = this.extractTxHashesFromResult(o7, s3);
        return b4(v5({ correlationId: e2, rpcMethods: [o7], chainId: t.chainId }, this.isValidContractData(t.request.params) && { contractAddresses: [(r3 = (i4 = t.request.params) == null ? void 0 : i4[0]) == null ? void 0 : r3.to] }), { txHashes: a3 });
      } catch (o7) {
        this.client.logger.warn("Error getting TVF params", o7);
      }
      return {};
    }), c5(this, "isValidContractData", (e2) => {
      var t;
      if (!e2) return false;
      try {
        const s3 = (e2 == null ? void 0 : e2.data) || ((t = e2 == null ? void 0 : e2[0]) == null ? void 0 : t.data);
        if (!s3.startsWith("0x")) return false;
        const i4 = s3.slice(2);
        return /^[0-9a-fA-F]*$/.test(i4) ? i4.length % 2 === 0 : false;
      } catch {
      }
      return false;
    }), c5(this, "extractTxHashesFromResult", (e2, t) => {
      try {
        const s3 = Ue4[e2];
        if (typeof t == "string") return [t];
        const i4 = t[s3.key];
        if ($e2(i4)) return e2 === "solana_signAllTransactions" ? i4.map((r3) => qo2(r3)) : i4;
        if (typeof i4 == "string") return [i4];
      } catch (s3) {
        this.client.logger.warn("Error extracting tx hashes from result", s3);
      }
      return [];
    });
  }
  async processPendingMessageEvents() {
    try {
      const n5 = this.client.session.keys, e2 = this.client.core.relayer.messages.getWithoutAck(n5);
      for (const [t, s3] of Object.entries(e2)) for (const i4 of s3) try {
        await this.onProviderMessageEvent({ topic: t, message: i4, publishedAt: Date.now() });
      } catch {
        this.client.logger.warn(`Error processing pending message event for topic: ${t}, message: ${i4}`);
      }
    } catch (n5) {
      this.client.logger.warn("processPendingMessageEvents failed", n5);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: n5 } = te2("NOT_INITIALIZED", this.name);
      throw new Error(n5);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(C3.message, (n5) => {
      this.onProviderMessageEvent(n5);
    });
  }
  async onRelayMessage(n5) {
    const { topic: e2, message: t, attestation: s3, transportType: i4 } = n5, { publicKey: r3 } = this.client.auth.authKeys.keys.includes(ce2) ? this.client.auth.authKeys.get(ce2) : { responseTopic: void 0, publicKey: void 0 };
    try {
      const o7 = await this.client.core.crypto.decode(e2, t, { receiverPublicKey: r3, encoding: i4 === Q3.link_mode ? ti : At });
      isJsonRpcRequest(o7) ? (this.client.core.history.set(e2, o7), await this.onRelayEventRequest({ topic: e2, payload: o7, attestation: s3, transportType: i4, encryptedId: ci(t) })) : isJsonRpcResponse(o7) ? (await this.client.core.history.resolve(o7), await this.onRelayEventResponse({ topic: e2, payload: o7, transportType: i4 }), this.client.core.history.delete(e2, o7.id)) : await this.onRelayEventUnknownPayload({ topic: e2, payload: o7, transportType: i4 }), await this.client.core.relayer.messages.ack(e2, t);
    } catch (o7) {
      this.client.logger.error(o7);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(F2.expired, async (n5) => {
      const { topic: e2, id: t } = ho2(n5.target);
      if (t && this.client.pendingRequest.keys.includes(t)) return await this.deletePendingSessionRequest(t, te2("EXPIRED"), true);
      if (t && this.client.auth.requests.keys.includes(t)) return await this.deletePendingAuthRequest(t, te2("EXPIRED"), true);
      e2 ? this.client.session.keys.includes(e2) && (await this.deleteSession({ topic: e2, expirerHasDeleted: true }), this.client.events.emit("session_expire", { topic: e2 })) : t && (await this.deleteProposal(t, true), this.client.events.emit("proposal_expire", { id: t }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(se2.create, (n5) => this.onPairingCreated(n5)), this.client.core.pairing.events.on(se2.delete, (n5) => {
      this.addToRecentlyDeleted(n5.topic, "pairing");
    });
  }
  isValidPairingTopic(n5) {
    if (!q(n5, false)) {
      const { message: e2 } = te2("MISSING_OR_INVALID", `pairing topic should be a string: ${n5}`);
      throw new Error(e2);
    }
    if (!this.client.core.pairing.pairings.keys.includes(n5)) {
      const { message: e2 } = te2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${n5}`);
      throw new Error(e2);
    }
    if (go2(this.client.core.pairing.pairings.get(n5).expiry)) {
      const { message: e2 } = te2("EXPIRED", `pairing topic: ${n5}`);
      throw new Error(e2);
    }
  }
  async isValidSessionTopic(n5) {
    if (!q(n5, false)) {
      const { message: e2 } = te2("MISSING_OR_INVALID", `session topic should be a string: ${n5}`);
      throw new Error(e2);
    }
    if (this.checkRecentlyDeleted(n5), !this.client.session.keys.includes(n5)) {
      const { message: e2 } = te2("NO_MATCHING_KEY", `session topic doesn't exist: ${n5}`);
      throw new Error(e2);
    }
    if (go2(this.client.session.get(n5).expiry)) {
      await this.deleteSession({ topic: n5 });
      const { message: e2 } = te2("EXPIRED", `session topic: ${n5}`);
      throw new Error(e2);
    }
    if (!this.client.core.crypto.keychain.has(n5)) {
      const { message: e2 } = te2("MISSING_OR_INVALID", `session topic does not exist in keychain: ${n5}`);
      throw await this.deleteSession({ topic: n5 }), new Error(e2);
    }
  }
  async isValidSessionOrPairingTopic(n5) {
    if (this.checkRecentlyDeleted(n5), this.client.session.keys.includes(n5)) await this.isValidSessionTopic(n5);
    else if (this.client.core.pairing.pairings.keys.includes(n5)) this.isValidPairingTopic(n5);
    else if (q(n5, false)) {
      const { message: e2 } = te2("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${n5}`);
      throw new Error(e2);
    } else {
      const { message: e2 } = te2("MISSING_OR_INVALID", `session or pairing topic should be a string: ${n5}`);
      throw new Error(e2);
    }
  }
  async isValidProposalId(n5) {
    if (!Mi(n5)) {
      const { message: e2 } = te2("MISSING_OR_INVALID", `proposal id should be a number: ${n5}`);
      throw new Error(e2);
    }
    if (!this.client.proposal.keys.includes(n5)) {
      const { message: e2 } = te2("NO_MATCHING_KEY", `proposal id doesn't exist: ${n5}`);
      throw new Error(e2);
    }
    if (go2(this.client.proposal.get(n5).expiryTimestamp)) {
      await this.deleteProposal(n5);
      const { message: e2 } = te2("EXPIRED", `proposal id: ${n5}`);
      throw new Error(e2);
    }
  }
};
var Ns2 = class extends zi2 {
  constructor(n5, e2) {
    super(n5, e2, pt2, we3), this.core = n5, this.logger = e2;
  }
};
var St4 = class extends zi2 {
  constructor(n5, e2) {
    super(n5, e2, ht3, we3), this.core = n5, this.logger = e2;
  }
};
var Os2 = class extends zi2 {
  constructor(n5, e2) {
    super(n5, e2, ut3, we3, (t) => t.id), this.core = n5, this.logger = e2;
  }
};
var bs2 = class extends zi2 {
  constructor(n5, e2) {
    super(n5, e2, mt2, ae2, () => ce2), this.core = n5, this.logger = e2;
  }
};
var As2 = class extends zi2 {
  constructor(n5, e2) {
    super(n5, e2, _t3, ae2), this.core = n5, this.logger = e2;
  }
};
var xs2 = class extends zi2 {
  constructor(n5, e2) {
    super(n5, e2, Et4, ae2, (t) => t.id), this.core = n5, this.logger = e2;
  }
};
var Cs2 = Object.defineProperty;
var Vs3 = (S5, n5, e2) => n5 in S5 ? Cs2(S5, n5, { enumerable: true, configurable: true, writable: true, value: e2 }) : S5[n5] = e2;
var Ge4 = (S5, n5, e2) => Vs3(S5, typeof n5 != "symbol" ? n5 + "" : n5, e2);
var Ds2 = class {
  constructor(n5, e2) {
    this.core = n5, this.logger = e2, Ge4(this, "authKeys"), Ge4(this, "pairingTopics"), Ge4(this, "requests"), this.authKeys = new bs2(this.core, this.logger), this.pairingTopics = new As2(this.core, this.logger), this.requests = new xs2(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
};
var Ls2 = Object.defineProperty;
var ks2 = (S5, n5, e2) => n5 in S5 ? Ls2(S5, n5, { enumerable: true, configurable: true, writable: true, value: e2 }) : S5[n5] = e2;
var E4 = (S5, n5, e2) => ks2(S5, typeof n5 != "symbol" ? n5 + "" : n5, e2);
var Ee4 = class _Ee extends J3 {
  constructor(n5) {
    super(n5), E4(this, "protocol", De3), E4(this, "version", Le3), E4(this, "name", me3.name), E4(this, "metadata"), E4(this, "core"), E4(this, "logger"), E4(this, "events", new import_events8.EventEmitter()), E4(this, "engine"), E4(this, "session"), E4(this, "proposal"), E4(this, "pendingRequest"), E4(this, "auth"), E4(this, "signConfig"), E4(this, "on", (t, s3) => this.events.on(t, s3)), E4(this, "once", (t, s3) => this.events.once(t, s3)), E4(this, "off", (t, s3) => this.events.off(t, s3)), E4(this, "removeListener", (t, s3) => this.events.removeListener(t, s3)), E4(this, "removeAllListeners", (t) => this.events.removeAllListeners(t)), E4(this, "connect", async (t) => {
      try {
        return await this.engine.connect(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "pair", async (t) => {
      try {
        return await this.engine.pair(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "approve", async (t) => {
      try {
        return await this.engine.approve(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "reject", async (t) => {
      try {
        return await this.engine.reject(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "update", async (t) => {
      try {
        return await this.engine.update(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "extend", async (t) => {
      try {
        return await this.engine.extend(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "request", async (t) => {
      try {
        return await this.engine.request(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "respond", async (t) => {
      try {
        return await this.engine.respond(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "ping", async (t) => {
      try {
        return await this.engine.ping(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "emit", async (t) => {
      try {
        return await this.engine.emit(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "disconnect", async (t) => {
      try {
        return await this.engine.disconnect(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "find", (t) => {
      try {
        return this.engine.find(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }), E4(this, "authenticate", async (t, s3) => {
      try {
        return await this.engine.authenticate(t, s3);
      } catch (i4) {
        throw this.logger.error(i4.message), i4;
      }
    }), E4(this, "formatAuthMessage", (t) => {
      try {
        return this.engine.formatAuthMessage(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "approveSessionAuthenticate", async (t) => {
      try {
        return await this.engine.approveSessionAuthenticate(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), E4(this, "rejectSessionAuthenticate", async (t) => {
      try {
        return await this.engine.rejectSessionAuthenticate(t);
      } catch (s3) {
        throw this.logger.error(s3.message), s3;
      }
    }), this.name = (n5 == null ? void 0 : n5.name) || me3.name, this.metadata = (n5 == null ? void 0 : n5.metadata) || Xr2(), this.signConfig = n5 == null ? void 0 : n5.signConfig;
    const e2 = typeof (n5 == null ? void 0 : n5.logger) < "u" && typeof (n5 == null ? void 0 : n5.logger) != "string" ? n5.logger : (0, import_pino2.default)(k3({ level: (n5 == null ? void 0 : n5.logger) || me3.logger }));
    this.core = (n5 == null ? void 0 : n5.core) || new Jo3(n5), this.logger = E2(e2, this.name), this.session = new St4(this.core, this.logger), this.proposal = new Ns2(this.core, this.logger), this.pendingRequest = new Os2(this.core, this.logger), this.engine = new Ps2(this), this.auth = new Ds2(this.core, this.logger);
  }
  static async init(n5) {
    const e2 = new _Ee(n5);
    return await e2.initialize(), e2;
  }
  get context() {
    return y2(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
        this.engine.processRelayMessageCache();
      }, (0, import_time5.toMiliseconds)(import_time5.ONE_SECOND));
    } catch (n5) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(n5.message), n5;
    }
  }
};

// node_modules/@walletconnect/jsonrpc-http-connection/dist/index.es.js
var import_events9 = __toESM(require_events());
var import_cross_fetch = __toESM(require_browser_ponyfill());
var P4 = Object.defineProperty;
var w4 = Object.defineProperties;
var E5 = Object.getOwnPropertyDescriptors;
var c6 = Object.getOwnPropertySymbols;
var L3 = Object.prototype.hasOwnProperty;
var O5 = Object.prototype.propertyIsEnumerable;
var l6 = (r3, t, e2) => t in r3 ? P4(r3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : r3[t] = e2;
var p4 = (r3, t) => {
  for (var e2 in t || (t = {})) L3.call(t, e2) && l6(r3, e2, t[e2]);
  if (c6) for (var e2 of c6(t)) O5.call(t, e2) && l6(r3, e2, t[e2]);
  return r3;
};
var v6 = (r3, t) => w4(r3, E5(t));
var j3 = { Accept: "application/json", "Content-Type": "application/json" };
var T3 = "POST";
var d4 = { headers: j3, method: T3 };
var g3 = 10;
var f5 = class {
  constructor(t, e2 = false) {
    if (this.url = t, this.disableProviderPing = e2, this.events = new import_events9.EventEmitter(), this.isAvailable = false, this.registering = false, !isHttpUrl(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
    this.url = t, this.disableProviderPing = e2;
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(t, e2) {
    this.events.on(t, e2);
  }
  once(t, e2) {
    this.events.once(t, e2);
  }
  off(t, e2) {
    this.events.off(t, e2);
  }
  removeListener(t, e2) {
    this.events.removeListener(t, e2);
  }
  async open(t = this.url) {
    await this.register(t);
  }
  async close() {
    if (!this.isAvailable) throw new Error("Connection already closed");
    this.onClose();
  }
  async send(t) {
    this.isAvailable || await this.register();
    try {
      const e2 = safeJsonStringify(t), s3 = await (await (0, import_cross_fetch.default)(this.url, v6(p4({}, d4), { body: e2 }))).json();
      this.onPayload({ data: s3 });
    } catch (e2) {
      this.onError(t.id, e2);
    }
  }
  async register(t = this.url) {
    if (!isHttpUrl(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
    if (this.registering) {
      const e2 = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= e2 || this.events.listenerCount("open") >= e2) && this.events.setMaxListeners(e2 + 1), new Promise((s3, i4) => {
        this.events.once("register_error", (n5) => {
          this.resetMaxListeners(), i4(n5);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.isAvailable > "u") return i4(new Error("HTTP connection is missing or invalid"));
          s3();
        });
      });
    }
    this.url = t, this.registering = true;
    try {
      if (!this.disableProviderPing) {
        const e2 = safeJsonStringify({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
        await (0, import_cross_fetch.default)(t, v6(p4({}, d4), { body: e2 }));
      }
      this.onOpen();
    } catch (e2) {
      const s3 = this.parseError(e2);
      throw this.events.emit("register_error", s3), this.onClose(), s3;
    }
  }
  onOpen() {
    this.isAvailable = true, this.registering = false, this.events.emit("open");
  }
  onClose() {
    this.isAvailable = false, this.registering = false, this.events.emit("close");
  }
  onPayload(t) {
    if (typeof t.data > "u") return;
    const e2 = typeof t.data == "string" ? safeJsonParse(t.data) : t.data;
    this.events.emit("payload", e2);
  }
  onError(t, e2) {
    const s3 = this.parseError(e2), i4 = s3.message || s3.toString(), n5 = formatJsonRpcError(t, i4);
    this.events.emit("payload", n5);
  }
  parseError(t, e2 = this.url) {
    return parseConnectionError(t, e2, "HTTP");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > g3 && this.events.setMaxListeners(g3);
  }
};

// node_modules/@walletconnect/universal-provider/dist/index.es.js
var import_events10 = __toESM(require_events());
var tt3 = "error";
var Nt4 = "wss://relay.walletconnect.org";
var St5 = "wc";
var Dt2 = "universal_provider";
var _3 = `${St5}@2:${Dt2}:`;
var et2 = "https://rpc.walletconnect.org/v1/";
var w5 = "generic";
var qt3 = `${et2}bundler`;
var d5 = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function jt4() {
}
function B3(s3) {
  return s3 == null || typeof s3 != "object" && typeof s3 != "function";
}
function G3(s3) {
  return ArrayBuffer.isView(s3) && !(s3 instanceof DataView);
}
function Rt4(s3) {
  if (B3(s3)) return s3;
  if (Array.isArray(s3) || G3(s3) || s3 instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s3 instanceof SharedArrayBuffer) return s3.slice(0);
  const t = Object.getPrototypeOf(s3), e2 = t.constructor;
  if (s3 instanceof Date || s3 instanceof Map || s3 instanceof Set) return new e2(s3);
  if (s3 instanceof RegExp) {
    const i4 = new e2(s3);
    return i4.lastIndex = s3.lastIndex, i4;
  }
  if (s3 instanceof DataView) return new e2(s3.buffer.slice(0));
  if (s3 instanceof Error) {
    const i4 = new e2(s3.message);
    return i4.stack = s3.stack, i4.name = s3.name, i4.cause = s3.cause, i4;
  }
  if (typeof File < "u" && s3 instanceof File) return new e2([s3], s3.name, { type: s3.type, lastModified: s3.lastModified });
  if (typeof s3 == "object") {
    const i4 = Object.create(t);
    return Object.assign(i4, s3);
  }
  return s3;
}
function st2(s3) {
  return typeof s3 == "object" && s3 !== null;
}
function it4(s3) {
  return Object.getOwnPropertySymbols(s3).filter((t) => Object.prototype.propertyIsEnumerable.call(s3, t));
}
function rt3(s3) {
  return s3 == null ? s3 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s3);
}
var _t4 = "[object RegExp]";
var nt2 = "[object String]";
var at2 = "[object Number]";
var ct3 = "[object Boolean]";
var ot2 = "[object Arguments]";
var Ut4 = "[object Symbol]";
var Ft4 = "[object Date]";
var Lt4 = "[object Map]";
var xt4 = "[object Set]";
var Mt3 = "[object Array]";
var Bt4 = "[object ArrayBuffer]";
var Gt4 = "[object Object]";
var Jt4 = "[object DataView]";
var zt4 = "[object Uint8Array]";
var kt5 = "[object Uint8ClampedArray]";
var Wt4 = "[object Uint16Array]";
var Kt3 = "[object Uint32Array]";
var Vt3 = "[object Int8Array]";
var Xt3 = "[object Int16Array]";
var Yt4 = "[object Int32Array]";
var Qt3 = "[object Float32Array]";
var Zt3 = "[object Float64Array]";
function Tt4(s3, t) {
  return y5(s3, void 0, s3, /* @__PURE__ */ new Map(), t);
}
function y5(s3, t, e2, i4 = /* @__PURE__ */ new Map(), r3 = void 0) {
  const a3 = r3 == null ? void 0 : r3(s3, t, e2, i4);
  if (a3 != null) return a3;
  if (B3(s3)) return s3;
  if (i4.has(s3)) return i4.get(s3);
  if (Array.isArray(s3)) {
    const n5 = new Array(s3.length);
    i4.set(s3, n5);
    for (let c7 = 0; c7 < s3.length; c7++) n5[c7] = y5(s3[c7], c7, e2, i4, r3);
    return Object.hasOwn(s3, "index") && (n5.index = s3.index), Object.hasOwn(s3, "input") && (n5.input = s3.input), n5;
  }
  if (s3 instanceof Date) return new Date(s3.getTime());
  if (s3 instanceof RegExp) {
    const n5 = new RegExp(s3.source, s3.flags);
    return n5.lastIndex = s3.lastIndex, n5;
  }
  if (s3 instanceof Map) {
    const n5 = /* @__PURE__ */ new Map();
    i4.set(s3, n5);
    for (const [c7, h5] of s3) n5.set(c7, y5(h5, c7, e2, i4, r3));
    return n5;
  }
  if (s3 instanceof Set) {
    const n5 = /* @__PURE__ */ new Set();
    i4.set(s3, n5);
    for (const c7 of s3) n5.add(y5(c7, void 0, e2, i4, r3));
    return n5;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(s3)) return s3.subarray();
  if (G3(s3)) {
    const n5 = new (Object.getPrototypeOf(s3)).constructor(s3.length);
    i4.set(s3, n5);
    for (let c7 = 0; c7 < s3.length; c7++) n5[c7] = y5(s3[c7], c7, e2, i4, r3);
    return n5;
  }
  if (s3 instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s3 instanceof SharedArrayBuffer) return s3.slice(0);
  if (s3 instanceof DataView) {
    const n5 = new DataView(s3.buffer.slice(0), s3.byteOffset, s3.byteLength);
    return i4.set(s3, n5), g4(n5, s3, e2, i4, r3), n5;
  }
  if (typeof File < "u" && s3 instanceof File) {
    const n5 = new File([s3], s3.name, { type: s3.type });
    return i4.set(s3, n5), g4(n5, s3, e2, i4, r3), n5;
  }
  if (s3 instanceof Blob) {
    const n5 = new Blob([s3], { type: s3.type });
    return i4.set(s3, n5), g4(n5, s3, e2, i4, r3), n5;
  }
  if (s3 instanceof Error) {
    const n5 = new s3.constructor();
    return i4.set(s3, n5), n5.message = s3.message, n5.name = s3.name, n5.stack = s3.stack, n5.cause = s3.cause, g4(n5, s3, e2, i4, r3), n5;
  }
  if (typeof s3 == "object" && te4(s3)) {
    const n5 = Object.create(Object.getPrototypeOf(s3));
    return i4.set(s3, n5), g4(n5, s3, e2, i4, r3), n5;
  }
  return s3;
}
function g4(s3, t, e2 = s3, i4, r3) {
  const a3 = [...Object.keys(t), ...it4(t)];
  for (let n5 = 0; n5 < a3.length; n5++) {
    const c7 = a3[n5], h5 = Object.getOwnPropertyDescriptor(s3, c7);
    (h5 == null || h5.writable) && (s3[c7] = y5(t[c7], c7, e2, i4, r3));
  }
}
function te4(s3) {
  switch (rt3(s3)) {
    case ot2:
    case Mt3:
    case Bt4:
    case Jt4:
    case ct3:
    case Ft4:
    case Qt3:
    case Zt3:
    case Vt3:
    case Xt3:
    case Yt4:
    case Lt4:
    case at2:
    case Gt4:
    case _t4:
    case xt4:
    case nt2:
    case Ut4:
    case zt4:
    case kt5:
    case Wt4:
    case Kt3:
      return true;
    default:
      return false;
  }
}
function ee3(s3, t) {
  return Tt4(s3, (e2, i4, r3, a3) => {
    const n5 = t == null ? void 0 : t(e2, i4, r3, a3);
    if (n5 != null) return n5;
    if (typeof s3 == "object") switch (Object.prototype.toString.call(s3)) {
      case at2:
      case nt2:
      case ct3: {
        const c7 = new s3.constructor(s3 == null ? void 0 : s3.valueOf());
        return g4(c7, s3), c7;
      }
      case ot2: {
        const c7 = {};
        return g4(c7, s3), c7.length = s3.length, c7[Symbol.iterator] = s3[Symbol.iterator], c7;
      }
      default:
        return;
    }
  });
}
function ht4(s3) {
  return ee3(s3);
}
function pt3(s3) {
  return s3 !== null && typeof s3 == "object" && rt3(s3) === "[object Arguments]";
}
function se3(s3) {
  return G3(s3);
}
function ie3(s3) {
  var _a;
  if (typeof s3 != "object" || s3 == null) return false;
  if (Object.getPrototypeOf(s3) === null) return true;
  if (Object.prototype.toString.call(s3) !== "[object Object]") {
    const e2 = s3[Symbol.toStringTag];
    return e2 == null || !((_a = Object.getOwnPropertyDescriptor(s3, Symbol.toStringTag)) == null ? void 0 : _a.writable) ? false : s3.toString() === `[object ${e2}]`;
  }
  let t = s3;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(s3) === t;
}
function re3(s3, ...t) {
  const e2 = t.slice(0, -1), i4 = t[t.length - 1];
  let r3 = s3;
  for (let a3 = 0; a3 < e2.length; a3++) {
    const n5 = e2[a3];
    r3 = U2(r3, n5, i4, /* @__PURE__ */ new Map());
  }
  return r3;
}
function U2(s3, t, e2, i4) {
  if (B3(s3) && (s3 = Object(s3)), t == null || typeof t != "object") return s3;
  if (i4.has(t)) return Rt4(i4.get(t));
  if (i4.set(t, s3), Array.isArray(t)) {
    t = t.slice();
    for (let a3 = 0; a3 < t.length; a3++) t[a3] = t[a3] ?? void 0;
  }
  const r3 = [...Object.keys(t), ...it4(t)];
  for (let a3 = 0; a3 < r3.length; a3++) {
    const n5 = r3[a3];
    let c7 = t[n5], h5 = s3[n5];
    if (pt3(c7) && (c7 = { ...c7 }), pt3(h5) && (h5 = { ...h5 }), typeof Buffer < "u" && Buffer.isBuffer(c7) && (c7 = ht4(c7)), Array.isArray(c7)) if (typeof h5 == "object" && h5 != null) {
      const j5 = [], R3 = Reflect.ownKeys(h5);
      for (let f6 = 0; f6 < R3.length; f6++) {
        const X = R3[f6];
        j5[X] = h5[X];
      }
      h5 = j5;
    } else h5 = [];
    const v8 = e2(h5, c7, n5, s3, t, i4);
    v8 != null ? s3[n5] = v8 : Array.isArray(c7) || st2(h5) && st2(c7) ? s3[n5] = U2(h5, c7, e2, i4) : h5 == null && ie3(c7) ? s3[n5] = U2({}, c7, e2, i4) : h5 == null && se3(c7) ? s3[n5] = ht4(c7) : (h5 === void 0 || c7 !== void 0) && (s3[n5] = c7);
  }
  return s3;
}
function ne2(s3, ...t) {
  return re3(s3, ...t, jt4);
}
var ae3 = Object.defineProperty;
var ce3 = Object.defineProperties;
var oe2 = Object.getOwnPropertyDescriptors;
var dt4 = Object.getOwnPropertySymbols;
var he3 = Object.prototype.hasOwnProperty;
var pe3 = Object.prototype.propertyIsEnumerable;
var ut4 = (s3, t, e2) => t in s3 ? ae3(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var F3 = (s3, t) => {
  for (var e2 in t || (t = {})) he3.call(t, e2) && ut4(s3, e2, t[e2]);
  if (dt4) for (var e2 of dt4(t)) pe3.call(t, e2) && ut4(s3, e2, t[e2]);
  return s3;
};
var de4 = (s3, t) => ce3(s3, oe2(t));
function p5(s3, t, e2) {
  var i4;
  const r3 = Ye2(s3);
  return ((i4 = t.rpcMap) == null ? void 0 : i4[r3.reference]) || `${et2}?chainId=${r3.namespace}:${r3.reference}&projectId=${e2}`;
}
function P5(s3) {
  return s3.includes(":") ? s3.split(":")[1] : s3;
}
function lt3(s3) {
  return s3.map((t) => `${t.split(":")[0]}:${t.split(":")[1]}`);
}
function ue3(s3, t) {
  const e2 = Object.keys(t.namespaces).filter((r3) => r3.includes(s3));
  if (!e2.length) return [];
  const i4 = [];
  return e2.forEach((r3) => {
    const a3 = t.namespaces[r3].accounts;
    i4.push(...a3);
  }), i4;
}
function J5(s3 = {}, t = {}) {
  const e2 = ft4(s3), i4 = ft4(t);
  return ne2(e2, i4);
}
function ft4(s3) {
  var t, e2, i4, r3;
  const a3 = {};
  if (!qe2(s3)) return a3;
  for (const [n5, c7] of Object.entries(s3)) {
    const h5 = Tt2(n5) ? [n5] : c7.chains, v8 = c7.methods || [], j5 = c7.events || [], R3 = c7.rpcMap || {}, f6 = pr2(n5);
    a3[f6] = de4(F3(F3({}, a3[f6]), c7), { chains: Q2(h5, (t = a3[f6]) == null ? void 0 : t.chains), methods: Q2(v8, (e2 = a3[f6]) == null ? void 0 : e2.methods), events: Q2(j5, (i4 = a3[f6]) == null ? void 0 : i4.events), rpcMap: F3(F3({}, R3), (r3 = a3[f6]) == null ? void 0 : r3.rpcMap) });
  }
  return a3;
}
function le4(s3) {
  return s3.includes(":") ? s3.split(":")[2] : s3;
}
function mt3(s3) {
  const t = {};
  for (const [e2, i4] of Object.entries(s3)) {
    const r3 = i4.methods || [], a3 = i4.events || [], n5 = i4.accounts || [], c7 = Tt2(e2) ? [e2] : i4.chains ? i4.chains : lt3(i4.accounts);
    t[e2] = { chains: c7, methods: r3, events: a3, accounts: n5 };
  }
  return t;
}
function z5(s3) {
  return typeof s3 == "number" ? s3 : s3.includes("0x") ? parseInt(s3, 16) : (s3 = s3.includes(":") ? s3.split(":")[1] : s3, isNaN(Number(s3)) ? s3 : Number(s3));
}
var vt3 = {};
var o5 = (s3) => vt3[s3];
var k6 = (s3, t) => {
  vt3[s3] = t;
};
var fe4 = Object.defineProperty;
var me4 = (s3, t, e2) => t in s3 ? fe4(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var b5 = (s3, t, e2) => me4(s3, typeof t != "symbol" ? t + "" : t, e2);
var ve3 = class {
  constructor(t) {
    b5(this, "name", "polkadot"), b5(this, "client"), b5(this, "httpProviders"), b5(this, "events"), b5(this, "namespace"), b5(this, "chainId"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i4;
      const r3 = P5(e2);
      t[r3] = this.createHttpProvider(r3, (i4 = this.namespace.rpcMap) == null ? void 0 : i4[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || p5(t, this.namespace, this.client.core.projectId);
    if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o3(new f5(i4, o5("disableProviderPing")));
  }
};
var ge3 = Object.defineProperty;
var Pe4 = Object.defineProperties;
var we4 = Object.getOwnPropertyDescriptors;
var gt4 = Object.getOwnPropertySymbols;
var ye3 = Object.prototype.hasOwnProperty;
var be4 = Object.prototype.propertyIsEnumerable;
var W3 = (s3, t, e2) => t in s3 ? ge3(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var Pt4 = (s3, t) => {
  for (var e2 in t || (t = {})) ye3.call(t, e2) && W3(s3, e2, t[e2]);
  if (gt4) for (var e2 of gt4(t)) be4.call(t, e2) && W3(s3, e2, t[e2]);
  return s3;
};
var wt4 = (s3, t) => Pe4(s3, we4(t));
var I3 = (s3, t, e2) => W3(s3, typeof t != "symbol" ? t + "" : t, e2);
var Ie4 = class {
  constructor(t) {
    I3(this, "name", "eip155"), I3(this, "client"), I3(this, "chainId"), I3(this, "namespace"), I3(this, "httpProviders"), I3(this, "events"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
  }
  async request(t) {
    switch (t.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(t);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
      case "wallet_getCapabilities":
        return await this.getCapabilities(t);
      case "wallet_getCallsStatus":
        return await this.getCallStatus(t);
    }
    return this.namespace.methods.includes(t.request.method) ? await this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(parseInt(t), e2), this.chainId = parseInt(t), this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || p5(`${this.name}:${t}`, this.namespace, this.client.core.projectId);
    if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o3(new f5(i4, o5("disableProviderPing")));
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i4;
      const r3 = parseInt(P5(e2));
      t[r3] = this.createHttpProvider(r3, (i4 = this.namespace.rpcMap) == null ? void 0 : i4[e2]);
    }), t;
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const t = this.chainId, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  async handleSwitchChain(t) {
    var e2, i4;
    let r3 = t.request.params ? (e2 = t.request.params[0]) == null ? void 0 : e2.chainId : "0x0";
    r3 = r3.startsWith("0x") ? r3 : `0x${r3}`;
    const a3 = parseInt(r3, 16);
    if (this.isChainApproved(a3)) this.setDefaultChain(`${a3}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({ topic: t.topic, request: { method: t.request.method, params: [{ chainId: r3 }] }, chainId: (i4 = this.namespace.chains) == null ? void 0 : i4[0] }), this.setDefaultChain(`${a3}`);
    else throw new Error(`Failed to switch to chain 'eip155:${a3}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(t) {
    return this.namespace.chains.includes(`${this.name}:${t}`);
  }
  async getCapabilities(t) {
    var e2, i4, r3;
    const a3 = (i4 = (e2 = t.request) == null ? void 0 : e2.params) == null ? void 0 : i4[0];
    if (!a3) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const n5 = this.client.session.get(t.topic), c7 = ((r3 = n5 == null ? void 0 : n5.sessionProperties) == null ? void 0 : r3.capabilities) || {};
    if (c7 != null && c7[a3]) return c7 == null ? void 0 : c7[a3];
    const h5 = await this.client.request(t);
    try {
      await this.client.session.update(t.topic, { sessionProperties: wt4(Pt4({}, n5.sessionProperties || {}), { capabilities: wt4(Pt4({}, c7 || {}), { [a3]: h5 }) }) });
    } catch (v8) {
      console.warn("Failed to update session with capabilities", v8);
    }
    return h5;
  }
  async getCallStatus(t) {
    var e2, i4;
    const r3 = this.client.session.get(t.topic), a3 = (e2 = r3.sessionProperties) == null ? void 0 : e2.bundler_name;
    if (a3) {
      const c7 = this.getBundlerUrl(t.chainId, a3);
      try {
        return await this.getUserOperationReceipt(c7, t);
      } catch (h5) {
        console.warn("Failed to fetch call status from bundler", h5, c7);
      }
    }
    const n5 = (i4 = r3.sessionProperties) == null ? void 0 : i4.bundler_url;
    if (n5) try {
      return await this.getUserOperationReceipt(n5, t);
    } catch (c7) {
      console.warn("Failed to fetch call status from custom bundler", c7, n5);
    }
    if (this.namespace.methods.includes(t.request.method)) return await this.client.request(t);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(t, e2) {
    var i4;
    const r3 = new URL(t), a3 = await fetch(r3, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formatJsonRpcRequest("eth_getUserOperationReceipt", [(i4 = e2.request.params) == null ? void 0 : i4[0]])) });
    if (!a3.ok) throw new Error(`Failed to fetch user operation receipt - ${a3.status}`);
    return await a3.json();
  }
  getBundlerUrl(t, e2) {
    return `${qt3}?projectId=${this.client.core.projectId}&chainId=${t}&bundler=${e2}`;
  }
};
var $e4 = Object.defineProperty;
var Oe4 = (s3, t, e2) => t in s3 ? $e4(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var $3 = (s3, t, e2) => Oe4(s3, typeof t != "symbol" ? t + "" : t, e2);
var Ae3 = class {
  constructor(t) {
    $3(this, "name", "solana"), $3(this, "client"), $3(this, "httpProviders"), $3(this, "events"), $3(this, "namespace"), $3(this, "chainId"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i4;
      const r3 = P5(e2);
      t[r3] = this.createHttpProvider(r3, (i4 = this.namespace.rpcMap) == null ? void 0 : i4[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || p5(t, this.namespace, this.client.core.projectId);
    if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o3(new f5(i4, o5("disableProviderPing")));
  }
};
var He4 = Object.defineProperty;
var Ee5 = (s3, t, e2) => t in s3 ? He4(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var O6 = (s3, t, e2) => Ee5(s3, typeof t != "symbol" ? t + "" : t, e2);
var Ce4 = class {
  constructor(t) {
    O6(this, "name", "cosmos"), O6(this, "client"), O6(this, "httpProviders"), O6(this, "events"), O6(this, "namespace"), O6(this, "chainId"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i4;
      const r3 = P5(e2);
      t[r3] = this.createHttpProvider(r3, (i4 = this.namespace.rpcMap) == null ? void 0 : i4[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || p5(t, this.namespace, this.client.core.projectId);
    if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o3(new f5(i4, o5("disableProviderPing")));
  }
};
var Ne3 = Object.defineProperty;
var Se4 = (s3, t, e2) => t in s3 ? Ne3(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var A3 = (s3, t, e2) => Se4(s3, typeof t != "symbol" ? t + "" : t, e2);
var De4 = class {
  constructor(t) {
    A3(this, "name", "algorand"), A3(this, "client"), A3(this, "httpProviders"), A3(this, "events"), A3(this, "namespace"), A3(this, "chainId"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    if (!this.httpProviders[t]) {
      const i4 = e2 || p5(`${this.name}:${t}`, this.namespace, this.client.core.projectId);
      if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
      this.setHttpProvider(t, i4);
    }
    this.chainId = t, this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i4;
      t[e2] = this.createHttpProvider(e2, (i4 = this.namespace.rpcMap) == null ? void 0 : i4[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || p5(t, this.namespace, this.client.core.projectId);
    return typeof i4 > "u" ? void 0 : new o3(new f5(i4, o5("disableProviderPing")));
  }
};
var qe4 = Object.defineProperty;
var je4 = (s3, t, e2) => t in s3 ? qe4(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var H3 = (s3, t, e2) => je4(s3, typeof t != "symbol" ? t + "" : t, e2);
var Re3 = class {
  constructor(t) {
    H3(this, "name", "cip34"), H3(this, "client"), H3(this, "httpProviders"), H3(this, "events"), H3(this, "namespace"), H3(this, "chainId"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      const i4 = this.getCardanoRPCUrl(e2), r3 = P5(e2);
      t[r3] = this.createHttpProvider(r3, i4);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  getCardanoRPCUrl(t) {
    const e2 = this.namespace.rpcMap;
    if (e2) return e2[t];
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || this.getCardanoRPCUrl(t);
    if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o3(new f5(i4, o5("disableProviderPing")));
  }
};
var _e5 = Object.defineProperty;
var Ue5 = (s3, t, e2) => t in s3 ? _e5(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var E6 = (s3, t, e2) => Ue5(s3, typeof t != "symbol" ? t + "" : t, e2);
var Fe3 = class {
  constructor(t) {
    E6(this, "name", "elrond"), E6(this, "client"), E6(this, "httpProviders"), E6(this, "events"), E6(this, "namespace"), E6(this, "chainId"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i4;
      const r3 = P5(e2);
      t[r3] = this.createHttpProvider(r3, (i4 = this.namespace.rpcMap) == null ? void 0 : i4[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || p5(t, this.namespace, this.client.core.projectId);
    if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o3(new f5(i4, o5("disableProviderPing")));
  }
};
var Le4 = Object.defineProperty;
var xe3 = (s3, t, e2) => t in s3 ? Le4(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var C5 = (s3, t, e2) => xe3(s3, typeof t != "symbol" ? t + "" : t, e2);
var Me5 = class {
  constructor(t) {
    C5(this, "name", "multiversx"), C5(this, "client"), C5(this, "httpProviders"), C5(this, "events"), C5(this, "namespace"), C5(this, "chainId"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i4;
      const r3 = P5(e2);
      t[r3] = this.createHttpProvider(r3, (i4 = this.namespace.rpcMap) == null ? void 0 : i4[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || p5(t, this.namespace, this.client.core.projectId);
    if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o3(new f5(i4, o5("disableProviderPing")));
  }
};
var Be5 = Object.defineProperty;
var Ge5 = (s3, t, e2) => t in s3 ? Be5(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var N12 = (s3, t, e2) => Ge5(s3, typeof t != "symbol" ? t + "" : t, e2);
var Je3 = class {
  constructor(t) {
    N12(this, "name", "near"), N12(this, "client"), N12(this, "httpProviders"), N12(this, "events"), N12(this, "namespace"), N12(this, "chainId"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    if (this.chainId = t, !this.httpProviders[t]) {
      const i4 = e2 || p5(`${this.name}:${t}`, this.namespace);
      if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
      this.setHttpProvider(t, i4);
    }
    this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      var i4;
      t[e2] = this.createHttpProvider(e2, (i4 = this.namespace.rpcMap) == null ? void 0 : i4[e2]);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || p5(t, this.namespace);
    return typeof i4 > "u" ? void 0 : new o3(new f5(i4, o5("disableProviderPing")));
  }
};
var ze4 = Object.defineProperty;
var ke5 = (s3, t, e2) => t in s3 ? ze4(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var S4 = (s3, t, e2) => ke5(s3, typeof t != "symbol" ? t + "" : t, e2);
var We5 = class {
  constructor(t) {
    S4(this, "name", "tezos"), S4(this, "client"), S4(this, "httpProviders"), S4(this, "events"), S4(this, "namespace"), S4(this, "chainId"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace = Object.assign(this.namespace, t);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider().request(t.request);
  }
  setDefaultChain(t, e2) {
    if (this.chainId = t, !this.httpProviders[t]) {
      const i4 = e2 || p5(`${this.name}:${t}`, this.namespace);
      if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
      this.setHttpProvider(t, i4);
    }
    this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const t = {};
    return this.namespace.chains.forEach((e2) => {
      t[e2] = this.createHttpProvider(e2);
    }), t;
  }
  getHttpProvider() {
    const t = `${this.name}:${this.chainId}`, e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || p5(t, this.namespace);
    return typeof i4 > "u" ? void 0 : new o3(new f5(i4));
  }
};
var Ke5 = Object.defineProperty;
var Ve4 = (s3, t, e2) => t in s3 ? Ke5(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var D2 = (s3, t, e2) => Ve4(s3, typeof t != "symbol" ? t + "" : t, e2);
var Xe3 = class {
  constructor(t) {
    D2(this, "name", w5), D2(this, "client"), D2(this, "httpProviders"), D2(this, "events"), D2(this, "namespace"), D2(this, "chainId"), this.namespace = t.namespace, this.events = o5("events"), this.client = o5("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(t) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(t.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(t.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(t.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(t.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(t) {
    return this.namespace.methods.includes(t.request.method) ? this.client.request(t) : this.getHttpProvider(t.chainId).request(t.request);
  }
  setDefaultChain(t, e2) {
    this.httpProviders[t] || this.setHttpProvider(t, e2), this.chainId = t, this.events.emit(d5.DEFAULT_CHAIN_CHANGED, `${this.name}:${t}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const t = this.namespace.chains[0];
    if (!t) throw new Error("ChainId not found");
    return t.split(":")[1];
  }
  getAccounts() {
    const t = this.namespace.accounts;
    return t ? [...new Set(t.filter((e2) => e2.split(":")[1] === this.chainId.toString()).map((e2) => e2.split(":")[2]))] : [];
  }
  createHttpProviders() {
    var t, e2;
    const i4 = {};
    return (e2 = (t = this.namespace) == null ? void 0 : t.accounts) == null || e2.forEach((r3) => {
      const a3 = Ye2(r3);
      i4[`${a3.namespace}:${a3.reference}`] = this.createHttpProvider(r3);
    }), i4;
  }
  getHttpProvider(t) {
    const e2 = this.httpProviders[t];
    if (typeof e2 > "u") throw new Error(`JSON-RPC provider for ${t} not found`);
    return e2;
  }
  setHttpProvider(t, e2) {
    const i4 = this.createHttpProvider(t, e2);
    i4 && (this.httpProviders[t] = i4);
  }
  createHttpProvider(t, e2) {
    const i4 = e2 || p5(t, this.namespace, this.client.core.projectId);
    if (!i4) throw new Error(`No RPC url provided for chainId: ${t}`);
    return new o3(new f5(i4, o5("disableProviderPing")));
  }
};
var Ye4 = Object.defineProperty;
var Qe3 = Object.defineProperties;
var Ze4 = Object.getOwnPropertyDescriptors;
var yt4 = Object.getOwnPropertySymbols;
var Te4 = Object.prototype.hasOwnProperty;
var ts = Object.prototype.propertyIsEnumerable;
var K4 = (s3, t, e2) => t in s3 ? Ye4(s3, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : s3[t] = e2;
var L4 = (s3, t) => {
  for (var e2 in t || (t = {})) Te4.call(t, e2) && K4(s3, e2, t[e2]);
  if (yt4) for (var e2 of yt4(t)) ts.call(t, e2) && K4(s3, e2, t[e2]);
  return s3;
};
var V4 = (s3, t) => Qe3(s3, Ze4(t));
var u2 = (s3, t, e2) => K4(s3, typeof t != "symbol" ? t + "" : t, e2);
var x5 = class _x {
  constructor(t) {
    u2(this, "client"), u2(this, "namespaces"), u2(this, "optionalNamespaces"), u2(this, "sessionProperties"), u2(this, "scopedProperties"), u2(this, "events", new import_events10.default()), u2(this, "rpcProviders", {}), u2(this, "session"), u2(this, "providerOpts"), u2(this, "logger"), u2(this, "uri"), u2(this, "disableProviderPing", false), this.providerOpts = t, this.logger = typeof (t == null ? void 0 : t.logger) < "u" && typeof (t == null ? void 0 : t.logger) != "string" ? t.logger : (0, import_pino2.default)(k3({ level: (t == null ? void 0 : t.logger) || tt3 })), this.disableProviderPing = (t == null ? void 0 : t.disableProviderPing) || false;
  }
  static async init(t) {
    const e2 = new _x(t);
    return await e2.initialize(), e2;
  }
  async request(t, e2, i4) {
    const [r3, a3] = this.validateChain(e2);
    if (!this.session) throw new Error("Please call connect() before request()");
    return await this.getProvider(r3).request({ request: L4({}, t), chainId: `${r3}:${a3}`, topic: this.session.topic, expiry: i4 });
  }
  sendAsync(t, e2, i4, r3) {
    const a3 = (/* @__PURE__ */ new Date()).getTime();
    this.request(t, i4, r3).then((n5) => e2(null, formatJsonRpcResult(a3, n5))).catch((n5) => e2(n5, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var t;
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (t = this.session) == null ? void 0 : t.topic, reason: de2("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(t) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (this.setNamespaces(t), await this.cleanupPendingPairings(), !t.skipPairing) return await this.pair(t.pairingTopic);
  }
  async authenticate(t, e2) {
    if (!this.client) throw new Error("Sign Client not initialized");
    this.setNamespaces(t), await this.cleanupPendingPairings();
    const { uri: i4, response: r3 } = await this.client.authenticate(t, e2);
    i4 && (this.uri = i4, this.events.emit("display_uri", i4));
    const a3 = await r3();
    if (this.session = a3.session, this.session) {
      const n5 = mt3(this.session.namespaces);
      this.namespaces = J5(this.namespaces, n5), await this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return a3;
  }
  on(t, e2) {
    this.events.on(t, e2);
  }
  once(t, e2) {
    this.events.once(t, e2);
  }
  removeListener(t, e2) {
    this.events.removeListener(t, e2);
  }
  off(t, e2) {
    this.events.off(t, e2);
  }
  get isWalletConnect() {
    return true;
  }
  async pair(t) {
    const { uri: e2, approval: i4 } = await this.client.connect({ pairingTopic: t, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties });
    e2 && (this.uri = e2, this.events.emit("display_uri", e2));
    const r3 = await i4();
    this.session = r3;
    const a3 = mt3(r3.namespaces);
    return this.namespaces = J5(this.namespaces, a3), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
  }
  setDefaultChain(t, e2) {
    try {
      if (!this.session) return;
      const [i4, r3] = this.validateChain(t), a3 = this.getProvider(i4);
      a3.name === w5 ? a3.setDefaultChain(`${i4}:${r3}`, e2) : a3.setDefaultChain(r3, e2);
    } catch (i4) {
      if (!/Please call connect/.test(i4.message)) throw i4;
    }
  }
  async cleanupPendingPairings(t = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const e2 = this.client.pairing.getAll();
    if ($e2(e2)) {
      for (const i4 of e2) t.deletePairings ? this.client.core.expirer.set(i4.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(i4.topic);
      this.logger.info(`Inactive pairings cleared: ${e2.length}`);
    }
  }
  abortPairingAttempt() {
    this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
  }
  async checkStorage() {
    this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.session && this.createProviders();
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    var t, e2;
    if (this.client = this.providerOpts.client || await Ee4.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || tt3, relayUrl: this.providerOpts.relayUrl || Nt4, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.providerOpts.session) try {
      this.session = this.client.session.get(this.providerOpts.session.topic);
    } catch (i4) {
      throw this.logger.error("Failed to get session", i4), new Error(`The provided session: ${(e2 = (t = this.providerOpts) == null ? void 0 : t.session) == null ? void 0 : e2.topic} doesn't exist in the Sign client`);
    }
    else {
      const i4 = this.client.session.getAll();
      this.session = i4[0];
    }
    this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
    const t = [...new Set(Object.keys(this.session.namespaces).map((e2) => pr2(e2)))];
    k6("client", this.client), k6("events", this.events), k6("disableProviderPing", this.disableProviderPing), t.forEach((e2) => {
      if (!this.session) return;
      const i4 = ue3(e2, this.session), r3 = lt3(i4), a3 = J5(this.namespaces, this.optionalNamespaces), n5 = V4(L4({}, a3[e2]), { accounts: i4, chains: r3 });
      switch (e2) {
        case "eip155":
          this.rpcProviders[e2] = new Ie4({ namespace: n5 });
          break;
        case "algorand":
          this.rpcProviders[e2] = new De4({ namespace: n5 });
          break;
        case "solana":
          this.rpcProviders[e2] = new Ae3({ namespace: n5 });
          break;
        case "cosmos":
          this.rpcProviders[e2] = new Ce4({ namespace: n5 });
          break;
        case "polkadot":
          this.rpcProviders[e2] = new ve3({ namespace: n5 });
          break;
        case "cip34":
          this.rpcProviders[e2] = new Re3({ namespace: n5 });
          break;
        case "elrond":
          this.rpcProviders[e2] = new Fe3({ namespace: n5 });
          break;
        case "multiversx":
          this.rpcProviders[e2] = new Me5({ namespace: n5 });
          break;
        case "near":
          this.rpcProviders[e2] = new Je3({ namespace: n5 });
          break;
        case "tezos":
          this.rpcProviders[e2] = new We5({ namespace: n5 });
          break;
        default:
          this.rpcProviders[w5] ? this.rpcProviders[w5].updateNamespace(n5) : this.rpcProviders[w5] = new Xe3({ namespace: n5 });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (t) => {
      var e2;
      const { topic: i4 } = t;
      i4 === ((e2 = this.session) == null ? void 0 : e2.topic) && this.events.emit("session_ping", t);
    }), this.client.on("session_event", (t) => {
      var e2;
      const { params: i4, topic: r3 } = t;
      if (r3 !== ((e2 = this.session) == null ? void 0 : e2.topic)) return;
      const { event: a3 } = i4;
      if (a3.name === "accountsChanged") {
        const n5 = a3.data;
        n5 && $e2(n5) && this.events.emit("accountsChanged", n5.map(le4));
      } else if (a3.name === "chainChanged") {
        const n5 = i4.chainId, c7 = i4.event.data, h5 = pr2(n5), v8 = z5(n5) !== z5(c7) ? `${h5}:${z5(c7)}` : n5;
        this.onChainChanged(v8);
      } else this.events.emit(a3.name, a3.data);
      this.events.emit("session_event", t);
    }), this.client.on("session_update", ({ topic: t, params: e2 }) => {
      var i4, r3;
      if (t !== ((i4 = this.session) == null ? void 0 : i4.topic)) return;
      const { namespaces: a3 } = e2, n5 = (r3 = this.client) == null ? void 0 : r3.session.get(t);
      this.session = V4(L4({}, n5), { namespaces: a3 }), this.onSessionUpdate(), this.events.emit("session_update", { topic: t, params: e2 });
    }), this.client.on("session_delete", async (t) => {
      var e2;
      t.topic === ((e2 = this.session) == null ? void 0 : e2.topic) && (await this.cleanup(), this.events.emit("session_delete", t), this.events.emit("disconnect", V4(L4({}, de2("USER_DISCONNECTED")), { data: t.topic })));
    }), this.on(d5.DEFAULT_CHAIN_CHANGED, (t) => {
      this.onChainChanged(t, true);
    });
  }
  getProvider(t) {
    return this.rpcProviders[t] || this.rpcProviders[w5];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((t) => {
      var e2;
      this.getProvider(t).updateNamespace((e2 = this.session) == null ? void 0 : e2.namespaces[t]);
    });
  }
  setNamespaces(t) {
    const { namespaces: e2, optionalNamespaces: i4, sessionProperties: r3, scopedProperties: a3 } = t;
    e2 && Object.keys(e2).length && (this.namespaces = e2), i4 && Object.keys(i4).length && (this.optionalNamespaces = i4), this.sessionProperties = r3, this.scopedProperties = a3;
  }
  validateChain(t) {
    const [e2, i4] = (t == null ? void 0 : t.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [e2, i4];
    if (e2 && !Object.keys(this.namespaces || {}).map((n5) => pr2(n5)).includes(e2)) throw new Error(`Namespace '${e2}' is not configured. Please call connect() first with namespace config.`);
    if (e2 && i4) return [e2, i4];
    const r3 = pr2(Object.keys(this.namespaces)[0]), a3 = this.rpcProviders[r3].getDefaultChain();
    return [r3, a3];
  }
  async requestAccounts() {
    const [t] = this.validateChain();
    return await this.getProvider(t).requestAccounts();
  }
  async onChainChanged(t, e2 = false) {
    if (!this.namespaces) return;
    const [i4, r3] = this.validateChain(t);
    r3 && (e2 || this.getProvider(i4).setDefaultChain(r3), this.namespaces[i4] ? this.namespaces[i4].defaultChain = r3 : this.namespaces[`${i4}:${r3}`] ? this.namespaces[`${i4}:${r3}`].defaultChain = r3 : this.namespaces[`${i4}:${r3}`] = { defaultChain: r3 }, this.events.emit("chainChanged", r3), await this.persist("namespaces", this.namespaces));
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, await this.cleanupPendingPairings({ deletePairings: true }), await this.cleanupStorage();
  }
  async persist(t, e2) {
    var i4;
    const r3 = ((i4 = this.session) == null ? void 0 : i4.topic) || "";
    await this.client.core.storage.setItem(`${_3}/${t}${r3}`, e2);
  }
  async getFromStore(t) {
    var e2;
    const i4 = ((e2 = this.session) == null ? void 0 : e2.topic) || "";
    return await this.client.core.storage.getItem(`${_3}/${t}${i4}`);
  }
  async deleteFromStore(t) {
    var e2;
    const i4 = ((e2 = this.session) == null ? void 0 : e2.topic) || "";
    await this.client.core.storage.removeItem(`${_3}/${t}${i4}`);
  }
  async cleanupStorage() {
    var t;
    try {
      if (((t = this.client) == null ? void 0 : t.session.length) > 0) return;
      const e2 = await this.client.core.storage.getKeys();
      for (const i4 of e2) i4.startsWith(_3) && await this.client.core.storage.removeItem(i4);
    } catch (e2) {
      this.logger.warn("Failed to cleanup storage", e2);
    }
  }
};
var es = x5;

// node_modules/@walletconnect/ethereum-provider/dist/index.es.js
var T4 = "wc";
var $4 = "ethereum_provider";
var j4 = `${T4}@2:${$4}:`;
var q2 = "https://rpc.walletconnect.org/v1/";
var u3 = ["eth_sendTransaction", "personal_sign"];
var M5 = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode", "wallet_sendCalls", "wallet_getCapabilities", "wallet_getCallsStatus", "wallet_showCallsStatus"];
var m4 = ["chainChanged", "accountsChanged"];
var O7 = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"];
var N13 = Object.defineProperty;
var D3 = Object.defineProperties;
var U3 = Object.getOwnPropertyDescriptors;
var P6 = Object.getOwnPropertySymbols;
var Q4 = Object.prototype.hasOwnProperty;
var L5 = Object.prototype.propertyIsEnumerable;
var y6 = (a3, t, s3) => t in a3 ? N13(a3, t, { enumerable: true, configurable: true, writable: true, value: s3 }) : a3[t] = s3;
var g5 = (a3, t) => {
  for (var s3 in t || (t = {})) Q4.call(t, s3) && y6(a3, s3, t[s3]);
  if (P6) for (var s3 of P6(t)) L5.call(t, s3) && y6(a3, s3, t[s3]);
  return a3;
};
var _4 = (a3, t) => D3(a3, U3(t));
var o6 = (a3, t, s3) => y6(a3, typeof t != "symbol" ? t + "" : t, s3);
function v7(a3) {
  return Number(a3[0].split(":")[1]);
}
function C6(a3) {
  return `0x${a3.toString(16)}`;
}
function x6(a3) {
  const { chains: t, optionalChains: s3, methods: i4, optionalMethods: e2, events: n5, optionalEvents: h5, rpcMap: l7 } = a3;
  if (!$e2(t)) throw new Error("Invalid chains");
  const r3 = { chains: t, methods: i4 || u3, events: n5 || m4, rpcMap: g5({}, t.length ? { [v7(t)]: l7[v7(t)] } : {}) }, d6 = n5 == null ? void 0 : n5.filter((p6) => !m4.includes(p6)), c7 = i4 == null ? void 0 : i4.filter((p6) => !u3.includes(p6));
  if (!s3 && !h5 && !e2 && !(d6 != null && d6.length) && !(c7 != null && c7.length)) return { required: t.length ? r3 : void 0 };
  const I4 = (d6 == null ? void 0 : d6.length) && (c7 == null ? void 0 : c7.length) || !s3, f6 = { chains: [...new Set(I4 ? r3.chains.concat(s3 || []) : s3)], methods: [...new Set(r3.methods.concat(e2 != null && e2.length ? e2 : M5))], events: [...new Set(r3.events.concat(h5 != null && h5.length ? h5 : O7))], rpcMap: l7 };
  return { required: t.length ? r3 : void 0, optional: s3.length ? f6 : void 0 };
}
var w6 = class _w {
  constructor() {
    o6(this, "events", new import_events11.EventEmitter()), o6(this, "namespace", "eip155"), o6(this, "accounts", []), o6(this, "signer"), o6(this, "chainId", 1), o6(this, "modal"), o6(this, "rpc"), o6(this, "STORAGE_KEY", j4), o6(this, "on", (t, s3) => (this.events.on(t, s3), this)), o6(this, "once", (t, s3) => (this.events.once(t, s3), this)), o6(this, "removeListener", (t, s3) => (this.events.removeListener(t, s3), this)), o6(this, "off", (t, s3) => (this.events.off(t, s3), this)), o6(this, "parseAccount", (t) => this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t), this.signer = {}, this.rpc = {};
  }
  static async init(t) {
    const s3 = new _w();
    return await s3.initialize(t), s3;
  }
  async request(t, s3) {
    return await this.signer.request(t, this.formatChainId(this.chainId), s3);
  }
  sendAsync(t, s3, i4) {
    this.signer.sendAsync(t, s3, this.formatChainId(this.chainId), i4);
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : false;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : false;
  }
  async enable() {
    return this.session || await this.connect(), await this.request({ method: "eth_requestAccounts" });
  }
  async connect(t) {
    if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(t);
    const { required: s3, optional: i4 } = x6(this.rpc);
    try {
      const e2 = await new Promise(async (h5, l7) => {
        var r3;
        this.rpc.showQrModal && ((r3 = this.modal) == null || r3.subscribeModal((c7) => {
          !c7.open && !this.signer.session && (this.signer.abortPairingAttempt(), l7(new Error("Connection request reset. Please try again.")));
        }));
        const d6 = t != null && t.scopedProperties ? { [this.namespace]: t.scopedProperties } : void 0;
        await this.signer.connect(_4(g5({ namespaces: g5({}, s3 && { [this.namespace]: s3 }) }, i4 && { optionalNamespaces: { [this.namespace]: i4 } }), { pairingTopic: t == null ? void 0 : t.pairingTopic, scopedProperties: d6 })).then((c7) => {
          h5(c7);
        }).catch((c7) => {
          l7(new Error(c7.message));
        });
      });
      if (!e2) return;
      const n5 = Kr2(e2.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : n5), this.setAccounts(n5), this.events.emit("connect", { chainId: C6(this.chainId) });
    } catch (e2) {
      throw this.signer.logger.error(e2), e2;
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async authenticate(t, s3) {
    if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts({ chains: t == null ? void 0 : t.chains });
    try {
      const i4 = await new Promise(async (n5, h5) => {
        var l7;
        this.rpc.showQrModal && ((l7 = this.modal) == null || l7.subscribeModal((r3) => {
          !r3.open && !this.signer.session && (this.signer.abortPairingAttempt(), h5(new Error("Connection request reset. Please try again.")));
        })), await this.signer.authenticate(_4(g5({}, t), { chains: this.rpc.chains }), s3).then((r3) => {
          n5(r3);
        }).catch((r3) => {
          h5(new Error(r3.message));
        });
      }), e2 = i4.session;
      if (e2) {
        const n5 = Kr2(e2.namespaces, [this.namespace]);
        this.setChainIds(this.rpc.chains.length ? this.rpc.chains : n5), this.setAccounts(n5), this.events.emit("connect", { chainId: C6(this.chainId) });
      }
      return i4;
    } catch (i4) {
      throw this.signer.logger.error(i4), i4;
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async disconnect() {
    this.session && await this.signer.disconnect(), this.reset();
  }
  get isWalletConnect() {
    return true;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (t) => {
      const { params: s3 } = t, { event: i4 } = s3;
      i4.name === "accountsChanged" ? (this.accounts = this.parseAccounts(i4.data), this.events.emit("accountsChanged", this.accounts)) : i4.name === "chainChanged" ? this.setChainId(this.formatChainId(i4.data)) : this.events.emit(i4.name, i4.data), this.events.emit("session_event", t);
    }), this.signer.on("chainChanged", (t) => {
      const s3 = parseInt(t);
      this.chainId = s3, this.events.emit("chainChanged", C6(this.chainId)), this.persist();
    }), this.signer.on("session_update", (t) => {
      this.events.emit("session_update", t);
    }), this.signer.on("session_delete", (t) => {
      this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", _4(g5({}, de2("USER_DISCONNECTED")), { data: t.topic, name: "USER_DISCONNECTED" }));
    }), this.signer.on("display_uri", (t) => {
      var s3, i4;
      this.rpc.showQrModal && ((s3 = this.modal) == null || s3.closeModal(), (i4 = this.modal) == null || i4.openModal({ uri: t })), this.events.emit("display_uri", t);
    });
  }
  switchEthereumChain(t) {
    this.request({ method: "wallet_switchEthereumChain", params: [{ chainId: t.toString(16) }] });
  }
  isCompatibleChainId(t) {
    return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : false;
  }
  formatChainId(t) {
    return `${this.namespace}:${t}`;
  }
  parseChainId(t) {
    return Number(t.split(":")[1]);
  }
  setChainIds(t) {
    const s3 = t.filter((i4) => this.isCompatibleChainId(i4)).map((i4) => this.parseChainId(i4));
    s3.length && (this.chainId = s3[0], this.events.emit("chainChanged", C6(this.chainId)), this.persist());
  }
  setChainId(t) {
    if (this.isCompatibleChainId(t)) {
      const s3 = this.parseChainId(t);
      this.chainId = s3, this.switchEthereumChain(s3);
    }
  }
  parseAccountId(t) {
    const [s3, i4, e2] = t.split(":");
    return { chainId: `${s3}:${i4}`, address: e2 };
  }
  setAccounts(t) {
    this.accounts = t.filter((s3) => this.parseChainId(this.parseAccountId(s3).chainId) === this.chainId).map((s3) => this.parseAccountId(s3).address), this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(t) {
    var s3, i4;
    const e2 = (s3 = t == null ? void 0 : t.chains) != null ? s3 : [], n5 = (i4 = t == null ? void 0 : t.optionalChains) != null ? i4 : [], h5 = e2.concat(n5);
    if (!h5.length) throw new Error("No chains specified in either `chains` or `optionalChains`");
    const l7 = e2.length ? (t == null ? void 0 : t.methods) || u3 : [], r3 = e2.length ? (t == null ? void 0 : t.events) || m4 : [], d6 = (t == null ? void 0 : t.optionalMethods) || [], c7 = (t == null ? void 0 : t.optionalEvents) || [], I4 = (t == null ? void 0 : t.rpcMap) || this.buildRpcMap(h5, t.projectId), f6 = (t == null ? void 0 : t.qrModalOptions) || void 0;
    return { chains: e2 == null ? void 0 : e2.map((p6) => this.formatChainId(p6)), optionalChains: n5.map((p6) => this.formatChainId(p6)), methods: l7, events: r3, optionalMethods: d6, optionalEvents: c7, rpcMap: I4, showQrModal: !!(t != null && t.showQrModal), qrModalOptions: f6, projectId: t.projectId, metadata: t.metadata };
  }
  buildRpcMap(t, s3) {
    const i4 = {};
    return t.forEach((e2) => {
      i4[e2] = this.getRpcUrl(e2, s3);
    }), i4;
  }
  async initialize(t) {
    if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? v7(this.rpc.chains) : v7(this.rpc.optionalChains), this.signer = await es.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: t.disableProviderPing, relayUrl: t.relayUrl, storage: t.storage, storageOptions: t.storageOptions, customStoragePrefix: t.customStoragePrefix, telemetryEnabled: t.telemetryEnabled, logger: t.logger }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
      let s3;
      try {
        const { WalletConnectModal: i4 } = await import("./dist-5HNF5VPF.js");
        s3 = i4;
      } catch {
        throw new Error("To use QR modal, please install @walletconnect/modal package");
      }
      if (s3) try {
        this.modal = new s3(g5({ projectId: this.rpc.projectId }, this.rpc.qrModalOptions));
      } catch (i4) {
        throw this.signer.logger.error(i4), new Error("Could not generate WalletConnectModal Instance");
      }
    }
  }
  loadConnectOpts(t) {
    if (!t) return;
    const { chains: s3, optionalChains: i4, rpcMap: e2 } = t;
    s3 && $e2(s3) && (this.rpc.chains = s3.map((n5) => this.formatChainId(n5)), s3.forEach((n5) => {
      this.rpc.rpcMap[n5] = (e2 == null ? void 0 : e2[n5]) || this.getRpcUrl(n5);
    })), i4 && $e2(i4) && (this.rpc.optionalChains = [], this.rpc.optionalChains = i4 == null ? void 0 : i4.map((n5) => this.formatChainId(n5)), i4.forEach((n5) => {
      this.rpc.rpcMap[n5] = (e2 == null ? void 0 : e2[n5]) || this.getRpcUrl(n5);
    }));
  }
  getRpcUrl(t, s3) {
    var i4;
    return ((i4 = this.rpc.rpcMap) == null ? void 0 : i4[t]) || `${q2}?chainId=eip155:${t}&projectId=${s3 || this.rpc.projectId}`;
  }
  async loadPersistedSession() {
    if (this.session) try {
      const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), s3 = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
      this.setChainIds(t ? [this.formatChainId(t)] : s3 == null ? void 0 : s3.accounts), this.setAccounts(s3 == null ? void 0 : s3.accounts);
    } catch (t) {
      this.signer.logger.error("Failed to load persisted session, clearing state..."), this.signer.logger.error(t), await this.disconnect().catch((s3) => this.signer.logger.warn(s3));
    }
  }
  reset() {
    this.chainId = 1, this.accounts = [];
  }
  persist() {
    this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
  }
  parseAccounts(t) {
    return typeof t == "string" || t instanceof String ? [this.parseAccount(t)] : t.map((s3) => this.parseAccount(s3));
  }
};
var z6 = w6;
export {
  z6 as EthereumProvider,
  O7 as OPTIONAL_EVENTS,
  M5 as OPTIONAL_METHODS,
  m4 as REQUIRED_EVENTS,
  u3 as REQUIRED_METHODS,
  w6 as default
};
/*! Bundled license information:

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@walletconnect/relay-auth/dist/index.es.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@walletconnect/utils/dist/index.es.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=index.es-C6AJHDDN.js.map
