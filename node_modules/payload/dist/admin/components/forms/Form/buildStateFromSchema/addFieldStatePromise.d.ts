import type { TFunction } from 'i18next';
import { User } from '../../../../../auth';
import { NonPresentationalField } from '../../../../../fields/config/types';
import { Fields, Data } from '../types';
type Args = {
    field: NonPresentationalField;
    locale: string;
    user: User;
    state: Fields;
    path: string;
    passesCondition: boolean;
    id: string | number;
    operation: 'create' | 'update';
    data: Data;
    fullData: Data;
    t: TFunction;
    preferences: {
        [key: string]: unknown;
    };
};
export declare const addFieldStatePromise: ({ field, locale, user, state, path, passesCondition, fullData, data, id, operation, t, preferences, }: Args) => Promise<void>;
export {};
