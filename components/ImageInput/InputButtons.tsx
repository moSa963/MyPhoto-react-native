import React, { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import MediaLibraryInput from "./MediaLibraryInput";
import CameraInput from "./CameraInput";
import { useTheme } from '@/hooks/ThemeContext';
import * as ImagePicker from "expo-image-picker";


interface InputButtonsProps {
    list: ImagePicker.ImagePickerAsset[],
    onChange: (list: ImagePicker.ImagePickerAsset[]) => void,
}

const InputButtons = ({ list, onChange }: InputButtonsProps) => {
    const { theme } = useTheme();

    const handleInput = (data: ImagePicker.ImagePickerAsset[]) => {
        onChange([...list, ...data]);
    }

    return (
        <Fragment>
            <MediaLibraryInput style={[styles.root, { borderColor: theme.colors.text }]} onInput={handleInput}>
                <Entypo name="images" size={35} color={theme.colors.text} />
            </MediaLibraryInput>

            <CameraInput style={[styles.root, { borderColor: theme.colors.text }]} onInput={handleInput}>
                <Entypo name="camera" size={35} color={theme.colors.text} />
            </CameraInput>
        </Fragment>
    );
}


const styles = StyleSheet.create({
    root: {
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