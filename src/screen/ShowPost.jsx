import React, { Fragment } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Switch, ActivityIndicator, RefreshControl } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PostCard from "../component/PostCard";
import { useTheme } from '../context/ThemeContext';
import Icon from "react-native-vector-icons/AntDesign";
import BottomCard from '../container/BottomCard';
import Button from '../component/Button';
import { useAuth } from '../context/AuthContext';
import WaitingCard from '../component/WaitingCard';
import CommentInput from '../component/CommentInput';
import Comment from '../component/Comment';
import { useRequest } from '../context/RequestContext';


const Tools = ({ post, auth, onDelete, onPrivateChange, theme }) => {
    const [isPrivate, setIsPrivate] = React.useState(post.is_private);

    if (auth.user.username === post.user.username) return (
        <Fragment>
            <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: theme.colors.text, marginRight: 15 }}>Private</Text>
                <Switch value={isPrivate} onChange={() => onPrivateChange(!isPrivate, setIsPrivate)} />
            </View>
            <Button onPress={onDelete} >
                <Text style={{ color: theme.colors.notification }}>DELETE</Text>
            </Button>
        </Fragment>
    );

    return <Fragment></Fragment>
}


const ShowPost = ({ navigation, route }) => {
    const [theme, setTheme] = useTheme();
    const [post, setPost] = React.useState();
    const [comments, setComments] = React.useState([]);
    const [nextComments, setNextComments] = React.useState(null);
    const [settingsCard, setSettingsCard] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const request = useRequest();
    const [auth] = useAuth();

    React.useEffect(() => {
        getPost(request, route.params.post.id, setPost);
    }, []);

    React.useEffect(() => {
        if (!post) return;
        loadComments(request, post.id, setComments, setNextComments);
    }, [post]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.post.title,
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }}
                    onPress={() => setSettingsCard(s => !s)}
                >
                    <Icon name="setting" size={25} color={theme.colors.text} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, theme, route.params]);

    const handleUpdate = async (isPrivate, setIsPrivate) => {
        await update(request, post.id, isPrivate, setIsPrivate);
    }

    const handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y + 10 >= (e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height)) {
            if (!processing) {
                loadNextComments(request, nextComments, setComments, setNextComments, setProcessing);
            }
        }
    }

    const handleRefresh = () => {
        if (!post) return;
        loadComments(request, post.id, setComments, setNextComments);
    }

    const showUser = (user) => {
        if (!navigation) return;

        if (user?.username === auth.user?.username) {
            navigation.navigate('Profile', { screen: 'Profile', });
            return;
        }

        navigation.navigate('ShowUser', { username: user?.username });
    }

    const handleDelete = (c) => {
        deleteComment(request, c.id, setComments);
    }

    if (!post) return <WaitingCard />

    return (
        <View style={styles.root}>
            <BottomCard onClose={() => setSettingsCard(false)} theme={theme} open={settingsCard} >
                <Tools auth={auth} onPrivateChange={handleUpdate} onDelete={() => deletePost(post.id, navigation)} post={post} theme={theme} />
            </BottomCard>

            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl progressBackgroundColor={theme.colors.background} colors={[theme.colors.text]} onRefresh={handleRefresh} refreshing={refreshing} />}
                onScroll={handleScroll}>

                <GestureHandlerRootView >
                    <PostCard post={route.params.post} />
                </GestureHandlerRootView>

                <CommentInput post={post} flex={1} />

                {
                    comments.map((e, i) => <Comment key={i} comment={e} onPress={showUser} onDelete={handleDelete} />)
                }

                {nextComments && <ActivityIndicator color={theme.colors.text} size="large" />}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});


const getPost = async (request, id, setPost) => {
    const res = await request("api/post/" + id);

    if (res.ok) {
        const js = await res.json();
        setPost(js);
    }
}

const deletePost = async (request, id, nav) => {
    const res = await request("api/post/" + id, "DELETE");

    if (res.ok) {
        nav.goBack();
    }
}

const update = async (request, id, isPrivate, setIsPrivate) => {
    const form = new FormData();
    form.append("is_private", isPrivate);

    const res = await request("api/post/" + id, "PUT", form);

    if (res.ok) setIsPrivate(isPrivate);
}

const loadComments = async (request, id, setComments, setNext) => {

    const res = await request("api/comment/post/" + id);

    if (res.ok) {
        const js = await res.json();
        setNext(js.next);
        setComments(js.results);
    }

}

const loadNextComments = async (request, next, setComments, setNext, setProcessing) => {
    if (!next) return;

    setProcessing(true);

    const res = await request(next);

    if (res.ok) {
        const js = await res.json();
        setNext(js.next);
        setComments(s => [...s, ...js.results]);
    }

    setProcessing(false);
}


const deleteComment = async (request, id, setComments) => {
    const res = await request("api/comment/" + id, "DELETE");

    if (res.ok) {
        setComments(list => {
            var newList = list.filter(e => e.id != id);
            return newList;
        });
    }
}

export default ShowPost;