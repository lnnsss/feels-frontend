import React, { useState, useRef } from 'react';
import s from "../Chat.module.css";

export const Footer: React.FC = ({ id, messages, setMessages }) => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (!value.trim()) return;

        const newMessage = {
            userID: id,
            text: value,
        };
        setMessages([...messages, newMessage]);
        setValue("");

        // Возвращаем фокус в input
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Предотвращаем перенос строки в input
            handleSendMessage();
        }
    };

    return (
        <footer className={s.chat__footer}>
            <input
                ref={inputRef}
                className={s.chat__footer__input}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                type="text"
            />
            <button className={s.chat__footer__btn} onClick={handleSendMessage}>Отправить</button>
        </footer>
    );
};
