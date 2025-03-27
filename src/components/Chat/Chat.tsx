import React, {useEffect} from "react";
import s from "./Chat.module.css"
import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {Message} from "./components/Message.tsx";
import {useStores} from "../../stores/root-store-context.ts";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

export const Chat: React.FC = observer(() => {
    const {
        chat: { messages, fetchChat },
        token: { getID}
    } = useStores();
    const {chatID} = useParams()
    const id = getID()

    useEffect(() => {
        fetchChat(chatID?.toString());
    }, [fetchChat]);

    return (
        <div className={s.chat}>
            <div className={`__container ${s.chat__container}`}>
                <div className={s.chat__block}>
                    <Header />
                    <ul className={s.chat__messages}>
                        {messages.map((m, i) => <Message key={i} my={m.userID === id} text={m.text} />)}
                    </ul>
                    <Footer />
                </div>
            </div>
        </div>
    )
})