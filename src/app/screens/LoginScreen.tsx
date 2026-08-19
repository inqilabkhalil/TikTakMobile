import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '@/shared/types/navigation';
import FormInput from '@/shared/components/FormInput/FormInput';
import FormScreenContainer from '@/shared/components/FormScreenContainer';
import { COLORS } from '@/shared/constants/theme';
import { LAYOUT } from '@/shared/constants/layout';
import { pixelFont, pixelHorizontal, pixelVertical } from '@/shared/utils/metrics';
import { useUserStore } from '@/shared/store/userStore';
import { useLoginSubmit } from '@/features/auth/hooks/useLoginSubmit';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const loginSchema = Yup.object({
  phone: Yup.string().required('Telefon nömrəsi tələb olunur'),
  password: Yup.string().required('Şifrə tələb olunur'),
});

function LoginScreen({ navigation }: Props) {
  const isLoading = useUserStore(state => state.isLoading);
  const error = useUserStore(state => state.error);
  const { handleSubmit: onLoginSubmit } = useLoginSubmit();

  return (
    <FormScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Daxil ol</Text>

        <Formik
          initialValues={{ phone: '+994', password: '' }}
          validationSchema={loginSchema}
          onSubmit={onLoginSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
            <>
              <View style={styles.form}>
                <FormInput
                  label="Telefon"
                  placeholder="+994"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  error={touched.phone ? errors.phone : undefined}
                  keyboardType="phone-pad"
                />

                <FormInput
                  label="Parol"
                  placeholder="Parol"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  error={touched.password ? errors.password : undefined}
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.loginButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting || isLoading}
                >
                  <Text style={styles.loginButtonText}>
                    {isSubmitting || isLoading
                      ? 'Yüklənir...'
                      : 'Daxil ol'}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.registerRow}>
                <Text style={styles.registerText}>Hesabınız yoxdursa</Text>
                <Pressable onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.registerLink}>Qeydiyyatdan keç</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>
    </FormScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: pixelVertical(130),
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: pixelFont(28),
    fontWeight: '700',
    lineHeight: pixelVertical(24),
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  form: {
    marginTop: pixelVertical(35),
    gap: pixelHorizontal(10),
  },
  loginButton: {
    width: '100%',
    height: pixelVertical(48),
    marginTop: pixelVertical(38),
    borderRadius: pixelHorizontal(11),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  loginButtonText: {
    color: COLORS.white,
    fontFamily: 'Roboto-Bold',
    fontSize: pixelFont(14),
  },
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pixelVertical(15),
  },
  registerText: {
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Regular',
    fontSize: pixelFont(12),
  },
  registerLink: {
    color: COLORS.primary,
    fontFamily: 'Roboto-Regular',
    fontSize: pixelFont(12),
    marginLeft: pixelHorizontal(4),
  },
  errorText: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: pixelVertical(8),
  },
});

export default LoginScreen;
