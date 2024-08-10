import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import ActionsButton, { ActionsButtonItem } from "@/components/Buttons/ActionsButton";


const RegisterNavButton = ({ setIndex, index }) => {

    return (
        <View style={styles.root}>
            <ActionsButton style={{ borderRadius: 10, height: 40 }}
                onPress={(i) => setIndex(i ? 0 : 1)}
                effectWidth={2}
                index={index}>
                <ActionsButtonItem style={{ backgroundColor: '#5555ff55' }}>
                    <Text style={{ color: 'white' }}>Sign up</Text>
                </ActionsButtonItem>
                <ActionsButtonItem style={{ backgroundColor: '#55ff5555' }}>
                    <Text style={{ color: 'white' }}>Login</Text>
                </ActionsButtonItem>
            </ActionsButton>
        </View >
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
});


export default RegisterNavButton;