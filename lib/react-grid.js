(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"), require("react-bootstrap"), require("react-intl"), require("immutable"), require("classnames"), require("fixed-data-table-2"), require("react-dom"), require("@opuscapita/react-icons"), require("moment"), require("react-immutable-proptypes"), require("base64-js"), require("fixed-data-table-2/dist/fixed-data-table.css"), require("ieee754"), require("isarray"), require("lodash/debounce"), require("lodash/isEqual"), require("lodash/isNaN"), require("react-day-picker"), require("react-day-picker/lib/style.css"), require("react-day-picker/moment"), require("react-redux"), require("react-select"), require("react-spinjs"), require("react-tether"), require("tether"));
	else if(typeof define === 'function' && define.amd)
		define("react-grid", ["react", "prop-types", "react-bootstrap", "react-intl", "immutable", "classnames", "fixed-data-table-2", "react-dom", "@opuscapita/react-icons", "moment", "react-immutable-proptypes", "base64-js", "fixed-data-table-2/dist/fixed-data-table.css", "ieee754", "isarray", "lodash/debounce", "lodash/isEqual", "lodash/isNaN", "react-day-picker", "react-day-picker/lib/style.css", "react-day-picker/moment", "react-redux", "react-select", "react-spinjs", "react-tether", "tether"], factory);
	else if(typeof exports === 'object')
		exports["react-grid"] = factory(require("react"), require("prop-types"), require("react-bootstrap"), require("react-intl"), require("immutable"), require("classnames"), require("fixed-data-table-2"), require("react-dom"), require("@opuscapita/react-icons"), require("moment"), require("react-immutable-proptypes"), require("base64-js"), require("fixed-data-table-2/dist/fixed-data-table.css"), require("ieee754"), require("isarray"), require("lodash/debounce"), require("lodash/isEqual"), require("lodash/isNaN"), require("react-day-picker"), require("react-day-picker/lib/style.css"), require("react-day-picker/moment"), require("react-redux"), require("react-select"), require("react-spinjs"), require("react-tether"), require("tether"));
	else
		root["react-grid"] = factory(root["react"], root["prop-types"], root["react-bootstrap"], root["react-intl"], root["immutable"], root["classnames"], root["fixed-data-table-2"], root["react-dom"], root["@opuscapita/react-icons"], root["moment"], root["react-immutable-proptypes"], root["base64-js"], root["fixed-data-table-2/dist/fixed-data-table.css"], root["ieee754"], root["isarray"], root["lodash/debounce"], root["lodash/isEqual"], root["lodash/isNaN"], root["react-day-picker"], root["react-day-picker/lib/style.css"], root["react-day-picker/moment"], root["react-redux"], root["react-select"], root["react-spinjs"], root["react-tether"], root["tether"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_52__, __WEBPACK_EXTERNAL_MODULE_53__, __WEBPACK_EXTERNAL_MODULE_54__, __WEBPACK_EXTERNAL_MODULE_55__, __WEBPACK_EXTERNAL_MODULE_56__, __WEBPACK_EXTERNAL_MODULE_57__, __WEBPACK_EXTERNAL_MODULE_58__, __WEBPACK_EXTERNAL_MODULE_59__, __WEBPACK_EXTERNAL_MODULE_60__, __WEBPACK_EXTERNAL_MODULE_61__, __WEBPACK_EXTERNAL_MODULE_62__, __WEBPACK_EXTERNAL_MODULE_63__, __WEBPACK_EXTERNAL_MODULE_64__, __WEBPACK_EXTERNAL_MODULE_65__, __WEBPACK_EXTERNAL_MODULE_66__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36).Buffer))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalidate", function() { return invalidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setData", function() { return setData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBusy", function() { return setBusy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReady", function() { return setReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sort", function() { return sort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resizeColumn", function() { return resizeColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "edit", function() { return edit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancel", function() { return cancel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save", function() { return save; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveSuccess", function() { return saveSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "savePartialSuccess", function() { return savePartialSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveFail", function() { return saveFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNewItem", function() { return addNewItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNewItem", function() { return removeNewItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSuccess", function() { return removeSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFail", function() { return removeFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editCellValueChange", function() { return editCellValueChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editCellValueValidate", function() { return editCellValueValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCellValueChange", function() { return createCellValueChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCellValueValidate", function() { return createCellValueValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cellShowMessage", function() { return cellShowMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cellHideMessage", function() { return cellHideMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCellShowMessage", function() { return createCellShowMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCellHideMessage", function() { return createCellHideMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "itemSelectionChange", function() { return itemSelectionChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAllItemsChange", function() { return selectAllItemsChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSelectedItems", function() { return clearSelectedItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleFiltering", function() { return toggleFiltering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterCellValueChange", function() { return filterCellValueChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEditedRows", function() { return validateEditedRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateCreatedRows", function() { return validateCreatedRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateExistingCellValue", function() { return updateExistingCellValue; });
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * DataGrid Actions.
 * @class Actions
 * @memberof Platform.Components.DataGrid
 */


var TYPES = {
  PLATFORM_DATAGRID_INVALIDATE: 'PLATFORM_DATAGRID_INVALIDATE',
  PLATFORM_DATAGRID_BUSY: 'PLATFORM_DATAGRID_BUSY',
  PLATFORM_DATAGRID_READY: 'PLATFORM_DATAGRID_READY',
  PLATFORM_DATAGRID_SET_DATA: 'PLATFORM_DATAGRID_SET_DATA',
  PLATFORM_DATAGRID_SORT_COLUMN: 'PLATFORM_DATAGRID_SORT_COLUMN',
  PLATFORM_DATAGRID_RESIZE_COLUMN: 'PLATFORM_DATAGRID_RESIZE_COLUMN',
  PLATFORM_DATAGRID_EDIT: 'PLATFORM_DATAGRID_EDIT',
  PLATFORM_DATAGRID_CANCEL: 'PLATFORM_DATAGRID_CANCEL',
  PLATFORM_DATAGRID_SAVE: 'PLATFORM_DATAGRID_SAVE',
  PLATFORM_DATAGRID_SAVE_SUCCESS: 'PLATFORM_DATAGRID_SAVE_SUCCESS',
  PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS: 'PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS',
  PLATFORM_DATAGRID_SAVE_FAIL: 'PLATFORM_DATAGRID_SAVE_FAIL',
  PLATFORM_DATAGRID_CREATE: 'PLATFORM_DATAGRID_CREATE',
  PLATFORM_DATAGRID_ADD_NEW_ITEM: 'PLATFORM_DATAGRID_ADD_NEW_ITEM',
  PLATFORM_DATAGRID_REMOVE_NEW_ITEM: 'PLATFORM_DATAGRID_REMOVE_NEW_ITEM',
  PLATFORM_DATAGRID_REMOVE: 'PLATFORM_DATAGRID_REMOVE',
  PLATFORM_DATAGRID_REMOVE_SUCCESS: 'PLATFORM_DATAGRID_REMOVE_SUCCESS',
  PLATFORM_DATAGRID_REMOVE_FAIL: 'PLATFORM_DATAGRID_REMOVE_FAIL',
  PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE: 'PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE',
  PLATFORM_DATAGRID_CELL_SHOW_MESSAGE: 'PLATFORM_DATAGRID_CELL_SHOW_MESSAGE',
  PLATFORM_DATAGRID_CELL_HIDE_MESSAGE: 'PLATFORM_DATAGRID_CELL_HIDE_MESSAGE',
  PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE: 'PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE',
  PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE: 'PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE',
  PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE: 'PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE',
  PLATFORM_DATAGRID_CREATE_CELL_VALUE_VALIDATE: 'PLATFORM_DATAGRID_CREATE_CELL_VALUE_VALIDATE',
  PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE: 'PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE',
  PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE: 'PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE',
  PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS: 'PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS',
  PLATFORM_DATAGRID_TOGGLE_FILTERING: 'PLATFORM_DATAGRID_TOGGLE_FILTERING',
  PLATFORM_DATAGRID_FILTER_CELL_VALUE_CHANGE: 'PLATFORM_DATAGRID_FILTER_CELL_VALUE_CHANGE',
  PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE: 'PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE'
};

var invalidate = function invalidate(id) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_INVALIDATE,
      id: id
    });
  };
};

/**
 * Set data to be shown at data grid.
 * @memberof Platform.Components.DataGrid.Actions
 * @param {String} id - The data grid identifier.
 * @param {Immutable.List} data - The data for the data grid.
 */
var setData = function setData(id, data) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_SET_DATA,
      id: id,
      data: data
    });
  };
};

/**
 * Set grid as busy, eg. show spinner
 * @memberof Platform.Components.DataGrid.Actions
 * @param {String} id - The data grid identifier.
 */
var setBusy = function setBusy(id) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_BUSY,
      id: id
    });
  };
};

/**
 * Set grid as ready, eg. hide spinner
 * @memberof Platform.Components.DataGrid.Actions
 * @param {String} id - The data grid identifier.
 */
var setReady = function setReady(id) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_READY,
      id: id
    });
  };
};

var sort = function sort(id, column, valueGetter, comparator) {
  return function (dispatch, getState) {
    setBusy(id)(dispatch);
    var origAllData = getState().datagrid.getIn([id, 'allData']);
    var data = void 0;
    var order = 'asc';
    if (getState().datagrid.getIn([id, 'user', 'sortColumn']) === column && getState().datagrid.getIn([id, 'user', 'sortOrder']) === 'asc') {
      order = 'desc';
    }
    var allData = origAllData.sort(function (a, b) {
      if (order === 'asc') {
        return comparator(valueGetter(a), valueGetter(b));
      }
      return comparator(valueGetter(b), valueGetter(a));
    });
    // Sort also filtered data separately
    if (getState().datagrid.getIn([id, 'session', 'isFiltering'], false)) {
      data = getState().datagrid.getIn([id, 'data']).sort(function (a, b) {
        if (order === 'asc') {
          return comparator(valueGetter(a), valueGetter(b));
        }
        return comparator(valueGetter(b), valueGetter(a));
      });
    } else {
      data = allData;
    }
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SORT_COLUMN,
      id: id,
      column: column,
      order: order,
      data: data,
      allData: allData
    });
    setReady(id)(dispatch);
  };
};

var resizeColumn = function resizeColumn(id, column, width) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_RESIZE_COLUMN,
      id: id,
      column: column,
      width: width
    });
  };
};

var edit = function edit(id) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT,
      id: id
    });
  };
};

var cancel = function cancel(id) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_CANCEL,
      id: id
    });
  };
};

var save = function save(id) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return function (dispatch) {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE,
      id: id
    });
    cb();
  };
};

var saveSuccess = function saveSuccess(id, idKeyPath, savedItems) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_SUCCESS,
      id: id,
      idKeyPath: idKeyPath,
      savedItems: savedItems
    });
  };
};

var savePartialSuccess = function savePartialSuccess(id, idKeyPath, savedItems) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS,
      id: id,
      idKeyPath: idKeyPath,
      savedItems: savedItems
    });
  };
};

var saveFail = function saveFail(id) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_SAVE_FAIL,
      id: id
    });
  };
};

var create = function create(id, columnDefaultValues) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE,
      id: id,
      columnDefaultValues: columnDefaultValues
    });
  };
};

var addNewItem = function addNewItem(id, columnDefaultValues) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_ADD_NEW_ITEM,
      id: id,
      columnDefaultValues: columnDefaultValues
    });
  };
};

var removeNewItem = function removeNewItem(id, index) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_NEW_ITEM,
      id: id,
      index: index
    });
  };
};

var remove = function remove(id) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return function (dispatch) {
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE,
      id: id
    });
    cb();
  };
};

var removeSuccess = function removeSuccess(id, idKeyPath, removedIds) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_SUCCESS,
      id: id,
      idKeyPath: idKeyPath,
      removedIds: removedIds
    });
  };
};

var removeFail = function removeFail(id) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_REMOVE_FAIL,
      id: id
    });
  };
};

var editCellValueChange = function editCellValueChange(id, dataId, keyPath, value) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE,
      id: id,
      dataId: dataId,
      keyPath: keyPath,
      value: value
    });
  };
};

var editCellValueValidate = function editCellValueValidate(id, dataId, keyPath, value) {
  var validators = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var idKeyPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  return function (dispatch, getState) {
    var validationState = { valid: true };
    validators.forEach(function (validator) {
      if (validationState.valid) {
        if (validator.unique) {
          if (value !== '' || value !== null || value !== undefined) {
            // combine real data with current unsaved edited data
            var gridData = getState().datagrid.get(id);
            var editData = gridData.get('editData');
            var allData = gridData.get('allData');
            if (editData) {
              editData.forEach(function (editDataItem, editDataItemId) {
                var foundIndex = allData.findIndex(function (d) {
                  return d.getIn(idKeyPath) === editDataItemId;
                });
                if (foundIndex !== -1) {
                  allData = allData.mergeDeepIn([foundIndex], editDataItem);
                }
              });
            }
            // determine uniqueness
            var finding = allData.find(function (item) {
              if (idKeyPath.length) {
                // don't self compare
                if (item.getIn(idKeyPath) === dataId) {
                  return false;
                }
              }
              return item.getIn(keyPath) === value;
            });
            if (finding) {
              validationState = {
                valid: false,
                message: 'ValidationUnique'
              };
            }
          }
        } else if (validator.validateWithRowData) {
          var _gridData = getState().datagrid.get(id);
          var _editData = _gridData.getIn(['editData', dataId], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"])());
          var rowData = _gridData.get('allData').find(function (item) {
            return item.getIn(idKeyPath) === dataId;
          });
          if (rowData) {
            rowData = rowData.mergeDeep(_editData);
            validationState = validator.validateWithRowData(value, rowData);
          }
        } else {
          var params = validator.params ? Object.values(validator.params) : [];
          validationState = validator.validate.apply(validator, [value].concat(_toConsumableArray(params)));
          if (validator.params) {
            validationState.messageValues = validator.params;
          }
        }
      }
    });
    if (validationState.valid) {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
        id: id,
        messageType: 'error',
        dataId: dataId,
        keyPath: keyPath
      });
    } else {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
        id: id,
        messageType: 'error',
        dataId: dataId,
        keyPath: keyPath,
        messageId: validationState.message,
        messageValues: validationState.messageValues
      });
    }
    return validationState.valid;
  };
};

var createCellValueChange = function createCellValueChange(id, rowIndex, keyPath, value) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE,
      id: id,
      rowIndex: rowIndex,
      keyPath: keyPath,
      value: value
    });
  };
};

var createCellValueValidate = function createCellValueValidate(id, rowIndex, keyPath, value) {
  var validators = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  return function (dispatch, getState) {
    var validationState = { valid: true };
    validators.forEach(function (validator) {
      if (validationState.valid) {
        if (validator.unique) {
          if (value !== '' || value !== null || value !== undefined) {
            var finding = getState().datagrid.getIn([id, 'allData']).find(function (item) {
              return item.getIn(keyPath) === value;
            });
            if (finding) {
              validationState = {
                valid: false,
                message: 'ValidationUnique'
              };
            } else {
              var find2 = getState().datagrid.getIn([id, 'createData']).find(function (item, i) {
                return i !== rowIndex && item.getIn(keyPath) === value;
              });
              if (find2) {
                validationState = {
                  valid: false,
                  message: 'ValidationUnique'
                };
              }
            }
          }
        } else if (validator.validateWithRowData) {
          var rowData = getState().datagrid.getIn([id, 'createData', rowIndex]);
          validationState = validator.validateWithRowData(value, rowData);
        } else {
          var params = validator.params ? Object.values(validator.params) : [];
          validationState = validator.validate.apply(validator, [value].concat(_toConsumableArray(params)));
          if (validator.params) {
            validationState.messageValues = validator.params;
          }
        }
      }
    });
    if (validationState.valid) {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
        id: id,
        messageType: 'error',
        rowIndex: rowIndex,
        keyPath: keyPath
      });
    } else {
      dispatch({
        type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
        id: id,
        messageType: 'error',
        rowIndex: rowIndex,
        keyPath: keyPath,
        messageId: validationState.message,
        messageValues: validationState.messageValues
      });
    }
    return validationState.valid;
  };
};

var cellShowMessage = function cellShowMessage(id, messageType, dataId, keyPath, messageId, messageValues) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_SHOW_MESSAGE,
      id: id,
      messageType: messageType,
      dataId: dataId,
      keyPath: keyPath,
      messageId: messageId,
      messageValues: messageValues
    });
  };
};

var cellHideMessage = function cellHideMessage(id) {
  var messageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var dataId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var keyPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_CELL_HIDE_MESSAGE,
      id: id,
      messageType: messageType,
      dataId: dataId,
      keyPath: keyPath
    });
  };
};

var createCellShowMessage = function createCellShowMessage(id, messageType, rowIndex, keyPath, messageId, messageValues) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE,
      id: id,
      messageType: messageType,
      rowIndex: rowIndex,
      keyPath: keyPath,
      messageId: messageId,
      messageValues: messageValues
    });
  };
};

var createCellHideMessage = function createCellHideMessage(id) {
  var messageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var rowIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var keyPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE,
      id: id,
      messageType: messageType,
      rowIndex: rowIndex,
      keyPath: keyPath
    });
  };
};

var itemSelectionChange = function itemSelectionChange(id, rowIndex, idKeyPath) {
  var ctrlPressed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var shiftPressed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE,
      id: id,
      rowIndex: rowIndex,
      idKeyPath: idKeyPath,
      ctrlPressed: ctrlPressed,
      shiftPressed: shiftPressed
    });
  };
};

var selectAllItemsChange = function selectAllItemsChange(id, idKeyPath) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE,
      id: id,
      idKeyPath: idKeyPath
    });
  };
};

var clearSelectedItems = function clearSelectedItems(id) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS,
      id: id
    });
  };
};

var toggleFiltering = function toggleFiltering(id) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_TOGGLE_FILTERING,
      id: id
    });
  };
};

