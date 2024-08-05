import { useTheme } from '@/hooks/ThemeContext';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Pressable, Image, Animated } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ImageListCardProps {
    uri: string,
    onDelete: () => void,
    anim: Animated.Value,
    onLongPress: () => void,
    editMode?: boolean,
}

const ImageListCard = ({ uri, onDelete, anim, onLongPress, editMode }: ImageListCardProps) => {
    const { theme } = useTheme();

    return (
        <AnimatedPressable onLongPress={onLongPress}
            style={[styles.itemCont, {
                borderColor: theme.colors.text,
                transform: [{
                    rotateZ: anim.interpolate({ inputRange: [0, 1], outputRange: ["-1deg", "1deg"] }),
                }],
            }]}
        >
            <Image style={{ objectFit: "contain", width: "100%", height: "100%" }} source={{ uri: uri }} />

            {
                editMode &&
                <View style={styles.delete} onTouchEnd={onDelete}>
                    <Entypo name="cross" size={20} />
                </View>
            }
        </AnimatedPressable>
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
    delete: {
        width: 25,
        height: 25,
        backgroundColor: '#ffaaaa99',
        borderColor: 'red',
        position: 'absolute',
        borderWidth: 1,
        left: -10,
        top: -10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default ImageListCard;