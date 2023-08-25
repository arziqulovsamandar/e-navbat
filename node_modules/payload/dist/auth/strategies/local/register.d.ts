import { Payload } from '../../..';
import { SanitizedCollectionConfig } from '../../../collections/config/types';
type Args = {
    collection: SanitizedCollectionConfig;
    doc: Record<string, unknown>;
    password: string;
    payload: Payload;
};
export declare const registerLocalStrategy: ({ collection, doc, password, payload, }: Args) => Promise<Record<string, unknown>>;
export {};
