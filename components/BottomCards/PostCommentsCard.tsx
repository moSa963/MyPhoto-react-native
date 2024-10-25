import React from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, View, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/ThemeContext';
import { useAuth } from '@/hooks/AuthContext';
import WaitingCard from '@/components/WaitingCard';
import { useNavigation, useRouter } from 'expo-router';
import Post from '@/models/Post';
import CommentModel from '@/models/Comment';
import { ScrollView } from 'react-native-gesture-handler';
import Pagination from '../Pagination';
import Comment from '../Comment';
import ThemedText from '../ThemedText';
import CommentInput from '../CommentInput';

export type PostCommentsCardProps = ViewProps & {
    post: Post,
}

const PostCommentsCard = ({ post }: PostCommentsCardProps) => {
    const { theme } = useTheme();
    const [newComments, setNewComments] = React.useState<CommentModel[]>([]);
    const navigation = useNavigation();
    const auth = useAuth();
    const router = useRouter();

    React.useLayoutEffect(() => {

    }, [navigation, theme, post]);


    const showUser = (comment: CommentModel) => {
        if (!navigation) return;

        const user = comment.user;

        if (user?.username === auth.user?.username) {
            router.replace("/profile");
            return;
        }

        router.replace(`/users/${user?.username}`);
    }

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>, processing: boolean, loadNext: () => void) => {
        if (!processing && e.nativeEvent.contentOffset.y + 10 >= (e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height)) {
            loadNext();
        }
    }

    // const handleDelete = (c) => {
    //     deleteComment(request, post.id, c.id, setComments);
    // }

    const handleNewComment = (comment: CommentModel) => {
        setNewComments(v => [...v, comment]);
    }

    if (!post) return <WaitingCard />

    return (
        <View style={{ width: "100%", flex: 1 }}>
            <View style={{ width: "100%", alignItems: "center" }}>
                <ThemedText type='subtitle'>Comments</ThemedText>
            </View>
            <Pagination url={`api/posts/${post.id}/comments/list`}>
                {
                    ({ data, next, loadNext, processing, refresh, refreshing }) => (
                        <ScrollView style={{ flex: 1 }} onScroll={(e) => handleScroll(e, processing, loadNext)}>
                            {
                                [...newComments, ...data].map((item) => (
                                    <Comment
                                        key={item.id}
                                        comment={item}
                                        onPress={showUser}
                                        onDelete={() => console.log("delete")}
                                    />
                                ))
                            }

                            {
                                (next || processing) && <ActivityIndicator color={theme.colors.text} size="large" />
                            }
                        </ScrollView>
                    )
                }
            </Pagination>
            <CommentInput post={post} onInput={handleNewComment} />
        </View>
    );
}

// const deleteComment = async (request: Request, post_id, id, setComments) => {
//     const res = await request(`api/posts/${post_id}/comments/${id}/`, "DELETE");

//     if (res.ok) {
//         setComments(list => {
//             var newList = list.filter(e => e.id != id);
//             return newList;
//         });
//     }
// }

export default PostCommentsCard;