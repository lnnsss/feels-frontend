import React from "react";
import s from "../Chats.module.css"
import {Link} from "react-router-dom";

interface Props {
    id: number,
    avatar: string,
    name: string,
    lastMessage: string
}

export const User: React.FC<Props> = ({id, avatar, name, lastMessage}) => {

    return (
        <li>
            <Link to={`/chats/${id}`} className={s.user}>
                <img className={s.user__avatar}
                     src={avatar}
                     alt="avatar"/>
                <div className={s.user__text}>
                    <h3 className={s.user__name}>{name}</h3>
                    <span className={s.user__lastMessage}>{lastMessage}</span>
                </div>
            </Link>
        </li>
    )
}