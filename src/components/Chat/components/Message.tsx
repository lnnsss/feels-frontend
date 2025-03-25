import React from "react";
import s from "../Chat.module.css"

interface Props {
    my: boolean,
    text: string
}

export const Message: React.FC<Props> = ({my, text}) => {
    return (
        <li className={`${s.message} ${my && s.myMessage}`}>{text}</li>
    )
}