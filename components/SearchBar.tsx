import React from "react";
import { View, ViewProps } from "react-native";
import TextInput from "@/components/TextInput";

export type SearchBarProps = ViewProps & {
    onTextChange: (key: string | null) => void,
}

const SearchBar = ({ onTextChange, ...rest }: SearchBarProps) => {
    const [text, setText] = React.useState("");

    React.useEffect(() => {
        const id = setTimeout(() => {
            onTextChange(text === '' ? null : text);
        }, 400);

        return () => clearTimeout(id);
    }, [text, onTextChange]);

    return (
        <View {...rest}>
            <TextInput placeholder="Search..." onChangeText={setText} />
        </View>
    );
}

export default SearchBar;