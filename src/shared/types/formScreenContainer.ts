import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import type { Edge } from "react-native-safe-area-context";

export interface FormScreenContainerProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    edges?: Edge[];
}