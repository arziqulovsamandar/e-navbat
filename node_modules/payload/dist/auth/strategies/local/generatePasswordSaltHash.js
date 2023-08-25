"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePasswordSaltHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const errors_1 = require("../../../errors");
const defaultPasswordValidator = (password) => {
    if (!password)
        return 'No password was given';
    if (password.length < 3)
        return 'Password must be at least 3 characters';
    return true;
};
function randomBytes() {
    return new Promise((resolve, reject) => crypto_1.default.randomBytes(32, (err, saltBuffer) => (err ? reject(err) : resolve(saltBuffer))));
}
function pbkdf2Promisified(password, salt) {
    return new Promise((resolve, reject) => crypto_1.default.pbkdf2(password, salt, 25000, 512, 'sha256', (err, hashRaw) => (err ? reject(err) : resolve(hashRaw))));
}
const generatePasswordSaltHash = async ({ password, }) => {
    const validationResult = defaultPasswordValidator(password);
    if (typeof validationResult === 'string') {
        throw new errors_1.ValidationError([{ message: validationResult, field: 'password' }]);
    }
    const saltBuffer = await randomBytes();
    const salt = saltBuffer.toString('hex');
    const hashRaw = await pbkdf2Promisified(password, salt);
    const hash = hashRaw.toString('hex');
    return { salt, hash };
};
exports.generatePasswordSaltHash = generatePasswordSaltHash;
//# sourceMappingURL=generatePasswordSaltHash.js.map