import User from "./User";



export default interface Follow {
    user: User,
    followed_user: User,
    verified: boolean,
    created_at: Date,
}