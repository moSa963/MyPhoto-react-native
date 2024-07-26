import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Entypo";
import { launchCamera, launchLibrary } from '../../utils/ImagePicker';
import * as ImagePicker from "expo-image-picker";


const InputButtons = ({ list, theme, onChange}) => {
    const [lock, setLock] = React.useState(false);
    const [libraryStatus, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();
    const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();

    const handleStartPicker = async () => {
        if (lock) {
            return;
        }

        if (!libraryStatus.granted) {
            const res = await requestLibraryPermission();
            if (!res.granted) {
                return;
            }
        }

        setLock(true);

        const img = await launchLibrary();

        if (img) {
            onChange([...list, img[0]]);
        }

        setLock(false);
    }

    const handleStartCam = async () => {
        if (lock) {
            return;
        }

        if (!cameraStatus.granted) {
            const res = await requestCameraPermission();
            if (!res.granted) {
                return;
            }
        }

        setLock(true);

        const img = await launchCamera();

        if (img) {
            onChange([...list, img[0]]);
        }

        setLock(false);
    }

    return (
        <React.Fragment>

            <TouchableOpacity
                style={[styles.itemCont, { borderColor: theme.colors.text }]}
                onPress={handleStartPicker}>
                <Icon name="images" size={35} color={theme.colors.text} />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.itemCont, { borderColor: theme.colors.text }]}
                onPress={handleStartCam}>
                <Icon name="camera" size={35} color={theme.colors.text} />
            </TouchableOpacity>

        </React.Fragment>
    );
}


const styles = StyleSheet.create({
    itemCont: {
        width: '45%',
        height: '100%',
        aspectRatio: 1,
        borderRadius: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default InputButtons;