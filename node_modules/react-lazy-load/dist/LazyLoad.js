(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["LazyLoad"] = factory(require("react"), require("react-dom"));
	else
		root["LazyLoad"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _classnames = __webpack_require__(1);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LazyLoad = (function (_Component) {
	  _inherits(LazyLoad, _Component);

	  function LazyLoad(props) {
	    _classCallCheck(this, LazyLoad);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LazyLoad).call(this, props));

	    _this.state = {
	      visible: false
	    };

	    _this.onWindowScroll = _this.onWindowScroll.bind(_this);
	    return _this;
	  }

	  _createClass(LazyLoad, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      window.addEventListener('scroll', this.onWindowScroll);
	      window.addEventListener('resize', this.onWindowScroll);
	      this.onWindowScroll();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (!this.state.visible) this.onWindowScroll();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.onVisible();
	    }
	  }, {
	    key: 'onVisible',
	    value: function onVisible() {
	      window.removeEventListener('scroll', this.onWindowScroll);
	      window.removeEventListener('resize', this.onWindowScroll);
	    }
	  }, {
	    key: 'onWindowScroll',
	    value: function onWindowScroll() {
	      var threshold = this.props.threshold;

	      var bounds = (0, _reactDom.findDOMNode)(this).getBoundingClientRect();
	      var scrollTop = window.pageYOffset;
	      var top = bounds.top + scrollTop;
	      var height = bounds.bottom - bounds.top;

	      if (top === 0 || top <= scrollTop + window.innerHeight + threshold && top + height > scrollTop - threshold) {
	        this.setState({ visible: true });
	        this.onVisible();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var elStyles = {
	        height: this.props.height
	      };
	      var elClasses = (0, _classnames2.default)({
	        'lazy-load': true,
	        'lazy-load-visible': this.state.visible
	      });

	      return _react2.default.createElement(
	        'div',
	        { className: elClasses, style: elStyles },
	        this.state.visible && this.props.children
	      );
	    }
	  }]);

	  return LazyLoad;
	})(_react.Component);

	exports.default = LazyLoad;

	LazyLoad.propTypes = {
	  children: _react.PropTypes.node.isRequired,
	  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	  threshold: _react.PropTypes.number
	};
	LazyLoad.defaultProps = {
	  threshold: 0
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;