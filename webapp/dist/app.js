var exports =
webpackJsonpexports([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(88);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _reactRouter = __webpack_require__(89);

	// setup CSRF tokens in jquery
	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie !== '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = _jquery2['default'].trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == name + '=') {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}

	var csrftoken = getCookie('csrf');

	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)
	    );
	}
	_jquery2['default'].ajaxSetup({
	    beforeSend: function beforeSend(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader('X-CSRFToken', csrftoken);
	        }
	    }
	});

	// these get exported to a global variable, which is important as its the only
	// way we can call into scoped objects
	exports['default'] = {
	    jQuery: _jquery2['default'],
	    moment: __webpack_require__(307),
	    React: __webpack_require__(91),
	    ReactDOM: __webpack_require__(309),
	    Router: __webpack_require__(89),

	    Registry: {
	        api: __webpack_require__(310),
	        routes: __webpack_require__(311),
	        history: _reactRouter.browserHistory,
	        mixins: {
	            ApiMixin: __webpack_require__(313)
	        },
	        ConfigStore: __webpack_require__(318)
	    }
	};
	module.exports = exports['default'];

/***/ },

/***/ 309:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(93);


/***/ },

/***/ 310:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.paramsToQueryArgs = paramsToQueryArgs;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _jquery = __webpack_require__(88);

	var _jquery2 = _interopRequireDefault(_jquery);

	var Request = (function () {
	  function Request(xhr) {
	    _classCallCheck(this, Request);

	    this.xhr = xhr;
	    this.alive = true;
	  }

	  /**
	   * Converts input parameters to API-compatible query arguments
	   * @param params
	   */

	  _createClass(Request, [{
	    key: 'cancel',
	    value: function cancel() {
	      this.alive = false;
	      this.xhr.abort();
	    }
	  }]);

	  return Request;
	})();

	exports.Request = Request;

	function paramsToQueryArgs(params) {
	  return params.itemIds ? { id: params.itemIds } // items matching array of itemids
	  : params.query ? { query: params.query } // items matching search query
	  : undefined; // all items
	}

	var Client = (function () {
	  function Client(options) {
	    _classCallCheck(this, Client);

	    if (typeof options === 'undefined') {
	      options = {};
	    }
	    this.baseUrl = options.baseUrl || '/api/0';
	    this.activeRequests = {};
	  }

	  _createClass(Client, [{
	    key: 'uniqueId',
	    value: function uniqueId() {
	      var s4 = function s4() {
	        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	      };
	      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	    }
	  }, {
	    key: 'wrapCallback',
	    value: function wrapCallback(id, func, cleanup) {
	      var _this = this;

	      /*eslint consistent-return:0*/
	      if (typeof func === 'undefined') {
	        return;
	      }

	      return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        var req = _this.activeRequests[id];
	        if (cleanup === true) {
	          delete _this.activeRequests[id];
	        }
	        if (req.alive) {
	          return func.apply(req, args);
	        }
	      };
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      for (var id in this.activeRequests) {
	        this.activeRequests[id].cancel();
	      }
	    }
	  }, {
	    key: 'request',
	    value: function request(path) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var query = _jquery2['default'].param(options.query || '', true);
	      var method = options.method || (options.data ? 'POST' : 'GET');
	      var data = options.data;
	      var id = this.uniqueId();

	      if (typeof data !== 'undefined' && method !== 'GET') {
	        data = JSON.stringify(data);
	      }

	      var fullUrl = undefined;
	      if (path.indexOf(this.baseUrl) === -1) {
	        fullUrl = this.baseUrl + path;
	      } else {
	        fullUrl = path;
	      }
	      if (query) {
	        if (fullUrl.indexOf('?') !== -1) {
	          fullUrl += '&' + query;
	        } else {
	          fullUrl += '?' + query;
	        }
	      }

	      this.activeRequests[id] = new Request(_jquery2['default'].ajax({
	        url: fullUrl,
	        method: method,
	        data: data,
	        contentType: 'application/json',
	        headers: {
	          'Accept': 'application/json; charset=utf-8'
	        },
	        success: this.wrapCallback(id, options.success),
	        error: this.wrapCallback(id, options.error),
	        complete: this.wrapCallback(id, options.complete, true)
	      }));

	      return this.activeRequests[id];
	    }
	  }, {
	    key: '_chain',
	    value: function _chain() {
	      for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        funcs[_key2] = arguments[_key2];
	      }

	      funcs = funcs.filter(function (f) {
	        return typeof f !== 'undefined' && f;
	      });
	      return function () {
	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	          args[_key3] = arguments[_key3];
	        }

	        funcs.forEach(function (func) {
	          func.apply(funcs, args);
	        });
	      };
	    }
	  }, {
	    key: '_wrapRequest',
	    value: function _wrapRequest(path, options, extraParams) {
	      if (typeof extraParams === 'undefined') {
	        extraParams = {};
	      }

	      options.success = this._chain(options.success, extraParams.success);
	      options.error = this._chain(options.error, extraParams.error);
	      options.complete = this._chain(options.complete, extraParams.complete);

	      return this.request(path, options);
	    }
	  }]);

	  return Client;
	})();

	exports.Client = Client;

/***/ },

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(89);

	var _viewsApp = __webpack_require__(312);

	var _viewsApp2 = _interopRequireDefault(_viewsApp);

	var _viewsHome = __webpack_require__(341);

	var _viewsHome2 = _interopRequireDefault(_viewsHome);

	var _viewsProject = __webpack_require__(354);

	var _viewsProject2 = _interopRequireDefault(_viewsProject);

	var _viewsRouteNotFound = __webpack_require__(358);

	var _viewsRouteNotFound2 = _interopRequireDefault(_viewsRouteNotFound);

	var _viewsWorkdetails = __webpack_require__(363);

	var _viewsWorkdetails2 = _interopRequireDefault(_viewsWorkdetails);

	var _utilsErrorHandler = __webpack_require__(369);

	var _utilsErrorHandler2 = _interopRequireDefault(_utilsErrorHandler);

	/**
	 * Adds trailing slash (/) to current URL
	 * @param nextState
	 * @param replace
	 */
	function appendTrailingSlash(nextState, replace) {
	    var lastChar = nextState.location.pathname.slice(-1);
	    if (lastChar !== '/') {
	        replace(nextState, nextState.location.pathname + '/');
	    }
	}

	var routes = _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: (0, _utilsErrorHandler2['default'])(_viewsApp2['default']) },
	    _react2['default'].createElement(_reactRouter.IndexRoute, { component: (0, _utilsErrorHandler2['default'])(_viewsHome2['default']) }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/blog', component: (0, _utilsErrorHandler2['default'])(_viewsProject2['default']) }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/work', component: (0, _utilsErrorHandler2['default'])(_viewsProject2['default']) }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/work/:workname', component: _viewsWorkdetails2['default'] }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/experiments', component: (0, _utilsErrorHandler2['default'])(_viewsProject2['default']) }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/contact', component: (0, _utilsErrorHandler2['default'])(_viewsProject2['default']) }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '*', component: (0, _utilsErrorHandler2['default'])(_viewsRouteNotFound2['default']), onEnter: appendTrailingSlash })
	);

	exports['default'] = routes;
	module.exports = exports['default'];
	/*<Route path="/work/menily" component={errorHandler(Menily)}/>
	<Route path="/work/menias" component={errorHandler(Menias)}/>
	<Route path="/work/angularjs-seed" component={errorHandler(AngularjsSeed)}/>
	<Route path="/work/openflush" component={errorHandler(OpenFlush)}/>
	<Route path="/work/ict" component={errorHandler(Ict)}/>*/

