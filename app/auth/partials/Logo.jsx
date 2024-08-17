import React from "react";
import { Image } from "react-native";

const Logo = () => {

    return (
        <Image source={require("@/assets/images/icon.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    );
}

export default Logo;