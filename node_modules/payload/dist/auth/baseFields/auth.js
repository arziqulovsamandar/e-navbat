"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = require("../../fields/validations");
const extractTranslations_1 = require("../../translations/extractTranslations");
const labels = (0, extractTranslations_1.extractTranslations)(['general:email']);
const baseAuthFields = [
    {
        name: 'email',
        label: labels['general:email'],
        type: 'email',
        validate: validations_1.email,
        unique: true,
        required: true,
        admin: {
            components: {
                Field: () => null,
            },
        },
    },
    {
        name: 'resetPasswordToken',
        type: 'text',
        hidden: true,
    },
    {
        name: 'resetPasswordExpiration',
        type: 'date',
        hidden: true,
    },
    {
        name: 'salt',
        type: 'text',
        hidden: true,
    },
    {
        name: 'hash',
        type: 'text',
        hidden: true,
    },
];
exports.default = baseAuthFields;
//# sourceMappingURL=auth.js.map