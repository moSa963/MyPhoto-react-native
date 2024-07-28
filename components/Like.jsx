import React from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { useRequest } from "@/hooks/RequestContext";
import { numberToStr } from "@/utils/numberToStr";
import { Ionicons } from "@expo/vector-icons";

const AnimatedView = Animated.createAnimatedComponent(View);

const Like = ({ size, color, item, type = "post" }) => {
    const [liked, setLiked] = React.useState(false);
    const [toValue, setToValue] = React.useState(item.liked ? 0 : 1);
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
            <AnimatedView style={{ transform: [{ scale: anim }] }}>
                <Ionicons name={liked ? "heart" : "heart-outline"} color={color} size={size} />
            </AnimatedView>
            <Text style={{ color: color }}>{numberToStr(item.likes_count + (liked ? 1 : 0))}</Text>
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
    url = ""

    if (type == "post") {
        url = `api/posts/${id}/likes/`
    } else {
        url = `api/comments/${id}/likes/`
    }

    const res = await request(url, like ? "POST" : "DELETE");

    if (res.ok) {
        setLike(v => v ? 0 : 1);
    }
}

export default Like;