import { Payload } from "../../..";
import { SanitizedCollectionConfig, TypeWithID } from "../../../collections/config/types";
type Args = {
    payload: Payload;
    doc: TypeWithID & Record<string, unknown>;
    collection: SanitizedCollectionConfig;
};
export declare const incrementLoginAttempts: ({ payload, doc, collection, }: Args) => Promise<void>;
export {};
