/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./meta/DEFAULT_LANGUAGE.js":
/*!**********************************!*\
  !*** ./meta/DEFAULT_LANGUAGE.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const LANGUAGES = __webpack_require__(/*! ../meta/LANGUAGES */ \"./meta/LANGUAGES.js\");\r\n\r\n//get the first language on the array\r\n\r\nmodule.exports = LANGUAGES[0];\n\n//# sourceURL=webpack://tallao/./meta/DEFAULT_LANGUAGE.js?");

/***/ }),

/***/ "./meta/LANGUAGES.js":
/*!***************************!*\
  !*** ./meta/LANGUAGES.js ***!
  \***************************/
/***/ ((module) => {

eval("const LANGUAGES = [\r\n    \"es\", //default\r\n    \"cn\"\r\n];\r\n\r\nmodule.exports = LANGUAGES;\n\n//# sourceURL=webpack://tallao/./meta/LANGUAGES.js?");

/***/ }),

/***/ "./meta/LANGUAGE_COOKIE_NAME.js":
/*!**************************************!*\
  !*** ./meta/LANGUAGE_COOKIE_NAME.js ***!
  \**************************************/
/***/ ((module) => {

eval("module.exports = \"SELECTED_LANGUAGE\";\n\n//# sourceURL=webpack://tallao/./meta/LANGUAGE_COOKIE_NAME.js?");

/***/ }),

/***/ "./src/js/design-interaction/navbar-interaction/interaction.js":
/*!*********************************************************************!*\
  !*** ./src/js/design-interaction/navbar-interaction/interaction.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("module.exports = function () {\n  var toggleButton = document.getElementsByClassName('toggle-button')[0];\n  var navbarLinks = document.getElementsByClassName('navbar-links')[0];\n\n  if (!isUndefined(toggleButton) && !isUndefined(navbarLinks)) {\n    toggleButton.addEventListener('click', function () {\n      navbarLinks.classList.toggle('active');\n    });\n  }\n};\n\nfunction isUndefined(element) {\n  return typeof element === \"undefined\";\n}\n\n//# sourceURL=webpack://tallao/./src/js/design-interaction/navbar-interaction/interaction.js?");

/***/ }),