/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _mixinsApiMixin = __webpack_require__(313);

	var _mixinsApiMixin2 = _interopRequireDefault(_mixinsApiMixin);

	var _componentsHeader = __webpack_require__(314);

	var _componentsHeader2 = _interopRequireDefault(_componentsHeader);

	var App = _react2['default'].createClass({
	    displayName: 'App',

	    mixins: [_mixinsApiMixin2['default']],

	    getInitialState: function getInitialState() {
	        return {
	            loading: false,
	            error: false
	        };
	    },

	    componentWillMount: function componentWillMount() {},

	    componentWillUnmount: function componentWillUnmount() {},

	    onConfigured: function onConfigured() {
	        this.setState({});
	    },

	    render: function render() {
	        return _react2['default'].createElement(
	            'div',
	            null,
	            _react2['default'].createElement(_componentsHeader2['default'], null),
	            _react2['default'].createElement(
	                'div',
	                { id: 'content' },
	                this.props.children
	            )
	        );
	    }
	});

	exports['default'] = App;
	module.exports = exports['default'];

/***/ },

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _api = __webpack_require__(310);

	var ApiMixin = {
	  componentWillMount: function componentWillMount() {
	    this.api = new _api.Client();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.api.clear();
	  }
	};

	exports['default'] = ApiMixin;
	module.exports = exports['default'];

/***/ },

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(89);

	var _classnames = __webpack_require__(315);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _serverLink = __webpack_require__(316);

	var _serverLink2 = _interopRequireDefault(_serverLink);

	var _nav = __webpack_require__(317);

	var _nav2 = _interopRequireDefault(_nav);

	var Header = _react2['default'].createClass({
	    displayName: 'Header',

	    mixins: [],
	    getInitialState: function getInitialState() {
	        return {
	            is_menu_open: false
	        };
	    },
	    toggleMenu: function toggleMenu() {
	        this.setState({ is_menu_open: !this.state.is_menu_open });
	    },
	    render: function render() {
	        return _react2['default'].createElement(
	            'nav',
	            { id: 'site-nav-wrap', className: 'navbar navbar-default navbar-static-top', style: { "background": "#fff" } },
	            _react2['default'].createElement(
	                'div',
	                { className: 'container' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'navbar-header' },
	                    _react2['default'].createElement(
	                        'button',
	                        { onClick: this.toggleMenu, type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#site-nav' },
	                        _react2['default'].createElement('span', { className: 'icon-bar' }),
	                        _react2['default'].createElement('span', { className: 'icon-bar' }),
	                        _react2['default'].createElement('span', { className: 'icon-bar' })
	                    ),
	                    _react2['default'].createElement(
	                        _reactRouter.Link,
	                        { to: '/', target: '_self', className: 'navbar-brand', activeClassName: '' },
	                        _react2['default'].createElement('img', { className: '', style: { "width": "4.6rem" }, src: '/images/rr_logo.png' })
	                    )
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: (0, _classnames2['default'])({ "collapse navbar-collapse": true, "in": this.state.is_menu_open }), id: 'site-nav' },
	                    _react2['default'].createElement(_nav2['default'], { togglemenu: this.toggleMenu })
	                )
	            )
	        );
	    }
	});

	exports['default'] = Header;
	module.exports = exports['default'];

/***/ },

/***/ 316:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _React$PropTypes = _react2['default'].PropTypes;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;

	function isLeftClickEvent(event) {
	    return event.button === 0;
	}

	function isModifiedEvent(event) {
	    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	function createLocationDescriptor(to, _ref) {
	    var query = _ref.query;
	    var hash = _ref.hash;
	    var state = _ref.state;

	    if (query || hash || state) {
	        return { pathname: to, query: query, hash: hash, state: state };
	    }

	    return to;
	}

	/**
	 * A <ServerLink> is used to create an <a> element that bypasses router.
	 * OnClick request is sent to server.
	 *
	 * For example, assuming you have the following route:
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <ServerLink to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <ServerLink ... query={{ show: true }} state={{ the: 'state' }} />
	 */
	var ServerLink = _react2['default'].createClass({
	    displayName: 'ServerLink',

	    contextTypes: {
	        router: object
	    },

	    propTypes: {
	        to: string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            className: '',
	            style: {}
	        };
	    },

	    handleClick: function handleClick(event) {
	        if (this.props.onClick) this.props.onClick(event);
	        if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
	        if (event.defaultPrevented === true) return;
	        event.preventDefault();
	        window.location.href = this.props.to;
	    },

	    render: function render() {
	        return _react2['default'].createElement('a', _extends({}, this.props, { href: this.props.to, onClick: this.handleClick }));
	    }

	});

	exports['default'] = ServerLink;
	module.exports = exports['default'];

/***/ },

/***/ 317:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(309);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(89);

	var _jquery = __webpack_require__(88);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _classnames = __webpack_require__(315);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _storesConfigStore = __webpack_require__(318);

	var _storesConfigStore2 = _interopRequireDefault(_storesConfigStore);

	var _serverLink = __webpack_require__(316);

	var _serverLink2 = _interopRequireDefault(_serverLink);

	var Nav = _react2['default'].createClass({
	    displayName: 'Nav',

	    contextTypes: {
	        router: _react2['default'].PropTypes.object
	    },

	    propTypes: {
	        togglemenu: _react2['default'].PropTypes.func
	    },

	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        return true;
	    },

	    componentDidMount: function componentDidMount() {
	        (0, _jquery2['default'])(_reactDom2['default'].findDOMNode(this.refs.mainNav)).find('.dropdown-toggle').dropdown();
	    },

	    toggleMenu: function toggleMenu() {
	        this.props.togglemenu();
	    },

	    render: function render() {
	        var me = {
	            fontStyle: "italic"
	        };
	        return _react2['default'].createElement(
	            'ul',
	            { className: 'nav navbar-nav navbar-right', ref: 'mainNav' },
	            _react2['default'].createElement(
	                'li',
	                { className: (0, _classnames2['default'])({ "active": this.context.router.isActive('/', true) }) },
	                _react2['default'].createElement(
	                    _reactRouter.Link,
	                    { style: me, onClick: this.toggleMenu, to: '/' },
	                    'Me'
	                )
	            ),
	            _react2['default'].createElement(
	                'li',
	                { className: (0, _classnames2['default'])({ "active": this.context.router.isActive('/work', true) }) },
	                _react2['default'].createElement(
	                    _reactRouter.Link,
	                    { onClick: this.toggleMenu, to: '/work' },
	                    'Work'
	                )
	            ),
	            _react2['default'].createElement(
	                'li',
	                { className: (0, _classnames2['default'])({ "active": this.context.router.isActive('/blog', true) }) },
	                _react2['default'].createElement(
	                    _serverLink2['default'],
	                    { onClick: this.toggleMenu, to: 'http://blog.roshanraj.com/' },
	                    'Blog'
	                )
	            )
	        );
	    }
	});

	exports['default'] = Nav;
	module.exports = exports['default'];
	/*
	       \/api\/[\dA-F]+ -- regex for url matching
	   <li className={Classnames({"active": this.context.router.isActive('/experiments', true)})}>
	   <Link onClick={this.toggleMenu} to="/experiments">Experiments</Link>
	</li>
	<li className={Classnames({"active": this.context.router.isActive('/contact', true)})}>
	   <Link onClick={this.toggleMenu} to="/contact">Contact</Link>
	</li>
	*/ /* <li className={Classnames({"active": this.context.router.isActive('/unmapped-route', true)})}>
	      <Link onClick={this.toggleMenu} to="/unmapped-route">404</Link>
	   </li>*/

