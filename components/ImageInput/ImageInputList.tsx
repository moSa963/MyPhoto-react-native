import React from 'react';
import { Animated } from 'react-native';
import ImageListCard from './ImageListCard';
import { ImagePickerAsset } from 'expo-image-picker';

interface ImageInputListProps {
    list: ImagePickerAsset[],
    onChange: (list: ImagePickerAsset[]) => void,
}

const ImageInputList = ({ list, onChange }: ImageInputListProps) => {
    const [editMode, setEditMode] = React.useState(false);
    const [toValue, setToValue] = React.useState(0);
    const anim = React.useRef(new Animated.Value(0.5)).current;

    React.useEffect(() => {
        Animated.timing(anim,
            {
                toValue: editMode ? toValue : 0.5,
                duration: 500,
                useNativeDriver: false,
            }
        ).start(() => {
            if (editMode) {
                setToValue(toValue == 1 ? 0 : 1);
            }
        });
    }, [anim, editMode, toValue]);


    const handleLongPress = () => {
        setEditMode(!editMode);
        setToValue(0);
    }

    const handleDelete = (_: any, index: number) => {
        list = list.filter((e, i) => i != index);
        setEditMode(list.length <= 0);
        onChange([...list]);
    }

    return (
        <React.Fragment>
            {
                list.map((e, i) => <ImageListCard
                    key={i}
                    uri={e.uri}
                    anim={anim}
                    onDelete={() => handleDelete(e, i)}
                    onLongPress={handleLongPress}
                    editMode={editMode}
                />)
            }
        </React.Fragment>
    );
}


export default ImageInputList;