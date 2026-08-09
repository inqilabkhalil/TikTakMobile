import { OrderProduct } from "@/features/orderHistory/types/order";
import { ReactNode } from "react";

export interface AppBottomSheetProps {
    children: ReactNode;
    snapPoints?: (string | number)[];
    showIndicator?: boolean;
    enablePanDownToClose?: boolean;
    enableDynamicSizing?: boolean;
    onDismiss?: () => void;
    onChange?: (index: number) => void;
}

export interface OrderProductItemProps {
  product: OrderProduct;
}