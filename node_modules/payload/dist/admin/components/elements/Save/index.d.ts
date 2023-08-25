import React from 'react';
export type CustomSaveButtonProps = React.ComponentType<DefaultSaveButtonProps & {
    DefaultButton: React.ComponentType<DefaultSaveButtonProps>;
}>;
type DefaultSaveButtonProps = {
    label: string;
};
type Props = {
    CustomComponent?: CustomSaveButtonProps;
};
export declare const Save: React.FC<Props>;
export {};
