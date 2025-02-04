import { makeAutoObservable } from "mobx";

interface Post {
    name: string;
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