/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _momentTimezone = __webpack_require__(319);

	var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

	var _reflux = __webpack_require__(322);

	var _reflux2 = _interopRequireDefault(_reflux);

	var ConfigStore = _reflux2['default'].createStore({
	    init: function init() {
	        this.config = {};
	    },

	    get: function get(key) {
	        return this.config[key];
	    },

	    set: function set(key, value) {
	        this.config[key] = value;
	        var out = {};
	        out[key] = value;
	        this.trigger(out);
	    },

	    getConfig: function getConfig() {
	        return this.config;
	    },

	    loadInitialData: function loadInitialData(config) {
	        config.features = new Set(config.features || []);
	        this.config = config;

	        if (config.user) {
	            _momentTimezone2['default'].tz.setDefault(config.user.options.timezone);
	        }

	        this.trigger(config);
	    }
	});

	exports['default'] = ConfigStore;
	module.exports = exports['default'];

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _reactWindowMixins = __webpack_require__(342);

	var _reactFontawesome = __webpack_require__(353);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	var HomeView = _react2['default'].createClass({
	    displayName: 'HomeView',

	    mixins: [],

	    getInitialState: function getInitialState() {
	        return {
	            loading: false,
	            error: false
	        };
	    },
	    mixins: [_reactWindowMixins.OnResize],

	    render: function render() {
	        // let slide = {
	        //     width: this.state.window.width-100,
	        //     height: this.state.window.height-100,
	        //     background: "-webkit-linear-gradient(to left, rgba(220, 131, 114, 0.15), rgba(255, 253, 208,0.3))",
	        //     background: "linear-gradient(to left, rgba(220, 131, 114, 0.15), rgba(255, 253, 208, 0.3))"
	        // }
	        var slide = {

	            background: "-webkit-linear-gradient(-45deg, rgba(220, 131, 114, 0.27), rgba(255, 253, 208,0.3))",
	            background: "linear-gradient(-45deg, rgba(220, 131, 114, 0.27), rgba(255, 253, 208, 0.3))"
	        };
	        var image_panel = {
	            minWidth: "200",
	            background: "-webkit-linear-gradient(to left, #f4f4f4, #fff)",
	            background: "linear-gradient(to left, #f4f4f4, #fff)",
	            padding: "0px 20px 20px 20px",
	            display: "inline-block",
	            boxShadow: "0 4px 5px #AAA"
	        };
	        var img = {
	            width: "500",
	            height: "auto",
	            position: "absolute",
	            bottom: "0"
	        };
	        var icon_style = {
	            textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
	            margin: "3rem"
	        };

	        return _react2['default'].createElement(
	            'div',
	            { className: 'container home' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'row' },
	                _react2['default'].createElement('br', null),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'container no-padding', style: slide },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'col-lg-5 no-padding', style: { position: "relative", height: this.state.window.height - 100 } },
	                        _react2['default'].createElement('img', { src: './images/rr.png', style: img, alt: '...', className: 'img-responsive' })
	                    ),
	                    _react2['default'].createElement(
	                        'div',
	                        { className: ' col-lg-7 intro', style: { height: this.state.window.height - 100 } },
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'col-lg-12', style: { position: "relative", top: "60%", transform: "translateY(-50%)" } },
	                            _react2['default'].createElement('br', null),
	                            _react2['default'].createElement(
	                                'p',
	                                { className: 'text-center', style: { fontSize: "2rem" } },
	                                'Hi, my name is ',
	                                _react2['default'].createElement(
	                                    'span',
	                                    { style: { fontWeight: "700" } },
	                                    'Roshan Raj'
	                                ),
	                                _react2['default'].createElement('br', null)
	                            ),
	                            _react2['default'].createElement(
	                                'p',
	                                { className: 'text-center' },
	                                'I am a ',
	                                _react2['default'].createElement(
	                                    'mark',
	                                    null,
	                                    'polymath developer'
	                                ),
	                                ' currently working with  ',
	                                _react2['default'].createElement(
	                                    'a',
	                                    { className: 'xavient', href: 'https://www.xavient.com/' },
	                                    'Xavient Information System'
	                                ),
	                                ', Noida.',
	                                _react2['default'].createElement('br', null),
	                                _react2['default'].createElement('br', null),
	                                'A ',
	                                _react2['default'].createElement(
	                                    'b',
	                                    null,
	                                    'cyclist'
	                                ),
	                                ', intense lover of ',
	                                _react2['default'].createElement(
	                                    'b',
	                                    null,
	                                    'music'
	                                ),
	                                ' and ',
	                                _react2['default'].createElement(
	                                    'b',
	                                    null,
	                                    'food'
	                                ),
	                                '.',
	                                _react2['default'].createElement('br', null),
	                                'A Mad scientist, who dreams, experiments and crafts things.',
	                                _react2['default'].createElement('br', null),
	                                ' Powered by Music and Coffee.'
	                            ),
	                            _react2['default'].createElement('br', null),
	                            _react2['default'].createElement(
	                                'div',
	                                { className: 'col-lg-12 link_panel text-center' },
	                                _react2['default'].createElement(
	                                    'a',
	                                    { href: 'https://github.com/roshanraj', target: '_blank' },
	                                    _react2['default'].createElement(_reactFontawesome2['default'], {
	                                        className: '',
	                                        name: 'github',
	                                        size: '4x',
	                                        style: icon_style
	                                    })
	                                ),
	                                _react2['default'].createElement(
	                                    'a',
	                                    { href: 'https://www.linkedin.com/in/roshan-raj-02382589?trk=hp-identity-name', target: '_blank' },
	                                    _react2['default'].createElement(_reactFontawesome2['default'], {
	                                        className: '',
	                                        name: 'linkedin',
	                                        size: '4x',
	                                        style: icon_style
	                                    })
	                                ),
	                                _react2['default'].createElement(
	                                    'a',
	                                    { href: 'https://www.facebook.com/roshanrajx64', target: '_blank' },
	                                    _react2['default'].createElement(_reactFontawesome2['default'], {
	                                        className: '',
	                                        name: 'facebook',
	                                        size: '4x',
	                                        style: icon_style
	                                    })
	                                ),
	                                _react2['default'].createElement(
	                                    'a',
	                                    { href: 'https://twitter.com/roshanraj_rr', target: '_blank' },
	                                    _react2['default'].createElement(_reactFontawesome2['default'], {
	                                        className: '',
	                                        name: 'twitter',
	                                        size: '4x',
	                                        style: icon_style
	                                    })
	                                )
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	exports['default'] = HomeView;
	module.exports = exports['default'];

/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  OnResize: __webpack_require__(343),
	  OnScroll: __webpack_require__(351),
	  OnUnload: __webpack_require__(352)
	};



/***/ },

