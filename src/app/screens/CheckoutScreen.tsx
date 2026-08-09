import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '@/shared/components/ScreenContainer';

function CheckoutScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.text}>CheckoutScreen</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
});

export default CheckoutScreen;
