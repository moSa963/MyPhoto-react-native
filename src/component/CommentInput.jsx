import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRequest } from "../context/RequestContext";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button";
import TextInput from "./TextInput";


const CommentInput = ({ post }) => {
    const [content, setContent] = React.useState("");
    const [theme] = useTheme();
    const request = useRequest();

    const handleSend = () => {
        sendComment(request, post.id, content);
        setContent("");
    }

    return (
        <View style={styles.root}>
            <TextInput flex={1} onChangeText={(input) => setContent(input)} placeholder="Comment..." value={content} />
            <Button onPress={handleSend} >
                <Text style={{ color: theme.colors.text }} >Send</Text>
            </Button>
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});


const sendComment = async (request, post_id, content) => {
    const form = new FormData();
    form.append("content", content);
    form.append("post_id", post_id);

    const res = await request("api/comment/", "POST", form);

}

export default CommentInput;
