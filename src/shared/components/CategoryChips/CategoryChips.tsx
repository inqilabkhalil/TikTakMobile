import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';
import { TYPOGRAPHY } from '../../constants/typography';
import { gapHorizontal, gapVertical } from '../../utils/metrics';
import type { CategoryChipsProps } from '../../types/categoryChips';

const CHIP_BORDER = '#E0E0E0';

function CategoryChips({ categories, selectedId, onSelect }: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}>
      {categories.map(item => {
        const isSelected = item.id === selectedId;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(item.id)}>
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    alignItems: 'center',
  },
  chip: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: CHIP_BORDER,
    borderRadius: gapHorizontal(15),
    paddingVertical: gapVertical(8),
    paddingHorizontal: gapHorizontal(16),
    backgroundColor: COLORS.white,
    marginRight: gapHorizontal(8),
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    ...TYPOGRAPHY.filterTag,
    color: COLORS.textPrimary,
  },
  chipTextSelected: {
    color: COLORS.white,
  },
});

export default CategoryChips;
