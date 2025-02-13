import { useParams } from "react-router-dom";
import s from "./Profile.module.css";
import { useProfileInfo } from "../../hooks/useProfileInfo";
import { observer } from "mobx-react-lite";
import { Posts } from "./components/Posts";
import React from "react";
import { SubscribeButtons } from "./components/SubscribeButtons";
import { useStores } from "../../stores/root-store-context";

export const Profile: React.FC = observer(() => {
    const { userName } = useParams<{ userName: string }>();
    const { 
        modal: { setProfileAvatarModalActive }, 
        profile: { id, name, lastName, avatarURL, status, subscriptions: profileSubscriptions, postsCount },
        token: {getID, token}
    } = useStores(); 
    const ourID = getID()

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
                    <h4 className={s.profile__postsCount}>Постов: {postsCount}</h4>
                    {ourID != id && token && <SubscribeButtons userId={id} />}
                </div>
                <Posts />
            </div>
        </div>
    );
});
