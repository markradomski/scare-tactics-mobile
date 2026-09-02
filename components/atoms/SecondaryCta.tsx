import { Button } from './Button';

type SecondaryCtaProps = {
  label: string;
  onPress: () => void;
  fullWidth?: boolean;
};

export function SecondaryCta({ label, onPress, fullWidth = false }: SecondaryCtaProps) {
  return <Button label={label} onPress={onPress} fullWidth={fullWidth} variant="secondary" />;
}
