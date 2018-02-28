"use strict";

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
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LangVar = function () {
    /**
     * Class Constructor
     * @param {string} m - Name of the module
     * @param {object} obj - The Object of variables to rewrite in module
     * @return {object} The public calls
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
     * @private function
     */


    _createClass(LangVar, [{
        key: '_init',
        value: function _init() {
            this.m = $('[' + this._mqs + ']');
            var compMod = this._compileModule(this.m); // get compiled module
            var getObj = compMod.object;
            var c = compMod.content;
            Object.keys(getObj).map(function (k) {
                if (getObj[k] !== undefined) {
                    c = c.replace('{' + k + '}', getObj[k]);
                } else {
                    c = c.replace('{' + k + '}', '');
                }
            });
            console.log(c);
        }

        /**
         * Removes the spaces in HTML expressions paranthese and compile module
         * @private {function} - Removes Spaces and Compile module
         * @return {object} - object -> variables with values && content -> compiled content for modification
         */

    }, {
        key: '_compileModule',
        value: function _compileModule(elm) {
            var e = elm.innerHTML.split("{"); // get element content with frst split
            var obj = {}; // store variable names
            for (var i = 1; i < e.length; i++) {
                var n = e[i].split('}'); // last split and return only name without parantheses
                var val = n[0].replace(/\s/g, ''); // replace spaces
                Object.assign(obj, _defineProperty({}, val, this.obj[val])); // store variable name and it's defined value
                e[i] = '{' + val + '}' + n[1]; // assign back to e
            }
            return {
                object: obj, // variable used in module
                content: e.join('') // content to replace module after compilation
            };
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
