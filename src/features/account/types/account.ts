import { FC } from "react";
import { SvgProps } from "react-native-svg";

export interface UserProfile {
    id: number;
    full_name: string;
    phone: string;
    email: string | null;
    address: string;
    img_url: string;
    role: string;
    created_at: string;
}

export interface ApiResponse<T> {
    message: string;
    data: T;
    result: boolean;
}

export interface MenuItemProps {
    Icon: FC<SvgProps>;
    title: string;
    onPress: () => void;
}

export interface ProfileCardProps {
    fullName: string;
    phone: string;
    imgUrl?: string;
}

export interface ProfileFormValues {
    full_name: string;
    phone: string;
    email: string;
    address: string;
    password: string;
    password_repeat: string;
}

export interface UpdateProfilePayload {
    full_name: string;
    address: string;
    img_url?: string;
    password?: string;
    password_repeat?: string;
}