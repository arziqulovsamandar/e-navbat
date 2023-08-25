"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const withNullableType = (field, type, forceNullable = false) => {
    const hasReadAccessControl = field.access && field.access.read;
    const condition = field.admin && field.admin.condition;
    const isTimestamp = field.name === 'createdAt' || field.name === 'updatedAt';
    if (!forceNullable && 'required' in field && field.required && !field.localized && !condition && !hasReadAccessControl && !isTimestamp) {
        return new graphql_1.GraphQLNonNull(type);
    }
    return type;
};
exports.default = withNullableType;
//# sourceMappingURL=withNullableType.js.map