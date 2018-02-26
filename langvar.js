"use strict";

var _typeof =
    typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? function (obj) {
            return typeof obj;
        }
        : function (obj) {
            return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var LangVar = (function () {
    /* 
       * @param obj Object of the variables to write
       * @param select the HTML select format default is [lv]
       * @return object
       */
    function LangVar() {
        var obj =
            arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var selector =
            arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, LangVar);

        var vars = {
            obj: obj, // object for direct variable
            selector: selector + "lv", // query selector
            modules: [] // modules list with key > name & v > innerContent
        };
        Object.assign(this, vars);
        if (this.obj) {
            this._extract();
        }

        // return accessible functions and variables for class instance
        return {
            module: this.module.bind(this),
            update: this.update.bind(this)
        };
    }

    /* 
       * @type public to add a module
       * @param n name of the container for module
       * @param obj the object of the variables to write
       * @return instance
       */

    _createClass(LangVar, [
        {
            key: "module",
            value: function module(n) {
                var obj =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : {};

                var m = document.querySelector(
                    "[" + this.selector + "-module=" + n + "]"
                ); // getting the module container
                var m_c = null; // store updated content to return
                if (
                    (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !==
                    "object" ||
                    !obj
                )
                    return this;
                if (!this.modules[n]) {
                    this.modules[n] = m.innerHTML; // adding module to the modules list
                    this.modules["obj-" + n] = obj; // setting module object into modules with obj prefix
                } else {
                    // if new object is same as old one then return
                    if (isEquivalent(this.modules["obj-" + n], obj)) return this;
                    this.modules["obj-" + n] = Object.assign(
                        this.modules["obj-" + n],
                        obj
                    );
                }
                try {
                    m_c = this._putContentOnModule(
                        this.modules["obj-" + n],
                        this.modules[n]
                    ); // get updated module by replacing variables
                } catch (error) {
                    console.warn("Unable to update module " + n);
                }
                m.innerHTML = m_c;
                return this;
            }

            /* 
               * @type public to update existing variables or module
               * @param g if object then update vars else update the module
               * @param obj the object of the variables to update
               * @return instance
               */
        },
        {
            key: "update",
            value: function update(g, obj) {
                var self = this;
                if (
                    (typeof g === "undefined" ? "undefined" : _typeof(g)) === "object"
                ) {
                    Object.keys(g).map(function (k) {
                        try {
                            // updating with dirty checking methodology
                            if (g[k] !== self.obj[k]) {
                                self._putContent(k, g[k]); // if direct variable then update
                            }
                        } catch (error) {
                            console.warn("Unable to find variable [" + k + "] to update");
                        }
                    });
                    this.obj = Object.assign(this.obj, g);
                } else {
                    self.module(g, obj); // if module defined then update module
                }
                return this;
            }

            /* 
               * @type Private function to Init the variable extraction to HTML
               * @return void
               */
        },
        {
            key: "_extract",
            value: function _extract() {
                var self = this;
                Object.keys(this.obj).map(function (k) {
                    try {
                        self._putContent(k, self.obj[k]);
                    } catch (error) {
                        console.warn("Unable to write variable [" + k + "]");
                    }
                });
            }

            /* 
               * @type Private Function to write down variable in context
               * @param k Key where to write the variable
               * @param v Value to write in
               * @return void
               */
        },
        {
            key: "_putContent",
            value: function _putContent(k, v) {
                var c = window.document.querySelectorAll(
                    "[" + this.selector + '="' + k + '"]'
                );
                if (c.length > 1) {
                    for (var i = 0; i < c.length; i++) {
                        c[i].innerHTML = v;
                    }
                } else {
                    c[0].innerHTML = v;
                }
            }

            /* 
               * @type Private Function to write down variable in module()
               * @param obj object to replace in content
               * @param e content to replace
               * @return html content
               */
        },
        {
            key: "_putContentOnModule",
            value: function _putContentOnModule(obj, e) {
                Object.keys(obj).map(function (k) {
                    e = e.replace("%" + k + "%", obj[k]);
                });
                return e;
            }
        }
    ]);

    return LangVar;
})();

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
