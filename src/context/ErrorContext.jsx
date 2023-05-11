import React, { createContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Button from "../component/Buttons/Button";
import { useTheme } from "./ThemeContext";

const Context = createContext();

const ErrorCardProvider = ({ children }) => {
    const [error, setError] = React.useState("");
    const [theme] = useTheme();


    return (
        <Context.Provider value={{error, setError}}>
            {children}
            {
                error &&
                <View style={{...styles.card, backgroundColor: theme.colors.card }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{ color: theme.colors.text, fontSize: 18 }}>{error}</Text>
                    </ScrollView>
                    <Button onPress={() => setError("") }>
                        <Text style={{ color: theme.colors.text }}>Ok</Text>
                    </Button>
                </View>
            }
        </Context.Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 25,
        elevation: 3,
        maxHeight: '50%',
        width: '95%',
    }
});


export default ErrorCardProvider;

export function useErrorCard() { return React.useContext(Context) };