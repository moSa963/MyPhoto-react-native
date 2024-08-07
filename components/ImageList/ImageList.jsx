import React from "react";
import { View } from "react-native";
import ImageSwip from "@/components/ImageList/ImageSwipe";
import Image from "@/components/ImageList/Image";


const ImageList = ({ list, onChange, backgroundColor }) => {
    const [index, setIndex] = React.useState(0);
    const [action, setAction] = React.useState(0);
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        setImages(new Array(list.length));
    }, []);

    const handleIndexChanged = (i) => {
        setIndex(i);
        onChange && onChange(i);
    }

    const handleSwipStateChange = (action) => {
        setAction(action);
    }

    const handleImageLoaded = (image, index) => {
        images[index] = image;
        setImages([...images])
    }


    return (
        Boolean(images.length) &&
        <View style={{ position: "relative", width: '100%', aspectRatio: 1 }}>
            {
                action != 0 && index + action >= 0 && index + action < list.length &&
                < Image key={index + action}
                    style={{ position: 'absolute' }}
                    href={list[index + action]}
                    source={images[index + action]}
                    onImageLoaded={(image) => handleImageLoaded(image, index + action)}
                    contentFit="contain"
                />
            }

            <ImageSwip key={index}
                backgroundColor={backgroundColor}
                maxIndex={list.length - 1}
                action={action}
                onStateChange={handleSwipStateChange}
                index={index}
                onIndexChange={handleIndexChanged}
            >
                <Image
                    source={images[index]}
                    onImageLoaded={(image) => handleImageLoaded(image, index)}
                    svg={true}
                    href={list[index]}
                    contentFit="contain" />
            </ImageSwip>
        </View>
    );
}

export default ImageList;