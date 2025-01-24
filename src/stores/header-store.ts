import { makeAutoObservable } from "mobx";

class HeaderStore {
    isMenuOpen: Boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    toggleMenu = (): void => {
        this.isMenuOpen = !this.isMenuOpen
    }
}

export default new HeaderStore()