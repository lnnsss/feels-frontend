import { makeAutoObservable } from "mobx";

interface UserInfo {
    userName: string;
    name: string;
    lastName: string;
}

interface Post {
    id: string;
    userID: UserInfo;
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
    removePost = (postId: string): void => {
        this.posts = this.posts.filter(post => post.id !== postId);
    };
}

export default new PostsStore()