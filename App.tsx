import React from 'react';
import { StyleSheet, View } from 'react-native';
import AuthProvider from './src/context/AuthContext';
import RequestProvider from './src/context/RequestContext';
import ThemeProvider from './src/context/ThemeContext';
import Root from "./src/route/Root";


export default function App() {

    return (
        <View style={{ flex: 1, display:'flex', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
            <ThemeProvider>
                <RequestProvider>
                    <AuthProvider>
                        <Root />
                    </AuthProvider>
                </RequestProvider>
            </ThemeProvider>
        </View>
    );
}