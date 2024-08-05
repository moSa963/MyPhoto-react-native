import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { launchLibrary } from '../../utils/ImagePicker';
import * as ImagePicker from "expo-image-picker";

type MediaLibraryInputProps = Omit<PressableProps, "onPress"> & {
    onInput: (list: ImagePicker.ImagePickerAsset[]) => void,
}

const MediaLibraryInput = ({ onInput, children, ...rest }: MediaLibraryInputProps) => {
    const [lock, setLock] = React.useState(false);
    const [libraryStatus, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();

    const handlePress = async () => {
        if (lock) {
            return;
        }

        if (!libraryStatus?.granted) {
            const res = await requestLibraryPermission();
            if (!res.granted) {
                return;
            }
        }

        setLock(true);

        const img = await launchLibrary();

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


export default MediaLibraryInput;