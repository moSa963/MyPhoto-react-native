import { useAuth } from "@/hooks/AuthContext";
import { Redirect, Slot } from "expo-router";


const PostsLayout = () => {
    const auth = useAuth();

    if (auth.status !== "authenticated") {
        return <Redirect href="auth" />
    }

    return <Slot />
}


export default PostsLayout;