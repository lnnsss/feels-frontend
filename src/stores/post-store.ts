import { makeAutoObservable } from "mobx";

interface Post {
    name: string;
    createdAt: string; 
    text: string;
}

class PostStore {
    posts: Post[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setPosts = (newPosts: Post[]) => {
        this.posts = newPosts
    }
    addPost = (newPost: Post) => {
        this.posts = [...this.posts, newPost]
    }
}

export default new PostStore()