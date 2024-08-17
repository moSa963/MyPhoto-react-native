import React from "react";
import { ActivityIndicator, ViewProps } from "react-native";
import { useTheme } from "@/hooks/ThemeContext";
import ActionsButton, { ActionsButtonItem } from "./ActionsButton";
import { ButtonProps } from "./Button";

export type LoadingButtonProps = ButtonProps & {
    onPress?: () => void
    processing?: boolean
}

const LoadingButton = ({ onPress, processing, children, style, ...rest }: LoadingButtonProps) => {
    const { theme } = useTheme();

    const handlePress = () => {
        if (processing) return;

        onPress && onPress();
    }

    return (
        <ActionsButton {...rest} style={[{ borderRadius: 10, height: 40 }, style]}
            onPress={handlePress}
            index={processing ? 0 : 1}>
            <ActionsButtonItem >
                <ActivityIndicator color={theme.colors.primary} size="small" />
            </ActionsButtonItem>
            <ActionsButtonItem >
                {children}
            </ActionsButtonItem>
        </ActionsButton>
    );
}


export default LoadingButton;