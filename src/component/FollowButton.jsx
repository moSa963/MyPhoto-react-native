import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useRequest } from "../context/RequestContext";
import { useTheme } from "../context/ThemeContext";
import ButtonActions from "./ButtonActions";


const FollowButton = ({ user }) => {
    const [index, setIndex] = React.useState(0);
    const [theme] = useTheme();
    const request = useRequest();

    React.useEffect(() => {
        switch (user.is_following) {
            case null: setIndex(1); break;
            case false: setIndex(2); break;
            case true: setIndex(3); break;
        }
    }, [user]);

    const handlePress = (e) => {
        if (index != 0) {
            setIndex(0);
            followRequest(request, setIndex, user.username, index === 1 ? false : true);
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
                <Text style={{ color: theme.colors.text }}>Follow</Text>
            </View>
            <View style={{ backgroundColor: '#55ff5555', width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: theme.colors.text }}>Waiting</Text>
            </View>
            <View style={{ backgroundColor: '#55ff5555', width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: theme.colors.text }}>Following</Text>
            </View>
        </ButtonActions>
    );
}


const styles = StyleSheet.create({
    root: {
        borderRadius: 10,
        flex: 1,
        maxWidth: 75,
        height: 30,
        borderColor: 'blue',
        borderWidth: 0.5,
        overflow: 'hidden',
    },
    item: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
});


const followRequest = async (request, setIndex, username, unfollow = false) => {
    const res = await request("api/follow/" + username, unfollow ? "DELETE" : "POST");

    if (res.ok) {
        if (unfollow) setIndex(1);
        else {
            const js = await res.json();
            setIndex(js.is_verified ? 3 : 2)
        }
    }
}

export default FollowButton;