"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformExtraFields = exports.withLinks = exports.wrapLink = exports.unwrapLink = void 0;
const slate_1 = require("slate");
const baseFields_1 = require("./LinkDrawer/baseFields");
const unwrapLink = (editor) => {
    slate_1.Transforms.unwrapNodes(editor, { match: (n) => slate_1.Element.isElement(n) && n.type === 'link' });
};
exports.unwrapLink = unwrapLink;
const wrapLink = (editor) => {
    const { selection } = editor;
    const isCollapsed = selection && slate_1.Range.isCollapsed(selection);
    const link = {
        type: 'link',
        url: undefined,
        newTab: false,
        children: isCollapsed ? [{ text: '' }] : [],
    };
    if (isCollapsed) {
        slate_1.Transforms.insertNodes(editor, link);
    }
    else {
        slate_1.Transforms.wrapNodes(editor, link, { split: true });
        slate_1.Transforms.collapse(editor, { edge: 'end' });
    }
};
exports.wrapLink = wrapLink;
const withLinks = (incomingEditor) => {
    const editor = incomingEditor;
    const { isInline } = editor;
    editor.isInline = (element) => {
        if (element.type === 'link') {
            return true;
        }
        return isInline(element);
    };
    return editor;
};
exports.withLinks = withLinks;
/**
 * This function is run to enrich the basefields which every link has with potential, custom user-added fields.
 */
function transformExtraFields(customFieldSchema, config, i18n) {
    const baseFields = (0, baseFields_1.getBaseFields)(config);
    const fields = typeof customFieldSchema === 'function' ? customFieldSchema({ defaultFields: baseFields, config, i18n }) : baseFields;
    // Wrap fields which are not part of the base schema in a group named 'fields' - otherwise they will be rendered but not saved
    const extraFields = [];
    fields.forEach((field) => {
        if ('name' in field) {
            if (!baseFields.find((baseField) => !('name' in baseField) || baseField.name === field.name)) {
                if (field.name !== 'fields' && field.type !== 'group') {
                    extraFields.push(field);
                    // Remove from fields from now, as they need to be part of the fields group below
                    fields.splice(fields.indexOf(field), 1);
                }
            }
        }
    });
    if (Array.isArray(customFieldSchema) || fields.length > 0) {
        fields.push({
            name: 'fields',
            type: 'group',
            admin: {
                style: {
                    margin: 0,
                    padding: 0,
                    borderTop: 0,
                    borderBottom: 0,
                },
            },
            fields: Array.isArray(customFieldSchema) ? customFieldSchema.concat(extraFields) : extraFields,
        });
    }
    return fields;
}
exports.transformExtraFields = transformExtraFields;
//# sourceMappingURL=utilities.js.map