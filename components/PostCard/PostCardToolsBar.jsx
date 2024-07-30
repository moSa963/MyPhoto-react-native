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
            <Like color={theme.colors.text} size={25} item={post} />
            <ListCounter count={post.images.length} index={index} color={theme.colors.text} />
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <MaterialCommunityIcons name="comment-text-outline" color={theme.colors.text} size={25} />
                <Text style={{ color: theme.colors.text }}>{numberToStr(post.comments_count)}</Text>
            </View>
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