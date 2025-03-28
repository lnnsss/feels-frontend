import s from "../Profile.module.css";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import useSubscription from "../../../hooks/useSubscription";
import { useStores } from "../../../stores/root-store-context";

export const SubscribeButtons: React.FC<{ userId: string }> = observer(({ userId }) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const { user: { subscriptions } } = useStores();
    
    const { handleSubscribeUser, handleUnsubscribeUser } = useSubscription(userId);

    useEffect(() => {
        if (userId) {
            setIsSubscribed(subscriptions.includes(userId));
        }
    }, [userId]);

    return (
        <>
            {isSubscribed
                ? <button className={s.profile__button} onClick={() => { handleUnsubscribeUser(); setIsSubscribed(false); }}>Отписаться</button>
                : <button className={s.profile__button} onClick={() => { handleSubscribeUser(); setIsSubscribed(true); }}>Подписаться</button>
            }
        </>
    );
});
