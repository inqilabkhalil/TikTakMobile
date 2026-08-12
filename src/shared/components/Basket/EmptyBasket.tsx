import { StyleSheet, Text, View } from 'react-native';
// Header/Back handled by `BasketScreen`

function EmptyBasket() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>×</Text>
        </View>

        <Text style={styles.title}>Səbətiniz boşdur</Text>

        <Text style={styles.description}>
          Səbətinizdə heç bir məhsul yoxdur
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
  },

  icon: {
    fontSize: 42,
    fontWeight: '300',
    color: '#999999',
    lineHeight: 48,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },
});

export default EmptyBasket;
