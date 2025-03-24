import axios from "axios";
import { apiUsersURL } from "../configs/constants";
import { useStores } from "../stores/root-store-context";

const useSubscription = (subscriptionID: string) => {
    const { 
        token: { getID },
        user: { setSubscriptions }
    } = useStores();
    
    const ourID = getID();

    // Подписаться на пользователя 
    const handleSubscribeUser = async (): Promise<void> => {
        try {
            const response = await axios.patch(
                `${apiUsersURL}/${ourID}/subscribe`,
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
                `${apiUsersURL}/${ourID}/unsubscribe`,
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
