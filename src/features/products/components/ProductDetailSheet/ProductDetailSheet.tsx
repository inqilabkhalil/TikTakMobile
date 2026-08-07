import { forwardRef, type ComponentRef } from 'react';
import { Text } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

const ProductDetailSheet = forwardRef<ComponentRef<typeof BottomSheetModal>>(
  (_props, ref) => {
    return (
      <BottomSheetModal ref={ref}>
        <BottomSheetView>
          <Text>ProductDetailSheet</Text>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default ProductDetailSheet;
