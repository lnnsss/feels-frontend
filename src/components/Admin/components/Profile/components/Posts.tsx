import React from "react";
import s from "../Profile.module.css"
import { observer } from "mobx-react-lite";
import { usePosts } from "../../../../../hooks/usePosts";
import axios from "axios";
import { apiURL } from "../../../../../configs/constants";
import { useStores } from "../../../../../stores/root-store-context";

interface PostProps {
    id: string
    createdAt: string; 
    text: string;
    color: string;
}
interface IPosts {
    id?: string
}

const handleDeletePost = async (id: string) => {
    const { posts: { removePost } } = useStores();

    try {
      await axios.delete(`${apiURL}/posts/${id}`);
      removePost(id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

export const Posts: React.FC<IPosts> = observer(({id}) => {
    const { posts: { posts } } = useStores();

    // Получаем посты
    usePosts(id)

    return (
        <div className={s.posts__blocks}>
            {posts.map((p, i) => <Post key={i} id={p.id} createdAt={p.createdAt} text={p.text} color={p.color} />)}
        </div>
    )
})

const Post: React.FC<PostProps> = observer(({ id, createdAt, text, color }: PostProps) => {    
    return (
        <div className={s.posts__block} style={{ border: `2px solid ${color}` }}>
            <div className={s.posts__block__header}>
                <p className={s.posts__block__text}>{text}</p>
                <h4 className={s.posts__block__date}>{createdAt}</h4>
            </div>
            <button className={s.posts__block__delBtn} onClick={() => handleDeletePost(id)} >Удалить</button>
        </div>
    );
});