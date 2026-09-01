import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { sizes, spacing, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import type { Persona } from '../types/persona';
import { PlayIcon } from './PlayIcon';
import { StopIcon } from './StopIcon';
import { VoiceIcon } from './VoiceIcon';

type PersonaVoiceProps = {
  persona: Persona;
};

export function PersonaVoice({ persona }: PersonaVoiceProps) {
  const { colors } = useTheme();
  const player = useAudioPlayer(persona.voiceSample ?? null);
  const status = useAudioPlayerStatus(player);

/*   if (!persona.voiceSample) {
    return (
      <View style={styles.row}>
        <View
          style={[
            styles.circle,
            { backgroundColor: colors.surfaceVoice, borderColor: colors.borderCard },
          ]}
        >
          <VoiceIcon size={sizes.voiceIcon} color={colors.textHeading} />
        </View>
        <Text style={[styles.label, { color: colors.textBody }]}>Voice sample coming soon</Text>
      </View>
    );
  } */

  const isPlaying = status.playing;

  const handlePress = () => {
    if (isPlaying) {
      player.pause();
      player.seekTo(0);
    } else {
      player.play();
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isPlaying ? 'Stop voice sample' : 'Play voice sample'}
      onPress={handlePress}
      style={styles.row}
    >
      <View
        style={[
          styles.circle,
          {
            backgroundColor: colors.surfaceVoice,
            borderColor: isPlaying ? colors.borderVoiceHover : colors.borderCard,
          },
        ]}
      >
        {isPlaying ? (
          <StopIcon color={colors.textAccent} />
        ) : (
          <PlayIcon color={colors.textAccent} />
        )}
      </View>
      <Text style={[styles.label, { color: colors.textAccent }]}>
        Listen to their voice sample
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  circle: {
    width: sizes.voiceCircle,
    height: sizes.voiceCircle,
    borderRadius: sizes.voiceCircle / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: typography.personaVoiceLabel.fontFamily,
    fontSize: typography.personaVoiceLabel.fontSize,
    lineHeight: typography.personaVoiceLabel.lineHeight,
    letterSpacing: typography.personaVoiceLabel.letterSpacing,
  },
});
