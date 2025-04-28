import { makeAutoObservable, runInAction } from "mobx";
import { io, Socket } from "socket.io-client";
import ChatStore from "./chat-store.ts";
import { serverURL } from "../configs/constants.ts";

class SocketStore {
    socket: Socket | null = null;
    chatStore: typeof ChatStore;
    reconnectAttempts: number = 0;
    maxReconnectAttempts: number = 5;
    reconnectDelay: number = 2000;

    constructor(chatStore: typeof ChatStore) {
        makeAutoObservable(this);
        this.chatStore = chatStore;
    }

    connect = () => {
        if (this.socket) return;

        const socket = io(serverURL, {
            transports: ["websocket", "polling"],
            reconnection: false,
        });

        socket.on("connect", () => {
            console.log("✅ Connected:", socket.id);
            runInAction(() => {
                this.socket = socket;
                this.reconnectAttempts = 0;
            });
        });

        socket.on("disconnect", () => {
            console.warn("⚠️ Disconnected");
            runInAction(() => {
                this.socket = null;
            });
            this.tryReconnect();
        });

        socket.on("connect_error", (error) => {
            console.error("❌ Connect error:", error);
            runInAction(() => {
                this.socket = null;
            });
            this.tryReconnect();
        });

        socket.on("newMessage", (data: any) => {
            console.log("💬 newMessage:", data);
            runInAction(() => {
                this.chatStore.messages.push({
                    userID: data.userID,
                    text: data.text,
                });
            });
        });
    }

    joinRoom = (chatID: string) => {
        if (!this.socket) {
            console.error("🚫 No socket to join room");
            return;
        }
        this.socket.emit("joinRoom", chatID);
        console.log(`🔵 Joined room ${chatID}`);
    }

    tryReconnect = () => {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error("🚫 Max reconnect attempts reached");
            return;
        }
        this.reconnectAttempts++;
        console.log(`🔄 Reconnect attempt ${this.reconnectAttempts}`);
        setTimeout(() => {
            this.connect();
        }, this.reconnectDelay);
    }

    sendMessage = (event: string, data: any) => {
        if (!this.socket) {
            console.error("🚫 No socket connection to send message");
            return;
        }
        this.socket.emit(event, data);
        console.log("📤 Sent event:", event, "data:", data);
    }

    disconnect = () => {
        this.socket?.disconnect();
        this.socket = null;
    }
}

export default SocketStore;
