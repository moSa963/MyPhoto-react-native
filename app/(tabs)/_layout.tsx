import { Redirect, Tabs, useRouter } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/ThemeContext';
import { useAuth } from '@/hooks/AuthContext';


export default function TabLayout() {
    const { theme } = useTheme();
    const router = useRouter()
    const { status } = useAuth();

    if (status == "waiting" || status == "none") {
        return null;
    }

    if (status !== "authenticated") {
        return <Redirect href="auth" />
    }

    return (
        <Tabs
            sceneContainerStyle={{
                backgroundColor: theme.colors.background,
            }}
            screenOptions={{
                tabBarActiveTintColor: theme.colors.text,
                headerShown: false,
                headerStyle: {
                    backgroundColor: theme.colors.card,
                },
                headerTintColor: theme.colors.text,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarStyle: {
                    backgroundColor: theme.colors.card,
                    borderColor: "#00000000"
                },
                headerTitleStyle: {
                    color: theme.colors.text
                },
            }}
        >
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
                            <AntDesign name="pluscircleo" size={25} color={theme.colors.text} />
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