/***/ 343:
/***/ function(module, exports, __webpack_require__) {

	/*global window */

	var throttle = __webpack_require__(344);

	module.exports = {
	  getInitialState: function() {
	    var defaults = { window: { height: 0, width: 0 }, document: { height: 0, width: 0 } };
	    return !this.onResize ? defaults : null;
	  },

	  componentWillMount: function() {
	    if (!this.onResize) {
	      this.onResize = function() {
	        this.setState({
	          window: { height: window.innerHeight, width: window.innerWidth },
	          document: { height: document.body.clientHeight, width: document.body.clientWidth }
	        });
	      }.bind(this);
	    }

	    this.onResize();
	  },

	  componentDidMount: function() {
	    this.onResizeThrottled = throttle(this.onResize, 10);
	    window.addEventListener("resize", this.onResizeThrottled);
	  },

	  componentWillUnmount: function() {
	    window.removeEventListener("resize", this.onResizeThrottled);
	  }
	};


/***/ },

/***/ 344:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var debounce = __webpack_require__(345),
	    isFunction = __webpack_require__(346),
	    isObject = __webpack_require__(347);

	/** Used as an internal `_.debounce` options object */
	var debounceOptions = {
	  'leading': false,
	  'maxWait': 0,
	  'trailing': false
	};

	/**
	 * Creates a function that, when executed, will only call the `func` function
	 * at most once per every `wait` milliseconds. Provide an options object to
	 * indicate that `func` should be invoked on the leading and/or trailing edge
	 * of the `wait` timeout. Subsequent calls to the throttled function will
	 * return the result of the last `func` call.
	 *
	 * Note: If `leading` and `trailing` options are `true` `func` will be called
	 * on the trailing edge of the timeout only if the the throttled function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * @static
	 * @memberOf _
	 * @category Functions
	 * @param {Function} func The function to throttle.
	 * @param {number} wait The number of milliseconds to throttle executions to.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // avoid excessively updating the position while scrolling
	 * var throttled = _.throttle(updatePosition, 100);
	 * jQuery(window).on('scroll', throttled);
	 *
	 * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
	 * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
	 *   'trailing': false
	 * }));
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (!isFunction(func)) {
	    throw new TypeError;
	  }
	  if (options === false) {
	    leading = false;
	  } else if (isObject(options)) {
	    leading = 'leading' in options ? options.leading : leading;
	    trailing = 'trailing' in options ? options.trailing : trailing;
	  }
	  debounceOptions.leading = leading;
	  debounceOptions.maxWait = wait;
	  debounceOptions.trailing = trailing;

	  return debounce(func, wait, debounceOptions);
	}

	module.exports = throttle;


/***/ },

/***/ 345:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isFunction = __webpack_require__(346),
	    isObject = __webpack_require__(347),
	    now = __webpack_require__(349);

	/* Native method shortcuts for methods with the same name as other `lodash` methods */
	var nativeMax = Math.max;

	/**
	 * Creates a function that will delay the execution of `func` until after
	 * `wait` milliseconds have elapsed since the last time it was invoked.
	 * Provide an options object to indicate that `func` should be invoked on
	 * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
	 * to the debounced function will return the result of the last `func` call.
	 *
	 * Note: If `leading` and `trailing` options are `true` `func` will be called
	 * on the trailing edge of the timeout only if the the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * @static
	 * @memberOf _
	 * @category Functions
	 * @param {Function} func The function to debounce.
	 * @param {number} wait The number of milliseconds to delay.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
	 * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
	 * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // avoid costly calculations while the window size is in flux
	 * var lazyLayout = _.debounce(calculateLayout, 150);
	 * jQuery(window).on('resize', lazyLayout);
	 *
	 * // execute `sendMail` when the click event is fired, debouncing subsequent calls
	 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * });
	 *
	 * // ensure `batchLog` is executed once after 1 second of debounced calls
	 * var source = new EventSource('/stream');
	 * source.addEventListener('message', _.debounce(batchLog, 250, {
	 *   'maxWait': 1000
	 * }, false);
	 */
	function debounce(func, wait, options) {
	  var args,
	      maxTimeoutId,
	      result,
	      stamp,
	      thisArg,
	      timeoutId,
	      trailingCall,
	      lastCalled = 0,
	      maxWait = false,
	      trailing = true;

	  if (!isFunction(func)) {
	    throw new TypeError;
	  }
	  wait = nativeMax(0, wait) || 0;
	  if (options === true) {
	    var leading = true;
	    trailing = false;
	  } else if (isObject(options)) {
	    leading = options.leading;
	    maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
	    trailing = 'trailing' in options ? options.trailing : trailing;
	  }
	  var delayed = function() {
	    var remaining = wait - (now() - stamp);
	    if (remaining <= 0) {
	      if (maxTimeoutId) {
	        clearTimeout(maxTimeoutId);
	      }
	      var isCalled = trailingCall;
	      maxTimeoutId = timeoutId = trailingCall = undefined;
	      if (isCalled) {
	        lastCalled = now();
	        result = func.apply(thisArg, args);
	        if (!timeoutId && !maxTimeoutId) {
	          args = thisArg = null;
	        }
	      }
	    } else {
	      timeoutId = setTimeout(delayed, remaining);
	    }
	  };

	  var maxDelayed = function() {
	    if (timeoutId) {
	      clearTimeout(timeoutId);
	    }
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	    if (trailing || (maxWait !== wait)) {
	      lastCalled = now();
	      result = func.apply(thisArg, args);
	      if (!timeoutId && !maxTimeoutId) {
	        args = thisArg = null;
	      }
	    }
	  };

	  return function() {
	    args = arguments;
	    stamp = now();
	    thisArg = this;
	    trailingCall = trailing && (timeoutId || !leading);

	    if (maxWait === false) {
	      var leadingCall = leading && !timeoutId;
	    } else {
	      if (!maxTimeoutId && !leading) {
	        lastCalled = stamp;
	      }
	      var remaining = maxWait - (stamp - lastCalled),
	          isCalled = remaining <= 0;

	      if (isCalled) {
	        if (maxTimeoutId) {
	          maxTimeoutId = clearTimeout(maxTimeoutId);
	        }
	        lastCalled = stamp;
	        result = func.apply(thisArg, args);
	      }
	      else if (!maxTimeoutId) {
	        maxTimeoutId = setTimeout(maxDelayed, remaining);
	      }
	    }
	    if (isCalled && timeoutId) {
	      timeoutId = clearTimeout(timeoutId);
	    }
	    else if (!timeoutId && wait !== maxWait) {
	      timeoutId = setTimeout(delayed, wait);
	    }
	    if (leadingCall) {
	      isCalled = true;
	      result = func.apply(thisArg, args);
	    }
	    if (isCalled && !timeoutId && !maxTimeoutId) {
	      args = thisArg = null;
	    }
	    return result;
	  };
	}

	module.exports = debounce;


/***/ },

/***/ 346:
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * Checks if `value` is a function.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 */
	function isFunction(value) {
	  return typeof value == 'function';
	}

	module.exports = isFunction;


/***/ },

/***/ 347:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var objectTypes = __webpack_require__(348);

	/**
	 * Checks if `value` is the language type of Object.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // check if the value is the ECMAScript language type of Object
	  // http://es5.github.io/#x8
	  // and avoid a V8 bug
	  // http://code.google.com/p/v8/issues/detail?id=2291
	  return !!(value && objectTypes[typeof value]);
	}

	module.exports = isObject;


/***/ },

