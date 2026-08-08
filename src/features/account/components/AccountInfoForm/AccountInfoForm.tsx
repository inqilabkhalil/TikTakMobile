import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import FormInput from '../../../../shared/components/FormInput';
import Button from '../../../../shared/components/Button';
import { MOCK_USER } from '../../mock/user';
import { accountInfoSchema } from './accountInfoSchema';
import { gapHorizontal, gapVertical, pixelFont, pixelVertical } from '../../../../shared/utils/metrics';
import type { ProfileFormValues } from '../../types/account';
import { COLORS } from '@/shared/constants/theme';

function AccountInfoForm() {
  const initialValues: ProfileFormValues = {
    full_name: MOCK_USER.full_name,
    email: MOCK_USER.email ?? '',
    address: MOCK_USER.address,
    phone: MOCK_USER.phone,
    password: '',
    password_repeat: '',
  };

  const formik = useFormik<ProfileFormValues>({
    initialValues,
    validationSchema: accountInfoSchema,
    onSubmit: (values) => {
      // TODO: API-yə göndəriləcək
    },
  });

  return (
    <View style={styles.card}>
      <FormInput
        label="Ad Soyad"
        placeholder="Ad, Soyad"
        value={formik.values.full_name}
        onChangeText={formik.handleChange('full_name')}
        error={formik.touched.full_name ? formik.errors.full_name : undefined}
        autoCapitalize="words"
      />

      <FormInput
        label="Ünvan"
        placeholder="Ünvan"
        value={formik.values.address}
        onChangeText={formik.handleChange('address')}
        error={formik.touched.address ? formik.errors.address : undefined}
      />

      <FormInput
        label="Telefon nömrəsi"
        placeholder="(+994) __ / ___ / __ / __"
        value={formik.values.phone}
        onChangeText={formik.handleChange('phone')}
        error={formik.touched.phone ? formik.errors.phone : undefined}
        keyboardType="phone-pad"
        maxLength={13}
      />

      <FormInput
        label="E-mail"
        placeholder="example@mail.com"
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        error={formik.touched.email ? formik.errors.email : undefined}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      

      <FormInput
        label="Şifrə"
        placeholder="Yeni şifrə"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        error={formik.touched.password ? formik.errors.password : undefined}
        secureTextEntry
      />

      <FormInput
        label="Şifrənin təkrarı"
        placeholder="Yeni şifrəni təkrarlayın"
        value={formik.values.password_repeat}
        onChangeText={formik.handleChange('password_repeat')}
        error={
          formik.touched.password_repeat
            ? formik.errors.password_repeat
            : undefined
        }
        secureTextEntry
      />

      <View style={styles.buttonWrapper}>
        <Button title="Yadda saxla" onPress={() => formik.handleSubmit()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: gapHorizontal(20),
    marginTop: pixelVertical(16),
    marginHorizontal: gapHorizontal(4),
  },
  buttonWrapper: {
    paddingTop: pixelVertical(12),
    paddingBottom: pixelVertical(14),
    marginTop: pixelVertical(10),
  },
});

export default AccountInfoForm;