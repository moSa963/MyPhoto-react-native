import User from "./User";



export default interface Auth extends User {
    verified?: boolean,
    password?: string,
}