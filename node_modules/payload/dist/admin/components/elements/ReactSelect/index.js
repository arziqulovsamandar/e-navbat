"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_select_1 = __importDefault(require("react-select"));
const creatable_1 = __importDefault(require("react-select/creatable"));
const react_i18next_1 = require("react-i18next");
const sortable_1 = require("@dnd-kit/sortable");
const Chevron_1 = __importDefault(require("../../icons/Chevron"));
const getTranslation_1 = require("../../../../utilities/getTranslation");
const SingleValue_1 = require("./SingleValue");
const MultiValueLabel_1 = require("./MultiValueLabel");
const MultiValue_1 = require("./MultiValue");
const ValueContainer_1 = require("./ValueContainer");
const ClearIndicator_1 = require("./ClearIndicator");
const MultiValueRemove_1 = require("./MultiValueRemove");
const Control_1 = require("./Control");
const DraggableSortable_1 = __importDefault(require("../DraggableSortable"));
require("./index.scss");
const createOption = (label) => ({
    label,
    value: label,
});
const SelectAdapter = (props) => {
    const { t, i18n } = (0, react_i18next_1.useTranslation)();
    const [inputValue, setInputValue] = react_1.default.useState(''); // for creatable select
    const { className, showError, options, onChange, value, disabled = false, placeholder = t('general:selectValue'), isSearchable = true, isClearable = true, filterOption = undefined, numberOnly = false, isLoading, onMenuOpen, components, isCreatable, selectProps, } = props;
    const classes = [
        className,
        'react-select',
        showError && 'react-select--error',
    ].filter(Boolean).join(' ');
    if (!isCreatable) {
        return (react_1.default.createElement(react_select_1.default, { isLoading: isLoading, placeholder: (0, getTranslation_1.getTranslation)(placeholder, i18n), captureMenuScroll: true, ...props, value: value, onChange: onChange, isDisabled: disabled, className: classes, classNamePrefix: "rs", options: options, isSearchable: isSearchable, isClearable: isClearable, filterOption: filterOption, onMenuOpen: onMenuOpen, menuPlacement: "auto", components: {
                ValueContainer: ValueContainer_1.ValueContainer,
                SingleValue: SingleValue_1.SingleValue,
                MultiValue: MultiValue_1.MultiValue,
                MultiValueLabel: MultiValueLabel_1.MultiValueLabel,
                MultiValueRemove: MultiValueRemove_1.MultiValueRemove,
                DropdownIndicator: Chevron_1.default,
                ClearIndicator: ClearIndicator_1.ClearIndicator,
                Control: Control_1.Control,
                ...components,
            } }));
    }
    const handleKeyDown = (event) => {
        // eslint-disable-next-line no-restricted-globals
        if (numberOnly === true) {
            const acceptableKeys = ['Tab', 'Escape', 'Backspace', 'Enter', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
            const isNumber = !/[^0-9]/.test(event.key);
            const isActionKey = acceptableKeys.includes(event.key);
            if (!isNumber && !isActionKey) {
                event.preventDefault();
                return;
            }
        }
        if (!value || !inputValue || inputValue.trim() === '')
            return;
        if (filterOption && !filterOption(null, inputValue)) {
            return;
        }
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                onChange([...value, createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
                break;
            default:
                break;
        }
    };
    return (react_1.default.createElement(creatable_1.default, { isLoading: isLoading, placeholder: (0, getTranslation_1.getTranslation)(placeholder, i18n), captureMenuScroll: true, ...props, customProps: selectProps, value: value, onChange: onChange, isDisabled: disabled, className: classes, classNamePrefix: "rs", options: options, isSearchable: isSearchable, isClearable: isClearable, filterOption: filterOption, onMenuOpen: onMenuOpen, menuPlacement: "auto", inputValue: inputValue, onInputChange: (newValue) => setInputValue(newValue), onKeyDown: handleKeyDown, components: {
            ValueContainer: ValueContainer_1.ValueContainer,
            SingleValue: SingleValue_1.SingleValue,
            MultiValue: MultiValue_1.MultiValue,
            MultiValueLabel: MultiValueLabel_1.MultiValueLabel,
            MultiValueRemove: MultiValueRemove_1.MultiValueRemove,
            DropdownIndicator: Chevron_1.default,
            ClearIndicator: ClearIndicator_1.ClearIndicator,
            Control: Control_1.Control,
            ...components,
        } }));
};
const SortableSelect = (props) => {
    const { onChange, value, } = props;
    let ids = [];
    if (value)
        ids = Array.isArray(value) ? value.map((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.id) !== null && _a !== void 0 ? _a : `${item === null || item === void 0 ? void 0 : item.value}`; }) : [(value === null || value === void 0 ? void 0 : value.id) || `${value === null || value === void 0 ? void 0 : value.value}`];
    return (react_1.default.createElement(DraggableSortable_1.default, { ids: ids, className: "react-select-container", onDragEnd: ({ moveFromIndex, moveToIndex }) => {
            let sorted = value;
            if (value && Array.isArray(value)) {
                sorted = (0, sortable_1.arrayMove)(value, moveFromIndex, moveToIndex);
            }
            onChange(sorted);
        } },
        react_1.default.createElement(SelectAdapter, { ...props })));
};
const ReactSelect = (props) => {
    const { isMulti, isSortable, } = props;
    if (isMulti && isSortable) {
        return (react_1.default.createElement(SortableSelect, { ...props }));
    }
    return (react_1.default.createElement(SelectAdapter, { ...props }));
};
exports.default = ReactSelect;
//# sourceMappingURL=index.js.map