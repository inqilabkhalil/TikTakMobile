import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../../shared/components/ScreenContainer';
import BackNavigate from '../../shared/components/BackNavigate';
import ProfileCard from '../../features/account/components/ProfileCard';
import { MOCK_USER } from '../../features/account/mock/user';
import { MENU_ITEMS } from '../../features/account/mock/menuItems';
import MenuItem from '../../features/account/components/MenuItem';
import { gapVertical } from '../../shared/utils/metrics';
import { COLORS } from '../../shared/constants/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../navigation';
import { useNavigation } from '@react-navigation/native';

type AccountNavigationProp = NativeStackNavigationProp<AccountStackParamList>;

function AccountScreen() {
  const navigation = useNavigation<AccountNavigationProp>();
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
        // TODO: Logout logic sonra əlavə ediləcək
        break;
    }
  };
  return (
    <ScreenContainer style={styles.container}>
      <BackNavigate title="Hesabım" showBack={false} />
      <ProfileCard
      fullName={MOCK_USER.full_name}
      phone={MOCK_USER.phone} />

      <View style={styles.menuList}>
        {MENU_ITEMS.map((item) => (
          <MenuItem
          key={item.id}
          Icon={item.Icon}
          title={item.title}
          onPress={() => handleMenuPress(item.id)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
   menuList: {
    marginTop: gapVertical(12),
  },
});

export default AccountScreen;
