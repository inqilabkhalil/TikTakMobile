import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';
import { gapHorizontal, gapVertical, pixelFont } from '../../utils/metrics';
import type { CategoryChipsProps } from '../../types/categoryChips';

const CHIP_BORDER = '#E0E0E0';

function CategoryChips({ categories, selectedId, onSelect }: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      directionalLockEnabled
      decelerationRate="fast"
      bounces
      nestedScrollEnabled
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
    flexGrow: 0,
    marginBottom: gapVertical(12),
  },
  listContent: {
    alignItems: 'center',
  },
  chip: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: CHIP_BORDER,
    borderRadius: gapHorizontal(10),
    paddingVertical: gapVertical(12),
    paddingHorizontal: gapHorizontal(20),
    backgroundColor: COLORS.white,
    marginRight: gapHorizontal(12),
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontFamily: 'Roboto-Medium',
    fontSize: pixelFont(13),
    color: COLORS.textPrimary,
  },
  chipTextSelected: {
    fontFamily: 'Roboto-Medium',
    color: COLORS.white,
  },
});

export default CategoryChips;