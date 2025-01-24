import React from "react";
import s from "./NotFound.module.css"
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
    return (
        <div className={s.notFound}>
            <div className={`__container ${s.notFound__container}`}>
                <h2>404</h2>
                <h3>Page Not Found</h3>
                <Link className={s.notFound__link} to="/">На главную</Link>
            </div>
        </div>
    )
}