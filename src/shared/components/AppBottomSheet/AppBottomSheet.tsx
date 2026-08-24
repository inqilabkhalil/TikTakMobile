import { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants/theme';
import type { AppBottomSheetProps } from '../../types/appBottomSheet';

const DEFAULT_SNAP_POINTS = ['75%'];

const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  (
    {
      children,
      snapPoints,
      showIndicator = true,
      enablePanDownToClose = true,
      enableDynamicSizing = false,
      onDismiss,
      onChange,
    },
    ref,
  ) => {
    const snapPointsKey = Array.isArray(snapPoints)
      ? snapPoints.join('|')
      : 'default';

    const memoSnapPoints = useMemo(
      () => (snapPoints?.length ? snapPoints : DEFAULT_SNAP_POINTS),
      [snapPointsKey],
    );

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          pressBehavior="close"
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={enableDynamicSizing ? undefined : memoSnapPoints}
        enableDynamicSizing={enableDynamicSizing}
        enablePanDownToClose={enablePanDownToClose}
        enableOverDrag={false}
        enableContentPanningGesture={true}
        enableHandlePanningGesture={true}
        overDragResistanceFactor={0}
        android_keyboardInputMode="adjustResize"
        onDismiss={onDismiss}
        onChange={onChange}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={
          showIndicator ? styles.indicator : styles.indicatorHidden
        }
        backgroundStyle={styles.background}
        style={styles.sheet}
        containerStyle={styles.container}
      >
        {children}
      </BottomSheetModal>
    );
  },
);

AppBottomSheet.displayName = 'AppBottomSheet';

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
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
});

export default AppBottomSheet;