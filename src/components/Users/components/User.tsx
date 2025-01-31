import { Link } from "react-router-dom";
import s from "../Users.module.css"
import { observer } from "mobx-react-lite";

interface User {
    userName: string,
    name: string,
    lastName: string,
    avatarURL: string
}

export const User: React.FC<User> = observer(({userName, name, lastName, avatarURL}) => {

    // Аватар пользователя
    const ava = avatarURL.length ? avatarURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncwmjK9JtQBeWuoCPkioKY3gsv4l7L7_Egw&s";

    return (
        <Link to={`/users/${userName}`} className={s.users__block}>
            <div
                className={s.users__block__avatar} 
                style={{ backgroundImage: `url(${ava})` }}
            />
            <div className={s.users__block__text}>
                <h3>{name} {lastName}</h3>
                <h4>@{userName}</h4>
            </div>
        </Link>
    )
})