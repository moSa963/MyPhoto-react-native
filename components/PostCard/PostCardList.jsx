import React from 'react';
import { StyleSheet, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import PostCard from '@/components/PostCard/PostCard';
import { useTheme } from '@/hooks/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRequest } from '@/hooks/RequestContext';


const PostCardList = ({ onScroll, ListHeaderComponent, onShowPost, onReferesh }) => {
    const [processing, setProcessing] = React.useState(false);
    const [list, setList] = React.useState([])
    const [next, setNext] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [theme] = useTheme();
    const request = useRequest();

    React.useEffect(() => {
        getPosts(request, setList, setNext, setRefreshing);
    }, [request]);

    const handleRefresh = () => {
        getPosts(request, setList, setNext, setRefreshing);
        onReferesh && onReferesh();
    }

    const handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y + 10 >= (e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height)) {
            if (!processing)
                getNext(request, next, setList, setNext, setProcessing);
        }
        onScroll && onScroll(e);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1, height: '100%' }}>
            <FlatList style={styles.root}
                ListHeaderComponent={ListHeaderComponent}
                refreshControl={<RefreshControl progressBackgroundColor={theme.colors.background} colors={[theme.colors.text]} onRefresh={handleRefresh} refreshing={refreshing} />}
                onScroll={(e) => handleScroll(e)}
                refreshing={refreshing}
                ListFooterComponent={next !== null && <ActivityIndicator color={theme.colors.text} size="large" />}
                showsVerticalScrollIndicator={false}
                data={list}
                keyExtractor={(e, i) => 'key ' + e.id}
                renderItem={({ item }) => <PostCard post={item} onShowPost={onShowPost} />}
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: '100%',
    },
});

const getPosts = async (request, setList, setNext, setRefreshing) => {
    setRefreshing(true);

    const res = await request("api/posts/list");

    if (res.ok) {
        const js = await res.json();
        setNext(js.next);
        setList(js.results);
    }

    setRefreshing(false);
}

const getNext = async (request, next, setList, setNext, setProcessing) => {
    if (!next) return;

    setProcessing(true);

    const res = await request(next);

    if (res && res.ok) {
        const js = await res.json();
        setNext(js.next);
        setList(e => ([...e, ...js.results]));
    }

    setProcessing(false);
}

export default PostCardList;