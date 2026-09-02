import Svg, { Rect } from 'react-native-svg';

type StopIconProps = {
  size?: number;
  color: string;
};

export function StopIcon({ size = 13, color }: StopIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 13 13" fill="none">
      <Rect width={13} height={13} rx={2} fill={color} />
    </Svg>
  );
}
