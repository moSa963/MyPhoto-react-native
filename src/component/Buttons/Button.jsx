import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";


const Button = ({children, style, ...rest}) => {
    const [theme] = useTheme();

    return (
        <TouchableOpacity style={{  ...style}} activeOpacity={.5} {...rest}>
            <View style={{ ...styles.root, borderColor: theme.alpha(theme.colors.text, 0.5) }}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root:{
        padding: 10, 
        borderRadius: 10, 
        borderWidth: 1, 
        margin: 5, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});


export default Button;