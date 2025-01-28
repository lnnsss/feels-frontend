import { makeAutoObservable } from "mobx";

class UserStore {
    name: string = "";
    lastName: string = "";
    userName: string = "";
    avatarURL: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncwmjK9JtQBeWuoCPkioKY3gsv4l7L7_Egw&s";
    status: string = "";
    subscriptions: string[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setName = (newName: string): void => {
        this.name = newName
    }
    setLastName = (newName: string): void => {
        this.lastName = newName
    }
    setUserName = (newName: string): void => {
        this.userName = newName
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
    addSubscription = (newSub: string) => {
        this.subscriptions = [...this.subscriptions, newSub]
    }
}

export default new UserStore()