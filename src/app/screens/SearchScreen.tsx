import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
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

import ScreenContainer from '@/shared/components/ScreenContainer';
import Header from '@/shared/components/Header';
import EmptyState from '@/shared/components/EmptyState';
import { useSearchStore } from '@/shared/store/searchStore';
import { COLORS } from '@/shared/constants/theme';

const placeholderImage = require('../../shared/assets/images/alma.png');

function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<TextInput | null>(null);

  const { results, isLoading, error, searchProducts, clearSearch } = useSearchStore();

  useEffect(() => {
    const trimmed = searchText.trim();

    if (!trimmed) {
      clearSearch();
      return;
    }

    const timeoutId = setTimeout(() => {
      searchProducts(trimmed);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [searchText, searchProducts, clearSearch]);

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
                  <Image
                    source={item.img_url ? { uri: item.img_url } : placeholderImage}
                    style={styles.productImage}
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
    paddingTop: 12,
    paddingBottom: 12,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 0,
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    marginTop: 16,
    marginBottom: 24,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    height: 44,
    fontSize: 16,
    color: '#1A1A1A',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
    paddingBottom: 8,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 100,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginRight: 50,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  productQuantity: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2B3043',
  },
  statusIndicator: {
    marginTop: 40,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 40,
  },
  flex: {
    flex: 1,
  },
});

export default SearchScreen;
