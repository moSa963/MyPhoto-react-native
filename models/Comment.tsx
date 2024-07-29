import User from "./User";



export default interface Comment {
    id: number,
    user: User,
    post_id: number,
    content: string,
    created_at: Date,
    likes_count: number,
    liked: boolean,
}