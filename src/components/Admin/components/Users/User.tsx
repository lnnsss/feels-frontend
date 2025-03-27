import { Link } from "react-router-dom";
import s from "./Users.module.css"
import { observer } from "mobx-react-lite";
import { avatarLink } from "../../../../configs/constants";

interface User {
    userName: string,
    name: string,
    lastName: string,
    avatarURL: string
}

export const User: React.FC<User> = observer(({userName, name, lastName, avatarURL}) => {

    // Аватар пользователя
    const ava = avatarURL.length ? avatarURL : avatarLink;

    return (
        <Link to={`/admin/users/${userName}`} className={s.users__block}>
            <div
                className={s.users__block__avatar} 
                style={{ backgroundImage: `url(${ava})` }}
            />
            <div className={s.users__block__text}>
                <span className={s.users__block__name}>{name} {lastName}</span>
                <span className={s.users__block__userName}>@{userName}</span>
            </div>
        </Link>
    )
})
