import { useTheme } from "@/hooks/ThemeContext"
import { RefreshControl, RefreshControlProps } from "react-native"




const ThemedRefreshControl = ({ onRefresh, refreshing, ...rest }: RefreshControlProps) => {
    const { theme } = useTheme();

    return <RefreshControl {...rest} progressBackgroundColor={theme.colors.background} colors={[theme.colors.text]} onRefresh={onRefresh} refreshing={refreshing} />
}


export default ThemedRefreshControl;