"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleValue = void 0;
const react_1 = __importDefault(require("react"));
const react_select_1 = require("react-select");
const baseClass = 'react-select--single-value';
const SingleValue = (props) => {
    const { children, className, } = props;
    return (react_1.default.createElement(react_select_1.components.SingleValue, { ...props, className: [
            baseClass,
            className,
        ].filter(Boolean).join(' ') }, children));
};
exports.SingleValue = SingleValue;
//# sourceMappingURL=index.js.map