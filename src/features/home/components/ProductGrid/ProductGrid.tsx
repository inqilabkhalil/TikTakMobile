import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductCard from '../ProductCard';
import { gapHorizontal, gapVertical } from '../../../../shared/utils/metrics';
import type { GridProduct, ProductGridProps } from '../../types/productGrid';

function ProductGrid({
  products,
  unitPrice,
  onAdd,
  onIncrement,
  onDecrement,
  ListHeaderComponent,
}: ProductGridProps) {
  const keyExtractor = useCallback((item: GridProduct) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: GridProduct }) => (
      <ProductCard
        image={item.image}
        title={item.title}
        price={item.price}
        inBasket={item.inBasket}
        quantityLabel={`${item.quantityKg} kq = ${(
          item.quantityKg * unitPrice
        ).toFixed(2)} AZN`}
        onAdd={() => onAdd(item.id)}
        onIncrement={() => onIncrement(item.id)}
        onDecrement={() => onDecrement(item.id)}
      />
    ),
    [unitPrice, onAdd, onIncrement, onDecrement],
  );

  return (
    <FlatList
      data={products}
      keyExtractor={keyExtractor}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        ListHeaderComponent ? (
          <View style={styles.listHeaderWrapper}>{ListHeaderComponent}</View>
        ) : undefined
      }
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingTop: gapVertical(16),
    paddingBottom: 100,
  },
  listHeaderWrapper: {
    marginBottom: gapVertical(20),
  },
  row: {
    gap: gapHorizontal(12),
    marginBottom: gapVertical(12),
  },
});

export default ProductGrid;
