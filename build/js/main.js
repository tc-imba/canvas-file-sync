/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = vendor_stable;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(5)

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*globals jQuery, define, module, exports, require, window, document, postMessage */
(function (factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
})(function ($, undefined) {
	"use strict";
	/*!
  * jsTree 3.3.4
  * http://jstree.com/
  *
  * Copyright (c) 2014 Ivan Bozhanov (http://vakata.com)
  *
  * Licensed same as jquery - under the terms of the MIT License
  *   http://www.opensource.org/licenses/mit-license.php
  */
	/*!
  * if using jslint please allow for the jQuery global and use following options:
  * jslint: loopfunc: true, browser: true, ass: true, bitwise: true, continue: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, white: true
  */
	/*jshint -W083 */

	// prevent another load? maybe there is a better way?

	if ($.jstree) {
		return;
	}

	/**
  * ### jsTree core functionality
  */

	// internal variables
	var instance_counter = 0,
	    ccp_node = false,
	    ccp_mode = false,
	    ccp_inst = false,
	    themes_loaded = [],
	    src = $('script:last').attr('src'),
	    document = window.document; // local variable is always faster to access then a global

	/**
  * holds all jstree related functions and variables, including the actual class and methods to create, access and manipulate instances.
  * @name $.jstree
  */
	$.jstree = {
		/**
   * specifies the jstree version in use
   * @name $.jstree.version
   */
		version: '3.3.4',
		/**
   * holds all the default options used when creating new instances
   * @name $.jstree.defaults
   */
		defaults: {
			/**
    * configure which plugins will be active on an instance. Should be an array of strings, where each element is a plugin name. The default is `[]`
    * @name $.jstree.defaults.plugins
    */
			plugins: []
		},
		/**
   * stores all loaded jstree plugins (used internally)
   * @name $.jstree.plugins
   */
		plugins: {},
		path: src && src.indexOf('/') !== -1 ? src.replace(/\/[^\/]+$/, '') : '',
		idregex: /[\\:&!^|()\[\]<>@*'+~#";.,=\- \/${}%?`]/g,
		root: '#'
	};

	/**
  * creates a jstree instance
  * @name $.jstree.create(el [, options])
  * @param {DOMElement|jQuery|String} el the element to create the instance on, can be jQuery extended or a selector
  * @param {Object} options options for this instance (extends `$.jstree.defaults`)
  * @return {jsTree} the new instance
  */
	$.jstree.create = function (el, options) {
		var tmp = new $.jstree.core(++instance_counter),
		    opt = options;
		options = $.extend(true, {}, $.jstree.defaults, options);
		if (opt && opt.plugins) {
			options.plugins = opt.plugins;
		}
		$.each(options.plugins, function (i, k) {
			if (i !== 'core') {
				tmp = tmp.plugin(k, options[k]);
			}
		});
		$(el).data('jstree', tmp);
		tmp.init(el, options);
		return tmp;
	};
	/**
  * remove all traces of jstree from the DOM and destroy all instances
  * @name $.jstree.destroy()
  */
	$.jstree.destroy = function () {
		$('.jstree:jstree').jstree('destroy');
		$(document).off('.jstree');
	};
	/**
  * the jstree class constructor, used only internally
  * @private
  * @name $.jstree.core(id)
  * @param {Number} id this instance's index
  */
	$.jstree.core = function (id) {
		this._id = id;
		this._cnt = 0;
		this._wrk = null;
		this._data = {
			core: {
				themes: {
					name: false,
					dots: false,
					icons: false,
					ellipsis: false
				},
				selected: [],
				last_error: {},
				working: false,
				worker_queue: [],
				focused: null
			}
		};
	};
	/**
  * get a reference to an existing instance
  *
  * __Examples__
  *
  *	// provided a container with an ID of "tree", and a nested node with an ID of "branch"
  *	// all of there will return the same instance
  *	$.jstree.reference('tree');
  *	$.jstree.reference('#tree');
  *	$.jstree.reference($('#tree'));
  *	$.jstree.reference(document.getElementByID('tree'));
  *	$.jstree.reference('branch');
  *	$.jstree.reference('#branch');
  *	$.jstree.reference($('#branch'));
  *	$.jstree.reference(document.getElementByID('branch'));
  *
  * @name $.jstree.reference(needle)
  * @param {DOMElement|jQuery|String} needle
  * @return {jsTree|null} the instance or `null` if not found
  */
	$.jstree.reference = function (needle) {
		var tmp = null,
		    obj = null;
		if (needle && needle.id && (!needle.tagName || !needle.nodeType)) {
			needle = needle.id;
		}

		if (!obj || !obj.length) {
			try {
				obj = $(needle);
			} catch (ignore) {}
		}
		if (!obj || !obj.length) {
			try {
				obj = $('#' + needle.replace($.jstree.idregex, '\\$&'));
			} catch (ignore) {}
		}
		if (obj && obj.length && (obj = obj.closest('.jstree')).length && (obj = obj.data('jstree'))) {
			tmp = obj;
		} else {
			$('.jstree').each(function () {
				var inst = $(this).data('jstree');
				if (inst && inst._model.data[needle]) {
					tmp = inst;
					return false;
				}
			});
		}
		return tmp;
	};
	/**
  * Create an instance, get an instance or invoke a command on a instance.
  *
  * If there is no instance associated with the current node a new one is created and `arg` is used to extend `$.jstree.defaults` for this new instance. There would be no return value (chaining is not broken).
  *
  * If there is an existing instance and `arg` is a string the command specified by `arg` is executed on the instance, with any additional arguments passed to the function. If the function returns a value it will be returned (chaining could break depending on function).
  *
  * If there is an existing instance and `arg` is not a string the instance itself is returned (similar to `$.jstree.reference`).
  *
  * In any other case - nothing is returned and chaining is not broken.
  *
  * __Examples__
  *
  *	$('#tree1').jstree(); // creates an instance
  *	$('#tree2').jstree({ plugins : [] }); // create an instance with some options
  *	$('#tree1').jstree('open_node', '#branch_1'); // call a method on an existing instance, passing additional arguments
  *	$('#tree2').jstree(); // get an existing instance (or create an instance)
  *	$('#tree2').jstree(true); // get an existing instance (will not create new instance)
  *	$('#branch_1').jstree().select_node('#branch_1'); // get an instance (using a nested element and call a method)
  *
  * @name $().jstree([arg])
  * @param {String|Object} arg
  * @return {Mixed}
  */
	$.fn.jstree = function (arg) {
		// check for string argument
		var is_method = typeof arg === 'string',
		    args = Array.prototype.slice.call(arguments, 1),
		    result = null;
		if (arg === true && !this.length) {
			return false;
		}
		this.each(function () {
			// get the instance (if there is one) and method (if it exists)
			var instance = $.jstree.reference(this),
			    method = is_method && instance ? instance[arg] : null;
			// if calling a method, and method is available - execute on the instance
			result = is_method && method ? method.apply(instance, args) : null;
			// if there is no instance and no method is being called - create one
			if (!instance && !is_method && (arg === undefined || $.isPlainObject(arg))) {
				$.jstree.create(this, arg);
			}
			// if there is an instance and no method is called - return the instance
			if (instance && !is_method || arg === true) {
				result = instance || false;
			}
			// if there was a method call which returned a result - break and return the value
			if (result !== null && result !== undefined) {
				return false;
			}
		});
		// if there was a method call with a valid return value - return that, otherwise continue the chain
		return result !== null && result !== undefined ? result : this;
	};
	/**
  * used to find elements containing an instance
  *
  * __Examples__
  *
  *	$('div:jstree').each(function () {
  *		$(this).jstree('destroy');
  *	});
  *
  * @name $(':jstree')
  * @return {jQuery}
  */
	$.expr.pseudos.jstree = $.expr.createPseudo(function (search) {
		return function (a) {
			return $(a).hasClass('jstree') && $(a).data('jstree') !== undefined;
		};
	});

	/**
  * stores all defaults for the core
  * @name $.jstree.defaults.core
  */
	$.jstree.defaults.core = {
		/**
   * data configuration
   *
   * If left as `false` the HTML inside the jstree container element is used to populate the tree (that should be an unordered list with list items).
   *
   * You can also pass in a HTML string or a JSON array here.
   *
   * It is possible to pass in a standard jQuery-like AJAX config and jstree will automatically determine if the response is JSON or HTML and use that to populate the tree.
   * In addition to the standard jQuery ajax options here you can suppy functions for `data` and `url`, the functions will be run in the current instance's scope and a param will be passed indicating which node is being loaded, the return value of those functions will be used.
   *
   * The last option is to specify a function, that function will receive the node being loaded as argument and a second param which is a function which should be called with the result.
   *
   * __Examples__
   *
   *	// AJAX
   *	$('#tree').jstree({
   *		'core' : {
   *			'data' : {
   *				'url' : '/get/children/',
   *				'data' : function (node) {
   *					return { 'id' : node.id };
   *				}
   *			}
   *		});
   *
   *	// direct data
   *	$('#tree').jstree({
   *		'core' : {
   *			'data' : [
   *				'Simple root node',
   *				{
   *					'id' : 'node_2',
   *					'text' : 'Root node with options',
   *					'state' : { 'opened' : true, 'selected' : true },
   *					'children' : [ { 'text' : 'Child 1' }, 'Child 2']
   *				}
   *			]
   *		}
   *	});
   *
   *	// function
   *	$('#tree').jstree({
   *		'core' : {
   *			'data' : function (obj, callback) {
   *				callback.call(this, ['Root 1', 'Root 2']);
   *			}
   *		});
   *
   * @name $.jstree.defaults.core.data
   */
		data: false,
		/**
   * configure the various strings used throughout the tree
   *
   * You can use an object where the key is the string you need to replace and the value is your replacement.
   * Another option is to specify a function which will be called with an argument of the needed string and should return the replacement.
   * If left as `false` no replacement is made.
   *
   * __Examples__
   *
   *	$('#tree').jstree({
   *		'core' : {
   *			'strings' : {
   *				'Loading ...' : 'Please wait ...'
   *			}
   *		}
   *	});
   *
   * @name $.jstree.defaults.core.strings
   */
		strings: false,
		/**
   * determines what happens when a user tries to modify the structure of the tree
   * If left as `false` all operations like create, rename, delete, move or copy are prevented.
   * You can set this to `true` to allow all interactions or use a function to have better control.
   *
   * __Examples__
   *
   *	$('#tree').jstree({
   *		'core' : {
   *			'check_callback' : function (operation, node, node_parent, node_position, more) {
   *				// operation can be 'create_node', 'rename_node', 'delete_node', 'move_node', 'copy_node' or 'edit'
   *				// in case of 'rename_node' node_position is filled with the new node name
   *				return operation === 'rename_node' ? true : false;
   *			}
   *		}
   *	});
   *
   * @name $.jstree.defaults.core.check_callback
   */
		check_callback: false,
		/**
   * a callback called with a single object parameter in the instance's scope when something goes wrong (operation prevented, ajax failed, etc)
   * @name $.jstree.defaults.core.error
   */
		error: $.noop,
		/**
   * the open / close animation duration in milliseconds - set this to `false` to disable the animation (default is `200`)
   * @name $.jstree.defaults.core.animation
   */
		animation: 200,
		/**
   * a boolean indicating if multiple nodes can be selected
   * @name $.jstree.defaults.core.multiple
   */
		multiple: true,
		/**
   * theme configuration object
   * @name $.jstree.defaults.core.themes
   */
		themes: {
			/**
    * the name of the theme to use (if left as `false` the default theme is used)
    * @name $.jstree.defaults.core.themes.name
    */
			name: false,
			/**
    * the URL of the theme's CSS file, leave this as `false` if you have manually included the theme CSS (recommended). You can set this to `true` too which will try to autoload the theme.
    * @name $.jstree.defaults.core.themes.url
    */
			url: false,
			/**
    * the location of all jstree themes - only used if `url` is set to `true`
    * @name $.jstree.defaults.core.themes.dir
    */
			dir: false,
			/**
    * a boolean indicating if connecting dots are shown
    * @name $.jstree.defaults.core.themes.dots
    */
			dots: true,
			/**
    * a boolean indicating if node icons are shown
    * @name $.jstree.defaults.core.themes.icons
    */
			icons: true,
			/**
    * a boolean indicating if node ellipsis should be shown - this only works with a fixed with on the container
    * @name $.jstree.defaults.core.themes.ellipsis
    */
			ellipsis: false,
			/**
    * a boolean indicating if the tree background is striped
    * @name $.jstree.defaults.core.themes.stripes
    */
			stripes: false,
			/**
    * a string (or boolean `false`) specifying the theme variant to use (if the theme supports variants)
    * @name $.jstree.defaults.core.themes.variant
    */
			variant: false,
			/**
    * a boolean specifying if a reponsive version of the theme should kick in on smaller screens (if the theme supports it). Defaults to `false`.
    * @name $.jstree.defaults.core.themes.responsive
    */
			responsive: false
		},
		/**
   * if left as `true` all parents of all selected nodes will be opened once the tree loads (so that all selected nodes are visible to the user)
   * @name $.jstree.defaults.core.expand_selected_onload
   */
		expand_selected_onload: true,
		/**
   * if left as `true` web workers will be used to parse incoming JSON data where possible, so that the UI will not be blocked by large requests. Workers are however about 30% slower. Defaults to `true`
   * @name $.jstree.defaults.core.worker
   */
		worker: true,
		/**
   * Force node text to plain text (and escape HTML). Defaults to `false`
   * @name $.jstree.defaults.core.force_text
   */
		force_text: false,
		/**
   * Should the node should be toggled if the text is double clicked . Defaults to `true`
   * @name $.jstree.defaults.core.dblclick_toggle
   */
		dblclick_toggle: true
	};
	$.jstree.core.prototype = {
		/**
   * used to decorate an instance with a plugin. Used internally.
   * @private
   * @name plugin(deco [, opts])
   * @param  {String} deco the plugin to decorate with
   * @param  {Object} opts options for the plugin
   * @return {jsTree}
   */
		plugin: function plugin(deco, opts) {
			var Child = $.jstree.plugins[deco];
			if (Child) {
				this._data[deco] = {};
				Child.prototype = this;
				return new Child(opts, this);
			}
			return this;
		},
		/**
   * initialize the instance. Used internally.
   * @private
   * @name init(el, optons)
   * @param {DOMElement|jQuery|String} el the element we are transforming
   * @param {Object} options options for this instance
   * @trigger init.jstree, loading.jstree, loaded.jstree, ready.jstree, changed.jstree
   */
		init: function init(el, options) {
			this._model = {
				data: {},
				changed: [],
				force_full_redraw: false,
				redraw_timeout: false,
				default_state: {
					loaded: true,
					opened: false,
					selected: false,
					disabled: false
				}
			};
			this._model.data[$.jstree.root] = {
				id: $.jstree.root,
				parent: null,
				parents: [],
				children: [],
				children_d: [],
				state: { loaded: false }
			};

			this.element = $(el).addClass('jstree jstree-' + this._id);
			this.settings = options;

			this._data.core.ready = false;
			this._data.core.loaded = false;
			this._data.core.rtl = this.element.css("direction") === "rtl";
			this.element[this._data.core.rtl ? 'addClass' : 'removeClass']("jstree-rtl");
			this.element.attr('role', 'tree');
			if (this.settings.core.multiple) {
				this.element.attr('aria-multiselectable', true);
			}
			if (!this.element.attr('tabindex')) {
				this.element.attr('tabindex', '0');
			}

			this.bind();
			/**
    * triggered after all events are bound
    * @event
    * @name init.jstree
    */
			this.trigger("init");

			this._data.core.original_container_html = this.element.find(" > ul > li").clone(true);
			this._data.core.original_container_html.find("li").addBack().contents().filter(function () {
				return this.nodeType === 3 && (!this.nodeValue || /^\s+$/.test(this.nodeValue));
			}).remove();
			this.element.html("<" + "ul class='jstree-container-ul jstree-children' role='group'><" + "li id='j" + this._id + "_loading' class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='tree-item'><i class='jstree-icon jstree-ocl'></i><" + "a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>");
			this.element.attr('aria-activedescendant', 'j' + this._id + '_loading');
			this._data.core.li_height = this.get_container_ul().children("li").first().outerHeight() || 24;
			this._data.core.node = this._create_prototype_node();
			/**
    * triggered after the loading text is shown and before loading starts
    * @event
    * @name loading.jstree
    */
			this.trigger("loading");
			this.load_node($.jstree.root);
		},
		/**
   * destroy an instance
   * @name destroy()
   * @param  {Boolean} keep_html if not set to `true` the container will be emptied, otherwise the current DOM elements will be kept intact
   */
		destroy: function destroy(keep_html) {
			/**
    * triggered before the tree is destroyed
    * @event
    * @name destroy.jstree
    */
			this.trigger("destroy");
			if (this._wrk) {
				try {
					window.URL.revokeObjectURL(this._wrk);
					this._wrk = null;
				} catch (ignore) {}
			}
			if (!keep_html) {
				this.element.empty();
			}
			this.teardown();
		},
		/**
   * Create prototype node
   */
		_create_prototype_node: function _create_prototype_node() {
			var _node = document.createElement('LI'),
			    _temp1,
			    _temp2;
			_node.setAttribute('role', 'treeitem');
			_temp1 = document.createElement('I');
			_temp1.className = 'jstree-icon jstree-ocl';
			_temp1.setAttribute('role', 'presentation');
			_node.appendChild(_temp1);
			_temp1 = document.createElement('A');
			_temp1.className = 'jstree-anchor';
			_temp1.setAttribute('href', '#');
			_temp1.setAttribute('tabindex', '-1');
			_temp2 = document.createElement('I');
			_temp2.className = 'jstree-icon jstree-themeicon';
			_temp2.setAttribute('role', 'presentation');
			_temp1.appendChild(_temp2);
			_node.appendChild(_temp1);
			_temp1 = _temp2 = null;

			return _node;
		},
		/**
   * part of the destroying of an instance. Used internally.
   * @private
   * @name teardown()
   */
		teardown: function teardown() {
			this.unbind();
			this.element.removeClass('jstree').removeData('jstree').find("[class^='jstree']").addBack().attr("class", function () {
				return this.className.replace(/jstree[^ ]*|$/ig, '');
			});
			this.element = null;
		},
		/**
   * bind all events. Used internally.
   * @private
   * @name bind()
   */
		bind: function bind() {
			var word = '',
			    tout = null,
			    was_click = 0;
			this.element.on("dblclick.jstree", function (e) {
				if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
					return true;
				}
				if (document.selection && document.selection.empty) {
					document.selection.empty();
				} else {
					if (window.getSelection) {
						var sel = window.getSelection();
						try {
							sel.removeAllRanges();
							sel.collapse();
						} catch (ignore) {}
					}
				}
			}).on("mousedown.jstree", $.proxy(function (e) {
				if (e.target === this.element[0]) {
					e.preventDefault(); // prevent losing focus when clicking scroll arrows (FF, Chrome)
					was_click = +new Date(); // ie does not allow to prevent losing focus
				}
			}, this)).on("mousedown.jstree", ".jstree-ocl", function (e) {
				e.preventDefault(); // prevent any node inside from losing focus when clicking the open/close icon
			}).on("click.jstree", ".jstree-ocl", $.proxy(function (e) {
				this.toggle_node(e.target);
			}, this)).on("dblclick.jstree", ".jstree-anchor", $.proxy(function (e) {
				if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
					return true;
				}
				if (this.settings.core.dblclick_toggle) {
					this.toggle_node(e.target);
				}
			}, this)).on("click.jstree", ".jstree-anchor", $.proxy(function (e) {
				e.preventDefault();
				if (e.currentTarget !== document.activeElement) {
					$(e.currentTarget).focus();
				}
				this.activate_node(e.currentTarget, e);
			}, this)).on('keydown.jstree', '.jstree-anchor', $.proxy(function (e) {
				if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
					return true;
				}
				if (e.which !== 32 && e.which !== 13 && (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) {
					return true;
				}
				var o = null;
				if (this._data.core.rtl) {
					if (e.which === 37) {
						e.which = 39;
					} else if (e.which === 39) {
						e.which = 37;
					}
				}
				switch (e.which) {
					case 32:
						// aria defines space only with Ctrl
						if (e.ctrlKey) {
							e.type = "click";
							$(e.currentTarget).trigger(e);
						}
						break;
					case 13:
						// enter
						e.type = "click";
						$(e.currentTarget).trigger(e);
						break;
					case 37:
						// left
						e.preventDefault();
						if (this.is_open(e.currentTarget)) {
							this.close_node(e.currentTarget);
						} else {
							o = this.get_parent(e.currentTarget);
							if (o && o.id !== $.jstree.root) {
								this.get_node(o, true).children('.jstree-anchor').focus();
							}
						}
						break;
					case 38:
						// up
						e.preventDefault();
						o = this.get_prev_dom(e.currentTarget);
						if (o && o.length) {
							o.children('.jstree-anchor').focus();
						}
						break;
					case 39:
						// right
						e.preventDefault();
						if (this.is_closed(e.currentTarget)) {
							this.open_node(e.currentTarget, function (o) {
								this.get_node(o, true).children('.jstree-anchor').focus();
							});
						} else if (this.is_open(e.currentTarget)) {
							o = this.get_node(e.currentTarget, true).children('.jstree-children')[0];
							if (o) {
								$(this._firstChild(o)).children('.jstree-anchor').focus();
							}
						}
						break;
					case 40:
						// down
						e.preventDefault();
						o = this.get_next_dom(e.currentTarget);
						if (o && o.length) {
							o.children('.jstree-anchor').focus();
						}
						break;
					case 106:
						// aria defines * on numpad as open_all - not very common
						this.open_all();
						break;
					case 36:
						// home
						e.preventDefault();
						o = this._firstChild(this.get_container_ul()[0]);
						if (o) {
							$(o).children('.jstree-anchor').filter(':visible').focus();
						}
						break;
					case 35:
						// end
						e.preventDefault();
						this.element.find('.jstree-anchor').filter(':visible').last().focus();
						break;
					case 113:
						// f2 - safe to include - if check_callback is false it will fail
						e.preventDefault();
						this.edit(e.currentTarget);
						break;
					default:
						break;
					/*!
     // delete
     case 46:
     	e.preventDefault();
     	o = this.get_node(e.currentTarget);
     	if(o && o.id && o.id !== $.jstree.root) {
     		o = this.is_selected(o) ? this.get_selected() : o;
     		this.delete_node(o);
     	}
     	break;
     	*/
				}
			}, this)).on("load_node.jstree", $.proxy(function (e, data) {
				if (data.status) {
					if (data.node.id === $.jstree.root && !this._data.core.loaded) {
						this._data.core.loaded = true;
						if (this._firstChild(this.get_container_ul()[0])) {
							this.element.attr('aria-activedescendant', this._firstChild(this.get_container_ul()[0]).id);
						}
						/**
       * triggered after the root node is loaded for the first time
       * @event
       * @name loaded.jstree
       */
						this.trigger("loaded");
					}
					if (!this._data.core.ready) {
						setTimeout($.proxy(function () {
							if (this.element && !this.get_container_ul().find('.jstree-loading').length) {
								this._data.core.ready = true;
								if (this._data.core.selected.length) {
									if (this.settings.core.expand_selected_onload) {
										var tmp = [],
										    i,
										    j;
										for (i = 0, j = this._data.core.selected.length; i < j; i++) {
											tmp = tmp.concat(this._model.data[this._data.core.selected[i]].parents);
										}
										tmp = $.vakata.array_unique(tmp);
										for (i = 0, j = tmp.length; i < j; i++) {
											this.open_node(tmp[i], false, 0);
										}
									}
									this.trigger('changed', { 'action': 'ready', 'selected': this._data.core.selected });
								}
								/**
         * triggered after all nodes are finished loading
         * @event
         * @name ready.jstree
         */
								this.trigger("ready");
							}
						}, this), 0);
					}
				}
			}, this))
			// quick searching when the tree is focused
			.on('keypress.jstree', $.proxy(function (e) {
				if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
					return true;
				}
				if (tout) {
					clearTimeout(tout);
				}
				tout = setTimeout(function () {
					word = '';
				}, 500);

				var chr = String.fromCharCode(e.which).toLowerCase(),
				    col = this.element.find('.jstree-anchor').filter(':visible'),
				    ind = col.index(document.activeElement) || 0,
				    end = false;
				word += chr;

				// match for whole word from current node down (including the current node)
				if (word.length > 1) {
					col.slice(ind).each($.proxy(function (i, v) {
						if ($(v).text().toLowerCase().indexOf(word) === 0) {
							$(v).focus();
							end = true;
							return false;
						}
					}, this));
					if (end) {
						return;
					}

					// match for whole word from the beginning of the tree
					col.slice(0, ind).each($.proxy(function (i, v) {
						if ($(v).text().toLowerCase().indexOf(word) === 0) {
							$(v).focus();
							end = true;
							return false;
						}
					}, this));
					if (end) {
						return;
					}
				}
				// list nodes that start with that letter (only if word consists of a single char)
				if (new RegExp('^' + chr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '+$').test(word)) {
					// search for the next node starting with that letter
					col.slice(ind + 1).each($.proxy(function (i, v) {
						if ($(v).text().toLowerCase().charAt(0) === chr) {
							$(v).focus();
							end = true;
							return false;
						}
					}, this));
					if (end) {
						return;
					}

					// search from the beginning
					col.slice(0, ind + 1).each($.proxy(function (i, v) {
						if ($(v).text().toLowerCase().charAt(0) === chr) {
							$(v).focus();
							end = true;
							return false;
						}
					}, this));
					if (end) {
						return;
					}
				}
			}, this))
			// THEME RELATED
			.on("init.jstree", $.proxy(function () {
				var s = this.settings.core.themes;
				this._data.core.themes.dots = s.dots;
				this._data.core.themes.stripes = s.stripes;
				this._data.core.themes.icons = s.icons;
				this._data.core.themes.ellipsis = s.ellipsis;
				this.set_theme(s.name || "default", s.url);
				this.set_theme_variant(s.variant);
			}, this)).on("loading.jstree", $.proxy(function () {
				this[this._data.core.themes.dots ? "show_dots" : "hide_dots"]();
				this[this._data.core.themes.icons ? "show_icons" : "hide_icons"]();
				this[this._data.core.themes.stripes ? "show_stripes" : "hide_stripes"]();
				this[this._data.core.themes.ellipsis ? "show_ellipsis" : "hide_ellipsis"]();
			}, this)).on('blur.jstree', '.jstree-anchor', $.proxy(function (e) {
				this._data.core.focused = null;
				$(e.currentTarget).filter('.jstree-hovered').mouseleave();
				this.element.attr('tabindex', '0');
			}, this)).on('focus.jstree', '.jstree-anchor', $.proxy(function (e) {
				var tmp = this.get_node(e.currentTarget);
				if (tmp && tmp.id) {
					this._data.core.focused = tmp.id;
				}
				this.element.find('.jstree-hovered').not(e.currentTarget).mouseleave();
				$(e.currentTarget).mouseenter();
				this.element.attr('tabindex', '-1');
			}, this)).on('focus.jstree', $.proxy(function () {
				if (+new Date() - was_click > 500 && !this._data.core.focused) {
					was_click = 0;
					var act = this.get_node(this.element.attr('aria-activedescendant'), true);
					if (act) {
						act.find('> .jstree-anchor').focus();
					}
				}
			}, this)).on('mouseenter.jstree', '.jstree-anchor', $.proxy(function (e) {
				this.hover_node(e.currentTarget);
			}, this)).on('mouseleave.jstree', '.jstree-anchor', $.proxy(function (e) {
				this.dehover_node(e.currentTarget);
			}, this));
		},
		/**
   * part of the destroying of an instance. Used internally.
   * @private
   * @name unbind()
   */
		unbind: function unbind() {
			this.element.off('.jstree');
			$(document).off('.jstree-' + this._id);
		},
		/**
   * trigger an event. Used internally.
   * @private
   * @name trigger(ev [, data])
   * @param  {String} ev the name of the event to trigger
   * @param  {Object} data additional data to pass with the event
   */
		trigger: function trigger(ev, data) {
			if (!data) {
				data = {};
			}
			data.instance = this;
			this.element.triggerHandler(ev.replace('.jstree', '') + '.jstree', data);
		},
		/**
   * returns the jQuery extended instance container
   * @name get_container()
   * @return {jQuery}
   */
		get_container: function get_container() {
			return this.element;
		},
		/**
   * returns the jQuery extended main UL node inside the instance container. Used internally.
   * @private
   * @name get_container_ul()
   * @return {jQuery}
   */
		get_container_ul: function get_container_ul() {
			return this.element.children(".jstree-children").first();
		},
		/**
   * gets string replacements (localization). Used internally.
   * @private
   * @name get_string(key)
   * @param  {String} key
   * @return {String}
   */
		get_string: function get_string(key) {
			var a = this.settings.core.strings;
			if ($.isFunction(a)) {
				return a.call(this, key);
			}
			if (a && a[key]) {
				return a[key];
			}
			return key;
		},
		/**
   * gets the first child of a DOM node. Used internally.
   * @private
   * @name _firstChild(dom)
   * @param  {DOMElement} dom
   * @return {DOMElement}
   */
		_firstChild: function _firstChild(dom) {
			dom = dom ? dom.firstChild : null;
			while (dom !== null && dom.nodeType !== 1) {
				dom = dom.nextSibling;
			}
			return dom;
		},
		/**
   * gets the next sibling of a DOM node. Used internally.
   * @private
   * @name _nextSibling(dom)
   * @param  {DOMElement} dom
   * @return {DOMElement}
   */
		_nextSibling: function _nextSibling(dom) {
			dom = dom ? dom.nextSibling : null;
			while (dom !== null && dom.nodeType !== 1) {
				dom = dom.nextSibling;
			}
			return dom;
		},
		/**
   * gets the previous sibling of a DOM node. Used internally.
   * @private
   * @name _previousSibling(dom)
   * @param  {DOMElement} dom
   * @return {DOMElement}
   */
		_previousSibling: function _previousSibling(dom) {
			dom = dom ? dom.previousSibling : null;
			while (dom !== null && dom.nodeType !== 1) {
				dom = dom.previousSibling;
			}
			return dom;
		},
		/**
   * get the JSON representation of a node (or the actual jQuery extended DOM node) by using any input (child DOM element, ID string, selector, etc)
   * @name get_node(obj [, as_dom])
   * @param  {mixed} obj
   * @param  {Boolean} as_dom
   * @return {Object|jQuery}
   */
		get_node: function get_node(obj, as_dom) {
			if (obj && obj.id) {
				obj = obj.id;
			}
			var dom;
			try {
				if (this._model.data[obj]) {
					obj = this._model.data[obj];
				} else if (typeof obj === "string" && this._model.data[obj.replace(/^#/, '')]) {
					obj = this._model.data[obj.replace(/^#/, '')];
				} else if (typeof obj === "string" && (dom = $('#' + obj.replace($.jstree.idregex, '\\$&'), this.element)).length && this._model.data[dom.closest('.jstree-node').attr('id')]) {
					obj = this._model.data[dom.closest('.jstree-node').attr('id')];
				} else if ((dom = $(obj, this.element)).length && this._model.data[dom.closest('.jstree-node').attr('id')]) {
					obj = this._model.data[dom.closest('.jstree-node').attr('id')];
				} else if ((dom = $(obj, this.element)).length && dom.hasClass('jstree')) {
					obj = this._model.data[$.jstree.root];
				} else {
					return false;
				}

				if (as_dom) {
					obj = obj.id === $.jstree.root ? this.element : $('#' + obj.id.replace($.jstree.idregex, '\\$&'), this.element);
				}
				return obj;
			} catch (ex) {
				return false;
			}
		},
		/**
   * get the path to a node, either consisting of node texts, or of node IDs, optionally glued together (otherwise an array)
   * @name get_path(obj [, glue, ids])
   * @param  {mixed} obj the node
   * @param  {String} glue if you want the path as a string - pass the glue here (for example '/'), if a falsy value is supplied here, an array is returned
   * @param  {Boolean} ids if set to true build the path using ID, otherwise node text is used
   * @return {mixed}
   */
		get_path: function get_path(obj, glue, ids) {
			obj = obj.parents ? obj : this.get_node(obj);
			if (!obj || obj.id === $.jstree.root || !obj.parents) {
				return false;
			}
			var i,
			    j,
			    p = [];
			p.push(ids ? obj.id : obj.text);
			for (i = 0, j = obj.parents.length; i < j; i++) {
				p.push(ids ? obj.parents[i] : this.get_text(obj.parents[i]));
			}
			p = p.reverse().slice(1);
			return glue ? p.join(glue) : p;
		},
		/**
   * get the next visible node that is below the `obj` node. If `strict` is set to `true` only sibling nodes are returned.
   * @name get_next_dom(obj [, strict])
   * @param  {mixed} obj
   * @param  {Boolean} strict
   * @return {jQuery}
   */
		get_next_dom: function get_next_dom(obj, strict) {
			var tmp;
			obj = this.get_node(obj, true);
			if (obj[0] === this.element[0]) {
				tmp = this._firstChild(this.get_container_ul()[0]);
				while (tmp && tmp.offsetHeight === 0) {
					tmp = this._nextSibling(tmp);
				}
				return tmp ? $(tmp) : false;
			}
			if (!obj || !obj.length) {
				return false;
			}
			if (strict) {
				tmp = obj[0];
				do {
					tmp = this._nextSibling(tmp);
				} while (tmp && tmp.offsetHeight === 0);
				return tmp ? $(tmp) : false;
			}
			if (obj.hasClass("jstree-open")) {
				tmp = this._firstChild(obj.children('.jstree-children')[0]);
				while (tmp && tmp.offsetHeight === 0) {
					tmp = this._nextSibling(tmp);
				}
				if (tmp !== null) {
					return $(tmp);
				}
			}
			tmp = obj[0];
			do {
				tmp = this._nextSibling(tmp);
			} while (tmp && tmp.offsetHeight === 0);
			if (tmp !== null) {
				return $(tmp);
			}
			return obj.parentsUntil(".jstree", ".jstree-node").nextAll(".jstree-node:visible").first();
		},
		/**
   * get the previous visible node that is above the `obj` node. If `strict` is set to `true` only sibling nodes are returned.
   * @name get_prev_dom(obj [, strict])
   * @param  {mixed} obj
   * @param  {Boolean} strict
   * @return {jQuery}
   */
		get_prev_dom: function get_prev_dom(obj, strict) {
			var tmp;
			obj = this.get_node(obj, true);
			if (obj[0] === this.element[0]) {
				tmp = this.get_container_ul()[0].lastChild;
				while (tmp && tmp.offsetHeight === 0) {
					tmp = this._previousSibling(tmp);
				}
				return tmp ? $(tmp) : false;
			}
			if (!obj || !obj.length) {
				return false;
			}
			if (strict) {
				tmp = obj[0];
				do {
					tmp = this._previousSibling(tmp);
				} while (tmp && tmp.offsetHeight === 0);
				return tmp ? $(tmp) : false;
			}
			tmp = obj[0];
			do {
				tmp = this._previousSibling(tmp);
			} while (tmp && tmp.offsetHeight === 0);
			if (tmp !== null) {
				obj = $(tmp);
				while (obj.hasClass("jstree-open")) {
					obj = obj.children(".jstree-children").first().children(".jstree-node:visible:last");
				}
				return obj;
			}
			tmp = obj[0].parentNode.parentNode;
			return tmp && tmp.className && tmp.className.indexOf('jstree-node') !== -1 ? $(tmp) : false;
		},
		/**
   * get the parent ID of a node
   * @name get_parent(obj)
   * @param  {mixed} obj
   * @return {String}
   */
		get_parent: function get_parent(obj) {
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			return obj.parent;
		},
		/**
   * get a jQuery collection of all the children of a node (node must be rendered)
   * @name get_children_dom(obj)
   * @param  {mixed} obj
   * @return {jQuery}
   */
		get_children_dom: function get_children_dom(obj) {
			obj = this.get_node(obj, true);
			if (obj[0] === this.element[0]) {
				return this.get_container_ul().children(".jstree-node");
			}
			if (!obj || !obj.length) {
				return false;
			}
			return obj.children(".jstree-children").children(".jstree-node");
		},
		/**
   * checks if a node has children
   * @name is_parent(obj)
   * @param  {mixed} obj
   * @return {Boolean}
   */
		is_parent: function is_parent(obj) {
			obj = this.get_node(obj);
			return obj && (obj.state.loaded === false || obj.children.length > 0);
		},
		/**
   * checks if a node is loaded (its children are available)
   * @name is_loaded(obj)
   * @param  {mixed} obj
   * @return {Boolean}
   */
		is_loaded: function is_loaded(obj) {
			obj = this.get_node(obj);
			return obj && obj.state.loaded;
		},
		/**
   * check if a node is currently loading (fetching children)
   * @name is_loading(obj)
   * @param  {mixed} obj
   * @return {Boolean}
   */
		is_loading: function is_loading(obj) {
			obj = this.get_node(obj);
			return obj && obj.state && obj.state.loading;
		},
		/**
   * check if a node is opened
   * @name is_open(obj)
   * @param  {mixed} obj
   * @return {Boolean}
   */
		is_open: function is_open(obj) {
			obj = this.get_node(obj);
			return obj && obj.state.opened;
		},
		/**
   * check if a node is in a closed state
   * @name is_closed(obj)
   * @param  {mixed} obj
   * @return {Boolean}
   */
		is_closed: function is_closed(obj) {
			obj = this.get_node(obj);
			return obj && this.is_parent(obj) && !obj.state.opened;
		},
		/**
   * check if a node has no children
   * @name is_leaf(obj)
   * @param  {mixed} obj
   * @return {Boolean}
   */
		is_leaf: function is_leaf(obj) {
			return !this.is_parent(obj);
		},
		/**
   * loads a node (fetches its children using the `core.data` setting). Multiple nodes can be passed to by using an array.
   * @name load_node(obj [, callback])
   * @param  {mixed} obj
   * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives two arguments - the node and a boolean status
   * @return {Boolean}
   * @trigger load_node.jstree
   */
		load_node: function load_node(obj, callback) {
			var k, l, i, j, c;
			if ($.isArray(obj)) {
				this._load_nodes(obj.slice(), callback);
				return true;
			}
			obj = this.get_node(obj);
			if (!obj) {
				if (callback) {
					callback.call(this, obj, false);
				}
				return false;
			}
			// if(obj.state.loading) { } // the node is already loading - just wait for it to load and invoke callback? but if called implicitly it should be loaded again?
			if (obj.state.loaded) {
				obj.state.loaded = false;
				for (i = 0, j = obj.parents.length; i < j; i++) {
					this._model.data[obj.parents[i]].children_d = $.vakata.array_filter(this._model.data[obj.parents[i]].children_d, function (v) {
						return $.inArray(v, obj.children_d) === -1;
					});
				}
				for (k = 0, l = obj.children_d.length; k < l; k++) {
					if (this._model.data[obj.children_d[k]].state.selected) {
						c = true;
					}
					delete this._model.data[obj.children_d[k]];
				}
				if (c) {
					this._data.core.selected = $.vakata.array_filter(this._data.core.selected, function (v) {
						return $.inArray(v, obj.children_d) === -1;
					});
				}
				obj.children = [];
				obj.children_d = [];
				if (c) {
					this.trigger('changed', { 'action': 'load_node', 'node': obj, 'selected': this._data.core.selected });
				}
			}
			obj.state.failed = false;
			obj.state.loading = true;
			this.get_node(obj, true).addClass("jstree-loading").attr('aria-busy', true);
			this._load_node(obj, $.proxy(function (status) {
				obj = this._model.data[obj.id];
				obj.state.loading = false;
				obj.state.loaded = status;
				obj.state.failed = !obj.state.loaded;
				var dom = this.get_node(obj, true),
				    i = 0,
				    j = 0,
				    m = this._model.data,
				    has_children = false;
				for (i = 0, j = obj.children.length; i < j; i++) {
					if (m[obj.children[i]] && !m[obj.children[i]].state.hidden) {
						has_children = true;
						break;
					}
				}
				if (obj.state.loaded && dom && dom.length) {
					dom.removeClass('jstree-closed jstree-open jstree-leaf');
					if (!has_children) {
						dom.addClass('jstree-leaf');
					} else {
						if (obj.id !== '#') {
							dom.addClass(obj.state.opened ? 'jstree-open' : 'jstree-closed');
						}
					}
				}
				dom.removeClass("jstree-loading").attr('aria-busy', false);
				/**
     * triggered after a node is loaded
     * @event
     * @name load_node.jstree
     * @param {Object} node the node that was loading
     * @param {Boolean} status was the node loaded successfully
     */
				this.trigger('load_node', { "node": obj, "status": status });
				if (callback) {
					callback.call(this, obj, status);
				}
			}, this));
			return true;
		},
		/**
   * load an array of nodes (will also load unavailable nodes as soon as the appear in the structure). Used internally.
   * @private
   * @name _load_nodes(nodes [, callback])
   * @param  {array} nodes
   * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives one argument - the array passed to _load_nodes
   */
		_load_nodes: function _load_nodes(nodes, callback, is_callback, force_reload) {
			var r = true,
			    c = function c() {
				this._load_nodes(nodes, callback, true);
			},
			    m = this._model.data,
			    i,
			    j,
			    tmp = [];
			for (i = 0, j = nodes.length; i < j; i++) {
				if (m[nodes[i]] && (!m[nodes[i]].state.loaded && !m[nodes[i]].state.failed || !is_callback && force_reload)) {
					if (!this.is_loading(nodes[i])) {
						this.load_node(nodes[i], c);
					}
					r = false;
				}
			}
			if (r) {
				for (i = 0, j = nodes.length; i < j; i++) {
					if (m[nodes[i]] && m[nodes[i]].state.loaded) {
						tmp.push(nodes[i]);
					}
				}
				if (callback && !callback.done) {
					callback.call(this, tmp);
					callback.done = true;
				}
			}
		},
		/**
   * loads all unloaded nodes
   * @name load_all([obj, callback])
   * @param {mixed} obj the node to load recursively, omit to load all nodes in the tree
   * @param {function} callback a function to be executed once loading all the nodes is complete,
   * @trigger load_all.jstree
   */
		load_all: function load_all(obj, callback) {
			if (!obj) {
				obj = $.jstree.root;
			}
			obj = this.get_node(obj);
			if (!obj) {
				return false;
			}
			var to_load = [],
			    m = this._model.data,
			    c = m[obj.id].children_d,
			    i,
			    j;
			if (obj.state && !obj.state.loaded) {
				to_load.push(obj.id);
			}
			for (i = 0, j = c.length; i < j; i++) {
				if (m[c[i]] && m[c[i]].state && !m[c[i]].state.loaded) {
					to_load.push(c[i]);
				}
			}
			if (to_load.length) {
				this._load_nodes(to_load, function () {
					this.load_all(obj, callback);
				});
			} else {
				/**
     * triggered after a load_all call completes
     * @event
     * @name load_all.jstree
     * @param {Object} node the recursively loaded node
     */
				if (callback) {
					callback.call(this, obj);
				}
				this.trigger('load_all', { "node": obj });
			}
		},
		/**
   * handles the actual loading of a node. Used only internally.
   * @private
   * @name _load_node(obj [, callback])
   * @param  {mixed} obj
   * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives one argument - a boolean status
   * @return {Boolean}
   */
		_load_node: function _load_node(obj, callback) {
			var s = this.settings.core.data,
			    t;
			var notTextOrCommentNode = function notTextOrCommentNode() {
				return this.nodeType !== 3 && this.nodeType !== 8;
			};
			// use original HTML
			if (!s) {
				if (obj.id === $.jstree.root) {
					return this._append_html_data(obj, this._data.core.original_container_html.clone(true), function (status) {
						callback.call(this, status);
					});
				} else {
					return callback.call(this, false);
				}
				// return callback.call(this, obj.id === $.jstree.root ? this._append_html_data(obj, this._data.core.original_container_html.clone(true)) : false);
			}
			if ($.isFunction(s)) {
				return s.call(this, obj, $.proxy(function (d) {
					if (d === false) {
						callback.call(this, false);
					} else {
						this[typeof d === 'string' ? '_append_html_data' : '_append_json_data'](obj, typeof d === 'string' ? $($.parseHTML(d)).filter(notTextOrCommentNode) : d, function (status) {
							callback.call(this, status);
						});
					}
					// return d === false ? callback.call(this, false) : callback.call(this, this[typeof d === 'string' ? '_append_html_data' : '_append_json_data'](obj, typeof d === 'string' ? $(d) : d));
				}, this));
			}
			if ((typeof s === 'undefined' ? 'undefined' : _typeof(s)) === 'object') {
				if (s.url) {
					s = $.extend(true, {}, s);
					if ($.isFunction(s.url)) {
						s.url = s.url.call(this, obj);
					}
					if ($.isFunction(s.data)) {
						s.data = s.data.call(this, obj);
					}
					return $.ajax(s).done($.proxy(function (d, t, x) {
						var type = x.getResponseHeader('Content-Type');
						if (type && type.indexOf('json') !== -1 || (typeof d === 'undefined' ? 'undefined' : _typeof(d)) === "object") {
							return this._append_json_data(obj, d, function (status) {
								callback.call(this, status);
							});
							//return callback.call(this, this._append_json_data(obj, d));
						}
						if (type && type.indexOf('html') !== -1 || typeof d === "string") {
							return this._append_html_data(obj, $($.parseHTML(d)).filter(notTextOrCommentNode), function (status) {
								callback.call(this, status);
							});
							// return callback.call(this, this._append_html_data(obj, $(d)));
						}
						this._data.core.last_error = { 'error': 'ajax', 'plugin': 'core', 'id': 'core_04', 'reason': 'Could not load node', 'data': JSON.stringify({ 'id': obj.id, 'xhr': x }) };
						this.settings.core.error.call(this, this._data.core.last_error);
						return callback.call(this, false);
					}, this)).fail($.proxy(function (f) {
						this._data.core.last_error = { 'error': 'ajax', 'plugin': 'core', 'id': 'core_04', 'reason': 'Could not load node', 'data': JSON.stringify({ 'id': obj.id, 'xhr': f }) };
						callback.call(this, false);
						this.settings.core.error.call(this, this._data.core.last_error);
					}, this));
				}
				if ($.isArray(s)) {
					t = $.extend(true, [], s);
				} else if ($.isPlainObject(s)) {
					t = $.extend(true, {}, s);
				} else {
					t = s;
				}
				if (obj.id === $.jstree.root) {
					return this._append_json_data(obj, t, function (status) {
						callback.call(this, status);
					});
				} else {
					this._data.core.last_error = { 'error': 'nodata', 'plugin': 'core', 'id': 'core_05', 'reason': 'Could not load node', 'data': JSON.stringify({ 'id': obj.id }) };
					this.settings.core.error.call(this, this._data.core.last_error);
					return callback.call(this, false);
				}
				//return callback.call(this, (obj.id === $.jstree.root ? this._append_json_data(obj, t) : false) );
			}
			if (typeof s === 'string') {
				if (obj.id === $.jstree.root) {
					return this._append_html_data(obj, $($.parseHTML(s)).filter(notTextOrCommentNode), function (status) {
						callback.call(this, status);
					});
				} else {
					this._data.core.last_error = { 'error': 'nodata', 'plugin': 'core', 'id': 'core_06', 'reason': 'Could not load node', 'data': JSON.stringify({ 'id': obj.id }) };
					this.settings.core.error.call(this, this._data.core.last_error);
					return callback.call(this, false);
				}
				//return callback.call(this, (obj.id === $.jstree.root ? this._append_html_data(obj, $(s)) : false) );
			}
			return callback.call(this, false);
		},
		/**
   * adds a node to the list of nodes to redraw. Used only internally.
   * @private
   * @name _node_changed(obj [, callback])
   * @param  {mixed} obj
   */
		_node_changed: function _node_changed(obj) {
			obj = this.get_node(obj);
			if (obj) {
				this._model.changed.push(obj.id);
			}
		},
		/**
   * appends HTML content to the tree. Used internally.
   * @private
   * @name _append_html_data(obj, data)
   * @param  {mixed} obj the node to append to
   * @param  {String} data the HTML string to parse and append
   * @trigger model.jstree, changed.jstree
   */
		_append_html_data: function _append_html_data(dom, data, cb) {
			dom = this.get_node(dom);
			dom.children = [];
			dom.children_d = [];
			var dat = data.is('ul') ? data.children() : data,
			    par = dom.id,
			    chd = [],
			    dpc = [],
			    m = this._model.data,
			    p = m[par],
			    s = this._data.core.selected.length,
			    tmp,
			    i,
			    j;
			dat.each($.proxy(function (i, v) {
				tmp = this._parse_model_from_html($(v), par, p.parents.concat());
				if (tmp) {
					chd.push(tmp);
					dpc.push(tmp);
					if (m[tmp].children_d.length) {
						dpc = dpc.concat(m[tmp].children_d);
					}
				}
			}, this));
			p.children = chd;
			p.children_d = dpc;
			for (i = 0, j = p.parents.length; i < j; i++) {
				m[p.parents[i]].children_d = m[p.parents[i]].children_d.concat(dpc);
			}
			/**
    * triggered when new data is inserted to the tree model
    * @event
    * @name model.jstree
    * @param {Array} nodes an array of node IDs
    * @param {String} parent the parent ID of the nodes
    */
			this.trigger('model', { "nodes": dpc, 'parent': par });
			if (par !== $.jstree.root) {
				this._node_changed(par);
				this.redraw();
			} else {
				this.get_container_ul().children('.jstree-initial-node').remove();
				this.redraw(true);
			}
			if (this._data.core.selected.length !== s) {
				this.trigger('changed', { 'action': 'model', 'selected': this._data.core.selected });
			}
			cb.call(this, true);
		},
		/**
   * appends JSON content to the tree. Used internally.
   * @private
   * @name _append_json_data(obj, data)
   * @param  {mixed} obj the node to append to
   * @param  {String} data the JSON object to parse and append
   * @param  {Boolean} force_processing internal param - do not set
   * @trigger model.jstree, changed.jstree
   */
		_append_json_data: function _append_json_data(dom, data, cb, force_processing) {
			if (this.element === null) {
				return;
			}
			dom = this.get_node(dom);
			dom.children = [];
			dom.children_d = [];
			// *%$@!!!
			if (data.d) {
				data = data.d;
				if (typeof data === "string") {
					data = JSON.parse(data);
				}
			}
			if (!$.isArray(data)) {
				data = [data];
			}
			var w = null,
			    args = {
				'df': this._model.default_state,
				'dat': data,
				'par': dom.id,
				'm': this._model.data,
				't_id': this._id,
				't_cnt': this._cnt,
				'sel': this._data.core.selected
			},
			    func = function func(data, undefined) {
				if (data.data) {
					data = data.data;
				}
				var dat = data.dat,
				    par = data.par,
				    chd = [],
				    dpc = [],
				    add = [],
				    df = data.df,
				    t_id = data.t_id,
				    t_cnt = data.t_cnt,
				    m = data.m,
				    p = m[par],
				    sel = data.sel,
				    tmp,
				    i,
				    j,
				    rslt,
				    parse_flat = function parse_flat(d, p, ps) {
					if (!ps) {
						ps = [];
					} else {
						ps = ps.concat();
					}
					if (p) {
						ps.unshift(p);
					}
					var tid = d.id.toString(),
					    i,
					    j,
					    c,
					    e,
					    tmp = {
						id: tid,
						text: d.text || '',
						icon: d.icon !== undefined ? d.icon : true,
						parent: p,
						parents: ps,
						children: d.children || [],
						children_d: d.children_d || [],
						data: d.data,
						state: {},
						li_attr: { id: false },
						a_attr: { href: '#' },
						original: false
					};
					for (i in df) {
						if (df.hasOwnProperty(i)) {
							tmp.state[i] = df[i];
						}
					}
					if (d && d.data && d.data.jstree && d.data.jstree.icon) {
						tmp.icon = d.data.jstree.icon;
					}
					if (tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
						tmp.icon = true;
					}
					if (d && d.data) {
						tmp.data = d.data;
						if (d.data.jstree) {
							for (i in d.data.jstree) {
								if (d.data.jstree.hasOwnProperty(i)) {
									tmp.state[i] = d.data.jstree[i];
								}
							}
						}
					}
					if (d && _typeof(d.state) === 'object') {
						for (i in d.state) {
							if (d.state.hasOwnProperty(i)) {
								tmp.state[i] = d.state[i];
							}
						}
					}
					if (d && _typeof(d.li_attr) === 'object') {
						for (i in d.li_attr) {
							if (d.li_attr.hasOwnProperty(i)) {
								tmp.li_attr[i] = d.li_attr[i];
							}
						}
					}
					if (!tmp.li_attr.id) {
						tmp.li_attr.id = tid;
					}
					if (d && _typeof(d.a_attr) === 'object') {
						for (i in d.a_attr) {
							if (d.a_attr.hasOwnProperty(i)) {
								tmp.a_attr[i] = d.a_attr[i];
							}
						}
					}
					if (d && d.children && d.children === true) {
						tmp.state.loaded = false;
						tmp.children = [];
						tmp.children_d = [];
					}
					m[tmp.id] = tmp;
					for (i = 0, j = tmp.children.length; i < j; i++) {
						c = parse_flat(m[tmp.children[i]], tmp.id, ps);
						e = m[c];
						tmp.children_d.push(c);
						if (e.children_d.length) {
							tmp.children_d = tmp.children_d.concat(e.children_d);
						}
					}
					delete d.data;
					delete d.children;
					m[tmp.id].original = d;
					if (tmp.state.selected) {
						add.push(tmp.id);
					}
					return tmp.id;
				},
				    parse_nest = function parse_nest(d, p, ps) {
					if (!ps) {
						ps = [];
					} else {
						ps = ps.concat();
					}
					if (p) {
						ps.unshift(p);
					}
					var tid = false,
					    i,
					    j,
					    c,
					    e,
					    tmp;
					do {
						tid = 'j' + t_id + '_' + ++t_cnt;
					} while (m[tid]);

					tmp = {
						id: false,
						text: typeof d === 'string' ? d : '',
						icon: (typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object' && d.icon !== undefined ? d.icon : true,
						parent: p,
						parents: ps,
						children: [],
						children_d: [],
						data: null,
						state: {},
						li_attr: { id: false },
						a_attr: { href: '#' },
						original: false
					};
					for (i in df) {
						if (df.hasOwnProperty(i)) {
							tmp.state[i] = df[i];
						}
					}
					if (d && d.id) {
						tmp.id = d.id.toString();
					}
					if (d && d.text) {
						tmp.text = d.text;
					}
					if (d && d.data && d.data.jstree && d.data.jstree.icon) {
						tmp.icon = d.data.jstree.icon;
					}
					if (tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
						tmp.icon = true;
					}
					if (d && d.data) {
						tmp.data = d.data;
						if (d.data.jstree) {
							for (i in d.data.jstree) {
								if (d.data.jstree.hasOwnProperty(i)) {
									tmp.state[i] = d.data.jstree[i];
								}
							}
						}
					}
					if (d && _typeof(d.state) === 'object') {
						for (i in d.state) {
							if (d.state.hasOwnProperty(i)) {
								tmp.state[i] = d.state[i];
							}
						}
					}
					if (d && _typeof(d.li_attr) === 'object') {
						for (i in d.li_attr) {
							if (d.li_attr.hasOwnProperty(i)) {
								tmp.li_attr[i] = d.li_attr[i];
							}
						}
					}
					if (tmp.li_attr.id && !tmp.id) {
						tmp.id = tmp.li_attr.id.toString();
					}
					if (!tmp.id) {
						tmp.id = tid;
					}
					if (!tmp.li_attr.id) {
						tmp.li_attr.id = tmp.id;
					}
					if (d && _typeof(d.a_attr) === 'object') {
						for (i in d.a_attr) {
							if (d.a_attr.hasOwnProperty(i)) {
								tmp.a_attr[i] = d.a_attr[i];
							}
						}
					}
					if (d && d.children && d.children.length) {
						for (i = 0, j = d.children.length; i < j; i++) {
							c = parse_nest(d.children[i], tmp.id, ps);
							e = m[c];
							tmp.children.push(c);
							if (e.children_d.length) {
								tmp.children_d = tmp.children_d.concat(e.children_d);
							}
						}
						tmp.children_d = tmp.children_d.concat(tmp.children);
					}
					if (d && d.children && d.children === true) {
						tmp.state.loaded = false;
						tmp.children = [];
						tmp.children_d = [];
					}
					delete d.data;
					delete d.children;
					tmp.original = d;
					m[tmp.id] = tmp;
					if (tmp.state.selected) {
						add.push(tmp.id);
					}
					return tmp.id;
				};

				if (dat.length && dat[0].id !== undefined && dat[0].parent !== undefined) {
					// Flat JSON support (for easy import from DB):
					// 1) convert to object (foreach)
					for (i = 0, j = dat.length; i < j; i++) {
						if (!dat[i].children) {
							dat[i].children = [];
						}
						m[dat[i].id.toString()] = dat[i];
					}
					// 2) populate children (foreach)
					for (i = 0, j = dat.length; i < j; i++) {
						m[dat[i].parent.toString()].children.push(dat[i].id.toString());
						// populate parent.children_d
						p.children_d.push(dat[i].id.toString());
					}
					// 3) normalize && populate parents and children_d with recursion
					for (i = 0, j = p.children.length; i < j; i++) {
						tmp = parse_flat(m[p.children[i]], par, p.parents.concat());
						dpc.push(tmp);
						if (m[tmp].children_d.length) {
							dpc = dpc.concat(m[tmp].children_d);
						}
					}
					for (i = 0, j = p.parents.length; i < j; i++) {
						m[p.parents[i]].children_d = m[p.parents[i]].children_d.concat(dpc);
					}
					// ?) three_state selection - p.state.selected && t - (if three_state foreach(dat => ch) -> foreach(parents) if(parent.selected) child.selected = true;
					rslt = {
						'cnt': t_cnt,
						'mod': m,
						'sel': sel,
						'par': par,
						'dpc': dpc,
						'add': add
					};
				} else {
					for (i = 0, j = dat.length; i < j; i++) {
						tmp = parse_nest(dat[i], par, p.parents.concat());
						if (tmp) {
							chd.push(tmp);
							dpc.push(tmp);
							if (m[tmp].children_d.length) {
								dpc = dpc.concat(m[tmp].children_d);
							}
						}
					}
					p.children = chd;
					p.children_d = dpc;
					for (i = 0, j = p.parents.length; i < j; i++) {
						m[p.parents[i]].children_d = m[p.parents[i]].children_d.concat(dpc);
					}
					rslt = {
						'cnt': t_cnt,
						'mod': m,
						'sel': sel,
						'par': par,
						'dpc': dpc,
						'add': add
					};
				}
				if (typeof window === 'undefined' || typeof window.document === 'undefined') {
					postMessage(rslt);
				} else {
					return rslt;
				}
			},
			    rslt = function rslt(_rslt, worker) {
				if (this.element === null) {
					return;
				}
				this._cnt = _rslt.cnt;
				var i,
				    m = this._model.data;
				for (i in m) {
					if (m.hasOwnProperty(i) && m[i].state && m[i].state.loading && _rslt.mod[i]) {
						_rslt.mod[i].state.loading = true;
					}
				}
				this._model.data = _rslt.mod; // breaks the reference in load_node - careful

				if (worker) {
					var j,
					    a = _rslt.add,
					    r = _rslt.sel,
					    s = this._data.core.selected.slice();
					m = this._model.data;
					// if selection was changed while calculating in worker
					if (r.length !== s.length || $.vakata.array_unique(r.concat(s)).length !== r.length) {
						// deselect nodes that are no longer selected
						for (i = 0, j = r.length; i < j; i++) {
							if ($.inArray(r[i], a) === -1 && $.inArray(r[i], s) === -1) {
								m[r[i]].state.selected = false;
							}
						}
						// select nodes that were selected in the mean time
						for (i = 0, j = s.length; i < j; i++) {
							if ($.inArray(s[i], r) === -1) {
								m[s[i]].state.selected = true;
							}
						}
					}
				}
				if (_rslt.add.length) {
					this._data.core.selected = this._data.core.selected.concat(_rslt.add);
				}

				this.trigger('model', { "nodes": _rslt.dpc, 'parent': _rslt.par });

				if (_rslt.par !== $.jstree.root) {
					this._node_changed(_rslt.par);
					this.redraw();
				} else {
					// this.get_container_ul().children('.jstree-initial-node').remove();
					this.redraw(true);
				}
				if (_rslt.add.length) {
					this.trigger('changed', { 'action': 'model', 'selected': this._data.core.selected });
				}
				cb.call(this, true);
			};
			if (this.settings.core.worker && window.Blob && window.URL && window.Worker) {
				try {
					if (this._wrk === null) {
						this._wrk = window.URL.createObjectURL(new window.Blob(['self.onmessage = ' + func.toString()], { type: "text/javascript" }));
					}
					if (!this._data.core.working || force_processing) {
						this._data.core.working = true;
						w = new window.Worker(this._wrk);
						w.onmessage = $.proxy(function (e) {
							rslt.call(this, e.data, true);
							try {
								w.terminate();w = null;
							} catch (ignore) {}
							if (this._data.core.worker_queue.length) {
								this._append_json_data.apply(this, this._data.core.worker_queue.shift());
							} else {
								this._data.core.working = false;
							}
						}, this);
						if (!args.par) {
							if (this._data.core.worker_queue.length) {
								this._append_json_data.apply(this, this._data.core.worker_queue.shift());
							} else {
								this._data.core.working = false;
							}
						} else {
							w.postMessage(args);
						}
					} else {
						this._data.core.worker_queue.push([dom, data, cb, true]);
					}
				} catch (e) {
					rslt.call(this, func(args), false);
					if (this._data.core.worker_queue.length) {
						this._append_json_data.apply(this, this._data.core.worker_queue.shift());
					} else {
						this._data.core.working = false;
					}
				}
			} else {
				rslt.call(this, func(args), false);
			}
		},
		/**
   * parses a node from a jQuery object and appends them to the in memory tree model. Used internally.
   * @private
   * @name _parse_model_from_html(d [, p, ps])
   * @param  {jQuery} d the jQuery object to parse
   * @param  {String} p the parent ID
   * @param  {Array} ps list of all parents
   * @return {String} the ID of the object added to the model
   */
		_parse_model_from_html: function _parse_model_from_html(d, p, ps) {
			if (!ps) {
				ps = [];
			} else {
				ps = [].concat(ps);
			}
			if (p) {
				ps.unshift(p);
			}
			var c,
			    e,
			    m = this._model.data,
			    data = {
				id: false,
				text: false,
				icon: true,
				parent: p,
				parents: ps,
				children: [],
				children_d: [],
				data: null,
				state: {},
				li_attr: { id: false },
				a_attr: { href: '#' },
				original: false
			},
			    i,
			    tmp,
			    tid;
			for (i in this._model.default_state) {
				if (this._model.default_state.hasOwnProperty(i)) {
					data.state[i] = this._model.default_state[i];
				}
			}
			tmp = $.vakata.attributes(d, true);
			$.each(tmp, function (i, v) {
				v = $.trim(v);
				if (!v.length) {
					return true;
				}
				data.li_attr[i] = v;
				if (i === 'id') {
					data.id = v.toString();
				}
			});
			tmp = d.children('a').first();
			if (tmp.length) {
				tmp = $.vakata.attributes(tmp, true);
				$.each(tmp, function (i, v) {
					v = $.trim(v);
					if (v.length) {
						data.a_attr[i] = v;
					}
				});
			}
			tmp = d.children("a").first().length ? d.children("a").first().clone() : d.clone();
			tmp.children("ins, i, ul").remove();
			tmp = tmp.html();
			tmp = $('<div />').html(tmp);
			data.text = this.settings.core.force_text ? tmp.text() : tmp.html();
			tmp = d.data();
			data.data = tmp ? $.extend(true, {}, tmp) : null;
			data.state.opened = d.hasClass('jstree-open');
			data.state.selected = d.children('a').hasClass('jstree-clicked');
			data.state.disabled = d.children('a').hasClass('jstree-disabled');
			if (data.data && data.data.jstree) {
				for (i in data.data.jstree) {
					if (data.data.jstree.hasOwnProperty(i)) {
						data.state[i] = data.data.jstree[i];
					}
				}
			}
			tmp = d.children("a").children(".jstree-themeicon");
			if (tmp.length) {
				data.icon = tmp.hasClass('jstree-themeicon-hidden') ? false : tmp.attr('rel');
			}
			if (data.state.icon !== undefined) {
				data.icon = data.state.icon;
			}
			if (data.icon === undefined || data.icon === null || data.icon === "") {
				data.icon = true;
			}
			tmp = d.children("ul").children("li");
			do {
				tid = 'j' + this._id + '_' + ++this._cnt;
			} while (m[tid]);
			data.id = data.li_attr.id ? data.li_attr.id.toString() : tid;
			if (tmp.length) {
				tmp.each($.proxy(function (i, v) {
					c = this._parse_model_from_html($(v), data.id, ps);
					e = this._model.data[c];
					data.children.push(c);
					if (e.children_d.length) {
						data.children_d = data.children_d.concat(e.children_d);
					}
				}, this));
				data.children_d = data.children_d.concat(data.children);
			} else {
				if (d.hasClass('jstree-closed')) {
					data.state.loaded = false;
				}
			}
			if (data.li_attr['class']) {
				data.li_attr['class'] = data.li_attr['class'].replace('jstree-closed', '').replace('jstree-open', '');
			}
			if (data.a_attr['class']) {
				data.a_attr['class'] = data.a_attr['class'].replace('jstree-clicked', '').replace('jstree-disabled', '');
			}
			m[data.id] = data;
			if (data.state.selected) {
				this._data.core.selected.push(data.id);
			}
			return data.id;
		},
		/**
   * parses a node from a JSON object (used when dealing with flat data, which has no nesting of children, but has id and parent properties) and appends it to the in memory tree model. Used internally.
   * @private
   * @name _parse_model_from_flat_json(d [, p, ps])
   * @param  {Object} d the JSON object to parse
   * @param  {String} p the parent ID
   * @param  {Array} ps list of all parents
   * @return {String} the ID of the object added to the model
   */
		_parse_model_from_flat_json: function _parse_model_from_flat_json(d, p, ps) {
			if (!ps) {
				ps = [];
			} else {
				ps = ps.concat();
			}
			if (p) {
				ps.unshift(p);
			}
			var tid = d.id.toString(),
			    m = this._model.data,
			    df = this._model.default_state,
			    i,
			    j,
			    c,
			    e,
			    tmp = {
				id: tid,
				text: d.text || '',
				icon: d.icon !== undefined ? d.icon : true,
				parent: p,
				parents: ps,
				children: d.children || [],
				children_d: d.children_d || [],
				data: d.data,
				state: {},
				li_attr: { id: false },
				a_attr: { href: '#' },
				original: false
			};
			for (i in df) {
				if (df.hasOwnProperty(i)) {
					tmp.state[i] = df[i];
				}
			}
			if (d && d.data && d.data.jstree && d.data.jstree.icon) {
				tmp.icon = d.data.jstree.icon;
			}
			if (tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
				tmp.icon = true;
			}
			if (d && d.data) {
				tmp.data = d.data;
				if (d.data.jstree) {
					for (i in d.data.jstree) {
						if (d.data.jstree.hasOwnProperty(i)) {
							tmp.state[i] = d.data.jstree[i];
						}
					}
				}
			}
			if (d && _typeof(d.state) === 'object') {
				for (i in d.state) {
					if (d.state.hasOwnProperty(i)) {
						tmp.state[i] = d.state[i];
					}
				}
			}
			if (d && _typeof(d.li_attr) === 'object') {
				for (i in d.li_attr) {
					if (d.li_attr.hasOwnProperty(i)) {
						tmp.li_attr[i] = d.li_attr[i];
					}
				}
			}
			if (!tmp.li_attr.id) {
				tmp.li_attr.id = tid;
			}
			if (d && _typeof(d.a_attr) === 'object') {
				for (i in d.a_attr) {
					if (d.a_attr.hasOwnProperty(i)) {
						tmp.a_attr[i] = d.a_attr[i];
					}
				}
			}
			if (d && d.children && d.children === true) {
				tmp.state.loaded = false;
				tmp.children = [];
				tmp.children_d = [];
			}
			m[tmp.id] = tmp;
			for (i = 0, j = tmp.children.length; i < j; i++) {
				c = this._parse_model_from_flat_json(m[tmp.children[i]], tmp.id, ps);
				e = m[c];
				tmp.children_d.push(c);
				if (e.children_d.length) {
					tmp.children_d = tmp.children_d.concat(e.children_d);
				}
			}
			delete d.data;
			delete d.children;
			m[tmp.id].original = d;
			if (tmp.state.selected) {
				this._data.core.selected.push(tmp.id);
			}
			return tmp.id;
		},
		/**
   * parses a node from a JSON object and appends it to the in memory tree model. Used internally.
   * @private
   * @name _parse_model_from_json(d [, p, ps])
   * @param  {Object} d the JSON object to parse
   * @param  {String} p the parent ID
   * @param  {Array} ps list of all parents
   * @return {String} the ID of the object added to the model
   */
		_parse_model_from_json: function _parse_model_from_json(d, p, ps) {
			if (!ps) {
				ps = [];
			} else {
				ps = ps.concat();
			}
			if (p) {
				ps.unshift(p);
			}
			var tid = false,
			    i,
			    j,
			    c,
			    e,
			    m = this._model.data,
			    df = this._model.default_state,
			    tmp;
			do {
				tid = 'j' + this._id + '_' + ++this._cnt;
			} while (m[tid]);

			tmp = {
				id: false,
				text: typeof d === 'string' ? d : '',
				icon: (typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object' && d.icon !== undefined ? d.icon : true,
				parent: p,
				parents: ps,
				children: [],
				children_d: [],
				data: null,
				state: {},
				li_attr: { id: false },
				a_attr: { href: '#' },
				original: false
			};
			for (i in df) {
				if (df.hasOwnProperty(i)) {
					tmp.state[i] = df[i];
				}
			}
			if (d && d.id) {
				tmp.id = d.id.toString();
			}
			if (d && d.text) {
				tmp.text = d.text;
			}
			if (d && d.data && d.data.jstree && d.data.jstree.icon) {
				tmp.icon = d.data.jstree.icon;
			}
			if (tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
				tmp.icon = true;
			}
			if (d && d.data) {
				tmp.data = d.data;
				if (d.data.jstree) {
					for (i in d.data.jstree) {
						if (d.data.jstree.hasOwnProperty(i)) {
							tmp.state[i] = d.data.jstree[i];
						}
					}
				}
			}
			if (d && _typeof(d.state) === 'object') {
				for (i in d.state) {
					if (d.state.hasOwnProperty(i)) {
						tmp.state[i] = d.state[i];
					}
				}
			}
			if (d && _typeof(d.li_attr) === 'object') {
				for (i in d.li_attr) {
					if (d.li_attr.hasOwnProperty(i)) {
						tmp.li_attr[i] = d.li_attr[i];
					}
				}
			}
			if (tmp.li_attr.id && !tmp.id) {
				tmp.id = tmp.li_attr.id.toString();
			}
			if (!tmp.id) {
				tmp.id = tid;
			}
			if (!tmp.li_attr.id) {
				tmp.li_attr.id = tmp.id;
			}
			if (d && _typeof(d.a_attr) === 'object') {
				for (i in d.a_attr) {
					if (d.a_attr.hasOwnProperty(i)) {
						tmp.a_attr[i] = d.a_attr[i];
					}
				}
			}
			if (d && d.children && d.children.length) {
				for (i = 0, j = d.children.length; i < j; i++) {
					c = this._parse_model_from_json(d.children[i], tmp.id, ps);
					e = m[c];
					tmp.children.push(c);
					if (e.children_d.length) {
						tmp.children_d = tmp.children_d.concat(e.children_d);
					}
				}
				tmp.children_d = tmp.children_d.concat(tmp.children);
			}
			if (d && d.children && d.children === true) {
				tmp.state.loaded = false;
				tmp.children = [];
				tmp.children_d = [];
			}
			delete d.data;
			delete d.children;
			tmp.original = d;
			m[tmp.id] = tmp;
			if (tmp.state.selected) {
				this._data.core.selected.push(tmp.id);
			}
			return tmp.id;
		},
		/**
   * redraws all nodes that need to be redrawn. Used internally.
   * @private
   * @name _redraw()
   * @trigger redraw.jstree
   */
		_redraw: function _redraw() {
			var nodes = this._model.force_full_redraw ? this._model.data[$.jstree.root].children.concat([]) : this._model.changed.concat([]),
			    f = document.createElement('UL'),
			    tmp,
			    i,
			    j,
			    fe = this._data.core.focused;
			for (i = 0, j = nodes.length; i < j; i++) {
				tmp = this.redraw_node(nodes[i], true, this._model.force_full_redraw);
				if (tmp && this._model.force_full_redraw) {
					f.appendChild(tmp);
				}
			}
			if (this._model.force_full_redraw) {
				f.className = this.get_container_ul()[0].className;
				f.setAttribute('role', 'group');
				this.element.empty().append(f);
				//this.get_container_ul()[0].appendChild(f);
			}
			if (fe !== null) {
				tmp = this.get_node(fe, true);
				if (tmp && tmp.length && tmp.children('.jstree-anchor')[0] !== document.activeElement) {
					tmp.children('.jstree-anchor').focus();
				} else {
					this._data.core.focused = null;
				}
			}
			this._model.force_full_redraw = false;
			this._model.changed = [];
			/**
    * triggered after nodes are redrawn
    * @event
    * @name redraw.jstree
    * @param {array} nodes the redrawn nodes
    */
			this.trigger('redraw', { "nodes": nodes });
		},
		/**
   * redraws all nodes that need to be redrawn or optionally - the whole tree
   * @name redraw([full])
   * @param {Boolean} full if set to `true` all nodes are redrawn.
   */
		redraw: function redraw(full) {
			if (full) {
				this._model.force_full_redraw = true;
			}
			//if(this._model.redraw_timeout) {
			//	clearTimeout(this._model.redraw_timeout);
			//}
			//this._model.redraw_timeout = setTimeout($.proxy(this._redraw, this),0);
			this._redraw();
		},
		/**
   * redraws a single node's children. Used internally.
   * @private
   * @name draw_children(node)
   * @param {mixed} node the node whose children will be redrawn
   */
		draw_children: function draw_children(node) {
			var obj = this.get_node(node),
			    i = false,
			    j = false,
			    k = false,
			    d = document;
			if (!obj) {
				return false;
			}
			if (obj.id === $.jstree.root) {
				return this.redraw(true);
			}
			node = this.get_node(node, true);
			if (!node || !node.length) {
				return false;
			} // TODO: quick toggle

			node.children('.jstree-children').remove();
			node = node[0];
			if (obj.children.length && obj.state.loaded) {
				k = d.createElement('UL');
				k.setAttribute('role', 'group');
				k.className = 'jstree-children';
				for (i = 0, j = obj.children.length; i < j; i++) {
					k.appendChild(this.redraw_node(obj.children[i], true, true));
				}
				node.appendChild(k);
			}
		},
		/**
   * redraws a single node. Used internally.
   * @private
   * @name redraw_node(node, deep, is_callback, force_render)
   * @param {mixed} node the node to redraw
   * @param {Boolean} deep should child nodes be redrawn too
   * @param {Boolean} is_callback is this a recursion call
   * @param {Boolean} force_render should children of closed parents be drawn anyway
   */
		redraw_node: function redraw_node(node, deep, is_callback, force_render) {
			var obj = this.get_node(node),
			    par = false,
			    ind = false,
			    old = false,
			    i = false,
			    j = false,
			    k = false,
			    c = '',
			    d = document,
			    m = this._model.data,
			    f = false,
			    s = false,
			    tmp = null,
			    t = 0,
			    l = 0,
			    has_children = false,
			    last_sibling = false;
			if (!obj) {
				return false;
			}
			if (obj.id === $.jstree.root) {
				return this.redraw(true);
			}
			deep = deep || obj.children.length === 0;
			node = !document.querySelector ? document.getElementById(obj.id) : this.element[0].querySelector('#' + ("0123456789".indexOf(obj.id[0]) !== -1 ? '\\3' + obj.id[0] + ' ' + obj.id.substr(1).replace($.jstree.idregex, '\\$&') : obj.id.replace($.jstree.idregex, '\\$&'))); //, this.element);
			if (!node) {
				deep = true;
				//node = d.createElement('LI');
				if (!is_callback) {
					par = obj.parent !== $.jstree.root ? $('#' + obj.parent.replace($.jstree.idregex, '\\$&'), this.element)[0] : null;
					if (par !== null && (!par || !m[obj.parent].state.opened)) {
						return false;
					}
					ind = $.inArray(obj.id, par === null ? m[$.jstree.root].children : m[obj.parent].children);
				}
			} else {
				node = $(node);
				if (!is_callback) {
					par = node.parent().parent()[0];
					if (par === this.element[0]) {
						par = null;
					}
					ind = node.index();
				}
				// m[obj.id].data = node.data(); // use only node's data, no need to touch jquery storage
				if (!deep && obj.children.length && !node.children('.jstree-children').length) {
					deep = true;
				}
				if (!deep) {
					old = node.children('.jstree-children')[0];
				}
				f = node.children('.jstree-anchor')[0] === document.activeElement;
				node.remove();
				//node = d.createElement('LI');
				//node = node[0];
			}
			node = this._data.core.node.cloneNode(true);
			// node is DOM, deep is boolean

			c = 'jstree-node ';
			for (i in obj.li_attr) {
				if (obj.li_attr.hasOwnProperty(i)) {
					if (i === 'id') {
						continue;
					}
					if (i !== 'class') {
						node.setAttribute(i, obj.li_attr[i]);
					} else {
						c += obj.li_attr[i];
					}
				}
			}
			if (!obj.a_attr.id) {
				obj.a_attr.id = obj.id + '_anchor';
			}
			node.setAttribute('aria-selected', !!obj.state.selected);
			node.setAttribute('aria-level', obj.parents.length);
			node.setAttribute('aria-labelledby', obj.a_attr.id);
			if (obj.state.disabled) {
				node.setAttribute('aria-disabled', true);
			}

			for (i = 0, j = obj.children.length; i < j; i++) {
				if (!m[obj.children[i]].state.hidden) {
					has_children = true;
					break;
				}
			}
			if (obj.parent !== null && m[obj.parent] && !obj.state.hidden) {
				i = $.inArray(obj.id, m[obj.parent].children);
				last_sibling = obj.id;
				if (i !== -1) {
					i++;
					for (j = m[obj.parent].children.length; i < j; i++) {
						if (!m[m[obj.parent].children[i]].state.hidden) {
							last_sibling = m[obj.parent].children[i];
						}
						if (last_sibling !== obj.id) {
							break;
						}
					}
				}
			}

			if (obj.state.hidden) {
				c += ' jstree-hidden';
			}
			if (obj.state.loaded && !has_children) {
				c += ' jstree-leaf';
			} else {
				c += obj.state.opened && obj.state.loaded ? ' jstree-open' : ' jstree-closed';
				node.setAttribute('aria-expanded', obj.state.opened && obj.state.loaded);
			}
			if (last_sibling === obj.id) {
				c += ' jstree-last';
			}
			node.id = obj.id;
			node.className = c;
			c = (obj.state.selected ? ' jstree-clicked' : '') + (obj.state.disabled ? ' jstree-disabled' : '');
			for (j in obj.a_attr) {
				if (obj.a_attr.hasOwnProperty(j)) {
					if (j === 'href' && obj.a_attr[j] === '#') {
						continue;
					}
					if (j !== 'class') {
						node.childNodes[1].setAttribute(j, obj.a_attr[j]);
					} else {
						c += ' ' + obj.a_attr[j];
					}
				}
			}
			if (c.length) {
				node.childNodes[1].className = 'jstree-anchor ' + c;
			}
			if (obj.icon && obj.icon !== true || obj.icon === false) {
				if (obj.icon === false) {
					node.childNodes[1].childNodes[0].className += ' jstree-themeicon-hidden';
				} else if (obj.icon.indexOf('/') === -1 && obj.icon.indexOf('.') === -1) {
					node.childNodes[1].childNodes[0].className += ' ' + obj.icon + ' jstree-themeicon-custom';
				} else {
					node.childNodes[1].childNodes[0].style.backgroundImage = 'url("' + obj.icon + '")';
					node.childNodes[1].childNodes[0].style.backgroundPosition = 'center center';
					node.childNodes[1].childNodes[0].style.backgroundSize = 'auto';
					node.childNodes[1].childNodes[0].className += ' jstree-themeicon-custom';
				}
			}

			if (this.settings.core.force_text) {
				node.childNodes[1].appendChild(d.createTextNode(obj.text));
			} else {
				node.childNodes[1].innerHTML += obj.text;
			}

			if (deep && obj.children.length && (obj.state.opened || force_render) && obj.state.loaded) {
				k = d.createElement('UL');
				k.setAttribute('role', 'group');
				k.className = 'jstree-children';
				for (i = 0, j = obj.children.length; i < j; i++) {
					k.appendChild(this.redraw_node(obj.children[i], deep, true));
				}
				node.appendChild(k);
			}
			if (old) {
				node.appendChild(old);
			}
			if (!is_callback) {
				// append back using par / ind
				if (!par) {
					par = this.element[0];
				}
				for (i = 0, j = par.childNodes.length; i < j; i++) {
					if (par.childNodes[i] && par.childNodes[i].className && par.childNodes[i].className.indexOf('jstree-children') !== -1) {
						tmp = par.childNodes[i];
						break;
					}
				}
				if (!tmp) {
					tmp = d.createElement('UL');
					tmp.setAttribute('role', 'group');
					tmp.className = 'jstree-children';
					par.appendChild(tmp);
				}
				par = tmp;

				if (ind < par.childNodes.length) {
					par.insertBefore(node, par.childNodes[ind]);
				} else {
					par.appendChild(node);
				}
				if (f) {
					t = this.element[0].scrollTop;
					l = this.element[0].scrollLeft;
					node.childNodes[1].focus();
					this.element[0].scrollTop = t;
					this.element[0].scrollLeft = l;
				}
			}
			if (obj.state.opened && !obj.state.loaded) {
				obj.state.opened = false;
				setTimeout($.proxy(function () {
					this.open_node(obj.id, false, 0);
				}, this), 0);
			}
			return node;
		},
		/**
   * opens a node, revaling its children. If the node is not loaded it will be loaded and opened once ready.
   * @name open_node(obj [, callback, animation])
   * @param {mixed} obj the node to open
   * @param {Function} callback a function to execute once the node is opened
   * @param {Number} animation the animation duration in milliseconds when opening the node (overrides the `core.animation` setting). Use `false` for no animation.
   * @trigger open_node.jstree, after_open.jstree, before_open.jstree
   */
		open_node: function open_node(obj, callback, animation) {
			var t1, t2, d, t;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.open_node(obj[t1], callback, animation);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			animation = animation === undefined ? this.settings.core.animation : animation;
			if (!this.is_closed(obj)) {
				if (callback) {
					callback.call(this, obj, false);
				}
				return false;
			}
			if (!this.is_loaded(obj)) {
				if (this.is_loading(obj)) {
					return setTimeout($.proxy(function () {
						this.open_node(obj, callback, animation);
					}, this), 500);
				}
				this.load_node(obj, function (o, ok) {
					return ok ? this.open_node(o, callback, animation) : callback ? callback.call(this, o, false) : false;
				});
			} else {
				d = this.get_node(obj, true);
				t = this;
				if (d.length) {
					if (animation && d.children(".jstree-children").length) {
						d.children(".jstree-children").stop(true, true);
					}
					if (obj.children.length && !this._firstChild(d.children('.jstree-children')[0])) {
						this.draw_children(obj);
						//d = this.get_node(obj, true);
					}
					if (!animation) {
						this.trigger('before_open', { "node": obj });
						d[0].className = d[0].className.replace('jstree-closed', 'jstree-open');
						d[0].setAttribute("aria-expanded", true);
					} else {
						this.trigger('before_open', { "node": obj });
						d.children(".jstree-children").css("display", "none").end().removeClass("jstree-closed").addClass("jstree-open").attr("aria-expanded", true).children(".jstree-children").stop(true, true).slideDown(animation, function () {
							this.style.display = "";
							if (t.element) {
								t.trigger("after_open", { "node": obj });
							}
						});
					}
				}
				obj.state.opened = true;
				if (callback) {
					callback.call(this, obj, true);
				}
				if (!d.length) {
					/**
      * triggered when a node is about to be opened (if the node is supposed to be in the DOM, it will be, but it won't be visible yet)
      * @event
      * @name before_open.jstree
      * @param {Object} node the opened node
      */
					this.trigger('before_open', { "node": obj });
				}
				/**
     * triggered when a node is opened (if there is an animation it will not be completed yet)
     * @event
     * @name open_node.jstree
     * @param {Object} node the opened node
     */
				this.trigger('open_node', { "node": obj });
				if (!animation || !d.length) {
					/**
      * triggered when a node is opened and the animation is complete
      * @event
      * @name after_open.jstree
      * @param {Object} node the opened node
      */
					this.trigger("after_open", { "node": obj });
				}
				return true;
			}
		},
		/**
   * opens every parent of a node (node should be loaded)
   * @name _open_to(obj)
   * @param {mixed} obj the node to reveal
   * @private
   */
		_open_to: function _open_to(obj) {
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			var i,
			    j,
			    p = obj.parents;
			for (i = 0, j = p.length; i < j; i += 1) {
				if (i !== $.jstree.root) {
					this.open_node(p[i], false, 0);
				}
			}
			return $('#' + obj.id.replace($.jstree.idregex, '\\$&'), this.element);
		},
		/**
   * closes a node, hiding its children
   * @name close_node(obj [, animation])
   * @param {mixed} obj the node to close
   * @param {Number} animation the animation duration in milliseconds when closing the node (overrides the `core.animation` setting). Use `false` for no animation.
   * @trigger close_node.jstree, after_close.jstree
   */
		close_node: function close_node(obj, animation) {
			var t1, t2, t, d;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.close_node(obj[t1], animation);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			if (this.is_closed(obj)) {
				return false;
			}
			animation = animation === undefined ? this.settings.core.animation : animation;
			t = this;
			d = this.get_node(obj, true);

			obj.state.opened = false;
			/**
    * triggered when a node is closed (if there is an animation it will not be complete yet)
    * @event
    * @name close_node.jstree
    * @param {Object} node the closed node
    */
			this.trigger('close_node', { "node": obj });
			if (!d.length) {
				/**
     * triggered when a node is closed and the animation is complete
     * @event
     * @name after_close.jstree
     * @param {Object} node the closed node
     */
				this.trigger("after_close", { "node": obj });
			} else {
				if (!animation) {
					d[0].className = d[0].className.replace('jstree-open', 'jstree-closed');
					d.attr("aria-expanded", false).children('.jstree-children').remove();
					this.trigger("after_close", { "node": obj });
				} else {
					d.children(".jstree-children").attr("style", "display:block !important").end().removeClass("jstree-open").addClass("jstree-closed").attr("aria-expanded", false).children(".jstree-children").stop(true, true).slideUp(animation, function () {
						this.style.display = "";
						d.children('.jstree-children').remove();
						if (t.element) {
							t.trigger("after_close", { "node": obj });
						}
					});
				}
			}
		},
		/**
   * toggles a node - closing it if it is open, opening it if it is closed
   * @name toggle_node(obj)
   * @param {mixed} obj the node to toggle
   */
		toggle_node: function toggle_node(obj) {
			var t1, t2;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.toggle_node(obj[t1]);
				}
				return true;
			}
			if (this.is_closed(obj)) {
				return this.open_node(obj);
			}
			if (this.is_open(obj)) {
				return this.close_node(obj);
			}
		},
		/**
   * opens all nodes within a node (or the tree), revaling their children. If the node is not loaded it will be loaded and opened once ready.
   * @name open_all([obj, animation, original_obj])
   * @param {mixed} obj the node to open recursively, omit to open all nodes in the tree
   * @param {Number} animation the animation duration in milliseconds when opening the nodes, the default is no animation
   * @param {jQuery} reference to the node that started the process (internal use)
   * @trigger open_all.jstree
   */
		open_all: function open_all(obj, animation, original_obj) {
			if (!obj) {
				obj = $.jstree.root;
			}
			obj = this.get_node(obj);
			if (!obj) {
				return false;
			}
			var dom = obj.id === $.jstree.root ? this.get_container_ul() : this.get_node(obj, true),
			    i,
			    j,
			    _this;
			if (!dom.length) {
				for (i = 0, j = obj.children_d.length; i < j; i++) {
					if (this.is_closed(this._model.data[obj.children_d[i]])) {
						this._model.data[obj.children_d[i]].state.opened = true;
					}
				}
				return this.trigger('open_all', { "node": obj });
			}
			original_obj = original_obj || dom;
			_this = this;
			dom = this.is_closed(obj) ? dom.find('.jstree-closed').addBack() : dom.find('.jstree-closed');
			dom.each(function () {
				_this.open_node(this, function (node, status) {
					if (status && this.is_parent(node)) {
						this.open_all(node, animation, original_obj);
					}
				}, animation || 0);
			});
			if (original_obj.find('.jstree-closed').length === 0) {
				/**
     * triggered when an `open_all` call completes
     * @event
     * @name open_all.jstree
     * @param {Object} node the opened node
     */
				this.trigger('open_all', { "node": this.get_node(original_obj) });
			}
		},
		/**
   * closes all nodes within a node (or the tree), revaling their children
   * @name close_all([obj, animation])
   * @param {mixed} obj the node to close recursively, omit to close all nodes in the tree
   * @param {Number} animation the animation duration in milliseconds when closing the nodes, the default is no animation
   * @trigger close_all.jstree
   */
		close_all: function close_all(obj, animation) {
			if (!obj) {
				obj = $.jstree.root;
			}
			obj = this.get_node(obj);
			if (!obj) {
				return false;
			}
			var dom = obj.id === $.jstree.root ? this.get_container_ul() : this.get_node(obj, true),
			    _this = this,
			    i,
			    j;
			if (dom.length) {
				dom = this.is_open(obj) ? dom.find('.jstree-open').addBack() : dom.find('.jstree-open');
				$(dom.get().reverse()).each(function () {
					_this.close_node(this, animation || 0);
				});
			}
			for (i = 0, j = obj.children_d.length; i < j; i++) {
				this._model.data[obj.children_d[i]].state.opened = false;
			}
			/**
    * triggered when an `close_all` call completes
    * @event
    * @name close_all.jstree
    * @param {Object} node the closed node
    */
			this.trigger('close_all', { "node": obj });
		},
		/**
   * checks if a node is disabled (not selectable)
   * @name is_disabled(obj)
   * @param  {mixed} obj
   * @return {Boolean}
   */
		is_disabled: function is_disabled(obj) {
			obj = this.get_node(obj);
			return obj && obj.state && obj.state.disabled;
		},
		/**
   * enables a node - so that it can be selected
   * @name enable_node(obj)
   * @param {mixed} obj the node to enable
   * @trigger enable_node.jstree
   */
		enable_node: function enable_node(obj) {
			var t1, t2;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.enable_node(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			obj.state.disabled = false;
			this.get_node(obj, true).children('.jstree-anchor').removeClass('jstree-disabled').attr('aria-disabled', false);
			/**
    * triggered when an node is enabled
    * @event
    * @name enable_node.jstree
    * @param {Object} node the enabled node
    */
			this.trigger('enable_node', { 'node': obj });
		},
		/**
   * disables a node - so that it can not be selected
   * @name disable_node(obj)
   * @param {mixed} obj the node to disable
   * @trigger disable_node.jstree
   */
		disable_node: function disable_node(obj) {
			var t1, t2;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.disable_node(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			obj.state.disabled = true;
			this.get_node(obj, true).children('.jstree-anchor').addClass('jstree-disabled').attr('aria-disabled', true);
			/**
    * triggered when an node is disabled
    * @event
    * @name disable_node.jstree
    * @param {Object} node the disabled node
    */
			this.trigger('disable_node', { 'node': obj });
		},
		/**
   * determines if a node is hidden
   * @name is_hidden(obj)
   * @param {mixed} obj the node
   */
		is_hidden: function is_hidden(obj) {
			obj = this.get_node(obj);
			return obj.state.hidden === true;
		},
		/**
   * hides a node - it is still in the structure but will not be visible
   * @name hide_node(obj)
   * @param {mixed} obj the node to hide
   * @param {Boolean} skip_redraw internal parameter controlling if redraw is called
   * @trigger hide_node.jstree
   */
		hide_node: function hide_node(obj, skip_redraw) {
			var t1, t2;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.hide_node(obj[t1], true);
				}
				if (!skip_redraw) {
					this.redraw();
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			if (!obj.state.hidden) {
				obj.state.hidden = true;
				this._node_changed(obj.parent);
				if (!skip_redraw) {
					this.redraw();
				}
				/**
     * triggered when an node is hidden
     * @event
     * @name hide_node.jstree
     * @param {Object} node the hidden node
     */
				this.trigger('hide_node', { 'node': obj });
			}
		},
		/**
   * shows a node
   * @name show_node(obj)
   * @param {mixed} obj the node to show
   * @param {Boolean} skip_redraw internal parameter controlling if redraw is called
   * @trigger show_node.jstree
   */
		show_node: function show_node(obj, skip_redraw) {
			var t1, t2;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.show_node(obj[t1], true);
				}
				if (!skip_redraw) {
					this.redraw();
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			if (obj.state.hidden) {
				obj.state.hidden = false;
				this._node_changed(obj.parent);
				if (!skip_redraw) {
					this.redraw();
				}
				/**
     * triggered when an node is shown
     * @event
     * @name show_node.jstree
     * @param {Object} node the shown node
     */
				this.trigger('show_node', { 'node': obj });
			}
		},
		/**
   * hides all nodes
   * @name hide_all()
   * @trigger hide_all.jstree
   */
		hide_all: function hide_all(skip_redraw) {
			var i,
			    m = this._model.data,
			    ids = [];
			for (i in m) {
				if (m.hasOwnProperty(i) && i !== $.jstree.root && !m[i].state.hidden) {
					m[i].state.hidden = true;
					ids.push(i);
				}
			}
			this._model.force_full_redraw = true;
			if (!skip_redraw) {
				this.redraw();
			}
			/**
    * triggered when all nodes are hidden
    * @event
    * @name hide_all.jstree
    * @param {Array} nodes the IDs of all hidden nodes
    */
			this.trigger('hide_all', { 'nodes': ids });
			return ids;
		},
		/**
   * shows all nodes
   * @name show_all()
   * @trigger show_all.jstree
   */
		show_all: function show_all(skip_redraw) {
			var i,
			    m = this._model.data,
			    ids = [];
			for (i in m) {
				if (m.hasOwnProperty(i) && i !== $.jstree.root && m[i].state.hidden) {
					m[i].state.hidden = false;
					ids.push(i);
				}
			}
			this._model.force_full_redraw = true;
			if (!skip_redraw) {
				this.redraw();
			}
			/**
    * triggered when all nodes are shown
    * @event
    * @name show_all.jstree
    * @param {Array} nodes the IDs of all shown nodes
    */
			this.trigger('show_all', { 'nodes': ids });
			return ids;
		},
		/**
   * called when a node is selected by the user. Used internally.
   * @private
   * @name activate_node(obj, e)
   * @param {mixed} obj the node
   * @param {Object} e the related event
   * @trigger activate_node.jstree, changed.jstree
   */
		activate_node: function activate_node(obj, e) {
			if (this.is_disabled(obj)) {
				return false;
			}
			if (!e || (typeof e === 'undefined' ? 'undefined' : _typeof(e)) !== 'object') {
				e = {};
			}

			// ensure last_clicked is still in the DOM, make it fresh (maybe it was moved?) and make sure it is still selected, if not - make last_clicked the last selected node
			this._data.core.last_clicked = this._data.core.last_clicked && this._data.core.last_clicked.id !== undefined ? this.get_node(this._data.core.last_clicked.id) : null;
			if (this._data.core.last_clicked && !this._data.core.last_clicked.state.selected) {
				this._data.core.last_clicked = null;
			}
			if (!this._data.core.last_clicked && this._data.core.selected.length) {
				this._data.core.last_clicked = this.get_node(this._data.core.selected[this._data.core.selected.length - 1]);
			}

			if (!this.settings.core.multiple || !e.metaKey && !e.ctrlKey && !e.shiftKey || e.shiftKey && (!this._data.core.last_clicked || !this.get_parent(obj) || this.get_parent(obj) !== this._data.core.last_clicked.parent)) {
				if (!this.settings.core.multiple && (e.metaKey || e.ctrlKey || e.shiftKey) && this.is_selected(obj)) {
					this.deselect_node(obj, false, e);
				} else {
					this.deselect_all(true);
					this.select_node(obj, false, false, e);
					this._data.core.last_clicked = this.get_node(obj);
				}
			} else {
				if (e.shiftKey) {
					var o = this.get_node(obj).id,
					    l = this._data.core.last_clicked.id,
					    p = this.get_node(this._data.core.last_clicked.parent).children,
					    c = false,
					    i,
					    j;
					for (i = 0, j = p.length; i < j; i += 1) {
						// separate IFs work whem o and l are the same
						if (p[i] === o) {
							c = !c;
						}
						if (p[i] === l) {
							c = !c;
						}
						if (!this.is_disabled(p[i]) && (c || p[i] === o || p[i] === l)) {
							if (!this.is_hidden(p[i])) {
								this.select_node(p[i], true, false, e);
							}
						} else {
							this.deselect_node(p[i], true, e);
						}
					}
					this.trigger('changed', { 'action': 'select_node', 'node': this.get_node(obj), 'selected': this._data.core.selected, 'event': e });
				} else {
					if (!this.is_selected(obj)) {
						this.select_node(obj, false, false, e);
					} else {
						this.deselect_node(obj, false, e);
					}
				}
			}
			/**
    * triggered when an node is clicked or intercated with by the user
    * @event
    * @name activate_node.jstree
    * @param {Object} node
    * @param {Object} event the ooriginal event (if any) which triggered the call (may be an empty object)
    */
			this.trigger('activate_node', { 'node': this.get_node(obj), 'event': e });
		},
		/**
   * applies the hover state on a node, called when a node is hovered by the user. Used internally.
   * @private
   * @name hover_node(obj)
   * @param {mixed} obj
   * @trigger hover_node.jstree
   */
		hover_node: function hover_node(obj) {
			obj = this.get_node(obj, true);
			if (!obj || !obj.length || obj.children('.jstree-hovered').length) {
				return false;
			}
			var o = this.element.find('.jstree-hovered'),
			    t = this.element;
			if (o && o.length) {
				this.dehover_node(o);
			}

			obj.children('.jstree-anchor').addClass('jstree-hovered');
			/**
    * triggered when an node is hovered
    * @event
    * @name hover_node.jstree
    * @param {Object} node
    */
			this.trigger('hover_node', { 'node': this.get_node(obj) });
			setTimeout(function () {
				t.attr('aria-activedescendant', obj[0].id);
			}, 0);
		},
		/**
   * removes the hover state from a nodecalled when a node is no longer hovered by the user. Used internally.
   * @private
   * @name dehover_node(obj)
   * @param {mixed} obj
   * @trigger dehover_node.jstree
   */
		dehover_node: function dehover_node(obj) {
			obj = this.get_node(obj, true);
			if (!obj || !obj.length || !obj.children('.jstree-hovered').length) {
				return false;
			}
			obj.children('.jstree-anchor').removeClass('jstree-hovered');
			/**
    * triggered when an node is no longer hovered
    * @event
    * @name dehover_node.jstree
    * @param {Object} node
    */
			this.trigger('dehover_node', { 'node': this.get_node(obj) });
		},
		/**
   * select a node
   * @name select_node(obj [, supress_event, prevent_open])
   * @param {mixed} obj an array can be used to select multiple nodes
   * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
   * @param {Boolean} prevent_open if set to `true` parents of the selected node won't be opened
   * @trigger select_node.jstree, changed.jstree
   */
		select_node: function select_node(obj, supress_event, prevent_open, e) {
			var dom, t1, t2, th;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.select_node(obj[t1], supress_event, prevent_open, e);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if (!obj.state.selected) {
				obj.state.selected = true;
				this._data.core.selected.push(obj.id);
				if (!prevent_open) {
					dom = this._open_to(obj);
				}
				if (dom && dom.length) {
					dom.attr('aria-selected', true).children('.jstree-anchor').addClass('jstree-clicked');
				}
				/**
     * triggered when an node is selected
     * @event
     * @name select_node.jstree
     * @param {Object} node
     * @param {Array} selected the current selection
     * @param {Object} event the event (if any) that triggered this select_node
     */
				this.trigger('select_node', { 'node': obj, 'selected': this._data.core.selected, 'event': e });
				if (!supress_event) {
					/**
      * triggered when selection changes
      * @event
      * @name changed.jstree
      * @param {Object} node
      * @param {Object} action the action that caused the selection to change
      * @param {Array} selected the current selection
      * @param {Object} event the event (if any) that triggered this changed event
      */
					this.trigger('changed', { 'action': 'select_node', 'node': obj, 'selected': this._data.core.selected, 'event': e });
				}
			}
		},
		/**
   * deselect a node
   * @name deselect_node(obj [, supress_event])
   * @param {mixed} obj an array can be used to deselect multiple nodes
   * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
   * @trigger deselect_node.jstree, changed.jstree
   */
		deselect_node: function deselect_node(obj, supress_event, e) {
			var t1, t2, dom;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.deselect_node(obj[t1], supress_event, e);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if (obj.state.selected) {
				obj.state.selected = false;
				this._data.core.selected = $.vakata.array_remove_item(this._data.core.selected, obj.id);
				if (dom.length) {
					dom.attr('aria-selected', false).children('.jstree-anchor').removeClass('jstree-clicked');
				}
				/**
     * triggered when an node is deselected
     * @event
     * @name deselect_node.jstree
     * @param {Object} node
     * @param {Array} selected the current selection
     * @param {Object} event the event (if any) that triggered this deselect_node
     */
				this.trigger('deselect_node', { 'node': obj, 'selected': this._data.core.selected, 'event': e });
				if (!supress_event) {
					this.trigger('changed', { 'action': 'deselect_node', 'node': obj, 'selected': this._data.core.selected, 'event': e });
				}
			}
		},
		/**
   * select all nodes in the tree
   * @name select_all([supress_event])
   * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
   * @trigger select_all.jstree, changed.jstree
   */
		select_all: function select_all(supress_event) {
			var tmp = this._data.core.selected.concat([]),
			    i,
			    j;
			this._data.core.selected = this._model.data[$.jstree.root].children_d.concat();
			for (i = 0, j = this._data.core.selected.length; i < j; i++) {
				if (this._model.data[this._data.core.selected[i]]) {
					this._model.data[this._data.core.selected[i]].state.selected = true;
				}
			}
			this.redraw(true);
			/**
    * triggered when all nodes are selected
    * @event
    * @name select_all.jstree
    * @param {Array} selected the current selection
    */
			this.trigger('select_all', { 'selected': this._data.core.selected });
			if (!supress_event) {
				this.trigger('changed', { 'action': 'select_all', 'selected': this._data.core.selected, 'old_selection': tmp });
			}
		},
		/**
   * deselect all selected nodes
   * @name deselect_all([supress_event])
   * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
   * @trigger deselect_all.jstree, changed.jstree
   */
		deselect_all: function deselect_all(supress_event) {
			var tmp = this._data.core.selected.concat([]),
			    i,
			    j;
			for (i = 0, j = this._data.core.selected.length; i < j; i++) {
				if (this._model.data[this._data.core.selected[i]]) {
					this._model.data[this._data.core.selected[i]].state.selected = false;
				}
			}
			this._data.core.selected = [];
			this.element.find('.jstree-clicked').removeClass('jstree-clicked').parent().attr('aria-selected', false);
			/**
    * triggered when all nodes are deselected
    * @event
    * @name deselect_all.jstree
    * @param {Object} node the previous selection
    * @param {Array} selected the current selection
    */
			this.trigger('deselect_all', { 'selected': this._data.core.selected, 'node': tmp });
			if (!supress_event) {
				this.trigger('changed', { 'action': 'deselect_all', 'selected': this._data.core.selected, 'old_selection': tmp });
			}
		},
		/**
   * checks if a node is selected
   * @name is_selected(obj)
   * @param  {mixed}  obj
   * @return {Boolean}
   */
		is_selected: function is_selected(obj) {
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			return obj.state.selected;
		},
		/**
   * get an array of all selected nodes
   * @name get_selected([full])
   * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
   * @return {Array}
   */
		get_selected: function get_selected(full) {
			return full ? $.map(this._data.core.selected, $.proxy(function (i) {
				return this.get_node(i);
			}, this)) : this._data.core.selected.slice();
		},
		/**
   * get an array of all top level selected nodes (ignoring children of selected nodes)
   * @name get_top_selected([full])
   * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
   * @return {Array}
   */
		get_top_selected: function get_top_selected(full) {
			var tmp = this.get_selected(true),
			    obj = {},
			    i,
			    j,
			    k,
			    l;
			for (i = 0, j = tmp.length; i < j; i++) {
				obj[tmp[i].id] = tmp[i];
			}
			for (i = 0, j = tmp.length; i < j; i++) {
				for (k = 0, l = tmp[i].children_d.length; k < l; k++) {
					if (obj[tmp[i].children_d[k]]) {
						delete obj[tmp[i].children_d[k]];
					}
				}
			}
			tmp = [];
			for (i in obj) {
				if (obj.hasOwnProperty(i)) {
					tmp.push(i);
				}
			}
			return full ? $.map(tmp, $.proxy(function (i) {
				return this.get_node(i);
			}, this)) : tmp;
		},
		/**
   * get an array of all bottom level selected nodes (ignoring selected parents)
   * @name get_bottom_selected([full])
   * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
   * @return {Array}
   */
		get_bottom_selected: function get_bottom_selected(full) {
			var tmp = this.get_selected(true),
			    obj = [],
			    i,
			    j;
			for (i = 0, j = tmp.length; i < j; i++) {
				if (!tmp[i].children.length) {
					obj.push(tmp[i].id);
				}
			}
			return full ? $.map(obj, $.proxy(function (i) {
				return this.get_node(i);
			}, this)) : obj;
		},
		/**
   * gets the current state of the tree so that it can be restored later with `set_state(state)`. Used internally.
   * @name get_state()
   * @private
   * @return {Object}
   */
		get_state: function get_state() {
			var state = {
				'core': {
					'open': [],
					'scroll': {
						'left': this.element.scrollLeft(),
						'top': this.element.scrollTop()
					},
					/*!
     'themes' : {
     	'name' : this.get_theme(),
     	'icons' : this._data.core.themes.icons,
     	'dots' : this._data.core.themes.dots
     },
     */
					'selected': []
				}
			},
			    i;
			for (i in this._model.data) {
				if (this._model.data.hasOwnProperty(i)) {
					if (i !== $.jstree.root) {
						if (this._model.data[i].state.opened) {
							state.core.open.push(i);
						}
						if (this._model.data[i].state.selected) {
							state.core.selected.push(i);
						}
					}
				}
			}
			return state;
		},
		/**
   * sets the state of the tree. Used internally.
   * @name set_state(state [, callback])
   * @private
   * @param {Object} state the state to restore. Keep in mind this object is passed by reference and jstree will modify it.
   * @param {Function} callback an optional function to execute once the state is restored.
   * @trigger set_state.jstree
   */
		set_state: function set_state(state, callback) {
			if (state) {
				if (state.core && state.core.selected && state.core.initial_selection === undefined) {
					state.core.initial_selection = this._data.core.selected.concat([]).sort().join(',');
				}
				if (state.core) {
					var res, n, t, _this, i;
					if (state.core.open) {
						if (!$.isArray(state.core.open) || !state.core.open.length) {
							delete state.core.open;
							this.set_state(state, callback);
						} else {
							this._load_nodes(state.core.open, function (nodes) {
								this.open_node(nodes, false, 0);
								delete state.core.open;
								this.set_state(state, callback);
							});
						}
						return false;
					}
					if (state.core.scroll) {
						if (state.core.scroll && state.core.scroll.left !== undefined) {
							this.element.scrollLeft(state.core.scroll.left);
						}
						if (state.core.scroll && state.core.scroll.top !== undefined) {
							this.element.scrollTop(state.core.scroll.top);
						}
						delete state.core.scroll;
						this.set_state(state, callback);
						return false;
					}
					if (state.core.selected) {
						_this = this;
						if (state.core.initial_selection === undefined || state.core.initial_selection === this._data.core.selected.concat([]).sort().join(',')) {
							this.deselect_all();
							$.each(state.core.selected, function (i, v) {
								_this.select_node(v, false, true);
							});
						}
						delete state.core.initial_selection;
						delete state.core.selected;
						this.set_state(state, callback);
						return false;
					}
					for (i in state) {
						if (state.hasOwnProperty(i) && i !== "core" && $.inArray(i, this.settings.plugins) === -1) {
							delete state[i];
						}
					}
					if ($.isEmptyObject(state.core)) {
						delete state.core;
						this.set_state(state, callback);
						return false;
					}
				}
				if ($.isEmptyObject(state)) {
					state = null;
					if (callback) {
						callback.call(this);
					}
					/**
      * triggered when a `set_state` call completes
      * @event
      * @name set_state.jstree
      */
					this.trigger('set_state');
					return false;
				}
				return true;
			}
			return false;
		},
		/**
   * refreshes the tree - all nodes are reloaded with calls to `load_node`.
   * @name refresh()
   * @param {Boolean} skip_loading an option to skip showing the loading indicator
   * @param {Mixed} forget_state if set to `true` state will not be reapplied, if set to a function (receiving the current state as argument) the result of that function will be used as state
   * @trigger refresh.jstree
   */
		refresh: function refresh(skip_loading, forget_state) {
			this._data.core.state = forget_state === true ? {} : this.get_state();
			if (forget_state && $.isFunction(forget_state)) {
				this._data.core.state = forget_state.call(this, this._data.core.state);
			}
			this._cnt = 0;
			this._model.data = {};
			this._model.data[$.jstree.root] = {
				id: $.jstree.root,
				parent: null,
				parents: [],
				children: [],
				children_d: [],
				state: { loaded: false }
			};
			this._data.core.selected = [];
			this._data.core.last_clicked = null;
			this._data.core.focused = null;

			var c = this.get_container_ul()[0].className;
			if (!skip_loading) {
				this.element.html("<" + "ul class='" + c + "' role='group'><" + "li class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='treeitem' id='j" + this._id + "_loading'><i class='jstree-icon jstree-ocl'></i><" + "a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>");
				this.element.attr('aria-activedescendant', 'j' + this._id + '_loading');
			}
			this.load_node($.jstree.root, function (o, s) {
				if (s) {
					this.get_container_ul()[0].className = c;
					if (this._firstChild(this.get_container_ul()[0])) {
						this.element.attr('aria-activedescendant', this._firstChild(this.get_container_ul()[0]).id);
					}
					this.set_state($.extend(true, {}, this._data.core.state), function () {
						/**
       * triggered when a `refresh` call completes
       * @event
       * @name refresh.jstree
       */
						this.trigger('refresh');
					});
				}
				this._data.core.state = null;
			});
		},
		/**
   * refreshes a node in the tree (reload its children) all opened nodes inside that node are reloaded with calls to `load_node`.
   * @name refresh_node(obj)
   * @param  {mixed} obj the node
   * @trigger refresh_node.jstree
   */
		refresh_node: function refresh_node(obj) {
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			var opened = [],
			    to_load = [],
			    s = this._data.core.selected.concat([]);
			to_load.push(obj.id);
			if (obj.state.opened === true) {
				opened.push(obj.id);
			}
			this.get_node(obj, true).find('.jstree-open').each(function () {
				to_load.push(this.id);opened.push(this.id);
			});
			this._load_nodes(to_load, $.proxy(function (nodes) {
				this.open_node(opened, false, 0);
				this.select_node(s);
				/**
     * triggered when a node is refreshed
     * @event
     * @name refresh_node.jstree
     * @param {Object} node - the refreshed node
     * @param {Array} nodes - an array of the IDs of the nodes that were reloaded
     */
				this.trigger('refresh_node', { 'node': obj, 'nodes': nodes });
			}, this), false, true);
		},
		/**
   * set (change) the ID of a node
   * @name set_id(obj, id)
   * @param  {mixed} obj the node
   * @param  {String} id the new ID
   * @return {Boolean}
   * @trigger set_id.jstree
   */
		set_id: function set_id(obj, id) {
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			var i,
			    j,
			    m = this._model.data,
			    old = obj.id;
			id = id.toString();
			// update parents (replace current ID with new one in children and children_d)
			m[obj.parent].children[$.inArray(obj.id, m[obj.parent].children)] = id;
			for (i = 0, j = obj.parents.length; i < j; i++) {
				m[obj.parents[i]].children_d[$.inArray(obj.id, m[obj.parents[i]].children_d)] = id;
			}
			// update children (replace current ID with new one in parent and parents)
			for (i = 0, j = obj.children.length; i < j; i++) {
				m[obj.children[i]].parent = id;
			}
			for (i = 0, j = obj.children_d.length; i < j; i++) {
				m[obj.children_d[i]].parents[$.inArray(obj.id, m[obj.children_d[i]].parents)] = id;
			}
			i = $.inArray(obj.id, this._data.core.selected);
			if (i !== -1) {
				this._data.core.selected[i] = id;
			}
			// update model and obj itself (obj.id, this._model.data[KEY])
			i = this.get_node(obj.id, true);
			if (i) {
				i.attr('id', id); //.children('.jstree-anchor').attr('id', id + '_anchor').end().attr('aria-labelledby', id + '_anchor');
				if (this.element.attr('aria-activedescendant') === obj.id) {
					this.element.attr('aria-activedescendant', id);
				}
			}
			delete m[obj.id];
			obj.id = id;
			obj.li_attr.id = id;
			m[id] = obj;
			/**
    * triggered when a node id value is changed
    * @event
    * @name set_id.jstree
    * @param {Object} node
    * @param {String} old the old id
    */
			this.trigger('set_id', { "node": obj, "new": obj.id, "old": old });
			return true;
		},
		/**
   * get the text value of a node
   * @name get_text(obj)
   * @param  {mixed} obj the node
   * @return {String}
   */
		get_text: function get_text(obj) {
			obj = this.get_node(obj);
			return !obj || obj.id === $.jstree.root ? false : obj.text;
		},
		/**
   * set the text value of a node. Used internally, please use `rename_node(obj, val)`.
   * @private
   * @name set_text(obj, val)
   * @param  {mixed} obj the node, you can pass an array to set the text on multiple nodes
   * @param  {String} val the new text value
   * @return {Boolean}
   * @trigger set_text.jstree
   */
		set_text: function set_text(obj, val) {
			var t1, t2;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.set_text(obj[t1], val);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			obj.text = val;
			if (this.get_node(obj, true).length) {
				this.redraw_node(obj.id);
			}
			/**
    * triggered when a node text value is changed
    * @event
    * @name set_text.jstree
    * @param {Object} obj
    * @param {String} text the new value
    */
			this.trigger('set_text', { "obj": obj, "text": val });
			return true;
		},
		/**
   * gets a JSON representation of a node (or the whole tree)
   * @name get_json([obj, options])
   * @param  {mixed} obj
   * @param  {Object} options
   * @param  {Boolean} options.no_state do not return state information
   * @param  {Boolean} options.no_id do not return ID
   * @param  {Boolean} options.no_children do not include children
   * @param  {Boolean} options.no_data do not include node data
   * @param  {Boolean} options.no_li_attr do not include LI attributes
   * @param  {Boolean} options.no_a_attr do not include A attributes
   * @param  {Boolean} options.flat return flat JSON instead of nested
   * @return {Object}
   */
		get_json: function get_json(obj, options, flat) {
			obj = this.get_node(obj || $.jstree.root);
			if (!obj) {
				return false;
			}
			if (options && options.flat && !flat) {
				flat = [];
			}
			var tmp = {
				'id': obj.id,
				'text': obj.text,
				'icon': this.get_icon(obj),
				'li_attr': $.extend(true, {}, obj.li_attr),
				'a_attr': $.extend(true, {}, obj.a_attr),
				'state': {},
				'data': options && options.no_data ? false : $.extend(true, $.isArray(obj.data) ? [] : {}, obj.data)
				//( this.get_node(obj, true).length ? this.get_node(obj, true).data() : obj.data ),
			},
			    i,
			    j;
			if (options && options.flat) {
				tmp.parent = obj.parent;
			} else {
				tmp.children = [];
			}
			if (!options || !options.no_state) {
				for (i in obj.state) {
					if (obj.state.hasOwnProperty(i)) {
						tmp.state[i] = obj.state[i];
					}
				}
			} else {
				delete tmp.state;
			}
			if (options && options.no_li_attr) {
				delete tmp.li_attr;
			}
			if (options && options.no_a_attr) {
				delete tmp.a_attr;
			}
			if (options && options.no_id) {
				delete tmp.id;
				if (tmp.li_attr && tmp.li_attr.id) {
					delete tmp.li_attr.id;
				}
				if (tmp.a_attr && tmp.a_attr.id) {
					delete tmp.a_attr.id;
				}
			}
			if (options && options.flat && obj.id !== $.jstree.root) {
				flat.push(tmp);
			}
			if (!options || !options.no_children) {
				for (i = 0, j = obj.children.length; i < j; i++) {
					if (options && options.flat) {
						this.get_json(obj.children[i], options, flat);
					} else {
						tmp.children.push(this.get_json(obj.children[i], options));
					}
				}
			}
			return options && options.flat ? flat : obj.id === $.jstree.root ? tmp.children : tmp;
		},
		/**
   * create a new node (do not confuse with load_node)
   * @name create_node([par, node, pos, callback, is_loaded])
   * @param  {mixed}   par       the parent node (to create a root node use either "#" (string) or `null`)
   * @param  {mixed}   node      the data for the new node (a valid JSON object, or a simple string with the name)
   * @param  {mixed}   pos       the index at which to insert the node, "first" and "last" are also supported, default is "last"
   * @param  {Function} callback a function to be called once the node is created
   * @param  {Boolean} is_loaded internal argument indicating if the parent node was succesfully loaded
   * @return {String}            the ID of the newly create node
   * @trigger model.jstree, create_node.jstree
   */
		create_node: function create_node(par, node, pos, callback, is_loaded) {
			if (par === null) {
				par = $.jstree.root;
			}
			par = this.get_node(par);
			if (!par) {
				return false;
			}
			pos = pos === undefined ? "last" : pos;
			if (!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
				return this.load_node(par, function () {
					this.create_node(par, node, pos, callback, true);
				});
			}
			if (!node) {
				node = { "text": this.get_string('New node') };
			}
			if (typeof node === "string") {
				node = { "text": node };
			} else {
				node = $.extend(true, {}, node);
			}
			if (node.text === undefined) {
				node.text = this.get_string('New node');
			}
			var tmp, dpc, i, j;

			if (par.id === $.jstree.root) {
				if (pos === "before") {
					pos = "first";
				}
				if (pos === "after") {
					pos = "last";
				}
			}
			switch (pos) {
				case "before":
					tmp = this.get_node(par.parent);
					pos = $.inArray(par.id, tmp.children);
					par = tmp;
					break;
				case "after":
					tmp = this.get_node(par.parent);
					pos = $.inArray(par.id, tmp.children) + 1;
					par = tmp;
					break;
				case "inside":
				case "first":
					pos = 0;
					break;
				case "last":
					pos = par.children.length;
					break;
				default:
					if (!pos) {
						pos = 0;
					}
					break;
			}
			if (pos > par.children.length) {
				pos = par.children.length;
			}
			if (!node.id) {
				node.id = true;
			}
			if (!this.check("create_node", node, par, pos)) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			if (node.id === true) {
				delete node.id;
			}
			node = this._parse_model_from_json(node, par.id, par.parents.concat());
			if (!node) {
				return false;
			}
			tmp = this.get_node(node);
			dpc = [];
			dpc.push(node);
			dpc = dpc.concat(tmp.children_d);
			this.trigger('model', { "nodes": dpc, "parent": par.id });

			par.children_d = par.children_d.concat(dpc);
			for (i = 0, j = par.parents.length; i < j; i++) {
				this._model.data[par.parents[i]].children_d = this._model.data[par.parents[i]].children_d.concat(dpc);
			}
			node = tmp;
			tmp = [];
			for (i = 0, j = par.children.length; i < j; i++) {
				tmp[i >= pos ? i + 1 : i] = par.children[i];
			}
			tmp[pos] = node.id;
			par.children = tmp;

			this.redraw_node(par, true);
			/**
    * triggered when a node is created
    * @event
    * @name create_node.jstree
    * @param {Object} node
    * @param {String} parent the parent's ID
    * @param {Number} position the position of the new node among the parent's children
    */
			this.trigger('create_node', { "node": this.get_node(node), "parent": par.id, "position": pos });
			if (callback) {
				callback.call(this, this.get_node(node));
			}
			return node.id;
		},
		/**
   * set the text value of a node
   * @name rename_node(obj, val)
   * @param  {mixed} obj the node, you can pass an array to rename multiple nodes to the same name
   * @param  {String} val the new text value
   * @return {Boolean}
   * @trigger rename_node.jstree
   */
		rename_node: function rename_node(obj, val) {
			var t1, t2, old;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.rename_node(obj[t1], val);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			old = obj.text;
			if (!this.check("rename_node", obj, this.get_parent(obj), val)) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			this.set_text(obj, val); // .apply(this, Array.prototype.slice.call(arguments))
			/**
    * triggered when a node is renamed
    * @event
    * @name rename_node.jstree
    * @param {Object} node
    * @param {String} text the new value
    * @param {String} old the old value
    */
			this.trigger('rename_node', { "node": obj, "text": val, "old": old });
			return true;
		},
		/**
   * remove a node
   * @name delete_node(obj)
   * @param  {mixed} obj the node, you can pass an array to delete multiple nodes
   * @return {Boolean}
   * @trigger delete_node.jstree, changed.jstree
   */
		delete_node: function delete_node(obj) {
			var t1, t2, par, pos, tmp, i, j, k, l, c, top, lft;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.delete_node(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			par = this.get_node(obj.parent);
			pos = $.inArray(obj.id, par.children);
			c = false;
			if (!this.check("delete_node", obj, par, pos)) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			if (pos !== -1) {
				par.children = $.vakata.array_remove(par.children, pos);
			}
			tmp = obj.children_d.concat([]);
			tmp.push(obj.id);
			for (i = 0, j = obj.parents.length; i < j; i++) {
				this._model.data[obj.parents[i]].children_d = $.vakata.array_filter(this._model.data[obj.parents[i]].children_d, function (v) {
					return $.inArray(v, tmp) === -1;
				});
			}
			for (k = 0, l = tmp.length; k < l; k++) {
				if (this._model.data[tmp[k]].state.selected) {
					c = true;
					break;
				}
			}
			if (c) {
				this._data.core.selected = $.vakata.array_filter(this._data.core.selected, function (v) {
					return $.inArray(v, tmp) === -1;
				});
			}
			/**
    * triggered when a node is deleted
    * @event
    * @name delete_node.jstree
    * @param {Object} node
    * @param {String} parent the parent's ID
    */
			this.trigger('delete_node', { "node": obj, "parent": par.id });
			if (c) {
				this.trigger('changed', { 'action': 'delete_node', 'node': obj, 'selected': this._data.core.selected, 'parent': par.id });
			}
			for (k = 0, l = tmp.length; k < l; k++) {
				delete this._model.data[tmp[k]];
			}
			if ($.inArray(this._data.core.focused, tmp) !== -1) {
				this._data.core.focused = null;
				top = this.element[0].scrollTop;
				lft = this.element[0].scrollLeft;
				if (par.id === $.jstree.root) {
					if (this._model.data[$.jstree.root].children[0]) {
						this.get_node(this._model.data[$.jstree.root].children[0], true).children('.jstree-anchor').focus();
					}
				} else {
					this.get_node(par, true).children('.jstree-anchor').focus();
				}
				this.element[0].scrollTop = top;
				this.element[0].scrollLeft = lft;
			}
			this.redraw_node(par, true);
			return true;
		},
		/**
   * check if an operation is premitted on the tree. Used internally.
   * @private
   * @name check(chk, obj, par, pos)
   * @param  {String} chk the operation to check, can be "create_node", "rename_node", "delete_node", "copy_node" or "move_node"
   * @param  {mixed} obj the node
   * @param  {mixed} par the parent
   * @param  {mixed} pos the position to insert at, or if "rename_node" - the new name
   * @param  {mixed} more some various additional information, for example if a "move_node" operations is triggered by DND this will be the hovered node
   * @return {Boolean}
   */
		check: function check(chk, obj, par, pos, more) {
			obj = obj && obj.id ? obj : this.get_node(obj);
			par = par && par.id ? par : this.get_node(par);
			var tmp = chk.match(/^move_node|copy_node|create_node$/i) ? par : obj,
			    chc = this.settings.core.check_callback;
			if (chk === "move_node" || chk === "copy_node") {
				if ((!more || !more.is_multi) && (obj.id === par.id || chk === "move_node" && $.inArray(obj.id, par.children) === pos || $.inArray(par.id, obj.children_d) !== -1)) {
					this._data.core.last_error = { 'error': 'check', 'plugin': 'core', 'id': 'core_01', 'reason': 'Moving parent inside child', 'data': JSON.stringify({ 'chk': chk, 'pos': pos, 'obj': obj && obj.id ? obj.id : false, 'par': par && par.id ? par.id : false }) };
					return false;
				}
			}
			if (tmp && tmp.data) {
				tmp = tmp.data;
			}
			if (tmp && tmp.functions && (tmp.functions[chk] === false || tmp.functions[chk] === true)) {
				if (tmp.functions[chk] === false) {
					this._data.core.last_error = { 'error': 'check', 'plugin': 'core', 'id': 'core_02', 'reason': 'Node data prevents function: ' + chk, 'data': JSON.stringify({ 'chk': chk, 'pos': pos, 'obj': obj && obj.id ? obj.id : false, 'par': par && par.id ? par.id : false }) };
				}
				return tmp.functions[chk];
			}
			if (chc === false || $.isFunction(chc) && chc.call(this, chk, obj, par, pos, more) === false || chc && chc[chk] === false) {
				this._data.core.last_error = { 'error': 'check', 'plugin': 'core', 'id': 'core_03', 'reason': 'User config for core.check_callback prevents function: ' + chk, 'data': JSON.stringify({ 'chk': chk, 'pos': pos, 'obj': obj && obj.id ? obj.id : false, 'par': par && par.id ? par.id : false }) };
				return false;
			}
			return true;
		},
		/**
   * get the last error
   * @name last_error()
   * @return {Object}
   */
		last_error: function last_error() {
			return this._data.core.last_error;
		},
		/**
   * move a node to a new parent
   * @name move_node(obj, par [, pos, callback, is_loaded])
   * @param  {mixed} obj the node to move, pass an array to move multiple nodes
   * @param  {mixed} par the new parent
   * @param  {mixed} pos the position to insert at (besides integer values, "first" and "last" are supported, as well as "before" and "after"), defaults to integer `0`
   * @param  {function} callback a function to call once the move is completed, receives 3 arguments - the node, the new parent and the position
   * @param  {Boolean} is_loaded internal parameter indicating if the parent node has been loaded
   * @param  {Boolean} skip_redraw internal parameter indicating if the tree should be redrawn
   * @param  {Boolean} instance internal parameter indicating if the node comes from another instance
   * @trigger move_node.jstree
   */
		move_node: function move_node(obj, par, pos, callback, is_loaded, skip_redraw, origin) {
			var t1, t2, old_par, old_pos, new_par, old_ins, is_multi, dpc, tmp, i, j, k, l, p;

			par = this.get_node(par);
			pos = pos === undefined ? 0 : pos;
			if (!par) {
				return false;
			}
			if (!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
				return this.load_node(par, function () {
					this.move_node(obj, par, pos, callback, true, false, origin);
				});
			}

			if ($.isArray(obj)) {
				if (obj.length === 1) {
					obj = obj[0];
				} else {
					//obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						if (tmp = this.move_node(obj[t1], par, pos, callback, is_loaded, false, origin)) {
							par = tmp;
							pos = "after";
						}
					}
					this.redraw();
					return true;
				}
			}
			obj = obj && obj.id ? obj : this.get_node(obj);

			if (!obj || obj.id === $.jstree.root) {
				return false;
			}

			old_par = (obj.parent || $.jstree.root).toString();
			new_par = !pos.toString().match(/^(before|after)$/) || par.id === $.jstree.root ? par : this.get_node(par.parent);
			old_ins = origin ? origin : this._model.data[obj.id] ? this : $.jstree.reference(obj.id);
			is_multi = !old_ins || !old_ins._id || this._id !== old_ins._id;
			old_pos = old_ins && old_ins._id && old_par && old_ins._model.data[old_par] && old_ins._model.data[old_par].children ? $.inArray(obj.id, old_ins._model.data[old_par].children) : -1;
			if (old_ins && old_ins._id) {
				obj = old_ins._model.data[obj.id];
			}

			if (is_multi) {
				if (tmp = this.copy_node(obj, par, pos, callback, is_loaded, false, origin)) {
					if (old_ins) {
						old_ins.delete_node(obj);
					}
					return tmp;
				}
				return false;
			}
			//var m = this._model.data;
			if (par.id === $.jstree.root) {
				if (pos === "before") {
					pos = "first";
				}
				if (pos === "after") {
					pos = "last";
				}
			}
			switch (pos) {
				case "before":
					pos = $.inArray(par.id, new_par.children);
					break;
				case "after":
					pos = $.inArray(par.id, new_par.children) + 1;
					break;
				case "inside":
				case "first":
					pos = 0;
					break;
				case "last":
					pos = new_par.children.length;
					break;
				default:
					if (!pos) {
						pos = 0;
					}
					break;
			}
			if (pos > new_par.children.length) {
				pos = new_par.children.length;
			}
			if (!this.check("move_node", obj, new_par, pos, { 'core': true, 'origin': origin, 'is_multi': old_ins && old_ins._id && old_ins._id !== this._id, 'is_foreign': !old_ins || !old_ins._id })) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			if (obj.parent === new_par.id) {
				dpc = new_par.children.concat();
				tmp = $.inArray(obj.id, dpc);
				if (tmp !== -1) {
					dpc = $.vakata.array_remove(dpc, tmp);
					if (pos > tmp) {
						pos--;
					}
				}
				tmp = [];
				for (i = 0, j = dpc.length; i < j; i++) {
					tmp[i >= pos ? i + 1 : i] = dpc[i];
				}
				tmp[pos] = obj.id;
				new_par.children = tmp;
				this._node_changed(new_par.id);
				this.redraw(new_par.id === $.jstree.root);
			} else {
				// clean old parent and up
				tmp = obj.children_d.concat();
				tmp.push(obj.id);
				for (i = 0, j = obj.parents.length; i < j; i++) {
					dpc = [];
					p = old_ins._model.data[obj.parents[i]].children_d;
					for (k = 0, l = p.length; k < l; k++) {
						if ($.inArray(p[k], tmp) === -1) {
							dpc.push(p[k]);
						}
					}
					old_ins._model.data[obj.parents[i]].children_d = dpc;
				}
				old_ins._model.data[old_par].children = $.vakata.array_remove_item(old_ins._model.data[old_par].children, obj.id);

				// insert into new parent and up
				for (i = 0, j = new_par.parents.length; i < j; i++) {
					this._model.data[new_par.parents[i]].children_d = this._model.data[new_par.parents[i]].children_d.concat(tmp);
				}
				dpc = [];
				for (i = 0, j = new_par.children.length; i < j; i++) {
					dpc[i >= pos ? i + 1 : i] = new_par.children[i];
				}
				dpc[pos] = obj.id;
				new_par.children = dpc;
				new_par.children_d.push(obj.id);
				new_par.children_d = new_par.children_d.concat(obj.children_d);

				// update object
				obj.parent = new_par.id;
				tmp = new_par.parents.concat();
				tmp.unshift(new_par.id);
				p = obj.parents.length;
				obj.parents = tmp;

				// update object children
				tmp = tmp.concat();
				for (i = 0, j = obj.children_d.length; i < j; i++) {
					this._model.data[obj.children_d[i]].parents = this._model.data[obj.children_d[i]].parents.slice(0, p * -1);
					Array.prototype.push.apply(this._model.data[obj.children_d[i]].parents, tmp);
				}

				if (old_par === $.jstree.root || new_par.id === $.jstree.root) {
					this._model.force_full_redraw = true;
				}
				if (!this._model.force_full_redraw) {
					this._node_changed(old_par);
					this._node_changed(new_par.id);
				}
				if (!skip_redraw) {
					this.redraw();
				}
			}
			if (callback) {
				callback.call(this, obj, new_par, pos);
			}
			/**
    * triggered when a node is moved
    * @event
    * @name move_node.jstree
    * @param {Object} node
    * @param {String} parent the parent's ID
    * @param {Number} position the position of the node among the parent's children
    * @param {String} old_parent the old parent of the node
    * @param {Number} old_position the old position of the node
    * @param {Boolean} is_multi do the node and new parent belong to different instances
    * @param {jsTree} old_instance the instance the node came from
    * @param {jsTree} new_instance the instance of the new parent
    */
			this.trigger('move_node', { "node": obj, "parent": new_par.id, "position": pos, "old_parent": old_par, "old_position": old_pos, 'is_multi': old_ins && old_ins._id && old_ins._id !== this._id, 'is_foreign': !old_ins || !old_ins._id, 'old_instance': old_ins, 'new_instance': this });
			return obj.id;
		},
		/**
   * copy a node to a new parent
   * @name copy_node(obj, par [, pos, callback, is_loaded])
   * @param  {mixed} obj the node to copy, pass an array to copy multiple nodes
   * @param  {mixed} par the new parent
   * @param  {mixed} pos the position to insert at (besides integer values, "first" and "last" are supported, as well as "before" and "after"), defaults to integer `0`
   * @param  {function} callback a function to call once the move is completed, receives 3 arguments - the node, the new parent and the position
   * @param  {Boolean} is_loaded internal parameter indicating if the parent node has been loaded
   * @param  {Boolean} skip_redraw internal parameter indicating if the tree should be redrawn
   * @param  {Boolean} instance internal parameter indicating if the node comes from another instance
   * @trigger model.jstree copy_node.jstree
   */
		copy_node: function copy_node(obj, par, pos, callback, is_loaded, skip_redraw, origin) {
			var t1, t2, dpc, tmp, i, j, node, old_par, new_par, old_ins, is_multi;

			par = this.get_node(par);
			pos = pos === undefined ? 0 : pos;
			if (!par) {
				return false;
			}
			if (!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
				return this.load_node(par, function () {
					this.copy_node(obj, par, pos, callback, true, false, origin);
				});
			}

			if ($.isArray(obj)) {
				if (obj.length === 1) {
					obj = obj[0];
				} else {
					//obj = obj.slice();
					for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						if (tmp = this.copy_node(obj[t1], par, pos, callback, is_loaded, true, origin)) {
							par = tmp;
							pos = "after";
						}
					}
					this.redraw();
					return true;
				}
			}
			obj = obj && obj.id ? obj : this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}

			old_par = (obj.parent || $.jstree.root).toString();
			new_par = !pos.toString().match(/^(before|after)$/) || par.id === $.jstree.root ? par : this.get_node(par.parent);
			old_ins = origin ? origin : this._model.data[obj.id] ? this : $.jstree.reference(obj.id);
			is_multi = !old_ins || !old_ins._id || this._id !== old_ins._id;

			if (old_ins && old_ins._id) {
				obj = old_ins._model.data[obj.id];
			}

			if (par.id === $.jstree.root) {
				if (pos === "before") {
					pos = "first";
				}
				if (pos === "after") {
					pos = "last";
				}
			}
			switch (pos) {
				case "before":
					pos = $.inArray(par.id, new_par.children);
					break;
				case "after":
					pos = $.inArray(par.id, new_par.children) + 1;
					break;
				case "inside":
				case "first":
					pos = 0;
					break;
				case "last":
					pos = new_par.children.length;
					break;
				default:
					if (!pos) {
						pos = 0;
					}
					break;
			}
			if (pos > new_par.children.length) {
				pos = new_par.children.length;
			}
			if (!this.check("copy_node", obj, new_par, pos, { 'core': true, 'origin': origin, 'is_multi': old_ins && old_ins._id && old_ins._id !== this._id, 'is_foreign': !old_ins || !old_ins._id })) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			node = old_ins ? old_ins.get_json(obj, { no_id: true, no_data: true, no_state: true }) : obj;
			if (!node) {
				return false;
			}
			if (node.id === true) {
				delete node.id;
			}
			node = this._parse_model_from_json(node, new_par.id, new_par.parents.concat());
			if (!node) {
				return false;
			}
			tmp = this.get_node(node);
			if (obj && obj.state && obj.state.loaded === false) {
				tmp.state.loaded = false;
			}
			dpc = [];
			dpc.push(node);
			dpc = dpc.concat(tmp.children_d);
			this.trigger('model', { "nodes": dpc, "parent": new_par.id });

			// insert into new parent and up
			for (i = 0, j = new_par.parents.length; i < j; i++) {
				this._model.data[new_par.parents[i]].children_d = this._model.data[new_par.parents[i]].children_d.concat(dpc);
			}
			dpc = [];
			for (i = 0, j = new_par.children.length; i < j; i++) {
				dpc[i >= pos ? i + 1 : i] = new_par.children[i];
			}
			dpc[pos] = tmp.id;
			new_par.children = dpc;
			new_par.children_d.push(tmp.id);
			new_par.children_d = new_par.children_d.concat(tmp.children_d);

			if (new_par.id === $.jstree.root) {
				this._model.force_full_redraw = true;
			}
			if (!this._model.force_full_redraw) {
				this._node_changed(new_par.id);
			}
			if (!skip_redraw) {
				this.redraw(new_par.id === $.jstree.root);
			}
			if (callback) {
				callback.call(this, tmp, new_par, pos);
			}
			/**
    * triggered when a node is copied
    * @event
    * @name copy_node.jstree
    * @param {Object} node the copied node
    * @param {Object} original the original node
    * @param {String} parent the parent's ID
    * @param {Number} position the position of the node among the parent's children
    * @param {String} old_parent the old parent of the node
    * @param {Number} old_position the position of the original node
    * @param {Boolean} is_multi do the node and new parent belong to different instances
    * @param {jsTree} old_instance the instance the node came from
    * @param {jsTree} new_instance the instance of the new parent
    */
			this.trigger('copy_node', { "node": tmp, "original": obj, "parent": new_par.id, "position": pos, "old_parent": old_par, "old_position": old_ins && old_ins._id && old_par && old_ins._model.data[old_par] && old_ins._model.data[old_par].children ? $.inArray(obj.id, old_ins._model.data[old_par].children) : -1, 'is_multi': old_ins && old_ins._id && old_ins._id !== this._id, 'is_foreign': !old_ins || !old_ins._id, 'old_instance': old_ins, 'new_instance': this });
			return tmp.id;
		},
		/**
   * cut a node (a later call to `paste(obj)` would move the node)
   * @name cut(obj)
   * @param  {mixed} obj multiple objects can be passed using an array
   * @trigger cut.jstree
   */
		cut: function cut(obj) {
			if (!obj) {
				obj = this._data.core.selected.concat();
			}
			if (!$.isArray(obj)) {
				obj = [obj];
			}
			if (!obj.length) {
				return false;
			}
			var tmp = [],
			    o,
			    t1,
			    t2;
			for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
				o = this.get_node(obj[t1]);
				if (o && o.id && o.id !== $.jstree.root) {
					tmp.push(o);
				}
			}
			if (!tmp.length) {
				return false;
			}
			ccp_node = tmp;
			ccp_inst = this;
			ccp_mode = 'move_node';
			/**
    * triggered when nodes are added to the buffer for moving
    * @event
    * @name cut.jstree
    * @param {Array} node
    */
			this.trigger('cut', { "node": obj });
		},
		/**
   * copy a node (a later call to `paste(obj)` would copy the node)
   * @name copy(obj)
   * @param  {mixed} obj multiple objects can be passed using an array
   * @trigger copy.jstree
   */
		copy: function copy(obj) {
			if (!obj) {
				obj = this._data.core.selected.concat();
			}
			if (!$.isArray(obj)) {
				obj = [obj];
			}
			if (!obj.length) {
				return false;
			}
			var tmp = [],
			    o,
			    t1,
			    t2;
			for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
				o = this.get_node(obj[t1]);
				if (o && o.id && o.id !== $.jstree.root) {
					tmp.push(o);
				}
			}
			if (!tmp.length) {
				return false;
			}
			ccp_node = tmp;
			ccp_inst = this;
			ccp_mode = 'copy_node';
			/**
    * triggered when nodes are added to the buffer for copying
    * @event
    * @name copy.jstree
    * @param {Array} node
    */
			this.trigger('copy', { "node": obj });
		},
		/**
   * get the current buffer (any nodes that are waiting for a paste operation)
   * @name get_buffer()
   * @return {Object} an object consisting of `mode` ("copy_node" or "move_node"), `node` (an array of objects) and `inst` (the instance)
   */
		get_buffer: function get_buffer() {
			return { 'mode': ccp_mode, 'node': ccp_node, 'inst': ccp_inst };
		},
		/**
   * check if there is something in the buffer to paste
   * @name can_paste()
   * @return {Boolean}
   */
		can_paste: function can_paste() {
			return ccp_mode !== false && ccp_node !== false; // && ccp_inst._model.data[ccp_node];
		},
		/**
   * copy or move the previously cut or copied nodes to a new parent
   * @name paste(obj [, pos])
   * @param  {mixed} obj the new parent
   * @param  {mixed} pos the position to insert at (besides integer, "first" and "last" are supported), defaults to integer `0`
   * @trigger paste.jstree
   */
		paste: function paste(obj, pos) {
			obj = this.get_node(obj);
			if (!obj || !ccp_mode || !ccp_mode.match(/^(copy_node|move_node)$/) || !ccp_node) {
				return false;
			}
			if (this[ccp_mode](ccp_node, obj, pos, false, false, false, ccp_inst)) {
				/**
     * triggered when paste is invoked
     * @event
     * @name paste.jstree
     * @param {String} parent the ID of the receiving node
     * @param {Array} node the nodes in the buffer
     * @param {String} mode the performed operation - "copy_node" or "move_node"
     */
				this.trigger('paste', { "parent": obj.id, "node": ccp_node, "mode": ccp_mode });
			}
			ccp_node = false;
			ccp_mode = false;
			ccp_inst = false;
		},
		/**
   * clear the buffer of previously copied or cut nodes
   * @name clear_buffer()
   * @trigger clear_buffer.jstree
   */
		clear_buffer: function clear_buffer() {
			ccp_node = false;
			ccp_mode = false;
			ccp_inst = false;
			/**
    * triggered when the copy / cut buffer is cleared
    * @event
    * @name clear_buffer.jstree
    */
			this.trigger('clear_buffer');
		},
		/**
   * put a node in edit mode (input field to rename the node)
   * @name edit(obj [, default_text, callback])
   * @param  {mixed} obj
   * @param  {String} default_text the text to populate the input with (if omitted or set to a non-string value the node's text value is used)
   * @param  {Function} callback a function to be called once the text box is blurred, it is called in the instance's scope and receives the node, a status parameter (true if the rename is successful, false otherwise) and a boolean indicating if the user cancelled the edit. You can access the node's title using .text
   */
		edit: function edit(obj, default_text, callback) {
			var rtl,
			    w,
			    a,
			    s,
			    t,
			    h1,
			    h2,
			    fn,
			    tmp,
			    cancel = false;
			obj = this.get_node(obj);
			if (!obj) {
				return false;
			}
			if (!this.check("edit", obj, this.get_parent(obj))) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			tmp = obj;
			default_text = typeof default_text === 'string' ? default_text : obj.text;
			this.set_text(obj, "");
			obj = this._open_to(obj);
			tmp.text = default_text;

			rtl = this._data.core.rtl;
			w = this.element.width();
			this._data.core.focused = tmp.id;
			a = obj.children('.jstree-anchor').focus();
			s = $('<span>');
			/*!
   oi = obj.children("i:visible"),
   ai = a.children("i:visible"),
   w1 = oi.width() * oi.length,
   w2 = ai.width() * ai.length,
   */
			t = default_text;
			h1 = $("<" + "div />", { css: { "position": "absolute", "top": "-200px", "left": rtl ? "0px" : "-1000px", "visibility": "hidden" } }).appendTo("body");
			h2 = $("<" + "input />", {
				"value": t,
				"class": "jstree-rename-input",
				// "size" : t.length,
				"css": {
					"padding": "0",
					"border": "1px solid silver",
					"box-sizing": "border-box",
					"display": "inline-block",
					"height": this._data.core.li_height + "px",
					"lineHeight": this._data.core.li_height + "px",
					"width": "150px" // will be set a bit further down
				},
				"blur": $.proxy(function (e) {
					e.stopImmediatePropagation();
					e.preventDefault();
					var i = s.children(".jstree-rename-input"),
					    v = i.val(),
					    f = this.settings.core.force_text,
					    nv;
					if (v === "") {
						v = t;
					}
					h1.remove();
					s.replaceWith(a);
					s.remove();
					t = f ? t : $('<div></div>').append($.parseHTML(t)).html();
					this.set_text(obj, t);
					nv = !!this.rename_node(obj, f ? $('<div></div>').text(v).text() : $('<div></div>').append($.parseHTML(v)).html());
					if (!nv) {
						this.set_text(obj, t); // move this up? and fix #483
					}
					this._data.core.focused = tmp.id;
					setTimeout($.proxy(function () {
						var node = this.get_node(tmp.id, true);
						if (node.length) {
							this._data.core.focused = tmp.id;
							node.children('.jstree-anchor').focus();
						}
					}, this), 0);
					if (callback) {
						callback.call(this, tmp, nv, cancel);
					}
					h2 = null;
				}, this),
				"keydown": function keydown(e) {
					var key = e.which;
					if (key === 27) {
						cancel = true;
						this.value = t;
					}
					if (key === 27 || key === 13 || key === 37 || key === 38 || key === 39 || key === 40 || key === 32) {
						e.stopImmediatePropagation();
					}
					if (key === 27 || key === 13) {
						e.preventDefault();
						this.blur();
					}
				},
				"click": function click(e) {
					e.stopImmediatePropagation();
				},
				"mousedown": function mousedown(e) {
					e.stopImmediatePropagation();
				},
				"keyup": function keyup(e) {
					h2.width(Math.min(h1.text("pW" + this.value).width(), w));
				},
				"keypress": function keypress(e) {
					if (e.which === 13) {
						return false;
					}
				}
			});
			fn = {
				fontFamily: a.css('fontFamily') || '',
				fontSize: a.css('fontSize') || '',
				fontWeight: a.css('fontWeight') || '',
				fontStyle: a.css('fontStyle') || '',
				fontStretch: a.css('fontStretch') || '',
				fontVariant: a.css('fontVariant') || '',
				letterSpacing: a.css('letterSpacing') || '',
				wordSpacing: a.css('wordSpacing') || ''
			};
			s.attr('class', a.attr('class')).append(a.contents().clone()).append(h2);
			a.replaceWith(s);
			h1.css(fn);
			h2.css(fn).width(Math.min(h1.text("pW" + h2[0].value).width(), w))[0].select();
			$(document).one('mousedown.jstree touchstart.jstree dnd_start.vakata', function (e) {
				if (h2 && e.target !== h2) {
					$(h2).blur();
				}
			});
		},

		/**
   * changes the theme
   * @name set_theme(theme_name [, theme_url])
   * @param {String} theme_name the name of the new theme to apply
   * @param {mixed} theme_url  the location of the CSS file for this theme. Omit or set to `false` if you manually included the file. Set to `true` to autoload from the `core.themes.dir` directory.
   * @trigger set_theme.jstree
   */
		set_theme: function set_theme(theme_name, theme_url) {
			if (!theme_name) {
				return false;
			}
			if (theme_url === true) {
				var dir = this.settings.core.themes.dir;
				if (!dir) {
					dir = $.jstree.path + '/themes';
				}
				theme_url = dir + '/' + theme_name + '/style.css';
			}
			if (theme_url && $.inArray(theme_url, themes_loaded) === -1) {
				$('head').append('<' + 'link rel="stylesheet" href="' + theme_url + '" type="text/css" />');
				themes_loaded.push(theme_url);
			}
			if (this._data.core.themes.name) {
				this.element.removeClass('jstree-' + this._data.core.themes.name);
			}
			this._data.core.themes.name = theme_name;
			this.element.addClass('jstree-' + theme_name);
			this.element[this.settings.core.themes.responsive ? 'addClass' : 'removeClass']('jstree-' + theme_name + '-responsive');
			/**
    * triggered when a theme is set
    * @event
    * @name set_theme.jstree
    * @param {String} theme the new theme
    */
			this.trigger('set_theme', { 'theme': theme_name });
		},
		/**
   * gets the name of the currently applied theme name
   * @name get_theme()
   * @return {String}
   */
		get_theme: function get_theme() {
			return this._data.core.themes.name;
		},
		/**
   * changes the theme variant (if the theme has variants)
   * @name set_theme_variant(variant_name)
   * @param {String|Boolean} variant_name the variant to apply (if `false` is used the current variant is removed)
   */
		set_theme_variant: function set_theme_variant(variant_name) {
			if (this._data.core.themes.variant) {
				this.element.removeClass('jstree-' + this._data.core.themes.name + '-' + this._data.core.themes.variant);
			}
			this._data.core.themes.variant = variant_name;
			if (variant_name) {
				this.element.addClass('jstree-' + this._data.core.themes.name + '-' + this._data.core.themes.variant);
			}
		},
		/**
   * gets the name of the currently applied theme variant
   * @name get_theme()
   * @return {String}
   */
		get_theme_variant: function get_theme_variant() {
			return this._data.core.themes.variant;
		},
		/**
   * shows a striped background on the container (if the theme supports it)
   * @name show_stripes()
   */
		show_stripes: function show_stripes() {
			this._data.core.themes.stripes = true;
			this.get_container_ul().addClass("jstree-striped");
			/**
    * triggered when stripes are shown
    * @event
    * @name show_stripes.jstree
    */
			this.trigger('show_stripes');
		},
		/**
   * hides the striped background on the container
   * @name hide_stripes()
   */
		hide_stripes: function hide_stripes() {
			this._data.core.themes.stripes = false;
			this.get_container_ul().removeClass("jstree-striped");
			/**
    * triggered when stripes are hidden
    * @event
    * @name hide_stripes.jstree
    */
			this.trigger('hide_stripes');
		},
		/**
   * toggles the striped background on the container
   * @name toggle_stripes()
   */
		toggle_stripes: function toggle_stripes() {
			if (this._data.core.themes.stripes) {
				this.hide_stripes();
			} else {
				this.show_stripes();
			}
		},
		/**
   * shows the connecting dots (if the theme supports it)
   * @name show_dots()
   */
		show_dots: function show_dots() {
			this._data.core.themes.dots = true;
			this.get_container_ul().removeClass("jstree-no-dots");
			/**
    * triggered when dots are shown
    * @event
    * @name show_dots.jstree
    */
			this.trigger('show_dots');
		},
		/**
   * hides the connecting dots
   * @name hide_dots()
   */
		hide_dots: function hide_dots() {
			this._data.core.themes.dots = false;
			this.get_container_ul().addClass("jstree-no-dots");
			/**
    * triggered when dots are hidden
    * @event
    * @name hide_dots.jstree
    */
			this.trigger('hide_dots');
		},
		/**
   * toggles the connecting dots
   * @name toggle_dots()
   */
		toggle_dots: function toggle_dots() {
			if (this._data.core.themes.dots) {
				this.hide_dots();
			} else {
				this.show_dots();
			}
		},
		/**
   * show the node icons
   * @name show_icons()
   */
		show_icons: function show_icons() {
			this._data.core.themes.icons = true;
			this.get_container_ul().removeClass("jstree-no-icons");
			/**
    * triggered when icons are shown
    * @event
    * @name show_icons.jstree
    */
			this.trigger('show_icons');
		},
		/**
   * hide the node icons
   * @name hide_icons()
   */
		hide_icons: function hide_icons() {
			this._data.core.themes.icons = false;
			this.get_container_ul().addClass("jstree-no-icons");
			/**
    * triggered when icons are hidden
    * @event
    * @name hide_icons.jstree
    */
			this.trigger('hide_icons');
		},
		/**
   * toggle the node icons
   * @name toggle_icons()
   */
		toggle_icons: function toggle_icons() {
			if (this._data.core.themes.icons) {
				this.hide_icons();
			} else {
				this.show_icons();
			}
		},
		/**
   * show the node ellipsis
   * @name show_icons()
   */
		show_ellipsis: function show_ellipsis() {
			this._data.core.themes.ellipsis = true;
			this.get_container_ul().addClass("jstree-ellipsis");
			/**
    * triggered when ellisis is shown
    * @event
    * @name show_ellipsis.jstree
    */
			this.trigger('show_ellipsis');
		},
		/**
   * hide the node ellipsis
   * @name hide_ellipsis()
   */
		hide_ellipsis: function hide_ellipsis() {
			this._data.core.themes.ellipsis = false;
			this.get_container_ul().removeClass("jstree-ellipsis");
			/**
    * triggered when ellisis is hidden
    * @event
    * @name hide_ellipsis.jstree
    */
			this.trigger('hide_ellipsis');
		},
		/**
   * toggle the node ellipsis
   * @name toggle_icons()
   */
		toggle_ellipsis: function toggle_ellipsis() {
			if (this._data.core.themes.ellipsis) {
				this.hide_ellipsis();
			} else {
				this.show_ellipsis();
			}
		},
		/**
   * set the node icon for a node
   * @name set_icon(obj, icon)
   * @param {mixed} obj
   * @param {String} icon the new icon - can be a path to an icon or a className, if using an image that is in the current directory use a `./` prefix, otherwise it will be detected as a class
   */
		set_icon: function set_icon(obj, icon) {
			var t1, t2, dom, old;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.set_icon(obj[t1], icon);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			old = obj.icon;
			obj.icon = icon === true || icon === null || icon === undefined || icon === '' ? true : icon;
			dom = this.get_node(obj, true).children(".jstree-anchor").children(".jstree-themeicon");
			if (icon === false) {
				this.hide_icon(obj);
			} else if (icon === true || icon === null || icon === undefined || icon === '') {
				dom.removeClass('jstree-themeicon-custom ' + old).css("background", "").removeAttr("rel");
				if (old === false) {
					this.show_icon(obj);
				}
			} else if (icon.indexOf("/") === -1 && icon.indexOf(".") === -1) {
				dom.removeClass(old).css("background", "");
				dom.addClass(icon + ' jstree-themeicon-custom').attr("rel", icon);
				if (old === false) {
					this.show_icon(obj);
				}
			} else {
				dom.removeClass(old).css("background", "");
				dom.addClass('jstree-themeicon-custom').css("background", "url('" + icon + "') center center no-repeat").attr("rel", icon);
				if (old === false) {
					this.show_icon(obj);
				}
			}
			return true;
		},
		/**
   * get the node icon for a node
   * @name get_icon(obj)
   * @param {mixed} obj
   * @return {String}
   */
		get_icon: function get_icon(obj) {
			obj = this.get_node(obj);
			return !obj || obj.id === $.jstree.root ? false : obj.icon;
		},
		/**
   * hide the icon on an individual node
   * @name hide_icon(obj)
   * @param {mixed} obj
   */
		hide_icon: function hide_icon(obj) {
			var t1, t2;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.hide_icon(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj === $.jstree.root) {
				return false;
			}
			obj.icon = false;
			this.get_node(obj, true).children(".jstree-anchor").children(".jstree-themeicon").addClass('jstree-themeicon-hidden');
			return true;
		},
		/**
   * show the icon on an individual node
   * @name show_icon(obj)
   * @param {mixed} obj
   */
		show_icon: function show_icon(obj) {
			var t1, t2, dom;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.show_icon(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			obj.icon = dom.length ? dom.children(".jstree-anchor").children(".jstree-themeicon").attr('rel') : true;
			if (!obj.icon) {
				obj.icon = true;
			}
			dom.children(".jstree-anchor").children(".jstree-themeicon").removeClass('jstree-themeicon-hidden');
			return true;
		}
	};

	// helpers
	$.vakata = {};
	// collect attributes
	$.vakata.attributes = function (node, with_values) {
		node = $(node)[0];
		var attr = with_values ? {} : [];
		if (node && node.attributes) {
			$.each(node.attributes, function (i, v) {
				if ($.inArray(v.name.toLowerCase(), ['style', 'contenteditable', 'hasfocus', 'tabindex']) !== -1) {
					return;
				}
				if (v.value !== null && $.trim(v.value) !== '') {
					if (with_values) {
						attr[v.name] = v.value;
					} else {
						attr.push(v.name);
					}
				}
			});
		}
		return attr;
	};
	$.vakata.array_unique = function (array) {
		var a = [],
		    i,
		    j,
		    l,
		    o = {};
		for (i = 0, l = array.length; i < l; i++) {
			if (o[array[i]] === undefined) {
				a.push(array[i]);
				o[array[i]] = true;
			}
		}
		return a;
	};
	// remove item from array
	$.vakata.array_remove = function (array, from) {
		array.splice(from, 1);
		return array;
		//var rest = array.slice((to || from) + 1 || array.length);
		//array.length = from < 0 ? array.length + from : from;
		//array.push.apply(array, rest);
		//return array;
	};
	// remove item from array
	$.vakata.array_remove_item = function (array, item) {
		var tmp = $.inArray(item, array);
		return tmp !== -1 ? $.vakata.array_remove(array, tmp) : array;
	};
	$.vakata.array_filter = function (c, a, b, d, e) {
		if (c.filter) {
			return c.filter(a, b);
		}
		d = [];
		for (e in c) {
			if (~~e + '' === e + '' && e >= 0 && a.call(b, c[e], +e, c)) {
				d.push(c[e]);
			}
		}
		return d;
	};

	/**
  * ### Changed plugin
  *
  * This plugin adds more information to the `changed.jstree` event. The new data is contained in the `changed` event data property, and contains a lists of `selected` and `deselected` nodes.
  */

	$.jstree.plugins.changed = function (options, parent) {
		var last = [];
		this.trigger = function (ev, data) {
			var i, j;
			if (!data) {
				data = {};
			}
			if (ev.replace('.jstree', '') === 'changed') {
				data.changed = { selected: [], deselected: [] };
				var tmp = {};
				for (i = 0, j = last.length; i < j; i++) {
					tmp[last[i]] = 1;
				}
				for (i = 0, j = data.selected.length; i < j; i++) {
					if (!tmp[data.selected[i]]) {
						data.changed.selected.push(data.selected[i]);
					} else {
						tmp[data.selected[i]] = 2;
					}
				}
				for (i = 0, j = last.length; i < j; i++) {
					if (tmp[last[i]] === 1) {
						data.changed.deselected.push(last[i]);
					}
				}
				last = data.selected.slice();
			}
			/**
    * triggered when selection changes (the "changed" plugin enhances the original event with more data)
    * @event
    * @name changed.jstree
    * @param {Object} node
    * @param {Object} action the action that caused the selection to change
    * @param {Array} selected the current selection
    * @param {Object} changed an object containing two properties `selected` and `deselected` - both arrays of node IDs, which were selected or deselected since the last changed event
    * @param {Object} event the event (if any) that triggered this changed event
    * @plugin changed
    */
			parent.trigger.call(this, ev, data);
		};
		this.refresh = function (skip_loading, forget_state) {
			last = [];
			return parent.refresh.apply(this, arguments);
		};
	};

	/**
  * ### Checkbox plugin
  *
  * This plugin renders checkbox icons in front of each node, making multiple selection much easier.
  * It also supports tri-state behavior, meaning that if a node has a few of its children checked it will be rendered as undetermined, and state will be propagated up.
  */

	var _i = document.createElement('I');
	_i.className = 'jstree-icon jstree-checkbox';
	_i.setAttribute('role', 'presentation');
	/**
  * stores all defaults for the checkbox plugin
  * @name $.jstree.defaults.checkbox
  * @plugin checkbox
  */
	$.jstree.defaults.checkbox = {
		/**
   * a boolean indicating if checkboxes should be visible (can be changed at a later time using `show_checkboxes()` and `hide_checkboxes`). Defaults to `true`.
   * @name $.jstree.defaults.checkbox.visible
   * @plugin checkbox
   */
		visible: true,
		/**
   * a boolean indicating if checkboxes should cascade down and have an undetermined state. Defaults to `true`.
   * @name $.jstree.defaults.checkbox.three_state
   * @plugin checkbox
   */
		three_state: true,
		/**
   * a boolean indicating if clicking anywhere on the node should act as clicking on the checkbox. Defaults to `true`.
   * @name $.jstree.defaults.checkbox.whole_node
   * @plugin checkbox
   */
		whole_node: true,
		/**
   * a boolean indicating if the selected style of a node should be kept, or removed. Defaults to `true`.
   * @name $.jstree.defaults.checkbox.keep_selected_style
   * @plugin checkbox
   */
		keep_selected_style: true,
		/**
   * This setting controls how cascading and undetermined nodes are applied.
   * If 'up' is in the string - cascading up is enabled, if 'down' is in the string - cascading down is enabled, if 'undetermined' is in the string - undetermined nodes will be used.
   * If `three_state` is set to `true` this setting is automatically set to 'up+down+undetermined'. Defaults to ''.
   * @name $.jstree.defaults.checkbox.cascade
   * @plugin checkbox
   */
		cascade: '',
		/**
   * This setting controls if checkbox are bound to the general tree selection or to an internal array maintained by the checkbox plugin. Defaults to `true`, only set to `false` if you know exactly what you are doing.
   * @name $.jstree.defaults.checkbox.tie_selection
   * @plugin checkbox
   */
		tie_selection: true,

		/**
   * This setting controls if cascading down affects disabled checkboxes
   * @name $.jstree.defaults.checkbox.cascade_to_disabled
   * @plugin checkbox
   */
		cascade_to_disabled: true,

		/**
   * This setting controls if cascading down affects hidden checkboxes
   * @name $.jstree.defaults.checkbox.cascade_to_hidden
   * @plugin checkbox
   */
		cascade_to_hidden: true
	};
	$.jstree.plugins.checkbox = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);
			this._data.checkbox.uto = false;
			this._data.checkbox.selected = [];
			if (this.settings.checkbox.three_state) {
				this.settings.checkbox.cascade = 'up+down+undetermined';
			}
			this.element.on("init.jstree", $.proxy(function () {
				this._data.checkbox.visible = this.settings.checkbox.visible;
				if (!this.settings.checkbox.keep_selected_style) {
					this.element.addClass('jstree-checkbox-no-clicked');
				}
				if (this.settings.checkbox.tie_selection) {
					this.element.addClass('jstree-checkbox-selection');
				}
			}, this)).on("loading.jstree", $.proxy(function () {
				this[this._data.checkbox.visible ? 'show_checkboxes' : 'hide_checkboxes']();
			}, this));
			if (this.settings.checkbox.cascade.indexOf('undetermined') !== -1) {
				this.element.on('changed.jstree uncheck_node.jstree check_node.jstree uncheck_all.jstree check_all.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree', $.proxy(function () {
					// only if undetermined is in setting
					if (this._data.checkbox.uto) {
						clearTimeout(this._data.checkbox.uto);
					}
					this._data.checkbox.uto = setTimeout($.proxy(this._undetermined, this), 50);
				}, this));
			}
			if (!this.settings.checkbox.tie_selection) {
				this.element.on('model.jstree', $.proxy(function (e, data) {
					var m = this._model.data,
					    p = m[data.parent],
					    dpc = data.nodes,
					    i,
					    j;
					for (i = 0, j = dpc.length; i < j; i++) {
						m[dpc[i]].state.checked = m[dpc[i]].state.checked || m[dpc[i]].original && m[dpc[i]].original.state && m[dpc[i]].original.state.checked;
						if (m[dpc[i]].state.checked) {
							this._data.checkbox.selected.push(dpc[i]);
						}
					}
				}, this));
			}
			if (this.settings.checkbox.cascade.indexOf('up') !== -1 || this.settings.checkbox.cascade.indexOf('down') !== -1) {
				this.element.on('model.jstree', $.proxy(function (e, data) {
					var m = this._model.data,
					    p = m[data.parent],
					    dpc = data.nodes,
					    chd = [],
					    c,
					    i,
					    j,
					    k,
					    l,
					    tmp,
					    s = this.settings.checkbox.cascade,
					    t = this.settings.checkbox.tie_selection;

					if (s.indexOf('down') !== -1) {
						// apply down
						if (p.state[t ? 'selected' : 'checked']) {
							for (i = 0, j = dpc.length; i < j; i++) {
								m[dpc[i]].state[t ? 'selected' : 'checked'] = true;
							}

							this._data[t ? 'core' : 'checkbox'].selected = this._data[t ? 'core' : 'checkbox'].selected.concat(dpc);
						} else {
							for (i = 0, j = dpc.length; i < j; i++) {
								if (m[dpc[i]].state[t ? 'selected' : 'checked']) {
									for (k = 0, l = m[dpc[i]].children_d.length; k < l; k++) {
										m[m[dpc[i]].children_d[k]].state[t ? 'selected' : 'checked'] = true;
									}
									this._data[t ? 'core' : 'checkbox'].selected = this._data[t ? 'core' : 'checkbox'].selected.concat(m[dpc[i]].children_d);
								}
							}
						}
					}

					if (s.indexOf('up') !== -1) {
						// apply up
						for (i = 0, j = p.children_d.length; i < j; i++) {
							if (!m[p.children_d[i]].children.length) {
								chd.push(m[p.children_d[i]].parent);
							}
						}
						chd = $.vakata.array_unique(chd);
						for (k = 0, l = chd.length; k < l; k++) {
							p = m[chd[k]];
							while (p && p.id !== $.jstree.root) {
								c = 0;
								for (i = 0, j = p.children.length; i < j; i++) {
									c += m[p.children[i]].state[t ? 'selected' : 'checked'];
								}
								if (c === j) {
									p.state[t ? 'selected' : 'checked'] = true;
									this._data[t ? 'core' : 'checkbox'].selected.push(p.id);
									tmp = this.get_node(p, true);
									if (tmp && tmp.length) {
										tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
									}
								} else {
									break;
								}
								p = this.get_node(p.parent);
							}
						}
					}

					this._data[t ? 'core' : 'checkbox'].selected = $.vakata.array_unique(this._data[t ? 'core' : 'checkbox'].selected);
				}, this)).on(this.settings.checkbox.tie_selection ? 'select_node.jstree' : 'check_node.jstree', $.proxy(function (e, data) {
					var self = this,
					    obj = data.node,
					    m = this._model.data,
					    par = this.get_node(obj.parent),
					    i,
					    j,
					    c,
					    tmp,
					    s = this.settings.checkbox.cascade,
					    t = this.settings.checkbox.tie_selection,
					    sel = {},
					    cur = this._data[t ? 'core' : 'checkbox'].selected;

					for (i = 0, j = cur.length; i < j; i++) {
						sel[cur[i]] = true;
					}

					// apply down
					if (s.indexOf('down') !== -1) {
						//this._data[ t ? 'core' : 'checkbox' ].selected = $.vakata.array_unique(this._data[ t ? 'core' : 'checkbox' ].selected.concat(obj.children_d));
						var selectedIds = this._cascade_new_checked_state(obj.id, true);
						obj.children_d.concat(obj.id).forEach(function (id) {
							if (selectedIds.indexOf(id) > -1) {
								sel[id] = true;
							} else {
								delete sel[id];
							}
						});
					}

					// apply up
					if (s.indexOf('up') !== -1) {
						while (par && par.id !== $.jstree.root) {
							c = 0;
							for (i = 0, j = par.children.length; i < j; i++) {
								c += m[par.children[i]].state[t ? 'selected' : 'checked'];
							}
							if (c === j) {
								par.state[t ? 'selected' : 'checked'] = true;
								sel[par.id] = true;
								//this._data[ t ? 'core' : 'checkbox' ].selected.push(par.id);
								tmp = this.get_node(par, true);
								if (tmp && tmp.length) {
									tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
								}
							} else {
								break;
							}
							par = this.get_node(par.parent);
						}
					}

					cur = [];
					for (i in sel) {
						if (sel.hasOwnProperty(i)) {
							cur.push(i);
						}
					}
					this._data[t ? 'core' : 'checkbox'].selected = cur;
				}, this)).on(this.settings.checkbox.tie_selection ? 'deselect_all.jstree' : 'uncheck_all.jstree', $.proxy(function (e, data) {
					var obj = this.get_node($.jstree.root),
					    m = this._model.data,
					    i,
					    j,
					    tmp;
					for (i = 0, j = obj.children_d.length; i < j; i++) {
						tmp = m[obj.children_d[i]];
						if (tmp && tmp.original && tmp.original.state && tmp.original.state.undetermined) {
							tmp.original.state.undetermined = false;
						}
					}
				}, this)).on(this.settings.checkbox.tie_selection ? 'deselect_node.jstree' : 'uncheck_node.jstree', $.proxy(function (e, data) {
					var self = this,
					    obj = data.node,
					    dom = this.get_node(obj, true),
					    i,
					    j,
					    tmp,
					    s = this.settings.checkbox.cascade,
					    t = this.settings.checkbox.tie_selection,
					    cur = this._data[t ? 'core' : 'checkbox'].selected,
					    sel = {},
					    stillSelectedIds = [],
					    allIds = obj.children_d.concat(obj.id);

					// apply down
					if (s.indexOf('down') !== -1) {
						var selectedIds = this._cascade_new_checked_state(obj.id, false);

						cur = cur.filter(function (id) {
							return allIds.indexOf(id) === -1 || selectedIds.indexOf(id) > -1;
						});
					}

					// only apply up if cascade up is enabled and if this node is not selected
					// (if all child nodes are disabled and cascade_to_disabled === false then this node will till be selected).
					if (s.indexOf('up') !== -1 && cur.indexOf(obj.id) === -1) {
						for (i = 0, j = obj.parents.length; i < j; i++) {
							tmp = this._model.data[obj.parents[i]];
							tmp.state[t ? 'selected' : 'checked'] = false;
							if (tmp && tmp.original && tmp.original.state && tmp.original.state.undetermined) {
								tmp.original.state.undetermined = false;
							}
							tmp = this.get_node(obj.parents[i], true);
							if (tmp && tmp.length) {
								tmp.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
							}
						}

						cur = cur.filter(function (id) {
							return obj.parents.indexOf(id) === -1;
						});
					}

					this._data[t ? 'core' : 'checkbox'].selected = cur;
				}, this));
			}
			if (this.settings.checkbox.cascade.indexOf('up') !== -1) {
				this.element.on('delete_node.jstree', $.proxy(function (e, data) {
					// apply up (whole handler)
					var p = this.get_node(data.parent),
					    m = this._model.data,
					    i,
					    j,
					    c,
					    tmp,
					    t = this.settings.checkbox.tie_selection;
					while (p && p.id !== $.jstree.root && !p.state[t ? 'selected' : 'checked']) {
						c = 0;
						for (i = 0, j = p.children.length; i < j; i++) {
							c += m[p.children[i]].state[t ? 'selected' : 'checked'];
						}
						if (j > 0 && c === j) {
							p.state[t ? 'selected' : 'checked'] = true;
							this._data[t ? 'core' : 'checkbox'].selected.push(p.id);
							tmp = this.get_node(p, true);
							if (tmp && tmp.length) {
								tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
							}
						} else {
							break;
						}
						p = this.get_node(p.parent);
					}
				}, this)).on('move_node.jstree', $.proxy(function (e, data) {
					// apply up (whole handler)
					var is_multi = data.is_multi,
					    old_par = data.old_parent,
					    new_par = this.get_node(data.parent),
					    m = this._model.data,
					    p,
					    c,
					    i,
					    j,
					    tmp,
					    t = this.settings.checkbox.tie_selection;
					if (!is_multi) {
						p = this.get_node(old_par);
						while (p && p.id !== $.jstree.root && !p.state[t ? 'selected' : 'checked']) {
							c = 0;
							for (i = 0, j = p.children.length; i < j; i++) {
								c += m[p.children[i]].state[t ? 'selected' : 'checked'];
							}
							if (j > 0 && c === j) {
								p.state[t ? 'selected' : 'checked'] = true;
								this._data[t ? 'core' : 'checkbox'].selected.push(p.id);
								tmp = this.get_node(p, true);
								if (tmp && tmp.length) {
									tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
								}
							} else {
								break;
							}
							p = this.get_node(p.parent);
						}
					}
					p = new_par;
					while (p && p.id !== $.jstree.root) {
						c = 0;
						for (i = 0, j = p.children.length; i < j; i++) {
							c += m[p.children[i]].state[t ? 'selected' : 'checked'];
						}
						if (c === j) {
							if (!p.state[t ? 'selected' : 'checked']) {
								p.state[t ? 'selected' : 'checked'] = true;
								this._data[t ? 'core' : 'checkbox'].selected.push(p.id);
								tmp = this.get_node(p, true);
								if (tmp && tmp.length) {
									tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
								}
							}
						} else {
							if (p.state[t ? 'selected' : 'checked']) {
								p.state[t ? 'selected' : 'checked'] = false;
								this._data[t ? 'core' : 'checkbox'].selected = $.vakata.array_remove_item(this._data[t ? 'core' : 'checkbox'].selected, p.id);
								tmp = this.get_node(p, true);
								if (tmp && tmp.length) {
									tmp.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
								}
							} else {
								break;
							}
						}
						p = this.get_node(p.parent);
					}
				}, this));
			}
		};

		/**
   * set the undetermined state where and if necessary. Used internally.
   * @private
   * @name _undetermined()
   * @plugin checkbox
   */
		this._undetermined = function () {
			if (this.element === null) {
				return;
			}
			var i,
			    j,
			    k,
			    l,
			    o = {},
			    m = this._model.data,
			    t = this.settings.checkbox.tie_selection,
			    s = this._data[t ? 'core' : 'checkbox'].selected,
			    p = [],
			    tt = this;
			for (i = 0, j = s.length; i < j; i++) {
				if (m[s[i]] && m[s[i]].parents) {
					for (k = 0, l = m[s[i]].parents.length; k < l; k++) {
						if (o[m[s[i]].parents[k]] !== undefined) {
							break;
						}
						if (m[s[i]].parents[k] !== $.jstree.root) {
							o[m[s[i]].parents[k]] = true;
							p.push(m[s[i]].parents[k]);
						}
					}
				}
			}
			// attempt for server side undetermined state
			this.element.find('.jstree-closed').not(':has(.jstree-children)').each(function () {
				var tmp = tt.get_node(this),
				    tmp2;

				if (!tmp) {
					return;
				}

				if (!tmp.state.loaded) {
					if (tmp.original && tmp.original.state && tmp.original.state.undetermined && tmp.original.state.undetermined === true) {
						if (o[tmp.id] === undefined && tmp.id !== $.jstree.root) {
							o[tmp.id] = true;
							p.push(tmp.id);
						}
						for (k = 0, l = tmp.parents.length; k < l; k++) {
							if (o[tmp.parents[k]] === undefined && tmp.parents[k] !== $.jstree.root) {
								o[tmp.parents[k]] = true;
								p.push(tmp.parents[k]);
							}
						}
					}
				} else {
					for (i = 0, j = tmp.children_d.length; i < j; i++) {
						tmp2 = m[tmp.children_d[i]];
						if (!tmp2.state.loaded && tmp2.original && tmp2.original.state && tmp2.original.state.undetermined && tmp2.original.state.undetermined === true) {
							if (o[tmp2.id] === undefined && tmp2.id !== $.jstree.root) {
								o[tmp2.id] = true;
								p.push(tmp2.id);
							}
							for (k = 0, l = tmp2.parents.length; k < l; k++) {
								if (o[tmp2.parents[k]] === undefined && tmp2.parents[k] !== $.jstree.root) {
									o[tmp2.parents[k]] = true;
									p.push(tmp2.parents[k]);
								}
							}
						}
					}
				}
			});

			this.element.find('.jstree-undetermined').removeClass('jstree-undetermined');
			for (i = 0, j = p.length; i < j; i++) {
				if (!m[p[i]].state[t ? 'selected' : 'checked']) {
					s = this.get_node(p[i], true);
					if (s && s.length) {
						s.children('.jstree-anchor').children('.jstree-checkbox').addClass('jstree-undetermined');
					}
				}
			}
		};
		this.redraw_node = function (obj, deep, is_callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if (obj) {
				var i,
				    j,
				    tmp = null,
				    icon = null;
				for (i = 0, j = obj.childNodes.length; i < j; i++) {
					if (obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
						tmp = obj.childNodes[i];
						break;
					}
				}
				if (tmp) {
					if (!this.settings.checkbox.tie_selection && this._model.data[obj.id].state.checked) {
						tmp.className += ' jstree-checked';
					}
					icon = _i.cloneNode(false);
					if (this._model.data[obj.id].state.checkbox_disabled) {
						icon.className += ' jstree-checkbox-disabled';
					}
					tmp.insertBefore(icon, tmp.childNodes[0]);
				}
			}
			if (!is_callback && this.settings.checkbox.cascade.indexOf('undetermined') !== -1) {
				if (this._data.checkbox.uto) {
					clearTimeout(this._data.checkbox.uto);
				}
				this._data.checkbox.uto = setTimeout($.proxy(this._undetermined, this), 50);
			}
			return obj;
		};
		/**
   * show the node checkbox icons
   * @name show_checkboxes()
   * @plugin checkbox
   */
		this.show_checkboxes = function () {
			this._data.core.themes.checkboxes = true;this.get_container_ul().removeClass("jstree-no-checkboxes");
		};
		/**
   * hide the node checkbox icons
   * @name hide_checkboxes()
   * @plugin checkbox
   */
		this.hide_checkboxes = function () {
			this._data.core.themes.checkboxes = false;this.get_container_ul().addClass("jstree-no-checkboxes");
		};
		/**
   * toggle the node icons
   * @name toggle_checkboxes()
   * @plugin checkbox
   */
		this.toggle_checkboxes = function () {
			if (this._data.core.themes.checkboxes) {
				this.hide_checkboxes();
			} else {
				this.show_checkboxes();
			}
		};
		/**
   * checks if a node is in an undetermined state
   * @name is_undetermined(obj)
   * @param  {mixed} obj
   * @return {Boolean}
   */
		this.is_undetermined = function (obj) {
			obj = this.get_node(obj);
			var s = this.settings.checkbox.cascade,
			    i,
			    j,
			    t = this.settings.checkbox.tie_selection,
			    d = this._data[t ? 'core' : 'checkbox'].selected,
			    m = this._model.data;
			if (!obj || obj.state[t ? 'selected' : 'checked'] === true || s.indexOf('undetermined') === -1 || s.indexOf('down') === -1 && s.indexOf('up') === -1) {
				return false;
			}
			if (!obj.state.loaded && obj.original.state.undetermined === true) {
				return true;
			}
			for (i = 0, j = obj.children_d.length; i < j; i++) {
				if ($.inArray(obj.children_d[i], d) !== -1 || !m[obj.children_d[i]].state.loaded && m[obj.children_d[i]].original.state.undetermined) {
					return true;
				}
			}
			return false;
		};
		/**
   * disable a node's checkbox
   * @name disable_checkbox(obj)
   * @param {mixed} obj an array can be used too
   * @trigger disable_checkbox.jstree
   * @plugin checkbox
   */
		this.disable_checkbox = function (obj) {
			var t1, t2, dom;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.disable_checkbox(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if (!obj.state.checkbox_disabled) {
				obj.state.checkbox_disabled = true;
				if (dom && dom.length) {
					dom.children('.jstree-anchor').children('.jstree-checkbox').addClass('jstree-checkbox-disabled');
				}
				/**
     * triggered when an node's checkbox is disabled
     * @event
     * @name disable_checkbox.jstree
     * @param {Object} node
     * @plugin checkbox
     */
				this.trigger('disable_checkbox', { 'node': obj });
			}
		};
		/**
   * enable a node's checkbox
   * @name disable_checkbox(obj)
   * @param {mixed} obj an array can be used too
   * @trigger enable_checkbox.jstree
   * @plugin checkbox
   */
		this.enable_checkbox = function (obj) {
			var t1, t2, dom;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.enable_checkbox(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if (obj.state.checkbox_disabled) {
				obj.state.checkbox_disabled = false;
				if (dom && dom.length) {
					dom.children('.jstree-anchor').children('.jstree-checkbox').removeClass('jstree-checkbox-disabled');
				}
				/**
     * triggered when an node's checkbox is enabled
     * @event
     * @name enable_checkbox.jstree
     * @param {Object} node
     * @plugin checkbox
     */
				this.trigger('enable_checkbox', { 'node': obj });
			}
		};

		this.activate_node = function (obj, e) {
			if ($(e.target).hasClass('jstree-checkbox-disabled')) {
				return false;
			}
			if (this.settings.checkbox.tie_selection && (this.settings.checkbox.whole_node || $(e.target).hasClass('jstree-checkbox'))) {
				e.ctrlKey = true;
			}
			if (this.settings.checkbox.tie_selection || !this.settings.checkbox.whole_node && !$(e.target).hasClass('jstree-checkbox')) {
				return parent.activate_node.call(this, obj, e);
			}
			if (this.is_disabled(obj)) {
				return false;
			}
			if (this.is_checked(obj)) {
				this.uncheck_node(obj, e);
			} else {
				this.check_node(obj, e);
			}
			this.trigger('activate_node', { 'node': this.get_node(obj) });
		};

		/**
   * Unchecks a node and all its descendants. This function does NOT affect hidden and disabled nodes (or their descendants).
   * However if these unaffected nodes are already selected their ids will be included in the returned array.
   * @param id
   * @param checkedState
   * @returns {Array} Array of all node id's (in this tree branch) that are checked.
   */
		this._cascade_new_checked_state = function (id, checkedState) {
			var self = this;
			var t = this.settings.checkbox.tie_selection;
			var node = this._model.data[id];
			var selectedNodeIds = [];
			var selectedChildrenIds = [];

			if ((this.settings.checkbox.cascade_to_disabled || !node.state.disabled) && (this.settings.checkbox.cascade_to_hidden || !node.state.hidden)) {
				//First try and check/uncheck the children
				if (node.children) {
					node.children.forEach(function (childId) {
						var selectedChildIds = self._cascade_new_checked_state(childId, checkedState);
						selectedNodeIds = selectedNodeIds.concat(selectedChildIds);
						if (selectedChildIds.indexOf(childId) > -1) {
							selectedChildrenIds.push(childId);
						}
					});
				}

				var dom = self.get_node(node, true);

				//A node's state is undetermined if some but not all of it's children are checked/selected .
				var undetermined = selectedChildrenIds.length > 0 && selectedChildrenIds.length < node.children.length;

				if (node.original && node.original.state && node.original.state.undetermined) {
					node.original.state.undetermined = undetermined;
				}

				//If a node is undetermined then remove selected class
				if (undetermined) {
					node.state[t ? 'selected' : 'checked'] = false;
					dom.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
				}
				//Otherwise, if the checkedState === true (i.e. the node is being checked now) and all of the node's children are checked (if it has any children),
				//check the node and style it correctly.
				else if (checkedState && selectedChildrenIds.length === node.children.length) {
						node.state[t ? 'selected' : 'checked'] = checkedState;
						selectedNodeIds.push(node.id);

						dom.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
					} else {
						node.state[t ? 'selected' : 'checked'] = false;
						dom.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
					}
			} else {
				var selectedChildIds = this.get_checked_descendants(id);

				if (node.state[t ? 'selected' : 'checked']) {
					selectedChildIds.push(node.id);
				}

				selectedNodeIds = selectedNodeIds.concat(selectedChildIds);
			}

			return selectedNodeIds;
		};

		/**
   * Gets ids of nodes selected in branch (of tree) specified by id (does not include the node specified by id)
   * @param id
   */
		this.get_checked_descendants = function (id) {
			var self = this;
			var t = self.settings.checkbox.tie_selection;
			var node = self._model.data[id];

			return node.children_d.filter(function (_id) {
				return self._model.data[_id].state[t ? 'selected' : 'checked'];
			});
		};

		/**
   * check a node (only if tie_selection in checkbox settings is false, otherwise select_node will be called internally)
   * @name check_node(obj)
   * @param {mixed} obj an array can be used to check multiple nodes
   * @trigger check_node.jstree
   * @plugin checkbox
   */
		this.check_node = function (obj, e) {
			if (this.settings.checkbox.tie_selection) {
				return this.select_node(obj, false, true, e);
			}
			var dom, t1, t2, th;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.check_node(obj[t1], e);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if (!obj.state.checked) {
				obj.state.checked = true;
				this._data.checkbox.selected.push(obj.id);
				if (dom && dom.length) {
					dom.children('.jstree-anchor').addClass('jstree-checked');
				}
				/**
     * triggered when an node is checked (only if tie_selection in checkbox settings is false)
     * @event
     * @name check_node.jstree
     * @param {Object} node
     * @param {Array} selected the current selection
     * @param {Object} event the event (if any) that triggered this check_node
     * @plugin checkbox
     */
				this.trigger('check_node', { 'node': obj, 'selected': this._data.checkbox.selected, 'event': e });
			}
		};
		/**
   * uncheck a node (only if tie_selection in checkbox settings is false, otherwise deselect_node will be called internally)
   * @name uncheck_node(obj)
   * @param {mixed} obj an array can be used to uncheck multiple nodes
   * @trigger uncheck_node.jstree
   * @plugin checkbox
   */
		this.uncheck_node = function (obj, e) {
			if (this.settings.checkbox.tie_selection) {
				return this.deselect_node(obj, false, e);
			}
			var t1, t2, dom;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.uncheck_node(obj[t1], e);
				}
				return true;
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if (obj.state.checked) {
				obj.state.checked = false;
				this._data.checkbox.selected = $.vakata.array_remove_item(this._data.checkbox.selected, obj.id);
				if (dom.length) {
					dom.children('.jstree-anchor').removeClass('jstree-checked');
				}
				/**
     * triggered when an node is unchecked (only if tie_selection in checkbox settings is false)
     * @event
     * @name uncheck_node.jstree
     * @param {Object} node
     * @param {Array} selected the current selection
     * @param {Object} event the event (if any) that triggered this uncheck_node
     * @plugin checkbox
     */
				this.trigger('uncheck_node', { 'node': obj, 'selected': this._data.checkbox.selected, 'event': e });
			}
		};

		/**
   * checks all nodes in the tree (only if tie_selection in checkbox settings is false, otherwise select_all will be called internally)
   * @name check_all()
   * @trigger check_all.jstree, changed.jstree
   * @plugin checkbox
   */
		this.check_all = function () {
			if (this.settings.checkbox.tie_selection) {
				return this.select_all();
			}
			var tmp = this._data.checkbox.selected.concat([]),
			    i,
			    j;
			this._data.checkbox.selected = this._model.data[$.jstree.root].children_d.concat();
			for (i = 0, j = this._data.checkbox.selected.length; i < j; i++) {
				if (this._model.data[this._data.checkbox.selected[i]]) {
					this._model.data[this._data.checkbox.selected[i]].state.checked = true;
				}
			}
			this.redraw(true);
			/**
    * triggered when all nodes are checked (only if tie_selection in checkbox settings is false)
    * @event
    * @name check_all.jstree
    * @param {Array} selected the current selection
    * @plugin checkbox
    */
			this.trigger('check_all', { 'selected': this._data.checkbox.selected });
		};
		/**
   * uncheck all checked nodes (only if tie_selection in checkbox settings is false, otherwise deselect_all will be called internally)
   * @name uncheck_all()
   * @trigger uncheck_all.jstree
   * @plugin checkbox
   */
		this.uncheck_all = function () {
			if (this.settings.checkbox.tie_selection) {
				return this.deselect_all();
			}
			var tmp = this._data.checkbox.selected.concat([]),
			    i,
			    j;
			for (i = 0, j = this._data.checkbox.selected.length; i < j; i++) {
				if (this._model.data[this._data.checkbox.selected[i]]) {
					this._model.data[this._data.checkbox.selected[i]].state.checked = false;
				}
			}
			this._data.checkbox.selected = [];
			this.element.find('.jstree-checked').removeClass('jstree-checked');
			/**
    * triggered when all nodes are unchecked (only if tie_selection in checkbox settings is false)
    * @event
    * @name uncheck_all.jstree
    * @param {Object} node the previous selection
    * @param {Array} selected the current selection
    * @plugin checkbox
    */
			this.trigger('uncheck_all', { 'selected': this._data.checkbox.selected, 'node': tmp });
		};
		/**
   * checks if a node is checked (if tie_selection is on in the settings this function will return the same as is_selected)
   * @name is_checked(obj)
   * @param  {mixed}  obj
   * @return {Boolean}
   * @plugin checkbox
   */
		this.is_checked = function (obj) {
			if (this.settings.checkbox.tie_selection) {
				return this.is_selected(obj);
			}
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			return obj.state.checked;
		};
		/**
   * get an array of all checked nodes (if tie_selection is on in the settings this function will return the same as get_selected)
   * @name get_checked([full])
   * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
   * @return {Array}
   * @plugin checkbox
   */
		this.get_checked = function (full) {
			if (this.settings.checkbox.tie_selection) {
				return this.get_selected(full);
			}
			return full ? $.map(this._data.checkbox.selected, $.proxy(function (i) {
				return this.get_node(i);
			}, this)) : this._data.checkbox.selected;
		};
		/**
   * get an array of all top level checked nodes (ignoring children of checked nodes) (if tie_selection is on in the settings this function will return the same as get_top_selected)
   * @name get_top_checked([full])
   * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
   * @return {Array}
   * @plugin checkbox
   */
		this.get_top_checked = function (full) {
			if (this.settings.checkbox.tie_selection) {
				return this.get_top_selected(full);
			}
			var tmp = this.get_checked(true),
			    obj = {},
			    i,
			    j,
			    k,
			    l;
			for (i = 0, j = tmp.length; i < j; i++) {
				obj[tmp[i].id] = tmp[i];
			}
			for (i = 0, j = tmp.length; i < j; i++) {
				for (k = 0, l = tmp[i].children_d.length; k < l; k++) {
					if (obj[tmp[i].children_d[k]]) {
						delete obj[tmp[i].children_d[k]];
					}
				}
			}
			tmp = [];
			for (i in obj) {
				if (obj.hasOwnProperty(i)) {
					tmp.push(i);
				}
			}
			return full ? $.map(tmp, $.proxy(function (i) {
				return this.get_node(i);
			}, this)) : tmp;
		};
		/**
   * get an array of all bottom level checked nodes (ignoring selected parents) (if tie_selection is on in the settings this function will return the same as get_bottom_selected)
   * @name get_bottom_checked([full])
   * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
   * @return {Array}
   * @plugin checkbox
   */
		this.get_bottom_checked = function (full) {
			if (this.settings.checkbox.tie_selection) {
				return this.get_bottom_selected(full);
			}
			var tmp = this.get_checked(true),
			    obj = [],
			    i,
			    j;
			for (i = 0, j = tmp.length; i < j; i++) {
				if (!tmp[i].children.length) {
					obj.push(tmp[i].id);
				}
			}
			return full ? $.map(obj, $.proxy(function (i) {
				return this.get_node(i);
			}, this)) : obj;
		};
		this.load_node = function (obj, callback) {
			var k, l, i, j, c, tmp;
			if (!$.isArray(obj) && !this.settings.checkbox.tie_selection) {
				tmp = this.get_node(obj);
				if (tmp && tmp.state.loaded) {
					for (k = 0, l = tmp.children_d.length; k < l; k++) {
						if (this._model.data[tmp.children_d[k]].state.checked) {
							c = true;
							this._data.checkbox.selected = $.vakata.array_remove_item(this._data.checkbox.selected, tmp.children_d[k]);
						}
					}
				}
			}
			return parent.load_node.apply(this, arguments);
		};
		this.get_state = function () {
			var state = parent.get_state.apply(this, arguments);
			if (this.settings.checkbox.tie_selection) {
				return state;
			}
			state.checkbox = this._data.checkbox.selected.slice();
			return state;
		};
		this.set_state = function (state, callback) {
			var res = parent.set_state.apply(this, arguments);
			if (res && state.checkbox) {
				if (!this.settings.checkbox.tie_selection) {
					this.uncheck_all();
					var _this = this;
					$.each(state.checkbox, function (i, v) {
						_this.check_node(v);
					});
				}
				delete state.checkbox;
				this.set_state(state, callback);
				return false;
			}
			return res;
		};
		this.refresh = function (skip_loading, forget_state) {
			if (!this.settings.checkbox.tie_selection) {
				this._data.checkbox.selected = [];
			}
			return parent.refresh.apply(this, arguments);
		};
	};

	// include the checkbox plugin by default
	// $.jstree.defaults.plugins.push("checkbox");


	/**
  * ### Conditionalselect plugin
  *
  * This plugin allows defining a callback to allow or deny node selection by user input (activate node method).
  */

	/**
  * a callback (function) which is invoked in the instance's scope and receives two arguments - the node and the event that triggered the `activate_node` call. Returning false prevents working with the node, returning true allows invoking activate_node. Defaults to returning `true`.
  * @name $.jstree.defaults.checkbox.visible
  * @plugin checkbox
  */
	$.jstree.defaults.conditionalselect = function () {
		return true;
	};
	$.jstree.plugins.conditionalselect = function (options, parent) {
		// own function
		this.activate_node = function (obj, e) {
			if (this.settings.conditionalselect.call(this, this.get_node(obj), e)) {
				parent.activate_node.call(this, obj, e);
			}
		};
	};

	/**
  * ### Contextmenu plugin
  *
  * Shows a context menu when a node is right-clicked.
  */

	/**
  * stores all defaults for the contextmenu plugin
  * @name $.jstree.defaults.contextmenu
  * @plugin contextmenu
  */
	$.jstree.defaults.contextmenu = {
		/**
   * a boolean indicating if the node should be selected when the context menu is invoked on it. Defaults to `true`.
   * @name $.jstree.defaults.contextmenu.select_node
   * @plugin contextmenu
   */
		select_node: true,
		/**
   * a boolean indicating if the menu should be shown aligned with the node. Defaults to `true`, otherwise the mouse coordinates are used.
   * @name $.jstree.defaults.contextmenu.show_at_node
   * @plugin contextmenu
   */
		show_at_node: true,
		/**
   * an object of actions, or a function that accepts a node and a callback function and calls the callback function with an object of actions available for that node (you can also return the items too).
   *
   * Each action consists of a key (a unique name) and a value which is an object with the following properties (only label and action are required). Once a menu item is activated the `action` function will be invoked with an object containing the following keys: item - the contextmenu item definition as seen below, reference - the DOM node that was used (the tree node), element - the contextmenu DOM element, position - an object with x/y properties indicating the position of the menu.
   *
   * * `separator_before` - a boolean indicating if there should be a separator before this item
   * * `separator_after` - a boolean indicating if there should be a separator after this item
   * * `_disabled` - a boolean indicating if this action should be disabled
   * * `label` - a string - the name of the action (could be a function returning a string)
   * * `title` - a string - an optional tooltip for the item
   * * `action` - a function to be executed if this item is chosen, the function will receive 
   * * `icon` - a string, can be a path to an icon or a className, if using an image that is in the current directory use a `./` prefix, otherwise it will be detected as a class
   * * `shortcut` - keyCode which will trigger the action if the menu is open (for example `113` for rename, which equals F2)
   * * `shortcut_label` - shortcut label (like for example `F2` for rename)
   * * `submenu` - an object with the same structure as $.jstree.defaults.contextmenu.items which can be used to create a submenu - each key will be rendered as a separate option in a submenu that will appear once the current item is hovered
   *
   * @name $.jstree.defaults.contextmenu.items
   * @plugin contextmenu
   */
		items: function items(o, cb) {
			// Could be an object directly
			return {
				"create": {
					"separator_before": false,
					"separator_after": true,
					"_disabled": false, //(this.check("create_node", data.reference, {}, "last")),
					"label": "Create",
					"action": function action(data) {
						var inst = $.jstree.reference(data.reference),
						    obj = inst.get_node(data.reference);
						inst.create_node(obj, {}, "last", function (new_node) {
							try {
								inst.edit(new_node);
							} catch (ex) {
								setTimeout(function () {
									inst.edit(new_node);
								}, 0);
							}
						});
					}
				},
				"rename": {
					"separator_before": false,
					"separator_after": false,
					"_disabled": false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
					"label": "Rename",
					/*!
     "shortcut"			: 113,
     "shortcut_label"	: 'F2',
     "icon"				: "glyphicon glyphicon-leaf",
     */
					"action": function action(data) {
						var inst = $.jstree.reference(data.reference),
						    obj = inst.get_node(data.reference);
						inst.edit(obj);
					}
				},
				"remove": {
					"separator_before": false,
					"icon": false,
					"separator_after": false,
					"_disabled": false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
					"label": "Delete",
					"action": function action(data) {
						var inst = $.jstree.reference(data.reference),
						    obj = inst.get_node(data.reference);
						if (inst.is_selected(obj)) {
							inst.delete_node(inst.get_selected());
						} else {
							inst.delete_node(obj);
						}
					}
				},
				"ccp": {
					"separator_before": true,
					"icon": false,
					"separator_after": false,
					"label": "Edit",
					"action": false,
					"submenu": {
						"cut": {
							"separator_before": false,
							"separator_after": false,
							"label": "Cut",
							"action": function action(data) {
								var inst = $.jstree.reference(data.reference),
								    obj = inst.get_node(data.reference);
								if (inst.is_selected(obj)) {
									inst.cut(inst.get_top_selected());
								} else {
									inst.cut(obj);
								}
							}
						},
						"copy": {
							"separator_before": false,
							"icon": false,
							"separator_after": false,
							"label": "Copy",
							"action": function action(data) {
								var inst = $.jstree.reference(data.reference),
								    obj = inst.get_node(data.reference);
								if (inst.is_selected(obj)) {
									inst.copy(inst.get_top_selected());
								} else {
									inst.copy(obj);
								}
							}
						},
						"paste": {
							"separator_before": false,
							"icon": false,
							"_disabled": function _disabled(data) {
								return !$.jstree.reference(data.reference).can_paste();
							},
							"separator_after": false,
							"label": "Paste",
							"action": function action(data) {
								var inst = $.jstree.reference(data.reference),
								    obj = inst.get_node(data.reference);
								inst.paste(obj);
							}
						}
					}
				}
			};
		}
	};

	$.jstree.plugins.contextmenu = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);

			var last_ts = 0,
			    cto = null,
			    ex,
			    ey;
			this.element.on("init.jstree loading.jstree ready.jstree", $.proxy(function () {
				this.get_container_ul().addClass('jstree-contextmenu');
			}, this)).on("contextmenu.jstree", ".jstree-anchor", $.proxy(function (e, data) {
				if (e.target.tagName.toLowerCase() === 'input') {
					return;
				}
				e.preventDefault();
				last_ts = e.ctrlKey ? +new Date() : 0;
				if (data || cto) {
					last_ts = +new Date() + 10000;
				}
				if (cto) {
					clearTimeout(cto);
				}
				if (!this.is_loading(e.currentTarget)) {
					this.show_contextmenu(e.currentTarget, e.pageX, e.pageY, e);
				}
			}, this)).on("click.jstree", ".jstree-anchor", $.proxy(function (e) {
				if (this._data.contextmenu.visible && (!last_ts || +new Date() - last_ts > 250)) {
					// work around safari & macOS ctrl+click
					$.vakata.context.hide();
				}
				last_ts = 0;
			}, this)).on("touchstart.jstree", ".jstree-anchor", function (e) {
				if (!e.originalEvent || !e.originalEvent.changedTouches || !e.originalEvent.changedTouches[0]) {
					return;
				}
				ex = e.originalEvent.changedTouches[0].clientX;
				ey = e.originalEvent.changedTouches[0].clientY;
				cto = setTimeout(function () {
					$(e.currentTarget).trigger('contextmenu', true);
				}, 750);
			}).on('touchmove.vakata.jstree', function (e) {
				if (cto && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0] && (Math.abs(ex - e.originalEvent.changedTouches[0].clientX) > 50 || Math.abs(ey - e.originalEvent.changedTouches[0].clientY) > 50)) {
					clearTimeout(cto);
				}
			}).on('touchend.vakata.jstree', function (e) {
				if (cto) {
					clearTimeout(cto);
				}
			});

			/*!
   if(!('oncontextmenu' in document.body) && ('ontouchstart' in document.body)) {
   	var el = null, tm = null;
   	this.element
   		.on("touchstart", ".jstree-anchor", function (e) {
   			el = e.currentTarget;
   			tm = +new Date();
   			$(document).one("touchend", function (e) {
   				e.target = document.elementFromPoint(e.originalEvent.targetTouches[0].pageX - window.pageXOffset, e.originalEvent.targetTouches[0].pageY - window.pageYOffset);
   				e.currentTarget = e.target;
   				tm = ((+(new Date())) - tm);
   				if(e.target === el && tm > 600 && tm < 1000) {
   					e.preventDefault();
   					$(el).trigger('contextmenu', e);
   				}
   				el = null;
   				tm = null;
   			});
   		});
   }
   */
			$(document).on("context_hide.vakata.jstree", $.proxy(function (e, data) {
				this._data.contextmenu.visible = false;
				$(data.reference).removeClass('jstree-context');
			}, this));
		};
		this.teardown = function () {
			if (this._data.contextmenu.visible) {
				$.vakata.context.hide();
			}
			parent.teardown.call(this);
		};

		/**
   * prepare and show the context menu for a node
   * @name show_contextmenu(obj [, x, y])
   * @param {mixed} obj the node
   * @param {Number} x the x-coordinate relative to the document to show the menu at
   * @param {Number} y the y-coordinate relative to the document to show the menu at
   * @param {Object} e the event if available that triggered the contextmenu
   * @plugin contextmenu
   * @trigger show_contextmenu.jstree
   */
		this.show_contextmenu = function (obj, x, y, e) {
			obj = this.get_node(obj);
			if (!obj || obj.id === $.jstree.root) {
				return false;
			}
			var s = this.settings.contextmenu,
			    d = this.get_node(obj, true),
			    a = d.children(".jstree-anchor"),
			    o = false,
			    i = false;
			if (s.show_at_node || x === undefined || y === undefined) {
				o = a.offset();
				x = o.left;
				y = o.top + this._data.core.li_height;
			}
			if (this.settings.contextmenu.select_node && !this.is_selected(obj)) {
				this.activate_node(obj, e);
			}

			i = s.items;
			if ($.isFunction(i)) {
				i = i.call(this, obj, $.proxy(function (i) {
					this._show_contextmenu(obj, x, y, i);
				}, this));
			}
			if ($.isPlainObject(i)) {
				this._show_contextmenu(obj, x, y, i);
			}
		};
		/**
   * show the prepared context menu for a node
   * @name _show_contextmenu(obj, x, y, i)
   * @param {mixed} obj the node
   * @param {Number} x the x-coordinate relative to the document to show the menu at
   * @param {Number} y the y-coordinate relative to the document to show the menu at
   * @param {Number} i the object of items to show
   * @plugin contextmenu
   * @trigger show_contextmenu.jstree
   * @private
   */
		this._show_contextmenu = function (obj, x, y, i) {
			var d = this.get_node(obj, true),
			    a = d.children(".jstree-anchor");
			$(document).one("context_show.vakata.jstree", $.proxy(function (e, data) {
				var cls = 'jstree-contextmenu jstree-' + this.get_theme() + '-contextmenu';
				$(data.element).addClass(cls);
				a.addClass('jstree-context');
			}, this));
			this._data.contextmenu.visible = true;
			$.vakata.context.show(a, { 'x': x, 'y': y }, i);
			/**
    * triggered when the contextmenu is shown for a node
    * @event
    * @name show_contextmenu.jstree
    * @param {Object} node the node
    * @param {Number} x the x-coordinate of the menu relative to the document
    * @param {Number} y the y-coordinate of the menu relative to the document
    * @plugin contextmenu
    */
			this.trigger('show_contextmenu', { "node": obj, "x": x, "y": y });
		};
	};

	// contextmenu helper
	(function ($) {
		var right_to_left = false,
		    vakata_context = {
			element: false,
			reference: false,
			position_x: 0,
			position_y: 0,
			items: [],
			html: "",
			is_visible: false
		};

		$.vakata.context = {
			settings: {
				hide_onmouseleave: 0,
				icons: true
			},
			_trigger: function _trigger(event_name) {
				$(document).triggerHandler("context_" + event_name + ".vakata", {
					"reference": vakata_context.reference,
					"element": vakata_context.element,
					"position": {
						"x": vakata_context.position_x,
						"y": vakata_context.position_y
					}
				});
			},
			_execute: function _execute(i) {
				i = vakata_context.items[i];
				return i && (!i._disabled || $.isFunction(i._disabled) && !i._disabled({ "item": i, "reference": vakata_context.reference, "element": vakata_context.element })) && i.action ? i.action.call(null, {
					"item": i,
					"reference": vakata_context.reference,
					"element": vakata_context.element,
					"position": {
						"x": vakata_context.position_x,
						"y": vakata_context.position_y
					}
				}) : false;
			},
			_parse: function _parse(o, is_callback) {
				if (!o) {
					return false;
				}
				if (!is_callback) {
					vakata_context.html = "";
					vakata_context.items = [];
				}
				var str = "",
				    sep = false,
				    tmp;

				if (is_callback) {
					str += "<" + "ul>";
				}
				$.each(o, function (i, val) {
					if (!val) {
						return true;
					}
					vakata_context.items.push(val);
					if (!sep && val.separator_before) {
						str += "<" + "li class='vakata-context-separator'><" + "a href='#' " + ($.vakata.context.settings.icons ? '' : 'style="margin-left:0px;"') + ">&#160;<" + "/a><" + "/li>";
					}
					sep = false;
					str += "<" + "li class='" + (val._class || "") + (val._disabled === true || $.isFunction(val._disabled) && val._disabled({ "item": val, "reference": vakata_context.reference, "element": vakata_context.element }) ? " vakata-contextmenu-disabled " : "") + "' " + (val.shortcut ? " data-shortcut='" + val.shortcut + "' " : '') + ">";
					str += "<" + "a href='#' rel='" + (vakata_context.items.length - 1) + "' " + (val.title ? "title='" + val.title + "'" : "") + ">";
					if ($.vakata.context.settings.icons) {
						str += "<" + "i ";
						if (val.icon) {
							if (val.icon.indexOf("/") !== -1 || val.icon.indexOf(".") !== -1) {
								str += " style='background:url(\"" + val.icon + "\") center center no-repeat' ";
							} else {
								str += " class='" + val.icon + "' ";
							}
						}
						str += "><" + "/i><" + "span class='vakata-contextmenu-sep'>&#160;<" + "/span>";
					}
					str += ($.isFunction(val.label) ? val.label({ "item": i, "reference": vakata_context.reference, "element": vakata_context.element }) : val.label) + (val.shortcut ? ' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-' + val.shortcut + '">' + (val.shortcut_label || '') + '</span>' : '') + "<" + "/a>";
					if (val.submenu) {
						tmp = $.vakata.context._parse(val.submenu, true);
						if (tmp) {
							str += tmp;
						}
					}
					str += "<" + "/li>";
					if (val.separator_after) {
						str += "<" + "li class='vakata-context-separator'><" + "a href='#' " + ($.vakata.context.settings.icons ? '' : 'style="margin-left:0px;"') + ">&#160;<" + "/a><" + "/li>";
						sep = true;
					}
				});
				str = str.replace(/<li class\='vakata-context-separator'\><\/li\>$/, "");
				if (is_callback) {
					str += "</ul>";
				}
				/**
     * triggered on the document when the contextmenu is parsed (HTML is built)
     * @event
     * @plugin contextmenu
     * @name context_parse.vakata
     * @param {jQuery} reference the element that was right clicked
     * @param {jQuery} element the DOM element of the menu itself
     * @param {Object} position the x & y coordinates of the menu
     */
				if (!is_callback) {
					vakata_context.html = str;$.vakata.context._trigger("parse");
				}
				return str.length > 10 ? str : false;
			},
			_show_submenu: function _show_submenu(o) {
				o = $(o);
				if (!o.length || !o.children("ul").length) {
					return;
				}
				var e = o.children("ul"),
				    xl = o.offset().left,
				    x = xl + o.outerWidth(),
				    y = o.offset().top,
				    w = e.width(),
				    h = e.height(),
				    dw = $(window).width() + $(window).scrollLeft(),
				    dh = $(window).height() + $(window).scrollTop();
				// може да се спести е една проверка - дали няма някой от класовете вече нагоре
				if (right_to_left) {
					o[x - (w + 10 + o.outerWidth()) < 0 ? "addClass" : "removeClass"]("vakata-context-left");
				} else {
					o[x + w > dw && xl > dw - x ? "addClass" : "removeClass"]("vakata-context-right");
				}
				if (y + h + 10 > dh) {
					e.css("bottom", "-1px");
				}

				//if does not fit - stick it to the side
				if (o.hasClass('vakata-context-right')) {
					if (xl < w) {
						e.css("margin-right", xl - w);
					}
				} else {
					if (dw - x < w) {
						e.css("margin-left", dw - x - w);
					}
				}

				e.show();
			},
			show: function show(reference, position, data) {
				var o,
				    e,
				    x,
				    y,
				    w,
				    h,
				    dw,
				    dh,
				    cond = true;
				if (vakata_context.element && vakata_context.element.length) {
					vakata_context.element.width('');
				}
				switch (cond) {
					case !position && !reference:
						return false;
					case !!position && !!reference:
						vakata_context.reference = reference;
						vakata_context.position_x = position.x;
						vakata_context.position_y = position.y;
						break;
					case !position && !!reference:
						vakata_context.reference = reference;
						o = reference.offset();
						vakata_context.position_x = o.left + reference.outerHeight();
						vakata_context.position_y = o.top;
						break;
					case !!position && !reference:
						vakata_context.position_x = position.x;
						vakata_context.position_y = position.y;
						break;
				}
				if (!!reference && !data && $(reference).data('vakata_contextmenu')) {
					data = $(reference).data('vakata_contextmenu');
				}
				if ($.vakata.context._parse(data)) {
					vakata_context.element.html(vakata_context.html);
				}
				if (vakata_context.items.length) {
					vakata_context.element.appendTo("body");
					e = vakata_context.element;
					x = vakata_context.position_x;
					y = vakata_context.position_y;
					w = e.width();
					h = e.height();
					dw = $(window).width() + $(window).scrollLeft();
					dh = $(window).height() + $(window).scrollTop();
					if (right_to_left) {
						x -= e.outerWidth() - $(reference).outerWidth();
						if (x < $(window).scrollLeft() + 20) {
							x = $(window).scrollLeft() + 20;
						}
					}
					if (x + w + 20 > dw) {
						x = dw - (w + 20);
					}
					if (y + h + 20 > dh) {
						y = dh - (h + 20);
					}

					vakata_context.element.css({ "left": x, "top": y }).show().find('a').first().focus().parent().addClass("vakata-context-hover");
					vakata_context.is_visible = true;
					/**
      * triggered on the document when the contextmenu is shown
      * @event
      * @plugin contextmenu
      * @name context_show.vakata
      * @param {jQuery} reference the element that was right clicked
      * @param {jQuery} element the DOM element of the menu itself
      * @param {Object} position the x & y coordinates of the menu
      */
					$.vakata.context._trigger("show");
				}
			},
			hide: function hide() {
				if (vakata_context.is_visible) {
					vakata_context.element.hide().find("ul").hide().end().find(':focus').blur().end().detach();
					vakata_context.is_visible = false;
					/**
      * triggered on the document when the contextmenu is hidden
      * @event
      * @plugin contextmenu
      * @name context_hide.vakata
      * @param {jQuery} reference the element that was right clicked
      * @param {jQuery} element the DOM element of the menu itself
      * @param {Object} position the x & y coordinates of the menu
      */
					$.vakata.context._trigger("hide");
				}
			}
		};
		$(function () {
			right_to_left = $("body").css("direction") === "rtl";
			var to = false;

			vakata_context.element = $("<ul class='vakata-context'></ul>");
			vakata_context.element.on("mouseenter", "li", function (e) {
				e.stopImmediatePropagation();

				if ($.contains(this, e.relatedTarget)) {
					// премахнато заради delegate mouseleave по-долу
					// $(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
					return;
				}

				if (to) {
					clearTimeout(to);
				}
				vakata_context.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end();

				$(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context", "li").addBack().addClass("vakata-context-hover");
				$.vakata.context._show_submenu(this);
			})
			// тестово - дали не натоварва?
			.on("mouseleave", "li", function (e) {
				if ($.contains(this, e.relatedTarget)) {
					return;
				}
				$(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover");
			}).on("mouseleave", function (e) {
				$(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
				if ($.vakata.context.settings.hide_onmouseleave) {
					to = setTimeout(function (t) {
						return function () {
							$.vakata.context.hide();
						};
					}(this), $.vakata.context.settings.hide_onmouseleave);
				}
			}).on("click", "a", function (e) {
				e.preventDefault();
				//})
				//.on("mouseup", "a", function (e) {
				if (!$(this).blur().parent().hasClass("vakata-context-disabled") && $.vakata.context._execute($(this).attr("rel")) !== false) {
					$.vakata.context.hide();
				}
			}).on('keydown', 'a', function (e) {
				var o = null;
				switch (e.which) {
					case 13:
					case 32:
						e.type = "click";
						e.preventDefault();
						$(e.currentTarget).trigger(e);
						break;
					case 37:
						if (vakata_context.is_visible) {
							vakata_context.element.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children('a').focus();
							e.stopImmediatePropagation();
							e.preventDefault();
						}
						break;
					case 38:
						if (vakata_context.is_visible) {
							o = vakata_context.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first();
							if (!o.length) {
								o = vakata_context.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last();
							}
							o.addClass("vakata-context-hover").children('a').focus();
							e.stopImmediatePropagation();
							e.preventDefault();
						}
						break;
					case 39:
						if (vakata_context.is_visible) {
							vakata_context.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children('a').focus();
							e.stopImmediatePropagation();
							e.preventDefault();
						}
						break;
					case 40:
						if (vakata_context.is_visible) {
							o = vakata_context.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first();
							if (!o.length) {
								o = vakata_context.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first();
							}
							o.addClass("vakata-context-hover").children('a').focus();
							e.stopImmediatePropagation();
							e.preventDefault();
						}
						break;
					case 27:
						$.vakata.context.hide();
						e.preventDefault();
						break;
					default:
						//console.log(e.which);
						break;
				}
			}).on('keydown', function (e) {
				e.preventDefault();
				var a = vakata_context.element.find('.vakata-contextmenu-shortcut-' + e.which).parent();
				if (a.parent().not('.vakata-context-disabled')) {
					a.click();
				}
			});

			$(document).on("mousedown.vakata.jstree", function (e) {
				if (vakata_context.is_visible && vakata_context.element[0] !== e.target && !$.contains(vakata_context.element[0], e.target)) {
					$.vakata.context.hide();
				}
			}).on("context_show.vakata.jstree", function (e, data) {
				vakata_context.element.find("li:has(ul)").children("a").addClass("vakata-context-parent");
				if (right_to_left) {
					vakata_context.element.addClass("vakata-context-rtl").css("direction", "rtl");
				}
				// also apply a RTL class?
				vakata_context.element.find("ul").hide().end();
			});
		});
	})($);
	// $.jstree.defaults.plugins.push("contextmenu");


	/**
  * ### Drag'n'drop plugin
  *
  * Enables dragging and dropping of nodes in the tree, resulting in a move or copy operations.
  */

	/**
  * stores all defaults for the drag'n'drop plugin
  * @name $.jstree.defaults.dnd
  * @plugin dnd
  */
	$.jstree.defaults.dnd = {
		/**
   * a boolean indicating if a copy should be possible while dragging (by pressint the meta key or Ctrl). Defaults to `true`.
   * @name $.jstree.defaults.dnd.copy
   * @plugin dnd
   */
		copy: true,
		/**
   * a number indicating how long a node should remain hovered while dragging to be opened. Defaults to `500`.
   * @name $.jstree.defaults.dnd.open_timeout
   * @plugin dnd
   */
		open_timeout: 500,
		/**
   * a function invoked each time a node is about to be dragged, invoked in the tree's scope and receives the nodes about to be dragged as an argument (array) and the event that started the drag - return `false` to prevent dragging
   * @name $.jstree.defaults.dnd.is_draggable
   * @plugin dnd
   */
		is_draggable: true,
		/**
   * a boolean indicating if checks should constantly be made while the user is dragging the node (as opposed to checking only on drop), default is `true`
   * @name $.jstree.defaults.dnd.check_while_dragging
   * @plugin dnd
   */
		check_while_dragging: true,
		/**
   * a boolean indicating if nodes from this tree should only be copied with dnd (as opposed to moved), default is `false`
   * @name $.jstree.defaults.dnd.always_copy
   * @plugin dnd
   */
		always_copy: false,
		/**
   * when dropping a node "inside", this setting indicates the position the node should go to - it can be an integer or a string: "first" (same as 0) or "last", default is `0`
   * @name $.jstree.defaults.dnd.inside_pos
   * @plugin dnd
   */
		inside_pos: 0,
		/**
   * when starting the drag on a node that is selected this setting controls if all selected nodes are dragged or only the single node, default is `true`, which means all selected nodes are dragged when the drag is started on a selected node
   * @name $.jstree.defaults.dnd.drag_selection
   * @plugin dnd
   */
		drag_selection: true,
		/**
   * controls whether dnd works on touch devices. If left as boolean true dnd will work the same as in desktop browsers, which in some cases may impair scrolling. If set to boolean false dnd will not work on touch devices. There is a special third option - string "selected" which means only selected nodes can be dragged on touch devices.
   * @name $.jstree.defaults.dnd.touch
   * @plugin dnd
   */
		touch: true,
		/**
   * controls whether items can be dropped anywhere on the node, not just on the anchor, by default only the node anchor is a valid drop target. Works best with the wholerow plugin. If enabled on mobile depending on the interface it might be hard for the user to cancel the drop, since the whole tree container will be a valid drop target.
   * @name $.jstree.defaults.dnd.large_drop_target
   * @plugin dnd
   */
		large_drop_target: false,
		/**
   * controls whether a drag can be initiated from any part of the node and not just the text/icon part, works best with the wholerow plugin. Keep in mind it can cause problems with tree scrolling on mobile depending on the interface - in that case set the touch option to "selected".
   * @name $.jstree.defaults.dnd.large_drag_target
   * @plugin dnd
   */
		large_drag_target: false,
		/**
   * controls whether use HTML5 dnd api instead of classical. That will allow better integration of dnd events with other HTML5 controls.
   * @reference http://caniuse.com/#feat=dragndrop
   * @name $.jstree.defaults.dnd.use_html5
   * @plugin dnd
   */
		use_html5: false
	};
	var drg, elm;
	// TODO: now check works by checking for each node individually, how about max_children, unique, etc?
	$.jstree.plugins.dnd = function (options, parent) {
		this.init = function (el, options) {
			parent.init.call(this, el, options);
			this.settings.dnd.use_html5 = this.settings.dnd.use_html5 && 'draggable' in document.createElement('span');
		};
		this.bind = function () {
			parent.bind.call(this);

			this.element.on(this.settings.dnd.use_html5 ? 'dragstart.jstree' : 'mousedown.jstree touchstart.jstree', this.settings.dnd.large_drag_target ? '.jstree-node' : '.jstree-anchor', $.proxy(function (e) {
				if (this.settings.dnd.large_drag_target && $(e.target).closest('.jstree-node')[0] !== e.currentTarget) {
					return true;
				}
				if (e.type === "touchstart" && (!this.settings.dnd.touch || this.settings.dnd.touch === 'selected' && !$(e.currentTarget).closest('.jstree-node').children('.jstree-anchor').hasClass('jstree-clicked'))) {
					return true;
				}
				var obj = this.get_node(e.target),
				    mlt = this.is_selected(obj) && this.settings.dnd.drag_selection ? this.get_top_selected().length : 1,
				    txt = mlt > 1 ? mlt + ' ' + this.get_string('nodes') : this.get_text(e.currentTarget);
				if (this.settings.core.force_text) {
					txt = $.vakata.html.escape(txt);
				}
				if (obj && obj.id && obj.id !== $.jstree.root && (e.which === 1 || e.type === "touchstart" || e.type === "dragstart") && (this.settings.dnd.is_draggable === true || $.isFunction(this.settings.dnd.is_draggable) && this.settings.dnd.is_draggable.call(this, mlt > 1 ? this.get_top_selected(true) : [obj], e))) {
					drg = { 'jstree': true, 'origin': this, 'obj': this.get_node(obj, true), 'nodes': mlt > 1 ? this.get_top_selected() : [obj.id] };
					elm = e.currentTarget;
					if (this.settings.dnd.use_html5) {
						$.vakata.dnd._trigger('start', e, { 'helper': $(), 'element': elm, 'data': drg });
					} else {
						this.element.trigger('mousedown.jstree');
						return $.vakata.dnd.start(e, drg, '<div id="jstree-dnd" class="jstree-' + this.get_theme() + ' jstree-' + this.get_theme() + '-' + this.get_theme_variant() + ' ' + (this.settings.core.themes.responsive ? ' jstree-dnd-responsive' : '') + '"><i class="jstree-icon jstree-er"></i>' + txt + '<ins class="jstree-copy" style="display:none;">+</ins></div>');
					}
				}
			}, this));
			if (this.settings.dnd.use_html5) {
				this.element.on('dragover.jstree', function (e) {
					e.preventDefault();
					$.vakata.dnd._trigger('move', e, { 'helper': $(), 'element': elm, 'data': drg });
					return false;
				})
				//.on('dragenter.jstree', this.settings.dnd.large_drop_target ? '.jstree-node' : '.jstree-anchor', $.proxy(function (e) {
				//		e.preventDefault();
				//		$.vakata.dnd._trigger('move', e, { 'helper': $(), 'element': elm, 'data': drg });
				//		return false;
				//	}, this))
				.on('drop.jstree', $.proxy(function (e) {
					e.preventDefault();
					$.vakata.dnd._trigger('stop', e, { 'helper': $(), 'element': elm, 'data': drg });
					return false;
				}, this));
			}
		};
		this.redraw_node = function (obj, deep, callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if (obj && this.settings.dnd.use_html5) {
				if (this.settings.dnd.large_drag_target) {
					obj.setAttribute('draggable', true);
				} else {
					var i,
					    j,
					    tmp = null;
					for (i = 0, j = obj.childNodes.length; i < j; i++) {
						if (obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
							tmp = obj.childNodes[i];
							break;
						}
					}
					if (tmp) {
						tmp.setAttribute('draggable', true);
					}
				}
			}
			return obj;
		};
	};

	$(function () {
		// bind only once for all instances
		var lastmv = false,
		    laster = false,
		    lastev = false,
		    opento = false,
		    marker = $('<div id="jstree-marker">&#160;</div>').hide(); //.appendTo('body');

		$(document).on('dnd_start.vakata.jstree', function (e, data) {
			lastmv = false;
			lastev = false;
			if (!data || !data.data || !data.data.jstree) {
				return;
			}
			marker.appendTo('body'); //.show();
		}).on('dnd_move.vakata.jstree', function (e, data) {
			var isDifferentNode = data.event.target !== lastev.target;
			if (opento) {
				if (!data.event || data.event.type !== 'dragover' || isDifferentNode) {
					clearTimeout(opento);
				}
			}
			if (!data || !data.data || !data.data.jstree) {
				return;
			}

			// if we are hovering the marker image do nothing (can happen on "inside" drags)
			if (data.event.target.id && data.event.target.id === 'jstree-marker') {
				return;
			}
			lastev = data.event;

			var ins = $.jstree.reference(data.event.target),
			    ref = false,
			    off = false,
			    rel = false,
			    tmp,
			    l,
			    t,
			    h,
			    p,
			    i,
			    o,
			    ok,
			    t1,
			    t2,
			    op,
			    ps,
			    pr,
			    ip,
			    tm,
			    is_copy,
			    pn;
			// if we are over an instance
			if (ins && ins._data && ins._data.dnd) {
				marker.attr('class', 'jstree-' + ins.get_theme() + (ins.settings.core.themes.responsive ? ' jstree-dnd-responsive' : ''));
				is_copy = data.data.origin && (data.data.origin.settings.dnd.always_copy || data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey));
				data.helper.children().attr('class', 'jstree-' + ins.get_theme() + ' jstree-' + ins.get_theme() + '-' + ins.get_theme_variant() + ' ' + (ins.settings.core.themes.responsive ? ' jstree-dnd-responsive' : '')).find('.jstree-copy').first()[is_copy ? 'show' : 'hide']();

				// if are hovering the container itself add a new root node
				//console.log(data.event);
				if ((data.event.target === ins.element[0] || data.event.target === ins.get_container_ul()[0]) && ins.get_container_ul().children().length === 0) {
					ok = true;
					for (t1 = 0, t2 = data.data.nodes.length; t1 < t2; t1++) {
						ok = ok && ins.check(data.data.origin && (data.data.origin.settings.dnd.always_copy || data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey)) ? "copy_node" : "move_node", data.data.origin && data.data.origin !== ins ? data.data.origin.get_node(data.data.nodes[t1]) : data.data.nodes[t1], $.jstree.root, 'last', { 'dnd': true, 'ref': ins.get_node($.jstree.root), 'pos': 'i', 'origin': data.data.origin, 'is_multi': data.data.origin && data.data.origin !== ins, 'is_foreign': !data.data.origin });
						if (!ok) {
							break;
						}
					}
					if (ok) {
						lastmv = { 'ins': ins, 'par': $.jstree.root, 'pos': 'last' };
						marker.hide();
						data.helper.find('.jstree-icon').first().removeClass('jstree-er').addClass('jstree-ok');
						if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
							data.event.originalEvent.dataTransfer.dropEffect = is_copy ? 'copy' : 'move';
						}
						return;
					}
				} else {
					// if we are hovering a tree node
					ref = ins.settings.dnd.large_drop_target ? $(data.event.target).closest('.jstree-node').children('.jstree-anchor') : $(data.event.target).closest('.jstree-anchor');
					if (ref && ref.length && ref.parent().is('.jstree-closed, .jstree-open, .jstree-leaf')) {
						off = ref.offset();
						rel = (data.event.pageY !== undefined ? data.event.pageY : data.event.originalEvent.pageY) - off.top;
						h = ref.outerHeight();
						if (rel < h / 3) {
							o = ['b', 'i', 'a'];
						} else if (rel > h - h / 3) {
							o = ['a', 'i', 'b'];
						} else {
							o = rel > h / 2 ? ['i', 'a', 'b'] : ['i', 'b', 'a'];
						}
						$.each(o, function (j, v) {
							switch (v) {
								case 'b':
									l = off.left - 6;
									t = off.top;
									p = ins.get_parent(ref);
									i = ref.parent().index();
									break;
								case 'i':
									ip = ins.settings.dnd.inside_pos;
									tm = ins.get_node(ref.parent());
									l = off.left - 2;
									t = off.top + h / 2 + 1;
									p = tm.id;
									i = ip === 'first' ? 0 : ip === 'last' ? tm.children.length : Math.min(ip, tm.children.length);
									break;
								case 'a':
									l = off.left - 6;
									t = off.top + h;
									p = ins.get_parent(ref);
									i = ref.parent().index() + 1;
									break;
							}
							ok = true;
							for (t1 = 0, t2 = data.data.nodes.length; t1 < t2; t1++) {
								op = data.data.origin && (data.data.origin.settings.dnd.always_copy || data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey)) ? "copy_node" : "move_node";
								ps = i;
								if (op === "move_node" && v === 'a' && data.data.origin && data.data.origin === ins && p === ins.get_parent(data.data.nodes[t1])) {
									pr = ins.get_node(p);
									if (ps > $.inArray(data.data.nodes[t1], pr.children)) {
										ps -= 1;
									}
								}
								ok = ok && (ins && ins.settings && ins.settings.dnd && ins.settings.dnd.check_while_dragging === false || ins.check(op, data.data.origin && data.data.origin !== ins ? data.data.origin.get_node(data.data.nodes[t1]) : data.data.nodes[t1], p, ps, { 'dnd': true, 'ref': ins.get_node(ref.parent()), 'pos': v, 'origin': data.data.origin, 'is_multi': data.data.origin && data.data.origin !== ins, 'is_foreign': !data.data.origin }));
								if (!ok) {
									if (ins && ins.last_error) {
										laster = ins.last_error();
									}
									break;
								}
							}
							if (v === 'i' && ref.parent().is('.jstree-closed') && ins.settings.dnd.open_timeout) {
								if (!data.event || data.event.type !== 'dragover' || isDifferentNode) {
									if (opento) {
										clearTimeout(opento);
									}
									opento = setTimeout(function (x, z) {
										return function () {
											x.open_node(z);
										};
									}(ins, ref), ins.settings.dnd.open_timeout);
								}
							}
							if (ok) {
								pn = ins.get_node(p, true);
								if (!pn.hasClass('.jstree-dnd-parent')) {
									$('.jstree-dnd-parent').removeClass('jstree-dnd-parent');
									pn.addClass('jstree-dnd-parent');
								}
								lastmv = { 'ins': ins, 'par': p, 'pos': v === 'i' && ip === 'last' && i === 0 && !ins.is_loaded(tm) ? 'last' : i };
								marker.css({ 'left': l + 'px', 'top': t + 'px' }).show();
								data.helper.find('.jstree-icon').first().removeClass('jstree-er').addClass('jstree-ok');
								if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
									data.event.originalEvent.dataTransfer.dropEffect = is_copy ? 'copy' : 'move';
								}
								laster = {};
								o = true;
								return false;
							}
						});
						if (o === true) {
							return;
						}
					}
				}
			}
			$('.jstree-dnd-parent').removeClass('jstree-dnd-parent');
			lastmv = false;
			data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');
			if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
				data.event.originalEvent.dataTransfer.dropEffect = 'none';
			}
			marker.hide();
		}).on('dnd_scroll.vakata.jstree', function (e, data) {
			if (!data || !data.data || !data.data.jstree) {
				return;
			}
			marker.hide();
			lastmv = false;
			lastev = false;
			data.helper.find('.jstree-icon').first().removeClass('jstree-ok').addClass('jstree-er');
		}).on('dnd_stop.vakata.jstree', function (e, data) {
			$('.jstree-dnd-parent').removeClass('jstree-dnd-parent');
			if (opento) {
				clearTimeout(opento);
			}
			if (!data || !data.data || !data.data.jstree) {
				return;
			}
			marker.hide().detach();
			var i,
			    j,
			    nodes = [];
			if (lastmv) {
				for (i = 0, j = data.data.nodes.length; i < j; i++) {
					nodes[i] = data.data.origin ? data.data.origin.get_node(data.data.nodes[i]) : data.data.nodes[i];
				}
				lastmv.ins[data.data.origin && (data.data.origin.settings.dnd.always_copy || data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey)) ? 'copy_node' : 'move_node'](nodes, lastmv.par, lastmv.pos, false, false, false, data.data.origin);
			} else {
				i = $(data.event.target).closest('.jstree');
				if (i.length && laster && laster.error && laster.error === 'check') {
					i = i.jstree(true);
					if (i) {
						i.settings.core.error.call(this, laster);
					}
				}
			}
			lastev = false;
			lastmv = false;
		}).on('keyup.jstree keydown.jstree', function (e, data) {
			data = $.vakata.dnd._get();
			if (data && data.data && data.data.jstree) {
				if (e.type === "keyup" && e.which === 27) {
					if (opento) {
						clearTimeout(opento);
					}
					lastmv = false;
					laster = false;
					lastev = false;
					opento = false;
					marker.hide().detach();
					$.vakata.dnd._clean();
				} else {
					data.helper.find('.jstree-copy').first()[data.data.origin && (data.data.origin.settings.dnd.always_copy || data.data.origin.settings.dnd.copy && (e.metaKey || e.ctrlKey)) ? 'show' : 'hide']();
					if (lastev) {
						lastev.metaKey = e.metaKey;
						lastev.ctrlKey = e.ctrlKey;
						$.vakata.dnd._trigger('move', lastev);
					}
				}
			}
		});
	});

	// helpers
	(function ($) {
		$.vakata.html = {
			div: $('<div />'),
			escape: function escape(str) {
				return $.vakata.html.div.text(str).html();
			},
			strip: function strip(str) {
				return $.vakata.html.div.empty().append($.parseHTML(str)).text();
			}
		};
		// private variable
		var vakata_dnd = {
			element: false,
			target: false,
			is_down: false,
			is_drag: false,
			helper: false,
			helper_w: 0,
			data: false,
			init_x: 0,
			init_y: 0,
			scroll_l: 0,
			scroll_t: 0,
			scroll_e: false,
			scroll_i: false,
			is_touch: false
		};
		$.vakata.dnd = {
			settings: {
				scroll_speed: 10,
				scroll_proximity: 20,
				helper_left: 5,
				helper_top: 10,
				threshold: 5,
				threshold_touch: 50
			},
			_trigger: function _trigger(event_name, e, data) {
				if (data === undefined) {
					data = $.vakata.dnd._get();
				}
				data.event = e;
				$(document).triggerHandler("dnd_" + event_name + ".vakata", data);
			},
			_get: function _get() {
				return {
					"data": vakata_dnd.data,
					"element": vakata_dnd.element,
					"helper": vakata_dnd.helper
				};
			},
			_clean: function _clean() {
				if (vakata_dnd.helper) {
					vakata_dnd.helper.remove();
				}
				if (vakata_dnd.scroll_i) {
					clearInterval(vakata_dnd.scroll_i);vakata_dnd.scroll_i = false;
				}
				vakata_dnd = {
					element: false,
					target: false,
					is_down: false,
					is_drag: false,
					helper: false,
					helper_w: 0,
					data: false,
					init_x: 0,
					init_y: 0,
					scroll_l: 0,
					scroll_t: 0,
					scroll_e: false,
					scroll_i: false,
					is_touch: false
				};
				$(document).off("mousemove.vakata.jstree touchmove.vakata.jstree", $.vakata.dnd.drag);
				$(document).off("mouseup.vakata.jstree touchend.vakata.jstree", $.vakata.dnd.stop);
			},
			_scroll: function _scroll(init_only) {
				if (!vakata_dnd.scroll_e || !vakata_dnd.scroll_l && !vakata_dnd.scroll_t) {
					if (vakata_dnd.scroll_i) {
						clearInterval(vakata_dnd.scroll_i);vakata_dnd.scroll_i = false;
					}
					return false;
				}
				if (!vakata_dnd.scroll_i) {
					vakata_dnd.scroll_i = setInterval($.vakata.dnd._scroll, 100);
					return false;
				}
				if (init_only === true) {
					return false;
				}

				var i = vakata_dnd.scroll_e.scrollTop(),
				    j = vakata_dnd.scroll_e.scrollLeft();
				vakata_dnd.scroll_e.scrollTop(i + vakata_dnd.scroll_t * $.vakata.dnd.settings.scroll_speed);
				vakata_dnd.scroll_e.scrollLeft(j + vakata_dnd.scroll_l * $.vakata.dnd.settings.scroll_speed);
				if (i !== vakata_dnd.scroll_e.scrollTop() || j !== vakata_dnd.scroll_e.scrollLeft()) {
					/**
      * triggered on the document when a drag causes an element to scroll
      * @event
      * @plugin dnd
      * @name dnd_scroll.vakata
      * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
      * @param {DOM} element the DOM element being dragged
      * @param {jQuery} helper the helper shown next to the mouse
      * @param {jQuery} event the element that is scrolling
      */
					$.vakata.dnd._trigger("scroll", vakata_dnd.scroll_e);
				}
			},
			start: function start(e, data, html) {
				if (e.type === "touchstart" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
					e.pageX = e.originalEvent.changedTouches[0].pageX;
					e.pageY = e.originalEvent.changedTouches[0].pageY;
					e.target = document.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset);
				}
				if (vakata_dnd.is_drag) {
					$.vakata.dnd.stop({});
				}
				try {
					e.currentTarget.unselectable = "on";
					e.currentTarget.onselectstart = function () {
						return false;
					};
					if (e.currentTarget.style) {
						e.currentTarget.style.touchAction = "none";
						e.currentTarget.style.msTouchAction = "none";
						e.currentTarget.style.MozUserSelect = "none";
					}
				} catch (ignore) {}
				vakata_dnd.init_x = e.pageX;
				vakata_dnd.init_y = e.pageY;
				vakata_dnd.data = data;
				vakata_dnd.is_down = true;
				vakata_dnd.element = e.currentTarget;
				vakata_dnd.target = e.target;
				vakata_dnd.is_touch = e.type === "touchstart";
				if (html !== false) {
					vakata_dnd.helper = $("<div id='vakata-dnd'></div>").html(html).css({
						"display": "block",
						"margin": "0",
						"padding": "0",
						"position": "absolute",
						"top": "-2000px",
						"lineHeight": "16px",
						"zIndex": "10000"
					});
				}
				$(document).on("mousemove.vakata.jstree touchmove.vakata.jstree", $.vakata.dnd.drag);
				$(document).on("mouseup.vakata.jstree touchend.vakata.jstree", $.vakata.dnd.stop);
				return false;
			},
			drag: function drag(e) {
				if (e.type === "touchmove" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
					e.pageX = e.originalEvent.changedTouches[0].pageX;
					e.pageY = e.originalEvent.changedTouches[0].pageY;
					e.target = document.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset);
				}
				if (!vakata_dnd.is_down) {
					return;
				}
				if (!vakata_dnd.is_drag) {
					if (Math.abs(e.pageX - vakata_dnd.init_x) > (vakata_dnd.is_touch ? $.vakata.dnd.settings.threshold_touch : $.vakata.dnd.settings.threshold) || Math.abs(e.pageY - vakata_dnd.init_y) > (vakata_dnd.is_touch ? $.vakata.dnd.settings.threshold_touch : $.vakata.dnd.settings.threshold)) {
						if (vakata_dnd.helper) {
							vakata_dnd.helper.appendTo("body");
							vakata_dnd.helper_w = vakata_dnd.helper.outerWidth();
						}
						vakata_dnd.is_drag = true;
						$(vakata_dnd.target).one('click.vakata', false);
						/**
       * triggered on the document when a drag starts
       * @event
       * @plugin dnd
       * @name dnd_start.vakata
       * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
       * @param {DOM} element the DOM element being dragged
       * @param {jQuery} helper the helper shown next to the mouse
       * @param {Object} event the event that caused the start (probably mousemove)
       */
						$.vakata.dnd._trigger("start", e);
					} else {
						return;
					}
				}

				var d = false,
				    w = false,
				    dh = false,
				    wh = false,
				    dw = false,
				    ww = false,
				    dt = false,
				    dl = false,
				    ht = false,
				    hl = false;

				vakata_dnd.scroll_t = 0;
				vakata_dnd.scroll_l = 0;
				vakata_dnd.scroll_e = false;
				$($(e.target).parentsUntil("body").addBack().get().reverse()).filter(function () {
					return (/^auto|scroll$/.test($(this).css("overflow")) && (this.scrollHeight > this.offsetHeight || this.scrollWidth > this.offsetWidth)
					);
				}).each(function () {
					var t = $(this),
					    o = t.offset();
					if (this.scrollHeight > this.offsetHeight) {
						if (o.top + t.height() - e.pageY < $.vakata.dnd.settings.scroll_proximity) {
							vakata_dnd.scroll_t = 1;
						}
						if (e.pageY - o.top < $.vakata.dnd.settings.scroll_proximity) {
							vakata_dnd.scroll_t = -1;
						}
					}
					if (this.scrollWidth > this.offsetWidth) {
						if (o.left + t.width() - e.pageX < $.vakata.dnd.settings.scroll_proximity) {
							vakata_dnd.scroll_l = 1;
						}
						if (e.pageX - o.left < $.vakata.dnd.settings.scroll_proximity) {
							vakata_dnd.scroll_l = -1;
						}
					}
					if (vakata_dnd.scroll_t || vakata_dnd.scroll_l) {
						vakata_dnd.scroll_e = $(this);
						return false;
					}
				});

				if (!vakata_dnd.scroll_e) {
					d = $(document);w = $(window);
					dh = d.height();wh = w.height();
					dw = d.width();ww = w.width();
					dt = d.scrollTop();dl = d.scrollLeft();
					if (dh > wh && e.pageY - dt < $.vakata.dnd.settings.scroll_proximity) {
						vakata_dnd.scroll_t = -1;
					}
					if (dh > wh && wh - (e.pageY - dt) < $.vakata.dnd.settings.scroll_proximity) {
						vakata_dnd.scroll_t = 1;
					}
					if (dw > ww && e.pageX - dl < $.vakata.dnd.settings.scroll_proximity) {
						vakata_dnd.scroll_l = -1;
					}
					if (dw > ww && ww - (e.pageX - dl) < $.vakata.dnd.settings.scroll_proximity) {
						vakata_dnd.scroll_l = 1;
					}
					if (vakata_dnd.scroll_t || vakata_dnd.scroll_l) {
						vakata_dnd.scroll_e = d;
					}
				}
				if (vakata_dnd.scroll_e) {
					$.vakata.dnd._scroll(true);
				}

				if (vakata_dnd.helper) {
					ht = parseInt(e.pageY + $.vakata.dnd.settings.helper_top, 10);
					hl = parseInt(e.pageX + $.vakata.dnd.settings.helper_left, 10);
					if (dh && ht + 25 > dh) {
						ht = dh - 50;
					}
					if (dw && hl + vakata_dnd.helper_w > dw) {
						hl = dw - (vakata_dnd.helper_w + 2);
					}
					vakata_dnd.helper.css({
						left: hl + "px",
						top: ht + "px"
					});
				}
				/**
     * triggered on the document when a drag is in progress
     * @event
     * @plugin dnd
     * @name dnd_move.vakata
     * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
     * @param {DOM} element the DOM element being dragged
     * @param {jQuery} helper the helper shown next to the mouse
     * @param {Object} event the event that caused this to trigger (most likely mousemove)
     */
				$.vakata.dnd._trigger("move", e);
				return false;
			},
			stop: function stop(e) {
				if (e.type === "touchend" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
					e.pageX = e.originalEvent.changedTouches[0].pageX;
					e.pageY = e.originalEvent.changedTouches[0].pageY;
					e.target = document.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset);
				}
				if (vakata_dnd.is_drag) {
					/**
      * triggered on the document when a drag stops (the dragged element is dropped)
      * @event
      * @plugin dnd
      * @name dnd_stop.vakata
      * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
      * @param {DOM} element the DOM element being dragged
      * @param {jQuery} helper the helper shown next to the mouse
      * @param {Object} event the event that caused the stop
      */
					if (e.target !== vakata_dnd.target) {
						$(vakata_dnd.target).off('click.vakata');
					}
					$.vakata.dnd._trigger("stop", e);
				} else {
					if (e.type === "touchend" && e.target === vakata_dnd.target) {
						var to = setTimeout(function () {
							$(e.target).click();
						}, 100);
						$(e.target).one('click', function () {
							if (to) {
								clearTimeout(to);
							}
						});
					}
				}
				$.vakata.dnd._clean();
				return false;
			}
		};
	})($);

	// include the dnd plugin by default
	// $.jstree.defaults.plugins.push("dnd");


	/**
  * ### Massload plugin
  *
  * Adds massload functionality to jsTree, so that multiple nodes can be loaded in a single request (only useful with lazy loading).
  */

	/**
  * massload configuration
  *
  * It is possible to set this to a standard jQuery-like AJAX config.
  * In addition to the standard jQuery ajax options here you can supply functions for `data` and `url`, the functions will be run in the current instance's scope and a param will be passed indicating which node IDs need to be loaded, the return value of those functions will be used.
  *
  * You can also set this to a function, that function will receive the node IDs being loaded as argument and a second param which is a function (callback) which should be called with the result.
  *
  * Both the AJAX and the function approach rely on the same return value - an object where the keys are the node IDs, and the value is the children of that node as an array.
  *
  *	{
  *		"id1" : [{ "text" : "Child of ID1", "id" : "c1" }, { "text" : "Another child of ID1", "id" : "c2" }],
  *		"id2" : [{ "text" : "Child of ID2", "id" : "c3" }]
  *	}
  * 
  * @name $.jstree.defaults.massload
  * @plugin massload
  */
	$.jstree.defaults.massload = null;
	$.jstree.plugins.massload = function (options, parent) {
		this.init = function (el, options) {
			this._data.massload = {};
			parent.init.call(this, el, options);
		};
		this._load_nodes = function (nodes, callback, is_callback, force_reload) {
			var s = this.settings.massload,
			    nodesString = JSON.stringify(nodes),
			    toLoad = [],
			    m = this._model.data,
			    i,
			    j,
			    dom;
			if (!is_callback) {
				for (i = 0, j = nodes.length; i < j; i++) {
					if (!m[nodes[i]] || !m[nodes[i]].state.loaded && !m[nodes[i]].state.failed || force_reload) {
						toLoad.push(nodes[i]);
						dom = this.get_node(nodes[i], true);
						if (dom && dom.length) {
							dom.addClass("jstree-loading").attr('aria-busy', true);
						}
					}
				}
				this._data.massload = {};
				if (toLoad.length) {
					if ($.isFunction(s)) {
						return s.call(this, toLoad, $.proxy(function (data) {
							var i, j;
							if (data) {
								for (i in data) {
									if (data.hasOwnProperty(i)) {
										this._data.massload[i] = data[i];
									}
								}
							}
							for (i = 0, j = nodes.length; i < j; i++) {
								dom = this.get_node(nodes[i], true);
								if (dom && dom.length) {
									dom.removeClass("jstree-loading").attr('aria-busy', false);
								}
							}
							parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
						}, this));
					}
					if ((typeof s === 'undefined' ? 'undefined' : _typeof(s)) === 'object' && s && s.url) {
						s = $.extend(true, {}, s);
						if ($.isFunction(s.url)) {
							s.url = s.url.call(this, toLoad);
						}
						if ($.isFunction(s.data)) {
							s.data = s.data.call(this, toLoad);
						}
						return $.ajax(s).done($.proxy(function (data, t, x) {
							var i, j;
							if (data) {
								for (i in data) {
									if (data.hasOwnProperty(i)) {
										this._data.massload[i] = data[i];
									}
								}
							}
							for (i = 0, j = nodes.length; i < j; i++) {
								dom = this.get_node(nodes[i], true);
								if (dom && dom.length) {
									dom.removeClass("jstree-loading").attr('aria-busy', false);
								}
							}
							parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
						}, this)).fail($.proxy(function (f) {
							parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
						}, this));
					}
				}
			}
			return parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
		};
		this._load_node = function (obj, callback) {
			var data = this._data.massload[obj.id],
			    rslt = null,
			    dom;
			if (data) {
				rslt = this[typeof data === 'string' ? '_append_html_data' : '_append_json_data'](obj, typeof data === 'string' ? $($.parseHTML(data)).filter(function () {
					return this.nodeType !== 3;
				}) : data, function (status) {
					callback.call(this, status);
				});
				dom = this.get_node(obj.id, true);
				if (dom && dom.length) {
					dom.removeClass("jstree-loading").attr('aria-busy', false);
				}
				delete this._data.massload[obj.id];
				return rslt;
			}
			return parent._load_node.call(this, obj, callback);
		};
	};

	/**
  * ### Search plugin
  *
  * Adds search functionality to jsTree.
  */

	/**
  * stores all defaults for the search plugin
  * @name $.jstree.defaults.search
  * @plugin search
  */
	$.jstree.defaults.search = {
		/**
   * a jQuery-like AJAX config, which jstree uses if a server should be queried for results.
   *
   * A `str` (which is the search string) parameter will be added with the request, an optional `inside` parameter will be added if the search is limited to a node id. The expected result is a JSON array with nodes that need to be opened so that matching nodes will be revealed.
   * Leave this setting as `false` to not query the server. You can also set this to a function, which will be invoked in the instance's scope and receive 3 parameters - the search string, the callback to call with the array of nodes to load, and the optional node ID to limit the search to
   * @name $.jstree.defaults.search.ajax
   * @plugin search
   */
		ajax: false,
		/**
   * Indicates if the search should be fuzzy or not (should `chnd3` match `child node 3`). Default is `false`.
   * @name $.jstree.defaults.search.fuzzy
   * @plugin search
   */
		fuzzy: false,
		/**
   * Indicates if the search should be case sensitive. Default is `false`.
   * @name $.jstree.defaults.search.case_sensitive
   * @plugin search
   */
		case_sensitive: false,
		/**
   * Indicates if the tree should be filtered (by default) to show only matching nodes (keep in mind this can be a heavy on large trees in old browsers).
   * This setting can be changed at runtime when calling the search method. Default is `false`.
   * @name $.jstree.defaults.search.show_only_matches
   * @plugin search
   */
		show_only_matches: false,
		/**
   * Indicates if the children of matched element are shown (when show_only_matches is true)
   * This setting can be changed at runtime when calling the search method. Default is `false`.
   * @name $.jstree.defaults.search.show_only_matches_children
   * @plugin search
   */
		show_only_matches_children: false,
		/**
   * Indicates if all nodes opened to reveal the search result, should be closed when the search is cleared or a new search is performed. Default is `true`.
   * @name $.jstree.defaults.search.close_opened_onclear
   * @plugin search
   */
		close_opened_onclear: true,
		/**
   * Indicates if only leaf nodes should be included in search results. Default is `false`.
   * @name $.jstree.defaults.search.search_leaves_only
   * @plugin search
   */
		search_leaves_only: false,
		/**
   * If set to a function it wil be called in the instance's scope with two arguments - search string and node (where node will be every node in the structure, so use with caution).
   * If the function returns a truthy value the node will be considered a match (it might not be displayed if search_only_leaves is set to true and the node is not a leaf). Default is `false`.
   * @name $.jstree.defaults.search.search_callback
   * @plugin search
   */
		search_callback: false
	};

	$.jstree.plugins.search = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);

			this._data.search.str = "";
			this._data.search.dom = $();
			this._data.search.res = [];
			this._data.search.opn = [];
			this._data.search.som = false;
			this._data.search.smc = false;
			this._data.search.hdn = [];

			this.element.on("search.jstree", $.proxy(function (e, data) {
				if (this._data.search.som && data.res.length) {
					var m = this._model.data,
					    i,
					    j,
					    p = [],
					    k,
					    l;
					for (i = 0, j = data.res.length; i < j; i++) {
						if (m[data.res[i]] && !m[data.res[i]].state.hidden) {
							p.push(data.res[i]);
							p = p.concat(m[data.res[i]].parents);
							if (this._data.search.smc) {
								for (k = 0, l = m[data.res[i]].children_d.length; k < l; k++) {
									if (m[m[data.res[i]].children_d[k]] && !m[m[data.res[i]].children_d[k]].state.hidden) {
										p.push(m[data.res[i]].children_d[k]);
									}
								}
							}
						}
					}
					p = $.vakata.array_remove_item($.vakata.array_unique(p), $.jstree.root);
					this._data.search.hdn = this.hide_all(true);
					this.show_node(p, true);
					this.redraw(true);
				}
			}, this)).on("clear_search.jstree", $.proxy(function (e, data) {
				if (this._data.search.som && data.res.length) {
					this.show_node(this._data.search.hdn, true);
					this.redraw(true);
				}
			}, this));
		};
		/**
   * used to search the tree nodes for a given string
   * @name search(str [, skip_async])
   * @param {String} str the search string
   * @param {Boolean} skip_async if set to true server will not be queried even if configured
   * @param {Boolean} show_only_matches if set to true only matching nodes will be shown (keep in mind this can be very slow on large trees or old browsers)
   * @param {mixed} inside an optional node to whose children to limit the search
   * @param {Boolean} append if set to true the results of this search are appended to the previous search
   * @plugin search
   * @trigger search.jstree
   */
		this.search = function (str, skip_async, show_only_matches, inside, append, show_only_matches_children) {
			if (str === false || $.trim(str.toString()) === "") {
				return this.clear_search();
			}
			inside = this.get_node(inside);
			inside = inside && inside.id ? inside.id : null;
			str = str.toString();
			var s = this.settings.search,
			    a = s.ajax ? s.ajax : false,
			    m = this._model.data,
			    f = null,
			    r = [],
			    p = [],
			    i,
			    j;
			if (this._data.search.res.length && !append) {
				this.clear_search();
			}
			if (show_only_matches === undefined) {
				show_only_matches = s.show_only_matches;
			}
			if (show_only_matches_children === undefined) {
				show_only_matches_children = s.show_only_matches_children;
			}
			if (!skip_async && a !== false) {
				if ($.isFunction(a)) {
					return a.call(this, str, $.proxy(function (d) {
						if (d && d.d) {
							d = d.d;
						}
						this._load_nodes(!$.isArray(d) ? [] : $.vakata.array_unique(d), function () {
							this.search(str, true, show_only_matches, inside, append, show_only_matches_children);
						});
					}, this), inside);
				} else {
					a = $.extend({}, a);
					if (!a.data) {
						a.data = {};
					}
					a.data.str = str;
					if (inside) {
						a.data.inside = inside;
					}
					if (this._data.search.lastRequest) {
						this._data.search.lastRequest.abort();
					}
					this._data.search.lastRequest = $.ajax(a).fail($.proxy(function () {
						this._data.core.last_error = { 'error': 'ajax', 'plugin': 'search', 'id': 'search_01', 'reason': 'Could not load search parents', 'data': JSON.stringify(a) };
						this.settings.core.error.call(this, this._data.core.last_error);
					}, this)).done($.proxy(function (d) {
						if (d && d.d) {
							d = d.d;
						}
						this._load_nodes(!$.isArray(d) ? [] : $.vakata.array_unique(d), function () {
							this.search(str, true, show_only_matches, inside, append, show_only_matches_children);
						});
					}, this));
					return this._data.search.lastRequest;
				}
			}
			if (!append) {
				this._data.search.str = str;
				this._data.search.dom = $();
				this._data.search.res = [];
				this._data.search.opn = [];
				this._data.search.som = show_only_matches;
				this._data.search.smc = show_only_matches_children;
			}

			f = new $.vakata.search(str, true, { caseSensitive: s.case_sensitive, fuzzy: s.fuzzy });
			$.each(m[inside ? inside : $.jstree.root].children_d, function (ii, i) {
				var v = m[i];
				if (v.text && !v.state.hidden && (!s.search_leaves_only || v.state.loaded && v.children.length === 0) && (s.search_callback && s.search_callback.call(this, str, v) || !s.search_callback && f.search(v.text).isMatch)) {
					r.push(i);
					p = p.concat(v.parents);
				}
			});
			if (r.length) {
				p = $.vakata.array_unique(p);
				for (i = 0, j = p.length; i < j; i++) {
					if (p[i] !== $.jstree.root && m[p[i]] && this.open_node(p[i], null, 0) === true) {
						this._data.search.opn.push(p[i]);
					}
				}
				if (!append) {
					this._data.search.dom = $(this.element[0].querySelectorAll('#' + $.map(r, function (v) {
						return "0123456789".indexOf(v[0]) !== -1 ? '\\3' + v[0] + ' ' + v.substr(1).replace($.jstree.idregex, '\\$&') : v.replace($.jstree.idregex, '\\$&');
					}).join(', #')));
					this._data.search.res = r;
				} else {
					this._data.search.dom = this._data.search.dom.add($(this.element[0].querySelectorAll('#' + $.map(r, function (v) {
						return "0123456789".indexOf(v[0]) !== -1 ? '\\3' + v[0] + ' ' + v.substr(1).replace($.jstree.idregex, '\\$&') : v.replace($.jstree.idregex, '\\$&');
					}).join(', #'))));
					this._data.search.res = $.vakata.array_unique(this._data.search.res.concat(r));
				}
				this._data.search.dom.children(".jstree-anchor").addClass('jstree-search');
			}
			/**
    * triggered after search is complete
    * @event
    * @name search.jstree
    * @param {jQuery} nodes a jQuery collection of matching nodes
    * @param {String} str the search string
    * @param {Array} res a collection of objects represeing the matching nodes
    * @plugin search
    */
			this.trigger('search', { nodes: this._data.search.dom, str: str, res: this._data.search.res, show_only_matches: show_only_matches });
		};
		/**
   * used to clear the last search (removes classes and shows all nodes if filtering is on)
   * @name clear_search()
   * @plugin search
   * @trigger clear_search.jstree
   */
		this.clear_search = function () {
			if (this.settings.search.close_opened_onclear) {
				this.close_node(this._data.search.opn, 0);
			}
			/**
    * triggered after search is complete
    * @event
    * @name clear_search.jstree
    * @param {jQuery} nodes a jQuery collection of matching nodes (the result from the last search)
    * @param {String} str the search string (the last search string)
    * @param {Array} res a collection of objects represeing the matching nodes (the result from the last search)
    * @plugin search
    */
			this.trigger('clear_search', { 'nodes': this._data.search.dom, str: this._data.search.str, res: this._data.search.res });
			if (this._data.search.res.length) {
				this._data.search.dom = $(this.element[0].querySelectorAll('#' + $.map(this._data.search.res, function (v) {
					return "0123456789".indexOf(v[0]) !== -1 ? '\\3' + v[0] + ' ' + v.substr(1).replace($.jstree.idregex, '\\$&') : v.replace($.jstree.idregex, '\\$&');
				}).join(', #')));
				this._data.search.dom.children(".jstree-anchor").removeClass("jstree-search");
			}
			this._data.search.str = "";
			this._data.search.res = [];
			this._data.search.opn = [];
			this._data.search.dom = $();
		};

		this.redraw_node = function (obj, deep, callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if (obj) {
				if ($.inArray(obj.id, this._data.search.res) !== -1) {
					var i,
					    j,
					    tmp = null;
					for (i = 0, j = obj.childNodes.length; i < j; i++) {
						if (obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
							tmp = obj.childNodes[i];
							break;
						}
					}
					if (tmp) {
						tmp.className += ' jstree-search';
					}
				}
			}
			return obj;
		};
	};

	// helpers
	(function ($) {
		// from http://kiro.me/projects/fuse.html
		$.vakata.search = function (pattern, txt, options) {
			options = options || {};
			options = $.extend({}, $.vakata.search.defaults, options);
			if (options.fuzzy !== false) {
				options.fuzzy = true;
			}
			pattern = options.caseSensitive ? pattern : pattern.toLowerCase();
			var MATCH_LOCATION = options.location,
			    MATCH_DISTANCE = options.distance,
			    MATCH_THRESHOLD = options.threshold,
			    patternLen = pattern.length,
			    matchmask,
			    pattern_alphabet,
			    match_bitapScore,
			    search;
			if (patternLen > 32) {
				options.fuzzy = false;
			}
			if (options.fuzzy) {
				matchmask = 1 << patternLen - 1;
				pattern_alphabet = function () {
					var mask = {},
					    i = 0;
					for (i = 0; i < patternLen; i++) {
						mask[pattern.charAt(i)] = 0;
					}
					for (i = 0; i < patternLen; i++) {
						mask[pattern.charAt(i)] |= 1 << patternLen - i - 1;
					}
					return mask;
				}();
				match_bitapScore = function match_bitapScore(e, x) {
					var accuracy = e / patternLen,
					    proximity = Math.abs(MATCH_LOCATION - x);
					if (!MATCH_DISTANCE) {
						return proximity ? 1.0 : accuracy;
					}
					return accuracy + proximity / MATCH_DISTANCE;
				};
			}
			search = function search(text) {
				text = options.caseSensitive ? text : text.toLowerCase();
				if (pattern === text || text.indexOf(pattern) !== -1) {
					return {
						isMatch: true,
						score: 0
					};
				}
				if (!options.fuzzy) {
					return {
						isMatch: false,
						score: 1
					};
				}
				var i,
				    j,
				    textLen = text.length,
				    scoreThreshold = MATCH_THRESHOLD,
				    bestLoc = text.indexOf(pattern, MATCH_LOCATION),
				    binMin,
				    binMid,
				    binMax = patternLen + textLen,
				    lastRd,
				    start,
				    finish,
				    rd,
				    charMatch,
				    score = 1,
				    locations = [];
				if (bestLoc !== -1) {
					scoreThreshold = Math.min(match_bitapScore(0, bestLoc), scoreThreshold);
					bestLoc = text.lastIndexOf(pattern, MATCH_LOCATION + patternLen);
					if (bestLoc !== -1) {
						scoreThreshold = Math.min(match_bitapScore(0, bestLoc), scoreThreshold);
					}
				}
				bestLoc = -1;
				for (i = 0; i < patternLen; i++) {
					binMin = 0;
					binMid = binMax;
					while (binMin < binMid) {
						if (match_bitapScore(i, MATCH_LOCATION + binMid) <= scoreThreshold) {
							binMin = binMid;
						} else {
							binMax = binMid;
						}
						binMid = Math.floor((binMax - binMin) / 2 + binMin);
					}
					binMax = binMid;
					start = Math.max(1, MATCH_LOCATION - binMid + 1);
					finish = Math.min(MATCH_LOCATION + binMid, textLen) + patternLen;
					rd = new Array(finish + 2);
					rd[finish + 1] = (1 << i) - 1;
					for (j = finish; j >= start; j--) {
						charMatch = pattern_alphabet[text.charAt(j - 1)];
						if (i === 0) {
							rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
						} else {
							rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((lastRd[j + 1] | lastRd[j]) << 1 | 1) | lastRd[j + 1];
						}
						if (rd[j] & matchmask) {
							score = match_bitapScore(i, j - 1);
							if (score <= scoreThreshold) {
								scoreThreshold = score;
								bestLoc = j - 1;
								locations.push(bestLoc);
								if (bestLoc > MATCH_LOCATION) {
									start = Math.max(1, 2 * MATCH_LOCATION - bestLoc);
								} else {
									break;
								}
							}
						}
					}
					if (match_bitapScore(i + 1, MATCH_LOCATION) > scoreThreshold) {
						break;
					}
					lastRd = rd;
				}
				return {
					isMatch: bestLoc >= 0,
					score: score
				};
			};
			return txt === true ? { 'search': search } : search(txt);
		};
		$.vakata.search.defaults = {
			location: 0,
			distance: 100,
			threshold: 0.6,
			fuzzy: false,
			caseSensitive: false
		};
	})($);

	// include the search plugin by default
	// $.jstree.defaults.plugins.push("search");


	/**
  * ### Sort plugin
  *
  * Automatically sorts all siblings in the tree according to a sorting function.
  */

	/**
  * the settings function used to sort the nodes.
  * It is executed in the tree's context, accepts two nodes as arguments and should return `1` or `-1`.
  * @name $.jstree.defaults.sort
  * @plugin sort
  */
	$.jstree.defaults.sort = function (a, b) {
		//return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : this.get_type(a) >= this.get_type(b);
		return this.get_text(a) > this.get_text(b) ? 1 : -1;
	};
	$.jstree.plugins.sort = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);
			this.element.on("model.jstree", $.proxy(function (e, data) {
				this.sort(data.parent, true);
			}, this)).on("rename_node.jstree create_node.jstree", $.proxy(function (e, data) {
				this.sort(data.parent || data.node.parent, false);
				this.redraw_node(data.parent || data.node.parent, true);
			}, this)).on("move_node.jstree copy_node.jstree", $.proxy(function (e, data) {
				this.sort(data.parent, false);
				this.redraw_node(data.parent, true);
			}, this));
		};
		/**
   * used to sort a node's children
   * @private
   * @name sort(obj [, deep])
   * @param  {mixed} obj the node
   * @param {Boolean} deep if set to `true` nodes are sorted recursively.
   * @plugin sort
   * @trigger search.jstree
   */
		this.sort = function (obj, deep) {
			var i, j;
			obj = this.get_node(obj);
			if (obj && obj.children && obj.children.length) {
				obj.children.sort($.proxy(this.settings.sort, this));
				if (deep) {
					for (i = 0, j = obj.children_d.length; i < j; i++) {
						this.sort(obj.children_d[i], false);
					}
				}
			}
		};
	};

	// include the sort plugin by default
	// $.jstree.defaults.plugins.push("sort");

	/**
  * ### State plugin
  *
  * Saves the state of the tree (selected nodes, opened nodes) on the user's computer using available options (localStorage, cookies, etc)
  */

	var to = false;
	/**
  * stores all defaults for the state plugin
  * @name $.jstree.defaults.state
  * @plugin state
  */
	$.jstree.defaults.state = {
		/**
   * A string for the key to use when saving the current tree (change if using multiple trees in your project). Defaults to `jstree`.
   * @name $.jstree.defaults.state.key
   * @plugin state
   */
		key: 'jstree',
		/**
   * A space separated list of events that trigger a state save. Defaults to `changed.jstree open_node.jstree close_node.jstree`.
   * @name $.jstree.defaults.state.events
   * @plugin state
   */
		events: 'changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree',
		/**
   * Time in milliseconds after which the state will expire. Defaults to 'false' meaning - no expire.
   * @name $.jstree.defaults.state.ttl
   * @plugin state
   */
		ttl: false,
		/**
   * A function that will be executed prior to restoring state with one argument - the state object. Can be used to clear unwanted parts of the state.
   * @name $.jstree.defaults.state.filter
   * @plugin state
   */
		filter: false
	};
	$.jstree.plugins.state = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);
			var bind = $.proxy(function () {
				this.element.on(this.settings.state.events, $.proxy(function () {
					if (to) {
						clearTimeout(to);
					}
					to = setTimeout($.proxy(function () {
						this.save_state();
					}, this), 100);
				}, this));
				/**
     * triggered when the state plugin is finished restoring the state (and immediately after ready if there is no state to restore).
     * @event
     * @name state_ready.jstree
     * @plugin state
     */
				this.trigger('state_ready');
			}, this);
			this.element.on("ready.jstree", $.proxy(function (e, data) {
				this.element.one("restore_state.jstree", bind);
				if (!this.restore_state()) {
					bind();
				}
			}, this));
		};
		/**
   * save the state
   * @name save_state()
   * @plugin state
   */
		this.save_state = function () {
			var st = { 'state': this.get_state(), 'ttl': this.settings.state.ttl, 'sec': +new Date() };
			$.vakata.storage.set(this.settings.state.key, JSON.stringify(st));
		};
		/**
   * restore the state from the user's computer
   * @name restore_state()
   * @plugin state
   */
		this.restore_state = function () {
			var k = $.vakata.storage.get(this.settings.state.key);
			if (!!k) {
				try {
					k = JSON.parse(k);
				} catch (ex) {
					return false;
				}
			}
			if (!!k && k.ttl && k.sec && +new Date() - k.sec > k.ttl) {
				return false;
			}
			if (!!k && k.state) {
				k = k.state;
			}
			if (!!k && $.isFunction(this.settings.state.filter)) {
				k = this.settings.state.filter.call(this, k);
			}
			if (!!k) {
				this.element.one("set_state.jstree", function (e, data) {
					data.instance.trigger('restore_state', { 'state': $.extend(true, {}, k) });
				});
				this.set_state(k);
				return true;
			}
			return false;
		};
		/**
   * clear the state on the user's computer
   * @name clear_state()
   * @plugin state
   */
		this.clear_state = function () {
			return $.vakata.storage.del(this.settings.state.key);
		};
	};

	(function ($, undefined) {
		$.vakata.storage = {
			// simply specifying the functions in FF throws an error
			set: function set(key, val) {
				return window.localStorage.setItem(key, val);
			},
			get: function get(key) {
				return window.localStorage.getItem(key);
			},
			del: function del(key) {
				return window.localStorage.removeItem(key);
			}
		};
	})($);

	// include the state plugin by default
	// $.jstree.defaults.plugins.push("state");

	/**
  * ### Types plugin
  *
  * Makes it possible to add predefined types for groups of nodes, which make it possible to easily control nesting rules and icon for each group.
  */

	/**
  * An object storing all types as key value pairs, where the key is the type name and the value is an object that could contain following keys (all optional).
  *
  * * `max_children` the maximum number of immediate children this node type can have. Do not specify or set to `-1` for unlimited.
  * * `max_depth` the maximum number of nesting this node type can have. A value of `1` would mean that the node can have children, but no grandchildren. Do not specify or set to `-1` for unlimited.
  * * `valid_children` an array of node type strings, that nodes of this type can have as children. Do not specify or set to `-1` for no limits.
  * * `icon` a string - can be a path to an icon or a className, if using an image that is in the current directory use a `./` prefix, otherwise it will be detected as a class. Omit to use the default icon from your theme.
  * * `li_attr` an object of values which will be used to add HTML attributes on the resulting LI DOM node (merged with the node's own data)
  * * `a_attr` an object of values which will be used to add HTML attributes on the resulting A DOM node (merged with the node's own data)
  *
  * There are two predefined types:
  *
  * * `#` represents the root of the tree, for example `max_children` would control the maximum number of root nodes.
  * * `default` represents the default node - any settings here will be applied to all nodes that do not have a type specified.
  *
  * @name $.jstree.defaults.types
  * @plugin types
  */
	$.jstree.defaults.types = {
		'default': {}
	};
	$.jstree.defaults.types[$.jstree.root] = {};

	$.jstree.plugins.types = function (options, parent) {
		this.init = function (el, options) {
			var i, j;
			if (options && options.types && options.types['default']) {
				for (i in options.types) {
					if (i !== "default" && i !== $.jstree.root && options.types.hasOwnProperty(i)) {
						for (j in options.types['default']) {
							if (options.types['default'].hasOwnProperty(j) && options.types[i][j] === undefined) {
								options.types[i][j] = options.types['default'][j];
							}
						}
					}
				}
			}
			parent.init.call(this, el, options);
			this._model.data[$.jstree.root].type = $.jstree.root;
		};
		this.refresh = function (skip_loading, forget_state) {
			parent.refresh.call(this, skip_loading, forget_state);
			this._model.data[$.jstree.root].type = $.jstree.root;
		};
		this.bind = function () {
			this.element.on('model.jstree', $.proxy(function (e, data) {
				var m = this._model.data,
				    dpc = data.nodes,
				    t = this.settings.types,
				    i,
				    j,
				    c = 'default',
				    k;
				for (i = 0, j = dpc.length; i < j; i++) {
					c = 'default';
					if (m[dpc[i]].original && m[dpc[i]].original.type && t[m[dpc[i]].original.type]) {
						c = m[dpc[i]].original.type;
					}
					if (m[dpc[i]].data && m[dpc[i]].data.jstree && m[dpc[i]].data.jstree.type && t[m[dpc[i]].data.jstree.type]) {
						c = m[dpc[i]].data.jstree.type;
					}
					m[dpc[i]].type = c;
					if (m[dpc[i]].icon === true && t[c].icon !== undefined) {
						m[dpc[i]].icon = t[c].icon;
					}
					if (t[c].li_attr !== undefined && _typeof(t[c].li_attr) === 'object') {
						for (k in t[c].li_attr) {
							if (t[c].li_attr.hasOwnProperty(k)) {
								if (k === 'id') {
									continue;
								} else if (m[dpc[i]].li_attr[k] === undefined) {
									m[dpc[i]].li_attr[k] = t[c].li_attr[k];
								} else if (k === 'class') {
									m[dpc[i]].li_attr['class'] = t[c].li_attr['class'] + ' ' + m[dpc[i]].li_attr['class'];
								}
							}
						}
					}
					if (t[c].a_attr !== undefined && _typeof(t[c].a_attr) === 'object') {
						for (k in t[c].a_attr) {
							if (t[c].a_attr.hasOwnProperty(k)) {
								if (k === 'id') {
									continue;
								} else if (m[dpc[i]].a_attr[k] === undefined) {
									m[dpc[i]].a_attr[k] = t[c].a_attr[k];
								} else if (k === 'href' && m[dpc[i]].a_attr[k] === '#') {
									m[dpc[i]].a_attr['href'] = t[c].a_attr['href'];
								} else if (k === 'class') {
									m[dpc[i]].a_attr['class'] = t[c].a_attr['class'] + ' ' + m[dpc[i]].a_attr['class'];
								}
							}
						}
					}
				}
				m[$.jstree.root].type = $.jstree.root;
			}, this));
			parent.bind.call(this);
		};
		this.get_json = function (obj, options, flat) {
			var i,
			    j,
			    m = this._model.data,
			    opt = options ? $.extend(true, {}, options, { no_id: false }) : {},
			    tmp = parent.get_json.call(this, obj, opt, flat);
			if (tmp === false) {
				return false;
			}
			if ($.isArray(tmp)) {
				for (i = 0, j = tmp.length; i < j; i++) {
					tmp[i].type = tmp[i].id && m[tmp[i].id] && m[tmp[i].id].type ? m[tmp[i].id].type : "default";
					if (options && options.no_id) {
						delete tmp[i].id;
						if (tmp[i].li_attr && tmp[i].li_attr.id) {
							delete tmp[i].li_attr.id;
						}
						if (tmp[i].a_attr && tmp[i].a_attr.id) {
							delete tmp[i].a_attr.id;
						}
					}
				}
			} else {
				tmp.type = tmp.id && m[tmp.id] && m[tmp.id].type ? m[tmp.id].type : "default";
				if (options && options.no_id) {
					tmp = this._delete_ids(tmp);
				}
			}
			return tmp;
		};
		this._delete_ids = function (tmp) {
			if ($.isArray(tmp)) {
				for (var i = 0, j = tmp.length; i < j; i++) {
					tmp[i] = this._delete_ids(tmp[i]);
				}
				return tmp;
			}
			delete tmp.id;
			if (tmp.li_attr && tmp.li_attr.id) {
				delete tmp.li_attr.id;
			}
			if (tmp.a_attr && tmp.a_attr.id) {
				delete tmp.a_attr.id;
			}
			if (tmp.children && $.isArray(tmp.children)) {
				tmp.children = this._delete_ids(tmp.children);
			}
			return tmp;
		};
		this.check = function (chk, obj, par, pos, more) {
			if (parent.check.call(this, chk, obj, par, pos, more) === false) {
				return false;
			}
			obj = obj && obj.id ? obj : this.get_node(obj);
			par = par && par.id ? par : this.get_node(par);
			var m = obj && obj.id ? more && more.origin ? more.origin : $.jstree.reference(obj.id) : null,
			    tmp,
			    d,
			    i,
			    j;
			m = m && m._model && m._model.data ? m._model.data : null;
			switch (chk) {
				case "create_node":
				case "move_node":
				case "copy_node":
					if (chk !== 'move_node' || $.inArray(obj.id, par.children) === -1) {
						tmp = this.get_rules(par);
						if (tmp.max_children !== undefined && tmp.max_children !== -1 && tmp.max_children === par.children.length) {
							this._data.core.last_error = { 'error': 'check', 'plugin': 'types', 'id': 'types_01', 'reason': 'max_children prevents function: ' + chk, 'data': JSON.stringify({ 'chk': chk, 'pos': pos, 'obj': obj && obj.id ? obj.id : false, 'par': par && par.id ? par.id : false }) };
							return false;
						}
						if (tmp.valid_children !== undefined && tmp.valid_children !== -1 && $.inArray(obj.type || 'default', tmp.valid_children) === -1) {
							this._data.core.last_error = { 'error': 'check', 'plugin': 'types', 'id': 'types_02', 'reason': 'valid_children prevents function: ' + chk, 'data': JSON.stringify({ 'chk': chk, 'pos': pos, 'obj': obj && obj.id ? obj.id : false, 'par': par && par.id ? par.id : false }) };
							return false;
						}
						if (m && obj.children_d && obj.parents) {
							d = 0;
							for (i = 0, j = obj.children_d.length; i < j; i++) {
								d = Math.max(d, m[obj.children_d[i]].parents.length);
							}
							d = d - obj.parents.length + 1;
						}
						if (d <= 0 || d === undefined) {
							d = 1;
						}
						do {
							if (tmp.max_depth !== undefined && tmp.max_depth !== -1 && tmp.max_depth < d) {
								this._data.core.last_error = { 'error': 'check', 'plugin': 'types', 'id': 'types_03', 'reason': 'max_depth prevents function: ' + chk, 'data': JSON.stringify({ 'chk': chk, 'pos': pos, 'obj': obj && obj.id ? obj.id : false, 'par': par && par.id ? par.id : false }) };
								return false;
							}
							par = this.get_node(par.parent);
							tmp = this.get_rules(par);
							d++;
						} while (par);
					}
					break;
			}
			return true;
		};
		/**
   * used to retrieve the type settings object for a node
   * @name get_rules(obj)
   * @param {mixed} obj the node to find the rules for
   * @return {Object}
   * @plugin types
   */
		this.get_rules = function (obj) {
			obj = this.get_node(obj);
			if (!obj) {
				return false;
			}
			var tmp = this.get_type(obj, true);
			if (tmp.max_depth === undefined) {
				tmp.max_depth = -1;
			}
			if (tmp.max_children === undefined) {
				tmp.max_children = -1;
			}
			if (tmp.valid_children === undefined) {
				tmp.valid_children = -1;
			}
			return tmp;
		};
		/**
   * used to retrieve the type string or settings object for a node
   * @name get_type(obj [, rules])
   * @param {mixed} obj the node to find the rules for
   * @param {Boolean} rules if set to `true` instead of a string the settings object will be returned
   * @return {String|Object}
   * @plugin types
   */
		this.get_type = function (obj, rules) {
			obj = this.get_node(obj);
			return !obj ? false : rules ? $.extend({ 'type': obj.type }, this.settings.types[obj.type]) : obj.type;
		};
		/**
   * used to change a node's type
   * @name set_type(obj, type)
   * @param {mixed} obj the node to change
   * @param {String} type the new type
   * @plugin types
   */
		this.set_type = function (obj, type) {
			var m = this._model.data,
			    t,
			    t1,
			    t2,
			    old_type,
			    old_icon,
			    k,
			    d,
			    a;
			if ($.isArray(obj)) {
				obj = obj.slice();
				for (t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.set_type(obj[t1], type);
				}
				return true;
			}
			t = this.settings.types;
			obj = this.get_node(obj);
			if (!t[type] || !obj) {
				return false;
			}
			d = this.get_node(obj, true);
			if (d && d.length) {
				a = d.children('.jstree-anchor');
			}
			old_type = obj.type;
			old_icon = this.get_icon(obj);
			obj.type = type;
			if (old_icon === true || !t[old_type] || t[old_type].icon !== undefined && old_icon === t[old_type].icon) {
				this.set_icon(obj, t[type].icon !== undefined ? t[type].icon : true);
			}

			// remove old type props
			if (t[old_type] && t[old_type].li_attr !== undefined && _typeof(t[old_type].li_attr) === 'object') {
				for (k in t[old_type].li_attr) {
					if (t[old_type].li_attr.hasOwnProperty(k)) {
						if (k === 'id') {
							continue;
						} else if (k === 'class') {
							m[obj.id].li_attr['class'] = (m[obj.id].li_attr['class'] || '').replace(t[old_type].li_attr[k], '');
							if (d) {
								d.removeClass(t[old_type].li_attr[k]);
							}
						} else if (m[obj.id].li_attr[k] === t[old_type].li_attr[k]) {
							m[obj.id].li_attr[k] = null;
							if (d) {
								d.removeAttr(k);
							}
						}
					}
				}
			}
			if (t[old_type] && t[old_type].a_attr !== undefined && _typeof(t[old_type].a_attr) === 'object') {
				for (k in t[old_type].a_attr) {
					if (t[old_type].a_attr.hasOwnProperty(k)) {
						if (k === 'id') {
							continue;
						} else if (k === 'class') {
							m[obj.id].a_attr['class'] = (m[obj.id].a_attr['class'] || '').replace(t[old_type].a_attr[k], '');
							if (a) {
								a.removeClass(t[old_type].a_attr[k]);
							}
						} else if (m[obj.id].a_attr[k] === t[old_type].a_attr[k]) {
							if (k === 'href') {
								m[obj.id].a_attr[k] = '#';
								if (a) {
									a.attr('href', '#');
								}
							} else {
								delete m[obj.id].a_attr[k];
								if (a) {
									a.removeAttr(k);
								}
							}
						}
					}
				}
			}

			// add new props
			if (t[type].li_attr !== undefined && _typeof(t[type].li_attr) === 'object') {
				for (k in t[type].li_attr) {
					if (t[type].li_attr.hasOwnProperty(k)) {
						if (k === 'id') {
							continue;
						} else if (m[obj.id].li_attr[k] === undefined) {
							m[obj.id].li_attr[k] = t[type].li_attr[k];
							if (d) {
								if (k === 'class') {
									d.addClass(t[type].li_attr[k]);
								} else {
									d.attr(k, t[type].li_attr[k]);
								}
							}
						} else if (k === 'class') {
							m[obj.id].li_attr['class'] = t[type].li_attr[k] + ' ' + m[obj.id].li_attr['class'];
							if (d) {
								d.addClass(t[type].li_attr[k]);
							}
						}
					}
				}
			}
			if (t[type].a_attr !== undefined && _typeof(t[type].a_attr) === 'object') {
				for (k in t[type].a_attr) {
					if (t[type].a_attr.hasOwnProperty(k)) {
						if (k === 'id') {
							continue;
						} else if (m[obj.id].a_attr[k] === undefined) {
							m[obj.id].a_attr[k] = t[type].a_attr[k];
							if (a) {
								if (k === 'class') {
									a.addClass(t[type].a_attr[k]);
								} else {
									a.attr(k, t[type].a_attr[k]);
								}
							}
						} else if (k === 'href' && m[obj.id].a_attr[k] === '#') {
							m[obj.id].a_attr['href'] = t[type].a_attr['href'];
							if (a) {
								a.attr('href', t[type].a_attr['href']);
							}
						} else if (k === 'class') {
							m[obj.id].a_attr['class'] = t[type].a_attr['class'] + ' ' + m[obj.id].a_attr['class'];
							if (a) {
								a.addClass(t[type].a_attr[k]);
							}
						}
					}
				}
			}

			return true;
		};
	};
	// include the types plugin by default
	// $.jstree.defaults.plugins.push("types");


	/**
  * ### Unique plugin
  *
  * Enforces that no nodes with the same name can coexist as siblings.
  */

	/**
  * stores all defaults for the unique plugin
  * @name $.jstree.defaults.unique
  * @plugin unique
  */
	$.jstree.defaults.unique = {
		/**
   * Indicates if the comparison should be case sensitive. Default is `false`.
   * @name $.jstree.defaults.unique.case_sensitive
   * @plugin unique
   */
		case_sensitive: false,
		/**
   * A callback executed in the instance's scope when a new node is created and the name is already taken, the two arguments are the conflicting name and the counter. The default will produce results like `New node (2)`.
   * @name $.jstree.defaults.unique.duplicate
   * @plugin unique
   */
		duplicate: function duplicate(name, counter) {
			return name + ' (' + counter + ')';
		}
	};

	$.jstree.plugins.unique = function (options, parent) {
		this.check = function (chk, obj, par, pos, more) {
			if (parent.check.call(this, chk, obj, par, pos, more) === false) {
				return false;
			}
			obj = obj && obj.id ? obj : this.get_node(obj);
			par = par && par.id ? par : this.get_node(par);
			if (!par || !par.children) {
				return true;
			}
			var n = chk === "rename_node" ? pos : obj.text,
			    c = [],
			    s = this.settings.unique.case_sensitive,
			    m = this._model.data,
			    i,
			    j;
			for (i = 0, j = par.children.length; i < j; i++) {
				c.push(s ? m[par.children[i]].text : m[par.children[i]].text.toLowerCase());
			}
			if (!s) {
				n = n.toLowerCase();
			}
			switch (chk) {
				case "delete_node":
					return true;
				case "rename_node":
					i = $.inArray(n, c) === -1 || obj.text && obj.text[s ? 'toString' : 'toLowerCase']() === n;
					if (!i) {
						this._data.core.last_error = { 'error': 'check', 'plugin': 'unique', 'id': 'unique_01', 'reason': 'Child with name ' + n + ' already exists. Preventing: ' + chk, 'data': JSON.stringify({ 'chk': chk, 'pos': pos, 'obj': obj && obj.id ? obj.id : false, 'par': par && par.id ? par.id : false }) };
					}
					return i;
				case "create_node":
					i = $.inArray(n, c) === -1;
					if (!i) {
						this._data.core.last_error = { 'error': 'check', 'plugin': 'unique', 'id': 'unique_04', 'reason': 'Child with name ' + n + ' already exists. Preventing: ' + chk, 'data': JSON.stringify({ 'chk': chk, 'pos': pos, 'obj': obj && obj.id ? obj.id : false, 'par': par && par.id ? par.id : false }) };
					}
					return i;
				case "copy_node":
					i = $.inArray(n, c) === -1;
					if (!i) {
						this._data.core.last_error = { 'error': 'check', 'plugin': 'unique', 'id': 'unique_02', 'reason': 'Child with name ' + n + ' already exists. Preventing: ' + chk, 'data': JSON.stringify({ 'chk': chk, 'pos': pos, 'obj': obj && obj.id ? obj.id : false, 'par': par && par.id ? par.id : false }) };
					}
					return i;
				case "move_node":
					i = obj.parent === par.id && (!more || !more.is_multi) || $.inArray(n, c) === -1;
					if (!i) {
						this._data.core.last_error = { 'error': 'check', 'plugin': 'unique', 'id': 'unique_03', 'reason': 'Child with name ' + n + ' already exists. Preventing: ' + chk, 'data': JSON.stringify({ 'chk': chk, 'pos': pos, 'obj': obj && obj.id ? obj.id : false, 'par': par && par.id ? par.id : false }) };
					}
					return i;
			}
			return true;
		};
		this.create_node = function (par, node, pos, callback, is_loaded) {
			if (!node || node.text === undefined) {
				if (par === null) {
					par = $.jstree.root;
				}
				par = this.get_node(par);
				if (!par) {
					return parent.create_node.call(this, par, node, pos, callback, is_loaded);
				}
				pos = pos === undefined ? "last" : pos;
				if (!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
					return parent.create_node.call(this, par, node, pos, callback, is_loaded);
				}
				if (!node) {
					node = {};
				}
				var tmp,
				    n,
				    dpc,
				    i,
				    j,
				    m = this._model.data,
				    s = this.settings.unique.case_sensitive,
				    cb = this.settings.unique.duplicate;
				n = tmp = this.get_string('New node');
				dpc = [];
				for (i = 0, j = par.children.length; i < j; i++) {
					dpc.push(s ? m[par.children[i]].text : m[par.children[i]].text.toLowerCase());
				}
				i = 1;
				while ($.inArray(s ? n : n.toLowerCase(), dpc) !== -1) {
					n = cb.call(this, tmp, ++i).toString();
				}
				node.text = n;
			}
			return parent.create_node.call(this, par, node, pos, callback, is_loaded);
		};
	};

	// include the unique plugin by default
	// $.jstree.defaults.plugins.push("unique");


	/**
  * ### Wholerow plugin
  *
  * Makes each node appear block level. Making selection easier. May cause slow down for large trees in old browsers.
  */

	var div = document.createElement('DIV');
	div.setAttribute('unselectable', 'on');
	div.setAttribute('role', 'presentation');
	div.className = 'jstree-wholerow';
	div.innerHTML = '&#160;';
	$.jstree.plugins.wholerow = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);

			this.element.on('ready.jstree set_state.jstree', $.proxy(function () {
				this.hide_dots();
			}, this)).on("init.jstree loading.jstree ready.jstree", $.proxy(function () {
				//div.style.height = this._data.core.li_height + 'px';
				this.get_container_ul().addClass('jstree-wholerow-ul');
			}, this)).on("deselect_all.jstree", $.proxy(function (e, data) {
				this.element.find('.jstree-wholerow-clicked').removeClass('jstree-wholerow-clicked');
			}, this)).on("changed.jstree", $.proxy(function (e, data) {
				this.element.find('.jstree-wholerow-clicked').removeClass('jstree-wholerow-clicked');
				var tmp = false,
				    i,
				    j;
				for (i = 0, j = data.selected.length; i < j; i++) {
					tmp = this.get_node(data.selected[i], true);
					if (tmp && tmp.length) {
						tmp.children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
					}
				}
			}, this)).on("open_node.jstree", $.proxy(function (e, data) {
				this.get_node(data.node, true).find('.jstree-clicked').parent().children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
			}, this)).on("hover_node.jstree dehover_node.jstree", $.proxy(function (e, data) {
				if (e.type === "hover_node" && this.is_disabled(data.node)) {
					return;
				}
				this.get_node(data.node, true).children('.jstree-wholerow')[e.type === "hover_node" ? "addClass" : "removeClass"]('jstree-wholerow-hovered');
			}, this)).on("contextmenu.jstree", ".jstree-wholerow", $.proxy(function (e) {
				if (this._data.contextmenu) {
					e.preventDefault();
					var tmp = $.Event('contextmenu', { metaKey: e.metaKey, ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey, pageX: e.pageX, pageY: e.pageY });
					$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp);
				}
			}, this))
			/*!
   .on("mousedown.jstree touchstart.jstree", ".jstree-wholerow", function (e) {
   		if(e.target === e.currentTarget) {
   			var a = $(e.currentTarget).closest(".jstree-node").children(".jstree-anchor");
   			e.target = a[0];
   			a.trigger(e);
   		}
   	})
   */
			.on("click.jstree", ".jstree-wholerow", function (e) {
				e.stopImmediatePropagation();
				var tmp = $.Event('click', { metaKey: e.metaKey, ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey });
				$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).focus();
			}).on("dblclick.jstree", ".jstree-wholerow", function (e) {
				e.stopImmediatePropagation();
				var tmp = $.Event('dblclick', { metaKey: e.metaKey, ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey });
				$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).focus();
			}).on("click.jstree", ".jstree-leaf > .jstree-ocl", $.proxy(function (e) {
				e.stopImmediatePropagation();
				var tmp = $.Event('click', { metaKey: e.metaKey, ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey });
				$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).focus();
			}, this)).on("mouseover.jstree", ".jstree-wholerow, .jstree-icon", $.proxy(function (e) {
				e.stopImmediatePropagation();
				if (!this.is_disabled(e.currentTarget)) {
					this.hover_node(e.currentTarget);
				}
				return false;
			}, this)).on("mouseleave.jstree", ".jstree-node", $.proxy(function (e) {
				this.dehover_node(e.currentTarget);
			}, this));
		};
		this.teardown = function () {
			if (this.settings.wholerow) {
				this.element.find(".jstree-wholerow").remove();
			}
			parent.teardown.call(this);
		};
		this.redraw_node = function (obj, deep, callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if (obj) {
				var tmp = div.cloneNode(true);
				//tmp.style.height = this._data.core.li_height + 'px';
				if ($.inArray(obj.id, this._data.core.selected) !== -1) {
					tmp.className += ' jstree-wholerow-clicked';
				}
				if (this._data.core.focused && this._data.core.focused === obj.id) {
					tmp.className += ' jstree-wholerow-hovered';
				}
				obj.insertBefore(tmp, obj.childNodes[0]);
			}
			return obj;
		};
	};
	// include the wholerow plugin by default
	// $.jstree.defaults.plugins.push("wholerow");
	if (document.registerElement && Object && Object.create) {
		var proto = Object.create(HTMLElement.prototype);
		proto.createdCallback = function () {
			var c = { core: {}, plugins: [] },
			    i;
			for (i in $.jstree.plugins) {
				if ($.jstree.plugins.hasOwnProperty(i) && this.attributes[i]) {
					c.plugins.push(i);
					if (this.getAttribute(i) && JSON.parse(this.getAttribute(i))) {
						c[i] = JSON.parse(this.getAttribute(i));
					}
				}
			}
			for (i in $.jstree.defaults.core) {
				if ($.jstree.defaults.core.hasOwnProperty(i) && this.attributes[i]) {
					c.core[i] = JSON.parse(this.getAttribute(i)) || this.getAttribute(i);
				}
			}
			$(this).jstree(c);
		};
		// proto.attributeChangedCallback = function (name, previous, value) { };
		try {
			document.registerElement("vakata-jstree", { prototype: proto });
		} catch (ignore) {}
	}
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Select2 4.0.3
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
(function (factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 = function () {
    // Restore the Select2 AMD loader so it can be used
    // Needed mostly in the language files, where the loader is not inserted
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
      var S2 = jQuery.fn.select2.amd;
    }
    var S2;(function () {
      if (!S2 || !S2.requirejs) {
        if (!S2) {
          S2 = {};
        } else {
          require = S2;
        }
        /**
         * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
         * Available via the MIT or new BSD license.
         * see: http://github.com/jrburke/almond for details
         */
        //Going sloppy to avoid 'use strict' string cost, but strict practices should
        //be followed.
        /*jslint sloppy: true */
        /*global setTimeout: false */

        var requirejs, require, define;
        (function (undef) {
          var main,
              _req,
              makeMap,
              handlers,
              defined = {},
              waiting = {},
              config = {},
              defining = {},
              hasOwn = Object.prototype.hasOwnProperty,
              aps = [].slice,
              jsSuffixRegExp = /\.js$/;

          function hasProp(obj, prop) {
            return hasOwn.call(obj, prop);
          }

          /**
           * Given a relative module name, like ./something, normalize it to
           * a real name that can be mapped to a path.
           * @param {String} name the relative name
           * @param {String} baseName a real name that the name arg is relative
           * to.
           * @returns {String} normalized name
           */
          function normalize(name, baseName) {
            var nameParts,
                nameSegment,
                mapValue,
                foundMap,
                lastIndex,
                foundI,
                foundStarMap,
                starI,
                i,
                j,
                part,
                baseParts = baseName && baseName.split("/"),
                map = config.map,
                starMap = map && map['*'] || {};

            //Adjust any relative paths.
            if (name && name.charAt(0) === ".") {
              //If have a base name, try to normalize against it,
              //otherwise, assume it is a top-level require that will
              //be relative to baseUrl in the end.
              if (baseName) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                  name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                //Lop off the last part of baseParts, so that . matches the
                //"directory" and not name of the baseName's module. For instance,
                //baseName of "one/two/three", maps to "one/two/three.js", but we
                //want the directory, "one/two" for this normalization.
                name = baseParts.slice(0, baseParts.length - 1).concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                  part = name[i];
                  if (part === ".") {
                    name.splice(i, 1);
                    i -= 1;
                  } else if (part === "..") {
                    if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                      //End of the line. Keep at least one non-dot
                      //path segment at the front so it can be mapped
                      //correctly to disk. Otherwise, there is likely
                      //no path mapping for a path starting with '..'.
                      //This can still fail, but catches the most reasonable
                      //uses of ..
                      break;
                    } else if (i > 0) {
                      name.splice(i - 1, 2);
                      i -= 2;
                    }
                  }
                }
                //end trimDots

                name = name.join("/");
              } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
              }
            }

            //Apply map config if available.
            if ((baseParts || starMap) && map) {
              nameParts = name.split('/');

              for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                  //Find the longest baseName segment match in the config.
                  //So, do joins on the biggest to smallest lengths of baseParts.
                  for (j = baseParts.length; j > 0; j -= 1) {
                    mapValue = map[baseParts.slice(0, j).join('/')];

                    //baseName segment has  config, find if it has one for
                    //this name.
                    if (mapValue) {
                      mapValue = mapValue[nameSegment];
                      if (mapValue) {
                        //Match, update name to the new value.
                        foundMap = mapValue;
                        foundI = i;
                        break;
                      }
                    }
                  }
                }

                if (foundMap) {
                  break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                  foundStarMap = starMap[nameSegment];
                  starI = i;
                }
              }

              if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
              }

              if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
              }
            }

            return name;
          }

          function makeRequire(relName, forceSync) {
            return function () {
              //A version of a require function that passes a moduleName
              //value for items that may need to
              //look up paths relative to the moduleName
              var args = aps.call(arguments, 0);

              //If first arg is not require('string'), and there is only
              //one arg, it is the array form without a callback. Insert
              //a null so that the following concat is correct.
              if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
              }
              return _req.apply(undef, args.concat([relName, forceSync]));
            };
          }

          function makeNormalize(relName) {
            return function (name) {
              return normalize(name, relName);
            };
          }

          function makeLoad(depName) {
            return function (value) {
              defined[depName] = value;
            };
          }

          function callDep(name) {
            if (hasProp(waiting, name)) {
              var args = waiting[name];
              delete waiting[name];
              defining[name] = true;
              main.apply(undef, args);
            }

            if (!hasProp(defined, name) && !hasProp(defining, name)) {
              throw new Error('No ' + name);
            }
            return defined[name];
          }

          //Turns a plugin!resource to [plugin, resource]
          //with the plugin being undefined if the name
          //did not have a plugin prefix.
          function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
              prefix = name.substring(0, index);
              name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
          }

          /**
           * Makes a name map, normalizing the name, and using a plugin
           * for normalization if necessary. Grabs a ref to plugin
           * too, as an optimization.
           */
          makeMap = function makeMap(name, relName) {
            var plugin,
                parts = splitPrefix(name),
                prefix = parts[0];

            name = parts[1];

            if (prefix) {
              prefix = normalize(prefix, relName);
              plugin = callDep(prefix);
            }

            //Normalize according
            if (prefix) {
              if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
              } else {
                name = normalize(name, relName);
              }
            } else {
              name = normalize(name, relName);
              parts = splitPrefix(name);
              prefix = parts[0];
              name = parts[1];
              if (prefix) {
                plugin = callDep(prefix);
              }
            }

            //Using ridiculous property names for space reasons
            return {
              f: prefix ? prefix + '!' + name : name, //fullName
              n: name,
              pr: prefix,
              p: plugin
            };
          };

          function makeConfig(name) {
            return function () {
              return config && config.config && config.config[name] || {};
            };
          }

          handlers = {
            require: function require(name) {
              return makeRequire(name);
            },
            exports: function exports(name) {
              var e = defined[name];
              if (typeof e !== 'undefined') {
                return e;
              } else {
                return defined[name] = {};
              }
            },
            module: function module(name) {
              return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
              };
            }
          };

          main = function main(name, deps, callback, relName) {
            var cjsModule,
                depName,
                ret,
                map,
                i,
                args = [],
                callbackType = typeof callback === 'undefined' ? 'undefined' : _typeof(callback),
                usingExports;

            //Use name if no relName
            relName = relName || name;

            //Call the callback to define the module, if necessary.
            if (callbackType === 'undefined' || callbackType === 'function') {
              //Pull out the defined dependencies and pass the ordered
              //values to the callback.
              //Default to [require, exports, module] if no deps
              deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
              for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                  args[i] = handlers.require(name);
                } else if (depName === "exports") {
                  //CommonJS module spec 1.1
                  args[i] = handlers.exports(name);
                  usingExports = true;
                } else if (depName === "module") {
                  //CommonJS module spec 1.1
                  cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) || hasProp(waiting, depName) || hasProp(defining, depName)) {
                  args[i] = callDep(depName);
                } else if (map.p) {
                  map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                  args[i] = defined[depName];
                } else {
                  throw new Error(name + ' missing ' + depName);
                }
              }

              ret = callback ? callback.apply(defined[name], args) : undefined;

              if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name]) {
                  defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                  //Use the return value from the function.
                  defined[name] = ret;
                }
              }
            } else if (name) {
              //May just be an object definition for the module. Only
              //worry about defining if have a module name.
              defined[name] = callback;
            }
          };

          requirejs = require = _req = function req(deps, callback, relName, forceSync, alt) {
            if (typeof deps === "string") {
              if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
              }
              //Just return the module wanted. In this scenario, the
              //deps arg is the module name, and second arg (if passed)
              //is just the relName.
              //Normalize module name, if it contains . or ..
              return callDep(makeMap(deps, callback).f);
            } else if (!deps.splice) {
              //deps is a config object, not an array.
              config = deps;
              if (config.deps) {
                _req(config.deps, config.callback);
              }
              if (!callback) {
                return;
              }

              if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
              } else {
                deps = undef;
              }
            }

            //Support require(['a'])
            callback = callback || function () {};

            //If relName is a function, it is an errback handler,
            //so remove it.
            if (typeof relName === 'function') {
              relName = forceSync;
              forceSync = alt;
            }

            //Simulate async callback;
            if (forceSync) {
              main(undef, deps, callback, relName);
            } else {
              //Using a non-zero value because of concern for what old browsers
              //do, and latest browsers "upgrade" to 4 if lower value is used:
              //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
              //If want a value immediately, use require('id') instead -- something
              //that works in almond on the global level, but not guaranteed and
              //unlikely to work in other AMD implementations.
              setTimeout(function () {
                main(undef, deps, callback, relName);
              }, 4);
            }

            return _req;
          };

          /**
           * Just drops the config on the floor, but returns req in case
           * the config return value is used.
           */
          _req.config = function (cfg) {
            return _req(cfg);
          };

          /**
           * Expose module registry for debugging and tooling
           */
          requirejs._defined = defined;

          define = function define(name, deps, callback) {
            if (typeof name !== 'string') {
              throw new Error('See almond README: incorrect module build, no module name');
            }

            //This module may not have dependencies
            if (!deps.splice) {
              //deps is not an array, so probably means
              //an object literal or factory function for
              //the value. Adjust args.
              callback = deps;
              deps = [];
            }

            if (!hasProp(defined, name) && !hasProp(waiting, name)) {
              waiting[name] = [name, deps, callback];
            }
          };

          define.amd = {
            jQuery: true
          };
        })();

        S2.requirejs = requirejs;S2.require = require;S2.define = define;
      }
    })();
    S2.define("almond", function () {});

    /* global jQuery:false, $:false */
    S2.define('jquery', [], function () {
      var _$ = jQuery || $;

      if (_$ == null && console && console.error) {
        console.error('Select2: An instance of jQuery or a jQuery-compatible library was not ' + 'found. Make sure that you are including jQuery before Select2 on your ' + 'web page.');
      }

      return _$;
    });

    S2.define('select2/utils', ['jquery'], function ($) {
      var Utils = {};

      Utils.Extend = function (ChildClass, SuperClass) {
        var __hasProp = {}.hasOwnProperty;

        function BaseConstructor() {
          this.constructor = ChildClass;
        }

        for (var key in SuperClass) {
          if (__hasProp.call(SuperClass, key)) {
            ChildClass[key] = SuperClass[key];
          }
        }

        BaseConstructor.prototype = SuperClass.prototype;
        ChildClass.prototype = new BaseConstructor();
        ChildClass.__super__ = SuperClass.prototype;

        return ChildClass;
      };

      function getMethods(theClass) {
        var proto = theClass.prototype;

        var methods = [];

        for (var methodName in proto) {
          var m = proto[methodName];

          if (typeof m !== 'function') {
            continue;
          }

          if (methodName === 'constructor') {
            continue;
          }

          methods.push(methodName);
        }

        return methods;
      }

      Utils.Decorate = function (SuperClass, DecoratorClass) {
        var decoratedMethods = getMethods(DecoratorClass);
        var superMethods = getMethods(SuperClass);

        function DecoratedClass() {
          var unshift = Array.prototype.unshift;

          var argCount = DecoratorClass.prototype.constructor.length;

          var calledConstructor = SuperClass.prototype.constructor;

          if (argCount > 0) {
            unshift.call(arguments, SuperClass.prototype.constructor);

            calledConstructor = DecoratorClass.prototype.constructor;
          }

          calledConstructor.apply(this, arguments);
        }

        DecoratorClass.displayName = SuperClass.displayName;

        function ctr() {
          this.constructor = DecoratedClass;
        }

        DecoratedClass.prototype = new ctr();

        for (var m = 0; m < superMethods.length; m++) {
          var superMethod = superMethods[m];

          DecoratedClass.prototype[superMethod] = SuperClass.prototype[superMethod];
        }

        var calledMethod = function calledMethod(methodName) {
          // Stub out the original method if it's not decorating an actual method
          var originalMethod = function originalMethod() {};

          if (methodName in DecoratedClass.prototype) {
            originalMethod = DecoratedClass.prototype[methodName];
          }

          var decoratedMethod = DecoratorClass.prototype[methodName];

          return function () {
            var unshift = Array.prototype.unshift;

            unshift.call(arguments, originalMethod);

            return decoratedMethod.apply(this, arguments);
          };
        };

        for (var d = 0; d < decoratedMethods.length; d++) {
          var decoratedMethod = decoratedMethods[d];

          DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
        }

        return DecoratedClass;
      };

      var Observable = function Observable() {
        this.listeners = {};
      };

      Observable.prototype.on = function (event, callback) {
        this.listeners = this.listeners || {};

        if (event in this.listeners) {
          this.listeners[event].push(callback);
        } else {
          this.listeners[event] = [callback];
        }
      };

      Observable.prototype.trigger = function (event) {
        var slice = Array.prototype.slice;
        var params = slice.call(arguments, 1);

        this.listeners = this.listeners || {};

        // Params should always come in as an array
        if (params == null) {
          params = [];
        }

        // If there are no arguments to the event, use a temporary object
        if (params.length === 0) {
          params.push({});
        }

        // Set the `_type` of the first object to the event
        params[0]._type = event;

        if (event in this.listeners) {
          this.invoke(this.listeners[event], slice.call(arguments, 1));
        }

        if ('*' in this.listeners) {
          this.invoke(this.listeners['*'], arguments);
        }
      };

      Observable.prototype.invoke = function (listeners, params) {
        for (var i = 0, len = listeners.length; i < len; i++) {
          listeners[i].apply(this, params);
        }
      };

      Utils.Observable = Observable;

      Utils.generateChars = function (length) {
        var chars = '';

        for (var i = 0; i < length; i++) {
          var randomChar = Math.floor(Math.random() * 36);
          chars += randomChar.toString(36);
        }

        return chars;
      };

      Utils.bind = function (func, context) {
        return function () {
          func.apply(context, arguments);
        };
      };

      Utils._convertData = function (data) {
        for (var originalKey in data) {
          var keys = originalKey.split('-');

          var dataLevel = data;

          if (keys.length === 1) {
            continue;
          }

          for (var k = 0; k < keys.length; k++) {
            var key = keys[k];

            // Lowercase the first letter
            // By default, dash-separated becomes camelCase
            key = key.substring(0, 1).toLowerCase() + key.substring(1);

            if (!(key in dataLevel)) {
              dataLevel[key] = {};
            }

            if (k == keys.length - 1) {
              dataLevel[key] = data[originalKey];
            }

            dataLevel = dataLevel[key];
          }

          delete data[originalKey];
        }

        return data;
      };

      Utils.hasScroll = function (index, el) {
        // Adapted from the function created by @ShadowScripter
        // and adapted by @BillBarry on the Stack Exchange Code Review website.
        // The original code can be found at
        // http://codereview.stackexchange.com/q/13338
        // and was designed to be used with the Sizzle selector engine.

        var $el = $(el);
        var overflowX = el.style.overflowX;
        var overflowY = el.style.overflowY;

        //Check both x and y declarations
        if (overflowX === overflowY && (overflowY === 'hidden' || overflowY === 'visible')) {
          return false;
        }

        if (overflowX === 'scroll' || overflowY === 'scroll') {
          return true;
        }

        return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
      };

      Utils.escapeMarkup = function (markup) {
        var replaceMap = {
          '\\': '&#92;',
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          '\'': '&#39;',
          '/': '&#47;'
        };

        // Do not try to escape the markup if it's not a string
        if (typeof markup !== 'string') {
          return markup;
        }

        return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
          return replaceMap[match];
        });
      };

      // Append an array of jQuery nodes to a given element.
      Utils.appendMany = function ($element, $nodes) {
        // jQuery 1.7.x does not support $.fn.append() with an array
        // Fall back to a jQuery object collection using $.fn.add()
        if ($.fn.jquery.substr(0, 3) === '1.7') {
          var $jqNodes = $();

          $.map($nodes, function (node) {
            $jqNodes = $jqNodes.add(node);
          });

          $nodes = $jqNodes;
        }

        $element.append($nodes);
      };

      return Utils;
    });

    S2.define('select2/results', ['jquery', './utils'], function ($, Utils) {
      function Results($element, options, dataAdapter) {
        this.$element = $element;
        this.data = dataAdapter;
        this.options = options;

        Results.__super__.constructor.call(this);
      }

      Utils.Extend(Results, Utils.Observable);

      Results.prototype.render = function () {
        var $results = $('<ul class="select2-results__options" role="tree"></ul>');

        if (this.options.get('multiple')) {
          $results.attr('aria-multiselectable', 'true');
        }

        this.$results = $results;

        return $results;
      };

      Results.prototype.clear = function () {
        this.$results.empty();
      };

      Results.prototype.displayMessage = function (params) {
        var escapeMarkup = this.options.get('escapeMarkup');

        this.clear();
        this.hideLoading();

        var $message = $('<li role="treeitem" aria-live="assertive"' + ' class="select2-results__option"></li>');

        var message = this.options.get('translations').get(params.message);

        $message.append(escapeMarkup(message(params.args)));

        $message[0].className += ' select2-results__message';

        this.$results.append($message);
      };

      Results.prototype.hideMessages = function () {
        this.$results.find('.select2-results__message').remove();
      };

      Results.prototype.append = function (data) {
        this.hideLoading();

        var $options = [];

        if (data.results == null || data.results.length === 0) {
          if (this.$results.children().length === 0) {
            this.trigger('results:message', {
              message: 'noResults'
            });
          }

          return;
        }

        data.results = this.sort(data.results);

        for (var d = 0; d < data.results.length; d++) {
          var item = data.results[d];

          var $option = this.option(item);

          $options.push($option);
        }

        this.$results.append($options);
      };

      Results.prototype.position = function ($results, $dropdown) {
        var $resultsContainer = $dropdown.find('.select2-results');
        $resultsContainer.append($results);
      };

      Results.prototype.sort = function (data) {
        var sorter = this.options.get('sorter');

        return sorter(data);
      };

      Results.prototype.highlightFirstItem = function () {
        var $options = this.$results.find('.select2-results__option[aria-selected]');

        var $selected = $options.filter('[aria-selected=true]');

        // Check if there are any selected options
        if ($selected.length > 0) {
          // If there are selected options, highlight the first
          $selected.first().trigger('mouseenter');
        } else {
          // If there are no selected options, highlight the first option
          // in the dropdown
          $options.first().trigger('mouseenter');
        }

        this.ensureHighlightVisible();
      };

      Results.prototype.setClasses = function () {
        var self = this;

        this.data.current(function (selected) {
          var selectedIds = $.map(selected, function (s) {
            return s.id.toString();
          });

          var $options = self.$results.find('.select2-results__option[aria-selected]');

          $options.each(function () {
            var $option = $(this);

            var item = $.data(this, 'data');

            // id needs to be converted to a string when comparing
            var id = '' + item.id;

            if (item.element != null && item.element.selected || item.element == null && $.inArray(id, selectedIds) > -1) {
              $option.attr('aria-selected', 'true');
            } else {
              $option.attr('aria-selected', 'false');
            }
          });
        });
      };

      Results.prototype.showLoading = function (params) {
        this.hideLoading();

        var loadingMore = this.options.get('translations').get('searching');

        var loading = {
          disabled: true,
          loading: true,
          text: loadingMore(params)
        };
        var $loading = this.option(loading);
        $loading.className += ' loading-results';

        this.$results.prepend($loading);
      };

      Results.prototype.hideLoading = function () {
        this.$results.find('.loading-results').remove();
      };

      Results.prototype.option = function (data) {
        var option = document.createElement('li');
        option.className = 'select2-results__option';

        var attrs = {
          'role': 'treeitem',
          'aria-selected': 'false'
        };

        if (data.disabled) {
          delete attrs['aria-selected'];
          attrs['aria-disabled'] = 'true';
        }

        if (data.id == null) {
          delete attrs['aria-selected'];
        }

        if (data._resultId != null) {
          option.id = data._resultId;
        }

        if (data.title) {
          option.title = data.title;
        }

        if (data.children) {
          attrs.role = 'group';
          attrs['aria-label'] = data.text;
          delete attrs['aria-selected'];
        }

        for (var attr in attrs) {
          var val = attrs[attr];

          option.setAttribute(attr, val);
        }

        if (data.children) {
          var $option = $(option);

          var label = document.createElement('strong');
          label.className = 'select2-results__group';

          var $label = $(label);
          this.template(data, label);

          var $children = [];

          for (var c = 0; c < data.children.length; c++) {
            var child = data.children[c];

            var $child = this.option(child);

            $children.push($child);
          }

          var $childrenContainer = $('<ul></ul>', {
            'class': 'select2-results__options select2-results__options--nested'
          });

          $childrenContainer.append($children);

          $option.append(label);
          $option.append($childrenContainer);
        } else {
          this.template(data, option);
        }

        $.data(option, 'data', data);

        return option;
      };

      Results.prototype.bind = function (container, $container) {
        var self = this;

        var id = container.id + '-results';

        this.$results.attr('id', id);

        container.on('results:all', function (params) {
          self.clear();
          self.append(params.data);

          if (container.isOpen()) {
            self.setClasses();
            self.highlightFirstItem();
          }
        });

        container.on('results:append', function (params) {
          self.append(params.data);

          if (container.isOpen()) {
            self.setClasses();
          }
        });

        container.on('query', function (params) {
          self.hideMessages();
          self.showLoading(params);
        });

        container.on('select', function () {
          if (!container.isOpen()) {
            return;
          }

          self.setClasses();
          self.highlightFirstItem();
        });

        container.on('unselect', function () {
          if (!container.isOpen()) {
            return;
          }

          self.setClasses();
          self.highlightFirstItem();
        });

        container.on('open', function () {
          // When the dropdown is open, aria-expended="true"
          self.$results.attr('aria-expanded', 'true');
          self.$results.attr('aria-hidden', 'false');

          self.setClasses();
          self.ensureHighlightVisible();
        });

        container.on('close', function () {
          // When the dropdown is closed, aria-expended="false"
          self.$results.attr('aria-expanded', 'false');
          self.$results.attr('aria-hidden', 'true');
          self.$results.removeAttr('aria-activedescendant');
        });

        container.on('results:toggle', function () {
          var $highlighted = self.getHighlightedResults();

          if ($highlighted.length === 0) {
            return;
          }

          $highlighted.trigger('mouseup');
        });

        container.on('results:select', function () {
          var $highlighted = self.getHighlightedResults();

          if ($highlighted.length === 0) {
            return;
          }

          var data = $highlighted.data('data');

          if ($highlighted.attr('aria-selected') == 'true') {
            self.trigger('close', {});
          } else {
            self.trigger('select', {
              data: data
            });
          }
        });

        container.on('results:previous', function () {
          var $highlighted = self.getHighlightedResults();

          var $options = self.$results.find('[aria-selected]');

          var currentIndex = $options.index($highlighted);

          // If we are already at te top, don't move further
          if (currentIndex === 0) {
            return;
          }

          var nextIndex = currentIndex - 1;

          // If none are highlighted, highlight the first
          if ($highlighted.length === 0) {
            nextIndex = 0;
          }

          var $next = $options.eq(nextIndex);

          $next.trigger('mouseenter');

          var currentOffset = self.$results.offset().top;
          var nextTop = $next.offset().top;
          var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

          if (nextIndex === 0) {
            self.$results.scrollTop(0);
          } else if (nextTop - currentOffset < 0) {
            self.$results.scrollTop(nextOffset);
          }
        });

        container.on('results:next', function () {
          var $highlighted = self.getHighlightedResults();

          var $options = self.$results.find('[aria-selected]');

          var currentIndex = $options.index($highlighted);

          var nextIndex = currentIndex + 1;

          // If we are at the last option, stay there
          if (nextIndex >= $options.length) {
            return;
          }

          var $next = $options.eq(nextIndex);

          $next.trigger('mouseenter');

          var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
          var nextBottom = $next.offset().top + $next.outerHeight(false);
          var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

          if (nextIndex === 0) {
            self.$results.scrollTop(0);
          } else if (nextBottom > currentOffset) {
            self.$results.scrollTop(nextOffset);
          }
        });

        container.on('results:focus', function (params) {
          params.element.addClass('select2-results__option--highlighted');
        });

        container.on('results:message', function (params) {
          self.displayMessage(params);
        });

        if ($.fn.mousewheel) {
          this.$results.on('mousewheel', function (e) {
            var top = self.$results.scrollTop();

            var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

            var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
            var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

            if (isAtTop) {
              self.$results.scrollTop(0);

              e.preventDefault();
              e.stopPropagation();
            } else if (isAtBottom) {
              self.$results.scrollTop(self.$results.get(0).scrollHeight - self.$results.height());

              e.preventDefault();
              e.stopPropagation();
            }
          });
        }

        this.$results.on('mouseup', '.select2-results__option[aria-selected]', function (evt) {
          var $this = $(this);

          var data = $this.data('data');

          if ($this.attr('aria-selected') === 'true') {
            if (self.options.get('multiple')) {
              self.trigger('unselect', {
                originalEvent: evt,
                data: data
              });
            } else {
              self.trigger('close', {});
            }

            return;
          }

          self.trigger('select', {
            originalEvent: evt,
            data: data
          });
        });

        this.$results.on('mouseenter', '.select2-results__option[aria-selected]', function (evt) {
          var data = $(this).data('data');

          self.getHighlightedResults().removeClass('select2-results__option--highlighted');

          self.trigger('results:focus', {
            data: data,
            element: $(this)
          });
        });
      };

      Results.prototype.getHighlightedResults = function () {
        var $highlighted = this.$results.find('.select2-results__option--highlighted');

        return $highlighted;
      };

      Results.prototype.destroy = function () {
        this.$results.remove();
      };

      Results.prototype.ensureHighlightVisible = function () {
        var $highlighted = this.getHighlightedResults();

        if ($highlighted.length === 0) {
          return;
        }

        var $options = this.$results.find('[aria-selected]');

        var currentIndex = $options.index($highlighted);

        var currentOffset = this.$results.offset().top;
        var nextTop = $highlighted.offset().top;
        var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

        var offsetDelta = nextTop - currentOffset;
        nextOffset -= $highlighted.outerHeight(false) * 2;

        if (currentIndex <= 2) {
          this.$results.scrollTop(0);
        } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
          this.$results.scrollTop(nextOffset);
        }
      };

      Results.prototype.template = function (result, container) {
        var template = this.options.get('templateResult');
        var escapeMarkup = this.options.get('escapeMarkup');

        var content = template(result, container);

        if (content == null) {
          container.style.display = 'none';
        } else if (typeof content === 'string') {
          container.innerHTML = escapeMarkup(content);
        } else {
          $(container).append(content);
        }
      };

      return Results;
    });

    S2.define('select2/keys', [], function () {
      var KEYS = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
      };

      return KEYS;
    });

    S2.define('select2/selection/base', ['jquery', '../utils', '../keys'], function ($, Utils, KEYS) {
      function BaseSelection($element, options) {
        this.$element = $element;
        this.options = options;

        BaseSelection.__super__.constructor.call(this);
      }

      Utils.Extend(BaseSelection, Utils.Observable);

      BaseSelection.prototype.render = function () {
        var $selection = $('<span class="select2-selection" role="combobox" ' + ' aria-haspopup="true" aria-expanded="false">' + '</span>');

        this._tabindex = 0;

        if (this.$element.data('old-tabindex') != null) {
          this._tabindex = this.$element.data('old-tabindex');
        } else if (this.$element.attr('tabindex') != null) {
          this._tabindex = this.$element.attr('tabindex');
        }

        $selection.attr('title', this.$element.attr('title'));
        $selection.attr('tabindex', this._tabindex);

        this.$selection = $selection;

        return $selection;
      };

      BaseSelection.prototype.bind = function (container, $container) {
        var self = this;

        var id = container.id + '-container';
        var resultsId = container.id + '-results';

        this.container = container;

        this.$selection.on('focus', function (evt) {
          self.trigger('focus', evt);
        });

        this.$selection.on('blur', function (evt) {
          self._handleBlur(evt);
        });

        this.$selection.on('keydown', function (evt) {
          self.trigger('keypress', evt);

          if (evt.which === KEYS.SPACE) {
            evt.preventDefault();
          }
        });

        container.on('results:focus', function (params) {
          self.$selection.attr('aria-activedescendant', params.data._resultId);
        });

        container.on('selection:update', function (params) {
          self.update(params.data);
        });

        container.on('open', function () {
          // When the dropdown is open, aria-expanded="true"
          self.$selection.attr('aria-expanded', 'true');
          self.$selection.attr('aria-owns', resultsId);

          self._attachCloseHandler(container);
        });

        container.on('close', function () {
          // When the dropdown is closed, aria-expanded="false"
          self.$selection.attr('aria-expanded', 'false');
          self.$selection.removeAttr('aria-activedescendant');
          self.$selection.removeAttr('aria-owns');

          self.$selection.focus();

          self._detachCloseHandler(container);
        });

        container.on('enable', function () {
          self.$selection.attr('tabindex', self._tabindex);
        });

        container.on('disable', function () {
          self.$selection.attr('tabindex', '-1');
        });
      };

      BaseSelection.prototype._handleBlur = function (evt) {
        var self = this;

        // This needs to be delayed as the active element is the body when the tab
        // key is pressed, possibly along with others.
        window.setTimeout(function () {
          // Don't trigger `blur` if the focus is still in the selection
          if (document.activeElement == self.$selection[0] || $.contains(self.$selection[0], document.activeElement)) {
            return;
          }

          self.trigger('blur', evt);
        }, 1);
      };

      BaseSelection.prototype._attachCloseHandler = function (container) {
        var self = this;

        $(document.body).on('mousedown.select2.' + container.id, function (e) {
          var $target = $(e.target);

          var $select = $target.closest('.select2');

          var $all = $('.select2.select2-container--open');

          $all.each(function () {
            var $this = $(this);

            if (this == $select[0]) {
              return;
            }

            var $element = $this.data('element');

            $element.select2('close');
          });
        });
      };

      BaseSelection.prototype._detachCloseHandler = function (container) {
        $(document.body).off('mousedown.select2.' + container.id);
      };

      BaseSelection.prototype.position = function ($selection, $container) {
        var $selectionContainer = $container.find('.selection');
        $selectionContainer.append($selection);
      };

      BaseSelection.prototype.destroy = function () {
        this._detachCloseHandler(this.container);
      };

      BaseSelection.prototype.update = function (data) {
        throw new Error('The `update` method must be defined in child classes.');
      };

      return BaseSelection;
    });

    S2.define('select2/selection/single', ['jquery', './base', '../utils', '../keys'], function ($, BaseSelection, Utils, KEYS) {
      function SingleSelection() {
        SingleSelection.__super__.constructor.apply(this, arguments);
      }

      Utils.Extend(SingleSelection, BaseSelection);

      SingleSelection.prototype.render = function () {
        var $selection = SingleSelection.__super__.render.call(this);

        $selection.addClass('select2-selection--single');

        $selection.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + '</span>');

        return $selection;
      };

      SingleSelection.prototype.bind = function (container, $container) {
        var self = this;

        SingleSelection.__super__.bind.apply(this, arguments);

        var id = container.id + '-container';

        this.$selection.find('.select2-selection__rendered').attr('id', id);
        this.$selection.attr('aria-labelledby', id);

        this.$selection.on('mousedown', function (evt) {
          // Only respond to left clicks
          if (evt.which !== 1) {
            return;
          }

          self.trigger('toggle', {
            originalEvent: evt
          });
        });

        this.$selection.on('focus', function (evt) {
          // User focuses on the container
        });

        this.$selection.on('blur', function (evt) {
          // User exits the container
        });

        container.on('focus', function (evt) {
          if (!container.isOpen()) {
            self.$selection.focus();
          }
        });

        container.on('selection:update', function (params) {
          self.update(params.data);
        });
      };

      SingleSelection.prototype.clear = function () {
        this.$selection.find('.select2-selection__rendered').empty();
      };

      SingleSelection.prototype.display = function (data, container) {
        var template = this.options.get('templateSelection');
        var escapeMarkup = this.options.get('escapeMarkup');

        return escapeMarkup(template(data, container));
      };

      SingleSelection.prototype.selectionContainer = function () {
        return $('<span></span>');
      };

      SingleSelection.prototype.update = function (data) {
        if (data.length === 0) {
          this.clear();
          return;
        }

        var selection = data[0];

        var $rendered = this.$selection.find('.select2-selection__rendered');
        var formatted = this.display(selection, $rendered);

        $rendered.empty().append(formatted);
        $rendered.prop('title', selection.title || selection.text);
      };

      return SingleSelection;
    });

    S2.define('select2/selection/multiple', ['jquery', './base', '../utils'], function ($, BaseSelection, Utils) {
      function MultipleSelection($element, options) {
        MultipleSelection.__super__.constructor.apply(this, arguments);
      }

      Utils.Extend(MultipleSelection, BaseSelection);

      MultipleSelection.prototype.render = function () {
        var $selection = MultipleSelection.__super__.render.call(this);

        $selection.addClass('select2-selection--multiple');

        $selection.html('<ul class="select2-selection__rendered"></ul>');

        return $selection;
      };

      MultipleSelection.prototype.bind = function (container, $container) {
        var self = this;

        MultipleSelection.__super__.bind.apply(this, arguments);

        this.$selection.on('click', function (evt) {
          self.trigger('toggle', {
            originalEvent: evt
          });
        });

        this.$selection.on('click', '.select2-selection__choice__remove', function (evt) {
          // Ignore the event if it is disabled
          if (self.options.get('disabled')) {
            return;
          }

          var $remove = $(this);
          var $selection = $remove.parent();

          var data = $selection.data('data');

          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        });
      };

      MultipleSelection.prototype.clear = function () {
        this.$selection.find('.select2-selection__rendered').empty();
      };

      MultipleSelection.prototype.display = function (data, container) {
        var template = this.options.get('templateSelection');
        var escapeMarkup = this.options.get('escapeMarkup');

        return escapeMarkup(template(data, container));
      };

      MultipleSelection.prototype.selectionContainer = function () {
        var $container = $('<li class="select2-selection__choice">' + '<span class="select2-selection__choice__remove" role="presentation">' + '&times;' + '</span>' + '</li>');

        return $container;
      };

      MultipleSelection.prototype.update = function (data) {
        this.clear();

        if (data.length === 0) {
          return;
        }

        var $selections = [];

        for (var d = 0; d < data.length; d++) {
          var selection = data[d];

          var $selection = this.selectionContainer();
          var formatted = this.display(selection, $selection);

          $selection.append(formatted);
          $selection.prop('title', selection.title || selection.text);

          $selection.data('data', selection);

          $selections.push($selection);
        }

        var $rendered = this.$selection.find('.select2-selection__rendered');

        Utils.appendMany($rendered, $selections);
      };

      return MultipleSelection;
    });

    S2.define('select2/selection/placeholder', ['../utils'], function (Utils) {
      function Placeholder(decorated, $element, options) {
        this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

        decorated.call(this, $element, options);
      }

      Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
        if (typeof placeholder === 'string') {
          placeholder = {
            id: '',
            text: placeholder
          };
        }

        return placeholder;
      };

      Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
        var $placeholder = this.selectionContainer();

        $placeholder.html(this.display(placeholder));
        $placeholder.addClass('select2-selection__placeholder').removeClass('select2-selection__choice');

        return $placeholder;
      };

      Placeholder.prototype.update = function (decorated, data) {
        var singlePlaceholder = data.length == 1 && data[0].id != this.placeholder.id;
        var multipleSelections = data.length > 1;

        if (multipleSelections || singlePlaceholder) {
          return decorated.call(this, data);
        }

        this.clear();

        var $placeholder = this.createPlaceholder(this.placeholder);

        this.$selection.find('.select2-selection__rendered').append($placeholder);
      };

      return Placeholder;
    });

    S2.define('select2/selection/allowClear', ['jquery', '../keys'], function ($, KEYS) {
      function AllowClear() {}

      AllowClear.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        if (this.placeholder == null) {
          if (this.options.get('debug') && window.console && console.error) {
            console.error('Select2: The `allowClear` option should be used in combination ' + 'with the `placeholder` option.');
          }
        }

        this.$selection.on('mousedown', '.select2-selection__clear', function (evt) {
          self._handleClear(evt);
        });

        container.on('keypress', function (evt) {
          self._handleKeyboardClear(evt, container);
        });
      };

      AllowClear.prototype._handleClear = function (_, evt) {
        // Ignore the event if it is disabled
        if (this.options.get('disabled')) {
          return;
        }

        var $clear = this.$selection.find('.select2-selection__clear');

        // Ignore the event if nothing has been selected
        if ($clear.length === 0) {
          return;
        }

        evt.stopPropagation();

        var data = $clear.data('data');

        for (var d = 0; d < data.length; d++) {
          var unselectData = {
            data: data[d]
          };

          // Trigger the `unselect` event, so people can prevent it from being
          // cleared.
          this.trigger('unselect', unselectData);

          // If the event was prevented, don't clear it out.
          if (unselectData.prevented) {
            return;
          }
        }

        this.$element.val(this.placeholder.id).trigger('change');

        this.trigger('toggle', {});
      };

      AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
        if (container.isOpen()) {
          return;
        }

        if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
          this._handleClear(evt);
        }
      };

      AllowClear.prototype.update = function (decorated, data) {
        decorated.call(this, data);

        if (this.$selection.find('.select2-selection__placeholder').length > 0 || data.length === 0) {
          return;
        }

        var $remove = $('<span class="select2-selection__clear">' + '&times;' + '</span>');
        $remove.data('data', data);

        this.$selection.find('.select2-selection__rendered').prepend($remove);
      };

      return AllowClear;
    });

    S2.define('select2/selection/search', ['jquery', '../utils', '../keys'], function ($, Utils, KEYS) {
      function Search(decorated, $element, options) {
        decorated.call(this, $element, options);
      }

      Search.prototype.render = function (decorated) {
        var $search = $('<li class="select2-search select2-search--inline">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="off"' + ' spellcheck="false" role="textbox" aria-autocomplete="list" />' + '</li>');

        this.$searchContainer = $search;
        this.$search = $search.find('input');

        var $rendered = decorated.call(this);

        this._transferTabIndex();

        return $rendered;
      };

      Search.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('open', function () {
          self.$search.trigger('focus');
        });

        container.on('close', function () {
          self.$search.val('');
          self.$search.removeAttr('aria-activedescendant');
          self.$search.trigger('focus');
        });

        container.on('enable', function () {
          self.$search.prop('disabled', false);

          self._transferTabIndex();
        });

        container.on('disable', function () {
          self.$search.prop('disabled', true);
        });

        container.on('focus', function (evt) {
          self.$search.trigger('focus');
        });

        container.on('results:focus', function (params) {
          self.$search.attr('aria-activedescendant', params.id);
        });

        this.$selection.on('focusin', '.select2-search--inline', function (evt) {
          self.trigger('focus', evt);
        });

        this.$selection.on('focusout', '.select2-search--inline', function (evt) {
          self._handleBlur(evt);
        });

        this.$selection.on('keydown', '.select2-search--inline', function (evt) {
          evt.stopPropagation();

          self.trigger('keypress', evt);

          self._keyUpPrevented = evt.isDefaultPrevented();

          var key = evt.which;

          if (key === KEYS.BACKSPACE && self.$search.val() === '') {
            var $previousChoice = self.$searchContainer.prev('.select2-selection__choice');

            if ($previousChoice.length > 0) {
              var item = $previousChoice.data('data');

              self.searchRemoveChoice(item);

              evt.preventDefault();
            }
          }
        });

        // Try to detect the IE version should the `documentMode` property that
        // is stored on the document. This is only implemented in IE and is
        // slightly cleaner than doing a user agent check.
        // This property is not available in Edge, but Edge also doesn't have
        // this bug.
        var msie = document.documentMode;
        var disableInputEvents = msie && msie <= 11;

        // Workaround for browsers which do not support the `input` event
        // This will prevent double-triggering of events for browsers which support
        // both the `keyup` and `input` events.
        this.$selection.on('input.searchcheck', '.select2-search--inline', function (evt) {
          // IE will trigger the `input` event when a placeholder is used on a
          // search box. To get around this issue, we are forced to ignore all
          // `input` events in IE and keep using `keyup`.
          if (disableInputEvents) {
            self.$selection.off('input.search input.searchcheck');
            return;
          }

          // Unbind the duplicated `keyup` event
          self.$selection.off('keyup.search');
        });

        this.$selection.on('keyup.search input.search', '.select2-search--inline', function (evt) {
          // IE will trigger the `input` event when a placeholder is used on a
          // search box. To get around this issue, we are forced to ignore all
          // `input` events in IE and keep using `keyup`.
          if (disableInputEvents && evt.type === 'input') {
            self.$selection.off('input.search input.searchcheck');
            return;
          }

          var key = evt.which;

          // We can freely ignore events from modifier keys
          if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
            return;
          }

          // Tabbing will be handled during the `keydown` phase
          if (key == KEYS.TAB) {
            return;
          }

          self.handleSearch(evt);
        });
      };

      /**
       * This method will transfer the tabindex attribute from the rendered
       * selection to the search box. This allows for the search box to be used as
       * the primary focus instead of the selection container.
       *
       * @private
       */
      Search.prototype._transferTabIndex = function (decorated) {
        this.$search.attr('tabindex', this.$selection.attr('tabindex'));
        this.$selection.attr('tabindex', '-1');
      };

      Search.prototype.createPlaceholder = function (decorated, placeholder) {
        this.$search.attr('placeholder', placeholder.text);
      };

      Search.prototype.update = function (decorated, data) {
        var searchHadFocus = this.$search[0] == document.activeElement;

        this.$search.attr('placeholder', '');

        decorated.call(this, data);

        this.$selection.find('.select2-selection__rendered').append(this.$searchContainer);

        this.resizeSearch();
        if (searchHadFocus) {
          this.$search.focus();
        }
      };

      Search.prototype.handleSearch = function () {
        this.resizeSearch();

        if (!this._keyUpPrevented) {
          var input = this.$search.val();

          this.trigger('query', {
            term: input
          });
        }

        this._keyUpPrevented = false;
      };

      Search.prototype.searchRemoveChoice = function (decorated, item) {
        this.trigger('unselect', {
          data: item
        });

        this.$search.val(item.text);
        this.handleSearch();
      };

      Search.prototype.resizeSearch = function () {
        this.$search.css('width', '25px');

        var width = '';

        if (this.$search.attr('placeholder') !== '') {
          width = this.$selection.find('.select2-selection__rendered').innerWidth();
        } else {
          var minimumWidth = this.$search.val().length + 1;

          width = minimumWidth * 0.75 + 'em';
        }

        this.$search.css('width', width);
      };

      return Search;
    });

    S2.define('select2/selection/eventRelay', ['jquery'], function ($) {
      function EventRelay() {}

      EventRelay.prototype.bind = function (decorated, container, $container) {
        var self = this;
        var relayEvents = ['open', 'opening', 'close', 'closing', 'select', 'selecting', 'unselect', 'unselecting'];

        var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting'];

        decorated.call(this, container, $container);

        container.on('*', function (name, params) {
          // Ignore events that should not be relayed
          if ($.inArray(name, relayEvents) === -1) {
            return;
          }

          // The parameters should always be an object
          params = params || {};

          // Generate the jQuery event for the Select2 event
          var evt = $.Event('select2:' + name, {
            params: params
          });

          self.$element.trigger(evt);

          // Only handle preventable events if it was one
          if ($.inArray(name, preventableEvents) === -1) {
            return;
          }

          params.prevented = evt.isDefaultPrevented();
        });
      };

      return EventRelay;
    });

    S2.define('select2/translation', ['jquery', 'require'], function ($, require) {
      function Translation(dict) {
        this.dict = dict || {};
      }

      Translation.prototype.all = function () {
        return this.dict;
      };

      Translation.prototype.get = function (key) {
        return this.dict[key];
      };

      Translation.prototype.extend = function (translation) {
        this.dict = $.extend({}, translation.all(), this.dict);
      };

      // Static functions

      Translation._cache = {};

      Translation.loadPath = function (path) {
        if (!(path in Translation._cache)) {
          var translations = require(path);

          Translation._cache[path] = translations;
        }

        return new Translation(Translation._cache[path]);
      };

      return Translation;
    });

    S2.define('select2/diacritics', [], function () {
      var diacritics = {
        '\u24B6': 'A',
        '\uFF21': 'A',
        '\xC0': 'A',
        '\xC1': 'A',
        '\xC2': 'A',
        '\u1EA6': 'A',
        '\u1EA4': 'A',
        '\u1EAA': 'A',
        '\u1EA8': 'A',
        '\xC3': 'A',
        '\u0100': 'A',
        '\u0102': 'A',
        '\u1EB0': 'A',
        '\u1EAE': 'A',
        '\u1EB4': 'A',
        '\u1EB2': 'A',
        '\u0226': 'A',
        '\u01E0': 'A',
        '\xC4': 'A',
        '\u01DE': 'A',
        '\u1EA2': 'A',
        '\xC5': 'A',
        '\u01FA': 'A',
        '\u01CD': 'A',
        '\u0200': 'A',
        '\u0202': 'A',
        '\u1EA0': 'A',
        '\u1EAC': 'A',
        '\u1EB6': 'A',
        '\u1E00': 'A',
        '\u0104': 'A',
        '\u023A': 'A',
        '\u2C6F': 'A',
        '\uA732': 'AA',
        '\xC6': 'AE',
        '\u01FC': 'AE',
        '\u01E2': 'AE',
        '\uA734': 'AO',
        '\uA736': 'AU',
        '\uA738': 'AV',
        '\uA73A': 'AV',
        '\uA73C': 'AY',
        '\u24B7': 'B',
        '\uFF22': 'B',
        '\u1E02': 'B',
        '\u1E04': 'B',
        '\u1E06': 'B',
        '\u0243': 'B',
        '\u0182': 'B',
        '\u0181': 'B',
        '\u24B8': 'C',
        '\uFF23': 'C',
        '\u0106': 'C',
        '\u0108': 'C',
        '\u010A': 'C',
        '\u010C': 'C',
        '\xC7': 'C',
        '\u1E08': 'C',
        '\u0187': 'C',
        '\u023B': 'C',
        '\uA73E': 'C',
        '\u24B9': 'D',
        '\uFF24': 'D',
        '\u1E0A': 'D',
        '\u010E': 'D',
        '\u1E0C': 'D',
        '\u1E10': 'D',
        '\u1E12': 'D',
        '\u1E0E': 'D',
        '\u0110': 'D',
        '\u018B': 'D',
        '\u018A': 'D',
        '\u0189': 'D',
        '\uA779': 'D',
        '\u01F1': 'DZ',
        '\u01C4': 'DZ',
        '\u01F2': 'Dz',
        '\u01C5': 'Dz',
        '\u24BA': 'E',
        '\uFF25': 'E',
        '\xC8': 'E',
        '\xC9': 'E',
        '\xCA': 'E',
        '\u1EC0': 'E',
        '\u1EBE': 'E',
        '\u1EC4': 'E',
        '\u1EC2': 'E',
        '\u1EBC': 'E',
        '\u0112': 'E',
        '\u1E14': 'E',
        '\u1E16': 'E',
        '\u0114': 'E',
        '\u0116': 'E',
        '\xCB': 'E',
        '\u1EBA': 'E',
        '\u011A': 'E',
        '\u0204': 'E',
        '\u0206': 'E',
        '\u1EB8': 'E',
        '\u1EC6': 'E',
        '\u0228': 'E',
        '\u1E1C': 'E',
        '\u0118': 'E',
        '\u1E18': 'E',
        '\u1E1A': 'E',
        '\u0190': 'E',
        '\u018E': 'E',
        '\u24BB': 'F',
        '\uFF26': 'F',
        '\u1E1E': 'F',
        '\u0191': 'F',
        '\uA77B': 'F',
        '\u24BC': 'G',
        '\uFF27': 'G',
        '\u01F4': 'G',
        '\u011C': 'G',
        '\u1E20': 'G',
        '\u011E': 'G',
        '\u0120': 'G',
        '\u01E6': 'G',
        '\u0122': 'G',
        '\u01E4': 'G',
        '\u0193': 'G',
        '\uA7A0': 'G',
        '\uA77D': 'G',
        '\uA77E': 'G',
        '\u24BD': 'H',
        '\uFF28': 'H',
        '\u0124': 'H',
        '\u1E22': 'H',
        '\u1E26': 'H',
        '\u021E': 'H',
        '\u1E24': 'H',
        '\u1E28': 'H',
        '\u1E2A': 'H',
        '\u0126': 'H',
        '\u2C67': 'H',
        '\u2C75': 'H',
        '\uA78D': 'H',
        '\u24BE': 'I',
        '\uFF29': 'I',
        '\xCC': 'I',
        '\xCD': 'I',
        '\xCE': 'I',
        '\u0128': 'I',
        '\u012A': 'I',
        '\u012C': 'I',
        '\u0130': 'I',
        '\xCF': 'I',
        '\u1E2E': 'I',
        '\u1EC8': 'I',
        '\u01CF': 'I',
        '\u0208': 'I',
        '\u020A': 'I',
        '\u1ECA': 'I',
        '\u012E': 'I',
        '\u1E2C': 'I',
        '\u0197': 'I',
        '\u24BF': 'J',
        '\uFF2A': 'J',
        '\u0134': 'J',
        '\u0248': 'J',
        '\u24C0': 'K',
        '\uFF2B': 'K',
        '\u1E30': 'K',
        '\u01E8': 'K',
        '\u1E32': 'K',
        '\u0136': 'K',
        '\u1E34': 'K',
        '\u0198': 'K',
        '\u2C69': 'K',
        '\uA740': 'K',
        '\uA742': 'K',
        '\uA744': 'K',
        '\uA7A2': 'K',
        '\u24C1': 'L',
        '\uFF2C': 'L',
        '\u013F': 'L',
        '\u0139': 'L',
        '\u013D': 'L',
        '\u1E36': 'L',
        '\u1E38': 'L',
        '\u013B': 'L',
        '\u1E3C': 'L',
        '\u1E3A': 'L',
        '\u0141': 'L',
        '\u023D': 'L',
        '\u2C62': 'L',
        '\u2C60': 'L',
        '\uA748': 'L',
        '\uA746': 'L',
        '\uA780': 'L',
        '\u01C7': 'LJ',
        '\u01C8': 'Lj',
        '\u24C2': 'M',
        '\uFF2D': 'M',
        '\u1E3E': 'M',
        '\u1E40': 'M',
        '\u1E42': 'M',
        '\u2C6E': 'M',
        '\u019C': 'M',
        '\u24C3': 'N',
        '\uFF2E': 'N',
        '\u01F8': 'N',
        '\u0143': 'N',
        '\xD1': 'N',
        '\u1E44': 'N',
        '\u0147': 'N',
        '\u1E46': 'N',
        '\u0145': 'N',
        '\u1E4A': 'N',
        '\u1E48': 'N',
        '\u0220': 'N',
        '\u019D': 'N',
        '\uA790': 'N',
        '\uA7A4': 'N',
        '\u01CA': 'NJ',
        '\u01CB': 'Nj',
        '\u24C4': 'O',
        '\uFF2F': 'O',
        '\xD2': 'O',
        '\xD3': 'O',
        '\xD4': 'O',
        '\u1ED2': 'O',
        '\u1ED0': 'O',
        '\u1ED6': 'O',
        '\u1ED4': 'O',
        '\xD5': 'O',
        '\u1E4C': 'O',
        '\u022C': 'O',
        '\u1E4E': 'O',
        '\u014C': 'O',
        '\u1E50': 'O',
        '\u1E52': 'O',
        '\u014E': 'O',
        '\u022E': 'O',
        '\u0230': 'O',
        '\xD6': 'O',
        '\u022A': 'O',
        '\u1ECE': 'O',
        '\u0150': 'O',
        '\u01D1': 'O',
        '\u020C': 'O',
        '\u020E': 'O',
        '\u01A0': 'O',
        '\u1EDC': 'O',
        '\u1EDA': 'O',
        '\u1EE0': 'O',
        '\u1EDE': 'O',
        '\u1EE2': 'O',
        '\u1ECC': 'O',
        '\u1ED8': 'O',
        '\u01EA': 'O',
        '\u01EC': 'O',
        '\xD8': 'O',
        '\u01FE': 'O',
        '\u0186': 'O',
        '\u019F': 'O',
        '\uA74A': 'O',
        '\uA74C': 'O',
        '\u01A2': 'OI',
        '\uA74E': 'OO',
        '\u0222': 'OU',
        '\u24C5': 'P',
        '\uFF30': 'P',
        '\u1E54': 'P',
        '\u1E56': 'P',
        '\u01A4': 'P',
        '\u2C63': 'P',
        '\uA750': 'P',
        '\uA752': 'P',
        '\uA754': 'P',
        '\u24C6': 'Q',
        '\uFF31': 'Q',
        '\uA756': 'Q',
        '\uA758': 'Q',
        '\u024A': 'Q',
        '\u24C7': 'R',
        '\uFF32': 'R',
        '\u0154': 'R',
        '\u1E58': 'R',
        '\u0158': 'R',
        '\u0210': 'R',
        '\u0212': 'R',
        '\u1E5A': 'R',
        '\u1E5C': 'R',
        '\u0156': 'R',
        '\u1E5E': 'R',
        '\u024C': 'R',
        '\u2C64': 'R',
        '\uA75A': 'R',
        '\uA7A6': 'R',
        '\uA782': 'R',
        '\u24C8': 'S',
        '\uFF33': 'S',
        '\u1E9E': 'S',
        '\u015A': 'S',
        '\u1E64': 'S',
        '\u015C': 'S',
        '\u1E60': 'S',
        '\u0160': 'S',
        '\u1E66': 'S',
        '\u1E62': 'S',
        '\u1E68': 'S',
        '\u0218': 'S',
        '\u015E': 'S',
        '\u2C7E': 'S',
        '\uA7A8': 'S',
        '\uA784': 'S',
        '\u24C9': 'T',
        '\uFF34': 'T',
        '\u1E6A': 'T',
        '\u0164': 'T',
        '\u1E6C': 'T',
        '\u021A': 'T',
        '\u0162': 'T',
        '\u1E70': 'T',
        '\u1E6E': 'T',
        '\u0166': 'T',
        '\u01AC': 'T',
        '\u01AE': 'T',
        '\u023E': 'T',
        '\uA786': 'T',
        '\uA728': 'TZ',
        '\u24CA': 'U',
        '\uFF35': 'U',
        '\xD9': 'U',
        '\xDA': 'U',
        '\xDB': 'U',
        '\u0168': 'U',
        '\u1E78': 'U',
        '\u016A': 'U',
        '\u1E7A': 'U',
        '\u016C': 'U',
        '\xDC': 'U',
        '\u01DB': 'U',
        '\u01D7': 'U',
        '\u01D5': 'U',
        '\u01D9': 'U',
        '\u1EE6': 'U',
        '\u016E': 'U',
        '\u0170': 'U',
        '\u01D3': 'U',
        '\u0214': 'U',
        '\u0216': 'U',
        '\u01AF': 'U',
        '\u1EEA': 'U',
        '\u1EE8': 'U',
        '\u1EEE': 'U',
        '\u1EEC': 'U',
        '\u1EF0': 'U',
        '\u1EE4': 'U',
        '\u1E72': 'U',
        '\u0172': 'U',
        '\u1E76': 'U',
        '\u1E74': 'U',
        '\u0244': 'U',
        '\u24CB': 'V',
        '\uFF36': 'V',
        '\u1E7C': 'V',
        '\u1E7E': 'V',
        '\u01B2': 'V',
        '\uA75E': 'V',
        '\u0245': 'V',
        '\uA760': 'VY',
        '\u24CC': 'W',
        '\uFF37': 'W',
        '\u1E80': 'W',
        '\u1E82': 'W',
        '\u0174': 'W',
        '\u1E86': 'W',
        '\u1E84': 'W',
        '\u1E88': 'W',
        '\u2C72': 'W',
        '\u24CD': 'X',
        '\uFF38': 'X',
        '\u1E8A': 'X',
        '\u1E8C': 'X',
        '\u24CE': 'Y',
        '\uFF39': 'Y',
        '\u1EF2': 'Y',
        '\xDD': 'Y',
        '\u0176': 'Y',
        '\u1EF8': 'Y',
        '\u0232': 'Y',
        '\u1E8E': 'Y',
        '\u0178': 'Y',
        '\u1EF6': 'Y',
        '\u1EF4': 'Y',
        '\u01B3': 'Y',
        '\u024E': 'Y',
        '\u1EFE': 'Y',
        '\u24CF': 'Z',
        '\uFF3A': 'Z',
        '\u0179': 'Z',
        '\u1E90': 'Z',
        '\u017B': 'Z',
        '\u017D': 'Z',
        '\u1E92': 'Z',
        '\u1E94': 'Z',
        '\u01B5': 'Z',
        '\u0224': 'Z',
        '\u2C7F': 'Z',
        '\u2C6B': 'Z',
        '\uA762': 'Z',
        '\u24D0': 'a',
        '\uFF41': 'a',
        '\u1E9A': 'a',
        '\xE0': 'a',
        '\xE1': 'a',
        '\xE2': 'a',
        '\u1EA7': 'a',
        '\u1EA5': 'a',
        '\u1EAB': 'a',
        '\u1EA9': 'a',
        '\xE3': 'a',
        '\u0101': 'a',
        '\u0103': 'a',
        '\u1EB1': 'a',
        '\u1EAF': 'a',
        '\u1EB5': 'a',
        '\u1EB3': 'a',
        '\u0227': 'a',
        '\u01E1': 'a',
        '\xE4': 'a',
        '\u01DF': 'a',
        '\u1EA3': 'a',
        '\xE5': 'a',
        '\u01FB': 'a',
        '\u01CE': 'a',
        '\u0201': 'a',
        '\u0203': 'a',
        '\u1EA1': 'a',
        '\u1EAD': 'a',
        '\u1EB7': 'a',
        '\u1E01': 'a',
        '\u0105': 'a',
        '\u2C65': 'a',
        '\u0250': 'a',
        '\uA733': 'aa',
        '\xE6': 'ae',
        '\u01FD': 'ae',
        '\u01E3': 'ae',
        '\uA735': 'ao',
        '\uA737': 'au',
        '\uA739': 'av',
        '\uA73B': 'av',
        '\uA73D': 'ay',
        '\u24D1': 'b',
        '\uFF42': 'b',
        '\u1E03': 'b',
        '\u1E05': 'b',
        '\u1E07': 'b',
        '\u0180': 'b',
        '\u0183': 'b',
        '\u0253': 'b',
        '\u24D2': 'c',
        '\uFF43': 'c',
        '\u0107': 'c',
        '\u0109': 'c',
        '\u010B': 'c',
        '\u010D': 'c',
        '\xE7': 'c',
        '\u1E09': 'c',
        '\u0188': 'c',
        '\u023C': 'c',
        '\uA73F': 'c',
        '\u2184': 'c',
        '\u24D3': 'd',
        '\uFF44': 'd',
        '\u1E0B': 'd',
        '\u010F': 'd',
        '\u1E0D': 'd',
        '\u1E11': 'd',
        '\u1E13': 'd',
        '\u1E0F': 'd',
        '\u0111': 'd',
        '\u018C': 'd',
        '\u0256': 'd',
        '\u0257': 'd',
        '\uA77A': 'd',
        '\u01F3': 'dz',
        '\u01C6': 'dz',
        '\u24D4': 'e',
        '\uFF45': 'e',
        '\xE8': 'e',
        '\xE9': 'e',
        '\xEA': 'e',
        '\u1EC1': 'e',
        '\u1EBF': 'e',
        '\u1EC5': 'e',
        '\u1EC3': 'e',
        '\u1EBD': 'e',
        '\u0113': 'e',
        '\u1E15': 'e',
        '\u1E17': 'e',
        '\u0115': 'e',
        '\u0117': 'e',
        '\xEB': 'e',
        '\u1EBB': 'e',
        '\u011B': 'e',
        '\u0205': 'e',
        '\u0207': 'e',
        '\u1EB9': 'e',
        '\u1EC7': 'e',
        '\u0229': 'e',
        '\u1E1D': 'e',
        '\u0119': 'e',
        '\u1E19': 'e',
        '\u1E1B': 'e',
        '\u0247': 'e',
        '\u025B': 'e',
        '\u01DD': 'e',
        '\u24D5': 'f',
        '\uFF46': 'f',
        '\u1E1F': 'f',
        '\u0192': 'f',
        '\uA77C': 'f',
        '\u24D6': 'g',
        '\uFF47': 'g',
        '\u01F5': 'g',
        '\u011D': 'g',
        '\u1E21': 'g',
        '\u011F': 'g',
        '\u0121': 'g',
        '\u01E7': 'g',
        '\u0123': 'g',
        '\u01E5': 'g',
        '\u0260': 'g',
        '\uA7A1': 'g',
        '\u1D79': 'g',
        '\uA77F': 'g',
        '\u24D7': 'h',
        '\uFF48': 'h',
        '\u0125': 'h',
        '\u1E23': 'h',
        '\u1E27': 'h',
        '\u021F': 'h',
        '\u1E25': 'h',
        '\u1E29': 'h',
        '\u1E2B': 'h',
        '\u1E96': 'h',
        '\u0127': 'h',
        '\u2C68': 'h',
        '\u2C76': 'h',
        '\u0265': 'h',
        '\u0195': 'hv',
        '\u24D8': 'i',
        '\uFF49': 'i',
        '\xEC': 'i',
        '\xED': 'i',
        '\xEE': 'i',
        '\u0129': 'i',
        '\u012B': 'i',
        '\u012D': 'i',
        '\xEF': 'i',
        '\u1E2F': 'i',
        '\u1EC9': 'i',
        '\u01D0': 'i',
        '\u0209': 'i',
        '\u020B': 'i',
        '\u1ECB': 'i',
        '\u012F': 'i',
        '\u1E2D': 'i',
        '\u0268': 'i',
        '\u0131': 'i',
        '\u24D9': 'j',
        '\uFF4A': 'j',
        '\u0135': 'j',
        '\u01F0': 'j',
        '\u0249': 'j',
        '\u24DA': 'k',
        '\uFF4B': 'k',
        '\u1E31': 'k',
        '\u01E9': 'k',
        '\u1E33': 'k',
        '\u0137': 'k',
        '\u1E35': 'k',
        '\u0199': 'k',
        '\u2C6A': 'k',
        '\uA741': 'k',
        '\uA743': 'k',
        '\uA745': 'k',
        '\uA7A3': 'k',
        '\u24DB': 'l',
        '\uFF4C': 'l',
        '\u0140': 'l',
        '\u013A': 'l',
        '\u013E': 'l',
        '\u1E37': 'l',
        '\u1E39': 'l',
        '\u013C': 'l',
        '\u1E3D': 'l',
        '\u1E3B': 'l',
        '\u017F': 'l',
        '\u0142': 'l',
        '\u019A': 'l',
        '\u026B': 'l',
        '\u2C61': 'l',
        '\uA749': 'l',
        '\uA781': 'l',
        '\uA747': 'l',
        '\u01C9': 'lj',
        '\u24DC': 'm',
        '\uFF4D': 'm',
        '\u1E3F': 'm',
        '\u1E41': 'm',
        '\u1E43': 'm',
        '\u0271': 'm',
        '\u026F': 'm',
        '\u24DD': 'n',
        '\uFF4E': 'n',
        '\u01F9': 'n',
        '\u0144': 'n',
        '\xF1': 'n',
        '\u1E45': 'n',
        '\u0148': 'n',
        '\u1E47': 'n',
        '\u0146': 'n',
        '\u1E4B': 'n',
        '\u1E49': 'n',
        '\u019E': 'n',
        '\u0272': 'n',
        '\u0149': 'n',
        '\uA791': 'n',
        '\uA7A5': 'n',
        '\u01CC': 'nj',
        '\u24DE': 'o',
        '\uFF4F': 'o',
        '\xF2': 'o',
        '\xF3': 'o',
        '\xF4': 'o',
        '\u1ED3': 'o',
        '\u1ED1': 'o',
        '\u1ED7': 'o',
        '\u1ED5': 'o',
        '\xF5': 'o',
        '\u1E4D': 'o',
        '\u022D': 'o',
        '\u1E4F': 'o',
        '\u014D': 'o',
        '\u1E51': 'o',
        '\u1E53': 'o',
        '\u014F': 'o',
        '\u022F': 'o',
        '\u0231': 'o',
        '\xF6': 'o',
        '\u022B': 'o',
        '\u1ECF': 'o',
        '\u0151': 'o',
        '\u01D2': 'o',
        '\u020D': 'o',
        '\u020F': 'o',
        '\u01A1': 'o',
        '\u1EDD': 'o',
        '\u1EDB': 'o',
        '\u1EE1': 'o',
        '\u1EDF': 'o',
        '\u1EE3': 'o',
        '\u1ECD': 'o',
        '\u1ED9': 'o',
        '\u01EB': 'o',
        '\u01ED': 'o',
        '\xF8': 'o',
        '\u01FF': 'o',
        '\u0254': 'o',
        '\uA74B': 'o',
        '\uA74D': 'o',
        '\u0275': 'o',
        '\u01A3': 'oi',
        '\u0223': 'ou',
        '\uA74F': 'oo',
        '\u24DF': 'p',
        '\uFF50': 'p',
        '\u1E55': 'p',
        '\u1E57': 'p',
        '\u01A5': 'p',
        '\u1D7D': 'p',
        '\uA751': 'p',
        '\uA753': 'p',
        '\uA755': 'p',
        '\u24E0': 'q',
        '\uFF51': 'q',
        '\u024B': 'q',
        '\uA757': 'q',
        '\uA759': 'q',
        '\u24E1': 'r',
        '\uFF52': 'r',
        '\u0155': 'r',
        '\u1E59': 'r',
        '\u0159': 'r',
        '\u0211': 'r',
        '\u0213': 'r',
        '\u1E5B': 'r',
        '\u1E5D': 'r',
        '\u0157': 'r',
        '\u1E5F': 'r',
        '\u024D': 'r',
        '\u027D': 'r',
        '\uA75B': 'r',
        '\uA7A7': 'r',
        '\uA783': 'r',
        '\u24E2': 's',
        '\uFF53': 's',
        '\xDF': 's',
        '\u015B': 's',
        '\u1E65': 's',
        '\u015D': 's',
        '\u1E61': 's',
        '\u0161': 's',
        '\u1E67': 's',
        '\u1E63': 's',
        '\u1E69': 's',
        '\u0219': 's',
        '\u015F': 's',
        '\u023F': 's',
        '\uA7A9': 's',
        '\uA785': 's',
        '\u1E9B': 's',
        '\u24E3': 't',
        '\uFF54': 't',
        '\u1E6B': 't',
        '\u1E97': 't',
        '\u0165': 't',
        '\u1E6D': 't',
        '\u021B': 't',
        '\u0163': 't',
        '\u1E71': 't',
        '\u1E6F': 't',
        '\u0167': 't',
        '\u01AD': 't',
        '\u0288': 't',
        '\u2C66': 't',
        '\uA787': 't',
        '\uA729': 'tz',
        '\u24E4': 'u',
        '\uFF55': 'u',
        '\xF9': 'u',
        '\xFA': 'u',
        '\xFB': 'u',
        '\u0169': 'u',
        '\u1E79': 'u',
        '\u016B': 'u',
        '\u1E7B': 'u',
        '\u016D': 'u',
        '\xFC': 'u',
        '\u01DC': 'u',
        '\u01D8': 'u',
        '\u01D6': 'u',
        '\u01DA': 'u',
        '\u1EE7': 'u',
        '\u016F': 'u',
        '\u0171': 'u',
        '\u01D4': 'u',
        '\u0215': 'u',
        '\u0217': 'u',
        '\u01B0': 'u',
        '\u1EEB': 'u',
        '\u1EE9': 'u',
        '\u1EEF': 'u',
        '\u1EED': 'u',
        '\u1EF1': 'u',
        '\u1EE5': 'u',
        '\u1E73': 'u',
        '\u0173': 'u',
        '\u1E77': 'u',
        '\u1E75': 'u',
        '\u0289': 'u',
        '\u24E5': 'v',
        '\uFF56': 'v',
        '\u1E7D': 'v',
        '\u1E7F': 'v',
        '\u028B': 'v',
        '\uA75F': 'v',
        '\u028C': 'v',
        '\uA761': 'vy',
        '\u24E6': 'w',
        '\uFF57': 'w',
        '\u1E81': 'w',
        '\u1E83': 'w',
        '\u0175': 'w',
        '\u1E87': 'w',
        '\u1E85': 'w',
        '\u1E98': 'w',
        '\u1E89': 'w',
        '\u2C73': 'w',
        '\u24E7': 'x',
        '\uFF58': 'x',
        '\u1E8B': 'x',
        '\u1E8D': 'x',
        '\u24E8': 'y',
        '\uFF59': 'y',
        '\u1EF3': 'y',
        '\xFD': 'y',
        '\u0177': 'y',
        '\u1EF9': 'y',
        '\u0233': 'y',
        '\u1E8F': 'y',
        '\xFF': 'y',
        '\u1EF7': 'y',
        '\u1E99': 'y',
        '\u1EF5': 'y',
        '\u01B4': 'y',
        '\u024F': 'y',
        '\u1EFF': 'y',
        '\u24E9': 'z',
        '\uFF5A': 'z',
        '\u017A': 'z',
        '\u1E91': 'z',
        '\u017C': 'z',
        '\u017E': 'z',
        '\u1E93': 'z',
        '\u1E95': 'z',
        '\u01B6': 'z',
        '\u0225': 'z',
        '\u0240': 'z',
        '\u2C6C': 'z',
        '\uA763': 'z',
        '\u0386': '\u0391',
        '\u0388': '\u0395',
        '\u0389': '\u0397',
        '\u038A': '\u0399',
        '\u03AA': '\u0399',
        '\u038C': '\u039F',
        '\u038E': '\u03A5',
        '\u03AB': '\u03A5',
        '\u038F': '\u03A9',
        '\u03AC': '\u03B1',
        '\u03AD': '\u03B5',
        '\u03AE': '\u03B7',
        '\u03AF': '\u03B9',
        '\u03CA': '\u03B9',
        '\u0390': '\u03B9',
        '\u03CC': '\u03BF',
        '\u03CD': '\u03C5',
        '\u03CB': '\u03C5',
        '\u03B0': '\u03C5',
        '\u03C9': '\u03C9',
        '\u03C2': '\u03C3'
      };

      return diacritics;
    });

    S2.define('select2/data/base', ['../utils'], function (Utils) {
      function BaseAdapter($element, options) {
        BaseAdapter.__super__.constructor.call(this);
      }

      Utils.Extend(BaseAdapter, Utils.Observable);

      BaseAdapter.prototype.current = function (callback) {
        throw new Error('The `current` method must be defined in child classes.');
      };

      BaseAdapter.prototype.query = function (params, callback) {
        throw new Error('The `query` method must be defined in child classes.');
      };

      BaseAdapter.prototype.bind = function (container, $container) {
        // Can be implemented in subclasses
      };

      BaseAdapter.prototype.destroy = function () {
        // Can be implemented in subclasses
      };

      BaseAdapter.prototype.generateResultId = function (container, data) {
        var id = container.id + '-result-';

        id += Utils.generateChars(4);

        if (data.id != null) {
          id += '-' + data.id.toString();
        } else {
          id += '-' + Utils.generateChars(4);
        }
        return id;
      };

      return BaseAdapter;
    });

    S2.define('select2/data/select', ['./base', '../utils', 'jquery'], function (BaseAdapter, Utils, $) {
      function SelectAdapter($element, options) {
        this.$element = $element;
        this.options = options;

        SelectAdapter.__super__.constructor.call(this);
      }

      Utils.Extend(SelectAdapter, BaseAdapter);

      SelectAdapter.prototype.current = function (callback) {
        var data = [];
        var self = this;

        this.$element.find(':selected').each(function () {
          var $option = $(this);

          var option = self.item($option);

          data.push(option);
        });

        callback(data);
      };

      SelectAdapter.prototype.select = function (data) {
        var self = this;

        data.selected = true;

        // If data.element is a DOM node, use it instead
        if ($(data.element).is('option')) {
          data.element.selected = true;

          this.$element.trigger('change');

          return;
        }

        if (this.$element.prop('multiple')) {
          this.current(function (currentData) {
            var val = [];

            data = [data];
            data.push.apply(data, currentData);

            for (var d = 0; d < data.length; d++) {
              var id = data[d].id;

              if ($.inArray(id, val) === -1) {
                val.push(id);
              }
            }

            self.$element.val(val);
            self.$element.trigger('change');
          });
        } else {
          var val = data.id;

          this.$element.val(val);
          this.$element.trigger('change');
        }
      };

      SelectAdapter.prototype.unselect = function (data) {
        var self = this;

        if (!this.$element.prop('multiple')) {
          return;
        }

        data.selected = false;

        if ($(data.element).is('option')) {
          data.element.selected = false;

          this.$element.trigger('change');

          return;
        }

        this.current(function (currentData) {
          var val = [];

          for (var d = 0; d < currentData.length; d++) {
            var id = currentData[d].id;

            if (id !== data.id && $.inArray(id, val) === -1) {
              val.push(id);
            }
          }

          self.$element.val(val);

          self.$element.trigger('change');
        });
      };

      SelectAdapter.prototype.bind = function (container, $container) {
        var self = this;

        this.container = container;

        container.on('select', function (params) {
          self.select(params.data);
        });

        container.on('unselect', function (params) {
          self.unselect(params.data);
        });
      };

      SelectAdapter.prototype.destroy = function () {
        // Remove anything added to child elements
        this.$element.find('*').each(function () {
          // Remove any custom data set by Select2
          $.removeData(this, 'data');
        });
      };

      SelectAdapter.prototype.query = function (params, callback) {
        var data = [];
        var self = this;

        var $options = this.$element.children();

        $options.each(function () {
          var $option = $(this);

          if (!$option.is('option') && !$option.is('optgroup')) {
            return;
          }

          var option = self.item($option);

          var matches = self.matches(params, option);

          if (matches !== null) {
            data.push(matches);
          }
        });

        callback({
          results: data
        });
      };

      SelectAdapter.prototype.addOptions = function ($options) {
        Utils.appendMany(this.$element, $options);
      };

      SelectAdapter.prototype.option = function (data) {
        var option;

        if (data.children) {
          option = document.createElement('optgroup');
          option.label = data.text;
        } else {
          option = document.createElement('option');

          if (option.textContent !== undefined) {
            option.textContent = data.text;
          } else {
            option.innerText = data.text;
          }
        }

        if (data.id) {
          option.value = data.id;
        }

        if (data.disabled) {
          option.disabled = true;
        }

        if (data.selected) {
          option.selected = true;
        }

        if (data.title) {
          option.title = data.title;
        }

        var $option = $(option);

        var normalizedData = this._normalizeItem(data);
        normalizedData.element = option;

        // Override the option's data with the combined data
        $.data(option, 'data', normalizedData);

        return $option;
      };

      SelectAdapter.prototype.item = function ($option) {
        var data = {};

        data = $.data($option[0], 'data');

        if (data != null) {
          return data;
        }

        if ($option.is('option')) {
          data = {
            id: $option.val(),
            text: $option.text(),
            disabled: $option.prop('disabled'),
            selected: $option.prop('selected'),
            title: $option.prop('title')
          };
        } else if ($option.is('optgroup')) {
          data = {
            text: $option.prop('label'),
            children: [],
            title: $option.prop('title')
          };

          var $children = $option.children('option');
          var children = [];

          for (var c = 0; c < $children.length; c++) {
            var $child = $($children[c]);

            var child = this.item($child);

            children.push(child);
          }

          data.children = children;
        }

        data = this._normalizeItem(data);
        data.element = $option[0];

        $.data($option[0], 'data', data);

        return data;
      };

      SelectAdapter.prototype._normalizeItem = function (item) {
        if (!$.isPlainObject(item)) {
          item = {
            id: item,
            text: item
          };
        }

        item = $.extend({}, {
          text: ''
        }, item);

        var defaults = {
          selected: false,
          disabled: false
        };

        if (item.id != null) {
          item.id = item.id.toString();
        }

        if (item.text != null) {
          item.text = item.text.toString();
        }

        if (item._resultId == null && item.id && this.container != null) {
          item._resultId = this.generateResultId(this.container, item);
        }

        return $.extend({}, defaults, item);
      };

      SelectAdapter.prototype.matches = function (params, data) {
        var matcher = this.options.get('matcher');

        return matcher(params, data);
      };

      return SelectAdapter;
    });

    S2.define('select2/data/array', ['./select', '../utils', 'jquery'], function (SelectAdapter, Utils, $) {
      function ArrayAdapter($element, options) {
        var data = options.get('data') || [];

        ArrayAdapter.__super__.constructor.call(this, $element, options);

        this.addOptions(this.convertToOptions(data));
      }

      Utils.Extend(ArrayAdapter, SelectAdapter);

      ArrayAdapter.prototype.select = function (data) {
        var $option = this.$element.find('option').filter(function (i, elm) {
          return elm.value == data.id.toString();
        });

        if ($option.length === 0) {
          $option = this.option(data);

          this.addOptions($option);
        }

        ArrayAdapter.__super__.select.call(this, data);
      };

      ArrayAdapter.prototype.convertToOptions = function (data) {
        var self = this;

        var $existing = this.$element.find('option');
        var existingIds = $existing.map(function () {
          return self.item($(this)).id;
        }).get();

        var $options = [];

        // Filter out all items except for the one passed in the argument
        function onlyItem(item) {
          return function () {
            return $(this).val() == item.id;
          };
        }

        for (var d = 0; d < data.length; d++) {
          var item = this._normalizeItem(data[d]);

          // Skip items which were pre-loaded, only merge the data
          if ($.inArray(item.id, existingIds) >= 0) {
            var $existingOption = $existing.filter(onlyItem(item));

            var existingData = this.item($existingOption);
            var newData = $.extend(true, {}, item, existingData);

            var $newOption = this.option(newData);

            $existingOption.replaceWith($newOption);

            continue;
          }

          var $option = this.option(item);

          if (item.children) {
            var $children = this.convertToOptions(item.children);

            Utils.appendMany($option, $children);
          }

          $options.push($option);
        }

        return $options;
      };

      return ArrayAdapter;
    });

    S2.define('select2/data/ajax', ['./array', '../utils', 'jquery'], function (ArrayAdapter, Utils, $) {
      function AjaxAdapter($element, options) {
        this.ajaxOptions = this._applyDefaults(options.get('ajax'));

        if (this.ajaxOptions.processResults != null) {
          this.processResults = this.ajaxOptions.processResults;
        }

        AjaxAdapter.__super__.constructor.call(this, $element, options);
      }

      Utils.Extend(AjaxAdapter, ArrayAdapter);

      AjaxAdapter.prototype._applyDefaults = function (options) {
        var defaults = {
          data: function data(params) {
            return $.extend({}, params, {
              q: params.term
            });
          },
          transport: function transport(params, success, failure) {
            var $request = $.ajax(params);

            $request.then(success);
            $request.fail(failure);

            return $request;
          }
        };

        return $.extend({}, defaults, options, true);
      };

      AjaxAdapter.prototype.processResults = function (results) {
        return results;
      };

      AjaxAdapter.prototype.query = function (params, callback) {
        var matches = [];
        var self = this;

        if (this._request != null) {
          // JSONP requests cannot always be aborted
          if ($.isFunction(this._request.abort)) {
            this._request.abort();
          }

          this._request = null;
        }

        var options = $.extend({
          type: 'GET'
        }, this.ajaxOptions);

        if (typeof options.url === 'function') {
          options.url = options.url.call(this.$element, params);
        }

        if (typeof options.data === 'function') {
          options.data = options.data.call(this.$element, params);
        }

        function request() {
          var $request = options.transport(options, function (data) {
            var results = self.processResults(data, params);

            if (self.options.get('debug') && window.console && console.error) {
              // Check to make sure that the response included a `results` key.
              if (!results || !results.results || !$.isArray(results.results)) {
                console.error('Select2: The AJAX results did not return an array in the ' + '`results` key of the response.');
              }
            }

            callback(results);
          }, function () {
            // Attempt to detect if a request was aborted
            // Only works if the transport exposes a status property
            if ($request.status && $request.status === '0') {
              return;
            }

            self.trigger('results:message', {
              message: 'errorLoading'
            });
          });

          self._request = $request;
        }

        if (this.ajaxOptions.delay && params.term != null) {
          if (this._queryTimeout) {
            window.clearTimeout(this._queryTimeout);
          }

          this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
        } else {
          request();
        }
      };

      return AjaxAdapter;
    });

    S2.define('select2/data/tags', ['jquery'], function ($) {
      function Tags(decorated, $element, options) {
        var tags = options.get('tags');

        var createTag = options.get('createTag');

        if (createTag !== undefined) {
          this.createTag = createTag;
        }

        var insertTag = options.get('insertTag');

        if (insertTag !== undefined) {
          this.insertTag = insertTag;
        }

        decorated.call(this, $element, options);

        if ($.isArray(tags)) {
          for (var t = 0; t < tags.length; t++) {
            var tag = tags[t];
            var item = this._normalizeItem(tag);

            var $option = this.option(item);

            this.$element.append($option);
          }
        }
      }

      Tags.prototype.query = function (decorated, params, callback) {
        var self = this;

        this._removeOldTags();

        if (params.term == null || params.page != null) {
          decorated.call(this, params, callback);
          return;
        }

        function wrapper(obj, child) {
          var data = obj.results;

          for (var i = 0; i < data.length; i++) {
            var option = data[i];

            var checkChildren = option.children != null && !wrapper({
              results: option.children
            }, true);

            var checkText = option.text === params.term;

            if (checkText || checkChildren) {
              if (child) {
                return false;
              }

              obj.data = data;
              callback(obj);

              return;
            }
          }

          if (child) {
            return true;
          }

          var tag = self.createTag(params);

          if (tag != null) {
            var $option = self.option(tag);
            $option.attr('data-select2-tag', true);

            self.addOptions([$option]);

            self.insertTag(data, tag);
          }

          obj.results = data;

          callback(obj);
        }

        decorated.call(this, params, wrapper);
      };

      Tags.prototype.createTag = function (decorated, params) {
        var term = $.trim(params.term);

        if (term === '') {
          return null;
        }

        return {
          id: term,
          text: term
        };
      };

      Tags.prototype.insertTag = function (_, data, tag) {
        data.unshift(tag);
      };

      Tags.prototype._removeOldTags = function (_) {
        var tag = this._lastTag;

        var $options = this.$element.find('option[data-select2-tag]');

        $options.each(function () {
          if (this.selected) {
            return;
          }

          $(this).remove();
        });
      };

      return Tags;
    });

    S2.define('select2/data/tokenizer', ['jquery'], function ($) {
      function Tokenizer(decorated, $element, options) {
        var tokenizer = options.get('tokenizer');

        if (tokenizer !== undefined) {
          this.tokenizer = tokenizer;
        }

        decorated.call(this, $element, options);
      }

      Tokenizer.prototype.bind = function (decorated, container, $container) {
        decorated.call(this, container, $container);

        this.$search = container.dropdown.$search || container.selection.$search || $container.find('.select2-search__field');
      };

      Tokenizer.prototype.query = function (decorated, params, callback) {
        var self = this;

        function createAndSelect(data) {
          // Normalize the data object so we can use it for checks
          var item = self._normalizeItem(data);

          // Check if the data object already exists as a tag
          // Select it if it doesn't
          var $existingOptions = self.$element.find('option').filter(function () {
            return $(this).val() === item.id;
          });

          // If an existing option wasn't found for it, create the option
          if (!$existingOptions.length) {
            var $option = self.option(item);
            $option.attr('data-select2-tag', true);

            self._removeOldTags();
            self.addOptions([$option]);
          }

          // Select the item, now that we know there is an option for it
          select(item);
        }

        function select(data) {
          self.trigger('select', {
            data: data
          });
        }

        params.term = params.term || '';

        var tokenData = this.tokenizer(params, this.options, createAndSelect);

        if (tokenData.term !== params.term) {
          // Replace the search term if we have the search box
          if (this.$search.length) {
            this.$search.val(tokenData.term);
            this.$search.focus();
          }

          params.term = tokenData.term;
        }

        decorated.call(this, params, callback);
      };

      Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
        var separators = options.get('tokenSeparators') || [];
        var term = params.term;
        var i = 0;

        var createTag = this.createTag || function (params) {
          return {
            id: params.term,
            text: params.term
          };
        };

        while (i < term.length) {
          var termChar = term[i];

          if ($.inArray(termChar, separators) === -1) {
            i++;

            continue;
          }

          var part = term.substr(0, i);
          var partParams = $.extend({}, params, {
            term: part
          });

          var data = createTag(partParams);

          if (data == null) {
            i++;
            continue;
          }

          callback(data);

          // Reset the term to not include the tokenized portion
          term = term.substr(i + 1) || '';
          i = 0;
        }

        return {
          term: term
        };
      };

      return Tokenizer;
    });

    S2.define('select2/data/minimumInputLength', [], function () {
      function MinimumInputLength(decorated, $e, options) {
        this.minimumInputLength = options.get('minimumInputLength');

        decorated.call(this, $e, options);
      }

      MinimumInputLength.prototype.query = function (decorated, params, callback) {
        params.term = params.term || '';

        if (params.term.length < this.minimumInputLength) {
          this.trigger('results:message', {
            message: 'inputTooShort',
            args: {
              minimum: this.minimumInputLength,
              input: params.term,
              params: params
            }
          });

          return;
        }

        decorated.call(this, params, callback);
      };

      return MinimumInputLength;
    });

    S2.define('select2/data/maximumInputLength', [], function () {
      function MaximumInputLength(decorated, $e, options) {
        this.maximumInputLength = options.get('maximumInputLength');

        decorated.call(this, $e, options);
      }

      MaximumInputLength.prototype.query = function (decorated, params, callback) {
        params.term = params.term || '';

        if (this.maximumInputLength > 0 && params.term.length > this.maximumInputLength) {
          this.trigger('results:message', {
            message: 'inputTooLong',
            args: {
              maximum: this.maximumInputLength,
              input: params.term,
              params: params
            }
          });

          return;
        }

        decorated.call(this, params, callback);
      };

      return MaximumInputLength;
    });

    S2.define('select2/data/maximumSelectionLength', [], function () {
      function MaximumSelectionLength(decorated, $e, options) {
        this.maximumSelectionLength = options.get('maximumSelectionLength');

        decorated.call(this, $e, options);
      }

      MaximumSelectionLength.prototype.query = function (decorated, params, callback) {
        var self = this;

        this.current(function (currentData) {
          var count = currentData != null ? currentData.length : 0;
          if (self.maximumSelectionLength > 0 && count >= self.maximumSelectionLength) {
            self.trigger('results:message', {
              message: 'maximumSelected',
              args: {
                maximum: self.maximumSelectionLength
              }
            });
            return;
          }
          decorated.call(self, params, callback);
        });
      };

      return MaximumSelectionLength;
    });

    S2.define('select2/dropdown', ['jquery', './utils'], function ($, Utils) {
      function Dropdown($element, options) {
        this.$element = $element;
        this.options = options;

        Dropdown.__super__.constructor.call(this);
      }

      Utils.Extend(Dropdown, Utils.Observable);

      Dropdown.prototype.render = function () {
        var $dropdown = $('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + '</span>');

        $dropdown.attr('dir', this.options.get('dir'));

        this.$dropdown = $dropdown;

        return $dropdown;
      };

      Dropdown.prototype.bind = function () {
        // Should be implemented in subclasses
      };

      Dropdown.prototype.position = function ($dropdown, $container) {
        // Should be implmented in subclasses
      };

      Dropdown.prototype.destroy = function () {
        // Remove the dropdown from the DOM
        this.$dropdown.remove();
      };

      return Dropdown;
    });

    S2.define('select2/dropdown/search', ['jquery', '../utils'], function ($, Utils) {
      function Search() {}

      Search.prototype.render = function (decorated) {
        var $rendered = decorated.call(this);

        var $search = $('<span class="select2-search select2-search--dropdown">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="off"' + ' spellcheck="false" role="textbox" />' + '</span>');

        this.$searchContainer = $search;
        this.$search = $search.find('input');

        $rendered.prepend($search);

        return $rendered;
      };

      Search.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        this.$search.on('keydown', function (evt) {
          self.trigger('keypress', evt);

          self._keyUpPrevented = evt.isDefaultPrevented();
        });

        // Workaround for browsers which do not support the `input` event
        // This will prevent double-triggering of events for browsers which support
        // both the `keyup` and `input` events.
        this.$search.on('input', function (evt) {
          // Unbind the duplicated `keyup` event
          $(this).off('keyup');
        });

        this.$search.on('keyup input', function (evt) {
          self.handleSearch(evt);
        });

        container.on('open', function () {
          self.$search.attr('tabindex', 0);

          self.$search.focus();

          window.setTimeout(function () {
            self.$search.focus();
          }, 0);
        });

        container.on('close', function () {
          self.$search.attr('tabindex', -1);

          self.$search.val('');
        });

        container.on('focus', function () {
          if (container.isOpen()) {
            self.$search.focus();
          }
        });

        container.on('results:all', function (params) {
          if (params.query.term == null || params.query.term === '') {
            var showSearch = self.showSearch(params);

            if (showSearch) {
              self.$searchContainer.removeClass('select2-search--hide');
            } else {
              self.$searchContainer.addClass('select2-search--hide');
            }
          }
        });
      };

      Search.prototype.handleSearch = function (evt) {
        if (!this._keyUpPrevented) {
          var input = this.$search.val();

          this.trigger('query', {
            term: input
          });
        }

        this._keyUpPrevented = false;
      };

      Search.prototype.showSearch = function (_, params) {
        return true;
      };

      return Search;
    });

    S2.define('select2/dropdown/hidePlaceholder', [], function () {
      function HidePlaceholder(decorated, $element, options, dataAdapter) {
        this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

        decorated.call(this, $element, options, dataAdapter);
      }

      HidePlaceholder.prototype.append = function (decorated, data) {
        data.results = this.removePlaceholder(data.results);

        decorated.call(this, data);
      };

      HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
        if (typeof placeholder === 'string') {
          placeholder = {
            id: '',
            text: placeholder
          };
        }

        return placeholder;
      };

      HidePlaceholder.prototype.removePlaceholder = function (_, data) {
        var modifiedData = data.slice(0);

        for (var d = data.length - 1; d >= 0; d--) {
          var item = data[d];

          if (this.placeholder.id === item.id) {
            modifiedData.splice(d, 1);
          }
        }

        return modifiedData;
      };

      return HidePlaceholder;
    });

    S2.define('select2/dropdown/infiniteScroll', ['jquery'], function ($) {
      function InfiniteScroll(decorated, $element, options, dataAdapter) {
        this.lastParams = {};

        decorated.call(this, $element, options, dataAdapter);

        this.$loadingMore = this.createLoadingMore();
        this.loading = false;
      }

      InfiniteScroll.prototype.append = function (decorated, data) {
        this.$loadingMore.remove();
        this.loading = false;

        decorated.call(this, data);

        if (this.showLoadingMore(data)) {
          this.$results.append(this.$loadingMore);
        }
      };

      InfiniteScroll.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('query', function (params) {
          self.lastParams = params;
          self.loading = true;
        });

        container.on('query:append', function (params) {
          self.lastParams = params;
          self.loading = true;
        });

        this.$results.on('scroll', function () {
          var isLoadMoreVisible = $.contains(document.documentElement, self.$loadingMore[0]);

          if (self.loading || !isLoadMoreVisible) {
            return;
          }

          var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
          var loadingMoreOffset = self.$loadingMore.offset().top + self.$loadingMore.outerHeight(false);

          if (currentOffset + 50 >= loadingMoreOffset) {
            self.loadMore();
          }
        });
      };

      InfiniteScroll.prototype.loadMore = function () {
        this.loading = true;

        var params = $.extend({}, { page: 1 }, this.lastParams);

        params.page++;

        this.trigger('query:append', params);
      };

      InfiniteScroll.prototype.showLoadingMore = function (_, data) {
        return data.pagination && data.pagination.more;
      };

      InfiniteScroll.prototype.createLoadingMore = function () {
        var $option = $('<li ' + 'class="select2-results__option select2-results__option--load-more"' + 'role="treeitem" aria-disabled="true"></li>');

        var message = this.options.get('translations').get('loadingMore');

        $option.html(message(this.lastParams));

        return $option;
      };

      return InfiniteScroll;
    });

    S2.define('select2/dropdown/attachBody', ['jquery', '../utils'], function ($, Utils) {
      function AttachBody(decorated, $element, options) {
        this.$dropdownParent = options.get('dropdownParent') || $(document.body);

        decorated.call(this, $element, options);
      }

      AttachBody.prototype.bind = function (decorated, container, $container) {
        var self = this;

        var setupResultsEvents = false;

        decorated.call(this, container, $container);

        container.on('open', function () {
          self._showDropdown();
          self._attachPositioningHandler(container);

          if (!setupResultsEvents) {
            setupResultsEvents = true;

            container.on('results:all', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });

            container.on('results:append', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });
          }
        });

        container.on('close', function () {
          self._hideDropdown();
          self._detachPositioningHandler(container);
        });

        this.$dropdownContainer.on('mousedown', function (evt) {
          evt.stopPropagation();
        });
      };

      AttachBody.prototype.destroy = function (decorated) {
        decorated.call(this);

        this.$dropdownContainer.remove();
      };

      AttachBody.prototype.position = function (decorated, $dropdown, $container) {
        // Clone all of the container classes
        $dropdown.attr('class', $container.attr('class'));

        $dropdown.removeClass('select2');
        $dropdown.addClass('select2-container--open');

        $dropdown.css({
          position: 'absolute',
          top: -999999
        });

        this.$container = $container;
      };

      AttachBody.prototype.render = function (decorated) {
        var $container = $('<span></span>');

        var $dropdown = decorated.call(this);
        $container.append($dropdown);

        this.$dropdownContainer = $container;

        return $container;
      };

      AttachBody.prototype._hideDropdown = function (decorated) {
        this.$dropdownContainer.detach();
      };

      AttachBody.prototype._attachPositioningHandler = function (decorated, container) {
        var self = this;

        var scrollEvent = 'scroll.select2.' + container.id;
        var resizeEvent = 'resize.select2.' + container.id;
        var orientationEvent = 'orientationchange.select2.' + container.id;

        var $watchers = this.$container.parents().filter(Utils.hasScroll);
        $watchers.each(function () {
          $(this).data('select2-scroll-position', {
            x: $(this).scrollLeft(),
            y: $(this).scrollTop()
          });
        });

        $watchers.on(scrollEvent, function (ev) {
          var position = $(this).data('select2-scroll-position');
          $(this).scrollTop(position.y);
        });

        $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent, function (e) {
          self._positionDropdown();
          self._resizeDropdown();
        });
      };

      AttachBody.prototype._detachPositioningHandler = function (decorated, container) {
        var scrollEvent = 'scroll.select2.' + container.id;
        var resizeEvent = 'resize.select2.' + container.id;
        var orientationEvent = 'orientationchange.select2.' + container.id;

        var $watchers = this.$container.parents().filter(Utils.hasScroll);
        $watchers.off(scrollEvent);

        $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
      };

      AttachBody.prototype._positionDropdown = function () {
        var $window = $(window);

        var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
        var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

        var newDirection = null;

        var offset = this.$container.offset();

        offset.bottom = offset.top + this.$container.outerHeight(false);

        var container = {
          height: this.$container.outerHeight(false)
        };

        container.top = offset.top;
        container.bottom = offset.top + container.height;

        var dropdown = {
          height: this.$dropdown.outerHeight(false)
        };

        var viewport = {
          top: $window.scrollTop(),
          bottom: $window.scrollTop() + $window.height()
        };

        var enoughRoomAbove = viewport.top < offset.top - dropdown.height;
        var enoughRoomBelow = viewport.bottom > offset.bottom + dropdown.height;

        var css = {
          left: offset.left,
          top: container.bottom
        };

        // Determine what the parent element is to use for calciulating the offset
        var $offsetParent = this.$dropdownParent;

        // For statically positoned elements, we need to get the element
        // that is determining the offset
        if ($offsetParent.css('position') === 'static') {
          $offsetParent = $offsetParent.offsetParent();
        }

        var parentOffset = $offsetParent.offset();

        css.top -= parentOffset.top;
        css.left -= parentOffset.left;

        if (!isCurrentlyAbove && !isCurrentlyBelow) {
          newDirection = 'below';
        }

        if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
          newDirection = 'above';
        } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
          newDirection = 'below';
        }

        if (newDirection == 'above' || isCurrentlyAbove && newDirection !== 'below') {
          css.top = container.top - parentOffset.top - dropdown.height;
        }

        if (newDirection != null) {
          this.$dropdown.removeClass('select2-dropdown--below select2-dropdown--above').addClass('select2-dropdown--' + newDirection);
          this.$container.removeClass('select2-container--below select2-container--above').addClass('select2-container--' + newDirection);
        }

        this.$dropdownContainer.css(css);
      };

      AttachBody.prototype._resizeDropdown = function () {
        var css = {
          width: this.$container.outerWidth(false) + 'px'
        };

        if (this.options.get('dropdownAutoWidth')) {
          css.minWidth = css.width;
          css.position = 'relative';
          css.width = 'auto';
        }

        this.$dropdown.css(css);
      };

      AttachBody.prototype._showDropdown = function (decorated) {
        this.$dropdownContainer.appendTo(this.$dropdownParent);

        this._positionDropdown();
        this._resizeDropdown();
      };

      return AttachBody;
    });

    S2.define('select2/dropdown/minimumResultsForSearch', [], function () {
      function countResults(data) {
        var count = 0;

        for (var d = 0; d < data.length; d++) {
          var item = data[d];

          if (item.children) {
            count += countResults(item.children);
          } else {
            count++;
          }
        }

        return count;
      }

      function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
        this.minimumResultsForSearch = options.get('minimumResultsForSearch');

        if (this.minimumResultsForSearch < 0) {
          this.minimumResultsForSearch = Infinity;
        }

        decorated.call(this, $element, options, dataAdapter);
      }

      MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
        if (countResults(params.data.results) < this.minimumResultsForSearch) {
          return false;
        }

        return decorated.call(this, params);
      };

      return MinimumResultsForSearch;
    });

    S2.define('select2/dropdown/selectOnClose', [], function () {
      function SelectOnClose() {}

      SelectOnClose.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('close', function (params) {
          self._handleSelectOnClose(params);
        });
      };

      SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
        if (params && params.originalSelect2Event != null) {
          var event = params.originalSelect2Event;

          // Don't select an item if the close event was triggered from a select or
          // unselect event
          if (event._type === 'select' || event._type === 'unselect') {
            return;
          }
        }

        var $highlightedResults = this.getHighlightedResults();

        // Only select highlighted results
        if ($highlightedResults.length < 1) {
          return;
        }

        var data = $highlightedResults.data('data');

        // Don't re-select already selected resulte
        if (data.element != null && data.element.selected || data.element == null && data.selected) {
          return;
        }

        this.trigger('select', {
          data: data
        });
      };

      return SelectOnClose;
    });

    S2.define('select2/dropdown/closeOnSelect', [], function () {
      function CloseOnSelect() {}

      CloseOnSelect.prototype.bind = function (decorated, container, $container) {
        var self = this;

        decorated.call(this, container, $container);

        container.on('select', function (evt) {
          self._selectTriggered(evt);
        });

        container.on('unselect', function (evt) {
          self._selectTriggered(evt);
        });
      };

      CloseOnSelect.prototype._selectTriggered = function (_, evt) {
        var originalEvent = evt.originalEvent;

        // Don't close if the control key is being held
        if (originalEvent && originalEvent.ctrlKey) {
          return;
        }

        this.trigger('close', {
          originalEvent: originalEvent,
          originalSelect2Event: evt
        });
      };

      return CloseOnSelect;
    });

    S2.define('select2/i18n/en', [], function () {
      // English
      return {
        errorLoading: function errorLoading() {
          return 'The results could not be loaded.';
        },
        inputTooLong: function inputTooLong(args) {
          var overChars = args.input.length - args.maximum;

          var message = 'Please delete ' + overChars + ' character';

          if (overChars != 1) {
            message += 's';
          }

          return message;
        },
        inputTooShort: function inputTooShort(args) {
          var remainingChars = args.minimum - args.input.length;

          var message = 'Please enter ' + remainingChars + ' or more characters';

          return message;
        },
        loadingMore: function loadingMore() {
          return 'Loading more results…';
        },
        maximumSelected: function maximumSelected(args) {
          var message = 'You can only select ' + args.maximum + ' item';

          if (args.maximum != 1) {
            message += 's';
          }

          return message;
        },
        noResults: function noResults() {
          return 'No results found';
        },
        searching: function searching() {
          return 'Searching…';
        }
      };
    });

    S2.define('select2/defaults', ['jquery', 'require', './results', './selection/single', './selection/multiple', './selection/placeholder', './selection/allowClear', './selection/search', './selection/eventRelay', './utils', './translation', './diacritics', './data/select', './data/array', './data/ajax', './data/tags', './data/tokenizer', './data/minimumInputLength', './data/maximumInputLength', './data/maximumSelectionLength', './dropdown', './dropdown/search', './dropdown/hidePlaceholder', './dropdown/infiniteScroll', './dropdown/attachBody', './dropdown/minimumResultsForSearch', './dropdown/selectOnClose', './dropdown/closeOnSelect', './i18n/en'], function ($, require, ResultsList, SingleSelection, MultipleSelection, Placeholder, AllowClear, SelectionSearch, EventRelay, Utils, Translation, DIACRITICS, SelectData, ArrayData, AjaxData, Tags, Tokenizer, MinimumInputLength, MaximumInputLength, MaximumSelectionLength, Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll, AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect, EnglishTranslation) {
      function Defaults() {
        this.reset();
      }

      Defaults.prototype.apply = function (options) {
        options = $.extend(true, {}, this.defaults, options);

        if (options.dataAdapter == null) {
          if (options.ajax != null) {
            options.dataAdapter = AjaxData;
          } else if (options.data != null) {
            options.dataAdapter = ArrayData;
          } else {
            options.dataAdapter = SelectData;
          }

          if (options.minimumInputLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MinimumInputLength);
          }

          if (options.maximumInputLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumInputLength);
          }

          if (options.maximumSelectionLength > 0) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumSelectionLength);
          }

          if (options.tags) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
          }

          if (options.tokenSeparators != null || options.tokenizer != null) {
            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tokenizer);
          }

          if (options.query != null) {
            var Query = require(options.amdBase + 'compat/query');

            options.dataAdapter = Utils.Decorate(options.dataAdapter, Query);
          }

          if (options.initSelection != null) {
            var InitSelection = require(options.amdBase + 'compat/initSelection');

            options.dataAdapter = Utils.Decorate(options.dataAdapter, InitSelection);
          }
        }

        if (options.resultsAdapter == null) {
          options.resultsAdapter = ResultsList;

          if (options.ajax != null) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, InfiniteScroll);
          }

          if (options.placeholder != null) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, HidePlaceholder);
          }

          if (options.selectOnClose) {
            options.resultsAdapter = Utils.Decorate(options.resultsAdapter, SelectOnClose);
          }
        }

        if (options.dropdownAdapter == null) {
          if (options.multiple) {
            options.dropdownAdapter = Dropdown;
          } else {
            var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

            options.dropdownAdapter = SearchableDropdown;
          }

          if (options.minimumResultsForSearch !== 0) {
            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, MinimumResultsForSearch);
          }

          if (options.closeOnSelect) {
            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, CloseOnSelect);
          }

          if (options.dropdownCssClass != null || options.dropdownCss != null || options.adaptDropdownCssClass != null) {
            var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

            options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, DropdownCSS);
          }

          options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, AttachBody);
        }

        if (options.selectionAdapter == null) {
          if (options.multiple) {
            options.selectionAdapter = MultipleSelection;
          } else {
            options.selectionAdapter = SingleSelection;
          }

          // Add the placeholder mixin if a placeholder was specified
          if (options.placeholder != null) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, Placeholder);
          }

          if (options.allowClear) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, AllowClear);
          }

          if (options.multiple) {
            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionSearch);
          }

          if (options.containerCssClass != null || options.containerCss != null || options.adaptContainerCssClass != null) {
            var ContainerCSS = require(options.amdBase + 'compat/containerCss');

            options.selectionAdapter = Utils.Decorate(options.selectionAdapter, ContainerCSS);
          }

          options.selectionAdapter = Utils.Decorate(options.selectionAdapter, EventRelay);
        }

        if (typeof options.language === 'string') {
          // Check if the language is specified with a region
          if (options.language.indexOf('-') > 0) {
            // Extract the region information if it is included
            var languageParts = options.language.split('-');
            var baseLanguage = languageParts[0];

            options.language = [options.language, baseLanguage];
          } else {
            options.language = [options.language];
          }
        }

        if ($.isArray(options.language)) {
          var languages = new Translation();
          options.language.push('en');

          var languageNames = options.language;

          for (var l = 0; l < languageNames.length; l++) {
            var name = languageNames[l];
            var language = {};

            try {
              // Try to load it with the original name
              language = Translation.loadPath(name);
            } catch (e) {
              try {
                // If we couldn't load it, check if it wasn't the full path
                name = this.defaults.amdLanguageBase + name;
                language = Translation.loadPath(name);
              } catch (ex) {
                // The translation could not be loaded at all. Sometimes this is
                // because of a configuration problem, other times this can be
                // because of how Select2 helps load all possible translation files.
                if (options.debug && window.console && console.warn) {
                  console.warn('Select2: The language file for "' + name + '" could not be ' + 'automatically loaded. A fallback will be used instead.');
                }

                continue;
              }
            }

            languages.extend(language);
          }

          options.translations = languages;
        } else {
          var baseTranslation = Translation.loadPath(this.defaults.amdLanguageBase + 'en');
          var customTranslation = new Translation(options.language);

          customTranslation.extend(baseTranslation);

          options.translations = customTranslation;
        }

        return options;
      };

      Defaults.prototype.reset = function () {
        function stripDiacritics(text) {
          // Used 'uni range + named function' from http://jsperf.com/diacritics/18
          function match(a) {
            return DIACRITICS[a] || a;
          }

          return text.replace(/[^\u0000-\u007E]/g, match);
        }

        function matcher(params, data) {
          // Always return the object if there is nothing to compare
          if ($.trim(params.term) === '') {
            return data;
          }

          // Do a recursive check for options with children
          if (data.children && data.children.length > 0) {
            // Clone the data object if there are children
            // This is required as we modify the object to remove any non-matches
            var match = $.extend(true, {}, data);

            // Check each child of the option
            for (var c = data.children.length - 1; c >= 0; c--) {
              var child = data.children[c];

              var matches = matcher(params, child);

              // If there wasn't a match, remove the object in the array
              if (matches == null) {
                match.children.splice(c, 1);
              }
            }

            // If any children matched, return the new object
            if (match.children.length > 0) {
              return match;
            }

            // If there were no matching children, check just the plain object
            return matcher(params, match);
          }

          var original = stripDiacritics(data.text).toUpperCase();
          var term = stripDiacritics(params.term).toUpperCase();

          // Check if the text contains the term
          if (original.indexOf(term) > -1) {
            return data;
          }

          // If it doesn't contain the term, don't return anything
          return null;
        }

        this.defaults = {
          amdBase: './',
          amdLanguageBase: './i18n/',
          closeOnSelect: true,
          debug: false,
          dropdownAutoWidth: false,
          escapeMarkup: Utils.escapeMarkup,
          language: EnglishTranslation,
          matcher: matcher,
          minimumInputLength: 0,
          maximumInputLength: 0,
          maximumSelectionLength: 0,
          minimumResultsForSearch: 0,
          selectOnClose: false,
          sorter: function sorter(data) {
            return data;
          },
          templateResult: function templateResult(result) {
            return result.text;
          },
          templateSelection: function templateSelection(selection) {
            return selection.text;
          },
          theme: 'default',
          width: 'resolve'
        };
      };

      Defaults.prototype.set = function (key, value) {
        var camelKey = $.camelCase(key);

        var data = {};
        data[camelKey] = value;

        var convertedData = Utils._convertData(data);

        $.extend(this.defaults, convertedData);
      };

      var defaults = new Defaults();

      return defaults;
    });

    S2.define('select2/options', ['require', 'jquery', './defaults', './utils'], function (require, $, Defaults, Utils) {
      function Options(options, $element) {
        this.options = options;

        if ($element != null) {
          this.fromElement($element);
        }

        this.options = Defaults.apply(this.options);

        if ($element && $element.is('input')) {
          var InputCompat = require(this.get('amdBase') + 'compat/inputData');

          this.options.dataAdapter = Utils.Decorate(this.options.dataAdapter, InputCompat);
        }
      }

      Options.prototype.fromElement = function ($e) {
        var excludedData = ['select2'];

        if (this.options.multiple == null) {
          this.options.multiple = $e.prop('multiple');
        }

        if (this.options.disabled == null) {
          this.options.disabled = $e.prop('disabled');
        }

        if (this.options.language == null) {
          if ($e.prop('lang')) {
            this.options.language = $e.prop('lang').toLowerCase();
          } else if ($e.closest('[lang]').prop('lang')) {
            this.options.language = $e.closest('[lang]').prop('lang');
          }
        }

        if (this.options.dir == null) {
          if ($e.prop('dir')) {
            this.options.dir = $e.prop('dir');
          } else if ($e.closest('[dir]').prop('dir')) {
            this.options.dir = $e.closest('[dir]').prop('dir');
          } else {
            this.options.dir = 'ltr';
          }
        }

        $e.prop('disabled', this.options.disabled);
        $e.prop('multiple', this.options.multiple);

        if ($e.data('select2Tags')) {
          if (this.options.debug && window.console && console.warn) {
            console.warn('Select2: The `data-select2-tags` attribute has been changed to ' + 'use the `data-data` and `data-tags="true"` attributes and will be ' + 'removed in future versions of Select2.');
          }

          $e.data('data', $e.data('select2Tags'));
          $e.data('tags', true);
        }

        if ($e.data('ajaxUrl')) {
          if (this.options.debug && window.console && console.warn) {
            console.warn('Select2: The `data-ajax-url` attribute has been changed to ' + '`data-ajax--url` and support for the old attribute will be removed' + ' in future versions of Select2.');
          }

          $e.attr('ajax--url', $e.data('ajaxUrl'));
          $e.data('ajax--url', $e.data('ajaxUrl'));
        }

        var dataset = {};

        // Prefer the element's `dataset` attribute if it exists
        // jQuery 1.x does not correctly handle data attributes with multiple dashes
        if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
          dataset = $.extend(true, {}, $e[0].dataset, $e.data());
        } else {
          dataset = $e.data();
        }

        var data = $.extend(true, {}, dataset);

        data = Utils._convertData(data);

        for (var key in data) {
          if ($.inArray(key, excludedData) > -1) {
            continue;
          }

          if ($.isPlainObject(this.options[key])) {
            $.extend(this.options[key], data[key]);
          } else {
            this.options[key] = data[key];
          }
        }

        return this;
      };

      Options.prototype.get = function (key) {
        return this.options[key];
      };

      Options.prototype.set = function (key, val) {
        this.options[key] = val;
      };

      return Options;
    });

    S2.define('select2/core', ['jquery', './options', './utils', './keys'], function ($, Options, Utils, KEYS) {
      var Select2 = function Select2($element, options) {
        if ($element.data('select2') != null) {
          $element.data('select2').destroy();
        }

        this.$element = $element;

        this.id = this._generateId($element);

        options = options || {};

        this.options = new Options(options, $element);

        Select2.__super__.constructor.call(this);

        // Set up the tabindex

        var tabindex = $element.attr('tabindex') || 0;
        $element.data('old-tabindex', tabindex);
        $element.attr('tabindex', '-1');

        // Set up containers and adapters

        var DataAdapter = this.options.get('dataAdapter');
        this.dataAdapter = new DataAdapter($element, this.options);

        var $container = this.render();

        this._placeContainer($container);

        var SelectionAdapter = this.options.get('selectionAdapter');
        this.selection = new SelectionAdapter($element, this.options);
        this.$selection = this.selection.render();

        this.selection.position(this.$selection, $container);

        var DropdownAdapter = this.options.get('dropdownAdapter');
        this.dropdown = new DropdownAdapter($element, this.options);
        this.$dropdown = this.dropdown.render();

        this.dropdown.position(this.$dropdown, $container);

        var ResultsAdapter = this.options.get('resultsAdapter');
        this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
        this.$results = this.results.render();

        this.results.position(this.$results, this.$dropdown);

        // Bind events

        var self = this;

        // Bind the container to all of the adapters
        this._bindAdapters();

        // Register any DOM event handlers
        this._registerDomEvents();

        // Register any internal event handlers
        this._registerDataEvents();
        this._registerSelectionEvents();
        this._registerDropdownEvents();
        this._registerResultsEvents();
        this._registerEvents();

        // Set the initial state
        this.dataAdapter.current(function (initialData) {
          self.trigger('selection:update', {
            data: initialData
          });
        });

        // Hide the original select
        $element.addClass('select2-hidden-accessible');
        $element.attr('aria-hidden', 'true');

        // Synchronize any monitored attributes
        this._syncAttributes();

        $element.data('select2', this);
      };

      Utils.Extend(Select2, Utils.Observable);

      Select2.prototype._generateId = function ($element) {
        var id = '';

        if ($element.attr('id') != null) {
          id = $element.attr('id');
        } else if ($element.attr('name') != null) {
          id = $element.attr('name') + '-' + Utils.generateChars(2);
        } else {
          id = Utils.generateChars(4);
        }

        id = id.replace(/(:|\.|\[|\]|,)/g, '');
        id = 'select2-' + id;

        return id;
      };

      Select2.prototype._placeContainer = function ($container) {
        $container.insertAfter(this.$element);

        var width = this._resolveWidth(this.$element, this.options.get('width'));

        if (width != null) {
          $container.css('width', width);
        }
      };

      Select2.prototype._resolveWidth = function ($element, method) {
        var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

        if (method == 'resolve') {
          var styleWidth = this._resolveWidth($element, 'style');

          if (styleWidth != null) {
            return styleWidth;
          }

          return this._resolveWidth($element, 'element');
        }

        if (method == 'element') {
          var elementWidth = $element.outerWidth(false);

          if (elementWidth <= 0) {
            return 'auto';
          }

          return elementWidth + 'px';
        }

        if (method == 'style') {
          var style = $element.attr('style');

          if (typeof style !== 'string') {
            return null;
          }

          var attrs = style.split(';');

          for (var i = 0, l = attrs.length; i < l; i = i + 1) {
            var attr = attrs[i].replace(/\s/g, '');
            var matches = attr.match(WIDTH);

            if (matches !== null && matches.length >= 1) {
              return matches[1];
            }
          }

          return null;
        }

        return method;
      };

      Select2.prototype._bindAdapters = function () {
        this.dataAdapter.bind(this, this.$container);
        this.selection.bind(this, this.$container);

        this.dropdown.bind(this, this.$container);
        this.results.bind(this, this.$container);
      };

      Select2.prototype._registerDomEvents = function () {
        var self = this;

        this.$element.on('change.select2', function () {
          self.dataAdapter.current(function (data) {
            self.trigger('selection:update', {
              data: data
            });
          });
        });

        this.$element.on('focus.select2', function (evt) {
          self.trigger('focus', evt);
        });

        this._syncA = Utils.bind(this._syncAttributes, this);
        this._syncS = Utils.bind(this._syncSubtree, this);

        if (this.$element[0].attachEvent) {
          this.$element[0].attachEvent('onpropertychange', this._syncA);
        }

        var observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        if (observer != null) {
          this._observer = new observer(function (mutations) {
            $.each(mutations, self._syncA);
            $.each(mutations, self._syncS);
          });
          this._observer.observe(this.$element[0], {
            attributes: true,
            childList: true,
            subtree: false
          });
        } else if (this.$element[0].addEventListener) {
          this.$element[0].addEventListener('DOMAttrModified', self._syncA, false);
          this.$element[0].addEventListener('DOMNodeInserted', self._syncS, false);
          this.$element[0].addEventListener('DOMNodeRemoved', self._syncS, false);
        }
      };

      Select2.prototype._registerDataEvents = function () {
        var self = this;

        this.dataAdapter.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };

      Select2.prototype._registerSelectionEvents = function () {
        var self = this;
        var nonRelayEvents = ['toggle', 'focus'];

        this.selection.on('toggle', function () {
          self.toggleDropdown();
        });

        this.selection.on('focus', function (params) {
          self.focus(params);
        });

        this.selection.on('*', function (name, params) {
          if ($.inArray(name, nonRelayEvents) !== -1) {
            return;
          }

          self.trigger(name, params);
        });
      };

      Select2.prototype._registerDropdownEvents = function () {
        var self = this;

        this.dropdown.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };

      Select2.prototype._registerResultsEvents = function () {
        var self = this;

        this.results.on('*', function (name, params) {
          self.trigger(name, params);
        });
      };

      Select2.prototype._registerEvents = function () {
        var self = this;

        this.on('open', function () {
          self.$container.addClass('select2-container--open');
        });

        this.on('close', function () {
          self.$container.removeClass('select2-container--open');
        });

        this.on('enable', function () {
          self.$container.removeClass('select2-container--disabled');
        });

        this.on('disable', function () {
          self.$container.addClass('select2-container--disabled');
        });

        this.on('blur', function () {
          self.$container.removeClass('select2-container--focus');
        });

        this.on('query', function (params) {
          if (!self.isOpen()) {
            self.trigger('open', {});
          }

          this.dataAdapter.query(params, function (data) {
            self.trigger('results:all', {
              data: data,
              query: params
            });
          });
        });

        this.on('query:append', function (params) {
          this.dataAdapter.query(params, function (data) {
            self.trigger('results:append', {
              data: data,
              query: params
            });
          });
        });

        this.on('keypress', function (evt) {
          var key = evt.which;

          if (self.isOpen()) {
            if (key === KEYS.ESC || key === KEYS.TAB || key === KEYS.UP && evt.altKey) {
              self.close();

              evt.preventDefault();
            } else if (key === KEYS.ENTER) {
              self.trigger('results:select', {});

              evt.preventDefault();
            } else if (key === KEYS.SPACE && evt.ctrlKey) {
              self.trigger('results:toggle', {});

              evt.preventDefault();
            } else if (key === KEYS.UP) {
              self.trigger('results:previous', {});

              evt.preventDefault();
            } else if (key === KEYS.DOWN) {
              self.trigger('results:next', {});

              evt.preventDefault();
            }
          } else {
            if (key === KEYS.ENTER || key === KEYS.SPACE || key === KEYS.DOWN && evt.altKey) {
              self.open();

              evt.preventDefault();
            }
          }
        });
      };

      Select2.prototype._syncAttributes = function () {
        this.options.set('disabled', this.$element.prop('disabled'));

        if (this.options.get('disabled')) {
          if (this.isOpen()) {
            this.close();
          }

          this.trigger('disable', {});
        } else {
          this.trigger('enable', {});
        }
      };

      Select2.prototype._syncSubtree = function (evt, mutations) {
        var changed = false;
        var self = this;

        // Ignore any mutation events raised for elements that aren't options or
        // optgroups. This handles the case when the select element is destroyed
        if (evt && evt.target && evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP') {
          return;
        }

        if (!mutations) {
          // If mutation events aren't supported, then we can only assume that the
          // change affected the selections
          changed = true;
        } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
          for (var n = 0; n < mutations.addedNodes.length; n++) {
            var node = mutations.addedNodes[n];

            if (node.selected) {
              changed = true;
            }
          }
        } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
          changed = true;
        }

        // Only re-pull the data if we think there is a change
        if (changed) {
          this.dataAdapter.current(function (currentData) {
            self.trigger('selection:update', {
              data: currentData
            });
          });
        }
      };

      /**
       * Override the trigger method to automatically trigger pre-events when
       * there are events that can be prevented.
       */
      Select2.prototype.trigger = function (name, args) {
        var actualTrigger = Select2.__super__.trigger;
        var preTriggerMap = {
          'open': 'opening',
          'close': 'closing',
          'select': 'selecting',
          'unselect': 'unselecting'
        };

        if (args === undefined) {
          args = {};
        }

        if (name in preTriggerMap) {
          var preTriggerName = preTriggerMap[name];
          var preTriggerArgs = {
            prevented: false,
            name: name,
            args: args
          };

          actualTrigger.call(this, preTriggerName, preTriggerArgs);

          if (preTriggerArgs.prevented) {
            args.prevented = true;

            return;
          }
        }

        actualTrigger.call(this, name, args);
      };

      Select2.prototype.toggleDropdown = function () {
        if (this.options.get('disabled')) {
          return;
        }

        if (this.isOpen()) {
          this.close();
        } else {
          this.open();
        }
      };

      Select2.prototype.open = function () {
        if (this.isOpen()) {
          return;
        }

        this.trigger('query', {});
      };

      Select2.prototype.close = function () {
        if (!this.isOpen()) {
          return;
        }

        this.trigger('close', {});
      };

      Select2.prototype.isOpen = function () {
        return this.$container.hasClass('select2-container--open');
      };

      Select2.prototype.hasFocus = function () {
        return this.$container.hasClass('select2-container--focus');
      };

      Select2.prototype.focus = function (data) {
        // No need to re-trigger focus events if we are already focused
        if (this.hasFocus()) {
          return;
        }

        this.$container.addClass('select2-container--focus');
        this.trigger('focus', {});
      };

      Select2.prototype.enable = function (args) {
        if (this.options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + ' instead.');
        }

        if (args == null || args.length === 0) {
          args = [true];
        }

        var disabled = !args[0];

        this.$element.prop('disabled', disabled);
      };

      Select2.prototype.data = function () {
        if (this.options.get('debug') && arguments.length > 0 && window.console && console.warn) {
          console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + 'should consider setting the value instead using `$element.val()`.');
        }

        var data = [];

        this.dataAdapter.current(function (currentData) {
          data = currentData;
        });

        return data;
      };

      Select2.prototype.val = function (args) {
        if (this.options.get('debug') && window.console && console.warn) {
          console.warn('Select2: The `select2("val")` method has been deprecated and will be' + ' removed in later Select2 versions. Use $element.val() instead.');
        }

        if (args == null || args.length === 0) {
          return this.$element.val();
        }

        var newVal = args[0];

        if ($.isArray(newVal)) {
          newVal = $.map(newVal, function (obj) {
            return obj.toString();
          });
        }

        this.$element.val(newVal).trigger('change');
      };

      Select2.prototype.destroy = function () {
        this.$container.remove();

        if (this.$element[0].detachEvent) {
          this.$element[0].detachEvent('onpropertychange', this._syncA);
        }

        if (this._observer != null) {
          this._observer.disconnect();
          this._observer = null;
        } else if (this.$element[0].removeEventListener) {
          this.$element[0].removeEventListener('DOMAttrModified', this._syncA, false);
          this.$element[0].removeEventListener('DOMNodeInserted', this._syncS, false);
          this.$element[0].removeEventListener('DOMNodeRemoved', this._syncS, false);
        }

        this._syncA = null;
        this._syncS = null;

        this.$element.off('.select2');
        this.$element.attr('tabindex', this.$element.data('old-tabindex'));

        this.$element.removeClass('select2-hidden-accessible');
        this.$element.attr('aria-hidden', 'false');
        this.$element.removeData('select2');

        this.dataAdapter.destroy();
        this.selection.destroy();
        this.dropdown.destroy();
        this.results.destroy();

        this.dataAdapter = null;
        this.selection = null;
        this.dropdown = null;
        this.results = null;
      };

      Select2.prototype.render = function () {
        var $container = $('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + '</span>');

        $container.attr('dir', this.options.get('dir'));

        this.$container = $container;

        this.$container.addClass('select2-container--' + this.options.get('theme'));

        $container.data('element', this.$element);

        return $container;
      };

      return Select2;
    });

    S2.define('jquery-mousewheel', ['jquery'], function ($) {
      // Used to shim jQuery.mousewheel for non-full builds.
      return $;
    });

    S2.define('jquery.select2', ['jquery', 'jquery-mousewheel', './select2/core', './select2/defaults'], function ($, _, Select2, Defaults) {
      if ($.fn.select2 == null) {
        // All methods that should return the element
        var thisMethods = ['open', 'close', 'destroy'];

        $.fn.select2 = function (options) {
          options = options || {};

          if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            this.each(function () {
              var instanceOptions = $.extend(true, {}, options);

              var instance = new Select2($(this), instanceOptions);
            });

            return this;
          } else if (typeof options === 'string') {
            var ret;
            var args = Array.prototype.slice.call(arguments, 1);

            this.each(function () {
              var instance = $(this).data('select2');

              if (instance == null && window.console && console.error) {
                console.error('The select2(\'' + options + '\') method was called on an ' + 'element that is not using Select2.');
              }

              ret = instance[options].apply(instance, args);
            });

            // Check if we should be returning `this`
            if ($.inArray(options, thisMethods) > -1) {
              return this;
            }

            return ret;
          } else {
            throw new Error('Invalid arguments for Select2: ' + options);
          }
        };
      }

      if ($.fn.select2.defaults == null) {
        $.fn.select2.defaults = Defaults;
      }

      return Select2;
    });

    // Return the AMD loader configuration so it can be used outside of this file
    return {
      define: S2.define,
      require: S2.require
    };
  }();

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(78)

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(79)

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(80)

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(81)

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by liu on 17-4-30.
 */
var React = __webpack_require__(9);
var ReactDOM = __webpack_require__(8);
var $ = __webpack_require__(1);
__webpack_require__(6);
__webpack_require__(7);

__webpack_require__(2);
__webpack_require__(4);
__webpack_require__(3);
__webpack_require__(5);

var Header = React.createClass({
    displayName: 'Header',

    render: function render() {
        return React.createElement(
            'h1',
            { className: 'text-center' },
            'Header'
        );
    }
});

var CourseSelect = React.createClass({
    displayName: 'CourseSelect',

    render: function render() {
        return React.createElement(
            'select',
            { ref: 'select' },
            React.createElement('option', null)
        );
    },
    componentDidMount: function componentDidMount() {
        $(this.refs.select).select2({
            data: this.props.courses,
            placeholder: "---",
            allowClear: true
        });
    }
});

var FileTree = React.createClass({
    displayName: 'FileTree',

    callbackTreeData: function callbackTreeData(node, callback) {
        var children = [];
        this.props.files.map(function (file) {
            children.push({ "text": file });
        });
        var data = [{
            "text": "Course Name",
            "state": { "opened": true },
            children: children
        }];
        callback(data);
    },
    getDefaultProps: function getDefaultProps() {
        return {
            fileTree: {}
        };
    },
    render: function render() {
        return React.createElement('div', { ref: 'fileTree' });
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $(this.refs.fileTree).jstree({
            'core': {
                'data': function data(node, callback) {
                    callback(_this.props.fileTree);
                },
                worker: false
            }
        });
        console.log("Tree init");
    },
    componentDidUpdate: function componentDidUpdate() {
        $(this.refs.fileTree).jstree(true).refresh();
        console.log("Tree update");
    }
});

var File = React.createClass({
    displayName: 'File',

    render: function render() {
        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                null,
                this.props.file.display_name
            ),
            React.createElement(
                'td',
                null,
                this.props.file.created_at
            ),
            React.createElement(
                'td',
                null,
                this.props.file.updated_at
            ),
            React.createElement(
                'td',
                null,
                this.props.file.size
            )
        );
    }
});

var Folder = React.createClass({
    displayName: 'Folder',

    render: function render() {
        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                null,
                this.props.folder.name
            ),
            React.createElement(
                'td',
                null,
                this.props.folder.created_at
            )
        );
    }
});

var FileList = React.createClass({
    displayName: 'FileList',

    render: function render() {
        return React.createElement(
            'table',
            { className: 'table' },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        null,
                        'Name'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Time Created'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Time Updated'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Size'
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                this.props.folder.children.map(function (folder) {
                    return React.createElement(Folder, { folder: folder });
                }),
                this.props.folder.files.map(function (file) {
                    return React.createElement(File, { file: file });
                })
            )
        );
    }
});

var FileView = React.createClass({
    displayName: 'FileView',

    getDefaultProps: function getDefaultProps() {
        return {
            files: [1, 2, 3],
            courses: ['Course 1', 'Course 2'],
            fileTree: {
                text: 'Course Name',
                children: [],
                files: []
            }
        };
    },
    getInitialState: function getInitialState() {
        return {
            data: {
                files: [{ display_name: 'A.jpg', folder_id: 2, filename: '12345.jpg' }, { display_name: 'B.jpg', folder_id: 8, filename: '12345.jpg' }, { display_name: 'C.jpg', folder_id: 8, filename: '12345.jpg' }, { display_name: 'D.jpg', folder_id: 6, filename: '12345.jpg' }, { display_name: 'E.jpg', folder_id: 6, filename: '12345.jpg' }, { display_name: 'F.jpg', folder_id: 2, filename: '12345.jpg' }, { display_name: 'F.jpg', folder_id: 22, filename: '12345.jpg' }],
                folders: [{ id: 2, parent_folder_id: null, name: 'Folder 2' }, { id: 6, parent_folder_id: 2, name: 'Folder 6' }, { id: 8, parent_folder_id: 2, name: 'Folder 8' }, { id: 22, parent_folder_id: 6, name: 'Folder 22' }]
            }
        };
    },
    processData: function processData() {
        var fileTree = this.props.fileTree;
        var folderMap = {};
        this.state.data.folders.map(function (folder) {
            if (!folderMap.hasOwnProperty(folder.id)) {
                folderMap[folder.id] = { children: [] };
            }
            folderMap[folder.id].text = folderMap[folder.id].name = folder.name;
            folderMap[folder.id].id = folder.id;
            folderMap[folder.id].files = [];
            if (folder.parent_folder_id) {
                if (!folderMap.hasOwnProperty(folder.parent_folder_id)) {
                    folderMap[folder.parent_folder_id] = { children: [] };
                }
                folderMap[folder.parent_folder_id].children.push(folderMap[folder.id]);
            } else {
                fileTree = folderMap[folder.id];
            }
        });
        this.state.data.files.map(function (file) {
            if (folderMap.hasOwnProperty(file.folder_id)) {
                folderMap[file.folder_id].files.push(file);
            }
        });
        fileTree.state = {
            opened: true
        };
        console.log(fileTree);
        this.setState({
            fileTree: fileTree,
            folderMap: folderMap,
            currentFolderId: fileTree.id
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-sm-4' },
                React.createElement(CourseSelect, { courses: this.props.courses }),
                React.createElement(FileTree, { fileTree: this.state.fileTree })
            ),
            React.createElement(
                'div',
                { className: 'col-sm-8' },
                React.createElement(FileList, { folder: this.state.currentFolderId ? this.state.folderMap[this.state.currentFolderId] : this.props.fileTree })
            )
        );
    },
    componentDidMount: function componentDidMount() {
        this.processData();
    }
});

var App = React.createClass({
    displayName: 'App',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'app-body container' },
            React.createElement(Header, null),
            React.createElement(FileView, { ref: 'fileView' })
        );
    },

    componentDidMount: function componentDidMount() {
        /*setTimeout(() => {
         this.refs.fileView.setState({
         data: {
         files: [1, 2]
         }
         })
         }, 1000);*/
    }

});

ReactDOM.render(React.createElement(App, null), document.getElementById('body'));

/***/ })
/******/ ]);