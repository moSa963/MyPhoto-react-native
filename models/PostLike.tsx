import User from "./User";



export default interface PostLike {
    user: User,
    post_id: number,
    created_at: Date,
}