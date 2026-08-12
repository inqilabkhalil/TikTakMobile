import { StatusBar, StyleSheet, View, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import ScreenContainer from '@/shared/components/ScreenContainer';
import BackNavigate from '@/shared/components/BackNavigate';
import EmptyBasket from '@/shared/components/Basket/EmptyBasket';
import BasketItem from '@/features/basket/components/BasketItem';
import BasketSummary from '@/features/basket/components/BasketSummary';
import { MOCK_BASKET } from '@/features/basket/mock/mockBasket';
import type { BasketItem as BasketItemType } from '@/features/basket/types/basket';

function BasketScreen() {
  const [items, setItems] = useState<BasketItemType[]>(MOCK_BASKET);

  const handleIncrement = useCallback((id: number) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }, []);

  const handleDecrement = useCallback((id: number) => {
    setItems(prev =>
      prev
        .map(i =>
          i.id === id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i,
        )
        .filter(i => i.quantity > 0),
    );
  }, []);

  const renderItem = ({ item }: { item: BasketItemType }) => (
    <BasketItem
      item={item}
      onIncrement={() => handleIncrement(item.id)}
      onDecrement={() => handleDecrement(item.id)}
    />
  );

  return (
    <ScreenContainer style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <BackNavigate title="Səbətim" />

      {items.length === 0 ? (
        <EmptyBasket />
      ) : (
        <View style={styles.content}>
          <FlatList
            data={items}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <BasketSummary items={items} onCheckout={() => {}} />
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
});

export default BasketScreen;
