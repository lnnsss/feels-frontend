import UserStore from "../../../stores/user-store"

export const AccountAvatarModal: React.FC = () => {
    const {avatarURL} = UserStore

    return (
        <img src={avatarURL} alt="avatar" style={{ width: '60vw', height: '60vw', objectFit: 'cover' }}/>
    )
}