var filterCellValueChange = function filterCellValueChange(id, keyPath, value, columnFilterFunctions) {
  return function (dispatch, getState) {
    setBusy(id)(dispatch);
    var state = getState();
    var allData = state.datagrid.getIn([id, 'allData']);
    var origFilterData = state.datagrid.getIn([id, 'filterData'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"])());
    var filterData = void 0;
    if (columnFilterFunctions[keyPath.join('/')] && columnFilterFunctions[keyPath.join('/')].valueEmptyChecker(value)) {
      filterData = origFilterData.delete(keyPath.join('/'));
    } else {
      filterData = origFilterData.set(keyPath.join('/'), value);
    }
    var data = void 0;
    if (filterData.isEmpty()) {
      data = allData;
    } else {
      data = allData.filter(function (row) {
        var hits = 0;
        filterData.forEach(function (filterValue, filterKey) {
          var rowData = row.getIn(filterKey.split('/'));
          if (rowData || rowData === 0 || rowData === false) {
            if (columnFilterFunctions[filterKey] && columnFilterFunctions[filterKey].filterMatcher(rowData, filterValue)) {
              hits += 1;
            }
          }
        });
        return hits === filterData.size;
      });
    }
    dispatch({
      type: TYPES.PLATFORM_DATAGRID_FILTER_CELL_VALUE_CHANGE,
      id: id,
      filterData: filterData,
      data: data
    });
    setReady(id)(dispatch);
  };
};

var validateEditedRows = function validateEditedRows(id, idKeyPath, columns) {
  return function (dispatch, getState) {
    var gridData = getState().datagrid.get(id);
    var editData = gridData.get('editData', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"])());
    var allGood = true;
    editData.forEach(function (editDataRow, dataId) {
      columns.forEach(function (col) {
        var value = editDataRow.getIn(col.valueKeyPath);
        if (value === undefined) {
          value = gridData.get('allData').find(function (data) {
            return data.getIn(idKeyPath) === dataId;
          }).getIn(col.valueKeyPath);
        }
        var isValid = editCellValueValidate(id, dataId, col.valueKeyPath, value, col.validators, idKeyPath)(dispatch, getState);
        if (allGood && !isValid) {
          allGood = false;
        }
      });
    });
    return allGood;
  };
};

var validateCreatedRows = function validateCreatedRows(id, columns) {
  return function (dispatch, getState) {
    var createData = getState().datagrid.getIn([id, 'createData'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"])());
    var allGood = true;
    createData.forEach(function (createDataRow, rowIndex) {
      columns.forEach(function (col) {
        var value = createDataRow.getIn(col.valueKeyPath);
        var isValid = createCellValueValidate(id, rowIndex, col.valueKeyPath, value, col.validators)(dispatch, getState);
        if (allGood && !isValid) {
          allGood = false;
        }
      });
    });
    return allGood;
  };
};

var updateExistingCellValue = function updateExistingCellValue(id, dataId, keyPath, value) {
  return function (dispatch) {
    return dispatch({
      type: TYPES.PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE,
      id: id,
      dataId: dataId,
      keyPath: keyPath,
      value: value
    });
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TYPES, 'TYPES', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(invalidate, 'invalidate', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(setData, 'setData', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(setBusy, 'setBusy', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(setReady, 'setReady', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(sort, 'sort', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(resizeColumn, 'resizeColumn', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(edit, 'edit', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(cancel, 'cancel', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(save, 'save', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(saveSuccess, 'saveSuccess', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(savePartialSuccess, 'savePartialSuccess', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(saveFail, 'saveFail', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(create, 'create', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(addNewItem, 'addNewItem', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(removeNewItem, 'removeNewItem', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(remove, 'remove', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(removeSuccess, 'removeSuccess', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(removeFail, 'removeFail', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(editCellValueChange, 'editCellValueChange', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(editCellValueValidate, 'editCellValueValidate', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(createCellValueChange, 'createCellValueChange', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(createCellValueValidate, 'createCellValueValidate', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(cellShowMessage, 'cellShowMessage', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(cellHideMessage, 'cellHideMessage', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(createCellShowMessage, 'createCellShowMessage', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(createCellHideMessage, 'createCellHideMessage', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(itemSelectionChange, 'itemSelectionChange', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(selectAllItemsChange, 'selectAllItemsChange', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(clearSelectedItems, 'clearSelectedItems', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(toggleFiltering, 'toggleFiltering', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(filterCellValueChange, 'filterCellValueChange', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(validateEditedRows, 'validateEditedRows', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(validateCreatedRows, 'validateCreatedRows', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');

  __REACT_HOT_LOADER__.register(updateExistingCellValue, 'updateExistingCellValue', '/home/ilkka/data/react-grid/src/datagrid/datagrid.actions.js');
}();

;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("fixed-data-table-2");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatagridTooltip; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/forbid-prop-types */






var DatagridTooltip = (_temp = _class = function (_React$Component) {
  _inherits(DatagridTooltip, _React$Component);

  function DatagridTooltip() {
    _classCallCheck(this, DatagridTooltip);

    return _possibleConstructorReturn(this, (DatagridTooltip.__proto__ || Object.getPrototypeOf(DatagridTooltip)).apply(this, arguments));
  }

  _createClass(DatagridTooltip, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          id = _props.id,
          isEdited = _props.isEdited,
          isError = _props.isError,
          isWarning = _props.isWarning,
          messageId = _props.messageId,
          messageValues = _props.messageValues,
          errorMessageId = _props.errorMessageId,
          errorMessageValues = _props.errorMessageValues,
          warningMessageId = _props.warningMessageId,
          warningMessageValues = _props.warningMessageValues;

      var overlayAttrs = {
        overlay: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Tooltip"], { id: 'Tooltip_' + id, style: { display: 'none' } })
      };
      var message = {
        id: errorMessageId || warningMessageId || messageId || false,
        values: errorMessageValues || warningMessageValues || messageValues || {}
      };
      if (message.id) {
        var tooltipClassName = 'tooltip';
        if (isError) {
          tooltipClassName = 'error tooltip';
        } else if (isWarning) {
          tooltipClassName = 'warning tooltip';
        }
        overlayAttrs = {
          placement: 'bottom',
          overlay: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Tooltip"],
            { id: 'Tooltip_' + id, bsClass: tooltipClassName },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], { id: message.id, values: message.values })
          )
        };
      }
      var wrapperClassName = __WEBPACK_IMPORTED_MODULE_4_classnames___default()({
        'oc-datagrid-tooltip': true,
        edited: isEdited,
        error: isError,
        warning: isWarning && !isError
      });
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["OverlayTrigger"],
        overlayAttrs,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: wrapperClassName },
          children
        )
      );
    }
  }]);

  return DatagridTooltip;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component), _class.propTypes = {
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number]).isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  isEdited: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  isError: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  isWarning: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  messageId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  messageValues: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  errorMessageId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  errorMessageValues: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  warningMessageId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  warningMessageValues: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
}, _class.defaultProps = {
  children: null,
  isEdited: false,
  isError: false,
  isWarning: false,
  messageId: null,
  messageValues: null,
  errorMessageId: null,
  errorMessageValues: null,
  warningMessageId: null,
  warningMessageValues: null
}, _temp);

;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DatagridTooltip, 'DatagridTooltip', '/home/ilkka/data/react-grid/src/datagrid/cell-tooltip.component.jsx');
}();

;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__opuscapita_react_icons__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__opuscapita_react_icons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__opuscapita_react_icons__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropdown_menu__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dropdown_controls_component_scss__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dropdown_controls_component_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__dropdown_controls_component_scss__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownControls; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/forbid-prop-types */











var DropdownControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(DropdownControls, _React$PureComponent);

  function DropdownControls() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DropdownControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropdownControls.__proto__ || Object.getPrototypeOf(DropdownControls)).call.apply(_ref, [this].concat(args))), _this), _this.onRemove = function () {
      var _this2;

      return (_this2 = _this).__onRemove__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _this.toggleFiltering = function () {
      var _this3;

      return (_this3 = _this).__toggleFiltering__REACT_HOT_LOADER__.apply(_this3, arguments);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DropdownControls, [{
    key: '__onRemove__REACT_HOT_LOADER__',
    value: function __onRemove__REACT_HOT_LOADER__() {
      return this.__onRemove__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onRemove__REACT_HOT_LOADER__',
    value: function __onRemove__REACT_HOT_LOADER__() {
      if (this.props.selectedItems.has(0)) {
        this.props.remove(this.props.id, this.props.onRemove);
      }
    }
  }, {
    key: '__toggleFiltering__REACT_HOT_LOADER__',
    value: function __toggleFiltering__REACT_HOT_LOADER__() {
      return this.__toggleFiltering__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__toggleFiltering__REACT_HOT_LOADER__',
    value: function __toggleFiltering__REACT_HOT_LOADER__() {
      this.props.toggleFiltering(this.props.id);
    }
  }, {
    key: 'render',
    value: function render() {
      var disabled = this.props.isBusy || this.props.isCreating || this.props.isEditing || this.props.disableActions;
      var menuItems = [];
      if (this.props.filtering) {
        menuItems.push({
          title: 'Show filtering row',
          icon: this.props.isFiltering ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__opuscapita_react_icons__["Icon"], {
            type: 'indicator',
            name: 'ok',
            width: 18,
            height: 18
          }) : undefined,
          onClick: this.toggleFiltering
        });
      }
      if (this.props.dropdownMenuItems && this.props.dropdownMenuItems.length) {
        menuItems = menuItems.concat(this.props.dropdownMenuItems);
      }
      if (this.props.removing) {
        menuItems.push({
          title: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], { id: 'Delete' }),
          disabled: !this.props.selectedItems.has(0),
          onClick: this.onRemove
        });
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__dropdown_menu__["a" /* DropdownMenu */], {
        id: this.props.id,
        disabled: disabled,
        menuItems: menuItems
      });
    }
  }]);

  return DropdownControls;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _class.propTypes = {
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  // actions
  remove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  toggleFiltering: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  // data
  selectedItems: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.list.isRequired,
  isBusy: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isCreating: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isEditing: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isFiltering: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  // config
  onRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  filtering: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  removing: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  dropdownMenuItems: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  disableActions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
}, _class.defaultProps = {
  filtering: false,
  removing: false,
  dropdownMenuItems: [],
  disableActions: false
}, _temp2);

;

var _temp3 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DropdownControls, 'DropdownControls', '/home/ilkka/data/react-grid/src/datagrid/dropdown-controls.component.jsx');
}();

;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@opuscapita/react-icons");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-immutable-proptypes");

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datagrid_component__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__datagrid_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dropdown_controls_component__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__dropdown_controls_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__datagrid_reducer__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__datagrid_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__datagrid_actions__ = __webpack_require__(7);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__datagrid_actions__; });








;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var KEY_CODES = {
  ENTER: 13,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

var _default = KEY_CODES;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(KEY_CODES, "KEY_CODES", "/home/ilkka/data/react-grid/src/constants/key-codes.constant.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/ilkka/data/react-grid/src/constants/key-codes.constant.js");
}();

;

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__action_bar_component_scss__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__action_bar_component_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__action_bar_component_scss__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionBar; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var ActionBar = (_temp = _class = function (_React$PureComponent) {
  _inherits(ActionBar, _React$PureComponent);

  function ActionBar() {
    _classCallCheck(this, ActionBar);

    return _possibleConstructorReturn(this, (ActionBar.__proto__ || Object.getPrototypeOf(ActionBar)).apply(this, arguments));
  }

  _createClass(ActionBar, [{
    key: 'render',
    value: function render() {
      var className = __WEBPACK_IMPORTED_MODULE_2_classnames___default()(_defineProperty({
        'oc-datagrid-actionbar': true
      }, this.props.position, !!this.props.position));
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: className },
        this.props.children
      );
    }
  }]);

  return ActionBar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _class.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['left', 'right'])
}, _class.defaultProps = {
  children: null,
  position: 'right'
}, _temp);

;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ActionBar, 'ActionBar', '/home/ilkka/data/react-grid/src/datagrid/action-bar.component.jsx');
}();

;

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_immutable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_intl__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fixed_data_table_2__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fixed_data_table_2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_fixed_data_table_2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_bootstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_classnames__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash_isNaN__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash_isNaN___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash_isNaN__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_fixed_data_table_2_dist_fixed_data_table_css__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_fixed_data_table_2_dist_fixed_data_table_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_fixed_data_table_2_dist_fixed_data_table_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__responsive_fixed_data_table_component__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__sort_header_cell_component__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__action_bar_component__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__inline_edit_controls_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__filtering_controls_component__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__dropdown_controls_component__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__datagrid_actions__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__floating_select_floating_select_component__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__date_picker_date_picker_component__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__cell_tooltip_component__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__datagrid_component_scss__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__datagrid_component_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__datagrid_component_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__spinner__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__constants_key_codes_constant__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataGrid; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-lonely-if, no-nested-ternary, prefer-template, react/require-default-props */




























var mapStateToProps = function mapStateToProps(state, ownProps) {
  var locale = {};
  if (ownProps.locale) {
    locale.userLanguage = ownProps.locale.language || 'en';
    locale.dateFormat = ownProps.locale.dateFormat || 'L';
    locale.thousandSeparator = ownProps.locale.thousandSeparator || '';
    locale.decimalSeparator = ownProps.locale.decimalSeparator || '';
  } else if (state.user) {
    locale.userLanguage = state.user.getIn(['user', 'language'], 'en');
    locale.dateFormat = state.user.getIn(['localeFormat', 'dateFormat'], 'L');
    locale.thousandSeparator = state.user.getIn(['localeFormat', 'thousandSeparator'], '');
    locale.decimalSeparator = state.user.getIn(['localeFormat', 'decimalSeparator'], '');
  }
  return {
    isBusy: state.datagrid.getIn([ownProps.id, 'session', 'isBusy'], true),
    isEditing: state.datagrid.getIn([ownProps.id, 'session', 'isEditing'], false),
    isCreating: state.datagrid.getIn([ownProps.id, 'session', 'isCreating'], false),
    isFiltering: state.datagrid.getIn([ownProps.id, 'session', 'isFiltering'], false),
    sortColumn: state.datagrid.getIn([ownProps.id, 'user', 'sortColumn'], null),
    sortOrder: state.datagrid.getIn([ownProps.id, 'user', 'sortOrder'], 'asc'),
    columnWidths: state.datagrid.getIn([ownProps.id, 'user', 'columnWidths'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_immutable__["Map"])()),
    selectedItems: state.datagrid.getIn([ownProps.id, 'selectedItems'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_immutable__["List"])()),
    data: state.datagrid.getIn([ownProps.id, 'data'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_immutable__["List"])()),
    editData: state.datagrid.getIn([ownProps.id, 'editData'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_immutable__["Map"])()),
    createData: state.datagrid.getIn([ownProps.id, 'createData'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_immutable__["List"])()),
    filterData: state.datagrid.getIn([ownProps.id, 'filterData'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_immutable__["Map"])()),
    cellMessages: state.datagrid.getIn([ownProps.id, 'cellMessages'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_immutable__["Map"])()),
    createCellMessages: state.datagrid.getIn([ownProps.id, 'createCellMessages'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_immutable__["Map"])()),
    allDataSize: state.datagrid.getIn([ownProps.id, 'allData'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_immutable__["List"])()).size,
    userLanguage: locale.userLanguage || 'en',
    dateFormat: locale.dateFormat || 'L',
    thousandSeparator: locale.thousandSeparator || '',
    decimalSeparator: locale.decimalSeparator || ''
  };
};

var mapDispatchToProps = __WEBPACK_IMPORTED_MODULE_18__datagrid_actions__;

/**
 * DataGrid component.
 * @class DataGrid
 * @extends React.PureComponent
 * @memberof Platform.Components
 */

/* eslint-disable max-len */

/**
 * @memberof Platform.Components.DataGrid
 * @prop {Object} propTypes - The props passed to this component
 * @prop {string} propTypes.id - Unique identifier for the data grid

 * @prop {array} propTypes.columns - Column object array
 * @prop {element} propTypes.columns.header - Column header content
 * @prop {string|number} propTypes.columns.columnKey - Column identifier key (Use if no valueKeyPath)
 * @prop {string} propTypes.columns.valueKeyPath - Column content value key path
 * @prop {string} propTypes.columns.valueType - Value type [text/number/float/boolean/date]
 * @prop {string} propTypes.columns.componentType - Input component type [text/number/float/select/boolean/date]
 * @prop {string} propTypes.columns.valueRender - Override value render, rowData as parameter
 * @prop {string} propTypes.columns.editValueRender - Override value render in editing mode
 * @prop {string} propTypes.columns.createValueRender - Override value render in creating mode
 * @prop {string} propTypes.columns.filterValueRender - Override value render in filtering mode
 * @prop {function} propTypes.columns.cell - Override cell content renderer, rowIndex as parameter
 * @prop {function} propTypes.columns.cellEdit - Override content renderer in editing mode
 * @prop {function} propTypes.columns.cellCreate - Override cell content renderer in creating mode
 * @prop {function} propTypes.columns.cellFilter - Override cell content renderer in filtering mode
 * @prop {object} propTypes.columns.renderComponentProps - Additional props for the render component
 * @prop {object} propTypes.columns.editComponentProps - Additional props for the edit component
 * @prop {object} propTypes.columns.createComponentProps - Additional props for the create component
 * @prop {object} propTypes.columns.filterComponentProps - Additional props for the filter component
 * @prop {number} propTypes.columns.width - The pixel width of the column
 * @prop {number} propTypes.columns.align - The horizontal alignment of the column
 * @prop {boolean} propTypes.columns.fixed - Column is fixed
 * @prop {boolean} propTypes.columns.allowCellsRecycling - Recycle cells that are outside viewport horizontally, better horizontal scrolling performance.
 * @prop {boolean} propTypes.columns.disableResizing - Disable column resizing this column
 * @prop {boolean} propTypes.columns.disableSorting - Disable column sorting this column
 * @prop {boolean} propTypes.columns.disableEditing - Disable inline editing this column
 * @prop {number} propTypes.columns.flexGrow - The grow factor relative to other columns
 * @prop {function} propTypes.columns.sortValueGetter - Getter function for the sort data
 * @prop {function} propTypes.columns.sortComparator - Comparator function for the sort data
 * @prop {string|number} propTypes.columns.defaultValue - Default value for the item when creating new item
 * @prop {object} propTypes.columns.onValueMatchChangeValue - Change other column value if own value matches
 * @prop {object} propTypes.columns.onValueMatchChangeValue.matchValue - When this columns data match to this
 * @prop {object} propTypes.columns.onValueMatchChangeValue.newValueKeyPath - Change value at this keyPath
 * @prop {object} propTypes.columns.onValueMatchChangeValue.newValue - The new value to be inserted
 * @prop {object} propTypes.columns.disableEditingOnValueMatch - Disable input element of this column when value at keyPath matches
 * @prop {object} propTypes.columns.disableEditingOnValueMatch.matchValueKeyPath - Keypath of the value to be matched
 * @prop {object} propTypes.columns.disableEditingOnValueMatch.matchValue - The value to be matched
 * @prop {function} propTypes.columns.onEditValueChange - Called on edit value change, called with (value, valueKeyPath, rowIndex, dataId)
 * @prop {function} propTypes.columns.onCreateValueChange - Called on create value change, called with (value, valueKeyPath, rowIndex)
 * @prop {function} propTypes.columns.onCreateBlur - Called on create cell input blur, called with (value, rowIndex)
 * @prop {function} propTypes.columns.onEditBlur - Called on edit cell input blur, called with (value, rowIndex, dataId)

 * @prop {number} propTypes.rowsCount - Override rows count otherwise calculated from data
 * @prop {array} propTypes.idKeyPath - Key path to ID data
 * @prop {element} propTypes.gridHeader - Grid header displayed on top of grid
 * @prop {element} propTypes.actionBar - Action bar element displayed at top right
 * @prop {element} propTypes.actionBarLeft - Action bar element displayed at top left
 * @prop {boolean} propTypes.disableDropdown - Don't use dropdown menu in the action bar
 * @prop {boolean} propTypes.disableFilteringControls - Don't display the filtering controls (only used if disableDropdown is true). Default is false.
 * @prop {array} propTypes.dropdownMenuItems - Additional dropdown menu items
 * @prop {boolean} propTypes.inlineEdit - Enable inline editing
 * @prop {boolean} propTypes.inlineAdd - Enable inline adding (defaults to true if inlineEdit is enabled)
 * @prop {boolean} propTypes.filtering - Enable column filtering
 * @prop {boolean} propTypes.removing - Enable item removing
 * @prop {boolean} propTypes.rowSelect - Enable row selecting
 * @prop {boolean} propTypes.rowSelectCheckboxColumn - Enable additional checkbox column for row selecting
 * @prop {boolean} propTypes.multiSelect - Enable multi selecting on row selecting
 * @prop {Immutable.Map} propTypes.selectComponentOptions - Options data for the react-select components
 * @prop {boolean} propTypes.disableActions - Disable action bar actions, eg. when other grid busy
 * @prop {object} propTypes.disableActionsMessage - Message about the reason of disabled action bar actions
 * @prop {boolean} propTypes.disableActionBar - Disable action bar rendering
 * @prop {boolean} propTypes.disableActionSave - Disable Save action of action bar
 * @prop {boolean} propTypes.enableArrowNavigation - Enable navigation by arrow keys in the editing mode (only for text and number inputs)
 * @prop {function} propTypes.onSave - Callback that is called when save button is clicked
 * @prop {function} propTypes.onRemove - Callback that is called when delete is clicked
 * @prop {function} propTypes.onCancel - Callback that is called when cancel is clicked
 * @prop {function} propTypes.onAddClick - Callback that is called when add is clicked
 * @prop {function} propTypes.onEditClick - Callback that is called when edit is clicked
 * @prop {number} propTypes.tabIndex - tabIndex start value, needed when multiple grids on same page

 * @prop {number} propTypes.headerHeight - Pixel height of the header row
 * @prop {number} propTypes.rowHeight - Pixel height of rows
 * @prop {Object} propTypes.containerStyle - Additional styles to be set on the container div
 * @prop {number} propTypes.scrollToColumn - Index of column to scroll to
 * @prop {number} propTypes.scrollTop - Value of vertical scroll
 * @prop {number} propTypes.scrollToRow - Index of row to scroll to
 * @prop {function} propTypes.onRowClick - Callback that is called when a row is clicked
 * @prop {function} propTypes.onRowDoubleClick - Callback that is called when a row is double clicked
 * @prop {function} propTypes.onRowMouseDown - Callback that is called when a mouse-down event happens on a row
 * @prop {function} propTypes.onRowMouseEnter - Callback that is called when a mouse-enter event happens on a row
 * @prop {function} propTypes.onRowMouseLeave - Callback that is called when a mouse-leave event happens on a row
 * @prop {function} propTypes.onScrollStart - Callback that is called when scrolling starts with current horizontal and vertical scroll values
 * @prop {function} propTypes.onScrollEnd - Callback that is called when scrolling ends or stops with new horizontal and vertical scroll values
 * @prop {function} propTypes.rowClassNameGetter - To get any additional CSS classes that should be added to a row, rowClassNameGetter(index) is called
 * @prop {function} propTypes.rowHeightGetter - If specified, rowHeightGetter(index) is called for each row and the returned value overrides rowHeight for particular row
 * @prop {function} propTypes.onContentHeightChange - Callback that is called when rowHeightGetter returns a different height for a row than the rowHeight prop. This is necessary because initially table estimates heights of some parts of the content
 */

var DataGrid = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapStateToProps, mapDispatchToProps), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_react_intl__["injectIntl"])(_class = _dec(_class = (_temp = _class2 = function (_React$PureComponent) {
  _inherits(DataGrid, _React$PureComponent);

  /* eslint-disable prefer-template, react/no-unused-prop-types, react/forbid-prop-types */

  function DataGrid(props) {
    _classCallCheck(this, DataGrid);

    var _this = _possibleConstructorReturn(this, (DataGrid.__proto__ || Object.getPrototypeOf(DataGrid)).call(this, props));

    _this.onColumnResizeEndCallback = function () {
      return _this.__onColumnResizeEndCallback__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onCreateCellKeyDown = function () {
      return _this.__onCreateCellKeyDown__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onEditCellKeyDown = function () {
      return _this.__onEditCellKeyDown__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onFilterCellValueChange = function () {
      return _this.__onFilterCellValueChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onCreateCellValueChange = function () {
      return _this.__onCreateCellValueChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onEditCellValueChange = function () {
      return _this.__onEditCellValueChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onCreateCellBlur = function () {
      return _this.__onCreateCellBlur__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onEditCellBlur = function () {
      return _this.__onEditCellBlur__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onCellFocus = function () {
      return _this.__onCellFocus__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.getDataIdByRowIndex = function () {
      return _this.__getDataIdByRowIndex__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.getSelectedItemIndex = function () {
      return _this.__getSelectedItemIndex__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.getEditItemValue = function () {
      return _this.__getEditItemValue__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.getCreateItemValue = function () {
      return _this.__getCreateItemValue__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.getFilterItemValue = function () {
      return _this.__getFilterItemValue__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.getComponentDisabledState = function () {
      return _this.__getComponentDisabledState__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.getRowClassName = function () {
      return _this.__getRowClassName__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.getCellMessages = function () {
      return _this.__getCellMessages__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.moveCellFocus = function () {
      return _this.__moveCellFocus__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.generateColumns = function () {
      return _this.__generateColumns__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.isCellEdited = function () {
      return _this.__isCellEdited__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.renderColumns = function () {
      return _this.__renderColumns__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = { currentRow: 0, currentColumn: 0 };
    return _this;
  }

  /* eslint-enable max-len, prefer-template, react/no-unused-prop-types, react/forbid-prop-types */

  _createClass(DataGrid, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.columnFilterFunctions = {};
      this.columnDefaultValues = {}; // Used when creating new items
      this.cellRefs = {};
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.invalidate(this.props.id);
    }
  }, {
    key: '__onColumnResizeEndCallback__REACT_HOT_LOADER__',
    value: function __onColumnResizeEndCallback__REACT_HOT_LOADER__() {
      return this.__onColumnResizeEndCallback__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onColumnResizeEndCallback__REACT_HOT_LOADER__',
    value: function __onColumnResizeEndCallback__REACT_HOT_LOADER__() {
      return this.__onColumnResizeEndCallback__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onColumnResizeEndCallback__REACT_HOT_LOADER__',
    value: function __onColumnResizeEndCallback__REACT_HOT_LOADER__() {
      return this.__onColumnResizeEndCallback__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onColumnResizeEndCallback__REACT_HOT_LOADER__',
    value: function __onColumnResizeEndCallback__REACT_HOT_LOADER__(newColumnWidth, columnKey) {
      this.props.resizeColumn(this.props.id, columnKey, newColumnWidth);
    }
  }, {
    key: '__onCreateCellKeyDown__REACT_HOT_LOADER__',
    value: function __onCreateCellKeyDown__REACT_HOT_LOADER__() {
      return this.__onCreateCellKeyDown__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCreateCellKeyDown__REACT_HOT_LOADER__',
    value: function __onCreateCellKeyDown__REACT_HOT_LOADER__() {
      return this.__onCreateCellKeyDown__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCreateCellKeyDown__REACT_HOT_LOADER__',
    value: function __onCreateCellKeyDown__REACT_HOT_LOADER__() {
      return this.__onCreateCellKeyDown__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCreateCellKeyDown__REACT_HOT_LOADER__',
    value: function __onCreateCellKeyDown__REACT_HOT_LOADER__(e) {
      if (e.keyCode === __WEBPACK_IMPORTED_MODULE_24__constants_key_codes_constant__["a" /* default */].ENTER) {
        this.props.addNewItem(this.props.id, this.columnDefaultValues);
      }
    }
  }, {
    key: '__onEditCellKeyDown__REACT_HOT_LOADER__',
    value: function __onEditCellKeyDown__REACT_HOT_LOADER__() {
      return this.__onEditCellKeyDown__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onEditCellKeyDown__REACT_HOT_LOADER__',
    value: function __onEditCellKeyDown__REACT_HOT_LOADER__() {
      return this.__onEditCellKeyDown__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onEditCellKeyDown__REACT_HOT_LOADER__',
    value: function __onEditCellKeyDown__REACT_HOT_LOADER__() {
      return this.__onEditCellKeyDown__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onEditCellKeyDown__REACT_HOT_LOADER__',
    value: function __onEditCellKeyDown__REACT_HOT_LOADER__(keyCode, columnKey, rowIndex) {
      if (this.props.enableArrowNavigation) {
        var columns = this.props.columns;
        switch (keyCode) {
          case __WEBPACK_IMPORTED_MODULE_24__constants_key_codes_constant__["a" /* default */].DOWN:
            {
              var nextElement = this.cellRefs[this.props.id + '_' + columnKey + '_' + (rowIndex + 1)];
              this.moveCellFocus(nextElement, rowIndex + 1, -1);
              break;
            }
          case __WEBPACK_IMPORTED_MODULE_24__constants_key_codes_constant__["a" /* default */].UP:
            {
              var _nextElement = this.cellRefs[this.props.id + '_' + columnKey + '_' + (rowIndex - 1)];
              this.moveCellFocus(_nextElement, rowIndex - 1, -1);
              break;
            }
          case __WEBPACK_IMPORTED_MODULE_24__constants_key_codes_constant__["a" /* default */].RIGHT:
            {
              var columnIndex = columns.findIndex(function (c) {
                return c.valueKeyPath.join('_') === columnKey;
              });
              if (columnIndex !== -1 && columnIndex + 1 < columns.length) {
                var nextColumnKey = columns[columnIndex + 1].valueKeyPath.join('_');
                var _nextElement2 = this.cellRefs[this.props.id + '_' + nextColumnKey + '_' + rowIndex];
                this.moveCellFocus(_nextElement2, -1, columnIndex + 1);
              }
              break;
            }
          case __WEBPACK_IMPORTED_MODULE_24__constants_key_codes_constant__["a" /* default */].LEFT:
            {
              var _columnIndex = columns.findIndex(function (c) {
                return c.valueKeyPath.join('_') === columnKey;
              });
              if (_columnIndex - 1 >= 0) {
                var _nextColumnKey = columns[_columnIndex - 1].valueKeyPath.join('_');
                var _nextElement3 = this.cellRefs[this.props.id + '_' + _nextColumnKey + '_' + rowIndex];
                this.moveCellFocus(_nextElement3, -1, _columnIndex - 1);
              }
              break;
            }
          default:
            break;
        }
      }
    }
  }, {
    key: '__onFilterCellValueChange__REACT_HOT_LOADER__',
    value: function __onFilterCellValueChange__REACT_HOT_LOADER__() {
      return this.__onFilterCellValueChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onFilterCellValueChange__REACT_HOT_LOADER__',
    value: function __onFilterCellValueChange__REACT_HOT_LOADER__() {
      return this.__onFilterCellValueChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onFilterCellValueChange__REACT_HOT_LOADER__',
    value: function __onFilterCellValueChange__REACT_HOT_LOADER__() {
      return this.__onFilterCellValueChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onFilterCellValueChange__REACT_HOT_LOADER__',
    value: function __onFilterCellValueChange__REACT_HOT_LOADER__(valueKeyPath, value) {
      this.props.filterCellValueChange(this.props.id, valueKeyPath, value, this.columnFilterFunctions);
    }
  }, {
    key: '__onCreateCellValueChange__REACT_HOT_LOADER__',
    value: function __onCreateCellValueChange__REACT_HOT_LOADER__() {
      return this.__onCreateCellValueChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCreateCellValueChange__REACT_HOT_LOADER__',
    value: function __onCreateCellValueChange__REACT_HOT_LOADER__() {
      return this.__onCreateCellValueChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCreateCellValueChange__REACT_HOT_LOADER__',
    value: function __onCreateCellValueChange__REACT_HOT_LOADER__() {
      return this.__onCreateCellValueChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCreateCellValueChange__REACT_HOT_LOADER__',
    value: function __onCreateCellValueChange__REACT_HOT_LOADER__(rowIndex, col, value) {
      this.props.createCellValueChange(this.props.id, rowIndex, col.valueKeyPath, value);
      if (col.onCreateValueChange) {
        col.onCreateValueChange(value, col.valueKeyPath, rowIndex);
      }
      if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
        this.onCreateCellValueChange(rowIndex, { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath }, col.onValueMatchChangeValue.newValue);
      }
      if (col.validators) {
        this.props.createCellValueValidate(this.props.id, rowIndex, col.valueKeyPath, value, col.validators);
      }
    }
  }, {
    key: '__onEditCellValueChange__REACT_HOT_LOADER__',
    value: function __onEditCellValueChange__REACT_HOT_LOADER__() {
      return this.__onEditCellValueChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onEditCellValueChange__REACT_HOT_LOADER__',
    value: function __onEditCellValueChange__REACT_HOT_LOADER__() {
      return this.__onEditCellValueChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onEditCellValueChange__REACT_HOT_LOADER__',
    value: function __onEditCellValueChange__REACT_HOT_LOADER__() {
      return this.__onEditCellValueChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onEditCellValueChange__REACT_HOT_LOADER__',
    value: function __onEditCellValueChange__REACT_HOT_LOADER__(rowIndex, col, value) {
      var dataId = this.getDataIdByRowIndex(rowIndex);
      this.props.editCellValueChange(this.props.id, dataId, col.valueKeyPath, value);
      if (col.onEditValueChange) {
        col.onEditValueChange(value, col.valueKeyPath, rowIndex, dataId);
      }
      if (col.onValueMatchChangeValue && value === col.onValueMatchChangeValue.matchValue) {
        this.onEditCellValueChange(rowIndex, { valueKeyPath: col.onValueMatchChangeValue.newValueKeyPath }, col.onValueMatchChangeValue.newValue);
      }
      if (col.validators) {
        this.props.editCellValueValidate(this.props.id, dataId, col.valueKeyPath, value, col.validators, this.props.idKeyPath);
      }
    }
  }, {
    key: '__onCreateCellBlur__REACT_HOT_LOADER__',
    value: function __onCreateCellBlur__REACT_HOT_LOADER__() {
      return this.__onCreateCellBlur__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCreateCellBlur__REACT_HOT_LOADER__',
    value: function __onCreateCellBlur__REACT_HOT_LOADER__() {
      return this.__onCreateCellBlur__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCreateCellBlur__REACT_HOT_LOADER__',
    value: function __onCreateCellBlur__REACT_HOT_LOADER__() {
      return this.__onCreateCellBlur__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCreateCellBlur__REACT_HOT_LOADER__',
    value: function __onCreateCellBlur__REACT_HOT_LOADER__(rowIndex, col, value) {
      if (col.onCreateBlur) {
        col.onCreateBlur(value, rowIndex);
      }
    }
  }, {
    key: '__onEditCellBlur__REACT_HOT_LOADER__',
    value: function __onEditCellBlur__REACT_HOT_LOADER__() {
      return this.__onEditCellBlur__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onEditCellBlur__REACT_HOT_LOADER__',
    value: function __onEditCellBlur__REACT_HOT_LOADER__() {
      return this.__onEditCellBlur__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onEditCellBlur__REACT_HOT_LOADER__',
    value: function __onEditCellBlur__REACT_HOT_LOADER__() {
      return this.__onEditCellBlur__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onEditCellBlur__REACT_HOT_LOADER__',
    value: function __onEditCellBlur__REACT_HOT_LOADER__(rowIndex, col, value) {
      if (col.onEditBlur) {
        var dataId = this.getDataIdByRowIndex(rowIndex);
        col.onEditBlur(value, rowIndex, dataId);
      }
    }
  }, {
    key: '__onCellFocus__REACT_HOT_LOADER__',
    value: function __onCellFocus__REACT_HOT_LOADER__() {
      return this.__onCellFocus__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCellFocus__REACT_HOT_LOADER__',
    value: function __onCellFocus__REACT_HOT_LOADER__() {
      return this.__onCellFocus__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCellFocus__REACT_HOT_LOADER__',
    value: function __onCellFocus__REACT_HOT_LOADER__() {
      return this.__onCellFocus__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onCellFocus__REACT_HOT_LOADER__',
    value: function __onCellFocus__REACT_HOT_LOADER__(e) {
      e.target.select();
    }
  }, {
    key: '__getDataIdByRowIndex__REACT_HOT_LOADER__',
    value: function __getDataIdByRowIndex__REACT_HOT_LOADER__() {
      return this.__getDataIdByRowIndex__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getDataIdByRowIndex__REACT_HOT_LOADER__',
    value: function __getDataIdByRowIndex__REACT_HOT_LOADER__() {
      return this.__getDataIdByRowIndex__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getDataIdByRowIndex__REACT_HOT_LOADER__',
    value: function __getDataIdByRowIndex__REACT_HOT_LOADER__() {
      return this.__getDataIdByRowIndex__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getDataIdByRowIndex__REACT_HOT_LOADER__',
    value: function __getDataIdByRowIndex__REACT_HOT_LOADER__(rowIndex) {
      return this.props.data.getIn([rowIndex].concat(_toConsumableArray(this.props.idKeyPath)));
    }
  }, {
    key: '__getSelectedItemIndex__REACT_HOT_LOADER__',
    value: function __getSelectedItemIndex__REACT_HOT_LOADER__() {
      return this.__getSelectedItemIndex__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getSelectedItemIndex__REACT_HOT_LOADER__',
    value: function __getSelectedItemIndex__REACT_HOT_LOADER__() {
      return this.__getSelectedItemIndex__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getSelectedItemIndex__REACT_HOT_LOADER__',
    value: function __getSelectedItemIndex__REACT_HOT_LOADER__() {
      return this.__getSelectedItemIndex__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getSelectedItemIndex__REACT_HOT_LOADER__',
    value: function __getSelectedItemIndex__REACT_HOT_LOADER__(id) {
      var _this2 = this;

      if (!id) return undefined;
      var index = this.props.data.findIndex(function (v) {
        return v.getIn(_this2.props.idKeyPath) === id;
      });
      return index === -1 ? undefined : index;
    }
  }, {
    key: '__getEditItemValue__REACT_HOT_LOADER__',
    value: function __getEditItemValue__REACT_HOT_LOADER__() {
      return this.__getEditItemValue__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getEditItemValue__REACT_HOT_LOADER__',
    value: function __getEditItemValue__REACT_HOT_LOADER__() {
      return this.__getEditItemValue__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getEditItemValue__REACT_HOT_LOADER__',
    value: function __getEditItemValue__REACT_HOT_LOADER__() {
      return this.__getEditItemValue__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getEditItemValue__REACT_HOT_LOADER__',
    value: function __getEditItemValue__REACT_HOT_LOADER__(rowIndex, col) {
      // Get the value to display in edit cell
      var id = this.getDataIdByRowIndex(rowIndex);
      var editValue = this.props.editData.getIn([id].concat(_toConsumableArray(col.valueKeyPath)), undefined);
      var originalValue = void 0;
      if (editValue === undefined) {
        originalValue = this.props.data.getIn([rowIndex].concat(_toConsumableArray(col.valueKeyPath)), '');
      } else if (editValue === null) {
        return '';
      } else {
        return editValue;
      }
      if (originalValue === null || originalValue === undefined || originalValue === '') {
        return '';
      }
      // Special formatting by component type
      if (col.componentType === 'date') {
        return this.props.intl.formatDate(originalValue, { timeZone: 'UTC' });
      } else if (col.componentType === 'float' && String(originalValue).length > 0) {
        return String(originalValue).replace('.', this.props.decimalSeparator);
      }
      return originalValue;
    }
  }, {
    key: '__getCreateItemValue__REACT_HOT_LOADER__',
    value: function __getCreateItemValue__REACT_HOT_LOADER__() {
      return this.__getCreateItemValue__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getCreateItemValue__REACT_HOT_LOADER__',
    value: function __getCreateItemValue__REACT_HOT_LOADER__() {
      return this.__getCreateItemValue__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getCreateItemValue__REACT_HOT_LOADER__',
    value: function __getCreateItemValue__REACT_HOT_LOADER__() {
      return this.__getCreateItemValue__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getCreateItemValue__REACT_HOT_LOADER__',
    value: function __getCreateItemValue__REACT_HOT_LOADER__(rowIndex, col) {
      var val = this.props.createData.getIn([rowIndex].concat(_toConsumableArray(col.valueKeyPath)), '');
      if (val === null) {
        return '';
      }
      return val;
    }
  }, {
    key: '__getFilterItemValue__REACT_HOT_LOADER__',
    value: function __getFilterItemValue__REACT_HOT_LOADER__() {
      return this.__getFilterItemValue__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getFilterItemValue__REACT_HOT_LOADER__',
    value: function __getFilterItemValue__REACT_HOT_LOADER__() {
      return this.__getFilterItemValue__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getFilterItemValue__REACT_HOT_LOADER__',
    value: function __getFilterItemValue__REACT_HOT_LOADER__() {
      return this.__getFilterItemValue__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getFilterItemValue__REACT_HOT_LOADER__',
    value: function __getFilterItemValue__REACT_HOT_LOADER__(valueKeyPath) {
      var val = this.props.filterData.get(valueKeyPath.join('/'), '');
      if (val === null) {
        return '';
      }
      return val;
    }
  }, {
    key: '__getComponentDisabledState__REACT_HOT_LOADER__',
    value: function __getComponentDisabledState__REACT_HOT_LOADER__() {
      return this.__getComponentDisabledState__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getComponentDisabledState__REACT_HOT_LOADER__',
    value: function __getComponentDisabledState__REACT_HOT_LOADER__() {
      return this.__getComponentDisabledState__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getComponentDisabledState__REACT_HOT_LOADER__',
    value: function __getComponentDisabledState__REACT_HOT_LOADER__() {
      return this.__getComponentDisabledState__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getComponentDisabledState__REACT_HOT_LOADER__',
    value: function __getComponentDisabledState__REACT_HOT_LOADER__(rowIndex, col, mode) {
      var componentDisabled = !!col.disableEditing;
      // check if component is disabled by other column data
      if (!componentDisabled && col.disableEditingOnValueMatch) {
        if (mode === 'create') {
          componentDisabled = this.getCreateItemValue(rowIndex, { valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath }) === col.disableEditingOnValueMatch.matchValue;
        } else {
          componentDisabled = this.getEditItemValue(rowIndex, { valueKeyPath: col.disableEditingOnValueMatch.matchValueKeyPath }) === col.disableEditingOnValueMatch.matchValue;
        }
      }
      return componentDisabled;
    }
  }, {
    key: '__getRowClassName__REACT_HOT_LOADER__',
    value: function __getRowClassName__REACT_HOT_LOADER__() {
      return this.__getRowClassName__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getRowClassName__REACT_HOT_LOADER__',
    value: function __getRowClassName__REACT_HOT_LOADER__() {
      return this.__getRowClassName__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getRowClassName__REACT_HOT_LOADER__',
    value: function __getRowClassName__REACT_HOT_LOADER__() {
      return this.__getRowClassName__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getRowClassName__REACT_HOT_LOADER__',
    value: function __getRowClassName__REACT_HOT_LOADER__(rowIndex) {
      var _props = this.props,
          isCreating = _props.isCreating,
          isEditing = _props.isEditing,
          isFiltering = _props.isFiltering,
          createData = _props.createData,
          selectedItems = _props.selectedItems,
          idKeyPath = _props.idKeyPath,
          data = _props.data;

      var rowClassNames = ['oc-datagrid-row'];
      var extraRowCount = 0; // how many rows to ignore from top, new + filter rows
      if (isCreating) extraRowCount = createData.size;
      if (isFiltering) extraRowCount += 1;
      if (isFiltering && rowIndex === 0) {
        rowClassNames.push('oc-datagrid-row-filter');
      } else {
        if (isCreating) {
          if (rowIndex <= extraRowCount - 1) {
            rowClassNames.push('oc-datagrid-row-new');
          }
        } else if (isEditing) {
          rowClassNames.push('oc-datagrid-row-edit');
        }
      }

      // check if row is selected
      if (!isCreating && !isEditing && selectedItems && idKeyPath && (!isFiltering || rowIndex > 0)) {
        if (selectedItems.indexOf(data.getIn([rowIndex - extraRowCount].concat(_toConsumableArray(idKeyPath)))) !== -1) {
          rowClassNames.push('is-selected');
        }
      }

      if (this.props.rowClassNameGetter) {
        return rowClassNames.join(' ') + ' ' + this.props.rowClassNameGetter(rowIndex);
      }
      return rowClassNames.join(' ');
    }
  }, {
    key: '__getCellMessages__REACT_HOT_LOADER__',
    value: function __getCellMessages__REACT_HOT_LOADER__() {
      return this.__getCellMessages__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getCellMessages__REACT_HOT_LOADER__',
    value: function __getCellMessages__REACT_HOT_LOADER__() {
      return this.__getCellMessages__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getCellMessages__REACT_HOT_LOADER__',
    value: function __getCellMessages__REACT_HOT_LOADER__() {
      return this.__getCellMessages__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getCellMessages__REACT_HOT_LOADER__',
    value: function __getCellMessages__REACT_HOT_LOADER__(rowIndex, col, cellType) {
      var returnData = {};
      if (!this.props.idKeyPath || !col.valueKeyPath) {
        return returnData;
      }
      var errorMessage = void 0;
      var warningMessage = void 0;
      if (cellType === 'create') {
        errorMessage = this.props.createCellMessages.getIn(['error', rowIndex].concat(_toConsumableArray(col.valueKeyPath)));
        warningMessage = this.props.createCellMessages.getIn(['warning', rowIndex].concat(_toConsumableArray(col.valueKeyPath)));
      } else {
        var id = this.getDataIdByRowIndex(rowIndex);
        errorMessage = this.props.cellMessages.getIn(['error', id].concat(_toConsumableArray(col.valueKeyPath)));
        warningMessage = this.props.cellMessages.getIn(['warning', id].concat(_toConsumableArray(col.valueKeyPath)));
      }
      if (errorMessage) {
        returnData.errorMessageId = errorMessage.id || null;
        returnData.errorMessageValues = errorMessage.values || {};
      }
      if (warningMessage) {
        returnData.warningMessageId = warningMessage.id || null;
        returnData.warningMessageValues = warningMessage.values || {};
      }
      return returnData;
    }
  }, {
    key: '__moveCellFocus__REACT_HOT_LOADER__',
    value: function __moveCellFocus__REACT_HOT_LOADER__() {
      return this.__moveCellFocus__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__moveCellFocus__REACT_HOT_LOADER__',
    value: function __moveCellFocus__REACT_HOT_LOADER__() {
      return this.__moveCellFocus__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__moveCellFocus__REACT_HOT_LOADER__',
    value: function __moveCellFocus__REACT_HOT_LOADER__() {
      return this.__moveCellFocus__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__moveCellFocus__REACT_HOT_LOADER__',
    value: function __moveCellFocus__REACT_HOT_LOADER__(nextElement, rowIndex, columnIndex) {
      if (nextElement && nextElement.type === 'text') {
        if (rowIndex !== -1) {
          this.setState({ currentRow: rowIndex });
        }
        if (columnIndex !== -1) {
          this.setState({ currentColumn: columnIndex + 1 });
        }
        setTimeout(function () {
          return nextElement.select();
        }, 50);
      }
    }
  }, {
    key: '__generateColumns__REACT_HOT_LOADER__',
    value: function __generateColumns__REACT_HOT_LOADER__() {
      return this.__generateColumns__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__generateColumns__REACT_HOT_LOADER__',
    value: function __generateColumns__REACT_HOT_LOADER__() {
      return this.__generateColumns__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__generateColumns__REACT_HOT_LOADER__',
    value: function __generateColumns__REACT_HOT_LOADER__() {
      return this.__generateColumns__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__generateColumns__REACT_HOT_LOADER__',
    value: function __generateColumns__REACT_HOT_LOADER__() {
      var _this3 = this;

      delete this.refFirstInvalidInput;
      var columns = [];
      var tabIndex = String(this.props.tabIndex);
      if (this.props.rowSelectCheckboxColumn) {
        columns.push({
          width: 40,
          isResizable: false,
          columnKey: 'selectionCheckbox',
          cell: function cell(rowIndex) {
            var rowItem = _this3.props.data.get(rowIndex);
            var itemId = rowItem.getIn(_this3.props.idKeyPath);
            var selected = _this3.props.selectedItems.includes(itemId);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__["Checkbox"], {
              className: 'oc-row-select-checkbox',
              checked: selected,
              onClick: function onClick() {
                _this3.props.itemSelectionChange(_this3.props.id, rowIndex, _this3.props.idKeyPath, true, false);
              },
              tabIndex: tabIndex
            });
          },
          cellEdit: function cellEdit() {
            return null;
          },
          cellCreate: function cellCreate() {
            return null;
          },
          cellFilter: function cellFilter() {
            return null;
          }
        });
      }

      this.props.columns.forEach(function (col) {
        var column = {
          header: col.header,
          columnKey: col.columnKey || col.valueKeyPath.join('_'),
          width: col.width,
          isResizable: !col.disableResizing,
          fixed: !!col.fixed,
          allowCellsRecycling: !!col.allowCellsRecycling
        };
        var columnFilterFunction = {
          valueEmptyChecker: function valueEmptyChecker(val) {
            return val === '' || val === null || val === undefined;
          },
          filterMatcher: function filterMatcher(val, filterVal) {
            return new RegExp(filterVal, 'i').test(val);
          }
        };
        if (col.componentType === 'select') {
          columnFilterFunction.filterMatcher = function (val, filterVal) {
            return val === filterVal;
          };
        }
        if (col.defaultValue !== undefined) {
          _this3.columnDefaultValues[column.columnKey] = col.defaultValue;
        }
        if (col.align) {
          column.align = col.align;
        }
        if (col.valueKeyPath) {
          column.valueKeyPath = col.valueKeyPath;
        }
        if (col.flexGrow) {
          column.flexGrow = col.flexGrow;
        }
        // Cell value rendering
        if (col.cell) {
          column.cell = col.cell;
        } else if (col.valueRender) {
          column.cell = function (rowIndex) {
            return col.valueRender(_this3.props.data.get(rowIndex));
          };
        } else {
          switch (col.valueType) {
            case 'number':
              column.cell = function (rowIndex) {
                var val = _this3.props.data.getIn([rowIndex].concat(_toConsumableArray(col.valueKeyPath)));
                if (val === null) {
                  return '';
                }
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_intl__["FormattedNumber"], _extends({ value: val }, col.renderComponentProps));
              };
              break;
            case 'float':
              column.cell = function (rowIndex) {
                var val = _this3.props.data.getIn([rowIndex].concat(_toConsumableArray(col.valueKeyPath)));
                if (val === null) {
                  return '';
                }
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_intl__["FormattedNumber"], _extends({ value: val }, col.renderComponentProps));
              };
              break;
            case 'date':
              column.cell = function (rowIndex) {
                var val = _this3.props.data.getIn([rowIndex].concat(_toConsumableArray(col.valueKeyPath)));
                if (val === null) {
                  return '';
                }
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_intl__["FormattedDate"], _extends({ value: val }, col.renderComponentProps));
              };
              break;
            case 'boolean':
              column.cell = function (rowIndex) {
                var val = _this3.props.data.getIn([rowIndex].concat(_toConsumableArray(col.valueKeyPath)));
                if (val === null) {
                  return '';
                }
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_intl__["FormattedMessage"], _extends({ id: val ? 'Yes' : 'No' }, col.renderComponentProps));
              };
              break;
            default:
              column.cell = function (rowIndex) {
                return _this3.props.data.getIn([rowIndex].concat(_toConsumableArray(col.valueKeyPath)));
              };
          }
        }
        // Cell edit/create/filter component rendering
        if (col.cellEdit) {
          column.cellEdit = col.cellEdit;
        } else if (col.editValueRender) {
          column.cellEdit = function (rowIndex) {
            return col.editValueRender(_this3.props.data.get(rowIndex));
          };
        }
        if (col.cellCreate) {
          column.cellCreate = col.cellCreate;
        } else if (col.createValueRender) {
          column.cellCreate = function (rowIndex) {
            return col.createValueRender(_this3.props.data.get(rowIndex));
          };
        }
        if (col.cellFilter) {
          column.cellFilter = col.cellFilter;
        } else if (col.filterValueRender) {
          column.cellFilter = function (rowIndex) {
            return col.filterValueRender(_this3.props.data.get(rowIndex));
          };
        }
        if (col.componentType) {
          var editValueParser = function editValueParser(val) {
            return val;
          };
          switch (col.componentType) {
            case 'text':
              // TODO REFACTOR TO FUNCTION
              if (_this3.props.inlineEdit) {
                if (!column.cellEdit) {
                  column.cellEdit = function (rowIndex) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__["FormControl"], _extends({
                      type: 'text',
                      value: _this3.getEditItemValue(rowIndex, col),
                      onChange: function onChange(e) {
                        return _this3.onEditCellValueChange(rowIndex, col, editValueParser(e.target.value));
                      },
                      onBlur: function onBlur(e) {
                        return _this3.onEditCellBlur(rowIndex, col, e.target.value);
                      },
                      onKeyDown: function onKeyDown(e) {
                        return _this3.onEditCellKeyDown(e.keyCode, column.columnKey, rowIndex);
                      },
                      inputRef: function inputRef(input) {
                        if (_this3.props.enableArrowNavigation) {
                          _this3.cellRefs[_this3.props.id + '_' + column.columnKey + '_' + rowIndex] = input;
                        }
                      },
                      id: 'ocDatagridEditInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                    }, col.editComponentProps, {
                      disabled: _this3.getComponentDisabledState(rowIndex, col, 'edit'),
                      tabIndex: tabIndex
                    }));
                  };
                }
                if (!column.cellCreate) {
                  column.cellCreate = function (rowIndex) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__["FormControl"], _extends({
                      type: 'text',
                      value: _this3.getCreateItemValue(rowIndex, col),
                      onChange: function onChange(e) {
                        return _this3.onCreateCellValueChange(rowIndex, col, editValueParser(e.target.value));
                      },
                      onBlur: function onBlur(e) {
                        return _this3.onCreateCellBlur(rowIndex, col, e.target.value);
                      },
                      onKeyDown: _this3.onCreateCellKeyDown,
                      id: 'ocDatagridCreateInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                    }, col.createComponentProps, {
                      disabled: _this3.getComponentDisabledState(rowIndex, col, 'create'),
                      tabIndex: tabIndex
                    }));
                  };
                }
              }
              if (_this3.props.filtering) {
                if (!column.cellFilter) {
                  column.cellFilter = function () {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__["FormControl"], _extends({
                      type: 'text',
                      value: _this3.getFilterItemValue(col.valueKeyPath),
                      onChange: function onChange(e) {
                        return _this3.onFilterCellValueChange(col.valueKeyPath, editValueParser(e.target.value));
                      },
                      id: 'ocDatagridFilterInput-' + _this3.props.id + '-' + column.columnKey
                    }, col.filterComponentProps, {
                      tabIndex: tabIndex
                    }));
                  };
                }
              }
              break;
            case 'number':
              columnFilterFunction.valueEmptyChecker = function (val) {
                return val === '' || __WEBPACK_IMPORTED_MODULE_9_lodash_isNaN___default()(val) || val === null || val === undefined;
              };
              columnFilterFunction.filterMatcher = function (val, filterVal) {
                return parseInt(val, 10) === parseInt(filterVal, 10);
              };
              if (_this3.props.inlineEdit) {
                if (!column.cellEdit) {
                  column.cellEdit = function (rowIndex) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__["FormControl"], _extends({
                      type: 'number',
                      value: _this3.getEditItemValue(rowIndex, col),
                      onChange: function onChange(e) {
                        return _this3.onEditCellValueChange(rowIndex, col, e.target.value);
                      },
                      onBlur: function onBlur(e) {
                        return _this3.onEditCellBlur(rowIndex, col, e.target.value);
                      },
                      onFocus: _this3.onCellFocus,
                      onKeyDown: function onKeyDown(e) {
                        return _this3.onEditCellKeyDown(e.keyCode, column.columnKey, rowIndex);
                      },
                      inputRef: function inputRef(input) {
                        if (_this3.props.enableArrowNavigation) {
                          _this3.cellRefs[_this3.props.id + '_' + column.columnKey + '_' + rowIndex] = input;
                        }
                      },
                      id: 'ocDatagridEditInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                    }, col.editComponentProps, {
                      disabled: _this3.getComponentDisabledState(rowIndex, col, 'edit'),
                      tabIndex: tabIndex
                    }));
                  };
                }
                if (!column.cellCreate) {
                  column.cellCreate = function (rowIndex) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__["FormControl"], _extends({
                      type: 'number',
                      value: _this3.getCreateItemValue(rowIndex, col),
                      onChange: function onChange(e) {
                        return _this3.onCreateCellValueChange(rowIndex, col, e.target.value);
                      },
                      onBlur: function onBlur(e) {
                        return _this3.onCreateCellBlur(rowIndex, col, e.target.value);
                      },
                      onFocus: _this3.onCellFocus,
                      onKeyDown: _this3.onCreateCellKeyDown,
                      id: 'ocDatagridCreateInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                    }, col.createComponentProps, {
                      disabled: _this3.getComponentDisabledState(rowIndex, col, 'create'),
                      tabIndex: tabIndex
                    }));
                  };
                }
              }
              if (_this3.props.filtering) {
                if (!column.cellFilter) {
                  column.cellFilter = function () {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__["FormControl"], _extends({
                      type: 'number',
                      value: _this3.getFilterItemValue(col.valueKeyPath),
                      onChange: function onChange(e) {
                        return _this3.onFilterCellValueChange(col.valueKeyPath, e.target.value);
                      },
                      id: 'ocDatagridFilterInput-' + _this3.props.id + '-' + column.columnKey
                    }, col.filterComponentProps, {
                      tabIndex: tabIndex
                    }));
                  };
                }
              }
              break;
            case 'float':
              editValueParser = function editValueParser(val) {
                return val.replace(new RegExp('[^\\d' + _this3.props.decimalSeparator + '+-]', 'g'), '');
              };
              columnFilterFunction.valueEmptyChecker = function (val) {
                return val === '' || __WEBPACK_IMPORTED_MODULE_9_lodash_isNaN___default()(val) || val === null || val === undefined;
              };
              columnFilterFunction.filterMatcher = function (val, filterVal) {
                var parsedFilterVal = filterVal;
                if (_this3.props.decimalSeparator && _this3.props.decimalSeparator !== '.') {
                  parsedFilterVal = parsedFilterVal.replace(_this3.props.decimalSeparator, '.');
                }
                return parseFloat(parsedFilterVal) === val;
              };
              if (_this3.props.inlineEdit) {
                if (!column.cellEdit) {
                  column.cellEdit = function (rowIndex) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__["FormControl"], _extends({
                      type: 'text',
                      value: _this3.getEditItemValue(rowIndex, col),
                      onChange: function onChange(e) {
                        return _this3.onEditCellValueChange(rowIndex, col, editValueParser(e.target.value));
                      },
                      onBlur: function onBlur(e) {
                        return _this3.onEditCellBlur(rowIndex, col, editValueParser(e.target.value));
                      },
                      onKeyDown: function onKeyDown(e) {
                        return _this3.onEditCellKeyDown(e.keyCode, column.columnKey, rowIndex);
                      },
                      inputRef: function inputRef(input) {
                        if (_this3.props.enableArrowNavigation) {
                          _this3.cellRefs[_this3.props.id + '_' + column.columnKey + '_' + rowIndex] = input;
                        }
                      },
                      id: 'ocDatagridEditInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                    }, col.editComponentProps, {
                      disabled: _this3.getComponentDisabledState(rowIndex, col, 'edit'),
                      tabIndex: tabIndex
                    }));
                  };
                }
                if (!column.cellCreate) {
                  column.cellCreate = function (rowIndex) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__["FormControl"], _extends({
                      type: 'text',
                      value: _this3.getCreateItemValue(rowIndex, col),
                      onChange: function onChange(e) {
                        return _this3.onCreateCellValueChange(rowIndex, col, editValueParser(e.target.value));
                      },
                      onBlur: function onBlur(e) {
                        return _this3.onCreateCellBlur(rowIndex, col, editValueParser(e.target.value));
                      },
                      onKeyDown: _this3.onCreateCellKeyDown,
                      id: 'ocDatagridCreateInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                    }, col.createComponentProps, {
                      disabled: _this3.getComponentDisabledState(rowIndex, col, 'create'),
                      tabIndex: tabIndex
                    }));
                  };
                }
              }
              if (_this3.props.filtering) {
                if (!column.cellFilter) {
                  column.cellFilter = function () {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_bootstrap__["FormControl"], _extends({
                      type: 'text',
                      value: _this3.getFilterItemValue(col.valueKeyPath),
                      onChange: function onChange(e) {
                        return _this3.onFilterCellValueChange(col.valueKeyPath, editValueParser(e.target.value));
                      },
                      id: 'ocDatagridFilterInput-' + _this3.props.id + '-' + column.columnKey
                    }, col.filterComponentProps, {
                      tabIndex: tabIndex
                    }));
                  };
                }
              }
              break;
            case 'select':
              {
                if (_this3.props.inlineEdit) {
                  if (!column.cellEdit) {
                    var selectOptions = _this3.props.selectComponentOptions.get(column.columnKey);
                    column.cellEdit = function (rowIndex) {
                      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_19__floating_select_floating_select_component__["a" /* default */], _extends({
                        name: col.valueKeyPath.join() + '-edit-' + rowIndex,
                        options: col.editSelectOptionsMod && selectOptions ? col.editSelectOptionsMod(selectOptions.slice(), rowIndex, col) : selectOptions,
                        value: _this3.getEditItemValue(rowIndex, col),
                        onChange: function onChange(selectedData) {
                          return _this3.onEditCellValueChange(rowIndex, col, selectedData && editValueParser(selectedData.value));
                        },
                        onBlur: function onBlur() {
                          return _this3.onEditCellBlur(rowIndex, col, _this3.getEditItemValue(rowIndex, col));
                        },
                        searchable: selectOptions && selectOptions.length > 9,
                        clearable: false,
                        backspaceRemoves: false,
                        inputProps: {
                          id: 'ocDatagridEditInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                        }
                      }, col.editComponentProps, {
                        disabled: _this3.getComponentDisabledState(rowIndex, col, 'edit'),
                        tabIndex: tabIndex
                      }));
                    };
                  }
                  if (!column.cellCreate) {
                    var _selectOptions = _this3.props.selectComponentOptions.get(column.columnKey);
                    column.cellCreate = function (rowIndex) {
                      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_19__floating_select_floating_select_component__["a" /* default */], _extends({
                        name: col.valueKeyPath.join() + '-create-' + rowIndex,
                        options: col.createSelectOptionsMod && _selectOptions ? col.createSelectOptionsMod(_selectOptions.slice(), rowIndex, col) : _selectOptions,
                        value: _this3.getCreateItemValue(rowIndex, col),
                        onChange: function onChange(selectedData) {
                          return _this3.onCreateCellValueChange(rowIndex, col, selectedData && editValueParser(selectedData.value));
                        },
                        onBlur: function onBlur() {
                          return _this3.onCreateCellBlur(rowIndex, col, _this3.getEditItemValue(rowIndex, col));
                        },
                        searchable: _selectOptions && _selectOptions.length > 9,
                        clearable: false,
                        backspaceRemoves: false,
                        inputProps: {
                          id: 'ocDatagridCreateInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                        }
                      }, col.createComponentProps, {
                        disabled: _this3.getComponentDisabledState(rowIndex, col, 'create'),
                        tabIndex: tabIndex
                      }));
                    };
                  }
                }
                if (_this3.props.filtering) {
                  if (!column.cellFilter) {
                    var _selectOptions2 = _this3.props.selectComponentOptions.get(column.columnKey);
                    column.cellFilter = function () {
                      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_19__floating_select_floating_select_component__["a" /* default */], _extends({
                        name: col.valueKeyPath.join() + '-filter',
                        options: col.filterSelectOptionsMod && _selectOptions2 ? col.filterSelectOptionsMod(_selectOptions2.slice(), col) : _selectOptions2,
                        value: _this3.getFilterItemValue(col.valueKeyPath),
                        onChange: function onChange(selectedData) {
                          return _this3.onFilterCellValueChange(col.valueKeyPath, selectedData && editValueParser(selectedData.value));
                        },
                        searchable: _selectOptions2 && _selectOptions2.length > 9,
                        clearable: true,
                        inputProps: {
                          id: 'ocDatagridFilterInput-' + _this3.props.id + '-' + column.columnKey
                        }
                      }, col.filterComponentProps, {
                        tabIndex: tabIndex
                      }));
                    };
                  }
                }
                break;
              }
            case 'date':
              {
                columnFilterFunction.filterMatcher = function (val, filterVal) {
                  return __WEBPACK_IMPORTED_MODULE_10_moment___default()(filterVal, 'L').isSame(val, 'day');
                };
                if (_this3.props.inlineEdit) {
                  if (!column.cellEdit) {
                    column.cellEdit = function (rowIndex) {
                      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_20__date_picker_date_picker_component__["a" /* default */], _extends({
                        value: _this3.getEditItemValue(rowIndex, col),
                        onChange: function onChange(data) {
                          return _this3.onEditCellValueChange(rowIndex, col, editValueParser(data));
                        },
                        language: _this3.props.userLanguage,
                        inputProps: {
                          tabIndex: tabIndex,
                          id: 'ocDatagridEditInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex,
                          onKeyDown: function onKeyDown(e) {
                            return _this3.onEditCellKeyDown(e.keyCode, column.columnKey, rowIndex);
                          },
                          inputRef: function inputRef(input) {
                            if (_this3.props.enableArrowNavigation) {
                              _this3.cellRefs[_this3.props.id + '_' + column.columnKey + '_' + rowIndex] = input;
                            }
                          }
                        }
                      }, col.editComponentProps, {
                        disabled: _this3.getComponentDisabledState(rowIndex, col, 'edit')
                      }));
                    };
                  }
                  if (!column.cellCreate) {
                    column.cellCreate = function (rowIndex) {
                      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_20__date_picker_date_picker_component__["a" /* default */], _extends({
                        value: _this3.getCreateItemValue(rowIndex, col),
                        onChange: function onChange(data) {
                          return _this3.onCreateCellValueChange(rowIndex, col, editValueParser(data));
                        },
                        onKeyDown: _this3.onCreateCellKeyDown,
                        language: _this3.props.userLanguage,
                        inputProps: {
                          tabIndex: tabIndex,
                          id: 'ocDatagridCreateInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                        }
                      }, col.createComponentProps, {
                        disabled: _this3.getComponentDisabledState(rowIndex, col, 'create')
                      }));
                    };
                  }
                }
                if (_this3.props.filtering) {
                  if (!column.cellFilter) {
                    column.cellFilter = function () {
                      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_20__date_picker_date_picker_component__["a" /* default */], _extends({
                        value: _this3.getFilterItemValue(col.valueKeyPath),
                        onChange: function onChange(data) {
                          return _this3.onFilterCellValueChange(col.valueKeyPath, editValueParser(data));
                        },
                        language: _this3.props.userLanguage,
                        inputProps: {
                          tabIndex: tabIndex,
                          id: 'ocDatagridFilterInput-' + _this3.props.id + '-' + column.columnKey
                        }
                      }, col.filterComponentProps));
                    };
                  }
                }
                break;
              }
            case 'boolean':
              {
                var _selectOptions3 = [{ value: true, label: _this3.props.intl.formatMessage({ id: 'Yes' }) }, { value: false, label: _this3.props.intl.formatMessage({ id: 'No' }) }];
                columnFilterFunction.filterMatcher = function (val, filterVal) {
                  return val === filterVal;
                };
                if (_this3.props.inlineEdit) {
                  if (!column.cellEdit) {
                    column.cellEdit = function (rowIndex) {
                      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_19__floating_select_floating_select_component__["a" /* default */], _extends({
                        name: col.valueKeyPath.join() + '-edit-' + rowIndex,
                        options: _selectOptions3,
                        value: _this3.getEditItemValue(rowIndex, col),
                        onChange: function onChange(selectedData) {
                          return _this3.onEditCellValueChange(rowIndex, col, selectedData && editValueParser(selectedData.value));
                        },
                        onBlur: function onBlur() {
                          return _this3.onEditCellBlur(rowIndex, col, _this3.getEditItemValue(rowIndex, col));
                        },
                        searchable: false,
                        clearable: false,
                        backspaceRemoves: false,
                        inputProps: {
                          id: 'ocDatagridEditInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                        }
                      }, col.editComponentProps, {
                        disabled: _this3.getComponentDisabledState(rowIndex, col, 'edit'),
                        tabIndex: tabIndex
                      }));
                    };
                  }
                  if (!column.cellCreate) {
                    column.cellCreate = function (rowIndex) {
                      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_19__floating_select_floating_select_component__["a" /* default */], _extends({
                        name: col.valueKeyPath.join() + '-create-' + rowIndex,
                        options: _selectOptions3,
                        value: _this3.getCreateItemValue(rowIndex, col),
                        onChange: function onChange(selectedData) {
                          return _this3.onCreateCellValueChange(rowIndex, col, selectedData && editValueParser(selectedData.value));
                        },
                        onBlur: function onBlur() {
                          return _this3.onCreateCellBlur(rowIndex, col, _this3.getEditItemValue(rowIndex, col));
                        },
                        searchable: false,
                        clearable: false,
                        backspaceRemoves: false,
                        inputProps: {
                          id: 'ocDatagridCreateInput-' + _this3.props.id + '-' + column.columnKey + '-' + rowIndex
                        }
                      }, col.createComponentProps, {
                        disabled: _this3.getComponentDisabledState(rowIndex, col, 'create'),
                        tabIndex: tabIndex
                      }));
                    };
                  }
                }
                if (_this3.props.filtering) {
                  if (!column.cellFilter) {
                    column.cellFilter = function () {
                      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_19__floating_select_floating_select_component__["a" /* default */], _extends({
                        name: col.valueKeyPath.join() + '-filter',
                        options: _selectOptions3,
                        value: _this3.getFilterItemValue(col.valueKeyPath),
                        onChange: function onChange(selectedData) {
                          return _this3.onFilterCellValueChange(col.valueKeyPath, selectedData && editValueParser(selectedData.value));
                        },
                        searchable: false,
                        clearable: true,
                        inputProps: {
                          id: 'ocDatagridFilterInput-' + _this3.props.id + '-' + column.columnKey
                        }
                      }, col.filterComponentProps, {
                        tabIndex: tabIndex
                      }));
                    };
                  }
                }
                break;
              }
            default:
          }
        }
        // Column sorting functions
        if (col.valueType && (col.sortValueGetter || col.valueKeyPath) && !col.disableSorting) {
          column.isSortable = true;
          if (col.sortComparator) {
            column.sortComparator = col.sortComparator;
          } else {
            switch (col.valueType) {
              case 'text':
                column.sortComparator = function (a, b) {
                  return a && a.localeCompare ? a.localeCompare(b) : 1;
                };
                break;
              case 'number':
                column.sortComparator = function (a, b) {
                  return a === b ? 0 : a < b ? -1 : 1;
                };
                break;
              case 'float':
                column.sortComparator = function (a, b) {
                  return a === b ? 0 : a < b ? -1 : 1;
                };
                break;
              case 'boolean':
                column.sortComparator = function (a, b) {
                  return a === b ? 0 : a ? -1 : 1;
                };
                break;
              case 'date':
                column.sortComparator = function (a, b) {
                  return new Date(b) - new Date(a);
                };
                break;
              default:
                column.sortComparator = function (a, b) {
                  return a && a.localeCompare ? a.localeCompare(b) : 1;
                };
            }
          }
          if (col.sortValueGetter) {
            column.sortValueGetter = col.sortValueGetter;
          } else {
            column.sortValueGetter = function (data) {
              return data.getIn(col.valueKeyPath);
            };
          }
        }
        columns.push(column);
        if (col.valueKeyPath) {
          _this3.columnFilterFunctions[col.valueKeyPath.join('/')] = columnFilterFunction;
        }
      });
      return columns;
    }
  }, {
    key: '__isCellEdited__REACT_HOT_LOADER__',


    // checker for selectionCheckbox
    value: function __isCellEdited__REACT_HOT_LOADER__() {
      return this.__isCellEdited__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__isCellEdited__REACT_HOT_LOADER__',
    value: function __isCellEdited__REACT_HOT_LOADER__() {
      return this.__isCellEdited__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__isCellEdited__REACT_HOT_LOADER__',
    value: function __isCellEdited__REACT_HOT_LOADER__() {
      return this.__isCellEdited__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__isCellEdited__REACT_HOT_LOADER__',
    value: function __isCellEdited__REACT_HOT_LOADER__(rowIndex, col, cellType) {
      if (cellType !== 'edit') {
        return false;
      }
      var id = this.getDataIdByRowIndex(rowIndex);
      if (this.props.editData.getIn([id].concat(_toConsumableArray(col.valueKeyPath)))) {
        return true;
      }
      return false;
    }
  }, {
    key: 'isSelectionCheckbox',
    value: function isSelectionCheckbox(cellProps) {
      var expectedColumnKey = 'selectionCheckbox';
      return this.props.rowSelectCheckboxColumn && cellProps.columnKey === expectedColumnKey;
    }
  }, {
    key: 'renderCell',
    value: function renderCell(col, cellProps) {
      var _props2 = this.props,
          isCreating = _props2.isCreating,
          isEditing = _props2.isEditing,
          isFiltering = _props2.isFiltering,
          createData = _props2.createData;

      var rowIndex = cellProps.rowIndex,
          props = _objectWithoutProperties(cellProps, ['rowIndex']);

      var style = {};
      var isCheckbox = this.isSelectionCheckbox(cellProps);
      var cell = void 0;
      var cellType = 'view';
      var extraRowCount = 0; // how many rows to ignore from top, new + filter rows
      if (isCreating) extraRowCount = createData.size;
      if (isFiltering) extraRowCount += 1;
      if (col.align && col.align === 'right') style.textAlign = 'right';
      if (col.align && col.align === 'center') style.textAlign = 'center';
      if (isFiltering && rowIndex === 0) {
        cell = col.cellFilter();
        cellType = 'filter';
      } else {
        if (isCreating) {
          if (rowIndex <= extraRowCount - 1) {
            if (col.cellCreate) {
              var realIndex = isFiltering ? rowIndex - 1 : rowIndex;
              cell = col.cellCreate(realIndex);
              cellType = 'create';
            } else {
              cell = null;
              cellType = null;
            }
          } else {
            cell = col.cell(rowIndex - extraRowCount);
          }
        } else if (isEditing && col.cellEdit) {
          cell = col.cellEdit(rowIndex - extraRowCount);
          cellType = 'edit';
        } else {
          cell = col.cell(rowIndex - extraRowCount);
        }
      }

      if ((cellType === 'view' || cellType === 'edit' || cellType === 'create') && !isCheckbox) {
        var getRowIndex = cellType === 'create' ? rowIndex : rowIndex - extraRowCount;
        var messageData = this.getCellMessages(getRowIndex, col, cellType);
        var isEdited = this.isCellEdited(getRowIndex, col, cellType);
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_6_fixed_data_table_2__["Cell"],
          _extends({}, props, { className: 'oc-datagrid-cell', style: style }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_21__cell_tooltip_component__["a" /* default */],
            {
              id: cellType + col.columnKey + (rowIndex - extraRowCount),
              isEdited: isEdited,
              isError: !!messageData.errorMessageId,
              isWarning: !!messageData.warningMessageId,
              errorMessageId: messageData.errorMessageId,
              errorMessageValues: messageData.errorMessageValues,
              warningMessageId: messageData.warningMessageId,
              warningMessageValues: messageData.warningMessageValues
            },
            cell
          )
        );
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_6_fixed_data_table_2__["Cell"],
        _extends({}, props, { className: 'oc-datagrid-cell', style: style }),
        cell
      );
    }
  }, {
    key: '__renderColumns__REACT_HOT_LOADER__',
    value: function __renderColumns__REACT_HOT_LOADER__() {
      return this.__renderColumns__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__renderColumns__REACT_HOT_LOADER__',
    value: function __renderColumns__REACT_HOT_LOADER__() {
      return this.__renderColumns__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__renderColumns__REACT_HOT_LOADER__',
    value: function __renderColumns__REACT_HOT_LOADER__() {
      return this.__renderColumns__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__renderColumns__REACT_HOT_LOADER__',
    value: function __renderColumns__REACT_HOT_LOADER__() {
      var _this4 = this;

      var columns = this.generateColumns();
      return columns.map(function (col) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_fixed_data_table_2__["Column"], {
          key: col.columnKey,
          columnKey: col.columnKey,
          header: col.isSortable ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_13__sort_header_cell_component__["a" /* default */],
            {
              gridId: _this4.props.id,
              columnKey: col.columnKey,
              sortOrder: col.columnKey === _this4.props.sortColumn ? _this4.props.sortOrder : '',
              onSortChange: _this4.props.sort,
              sortValueGetter: col.sortValueGetter,
              sortComparator: col.sortComparator
            },
            col.header
          ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6_fixed_data_table_2__["Cell"],
            { className: 'oc-datagrid-cell-header' },
            col.header
          ),
          cell: function cell(cellProps) {
            return _this4.renderCell(col, cellProps);
          },
          width: _this4.props.columnWidths.get(col.columnKey, col.width),
          isResizable: col.isResizable,
          flexGrow: col.flexGrow ? col.flexGrow : 0,
          fixed: col.fixed,
          allowCellsRecycling: col.allowCellsRecycling
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var gridClassName = __WEBPACK_IMPORTED_MODULE_8_classnames___default()({
        'oc-datagrid-container': true,
        'with-actionbar': this.props.inlineEdit && !this.props.disableActionBar,
        'is-busy': this.props.isBusy,
        'is-editing': this.props.isEditing,
        'is-creating': this.props.isCreating,
        'is-filtering': this.props.isFiltering
      });
      var actionBar = null;
      var actionBarRight = null;
      var actionBarLeft = null;
      if ((this.props.actionBar || this.props.inlineEdit || this.props.filtering || this.props.removing) && !this.props.disableActionBar) {
        actionBarRight = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_14__action_bar_component__["a" /* default */],
          { position: 'right' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'oc-datagrid-actionbar-right' },
            this.props.actionBar
          ),
          this.props.filtering && this.props.disableDropdown && !this.props.disableFilteringControls && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_16__filtering_controls_component__["a" /* default */], this.props),
          this.props.inlineEdit && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15__inline_edit_controls_component__["a" /* default */], _extends({
            columnDefaultValues: this.columnDefaultValues,
            firstInvalidInput: this.refFirstInvalidInput
          }, this.props)),
          (this.props.dropdownMenuItems || this.props.removing || this.props.filtering && !this.props.disableDropdown) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_17__dropdown_controls_component__["a" /* default */], this.props)
        );
      }
      if (this.props.actionBarLeft || this.props.gridHeader) {
        actionBarLeft = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_14__action_bar_component__["a" /* default */],
          { position: 'left' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'oc-datagrid-gridheader' },
            this.props.gridHeader
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'oc-datagrid-actionbar-left' },
            this.props.actionBarLeft
          )
        );
      }
      if (actionBarLeft || actionBarRight) {
        actionBar = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'oc-datagrid-actionbar-container' },
          actionBarLeft,
          actionBarRight
        );
      }
      var rowsCount = this.props.rowsCount || this.props.rowsCount === 0 ? this.props.rowsCount : this.props.data.size;
      if (this.props.isCreating) rowsCount += this.props.createData.size;
      if (this.props.isFiltering) rowsCount += 1;
      var scrollToRow = this.props.scrollToRow || this.state.currentRow;
      if (!scrollToRow && this.props.selectedItems.size > 0) {
        scrollToRow = this.getSelectedItemIndex(this.props.selectedItems.first());
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          id: 'oc-datagrid-' + this.props.id,
          className: gridClassName,
          style: this.props.containerStyle
        },
        this.props.isBusy && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_23__spinner__["a" /* Spinner */], null),
        actionBar,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_12__responsive_fixed_data_table_component__["a" /* default */],
          {
            id: this.props.id,
            rowsCount: rowsCount,
            headerHeight: this.props.headerHeight,
            rowHeight: this.props.rowHeight,
            onColumnResizeEndCallback: this.onColumnResizeEndCallback,
            isColumnResizing: false,
            onRowClick: function onRowClick(e, rowIndex) {
              var realRowIndex = rowIndex;
              if (_this5.props.isFiltering) {
                if (rowIndex === 0) {
                  return false;
                }
                realRowIndex -= 1;
              }
              if (_this5.props.rowSelect && !_this5.props.isCreating && !_this5.props.isEditing) {
                if (e.ctrlKey || e.shiftKey) {
                  document.getSelection().removeAllRanges();
                }

                // don't trigger selection change if it's checkbox column that is clicked.
                if (e.target.type !== 'checkbox') {
                  _this5.props.itemSelectionChange(_this5.props.id, realRowIndex, _this5.props.idKeyPath, _this5.props.multiSelect && e.ctrlKey, _this5.props.multiSelect && e.shiftKey);
                }
              }
              if (_this5.props.onRowClick) {
                _this5.props.onRowClick(e, realRowIndex, _this5.props.data.get(realRowIndex));
              }
              return true;
            },
            scrollToColumn: this.props.scrollToColumn || this.state.currentColumn,
            scrollTop: this.props.scrollTop,
            scrollToRow: scrollToRow,
            onRowDoubleClick: this.props.onRowDoubleClick,
            onRowMouseDown: this.props.onRowMouseDown,
            onRowMouseEnter: this.props.onRowMouseEnter,
            onRowMouseLeave: this.props.onRowMouseLeave,
            onScrollStart: this.props.onScrollStart,
            onScrollEnd: this.props.onScrollEnd,
            rowClassNameGetter: this.getRowClassName,
            rowHeightGetter: this.props.rowHeightGetter,
            onContentHeightChange: this.props.onContentHeightChange
          },
          !this.props.allDataSize && !this.props.isBusy && !this.props.isCreating ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_fixed_data_table_2__["Column"], {
            columnKey: 'dataEmptyColumn',
            header: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_6_fixed_data_table_2__["Cell"],
              { style: { textAlign: 'center' } },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_intl__["FormattedMessage"], { id: 'GridNoItems' })
            ),
            width: 10,
            isResizable: false,
            flexGrow: 1
          }) : this.renderColumns()
        ),
        this.props.children
      );
    }
  }]);

  return DataGrid;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _class2.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  // App props
  intl: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  // Action props
  addNewItem: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  create: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  edit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  remove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  save: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  cancel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  sort: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  resizeColumn: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  invalidate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  itemSelectionChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  toggleFiltering: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  editCellValueChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  createCellValueChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  filterCellValueChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  editCellValueValidate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  createCellValueValidate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  validateEditedRows: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  validateCreatedRows: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  // State props
  isBusy: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isEditing: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isCreating: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isFiltering: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  sortColumn: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number]),
  sortOrder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  columnWidths: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.mapOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired),
  selectedItems: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.list.isRequired,
  data: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.list.isRequired,
  editData: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.map.isRequired,
  createData: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.list.isRequired,
  filterData: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.map.isRequired,
  cellMessages: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.map.isRequired,
  createCellMessages: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.map.isRequired,
  userLanguage: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  thousandSeparator: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  decimalSeparator: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  allDataSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  // Required component properties
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  columns: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    header: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
    columnKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, // Use valueKeyPath if possible, this is calculated from there
    valueKeyPath: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array, // key path for the cell data value, required if no columnKey is given
    valueType: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, // data value type [text/number/float/boolean/date]
    componentType: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, // edit component type [text/number/float/select/boolean/date]
    valueRender: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // custom renderer for the value, data as parameter
    editValueRender: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // custom renderer for the edit value, data as parameter
    createValueRender: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // custom renderer for the create value, data as parameter
    filterValueRender: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // custom renderer for the filter value, data as parameter
    cell: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // override cell renderer, rowIndex as parameter
    cellEdit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // override cellEdit renderer, rowIndex as parameter
    cellCreate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // override cellCreate renderer, rowIndex as parameter
    cellFilter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // override cellFilter renderer, rowIndex as parameter
    renderComponentProps: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object, // additional props to the render component
    editComponentProps: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object, // additional props to the edit component
    createComponentProps: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object, // additional props to the create component
    filterComponentProps: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object, // additional props to the filter component
    width: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    align: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, // vertical cell alignment, defaults to 'left'
    fixed: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, // is column fixed
    allowCellsRecycling: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, // allow cells to be recycled for better horizontal scrolling perf
    disableResizing: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, // disable column resizing
    disableEditing: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, // disable input component (make read-only) when editing/creating
    disableSorting: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, // disable filtering on this column
    disableEditingOnValueMatch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({ // disable editing/creating input when other columns value match
      matchValueKeyPath: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
      matchValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
    }),
    onValueMatchChangeValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({ // Change other column value when data matches
      matchValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      newValueKeyPath: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
      newValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
    }),
    flexGrow: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    sortValueGetter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // override sort value getter, defaults to getIn(valueKeyPath)
    sortComparator: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // override sort comparator function, default sorts by valueType
    defaultValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any, // default value for the column when creating new item
    onEditValueChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // callback with (value, valueKeyPath, rowIndex, dataId)
    onCreateValueChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // callbac with (value, valueKeyPath, rowIndex)
    onCreateBlur: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, // callback with (value, rowIndex)
    onEditBlur: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func // callback with (value, rowIndex, dataId)
  }).isRequired).isRequired,
  // Optional component properties
  rowsCount: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  idKeyPath: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string), // keyPath to id data
  gridHeader: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  actionBar: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  actionBarLeft: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  disableDropdown: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, // Don't use dropdown menu in the action bar
  disableFilteringControls: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, // Don't display the filtering controls (only valid if disableDropdown is true)
  dropdownMenuItems: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  inlineEdit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  inlineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  filtering: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  removing: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  rowSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  rowSelectCheckboxColumn: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  multiSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  selectComponentOptions: __WEBPACK_IMPORTED_MODULE_2_react_immutable_proptypes___default.a.mapOf( // Options data for the react-select components
  __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool]).isRequired,
    label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]).isRequired
  }))),
  disableActions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, // Disable actions in the action bar
  disableActionsMessage: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    messageId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    messageValues: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({})
  }),
  disableActionBar: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  disableActionSave: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  enableArrowNavigation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onSave: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onCancel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onAddClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onEditClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  tabIndex: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, // tabIndex value for inputs in cells
  // Fixed data table built-in features
  headerHeight: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  rowHeight: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  containerStyle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  scrollToColumn: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  scrollTop: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  scrollToRow: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  onRowClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onRowDoubleClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onRowMouseDown: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onRowMouseEnter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onRowMouseLeave: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onScrollStart: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onScrollEnd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  rowClassNameGetter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  rowHeightGetter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onContentHeightChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
}, _class2.defaultProps = {
  children: undefined,
  containerStyle: {},
  disableActionSave: false,
  enableArrowNavigation: false,
  headerHeight: 40,
  rowHeight: 40,
  onSave: function onSave() {},
  onRemove: function onRemove() {},
  onCancel: function onCancel() {},
  tabIndex: 1,
  disableFilteringControls: false
}, _temp)) || _class) || _class);

;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/home/ilkka/data/react-grid/src/datagrid/datagrid.component.jsx');

  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/home/ilkka/data/react-grid/src/datagrid/datagrid.component.jsx');

  __REACT_HOT_LOADER__.register(DataGrid, 'DataGrid', '/home/ilkka/data/react-grid/src/datagrid/datagrid.component.jsx');
}();

;

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return INITIAL_STATE; });
/* eslint-disable import/prefer-default-export */


var INITIAL_STATE = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"])();
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(INITIAL_STATE, 'INITIAL_STATE', '/home/ilkka/data/react-grid/src/datagrid/datagrid.constants.js');
}();

;

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__datagrid_constants__ = __webpack_require__(20);
/* harmony export (immutable) */ __webpack_exports__["a"] = datagridReducer;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }





/* TODO: Keep some data in session/local
const getSessionData = (id) => {
  const data = sessionStorage.getItem(`grid_${id}`);
  if (data) {
    return Immutable.fromJS(JSON.parse(data));
  }
  return Map();
};

const setSessionData = (id, data) => {
  sessionStorage.setItem(`grid_${id}`, JSON.stringify(data));
}; */

function datagridReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __WEBPACK_IMPORTED_MODULE_2__datagrid_constants__["a" /* INITIAL_STATE */];
  var action = arguments[1];

  switch (action.type) {

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_INVALIDATE:
      return state.deleteIn([action.id, 'data']).deleteIn([action.id, 'allData']).deleteIn([action.id, 'filterData']).deleteIn([action.id, 'createData']).deleteIn([action.id, 'editData']).deleteIn([action.id, 'createValidation']).deleteIn([action.id, 'cellMessages']).deleteIn([action.id, 'session']);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_SET_DATA:
      {
        var data = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.Iterable.isIterable(action.data) ? action.data : __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS(action.data);
        return state.setIn([action.id, 'data'], data).setIn([action.id, 'allData'], data).mergeIn([action.id, 'session'], {
          isEditing: false,
          isCreating: false,
          isFiltering: false,
          isBusy: false
        }).deleteIn([action.id, 'filterData']).deleteIn([action.id, 'editData']).deleteIn([action.id, 'createData']).deleteIn([action.id, 'createValidation']).deleteIn([action.id, 'cellMessages']);
      }
    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_BUSY:
      return state.setIn([action.id, 'session', 'isBusy'], true);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_READY:
      return state.setIn([action.id, 'session', 'isBusy'], false);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_SORT_COLUMN:
      return state.setIn([action.id, 'data'], action.data).setIn([action.id, 'allData'], action.allData).mergeIn([action.id, 'user'], {
        sortColumn: action.column,
        sortOrder: action.order
      });

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_RESIZE_COLUMN:
      return state.setIn([action.id, 'user', 'columnWidths', action.column], action.width);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_EDIT:
      return state.setIn([action.id, 'session', 'isEditing'], true);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_CREATE:
      return state.setIn([action.id, 'createData'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["List"])([__WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS(action.columnDefaultValues)])).mergeIn([action.id, 'session'], {
        isCreating: true
      });

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_ADD_NEW_ITEM:
      return state.updateIn([action.id, 'createData'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["List"])(), function (items) {
        return items.push(__WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS(action.columnDefaultValues));
      });

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_CANCEL:
      return state.mergeIn([action.id, 'session'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"])({
        isEditing: false,
        isCreating: false
      })).deleteIn([action.id, 'editData']).deleteIn([action.id, 'createData']).deleteIn([action.id, 'createValidation']).deleteIn([action.id, 'cellMessages', 'error']);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_SAVE:
      return state.setIn([action.id, 'session', 'isBusy'], true);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_SAVE_SUCCESS:
      {
        var allData = state.getIn([action.id, 'allData']);
        action.savedItems.forEach(function (savedItemJS) {
          var savedItem = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS(savedItemJS);
          var foundIndex = allData.findIndex(function (d) {
            return d.getIn(action.idKeyPath) === savedItem.getIn(action.idKeyPath);
          });
          if (foundIndex === -1) {
            allData = allData.push(savedItem);
          } else {
            allData = allData.mergeDeepIn([foundIndex], savedItem);
          }
        });
        return state.setIn([action.id, 'data'], allData).setIn([action.id, 'allData'], allData).mergeIn([action.id, 'session'], {
          isBusy: false,
          isEditing: false,
          isCreating: false
        }).deleteIn([action.id, 'editData']).deleteIn([action.id, 'createData']).deleteIn([action.id, 'createValidation']).deleteIn([action.id, 'cellMessages', 'error']);
      }

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_SAVE_PARTIAL_SUCCESS:
      {
        var _allData = state.getIn([action.id, 'allData']);
        var createData = state.getIn([action.id, 'createData']);
        var editData = state.getIn([action.id, 'editData']);
        var isCreating = state.getIn([action.id, 'session', 'isCreating']);
        action.savedItems.forEach(function (savedItemJS) {
          var savedItem = __WEBPACK_IMPORTED_MODULE_0_immutable___default.a.fromJS(savedItemJS);
          var foundIndex = _allData.findIndex(function (d) {
            return d.getIn(action.idKeyPath) === savedItem.getIn(action.idKeyPath);
          });
          if (foundIndex === -1) {
            _allData = _allData.push(savedItem);
          } else {
            _allData = _allData.mergeDeepIn([foundIndex], savedItem);
          }
          if (isCreating) {
            foundIndex = savedItem.get('rowIndex');
            if (foundIndex !== undefined && foundIndex !== null) {
              createData = createData.delete(foundIndex);
            }
          } else {
            editData = editData.delete(savedItem.getIn(action.idKeyPath));
          }
        });
        return state.setIn([action.id, 'data'], _allData).setIn([action.id, 'allData'], _allData).setIn([action.id, 'createData'], createData).setIn([action.id, 'editData'], editData).setIn([action.id, 'session', 'isBusy'], false);
      }

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_SAVE_FAIL:
      return state.setIn([action.id, 'session', 'isBusy'], false);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_REMOVE:
      return state.setIn([action.id, 'session', 'isBusy'], true);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_REMOVE_SUCCESS:
      return state.setIn([action.id, 'session', 'isBusy'], false).updateIn([action.id, 'data'], function (data) {
        return data.filterNot(function (item) {
          return action.removedIds.indexOf(item.getIn(action.idKeyPath)) > -1;
        });
      }).updateIn([action.id, 'allData'], function (data) {
        return data.filterNot(function (item) {
          return action.removedIds.indexOf(item.getIn(action.idKeyPath)) > -1;
        });
      }).deleteIn([action.id, 'selectedItems']);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_REMOVE_FAIL:
      return state.setIn([action.id, 'session', 'isBusy'], false);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_EDIT_CELL_VALUE_CHANGE:
      return state.setIn([action.id, 'editData', action.dataId].concat(_toConsumableArray(action.keyPath)), action.value);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_CREATE_CELL_VALUE_CHANGE:
      return state.setIn([action.id, 'createData', action.rowIndex].concat(_toConsumableArray(action.keyPath)), action.value);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_CELL_SHOW_MESSAGE:
      return state.setIn([action.id, 'cellMessages', action.messageType, action.dataId].concat(_toConsumableArray(action.keyPath)), { id: action.messageId, values: action.messageValues });

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_CELL_HIDE_MESSAGE:
      {
        if (action.messageType === null) {
          return state.deleteIn([action.id, 'cellMessages']);
        }
        if (action.dataId === null) {
          return state.deleteIn([action.id, 'cellMessages', action.messageType]);
        }
        var rowMessage = state.getIn([action.id, 'cellMessages', action.messageType, action.dataId]);
        if (rowMessage) {
          if (action.keyPath) {
            rowMessage = rowMessage.deleteIn(action.keyPath);
          }
          if (rowMessage.size === 0 || !action.keyPath) {
            return state.deleteIn([action.id, 'cellMessages', action.messageType, action.dataId]);
          }
          return state.setIn([action.id, 'cellMessages', action.messageType, action.dataId], rowMessage);
        }
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_CREATE_CELL_SHOW_MESSAGE:
      return state.setIn([action.id, 'createCellMessages', action.messageType, action.rowIndex].concat(_toConsumableArray(action.keyPath)), { id: action.messageId, values: action.messageValues });

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_CREATE_CELL_HIDE_MESSAGE:
      {
        if (action.messageType === null) {
          return state.deleteIn([action.id, 'createCellMessages']);
        }
        if (action.rowIndex === null) {
          return state.deleteIn([action.id, 'createCellMessages', action.messageType]);
        }
        var _rowMessage = state.getIn([action.id, 'createCellMessages', action.messageType, action.rowIndex]);
        if (_rowMessage) {
          if (action.keyPath) {
            _rowMessage = _rowMessage.deleteIn(action.keyPath);
          }
          if (_rowMessage.size === 0 || !action.keyPath) {
            return state.deleteIn([action.id, 'createCellMessages', action.messageType, action.rowIndex]);
          }
          return state.setIn([action.id, 'createCellMessages', action.messageType, action.rowIndex], _rowMessage);
        }
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_ITEM_SELECTION_CHANGE:
      {
        var newState = state.setIn([action.id, 'session', 'lastClickedRowIndex'], action.rowIndex);

        // Handle case where shift key is pressed
        // Select all rows from lastClickedRow to currently clicked row
        if (action.shiftPressed) {
          var lastRowIndex = state.getIn([action.id, 'session', 'lastClickedRowIndex'], false);
          if (lastRowIndex !== false) {
            var selectRowIds = [];
            if (lastRowIndex < action.rowIndex) {
              for (var i = lastRowIndex; i <= action.rowIndex; i += 1) {
                var _dataId = state.getIn([action.id, 'data', i].concat(_toConsumableArray(action.idKeyPath)));
                if (_dataId) {
                  selectRowIds.push(_dataId);
                }
              }
            } else {
              for (var _i = action.rowIndex; _i <= lastRowIndex; _i += 1) {
                var _dataId2 = state.getIn([action.id, 'data', _i].concat(_toConsumableArray(action.idKeyPath)));
                if (_dataId2) {
                  selectRowIds.push(_dataId2);
                }
              }
            }
            return newState.setIn([action.id, 'selectedItems'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["List"])(selectRowIds));
          }
        }

        var dataId = state.getIn([action.id, 'data', action.rowIndex].concat(_toConsumableArray(action.idKeyPath)));
        var foundIndex = state.getIn([action.id, 'selectedItems'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["List"])()).indexOf(dataId);
        if (foundIndex === -1) {
          if (action.ctrlPressed) {
            return newState.updateIn([action.id, 'selectedItems'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["List"])(), function (items) {
              return items.push(dataId);
            });
          }
          return newState.setIn([action.id, 'selectedItems'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["List"])([dataId]));
        }
        if (action.ctrlPressed) {
          return newState.updateIn([action.id, 'selectedItems'], function (items) {
            return items.delete(foundIndex);
          });
        }
        return newState.setIn([action.id, 'selectedItems'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["List"])([dataId]));
      }

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_SELECT_ALL_ITEMS_CHANGE:
      if (state.getIn([action.id, 'selectedItems'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["List"])()).size === state.getIn([action.id, 'data'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["List"])()).size) {
        return state.deleteIn([action.id, 'selectedItems']);
      }
      return state.setIn([action.id, 'selectedItems'], state.getIn([action.id, 'data'], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_immutable__["List"])()).map(function (item) {
        return item.getIn(action.idKeyPath);
      }));

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_CLEAR_SELECTED_ITEMS:
      return state.deleteIn([action.id, 'selectedItems']);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_TOGGLE_FILTERING:
      {
        var isFiltering = state.getIn([action.id, 'session', 'isFiltering'], false);
        if (isFiltering) {
          return state.setIn([action.id, 'session', 'isFiltering'], false).setIn([action.id, 'data'], state.getIn([action.id, 'allData'])).deleteIn([action.id, 'filterData']);
        }
        return state.setIn([action.id, 'session', 'isFiltering'], true);
      }

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_FILTER_CELL_VALUE_CHANGE:
      return state.setIn([action.id, 'filterData'], action.filterData).setIn([action.id, 'data'], action.data);

    case __WEBPACK_IMPORTED_MODULE_1__datagrid_actions__["TYPES"].PLATFORM_DATAGRID_UPDATE_EXISTING_CELL_VALUE:
      {
        var _newState = state.setIn([action.id, 'allData', action.dataId].concat(_toConsumableArray(action.keyPath)), action.value);
        if (state.hasIn([action.id, 'data', action.dataId].concat(_toConsumableArray(action.keyPath)))) {
          return _newState.setIn([action.id, 'data', action.dataId].concat(_toConsumableArray(action.keyPath)), action.value);
        }
        return _newState;
      }

    default:
      return state;
  }
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(datagridReducer, 'datagridReducer', '/home/ilkka/data/react-grid/src/datagrid/datagrid.reducer.js');
}();

;

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_intl__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_day_picker__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_day_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_day_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_day_picker_moment__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_day_picker_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_day_picker_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_tether__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_tether___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_tether__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_day_picker_lib_style_css__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_day_picker_lib_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_day_picker_lib_style_css__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatePicker; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/forbid-prop-types */









var DatePicker = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_intl__["injectIntl"])(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

    _this.handleContainerMouseDown = function () {
      return _this.__handleContainerMouseDown__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleInputFocus = function () {
      return _this.__handleInputFocus__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleInputBlur = function () {
      return _this.__handleInputBlur__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleInputChange = function () {
      return _this.__handleInputChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleDayClick = function () {
      return _this.__handleDayClick__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    var state = {
      showOverlay: false,
      selectedDay: null
    };
    if (props.value !== '' && /^\d{1,2}[.\-/]{1}\d{1,2}[.\-/]{1}\d{4}$/.test(props.value)) {
      var momentDay = __WEBPACK_IMPORTED_MODULE_3_moment___default.a.utc(props.value, props.dateFormat);
      if (momentDay.isValid()) {
        state.selectedDay = momentDay.toDate();
      }
    }
    _this.state = state;
    _this.localeUtils = Object.assign(__WEBPACK_IMPORTED_MODULE_5_react_day_picker_moment___default.a, { getFirstDayOfWeek: function getFirstDayOfWeek() {
        return __WEBPACK_IMPORTED_MODULE_3_moment___default.a.localeData().firstDayOfWeek();
      } });
    _this.input = null;
    _this.daypicker = null;
    _this.clickedInside = false;
    _this.clickTimeout = null;
    return _this;
  }

  _createClass(DatePicker, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.clickTimeout);
    }
  }, {
    key: '__handleContainerMouseDown__REACT_HOT_LOADER__',
    value: function __handleContainerMouseDown__REACT_HOT_LOADER__() {
      return this.__handleContainerMouseDown__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleContainerMouseDown__REACT_HOT_LOADER__',
    value: function __handleContainerMouseDown__REACT_HOT_LOADER__() {
      return this.__handleContainerMouseDown__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleContainerMouseDown__REACT_HOT_LOADER__',
    value: function __handleContainerMouseDown__REACT_HOT_LOADER__() {
      var _this2 = this;

      this.clickedInside = true;
      // The input's onBlur method is called from a queue right after onMouseDown event.
      // setTimeout adds another callback in the queue, but is called later than onBlur event
      this.clickTimeout = setTimeout(function () {
        _this2.clickedInside = false;
      }, 0);
    }
  }, {
    key: '__handleInputFocus__REACT_HOT_LOADER__',
    value: function __handleInputFocus__REACT_HOT_LOADER__() {
      return this.__handleInputFocus__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleInputFocus__REACT_HOT_LOADER__',
    value: function __handleInputFocus__REACT_HOT_LOADER__() {
      return this.__handleInputFocus__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleInputFocus__REACT_HOT_LOADER__',
    value: function __handleInputFocus__REACT_HOT_LOADER__() {
      this.setState({
        showOverlay: true
      });
    }
  }, {
    key: '__handleInputBlur__REACT_HOT_LOADER__',
    value: function __handleInputBlur__REACT_HOT_LOADER__() {
      return this.__handleInputBlur__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleInputBlur__REACT_HOT_LOADER__',
    value: function __handleInputBlur__REACT_HOT_LOADER__() {
      return this.__handleInputBlur__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleInputBlur__REACT_HOT_LOADER__',
    value: function __handleInputBlur__REACT_HOT_LOADER__() {
      var showOverlay = this.clickedInside;

      this.setState({
        showOverlay: showOverlay
      });

      // Force input's focus if blur event was caused by clicking on the calendar
      if (showOverlay) {
        this.input.focus();
      }
    }
  }, {
    key: '__handleInputChange__REACT_HOT_LOADER__',
    value: function __handleInputChange__REACT_HOT_LOADER__() {
      return this.__handleInputChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleInputChange__REACT_HOT_LOADER__',
    value: function __handleInputChange__REACT_HOT_LOADER__() {
      return this.__handleInputChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleInputChange__REACT_HOT_LOADER__',
    value: function __handleInputChange__REACT_HOT_LOADER__(e) {
      var _this3 = this;

      var value = e.target.value;

      // Remove invisble LRM chars from datestring

      if (value.replace) {
        value = value.replace(/\u200E/g, '');
      }

      if (value === '') {
        this.setState({
          selectedDay: null
        });
        this.props.onChange(null);
        return;
      }
      this.props.onChange(value);

      var momentDay = __WEBPACK_IMPORTED_MODULE_3_moment___default.a.utc(value, this.props.dateFormat);
      if (/^\d{1,2}[.\-/]{1}\d{1,2}[.\-/]{1}\d{4}$/.test(value) && momentDay.isValid()) {
        this.setState({
          selectedDay: momentDay.toDate()
        }, function () {
          _this3.daypicker.showMonth(_this3.state.selectedDay);
        });
      }
    }
  }, {
    key: '__handleDayClick__REACT_HOT_LOADER__',
    value: function __handleDayClick__REACT_HOT_LOADER__() {
      return this.__handleDayClick__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleDayClick__REACT_HOT_LOADER__',
    value: function __handleDayClick__REACT_HOT_LOADER__() {
      return this.__handleDayClick__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleDayClick__REACT_HOT_LOADER__',
    value: function __handleDayClick__REACT_HOT_LOADER__(e, day) {
      this.setState({
        selectedDay: day,
        showOverlay: false
      });
      // Remove invisble LRM chars from datestring
      this.props.onChange(this.props.intl.formatDate(__WEBPACK_IMPORTED_MODULE_3_moment___default.a.utc(day).format()).replace(/\u200E/g, ''));
      this.input.blur();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      /* eslint-disable no-unused-vars */
      var _props = this.props,
          language = _props.language,
          dateFormat = _props.dateFormat,
          value = _props.value,
          onChange = _props.onChange,
          intl = _props.intl,
          inputProps = _props.inputProps,
          disabled = _props.disabled,
          otherProps = _objectWithoutProperties(_props, ['language', 'dateFormat', 'value', 'onChange', 'intl', 'inputProps', 'disabled']);

      var overlayStyle = {
        backgroundColor: '#fff',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
      };
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_6_react_tether___default.a,
        {
          attachment: 'top center',
          constraints: [{
            to: 'scrollParent',
            attachment: 'together'
          }]
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["FormGroup"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["FormControl"], _extends({
            type: 'text',
            inputRef: function inputRef(el) {
              _this4.input = el;
            },
            value: value,
            onChange: this.handleInputChange,
            onFocus: this.handleInputFocus,
            onBlur: this.handleInputBlur,
            disabled: disabled
          }, inputProps))
        ),
        this.state.showOverlay && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            style: overlayStyle,
            onMouseDown: this.handleContainerMouseDown
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_day_picker___default.a, _extends({
            ref: function ref(el) {
              _this4.daypicker = el;
            },
            onDayClick: this.handleDayClick,
            selectedDays: function selectedDays(day) {
              return __WEBPACK_IMPORTED_MODULE_4_react_day_picker__["DateUtils"].isSameDay(_this4.state.selectedDay, day);
            },
            localeUtils: this.localeUtils,
            locale: language
          }, otherProps))
        )
      );
    }
  }]);

  return DatePicker;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component), _class2.propTypes = {
  intl: __WEBPACK_IMPORTED_MODULE_2_react_intl__["intlShape"].isRequired,
  value: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
  onChange: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func,
  language: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string.isRequired,
  dateFormat: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
  inputProps: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
  disabled: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.bool
}, _class2.defaultProps = {
  value: '',
  dateFormat: 'L',
  onChange: function onChange() {},

  inputProps: {},
  disabled: false
}, _temp)) || _class;


;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DatePicker, 'DatePicker', '/home/ilkka/data/react-grid/src/datagrid/date-picker/date-picker.component.jsx');
}();

;

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__filtering_controls_component_scss__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__filtering_controls_component_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__filtering_controls_component_scss__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilteringControls; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var FilteringControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(FilteringControls, _React$PureComponent);

  function FilteringControls() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FilteringControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilteringControls.__proto__ || Object.getPrototypeOf(FilteringControls)).call.apply(_ref, [this].concat(args))), _this), _this.toggleFiltering = function () {
      var _this2;

      return (_this2 = _this).__toggleFiltering__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FilteringControls, [{
    key: '__toggleFiltering__REACT_HOT_LOADER__',
    value: function __toggleFiltering__REACT_HOT_LOADER__() {
      return this.__toggleFiltering__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__toggleFiltering__REACT_HOT_LOADER__',
    value: function __toggleFiltering__REACT_HOT_LOADER__() {
      this.props.toggleFiltering(this.props.id);
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'oc-datagrid-filtering-controls' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Checkbox"],
          {
            checked: this.props.isFiltering,
            disabled: this.props.isBusy || this.props.isCreating || this.props.isEditing,
            onClick: this.toggleFiltering,
            inline: true
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], { id: 'ShowFilteringRow' })
        )
      );
    }
  }]);

  return FilteringControls;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _class.propTypes = {
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  isBusy: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isCreating: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isEditing: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isFiltering: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  toggleFiltering: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
}, _class.defaultProps = {
  toggleFiltering: function toggleFiltering() {}
}, _temp2);

;

var _temp3 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FilteringControls, 'FilteringControls', '/home/ilkka/data/react-grid/src/datagrid/filtering-controls.component.jsx');
}();

;

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_select__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tether_component__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__floating_select_component_scss__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__floating_select_component_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__floating_select_component_scss__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FloatingSelect; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-find-dom-node, prefer-rest-params */






// Make react-select to tether over the container component instead of stretching it.
// https://github.com/JedWatson/react-select/issues/810#issuecomment-248546293

var FloatingSelect = function (_Select) {
  _inherits(FloatingSelect, _Select);

  function FloatingSelect(props) {
    _classCallCheck(this, FloatingSelect);

    var _this = _possibleConstructorReturn(this, (FloatingSelect.__proto__ || Object.getPrototypeOf(FloatingSelect)).call(this, props));

    _this.renderOuter = _this.renderOuterOverride;
    return _this;
  }

  _createClass(FloatingSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(FloatingSelect.prototype.__proto__ || Object.getPrototypeOf(FloatingSelect.prototype), 'componentDidMount', this).call(this);

      this.dropdownFieldNode = __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.findDOMNode(this);
    }
  }, {
    key: 'renderOuterOverride',
    value: function renderOuterOverride() {
      var menu = _get(FloatingSelect.prototype.__proto__ || Object.getPrototypeOf(FloatingSelect.prototype), 'renderOuter', this).apply(this, arguments);

      var options = {
        attachment: 'top left',
        targetAttachment: 'bottom left',
        constraints: [{
          to: 'window',
          attachment: 'together'
        }]
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3__tether_component__["a" /* default */],
        {
          target: this.dropdownFieldNode,
          options: options,
          matchWidth: true
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(menu, { style: { position: 'static' } })
      );
    }
  }]);

  return FloatingSelect;
}(__WEBPACK_IMPORTED_MODULE_1_react_select___default.a);


;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FloatingSelect, 'FloatingSelect', '/home/ilkka/data/react-grid/src/datagrid/floating-select/floating-select.component.jsx');
}();

;

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tether__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tether___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_tether__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TetherComponent; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _class2, _temp3;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-multi-comp, react/forbid-prop-types */





var TetheredChildrenComponent = (_temp = _class = function (_React$Component) {
  _inherits(TetheredChildrenComponent, _React$Component);

  function TetheredChildrenComponent() {
    _classCallCheck(this, TetheredChildrenComponent);

    return _possibleConstructorReturn(this, (TetheredChildrenComponent.__proto__ || Object.getPrototypeOf(TetheredChildrenComponent)).apply(this, arguments));
  }

  _createClass(TetheredChildrenComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.position();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.props.position();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return TetheredChildrenComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component), _class.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired,
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
}, _temp);
var TetherComponent = (_temp3 = _class2 = function (_React$Component2) {
  _inherits(TetherComponent, _React$Component2);

  function TetherComponent() {
    var _ref;

    var _temp2, _this2, _ret;

    _classCallCheck(this, TetherComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref = TetherComponent.__proto__ || Object.getPrototypeOf(TetherComponent)).call.apply(_ref, [this].concat(args))), _this2), _this2.position = function () {
      var _this3;

      return (_this3 = _this2).__position__REACT_HOT_LOADER__.apply(_this3, arguments);
    }, _temp2), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(TetherComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.tetherContainer = document.createElement('div');
      document.body.appendChild(this.tetherContainer);

      this.renderTetheredContent();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderTetheredContent();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroyTetheredContent();
    }
  }, {
    key: '__position__REACT_HOT_LOADER__',
    value: function __position__REACT_HOT_LOADER__() {
      return this.__position__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__position__REACT_HOT_LOADER__',
    value: function __position__REACT_HOT_LOADER__() {
      if (!this.tether) {
        this.tether = new __WEBPACK_IMPORTED_MODULE_3_tether___default.a(_extends({}, this.props.options, {
          element: this.tetherContainer,
          target: this.props.target
        }));
      }

      if (this.props.matchWidth) {
        this.tetherContainer.style.width = this.props.target.clientWidth + 'px';
      }

      this.tether.position();
    }
  }, {
    key: 'destroyTetheredContent',
    value: function destroyTetheredContent() {
      __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.unmountComponentAtNode(this.tetherContainer);

      this.tether.destroy();

      document.body.removeChild(this.tetherContainer);
    }
  }, {
    key: 'renderTetheredContent',
    value: function renderTetheredContent() {
      __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        TetheredChildrenComponent,
        {
          target: this.props.target,
          position: this.position
        },
        this.props.children
      ), this.tetherContainer);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return TetherComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component), _class2.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired,
  options: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  target: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired,
  matchWidth: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired
}, _temp3);

;

var _temp4 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TetheredChildrenComponent, 'TetheredChildrenComponent', '/home/ilkka/data/react-grid/src/datagrid/floating-select/tether.component.jsx');

  __REACT_HOT_LOADER__.register(TetherComponent, 'TetherComponent', '/home/ilkka/data/react-grid/src/datagrid/floating-select/tether.component.jsx');
}();

;

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cell_tooltip_component__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__inline_edit_controls_component_scss__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__inline_edit_controls_component_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__inline_edit_controls_component_scss__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InlineEditControls; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/forbid-prop-types */







var InlineEditControls = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(InlineEditControls, _React$PureComponent);

  function InlineEditControls() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InlineEditControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InlineEditControls.__proto__ || Object.getPrototypeOf(InlineEditControls)).call.apply(_ref, [this].concat(args))), _this), _this.handleSaveButtonClick = function () {
      var _this2;

      return (_this2 = _this).__handleSaveButtonClick__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _this.handleCancelButtonClick = function () {
      var _this3;

      return (_this3 = _this).__handleCancelButtonClick__REACT_HOT_LOADER__.apply(_this3, arguments);
    }, _this.handleAddButtonClick = function () {
      var _this4;

      return (_this4 = _this).__handleAddButtonClick__REACT_HOT_LOADER__.apply(_this4, arguments);
    }, _this.handleEditButtonClick = function () {
      var _this5;

      return (_this5 = _this).__handleEditButtonClick__REACT_HOT_LOADER__.apply(_this5, arguments);
    }, _this.handleCreateButtonClick = function () {
      var _this6;

      return (_this6 = _this).__handleCreateButtonClick__REACT_HOT_LOADER__.apply(_this6, arguments);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InlineEditControls, [{
    key: '__handleSaveButtonClick__REACT_HOT_LOADER__',
    value: function __handleSaveButtonClick__REACT_HOT_LOADER__() {
      return this.__handleSaveButtonClick__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleSaveButtonClick__REACT_HOT_LOADER__',
    value: function __handleSaveButtonClick__REACT_HOT_LOADER__() {
      var valid = true;
      if (this.props.isEditing) {
        valid = this.props.validateEditedRows(this.props.id, this.props.idKeyPath, this.props.columns);
      }
      if (valid && this.props.isCreating) {
        valid = this.props.validateCreatedRows(this.props.id, this.props.columns);
      }
      if (valid) {
        this.props.save(this.props.id, this.props.onSave);
      } else if (this.props.firstInvalidInput) {
        this.props.firstInvalidInput.focus();
      }
    }
  }, {
    key: '__handleCancelButtonClick__REACT_HOT_LOADER__',
    value: function __handleCancelButtonClick__REACT_HOT_LOADER__() {
      return this.__handleCancelButtonClick__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleCancelButtonClick__REACT_HOT_LOADER__',
    value: function __handleCancelButtonClick__REACT_HOT_LOADER__() {
      this.props.cancel(this.props.id);
      this.props.onCancel();
    }
  }, {
    key: '__handleAddButtonClick__REACT_HOT_LOADER__',
    value: function __handleAddButtonClick__REACT_HOT_LOADER__() {
      return this.__handleAddButtonClick__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleAddButtonClick__REACT_HOT_LOADER__',
    value: function __handleAddButtonClick__REACT_HOT_LOADER__() {
      this.props.addNewItem(this.props.id, this.props.columnDefaultValues);
    }
  }, {
    key: '__handleEditButtonClick__REACT_HOT_LOADER__',
    value: function __handleEditButtonClick__REACT_HOT_LOADER__() {
      return this.__handleEditButtonClick__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleEditButtonClick__REACT_HOT_LOADER__',
    value: function __handleEditButtonClick__REACT_HOT_LOADER__() {
      if (!this.props.disableActions) {
        this.props.edit(this.props.id);
        if (this.props.onEditClick) {
          this.props.onEditClick();
        }
      }
    }
  }, {
    key: '__handleCreateButtonClick__REACT_HOT_LOADER__',
    value: function __handleCreateButtonClick__REACT_HOT_LOADER__() {
      return this.__handleCreateButtonClick__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleCreateButtonClick__REACT_HOT_LOADER__',
    value: function __handleCreateButtonClick__REACT_HOT_LOADER__() {
      if (!this.props.disableActions) {
        if (this.props.onAddClick) {
          this.props.onAddClick();
        } else {
          this.props.create(this.props.id, this.props.columnDefaultValues);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          disableActions = _props.disableActions,
          disableActionsMessage = _props.disableActionsMessage,
          disableActionSave = _props.disableActionSave,
          id = _props.id,
          inlineAdd = _props.inlineAdd,
          isBusy = _props.isBusy,
          isCreating = _props.isCreating,
          isEditing = _props.isEditing,
          tabIndex = _props.tabIndex;

      if (isCreating || isEditing) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'oc-datagrid-inline-edit-controls' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Button"],
            {
              disabled: isBusy || disableActions || disableActionSave,
              onClick: this.handleSaveButtonClick,
              tabIndex: tabIndex + 1,
              id: 'oc-datagrid-controls-save-' + id
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], { id: 'Save' })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Button"],
            {
              disabled: isBusy || disableActions,
              onClick: this.handleCancelButtonClick,
              tabIndex: tabIndex + 2,
              id: 'oc-datagrid-controls-cancel-' + id
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], { id: 'Cancel' })
          ),
          isCreating && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Button"],
            {
              disabled: isBusy || disableActions,
              onClick: this.handleAddButtonClick,
              tabIndex: tabIndex + 3,
              id: 'oc-datagrid-controls-add-' + id
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], { id: 'Add' })
          )
        );
      }
      var message = {};
      if (disableActions && disableActionsMessage) {
        message = {
          messageId: disableActionsMessage.messageId,
          messageValues: disableActionsMessage.messageValues
        };
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'oc-datagrid-inline-edit-controls' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4__cell_tooltip_component__["a" /* default */],
          _extends({
            id: 'oc-datagrid-controls-tooltip-' + id
          }, message),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Button"],
            {
              disabled: isBusy,
              onClick: this.handleEditButtonClick,
              id: 'oc-datagrid-controls-edit-' + id
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], { id: 'Edit' })
          ),
          inlineAdd && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Button"],
            {
              disabled: isBusy,
              onClick: this.handleCreateButtonClick,
              id: 'oc-datagrid-controls-create-' + id
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], { id: 'Add' })
          )
        )
      );
    }
  }]);

  return InlineEditControls;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _class.propTypes = {
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  idKeyPath: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
  addNewItem: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  create: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  edit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  save: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  cancel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  validateEditedRows: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  validateCreatedRows: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  isBusy: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isEditing: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  isCreating: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  onSave: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onCancel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAddClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onEditClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  columns: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array.isRequired,
  columnDefaultValues: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  firstInvalidInput: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  disableActions: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  disableActionsMessage: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    messageId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    messageValues: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({})
  }),
  disableActionSave: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  inlineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  tabIndex: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
}, _class.defaultProps = {
  disableActions: false,
  disableActionsMessage: { messageId: 'GridActionsDisabledOtherGridBusy' },
  disableActionSave: false,
  inlineAdd: true,
  idKeyPath: [],
  firstInvalidInput: null,
  onAddClick: null,
  onEditClick: null,
  tabIndex: 1
}, _temp2);

;

var _temp3 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(InlineEditControls, 'InlineEditControls', '/home/ilkka/data/react-grid/src/datagrid/inline-edit-controls.component.jsx');
}();

