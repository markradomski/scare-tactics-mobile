import { StyleSheet, Text, View } from 'react-native';

import { radius, typography } from '../../constants/tokens';
import { useTheme } from '../../hooks/useTheme';

export function FailStamp() {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.stamp, { borderColor: colors.actionNah }]}>
        <Text style={[styles.label, { color: colors.actionNah }]}>FAIL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    transform: [{ rotate: '8deg' }],
  },
  stamp: {
    borderWidth: 6,
    borderRadius: radius.cta,
    paddingHorizontal: 40,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: typography.failStamp.fontFamily,
    fontSize: typography.failStamp.fontSize,
    letterSpacing: typography.failStamp.letterSpacing,
  },
});