/***/ 348:
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to determine if values are of the language type Object */
	var objectTypes = {
	  'boolean': false,
	  'function': true,
	  'object': true,
	  'number': false,
	  'string': false,
	  'undefined': false
	};

	module.exports = objectTypes;


/***/ },

/***/ 349:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(350);

	/**
	 * Gets the number of milliseconds that have elapsed since the Unix epoch
	 * (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @example
	 *
	 * var stamp = _.now();
	 * _.defer(function() { console.log(_.now() - stamp); });
	 * // => logs the number of milliseconds it took for the deferred function to be called
	 */
	var now = isNative(now = Date.now) && now || function() {
	  return new Date().getTime();
	};

	module.exports = now;


/***/ },

/***/ 350:
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/** Used to detect if a method is native */
	var reNative = RegExp('^' +
	  String(toString)
	    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    .replace(/toString| for [^\]]+/g, '.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	 */
	function isNative(value) {
	  return typeof value == 'function' && reNative.test(value);
	}

	module.exports = isNative;


/***/ },

/***/ 351:
/***/ function(module, exports, __webpack_require__) {

	/*global window */

	var throttle = __webpack_require__(344);

	module.exports = {
	  getInitialState: function() {
	    return !this.onScroll ? { scroll: { x: 0, y: 0 } } : null;
	  },

	  componentDidMount: function() {
	    if (!this.onScroll) {
	      this.onScroll = function() {
	        this.setState({ scroll: { x: window.pageXOffset, y: window.pageYOffset } });
	      }.bind(this);
	    }

	    this.onScroll();
	    this.onScrollThrottled = throttle(this.onScroll, 10);
	    window.addEventListener("scroll", this.onScrollThrottled);
	  },

	  componentWillUnmount: function() {
	    window.removeEventListener("scroll", this.onScrollThrottled);
	  }
	};


/***/ },

/***/ 352:
/***/ function(module, exports) {

	/*global window */

	module.exports = {
	  componentDidMount: function() {
	    if (this.onUnload) {
	      window.addEventListener("unload", this.onUnload);
	    }
	    if (this.onBeforeUnload) {
	      window.addEventListener("beforeunload", this.onBeforeUnload);
	    }
	  },

	  componentWillUnmount: function() {
	    if (this.onUnload) {
	      window.removeEventListener("unload", this.onUnload);
	    }
	    if (this.onBeforeUnload) {
	      window.removeEventListener("beforeunload", this.onBeforeUnload);
	    }
	  }
	};


/***/ },

/***/ 354:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _componentsLoadingIndicator = __webpack_require__(355);

	var _componentsLoadingIndicator2 = _interopRequireDefault(_componentsLoadingIndicator);

	var _componentsLoadingError = __webpack_require__(356);

	var _componentsLoadingError2 = _interopRequireDefault(_componentsLoadingError);

	var _componentsWorkWork = __webpack_require__(357);

	var _componentsWorkWork2 = _interopRequireDefault(_componentsWorkWork);

	var ProjectView = _react2['default'].createClass({
	    displayName: 'ProjectView',

	    getInitialState: function getInitialState() {
	        return {
	            people: null,
	            loading: false,
	            error: false,
	            work: []
	        };
	    },

	    /**
	     * When component is about to mount, call ajax for data
	     */
	    componentWillMount: function componentWillMount() {
	        this.fetchData();
	    },

	    /**
	     * Get list of persons from some api through ajax call
	     */
	    fetchData: function fetchData() {
	        if (this.state.loading) {
	            // this is already called and is-in-progress.
	            return;
	        }
	        this.setState({
	            loading: true
	        });

	        var _this = this;

	        jQuery.getJSON("../data/work.json", function (data, err) {
	            console.log(data);
	            console.log(data.work);
	            _this.setState({
	                work: data.work,
	                loading: false,
	                error: false
	            });
	        });

	        // jQuery.ajax({
	        //     type: 'GET',
	        //     url: "https://randomuser.me/api/?results=50",
	        //     dataType: "json",
	        //     cache: false,
	        //     success: (data) => {
	        //         // When we have data, just set in component's state, render will automatically triggered
	        //         console.log(data);
	        //         _this.setState({
	        //             people: data.results,
	        //             loading: false,
	        //             error: false
	        //         });
	        //     },
	        //     error: (xhr, responseText, data) => {
	        //         console.log('Error' + responseText);
	        //         _this.setState({
	        //             people: null,
	        //             loading: false,
	        //             error: true
	        //         });
	        //     }
	        // });
	    },

	    /**
	     * Calling refresh will trigger ajax call to fetch data
	     */
	    refresh: function refresh() {
	        this.fetchData();
	    },

	    getPeopleFragment: function getPeopleFragment() {
	        var fragmentElem = null;
	        var _this = this;

	        function toTitleCase(str) {
	            // Util function
	            return str.replace(/\w\S*/g, function (txt) {
	                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	            });
	        }

	        if (this.state.work == null) {
	            fragmentElem = _react2['default'].createElement(
	                'div',
	                { className: 'col-sm-12' },
	                _react2['default'].createElement(
	                    'h4',
	                    null,
	                    'Sorry, could not find any people. Why dont you try after sometime?'
	                ),
	                _react2['default'].createElement(
	                    'a',
	                    { href: '#', onClick: this.refresh },
	                    'Try again'
	                )
	            );
	        } else {
	            fragmentElem = _react2['default'].createElement(
	                'div',
	                { className: 'col-sm-12' },
	                this.state.work.map(function (work_details, index) {
	                    return _react2['default'].createElement(_componentsWorkWork2['default'], { name: work_details.name, key: index, image: work_details.image, route: work_details.link });
	                })
	            );
	        }
	        return fragmentElem;
	    },

	    render: function render() {
	        var elem = "";
	        if (this.state.loading) {
	            elem = _react2['default'].createElement(_componentsLoadingIndicator2['default'], null);
	        } else if (this.state.error) {
	            elem = _react2['default'].createElement(_componentsLoadingError2['default'], { onRetry: this.fetchData });
	        } else {
	            elem = this.getPeopleFragment();
	        }

	        return _react2['default'].createElement(
	            'div',
	            { className: 'container' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'row' },
	                _react2['default'].createElement('h3', null),
	                _react2['default'].createElement('br', null),
	                elem
	            )
	        );
	    }
	});

	exports['default'] = ProjectView;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(88)))

/***/ },

/***/ 355:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(315);

	var _classnames2 = _interopRequireDefault(_classnames);

	var LoadingIndicator = _react2['default'].createClass({
	    displayName: 'LoadingIndicator',

	    propTypes: {
	        mini: _react2['default'].PropTypes.bool
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            mini: false
	        };
	    },

	    shouldComponentUpdate: function shouldComponentUpdate() {
	        return false;
	    },

	    render: function render() {
	        var classes = {
	            loading: true,
	            mini: this.props.mini
	        };
	        return _react2['default'].createElement(
	            'div',
	            { className: (0, _classnames2['default'])(this.props.className, classes) },
	            _react2['default'].createElement('div', { className: 'loading-indicator' }),
	            _react2['default'].createElement(
	                'div',
	                { className: 'loading-message' },
	                this.props.children
	            )
	        );
	    }
	});

	exports['default'] = LoadingIndicator;
	module.exports = exports['default'];

