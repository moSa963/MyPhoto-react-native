import React from "react";
import { View, StyleSheet, Animated, Text, ViewProps } from "react-native";
import { Request, useRequest } from "@/hooks/RequestContext";
import { numberToStr } from "@/utils/numberToStr";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

type LikeProps = ViewProps & {
    url: string,
    size?: "small" | "large",
    likesCount?: number,
    initValue?: boolean,
}

const Like = ({ url, size = "large", likesCount = 0, initValue }: LikeProps) => {
    const [liked, setLiked] = React.useState(false);
    const [toValue, setToValue] = React.useState(initValue ? 0 : 1);
    const anim = React.useRef(new Animated.Value(0)).current;
    const theme = useTheme();
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
        likeRequest(request, url, liked, setToValue);
    }

    return (
        <View style={styles.root} onTouchEnd={() => handlePress()}>
            <Animated.View style={{ transform: [{ scale: anim }] }}>
                <Ionicons name={liked ? "heart" : "heart-outline"} color={theme.colors.text} size={size == "large" ? 30 : 20} />
            </Animated.View>
            <Text style={{ color: theme.colors.text }}>{numberToStr(likesCount + (liked ? 1 : 0))}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const likeRequest = async (request: Request, url: string, liked: boolean, setLike: any) => {
    const res = await request(url, liked ? "DELETE" : "POST");

    if (res?.ok) {
        setLike(v => v ? 0 : 1);
    }
}

export default Like;