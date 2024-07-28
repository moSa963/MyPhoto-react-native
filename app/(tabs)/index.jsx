import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PostCardList from "@/components/PostCard/PostCardList";
import { useNavigation, useRouter, } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const Home = () => {
    const router = useRouter();

    const handleShowPost = (post) => {
        router.push(`/posts/${post.id}`);
    }

    return (
        <View style={styles.root}>
            <PostCardList onShowPost={handleShowPost} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default Home;
