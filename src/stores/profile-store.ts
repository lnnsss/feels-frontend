import { makeAutoObservable } from "mobx";
import { avatarLink } from "../configs/constants";

class ProfileStore {
    id: string = "";
    name: string = "";
    lastName: string = "";
    avatarURL: string = avatarLink;
    status: string = "";
    subscriptions: string[] = [];
    postsCount: number = 0;

    constructor() {
        makeAutoObservable(this)
    }

    setID = (newID: string): void => {
        this.id = newID
    }
    setName = (newName: string): void => {
        this.name = newName
    }
    setLastName = (newName: string): void => {
        this.lastName = newName
    }
    setAvatarURL = (newName: string): void => {
        this.avatarURL = newName
    }
    setStatus = (newName: string): void => {
        this.status = newName
    }
    setSubscriptions = (newSubs: string[]) => {
        this.subscriptions = newSubs
    }
    setPostsCount = (newCount: number) => {
        this.postsCount = newCount
    }
}

export default new ProfileStore()
