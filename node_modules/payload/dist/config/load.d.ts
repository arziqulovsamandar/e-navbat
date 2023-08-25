import { SanitizedConfig } from './types';
declare const loadConfig: (logger?: pino.Logger) => Promise<SanitizedConfig>;
export default loadConfig;
