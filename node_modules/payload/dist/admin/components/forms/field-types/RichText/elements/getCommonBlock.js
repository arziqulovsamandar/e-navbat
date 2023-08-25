"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonBlock = void 0;
const slate_1 = require("slate");
const isBlockElement_1 = require("./isBlockElement");
const getCommonBlock = (editor, match) => {
    const range = slate_1.Editor.unhangRange(editor, editor.selection, { voids: true });
    const [common, path] = slate_1.Node.common(editor, range.anchor.path, range.focus.path);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if ((0, isBlockElement_1.isBlockElement)(editor, common) || slate_1.Editor.isEditor(common)) {
        return [common, path];
    }
    return slate_1.Editor.above(editor, {
        at: path,
        match: match || ((n) => (0, isBlockElement_1.isBlockElement)(editor, n) || slate_1.Editor.isEditor(n)),
    });
};
exports.getCommonBlock = getCommonBlock;
//# sourceMappingURL=getCommonBlock.js.map