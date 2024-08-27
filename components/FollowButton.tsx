import React from "react";
import { ActivityIndicator } from "react-native";
import { Request, useRequest } from "@/hooks/RequestContext";
import { useTheme } from "@/hooks/ThemeContext";
import ActionsButton, { ActionsButtonItem, ActionsButtonProps } from "@/components/Buttons/ActionsButton";
import ThemedText from "@/components/ThemedText";
import User from "@/models/User";

type FollowButtonProps = Omit<ActionsButtonProps, "index"> & {
    user: User
}

const FollowButton = ({ user, ...rest }: FollowButtonProps) => {
    const [index, setIndex] = React.useState<number>(0);
    const { theme } = useTheme();
    const request = useRequest();

    React.useEffect(() => {
        switch (user.following_status) {
            case null: setIndex(1); break;
            case false: setIndex(2); break;
            case true: setIndex(3); break;
        }
    }, [user]);

    const handlePress = async () => {
        if (index === 0) return;

        const followed = index !== 1;
        setIndex(0);
        setIndex((await followRequest(request, user, followed)) || 1);
    }

    return (
        <ActionsButton {...rest}
            style={{ borderRadius: 10, height: 40 }}
            onPress={handlePress}
            index={index}>
            <ActionsButtonItem style={{ backgroundColor: '#5555ff55', }} >
                <ActivityIndicator color={theme.colors.primary} size="small" />
            </ActionsButtonItem>
            <ActionsButtonItem style={{ backgroundColor: '#55ff5555' }}>
                <ThemedText>Follow</ThemedText>
            </ActionsButtonItem>
            <ActionsButtonItem style={{ backgroundColor: '#55ff5555' }}>
                <ThemedText>Waiting</ThemedText>
            </ActionsButtonItem>
            <ActionsButtonItem style={{ backgroundColor: '#55ff5555' }}>
                <ThemedText>Following</ThemedText>
            </ActionsButtonItem>
        </ActionsButton>
    );
}


const followRequest = async (request: Request, user: User, followed: boolean) => {
    const res = await request("api/follow/" + user.username, followed ? "DELETE" : "POST", null, "none");

    if (res?.ok) {
        if (followed) {
            return 1;
        }
        const js = await res?.json();
        return js.verified ? 3 : 2;
    }
}


export default FollowButton;