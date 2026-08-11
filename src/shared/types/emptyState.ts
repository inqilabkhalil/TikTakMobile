import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

export interface EmptyStateProps {
    title: string;
    subtitle?: string;
    icon?: FC<SvgProps>;
    actionText?: string;
    onActionPress?: () => void;
}