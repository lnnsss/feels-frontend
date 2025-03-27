import { useEffect } from "react";
import axios from "axios";
import { apiUsersURL } from "../configs/constants";
import { useStores } from "../stores/root-store-context";
import {Post} from "../stores/profile-store.ts";

export const useProfileInfo = (userName: string | undefined) => {
    const {
        profile: { setID, setName, setLastName, setAvatarURL, setStatus, setSubscriptions, setPosts }
    } = useStores();

    useEffect(() => {
        const fetchProfileInfo = async () => {
            if (!userName) return; 

            try {

                // Запрос на получение данных пользователя
                const response = await axios.get(`${apiUsersURL}/${userName}/userNameInfo`);

                // Данные пользователя
                const { _id, name, lastName, avatarURL, status, subscriptions, posts } = response.data.content;
                setID(_id)
                setName(name);
                setLastName(lastName);
                setAvatarURL(avatarURL);
                setStatus(status);
                setSubscriptions(subscriptions);

                // Посты пользователя
                if ( posts.length > 0) {
                    const issuedPosts = posts.map((post: Post) => ({
                        name: name,
                        createdAt: `${new Date(post.createdAt).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })} ${new Date(post.createdAt).toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false, 
                        })}`,
                        text: post.text,
                        color: post.color
                    }));
                    setPosts(issuedPosts);
                } else {
                    setPosts([]);
                }
                
            } catch (err) {
                console.error("Ошибка при получении данных профиля:", err); 
            }
        };

        fetchProfileInfo();
    }, [userName]); 
};
