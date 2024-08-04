import React, { createContext, type PropsWithChildren } from "react";
import request, { BASE_URL } from "@/http/HttpRequest";
import { useErrorCard } from "./ErrorContext";

export type Request = (url: string, method?: "GET" | "POST" | "PUT" | "DELETE", data?: any) => Promise<Response | null> | null

const Context = createContext<Request>(() => null);

const RequestProvider = ({ children }: PropsWithChildren) => {
    const { setError } = useErrorCard();

    return (
        <Context.Provider value={(url = BASE_URL, method = "GET", data = null, handle: "all" | "none" | "auto" = "all") => send(setError, url, method, data, handle)}>
            {children}
        </Context.Provider>
    );
}

const send = async (setError: any, url = BASE_URL, method = "GET", data = null, handle: "all" | "none" | "auto") => {
    let res = null;

    try {
        res = await request(url, method, data);
        if (handle == "none" || (res && (res.ok || (res.status == 400 && handle == "auto")))) return res;

        if (res.status == 400) {
            setError(await res.json());
        } else {
            setError(res.status + " " + res.statusText);
        }

    } catch (e) {
        setError("An unexpected error occurred.");
    }

    return res;
}

export default RequestProvider;

export function useRequest() { return React.useContext(Context) };