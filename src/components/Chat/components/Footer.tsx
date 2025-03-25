import React, {useState} from 'react';
import s from "../Chat.module.css";

export const Footer: React.FC = ({id, messages, setMessages}) => {
    const [value, setValue] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    const hanleSendMessage = () => {
        const newMessage = {
            userID: id,
            text: value,
        }
        setMessages([...messages, newMessage]);
        setValue('')
    }

    return (
        <footer className={s.chat__footer}>
            <input className={s.chat__footer__input} value={value} onChange={handleChange} type="text"/>
            <button className={s.chat__footer__btn} onClick={hanleSendMessage}>Отправить</button>
        </footer>
    );
};