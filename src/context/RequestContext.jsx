import React, { createContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Button from "../component/Button";
import request, { BASE_URL } from "../http/HttpRequest";
import { useTheme } from "./ThemeContext";

const Context = createContext();

const RequestProvider = ({ children }) => {
    const [error, setError] = React.useState("");
    const [theme] = useTheme();

    return (
        <Context.Provider value={(url = BASE_URL, method = "GET", data = null) => Request(setError, url, method, data)}>
            {children}
            {
                error != "" &&
                <View style={{...styles.card, backgroundColor: theme.colors.card }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text>{error}</Text>
                    </ScrollView>
                    <Button onPress={() => setError("") }>
                        <Text>Ok</Text>
                    </Button>
                </View>
            }
        </Context.Provider>
    );
}

const Request = async (setError, url = BASE_URL, method = "GET", data = null) => {
    try {
        const res = await request(url, method, data);

        if (res && (res.ok || res.status == 400)) return res;

        setError(res.statusText);
    } catch (e) {
        setError(e.message);
    }
    
    return { ok: false,  status: null, statusText: ""};
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 25,
        elevation: 1,
        width: '95%',
        height: '50%',
    }
});

export default RequestProvider;

export function useRequest() { return React.useContext(Context) };