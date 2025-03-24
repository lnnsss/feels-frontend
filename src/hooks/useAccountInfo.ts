import { useEffect } from "react";
import axios from "axios";
import { apiPostsURL, apiUsersURL } from "../configs/constants";
import { useStores } from "../stores/root-store-context";

export const useAccountInfo = (id: string | undefined) => {
    const { 
        post: { setPosts },
        user: { setName, setLastName, setUserName, setAvatarURL, setStatus, setSubscriptions }
    } = useStores(); 

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const [accountResponse, postsResponse] = await Promise.all([
                    axios.get(`${apiUsersURL}/${id}`),
                    axios.get(`${apiPostsURL}?userID=${id}`),
                ]);

                const { content } = accountResponse.data;
                setName(content.name);
                setLastName(content.lastName);
                setUserName(content.userName);
                setAvatarURL(content.avatarURL);
                setStatus(content.status);
                setSubscriptions(content.subscriptions);

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
            } catch (err) {
                console.error(err);
            }
        };

        fetchAccountInfo();
    }, [id, setName, setLastName, setUserName, setAvatarURL, setStatus, setSubscriptions, setPosts]);
};