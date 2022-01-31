import React from "react";
import { StyleSheet, View, ViewStyle, ViewProps } from "react-native";
import { useTheme } from "../context/ThemeContext";
import TextInput from "./TextInput";

interface props extends ViewProps{
    onTextChange: Function,
}

const SearchBar = ({ onTextChange, ...rest }: props)=>{
    const [theme] = useTheme();
    const [text, setText] = React.useState("");

    React.useEffect(()=>{
        const id = setTimeout(() => {
            onTextChange(text === '' ? null : text);
        }, 400);

        return () => clearTimeout(id);
    }, [text, onTextChange]);

    return (
        <View {...rest}>
            <TextInput placeholder="Search..." theme={theme} onChangeText={setText}/>
        </View>
    );
}

export default SearchBar;