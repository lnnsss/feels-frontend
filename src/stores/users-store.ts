import { makeAutoObservable } from "mobx";

interface User {
    userName: string,
    name: string,
    lastName: string,
    avatarURL: string,
    status: string,
    subscriptions: string[],
}

class UsersStore {
    users: User[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setUsers = (usersArr: User[]): void => {
        this.users = usersArr
    }
}

export default new UsersStore();