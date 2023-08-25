"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchCondition = void 0;
const react_1 = require("react");
const Auth_1 = require("../../utilities/Auth");
const context_1 = require("../Form/context");
const DocumentInfo_1 = require("../../utilities/DocumentInfo");
const reduceFieldsToValues_1 = __importDefault(require("../Form/reduceFieldsToValues"));
const getSiblingData_1 = __importDefault(require("../Form/getSiblingData"));
const WatchCondition = ({ path: pathFromProps, name, condition, setShowField, }) => {
    const path = typeof pathFromProps === 'string' ? pathFromProps : name;
    const { user } = (0, Auth_1.useAuth)();
    const [fields, dispatchFields] = (0, context_1.useAllFormFields)();
    const { id } = (0, DocumentInfo_1.useDocumentInfo)();
    const data = (0, reduceFieldsToValues_1.default)(fields, true);
    const siblingData = (0, getSiblingData_1.default)(fields, path);
    // Manually provide ID to `data`
    data.id = id;
    const hasCondition = Boolean(condition);
    const isPassingCondition = hasCondition ? condition(data, siblingData, { user }) : true;
    const field = fields[path];
    const wasPassingCondition = field === null || field === void 0 ? void 0 : field.passesCondition;
    (0, react_1.useEffect)(() => {
        if (hasCondition) {
            if (isPassingCondition && !wasPassingCondition) {
                dispatchFields({ type: 'MODIFY_CONDITION', path, result: true, user });
            }
            if (!isPassingCondition && (wasPassingCondition || typeof wasPassingCondition === 'undefined')) {
                dispatchFields({ type: 'MODIFY_CONDITION', path, result: false, user });
            }
        }
    }, [isPassingCondition, wasPassingCondition, dispatchFields, path, hasCondition, user, setShowField]);
    (0, react_1.useEffect)(() => {
        setShowField(isPassingCondition);
    }, [setShowField, isPassingCondition]);
    return null;
};
exports.WatchCondition = WatchCondition;
//# sourceMappingURL=WatchCondition.js.map