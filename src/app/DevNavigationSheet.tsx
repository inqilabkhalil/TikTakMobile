import { useCallback, useRef, type ComponentRef } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../shared/types/navigation';

type DevNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Not exported — purely an internal detail of this dev-only file.
type DevScreenItem = {
  label: string;
  onPress: (navigation: DevNavigationProp) => void;
};

const DEV_SCREENS: DevScreenItem[] = [
  { label: 'Welcome', onPress: nav => nav.navigate('Auth', { screen: 'Welcome' }) },
  { label: 'Login', onPress: nav => nav.navigate('Auth', { screen: 'Login' }) },
  { label: 'Register', onPress: nav => nav.navigate('Auth', { screen: 'Register' }) },
  {
    label: 'Home',
    onPress: nav =>
      nav.navigate('Main', { screen: 'Home', params: { screen: 'HomeMain' } }),
  },
  {
    label: 'Products',
    onPress: nav =>
      nav.navigate('Main', { screen: 'Home', params: { screen: 'Products' } }),
  },
  { label: 'Search', onPress: nav => nav.navigate('Main', { screen: 'Search' }) },
  { label: 'Basket', onPress: nav => nav.navigate('Basket', { screen: 'BasketHome' }) },
  { label: 'Checkout', onPress: nav => nav.navigate('Basket', { screen: 'Checkout' }) },
  {
    label: 'OrderSuccess',
    onPress: nav => nav.navigate('Basket', { screen: 'OrderSuccess' }),
  },
  {
    label: 'Account',
    onPress: nav =>
      nav.navigate('Main', { screen: 'Account', params: { screen: 'AccountHome' } }),
  },
  {
    label: 'PersonalInfo',
    onPress: nav =>
      nav.navigate('Main', { screen: 'Account', params: { screen: 'PersonalInfo' } }),
  },
  {
    label: 'OrderHistory',
    onPress: nav =>
      nav.navigate('Main', { screen: 'Account', params: { screen: 'OrderHistory' } }),
  },
  {
    label: 'OrderDetail',
    onPress: nav =>
      nav.navigate('Main', { screen: 'Account', params: { screen: 'OrderDetail' } }),
  },
  {
    label: 'Favorites',
    onPress: nav =>
      nav.navigate('Main', { screen: 'Account', params: { screen: 'Favorites' } }),
  },
];

function DevNavigationSheet() {
  const sheetRef = useRef<ComponentRef<typeof BottomSheetModal>>(null);
  const navigation = useNavigation<DevNavigationProp>();

  const handleOpen = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const handleSelect = useCallback(
    (item: DevScreenItem) => {
      sheetRef.current?.dismiss();
      item.onPress(navigation);
    },
    [navigation],
  );

  return (
    <>
      <TouchableOpacity style={styles.trigger} onPress={handleOpen} activeOpacity={0.7}>
        <Text style={styles.triggerIcon}>🛠</Text>
      </TouchableOpacity>
      <BottomSheetModal ref={sheetRef} snapPoints={['70%']}>
        <BottomSheetFlatList
          data={DEV_SCREENS}
          keyExtractor={item => item.label}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row} onPress={() => handleSelect(item)}>
              <Text style={styles.rowText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  triggerIcon: {
    fontSize: 18,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  row: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  rowText: {
    fontSize: 16,
  },
});

export default DevNavigationSheet;
