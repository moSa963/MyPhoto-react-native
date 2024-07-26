import React from "react";
import { Animated } from "react-native";
import Button2 from "./Button2";


const ButtonActions = ({ index, style, effectWidth = 2, onPress, children }) =>{
    const anim = React.useRef(new Animated.Value(0)).current;
    const [offset, setOffset] = React.useState(0);

    React.useEffect(()=>{
        Animated.spring(anim, {
            toValue: index * -offset,
            useNativeDriver: false,
            mass: 1,
        }).start();
    }, [index, offset]);

    return (
        <Button2 
            onLayout={(layout)=>setOffset(layout.height)}
            style={{ ...style,}} 
            effectWidth={effectWidth} 
            onPress={onPress} >
            
            <Animated.View style={{width: '100%', overflow: 'hidden',
                transform:[
                    {translateY: anim},
                ]
            }}>
                {children}
            </Animated.View>
        </Button2>
    );
}

export default ButtonActions;