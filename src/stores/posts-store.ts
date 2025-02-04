import { makeAutoObservable } from "mobx";

interface UserInfo {
    userName: string;
    name: string;
    lastName: string;
}

interface Post {
    userID: UserInfo
    createdAt: string; 
    text: string;
    color: string;
}

class PostsStore {
    posts: Post[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setPosts = (newPosts: Post[]): void => {
        this.posts = newPosts
    }
}

export default new PostsStore()