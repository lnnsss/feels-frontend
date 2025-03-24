import React, { useEffect,useState } from "react"
import axios from "axios"
import s from "./Users.module.css"
import { apiUsersURL } from "../../../../configs/constants"
import { User } from "./User"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../../stores/root-store-context"

export const Users: React.FC = observer(() => {
    const { users: { users, setUsers } } = useStores();
    const [inputValue, setInputValue] = useState("");
    
    // Запрос на сервер
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(apiUsersURL)
                setUsers(response.data.content)
                console.log(response.data.message, response.data.content);   
            } catch(err){
                console.error("Ошибка при получении пользователей", err);
            }
        }
        fetch()
    }, [])  

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