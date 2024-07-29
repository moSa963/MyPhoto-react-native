import PostImage from "./PostImage";
import User from "./User";


export default interface Post {
    id: number,
    user: User,
    title: string,
    description: string,
    private: boolean,
    images: PostImage[],
    likes_count: number,
    comments_count: number,
    liked: boolean,
    created_at: Date,
}