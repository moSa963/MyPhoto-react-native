import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";
import { BASE_URL } from "@/http/HttpRequest";
import { parseTime } from "@/utils/parseTime";
import { useTheme } from "@/hooks/ThemeContext";
import Post from "@/models/Post";
import User from "@/models/User";
import Avatar from "../Avatar";

interface PostCardTitleProps {
    post: Post,
    onShowPost?: (post: Post) => void,
    onShowUser?: (user: User) => void,
    style?: StyleProp<ViewStyle>,
}

const PostCardTitle = ({ post, onShowPost, onShowUser, style }: PostCardTitleProps) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.root, { width: '100%' }, style]}>
            <Avatar
                uri={`${BASE_URL}api/users/${post.user.username}/image`}
                onPress={() => { onShowUser && onShowUser(post.user) }}
            />

            <Pressable style={styles.title} onPress={() => { onShowPost && onShowPost(post) }}>
                <Text style={{ color: theme.colors.text }}>
                    {post.title}
                </Text>
            </Pressable>

            <Text numberOfLines={1}
                style={{ color: theme.colors.text, fontSize: 10, position: 'absolute', bottom: 15, right: 15 }}>
                {"@" + post.user.username + " . " + parseTime(post.created_at)}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        width: "100%",
        padding: 10,
        flexDirection: "row",
    },
    title: {
        padding: 10,
        fontSize: 15,
        flex: 1,
        borderBottomColor: "black",
    },
});

export default PostCardTitle;