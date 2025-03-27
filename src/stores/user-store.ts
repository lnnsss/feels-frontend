import { makeAutoObservable } from "mobx";
import { avatarLink } from "../configs/constants";

class UserStore {
    name: string = "";
    lastName: string = "";
    userName: string = "";
    avatarURL: string = avatarLink;
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

    clear = () => {
        this.name = ""
        this.lastName = ""
        this.userName = ""
        this.avatarURL = avatarLink
        this.status = ""
        this.subscriptions = []
    }
}

export default new UserStore()
