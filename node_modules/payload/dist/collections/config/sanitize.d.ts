import { CollectionConfig, SanitizedCollectionConfig } from './types';
import { Config } from '../../config/types';
declare const sanitizeCollection: (config: Config, collection: CollectionConfig) => SanitizedCollectionConfig;
export default sanitizeCollection;
