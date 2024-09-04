import React from "react";
import { View } from "react-native";
import { useTheme } from "@/hooks/ThemeContext";
import ThemedText from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";

const PrivateIndicator = () => {
    const { theme } = useTheme();

    return (

        <View style={{
            width: "100%",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <AntDesign name="infocirlceo" size={65} style={{ color: theme.colors.caption }} />
            <View style={{ paddingLeft: 10 }}>
                <ThemedText type="subtitle">Private</ThemedText>
                <ThemedText type="defaultSemiBold">This account is private.</ThemedText>
            </View>
        </View>
    );
}

export default PrivateIndicator;