import React from "react";
import { StatusBar, StyleSheet, Text, View, Animated, ImageBackground, ActivityIndicator } from "react-native";
import LoginCard from "../component/LoginCard";
import back from "../../assets/rb.jpg";
import ButtonActions from "../component/ButtonActions";
import SignupCard from "../component/SignupCard";
import { AuthStatus } from "../context/AuthContext";


const NavButton = ({ setIndex, index }) => {

    return (
        <Animated.View style={styles.toolBar}>
            <ButtonActions style={{borderRadius: 10, height: 40}}
                onPress={() => setIndex(index ? 0 : 1)}
                effectWidth={2}
                index={index}>
                <View style={{backgroundColor: '#5555ff55', width: '100%', height: 40, padding: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={{color: 'white'}}>Signup</Text>
                </View>
                <View style={{backgroundColor: '#55ff5555', width: '100%', height: 40, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>Login</Text>
                </View>
            </ButtonActions>
        </Animated.View>
    );
}


const Cards = ({ auth, anim, setAuth })=>{

    return (
        <View style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View style={{...styles.card,
                zIndex: anim.interpolate({inputRange: [0.4, 0.5], outputRange: [4, 5]}),
                opacity: anim.interpolate({inputRange: [0, 0.1], outputRange: [0, 1]}),
                transform: [
                    {perspective: 360},
                    {rotateY: anim.interpolate({inputRange: [0, 0.4, 0.8, 1], outputRange: ["0deg", '30deg', '20deg', "0deg"]})},
                    {translateX: anim.interpolate({inputRange: [0, 0.4, 0.8, 1], outputRange: [0, -200, -150, 0]})},
                    {scale: anim.interpolate({inputRange: [0, 1], outputRange: [0.7, 1]})},
                ]
            }}>
                <LoginCard auth={auth} setAuth={setAuth}/>
            </Animated.View>
            
            <Animated.View style={{...styles.card, 
                zIndex: anim.interpolate({inputRange: [0.4, 0.5], outputRange: [5, 4]}),
                opacity: anim.interpolate({inputRange: [0.9, 1], outputRange: [1, 0]}),
                transform: [
                    {perspective: 1000},
                    {rotateY: anim.interpolate({inputRange: [0, 0.4, 0.8, 1], outputRange: ["0deg", '-20deg', '-30deg', "0deg"]})},
                    {translateX: anim.interpolate({inputRange: [0, 0.4, 0.8, 1], outputRange: [0, 150, 200, 0]})},
                    {scale: anim.interpolate({inputRange: [0, 1], outputRange: [1, 0.7]})},
                ]
            }}>
                <SignupCard auth={auth} setAuth={setAuth} />
            </Animated.View>
        </View>
    );
}


const Register = ({ auth, setAuth })=>{
    const anim = React.useRef(new Animated.Value(0.5)).current;
    const [index, setIndex] = React.useState(false);

    React.useEffect(()=>{
        Animated.spring(anim,{
            toValue: index ? 0 : 1,
            useNativeDriver: false,
            stiffness: 50,
            mass: 1
        }).start();
    }, [index]);



    return (
        <View style={styles.root}>
            <StatusBar  backgroundColor="#00000000"  translucent={true} />

            <View style={styles.header}>
                <ImageBackground source={back} 
                    resizeMode="cover"
                    style={{ alignItems: 'center', width: "100%", height:"100%" }}>
                    <View style={{ width: '100%', height: '100%', backgroundColor: '#00000099', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title}>MY PHOTO</Text>
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.cardCont} >
                <NavButton setIndex={setIndex} index={index}/>
                <Cards anim={anim} auth={auth} setAuth={setAuth} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root:{
        display: 'flex',
        height: '100%',
        backgroundColor: '#333',
    },
    header:{
        width: '100%',
        height: '30%',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    title:{
        alignSelf: 'center',
        fontSize: 35,
        color: "#fff"
    },
    toolBar:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    cardCont:{
        display: 'flex',
        alignItems:'center',
        flex: 1,
        marginTop: -75,
    },
    card:{
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

export default Register;