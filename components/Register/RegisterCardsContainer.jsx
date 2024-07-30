import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import LoginCard from "./LoginCard";
import SignupCard from "./SignupCard";


const RegisterCardsContainer = ({ anim }) => {

    return (
        <View style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View style={{
                ...styles.card,
                zIndex: anim.interpolate({ inputRange: [0.4, 0.5], outputRange: [4, 5] }),
                opacity: anim.interpolate({ inputRange: [0, 0.1], outputRange: [0, 1] }),
                transform: [
                    { perspective: 360 },
                    { rotateY: anim.interpolate({ inputRange: [0, 0.4, 0.8, 1], outputRange: ["0deg", '30deg', '20deg', "0deg"] }) },
                    { translateX: anim.interpolate({ inputRange: [0, 0.4, 0.8, 1], outputRange: [0, -200, -150, 0] }) },
                    { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) },
                ]
            }}>
                <LoginCard />
            </Animated.View>

            <Animated.View style={{
                ...styles.card,
                zIndex: anim.interpolate({ inputRange: [0.4, 0.5], outputRange: [5, 4] }),
                opacity: anim.interpolate({ inputRange: [0.9, 1], outputRange: [1, 0] }),
                transform: [
                    { perspective: 1000 },
                    { rotateY: anim.interpolate({ inputRange: [0, 0.4, 0.8, 1], outputRange: ["0deg", '-20deg', '-30deg', "0deg"] }) },
                    { translateX: anim.interpolate({ inputRange: [0, 0.4, 0.8, 1], outputRange: [0, 150, 200, 0] }) },
                    { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] }) },
                ]
            }}>
                <SignupCard />
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        borderColor: 'blue',
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#cccccce9',
        width: '100%',
        height: "80%",
        overflow: 'hidden',
        elevation: 5,
        maxWidth: 350,
    },
});


export default RegisterCardsContainer;