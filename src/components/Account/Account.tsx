import React from "react";
import s from "./Account.module.css"
import TokenStore from "../../stores/token-store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

export const Account: React.FC = observer(() => {
    const {clearToken} = TokenStore
    const navigate = useNavigate();

    const handleLogOut = (): void => {
        clearToken()
        navigate('/registration');
    }

    return (
        <div className={s.account}>
            <div className={`__container ${s.account__container}`}>
                <h1>Личный кабинет</h1>
                <button onClick={handleLogOut}>Выйти</button>
            </div>
        </div>
    )
})