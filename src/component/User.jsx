import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { BASE_URL } from "../http/HttpRequest";
import Image from "./Image";


const User = ({ user, onPress, children, small }) => {
    const [theme, setTheme] = useTheme();
    const size = small ? 30 : 50;


    return (
        <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={() => onPress(user)}>
            <View style={styles.titleRoot}>
                <Image source={{ uri: BASE_URL + 'api/user/image/' + user.username }}
                    style={{ width: size, height: size, borderWidth: 2, borderColor: theme.colors.border, borderRadius: size / 2, }} />

                <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 15, alignItems: 'center' }} >
                    <View style={{ flex: 1 }}>
                        {
                            !small &&
                            <Text style={{ ...styles.titleText, color: theme.colors.text }}>
                                {user.first_name + " " + user.last_name}
                            </Text>
                        }
                        <Text style={{ ...styles.titleText, color: theme.colors.text, marginVertical: 5 }}>
                            {"@" + user.username}
                        </Text>

                    </View>

                    {children}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    titleRoot: {
        width: "100%",
        padding: 10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 15,
        flex: 1,
    },
});


export default User;