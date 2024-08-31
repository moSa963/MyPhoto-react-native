import React from "react";
import { ImageStyle, Image as ReactImage, StyleProp, View } from "react-native";
import { Image as SvgImage } from "react-native-svg";
import WaitingCard from "@/components/WaitingCard";
import { useRequest } from "@/hooks/RequestContext";

export interface ImageProps {
    source?: string | null,
    href: string,
    svg?: boolean,
    contentFit?: "contain" | "cover" | "fill" | "scale-down",
    style?: StyleProp<ImageStyle>,
    onImageLoaded?: (image: string | null) => void,
}

const Image = ({ source, href, svg = false, contentFit = "cover", style, onImageLoaded }: ImageProps) => {
    const [image, setImage] = React.useState();
    const request = useRequest();

    React.useEffect(() => {
        if (source || image) return;

        loadImage(request, href, onImageLoaded || setImage);
    }, [source, href]);

    if (!source && !image) {
        return <View style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <WaitingCard />
        </View>
    }

    const props = {
        fadeDuration: 0,
        width: "100%",
        height: "100%",
        style: [{ objectFit: contentFit }, style]
    }

    if (svg) {
        return (
            <SvgImage {...props} href={{ uri: source || image }} />
        )
    }

    return (
        <ReactImage {...props} source={{ uri: source || image }} />
    );
}

const loadImage = async (request: any, uri: string, setImage: any) => {
    const res = await request(uri);

    if (res.ok) {
        const blob = await res.blob();
        setImage(await blobToBase64(blob));
    }
}

const blobToBase64 = (blob: any) => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

export default Image;