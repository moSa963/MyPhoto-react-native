import React, { Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStatus, useAuth } from "../context/AuthContext";
import { Themes, useTheme } from "../context/ThemeContext";
import Register from "../screen/Register";
import HomeRoutes from "./HomeRoutes";
import CreatePost from "../screen/CreatePost";
import ShowPost from "../screen/ShowPost";
import ShowUser from "../screen/ShowUser";
import ShowUserList from "../screen/ShowUserList";
import { StatusBar, View } from "react-native";

const Stack = createNativeStackNavigator();

const Root = ()=>{
    const [theme] = useTheme();
    const [auth, setAuth] = useAuth();

    return (
        <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <StatusBar 
                barStyle={theme.type === Themes.dark ? "light-content" : "dark-content"}
                backgroundColor="#00000000"
                translucent={true}
            />
            {
                auth.status !== AuthStatus.AUTHENTICATED ?
                    <Register auth={auth} setAuth={setAuth}/> :
                    <NavigationContainer theme={theme} >
                        <Stack.Navigator initialRouteName="HomeRoutes" >
                            <Stack.Screen name="HomeRoutes" component={HomeRoutes} options={{ headerShown: false }}/>
                            <Stack.Screen name="CreatePost" component={CreatePost} />
                            <Stack.Screen name="ShowPost" component={ShowPost} />
                            <Stack.Screen name="ShowUser" component={ShowUser} />
                            <Stack.Screen name="UsersList" component={ShowUserList} />
                        </Stack.Navigator>
                    </NavigationContainer>
            }
        </View>
    );
}

export default Root;