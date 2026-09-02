import { Button } from './Button';

type PrimaryCtaProps = {
  label: string;
  onPress: () => void;
  fullWidth?: boolean;
};

export function PrimaryCta({ label, onPress, fullWidth = true }: PrimaryCtaProps) {
  return <Button label={label} onPress={onPress} fullWidth={fullWidth} variant="primary" />;
}
