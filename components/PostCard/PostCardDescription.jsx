import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks//ThemeContext";


const PostCardDescription = ({ post }) => {
    const [collabse, setCollabse] = React.useState(1);
    const [theme] = useTheme();

    return (
        <Text numberOfLines={collabse}
            style={{ ...styles.root, color: theme.colors.text }}
            onPress={() => setCollabse(collabse ? null : 1)}>
            {post.description}
        </Text>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingRight: 15,
        paddingLeft: 15,
    },
});

export default PostCardDescription;