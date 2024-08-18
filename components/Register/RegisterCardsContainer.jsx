import React, { useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import LoginCard from "./LoginCard";
import SignupCard from "./SignupCard";


const RegisterCardsContainer = ({ anim }) => {
    const [width, setWidth] = useState(0);

    return (
        <View style={{ width: '100%', flex: 1, overflow: "hidden" }}>
            <Animated.View style={{
                ...styles.card,
                transform: [
                    { translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [-(width / 2), 0] }) },
                ]
            }}
                onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
            >
                <Animated.View style={{ flex: 1, opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }}>
                    <LoginCard />
                </Animated.View>
                <Animated.View style={{ flex: 1, opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
                    <SignupCard />
                </Animated.View>
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "row",
        width: '200%',
        height: "100%",
    },
});


export default RegisterCardsContainer;