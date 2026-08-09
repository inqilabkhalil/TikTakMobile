import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '@/shared/components/ScreenContainer';

function SearchScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.text}>Axtar</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
});

export default SearchScreen;
