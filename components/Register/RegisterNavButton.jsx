import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import ButtonActions from "@/components/Buttons/ButtonActions";


const RegisterNavButton = ({ setIndex, index }) => {

    return (
        <Animated.View style={styles.root}>
            <ButtonActions style={{borderRadius: 10, height: 40}}
                onPress={() => setIndex(index ? 0 : 1)}
                effectWidth={2}
                index={index}>
                <View style={{backgroundColor: '#5555ff55', width: '100%', height: 40, padding: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={{color: 'white'}}>Signup</Text>
                </View>
                <View style={{backgroundColor: '#55ff5555', width: '100%', height: 40, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>Login</Text>
                </View>
            </ButtonActions>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    root:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
});


export default RegisterNavButton;