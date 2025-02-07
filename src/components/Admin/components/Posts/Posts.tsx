import React from "react";
import s from "./Posts.module.css"
import { observer } from "mobx-react-lite";
import PostsStore from "../../../../stores/posts-store";
import { Link } from "react-router-dom";
import { usePosts } from "../../../../hooks/usePosts";
import axios from "axios";
import { apiURL } from "../../../../configs/constants";

export interface UserInfo {
    userName: string;
    name: string;
    lastName: string;
}

export interface PostProps {
    id: string
    userID: UserInfo
    createdAt: string; 
    text: string;
    color: string;
}

const handleDeletePost = async (id: string) => {
    try {
      await axios.delete(`${apiURL}/posts/${id}`);
      PostsStore.removePost(id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

export const Posts: React.FC = observer(() => {
    const { posts } = PostsStore

    // Получаем посты
    usePosts()

    return (
        <div className={s.posts}>
            <div className={`__container ${s.posts__container}`}>
                <div className={s.posts__blocks}>
                    {posts.map((p, i) => <Post key={i} id={p.id} userID={p.userID} createdAt={p.createdAt} text={p.text} color={p.color} />)}
                </div>
            </div>
        </div>
    )
})

const Post: React.FC<PostProps> = observer(({ id, userID, createdAt, text, color }: PostProps) => {    
    return (
        <div className={s.posts__block} style={{ border: `2px solid ${color}` }}>
            <div className={s.posts__block__header}>
                <Link to={`/users/${userID.userName}`} className={s.posts__block__name}>{userID.name} {userID.lastName}</Link>
                <p className={s.posts__block__text}>{text}</p>
                <h4 className={s.posts__block__date}>{createdAt}</h4>
            </div>
            <button className={s.posts__block__delBtn} onClick={() => handleDeletePost(id)} >Удалить</button>
        </div>
    );
});