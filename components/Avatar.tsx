import React from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import Image from "@/components/ImageList/Image";
import { useTheme } from "@/hooks/ThemeContext";

interface AvatarProps {
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
    uri: string,
    variant?: "circle" | "square",
    size?: "large" | "medium" | "small"
}

const sizes = {
    "large": 75,
    "medium": 50,
    "small": 40,
}

const Avatar = ({ onPress, style, uri, variant, size = "medium" }: AvatarProps) => {
    const { theme } = useTheme();

    const defaultStyle: typeof style = {
        width: sizes[size],
        height: sizes[size],
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderRadius: variant == "circle" ? 9999 : 15,
        overflow: 'hidden'
    }

    return (
        <Pressable onPress={onPress} style={[defaultStyle, style]}>
            <Image href={uri} />
        </Pressable >

    );
}

export default Avatar;