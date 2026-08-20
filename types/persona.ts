import type { ImageSourcePropType } from 'react-native';

export type Persona = {
  id: string;
  name: string;
  avatar: ImageSourcePropType;
  voiceLabel: string;
  styleName: string;
  description: string;
};
