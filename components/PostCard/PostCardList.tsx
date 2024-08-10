import React from 'react';
import PostCard from '@/components/PostCard/PostCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PaginationList from '../PaginationList';
import { NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import Post from '@/models/Post';
import { Href, useRouter } from 'expo-router';

interface PostCardListProps {
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined,
    style?: StyleProp<ViewStyle>,
}


const PostCardList = ({ ListHeaderComponent, style, onScroll }: PostCardListProps) => {
    const router = useRouter();

    const handleShowPost = (post: Post) => {
        router.push(`/posts/${post.id}` as Href);
    }

    return (
        <GestureHandlerRootView style={[{ flex: 1, height: '100%' }, style]} >
            <PaginationList url="api/posts/list"
                ListHeaderComponent={ListHeaderComponent}
                onScroll={onScroll}
                keyExtractor={(e, i) => 'key ' + e.id}
                renderItem={({ item }) => <PostCard post={item} onShowPost={handleShowPost} />}
            />
        </GestureHandlerRootView>
    );
}

export default PostCardList;