import React from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import BottomCard from "@/components/BottomCard";
import { useAuth } from "@/hooks/AuthContext";
import { useTheme } from "@/hooks/ThemeContext";
import PostList from "@/components/PostsGallery/PostList";
import UserBanner from "@/components/UserBanner";
import Icon from "react-native-vector-icons/AntDesign";
import { useRequest } from "@/hooks/RequestContext";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";

const ShowUser = () => {
    const [theme] = useTheme();
    const [settingsCard, setSettingsCard] = React.useState(false);
    const anim = React.useRef(new Animated.Value(0)).current;
    const [user, setUser] = React.useState();
    const [auth] = useAuth();
    const request = useRequest();
    const navigation = useNavigation()
    const param = useGlobalSearchParams()
    const router = useRouter();

    React.useEffect(() => {
        getUser(request, param.user, setUser);
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: user?.username || "",
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }}
                    onPress={() => setSettingsCard(s => !s)}
                >
                    <Icon name="setting" size={25} color={theme.colors.text} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, user]);

    const handleShowPost = (post) => {
        router.push(`/posts/${post.id}`);
    }

    if (!user) return <View></View>;

    return (
        <View style={styles.root} >
            <BottomCard onClose={() => setSettingsCard(false)} theme={theme} open={settingsCard} >

            </BottomCard>

            <PostList onShowPost={handleShowPost} user={user}
                ListHeaderComponent={<UserBanner auth={auth} user={user} theme={theme} anim={anim} navigation={navigation} />}
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
    }
});

const getUser = async (request, username, setUser) => {

    const res = await request("api/users/" + username);

    if (res.ok) {
        const js = await res.json();
        setUser(js);
    }
}

export default ShowUser;