/***/ "./node_modules/js-cookie/src/js.cookie.js":
/*!*************************************************!*\
  !*** ./node_modules/js-cookie/src/js.cookie.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!\n * JavaScript Cookie v2.2.1\n * https://github.com/js-cookie/js-cookie\n *\n * Copyright 2006, 2015 Klaus Hartl & Fagner Brack\n * Released under the MIT license\n */\n;(function (factory) {\n\tvar registeredInModuleLoader;\n\tif (true) {\n\t\t!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t\tregisteredInModuleLoader = true;\n\t}\n\tif (true) {\n\t\tmodule.exports = factory();\n\t\tregisteredInModuleLoader = true;\n\t}\n\tif (!registeredInModuleLoader) {\n\t\tvar OldCookies = window.Cookies;\n\t\tvar api = window.Cookies = factory();\n\t\tapi.noConflict = function () {\n\t\t\twindow.Cookies = OldCookies;\n\t\t\treturn api;\n\t\t};\n\t}\n}(function () {\n\tfunction extend () {\n\t\tvar i = 0;\n\t\tvar result = {};\n\t\tfor (; i < arguments.length; i++) {\n\t\t\tvar attributes = arguments[ i ];\n\t\t\tfor (var key in attributes) {\n\t\t\t\tresult[key] = attributes[key];\n\t\t\t}\n\t\t}\n\t\treturn result;\n\t}\n\n\tfunction decode (s) {\n\t\treturn s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);\n\t}\n\n\tfunction init (converter) {\n\t\tfunction api() {}\n\n\t\tfunction set (key, value, attributes) {\n\t\t\tif (typeof document === 'undefined') {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tattributes = extend({\n\t\t\t\tpath: '/'\n\t\t\t}, api.defaults, attributes);\n\n\t\t\tif (typeof attributes.expires === 'number') {\n\t\t\t\tattributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);\n\t\t\t}\n\n\t\t\t// We're using \"expires\" because \"max-age\" is not supported by IE\n\t\t\tattributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';\n\n\t\t\ttry {\n\t\t\t\tvar result = JSON.stringify(value);\n\t\t\t\tif (/^[\\{\\[]/.test(result)) {\n\t\t\t\t\tvalue = result;\n\t\t\t\t}\n\t\t\t} catch (e) {}\n\n\t\t\tvalue = converter.write ?\n\t\t\t\tconverter.write(value, key) :\n\t\t\t\tencodeURIComponent(String(value))\n\t\t\t\t\t.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);\n\n\t\t\tkey = encodeURIComponent(String(key))\n\t\t\t\t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)\n\t\t\t\t.replace(/[\\(\\)]/g, escape);\n\n\t\t\tvar stringifiedAttributes = '';\n\t\t\tfor (var attributeName in attributes) {\n\t\t\t\tif (!attributes[attributeName]) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t\tstringifiedAttributes += '; ' + attributeName;\n\t\t\t\tif (attributes[attributeName] === true) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\t// Considers RFC 6265 section 5.2:\n\t\t\t\t// ...\n\t\t\t\t// 3.  If the remaining unparsed-attributes contains a %x3B (\";\")\n\t\t\t\t//     character:\n\t\t\t\t// Consume the characters of the unparsed-attributes up to,\n\t\t\t\t// not including, the first %x3B (\";\") character.\n\t\t\t\t// ...\n\t\t\t\tstringifiedAttributes += '=' + attributes[attributeName].split(';')[0];\n\t\t\t}\n\n\t\t\treturn (document.cookie = key + '=' + value + stringifiedAttributes);\n\t\t}\n\n\t\tfunction get (key, json) {\n\t\t\tif (typeof document === 'undefined') {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar jar = {};\n\t\t\t// To prevent the for loop in the first place assign an empty array\n\t\t\t// in case there are no cookies at all.\n\t\t\tvar cookies = document.cookie ? document.cookie.split('; ') : [];\n\t\t\tvar i = 0;\n\n\t\t\tfor (; i < cookies.length; i++) {\n\t\t\t\tvar parts = cookies[i].split('=');\n\t\t\t\tvar cookie = parts.slice(1).join('=');\n\n\t\t\t\tif (!json && cookie.charAt(0) === '\"') {\n\t\t\t\t\tcookie = cookie.slice(1, -1);\n\t\t\t\t}\n\n\t\t\t\ttry {\n\t\t\t\t\tvar name = decode(parts[0]);\n\t\t\t\t\tcookie = (converter.read || converter)(cookie, name) ||\n\t\t\t\t\t\tdecode(cookie);\n\n\t\t\t\t\tif (json) {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tcookie = JSON.parse(cookie);\n\t\t\t\t\t\t} catch (e) {}\n\t\t\t\t\t}\n\n\t\t\t\t\tjar[name] = cookie;\n\n\t\t\t\t\tif (key === name) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t} catch (e) {}\n\t\t\t}\n\n\t\t\treturn key ? jar[key] : jar;\n\t\t}\n\n\t\tapi.set = set;\n\t\tapi.get = function (key) {\n\t\t\treturn get(key, false /* read as raw */);\n\t\t};\n\t\tapi.getJSON = function (key) {\n\t\t\treturn get(key, true /* read as json */);\n\t\t};\n\t\tapi.remove = function (key, attributes) {\n\t\t\tset(key, '', extend(attributes, {\n\t\t\t\texpires: -1\n\t\t\t}));\n\t\t};\n\n\t\tapi.defaults = {};\n\n\t\tapi.withConverter = init;\n\n\t\treturn api;\n\t}\n\n\treturn init(function () {});\n}));\n\n\n//# sourceURL=webpack://tallao/./node_modules/js-cookie/src/js.cookie.js?");

/***/ }),

/***/ "./node_modules/validator/lib/isIn.js":
/*!********************************************!*\
  !*** ./node_modules/validator/lib/isIn.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = isIn;\n\nvar _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ \"./node_modules/validator/lib/util/assertString.js\"));\n\nvar _toString = _interopRequireDefault(__webpack_require__(/*! ./util/toString */ \"./node_modules/validator/lib/util/toString.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction isIn(str, options) {\n  (0, _assertString.default)(str);\n  var i;\n\n  if (Object.prototype.toString.call(options) === '[object Array]') {\n    var array = [];\n\n    for (i in options) {\n      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes\n      // istanbul ignore else\n      if ({}.hasOwnProperty.call(options, i)) {\n        array[i] = (0, _toString.default)(options[i]);\n      }\n    }\n\n    return array.indexOf(str) >= 0;\n  } else if (_typeof(options) === 'object') {\n    return options.hasOwnProperty(str);\n  } else if (options && typeof options.indexOf === 'function') {\n    return options.indexOf(str) >= 0;\n  }\n\n  return false;\n}\n\nmodule.exports = exports.default;\nmodule.exports.default = exports.default;\n\n//# sourceURL=webpack://tallao/./node_modules/validator/lib/isIn.js?");

/***/ }),

