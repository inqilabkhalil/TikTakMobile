import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { gapHorizontal, gapVertical, pixelFont } from '../../utils/metrics';
import type { CategoryChipsProps } from '../../types/categoryChips';

const ACCENT_GREEN = 'rgba(118, 203, 79, 1)';
const TEXT_COLOR = '#2B3043';
const CHIP_BORDER = '#E0E0E0';

function CategoryChips({ categories, selectedId, onSelect }: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      style={styles.scrollView}>
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
  scrollView: {
    marginBottom: 40,
  },
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
    backgroundColor: '#FFFFFF',
    marginRight: gapHorizontal(8),
  },
  chipSelected: {
    backgroundColor: ACCENT_GREEN,
    borderColor: ACCENT_GREEN,
  },
  chipText: {
    fontSize: pixelFont(14),
    color: TEXT_COLOR,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default CategoryChips;