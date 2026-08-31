import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { typography } from '../constants/tokens';

type WeightPointCalloutProps = {
  title: string;
  titleColor: string;
  body: string;
  height: number;
  // Starts the fade-in once true — stays hidden until then. Callers gate
  // this on the host screen's own entrance transition finishing, so the
  // callout doesn't start fading in while the screen is still animating in.
  visible: boolean;
};

// The callout bubble is a literal white "sticky note" in Figma regardless of
// the app's dark theme — an intentional contrast against the chart, not a
// token-bound surface.
const BUBBLE_WHITE = '#ffffff';
const BUBBLE_BODY_COLOR = '#6b6b75';
// How long to wait after `visible` turns true before the fade-in starts,
// separate from FADE_IN_DURATION_MS (how long the fade itself takes).
const FADE_IN_DELAY_MS = 1000;
const FADE_IN_DURATION_MS = 300;

export function WeightPointCallout({ title, titleColor, body, height, visible }: WeightPointCalloutProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withDelay(FADE_IN_DELAY_MS, withTiming(1, { duration: FADE_IN_DURATION_MS }));
    }
  }, [visible, opacity]);

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, { height }, fadeInStyle]}>
      <View style={styles.bubble}>
        {/* <Text style={[styles.title, { color: titleColor }]}>{title}</Text> */}
        <Text style={styles.body}>{body}</Text>
      </View>
      <View style={styles.tailWrapper}>
        <Svg width={18} height={10} viewBox="0 0 18.2268 10.2526" fill="none">
          <Path d="M1.11342 0.5H17.1134L9.11342 9.5L1.11342 0.5Z" fill={BUBBLE_WHITE} />
        </Svg>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 242,
  },
  bubble: {
    backgroundColor: BUBBLE_WHITE,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontFamily: typography.calloutTitle.fontFamily,
    fontSize: typography.calloutTitle.fontSize,
  },
  body: {
    fontFamily: typography.calloutBody.fontFamily,
    fontSize: typography.calloutBody.fontSize,
    lineHeight: typography.calloutBody.lineHeight,
    color: BUBBLE_BODY_COLOR,
  },
  tailWrapper: {
    position: 'absolute',
    left: 82,
    bottom: 1,
  },
});
