import { useEffect } from "react";
import axios from "axios";
import { apiPostsURL } from "../configs/constants";
import { PostProps } from "../components/Posts/Posts";
import { useStores } from "../stores/root-store-context";

export const usePosts = (id?: string) => {
    const { posts: { setPosts } } = useStores();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let response 
                if (id) {
                    response = await axios.get(`${apiPostsURL}?userID=${id}`)
                } else {
                    response = await axios.get(`${apiPostsURL}/all`)
                }

                if ( response.data.content && response.data.content.length > 0) {
                    const fetchedPosts = response.data.content.map((post: PostProps) => ({
                        id: post._id,
                        userID: post.userID,
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
                console.error("Ошибка при получении постов:", err); 
            }
        };

        fetchPosts();
    }, [id]); 
};
