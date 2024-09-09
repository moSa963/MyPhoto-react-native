import React from 'react';
import { StyleSheet, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import ToolsBar from '@/components/PostsGallery/PostsToolsBar';
import { Request, useRequest } from '@/hooks/RequestContext';
import PostListItem from '@/components/PostsGallery/PostListItem';
import ThemedRefreshControl from '../ThemedRefreshControl';
import User from '@/models/User';
import Post from '@/models/Post';

type PostListProps = {
    user: User,
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void,
    onShowPost: (post: Post) => void,
    onRefresh?: () => void,
    ListHeaderComponent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ComponentType<any> | null | undefined
}

const PostList = ({ onScroll, onShowPost, user, onRefresh, ListHeaderComponent }: PostListProps) => {
    const [processing, setProcessing] = React.useState(false);
    const [list, setList] = React.useState([])
    const [next, setNext] = React.useState<string | null | undefined>();
    const [refreshing, setRefreshing] = React.useState(false);
    const [url, setUrl] = React.useState("");
    const request = useRequest();

    React.useEffect(() => {
        setUrl(`api/posts/list/${user?.username}`);
    }, [user]);

    React.useEffect(() => {
        if (!url) return;
        getPosts(request, setList, setNext, url);
    }, [url]);

    const handleRefresh = async () => {
        if (!url) return;
        onRefresh && onRefresh();
        setRefreshing(true);
        await getPosts(request, setList, setNext, url);
        setRefreshing(false);
    }

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (e.nativeEvent.contentOffset.y + 10 >= (e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height)) {
            if (!processing)
                getNext(request, setList, setNext, setProcessing, next);
        }
        onScroll && onScroll(e);
    }

    const handelToolChanged = (e: string | number) => {
        setUrl(
            e == "posts" ?
                `api/posts/list/${user?.username}` :
                `api/posts/list/${user?.username}/liked`
        );
    }

    return (
        <FlatList style={styles.root}
            refreshControl={<ThemedRefreshControl onRefresh={handleRefresh} refreshing={refreshing} />}
            numColumns={3}
            stickyHeaderIndices={[1]}
            scrollEventThrottle={16}
            ListHeaderComponent={ListHeaderComponent}
            onScroll={handleScroll}
            refreshing={refreshing}
            showsVerticalScrollIndicator={false}
            data={['placeholder', 'placeholder', 'placeholder', ...list]}
            keyExtractor={(e: any, i: number) => e.id || `key ${i}`}
            renderItem={({ item, index }) => {
                if (index === 0) {
                    return <ToolsBar onChange={handelToolChanged} />;
                } else if (index > 2 && typeof (item) != "string") {
                    return <PostListItem post={item} onShowPost={onShowPost} />
                }
            }}
        />
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
    },
    selectBox: {
        position: 'absolute',
        width: 25,
        height: 25,
        left: 5,
        top: 5,
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const getPosts = async (request: Request, setList: any, setNext: any, url: string) => {
    const res = await request(url);

    if (res?.ok) {
        const js = await res.json();
        setNext(js.next);
        setList(js.results);
    }
}

const getNext = async (request: Request, setList: any, setNext: any, setProcessing: any, next: string | null | undefined) => {
    if (!next) return;

    setProcessing(true);

    const res = await request(next);

    if (res?.ok) {
        const js = await res.json();
        setNext(js.next);
        setList((e: any) => ([...e, ...js.results]));
    }

    setProcessing(false);
}

export default PostList;