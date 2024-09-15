import { useTheme } from "@/hooks/ThemeContext";
import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Gesture, GestureDetector, GestureEvent, GestureHandlerRootView, HandlerStateChangeEvent, PanGestureHandler, PanGestureHandlerEventPayload, ScrollView } from "react-native-gesture-handler";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withClamp, withTiming } from "react-native-reanimated";



const BottomCard = () => {
    const { theme } = useTheme();
    const height = Dimensions.get("window").height * 0.75;

    const states = {
        up: height,
        mid_up: height * 0.80,
        mid: height * 0.65,
        mid_down: height * 0.35,
        down: 0,
    };

    const trans = useSharedValue(0);

    React.useEffect(() => {
        trans.value = withTiming(states.mid);
    }, []);

    const backStyle = useAnimatedStyle(() => {
        const backgroundColor = `rgba(0, 0, 0, ${interpolate(trans.value, [0, states.mid], [0, 0.5])})`;

        return {
            backgroundColor
        }
    });

    const cardStyle = useAnimatedStyle(() => ({
        height: trans.value
    }));

    const pan2 = Gesture.Pan();

    const pan = Gesture.Pan().onChange((e) => {
        var val = trans.value - e.changeY;

        val = Math.max(val, 0)
        val = Math.min(val, height)

        trans.value = val

    }).onFinalize((e) => {
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

    return (
        <GestureHandlerRootView style={{ position: "absolute", width: "100%", height: "100%", zIndex: 10, }} >
            <Animated.View style={[{
                width: "100%",
                height: "100%",

            }, backStyle]}>
                <GestureDetector gesture={pan} >
                    <View style={{ position: 'relative', width: "100%", height: "100%" }}>

                        <Animated.View style={[styles.card, {
                            backgroundColor: theme.colors.card,
                            shadowColor: theme.colors.text,

                        }, cardStyle]}>

                            <View style={{ backgroundColor: "red", width: "100%", height: 50 }}>

                            </View>

                            <ScrollView style={{ width: "100%", flex: 1 }} >
                            </ScrollView>

                            <View style={{ backgroundColor: "blue", width: "100%", height: 50 }}>

                            </View>

                        </Animated.View>

                    </View>
                </GestureDetector>
            </Animated.View >
        </GestureHandlerRootView>
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