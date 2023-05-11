import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageList from './ImageList';
import InputButtons from './InputButtons';


const ImageInput = ({ onChange, theme, list }) => {

    return (
        <View style={[styles.root, { borderColor: theme.colors.text }]}>
            {
                list.length < 5 && 
                    <InputButtons list={list} theme={theme} onChange={onChange}/>
            }

            <ImageList list={list} onChange={onChange} theme={theme}/>
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