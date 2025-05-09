import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import TokenStore from "./token-store.ts";
import { apiChatsURL, avatarLink } from "../configs/constants.ts";

export interface MessageProps {
    userID: string;
    text: string;
}

class ChatStore {
    userID: string = "";
    userName: string = "";
    name: string = "";
    lastName: string = "";
    avatarURL: string = avatarLink;
    messages: MessageProps[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    fetchChat = async (chatID: string) => {
        try {
            const token = TokenStore.token;
            if (!token) {
                console.error("Токен отсутствует");
                return;
            }

            const response = await axios.get(`${apiChatsURL}/${chatID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.data || !response.data.content) {
                console.error("Некорректный ответ от сервера", response.data);
                return;
            }

            runInAction(() => {
                const { userID, userName, name, lastName, avatarURL, messages } = response.data.content;
                this.userID = userID;
                this.userName = userName;
                this.name = name;
                this.lastName = lastName;
                this.avatarURL = avatarURL || avatarLink;
                this.messages = messages;
            });
        } catch (error) {
            console.error("Ошибка при загрузке чатов:", error);
        }
    };

    addMessage = async (chatID: string, text: string) => {
        try {
            const token = TokenStore.token;
            if (!token) {
                console.error("Токен отсутствует");
                return;
            }

            await axios.post(
                `${apiChatsURL}/${chatID}/message`,
                { text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }
    };
}

export default new ChatStore();
