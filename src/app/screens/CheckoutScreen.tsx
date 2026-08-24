import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import ScreenContainer from '@/shared/components/ScreenContainer';
import BackNavigate from '@/shared/components/BackNavigate';

import { useCheckout } from '@/features/checkout/hooks/useCheckout';
import { COLORS } from '@/shared/constants/theme';
import {
  pixelHorizontal,
  pixelVertical,
  pixelFont,
} from '@/shared/utils/metrics';

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
    <ScreenContainer style={styles.container} edges={['bottom', 'left', 'right']}>
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
        <View style={styles.radioRow}>
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setPayment('CASH')}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                payment === 'CASH' && styles.radioCircleChecked,
              ]}
            >
              {payment === 'CASH' && <View style={styles.radioInnerDot} />}
            </View>
            <Text
              style={[
                styles.radioLabel,
                payment === 'CASH' && styles.radioLabelChecked,
              ]}
            >
              Qapıda nağd
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setPayment('CARD')}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                payment === 'CARD' && styles.radioCircleChecked,
              ]}
            >
              {payment === 'CARD' && <View style={styles.radioInnerDot} />}
            </View>
            <Text
              style={[
                styles.radioLabel,
                payment === 'CARD' && styles.radioLabelChecked,
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

      <View style={styles.bottomSection}>
        <View style={styles.totalsRow}>
          <View style={styles.totalsColLeft}>
            <View style={styles.smallRow}>
              <Text style={styles.smallLabel}>Ümumi: </Text>
              <Text style={styles.smallValue}>{subtotal.toFixed(2)} AZN</Text>
            </View>
            <View style={styles.smallRow}>
              <Text style={styles.smallLabel}>Çatdırılma: </Text>
              <Text style={styles.smallValue}>
                {delivery === 0 ? 'Pulsuz' : `${delivery.toFixed(2)} AZN`}
              </Text>
            </View>
          </View>

          <View style={styles.totalsColRight}>
            <Text style={styles.totalLabel}>Yekun məbləğ:</Text>
            <Text style={styles.totalValue}>{total.toFixed(2)} AZN</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !canSubmit && styles.submitDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.submitText}>Sifarişi tamamla</Text>
          )}
        </TouchableOpacity>
      </View>
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
    paddingBottom: pixelVertical(24),
  },

  label: {
    fontFamily: 'Roboto',
    marginTop: pixelVertical(18),
    marginBottom: pixelVertical(8),
    fontSize: pixelFont(15),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  value: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    fontWeight: '400',
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

  radioRow: {
    flexDirection: 'row',
    marginTop: pixelVertical(4),
    gap: pixelHorizontal(24),
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
    fontSize: pixelFont(14),
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  radioLabelChecked: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  productsContainer: {
    marginTop: pixelVertical(24),
    marginBottom: pixelVertical(12),
  },
  productsScroll: {
    maxHeight: pixelVertical(140),
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
    marginTop: pixelVertical(12),
    color: COLORS.error,
    fontSize: pixelFont(12),
    textAlign: 'center',
  },

  bottomSection: {
    paddingHorizontal: pixelHorizontal(20),
    paddingTop: pixelVertical(16),
    paddingBottom: pixelVertical(20),
    backgroundColor: COLORS.white,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: pixelVertical(16),
  },
  totalsColLeft: {
    flex: 1,
  },
  totalsColRight: {
    alignItems: 'flex-end',
  },
  smallRow: {
    flexDirection: 'row',
    marginBottom: pixelVertical(4),
  },
  smallLabel: {
    fontSize: pixelFont(13),
    color: COLORS.labelText,
  },
  smallValue: {
    fontSize: pixelFont(13),
    color: COLORS.labelText,
  },
  totalLabel: {
    fontSize: pixelFont(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: pixelFont(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: pixelVertical(2),
  },

  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: pixelVertical(14),
    borderRadius: pixelHorizontal(10),
    alignItems: 'center',
  },
  submitDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: pixelFont(16),
  },
});

export default CheckoutScreen;