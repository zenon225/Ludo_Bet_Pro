import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    // Hide splash screen after a delay
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
    
    // Configuration plein écran
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('overlay-swipe');
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" backgroundColor="transparent" translucent={true} hidden={true} />
    </>
  );
}
