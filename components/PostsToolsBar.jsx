import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconMaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../context/ThemeContext";

const getTypeName = (index)=>{
    switch(index){
        case 0: return "posts";
        case 1: return "history";
        case 2: return "liked";
    }
}

const getSortName = (index)=>{
    switch(index){
        case 0: return "new";
        case 1: return "old";
        case 2: return "likes";
    }
}

const ToolsBar = ({ onChange })=>{
    const [theme] = useTheme();
    const [layout, setLayout] = React.useState({width: 300, height: 0}); 
    const [position, setPosition] = React.useState([0, 0]);
    const [position2, setPosition2] = React.useState(0);
    const anim = React.useRef(new Animated.Value(0)).current;
    const animCollapsed = React.useRef(new Animated.Value(layout.width)).current;
    const [collapsed, setCollapsed] = React.useState(false);

    React.useEffect(()=>{
        onChange&&onChange([getTypeName(position[1]), getSortName(position2)]);

        Animated.spring(anim, {
            toValue: (layout.width / 3) * position[1],
            useNativeDriver: false,
            speed: 0.5,
        }).start();
    }, [position]);

    React.useEffect(()=>{
        onChange&&onChange([getTypeName(position[1]), getSortName(position2)]);
        setCollapsed(false);
    }, [position2]);

    const getInputRange = ()=>{
        const p1 = (layout.width / 3) * position[0];
        const p2 = (layout.width / 3) * position[1];

        if (p1 > p2){
            return [p2, (p2 + p1) / 2, p1];
        }
        return [p1, (p2 + p1) / 2,  p2];
    }

    React.useEffect(()=>{
        Animated.spring(animCollapsed, {
            toValue: collapsed ? 0 : layout.width,
            useNativeDriver: true,
        }).start();
    }, [collapsed]);


    return (
        <View style={styles.root} >
            <Animated.View onLayout={(e)=>setLayout(e.nativeEvent.layout)}
                style={{flex: 1, height: '100%', flexDirection: 'row', backgroundColor: theme.colors.card}}>
                <View style={{width: '100%', height: '100%', flexDirection: 'row', opacity: collapsed ? 0 : 1}}>
                    <Animated.View 
                        style={{
                            position: 'absolute',
                            height: '100%',
                            borderBottomWidth: 0.5,
                            borderColor: theme.colors.text,
                            width: layout.width / 3,
                            backgroundColor: theme.colors.background,
                            borderRadius: anim.interpolate(
                                {inputRange: getInputRange(), outputRange: [0, 100, 0]}
                                ),
                                transform: [
                                    {translateX: anim},
                                    {scaleY: anim.interpolate(
                                        {inputRange: getInputRange(), outputRange: [1, 0.5, 1]}
                                        )}
                                    ],
                                }}
                                />
                    <TouchableOpacity style={{...styles.itemCont}}
                        onPress={()=>setPosition([position[1], 0])}>
                        <Icon  name="ios-menu-outline" color={theme.colors.text} size={20} />
                        <Text style={{color: theme.colors.text, marginLeft: 5}}>POSTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.itemCont}}
                        onPress={()=>setPosition([position[1], 1])}>
                        <IconMaterialIcons  name="history" color={theme.colors.text} size={20} />
                        <Text style={{color: theme.colors.text, marginLeft: 5}}>HISTORY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.itemCont}}
                        onPress={()=>setPosition([position[1], 2])}>
                        <IconMaterialIcons  name="heart-outline" color={theme.colors.text} size={20} />
                        <Text style={{color: theme.colors.text, marginLeft: 5}}>LIKED</Text>
                    </TouchableOpacity>
                </View>
                {
                    collapsed &&
                    <View style={{width: '100%', height: '100%', position: 'absolute', flexDirection: 'row', backgroundColor: theme.colors.background,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    opacity: collapsed ? 1 : 0}}>
                    <TouchableOpacity style={{...styles.itemCont2, backgroundColor: position2 == 0 ? theme.colors.background : theme.colors.card,
                        width: layout.width / 4,
                        
                        height: 40,
                        transform: [
                            {translateX: animCollapsed.interpolate({inputRange: [0, layout.width / 4, layout.width / 2, layout.width], outputRange: [0, 300, 300, 300]})}
                        ]
                    }} onPress={()=>setPosition2(0)}>
                        <Text style={{color: theme.colors.text}}>NEW</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.itemCont2, backgroundColor: position2 == 1 ? theme.colors.background : theme.colors.card,
                        width: layout.width / 4,
                        height: 40,
                        transform: [
                            {translateX: animCollapsed.interpolate({inputRange: [0, layout.width / 4, layout.width / 2, layout.width], outputRange: [0, 300/2, 300, 300]})}
                        ]
                    }} onPress={()=>setPosition2(1)}>
                        <Text style={{color: theme.colors.text}}>OLD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.itemCont2, backgroundColor: position2 == 2 ? theme.colors.background : theme.colors.card,
                        width: layout.width / 4,
                        height: 40,
                        transform: [
                            {translateX: animCollapsed.interpolate({inputRange: [0, layout.width / 4, layout.width / 2, layout.width], outputRange: [0, 300/4, 300/2, 300]})}
                        ]
                    }} onPress={()=>setPosition2(2)}>
                        <Text style={{color: theme.colors.text}}>LIKES</Text>
                    </TouchableOpacity>
                </View>
                    
                }
            </Animated.View>

            <TouchableOpacity style={{marginRight: 'auto', height: '100%', backgroundColor: theme.colors.background,
                alignItems: 'center', flexDirection: 'row'}} onPress={()=>setCollapsed(!collapsed)}>
                <Icon  name="ellipsis-vertical" color={theme.colors.text} size={25} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    root:{
        width: '100%',
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemCont:{
        flex: 1,
        minHeight: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
    },
    itemCont2:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 25,
    }
});


export default ToolsBar;