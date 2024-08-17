import React from "react";
import { Animated, View, ViewProps } from "react-native";
import Button, { ButtonProps } from "./Button";

type ActionsButtonProps = Omit<ButtonProps, "onPress"> & {
    index: number,
    onPress?: (i: number) => void
}

const ActionsButton = ({ index, style, onPress, children, ...rest }: ActionsButtonProps) => {
    const anim = React.useRef(new Animated.Value(0)).current;
    const [offset, setOffset] = React.useState(0);

    React.useEffect(() => {
        Animated.spring(anim, {
            toValue: index * -offset,
            useNativeDriver: false,
            mass: 1,
        }).start();
    }, [index, offset]);

    return (
        <Button
            {...rest}
            style={[{ height: 35 }, style]}
            onPress={() => onPress && onPress(index)} >
            <Animated.View style={{
                width: '100%', height: "100%",
                transform: [
                    { translateY: anim },
                ]
            }} onLayout={(layout) => setOffset(layout.nativeEvent.layout.height)}>
                {children}
            </Animated.View>
        </Button>
    );
}

export const ActionsButtonItem = ({ children, style, ...rest }: ViewProps) => {

    return (
        <View {...rest} style={[{ width: '100%', height: '100%', padding: 2, justifyContent: 'center', alignItems: 'center' }, style]} >
            {children}
        </View>
    );
}

export default ActionsButton;