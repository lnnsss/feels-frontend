import React from "react";
import s from "../Chats.module.css"
import {User} from "./Message.tsx";

export const SideBar: React.FC = () => {
    const users = [
        {
            id: "1",
            avatar: "https://avatars.mds.yandex.net/i?id=bdf2523f69d180816b8f1752008b521488103379-10780730-images-thumbs&n=13",
            name: "Тимур Безбородников",
            lastMessage: "how u feel?"
        },
        {
            id: "2",
            avatar: "https://avatars.mds.yandex.net/i?id=5443bc1df442e4f28fb70dded9962550d646028d-12767804-images-thumbs&n=13",
            name: "Егор Ларионов",
            lastMessage: "сделал лоботомию"
        },
        {
            id: "3",
            avatar: "https://i.ebayimg.com/images/g/socAAOSwcu5UL8Rm/s-l1600.jpg",
            name: "Айнур Шамсутдинов",
            lastMessage: "на работе"
        },
        {
            id: "4",
            avatar: "https://i.pinimg.com/originals/a5/a6/a8/a5a6a82be9aafc8596aa453097f2d10c.jpg",
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
