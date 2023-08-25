import React from 'react';
import { Condition } from '../../../../fields/config/types';
type Props = {
    path?: string;
    name: string;
    condition: Condition;
    setShowField: (isVisible: boolean) => void;
};
export declare const WatchCondition: React.FC<Props>;
export {};
