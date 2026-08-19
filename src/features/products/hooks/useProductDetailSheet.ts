import { useCallback, useMemo, useRef, useState, type ComponentRef } from 'react';
import type ProductDetailSheet from '@/features/products/components/ProductDetailSheet';
import type { Product } from '@/shared/types/product';

export function useProductDetailSheet(products: Product[]) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const detailSheetRef = useRef<ComponentRef<typeof ProductDetailSheet>>(null);

  const selectedProduct = useMemo(
    () => products.find(item => item.id === selectedProductId) ?? null,
    [products, selectedProductId],
  );

  const handleCardPress = useCallback((id: number) => {
    setSelectedProductId(id);
    detailSheetRef.current?.present();
  }, []);

  return { selectedProduct, detailSheetRef, handleCardPress };
}
