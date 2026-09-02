import Svg, { Path } from 'react-native-svg';

type ResizeHandleIconProps = {
  size?: number;
  color: string;
};

export function ResizeHandleIcon({ size = 18, color }: ResizeHandleIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M16.5 9.75L9.75 16.5" stroke={color} />
      <Path d="M16.5 14.25L14.25 16.5" stroke={color} />
    </Svg>
  );
}
