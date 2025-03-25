import React, {useState} from "react";
import s from "./Chat.module.css"
import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {Message} from "./components/Message.tsx";

export interface User {
    id: string,
    name: string,
    avatar: string,
}
interface Message {
    userID: string,
    text: string,
}

const user: User = {
    id: "1",
    avatar: "https://avatars.mds.yandex.net/i?id=bdf2523f69d180816b8f1752008b521488103379-10780730-images-thumbs&n=13",
    name: "Тимур Безбородников"
}

export const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
            {
                "userID": "1",
                "text": "Привет!"
            },
            {
                "userID": "2",
                "text": "Привет, как дела?"
            },
            {
                "userID": "1",
                "text": "Неплохо, а у тебя?"
            },
            {
                "userID": "2",
                "text": "Тоже нормально, чем занят?"
            },
            {
                "userID": "1",
                "text": "Сижу, код пишу."
            },
            {
                "userID": "2",
                "text": "Что кодишь?"
            },
            {
                "userID": "1",
                "text": "Чат на React."
            },
            {
                "userID": "2",
                "text": "О, круто! Покажешь код?"
            },
            {
                "userID": "1",
                "text": "Конечно, сейчас кину."
            },
            {
                "userID": "2",
                "text": "Окей, жду."
            },
            {
                "userID": "1",
                "text": "Вот, смотри: (скинул код)."
            },
            {
                "userID": "2",
                "text": "Выглядит круто, но чат не скроллится, исправь."
            },
            {
                "userID": "1",
                "text": "Точно! Забыл про overflow. Сейчас добавлю."
            },
            {
                "userID": "2",
                "text": "Отлично, попробую запустить у себя."
            },
            {
                "userID": "1",
                "text": "Давай, если что, спрашивай."
            },
            {
                "userID": "2",
                "text": "Окей, вроде работает!"
            },
            {
                "userID": "1",
                "text": "Супер! Может, добавим темную тему?"
            },
            {
                "userID": "2",
                "text": "Хорошая идея! Давай сделаем переключатель."
            },
            {
                "userID": "1",
                "text": "Я напишу стили, а ты логику?"
            },
            {
                "userID": "2",
                "text": "Договорились!"
            }
        ]
    )
    const id = "1"

    return (
        <div className={s.chat}>
            <div className={`__container ${s.chat__container}`}>
                <div className={s.chat__block}>
                    <Header {...user} />
                    <ul className={s.chat__messages}>
                        {messages.map((m, i) => <Message key={i} my={m.userID === id} text={m.text} />)}
                    </ul>
                    <Footer id={id} messages={messages} setMessages={setMessages} />
                </div>
            </div>
        </div>
    )
}
