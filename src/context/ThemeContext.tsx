import React, {createContext} from "react";
import { DefaultTheme, DarkTheme  } from "@react-navigation/native";

const Context = createContext({});

export const Themes = {
    light: 0,
    dark: 1,
}

const alpha = (color: String, alpha: Number)=>{
    return color.split('(').join('a(').split(')').join(',' + alpha + ')');
}

export const Dark = {
    ...DarkTheme,
    type: Themes.dark,
    alpha: alpha,
}

export const Light = {
    ...DefaultTheme,
    type: Themes.light,
    alpha: alpha,

}

const ThemeProvider = (props) => {
    const [themeType, setThemeType] = React.useState(Themes.light);

    const theme = React.useMemo(()=>{
        switch(themeType){
            case Themes.dark : return Dark;
            default: return Light;
        }
    }, [themeType]);
    
    return (
        <Context.Provider value={[theme, setThemeType]}>
            {props.children}
        </Context.Provider>
    );
}

export default ThemeProvider;


export const useTheme = () : [typeof Light, (theme: typeof Themes) => void] => React.useContext(Context);