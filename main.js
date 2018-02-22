class lv {
    constructor(obj) {
       this.obj = obj; 
       this.extract();
    }

    extract() {
        const self = this;
        Object.keys(this.obj).map(function(k) {
            self.putContent(k, self.obj[k]);
        });
    }

    putContent(k, v) {
        let c = window.document.querySelectorAll('[data-lv="'+ k +'"]');
        if (c.length > 1) {
            for (let i = 0; i < c.length; i++) {
                c[i].innerHTML = v;
            }
        } else {
            c[0].innerHTML = v;
        }
    }
}