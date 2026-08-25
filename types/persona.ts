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
  chatOpener: string;
  windowPrompt: string;
  commitmentMessage: string;
  cameraMessages: string[];
  successMessage: string;
  failMessage: string;
};
