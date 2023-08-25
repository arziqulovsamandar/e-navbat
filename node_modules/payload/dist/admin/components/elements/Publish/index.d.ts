import React from 'react';
export type CustomPublishButtonProps = React.ComponentType<DefaultPublishButtonProps & {
    DefaultButton: React.ComponentType<DefaultPublishButtonProps>;
}>;
export type DefaultPublishButtonProps = {
    publish: () => void;
    disabled: boolean;
    label: string;
};
type Props = {
    CustomComponent?: CustomPublishButtonProps;
};
export declare const Publish: React.FC<Props>;
export {};
