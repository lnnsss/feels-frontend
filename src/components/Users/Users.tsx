import React, { useState, useEffect } from "react";
import s from "./Users.module.css"
import axios from "axios";
import { apiUsersURL } from "../../configs/constants";
import { observer } from "mobx-react-lite";
import { User } from "./components/User";
import { useStores } from "../../stores/root-store-context";

export const Users: React.FC = observer(() => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [inputValue, setInputValue] = useState("");
    const { 
        token: { getID },
        users: { users, setUsers }
    } = useStores();
    const id = getID()

    // Запрос на сервер
    useEffect(() => {
        const fetch = async () => {
            try {
                if (activeFilter == "sub") { // получаем пользователей, на которых пользователь подписан
                    if (id) { // проверяем авторизован ли пользователь
                        const response = await axios.get(`${apiUsersURL}/${id}/subscriptions`)
                        setUsers(response.data.content)
                    } else {
                        setUsers([])
                    }
                } else { // получаем всех пользователей
                    const response = await axios.get(apiUsersURL)
                    setUsers(response.data.content)
                } 
            } catch(err){
                console.error("Ошибка при получении пользователей", err);
            }
        }
        fetch()
    }, [activeFilter])    

    // Поле ввода
    const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

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