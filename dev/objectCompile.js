/**
 * Check if variable is using a nested object
 * @private
 * @param {string} v
 * @return {boolean}
 */
const rgxChild = /[\.\+\[]/g;
const hasChildVar = (v) => {
    if ((rgxChild).test(v)) {
        return true;
    }
    return false;
};


/**
 * @private
 */
const getChildVar = (v, self) => {
    const sp = v.split('.');
    if (sp.length === 2) { // if has one child
        return self.obj[sp[0]][sp[1]];
    } else if (sp.length > 2) { // if has nested childs
        return Object.byString(self.obj, v);
    }
};


const rgxExp = /[\+\-\*\/\\]/g;
/**
 * Check if variable is using an expression
 * @private
 * @param {string} v
 * @return {boolean}
 */
const hasExp = (v) => {
    if ((rgxExp).test(v)) {
        return true;
    }
    return false;
};

const getExp = (v) => {
    return v.match(rgxExp);
};

const getExpVar = (v) => {
    return v.split(rgxExp);
};

const stripExp = (v) => {
    exp = getExp(v);
};

const applyMathExp = (x, v1, v2) => {
    if (x === "+") {
        
    }
};

const replaceMathSymbol = (v) => {
    return v.replace(/\+/g, '%p%')
        .replace(/\-/g, '%m%')
        .replace(/\*/g, '%mp%')
        .replace(/\//g, '%d%');
}