import React from "react";
import s from "./Users.module.css"

export const Users: React.FC = () => {
    return (
        <div className={s.users}>
            <div className={`__container ${s.users__container}`}>
                пользователи
            </div>
        </div>
    )
}