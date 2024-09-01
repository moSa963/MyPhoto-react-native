import React from "react";
import { ActivityIndicator, View, ViewProps } from "react-native";
import { useTheme } from "@/hooks/ThemeContext";


const WaitingCard = ({ style, ...rest }: ViewProps) => {
    const { theme } = useTheme();

    return (
        <View {...rest} style={[style, { flex: 1, width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }]}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
    )
}


export default WaitingCard;