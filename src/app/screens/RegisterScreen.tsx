import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthStackParamList } from '../navigation';
import { NativeStackScreenProps } from 'node_modules/@react-navigation/native-stack/lib/typescript/src/types';
import * as Yup from 'yup';
import BackNavigate from '@/shared/components/BackNavigate';
import { Formik } from 'formik';
import FormInput from '@/shared/components/FormInput/FormInput';
import { LAYOUT } from '@/shared/constants/layout';
import { COLORS } from '@/shared/constants/theme';
import FormScreenContainer from '@/shared/components/FormScreenContainer';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const registerSchema = Yup.object({
  full_name: Yup.string().required('Full name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function RegisterScreen({ navigation }: Props) {
  return (
    <FormScreenContainer>
      <View style={styles.container}>
        <BackNavigate title="" />
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
          onSubmit={values => {
            console.log('REGISTER VALUES:', values);
          }}
        >
          {({
            handleChange,

            handleSubmit,
            values,
            errors,
            touched,
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
              >
                <Text style={styles.registerButtonText}>Qeydiyyatdan keç</Text>
              </Pressable>{' '}
            </View>
          )}
        </Formik>
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
    marginTop: 25,
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
  },
  icon: {
    marginLeft: -5,
  },
  title: {
    marginTop: 35,
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '700',
  },

  description: {
    marginTop: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  form: {
    marginTop: 35,
    gap: 10,
  },
  registerButton: {
    height: 48,
    width: '100%',
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerButtonText: {
    color: COLORS.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  loginText: {
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },

  loginLink: {
    color: COLORS.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default RegisterScreen;
