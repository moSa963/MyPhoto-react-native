import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";


const Button = ({children, style, ...rest}) => {
    const color = useThemeColor();

    return (
        <TouchableOpacity style={{  ...style}} activeOpacity={.5} {...rest}>
            <View style={{ ...styles.root, borderColor: color.tint }}>
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