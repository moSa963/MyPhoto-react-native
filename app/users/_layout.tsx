import { useAuth } from "@/hooks/AuthContext";
import { Redirect, Slot } from "expo-router";



const UsersLayout = () => {
    const auth = useAuth();

    if (auth.status !== "authenticated") {
        return <Redirect href="auth" />
    }

    return <Slot />
}


export default UsersLayout;