;

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fixed_data_table_2__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fixed_data_table_2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fixed_data_table_2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_debounce__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_isEqual__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash_isEqual__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsiveFixedDataTable; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/forbid-prop-types */






var initialPixels = 1;

var ResponsiveFixedDataTable = (_temp2 = _class = function (_React$Component) {
  _inherits(ResponsiveFixedDataTable, _React$Component);

  function ResponsiveFixedDataTable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ResponsiveFixedDataTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResponsiveFixedDataTable.__proto__ || Object.getPrototypeOf(ResponsiveFixedDataTable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      gridWidth: initialPixels,
      gridHeight: initialPixels
    }, _this.setDimensionsOnState = function () {
      var _this2;

      return (_this2 = _this).__setDimensionsOnState__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ResponsiveFixedDataTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var refreshRate = this.props.refreshRate;

      this.setDimensionsOnState = __WEBPACK_IMPORTED_MODULE_3_lodash_debounce___default()(this.setDimensionsOnState, refreshRate);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.isComponentMounted = true;
      this.setDimensionsOnState();
      this.attachResizeEvent();
      window.setTimeout(function () {
        return _this3.setDimensionsOnState();
      }, 500);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !__WEBPACK_IMPORTED_MODULE_4_lodash_isEqual___default()(this.props, nextProps) || !__WEBPACK_IMPORTED_MODULE_4_lodash_isEqual___default()(this.state, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.isComponentMounted = false;
      window.removeEventListener('resize', this.setDimensionsOnState);
    }
  }, {
    key: '__setDimensionsOnState__REACT_HOT_LOADER__',
    value: function __setDimensionsOnState__REACT_HOT_LOADER__() {
      return this.__setDimensionsOnState__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__setDimensionsOnState__REACT_HOT_LOADER__',
    value: function __setDimensionsOnState__REACT_HOT_LOADER__() {
      if (this.isComponentMounted) {
        var _findDOMNode = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom__["findDOMNode"])(this),
            offsetWidth = _findDOMNode.offsetWidth,
            offsetHeight = _findDOMNode.offsetHeight;

        this.setState({
          gridWidth: offsetWidth || initialPixels,
          gridHeight: offsetHeight || initialPixels
        });
      }
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      return _extends({}, this.props.containerStyle, {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      });
    }
  }, {
    key: 'attachResizeEvent',
    value: function attachResizeEvent() {
      if (window.addEventListener) {
        window.addEventListener('resize', this.setDimensionsOnState, false);
      } else if (window.attachEvent) {
        window.attachEvent('resize', this.setDimensionsOnState);
      } else {
        window.onresize = this.setDimensionsOnState;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          gridWidth = _state.gridWidth,
          gridHeight = _state.gridHeight;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: this.getStyle() },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_fixed_data_table_2__["Table"], _extends({}, this.props, { width: gridWidth, height: gridHeight }))
      );
    }
  }]);

  return ResponsiveFixedDataTable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component), _class.propTypes = {
  containerStyle: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
  refreshRate: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.number
}, _class.defaultProps = {
  containerStyle: {},
  refreshRate: 250 // ms
}, _temp2);

