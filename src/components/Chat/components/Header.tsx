import React from 'react';
import s from "../Chat.module.css";
import {Link} from "react-router-dom";
import {User} from "../Chat.tsx";
import {useStores} from "../../../stores/root-store-context.ts";
import {observer} from "mobx-react-lite";

export const Header: React.FC<User> = observer(() => {
    const {
        chat: { userName, name, lastName, avatarURL }
    } = useStores();

    return (
        <header className={s.chat__header}>
            <div className={s.chat__userInfo}>
                <Link to={`/users/${userName}`}>
                    <img className={s.chat__avatar}
                         src={avatarURL}
                         alt="avatar"/>
                </Link>
                <Link to={`/users/${userName}`}>
                    <h3 className={s.chat__name}>{name} {lastName}</h3>
                </Link>
            </div>
            <Link to={'/chats'}>
                <img src="/leftArrow.png" alt="back"/>
            </Link>
        </header>
    );
});