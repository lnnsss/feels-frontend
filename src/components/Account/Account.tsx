import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./Account.module.css";
import TokenStore from "../../stores/token-store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../configs/constants";

interface PostProps {
    name: string;
    createdAt: string; 
    text: string;
}
interface PostBodyProps {
    userID: string | undefined,
    text: string
}

export const Account: React.FC = observer(() => {
    const [inputValue, setInputValue] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [avatarURL, setAvatarURL] = useState<string>("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncwmjK9JtQBeWuoCPkioKY3gsv4l7L7_Egw&s");
    const [status, setStatus] = useState<string>("");
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const [posts, setPosts] = useState<PostProps[]>([]);
    const { clearToken, getID } = TokenStore;
    const navigate = useNavigate();
    const id = getID();
    
    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const accountResponse = await axios.get(`${apiURL}/users/${id}`);
                const postsResponse = await axios.get(`${apiURL}/posts?userID=${id}`);
                const { content } = accountResponse.data
                setName(content.name);
                setLastName(content.lastName);
                setUserName(content.userName);
                setAvatarURL(content.avatarURL);
                setStatus(content.status);
                setSubscriptions(content.subscriptions);
                
                const fetchedPosts = postsResponse.data.content.map((post: any) => ({
                    name,
                    createdAt: new Date(post.createdAt).toLocaleString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    text: post.text,
                }));
                setPosts(fetchedPosts);
                
            } catch (err) {
                console.error(err);
            }
        };
        fetchAccountInfo();
    }, [id]);

    const handleLogOut = (): void => {
        clearToken();
        navigate('/registration');
    }      

    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
    }

    const handleAddNewPost = (): void => {
        try {
            const addPost = async (): Promise<void> => {
                const newPost: PostProps = {
                    name,
                    createdAt: new Date().toISOString(),
                    text: inputValue
                };
        
                const body: PostBodyProps = {
                    userID: id,
                    text: inputValue
                }
                const response = await axios.post(`${apiURL}/posts`, body)
                        
                setPosts(prevPosts => [
                    ...prevPosts,
                    {
                        ...newPost,
                            createdAt: new Date(newPost.createdAt).toLocaleString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })
                    }
                ]);
                
                setInputValue("");
                console.log(response);                
            }
            addPost()
        } catch(err) {
            console.error(err);
        }
    };

    const handleStatusClick = async (): Promise<void> => {
        await navigator.clipboard.writeText(status);
    }

    return (
        <div className={s.account}>
            <div className={`__container ${s.account__container}`}>
                <div className={s.account__left}>
                    <button>Подписки</button>
                    <button>Редактировать</button>
                    <button onClick={handleLogOut}>Выйти</button>
                </div>
                <div className={s.account__right}>
                    <div className={s.account__header}>
                        <img className={s.account__avatar} src={avatarURL.length ? avatarURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncwmjK9JtQBeWuoCPkioKY3gsv4l7L7_Egw&s"} alt="avatar" />
                        <h2 className={s.account__name}>{name} {lastName}</h2>
                        <button onClick={handleStatusClick} className={s.account__username}>@{userName}</button>
                        <h3 className={s.account__status}>{status}</h3>
                        <h4 className={s.account__subscribes}>Подписки: {subscriptions.length}</h4>
                    </div>
                    <div className={s.account__createPost}>
                        <input type="text" value={inputValue} onChange={handleChangeInputValue} />
                        <button onClick={handleAddNewPost}>Опубликовать</button>
                    </div>
                    <div className={s.account__posts}>
                        {posts.map((p, i) => (
                            <Post key={i} name={name} createdAt={p.createdAt} text={p.text} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

const Post = ({ name, createdAt, text }: PostProps) => {
    return (
        <div className={s.account__post}>
            <div className={s.account__post__header}>
                <h3 className={s.account__post__name}>{name}</h3>
                <h4 className={s.account__post__date}>{createdAt}</h4>
            </div>
            <p className={s.account__post__text}>{text}</p>
        </div>
    );
};
