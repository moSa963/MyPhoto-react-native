import * as ImagePicker from "expo-image-picker";

export const launchCamera = async () => {
    const res = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
    });

    return res.assets;
}

export const launchLibrary = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
    });

    return res.assets;
}