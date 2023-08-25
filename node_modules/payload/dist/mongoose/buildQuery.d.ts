import { PayloadRequest, Where } from '../types';
import { Field, FieldAffectingData, TabAsField, UIField } from '../fields/config/types';
import { CollectionPermission, FieldPermissions, GlobalPermission } from '../auth';
import { SanitizedConfig } from '../config/types';
type PathToQuery = {
    complete: boolean;
    collectionSlug?: string;
    path: string;
    field: Field | TabAsField;
    fields?: (FieldAffectingData | UIField | TabAsField)[];
    fieldPolicies?: {
        [field: string]: FieldPermissions;
    };
};
type SearchParam = {
    path?: string;
    value: unknown;
};
type ParamParserArgs = {
    req: PayloadRequest;
    collectionSlug?: string;
    globalSlug?: string;
    versionsFields?: Field[];
    model: any;
    where: Where;
    access?: Where | boolean;
    overrideAccess?: boolean;
};
export declare class ParamParser {
    collectionSlug?: string;
    globalSlug?: string;
    overrideAccess: boolean;
    req: PayloadRequest;
    access?: Where | boolean;
    where: Where;
    model: any;
    fields: Field[];
    localizationConfig: SanitizedConfig['localization'];
    policies: {
        collections?: {
            [collectionSlug: string]: CollectionPermission;
        };
        globals?: {
            [globalSlug: string]: GlobalPermission;
        };
    };
    errors: {
        path: string;
    }[];
    constructor({ req, collectionSlug, globalSlug, versionsFields, model, where, access, overrideAccess, }: ParamParserArgs);
    parse(): Promise<Record<string, unknown>>;
    parsePathOrRelation(object: Where, overrideAccess: boolean): Promise<Record<string, unknown>>;
    buildAndOrConditions(conditions: Where[], overrideAccess: boolean): Promise<Record<string, unknown>[]>;
    buildSearchParam({ fields, incomingPath, val, operator, overrideAccess, }: {
        fields: Field[];
        incomingPath: string;
        val: unknown;
        operator: string;
        overrideAccess: boolean;
    }): Promise<SearchParam>;
    getLocalizedPaths({ collectionSlug, globalSlug, fields, incomingPath, overrideAccess, }: {
        collectionSlug?: string;
        globalSlug?: string;
        fields: Field[];
        incomingPath: string;
        overrideAccess: boolean;
    }): Promise<PathToQuery[]>;
}
type GetBuildQueryPluginArgs = {
    collectionSlug?: string;
    versionsFields?: Field[];
};
export type BuildQueryArgs = {
    req: PayloadRequest;
    where: Where;
    overrideAccess: boolean;
    access?: Where | boolean;
    globalSlug?: string;
};
declare const getBuildQueryPlugin: ({ collectionSlug, versionsFields, }?: GetBuildQueryPluginArgs) => (schema: any) => void;
export default getBuildQueryPlugin;
