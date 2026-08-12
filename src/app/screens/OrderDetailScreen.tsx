import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '@/shared/components/ScreenContainer';

function OrderDetailScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.text}>OrderDetailScreen</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
});

export default OrderDetailScreen;
