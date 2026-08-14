import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../navigation';
import FormInput from '@/shared/components/FormInput/FormInput';
import FormScreenContainer from '@/shared/components/FormScreenContainer';
import { COLORS } from '@/shared/constants/theme';
import { LAYOUT } from '@/shared/constants/layout';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const loginSchema = Yup.object({
  phone: Yup.string()
    .required('Telefon nömrəsi tələb olunur'),
  password: Yup.string()
    .required('Şifrə tələb olunur'),
});

function LoginScreen({ navigation }: Props) {
  return (
    <FormScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>
          Daxil ol
        </Text>

        <Formik
          initialValues={{
            phone: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={values => {
            console.log('LOGIN VALUES:', values);
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.form}>
                <FormInput
                  label="Telefon"
                  placeholder="telefon"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  error={
                    touched.phone
                      ? errors.phone
                      : undefined
                  }
                />

                <FormInput
                  label="Parol"
                  placeholder="parol"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  error={
                    touched.password
                      ? errors.password
                      : undefined
                  }
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.loginButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.loginButtonText}>
                    Daxil ol
                  </Text>
                </Pressable>
              </View>

              <View style={styles.registerRow}>
                <Text style={styles.registerText}>
                  Hesabınız yoxdursa
                </Text>

                <Pressable
                  onPress={() =>
                    navigation.navigate('Register')
                  }
                >
                  <Text style={styles.registerLink}>
                    Qeydiyyatdan keç
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </View>
    </FormScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
  },

  title: {
    marginTop: 115,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    lineHeight: 24,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },

  form: {
    marginTop: 42,
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