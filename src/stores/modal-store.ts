import { makeAutoObservable } from "mobx";

class ModalStore {
    isModalActive: boolean = false;
    isEditingModalActive: boolean = false; // Редактирование профиля
    isAvatarModalActive: boolean = false; // Аватар 

    constructor() {
        makeAutoObservable(this)
    }

    // Закрыть модальное окно
    closeModals = (): void => {
        this.isModalActive = false
        this.isEditingModalActive = false
        this.isAvatarModalActive = false
    }

    // Открыть модальное окно редактирования профиля
    setEditingModalActive = (): void => {
        this.isModalActive = true
        this.isEditingModalActive = true
    }

    // Открыть модальное окно аватара
    setAvatarModalActive = (): void => {
        this.isModalActive = true
        this.isAvatarModalActive = true
    }
}

export default new ModalStore()