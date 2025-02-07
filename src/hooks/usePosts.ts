import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../configs/constants";
import PostsStore from "../stores/posts-store";
import { PostProps } from "../components/Posts/Posts";

export const usePosts = () => {
    const { setPosts } = PostsStore;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${apiURL}/posts/all`)

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
    }, []); 
};
