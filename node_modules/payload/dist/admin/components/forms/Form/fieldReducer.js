"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldReducer = void 0;
const deep_equal_1 = __importDefault(require("deep-equal"));
const bson_objectid_1 = __importDefault(require("bson-objectid"));
const getSiblingData_1 = __importDefault(require("./getSiblingData"));
const reduceFieldsToValues_1 = __importDefault(require("./reduceFieldsToValues"));
const deepCopyObject_1 = __importDefault(require("../../../../utilities/deepCopyObject"));
const rows_1 = require("./rows");
function fieldReducer(state, action) {
    var _a, _b, _c, _d;
    switch (action.type) {
        case 'REPLACE_STATE': {
            const newState = {};
            // Only update fields that have changed
            // by comparing old value / initialValue to new
            // ..
            // This is a performance enhancement for saving
            // large documents with hundreds of fields
            Object.entries(action.state).forEach(([path, field]) => {
                const oldField = state[path];
                const newField = field;
                if (!(0, deep_equal_1.default)(oldField, newField)) {
                    newState[path] = newField;
                }
                else if (oldField) {
                    newState[path] = oldField;
                }
            });
            return newState;
        }
        case 'REMOVE': {
            const newState = { ...state };
            if (newState[action.path])
                delete newState[action.path];
            return newState;
        }
        case 'MODIFY_CONDITION': {
            const { path, result, user } = action;
            return Object.entries(state).reduce((newState, [fieldPath, field]) => {
                if (fieldPath === path || fieldPath.indexOf(`${path}.`) === 0) {
                    let passesCondition = result;
                    // If a condition is being set to true,
                    // Set all conditions to true
                    // Besides those who still fail their own conditions
                    if (passesCondition && field.condition) {
                        passesCondition = field.condition((0, reduceFieldsToValues_1.default)(state, true), (0, getSiblingData_1.default)(state, path), { user });
                    }
                    return {
                        ...newState,
                        [fieldPath]: {
                            ...field,
                            passesCondition,
                        },
                    };
                }
                return {
                    ...newState,
                    [fieldPath]: {
                        ...field,
                    },
                };
            }, {});
        }
        case 'UPDATE': {
            const newField = Object.entries(action).reduce((field, [key, value]) => {
                if (['value', 'valid', 'errorMessage', 'disableFormData', 'initialValue', 'validate', 'condition', 'passesCondition'].includes(key)) {
                    return {
                        ...field,
                        [key]: value,
                    };
                }
                return field;
            }, state[action.path] || {});
            return {
                ...state,
                [action.path]: newField,
            };
        }
        case 'REMOVE_ROW': {
            const { rowIndex, path } = action;
            const { remainingFields, rows } = (0, rows_1.separateRows)(path, state);
            const rowsMetadata = ((_a = state[path]) === null || _a === void 0 ? void 0 : _a.rows) || [];
            rows.splice(rowIndex, 1);
            rowsMetadata.splice(rowIndex, 1);
            const newState = {
                ...remainingFields,
                [path]: {
                    ...state[path],
                    value: rows.length,
                    disableFormData: rows.length > 0,
                    rows: rowsMetadata,
                },
                ...(0, rows_1.flattenRows)(path, rows),
            };
            return newState;
        }
        case 'ADD_ROW': {
            const { rowIndex, path, subFieldState, blockType } = action;
            const rowsMetadata = [...((_b = state[path]) === null || _b === void 0 ? void 0 : _b.rows) || []];
            rowsMetadata.splice(rowIndex + 1, 0, 
            // new row
            {
                id: new bson_objectid_1.default().toHexString(),
                collapsed: false,
                blockType: blockType || undefined,
            });
            if (blockType) {
                subFieldState.blockType = {
                    value: blockType,
                    initialValue: blockType,
                    valid: true,
                };
            }
            const { remainingFields, rows } = (0, rows_1.separateRows)(path, state);
            // actual form state (value saved in db)
            rows.splice(rowIndex + 1, 0, subFieldState);
            const newState = {
                ...remainingFields,
                ...(0, rows_1.flattenRows)(path, rows),
                [path]: {
                    ...state[path],
                    value: rows.length,
                    disableFormData: true,
                    rows: rowsMetadata,
                },
            };
            return newState;
        }
        case 'DUPLICATE_ROW': {
            const { rowIndex, path } = action;
            const { remainingFields, rows } = (0, rows_1.separateRows)(path, state);
            const rowsMetadata = ((_c = state[path]) === null || _c === void 0 ? void 0 : _c.rows) || [];
            const duplicateRowMetadata = (0, deepCopyObject_1.default)(rowsMetadata[rowIndex]);
            if (duplicateRowMetadata.id)
                delete duplicateRowMetadata.id;
            const duplicateRowState = (0, deepCopyObject_1.default)(rows[rowIndex]);
            if (duplicateRowState.id)
                delete duplicateRowState.id;
            // If there are subfields
            if (Object.keys(duplicateRowState).length > 0) {
                // Add new object containing subfield names to unflattenedRows array
                rows.splice(rowIndex + 1, 0, duplicateRowState);
                rowsMetadata.splice(rowIndex + 1, 0, duplicateRowMetadata);
            }
            const newState = {
                ...remainingFields,
                [path]: {
                    ...state[path],
                    value: rows.length,
                    disableFormData: true,
                    rows: rowsMetadata,
                },
                ...(0, rows_1.flattenRows)(path, rows),
            };
            return newState;
        }
        case 'MOVE_ROW': {
            const { moveFromIndex, moveToIndex, path } = action;
            const { remainingFields, rows } = (0, rows_1.separateRows)(path, state);
            // copy the row to move
            const copyOfMovingRow = rows[moveFromIndex];
            // delete the row by index
            rows.splice(moveFromIndex, 1);
            // insert row copyOfMovingRow back in
            rows.splice(moveToIndex, 0, copyOfMovingRow);
            // modify array/block internal row state (i.e. collapsed, blockType)
            const rowStateCopy = [...((_d = state[path]) === null || _d === void 0 ? void 0 : _d.rows) || []];
            const movingRowState = { ...rowStateCopy[moveFromIndex] };
            rowStateCopy.splice(moveFromIndex, 1);
            rowStateCopy.splice(moveToIndex, 0, movingRowState);
            const newState = {
                ...remainingFields,
                ...(0, rows_1.flattenRows)(path, rows),
                [path]: {
                    ...state[path],
                    rows: rowStateCopy,
                },
            };
            return newState;
        }
        case 'SET_ROW_COLLAPSED': {
            const { rowID, path, collapsed, setDocFieldPreferences } = action;
            const arrayState = state[path];
            const { matchedIndex, collapsedRowIDs } = state[path].rows.reduce((acc, row, index) => {
                const isMatchingRow = row.id === rowID;
                if (isMatchingRow)
                    acc.matchedIndex = index;
                if (!isMatchingRow && row.collapsed)
                    acc.collapsedRowIDs.push(row.id);
                else if (isMatchingRow && collapsed)
                    acc.collapsedRowIDs.push(row.id);
                return acc;
            }, {
                matchedIndex: undefined,
                collapsedRowIDs: [],
            });
            if (matchedIndex > -1) {
                arrayState.rows[matchedIndex].collapsed = collapsed;
                setDocFieldPreferences(path, { collapsed: collapsedRowIDs });
            }
            const newState = {
                ...state,
                [path]: {
                    ...arrayState,
                },
            };
            return newState;
        }
        case 'SET_ALL_ROWS_COLLAPSED': {
            const { collapsed, path, setDocFieldPreferences } = action;
            const { rows, collapsedRowIDs } = state[path].rows.reduce((acc, row) => {
                if (collapsed)
                    acc.collapsedRowIDs.push(row.id);
                acc.rows.push({
                    ...row,
                    collapsed,
                });
                return acc;
            }, {
                rows: [],
                collapsedRowIDs: [],
            });
            setDocFieldPreferences(path, { collapsed: collapsedRowIDs });
            return {
                ...state,
                [path]: {
                    ...state[path],
                    rows,
                },
            };
        }
        default: {
            return state;
        }
    }
}
exports.fieldReducer = fieldReducer;
//# sourceMappingURL=fieldReducer.js.map