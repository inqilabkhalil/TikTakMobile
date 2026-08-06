import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { gapHorizontal, gapVertical, pixelFont } from '../../utils/metrics';
import type { BackNavigateProps } from '../../types/backNavigate';

const TEXT_COLOR = '#1A1A1A';
const BACKGROUND_COLOR = '#FFFFFF';

function ArrowLeftIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BackNavigate({
  title,
  onBack,
  showDivider = true,
  showBack = true,
}: BackNavigateProps) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, showDivider && styles.headerDivider]}>
        {showBack ? (
          <TouchableOpacity
            style={styles.side}
            onPress={handleBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <ArrowLeftIcon size={pixelFont(22)} color={TEXT_COLOR} />
          </TouchableOpacity>
        ) : (
          <View style={styles.side} />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.side} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: gapVertical(48),
    paddingHorizontal: gapHorizontal(16),
  },
  headerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  side: {
    width: pixelFont(22),
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: pixelFont(19),
    fontWeight: '700',
    color: TEXT_COLOR,
  },
});

export default BackNavigate;