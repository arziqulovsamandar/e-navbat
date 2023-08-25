"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const webpack_1 = __importDefault(require("webpack"));
const getProdConfig_1 = __importDefault(require("../webpack/getProdConfig"));
const load_1 = __importDefault(require("../config/load"));
const build = async () => {
    const config = await (0, load_1.default)(); // Will throw its own error if it fails
    try {
        const webpackProdConfig = (0, getProdConfig_1.default)(config);
        (0, webpack_1.default)(webpackProdConfig, (err, stats) => {
            if (err || stats.hasErrors()) {
                // Handle errors here
                if (stats) {
                    console.error(stats.toString({
                        chunks: false,
                        colors: true,
                    }));
                }
                else {
                    console.error(err.message);
                }
            }
        });
    }
    catch (err) {
        console.error(err);
        throw new Error('Error: there was an error building the webpack config.');
    }
};
exports.build = build;
// when build.js is launched directly
if (module.id === require.main.id) {
    (0, exports.build)();
}
//# sourceMappingURL=build.js.map