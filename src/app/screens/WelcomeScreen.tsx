import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../../shared/types/navigation';
import { COLORS } from '../../shared/constants/theme';
import { LAYOUT } from '../../shared/constants/layout';
import { pixelFont, pixelHorizontal, pixelVertical } from '../../shared/utils/metrics';

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
    marginTop: pixelVertical(110),
  },

  heroImage: {
    width: pixelHorizontal(300),
    height: pixelVertical(300),
    marginTop: pixelVertical(70),
    marginLeft: pixelHorizontal(-120),
  },
  description: {
    marginTop: pixelVertical(62),
    textAlign: 'center',
    color: COLORS.textPrimary,
    fontFamily: 'Roboto-Regular',
    fontSize: pixelFont(12),
    lineHeight: pixelVertical(20),
  },

  registerButton: {
    width: '100%',
    height: pixelVertical(48),
    marginTop: pixelVertical(24),
    borderRadius: pixelHorizontal(11),
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
    fontFamily: 'Roboto-Regular',
    fontSize: pixelFont(12),
  },
});

export default WelcomeScreen;
