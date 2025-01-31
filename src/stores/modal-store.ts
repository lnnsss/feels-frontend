import { makeAutoObservable } from "mobx";

class ModalStore {
    isModalActive: boolean = false;
    isEditingModalActive: boolean = false; // Редактирование профиля
    isAccountAvatarModalActive: boolean = false; // Аватар личного кабинета
    isProfileAvatarModalActive: boolean = false; // Аватар профиля

    constructor() {
        makeAutoObservable(this)
    }

    // Закрыть модальное окно
    closeModals = (): void => {
        this.isModalActive = false
        this.isEditingModalActive = false
        this.isAccountAvatarModalActive = false
        this.isProfileAvatarModalActive = false
    }

    // Открыть модальное окно редактирования профиля
    setEditingModalActive = (): void => {
        this.isModalActive = true
        this.isEditingModalActive = true
    }

    // Открыть модальное окно аватара личного кабинета
    setAccountAvatarModalActive = (): void => {
        this.isModalActive = true
        this.isAccountAvatarModalActive = true
    }

    // Открыть модальное окно аватара профиля
    setProfileAvatarModalActive = (): void => {
        this.isModalActive = true
        this.isProfileAvatarModalActive = true
    }
}

export default new ModalStore()