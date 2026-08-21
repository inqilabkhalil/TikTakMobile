import { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants/theme';
import type { AppBottomSheetProps } from '../../types/appBottomSheet';

const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  (
    {
      children,
      snapPoints = ['50%', '90%'],
      showIndicator = true,
      enablePanDownToClose = true,
      enableDynamicSizing = false,
      onDismiss,
      onChange,
    },
    ref,
  ) => {
    const renderBackdrop = (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        pressBehavior="close"
      />
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing={enableDynamicSizing}
        onDismiss={onDismiss}
        onChange={onChange}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={
          showIndicator ? styles.indicator : styles.indicatorHidden
        }
        backgroundStyle={styles.background}
      >
        <BottomSheetView style={styles.content}>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  },
);

AppBottomSheet.displayName = 'AppBottomSheet';

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  indicator: {
    backgroundColor: COLORS.emptyText,
    width: 60,
    height: 4,
  },
  indicatorHidden: {
    height: 0,
    opacity: 0,
  },
  content: {
    flex: 1,
  },
});

export default AppBottomSheet;
