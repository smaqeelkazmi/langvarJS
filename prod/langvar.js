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
            m: null, // Module Node
            obj: obj, // object
            _mObj: null, // Stores Module Object while compiling
            _mqs: 'lv-module="' + m + '"', // module query selector
            _w: true // Enable or Disable warning
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
            this._rmSpaces(); // Remove the spaces from expression parantheses
            console.log(this.m_c);
        }

        /**
         * Removes the spaces in HTML expressions paranthese
         * @private {function} - Removes Spaces
         * @return {void}
         */

    }, {
        key: '_rmSpaces',
        value: function _rmSpaces() {
            var obj = this.m.innerHTML.split("{");
            for (var i = 1; i < obj.length; i++) {
                obj[i] = '{' + obj[i].split('}')[0].replace(/\s/g, '') + '}';
            }
            this.m_c = obj;
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
