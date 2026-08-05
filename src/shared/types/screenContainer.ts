import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface ScreenContainerProps extends ViewProps {
  children: ReactNode;
}
