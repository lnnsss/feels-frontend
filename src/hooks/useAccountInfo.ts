import { useEffect } from "react";
import axios from "axios";
import { apiUsersURL } from "../configs/constants";
import { useStores } from "../stores/root-store-context";
import {Post} from "../stores/profile-store.ts";

export const useAccountInfo = (id: string | undefined) => {
    const {
        user: { setName, setLastName, setUserName, setAvatarURL, setStatus, setSubscriptions, setPosts }
    } = useStores(); 

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const response = await axios.get(`${apiUsersURL}/${id}/idInfo`);

                const { name, lastName, userName, avatarURL, status, subscriptions, posts } = response.data.content;
                setName(name);
                setLastName(lastName);
                setUserName(userName);
                setAvatarURL(avatarURL);
                setStatus(status);
                setSubscriptions(subscriptions);

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
            } catch (err) {
                console.error(err);
            }
        };

        fetchAccountInfo();
    }, [id, setName, setLastName, setUserName, setAvatarURL, setStatus, setSubscriptions, setPosts]);
};