/***/ "./node_modules/validator/lib/util/assertString.js":
/*!*********************************************************!*\
  !*** ./node_modules/validator/lib/util/assertString.js ***!
  \*********************************************************/
/***/ ((module, exports) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = assertString;\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction assertString(input) {\n  var isString = typeof input === 'string' || input instanceof String;\n\n  if (!isString) {\n    var invalidType = _typeof(input);\n\n    if (input === null) invalidType = 'null';else if (invalidType === 'object') invalidType = input.constructor.name;\n    throw new TypeError(\"Expected a string but received a \".concat(invalidType));\n  }\n}\n\nmodule.exports = exports.default;\nmodule.exports.default = exports.default;\n\n//# sourceURL=webpack://tallao/./node_modules/validator/lib/util/assertString.js?");

/***/ }),

/***/ "./node_modules/validator/lib/util/toString.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/util/toString.js ***!
  \*****************************************************/
/***/ ((module, exports) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = toString;\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction toString(input) {\n  if (_typeof(input) === 'object' && input !== null) {\n    if (typeof input.toString === 'function') {\n      input = input.toString();\n    } else {\n      input = '[object Object]';\n    }\n  } else if (input === null || typeof input === 'undefined' || isNaN(input) && !input.length) {\n    input = '';\n  }\n\n  return String(input);\n}\n\nmodule.exports = exports.default;\nmodule.exports.default = exports.default;\n\n//# sourceURL=webpack://tallao/./node_modules/validator/lib/util/toString.js?");

/***/ }),

/***/ "./translation/frontend/language-config.js":
/*!*************************************************!*\
  !*** ./translation/frontend/language-config.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const isIn = __webpack_require__(/*! validator/lib/isIn */ \"./node_modules/validator/lib/isIn.js\");\r\nconst Cookies = __webpack_require__(/*! js-cookie */ \"./node_modules/js-cookie/src/js.cookie.js\");\r\n\r\nconst LANGUAGES = __webpack_require__(/*! ../../meta/LANGUAGES */ \"./meta/LANGUAGES.js\");\r\nconst LANGUAGE_COOKIE_NAME = __webpack_require__(/*! ../../meta/LANGUAGE_COOKIE_NAME */ \"./meta/LANGUAGE_COOKIE_NAME.js\");\r\nconst DEFAULT_LANGUAGE = __webpack_require__(/*! ../../meta/DEFAULT_LANGUAGE */ \"./meta/DEFAULT_LANGUAGE.js\");\r\n\r\n\r\nfunction getLanguage(){\r\n    const selectedLanguage = Cookies.get(LANGUAGE_COOKIE_NAME);\r\n\r\n    if(!isLanguageSelected() && !isLanguageAvailable(selectedLanguage)) setDefaultLanguage();\r\n    return Cookies.get(LANGUAGE_COOKIE_NAME);\r\n}\r\n\r\nfunction setLanguage(language){\r\n    if(isLanguageAvailable(language)){\r\n        Cookies.set(LANGUAGE_COOKIE_NAME, language);\r\n    }else{\r\n        setDefaultLanguage();\r\n    }\r\n}\r\n\r\nfunction isLanguageAvailable(language){\r\n    return isIn(language, LANGUAGES);\r\n}\r\n\r\nfunction isLanguageSelected(){\r\n    return typeof Cookies.get(LANGUAGE_COOKIE_NAME) === \"undefined\";\r\n}\r\n\r\nfunction setDefaultLanguage(){\r\n    Cookies.set(LANGUAGE_COOKIE_NAME, DEFAULT_LANGUAGE);\r\n}\r\n\r\n\r\n\r\nmodule.exports = {\r\n    getLanguage: getLanguage,\r\n    setLanguage: setLanguage\r\n};\n\n//# sourceURL=webpack://tallao/./translation/frontend/language-config.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
eval("var navbarEventListener = __webpack_require__(/*! ./design-interaction/navbar-interaction/interaction */ \"./src/js/design-interaction/navbar-interaction/interaction.js\");\n\nvar _require = __webpack_require__(/*! ../../translation/frontend/language-config */ \"./translation/frontend/language-config.js\"),\n    getLanguage = _require.getLanguage,\n    setLanguage = _require.setLanguage;\n\nwindow.onload = function () {\n  var languageSelector = document.getElementById(\"language-selector\");\n  languageSelector.value = getLanguage();\n  languageSelector.addEventListener(\"change\", function (e) {\n    var newLanguage = e.target.value;\n    setLanguage(newLanguage);\n    location.reload();\n  });\n  navbarEventListener();\n};\n\n//# sourceURL=webpack://tallao/./src/js/index.js?");
})();

/******/ })()
;