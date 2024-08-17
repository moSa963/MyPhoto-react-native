import React, { Fragment } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Switch, ActivityIndicator, RefreshControl } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PostCard from "@/components/PostCard/PostCard";
import { useTheme } from '@/hooks/ThemeContext';
import Icon from "react-native-vector-icons/AntDesign";
import BottomCard from '@/components/BottomCard';
import Button from '@/components/Buttons/Button';
import { useAuth } from '@/hooks/AuthContext';
import WaitingCard from '@/components/WaitingCard';
import CommentInput from '@/components/CommentInput';
import Comment from '@/components/Comment';
import { useRequest } from '@/hooks/RequestContext';
import { useGlobalSearchParams, useNavigation, useRouter } from 'expo-router';


const Tools = ({ post, auth, onDelete, onPrivateChange, theme }) => {
    const [isPrivate, setIsPrivate] = React.useState(post.private);

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


const ShowPost = () => {
    const { theme } = useTheme();
    const [post, setPost] = React.useState();
    const [comments, setComments] = React.useState([]);
    const [nextComments, setNextComments] = React.useState(null);
    const [settingsCard, setSettingsCard] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const request = useRequest();
    const param = useGlobalSearchParams();
    const navigation = useNavigation();
    const auth = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        getPost(request, param.id, setPost);
    }, []);

    React.useEffect(() => {
        if (!post) return;
        loadComments(request, post.id, setComments, setNextComments);
    }, [post]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: post?.title,
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }}
                    onPress={() => setSettingsCard(s => !s)}
                >
                    <Icon name="setting" size={25} color={theme.colors.text} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, theme, post]);

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
            router.replace("/profile");
            return;
        }

        router.replace(`/users/${user?.username}`);
    }

    const handleDelete = (c) => {
        deleteComment(request, post.id, c.id, setComments);
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
                    <PostCard post={post} />
                </GestureHandlerRootView>

                <CommentInput post={post} />

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
    const res = await request(`api/posts/${id}`);

    if (res.ok) {
        const js = await res.json();
        setPost(js);
    }
}

const deletePost = async (request, id, nav) => {
    const res = await request(`api/posts/${id}/`, "DELETE");

    if (res.ok) {
        nav.goBack();
    }
}

const update = async (request, id, isPrivate, setIsPrivate) => {
    const form = new FormData();
    form.append("private", isPrivate);

    const res = await request(`api/posts/${id}/`, "PUT", form);

    if (res.ok) setIsPrivate(isPrivate);
}

const loadComments = async (request, id, setComments, setNext) => {

    const res = await request(`api/posts/${id}/comments/list`);

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


const deleteComment = async (request, post_id, id, setComments) => {
    const res = await request(`api/posts/${post_id}/comments/${id}/`, "DELETE");

    if (res.ok) {
        setComments(list => {
            var newList = list.filter(e => e.id != id);
            return newList;
        });
    }
}

export default ShowPost;