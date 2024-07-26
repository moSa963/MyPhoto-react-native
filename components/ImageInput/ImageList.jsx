import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Animated } from 'react-native';
import Icon from "react-native-vector-icons/Entypo";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ImageList = ({ list, onChange, theme }) => {
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [toValue, setToValue] = React.useState(0);
    const anim = React.useRef(new Animated.Value(0.5)).current;

    React.useEffect(() => {
        Animated.timing(anim,
            {
                toValue: deleteMode ? toValue : 0.5,
                duration: 1000,
                useNativeDriver: false,
            }
        ).start(() => {
            if (deleteMode) {
                setToValue(toValue == 1 ? 0 : 1);
            }
        });
    }, [anim, deleteMode, toValue]);


    const handleLongPress = () => {
        setDeleteMode(!deleteMode);
        setToValue(0);
    }

    const handleDelete = (_, index) => {
        list = list.filter((e, i) => i != index);
        setDeleteMode(list.length <= 0);
        onChange([...list]);
    }

    return (
        <React.Fragment>
            {
                list.map((e, i) => (
                    <AnimatedTouchableOpacity onLongPress={handleLongPress}
                        key={i}
                        style={[styles.itemCont, {
                            borderColor: theme.colors.text,
                            transform: [{
                                rotateZ: anim.interpolate({ inputRange: [0, 1], outputRange: ["-2deg", "2deg"] }),
                            }],
                        }]}
                    >
                        <Image style={{ resizeMode: "contain", width: "100%", height: "100%" }} source={{ uri: e.uri }} />
                        {
                            deleteMode &&
                            <View style={styles.delete} onTouchEnd={() => handleDelete(e, i)}>
                                <Icon name="cross" size={20} />
                            </View>
                        }
                    </AnimatedTouchableOpacity>
                ))
            }
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


export default ImageList;