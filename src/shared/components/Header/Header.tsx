import { HeaderProps } from '../../types/header';
import { pixelHorizontal, pixelVertical, pixelFont } from '../../utils/metrics';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CartIcon from '../../../shared/assets/icons/cart.svg';
import { COLORS } from '@/shared/constants/theme';
import { useBasketStore } from '@/shared/store';
import CountBadge from '../CountBadge';

function Header({ onCartPress }: HeaderProps) {
  const items = useBasketStore(state => state.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TIK TAK</Text>
      <TouchableOpacity onPress={onCartPress} style={styles.cartButton}>
        <CartIcon width={pixelHorizontal(28)} height={pixelHorizontal(28)} />
        <CountBadge count={totalCount} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: pixelHorizontal(16),
    paddingTop: pixelVertical(16),
    paddingBottom: pixelVertical(16),
    backgroundColor: COLORS.white,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  logo: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(24),
    fontWeight: '800',
    lineHeight: pixelFont(24),
    letterSpacing: 0.72,
    color: COLORS.textPrimary,
  },
  cartButton: {
    position: 'relative',
  },
});

export default Header;