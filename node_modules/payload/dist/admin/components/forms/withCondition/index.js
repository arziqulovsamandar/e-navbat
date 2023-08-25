'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const WatchCondition_1 = require("./WatchCondition");
const withCondition = (Field) => {
    const CheckForCondition = (props) => {
        const { admin: { condition, } = {}, } = props;
        if (condition) {
            return react_1.default.createElement(WithCondition, { ...props });
        }
        return react_1.default.createElement(Field, { ...props });
    };
    const WithCondition = (props) => {
        const { name, path, admin: { condition, } = {}, } = props;
        const [showField, setShowField] = react_1.default.useState(false);
        if (showField) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(WatchCondition_1.WatchCondition, { path: path, name: name, condition: condition, setShowField: setShowField }),
                react_1.default.createElement(Field, { ...props })));
        }
        return (react_1.default.createElement(WatchCondition_1.WatchCondition, { path: path, name: name, condition: condition, setShowField: setShowField }));
    };
    return CheckForCondition;
};
exports.default = withCondition;
//# sourceMappingURL=index.js.map