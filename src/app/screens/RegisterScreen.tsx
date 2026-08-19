import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '@/shared/types/navigation';
import FormInput from '@/shared/components/FormInput/FormInput';
import FormScreenContainer from '@/shared/components/FormScreenContainer';
import { COLORS } from '@/shared/constants/theme';
import { LAYOUT } from '@/shared/constants/layout';
import { pixelFont, pixelHorizontal, pixelVertical } from '@/shared/utils/metrics';
import { useUserStore } from '@/shared/store/userStore';
import { useRegisterSubmit } from '@/features/auth/hooks/useRegisterSubmit';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const registerSchema = Yup.object({
  full_name: Yup.string().required('Ad və soyad tələb olunur'),
  phone: Yup.string()
    .required('Telefon tələb olunur')
    .matches(/^[+]994\d{9}$/, 'Telefon +994XXXXXXXXX formatında olmalıdır'),
  password: Yup.string()
    .min(6, 'Şifrə ən az 6 simvoldan ibarət olmalıdır')
    .required('Şifrə tələb olunur'),
});

function RegisterScreen({ navigation }: Props) {
  const isLoading = useUserStore(state => state.isLoading);
  const error = useUserStore(state => state.error);
  const { handleSubmit: onRegisterSubmit } = useRegisterSubmit(navigation);

  return (
    <FormScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Qeydiyyatdan keç</Text>
        <Text style={styles.description}>
          Hesab yaratmaq üçün məlumatlarınızı daxil edin
        </Text>

        <Formik
          initialValues={{ full_name: '', phone: '', password: '' }}
          validationSchema={registerSchema}
          onSubmit={onRegisterSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.form}>
              <FormInput
                label="Ad və soyad"
                placeholder="Ad və soyad"
                value={values.full_name}
                onChangeText={handleChange('full_name')}
                error={touched.full_name ? errors.full_name : undefined}
              />
              <FormInput
                label="Telefon"
                placeholder="+994"
                value={values.phone}
                onChangeText={handleChange('phone')}
                error={touched.phone ? errors.phone : undefined}
                keyboardType="phone-pad"
              />
              <FormInput
                label="Şifrə"
                placeholder="Şifrə"
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
                error={touched.password ? errors.password : undefined}
              />
              <Pressable
                style={styles.registerButton}
                onPress={() => handleSubmit()}
                disabled={isSubmitting || isLoading}
              >
                <Text style={styles.registerButtonText}>
                  {isSubmitting || isLoading
                    ? 'Yüklənir...'
                    : 'Qeydiyyatdan keç'}
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Hesabınız varsa</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Daxil olun</Text>
          </Pressable>
        </View>
      </View>
    </FormScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: pixelVertical(120),
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: pixelFont(28),
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '700',
  },
  description: {
    marginTop: pixelVertical(25),
    fontFamily: 'Roboto-Regular',
    fontSize: pixelFont(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  form: {
    marginTop: pixelVertical(35),
    gap: pixelHorizontal(10),
  },
  registerButton: {
    height: pixelVertical(48),
    width: '100%',
    borderRadius: pixelHorizontal(11),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: COLORS.white,
    fontFamily: 'Roboto-Bold',
    fontSize: pixelFont(16),
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pixelVertical(15),
  },
  loginText: {
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Regular',
    fontSize: pixelFont(12),
  },
  loginLink: {
    color: COLORS.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: pixelFont(12),
    marginLeft: pixelHorizontal(4),
  },
  errorText: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: pixelVertical(8),
  },
});

export default RegisterScreen;
