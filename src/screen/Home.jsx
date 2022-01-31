import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import PostList from "../container/PostCardList";
import { Themes, useTheme } from "../context/ThemeContext";

const Home = ({ navigation }) => {
    const [theme, setTheme] = useTheme();

    const showUser = (user) => {
        if (!navigation) return;

        if (user?.username === auth.user?.username) {
            navigation.navigate('Profile', { screen: 'Profile', });
            return;
        }

        navigation.navigate('ShowUser', { username: user?.username });
    }

    const handleShowPost = (post) => {
        navigation.push("ShowPost", { post: post });
    }

    return (
        <View style={styles.root}>
            <PostList onShowUser={showUser} onShowPost={handleShowPost} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});

export default Home;
