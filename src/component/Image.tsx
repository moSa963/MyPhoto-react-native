import React, { Fragment } from "react";
import { ImageProps, Image as ReactImage } from "react-native";
import { getHeader } from "../http/HttpRequest";
import {Image as SvgImage} from "react-native-svg"; 
import WaitingCard from "./WaitingCard";

interface props extends ImageProps{
    uri: string,
    svg: boolean
}


const Image = ({ source, svg = false, ...rest }: props) => {
    const [token, setToken] = React.useState();

    React.useEffect(()=>{
        getHeader()
        .then(res => {
            setToken(res?.Authorization);
        });
    }, []);

    if (!token) return <WaitingCard />;
    
    if (svg) {
        //for some reason svg image headers is not bing send with the request
        //return react image with style as display none to temporarily solve the problem

        return (
            <Fragment>
                <ReactImage  {...rest} source={{uri: source.uri, headers: { "Authorization": token }}} style={{ display: 'none' }}/>
                <SvgImage {...rest} href={{ uri: source.uri, headers: { "Authorization": token } }} />
            </Fragment>
        )
    }

    return(
        <ReactImage {...rest} source={{uri: source.uri, headers: {"Authorization": token}}} />
    );
}

export default Image;