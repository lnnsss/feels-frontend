import { makeAutoObservable } from "mobx";
import axios from "axios";
import TokenStore from "./token-store.ts";
import { apiChatsURL } from "../configs/constants.ts";

export interface MessageProps {
    chatID: string
    id: string;
    avatar: string;
    name: string;
    lastName: string;
    lastMessage: string;
}

class ChatsStore {
    chats: MessageProps[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchChats = async () => {
        try {
            const token = TokenStore.token;
            if (!token) {
                console.error("Токен отсутствует");
                return;
            }

            const response = await axios.get(apiChatsURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.data || !Array.isArray(response.data.content)) {
                console.error("Некорректный ответ от сервера", response.data);
                return;
            }

            this.chats = response.data.content.map(chat => ({
                chatID: chat.chatID,
                id: chat.id,
                avatar: chat.avatarURL || "",
                name: chat.name || "Неизвестный",
                lastName: chat.lastName || "",
                lastMessage: chat.lastMessage || "",
            }));
        } catch (error) {
            console.error("Ошибка при загрузке чатов:", error);
        }
    };
}

export default new ChatsStore();
