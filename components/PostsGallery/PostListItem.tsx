import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BASE_URL } from '@/http/HttpRequest';
import Image from '@/components/ImageList/Image';
import Post from '@/models/Post';
import { useTheme } from '@react-navigation/native';


type PostListProps = {
    post: Post,
    onShowPost: (post: Post) => void,
}

const PostListItem = ({ post, onShowPost }: PostListProps) => {
    const theme = useTheme();

    return (
        <Pressable style={styles.root}
            onPress={() => onShowPost(post)}>
            {
                ({ pressed }) =>
                    <View style={{ width: '100%', height: '100%', opacity: pressed ? 0.8 : 1, backgroundColor: theme.colors.border }}>
                        <Image
                            href={BASE_URL + post.images[0].url}
                            contentFit="contain"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
            }
        </Pressable>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
        aspectRatio: 1,
        margin: 1,
    },
});

export default PostListItem;