import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '../shared/components/ScreenContainer';

function SearchScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <Text>Axtar</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchScreen;
