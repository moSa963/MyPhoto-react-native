import Button from "@/components/Buttons/Button";
import ThemedText from "@/components/ThemedText";
import { useAuth } from "@/hooks/AuthContext";
import { Request, useRequest } from "@/hooks/RequestContext";
import { useTheme } from "@/hooks/ThemeContext";
import User from "@/models/User";
import { launchLibrary } from "@/utils/ImagePicker";
import { ImagePickerAsset } from "expo-image-picker";
import React from "react";
import { StyleSheet, Switch, View, ViewProps } from "react-native";

export type SettingsCardProps = ViewProps & {
    user: User,
    updateUser: (user: User) => void
}

const SettingsCard = ({ user, updateUser }: SettingsCardProps) => {
    const { theme, setThemeType } = useTheme();
    const request = useRequest();
    const auth = useAuth();


    return (
        <React.Fragment>
            <View style={styles.cardItem}>
                <ThemedText style={{ color: theme.colors.text, marginRight: 15 }}>DarkTheme</ThemedText>
                <Switch value={theme.type === "dark" ? true : false} onChange={() => setThemeType(theme.type === "dark" ? "light" : "dark")} />
            </View>

            <View style={styles.cardItem}>
                <ThemedText style={{ color: theme.colors.text, marginRight: 15 }}>Private</ThemedText>
                <Switch value={user.private} onChange={() => updateRequest(request, { is_private: !user.private }, updateUser)} />
            </View>

            <Button onPress={() => startPicker((e) => updateRequest(request, { image: imageFileForm(e) }, updateUser))} >
                <ThemedText style={{ color: theme.colors.text }}>PROFILE IMAGE</ThemedText>
            </Button>

            <Button onPress={auth.logout} >
                <ThemedText style={{ color: theme.colors.text }}>LOGOUT</ThemedText>
            </Button>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const startPicker = async (onUploaded: (image: ImagePickerAsset[]) => void) => {
    const img = await launchLibrary();

    if (img) {
        onUploaded(img);
    }
}

const imageFileForm = (image: ImagePickerAsset[]) => {
    const [type] = image[0].uri.split('.').reverse();

    const file = {
        uri: image[0].uri,
        type: "image/" + type,
        name: ("profile." + type),
    };

    return file;
}

const updateRequest = async (request: Request, { is_private, image }: any, updateUser: (user: User) => void) => {
    const form = new FormData();
    is_private !== undefined && form.append("private", is_private);
    image !== undefined && form.append("image", image);

    const res = await request('api/users/', "PUT", form);

    if (res?.ok) {
        const js = await res.json();
        updateUser(js);
        return;
    }
}

export default SettingsCard;