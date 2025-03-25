import React, { useState } from "react";
import s from "../Chats.module.css"
import { Link } from "react-router-dom";

interface Props {
    id: string,
    name: string,
    avatar: string
}
interface Message {
    userID: string,
    text: string
}

export const Chat: React.FC<Props> = ({ id, name, avatar }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            userID: "1",
            text: "hi"
        },
        {
            userID: "1",
            text: "how are you?"
        },
        {
            userID: "2",
            text: "im fine"
        },
        {
            userID: "2",
            text: "and you?"
        },
        {
            userID: "1",
            text: "im fine too"
        },
        {
            userID: "1",
            text: "have you listen new carti`s album?"
        },
        {
            userID: "1",
            text: "thas fire!!"
        },
        {
            userID: "2",
            text: "yes!"
        },
        {
            userID: "2",
            text: "IM MUSIC ALBUM OF THE YEAR"
        },
        {
            userID: "2",
            text: "CARTI GOAT"
        },
    ])
    const [value, setValue] = useState('');
    
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value)
    }
    const handleSendMessage = () => {
        const newMessage: Message = {
            userID: id,
            text: value
        }
        setMessages([...messages, newMessage])
        setValue('')
    }

    return (
        <div className={s.chat}>
            <header className={s.chat__header}>
                <Link to={`/users/${id}`}><img className={s.chat__header__avatar} src={avatar} alt="avatar" /></Link>
                <Link to={`/users/${id}`}><h3 className={s.chat__header__name}>{name || 'Кто-то там'}</h3></Link>
            </header>
            <div className={s.chat__messages}>
                <div className={s.chat__messages__container}>
                {
                    messages.map((m, i) => (
                        m.userID === id 
                        ? (<span key={i} className={`${s.message} ${s.myMessage}`}>{m.text}</span>) 
                        : (<span key={i} className={`${s.message} ${s.yourMessage}`}>{m.text}</span>)
                    ))
                }
                </div>
            </div>
            <footer className={s.chat__footer}>
                <input className={s.chat__footer__input} type="text" value={value} onChange={handleChangeValue} />
                <button className={s.chat__footer__btn} onClick={handleSendMessage}>Отправить</button>
            </footer>
        </div>
    )
}
