import React from "react";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";
import { useTheme } from "@/hooks/ThemeContext";

export type ButtonProps = ViewProps & {
    onPress: () => void,
    variant?: "border" | "fill" | "none",
}

const Button = ({ children, style, onPress, variant = "border", ...rest }: ButtonProps) => {
    const { theme } = useTheme();

    return (
        <Pressable onPress={onPress} >
            {({ pressed }) => (
                <View {...rest} style={[styles.root, {
                    opacity: pressed ? 0.5 : 1,
                    borderColor: theme.colors.border,
                    borderWidth: variant == "border" ? 1 : 0,
                    backgroundColor: theme.alpha(theme.colors.primary, variant == "fill" ? 0.5 : 0),
                }, style]}>
                    {children}
                </View>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    root: {
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
        padding: 8
    }
});


export default Button;