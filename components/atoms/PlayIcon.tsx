import Svg, { Path } from 'react-native-svg';

type PlayIconProps = {
  size?: number;
  color: string;
};

export function PlayIcon({ size = 14, color }: PlayIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 16" fill="none">
      <Path d="M0 0L14 8L0 16V0Z" fill={color} />
    </Svg>
  );
}
