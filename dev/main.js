class LangVar {
    /**
     * Class Constructor
     * @param {string} m - Name of the module
     * @param {object} obj - The Object of variables to rewrite in module
     * @return {object} The public calls
     */
    constructor (m, obj = {}) {
        const vars = {
            m: null,                        // Module Node before modification
            obj: obj,                       // object
            //_mObj: {},                      // Stores Module Object while compiling
            _mqs: `lv-module="${m}"`,       // module query selector
            _w: true,                       // Enable or Disable warning
            //_mC: null                       // Stores Module content after modification
        };
        Object.assign(this, vars);

        if (typeof m !== undefined && typeof m === 'string') {
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
    _init() {
        this.m = $(`[${this._mqs}]`);
        const compMod =  this._compileModule(this.m);  // get compiled module
        const getObj = compMod.object;
        let c = compMod.content;
        Object.keys(getObj).map((k) => {
            if (getObj[k] !== undefined) {
                c = c.replace(`{${k}}`, getObj[k]);
            } else {
                c = c.replace(`{${k}}`, '');
            }
        });
        console.log(c);
    }

    /**
     * Removes the spaces in HTML expressions paranthese and compile module
     * @private {function} - Removes Spaces and Compile module
     * @return {object} - object -> variables with values && content -> compiled content for modification
     */
    _compileModule(elm) {
        let e = elm.innerHTML.split("{"); // get element content with frst split
        let obj = {}; // store variable names
        for (var i = 1; i < e.length; i++) {
            let n = e[i].split('}'); // last split and return only name without parantheses
            const val = n[0].replace(/\s/g, ''); // replace spaces
            Object.assign(obj, {[val] : this.obj[val]}); // store variable name and it's defined value
            e[i] = `{${val}}${n[1]}`; // assign back to e
        }
        return {
            object: obj,            // variable used in module
            content: e.join('')     // content to replace module after compilation
        }
    }


    /**
     * Throw warnings
     * @private 
     * @param {string} m - Message to print
     * @return {void}
     */
    _warnings(w) {
        if (this._w === true) {
            console.warn(w);
        }
    }


    /**
     * Setters
     */
    
}