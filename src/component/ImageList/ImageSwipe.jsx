import React from 'react';
import { Animated, View } from 'react-native';
import SvgSwip from './SvgSwipe';
import { PanGestureHandler, PinchGestureHandler, State } from "react-native-gesture-handler";

const ImageSwip = ({ source, index, onIndexChange, onStateChange, action, maxIndex, backgroundColor, header}) => {
    const anim = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const scale = React.useRef(new Animated.Value(1)).current;
    const move = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const [start, setStart] = React.useState({x: 0, y: 0});
    const [layout, setLayout] = React.useState({width: 1, height: 1});

    const handleImageEvent = (e)=>{
        Animated.event([{ nativeEvent: {scale: scale} }], { useNativeDriver: false })(e);
        move.setValue({x: e.nativeEvent.focalX - start.x, 
            y: e.nativeEvent.focalY - start.y});
    }

    const handleStart = (e)=>{
        setStart({x: e.nativeEvent.focalX, y: e.nativeEvent.focalY});
    }

    const resetScale = ()=>{
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: false,
        }).start();

        Animated.spring(move, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();

        setStart({x: 0, y: 0});
    }

    
    const handleSwipStateChange = (e)=>{
        if (e.nativeEvent.state !== State.ACTIVE && e.nativeEvent.state !== State.BEGAN){
            var toValue = Math.round(e.nativeEvent.translationX / layout.width) * layout.width;

            if (toValue === 0 && Math.abs(e.nativeEvent.velocityX) > 1000){
                if (e.nativeEvent.velocityX > 0){
                    toValue = layout.width;
                    onStateChange(-1);
                }else {
                    toValue = -layout.width;
                    onStateChange(1);
                }
            }

            if ((toValue > 0 && index <= 0) || (toValue < 0 && index >= maxIndex)){
                toValue = 0;
            }

            Animated.timing(anim, {
                toValue: {x: toValue, y: 0},
                duration: 300,
                useNativeDriver: false,
            }).start(()=>{
                if (toValue > 0){
                    onIndexChange(index - 1);
                }else if (toValue < 0){
                    onIndexChange(index + 1);
                }

                onStateChange(0);
                anim.setValue({x: 0, y: 0});
            });
        }
    }

    const handleSwip = (e)=>{
        if (e.nativeEvent.translationX < 0 && action != 1){
            onStateChange(1);
        }else if (e.nativeEvent.translationX > 0 && action != -1){
            onStateChange(-1);
        }
        Animated.event([{ nativeEvent: {translationX: anim.x, translationY: anim.y} }], { useNativeDriver: false })(e);
    }

  return (

    <View style={{width: '100%', height: '100%'}} onLayout={(e) => setLayout(e.nativeEvent.layout)} >
        <PinchGestureHandler
            onGestureEvent={handleImageEvent}
            onActivated={handleStart}
            onCancelled={resetScale}
            onEnded={resetScale}
            minPointers={2}
            maxPointers={2}
        >
            <PanGestureHandler
                minDist={30}
                onGestureEvent={handleSwip}
                onHandlerStateChange={handleSwipStateChange}
                minPointers={1}
                maxPointers={1}
            >
                <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Animated.View style={{width: '100%', height: '100%'}} >
                        <SvgSwip progress={anim}
                            scale={scale}
                            move={move}
                            header={header}
                            action={action}
                            backgroundColor={backgroundColor}
                            width={layout.width}
                            height={layout.height}
                            index={index}
                            source={source} />
                    </Animated.View>
                </View>
            </PanGestureHandler>
        </PinchGestureHandler>
    </View>
  );
}

export default ImageSwip;