import React from "react";
import { ActivityIndicator } from "react-native";
import { Request, useRequest } from "@/hooks/RequestContext";
import { useTheme } from "@/hooks/ThemeContext";
import ActionsButton, { ActionsButtonItem, ActionsButtonProps } from "@/components/Buttons/ActionsButton";
import ThemedText from "./ThemedText";
import User from "@/models/User";

type AcceptButtonProps = Omit<ActionsButtonProps, "index"> & {
    user: User
}

const AcceptButton = ({ user, style, ...rest }: AcceptButtonProps) => {
    const [index, setIndex] = React.useState(1);
    const { theme } = useTheme();
    const request = useRequest();

    const handlePress = async () => {
        if (index !== 1) return;

        setIndex(0);
        setIndex(await acceptRequest(request, user.username));
    }

    return (
        <ActionsButton {...rest} style={[{ borderRadius: 10, height: 40 }, style]}
            onPress={handlePress}
            index={index}>
            <ActionsButtonItem style={{ backgroundColor: '#5555ff55' }}>
                <ActivityIndicator color={theme.colors.primary} size="small" />
            </ActionsButtonItem>
            <ActionsButtonItem style={{ backgroundColor: '#55ff5555' }}>
                <ThemedText >Accept</ThemedText>
            </ActionsButtonItem>
            <ActionsButtonItem style={{ backgroundColor: '#55ff5555' }}>
                <ThemedText >Accepted</ThemedText>
            </ActionsButtonItem>
        </ActionsButton>
    );
}

const acceptRequest = async (request: Request, username: string) => {
    const res = await request("api/follow/accept/" + username, "POST");

    return res?.ok ? 2 : 1;
}

export default AcceptButton;