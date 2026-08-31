import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { typography } from '../constants/tokens';

type WeightPointCalloutProps = {
  title: string;
  titleColor: string;
  body: string;
  height: number;
};

// The callout bubble is a literal white "sticky note" in Figma regardless of
// the app's dark theme — an intentional contrast against the chart, not a
// token-bound surface.
const BUBBLE_WHITE = '#ffffff';
const BUBBLE_BODY_COLOR = '#6b6b75';

export function WeightPointCallout({ title, titleColor, body, height }: WeightPointCalloutProps) {
  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.bubble}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <View style={styles.tailWrapper}>
        <Svg width={18} height={10} viewBox="0 0 18.2268 10.2526" fill="none">
          <Path
            d="M1.11342 0.5H17.1134L9.11342 9.5L1.11342 0.5Z"
            fill={BUBBLE_WHITE}
            stroke="black"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
  },
  bubble: {
    backgroundColor: BUBBLE_WHITE,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
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
    left: 112,
    bottom: 0,
  },
});
