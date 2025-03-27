import { makeAutoObservable } from "mobx";
import { avatarLink } from "../configs/constants";

export interface Post {
    name: string;
    createdAt: string;
    text: string;
    color: string;
}

class ProfileStore {
    id: string = "";
    name: string = "";
    lastName: string = "";
    avatarURL: string = avatarLink;
    status: string = "";
    subscriptions: string[] = [];
    posts: Post[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get postsCount(): number {
        return this.posts.length;
    }

    setID = (newID: string): void => {
        this.id = newID;
    }
    setName = (newName: string): void => {
        this.name = newName;
    }
    setLastName = (newName: string): void => {
        this.lastName = newName;
    }
    setAvatarURL = (newURL: string): void => {
        this.avatarURL = newURL;
    }
    setStatus = (newStatus: string): void => {
        this.status = newStatus;
    }
    setSubscriptions = (newSubs: string[]): void => {
        this.subscriptions = newSubs;
    }
    setPosts = (newPosts: Post[]): void => {
        this.posts = newPosts;
    }
}

export default new ProfileStore();