/***/ },

/***/ 356:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var LoadingError = _react2['default'].createClass({
	  displayName: 'LoadingError',

	  propTypes: {
	    onRetry: _react2['default'].PropTypes.func,
	    message: _react2['default'].PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      message: 'There was an error loading data.'
	    };
	  },

	  shouldComponentUpdate: function shouldComponentUpdate() {
	    return false;
	  },

	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      { className: 'alert alert-error alert-block' },
	      _react2['default'].createElement(
	        'p',
	        null,
	        this.props.message,
	        this.props.onRetry && _react2['default'].createElement(
	          'a',
	          { onClick: this.props.onRetry, className: 'btn btn-default btn-sm',
	            style: { marginLeft: 5 } },
	          'Retry'
	        )
	      )
	    );
	  }
	});

	exports['default'] = LoadingError;
	module.exports = exports['default'];

/***/ },

/***/ 357:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(89);

	var Work = _react2['default'].createClass({
	    displayName: 'Work',

	    propTypes: {
	        name: _react2['default'].PropTypes.string,
	        image: _react2['default'].PropTypes.string,
	        route: _react2['default'].PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            message: 'There was an error loading data.'
	        };
	    },

	    shouldComponentUpdate: function shouldComponentUpdate() {
	        return false;
	    },

	    render: function render() {

	        return _react2['default'].createElement(
	            'div',
	            { className: 'col-xs-12  work' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'col-md-4 col-height' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'center_vertical content' },
	                    this.props.name,
	                    _react2['default'].createElement(
	                        'p',
	                        { className: 'hashtag' },
	                        '#entrepreneurship #dream hunting #learning'
	                    )
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'col-md-4 col-height' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'img_holder' },
	                    _react2['default'].createElement('img', { src: this.props.image, style: { minHeight: "200px", width: "100%", display: "block" } })
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'col-md-4 col-height' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'center_vertical content' },
	                    _react2['default'].createElement(
	                        _reactRouter.Link,
	                        { className: 'btn btn-default', to: this.props.route },
	                        'Explore'
	                    )
	                )
	            )
	        );
	    }
	});

	exports['default'] = Work;
	module.exports = exports['default'];

/***/ },

/***/ 358:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _reactDocumentTitle = __webpack_require__(359);

	var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

	var RouteNotFound = _react2['default'].createClass({
	  displayName: 'RouteNotFound',

	  getTitle: function getTitle() {
	    return 'Page Not Found';
	  },

	  render: function render() {
	    return _react2['default'].createElement(
	      _reactDocumentTitle2['default'],
	      { title: this.getTitle() },
	      _react2['default'].createElement(
	        'div',
	        { className: 'app' },
	        _react2['default'].createElement(
	          'div',
	          { className: 'container' },
	          _react2['default'].createElement(
	            'div',
	            { className: 'content' },
	            _react2['default'].createElement(
	              'section',
	              { className: 'body' },
	              _react2['default'].createElement(
	                'div',
	                { className: 'alert alert-block alert-error' },
	                _react2['default'].createElement(
	                  'div',
	                  { style: { fontSize: 24, marginBottom: 10 } },
	                  _react2['default'].createElement('span', { className: 'icon-exclamation', style: { fontSize: 20, marginRight: 10 } }),
	                  _react2['default'].createElement(
	                    'span',
	                    null,
	                    'Page Not Found'
	                  )
	                ),
	                _react2['default'].createElement(
	                  'p',
	                  null,
	                  'The page you are looking for was not found.'
	                ),
	                _react2['default'].createElement(
	                  'p',
	                  null,
	                  'You may wish to try the following:'
	                ),
	                _react2['default'].createElement(
	                  'ul',
	                  null,
	                  _react2['default'].createElement(
	                    'li',
	                    null,
	                    'If you entered the address manually, double check the path. Did you forget a trailing slash?'
	                  ),
	                  _react2['default'].createElement(
	                    'li',
	                    null,
	                    'If you followed a link here, try hitting back and reloading the page. It\'s possible the resource was moved out from under you.'
	                  )
	                ),
	                _react2['default'].createElement(
	                  'p',
	                  null,
	                  'Not sure what to do? ',
	                  _react2['default'].createElement(
	                    'a',
	                    { href: '/' },
	                    'Return to HOME'
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	exports['default'] = RouteNotFound;
	module.exports = exports['default'];

/***/ },

/***/ 363:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _reactWindowMixins = __webpack_require__(342);

	var _reactFontawesome = __webpack_require__(353);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	var _componentsWorkMenily = __webpack_require__(364);

	var _componentsWorkMenily2 = _interopRequireDefault(_componentsWorkMenily);

	var _componentsWorkMenias = __webpack_require__(365);

	var _componentsWorkMenias2 = _interopRequireDefault(_componentsWorkMenias);

	var _componentsWorkAngularjsseed = __webpack_require__(366);

	var _componentsWorkAngularjsseed2 = _interopRequireDefault(_componentsWorkAngularjsseed);

	var _componentsWorkOpenflush = __webpack_require__(367);

	var _componentsWorkOpenflush2 = _interopRequireDefault(_componentsWorkOpenflush);

	var _componentsWorkIct = __webpack_require__(368);

	var _componentsWorkIct2 = _interopRequireDefault(_componentsWorkIct);

	var _utilsErrorHandler = __webpack_require__(369);

	var _utilsErrorHandler2 = _interopRequireDefault(_utilsErrorHandler);

	var WorkDetailsView = _react2['default'].createClass({
	    displayName: 'WorkDetailsView',

	    mixins: [],

	    getInitialState: function getInitialState() {
	        return {
	            loading: false,
	            error: false
	        };
	    },
	    mixins: [_reactWindowMixins.OnResize],
	    getWork: function getWork(PageName) {
	        console.log(PageName);
	        switch (PageName) {
	            case "menily":
	                return _react2['default'].createElement(_componentsWorkMenily2['default'], null);
	                break;
	            case "menias":
	                return _react2['default'].createElement(_componentsWorkMenias2['default'], null);
	                break;
	            case "angularjs-seed":
	                return _react2['default'].createElement(_componentsWorkAngularjsseed2['default'], null);
	                break;
	            case "openflush":
	                return _react2['default'].createElement(_componentsWorkOpenflush2['default'], null);
	                break;
	            case "ict":
	                return _react2['default'].createElement(_componentsWorkIct2['default'], null);
	                break;
	            default:
	                return _react2['default'].createElement(_componentsWorkMenily2['default'], null);
	        }
	    },

	    render: function render() {

	        var page_name = this.props.params.workname;
	        return _react2['default'].createElement(
	            'div',
	            { className: 'container workdetails' },
	            this.getWork(page_name)
	        );
	    }
	});

	exports['default'] = WorkDetailsView;
	module.exports = exports['default'];

/***/ },

/***/ 364:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var Menily = _react2['default'].createClass({
	    displayName: 'Menily',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            message: 'There was an error loading data.'
	        };
	    },

	    shouldComponentUpdate: function shouldComponentUpdate() {
	        return false;
	    },

	    render: function render() {

	        return _react2['default'].createElement(
	            'div',
	            { className: '' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-4 col-height text-center' },
	                    _react2['default'].createElement('img', { className: 'logo', src: '../images/menily/logo.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-8 col-height intro', style: { "paddingTop": "12px" } },
	                    _react2['default'].createElement(
	                        'span',
	                        { className: 'brand' },
	                        ' A '
	                    ),
	                    ', healthcare startup that aimed to connect discrete healthcare bodies together. ',
	                    _react2['default'].createElement('br', null),
	                    'Single platform for ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'Hospitals'
	                    ),
	                    ', ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'Doctors'
	                    ),
	                    ', ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'Labrories'
	                    ),
	                    ' and ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'Pharmasuticals'
	                    ),
	                    '.'
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-12 col-height intro text-center' },
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        '"With Great Design Comes Great Responsibility of Carving it."'
	                    ),
	                    ' My first touch with font-end development.'
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_menily', src: '../images/menily/MenilyLife.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        _react2['default'].createElement(
	                            'h3',
	                            null,
	                            _react2['default'].createElement(
	                                'b',
	                                null,
	                                'Menily Blood'
	                            )
	                        ),
	                        ' This product was targeting blood donors and the one in need. Animation that takes place will a Donor registers himself was the most challenging part.',
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Animation'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Js'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'On boading'
	                                )
	                            )
	                        )
	                    )
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        _react2['default'].createElement(
	                            'h3',
	                            null,
	                            _react2['default'].createElement(
	                                'b',
	                                null,
	                                'Landing Page'
	                            )
	                        ),
	                        ' One of the most challenging landing page development. There was an animation to get each elements moving randomly within there fencings.',
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Animation'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Js'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'vanilla js'
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height ' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_menily', src: '../images/menily/Landing.png' })
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_menily', src: '../images/menily/benifits.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        _react2['default'].createElement(
	                            'h3',
	                            null,
	                            _react2['default'].createElement(
	                                'b',
	                                null,
	                                'Benefits Box'
	                            )
	                        ),
	                        'Among the most challenging js job. On selection ether by mouse or keyboard. It should scroll and show the slide. Due to unavability of similar library. It was performed in vanilla js.',
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Animation'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Js'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'vanilla js'
	                                )
	                            )
	                        )
	                    )
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        _react2['default'].createElement(
	                            'h3',
	                            null,
	                            _react2['default'].createElement(
	                                'b',
	                                null,
	                                'Home Page'
	                            )
	                        ),
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Html'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'css'
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_menily', src: '../images/menily/home.png' })
	                )
	            )
	        );
	    }
	});

	exports['default'] = Menily;
	module.exports = exports['default'];
	/*menily blood page*/ /*benifits page*/ /*home page*/ /*benefits page*/

