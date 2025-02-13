import { makeAutoObservable } from "mobx";

class ProfileStore {
    id: string = "";
    name: string = "";
    lastName: string = "";
    avatarURL: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncwmjK9JtQBeWuoCPkioKY3gsv4l7L7_Egw&s";
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