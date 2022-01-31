import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Like from "../component/Like";
import ImageList, { ListCounter } from "../container/ImageList";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { BASE_URL } from "../http/HttpRequest";
import { praseTime, numberToStr } from "../utils";
import Image from "./Image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export const Title = ({ theme, title, post, onShowPost, onShowUser })=>{

    return (
        <View style={{width: '100%'}}>
            <View style={styles.titleRoot}>
                <TouchableOpacity activeOpacity={onShowUser ? 0.7 : 1} onPress={()=>{onShowUser&&onShowUser(post.user)}}>
                    <Image source={{uri: BASE_URL + 'api/user/image/' + post.user.username}}  
                        style={{ width: 50, height: 50, borderWidth: 2, borderColor: theme.colors.border, borderRadius: 25, }}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.titleText} activeOpacity={onShowPost ? 0.7 : 1} onPress={()=>{onShowPost&&onShowPost(post)}}>
                    <Text style={{ color: theme.colors.text }}>
                        {title}
                    </Text>
                </TouchableOpacity>
                <Text numberOfLines={1}
                    style={{color: theme.colors.text, fontSize: 10, position: 'absolute', bottom: 15, right: 15}}>
                        {"@" + post.user.username + " . " + praseTime(post.date)}     
                </Text>
            </View>
        </View>
    );
}



const PostCard = ({ post, nav, onShowPost, onShowUser })=>{
    const [collabse, setCollabse] = React.useState(1);
    const [index, setIndex] = React.useState(0);
    const [theme, setTheme] = useTheme();
    const [auth] = useAuth();

    const handleShowUser = (user) => {
        if (!nav) return;

        if (user?.id === auth.user.id){
            nav.navigate('Profile', { screen: 'Profile', });
            return;
        }

        nav.navigate('ShowUser', {username: user?.username});
    }

    return (
        <View style={{...styles.root}}>
            <Title onShowPost={onShowPost}
                onShowUser={handleShowUser}
                theme={theme} 
                title={post.title} 
                post={post}/>
            
            <ImageList onChange={(i)=>setIndex(i)} backgroundColor={theme.colors.background} 
                list={post.images.map(e=>BASE_URL + e.url.substring(1, e.url.length))} 
            />
            
            <View style={styles.toolBar}>
                <Like color={theme.colors.text} size={25} item={post}/>
                <ListCounter count={post.images.length} index={index} color={theme.colors.text}/>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Icon name="comment-text-outline" color={theme.colors.text} size={25}/>
                    <Text style={{ color: theme.colors.text }}>{numberToStr(post.comment)}</Text>
                </View>
            </View>

            <Text numberOfLines={collabse}
                style={{...styles.disc, color: theme.colors.text}}
                onPress={()=>setCollabse(collabse ? null : 1)}>{post.description}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
   root:{
       width: "100%",
       marginBottom: 15,
   },
   titleRoot:{
        width: "100%",
        padding: 10,
        flexDirection: "row",
   },
   disc:{
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
   },   
   titleText:{
        padding: 10,
        fontSize: 15,
        flex: 1,
        borderBottomColor: "black",
        borderBottomWidth: 0.5,
   },
   toolBar:{
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    paddingRight: 25,
    paddingLeft: 25,
    justifyContent: 'center',
    alignItems: 'center'
   },   
});

export default PostCard;