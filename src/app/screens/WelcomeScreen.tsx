import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../../shared/types/navigation';
import { COLORS } from '../../shared/constants/theme';
import { LAYOUT } from '../../shared/constants/layout';

;type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../shared/assets/images/wel.png')}
          style={styles.heroImage}
        />
        <Text style={styles.description}>
          Sizə daha əlçatan olması üçün qeydiyyatdan keçərək
          {'\n'}
          davam edə bilərsiniz 🥰
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.registerButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>Qeydiyyat</Text>
        </Pressable>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Hesabınız varsa</Text>

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> Daxil olun</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    alignItems: 'center',
     marginTop: 110,
  },

heroImage: {
  width: 300,
  height: 300,
  marginTop: 70,
  marginLeft: -120,
},
  description: {
    marginTop: 62,
    textAlign: 'center',
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 20,
  },

  registerButton: {
    width: '100%',
    height: 48,
    marginTop: 24,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPressed: {
    opacity: 0.75,
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
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
});

export default WelcomeScreen;
