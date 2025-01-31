import UserStore from "../../../stores/user-store"

export const AvatarModal: React.FC = () => {
    const {avatarURL} = UserStore

    return (
        <img src={avatarURL} alt="avatar" />
    )
}