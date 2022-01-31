import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";


const Button2 = ({ style, onPress, children, onLayout }) =>{

    const handlePress = ()=>{
        onPress && onPress();
    }

    const {borderRadius = 0, ...rest} = style;

    return (
        <TouchableOpacity activeOpacity={0.5}
            onLayout={(e)=>onLayout(e.nativeEvent.layout)}
            onPress={handlePress} >

            <View style={{...styles.root, ...style}} >
                <View style={{overflow: "hidden", borderRadius: borderRadius, width: '100%', height: '100%'}}>
                    {children}
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    root:{
        overflow: 'hidden',
    },
});

export default Button2;