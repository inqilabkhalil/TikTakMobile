import { StyleSheet, View } from 'react-native';
import BackNavigate from '../shared/components/BackNavigate';

function BasketScreen() {
  return (
    <View style={styles.container}>
      <BackNavigate title="Səbətim" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default BasketScreen;