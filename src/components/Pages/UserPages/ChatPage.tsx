import React from "react";
import { Helmet } from "react-helmet";
import { Chat } from "../../Chat/Chat.tsx";
import {useStores} from "../../../stores/root-store-context.ts";
import {observer} from "mobx-react-lite";

const ChatPage: React.FC = observer(() => {
    const {
        chat: {name, lastName}
    } = useStores()

    return (
        <>
            <Helmet>
                <title>{name} {lastName}</title>
            </Helmet>
            <Chat />
        </>
    );
});

export default ChatPage;
