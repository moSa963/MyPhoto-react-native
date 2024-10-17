import React from "react";
import { StyleSheet, Text, TextInput, View, ViewProps } from "react-native";
import { Request, useRequest } from "@/hooks/RequestContext";
import { useTheme } from "@/hooks/ThemeContext";
import Button from "@/components/Buttons/Button";
import Avatar from "./Avatar";
import { BASE_URL } from "@/http/HttpRequest";
import Post from "@/models/Post";
import Comment from "@/models/Comment";

type CommentInputProps = ViewProps & {
    post: Post,
    onInput: (comment: Comment) => void,
}

const CommentInput = ({ post, onInput }: CommentInputProps) => {
    const [content, setContent] = React.useState("");
    const { theme } = useTheme();
    const request = useRequest();

    const handleSend = () => {
        sendComment(request, post, content, onInput);
        setContent("");
    }

    return (
        <View style={styles.root}>
            <Avatar uri={`${BASE_URL}api/users/${post.user.username}/image`} variant="circle" />
            <TextInput
                style={{ flex: 1 }}
                onChangeText={(input) => setContent(input)}
                placeholder="Comment..."
                value={content}
            />
            <Button onPress={handleSend} >
                <Text style={{ color: theme.colors.text }} >Send</Text>
            </Button>
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 80,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        padding: 5,
    }
});


const sendComment = async (request: Request, post: Post, content: any, onInput: (comment: Comment) => void | undefined) => {
    const form = new FormData();
    form.append("content", content);
    form.append("post_id", post?.id.toFixed());

    const res = await request(`api/posts/${post?.id}/comments/`, "POST", form);

    if (res?.ok) {
        const js = await res.json();
        onInput(js);
    }
}

export default CommentInput;
