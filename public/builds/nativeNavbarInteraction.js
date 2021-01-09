/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/design-interaction/navbar-interaction/interaction.js":
/*!*********************************************************************!*\
  !*** ./src/js/design-interaction/navbar-interaction/interaction.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("module.exports = function () {\n  var toggleButton = document.getElementsByClassName('toggle-button')[0];\n  var navbarLinks = document.getElementsByClassName('navbar-links')[0];\n\n  if (!isUndefined(toggleButton) && !isUndefined(navbarLinks)) {\n    toggleButton.addEventListener('click', function () {\n      navbarLinks.classList.toggle('active');\n    });\n  }\n};\n\nfunction isUndefined(element) {\n  return typeof element === \"undefined\";\n}\n\n//# sourceURL=webpack://tallao/./src/js/design-interaction/navbar-interaction/interaction.js?");

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
/*!****************************************************************!*\
  !*** ./src/js/design-interaction/navbar-interaction/native.js ***!
  \****************************************************************/
eval("var navbarEventListener = __webpack_require__(/*! ./interaction */ \"./src/js/design-interaction/navbar-interaction/interaction.js\");\n\nwindow.onload = function () {\n  navbarEventListener();\n};\n\n//# sourceURL=webpack://tallao/./src/js/design-interaction/navbar-interaction/native.js?");
})();

/******/ })()
;