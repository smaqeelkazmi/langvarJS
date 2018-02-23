class LangVar {
    /* 
    * @param obj Object of the variables to write
    * @param select the HTML select format default is [lv]
    */
    constructor(obj = {}, selector = '') {
        const vars = {
            obj: obj, // object for direct variable
            selector: selector + "lv",  // query selector
            modules: [] // modules list with key > name & v > innerContent
        }
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
    */
    module(n, obj = {}) {
        const m = document.querySelector("[" + this.selector + "-module=" + n + "]"); // getting the module container
        let m_c = null;  // store updated content to return
        if (typeof obj === 'undefined')
            return this;
            
        if (!this.modules[n]) {
            this.modules[n] = m.innerHTML; // adding module to the modules list
            this.modules['obj-' + n] = obj; // setting module object into modules with obj prefix
        } else {
            if (isEquivalent(this.modules['obj-' + n], obj))
                return this;
            this.modules['obj-' + n] = Object.assign(this.modules['obj-' + n], obj);
        }
        try {
            m_c = this._putContentOnModule(this.modules['obj-' + n], this.modules[n]); // get updated module by replacing variables
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
     */
    update(g, obj) {
        const self = this;
        if (typeof g === "object") {
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
    }


    /* 
    * @type Private function to Init the variable extraction to HTML
    */
    _extract() {
        const self = this;
        Object.keys(this.obj).map(function (k) {
            try {
                self._putContent(k, self.obj[k]);
            } catch (error) {
                console.warn("Unable to write variable [" + k + "]");
            }
        });
    }


    /* 
    * @type Private Function to write down variable in extract()
    * @param k Key where to write the variable
    * @param v Value to write in
    */
    _putContent(k, v) {
        let c = window.document.querySelectorAll('[' + this.selector + '="' + k + '"]');
        if (c.length > 1) {
            for (let i = 0; i < c.length; i++) {
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
     */
    _putContentOnModule(obj, e) {
        Object.keys(obj).map(function (k) {
            e = e.replace("%" + k + "%", obj[k]);
        });
        return e;
    }
}


const isEquivalent = (a, b) => {
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
}