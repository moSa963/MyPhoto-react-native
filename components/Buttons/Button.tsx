import React from "react";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";
import { useTheme } from "@/hooks/ThemeContext";

export type ButtonProps = ViewProps & {
    onPress: () => void
}

const Button = ({ children, style, onPress, ...rest }: ButtonProps) => {
    const { theme } = useTheme();

    return (
        <Pressable onPress={onPress}>
            {({ pressed }) => (
                <View {...rest} style={[{ ...styles.root, opacity: pressed ? 0.5 : 1, borderColor: theme.colors.border, overflow: "hidden" }, style]}>
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
        alignItems: 'center'
    }
});


export default Button;