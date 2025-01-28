import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../configs/constants";
import PostStore from "../stores/post-store";
import UserStore from "../stores/user-store";

export const useAccountInfo = (id: string | undefined) => {
    const { setName, setLastName, setUserName, setAvatarURL, setStatus, setSubscriptions } = UserStore;
    const { setPosts } = PostStore;

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const [accountResponse, postsResponse] = await Promise.all([
                    axios.get(`${apiURL}/users/${id}`),
                    axios.get(`${apiURL}/posts?userID=${id}`),
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
                    createdAt: new Date(post.createdAt).toLocaleString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                    text: post.text,
                }));
                setPosts(fetchedPosts);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAccountInfo();
    }, [id, setName, setLastName, setUserName, setAvatarURL, setStatus, setSubscriptions, setPosts]);
};