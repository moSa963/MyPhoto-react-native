import React from "react";
import { StatusBar, StyleSheet, View, Animated, Image } from "react-native";
import RegisterCardsContainer from "@/components/Register/RegisterCardsContainer";
import RegisterNavButton from "@/components/Register/RegisterNavButton";
import { useAuth } from "@/hooks/AuthContext";
import WaitingCard from "@/components/WaitingCard";
import { useTheme } from "@/hooks/ThemeContext";
import SvgBackground from "./partials/SvgBackground";
import SvgFooter from "./partials/SvgFooter";
import Logo from "./partials/Logo";

const Register = () => {
    const anim = React.useRef(new Animated.Value(0)).current;
    const [index, setIndex] = React.useState(false);
    const auth = useAuth();
    const { theme } = useTheme();

    React.useEffect(() => {
        Animated.spring(anim, {
            toValue: index ? 0 : 1,
            useNativeDriver: false,
        }).start();
    }, [index]);

    if (auth.status == "none") {
        return <WaitingCard />
    }

    return (
        <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
            <StatusBar backgroundColor="#00000000" translucent={true} />

            <View style={{ width: "100%", height: "25%", maxHeight: 300, paddingTop: "10%" }}>
                <Logo />
            </View>
            <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: theme.alpha(theme.colors.primary, 0.02) }}>
                <SvgBackground />
            </View>
            <View style={styles.cardCont} >
                <RegisterNavButton setIndex={setIndex} index={index} />
                <RegisterCardsContainer anim={anim} />
            </View>
            <View style={{ width: "100%", height: "10%", maxHeight: 100, display: "flex", justifyContent: "flex-end" }}>
                <SvgFooter />
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    root: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cardCont: {
        position: "relative",
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
        width: "100%"
    },
});

export default Register;