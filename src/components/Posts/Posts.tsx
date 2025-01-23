import React from "react";
import s from "./Posts.module.css"

export const Posts: React.FC = () => {
    return (
        <div className={s.posts}>
            <div className={`__container ${s.posts__container}`}>
                посты
            </div>
        </div>
    )
}