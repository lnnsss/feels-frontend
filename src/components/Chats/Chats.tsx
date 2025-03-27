import React, {useEffect} from "react";
import s from "./Chats.module.css"
import {Message} from "./components/Message.tsx";
import {observer} from "mobx-react-lite";
import {useStores} from "../../stores/root-store-context.ts";

export const Chats: React.FC = observer(() => {
    const {
        chats: { chats, fetchChats }
    } = useStores();

    useEffect(() => {
        fetchChats();
    }, [fetchChats]);

    return (
        <div className={s.chats}>
            <div className={`__container ${s.chats__container}`}>
                <div className={s.messages}>
                    <header className={s.messages__header}>Сообщения</header>
                    {
                        chats.length 
                        ? chats.map((c) => <Message key={c.id} chatID={c.chatID} avatar={c.avatar} name={c.name} lastMessage={c.lastMessage} />) 
                        : <span className={s.noChat}>Пусто</span>
                    }
                </div>
            </div>
        </div>
    )
})
