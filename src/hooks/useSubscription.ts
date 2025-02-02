import axios from "axios";
import UserStore from "../stores/user-store";
import TokenStore from "../stores/token-store";
import { apiURL } from "../configs/constants";

const useSubscription = (subscriptionID: string) => {
    const { setSubscriptions } = UserStore;
    const { getID } = TokenStore;
    const ourID = getID();

    // Подписаться на пользователя 
    const handleSubscribeUser = async (): Promise<void> => {
        try {
            const response = await axios.patch(
                `${apiURL}/users/${ourID}/subscribe`, 
                {
                    subscriptionID, 
                }
            );
            setSubscriptions(response.data.content);
            console.log("Подписка успешно оформлена:", response.data.content);
        } catch (err) {
            console.error("Ошибка при попытке подписки:", err);
        }
    };

    // Отписаться от пользователя 
    const handleUnsubscribeUser = async (): Promise<void> => {
        try {
            const response = await axios.patch(
                `${apiURL}/users/${ourID}/unsubscribe`, 
                {
                    subscriptionID, 
                }
            );
            setSubscriptions(response.data.content);
            console.log("Успешная отписка:", response.data.content);
        } catch (err) {
            console.error("Ошибка при попытке отписки:", err);
        }
    };

    return { handleSubscribeUser, handleUnsubscribeUser };
};

export default useSubscription;
