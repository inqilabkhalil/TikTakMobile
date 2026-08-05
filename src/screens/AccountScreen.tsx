import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '../shared/components/ScreenContainer';

function AccountScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <Text>Hesabım</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AccountScreen;
