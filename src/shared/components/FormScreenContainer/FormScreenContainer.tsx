import { LAYOUT } from '@/shared/constants/layout';
import { COLORS } from '@/shared/constants/theme';
import { FormScreenContainerProps } from '@/shared/types/formScreenContainer';
import { useKeyboardAwareScroll } from '@/shared/hooks/useKeyboardAwareScroll';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function FormScreenContainer({ children, style, edges }: FormScreenContainerProps) {
  const { scrollRef, onScroll } = useKeyboardAwareScroll();

  return (
    <SafeAreaView style={styles.container} edges={edges}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollRef}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={styles.flex}
          contentContainerStyle={[styles.scrollContent, style]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: LAYOUT.screenPaddingHorizontal,
        paddingBottom: 20,
    },
})
export default FormScreenContainer;
