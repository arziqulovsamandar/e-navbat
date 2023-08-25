"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../fields/config/types");
const fieldToWhereInputSchemaMap_1 = __importDefault(require("./fieldToWhereInputSchemaMap"));
const recursivelyBuildNestedPaths = (parentName, nestedFieldName2, field) => {
    const fieldName = (0, types_1.fieldAffectsData)(field) ? field.name : undefined;
    const nestedFieldName = fieldName || nestedFieldName2;
    if (field.type === 'tabs') {
        // if the tab has a name, treat it as a group
        // otherwise, treat it as a row
        return field.tabs.reduce((tabSchema, tab) => {
            tabSchema.push(...recursivelyBuildNestedPaths(parentName, nestedFieldName, {
                ...tab,
                type: 'name' in tab ? 'group' : 'row',
            }));
            return tabSchema;
        }, []);
    }
    const nestedPaths = field.fields.reduce((nestedFields, nestedField) => {
        if (!(0, types_1.fieldIsPresentationalOnly)(nestedField)) {
            if (!(0, types_1.fieldAffectsData)(nestedField)) {
                return [
                    ...nestedFields,
                    ...recursivelyBuildNestedPaths(parentName, nestedFieldName, nestedField),
                ];
            }
            const nestedPathName = (0, types_1.fieldAffectsData)(nestedField) ? `${nestedFieldName ? `${nestedFieldName}__` : ''}${nestedField.name}` : undefined;
            const getFieldSchema = (0, fieldToWhereInputSchemaMap_1.default)(parentName, nestedFieldName)[nestedField.type];
            if (getFieldSchema) {
                const fieldSchema = getFieldSchema({
                    ...nestedField,
                    name: nestedPathName,
                });
                if (Array.isArray(fieldSchema)) {
                    return [
                        ...nestedFields,
                        ...fieldSchema,
                    ];
                }
                return [
                    ...nestedFields,
                    {
                        key: nestedPathName,
                        type: fieldSchema,
                    },
                ];
            }
        }
        return nestedFields;
    }, []);
    return nestedPaths;
};
exports.default = recursivelyBuildNestedPaths;
//# sourceMappingURL=recursivelyBuildNestedPaths.js.map