import React from "react";
import s from "./Account.module.css";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Posts } from "./components/Posts";
import { CreatePost } from "./components/CreatePost";
import { useAccountInfo } from "../../hooks/useAccountInfo";
import { useStores } from "../../stores/root-store-context";
import { avatarLink } from "../../configs/constants";

export const Account: React.FC = observer(() => {
    const { 
        modal: { setEditingModalActive, setAccountAvatarModalActive, setSubscribtionsModalActive }, 
        post: { setPosts },
        token: { clearToken, getID },
        user: { name, lastName, userName, avatarURL, status, subscriptions, clear }
    } = useStores();
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

    // Выход из аккаунта / сброс всех данных
    const handleLogOut = (): void => {
        clear();
        clearToken();
        setPosts([]);
        navigate('/registration');
    };

    // Аватар пользователя
    const ava = avatarURL.length ? avatarURL : avatarLink;

    return (
        <div className={s.account}>
            <div className={`__container ${s.account__container}`}>
                <div className={s.account__left}>
                    <button onClick={setSubscribtionsModalActive}>Подписки</button>
                    <button onClick={setEditingModalActive}>Редактировать</button>
                    <button onClick={handleLogOut}>Выйти</button>
                </div>
                <div className={s.account__right}>
                    <div className={s.account__header}>
                        <div
                            className={s.account__avatar} 
                            style={{ backgroundImage: `url(${ava})` }}
                            onClick={setAccountAvatarModalActive}
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