;

var _temp3 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(initialPixels, 'initialPixels', '/home/ilkka/data/react-grid/src/datagrid/responsive-fixed-data-table.component.jsx');

  __REACT_HOT_LOADER__.register(ResponsiveFixedDataTable, 'ResponsiveFixedDataTable', '/home/ilkka/data/react-grid/src/datagrid/responsive-fixed-data-table.component.jsx');
}();

;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fixed_data_table_2__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fixed_data_table_2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fixed_data_table_2__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortHeaderCell; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var SortHeaderCell = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(SortHeaderCell, _React$PureComponent);

  function SortHeaderCell() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SortHeaderCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SortHeaderCell.__proto__ || Object.getPrototypeOf(SortHeaderCell)).call.apply(_ref, [this].concat(args))), _this), _this.onSortChange = function () {
      var _this2;

      return (_this2 = _this).__onSortChange__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SortHeaderCell, [{
    key: '__onSortChange__REACT_HOT_LOADER__',
    value: function __onSortChange__REACT_HOT_LOADER__() {
      return this.__onSortChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onSortChange__REACT_HOT_LOADER__',
    value: function __onSortChange__REACT_HOT_LOADER__(e) {
      e.preventDefault();
      if (this.props.onSortChange) {
        this.props.onSortChange(this.props.gridId, this.props.columnKey, this.props.sortValueGetter, this.props.sortComparator);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      /* eslint-disable no-unused-vars */
      var _props = this.props,
          sortOrder = _props.sortOrder,
          children = _props.children,
          gridId = _props.gridId,
          onSortChange = _props.onSortChange,
          sortValueGetter = _props.sortValueGetter,
          sortComparator = _props.sortComparator,
          props = _objectWithoutProperties(_props, ['sortOrder', 'children', 'gridId', 'onSortChange', 'sortValueGetter', 'sortComparator']);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_fixed_data_table_2__["Cell"],
        _extends({ className: 'oc-datagrid-cell-header clickable', onClick: this.onSortChange }, props),
        children,
        ' ',
        sortOrder && (sortOrder === 'desc' ? '↓' : '↑')
      );
    }
  }]);

  return SortHeaderCell;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _class.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired,
  gridId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  columnKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number]).isRequired,
  sortOrder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  onSortChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  sortValueGetter: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  sortComparator: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
}, _temp2);

