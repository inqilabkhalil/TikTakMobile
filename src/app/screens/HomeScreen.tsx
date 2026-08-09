import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/shared/components/Header';
import ScreenContainer from '@/shared/components/ScreenContainer';
import CategoryCard from '@/shared/components/CategoryCard';
import DeliveryAddress from '@/features/home/components/DeliveryAddress';
import { CATEGORIES } from '@/features/home/mock/categories';
import { COLORS } from '@/shared/constants/theme';
import { TYPOGRAPHY } from '@/shared/constants/typography';
import { LAYOUT } from '@/shared/constants/layout';
import {
  deviceWidth,
  pixelWidth,
  pixelHeight,
  gapHorizontal,
  gapVertical,
} from '@/shared/utils/metrics';

const MOCK_ADDRESS = '55 Zarifa Aliyeva, Bakı, Azerbaijan';

// The Figma category-card width (156) doesn't fit 3-per-row on top of the
// screen padding — it was overflowing the container. Computed here instead
// so 3 columns always fit inside the available content width.
const GRID_COLUMNS = 3;
const GRID_GAP = gapHorizontal(12);
const CARD_WIDTH =
  (deviceWidth - LAYOUT.screenPaddingHorizontal * 2 - GRID_GAP * (GRID_COLUMNS - 1)) /
  GRID_COLUMNS;

const bannerImage = require('@/shared/assets/images/maxfr.png');

function HomeScreen() {
  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <Header />
      </SafeAreaView>
      <ScreenContainer edges={['bottom', 'left', 'right']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <DeliveryAddress address={MOCK_ADDRESS} />

          <View style={styles.banner}>
            <Image source={bannerImage} style={styles.bannerImage} resizeMode="contain" />
            <View style={styles.bannerTextWrapper}>
              <Text style={styles.bannerTitle}>MEYVƏLƏRƏ</Text>
              <Text style={styles.bannerTitle}>HƏFTƏ SONUNA KIMI</Text>
              <Text style={styles.bannerTitle}>20% ENDİRİM</Text>
            </View>
          </View>

          <View style={styles.grid}>
            {CATEGORIES.map(category => (
              <CategoryCard
                key={category.id}
                image={category.image}
                title={category.title}
                style={styles.categoryCard}
              />
            ))}
          </View>
        </ScrollView>
      </ScreenContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerSafeArea: {
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: gapVertical(24),
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: pixelWidth(345),
    height: pixelHeight(159),
    paddingHorizontal: pixelWidth(16),
    paddingVertical: pixelHeight(8),
    borderRadius: pixelWidth(10),
    backgroundColor: COLORS.bannerPurple,
    alignSelf: 'center',
    marginTop: pixelHeight(22),
    overflow: 'hidden',
  },
  bannerImage: {
    width: pixelWidth(130),
    height: pixelHeight(140),
  },
  bannerTextWrapper: {
    flex: 1,
    marginLeft: gapHorizontal(8),
  },
  bannerTitle: {
    ...TYPOGRAPHY.bannerTitle,
    color: COLORS.white,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: GRID_GAP,
    rowGap: gapVertical(12),
    marginTop: gapVertical(20),
  },
  categoryCard: {
    width: CARD_WIDTH,
  },
});

export default HomeScreen;
