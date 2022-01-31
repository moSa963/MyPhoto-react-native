import React from "react";
import { Animated } from "react-native";
import Svg, {Defs, ClipPath, G, Rect, Path as SvgPath} from "react-native-svg";
import { interpolate } from "../utils";
import Image from "./Image";

const AnimatedPath = Animated.createAnimatedComponent(SvgPath);

export const Path = ({ width, height, anim })=>{
    const ref = React.useRef();
    React.useEffect(()=>{
        const i = anim.addListener((v)=>{
            const x = v.x === 0 ? 0 : (v.x > 0 ? v.x : v.x);
            const width2 = interpolate(x, [-width, -width/2, 0],    [0,  width, width]);
            const offset = interpolate(x, [0, width/2, width],      [0,  0, width]);
            const x1     = interpolate(x, [-width, -width/2, 0],    [0, -width, 0]);
            const x2     = interpolate(x, [0, width/2, width],      [0, width, 0]);
            const y1     = interpolate(v.y, [-height/4, 0, height/4], [0, height / 2, height]);
            const y2     = interpolate(v.y, [-height/4, 0, height/4], [height, height / 2, 0]);

            ref.current.setNativeProps({
                d: `m 0 0 l ${width2 + offset} 0 q ${x1} ${y1} 0 ${height} l ${-width2} 0 q ${x2} ${-y2} 0 ${-height}`,
            });
        });
    
        return ()=>anim.removeListener(i);
    }, [anim, ref, width, height]);

    return (
        <AnimatedPath fill="#000" ref={ref} 
            d={`m 0 0 l ${width } 0 q ${0} ${height / 2} 0 ${height} l ${-width} 0 q ${0} ${-height / 2} 0 ${-height}`}
        />
    )
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const SvgSwip = ({ progress, source, width, height, backgroundColor, move, scale, action, index })=>{


    return (
        <AnimatedSvg style={{width:"100%", height:"100%", position: 'absolute',
            transform: [
                { translateX: move.x },
                { translateY: move.y },
                { scale: scale },
            ]}} 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${width} ${height}`} >

            <Defs > 
                <ClipPath
                    id="Mask"
                >
                    <Path anim={progress} height={height} width={width} />
                </ClipPath>
            </Defs>
            <G clipPath="url(#Mask)" clipRule="nonzero" >
                <Rect x={0} y={0} width={width} height={height} fill={action === 0 ? "#00000000": backgroundColor}/>
                <Image svg={true}
                    source={{ uri: source.uri }}
                    width="100%"
                    height="100%"
                    resizeMode="contain" />
            </G>
        
        </AnimatedSvg>
    );
}



export default SvgSwip;