import { AuthStatus, useAuth } from "@/hooks/AuthContext";
import { Redirect, Slot } from "expo-router";
import { Fragment } from "react"



const AuthLayout = () => {
    const [auth, setAuth] = useAuth();

    if (auth.status === AuthStatus.AUTHENTICATED) {
        return <Redirect href="(tabs)" />
    }

    return <Slot />
}


export default AuthLayout;