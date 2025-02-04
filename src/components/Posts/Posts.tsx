import React, { useEffect } from "react";
import s from "./Posts.module.css"
import { observer } from "mobx-react-lite";
import PostsStore from "../../stores/posts-store";
import { apiURL } from "../../configs/constants";
import axios from "axios";

export interface PostProps {
    name: string;
    createdAt: string; 
    text: string;
    color: string;
}

export const Posts: React.FC = () => {
    const { posts, setPosts } = PostsStore
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${apiURL}/posts`)
                setPosts(response.data.content)
            } catch(err) {
                console.error("Ошибка при получении постов: ", err);                
            }
        }
        fetch()
    }, [])

    return (
        <div className={s.posts}>
            <div className={`__container ${s.posts__container}`}>
                <div className={s.posts__blocks}>
                    {posts.map((p, i) => <Post key={i} name={p.name} createdAt={p.createdAt} text={p.text} color={p.color} />)}
                </div>
            </div>
        </div>
    )
}

const Post: React.FC<PostProps> = observer(({ name, createdAt, text, color }: PostProps) => {    
    return (
        <div className={s.posts__block} style={{ border: `2px solid ${color}` }}>
            <div className={s.posts__block__header}>
                <h3 className={s.posts__block__name}>{name}</h3>
                <h4 className={s.posts__block__date}>{createdAt}</h4>
            </div>
            <p className={s.posts__block__text}>{text}</p>
        </div>
    );
});