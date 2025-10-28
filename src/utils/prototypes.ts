import { isObject } from '.';

Object.prototype.isEqual = function (this: Record<string, unknown>, obj: Record<string, unknown>): boolean {
    if (this === obj) return true; 
    
    const keys1 = Object.keys(this);
    const keys2 = Object.keys(obj);
    
    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        const val1 = this[key];
        const val2 = obj[key];
        const bothObjects = isObject(val1) && isObject(val2);

        if (bothObjects && !val1.isEqual( val2) ) return false;
        
        if (!bothObjects && val1 !== val2) return false;
    }

    return true;
};
