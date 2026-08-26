import { FC } from "react";
import { SvgProps } from "react-native-svg";

export interface MenuItemProps {
    Icon: FC<SvgProps>;
    title: string;
    onPress: () => void;
}

export interface ProfileCardProps {
    fullName: string;
    phone: string;
    imgUrl?: string;
    onAvatarChange?: (uri: string) => void;
}

export interface ProfileFormValues {
    full_name: string;
    phone: string;
    email: string;
    address: string;
    password: string;
    password_repeat: string;
}
