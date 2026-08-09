import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '@/shared/components/ScreenContainer';

function RegisterScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.text}>RegisterScreen</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
});

export default RegisterScreen;
