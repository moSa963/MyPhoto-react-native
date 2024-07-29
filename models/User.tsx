


export default interface User {
    username: string,
    first_name: string,
    last_name: string,
    email?: string,
    private: boolean,
    followers_count?: number,
    following_count?: number,
    following_status?: boolean | null,
    image: string,
}