;

var _temp3 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(SortHeaderCell, 'SortHeaderCell', '/home/ilkka/data/react-grid/src/datagrid/sort-header-cell.component.jsx');
}();

;

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownContainer; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var DropdownContainer = (_temp = _class = function (_React$PureComponent) {
  _inherits(DropdownContainer, _React$PureComponent);

  function DropdownContainer() {
    _classCallCheck(this, DropdownContainer);

    return _possibleConstructorReturn(this, (DropdownContainer.__proto__ || Object.getPrototypeOf(DropdownContainer)).apply(this, arguments));
  }

  _createClass(DropdownContainer, [{
    key: 'render',


    /** Note: 'useAnchor' prop makes dropdown.toggle render as a link rather than
     * a button with onClick issue when it wraps an input
     */

    value: function render() {
      var _props = this.props,
          children = _props.children,
          id = _props.id,
          isOpen = _props.isOpen,
          noCaret = _props.noCaret,
          title = _props.title,
          useAnchor = _props.useAnchor,
          otherProps = _objectWithoutProperties(_props, ['children', 'id', 'isOpen', 'noCaret', 'title', 'useAnchor']);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Dropdown"],
        _extends({
          id: id,
          open: isOpen
        }, otherProps),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Dropdown"].Toggle,
          {
            noCaret: noCaret,
            open: isOpen,
            useAnchor: useAnchor
          },
          title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["Dropdown"].Menu,
          null,
          children
        )
      );
    }
  }]);

  return DropdownContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _class.propTypes = {
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]).isRequired,
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]).isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element)]),
  noCaret: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  disabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  dropup: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  isOpen: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onToggle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  pullRight: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  style: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    bsSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    bsStyle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  }),
  useAnchor: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
}, _class.defaultProps = {
  children: null,
  disabled: false,
  dropup: false,
  isOpen: false,
  noCaret: false,
  onToggle: function onToggle() {},
  pullRight: false,
  style: {
    bsSize: 'xs',
    bsStyle: 'info'
  },
  useAnchor: false
}, _temp);

