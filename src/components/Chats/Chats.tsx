import React from "react";
import s from "./Chats.module.css"
import {Message} from "./components/Message.tsx";

export interface MessageProps {
    id: string,
    avatar: string,
    name: string,
    lastMessage: string
}

export const Chats: React.FC = () => {
    const users: MessageProps[] = [
        {
            id: '1',
            name: 'Тимур Безбородников',
            avatar: 'https://cdn1.ozone.ru/s3/multimedia-j/6254111995.jpg',
            lastMessage: 'how you feel?'
        }
    ]
    
    return (
        <div className={s.chats}>
            <div className={`__container ${s.chats__container}`}>
                <div className={s.messages}>
                    <header className={s.messages__header}>Сообщения</header>
                    {users.map((u) => <Message key={u.id} id={u.id} avatar={u.avatar} name={u.name} lastMessage={u.lastMessage} />)}
                </div>
            </div>
        </div>
    )
}
