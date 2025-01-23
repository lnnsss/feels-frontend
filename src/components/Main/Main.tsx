import React from "react";
import s from "./Main.module.css"

export const Main: React.FC = () => {
    return (
        <div className={s.main}>
            <div className={`__container ${s.main__container}`}>
                главная
            </div>
        </div>
    )
}