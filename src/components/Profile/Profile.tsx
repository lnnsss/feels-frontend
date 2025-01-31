import s from "./Profile.module.css"

export const Profile: React.FC = () => {
    return (
        <div className={s.profile}>
            <div className={`__container ${s.profile__container}`}>
                профиль
            </div>
        </div>
    )
}