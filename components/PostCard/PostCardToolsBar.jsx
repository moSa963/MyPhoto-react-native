import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Like from "@/components/Like";
import ListCounter from "@/components/ImageList/ImageListCounter";
import { numberToStr } from "@/utils/numberToStr";
import { useTheme } from "@/hooks/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const PostCardToolsBar = ({ post, index, }) => {
    const { theme } = useTheme();

    return (
        <View style={styles.root}>
            <Like url={`api/posts/${post.id}/likes/`} likesCount={post.likes_count} initValue={post.liked} />
            <ListCounter count={post.images.length} index={index} color={theme.colors.text} />
            <Pressable >
                {({ pressed }) => (
                    <View style={{ display: 'flex', flexDirection: 'row', opacity: pressed ? 0.9 : 1 }}>
                        <MaterialCommunityIcons name="comment-text-outline" color={theme.colors.text} size={25} />
                        <Text style={{ color: theme.colors.text }}>{numberToStr(post.comments_count)}</Text>
                    </View>
                )}
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        paddingRight: 25,
        paddingLeft: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default PostCardToolsBar;