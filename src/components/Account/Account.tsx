import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./Account.module.css"
import TokenStore from "../../stores/token-store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../configs/constants";

interface PostProps {
    name: string;
    date: string; 
    text: string;
}

const posts: PostProps[] = [
    {name: "Тимур", date: "26 января 2025", text: "in work"},
    {name: "Тимур", date: "27 января 2025", text: "щас бы амняма из вкусноточки..."},
    {name: "Тимур", date: "28 января 2025", text: "laptop boys 2 on the way"}
]

export const Account: React.FC = observer(() => {
    const [inputValue, setInputValue] = useState("");
    const {clearToken, getID} = TokenStore
    const navigate = useNavigate();
    const id = getID();

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const response = await axios.get(`${apiURL}/users/${id}`)
                console.log(response.data.content);
            } catch(err) {
                console.error(err);                
            }
        }
        fetchAccountInfo()
    }, [])

    const handleLogOut = (): void => {
        clearToken()
        navigate('/registration');
    }      

    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
    }

    const handleAddNewPost = (): void => {
        const newPost = {
            name: "Тимур",
            date: "28 января 2025",
            text: inputValue
        }
        posts.push(newPost)
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
                        <img className={s.account__avatar} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncwmjK9JtQBeWuoCPkioKY3gsv4l7L7_Egw&s" alt="avatar" />
                        <h2 className={s.account__name}>Тимур Безбородников</h2>
                        <h3 className={s.account__username}>@lnnsss</h3>
                        <h3 className={s.account__status}>almost alive</h3>
                        <h4 className={s.account__subscribes}>Подписки: 14</h4>
                    </div>
                    <div className={s.account__createPost}>
                        <input type="text" value={inputValue} onChange={handleChangeInputValue} />
                        <button onClick={handleAddNewPost}>Опубликовать</button>
                    </div>
                    <div className={s.account__posts}>
                        {posts.map( (p, i) => <Post key={i} name={p.name} date={p.date} text={p.text} />)}
                    </div>
                </div>
            </div>
        </div>
    )
})

const Post = ({name, date, text}: PostProps) => {
    return (
        <div className={s.account__post}>
            <div className={s.account__post__header}>
                <h3 className={s.account__post__name}>{name}</h3>
                <h4 className={s.account__post__date}>{date}</h4>
            </div>
            <p className={s.account__post__text}>{text}</p>
        </div>
    )
}