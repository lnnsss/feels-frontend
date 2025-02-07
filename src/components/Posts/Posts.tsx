import React from "react";
import s from "./Posts.module.css"
import { observer } from "mobx-react-lite";
import PostsStore from "../../stores/posts-store";
import { Link } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";

export interface UserInfo {
    userName: string;
    name: string;
    lastName: string;
}

export interface PostProps {
    _id?: string;
    userID: UserInfo;
    createdAt: string; 
    text: string;
    color: string;
}

export const Posts: React.FC = observer(() => {
    const { posts } = PostsStore

    // Получаем посты
    usePosts()

    return (
        <div className={s.posts}>
            <div className={`__container ${s.posts__container}`}>
                <div className={s.posts__blocks}>
                    {posts.map((p, i) => <Post key={i} userID={p.userID} createdAt={p.createdAt} text={p.text} color={p.color} />)}
                </div>
            </div>
        </div>
    )
})

const Post: React.FC<PostProps> = observer(({ userID, createdAt, text, color }: PostProps) => {    
    return (
        <div className={s.posts__block} style={{ border: `2px solid ${color}` }}>
            <div className={s.posts__block__header}>
                <Link to={`/users/${userID.userName}`} className={s.posts__block__name}>{userID.name} {userID.lastName}</Link>
                <h4 className={s.posts__block__date}>{createdAt}</h4>
            </div>
            <p className={s.posts__block__text}>{text}</p>
        </div>
    );
});