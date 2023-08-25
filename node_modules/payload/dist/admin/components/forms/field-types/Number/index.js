"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const useField_1 = __importDefault(require("../../useField"));
const Label_1 = __importDefault(require("../../Label"));
const Error_1 = __importDefault(require("../../Error"));
const FieldDescription_1 = __importDefault(require("../../FieldDescription"));
const withCondition_1 = __importDefault(require("../../withCondition"));
const validations_1 = require("../../../../../fields/validations");
const getTranslation_1 = require("../../../../../utilities/getTranslation");
const ReactSelect_1 = __importDefault(require("../../../elements/ReactSelect"));
require("./index.scss");
const isNumber_1 = require("../../../../../utilities/isNumber");
const NumberField = (props) => {
    const { name, path: pathFromProps, required, validate = validations_1.number, label, max, min, hasMany, minRows, maxRows, admin: { readOnly, style, className, width, step, placeholder, description, condition, } = {}, } = props;
    const { t, i18n } = (0, react_i18next_1.useTranslation)();
    const path = pathFromProps || name;
    const memoizedValidate = (0, react_1.useCallback)((value, options) => {
        return validate(value, { ...options, min, max, required });
    }, [validate, min, max, required]);
    const { value, showError, setValue, errorMessage, } = (0, useField_1.default)({
        path,
        validate: memoizedValidate,
        condition,
    });
    const handleChange = (0, react_1.useCallback)((e) => {
        const val = parseFloat(e.target.value);
        if (Number.isNaN(val)) {
            setValue('');
        }
        else {
            setValue(val);
        }
    }, [setValue]);
    const classes = [
        'field-type',
        'number',
        className,
        showError && 'error',
        readOnly && 'read-only',
        hasMany && 'has-many',
    ].filter(Boolean).join(' ');
    const [valueToRender, setValueToRender] = (0, react_1.useState)([]); // Only for hasMany
    const handleHasManyChange = (0, react_1.useCallback)((selectedOption) => {
        var _a;
        if (!readOnly) {
            let newValue;
            if (!selectedOption) {
                newValue = [];
            }
            else if (Array.isArray(selectedOption)) {
                newValue = selectedOption.map((option) => { var _a; return Number(((_a = option.value) === null || _a === void 0 ? void 0 : _a.value) || option.value); });
            }
            else {
                newValue = [Number(((_a = selectedOption.value) === null || _a === void 0 ? void 0 : _a.value) || selectedOption.value)];
            }
            setValue(newValue);
        }
    }, [
        readOnly,
        setValue,
    ]);
    // useeffect update valueToRender:
    (0, react_1.useEffect)(() => {
        if (hasMany && Array.isArray(value)) {
            setValueToRender(value.map((val, index) => {
                return {
                    label: `${val}`,
                    value: {
                        value: (val === null || val === void 0 ? void 0 : val.value) || val,
                        toString: () => `${val}${index}`,
                    },
                    id: `${val}${index}`, // append index to avoid duplicate keys but allow duplicate numbers
                };
            }));
        }
    }, [value, hasMany]);
    return (react_1.default.createElement("div", { className: classes, style: {
            ...style,
            width,
        } },
        react_1.default.createElement(Error_1.default, { showError: showError, message: errorMessage }),
        react_1.default.createElement(Label_1.default, { htmlFor: `field-${path.replace(/\./gi, '__')}`, label: label, required: required }),
        hasMany ? (react_1.default.createElement(ReactSelect_1.default, { className: `field-${path.replace(/\./gi, '__')}`, placeholder: t('general:enterAValue'), onChange: handleHasManyChange, value: valueToRender, showError: showError, disabled: readOnly, options: [], isCreatable: true, isMulti: true, isSortable: true, isClearable: true, filterOption: (option, rawInput) => {
                // eslint-disable-next-line no-restricted-globals
                return (0, isNumber_1.isNumber)(rawInput);
            }, numberOnly: true })) : (react_1.default.createElement("input", { id: `field-${path.replace(/\./gi, '__')}`, value: typeof value === 'number' ? value : '', onChange: handleChange, disabled: readOnly, placeholder: (0, getTranslation_1.getTranslation)(placeholder, i18n), type: "number", name: path, step: step, onWheel: (e) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                e.target.blur();
            } })),
        react_1.default.createElement(FieldDescription_1.default, { value: value, description: description })));
};
exports.default = (0, withCondition_1.default)(NumberField);
//# sourceMappingURL=index.js.map