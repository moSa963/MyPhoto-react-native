import React, { createContext, type PropsWithChildren } from "react";
import * as SecureStore from "expo-secure-store";
import { useRequest } from "./RequestContext";
import Auth from "@/models/Auth";

type AuthStatus = "waiting" | "authenticated" | "unverified" | "unauthenticated";

type AuthState = {
    status: AuthStatus, errors: Object | null, user: Auth | null
}

interface AuthContext {
    status: AuthStatus,
    errors: Object | null,
    user: Auth | null,
    login: (user: Auth) => Promise<void>
    register: (user: Auth) => Promise<void>
    logout: () => Promise<void>
}

const Context = createContext<AuthContext>({
    status: "unauthenticated",
    errors: null,
    user: null,
    login: async (_: Auth) => { },
    register: async (_: Auth) => { },
    logout: async () => { },
});

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [auth, setAuth] = React.useState<AuthState>({ status: "unauthenticated", errors: null, user: null });
    const request = useRequest();

    React.useEffect(() => {
        getUser(request, setAuth);
    }, [request]);

    return (
        <Context.Provider value={{
            ...auth,
            login: async (user: Auth) => login(request, setAuth, auth, user),
            register: async (user: Auth) => register(request, setAuth, auth, user),
            logout: async () => logout(request, auth),
        }}>
            {children}
        </Context.Provider>
    );
}

const getUser = async (request: any, setAuth: any) => {
    const res = await request("api/users", "GET", null, "none");
    const js = await res.json();

    if (res.ok) {
        return setAuth({ status: "authenticated", errors: null, user: js });
    }

    return setAuth({ status: "unauthenticated", errors: js, user: null });
}

export const login = async (request: any, setAuth: any, auth: AuthState, user: Auth) => {
    const form = new FormData();
    form.append("username", user.username);
    form.append("password", user.password!);

    return await handelRequest(() => request("api/users/login/", "POST", form), auth, setAuth)
}

export const register = async (request: any, setAuth: any, auth: AuthState, user: Auth) => {
    const form = new FormData();
    form.append("first_name", user.first_name);
    form.append("last_name", user.last_name);
    form.append("username", user.username);
    form.append("email", user.email!);
    form.append("password", user.password!);
    form.append("password_confirmation", user.password!);

    return await handelRequest(() => request("api/users/register/", "POST", form), auth, setAuth)
}


export const logout = async (setAuth: any, auth: AuthState) => {
    if (auth.status == "waiting") return;

    setAuth({ status: "waiting", errors: null, user: null });

    await SecureStore.deleteItemAsync('access_key');
    await SecureStore.deleteItemAsync('refresh_key');

    setAuth({ status: "unauthenticated", errors: null, user: null });
}


const handelRequest = async (request: any, auth: AuthState, setAuth: any) => {
    if (auth.status == "waiting") return;

    setAuth({ status: "waiting", errors: null, user: null });

    const response = await request()

    if (response.ok) {
        const js = await response.json();
        await SecureStore.setItemAsync('access_key', js.access);
        await SecureStore.setItemAsync('refresh_key', js.refresh);
        return setAuth({ status: "authenticated", errors: null, user: js });
    } else if (response.status === 400) {
        const js = await response.json();
        return setAuth({ status: "unauthenticated", errors: js, user: null });
    }

    setAuth({ status: "unauthenticated", errors: { "error": response.statusText }, user: null });
}

export default AuthProvider;

export function useAuth() { return React.useContext(Context) };