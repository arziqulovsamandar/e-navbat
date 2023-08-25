"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateLocalStrategy = void 0;
const crypto_1 = __importDefault(require("crypto"));
const scmp_1 = __importDefault(require("scmp"));
const authenticateLocalStrategy = async ({ doc, password, }) => {
    try {
        const salt = doc.salt;
        const hash = doc.hash;
        if (typeof salt === 'string' && typeof hash === 'string') {
            const res = await new Promise((resolve, reject) => {
                crypto_1.default.pbkdf2(password, salt, 25000, 512, 'sha256', (e, hashBuffer) => {
                    if (e)
                        reject(null);
                    if ((0, scmp_1.default)(hashBuffer, Buffer.from(hash, 'hex'))) {
                        resolve(doc);
                    }
                    else {
                        reject(null);
                    }
                });
            });
            return res;
        }
        return null;
    }
    catch (err) {
        return null;
    }
};
exports.authenticateLocalStrategy = authenticateLocalStrategy;
//# sourceMappingURL=authenticate.js.map