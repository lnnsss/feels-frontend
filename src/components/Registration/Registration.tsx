import React from "react";
import s from "./Registration.module.css"

export const Registration: React.FC = () => {
    return (
        <div className={s.registration}>
            <div className={`__container ${s.registration__container}`}>
                регистрация
            </div>
        </div>
    )
}