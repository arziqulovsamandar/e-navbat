"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementLoginAttempts = void 0;
const incrementLoginAttempts = async ({ payload, doc, collection, }) => {
    const { auth: { maxLoginAttempts, lockTime, } } = collection;
    if ('lockUntil' in doc && typeof doc.lockUntil === 'string') {
        const lockUntil = Math.floor(new Date(doc.lockUntil).getTime() / 1000);
        // Expired lock, restart count at 1
        if (lockUntil < Date.now()) {
            await payload.update({
                collection: collection.slug,
                id: doc.id,
                data: {
                    loginAttempts: 1,
                    lockUntil: null,
                }
            });
        }
        return;
    }
    const data = {
        loginAttempts: Number(doc.loginAttempts) + 1,
    };
    // Lock the account if at max attempts and not already locked
    if (typeof doc.loginAttempts === 'number' && doc.loginAttempts + 1 >= maxLoginAttempts) {
        const lockUntil = new Date((Date.now() + lockTime));
        data.lockUntil = lockUntil;
    }
    await payload.update({
        collection: collection.slug,
        id: doc.id,
        data,
    });
};
exports.incrementLoginAttempts = incrementLoginAttempts;
//# sourceMappingURL=incrementLoginAttempts.js.map