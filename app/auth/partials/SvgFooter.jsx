import React from "react";
import { View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { useTheme } from "@/hooks/ThemeContext";

const SvgFooter = () => {
    const { theme } = useTheme();


    return (
        <Svg width="100%" height="100%" viewBox="0 0 100 31" fill="none" preserveAspectRatio="none" >
            <Path d="M100 43V3C85.5 16.8667 80.5 -5.53334 60.5 7.79999C45.5 24.3333 21 -5.53336 0 7.79998V43H100Z" fill={theme.alpha(theme.colors.primary, 0.3)} />
            <Path d="M101 0C93.896 9.9779 89.0723 13.5795 83.6478 10.4226C78.0003 7.13584 71.7014 3.47006 61.5 13.4587C53.9037 25.7558 43.8712 20.5759 33.0907 15.0099C22.5833 9.58483 11.3653 3.7929 0.999962 13.4587C11.3653 3.7929 22.5833 3.17591 33.0907 8.60097C43.8712 14.167 53.9037 19.3469 61.5 7.04979C71.7014 -2.93886 78.0003 0.726926 83.6478 4.01368C89.0723 7.17063 93.896 9.9779 101 0Z" fill="#784FAC50" />
        </Svg>
    );
}

export default SvgFooter;