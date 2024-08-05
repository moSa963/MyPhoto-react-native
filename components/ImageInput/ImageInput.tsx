import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import ImageInputList from './ImageInputList';
import InputButtons from './InputButtons';
import { ImagePickerAsset } from "expo-image-picker";
import { useTheme } from '@/hooks/ThemeContext';

type CameraInputProps = ViewProps & {
    list: ImagePickerAsset[],
    onChange: (list: ImagePickerAsset[]) => void,
    max?: number,
}

const ImageInput = ({ onChange, list, max = 5 }: CameraInputProps) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.root, { borderColor: theme.colors.text }]}>
            {
                list.length < max &&
                <InputButtons list={list} onChange={onChange} />
            }

            <ImageInputList list={list} onChange={onChange} />
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        position: 'relative',
        borderWidth: 0.5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        marginVertical: 25,
    },
});


export default ImageInput;