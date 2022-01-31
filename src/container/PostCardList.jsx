import React from 'react';
import { StyleSheet, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import PostCard from '../component/PostCard';
import { useTheme } from '../context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRequest } from '../context/RequestContext';


const PostCardList = ({ navigation, onScroll, ListHeaderComponent, onShowPost, onShowUser, onReferesh }) => {
    const [processing, setProcessing] = React.useState(false);
    const [theme, setTheme] = useTheme();
    const [list, setList] = React.useState([])
    const [next, setNext] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const request = useRequest();

    React.useEffect(() => {
        getPosts(request, setList, setNext, setRefreshing);
    }, [navigation, request]);

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
                renderItem={({ item }) => <PostCard nav={navigation} post={item} onShowPost={onShowPost} onShowUser={onShowUser} />}
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

    const res = await request("api/post/list");

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