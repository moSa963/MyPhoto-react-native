import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/Home";
import Profile from "../screen/Profile";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useTheme } from "../context/ThemeContext";
import ButtomBar from "../component/ButtomBar";
import Search from "../screen/Search";

const BottomTab = createBottomTabNavigator();

const HomeRoutes = ({ navigation })=>{
    const [theme, setTheme] = useTheme();
    
    return (
        <BottomTab.Navigator initialRouteName="Home" tabBar={(props)=><ButtomBar {...props}/>}>
            <BottomTab.Screen name="Home" component={Home} 
                options={{
                    headerStyle:{
                    elevation: 0,
                    shadowOpacity: 0,
                },
                    headerRight: () => (
                        <TouchableOpacity style={{marginRight: 15}}
                            onPress={()=>navigation.push("CreatePost")}>
                            <Icon name="pluscircleo" size={25} color={theme.colors.text}/>
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ()=><Icon name="home" size={25}  color={theme.colors.text}/>
                }}
            />
            <BottomTab.Screen name="Search" component={Search} options={{
                headerStyle:{
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerShown: false,
                tabBarIcon: ()=><Icon name="search1" size={25} color={theme.colors.text}/>,
            }}/>
            <BottomTab.Screen name="Profile" component={Profile} options={{
                headerStyle:{
                        elevation: 0,
                        shadowOpacity: 0,
                },
                tabBarIcon: () => <Icon name="profile" size={25} color={theme.colors.text}/>,
            }} />
        </BottomTab.Navigator>
    );
}


export default HomeRoutes;