import React from "react";
import { useTheme } from "@/hooks/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ToggleGroup from "../ToggleGroup/ToggleGroup";
import ToggleButton from "../ToggleGroup/ToggleButton";
import ThemedText from "../ThemedText";

type PostsToolsBarProps = {
    onChange: (val: string | number) => void
}

const PostsToolsBar = ({ onChange }: PostsToolsBarProps) => {
    const { theme } = useTheme();
    const [value, setValue] = React.useState("posts");

    const handleChange = (value: string) => {
        setValue(value);
        onChange(value);
    }

    return (
        <ToggleGroup value={value} onChange={(v) => handleChange(`${v}`)} >
            <ToggleButton value="posts">
                <Ionicons name="menu-outline" color={theme.colors.text} size={20} />
                <ThemedText>POSTS</ThemedText>
            </ToggleButton>
            <ToggleButton value="liked">
                <Ionicons name="heart-outline" color={theme.colors.text} size={20} />
                <ThemedText >LIKED</ThemedText>
            </ToggleButton>
        </ToggleGroup >
    )
}

export default PostsToolsBar;