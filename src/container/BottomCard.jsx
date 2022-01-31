import React from "react";
import { View, StyleSheet, Text, Animated, ScrollView } from "react-native";



const BottomCard = ({theme , open, children, onClose})=>{
    const anim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(()=>{
        Animated.timing(anim, 
        {
            toValue: open ? 100 : 0,
            duration: 500,
            useNativeDriver: false,
        }
        ).start();
    }, [anim, open]);

    const handlClose = ()=>{
        if (open){
            onClose();
        }
    }

    return (
        <Animated.View style={{...styles.root, zIndex: anim.interpolate({inputRange: [0, 1], outputRange: [0, 1]}), 
            backgroundColor: anim.interpolate({inputRange: [0, 100], outputRange: [theme.alpha(theme.colors.text, 0.0), theme.alpha(theme.colors.text, 0.2)]})}} 
            onTouchEnd={handlClose}>

            <View style={{...styles.root, position: 'relative', paddingHorizontal: 0}}>
        
                <Animated.View style={{...styles.card, backgroundColor: theme.colors.card, shadowColor: theme.colors.text,
                    bottom: anim.interpolate({inputRange: [0, 100], outputRange: ['-80%', '0%']}),
                }} onTouchEnd={(e)=>e.stopPropagation()}>
                    <ScrollView style={{flex: 1}}>
                        <View>
                            {children}
                        </View>
                    </ScrollView>
                    
                </Animated.View>

            </View>

        </Animated.View >

    );
}

const styles = StyleSheet.create({
    root:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 1,
    },
    card: {
        position: 'absolute',
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingTop: 35,
        padding: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.60,
        shadowRadius: 1.41,

        elevation: 15,
    }
});

export default BottomCard;