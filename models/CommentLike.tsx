import User from "./User";



export default interface CommentLike {
    user: User,
    comment_id: number,
    created_at: Date,
}