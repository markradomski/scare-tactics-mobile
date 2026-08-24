import { StyleSheet, TextInput, View } from 'react-native';

import { radius, spacing, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import { ResizeHandleIcon } from './ResizeHandleIcon';

type GoalTextareaProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export function GoalTextarea({ value, onChangeText, placeholder }: GoalTextareaProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surfaceTextarea, borderColor: colors.borderTextarea },
      ]}
    >
      <TextInput
        style={[styles.input, { color: colors.textHeading }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textBody}
        multiline
        textAlignVertical="top"
      />
      <View style={styles.handle}>
        <ResizeHandleIcon color={colors.textBody} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 151,
    borderWidth: 1,
    borderRadius: radius.textarea,
    paddingLeft: spacing.md,
    paddingRight: spacing.xl,
    paddingVertical: spacing.md,
  },
  input: {
    flex: 1,
    fontFamily: typography.goalTextarea.fontFamily,
    fontSize: typography.goalTextarea.fontSize,
    lineHeight: typography.goalTextarea.lineHeight,
    letterSpacing: typography.goalTextarea.letterSpacing,
  },
  handle: {
    position: 'absolute',
    bottom: 11,
    right: 11,
  },
});
