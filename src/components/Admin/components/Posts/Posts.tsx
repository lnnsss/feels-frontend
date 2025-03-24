import s from "./Posts.module.css";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { usePosts } from "../../../../hooks/usePosts";
import axios from "axios";
import { apiPostsURL } from "../../../../configs/constants";
import { useStores } from "../../../../stores/root-store-context";
import React from "react";

export interface UserInfo {
    userName: string;
    name: string;
    lastName: string;
}

export interface PostProps {
    id: string;
    userID: UserInfo;
    createdAt: string;
    text: string;
    color: string;
}

export const Posts: React.FC = observer(() => {
    const { posts: { posts, removePost } } = useStores();

    // Загружаем посты
    usePosts();

    const handleDeletePost = async (id: string) => {
        try {
            await axios.delete(`${apiPostsURL}/${id}`);
            removePost(id);
        } catch (error) {
            console.error("Ошибка при удалении поста:", error);
        }
    };

    return (
        <div className={s.posts}>
            <div className={`__container ${s.posts__container}`}>
                <div className={s.posts__blocks}>
                    {
                        posts.length
                            ? posts.map((p) => (
                                <Post
                                    key={p.id}
                                    id={p.id}
                                    userID={p.userID}
                                    createdAt={p.createdAt}
                                    text={p.text}
                                    color={p.color}
                                    onDelete={handleDeletePost}
                                />
                            ))
                            : (<span className={s.posts__null}>Посты отсутствуют</span>)
                    }
                </div>
            </div>
        </div>
    );
});

const Post: React.FC<PostProps & { onDelete: (id: string) => void }> = observer(({ id, userID, createdAt, text, color, onDelete }) => {
    return (
        <div className={s.posts__block} style={{ border: `2px solid ${color}` }}>
            <div className={s.posts__block__header}>
                <Link to={`/admin/users/${userID.userName}`} className={s.posts__block__name}>
                    {userID.name} {userID.lastName}
                </Link>
                <p className={s.posts__block__text}>{text}</p>
                <h4 className={s.posts__block__date}>{createdAt}</h4>
            </div>
            <button className={s.posts__block__delBtn} onClick={() => onDelete(id)}>Удалить</button>
        </div>
    );
});
