import React from 'react';
import { GeneratePreviewURL } from '../../../../config/types';
export type CustomPreviewButtonProps = React.ComponentType<DefaultPreviewButtonProps & {
    DefaultButton: React.ComponentType<DefaultPreviewButtonProps>;
}>;
export type DefaultPreviewButtonProps = {
    preview: () => void;
    disabled: boolean;
    label: string;
};
type Props = {
    CustomComponent?: CustomPreviewButtonProps;
    generatePreviewURL?: GeneratePreviewURL;
};
declare const PreviewButton: React.FC<Props>;
export default PreviewButton;