/***/ },

/***/ 365:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var Menias = _react2['default'].createClass({
	    displayName: 'Menias',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            message: 'There was an error loading data.'
	        };
	    },

	    shouldComponentUpdate: function shouldComponentUpdate() {
	        return false;
	    },

	    getHomePage: function getHomePage() {
	        return _react2['default'].createElement(
	            'div',
	            null,
	            _react2['default'].createElement(
	                'div',
	                { className: 'row divider_strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-12 col-height text-center' },
	                    _react2['default'].createElement(
	                        'h3',
	                        null,
	                        _react2['default'].createElement(
	                            'b',
	                            null,
	                            'Homepage'
	                        )
	                    )
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_menily', src: '../images/menias/thumb.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        'Story for hooking visitor on page begins with the home page. Animation and properly laid design can play magic.',
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Animation'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Js'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'On boading'
	                                )
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    },
	    getOnboadingPage: function getOnboadingPage() {
	        return _react2['default'].createElement(
	            'div',
	            null,
	            _react2['default'].createElement(
	                'div',
	                { className: 'row divider_strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-12 col-height text-center' },
	                    _react2['default'].createElement(
	                        'h3',
	                        null,
	                        _react2['default'].createElement(
	                            'b',
	                            null,
	                            'Onboading Page'
	                        )
	                    )
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        'Challenge was to introduce with the problem and solution while user move forward with onboarding process.',
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Presentation'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Animation'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Js'
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height ' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_menily', src: '../images/menias/slide1.png' })
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_menily', src: '../images/menias/slide2.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        'Visual stats make better and long lasting impact. But to achieve it you need certain level of effort. Vanilla js was used to draw animation timeline. Chat.js was further customized to meet the design needs.',
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Animation'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Js'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'svg'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'css'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'html'
	                                )
	                            )
	                        )
	                    )
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        'One of the best animation developed. using css and js.',
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Animation'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Js'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'css'
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_menily', src: '../images/menias/slide3.png' })
	                )
	            )
	        );
	    },
	    getSearchPage: function getSearchPage() {
	        return _react2['default'].createElement(
	            'div',
	            null,
	            _react2['default'].createElement(
	                'div',
	                { className: 'row divider_strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-12 col-height text-center' },
	                    _react2['default'].createElement(
	                        'h3',
	                        null,
	                        _react2['default'].createElement(
	                            'b',
	                            null,
	                            'Menias Search for doctors, Hospitals and Labrories'
	                        )
	                    )
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_menily', src: '../images/menias/search.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        'First product of Menias. It a search engine which helps patients find hospitals, Labrories and Pharmasuticals near them. Current listing were from delhi only.',
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'search engine'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Js'
	                                )
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    },
	    render: function render() {

	        return _react2['default'].createElement(
	            'div',
	            { className: '' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-4 col-height text-center' },
	                    _react2['default'].createElement('img', { className: 'logo', src: '../images/menias/logo.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-8 col-height intro', style: { "paddingTop": "12px" } },
	                    _react2['default'].createElement(
	                        'span',
	                        { className: 'brand' },
	                        ' A '
	                    ),
	                    ', healthcare startup that aimed to connect discrete healthcare bodies together. ',
	                    _react2['default'].createElement('br', null),
	                    'Single platform for ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'Hospitals'
	                    ),
	                    ', ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'Doctors'
	                    ),
	                    ', ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'Labrories'
	                    ),
	                    ' and ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'Pharmasuticals'
	                    ),
	                    '.'
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-12 col-height intro text-center' },
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        '"With Great Design Comes Great Responsibility of Carving it."'
	                    ),
	                    ' Full stack development. Initial lauch comproised of search for doctors, hospitals and Pharmasuticals in and around Delhi. Lively home page and Presentable onboarding.'
	                )
	            ),
	            this.getHomePage(),
	            this.getOnboadingPage(),
	            this.getSearchPage()
	        );
	    }
	});

	exports['default'] = Menias;
	module.exports = exports['default'];
	/*menily blood page*/ /*benifits page*/ /*slide page*/ /*slide page*/ /*search page*/ /*home page*/

/***/ },

