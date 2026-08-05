import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '../shared/components/ScreenContainer';

function HomeScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <Text>Əsas</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
