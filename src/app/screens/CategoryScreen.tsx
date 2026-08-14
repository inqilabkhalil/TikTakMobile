import { useCallback, useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '@/shared/components/Header';
import ScreenContainer from '@/shared/components/ScreenContainer';
import CategoryCard from '@/shared/components/CategoryCard';
import DeliveryAddress from '@/features/home/components/DeliveryAddress';
import { useProfile } from '@/features/account/hooks/useProfile';
import { useUserAddress } from '@/shared/store';
import { useCategoryStore } from '@/shared/store/categoryStore';
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
import type { Category } from '@/shared/types/category';
import type { HomeStackParamList } from '@/shared/types/navigation';

type CategoryNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

// The Figma category-card width (156) doesn't fit 3-per-row on top of the
// screen padding — it was overflowing the container. Computed here instead
// so 3 columns always fit inside the available content width.
const GRID_COLUMNS = 3;
const GRID_GAP = gapHorizontal(12);
const CARD_WIDTH =
  (deviceWidth - LAYOUT.screenPaddingHorizontal * 2 - GRID_GAP * (GRID_COLUMNS - 1)) /
  GRID_COLUMNS;

const bannerImage = require('@/shared/assets/images/maxfr.png');

function CategoryScreen() {
  const navigation = useNavigation<CategoryNavigationProp>();
  const { categories, isLoading, error, fetchCategories } = useCategoryStore();
  useProfile();
  const address = useUserAddress();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryPress = useCallback(
    (category: Category) => {
      navigation.navigate('Products', { categoryId: category.id, categoryName: category.name });
    },
    [navigation],
  );

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <Header />
      </SafeAreaView>
      <ScreenContainer edges={['bottom', 'left', 'right']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <DeliveryAddress address={address} />

          <View style={styles.banner}>
            <Image source={bannerImage} style={styles.bannerImage} resizeMode="contain" />
            <View style={styles.bannerTextWrapper}>
              <Text style={styles.bannerTitle}>MEYVƏLƏRƏ</Text>
              <Text style={styles.bannerTitle}>HƏFTƏ SONUNA KIMI</Text>
              <Text style={styles.bannerTitle}>20% ENDİRİM</Text>
            </View>
          </View>

          {isLoading && (
            <ActivityIndicator
              style={styles.statusIndicator}
              size="large"
              color={COLORS.primary}
            />
          )}

          {!isLoading && error && <Text style={styles.errorText}>{error}</Text>}

          {!isLoading && !error && (
            <View style={styles.grid}>
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  image={{ uri: category.img_url }}
                  title={category.name}
                  onPress={() => handleCategoryPress(category)}
                  style={styles.categoryCard}
                />
              ))}
            </View>
          )}
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
  statusIndicator: {
    marginTop: gapVertical(40),
  },
  errorText: {
    ...TYPOGRAPHY.categoryLabel,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: gapVertical(40),
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

export default CategoryScreen;
