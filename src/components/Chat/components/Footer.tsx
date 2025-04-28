import React, { useState, useRef } from 'react';
import s from "../Chat.module.css";
import { useStores } from "../../../stores/root-store-context.ts";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

export const Footer: React.FC = observer(() => {
    const {
        chat: { addMessage },
        token: { getID },
        socket: { sendMessage }
    } = useStores();
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { chatID } = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (!value.trim() || !chatID) return;

        addMessage(chatID || '', value);
        sendMessage("sendMessage", {
            chatID,
            text: value,
            userID: getID()
        });

        setValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
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
                placeholder="Введите сообщение"
            />
            <button
                className={s.chat__footer__btn}
                onClick={handleSendMessage}
            >
                Отправить
            </button>
        </footer>
    );
});
