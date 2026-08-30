import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ScreenContainer from '@/shared/components/ScreenContainer';
import BackNavigate from '@/shared/components/BackNavigate';
import { useCheckout } from '@/features/checkout/hooks/useCheckout';
import { PaymentMethod } from '@/shared/types/order';
import { COLORS } from '@/shared/constants/theme';
import {
  pixelHorizontal,
  pixelVertical,
  pixelFont,
} from '@/shared/utils/metrics';
import PriceSummaryBar from '@/shared/components/PriceSummaryBar/PriceSummaryBar';

function CheckoutScreen() {
  const {
    fullName,
    address,
    phone,
    note,
    setNote,
    payment,
    setPayment,
    items,
    subtotal,
    delivery,
    total,
    handleSubmit,
    isLoading,
    canSubmit,
  } = useCheckout();

  return (
    <ScreenContainer
      style={styles.container}
      edges={['bottom', 'left', 'right']}
    >
      <BackNavigate title="Sifarişi tamamla" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Adınız</Text>
        <Text style={styles.value}>{fullName || '—'}</Text>

        <Text style={styles.label}>Ünvanınız</Text>
        <Text style={styles.value}>{address || '—'}</Text>

        <Text style={styles.label}>Telefon nömrəniz</Text>
        <Text style={styles.value}>{phone || '—'}</Text>

        <Text style={styles.label}>Əlavə qeydiniz</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Əlavə qeydiniz varsa buraya daxil edin"
          placeholderTextColor={COLORS.textSecondary}
          value={note}
          onChangeText={setNote}
          multiline
          scrollEnabled
          maxLength={500}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Ödəniş üsulu</Text>
        <View style={styles.radioCol}>
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setPayment(PaymentMethod.CASH)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                payment === PaymentMethod.CASH && styles.radioCircleChecked,
              ]}
            >
              {payment === PaymentMethod.CASH && (
                <View style={styles.radioInnerDot} />
              )}
            </View>
            <Text
              style={[
                styles.radioLabel,
                payment === PaymentMethod.CASH && styles.radioLabelChecked,
              ]}
            >
              Qapıda nağd
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setPayment(PaymentMethod.CARD)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                payment === PaymentMethod.CARD && styles.radioCircleChecked,
              ]}
            >
              {payment === PaymentMethod.CARD && (
                <View style={styles.radioInnerDot} />
              )}
            </View>
            <Text
              style={[
                styles.radioLabel,
                payment === PaymentMethod.CARD && styles.radioLabelChecked,
              ]}
            >
              Qapıda kart
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsContainer}>
          <ScrollView
            style={styles.productsScroll}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {items.map(item => (
              <View key={item.id} style={styles.productRow}>
                <Text style={styles.productText} numberOfLines={2}>
                  {item.quantity} x {item.name}
                </Text>
                <Text style={styles.productPrice}>
                  {(Number(item.price) * item.quantity).toFixed(2)} AZN
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {(!address || !phone) && (
          <Text style={styles.warning}>
            Sifariş vermək üçün hesabınızda ünvan və telefon nömrəniz olmalıdır
          </Text>
        )}
      </ScrollView>
      <PriceSummaryBar
        subtotal={subtotal}
        delivery={delivery}
        total={total}
        buttonTitle="Sifarişi tamamla"
        onButtonPress={handleSubmit}
        isLoading={isLoading}
        disabled={!canSubmit}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: pixelHorizontal(20),
    paddingBottom: pixelVertical(8),
  },

  label: {
    fontFamily: 'Roboto',
    marginTop: pixelVertical(25),
    marginBottom: pixelVertical(9),
    fontSize: pixelFont(16),
    lineHeight: pixelFont(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  value: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    fontWeight: '300',
    lineHeight: pixelFont(16),
    color: COLORS.textPrimary,
  },

  textArea: {
    height: pixelVertical(90),
    borderRadius: pixelHorizontal(12),
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: pixelHorizontal(14),
    paddingTop: pixelVertical(12),
    paddingBottom: pixelVertical(12),
    fontSize: pixelFont(14),
    color: COLORS.textPrimary,
    textAlignVertical: 'top',
  },

  radioCol: {
    marginTop: pixelVertical(4),
    gap: pixelVertical(19),
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: pixelHorizontal(20),
    height: pixelHorizontal(20),
    borderRadius: pixelHorizontal(10),
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: pixelHorizontal(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleChecked: {
    borderColor: COLORS.primary,
  },
  radioInnerDot: {
    width: pixelHorizontal(10),
    height: pixelHorizontal(10),
    borderRadius: pixelHorizontal(5),
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(16),
    lineHeight: pixelFont(16),
    color: COLORS.textPrimary,
    fontWeight: '400',
  },
  radioLabelChecked: {
    color: COLORS.primary,
    fontWeight: '600',
  },

  productsContainer: {
    marginTop: pixelVertical(14),
    paddingTop: pixelVertical(10),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  productsScroll: {
    maxHeight: pixelVertical(180),
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: pixelVertical(10),
    paddingRight: pixelHorizontal(4),
  },
  productText: {
    flex: 1,
    fontSize: pixelFont(14),
    color: COLORS.textPrimary,
  },
  productPrice: {
    fontSize: pixelFont(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
    flexShrink: 0,
  },

  warning: {
    marginTop: pixelVertical(8),
    color: COLORS.error,
    fontSize: pixelFont(12),
    textAlign: 'center',
  },
});

export default CheckoutScreen;
