"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminInit_1 = require("../../utilities/telemetry/events/adminInit");
const getEntityPolicies_1 = require("../../utilities/getEntityPolicies");
const allOperations = ['create', 'read', 'update', 'delete'];
async function accessOperation(args) {
    const { req, req: { user, payload: { config, }, }, } = args;
    (0, adminInit_1.adminInit)(req);
    const results = {};
    const isLoggedIn = !!(user);
    const userCollectionConfig = (user && user.collection) ? config.collections.find((collection) => collection.slug === user.collection) : null;
    if (userCollectionConfig) {
        results.canAccessAdmin = userCollectionConfig.access.admin ? await userCollectionConfig.access.admin(args) : isLoggedIn;
    }
    else {
        results.canAccessAdmin = false;
    }
    await Promise.all(config.collections.map(async (collection) => {
        const collectionOperations = [...allOperations];
        if (collection.auth && (typeof collection.auth.maxLoginAttempts !== 'undefined' && collection.auth.maxLoginAttempts !== 0)) {
            collectionOperations.push('unlock');
        }
        if (collection.versions) {
            collectionOperations.push('readVersions');
        }
        const collectionPolicy = await (0, getEntityPolicies_1.getEntityPolicies)({
            type: 'collection',
            req,
            entity: collection,
            operations: collectionOperations,
        });
        results.collections = {
            ...results.collections,
            [collection.slug]: collectionPolicy,
        };
    }));
    await Promise.all(config.globals.map(async (global) => {
        const globalOperations = ['read', 'update'];
        if (global.versions) {
            globalOperations.push('readVersions');
        }
        const globalPolicy = await (0, getEntityPolicies_1.getEntityPolicies)({
            type: 'global',
            req,
            entity: global,
            operations: globalOperations,
        });
        results.globals = {
            ...results.globals,
            [global.slug]: globalPolicy,
        };
    }));
    return results;
}
exports.default = accessOperation;
//# sourceMappingURL=access.js.map