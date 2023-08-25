"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetLoginAttempts = void 0;
const resetLoginAttempts = async ({ payload, doc, collection, }) => {
    await payload.update({
        collection: collection.slug,
        id: doc.id,
        data: {
            loginAttempts: 0,
            lockUntil: null,
        },
    });
};
exports.resetLoginAttempts = resetLoginAttempts;
//# sourceMappingURL=resetLoginAttempts.js.map