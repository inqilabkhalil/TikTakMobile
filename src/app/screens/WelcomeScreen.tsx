import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '@/shared/components/ScreenContainer';

function WelcomeScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.text}>WelcomeScreen</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
});

export default WelcomeScreen;
