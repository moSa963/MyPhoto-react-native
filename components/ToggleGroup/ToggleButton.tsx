import React from "react";
import { Pressable, StyleSheet, ViewProps } from "react-native";

type ToggleButtonProps = ViewProps & {
    onPress?: (val: string | number) => void,
    value: string | number
}

const ToggleButton = ({ children, style, value, onPress, ...rest }: ToggleButtonProps) => {


    return (
        <Pressable {...rest}
            style={[style, styles.itemCont]}
            onPress={() => onPress && onPress(value)}>
            {children}
        </Pressable>
    );
}


const styles = StyleSheet.create({
    itemCont: {
        flex: 1,
        minHeight: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        gap: 5,
    },
});
export default ToggleButton;