import React from "react";
import { View } from "react-native";
import ImageSwip from "@/components/ImageList/ImageSwipe";
import { getHeader } from "@/http/HttpRequest";
import Image from "@/components/ImageList/Image";


const ImageList = ({ list, onChange, backgroundColor }) => {
    const [index, setIndex] = React.useState(0);
    const [action, setAction] = React.useState(0);
    const [header, setHeader] = React.useState(null);

    React.useEffect(() => {
        getHeader()
            .then(res => {
                setHeader({ "Authorization": res["Authorization"] });
            });
    }, []);

    const handleIndexChanged = (i) => {
        setIndex(i);
        onChange && onChange(i);
    }

    const handleSwipStateChange = (action) => {
        setAction(action);
    }


    return (
        header &&
        <View style={{ width: '100%', aspectRatio: 1 }}>
            {
                index - 1 >= 0 &&
                <Image style={{ width: "100%", height: "100%", position: 'absolute', opacity: action === -1 ? 1 : 0 }}
                    source={{ uri: list[index - 1] }}
                    fadeDuration={0}
                    resizeMode={"contain"}
                />
            }

            {
                index - 1 < list.length &&
                <Image style={{ width: "100%", height: "100%", position: 'absolute', opacity: action === 1 ? 1 : 0 }}
                    source={{ uri: list[index + 1] }}
                    fadeDuration={0}
                    resizeMode={"contain"}
                />
            }

            <ImageSwip source={{ uri: list[index] }}
                backgroundColor={backgroundColor}
                maxIndex={list.length - 1}
                action={action}
                header={header}
                onStateChange={handleSwipStateChange}
                index={index}
                onIndexChange={handleIndexChanged}
            />
        </View>
    );
}

export default ImageList;