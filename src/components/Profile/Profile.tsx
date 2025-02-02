import { useParams } from "react-router-dom";
import ModalStore from "../../stores/modal-store";
import ProfileStore from "../../stores/profile-store";
import s from "./Profile.module.css";
import { useProfileInfo } from "../../hooks/useProfileInfo";
import { observer } from "mobx-react-lite";
import { Posts } from "./components/Posts";
import UserStore from "../../stores/user-store";
import { useEffect, useState } from "react";
import useSubscription from "../../hooks/useSubscription";

export const Profile: React.FC = observer(() => {
    const { userName } = useParams<{ userName: string }>();
    const { id, name, lastName, avatarURL, status, subscriptions: profileSubscriptions } = ProfileStore;
    const { subscriptions: userSubscriptions } = UserStore;
    const { setProfileAvatarModalActive } = ModalStore;
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false); // Изначально false

    // Получаем данные аккаунта
    useProfileInfo(userName);

    // Проверяем подписаны ли мы на пользователя
    useEffect(() => {
        if (id) {
            setIsSubscribed(userSubscriptions.includes(id));
        }
    }, [userSubscriptions, id]);

    // Аватар пользователя
    const ava = avatarURL.length ? avatarURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncwmjK9JtQBeWuoCPkioKY3gsv4l7L7_Egw&s";

    // Подписка / отписка
    const { handleSubscribeUser, handleUnsubscribeUser } = useSubscription(id);

    // Скопировать юзернейм по нажатию
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
                    {
                        isSubscribed
                        ? <button className={s.profile__button} onClick={() => { handleUnsubscribeUser(); setIsSubscribed(false); }}>Отписаться</button>
                        : <button className={s.profile__button} onClick={() => { handleSubscribeUser(); setIsSubscribed(true); }}>Подписаться</button>
                    }
                </div>
                <Posts />
            </div>
        </div>
    );
});
