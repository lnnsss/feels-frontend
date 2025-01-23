import React from "react";
import s from "./Login.module.css"

export const Login: React.FC = () => {
    return (
        <div className={s.login}>
            <div className={`__container ${s.login__container}`}>
                вход
            </div>
        </div>
    )
}