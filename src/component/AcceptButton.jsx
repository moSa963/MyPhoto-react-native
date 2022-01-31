import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRequest } from "../context/RequestContext";
import { useTheme } from "../context/ThemeContext";
import ButtonActions from "./ButtonActions";


const AcceptButton = ({ follow }) => {
    const [index, setIndex] = React.useState(1);
    const [theme] = useTheme();
    const request = useRequest();

    const handlePress = (e) => {
        if (index == 1) {
            setIndex(0);
            acceptRequest(request, follow.id, setIndex)
        }
    }

    return (
        <ButtonActions style={{ borderRadius: 10, height: 40 }}
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
        </ButtonActions>
    );
}

const acceptRequest = async (request, id, setIndex) => {
    const res = await request("api/follow/accept/" + id, "PUT");

    if (res.ok) return setIndex(2);

    setIndex(1);
}

export default AcceptButton;