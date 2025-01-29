import { makeAutoObservable } from "mobx";

interface Post {
    name: string;
    createdAt: string; 
    text: string;
    color: string;
}

class PostStore {
    posts: Post[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setPosts = (newPosts: Post[]): void => {
        this.posts = newPosts
    }
    addPost = (newPost: Post): void => {
        this.posts = [...this.posts, newPost]
    }
}

export default new PostStore()