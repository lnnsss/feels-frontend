import { useParams } from "react-router-dom";
import ModalStore from "../../../../stores/modal-store";
import ProfileStore from "../../../../stores/profile-store";
import s from "./Profile.module.css";
import { useProfileInfo } from "../../../../hooks/useProfileInfo";
import { observer } from "mobx-react-lite";
import React from "react";

export const Profile: React.FC = observer(() => {
    const { userName } = useParams<{ userName: string }>();
    const { id, name, lastName, avatarURL, status, subscriptions: profileSubscriptions } = ProfileStore;
    const { setProfileAvatarModalActive, setProfileEditModalActive } = ModalStore;

    // Получение данных пользователя
    useProfileInfo(userName);

    // Аватар
    const ava = avatarURL.length ? avatarURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncwmjK9JtQBeWuoCPkioKY3gsv4l7L7_Egw&s";

    // Копировать юзернейм нажатием
    const handleUserNameClick = async (): Promise<void> => {
        if (!userName) {
            alert("Юзернейм не найден.");
            return;
        }
        try {
            await navigator.clipboard.writeText(userName);
            alert("Юзернейм скопирован в буфер обмена!");
        } catch (err) {
            console.error("Не удалось скопировать юзернейм: ", err);
            alert("Не удалось скопировать юзернейм. Пожалуйста, скопируйте его вручную.");
        }
    };

    return (
        <div className={s.profile}>
            <div className={`__container ${s.profile__container}`}>
                <div className={s.profile__header}>
                    <div
                        className={s.profile__avatar} 
                        style={{ backgroundImage: `url(${ava})` }}
                        onClick={setProfileAvatarModalActive}
                    />
                    <h2 className={s.profile__name}>{name} {lastName}</h2>
                    <button onClick={handleUserNameClick} className={s.profile__username}>@{userName}</button>
                    <h3 className={s.profile__status}>{status}</h3>
                    <h4 className={s.profile__subscribes}>Подписки: {profileSubscriptions.length}</h4>
                </div>
                <div className={s.profile__buttons}>
                    <button className={s.profile__button}>Посты</button>
                    <button className={s.profile__button} onClick={() => setProfileEditModalActive(id)}>Редактировать</button>
                    <button className={s.profile__button}>Удалить</button>
                </div>
            </div>
        </div>
    );
});
