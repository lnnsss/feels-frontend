import React from "react"
import { Helmet } from "react-helmet";
import {useParams} from "react-router-dom";
import {Chat} from "../../Chat/Chat.tsx"

const ChatPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <Helmet>
                <title>{id}</title>
            </Helmet>
            <Chat />
        </>
    )
}
export default ChatPage