import { AuthStatus, useAuth } from "@/hooks/AuthContext";
import { Redirect, Slot } from "expo-router";
import { Fragment } from "react"



const PostsLayout = () => {
    const [auth] = useAuth();

    if (auth.status !== AuthStatus.AUTHENTICATED) {
        return <Redirect href="auth" />
    }

    return <Slot />
}


export default PostsLayout;