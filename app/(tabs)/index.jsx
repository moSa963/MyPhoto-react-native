import React from "react";
import { StyleSheet, View } from "react-native";
import PostCardList from "@/components/PostCard/PostCardList";


const Home = () => {
    return (
        <View style={styles.root}>
            <PostCardList />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default Home;
