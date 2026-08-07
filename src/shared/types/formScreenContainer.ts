import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface FormScreenContainerProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}