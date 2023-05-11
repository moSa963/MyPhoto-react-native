import React from "react";
import { StyleSheet, View } from "react-native";
import PostCardList from "../component/PostCard/PostCardList";

const Home = ({ navigation }) => {
    const handleShowPost = (post) => {
        navigation.push("ShowPost", { post: post });
    }

    return (
        <View style={styles.root}>
            <PostCardList onShowPost={handleShowPost} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default Home;
