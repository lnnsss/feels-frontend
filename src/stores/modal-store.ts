import { makeAutoObservable } from "mobx";

class ModalStore {
    isModalActive: boolean = false;
    isEditingModalActive: boolean = false; // Редактирование профиля
    isProfileEditModalActive: boolean = false; // Редактирование профиля администратором
    isAccountAvatarModalActive: boolean = false; // Аватар личного кабинета
    isProfileAvatarModalActive: boolean = false; // Аватар профиля
    isSubscribtionsModalActive: boolean = false; // Подписки

    profileEditUserId: string | null = null; // id пользователя для редактирования профиля администратором

    constructor() {
        makeAutoObservable(this)
    }

    // Закрыть модальное окно
    closeModals = (): void => {
        this.isModalActive = false
        this.isEditingModalActive = false
        this.isAccountAvatarModalActive = false
        this.isProfileAvatarModalActive = false
        this.isSubscribtionsModalActive = false
        this.profileEditUserId = null;
    }

    // Открыть модальное окно редактирования профиля
    setEditingModalActive = (): void => {
        this.isModalActive = true
        this.isEditingModalActive = true
    }

    // Открыть модальное окно редактирования профиля администратором
    setProfileEditModalActive = (userId: string): void => {
        this.isModalActive = true
        this.isProfileEditModalActive = true
        this.profileEditUserId = userId;
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

    // Открыть модальное окно подписок
    setSubscribtionsModalActive = (): void => {
        this.isModalActive = true
        this.isSubscribtionsModalActive = true
    }
}

export default new ModalStore()