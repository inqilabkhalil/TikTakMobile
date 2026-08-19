import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserStore } from '@/shared/store';
import type { AccountStackParamList } from '@/shared/types/navigation';

type NavigationProp = NativeStackNavigationProp<AccountStackParamList>;

export function useAccountActions(navigation: NavigationProp) {
  const handleLogout = () => {
    Alert.alert('Çıxış', 'Hesabdan çıxmaq istədiyinizə əminsiniz?', [
      { text: 'Ləğv et', style: 'cancel' },
      {
        text: 'Çıxış',
        style: 'destructive',
        onPress: () => {
          useUserStore.getState().clearUser();
          Toast.show({
            type: 'success',
            text1: 'Uğurlu',
            text2: 'Hesabdan çıxış edildi',
          });
        },
      },
    ]);
  };

  const handleMenuPress = (id: string) => {
    switch (id) {
      case 'account-info':
        navigation.navigate('PersonalInfo');
        break;
      case 'favorites':
        navigation.navigate('Favorites');
        break;
      case 'order-history':
        navigation.navigate('OrderHistory');
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };

  return { handleMenuPress };
}
