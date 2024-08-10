import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRequest } from "@/hooks/RequestContext";
import { useTheme } from "@/hooks/ThemeContext";
import ActionsButton from "@/components/Buttons/ActionsButton";


const AcceptButton = ({ follow }) => {
    const [index, setIndex] = React.useState(1);
    const { theme } = useTheme();
    const request = useRequest();

    const handlePress = (e) => {
        if (index == 1) {
            setIndex(0);
            acceptRequest(request, follow.user.username, setIndex)
        }
    }

    return (
        <ActionsButton style={{ borderRadius: 10, height: 40 }}
            onPress={handlePress}
            effectWidth={1}
            index={index}>
            <View style={{ backgroundColor: '#5555ff55', width: '100%', height: 40, padding: 5, justifyContent: 'center', alignItems: 'center' }} >
                <ActivityIndicator color={theme.colors.primary} size="small" />
            </View>
            <View style={{ backgroundColor: '#55ff5555', width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: theme.colors.text }}>Accept</Text>
            </View>
            <View style={{ backgroundColor: '#55ff5555', width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: theme.colors.text }}>Accepted</Text>
            </View>
        </ActionsButton>
    );
}

const acceptRequest = async (request, username, setIndex) => {
    const res = await request("api/follow/accept/" + username, "POST");

    if (res.ok) return setIndex(2);

    setIndex(1);
}

export default AcceptButton;