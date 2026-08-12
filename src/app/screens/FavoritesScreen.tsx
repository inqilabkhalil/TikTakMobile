import { useCallback, useEffect, useMemo, useRef, useState, type ComponentRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '@/shared/components/ScreenContainer';
import BackNavigate from '@/shared/components/BackNavigate';
import ProductCard from '@/shared/components/ProductCard';
import OrderSummaryBar from '@/shared/components/OrderSummaryBar';
import ProductDetailSheet from '@/features/products/components/ProductDetailSheet';
import EmptyState from '@/shared/components/EmptyState';
import { useFavoriteStore } from '@/shared/store/favoriteStore';
import { COLORS } from '@/shared/constants/theme';
import { TYPOGRAPHY } from '@/shared/constants/typography';
import { gapVertical, pixelWidth } from '@/shared/utils/metrics';
import type { RootStackParamList } from '@/shared/types/navigation';

type FavoritesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

function FavoritesScreen() {
  const navigation = useNavigation<FavoritesNavigationProp>();
  const { favorites, isLoading, error, fetchFavorites, toggleFavorite, isFavorite } =
    useFavoriteStore();

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const detailSheetRef = useRef<ComponentRef<typeof ProductDetailSheet>>(null);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const getQuantity = useCallback((id: number) => quantities[id] ?? 0, [quantities]);

  const selectedProduct = useMemo(
    () => favorites.find(item => item.id === selectedProductId) ?? null,
    [favorites, selectedProductId],
  );

  const handleAdd = useCallback((id: number) => {
    setQuantities(prev => ({ ...prev, [id]: 1 }));
  }, []);

  const handleIncrement = useCallback((id: number) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const handleDecrement = useCallback((id: number) => {
    setQuantities(prev => {
      const nextQty = (prev[id] ?? 0) - 1;
      if (nextQty <= 0) {
        const rest = { ...prev };
        delete rest[id];
        return rest;
      }
      return { ...prev, [id]: nextQty };
    });
  }, []);

  const handleCardPress = useCallback((id: number) => {
    setSelectedProductId(id);
    detailSheetRef.current?.present();
  }, []);

  const itemCount = useMemo(
    () => favorites.filter(item => getQuantity(item.id) > 0).length,
    [favorites, getQuantity],
  );
  const totalPrice = useMemo(
    () =>
      favorites.reduce((sum, item) => sum + Number(item.price) * getQuantity(item.id), 0),
    [favorites, getQuantity],
  );

  return (
    <View style={styles.root}>
      <BackNavigate title="Siyahılarım" showBack={true} />
      <ScreenContainer edges={['bottom', 'left', 'right']}>
        {isLoading && (
          <ActivityIndicator style={styles.statusIndicator} size="large" color={COLORS.primary} />
        )}

        {!isLoading && error && <Text style={styles.errorText}>{error}</Text>}

        {!isLoading && !error && favorites.length === 0 && (
          <EmptyState title="Hələ heç bir sevimliniz yoxdur" subtitle="Sevimlilər burada görünəcək" />
        )}

        {!isLoading && !error && favorites.length > 0 && (
          <FlatList
            data={favorites}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
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
        )}
        <View style={styles.summaryBarWrapper}>
          <OrderSummaryBar
            itemCount={itemCount}
            totalPrice={totalPrice}
            onPress={() => navigation.navigate('Basket', { screen: 'BasketHome' })}
          />
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
  listContent: {
    paddingTop: gapVertical(16),
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

export default FavoritesScreen;
