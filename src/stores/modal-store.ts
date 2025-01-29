import { makeAutoObservable } from "mobx";

class ModalStore {
    isModalActive: boolean = false;
    isEditingModalActive: boolean = false; // Редактирование профиля

    constructor() {
        makeAutoObservable(this)
    }

    // Закрыть модальное окно
    closeModals = (): void => {
        this.isModalActive = false
        this.isEditingModalActive = false
    }

    // Открыть модальное окно редактирования профиля
    setEditingModalActive = (): void => {
        this.isModalActive = true
        this.isEditingModalActive = true
    }
}

export default new ModalStore()