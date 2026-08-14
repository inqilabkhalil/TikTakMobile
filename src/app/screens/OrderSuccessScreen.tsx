import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenContainer from '@/shared/components/ScreenContainer';
import BackNavigate from '@/shared/components/BackNavigate';
import SuccessIcon from '@/shared/assets/images/success.svg';
import { COLORS } from '@/shared/constants/theme';
import { useOrderSuccess } from '@/features/checkout/hooks/useOrderSuccess';
import { pixelFont, pixelHorizontal, pixelVertical } from '@/shared/utils/metrics';

function OrderSuccessScreen() {
  const { buttonOpacity, goToOrders } = useOrderSuccess();
  return (
    <ScreenContainer style={styles.container}>
      <BackNavigate title="Sifarişi tamamla" />

      <View style={styles.content}>
        <SuccessIcon width={155} height={155} />
        <Text style={styles.title}>Sifariş uğurla tamamlandı</Text>
        <Text style={styles.subtitle}>
          Əməkdaşlarımız sizinlə əlaqə saxlayıb sifarişinizi göndərəcəklər.
        </Text>

        <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={goToOrders}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Sifarişlərimə bax</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: pixelVertical(136),
    paddingHorizontal: pixelHorizontal(24),
  },
  title: {
    paddingTop: pixelVertical(40),
    color: COLORS.textPrimary,
    fontSize: pixelFont(18),
    fontWeight: '700',
    marginBottom: pixelVertical(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: pixelFont(14),
    color: '#6B6B6B',
    textAlign: 'center',
  },
   buttonWrapper: {
    marginTop: pixelVertical(40),
    width: '100%',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: pixelVertical(14),
    borderRadius: pixelHorizontal(10),
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: pixelFont(16),
  },
});

export default OrderSuccessScreen;
