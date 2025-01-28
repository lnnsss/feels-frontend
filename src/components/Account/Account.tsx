import React from "react";
import s from "./Account.module.css";
import TokenStore from "../../stores/token-store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Posts } from "./Posts";
import { CreatePost } from "./CreatePost";
import UserStore from "../../stores/user-store";
import { useAccountInfo } from "../../hooks/useAccountInfo";

export interface PostProps {
    name: string;
    createdAt: string; 
    text: string;
}

export const Account: React.FC = observer(() => {
    const { clearToken, getID } = TokenStore;
    const { name, lastName, userName, avatarURL, status, subscriptions } = UserStore;
    const navigate = useNavigate();
    const id = getID();

    // Получаем данные аккаунта
    useAccountInfo(id);

    // Скопировать юзернейм по нажатию
     const handleUserNameClick = async (): Promise<void> => {
     try {
         await navigator.clipboard.writeText(userName);
         alert("Юзернейм скопирован в буфер обмена!");
     } catch (err) {
         console.error("Не удалось скопировать юзернейм: ", err);
         alert("Не удалось скопировать юзернейм. Пожалуйста, скопируйте его вручную.");
     }
 };

    // Выход из аккаунта
    const handleLogOut = (): void => {
        clearToken();
        navigate('/registration');
    };

    return (
        <div className={s.account}>
            <div className={`__container ${s.account__container}`}>
                <div className={s.account__left}>
                    <button>Подписки</button>
                    <button>Редактировать</button>
                    <button onClick={handleLogOut}>Выйти</button>
                </div>
                <div className={s.account__right}>
                    <div className={s.account__header}>
                        <img
                            className={s.account__avatar}
                            src={avatarURL.length ? avatarURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncwmjK9JtQBeWuoCPkioKY3gsv4l7L7_Egw&s"}
                            alt="avatar"
                        />
                        <h2 className={s.account__name}>{name} {lastName}</h2>
                        <button onClick={handleUserNameClick} className={s.account__username}>@{userName}</button>
                        <h3 className={s.account__status}>{status}</h3>
                        <h4 className={s.account__subscribes}>Подписки: {subscriptions.length}</h4>
                    </div>
                    <CreatePost />
                    <Posts />
                </div>
            </div>
        </div>
    );
});