;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DropdownContainer, 'DropdownContainer', '/home/ilkka/data/react-grid/src/dropdown-container/dropdown-container.component.jsx');
}();

;

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropdown_container_component_jsx__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__dropdown_container_component_jsx__["a"]; });


;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__opuscapita_react_icons__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__opuscapita_react_icons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__opuscapita_react_icons__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dropdown_container_index__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropdown_menu_component_scss__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropdown_menu_component_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__dropdown_menu_component_scss__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownMenu; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var DropdownMenu = (_temp = _class = function (_React$PureComponent) {
  _inherits(DropdownMenu, _React$PureComponent);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    var _this = _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call(this, props));

    _this.handleToggle = function () {
      return _this.__handleToggle__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.renderMenuItems = function () {
      return _this.__renderMenuItems__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = { isOpen: false };
    return _this;
  }

  _createClass(DropdownMenu, [{
    key: '__handleToggle__REACT_HOT_LOADER__',
    value: function __handleToggle__REACT_HOT_LOADER__() {
      return this.__handleToggle__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleToggle__REACT_HOT_LOADER__',
    value: function __handleToggle__REACT_HOT_LOADER__(isOpen) {
      if (this.dontCloseDropdownMenu) {
        this.setState({ isOpen: true });
        this.dontCloseDropdownMenu = false;
      } else {
        this.setState({ isOpen: isOpen });
      }
    }
  }, {
    key: '__renderMenuItems__REACT_HOT_LOADER__',
    value: function __renderMenuItems__REACT_HOT_LOADER__() {
      return this.__renderMenuItems__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__renderMenuItems__REACT_HOT_LOADER__',
    value: function __renderMenuItems__REACT_HOT_LOADER__(items) {
      var _this2 = this;

      return items.map(function (item, i) {
        var id = item.id !== undefined ? item.id : 'item' + i;
        if (item.type === 'divider') {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["MenuItem"], {
            key: id,
            divider: true
          });
        }
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["MenuItem"],
          {
            key: id,
            id: id,
            disabled: !!item.disabled,
            href: item.href,
            onClick: function onClick(e) {
              if (item.disableClosing) {
                _this2.dontCloseDropdownMenu = true;
              }
              if (!item.disabled && item.onClick) {
                item.onClick(e);
              }
            }
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'oc-dropdown-menu-icon' },
            item.icon
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'oc-dropdown-menu-title' },
            item.title
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          menuItems = _props.menuItems,
          caret = _props.caret,
          pullLeft = _props.pullLeft,
          otherProps = _objectWithoutProperties(_props, ['menuItems', 'caret', 'pullLeft']);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'oc-dropdown-menu' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4__dropdown_container_index__["a" /* DropdownContainer */],
          _extends({
            noCaret: !caret,
            pullRight: !pullLeft,
            isOpen: this.state.isOpen,
            onToggle: this.handleToggle
          }, otherProps),
          this.renderMenuItems(menuItems)
        )
      );
    }
  }]);

  return DropdownMenu;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent), _class.propTypes = {
  id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]).isRequired,
  menuItems: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    disabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    disableClosing: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    href: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    icon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element,
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]), // serves as a key
    onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
    title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element]),
    type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['item', 'divider'])
  })).isRequired,
  caret: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  disabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  dropup: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  pullLeft: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element])
}, _class.defaultProps = {
  caret: false,
  disabled: false,
  dropup: false,
  pullLeft: false,
  title: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__opuscapita_react_icons__["Icon"], { type: 'indicator', name: 'more', width: 32, height: 32 })
}, _temp);

