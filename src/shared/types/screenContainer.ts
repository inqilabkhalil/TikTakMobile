import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';

export interface ScreenContainerProps extends ViewProps {
  children: ReactNode;
  edges?: SafeAreaViewProps['edges'];
}
