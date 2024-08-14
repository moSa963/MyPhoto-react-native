import React from "react";
import { View, StyleSheet, Animated, Text, Switch, TouchableOpacity } from "react-native";
import BottomCard from "@/components/BottomCard";
import { useAuth } from "@/hooks/AuthContext";
import { useTheme } from "@/hooks/ThemeContext";
import Button from "@/components/Buttons/Button";
import PostList from "@/components/PostsGallery/PostList";
import UserBanner from "@/components/UserBanner";
import { launchLibrary } from '@/utils/ImagePicker';
import WaitingCard from "@/components/WaitingCard";
import { useRequest } from "@/hooks/RequestContext";
import { useNavigation, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
    const { theme, setThemeType } = useTheme();
    const [settingsCard, setSettingsCard] = React.useState(false);
    const anim = React.useRef(new Animated.Value(0)).current;
    const [user, setUser] = React.useState();
    const auth = useAuth();
    const [isPrivate, setIsPrivate] = React.useState(false);
    const request = useRequest();
    const navigation = useNavigation()
    const router = useRouter()

    React.useLayoutEffect(() => {
        getUser(request, auth.user.username, setUser, setIsPrivate);

        navigation.setOptions({
            title: auth.user.username,
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }}
                    onPress={() => setSettingsCard(s => !s)}
                >
                    <Ionicons name="settings-outline" size={25} color={theme.colors.text} />
                </TouchableOpacity>
            ),
        });

    }, [navigation, theme]);

    const handleShowPost = (post) => {
        router.push(`/posts/${post.id}`);
    }

    const handleRefresh = () => {
        getUser(request, auth.user.username, setUser, setIsPrivate);
    }

    if (!user) return <WaitingCard />

    return (
        <View style={styles.root} >
            <BottomCard onClose={() => setSettingsCard(false)} theme={theme} open={settingsCard} >
                <View style={styles.cardItem}>
                    <Text style={{ color: theme.colors.text, marginRight: 15 }}>DarkTheme</Text>
                    <Switch value={theme.type === "dark" ? true : false} onChange={() => setThemeType(theme.type === "dark" ? "light" : "dark")} />
                </View>

                <View style={styles.cardItem}>
                    <Text style={{ color: theme.colors.text, marginRight: 15 }}>Private</Text>
                    <Switch value={isPrivate} onChange={() => updateRequest(request, { is_private: !isPrivate }, setIsPrivate)} />
                </View>

                <Button color="red" onPress={() => startPicker((e) => updateRequest(request, { image: imageFileForm(e) }, setIsPrivate))} >
                    <Text style={{ color: theme.colors.text }}>PROFILE IMAGE</Text>
                </Button>

                <Button onPress={auth.logout} >
                    <Text style={{ color: theme.colors.text }}>LOGOUT</Text>
                </Button>
            </BottomCard>

            <PostList onShowPost={handleShowPost}
                onRefresh={handleRefresh}
                user={user}
                ListHeaderComponent={<UserBanner profile={true} user={user} theme={theme} anim={anim} navigation={navigation} />}
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

const getUser = async (request, username, setUser, setIsPrivate) => {

    const res = await request("api/users/" + username);

    if (res.ok) {
        const js = await res.json();
        setIsPrivate(js.private);
        setUser(js);
    }

}

const startPicker = async (onUploaded) => {
    const img = await launchLibrary(false);

    if (img) {
        onUploaded(img);
    }
}

const imageFileForm = (image) => {
    const form = new FormData();
    const [type] = image[0].uri.split('.').reverse();

    const file = {
        uri: image[0].uri,
        type: "image/" + type,
        name: ("profile." + type),
    };

    return file;
}

const updateRequest = async (request, { is_private, image }, setIsPrivate) => {
    const form = new FormData();
    is_private !== undefined && form.append("private", is_private);
    image !== undefined && form.append("image", image);

    const res = await request('api/users/', "PUT", form);

    if (res.ok) {
        const js = await res.json();
        setIsPrivate(js.private);
        return;
    }
}


export default Profile;