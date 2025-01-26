import React from "react";
import s from "./NotFound.module.css"
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TokenStore from "../../stores/token-store";

export const NotFound: React.FC = observer(() => {
    const isAdmin = TokenStore.hasRole('ADMIN');

    return (
        <div className={s.notFound}>
            <div className={`__container ${s.notFound__container}`}>
                <h2>404</h2>
                <h3>Page Not Found</h3>
                <Link className={s.notFound__link} to={isAdmin ? "/admin" : "/"}>На главную</Link>
            </div>
        </div>
    )
})