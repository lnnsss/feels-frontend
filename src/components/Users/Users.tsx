import React, { useState, useEffect } from "react";
import s from "./Users.module.css"
import UsersStore from "../../stores/users-store";
import axios from "axios";
import { apiURL } from "../../configs/constants";
import { observer } from "mobx-react-lite";

interface User {
    userName: string,
    name: string,
    lastName: string,
    avatarURL: string
}

export const Users: React.FC = observer(() => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [inputValue, setInputValue] = useState("");
    const { users, setUsers } = UsersStore;

    // Поле ввода
    const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    // Запрос на сервер
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${apiURL}/users`)
                setUsers(response.data.content)
                console.log(response.data.message, response.data.content);                
            } catch(err){
                console.error("Ошибка при получении пользователей", err);
            }
        }
        fetch()
    }, [])    

    return (
        <div className={s.users}>
            <div className={`__container ${s.users__container}`}>
                <div className={s.users__header}>
                    <div className={s.users__header__btns}>
                        <button className={activeFilter == "all" ? s.active : ""} onClick={() => setActiveFilter("all")}>Все пользователи</button>
                        <span></span>
                        <button className={activeFilter == "sub" ? s.active : ""} onClick={() => setActiveFilter("sub")}>Пользователи, на которых я подписан</button>
                    </div>
                    <input type="text" value={inputValue} onChange={handleChangeInputValue} placeholder="Введите юзернейм" />
                </div>
                <div className={s.users__blocks}>
                    {users.map( (u, i) => <User key={i} userName={u.userName} name={u.name} lastName={u.lastName} avatarURL={u.avatarURL} />)}
                </div>
            </div>
        </div>
    )
})

const User: React.FC<User> = observer(({userName, name, lastName, avatarURL}) => {
    return (
        <div className={s.users__block}>
            <div
                className={s.users__block__avatar} 
                style={{ backgroundImage: `url(${avatarURL})` }}
            />
            <h3>{name}</h3>
            <h3>{lastName}</h3>
            <h4>{userName}</h4>
        </div>
    )
})