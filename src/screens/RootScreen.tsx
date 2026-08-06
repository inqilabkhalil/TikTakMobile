import { StyleSheet, Text, View } from 'react-native';

function RootScreen() {
  return (
    <View style={styles.container}>
      <Text>TikTakMobil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RootScreen;
