import FormScreenContainer from '@/shared/components/FormScreenContainer';
import BackNavigate from '@/shared/components/BackNavigate';
import AccountInfoForm from '@/features/account/components/AccountInfoForm';
import { useProfile } from '@/features/account/hooks/useProfile';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '@/shared/constants/theme';
function PersonalInfoScreen() {
  const { user, isLoading } = useProfile();
  const showSpinner = isLoading && !user;
  return (
      <FormScreenContainer edges={['bottom', 'left', 'right']}>
      <BackNavigate title="Hesab" />
      {showSpinner ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color={COLORS.primary}/>
        </View>
      ) : (
        <AccountInfoForm />
      )}
    </FormScreenContainer>
  );
}

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  }
})
export default PersonalInfoScreen;
