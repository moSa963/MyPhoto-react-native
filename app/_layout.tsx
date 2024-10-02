import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import AuthProvider, { useAuth } from '../hooks/AuthContext';
import RequestProvider from '../hooks/RequestContext';
import ErrorCardProvider from '../hooks/ErrorContext';
import ThemeProvider, { useTheme } from '@/hooks/ThemeContext'
import BottomCardProvider from '@/hooks/BottomCardContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
            <BottomCardProvider>
              <Screens />
            </BottomCardProvider>
          </AuthProvider>
        </RequestProvider>
      </ErrorCardProvider>
    </ThemeProvider>
  );
}


const Screens = () => {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card
        },
        contentStyle: {
          backgroundColor: theme.colors.background
        },
        headerTintColor: theme.colors.text,
        navigationBarColor: theme.colors.card,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false, }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="posts" />
      <Stack.Screen name="users" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}