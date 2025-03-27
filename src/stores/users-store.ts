import { makeAutoObservable } from "mobx";

interface User {
    id: string
    userName: string,
    name: string,
    lastName: string,
    avatarURL: string
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