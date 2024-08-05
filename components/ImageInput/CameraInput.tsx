import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { launchCamera } from '../../utils/ImagePicker';
import * as ImagePicker from "expo-image-picker";

type CameraInputProps = Omit<PressableProps, "onPress"> & {
    onInput: (list: ImagePicker.ImagePickerAsset[]) => void,
}

const CameraInput = ({ onInput, children, ...rest }: CameraInputProps) => {
    const [lock, setLock] = React.useState(false);
    const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();

    const handlePress = async () => {
        if (lock) {
            return;
        }

        if (!cameraStatus?.granted) {
            const res = await requestCameraPermission();
            if (!res.granted) {
                return;
            }
        }

        setLock(true);

        const img = await launchCamera();

        if (img) {
            onInput(img);
        }

        setLock(false);
    }

    return (
        <Pressable {...rest}
            onPress={handlePress}>
            {children}
        </Pressable>
    );
}


export default CameraInput;