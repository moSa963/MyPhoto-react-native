import React from "react";
import { StyleProp, ViewStyle, Pressable } from "react-native";
import Image from "@/components/ImageList/Image";
import { useTheme } from "@/hooks/ThemeContext";

interface AvatarProps {
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
    uri: string
}

const Avatar = ({ onPress, style, uri }: AvatarProps) => {
    const { theme } = useTheme();

    return (
        <Pressable onPress={onPress} style={[{ width: 50, height: 50, borderWidth: 2, borderColor: theme.colors.border, borderRadius: 25, overflow: 'hidden' }, style]}>
            <Image source={{ uri: uri }} />
        </Pressable>

    );
}

export default Avatar;