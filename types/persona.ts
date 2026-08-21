import type { AudioSource } from 'expo-audio';
import type { ImageSourcePropType } from 'react-native';

export type Persona = {
  id: string;
  name: string;
  avatar: ImageSourcePropType;
  voiceSample?: AudioSource;
  styleName: string;
  description: string;
  matchMessage: string;
};
