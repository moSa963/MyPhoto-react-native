import React from "react";
import { StatusBar, StyleSheet, Text, View, Animated, ImageBackground } from "react-native";
import RegisterCardsContainer from "@/components/Register/RegisterCardsContainer";
import RegisterNavButton from "@/components/Register/RegisterNavButton";
import { AuthStatus, useAuth } from "@/hooks/AuthContext";


const Register = () => {
    const anim = React.useRef(new Animated.Value(0.5)).current;
    const [index, setIndex] = React.useState(false);
    const [auth, setAuth] = useAuth();


    React.useEffect(() => {
        Animated.spring(anim, {
            toValue: index ? 0 : 1,
            useNativeDriver: false,
            stiffness: 50,
            mass: 1
        }).start();
    }, [index]);



    return (
        <View style={styles.root}>
            <StatusBar backgroundColor="#00000000" translucent={true} />

            <View style={styles.header}>
                <ImageBackground source={require("@/assets/images/rb.jpg")}
                    resizeMode="cover"
                    style={{ alignItems: 'center', width: "100%", height: "100%" }}>
                    <View style={{ width: '100%', height: '100%', backgroundColor: '#00000099', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title}>MY PHOTO</Text>
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.cardCont} >
                <RegisterNavButton setIndex={setIndex} index={index} />
                <RegisterCardsContainer anim={anim} auth={auth} setAuth={setAuth} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        height: '100%',
        backgroundColor: '#333',
    },
    header: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    title: {
        alignSelf: 'center',
        fontSize: 35,
        color: "#fff"
    },
    cardCont: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        marginTop: -75,
    },
});

export default Register;