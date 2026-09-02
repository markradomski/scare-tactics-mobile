import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { sizes } from '../../constants/tokens';

type AvatarProps = {
  source: ImageSourcePropType;
  size?: 'small' | 'large';
};

export function Avatar({ source, size = 'large' }: AvatarProps) {
  const sizeValue = size === 'small' ? sizes.coachAvatar : sizes.avatar;

  return (
    <View style={[styles.wrapper, { width: sizeValue, height: sizeValue, borderRadius: sizeValue / 2 }]}>
      <Image source={source} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
