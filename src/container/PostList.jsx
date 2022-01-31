import React from 'react';
import { StyleSheet, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { BASE_URL } from '../http/HttpRequest';
import { FlatList } from 'react-native-gesture-handler';
import ToolsBar from '../component/PostsToolsBar';
import Image from '../component/Image';
import { useRequest } from '../context/RequestContext';

const PostItem = ({ post, onShowPost, theme }) => {

    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.item}
            onPress={() => onShowPost && onShowPost(post)}>
            <View style={{ width: '100%', height: '100%', backgroundColor: theme.colors.border }}>
                <Image
                    fadeDuration={0}
                    source={{ uri: BASE_URL + post.images[0].url.substring(1, post.images[0].url.length) }}
                    resizeMode="contain"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
        </TouchableOpacity>
    );
}

const PostList = ({ navigation, onScroll, ListHeaderComponent, onShowPost, user, onReferesh }) => {
    const [processing, setProcessing] = React.useState(false);
    const [theme] = useTheme();
    const [list, setList] = React.useState([])
    const [next, setNext] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [sort, setSort] = React.useState('new');
    const [type, setType] = React.useState('posts');
    const request = useRequest();

    React.useEffect(() => {
        getPosts(request, setList, setNext, user?.username, type, sort);
    }, [user, type, sort]);

    const handleRefresh = () => {
        getPosts(request, setList, setNext, user?.username, type, sort);
        onReferesh && onReferesh();
    }

    const handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y + 10 >= (e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height)) {
            if (!processing)
                getNext(request, next, setList, setNext, setProcessing);
        }
        onScroll && onScroll(e);
    }

    const handelToolChanged = (e) => {
        setType(e[0]);
        setSort(e[1]);
    }

    return (
        <FlatList style={styles.root}
            refreshControl={<RefreshControl progressBackgroundColor={theme.colors.background} colors={[theme.colors.text]} onRefresh={handleRefresh} refreshing={refreshing} />}
            numColumns={4}
            stickyHeaderIndices={[1]}
            scrollEventThrottle={16}
            ListHeaderComponent={ListHeaderComponent}
            onScroll={handleScroll}
            refreshing={refreshing}
            showsVerticalScrollIndicator={false}
            data={['ff', 'ff', 'ff', 'ff', ...list]}
            keyExtractor={(e, i) => 'key ' + e.id}
            renderItem={({ item, index }) => {
                if (index === 0) {
                    return <ToolsBar onChange={handelToolChanged} />;
                } else if (index > 3) {
                    return <PostItem theme={theme} post={item} theme={theme} onShowPost={onShowPost} />
                }
            }}
        />
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
    },
    item: {
        flex: 1,
        height: '100%',
        aspectRatio: 1,
        margin: 1,
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

const getPosts = async (request, setList, setNext, username, type, sortBy) => {
    var quary = "?user=" + username + "&sort=" + sortBy;

    var url = "";

    if (type === "posts") url = "api/post/list";
    else if (type === "history") url = "api/history/list";
    else if (type === "liked") url = "api/like/post/list";

    const res = await request(url + quary);

    if (res.ok) {
        const js = await res.json();
        setNext(js.next);
        setList(js.results);
    }
}

const getNext = async (request, next, setList, setNext, setProcessing) => {
    if (!next) return;

    setProcessing(true);

    const res = await request(next);

    if (res.ok) {
        const js = await res.json();
        setNext(js.next);
        setList(e => ([...e, ...js.results]));
    }

    setProcessing(false);
}

export default PostList;