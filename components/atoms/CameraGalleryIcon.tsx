import Svg, { Circle, Path, Rect } from 'react-native-svg';

type CameraGalleryIconProps = {
  size?: number;
  color?: string;
};

export function CameraGalleryIcon({ size = 24, color = '#ffffff' }: CameraGalleryIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={4.5} width={18} height={15} rx={2.5} stroke={color} strokeWidth={1.8} />
      <Circle cx={8.2} cy={9.2} r={1.6} fill={color} />
      <Path d="M5 18L10 12L13 15L15.5 12.5L20 18H5Z" fill={color} />
    </Svg>
  );
}
