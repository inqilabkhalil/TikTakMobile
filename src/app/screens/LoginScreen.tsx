import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../navigation';
import FormInput from '@/shared/components/FormInput/FormInput';
import FormScreenContainer from '@/shared/components/FormScreenContainer';
import { COLORS } from '@/shared/constants/theme';
import { LAYOUT } from '@/shared/constants/layout';
import { authService } from '../services/authService';
import { useUserStore } from '@/shared/store/userStore';
import axios from 'axios';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const loginSchema = Yup.object({
  phone: Yup.string().required('Telefon nömrəsi tələb olunur'),
  password: Yup.string().required('Şifrə tələb olunur'),
});

function LoginScreen({ navigation }: Props) {
  return (
    <FormScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Daxil ol</Text>

        <Formik
          initialValues={{
            phone: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const setLoading = useUserStore.getState().setLoading;
            const setError = useUserStore.getState().setError;
            const setTokens = useUserStore.getState().setTokens;
            const setUser = useUserStore.getState().setUser;

            try {
              setLoading(true);
              setError(null);

              const result = await authService.login(values);

              if (result.tokens && result.profile) {
                setTokens(
                  result.tokens.access_token,
                  result.tokens.refresh_token ?? '',
                );
                setUser(result.profile);
                (navigation as any).reset({
                  index: 0,
                  routes: [{ name: 'Main' }],
                });
              } else {
                setError('Giriş uğursuz oldu.');
              }
            } catch (error) {
              if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const data = error.response?.data;

                if (status === 401) {
                  setError('Telefon nömrəsi və ya şifrə yanlışdır.');
                } else if (status === 422) {
                  const result = data?.result;
                  const message = data?.message;
                  if (result) {
                    if (Array.isArray(result)) {
                      setError(
                        result
                          .map(r =>
                            r?.message ? String(r.message) : JSON.stringify(r),
                          )
                          .join('\n'),
                      );
                    } else if (typeof result === 'object') {
                      const first = Object.values(result)[0];
                      if (Array.isArray(first)) setError(first.join('\n'));
                      else setError(String(first));
                    } else {
                      setError(String(result));
                    }
                  } else if (message) {
                    setError(String(message));
                  } else {
                    setError(
                      'Doğrulama xətası. Zəhmət olmasa məlumatları yoxlayın.',
                    );
                  }
                } else if (data?.message) {
                  setError(String(data.message));
                } else {
                  setError(
                    'Giriş zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
                  );
                }
              } else {
                setError('Giriş zamanı gözlənilməz xəta meydana gəldi.');
              }
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <View style={styles.form}>
                <FormInput
                  label="Telefon"
                  placeholder="+994"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  error={touched.phone ? errors.phone : undefined}
                />

                <FormInput
                  label="Parol"
                  placeholder="parol"
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
                  disabled={isSubmitting || useUserStore.getState().isLoading}
                >
                  <Text style={styles.loginButtonText}>
                    {isSubmitting || useUserStore.getState().isLoading
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
        {useUserStore.getState().error ? (
          <Text
            style={{ color: COLORS.primary, textAlign: 'center', marginTop: 8 }}
          >
            {useUserStore.getState().error}
          </Text>
        ) : null}
      </View>
    </FormScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 130,
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
  },

  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 24,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  form: {
    marginTop: 35,
    gap: 10,
  },

  loginButton: {
    width: '100%',
    height: 48,
    marginTop: 38,
    borderRadius: 11,
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
    fontSize: 14,
  },

  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  registerText: {
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },

  registerLink: {
    color: COLORS.primary,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default LoginScreen;