;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DropdownMenu, 'DropdownMenu', '/home/ilkka/data/react-grid/src/dropdown-menu/dropdown-menu.component.jsx');
}();

;

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropdown_menu_component_jsx__ = __webpack_require__(31);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__dropdown_menu_component_jsx__["a"]; });


;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datagrid_index_js__ = __webpack_require__(16);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Datagrid", function() { return __WEBPACK_IMPORTED_MODULE_0__datagrid_index_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DropdownControls", function() { return __WEBPACK_IMPORTED_MODULE_0__datagrid_index_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "datagridReducer", function() { return __WEBPACK_IMPORTED_MODULE_0__datagrid_index_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DatagridActions", function() { return __WEBPACK_IMPORTED_MODULE_0__datagrid_index_js__["d"]; });

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spinner_component_jsx__ = __webpack_require__(35);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__spinner_component_jsx__["a"]; });


;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_spinjs__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_spinjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_spinjs__);
/* harmony export (immutable) */ __webpack_exports__["a"] = Spinner;



function Spinner() {
  var spinnerOptions = {
    color: '#FAC51D',
    width: 4
  };
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_spinjs___default.a, { config: spinnerOptions });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Spinner, 'Spinner', '/home/ilkka/data/react-grid/src/spinner/spinner.component.jsx');
}();

