import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from '@d11/react-native-fast-image';

import ScreenContainer from '@/shared/components/ScreenContainer';
import Header from '@/shared/components/Header';
import EmptyState from '@/shared/components/EmptyState';
import { useSearchStore } from '@/shared/store/searchStore';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { COLORS } from '@/shared/constants/theme';
import { pixelFont, pixelHorizontal, pixelVertical } from '@/shared/utils/metrics';

const placeholderImage = require('../../shared/assets/images/alma.png');

function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<TextInput | null>(null);

  const { results, isLoading, error, searchProducts, clearSearch } = useSearchStore();

  const debouncedSearchText = useDebouncedValue(searchText.trim(), 400);

  useEffect(() => {
    if (!debouncedSearchText) {
      clearSearch();
      return;
    }

    const controller = new AbortController();
    searchProducts(debouncedSearchText, controller.signal);

    return () => controller.abort();
  }, [debouncedSearchText, searchProducts, clearSearch]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScreenContainer style={styles.screenContainer}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <View style={styles.headerSection}>
          <Header />
        </View>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View style={styles.innerContainer}>
            <View style={styles.searchBox}>
              <TextInput
                ref={inputRef}
                autoFocus={false}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Alma"
                placeholderTextColor="#8E8E93"
                style={styles.searchInput}
              />
            </View>

            <FlatList
              data={results}
              keyExtractor={item => String(item.id)}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={
                isLoading ? (
                  <ActivityIndicator
                    style={styles.statusIndicator}
                    size="large"
                    color={COLORS.primary}
                  />
                ) : error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : searchText.trim() ? (
                  <EmptyState
                    title="Axtarışa uyğun məhsul tapılmadı"
                    subtitle="Başqa açar söz ilə cəhd edin"
                  />
                ) : null
              }
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <FastImage
                    source={item.img_url ? { uri: item.img_url } : placeholderImage}
                    style={styles.productImage}
                    resizeMode={FastImage.resizeMode.cover}
                  />

                  <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productPrice}>{item.price} AZN</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
  },
  headerSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: pixelVertical(12),
    paddingBottom: pixelVertical(12),
  },
  innerContainer: {
    flex: 1,
    paddingTop: pixelVertical(16),
    paddingHorizontal: 0,
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    marginTop: pixelVertical(16),
    marginBottom: pixelVertical(24),
    marginHorizontal: pixelHorizontal(16),
    backgroundColor: '#FFFFFF',
    borderRadius: pixelHorizontal(16),
    paddingHorizontal: pixelHorizontal(16),
    paddingTop: pixelVertical(16),
    paddingBottom: pixelVertical(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    height: pixelVertical(44),
    fontSize: pixelFont(16),
    color: '#1A1A1A',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
    paddingBottom: pixelVertical(8),
  },
  listContent: {
    paddingTop: pixelVertical(8),
    paddingBottom: pixelVertical(100),
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    borderRadius: pixelHorizontal(16),
    padding: pixelHorizontal(14),
    marginHorizontal: pixelHorizontal(16),
    marginBottom: pixelVertical(12),
  },
  productImage: {
    width: pixelHorizontal(56),
    height: pixelVertical(56),
    borderRadius: pixelHorizontal(16),
    marginRight: pixelHorizontal(50),
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: pixelFont(15),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: pixelVertical(6),
  },
  productQuantity: {
    fontSize: pixelFont(13),
    color: '#8E8E93',
    marginBottom: pixelVertical(6),
  },
  productPrice: {
    fontSize: pixelFont(13),
    fontWeight: '600',
    color: '#2B3043',
  },
  statusIndicator: {
    marginTop: pixelVertical(40),
  },
  errorText: {
    fontSize: pixelFont(14),
    color: COLORS.error,
    textAlign: 'center',
    marginTop: pixelVertical(40),
  },
  flex: {
    flex: 1,
  },
});

export default SearchScreen;
