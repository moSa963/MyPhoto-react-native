import { useAuth } from "@/hooks/AuthContext";
import { Redirect, Slot } from "expo-router";



const AuthLayout = () => {
    const auth = useAuth();

    if (auth.status === "authenticated") {
        return <Redirect href="(tabs)" />
    }

    return <Slot />
}


export default AuthLayout;