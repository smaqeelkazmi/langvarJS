class LangVar {
    /**
     * Class Constructor
     * @param {string} m - Name of the module
     * @param {object} obj - The Object of variables to rewrite in module
     * @return {object} The public calls
     */
    constructor (m, obj = {}) {
        const vars = {
            m: null,                        // Module Node
            obj: obj,                       // object
            _mObj: null,                    // Stores Module Object while compiling
            _mqs: `lv-module="${m}"`,       // module query selector
            _w: true                        // Enable or Disable warning
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
        this._rmSpaces(); // Remove the spaces from expression parantheses
        console.log(this.m_c)
    }

    /**
     * Removes the spaces in HTML expressions paranthese
     * @private {function} - Removes Spaces
     * @return {void}
     */
    _rmSpaces() {
        let obj = this.m.innerHTML.split("{");
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
    _warnings(w) {
        if (this._w === true) {
            console.warn(w);
        }
    }


    /**
     * Setters
     */
    
}