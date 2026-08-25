import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ScreenContainer from '@/shared/components/ScreenContainer';
import BackNavigate from '@/shared/components/BackNavigate';
import EmptyBasket from '@/shared/components/Basket/EmptyBasket';
import BasketItem from '@/features/basket/components/BasketItem';
import BasketSummary from '@/features/basket/components/BasketSummary';
import type { BasketItem as BasketItemType } from '@/features/basket/types/basket';
import { useBasketStore } from '@/shared/store';
import { pixelHorizontal, pixelVertical } from '@/shared/utils/metrics';
import EmptyState from '@/shared/components/EmptyState';

function BasketScreen() {
  const isFocused = useIsFocused();
  const items = useBasketStore(state => state.items);
  const isLoading = useBasketStore(state => state.isLoading);
  const error = useBasketStore(state => state.error);
  const getBasket = useBasketStore(state => state.getBasket);
  const increment = useBasketStore(state => state.increment);
  const decrement = useBasketStore(state => state.decrement);

  useEffect(() => {
    if (isFocused) {
      getBasket();
    }
  }, [getBasket, isFocused]);

  const renderItem = ({ item }: { item: BasketItemType }) => (
    <BasketItem
      item={item}
      onIncrement={() => increment(item.id)}
      onDecrement={() => decrement(item.id)}
    />
  );

  return (
    <ScreenContainer style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <BackNavigate title="Səbətim" />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {isLoading && items.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#76CB4F" />
        </View>
      ) : items.length === 0 ? (
        <EmptyState title='Səbətinizdə məhsul yoxdur'/>
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
    paddingTop: pixelVertical(8),
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    marginHorizontal: pixelHorizontal(16),
    marginTop: pixelVertical(12),
    marginBottom: pixelVertical(8),
    color: '#FF3B30',
    textAlign: 'center',
  },
});

export default BasketScreen;
