import React from "react";
import { View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import TextInput from "./TextInput";


const SearchBar = ({ onTextChange, ...rest })=>{
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