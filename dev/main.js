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
            _openP: "{{",
            _closeP: "}}"
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
     * return object of used variables and modified content with removed spaces
     * @private
     * @param {NodeSelector} - Module Node to compile and produce result
     * @return {Object} - object -> variables with values && content -> compiled content for modification
     */
    _getCompileModule(elm) {
        let e = elm.innerHTML.split(this._openP); // get element content with frst split
        let obj = {}; // store variable names
        for (var i = 1; i < e.length; i++) {
            let n = e[i].split(this._closeP); // last split and return only name without parantheses
            let val = n[0].replace(/\s/g, ''); // replace spaces and get variable name only
            Object.assign(obj, this._getVar(val)); // store variable name as key and it's defined value as val
            val = replaceMathSymbol(val); // replace math symbols with strings for regex validation
            e[i] = `${this._openP}${val}${this._closeP}${n[1]}`; // assign back to e
        }
        return {
            object: obj,            // variable used in module
            content: e.join('')     // content to replace module after compilation
        };
    }


    /**
     * Returns the variable with value as { varName: varVal }
     * @private
     * @param {string} v - name of the variable to get the value
     * @return {Object}
     */
    _getVar(v) {
        let val = [v];
        let exp = null;
        // check if variable has math expression
        if (hasExp(v)) {
            exp = getExp(v); // get the expression used in statement
            val = getExpVar(v); // get the variable used in statement
        }

        // check if variable has filter

        // apply() the variable to get value  
        const applyVar = (v) => {
            if (hasChildVar(v)) { // if variable is using nested object value
                return getChildVar(v, this);
            } else { // if variable has no child
                return this.obj[v];
            }
        };
        
        // check if variable is valid the add to [val]
        if (val.length > 1) { // if variables are in multiple
            let vExp = v;
            for (const k in val) {
                const a = applyVar(val[k]); // get value of single variable
                const b = (a !== undefined && typeof a === 'number') ? a : 0; // check and filter
                vExp = vExp.replace(val[k], b);
            }
            val = `${eval(vExp)}`;
            v = replaceMathSymbol(v); // replace math symbols with strings for regex validation
        } else if ( v !== '') {
            val = applyVar(v);
        }
        

        return {
            [v]: val
        };
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
            let rgx = `${this._openP}${k}${this._closeP}`;
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
