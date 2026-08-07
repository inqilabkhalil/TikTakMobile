import FormScreenContainer from '@/shared/components/FormScreenContainer';
import BackNavigate from '@/shared/components/BackNavigate';
import AccountInfoForm from '@/features/account/components/AccountInfoForm';
function PersonalInfoScreen() {
  return (
      <FormScreenContainer>
      <BackNavigate title="Hesab" />
      <AccountInfoForm />
    </FormScreenContainer>
  );
}

export default PersonalInfoScreen;
