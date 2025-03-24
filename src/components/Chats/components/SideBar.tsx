import React from "react";
import s from "../Chats.module.css"
import {Link} from "react-router-dom";
import {User} from "./User.tsx";

export const SideBar: React.FC = () => {
    const users = [
        {
            id: 1,
            avatar: "https://avatars.mds.yandex.net/i?id=bdf2523f69d180816b8f1752008b521488103379-10780730-images-thumbs&n=13",
            name: "Тимур Безбородников",
            lastMessage: "how u feel?"
        },
        {
            id: 2,
            avatar: "https://avatars.mds.yandex.net/i?id=bdf2523f69d180816b8f1752008b521488103379-10780730-images-thumbs&n=13",
            name: "Егор Ларионов",
            lastMessage: "сделал лоботомию"
        },
        {
            id: 3,
            avatar: "https://avatars.mds.yandex.net/i?id=bdf2523f69d180816b8f1752008b521488103379-10780730-images-thumbs&n=13",
            name: "Айнур Шамсутдинов",
            lastMessage: "на работе"
        },
        {
            id: 4,
            avatar: "https://avatars.mds.yandex.net/i?id=bdf2523f69d180816b8f1752008b521488103379-10780730-images-thumbs&n=13",
            name: "Эрик Камалов",
            lastMessage: "что думаешь?"
        },
    ]

    return (
        <div className={s.sidebar}>
            <ul className={s.users}>
                {users.map(u => <User key={u.id} id={u.id} name={u.name} avatar={u.avatar} lastMessage={u.lastMessage} />)}
            </ul>
        </div>
    )
}