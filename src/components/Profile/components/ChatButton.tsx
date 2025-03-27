import React from "react";
import axios from "axios"; // Импортируйте Axios
import s from "../Profile.module.css";
import { apiChatsURL } from "../../../configs/constants";
import { useStores } from "../../../stores/root-store-context";
import { useNavigate } from "react-router-dom";

interface Props {
    id: string; 
}

export const ChatButton: React.FC<Props> = ({ id }) => {
    const { 
        token: {token}
    } = useStores();
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        try {
            const body = {
                partnerId: id,
            };

            const response = await axios.post(apiChatsURL, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const chatId = response.data.content._id;
            navigate(`/chats/${chatId}`)
        } catch (error) {
            console.error(error); 
            alert("Ошибка при отправке запроса"); 
        }
    };

    return (
        <button className={s.profile__button} onClick={handleButtonClick}>
            Написать
        </button>
    );
};
