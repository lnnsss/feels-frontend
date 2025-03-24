import React from "react"
import { Helmet } from "react-helmet";
import {Chats} from "../../Chats/Chats.tsx";

const ChatsPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Переписки</title>
            </Helmet>
            <Chats />
        </>
    )
}
export default ChatsPage