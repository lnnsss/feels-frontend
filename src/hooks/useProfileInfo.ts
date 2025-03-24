import { useEffect } from "react";
import axios from "axios";
import { apiPostsURL, apiUsersURL } from "../configs/constants";
import { useStores } from "../stores/root-store-context";

export const useProfileInfo = (userName: string | undefined) => {
    const { 
        profilePost: { setPosts },
        profile: { setID, setName, setLastName, setAvatarURL, setStatus, setSubscriptions, setPostsCount }
    } = useStores();

    useEffect(() => {
        const fetchAccountInfo = async () => {
            if (!userName) return; 

            try {

                // Запросы на получение данных пользователя и его постов
                const [accountResponse, postsResponse] = await Promise.all([
                    axios.get(`${apiUsersURL}?userName=${userName}`),
                    axios.get(`${apiPostsURL}?userName=${userName}`),
                ]);

                // Данные пользователя
                const { content } = accountResponse.data;          
                setID(content._id)
                setName(content.name);
                setLastName(content.lastName);
                setAvatarURL(content.avatarURL);
                setStatus(content.status);
                setSubscriptions(content.subscriptions);

                // Количество постов пользователя
                const postsCountResponse = await axios.get(`${apiPostsURL}/count?userID=${content._id}`)
                setPostsCount(postsCountResponse.data.content)

                // Посты пользователя
                if ( postsResponse.data.content && postsResponse.data.content.length > 0) {
                    const fetchedPosts = postsResponse.data.content.map((post: any) => ({
                        name: content.name,
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
                    setPosts(fetchedPosts);
                } else {
                    setPosts([]);
                }
                
            } catch (err) {
                console.error("Ошибка при получении данных профиля:", err); 
            }
        };

        fetchAccountInfo();
    }, [userName]); 
};
