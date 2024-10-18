import React from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { useAuth } from "@/hooks/AuthContext";
import { useTheme } from "@/hooks/ThemeContext";
import PostList from "@/components/PostsGallery/PostList";
import UserBanner from "@/components/UserBanner";
import WaitingCard from "@/components/WaitingCard";
import { Request, useRequest } from "@/hooks/RequestContext";
import { useBottomCard } from "@/hooks/BottomCardContext";
import { useNavigation, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons";
import SettingsCard from "@/components/BottomCards/SettingsCard";
import User from "@/models/User";
import Post from "@/models/Post";

const Profile = () => {
    const { theme, setThemeType } = useTheme();
    const anim = React.useRef(new Animated.Value(0)).current;
    const [user, setUser] = React.useState<User>();
    const auth = useAuth();
    const request = useRequest();
    const navigation = useNavigation()
    const router = useRouter()
    const bottomCard = useBottomCard()

    React.useLayoutEffect(() => {
        if (!auth.user) return;

        getUser(request, auth.user.username, setUser);
    }, [auth]);

    React.useLayoutEffect(() => {
        if (!user) {
            return;
        }
        navigation.setOptions({
            title: auth.user?.username,
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }}
                    onPress={() => bottomCard.openCard(<SettingsCard user={user} updateUser={setUser} />)}
                >
                    <Ionicons name="settings-outline" size={25} color={theme.colors.text} />
                </TouchableOpacity>
            ),
        });

    }, [navigation, theme, user, auth]);

    const handleShowPost = (post: Post) => {
        router.push(`/posts/${post.id}`);
    }

    const handleRefresh = () => {
        if (!auth.user) return;
        getUser(request, auth.user.username, setUser);
    }

    if (!user) return <WaitingCard />

    return (
        <View style={styles.root} >
            <PostList onShowPost={handleShowPost}
                onRefresh={handleRefresh}
                user={user}
                ListHeaderComponent={<UserBanner user={user} anim={anim} />}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: anim } } }], { useNativeDriver: false })}
            />
        </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const getUser = async (request: Request, username: string, setUser: (user: User) => void) => {
    const res = await request("api/users/" + username);

    if (res?.ok) {
        const js = await res.json();
        setUser(js);
    }
}

export default Profile;