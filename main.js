class LangVar {
    /* 
    * @param obj Object of the variables to write
    * @param select the HTML select format default is [lv]
    */
    constructor(obj = {}, selector = '') {
       this.obj = obj;
       this.selector = selector + "lv";
       if (this.obj) {
           this._extract();
       }

       // return accessible functions and variables for class instance
       return {
           module: this.module.bind(this)
        };
    }


    /* 
    * @type public to add a module
    * @param n name of the container for module
    * @param obj the object of the variables to write
    */
    module(n, obj = {}) {
        const m = document.querySelector("["+ this.selector +"-module="+ n +"]"); // getting the module
        let m_c = m.innerHTML;
        try {
            Object.keys(obj).map(function (k) {
                m_c = m_c.replace("%"+ k +"%", obj[k]);
            });
        } catch (error) {
            console.log(error);
        }
        m.innerHTML = m_c;
    }


    /* 
    * @type Private function to Init the variable extraction to HTML
    */
    _extract() {
        const self = this;
        Object.keys(this.obj).map(function(k) {
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
        let c = window.document.querySelectorAll('['+ this.selector +'="'+ k +'"]');
        if (c.length > 1) {
            for (let i = 0; i < c.length; i++) {
                c[i].innerHTML = v;
            }
        } else {
            c[0].innerHTML = v;
        }
    }
}