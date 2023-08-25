"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const withOperators_1 = require("./withOperators");
const combineParentName_1 = __importDefault(require("../utilities/combineParentName"));
const formatName_1 = __importDefault(require("../utilities/formatName"));
const recursivelyBuildNestedPaths_1 = __importDefault(require("./recursivelyBuildNestedPaths"));
const fieldToSchemaMap = (parentName, nestedFieldName) => ({
    number: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    text: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    email: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    textarea: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    richText: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    json: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    code: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    radio: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    date: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    point: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    relationship: (field) => {
        if (Array.isArray(field.relationTo)) {
            return {
                type: new graphql_1.GraphQLInputObjectType({
                    name: `${(0, combineParentName_1.default)(parentName, field.name)}_Relation`,
                    fields: {
                        relationTo: {
                            type: new graphql_1.GraphQLEnumType({
                                name: `${(0, combineParentName_1.default)(parentName, field.name)}_Relation_RelationTo`,
                                values: field.relationTo.reduce((values, relation) => ({
                                    ...values,
                                    [(0, formatName_1.default)(relation)]: {
                                        value: relation,
                                    },
                                }), {}),
                            }),
                        },
                        value: { type: graphql_1.GraphQLString },
                    },
                }),
            };
        }
        return {
            type: (0, withOperators_1.withOperators)(field, parentName),
        };
    },
    upload: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    checkbox: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    select: (field) => ({
        type: (0, withOperators_1.withOperators)(field, parentName),
    }),
    array: (field) => (0, recursivelyBuildNestedPaths_1.default)(parentName, nestedFieldName, field),
    group: (field) => (0, recursivelyBuildNestedPaths_1.default)(parentName, nestedFieldName, field),
    row: (field) => (0, recursivelyBuildNestedPaths_1.default)(parentName, nestedFieldName, field),
    collapsible: (field) => (0, recursivelyBuildNestedPaths_1.default)(parentName, nestedFieldName, field),
    tabs: (field) => (0, recursivelyBuildNestedPaths_1.default)(parentName, nestedFieldName, field),
});
exports.default = fieldToSchemaMap;
//# sourceMappingURL=fieldToWhereInputSchemaMap.js.map