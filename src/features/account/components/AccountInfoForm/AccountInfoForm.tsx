import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import FormInput from '../../../../shared/components/FormInput';
import Button from '../../../../shared/components/Button';
import { accountInfoSchema } from './accountInfoSchema';
import { gapHorizontal, pixelVertical } from '../../../../shared/utils/metrics';
import type { ProfileFormValues } from '../../types/account';
import { COLORS } from '@/shared/constants/theme';
import { useUser } from '@/shared/store';
import { useUpdateProfile } from '../../hooks/useProfile';
import { UpdateProfilePayload } from '@/shared/types/user';

function AccountInfoForm() {
  const user = useUser();
  const { updateProfile, isUpdating } = useUpdateProfile();

  const initialValues: ProfileFormValues = {
    full_name: user?.full_name ?? '',
    email: user?.email ?? '',
    address: user?.address ?? '',
    phone: user?.phone ?? '',
    password: '',
    password_repeat: '',
  };

  const formik = useFormik<ProfileFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: accountInfoSchema,
    onSubmit: async values => {
      const payload: UpdateProfilePayload = {
        full_name: values.full_name.trim(),
        address: values.address.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
      };

      if (values.password && values.password.length > 0) {
        payload.password = values.password;
        payload.password_repeat = values.password_repeat;
      }

      const success = await updateProfile(payload);

      if (success) {
        formik.setFieldValue('password', '');
        formik.setFieldValue('password_repeat', '');
      }
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
        <Button
          title="Yadda saxla"
          onPress={() => formik.handleSubmit()}
          disabled={isUpdating}
        />
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
