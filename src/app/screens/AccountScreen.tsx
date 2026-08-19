import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ScreenContainer from '../../shared/components/ScreenContainer';
import BackNavigate from '../../shared/components/BackNavigate';
import ProfileCard from '../../features/account/components/ProfileCard';
import MenuItem from '../../features/account/components/MenuItem';
import { gapVertical } from '../../shared/utils/metrics';
import { COLORS } from '../../shared/constants/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountStackParamList } from '@/shared/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '@/features/account/hooks/useProfile';
import { useAccountActions } from '@/features/account/hooks/useAccountActions';
import { MENU_ITEMS } from '@/features/account/constants/menuItems';

type AccountNavigationProp = NativeStackNavigationProp<AccountStackParamList>;

function AccountScreen() {
  const navigation = useNavigation<AccountNavigationProp>();
  const { user, isLoading } = useProfile();
  const showSpinner = isLoading && !user;
  const { handleMenuPress } = useAccountActions(navigation);

  return (
    <ScreenContainer style={styles.container} edges={['bottom', 'left', 'right']}>
      <BackNavigate title="Hesabım" showBack={false} />

      {showSpinner ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ProfileCard
          fullName={user?.full_name ?? ''}
          phone={user?.phone ?? ''}
          imgUrl={user?.img_url}
        />
      )}

      <View style={styles.menuList}>
        {MENU_ITEMS.map(item => (
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
  loaderWrapper: {
    paddingVertical: gapVertical(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AccountScreen;
