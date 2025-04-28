import headerStore from "./header-store";
import modalStore from "./modal-store";
import postsStore from "./posts-store";
import profileStore from "./profile-store";
import tokenStore from "./token-store";
import userStore from "./user-store";
import usersStore from "./users-store";
import chatsStore from "./chats-store.ts";
import chatStore from "./chat-store.ts";
import SocketStore from "./socket-store.ts";

class RootStore {
    header = headerStore;
    modal = modalStore;
    posts = postsStore;
    profile = profileStore;
    token = tokenStore;
    user = userStore;
    users = usersStore;
    chats = chatsStore;
    chat = chatStore;
    socket = new SocketStore(chatStore);
}

export default RootStore;
