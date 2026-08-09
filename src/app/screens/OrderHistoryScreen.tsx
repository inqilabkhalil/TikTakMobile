import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '@/shared/components/ScreenContainer';

function OrderHistoryScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.text}>OrderHistoryScreen</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
});

export default OrderHistoryScreen;
