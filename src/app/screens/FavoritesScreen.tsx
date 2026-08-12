import { useCallback, useMemo, useRef, useState, type ComponentRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '@/shared/components/ScreenContainer';
import BackNavigate from '@/shared/components/BackNavigate';
import ProductCard from '@/shared/components/ProductCard';
import OrderSummaryBar from '@/shared/components/OrderSummaryBar';
import ProductDetailSheet from '@/features/products/components/ProductDetailSheet';
import { FAVORITE_PRODUCTS } from '@/features/account/mock/favorites';
import { COLORS } from '@/shared/constants/theme';
import { gapVertical, pixelWidth } from '@/shared/utils/metrics';
import type { Product } from '@/features/products/types/product';
import type { RootStackParamList } from '@/shared/types/navigation';

type FavoritesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PRODUCT_DESCRIPTION =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

function FavoritesScreen() {
  const navigation = useNavigation<FavoritesNavigationProp>();
  const [products, setProducts] = useState<Product[]>(FAVORITE_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState(FAVORITE_PRODUCTS[0].id);
  const detailSheetRef = useRef<ComponentRef<typeof ProductDetailSheet>>(null);

  const selectedProduct = useMemo(
    () => products.find(item => item.id === selectedProductId) ?? FAVORITE_PRODUCTS[0],
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

  const basketItems = useMemo(() => products.filter(item => item.inBasket), [products]);
  const itemCount = basketItems.length;
  const totalPrice = useMemo(
    () => basketItems.reduce((sum, item) => sum + item.unitPrice * item.quantityKg, 0),
    [basketItems],
  );

  return (
    <View style={styles.root}>
      <BackNavigate title="Siyahılarım" showBack={true} />
      <ScreenContainer edges={['bottom', 'left', 'right']}>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ProductCard
              image={item.image}
              title={item.title}
              price={`${item.unitPrice.toFixed(2)} AZN`}
              inBasket={item.inBasket}
              quantityLabel={`${item.quantityKg} kq = ${(item.unitPrice * item.quantityKg).toFixed(2)} AZN`}
              onAdd={() => handleAdd(item.id)}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
              onPress={() => handleCardPress(item)}
            />
          )}
        />
        <View style={styles.summaryBarWrapper}>
          <OrderSummaryBar
            itemCount={itemCount}
            totalPrice={totalPrice}
            onPress={() => navigation.navigate('Basket', { screen: 'BasketHome' })}
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
  listContent: {
    paddingTop: gapVertical(16),
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

export default FavoritesScreen;
