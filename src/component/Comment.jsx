import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Like from "./Like";
import User from "./User";
import {praseTime} from "../utils";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../context/AuthContext";

const Comment = ({ comment, onPress, onDelete }) => {
    const [theme] = useTheme();
    const [auth] = useAuth();

    return (
        <View style={{...styles.root, backgroundColor: theme.colors.card}}>
            <View style={{flex: 1}}>
                <User user={comment.user} small onPress={onPress} />
                <Text style={{ color: theme.colors.text, padding: 5 }}>{comment.content}</Text>
            </View>
            <View style={styles.tools}>
                {
                    auth.user.username == comment.user.username && 
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={()=> onDelete && onDelete(comment)}>
                        <Icon name={"remove"} size={20} color={theme.colors.notification} />
                    </TouchableOpacity>
                }
                
                <Like item={comment} type="comment" color={theme.colors.text} size={20}/>

                <View style={{ flexGrow: 1 }} />
                <Text style={{ color: theme.colors.text, marginRight: 0 }}>{praseTime(comment.date)}</Text>
            </View>
        </View>

    );
}


const styles = StyleSheet.create({
    root:{
        width: '100%',
        marginBottom: 10,
        borderRadius: 10,
        padding: 5,
    },
    tools: {
        display: 'flex',
        flexDirection: 'row',

    }
});

export default Comment;
