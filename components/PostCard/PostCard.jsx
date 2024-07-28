import React from "react";
import { StyleSheet, View } from "react-native";
import ImageList from "@/components/ImageList/ImageList";
import { useAuth } from "@/hooks/AuthContext";
import { useTheme } from "@/hooks/ThemeContext";
import { BASE_URL } from "@/http/HttpRequest";
import Title from "@/components/PostCard/PostCardTitle";
import PostCardToolsBar from "@/components/PostCard/PostCardToolsBar";
import PostCardDescription from "@/components/PostCard/PostCardDescription";
import { useNavigation, useRouter } from "expo-router";


const PostCard = ({ post, onShowPost }) => {
    const [collabse, setCollabse] = React.useState(1);
    const [index, setIndex] = React.useState(0);
    const [theme] = useTheme();
    const [auth] = useAuth();
    const router = useRouter();


    const handleShowUser = (user) => {

        if (user?.id === auth.user.id) {
            router.push(`profile`)
            return;
        }
        router.push(`users/${user?.username}`)
    }


    return (
        <View style={{ ...styles.root }}>
            <Title onShowPost={onShowPost}
                onShowUser={handleShowUser}
                title={post.title}
                post={post} />

            <ImageList onChange={(i) => setIndex(i)} backgroundColor={theme.colors.background}
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