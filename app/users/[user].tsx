import React, { useMemo } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useAuth } from "@/hooks/AuthContext";
import PostList from "@/components/PostsGallery/PostList";
import UserBanner from "@/components/UserBanner";
import { Request, useRequest } from "@/hooks/RequestContext";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import WaitingCard from "@/components/WaitingCard";
import Post from "@/models/Post";
import PrivateIndicator from "@/components/PrivateIndicator";
import User from "@/models/User";

const ShowUser = () => {
    const anim = React.useRef(new Animated.Value(0)).current;
    const [user, setUser] = React.useState<User | null>();
    const auth = useAuth();
    const request = useRequest();
    const navigation = useNavigation()
    const param = useGlobalSearchParams<{ user: string }>()
    const router = useRouter();
    const status = useMemo(() => {
        if (user?.username === auth.user?.username || !user?.private || user?.following_status === true) {
            return "public";
        }
        return "private";
    }, [user]);

    React.useEffect(() => {
        getUser(request, param.user, setUser);
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({ title: 'Updated!' });
    }, [navigation, user]);

    const handleShowPost = (post: Post) => {
        router.push(`/posts/${post.id}`);
    }

    if (!user) return <WaitingCard />

    return (
        <View style={styles.root} >
            {
                status != "private" &&
                <PostList onShowPost={handleShowPost} user={user}
                    ListHeaderComponent={<UserBanner user={user} anim={anim} />}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: anim } } }], { useNativeDriver: false })}
                />
            }
            {
                status == "private" &&
                <View style={{ width: "100%", flex: 1, display: "flex", alignItems: "center" }}>
                    <UserBanner user={user} anim={anim} />
                    <PrivateIndicator />
                </View>
            }
        </View >
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
        paddingHorizontal: 25,
    }
});

const getUser = async (request: Request, username: string, setUser: (user: any) => void) => {
    const res = await request("api/users/" + username, "GET", null, "none");

    if (res?.ok) {
        const js = await res.json();
        setUser(js);
    }
}

export default ShowUser;