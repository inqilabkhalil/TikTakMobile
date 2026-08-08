import { forwardRef, type ComponentRef } from 'react';
import { Text } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

const FavoriteProductSheet = forwardRef<ComponentRef<typeof BottomSheetModal>>(
  (_props, ref) => {
    return (
      <BottomSheetModal ref={ref}>
        <BottomSheetView>
          <Text>FavoriteProductSheet</Text>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default FavoriteProductSheet;
