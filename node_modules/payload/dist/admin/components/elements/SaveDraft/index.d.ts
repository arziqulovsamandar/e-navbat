import React from 'react';
export type CustomSaveDraftButtonProps = React.ComponentType<DefaultSaveDraftButtonProps & {
    DefaultButton: React.ComponentType<DefaultSaveDraftButtonProps>;
}>;
export type DefaultSaveDraftButtonProps = {
    saveDraft: () => void;
    disabled: boolean;
    label: string;
};
type Props = {
    CustomComponent?: CustomSaveDraftButtonProps;
};
export declare const SaveDraft: React.FC<Props>;
export {};