/***/ 366:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _reactFontawesome = __webpack_require__(353);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	var AngularjsSeed = _react2['default'].createClass({
	    displayName: 'AngularjsSeed',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            message: 'There was an error loading data.'
	        };
	    },

	    shouldComponentUpdate: function shouldComponentUpdate() {
	        return false;
	    },

	    render: function render() {
	        var icon_style = {
	            textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
	            margin: "3rem",
	            color: "#000"
	        };
	        return _react2['default'].createElement(
	            'div',
	            { className: '' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-4 col-height text-center' },
	                    _react2['default'].createElement('img', { className: 'logo', src: '../images/angularjsseed/logo.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-8 col-height intro', style: { "paddingTop": "50px" } },
	                    _react2['default'].createElement(
	                        'span',
	                        { className: 'brand' },
	                        ' Angularjs Seed '
	                    ),
	                    ', This project is an application skeleton for a typical AngularJS web app. To be used for quick bootstrap any angular webapp projects and dev environment for these projects.'
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-12 col-height intro text-center' },
	                    'Bootstraping an Project comes with same tedious steps. The effort of setting up project structure, managed code baseline and setting up taskrunners to help with the bunding, can be saved. If we have skeleton to build upon. So created this angularjs seed. Working on Angularjs Seed with ECMA 6 Norms.',
	                    _react2['default'].createElement('br', null),
	                    'Find it at',
	                    _react2['default'].createElement(
	                        'a',
	                        { href: 'https://github.com/roshanraj/angular-webpack-seed', target: '_blank' },
	                        _react2['default'].createElement(_reactFontawesome2['default'], {
	                            className: '',
	                            name: 'github',
	                            size: '3x',
	                            style: icon_style
	                        })
	                    )
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement('div', { className: 'col-md-12 col-height' })
	            )
	        );
	    }
	});

	exports['default'] = AngularjsSeed;
	module.exports = exports['default'];
	/*menily blood page*/ /*home page*/

/***/ },

/***/ 367:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var OpenFlush = _react2['default'].createClass({
	    displayName: 'OpenFlush',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            message: 'There was an error loading data.'
	        };
	    },

	    shouldComponentUpdate: function shouldComponentUpdate() {
	        return false;
	    },

	    getProblem: function getProblem() {
	        return _react2['default'].createElement(
	            'div',
	            null,
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-12 col-height intro text-left' },
	                    _react2['default'].createElement(
	                        'h2',
	                        null,
	                        'Problem Statement'
	                    ),
	                    _react2['default'].createElement('br', null),
	                    'Create an onlime multiplayer card game.',
	                    _react2['default'].createElement('br', null),
	                    ' Where a group of people sit together to play OpenFlush. On a table there could at max 5 people. there are categories based on the value of chip that is to be put on bet. Winner takes all the money on the table. Its a fast and entertaining game.'
	                )
	            )
	        );
	    },
	    getVideo: function getVideo() {
	        return _react2['default'].createElement(
	            'div',
	            null,
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-12 col-height side_panel ', style: { textAlign: "center" } },
	                    _react2['default'].createElement('iframe', { className: 'video', width: '853', height: '480', src: 'https://www.youtube.com/embed/axxcczqIjsk', frameborder: '0', allowfullscreen: true })
	                )
	            )
	        );
	    },

	    render: function render() {

	        return _react2['default'].createElement(
	            'div',
	            { className: '' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-4 col-height text-center' },
	                    _react2['default'].createElement('img', { className: 'logo', src: '../images/openflush/logo.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-8 col-height intro', style: { "paddingTop": "45px" } },
	                    _react2['default'].createElement(
	                        'span',
	                        { className: 'brand' },
	                        ' A '
	                    ),
	                    ' multiplayer online card game. Based on ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        '"Teen Patti" '
	                    ),
	                    ', a popular card game'
	                )
	            ),
	            this.getVideo(),
	            this.getProblem()
	        );
	    }
	});

	exports['default'] = OpenFlush;
	module.exports = exports['default'];
	/*menily blood page*/ /*menily blood page*/

/***/ },

/***/ 368:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var Ict = _react2['default'].createClass({
	    displayName: 'Ict',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            message: 'There was an error loading data.'
	        };
	    },

	    shouldComponentUpdate: function shouldComponentUpdate() {
	        return false;
	    },
	    getProblem: function getProblem() {
	        return _react2['default'].createElement(
	            'div',
	            null,
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_lk', src: '../images/codetutor/ict1.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        'Simple introduction to "Logic" and its importance in programming.',
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'tutorial'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'visual'
	                                )
	                            )
	                        )
	                    )
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height side_panel' },
	                    _react2['default'].createElement(
	                        'div',
	                        { className: 'content' },
	                        'An interactive code, algorithm and flowchart drafter. That automatically genrates code, algorithm and its flowchart based on user behavior and selections.',
	                        _react2['default'].createElement('div', { className: 'divider' }),
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'list-tags' },
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'auto code generator'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'auto flowchart generator'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'auto algorithm generator'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'li',
	                                null,
	                                _react2['default'].createElement(
	                                    'a',
	                                    null,
	                                    'Js'
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-6 col-height ' },
	                    _react2['default'].createElement('img', { className: 'side_img side_img_lk', src: '../images/codetutor/ict2.png' })
	                )
	            )
	        );
	    },

	    render: function render() {

	        return _react2['default'].createElement(
	            'div',
	            { className: '' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-4 col-height text-center' },
	                    _react2['default'].createElement('img', { className: 'logo', src: '../images/codetutor/logo.png' })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-8 col-height intro', style: { "paddingTop": "36px" } },
	                    _react2['default'].createElement(
	                        'span',
	                        { className: 'brand' },
	                        ' An '
	                    ),
	                    ' interactive way to explain what ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'logic'
	                    ),
	                    ' means and its role in programming. With a ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'code'
	                    ),
	                    ', ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'algorithm '
	                    ),
	                    'and ',
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'flow chart generator'
	                    ),
	                    ' to help people understand better.'
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'row strip' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'col-md-12 col-height intro text-center' },
	                    _react2['default'].createElement(
	                        'b',
	                        null,
	                        'Experiment and visuals enhances topic understanding'
	                    ),
	                    ' Most of the people lack basic of programming. ',
	                    _react2['default'].createElement('br', null),
	                    'So I designed, this simple page. That explains what logic is and has a inbuild visual programmer, flowchart and algorithm drafter to explain person better how to think and code.'
	                )
	            ),
	            this.getProblem()
	        );
	    }
	});

	exports['default'] = Ict;
	module.exports = exports['default'];
	/*top*/ /*bottom*/ /*home page*/

/***/ },

/***/ 369:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = errorHandler;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var _viewsRouteError = __webpack_require__(370);

	var _viewsRouteError2 = _interopRequireDefault(_viewsRouteError);

	function errorHandler(Component) {
	  var originalRender = Component.prototype.render;

	  Component.prototype.render = function tryRender() {
	    try {
	      return originalRender.apply(this, arguments);
	    } catch (err) {
	      console.error(err);
	      return _react2['default'].createElement(_viewsRouteError2['default'], { error: err, component: this });
	    }
	  };

	  return Component;
	}

	module.exports = exports['default'];

/***/ },

/***/ 370:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(88);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _react = __webpack_require__(91);

	var _react2 = _interopRequireDefault(_react);

	var RouteError = _react2['default'].createClass({
	  displayName: 'RouteError',

	  componentWillMount: function componentWillMount() {},

	  componentWillUnmount: function componentWillUnmount() {},

	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      { className: 'alert alert-block alert-error' },
	      _react2['default'].createElement(
	        'div',
	        { style: { fontSize: 24, marginBottom: 10 } },
	        _react2['default'].createElement('span', { className: 'icon-exclamation', style: { fontSize: 20, marginRight: 10 } }),
	        _react2['default'].createElement(
	          'span',
	          null,
	          'Oops! Something went wrong'
	        )
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'It looks like you\'ve hit an issue in application. Don\'t worry though! We monitor and it\'s likely we\'re already looking into this!'
	      )
	    );
	  }
	});

	exports['default'] = RouteError;
	module.exports = exports['default'];

/***/ }

});