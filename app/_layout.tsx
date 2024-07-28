import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import AuthProvider, { useAuth, AuthStatus } from '../hooks/AuthContext';
import RequestProvider from '../hooks/RequestContext';
import ErrorCardProvider from '../hooks/ErrorContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import ThemeProvider from '@/hooks/ThemeContext'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <ErrorCardProvider>
        <RequestProvider>
          <AuthProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="posts" />
              <Stack.Screen name="users" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </AuthProvider>
        </RequestProvider>
      </ErrorCardProvider>
    </ThemeProvider>
  );
}
