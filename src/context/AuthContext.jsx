import React, { createContext } from "react";
import getUser, { login, logout, regester } from "../http/Authentication";
import * as SecureStore from "expo-secure-store";
import { useRequest } from "./RequestContext";

const Context = createContext();

export const AuthStatus = {
    WAITING: 0,
    AUTHENTICATED: 1,
    UNVERIFIED: 2,
    UNAUTHENTICATED: 3,
}

export const Types = {
    LOGIN: 0,
    SIGNUP: 1,
    LOGOUT: 2,
}

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = React.useState({ status: AuthStatus.UNAUTHENTICATED, user: null });
    const request = useRequest();

    React.useEffect(() => {
        user(request, setAuth);
    }, [request]);

    return (
        <Context.Provider value={[auth, (type, data, setErrors) => authRequest(request, type, data, setErrors, setAuth, auth)]}>
            {children}
        </Context.Provider>
    );
}

const user = async (request, setAuth) => {
    const res = await getUser(request);

    if (res.ok){
        const js = await res.json();
        setAuth({ status: AuthStatus.AUTHENTICATED, user: js });
        return;
    } else if (res.status === 401){
        setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
        return;
    }

    setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
}

const authRequest = async (request, type, data, setErrors, setAuth, auth) => {

    if (auth.status === AuthStatus.WAITING) return;

    setAuth({ status: AuthStatus.WAITING, user: null });

    switch (type) {
        case Types.LOGIN: {
            processAuthRequest(request, login, data, setAuth, setErrors);
            break;
        }
        case Types.SIGNUP: {
            processAuthRequest(request, regester, data, setAuth, setErrors);
            break;
        }
        case Types.LOGOUT: {
            await logout();
            setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
            break;
        }
    }
}

const processAuthRequest = async (request, action, data, setAuth, setErrors) => {

    const res = await action(request, data);

    if (res.ok) {
        const js = await res.json();
        await SecureStore.setItemAsync('access_key', js.access);
        await SecureStore.setItemAsync('refresh_key', js.refresh);
        setAuth({ status: AuthStatus.AUTHENTICATED, user: js.user });
        return;
    } else if (res.status === 400) {
        const js = await res.json();
        setErrors({ ...js });
        return;
    }

    setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
}

export default AuthProvider;

export function useAuth() { return React.useContext(Context) };