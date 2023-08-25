"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const Submit_1 = __importDefault(require("../../forms/Submit"));
const RenderCustomComponent_1 = __importDefault(require("../../utilities/RenderCustomComponent"));
const DefaultSaveButton = ({ label }) => {
    return (react_1.default.createElement(Submit_1.default, { buttonId: "action-save" }, label));
};
const Save = ({ CustomComponent }) => {
    const { t } = (0, react_i18next_1.useTranslation)('general');
    return (react_1.default.createElement(RenderCustomComponent_1.default, { CustomComponent: CustomComponent, DefaultComponent: DefaultSaveButton, componentProps: {
            label: t('save'),
            DefaultButton: DefaultSaveButton,
        } }));
};
exports.Save = Save;
//# sourceMappingURL=index.js.map