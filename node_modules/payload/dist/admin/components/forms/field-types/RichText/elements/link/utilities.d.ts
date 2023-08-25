import { Editor } from 'slate';
import type { i18n } from 'i18next';
import type { SanitizedConfig } from 'payload/config';
import { Field } from '../../../../../../../fields/config/types';
export declare const unwrapLink: (editor: Editor) => void;
export declare const wrapLink: (editor: Editor) => void;
export declare const withLinks: (incomingEditor: Editor) => Editor;
/**
 * This function is run to enrich the basefields which every link has with potential, custom user-added fields.
 */
export declare function transformExtraFields(customFieldSchema: Field[] | ((args: {
    defaultFields: Field[];
    config: SanitizedConfig;
    i18n: i18n;
}) => Field[]), config: SanitizedConfig, i18n: i18n): Field[];
