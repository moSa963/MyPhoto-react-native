import React from "react";
import { View, StyleSheet, Animated, Text, Switch, TouchableOpacity } from "react-native";
import BottomCard from "../container/BottomCard";
import { Types, useAuth } from "../context/AuthContext";
import { Themes, useTheme } from "../context/ThemeContext";
import Button from "../component/Button";
import PostList from "../container/PostList";
import UserBanner from "../component/UserBanner";
import Icon from "react-native-vector-icons/AntDesign";
import { getImage } from '../ImagePicker';
import WaitingCard from "../component/WaitingCard";
import { useRequest } from "../context/RequestContext";

const Profile = ({ navigation, route }) => {
    const [theme, setTheme] = useTheme();
    const [settingsCard, setSettingsCard] = React.useState(false);
    const anim = React.useRef(new Animated.Value(0)).current;
    const [user, setUser] = React.useState();
    const [auth, setAuth] = useAuth();
    const [isPrivate, setIsPrivate] = React.useState(false);
    const request = useRequest();

    React.useLayoutEffect(()=>{
        getUser(request, route.params?.username || auth.user.username, setUser , setIsPrivate);

        navigation.setOptions({ title: auth.username,
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 15}} 
                    onPress={()=>setSettingsCard(s => !s)}
                >
                    <Icon name="setting" size={25} color={theme.colors.text} />
                </TouchableOpacity>
            ), });
    }, [navigation, theme]);

    const handleShowPost = (post)=>{
        navigation.push("ShowPost", { post: post });   
    }

    const handleReferesh = () => {
        getUser(request, route.params?.username || auth.user.username, setUser , setIsPrivate);
    }

    if (!user) return <WaitingCard />

    return (
        <View style={styles.root} > 
            <BottomCard onClose={() => setSettingsCard(false)} theme={theme} open={settingsCard} >
                <View style={styles.cardItem}>
                    <Text style={{color: theme.colors.text, marginRight: 15}}>DarkTheme</Text>
                    <Switch value={theme.type === Themes.dark ? true : false} onChange={()=>setTheme(theme.type === Themes.dark ? Themes.light : Themes.dark)} />
                </View>

                <View style={styles.cardItem}>
                    <Text style={{color: theme.colors.text, marginRight: 15}}>Private</Text>
                    <Switch value={isPrivate} onChange={()=> updateRequest(request, { is_private: !isPrivate}, setIsPrivate)} />
                </View>

                <Button color="red" onPress={()=> startPicker((e) => updateRequest(request, { image: imageFileForm(e)}, setIsPrivate)) } >
                    <Text style={{ color: theme.colors.text }}>PROFILE IMAGE</Text>
                </Button>
                
                <Button onPress={() => setAuth(Types.LOGOUT)} >
                    <Text style={{color: theme.colors.text}}>LOGOUT</Text>
                </Button>
            </BottomCard>

            <PostList onShowPost={handleShowPost}
                onReferesh={handleReferesh}
                user={user}
                ListHeaderComponent={<UserBanner profile={true} user={user} theme={theme} anim={anim} navigation={navigation}/>}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {y: anim}}}], {useNativeDriver: false})}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    cardItem:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const getUser = async (request, username, setUser, setIsPrivate) => {

        const res = await request("api/user/" + username);

        if (res.ok){
            const js = await res.json();
            setIsPrivate(js.is_private);
            setUser(js);
        }

}

const startPicker = async (onUploaded)=>{
    const img = await getImage(false);

    if (img){
        onUploaded(img);
    }
}  

const imageFileForm = (image)=>{
    const form = new FormData();
    const [type] = image.uri.split('.').reverse();

    const file = {
        uri: image.uri,
        type: "image/" + type,
        name: ("profile." + type),
    };
    
    return file;
}

const updateRequest = async (request, { is_private, image }, setIsPrivate) => {
        const form = new FormData();
        is_private !== undefined && form.append("is_private", is_private);
        image !== undefined && form.append("image", image);
    
        const res = await request('api/user', "PUT", form);
    
        if (res.ok){
            const js = await res.json();
            setIsPrivate(js.is_private);
            return;
        }
}


export default Profile;