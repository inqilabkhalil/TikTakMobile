import { useCallback, useEffect, useMemo, useRef, useState, type ComponentRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '@/shared/components/Header';
import ScreenContainer from '@/shared/components/ScreenContainer';
import CategoriesBanner from '@/shared/components/CategoriesBanner';
import CategoryChips from '@/shared/components/CategoryChips';
import ProductCard from '@/shared/components/ProductCard';
import OrderSummaryBar from '@/shared/components/OrderSummaryBar';
import ProductDetailSheet from '@/features/products/components/ProductDetailSheet';
import EmptyState from '@/shared/components/EmptyState';
import { useProductStore } from '@/shared/store/productStore';
import { useFavoriteStore } from '@/shared/store/favoriteStore';
import { useCategoryStore } from '@/shared/store/categoryStore';
import { useBasketStore } from '@/shared/store';
import { COLORS } from '@/shared/constants/theme';
import { TYPOGRAPHY } from '@/shared/constants/typography';
import { gapVertical, pixelWidth } from '@/shared/utils/metrics';
import type { HomeStackParamList, RootStackParamList } from '@/shared/types/navigation';

type ProductsNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ProductsRouteProp = RouteProp<HomeStackParamList, 'Products'>;

function ProductsScreen() {
  const navigation = useNavigation<ProductsNavigationProp>();
  const { params } = useRoute<ProductsRouteProp>();
  const { categoryId } = params;

  const { products, isLoading, error, fetchProductsByCategory } = useProductStore();
  const { isFavorite, toggleFavorite, fetchFavorites } = useFavoriteStore();
  const { categories, fetchCategories } = useCategoryStore();
  const basketItems = useBasketStore(state => state.items);
  const getBasket = useBasketStore(state => state.getBasket);
  const addToBasket = useBasketStore(state => state.addToBasket);
  const incrementBasket = useBasketStore(state => state.increment);
  const decrementBasket = useBasketStore(state => state.decrement);

  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const detailSheetRef = useRef<ComponentRef<typeof ProductDetailSheet>>(null);

  useEffect(() => {
    setSelectedCategoryId(categoryId);
  }, [categoryId]);

  useEffect(() => {
    fetchProductsByCategory(selectedCategoryId);
  }, [selectedCategoryId, fetchProductsByCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  useEffect(() => {
    getBasket();
  }, [getBasket]);

  const categoryChips = useMemo(
    () => categories.map(category => ({ id: String(category.id), label: category.name })),
    [categories],
  );

  const handleSelectCategory = useCallback((id: string) => {
    setSelectedCategoryId(Number(id));
  }, []);

  const getQuantity = useCallback(
    (id: number) => basketItems.find(item => item.id === id)?.quantity ?? 0,
    [basketItems],
  );

  const selectedProduct = useMemo(
    () => products.find(item => item.id === selectedProductId) ?? null,
    [products, selectedProductId],
  );

  const handleAdd = useCallback(
    (id: number) => {
      addToBasket(id);
    },
    [addToBasket],
  );

  const handleIncrement = useCallback(
    (id: number) => {
      incrementBasket(id);
    },
    [incrementBasket],
  );

  const handleDecrement = useCallback(
    (id: number) => {
      decrementBasket(id);
    },
    [decrementBasket],
  );

  const handleCardPress = useCallback((id: number) => {
    setSelectedProductId(id);
    detailSheetRef.current?.present();
  }, []);

  const handleCategoriesPress = useCallback(() => {
    navigation.navigate('Main', { screen: 'Home', params: { screen: 'HomeMain' } });
  }, [navigation]);

  const handleBasketPress = useCallback(() => {
    navigation.navigate('Basket', { screen: 'BasketHome' });
  }, [navigation]);

  const itemCount = basketItems.length;
  const totalPrice = useMemo(
    () => basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [basketItems],
  );

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <Header />
      </SafeAreaView>
      <ScreenContainer edges={['bottom', 'left', 'right']}>
        <FlatList
          data={products}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <CategoriesBanner onPress={handleCategoriesPress} />
              <View style={styles.filterTags}>
                <CategoryChips
                  categories={categoryChips}
                  selectedId={String(selectedCategoryId)}
                  onSelect={handleSelectCategory}
                />
              </View>
            </View>
          }
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator
                style={styles.statusIndicator}
                size="large"
                color={COLORS.primary}
              />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <EmptyState title="Hazırda məhsul yoxdur" subtitle="Məhsullar burada görünəcək" />
            )
          }
          renderItem={({ item }) => {
            const quantity = getQuantity(item.id);
            return (
              <ProductCard
                image={{ uri: item.img_url }}
                title={item.title}
                price={`${item.price} AZN`}
                inBasket={quantity > 0}
                quantityLabel={`${quantity} kq = ${(Number(item.price) * quantity).toFixed(2)} AZN`}
                onAdd={() => handleAdd(item.id)}
                onIncrement={() => handleIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
                onPress={() => handleCardPress(item.id)}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            );
          }}
        />
        <View style={styles.summaryBarWrapper}>
          <OrderSummaryBar itemCount={itemCount} totalPrice={totalPrice} onPress={handleBasketPress} />
        </View>
      </ScreenContainer>
      {selectedProduct && (
        <ProductDetailSheet
          ref={detailSheetRef}
          image={{ uri: selectedProduct.img_url }}
          title={`${selectedProduct.title} 1 kq`}
          description={selectedProduct.description}
          price={Number(selectedProduct.price)}
          inBasket={getQuantity(selectedProduct.id) > 0}
          quantityKg={getQuantity(selectedProduct.id)}
          onAdd={() => handleAdd(selectedProduct.id)}
          onIncrement={() => handleIncrement(selectedProduct.id)}
          onDecrement={() => handleDecrement(selectedProduct.id)}
          isFavorite={isFavorite(selectedProduct.id)}
          onToggleFavorite={() => toggleFavorite(selectedProduct.id)}
        />
      )}
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
  listHeader: {
    marginTop: gapVertical(16),
    marginBottom: gapVertical(16),
  },
  filterTags: {
    marginTop: gapVertical(16),
  },
  listContent: {
    paddingBottom: gapVertical(80),
  },
  row: {
    justifyContent: 'center',
    gap: pixelWidth(10),
    marginBottom: gapVertical(15),
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
  summaryBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: gapVertical(16),
    alignItems: 'center',
  },
});

export default ProductsScreen;
