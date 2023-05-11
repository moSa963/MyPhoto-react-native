import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ImageList from "../ImageList/ImageList";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { BASE_URL } from "../../http/HttpRequest";
import Title from "./PostCardTitle";
import PostCardToolsBar from "./PostCardToolsBar";
import PostCardDescription from "./PostCardDescription";


const PostCard = ({ post, nav, onShowPost }) => {
    const [collabse, setCollabse] = React.useState(1);
    const [index, setIndex] = React.useState(0);
    const [theme] = useTheme();
    const [auth] = useAuth();

    const handleShowUser = (user) => {
        if (!nav) return;

        if (user?.id === auth.user.id) {
            nav.navigate('Profile', { screen: 'Profile', });
            return;
        }

        nav.navigate('ShowUser', { username: user?.username });
    }

    return (
        <View style={{ ...styles.root }}>
            <Title onShowPost={onShowPost}
                onShowUser={handleShowUser}
                title={post.title}
                post={post} />

            <ImageList onChange={(i) => setIndex(i)} backgroundColor={theme.colors.background}
                list={post.images.map(e => BASE_URL + e.url.substring(1, e.url.length))}
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