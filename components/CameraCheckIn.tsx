import { useEffect, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { cameraColors, typography } from '../constants/tokens';
import type { Persona } from '../types/persona';
import { CameraFlipIcon } from './CameraFlipIcon';
import { CameraGalleryIcon } from './CameraGalleryIcon';
import { CameraTextMessages } from './CameraTextMessages';

type CameraCheckInProps = {
  persona: Persona;
  onCapture: () => void;
};

export function CameraCheckIn({ persona, onCapture }: CameraCheckInProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission || (!permission.granted && permission.canAskAgain)) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.permissionDenied]}>
        <Text style={styles.permissionText}>
          Camera access is off. Enable it in Settings to check in.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.preview} facing={facing} />

      <View pointerEvents="none" style={styles.guide} />

      <View pointerEvents="none" style={styles.focusRing}>
        <Svg width={72} height={72} viewBox="0 0 72 72">
          <Circle cx={36} cy={36} r={35} stroke={cameraColors.white} strokeWidth={2} opacity={0.8} />
        </Svg>
      </View>

      <View pointerEvents="none" style={styles.textMessages}>
        <CameraTextMessages messages={persona.cameraMessages} />
      </View>

      <View style={styles.controls}>
        <Text style={styles.photoLabel}>PHOTO</Text>

        <Pressable
          style={styles.galleryButton}
          accessibilityRole="button"
          accessibilityLabel="Open gallery"
        >
          <CameraGalleryIcon color={cameraColors.white} />
        </Pressable>

        <Pressable
          onPress={() => setFacing((current) => (current === 'back' ? 'front' : 'back'))}
          style={styles.flipButton}
          accessibilityRole="button"
          accessibilityLabel="Flip camera"
        >
          <CameraFlipIcon color={cameraColors.white} />
        </Pressable>

        <Pressable
          onPress={onCapture}
          style={styles.shutterWrapper}
          accessibilityRole="button"
          accessibilityLabel="Take photo"
        >
          <Svg width={76} height={76} viewBox="0 0 76 76" style={styles.shutterRingSvg}>
            <Circle cx={38} cy={38} r={36.5} stroke={cameraColors.white} strokeWidth={3} />
          </Svg>
          <View style={styles.shutterButton} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: cameraColors.background,
  },
  permissionDenied: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  permissionText: {
    color: cameraColors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 402,
    height: 706,
  },
  guide: {
    position: 'absolute',
    left: 24,
    top: 48,
    width: 354,
    height: 610,
    borderWidth: 1,
    borderColor: cameraColors.white,
    borderRadius: 12,
  },
  focusRing: {
    position: 'absolute',
    left: 165,
    top: 317,
    width: 72,
    height: 72,
  },
  textMessages: {
    position: 'absolute',
    left: 40,
    top: 363,
    width: 322,
  },
  controls: {
    position: 'absolute',
    left: 0,
    top: 706,
    width: 402,
    height: 168,
    backgroundColor: cameraColors.controlsBackground,
  },
  photoLabel: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 16,
    textAlign: 'center',
    color: cameraColors.white,
    fontFamily: typography.photoLabel.fontFamily,
    fontSize: typography.photoLabel.fontSize,
    letterSpacing: typography.photoLabel.letterSpacing,
  },
  galleryButton: {
    position: 'absolute',
    left: 52,
    top: 76,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cameraColors.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipButton: {
    position: 'absolute',
    left: 302,
    top: 76,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: cameraColors.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterWrapper: {
    position: 'absolute',
    left: 163,
    top: 62,
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterRingSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shutterButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: cameraColors.white,
  },
});
