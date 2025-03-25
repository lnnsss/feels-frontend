import React from "react";
import s from "./Chats.module.css"
import {SideBar} from "./components/SideBar.tsx";
import {Chat} from "./components/Chat.tsx";

export const Chats: React.FC = () => {
    const user = {
        id: "1",
        avatar: "https://avatars.mds.yandex.net/i?id=bdf2523f69d180816b8f1752008b521488103379-10780730-images-thumbs&n=13",
        name: "Тимур Безбородников",
        lastMessage: "how u feel?"
    }
    
    return (
        <div className={s.chats}>
            <div className={s.chats__container}>
                <SideBar/>
                <Chat id={user.id} name={user.name} avatar={user.avatar} />
            </div>
        </div>
    )
}
