import 'react-native-reanimated';

import { DMSans_400Regular, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';
import { Geist_400Regular, Geist_500Medium, Geist_600SemiBold } from '@expo-google-fonts/geist';
import { WorkSans_400Regular } from '@expo-google-fonts/work-sans';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LayoutCta } from '../components/LayoutCta';
import { cameraColors } from '../constants/tokens';
import { ThemeProvider, useTheme } from '../hooks/useTheme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    DMSans_400Regular,
    DMSans_600SemiBold,
    WorkSans_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <ThemeProvider>
          <StatusBar style="auto" />
          <AppShell />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AppShell() {
  const { colors } = useTheme();

  return (
    <View style={[styles.flex, { backgroundColor: colors.surfaceCard }]}>
      <View style={styles.flex}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_left',
            contentStyle: { backgroundColor: colors.surfaceCard },
          }}
        >
          <Stack.Screen
            name="index"
            options={{ contentStyle: { backgroundColor: colors.background } }}
          />
          <Stack.Screen
            name="camera-check-in"
            options={{ contentStyle: { backgroundColor: cameraColors.background } }}
          />
          <Stack.Screen
            name="check-in-success"
            options={{ contentStyle: { backgroundColor: cameraColors.background } }}
          />
        </Stack>
      </View>
      <LayoutCta />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
