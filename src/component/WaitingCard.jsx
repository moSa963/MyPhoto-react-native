import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../context/ThemeContext";



const WaitingCard = () => {
    const [theme] = useTheme();


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
            <ActivityIndicator size="large" color={theme.colors.primary}/>
        </View>
    )
}


export default WaitingCard;