import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BASE_URL } from "../../http/HttpRequest";
import { praseTime } from "../../utils/praseTime";
import Image from "../ImageList/Image";
import { useTheme } from "../../context/ThemeContext";


const Title = ({ title, post, onShowPost, onShowUser }) => {
    const [theme] = useTheme();

    return (
        <View style={{ width: '100%' }}>
            <View style={styles.root}>
                <TouchableOpacity activeOpacity={onShowUser ? 0.7 : 1} onPress={() => { onShowUser && onShowUser(post.user) }}>
                    <Image source={{ uri: `${BASE_URL}api/users/${post.user.username}/image`}}
                        style={{ width: 50, height: 50, borderWidth: 2, borderColor: theme.colors.border, borderRadius: 25, }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.title} activeOpacity={onShowPost ? 0.7 : 1} onPress={() => { onShowPost && onShowPost(post) }}>
                    <Text style={{ color: theme.colors.text }}>
                        {title}
                    </Text>
                </TouchableOpacity>

                <Text numberOfLines={1}
                    style={{ color: theme.colors.text, fontSize: 10, position: 'absolute', bottom: 15, right: 15 }}>
                    {"@" + post.user.username + " . " + praseTime(post.date)}
                </Text>
            </View>
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
        borderBottomWidth: 0.5,
    },
});

export default Title;