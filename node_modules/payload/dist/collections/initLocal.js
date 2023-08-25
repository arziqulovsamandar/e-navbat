"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const buildCollectionFields_1 = require("../versions/buildCollectionFields");
const buildQuery_1 = __importDefault(require("../mongoose/buildQuery"));
const buildSchema_1 = __importDefault(require("./buildSchema"));
const buildSchema_2 = __importDefault(require("../mongoose/buildSchema"));
const getVersionsModelName_1 = require("../versions/getVersionsModelName");
function initCollectionsLocal(ctx) {
    ctx.config.collections = ctx.config.collections.map((collection) => {
        var _a;
        const formattedCollection = collection;
        const schema = (0, buildSchema_1.default)(formattedCollection, ctx.config);
        if (collection.versions) {
            const versionModelName = (0, getVersionsModelName_1.getVersionsModelName)(collection);
            const versionCollectionFields = (0, buildCollectionFields_1.buildVersionCollectionFields)(collection);
            const versionSchema = (0, buildSchema_2.default)(ctx.config, versionCollectionFields, {
                disableUnique: true,
                draftsEnabled: true,
                options: {
                    timestamps: false,
                    minimize: false,
                },
            });
            if (collection.indexes) {
                collection.indexes.forEach((index) => {
                    // prefix 'version.' to each field in the index
                    const versionIndex = { fields: {}, options: index.options };
                    Object.entries(index.fields).forEach(([key, value]) => {
                        versionIndex.fields[`version.${key}`] = value;
                    });
                    versionSchema.index(versionIndex.fields, versionIndex.options);
                });
            }
            versionSchema.plugin(mongoose_paginate_v2_1.default, { useEstimatedCount: true })
                .plugin((0, buildQuery_1.default)({ collectionSlug: collection.slug, versionsFields: versionCollectionFields }));
            if ((_a = collection.versions) === null || _a === void 0 ? void 0 : _a.drafts) {
                versionSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
            }
            ctx.versions[collection.slug] = mongoose_1.default.model(versionModelName, versionSchema);
        }
        ctx.collections[formattedCollection.slug] = {
            Model: mongoose_1.default.model(formattedCollection.slug, schema),
            config: formattedCollection,
        };
        return formattedCollection;
    });
}
exports.default = initCollectionsLocal;
//# sourceMappingURL=initLocal.js.map