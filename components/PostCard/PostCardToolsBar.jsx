import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Like from "../../component/Like";
import ListCounter from "../ImageList/ImageListCounter";
import { numberToStr } from "../../utils/numberToStr";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../context/ThemeContext";


const PostCardToolsBar = ({ post, index, }) => {
    const [theme] = useTheme();

    return (
        <View style={styles.root}>
            <Like color={theme.colors.text} size={25} item={post} />
            <ListCounter count={post.images.length} index={index} color={theme.colors.text} />
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Icon name="comment-text-outline" color={theme.colors.text} size={25} />
                <Text style={{ color: theme.colors.text }}>{numberToStr(post.comment)}</Text>
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