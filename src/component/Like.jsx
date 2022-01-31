import React from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRequest } from "../context/RequestContext";
import { numberToStr } from "../utils";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const Like = ({ size, color, item, type = "post" }) => {
    const [liked, setLiked] = React.useState(false);
    const [toValue, setToValue] = React.useState(item.user_liked ? 0 : 1);
    const anim = React.useRef(new Animated.Value(0)).current;
    const request = useRequest();

    React.useEffect(() => {
        Animated.timing(anim,
            {
                toValue: toValue,
                duration: 100,
                useNativeDriver: false,
            }
        ).start(() => {
            if (toValue < 1) {
                setToValue(1);
                setLiked(!liked);
            }
        });
    }, [anim, toValue]);

    const handlePress = () => {
        likeRequest(request, type, item.id, !liked, setToValue);
    }

    return (
        <View style={styles.root} onTouchEnd={() => handlePress()}>
            <AnimatedIcon name={liked ? "ios-heart" : "ios-heart-outline"} color={color} size={size}
                style={{ transform: [{ scale: anim }] }} />
            <Text style={{ color: color }}>{numberToStr(item.likes + (liked ? 1 : 0))}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const likeRequest = async (request, type, id, like, setLike) => {
    const method = like ? "POST" : "DELETE";
    const url = "api/like/" + type + "/";

    const res = await request(url + id, method);

    if (res.ok) setLike(x => x == 1 ? 0 : 1);
}

export default Like;