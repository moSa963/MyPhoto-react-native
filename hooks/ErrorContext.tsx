import React, { createContext, type PropsWithChildren } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Button from "@/components/Buttons/Button";
import { useTheme, type Theme } from "./ThemeContext";

const Context = createContext<{
    setError: (error: string | string[] | any, action?: (() => Promise<void>) | null) => void
}>({
    setError: (_: string | string[] | any) => { }
});

const ErrorCardProvider = ({ children }: PropsWithChildren) => {
    const [error, setError] = React.useState<string | string[] | any>(null);
    const [action, setAction] = React.useState<(() => Promise<void>) | null>(null);
    const { theme } = useTheme();

    const handlePress = () => {
        action && action();

        setError(null);
        setAction(null);
    }

    const handleSetError = (error: string | string[] | any, action?: (() => Promise<void>) | null) => {
        setError(error);
        setAction(action || null);
    }

    return (
        <Context.Provider value={{ setError: handleSetError }}>
            {children}
            {
                error &&
                <View style={{ ...styles.root, backgroundColor: theme.alpha(theme.colors.text, 0.5) }}>
                    <View style={{ ...styles.card, backgroundColor: theme.colors.card }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                map(error, theme)
                            }

                        </ScrollView>
                        <Button onPress={handlePress} style={{}}>
                            <Text style={{ color: theme.colors.text }}>Ok</Text>
                        </Button>
                    </View>
                </View>
            }
        </Context.Provider>
    );
}

const map = (error: any, theme: Theme) => {
    const res: React.JSX.Element[] = []

    if (typeof error == "string") {
        res.push(<Text key={2} style={{ color: theme.colors.text, fontSize: 18 }}>{error}</Text>);
    } else if (Array.isArray(error)) {
        error.forEach((e, i) => {
            res.push(<Text key={i} style={{ color: theme.colors.text, fontSize: 18 }}>{e}</Text>);
        })
    } else {
        Object.keys(error).forEach((key, i) => {
            res.push(<Text key={`title${i}`} style={{ color: theme.colors.primary, fontSize: 20 }}>{key}</Text>);
            res.push(<Text key={i} style={{ color: theme.colors.text, fontSize: 18 }}>{error[key]}</Text>);
        })
    }

    return res;
}

const styles = StyleSheet.create({
    root: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        padding: 15,
        borderRadius: 25,
        elevation: 5,
        minHeight: '30%',
        maxHeight: '60%',
        width: '90%',
    }
});


export default ErrorCardProvider;

export function useErrorCard() { return React.useContext(Context) };