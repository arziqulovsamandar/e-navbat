import { Field, TabAsField } from '../fields/config/types';
type SanitizeQueryValueArgs = {
    field: Field | TabAsField;
    path: string;
    operator: string;
    val: any;
    hasCustomID: boolean;
};
export declare const sanitizeQueryValue: ({ field, path, operator, val, hasCustomID }: SanitizeQueryValueArgs) => unknown;
export {};
