import * as SecureStore from "expo-secure-store";

const getUser =  async (request)=>{
    return await request("api/login");
}

export const login = async (request, { username, password, remember = false })=>{
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    const response = await request("api/login", "POST", form);

    return response; 
}

export const regester = async (request, { first_name, last_name, username, email, password, password_confirmation, remember })=>{
    const form = new FormData();
    form.append("first_name", first_name);
    form.append("last_name", last_name);
    form.append("username", username);
    form.append("email", email);
    form.append("password", password);
    form.append("password_confirmation", password_confirmation);

    const response = await request("api/register", "POST", form);

    return response; 
}


export const logout = async ()=>{
    await SecureStore.deleteItemAsync('access_key');
    await SecureStore.deleteItemAsync('refresh_key');
    return true;
}

export default getUser;