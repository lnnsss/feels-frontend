import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../configs/constants";
import ProfilePostStore from "../stores/profile-post-store";
import ProfileStore from "../stores/profile-store";

export const useProfileInfo = (userName: string | undefined) => {
    const { setID, setName, setLastName, setAvatarURL, setStatus, setSubscriptions } = ProfileStore;
    const { setPosts } = ProfilePostStore;

    useEffect(() => {
        const fetchAccountInfo = async () => {
            if (!userName) return; 

            try {
                const [accountResponse, postsResponse] = await Promise.all([
                    axios.get(`${apiURL}/users?userName=${userName}`), 
                    axios.get(`${apiURL}/posts?userName=${userName}`),
                ]);

                const { content } = accountResponse.data;          
                setID(content._id)
                setName(content.name);
                setLastName(content.lastName);
                setAvatarURL(content.avatarURL);
                setStatus(content.status);
                setSubscriptions(content.subscriptions);

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
