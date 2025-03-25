import React from "react";
import s from "../Chats.module.css"
import {Link} from "react-router-dom";
import {MessageProps} from "../Chats.tsx";

export const Message: React.FC<MessageProps> = ({id, avatar, name, lastMessage}) => {

    return (
        <Link to={`/chats/${id}`} className={s.message}>
            <img className={s.message__avatar} src={avatar} alt="avatar"/>
            <div className={s.message__text}>
                <h5 className={s.message__name}>{name}</h5>
                <span className={s.message__lastMessage}>{lastMessage}</span>
            </div>
        </Link>
    )
}
