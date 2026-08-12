import { useCallback, useMemo, useRef, useState, type ComponentRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '@/shared/components/Header';
import ScreenContainer from '@/shared/components/ScreenContainer';
import CategoriesBanner from '@/shared/components/CategoriesBanner';
import CategoryChips from '@/shared/components/CategoryChips';
import ProductCard from '@/shared/components/ProductCard';
import OrderSummaryBar from '@/shared/components/OrderSummaryBar';
import ProductDetailSheet from '@/features/products/components/ProductDetailSheet';
import EmptyState from '@/shared/components/EmptyState';
import { PRODUCTS } from '@/features/products/mock/products';
import { FILTER_TAGS } from '@/features/products/mock/filterTags';
import { COLORS } from '@/shared/constants/theme';
import { gapVertical, pixelWidth } from '@/shared/utils/metrics';
import type { Product } from '@/features/products/types/product';
import type { RootStackParamList } from '@/shared/types/navigation';

type ProductsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PRODUCT_DESCRIPTION =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

function ProductsScreen() {
  const navigation = useNavigation<ProductsNavigationProp>();
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedTagId, setSelectedTagId] = useState('fruits');
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const detailSheetRef = useRef<ComponentRef<typeof ProductDetailSheet>>(null);

  // Derived from live `products` state (not a stale snapshot) so the sheet's
  // add/stepper UI stays in sync when the basket changes.
  const selectedProduct = useMemo(
    () => products.find(item => item.id === selectedProductId) ?? PRODUCTS[0],
    [products, selectedProductId],
  );

  const handleAdd = useCallback((id: string) => {
    setProducts(prev =>
      prev.map(item => (item.id === id ? { ...item, inBasket: true, quantityKg: 1 } : item)),
    );
  }, []);

  const handleIncrement = useCallback((id: string) => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantityKg: item.quantityKg + 1 } : item,
      ),
    );
  }, []);

  const handleDecrement = useCallback((id: string) => {
    setProducts(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const nextQty = item.quantityKg - 1;
        return nextQty <= 0
          ? { ...item, inBasket: false, quantityKg: 0 }
          : { ...item, quantityKg: nextQty };
      }),
    );
  }, []);

  const handleCardPress = useCallback((product: Product) => {
    setSelectedProductId(product.id);
    detailSheetRef.current?.present();
  }, []);

  const handleCategoriesPress = useCallback(() => {
    navigation.navigate('Main', { screen: 'Home', params: { screen: 'HomeMain' } });
  }, [navigation]);

  const handleBasketPress = useCallback(() => {
    navigation.navigate('Basket', { screen: 'BasketHome' });
  }, [navigation]);

  const basketItems = useMemo(() => products.filter(item => item.inBasket), [products]);
  const itemCount = basketItems.length;
  const totalPrice = useMemo(
    () => basketItems.reduce((sum, item) => sum + item.unitPrice * item.quantityKg, 0),
    [basketItems],
  );

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <Header />
      </SafeAreaView>
      <ScreenContainer edges={['bottom', 'left', 'right']}>
        {products.length === 0 ? (
          <EmptyState
            title="Hazırda məhsul yoxdur"
            subtitle="Məhsullar burada görünəcək"
          />
        ) : (
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <CategoriesBanner onPress={handleCategoriesPress} />
                <View style={styles.filterTags}>
                  <CategoryChips
                    categories={FILTER_TAGS}
                    selectedId={selectedTagId}
                    onSelect={setSelectedTagId}
                  />
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <ProductCard
                image={item.image}
                title={item.title}
                price={`${item.unitPrice.toFixed(2)} AZN`}
                inBasket={item.inBasket}
                quantityLabel={`${item.quantityKg} kq = ${(
                  item.unitPrice * item.quantityKg
                ).toFixed(2)} AZN`}
                onAdd={() => handleAdd(item.id)}
                onIncrement={() => handleIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
                onPress={() => handleCardPress(item)}
              />
            )}
          />
        )}
        <View style={styles.summaryBarWrapper}>
          <OrderSummaryBar
            itemCount={itemCount}
            totalPrice={totalPrice}
            onPress={handleBasketPress}
          />
        </View>
      </ScreenContainer>
      <ProductDetailSheet
        ref={detailSheetRef}
        image={selectedProduct.image}
        title={`${selectedProduct.title} 1 kq`}
        description={PRODUCT_DESCRIPTION}
        price={selectedProduct.unitPrice}
        inBasket={selectedProduct.inBasket}
        quantityKg={selectedProduct.quantityKg}
        onAdd={() => handleAdd(selectedProduct.id)}
        onIncrement={() => handleIncrement(selectedProduct.id)}
        onDecrement={() => handleDecrement(selectedProduct.id)}
      />
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
  summaryBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: gapVertical(16),
    alignItems: 'center',
  },
});

export default ProductsScreen;
