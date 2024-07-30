import React, { createContext, type PropsWithChildren } from "react";
import { DefaultTheme, DarkTheme, type Theme as NativeTheme } from "@react-navigation/native";

type ThemeType = "light" | "dark";
export type Theme = NativeTheme & { type: ThemeType, alpha: typeof alpha }

const alpha = (color: string, alpha: number) => {
    return color.split('(').join('a(').split(')').join(',' + alpha + ')');
}

export const Dark: Theme = {
    ...DarkTheme,
    type: "dark",
    alpha: alpha,
}

export const Light: Theme = {
    ...DefaultTheme,
    type: "light",
    alpha: alpha,
}

const Context = createContext<{
    theme: Theme,
    setThemeType: (type: ThemeType) => void
}>({
    theme: Light,
    setThemeType: (_: ThemeType) => { }
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [themeType, setThemeType] = React.useState<ThemeType>("light");

    const theme = React.useMemo(() => {
        switch (themeType) {
            case "dark": return Dark;
            default: return Light;
        }
    }, [themeType]);

    return (
        <Context.Provider value={{ theme, setThemeType }}>
            {children}
        </Context.Provider>
    );
}

export default ThemeProvider;


export const useTheme = () => React.useContext(Context);