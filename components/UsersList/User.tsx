import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { BASE_URL } from "@/http/HttpRequest";
import Button, { ButtonProps } from "../Buttons/Button";
import UserModel from "@/models/User";
import { useAuth } from "@/hooks/AuthContext";
import FollowButton from "../FollowButton";
import AcceptButton from "../AcceptButton";
import Avatar from "../Avatar";
import ThemedText from "../ThemedText";

type UserProps = Omit<ButtonProps, "onPress"> & {
    user: UserModel,
    small?: boolean,
    onPress?: (user: UserModel) => void,
    request?: boolean
}

const User = ({ user, onPress, style, request, ...rest }: UserProps) => {
    const auth = useAuth();

    const RelationButton = useMemo(() => {
        if (user.username == auth.user?.username) {
            return <></>;
        }

        if (request) {
            return <AcceptButton user={user} />
        }

        return <FollowButton user={user} />;

    }, [user, auth.user]);

    return (
        <Button {...rest} style={[{ flex: 1 }, style]} onPress={() => onPress && onPress(user)}>
            <View style={styles.title}>
                <Avatar uri={`${BASE_URL}api/users/${user.username}/image`} />

                <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center' }} >
                    <View style={{ flex: 1 }}>

                        <ThemedText type="default">
                            {user.first_name + " " + user.last_name}
                        </ThemedText>
                        <ThemedText type="caption">
                            {"@" + user.username}
                        </ThemedText>

                    </View>

                    {RelationButton}
                </View>
            </View>
        </Button >
    );
}

const styles = StyleSheet.create({
    title: {
        width: "100%",
        padding: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default User;