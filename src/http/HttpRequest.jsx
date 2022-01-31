import * as SecureStore from "expo-secure-store";
export const BASE_URL = "http://192.168.0.11:8000/";

const refresh = async () => {
    const refreshKey = await SecureStore.getItemAsync("refresh_key");

    if (!refreshKey) return false;

    const response = await fetch(BASE_URL + "api/token/refresh", {
        method: "POST",
        headers:{
            'Accept': "application/json",
        },
        body: JSON.stringify({
            'refresh': "Bearer " + refreshKey,
        }),
    });

    if (response.ok){
        const data = await response.json();
        await SecureStore.setItemAsync("access_key", data.access);
        return response;
    } else if (response.status === 401){
        SecureStore.deleteItemAsync("refresh_key");
    }

    return response;
}


export const getHeader = async ()=>{
    const header = {
        'Accept': "application/json",
        'Connection': 'keep-alive',
        'Content-Type': 'multipart/form-data',
    };

    try{
        const access_key = await SecureStore.getItemAsync("access_key");
        if (access_key){
            header['Authorization'] = "Bearer " + access_key;
        }
    } catch(e){
        console.log(e);
    }

    
    return header;
}


const request = async (url = BASE_URL, method = "GET", data = null)=>{
    var body = {};

    if (data){
        body["body"] = data;
    }

    body["headers"] = await getHeader();

    body["method"] = method;
    
    if (!url.match(/^https?:/s)){
        url = BASE_URL + url;
    }

    var response = await fetch(url, body);

    if (response.status === 401){
        await SecureStore.deleteItemAsync("access_key");
        const refreshRes = await refresh();

        if (refreshRes?.ok){
            body["headers"] = await getHeader();
            response = await fetch(url, body);
        }
    }

    return response;
}


export default request;