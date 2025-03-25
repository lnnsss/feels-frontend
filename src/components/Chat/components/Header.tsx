import React from 'react';
import s from "../Chat.module.css";
import {Link} from "react-router-dom";
import {User} from "../Chat.tsx";

export const Header: React.FC<User> = ({id, name, avatar}) => {
    return (
        <header className={s.chat__header}>
            <div className={s.chat__userInfo}>
                <Link to={`/users/${id}`}>
                    <img className={s.chat__avatar}
                         src={avatar}
                         alt="avatar"/>
                </Link>
                <Link to={`/users/${id}`}>
                    <h3 className={s.chat__name}>{name}</h3>
                </Link>
            </div>
            <Link to={'/chats'}>
                <img src="/leftArrow.png" alt="back"/>
            </Link>
        </header>
    );
};