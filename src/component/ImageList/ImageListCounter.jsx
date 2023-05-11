import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ImageListCounter = ({ style = {}, count, index, color }) => {
    const anim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(anim,
            {
                toValue: -index * 10,
                duration: 100,
                useNativeDriver: false,
            }
        ).start();
    }, [anim, index]);

    return (
        <View style={{ ...styles.root, ...style }}>
            <Animated.View style={{ aspectRatio: 1, height: 20, flexDirection: 'row', alignItems: 'center', left: anim }}>
                {
                    Array.from({ length: count }).map((_,i) => (
                        <Icon key={i}
                            name={i === index ? "radio-button-on" : "radio-button-off"}
                            size={10}
                            style={{ aspectRatio: 1, height: 10 }}
                            color={color}
                        />
                    ))
                }
            </Animated.View>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        overflow: 'visible',
        padding: 10,
        bottom: 0,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
});

export default ImageListCounter;