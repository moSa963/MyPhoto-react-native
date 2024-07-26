import React from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";


const ButtomBar = ({ state, descriptors, navigation })=>{
    const anim = React.useRef(new Animated.Value(0)).current;
    const anim2 = React.useRef(new Animated.Value(0)).current;
    const windowWidth = Dimensions.get("window").width;

    const [theme] = useTheme();

    React.useEffect(()=>{
        Animated.spring(anim,{
            toValue: (windowWidth / state.routes.length) * state.index,
            speed: 0.1,
            useNativeDriver: false,
        }).start();
        Animated.spring(anim2,{
            speed: 0.1,
            toValue: 1,
            useNativeDriver: false,
        }).start(()=>anim2.setValue(0));
    }, [state.index]);

    return (
        <View style={{...styles.root, backgroundColor: theme.colors.card}}>
          <Animated.View style={{...styles.back, width: (100 / state.routes.length) + "%" ,
            backgroundColor: theme.colors.background,
            height: anim2.interpolate({inputRange: [0, 0.5, 1], outputRange: ["100%", "50%", "100%"]}),
            borderRadius: anim2.interpolate({inputRange: [0, 0.5, 1], outputRange: [0, 100, 0]}),
            transform:[
                {translateX: anim}
            ]

        }}/>
            
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
    
            const isFocused = state.index === index;
    
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: route.name, merge: true });
              }
            };
    
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
    
            return (
              <TouchableOpacity
                accessibilityRole="button"
                key={index}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.item}
              >
                {options.tabBarIcon()}
                <Text style={{ color: isFocused ? '#673ab7' : theme.colors.text }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
    )
}

const styles = StyleSheet.create({

    root:{
        height: 50,
        flexDirection: 'row',
        elevation: 10,
        overflow: 'hidden',
        alignItems: 'center',
    },
    item:{
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    back:{
        position: 'absolute',
        height: '100%',
    }
});

export default ButtomBar;