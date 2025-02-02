import React, { useState, useEffect } from "react";
import s from "./Users.module.css"
import UsersStore from "../../stores/users-store";
import axios from "axios";
import { apiURL } from "../../configs/constants";
import { observer } from "mobx-react-lite";
import { User } from "./components/User";
import TokenStore from "../../stores/token-store";

export const Users: React.FC = observer(() => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [inputValue, setInputValue] = useState("");
    const { users, setUsers } = UsersStore;
    const id = TokenStore.getID()

    // Поле ввода
    const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    // Запрос на сервер
    useEffect(() => {
        const fetch = async () => {
            try {
                if (activeFilter == "sub") {
                    const response = await axios.get(`${apiURL}/users/${id}/subscriptions`)
                    setUsers(response.data.content)
                    console.log(response.data.message, response.data.content);  
                } else {
                    const response = await axios.get(`${apiURL}/users`)
                    setUsers(response.data.content)
                    console.log(response.data.message, response.data.content);   
                }             
            } catch(err){
                console.error("Ошибка при получении пользователей", err);
            }
        }
        fetch()
    }, [activeFilter])    

    // Фильтрация по введенным данным
    const filteredUsers = users.filter(user => {
        const searchTerm = inputValue.toLowerCase();
        return (
            user.userName.toLowerCase().includes(searchTerm) ||
            user.name.toLowerCase().includes(searchTerm) ||
            user.lastName.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <div className={s.users}>
            <div className={`__container ${s.users__container}`}>
                <div className={s.users__header}>
                    <div className={s.users__header__btns}>
                        <button className={activeFilter == "all" ? s.active : ""} onClick={() => setActiveFilter("all")}>Все пользователи</button>
                        <span></span>
                        <button className={activeFilter == "sub" ? s.active : ""} onClick={() => setActiveFilter("sub")}>Подписки</button>
                    </div>
                    <input type="text" value={inputValue} onChange={handleChangeInputValue} placeholder="Введите имя, фамилию или юзернейм" />
                </div>
                <div className={s.users__blocks}>
                    {filteredUsers.length > 0
                    ? filteredUsers.map( (u, i) => <User key={i} userName={u.userName} name={u.name} lastName={u.lastName} avatarURL={u.avatarURL} />)
                    : <span className={s.users__empty}>Нету пользователей</span>
                }
                </div>
            </div>
        </div>
    )
})