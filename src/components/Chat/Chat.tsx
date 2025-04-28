import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/root-store-context";
import { useParams } from "react-router-dom";
import s from "./Chat.module.css";
import { Message } from "./components/Message.tsx";
import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Footer.tsx";

export const Chat: React.FC = observer(() => {
    const {
        token: { getID },
        chat: { messages, fetchChat },
        socket: { socket, connect, joinRoom }
    } = useStores();
    const { chatID } = useParams();

    useEffect(() => {
        if (!socket) {
            connect();
        }
    }, [socket, connect]);

    useEffect(() => {
        if (socket && chatID) {
            joinRoom(chatID.toString());
        }
    }, [socket, chatID]);

    useEffect(() => {
        if (chatID) {
            fetchChat(chatID.toString());
        }
    }, [chatID, fetchChat]);

    return (
        <div className={s.chat}>
            <div className={`__container ${s.chat__container}`}>
                <div className={s.chat__block}>
                    <Header />
                    <ul className={s.chat__messages}>
                        {messages.map((m, i) => (
                            <Message key={i} my={m.userID === getID()} text={m.text} />
                        ))}
                    </ul>
                    <Footer />
                </div>
            </div>
        </div>
    );
});
