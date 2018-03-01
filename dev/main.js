/**
 * LangVar Library Class
 * @class
 * @author SM. Aqeel
 */
class LangVar {
    /**
     * Class Constructor
     * @default
     * @param {string} m=null - Name of the module
     * @param {Object} obj={} - The Object of variables to rewrite in module
     * @return {Object} - The public calls
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
     * @private
     */
    _init() {
        this.m = $(`[${this._mqs}]`);
        const compMod =  this._getCompileModule(this.m);  // get compiled module
        this.m.innerHTML = this._getGenContent(
            compMod.content, 
            compMod.object
        ); // print result in module
    }

    /**
     * Remove Spaces
     * Store used variables name in {obj}
     * return object of used variables and modified content
     * @private
     * @param {NodeSelector} - Module Node to compile and produce result
     * @return {Object} - object -> variables with values && content -> compiled content for modification
     */
    _getCompileModule(elm) {
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
     * Print Result 
     * @private
     * @param {string} c - Content to replace in
     * @param {Object} obj - Replace content with this
     * @return {string} Return produced content after replacing
     */
    _getGenContent(c, obj) {
        Object.keys(obj).map((k) => {
            let rgx = `{${k}}`;
            rgx = new RegExp(rgx, "g");
            if (obj[k] !== undefined) {
                c = c.replace(rgx, obj[k]);
            } else {
                this._warnings(`Unable to find value for the variable [${k}]`);
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
    _warnings(w) {
        if (this._w === true) {
            console.warn(w);
        }
    }


    /**
     * Setters
     */
    
}