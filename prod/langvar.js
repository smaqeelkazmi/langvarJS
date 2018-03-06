'use strict';

/* 
 * @type function to compare two objects
 * @param a,b object for comparison
 * @return boolean
 */
var isEquivalent = function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
};

/**
 * Query Selector
 * @param {string} q - HTML element attribute to select DOM
 * @return {NodeList} 
 */

var $ = function $(q) {
    var selector = document.querySelectorAll(q);
    if (selector.length < 2) return selector[0];
    return selector;
};

/**
 * Swap Keys with Values
 * @param {Object} obj - Object to swap it's keys with values
 * @return {Object}
 */
var swap = function swap(obj) {
    var ret = {};
    for (var k in obj) {
        ret[obj[k]] = k;
    }
    return ret;
};

/**
 * Get Nested Object value by using string as key
 * @param {Object} o - Object ex: {a : { b : '' }}
 * @param {string} s - String as Key ex: a.b
 * @return {string}
 */
Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * LangVar Library Class
 * @class
 * @author SM. Aqeel
 */
var LangVar = function () {
    /**
     * Class Constructor
     * @default
     * @param {string} m=null - Name of the module
     * @param {Object} obj={} - The Object of variables to rewrite in module
     * @return {Object} - The public calls
     */
    function LangVar(m) {
        var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, LangVar);

        var vars = {
            m: null, // Module Node before modification
            obj: obj, // object
            //_mObj: {},                      // Stores Module Object while compiling
            _mqs: 'lv-module="' + m + '"', // module query selector
            _w: true // Enable or Disable warning
            //_mC: null                       // Stores Module content after modification
        };
        Object.assign(this, vars);

        if ((typeof m === 'undefined' ? 'undefined' : _typeof(m)) !== undefined && typeof m === 'string') {
            this._init();
        }

        return {
            m: m // return the name of the module
        };
    }

    /**
     * Initiate module
     * @private
     */


    _createClass(LangVar, [{
        key: '_init',
        value: function _init() {
            this.m = $('[' + this._mqs + ']');
            var compMod = this._getCompileModule(this.m); // get compiled module
            this.m.innerHTML = this._getGenContent(compMod.content, compMod.object); // print result in module
        }

        /**
         * Remove Spaces
         * Store used variables name in {obj}
         * return object of used variables and modified content
         * @private
         * @param {NodeSelector} - Module Node to compile and produce result
         * @return {Object} - object -> variables with values && content -> compiled content for modification
         */

    }, {
        key: '_getCompileModule',
        value: function _getCompileModule(elm) {
            var e = elm.innerHTML.split("{"); // get element content with frst split
            var obj = {}; // store variable names
            for (var i = 1; i < e.length; i++) {
                var n = e[i].split('}'); // last split and return only name without parantheses
                var val = n[0].replace(/\s/g, ''); // replace spaces
                Object.assign(obj, this._getVar(val)); // store variable name and it's defined value
                e[i] = '{' + val + '}' + n[1]; // assign back to e
            }
            return {
                object: obj, // variable used in module
                content: e.join('') // content to replace module after compilation
            };
        }

        /**
         * Returns the variable with value by name as object
         * @private
         * @param {string} v - name of the variable to get the value
         * @return {Object}
         */

    }, {
        key: '_getVar',
        value: function _getVar(v) {
            var vHasChild = v.split('.'); // split by dot

            if (vHasChild.length === 1) {
                // if has no child
                return _defineProperty({}, v, this.obj[v]);
            } else if (vHasChild.length === 2) {
                // if has one child
                return _defineProperty({}, v, this.obj[vHasChild[0]][vHasChild[1]]);
            } else if (vHasChild.length > 2) {
                // if has nested childs
                return _defineProperty({}, v, Object.byString(this.obj, v));
            } else {
                return _defineProperty({}, v, undefined);
            }
        }

        /**
         * Print Result 
         * @private
         * @param {string} c - Content to replace in
         * @param {Object} obj - Replace content with this
         * @return {string} Return produced content after replacing
         */

    }, {
        key: '_getGenContent',
        value: function _getGenContent(c, obj) {
            var _this = this;

            Object.keys(obj).map(function (k) {
                var rgx = '{' + k + '}';
                rgx = new RegExp(rgx, "g");
                if (obj[k] !== undefined) {
                    c = c.replace(rgx, obj[k]);
                } else {
                    _this._warnings('Unable to find value for the variable [' + k + ']');
                    c = c.replace(rgx, '');
                }
            });
            return c;
        }

        /**
         * Throw warnings
         * @private 
         * @param {string} m - Message to print
         * @return {void}
         */

    }, {
        key: '_warnings',
        value: function _warnings(w) {
            if (this._w === true) {
                console.warn(w);
            }
        }

        /**
         * Setters
         */

    }]);

    return LangVar;
}();
