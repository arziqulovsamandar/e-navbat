"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlockElement = void 0;
const slate_1 = require("slate");
/**
 * Returns true, if the provided node is an Element (optionally of a specific type)
 */
const isElement = (node, specificType) => {
    if (slate_1.Editor.isEditor(node) || !slate_1.Element.isElement(node)) {
        return false;
    }
    if (undefined === specificType) {
        return true;
    }
    if (typeof specificType === 'string') {
        return node.type === specificType;
    }
    return specificType.includes(node.type);
};
/**
 * Returns true, if the provided node is a Block Element.
 * Note: Using Editor.isBlock() is not sufficient, as since slate 0.90 it returns `true` for Text nodes and the editor as well.
 *
 * Related Issue: https://github.com/ianstormtaylor/slate/issues/5287
 */
const isBlockElement = (editor, node) => slate_1.Editor.isBlock(editor, node) && isElement(node);
exports.isBlockElement = isBlockElement;
//# sourceMappingURL=isBlockElement.js.map