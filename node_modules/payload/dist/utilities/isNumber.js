"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
function isNumber(value) {
    if (typeof value === 'string' && value.trim() === '') {
        return false;
    }
    return !Number.isNaN(Number(value));
}
exports.isNumber = isNumber;
//# sourceMappingURL=isNumber.js.map