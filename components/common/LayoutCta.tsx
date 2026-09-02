import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '../../constants/tokens';
import { useLayoutCta } from '../../hooks/useLayoutCta';
import { PrimaryCta, SecondaryCta } from '../atoms';
import { DeadlinePickerSheet } from '../time-window/DeadlinePickerSheet';

export function LayoutCta() {
  const insets = useSafeAreaInsets();
  const { cta, pickerVisible, onConfirmDeadline } = useLayoutCta();

  return (
    <>
      {cta.variant !== 'none' && (
        <View
          style={[
            styles.footer,
            {
              backgroundColor: cta.footerColor,
              paddingBottom: insets.bottom + spacing.md,
            },
          ]}
        >
          {cta.variant === 'contract' ? (
            <View style={styles.contractRow}>
              <PrimaryCta label={cta.label} onPress={cta.onPress} fullWidth={false} />
              <SecondaryCta label="Pussy out" onPress={cta.onSecondaryPress} />
            </View>
          ) : (
            <PrimaryCta label={cta.label} onPress={cta.onPress} />
          )}
        </View>
      )}

      <View
        pointerEvents={pickerVisible ? 'auto' : 'none'}
        style={StyleSheet.absoluteFill}
      >
        <DeadlinePickerSheet visible={pickerVisible} onConfirm={onConfirmDeadline} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: spacing.md,
  },
  contractRow: {
    flexDirection: 'row',
    gap: 16,
  },
});
