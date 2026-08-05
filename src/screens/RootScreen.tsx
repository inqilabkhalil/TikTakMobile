import { StyleSheet, Text, View } from 'react-native';
import Header from '../shared/components/Header';

function RootScreen() {
  return (
    <View style={styles.container}>
      <Header/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default RootScreen;
