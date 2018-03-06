/* 
 * @type function to compare two objects
 * @param a,b object for comparison
 * @return boolean
 */
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
};



/**
 * Query Selector
 * @param {string} q - HTML element attribute to select DOM
 * @return {NodeList} 
 */

const $ = (q) => {
    const selector = document.querySelectorAll(q);
    if (selector.length < 2)
        return selector[0];
    return selector;
};



/**
 * Swap Keys with Values
 * @param {Object} obj - Object to swap it's keys with values
 * @return {Object}
 */
const swap = obj => {
    var ret = {};
    for (var k in obj) {
        ret[obj[k]] = k;
    }
    return ret;
};



/**
 * Get Nested Object value by using string as key
 * @param {Object} o - Object ex: {a : { b : '' }}
 * @param {string} s - String as Key ex: a.b
 * @return {string}
 */
Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};