import React from "react";
import { View, StyleSheet, Animated, TouchableOpacity, Text } from "react-native";
import BottomCard from "../container/BottomCard";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import PostList from "../container/PostList";
import UserBanner from "../component/UserBanner";
import Icon from "react-native-vector-icons/AntDesign";
import { useRequest } from "../context/RequestContext";

const ShowUser = ({ navigation, route }) => {
    const [theme] = useTheme();
    const [settingsCard, setSettingsCard] = React.useState(false);
    const anim = React.useRef(new Animated.Value(0)).current;
    const [user, setUser] = React.useState();
    const [auth] = useAuth();
    const request = useRequest();

    React.useEffect(() => {
        getUser(request, route.params?.username || auth.user.username, setUser);
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
        navigation.push("ShowPost", { post: post });
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

    const res = await request("api/user/" + username);

    if (res.ok) {
        const js = await res.json();
        setUser(js);
    }
}

export default ShowUser;