;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(52)
var ieee754 = __webpack_require__(54)
var isArray = __webpack_require__(55)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".oc-datagrid-actionbar-container {\n  background: white;\n  width: 100%;\n  height: auto;\n  padding: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-line-pack: start;\n      align-content: flex-start;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto; }\n\n.oc-datagrid-actionbar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap; }\n  .oc-datagrid-actionbar button:not(.dropdown-toggle) {\n    margin-left: 5px;\n    min-width: 100px; }\n  .oc-datagrid-actionbar.left {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .oc-datagrid-actionbar.right {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n\n.oc-datagrid-gridheader {\n  font-size: 1.6rem;\n  color: #67707C; }\n", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".oc-datagrid-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100%;\n  padding: 10px;\n  overflow: hidden; }\n  .oc-datagrid-container .oc-datagrid-actions-disabled-notification {\n    background-color: #FFFFFF;\n    text-align: right;\n    padding-right: 10px;\n    padding-bottom: 10px; }\n  .oc-datagrid-container .public_fixedDataTable_bodyRow .public_fixedDataTableCell_cellContent {\n    padding: 0; }\n    .oc-datagrid-container .public_fixedDataTable_bodyRow .public_fixedDataTableCell_cellContent .oc-datagrid-tooltip {\n      padding: 0px 8px 0px 8px; }\n  .oc-datagrid-container .oc-datagrid-row-edit .public_fixedDataTableCell_cellContent .oc-datagrid-tooltip, .oc-datagrid-container .oc-datagrid-row-new .public_fixedDataTableCell_cellContent .oc-datagrid-tooltip {\n    padding: 3px; }\n  .oc-datagrid-container .oc-datagrid-row-filter .public_fixedDataTableCell_cellContent {\n    padding: 3px; }\n  .oc-datagrid-container .public_fixedDataTable_main {\n    border: none;\n    background-color: #FFFFFF; }\n  .oc-datagrid-container .public_fixedDataTable_header {\n    background: #FFFFFF;\n    border-style: solid;\n    border-color: #D3DADE;\n    border-width: 1px 0 0px 0; }\n    .oc-datagrid-container .public_fixedDataTable_header .oc-datagrid-cell-header {\n      border-style: solid;\n      border-color: #D3DADE;\n      border-width: 0 1px 0 0; }\n      .oc-datagrid-container .public_fixedDataTable_header .oc-datagrid-cell-header.clickable {\n        cursor: pointer;\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none; }\n  .oc-datagrid-container .public_fixedDataTableCell_main {\n    border: none;\n    background: #FFFFFF;\n    color: #67707C;\n    font-size: 1.2rem;\n    line-height: 100%; }\n    .oc-datagrid-container .public_fixedDataTableCell_main[type=\"text\"], .oc-datagrid-container .public_fixedDataTableCell_main[type=\"email\"], .oc-datagrid-container .public_fixedDataTableCell_main[type=\"password\"] {\n      width: 100%; }\n  .oc-datagrid-container .oc-datagrid-row-edit .form-group, .oc-datagrid-container .oc-datagrid-row-new .form-group {\n    margin: 0; }\n  .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.warning .form-control:focus, .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.warning .form-control:hover, .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.warning .Select-control:focus, .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.warning .Select-control:hover, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.warning .form-control:focus, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.warning .form-control:hover, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.warning .Select-control:focus, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.warning .Select-control:hover {\n    border: 1px solid #FECA1D !important; }\n  .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.warning .form-control:active, .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.warning .Select-control:active, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.warning .form-control:active, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.warning .Select-control:active {\n    border: 1px solid #FECA1D !important; }\n  .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.warning .Select.is-focused .Select-control, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.warning .Select.is-focused .Select-control {\n    border: 1px solid #FECA1D !important; }\n  .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.error .form-control:focus, .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.error .form-control:hover, .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.error .Select-control:focus, .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.error .Select-control:hover, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.error .form-control:focus, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.error .form-control:hover, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.error .Select-control:focus, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.error .Select-control:hover {\n    border: 1px solid #D82515 !important; }\n  .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.error .form-control:active, .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.error .Select-control:active, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.error .form-control:active, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.error .Select-control:active {\n    border: 1px solid #D82515 !important; }\n  .oc-datagrid-container .oc-datagrid-row-edit .oc-datagrid-tooltip.error .Select.is-focused .Select-control, .oc-datagrid-container .oc-datagrid-row-new .oc-datagrid-tooltip.error .Select.is-focused .Select-control {\n    border: 1px solid #D82515 !important; }\n  .oc-datagrid-container .oc-datagrid-row {\n    background: #FFFFFF;\n    border-style: solid;\n    border-color: #D3DADE;\n    border-width: 1px 0 0 0; }\n    .oc-datagrid-container .oc-datagrid-row.is-selected {\n      background-color: #e6e9eb; }\n      .oc-datagrid-container .oc-datagrid-row.is-selected .public_fixedDataTableCell_main {\n        background-color: #e6e9eb; }\n    .oc-datagrid-container .oc-datagrid-row:hover {\n      cursor: pointer;\n      background-color: #eff2f4; }\n      .oc-datagrid-container .oc-datagrid-row:hover .public_fixedDataTableCell_main {\n        background-color: #eff2f4; }\n  .oc-datagrid-container .public_fixedDataTableCell_columnResizerKnob {\n    background-color: #EC6608; }\n  .oc-datagrid-container .public_fixedDataTableColumnResizerLine_main {\n    border-color: #EC6608; }\n  .oc-datagrid-container .oc-datagrid-cell-header-clickable {\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none; }\n  .oc-datagrid-container .oc-datagrid-tooltip {\n    position: static; }\n    .oc-datagrid-container .oc-datagrid-tooltip.error:before {\n      display: block;\n      content: \"\";\n      position: absolute;\n      right: 0;\n      top: 0;\n      border-color: transparent;\n      border-style: solid;\n      border-width: 7px;\n      border-right-color: #D82515;\n      border-top-color: #D82515;\n      z-index: 100000; }\n    .oc-datagrid-container .oc-datagrid-tooltip.warning:before {\n      display: block;\n      content: \"\";\n      position: absolute;\n      right: 0;\n      top: 0;\n      border-color: transparent;\n      border-style: solid;\n      border-width: 7px;\n      border-right-color: #FECA1D;\n      border-top-color: #FECA1D;\n      z-index: 100000; }\n    .oc-datagrid-container .oc-datagrid-tooltip.edited:after {\n      display: block;\n      content: \"\";\n      position: absolute;\n      right: 0;\n      bottom: 0;\n      border-color: transparent;\n      border-style: solid;\n      border-width: 7px;\n      border-right-color: #CCCCCC;\n      border-bottom-color: #CCCCCC;\n      z-index: 100000; }\n\n.tooltip.bottom {\n  margin-top: 0; }\n  .tooltip.bottom .tooltip-arrow {\n    border-bottom-color: #006070 !important; }\n    .tooltip.bottom .tooltip-arrow.error {\n      border-bottom-color: #D82515 !important; }\n    .tooltip.bottom .tooltip-arrow.warning {\n      border-bottom-color: #FECA1D !important; }\n  .tooltip.bottom .tooltip-inner {\n    background-color: #006070 !important; }\n    .tooltip.bottom .tooltip-inner.error {\n      background-color: #D82515 !important; }\n    .tooltip.bottom .tooltip-inner.warning {\n      background-color: #FECA1D !important;\n      color: black; }\n", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".dropdown {\n  margin-left: 5px; }\n", ""]);

// exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".oc-datagrid-filtering-controls {\n  display: inline-block; }\n", ""]);

// exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".tether-element {\n  z-index: 10000; }\n\n.Select-option {\n  min-height: 32px; }\n", ""]);

// exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".oc-datagrid-inline-edit-controls {\n  display: inline-block; }\n", ""]);

// exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".oc-dropdown-menu .dropdown-toggle {\n  border: 0 !important;\n  padding: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  color: inherit !important; }\n\n.oc-dropdown-menu .dropdown-menu a {\n  padding: 3px 30px 2px 5px !important; }\n\n.oc-dropdown-menu .oc-dropdown-menu-icon {\n  display: inline-block;\n  width: 20px;\n  margin-right: 5px;\n  text-align: center; }\n  .oc-dropdown-menu .oc-dropdown-menu-icon * {\n    vertical-align: middle; }\n", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./action-bar.component.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./action-bar.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./datagrid.component.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./datagrid.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./dropdown-controls.component.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./dropdown-controls.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./filtering-controls.component.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./filtering-controls.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./floating-select.component.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js??ref--2-2!../../../node_modules/sass-loader/lib/loader.js!./floating-select.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./inline-edit-controls.component.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./inline-edit-controls.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./dropdown-menu.component.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js!./dropdown-menu.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 51 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("base64-js");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("fixed-data-table-2/dist/fixed-data-table.css");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("ieee754");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("isarray");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("lodash/debounce");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("lodash/isEqual");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("lodash/isNaN");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("react-day-picker");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("react-day-picker/lib/style.css");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("react-day-picker/moment");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("react-select");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("react-spinjs");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("react-tether");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("tether");

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-grid.js.map