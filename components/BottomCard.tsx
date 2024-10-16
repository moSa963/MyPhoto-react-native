import { useTheme } from "@/hooks/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Dimensions, ViewProps } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { interpolate, runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type BottomCardProps = ViewProps & {
    onClosed?: () => void,
    open: boolean,
}

const BottomCard = ({ children, style, open, onClosed }: BottomCardProps) => {
    const { theme } = useTheme();
    const height = Dimensions.get("window").height * 0.95;

    const states = {
        up: height,
        mid_up: height * 0.80,
        mid: height * 0.65,
        mid_down: height * 0.35,
        down: 0,
    };

    const trans = useSharedValue(10);

    React.useEffect(() => {
        trans.value = withTiming(open ? states.mid : states.down);
    }, [trans, open]);

    const rootStyle = useAnimatedStyle(() => {
        return {
            display: trans.value <= 0 ? "none" : "flex",
            backgroundColor: `rgba(0, 0, 0, ${interpolate(trans.value, [0, states.mid], [0, 0.5])})`
        }
    });

    const cardStyle = useAnimatedStyle(() => ({
        height: trans.value
    }));

    const pan = Gesture.Pan()
        .onChange((e) => {
            var val = trans.value - e.changeY;

            val = Math.max(val, 0)
            val = Math.min(val, height)

            trans.value = val
        })
        .onFinalize((e) => {
            if (e.velocityY < -1500) {
                trans.value = withTiming(states.up);
            } else if (e.velocityY > 1500) {
                trans.value = withTiming(states.down);
            } else if (trans.value > states.mid_up) {
                trans.value = withTiming(states.up);
            } else if (trans.value > states.mid_down) {
                trans.value = withTiming(states.mid);
            } else {
                trans.value = withTiming(states.down);
            }
        })

    const handleOnClosed = () => {
        onClosed && onClosed();
    };

    useAnimatedReaction(
        () => trans.value,
        (cup, pre) => {
            if (pre != cup && cup <= 0) {
                runOnJS(handleOnClosed)();
            }
        }
    );
    return (
        <Animated.View style={[{ position: "absolute", width: "100%", height: "100%", zIndex: 10 }, rootStyle, style]}>
            <GestureHandlerRootView style={[{ width: "100%", height: "100%" }]} >
                <GestureDetector gesture={pan} >
                    <View style={{ position: 'relative', width: "100%", height: "100%" }}>

                        <Animated.View style={[styles.card, {
                            backgroundColor: theme.colors.card,
                            shadowColor: theme.colors.text,
                        }, cardStyle]}>
                            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", padding: 10 }}>
                                <Ionicons name="remove" size={35} />
                            </View>

                            <View style={{ width: "100%", flex: 1 }} >
                                {children}
                            </View>
                        </Animated.View>
                    </View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Animated.View >
    );
}

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 1,
    },
    card: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.60,
        shadowRadius: 1.41,
        elevation: 15,
        overflow: "hidden"
    }
});

export default BottomCard;