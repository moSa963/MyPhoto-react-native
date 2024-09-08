import React from "react";
import { View, Animated, ViewProps } from "react-native";
import { useTheme } from "@/hooks/ThemeContext";

type ToggleGroupProps = ViewProps & {
    onChange: (i: number | string) => void,
    value: number | string,
    backgroundColor?: string,
    selectionColor?: string,
};

const ToggleGroup = ({ children, value, onChange, selectionColor, backgroundColor }: ToggleGroupProps) => {
    const { theme } = useTheme();
    const [layout, setLayout] = React.useState({ width: 300, height: 0 });
    const [index, setIndex] = React.useState({ old: 0, new: 0 });
    const anim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const i = getIndex(value);

        if (i == null) return;

        setIndex(val => ({ old: val.new, new: i }));
    }, [value]);

    React.useEffect(() => {
        const count = React.Children.count(children);

        Animated.spring(anim, {
            toValue: (layout.width / count) * index.new,
            useNativeDriver: false,
        }).start();
    }, [index]);

    const getInputRange = (i: { old: number, new: number }) => {
        if (i.old > i.new) {
            return getInputRange({ old: i.new, new: i.old });
        }
        const count = React.Children.count(children);
        const p1 = (layout.width / count) * i.old;
        const p2 = (layout.width / count) * i.new;

        return [p1, (p2 + p1) / 2, p2];
    }

    const getIndex = (val: number | string) => {
        let res = null;

        React.Children.forEach(children, (child, index) => {
            if (!React.isValidElement(child)) return;

            if (child.props.value == val) {
                res = index;
                return;
            }
        });

        return res;
    }

    return (
        <Animated.View onLayout={(e) => setLayout(e.nativeEvent.layout)}
            style={{ width: '100%', backgroundColor: backgroundColor || theme.colors.card }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <Animated.View
                    style={{
                        position: 'absolute',
                        height: '100%',
                        borderBottomWidth: 0.5,
                        borderColor: theme.colors.text,
                        width: layout.width / React.Children.count(children),
                        backgroundColor: selectionColor || theme.colors.background,
                        borderRadius: anim.interpolate(
                            { inputRange: getInputRange(index), outputRange: [0, 100, 0] }
                        ),
                        transform: [
                            { translateX: anim },
                            {
                                scaleY: anim.interpolate(
                                    { inputRange: getInputRange(index), outputRange: [1, 0.5, 1] }
                                )
                            }
                        ],
                    }}
                />
                {
                    React.Children.map(children, (child, i) => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { onPress: onChange })
                        }

                        return child;
                    })
                }
            </View>
        </Animated.View>
    )
}


export default ToggleGroup;