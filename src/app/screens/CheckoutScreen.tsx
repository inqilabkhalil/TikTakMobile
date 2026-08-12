import { useRef, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { MOCK_BASKET } from '@/features/basket/mock/mockBasket';
import { calculateSubtotal } from '@/features/basket/utils/basketCalculations';

function CheckoutScreen() {
  const navigation = useNavigation();
  const nameRef = useRef<TextInput | null>(null);
  const [payment, setPayment] = useState<'cash' | 'card'>('cash');

  const subtotal = calculateSubtotal(MOCK_BASKET);
  const delivery = 0.0;
  const total = subtotal + delivery;

  return (
    <ScreenContainer style={styles.container}>
      <BackNavigate title="Sifarişi tamamla" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Adınız</Text>
        <TextInput
          ref={nameRef}
          style={styles.input}
          placeholder="Ad Soyad"
          autoFocus
        />

        <Text style={styles.label}>Ünvanınız</Text>
        <TextInput style={styles.input} placeholder="Şəhər, ünvan" />

        <Text style={styles.label}>Telefon</Text>
        <TextInput
          style={styles.input}
          placeholder="+994 XX XXX XX XX"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Əlavə qeyd</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Qeyd"
          multiline
        />

        <Text style={[styles.label, { marginTop: 20 }]}>Ödəniş üsulu</Text>
        <View style={styles.radioRow}>
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setPayment('cash')}
          >
            <View
              style={[
                styles.radioCircle,
                payment === 'cash' && styles.radioChecked,
              ]}
            />
            <Text style={styles.radioLabel}>Qapıda nağd</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setPayment('card')}
          >
            <View
              style={[
                styles.radioCircle,
                payment === 'card' && styles.radioChecked,
              ]}
            />
            <Text style={styles.radioLabel}>Qapıda kart</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ümumi:</Text>
            <Text style={styles.summaryValue}>{subtotal.toFixed(2)} AZN</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Çatdırılma:</Text>
            <Text style={styles.summaryValue}>{delivery.toFixed(2)} AZN</Text>
          </View>
          <View style={styles.summaryRowTotal}>
            <Text style={styles.summaryTotalLabel}>Yekun məbləğ</Text>
            <Text style={styles.summaryTotalValue}>{total.toFixed(2)} AZN</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            // proceed to success screen
            // @ts-ignore
            navigation.navigate('OrderSuccess');
          }}
        >
          <Text style={styles.submitText}>Sifarişi tamamla</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0, backgroundColor: '#FFFFFF' },
  content: { padding: 16 },
  label: { marginTop: 12, marginBottom: 8, color: '#6B6B6B' },
  input: {
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
  },
  textArea: { height: 96, paddingTop: 12 },
  paymentRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: { color: '#6B6B6B' },
  paymentOption: { fontWeight: '600' },
  submitButton: {
    marginTop: 24,
    backgroundColor: '#4FC76E',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: { color: '#FFFFFF', fontWeight: '700' },
  radioRow: { flexDirection: 'row', marginTop: 8, gap: 12 },
  radioItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginRight: 10,
  },
  radioChecked: { backgroundColor: '#4FC76E', borderColor: '#4FC76E' },
  radioLabel: { color: '#1A1A1A' },
  summaryCard: {
    marginTop: 18,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: { color: '#6B6B6B' },
  summaryValue: { fontWeight: '600' },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  summaryTotalLabel: { fontWeight: '700' },
  summaryTotalValue: { fontWeight: '700' },
});

export default CheckoutScreen;
