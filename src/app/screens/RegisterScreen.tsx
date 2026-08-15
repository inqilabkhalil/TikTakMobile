import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthStackParamList } from '@/shared/types/navigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Yup from 'yup';
import { Formik } from 'formik';
import FormInput from '@/shared/components/FormInput/FormInput';
import { LAYOUT } from '@/shared/constants/layout';
import { COLORS } from '@/shared/constants/theme';
import { pixelFont, pixelHorizontal, pixelVertical } from '@/shared/utils/metrics';
import FormScreenContainer from '@/shared/components/FormScreenContainer';
import { authService } from '../services/authService';
import { useUserStore } from '@/shared/store/userStore';
import axios from 'axios';
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
  return (
    <FormScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Qeydiyyatdan keç</Text>

        <Text style={styles.description}>
          Hesab yaratmaq üçün məlumatlarınızı daxil edin
        </Text>
        <Formik
          initialValues={{
            full_name: '',
            phone: '',
            password: '',
          }}
          validationSchema={registerSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const setLoading = useUserStore.getState().setLoading;
            const setError = useUserStore.getState().setError;
            const setTokens = useUserStore.getState().setTokens;
            const setUser = useUserStore.getState().setUser;

            try {
              setLoading(true);
              setError(null);

              const result = await authService.register(values);

              if (result.tokens && result.profile) {
                setTokens(
                  result.tokens.access_token,
                  result.tokens.refresh_token ?? '',
                );

                setUser(result.profile);
              } else {
                navigation.navigate('Login');
              }
            } catch (error) {
              if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const data = error.response?.data;

                if (status === 409) {
                  setError('Bu telefon nömrəsi artıq qeydiyyatdan keçib.');
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
                    'Qeydiyyat zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
                  );
                }
              } else {
                setError('Qeydiyyat zamanı gözlənilməz xəta meydana gəldi.');
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
                disabled={isSubmitting || useUserStore.getState().isLoading}
              >
                <Text style={styles.registerButtonText}>
                  {isSubmitting || useUserStore.getState().isLoading
                    ? 'Yüklənir...'
                    : 'Qeydiyyatdan keç'}
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>
        {useUserStore.getState().error ? (
          <Text style={styles.errorText}>{useUserStore.getState().error}</Text>
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
