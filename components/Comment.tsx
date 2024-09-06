import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useTheme } from "@/hooks/ThemeContext";
import Like from "@/components/Like";
import { parseTime } from "@/utils/parseTime";
import { useAuth } from "@/hooks/AuthContext";
import Avatar from "@/components/Avatar";
import ThemedText from "@/components/ThemedText";
import { BASE_URL } from '@/http/HttpRequest';
import CommentModel from "@/models/Comment";

type CommentProps = ViewProps & {
    comment: CommentModel,
    onPress?: (comment: CommentModel) => void,
    onDelete?: (comment: CommentModel) => void,
}

const Comment = ({ comment, onPress, onDelete, style, ...rest }: CommentProps) => {
    const { theme } = useTheme();
    const auth = useAuth();

    return (
        <View {...rest} style={[styles.root, style]}>
            <View >
                <Avatar uri={`${BASE_URL}api/users/${comment.user.username}/image`} variant="circle" />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ width: "100%", display: "flex", flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <ThemedText type="subtitle">{comment.user.username}</ThemedText>
                    <ThemedText type="caption">{parseTime(comment.created_at)}</ThemedText>
                </View>
                <ThemedText >{comment.content}</ThemedText>
            </View>
            <View>
                <Like url={`api/comments/${comment.id}/likes/`} likesCount={comment.likes_count} initValue={comment.liked} size="small" />

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 5,
        padding: 10
    },

});

export default Comment;
