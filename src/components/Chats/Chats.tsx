import React from "react";
import s from "./Chats.module.css"
import {SideBar} from "./components/SideBar.tsx";
import {Chat} from "./components/Chat.tsx";

export const Chats: React.FC = () => {
    return (
        <div className={s.chats}>
            <div className={s.chats__container}>
                <SideBar/>
                <Chat/>
            </div>
        </div>
    )
}