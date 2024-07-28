import { Redirect, Tabs, useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthStatus, useAuth } from '@/hooks/AuthContext';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [auth] = useAuth();
  const router = useRouter()

  if (auth.status !== AuthStatus.AUTHENTICATED) {
    return <Redirect href="auth" />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}
              onPress={() => router.push("posts/create")}>
              <AntDesign name="pluscircleo" size={25} />
            </TouchableOpacity>
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'man' : 'man-outline'} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
