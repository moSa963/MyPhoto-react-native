import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import ImageList from "@/components/ImageList/ImageList";
import { useAuth } from "@/hooks/AuthContext";
import { useTheme } from "@/hooks/ThemeContext";
import { BASE_URL } from "@/http/HttpRequest";
import PostCardTitle from "@/components/PostCard/PostCardTitle";
import PostCardToolsBar from "@/components/PostCard/PostCardToolsBar";
import PostCardDescription from "@/components/PostCard/PostCardDescription";
import { Href, useRouter } from "expo-router";
import Post from "@/models/Post";
import User from "@/models/User";

interface PostCardProps {
    post: Post,
    onShowPost?: (post: Post) => void,
    style?: StyleProp<ViewStyle>,
}

const PostCard = ({ post, onShowPost, style }: PostCardProps) => {
    const [index, setIndex] = React.useState(0);
    const { theme } = useTheme();
    const auth = useAuth();
    const router = useRouter();


    const handleShowUser = (user: User) => {

        if (user.username === auth.user?.username) {
            return router.push(`/profile`)
        }

        router.push(`/users/${user.username}` as Href)
    }


    return (
        <View style={[styles.root, style]}>
            <PostCardTitle onShowPost={onShowPost}
                onShowUser={handleShowUser}
                post={post} />

            <ImageList onChange={(i: number) => setIndex(i)} backgroundColor={theme.colors.background}
                list={post.images.map(e => BASE_URL + e.url)}
            />

            <PostCardToolsBar post={post} index={index} />

            <PostCardDescription post={post} />
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        width: "100%",
        marginBottom: 15,
    },
});

export default PostCard;