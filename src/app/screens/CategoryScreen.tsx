import { useCallback, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '@/shared/components/Header';
import ScreenContainer from '@/shared/components/ScreenContainer';
import CategoryCard from '@/shared/components/CategoryCard';
import CampaignCarousel from '@/shared/components/CampaignCarousel';
import DeliveryAddress from '@/features/home/components/DeliveryAddress';
import { useProfile } from '@/features/account/hooks/useProfile';
import { useUserAddress, useUserStore } from '@/shared/store';
import { useCategoryStore } from '@/shared/store/categoryStore';
import { useCampaignStore } from '@/shared/store/campaignStore';
import { COLORS } from '@/shared/constants/theme';
import { TYPOGRAPHY } from '@/shared/constants/typography';
import { gapHorizontal, gapVertical } from '@/shared/utils/metrics';
import type { Category } from '@/shared/types/category';
import type { Campaign } from '@/shared/types/campaign';
import type { HomeStackParamList } from '@/shared/types/navigation';

type CategoryNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const GRID_GAP = gapHorizontal(12);

const bannerImage = require('@/shared/assets/images/maxfr.png');

function CategoryScreen() {
  const navigation = useNavigation<CategoryNavigationProp>();
  const { categories, isLoading, error, fetchCategories } = useCategoryStore();
  const { campaigns, fetchCampaigns } = useCampaignStore();
  useProfile();
  const address = useUserAddress();

  useEffect(() => {
    const { accessToken, clearTokens } = useUserStore.getState();
    if (!accessToken) {
      clearTokens();
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleCategoryPress = useCallback(
    (category: Category) => {
      navigation.navigate('Products', { categoryId: category.id, categoryName: category.name });
    },
    [navigation],
  );

  const handleBannerPress = useCallback(
    (_campaign?: Campaign) => {
      const { accessToken, clearTokens } = useUserStore.getState();
      if (accessToken) {
        navigation.navigate('HomeMain');
      } else {
        clearTokens();
      }
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

          <CampaignCarousel
            campaigns={campaigns}
            onPress={handleBannerPress}
            fallbackImage={bannerImage}
          />

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
                />
              ))}
              {categories.length > 0 &&
                Array.from({ length: 3 }).map((_, index) => (
                  <CategoryCard
                    key={`filler-${index}`}
                    image={{ uri: categories[0].img_url }}
                    title={categories[0].name}
                    onPress={() => handleCategoryPress(categories[0])}
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
    paddingTop: gapVertical(16),
    paddingBottom: gapVertical(24),
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
    justifyContent: 'center',
    columnGap: GRID_GAP,
    rowGap: gapVertical(16),
    marginTop: gapVertical(14),
  },
});

export default CategoryScreen;
