import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import ImageSwip from "../component/ImageSwipe";
import Icon from "react-native-vector-icons/Ionicons";
import { getHeader } from "../http/HttpRequest";
import Image from "../component/Image";

export const ListCounter = ({ style = {}, count, index, color })=>{
    const anim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(()=>{
        Animated.timing(anim, 
        {
            toValue: -index * 10,
            duration: 100,
            useNativeDriver: false,
        }
        ).start();
    }, [anim, index]);

    const getItems = (count)=>{
        const list = [];
        for(var i = 0; i < count; ++i){
            list.push(
                <Icon key={i + 1} name={i === index ? "radio-button-on" : "radio-button-off"}
                    size={10} style={{aspectRatio: 1, height: 10}}
                    color={color}/>
            );
        }
        return list;
    }

    return (
        <View style={{...styles.counterRoot, ...style}}>
            <Animated.View style={{aspectRatio: 1, height: 20, flexDirection: 'row', alignItems: 'center',
                left: anim,}}>
                {
                    getItems(count)
                }
            </Animated.View>
        </View>
    )
}


const ImageList = ({ list, onChange, backgroundColor })=>{
    const [index, setIndex] = React.useState(0);
    const [action, setAction] = React.useState(0);
    const [header, setHeader] = React.useState(null);


    React.useEffect(()=>{
        getHeader()
        .then(res => {
            setHeader({"Authorization": res["Authorization"]});
        });
    }, []);

    const handleIndexChanged = (i)=>{
        setIndex(i);
        onChange&&onChange(i);
    }

    const handleSwipStateChange = (action)=>{
        setAction(action);
    }

    
    return(
        header &&
        <View style={{width: '100%', aspectRatio: 1}}>
            {index - 1 >= 0 && <Image style={{width: "100%", height: "100%", position: 'absolute', opacity: action === -1 ? 1 : 0}}
                                        source={{ uri: list[index - 1] }} 
                                        fadeDuration={0}
                                        resizeMode={"contain"} />}
            {index - 1 < list.length && <Image style={{width: "100%", height: "100%", position: 'absolute', opacity: action === 1 ? 1 : 0}}
                                                source={{uri: list[index + 1] }} 
                                                fadeDuration={0}
                                                resizeMode={"contain"} />}
            <ImageSwip source={{ uri: list[index] }}
                backgroundColor={backgroundColor}
                maxIndex={list.length - 1}
                action={action}
                header={header}
                onStateChange={handleSwipStateChange}
                index={index} 
                onIndexChange={handleIndexChanged}/>
        </View>
    );
}


const styles = StyleSheet.create({
    root:{
        position: "relative",
        width: '100%',
        overflow: 'visible',
    },
    counterRoot:{
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

export default ImageList;