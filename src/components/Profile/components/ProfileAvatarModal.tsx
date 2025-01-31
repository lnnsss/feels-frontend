import ProfileStore from "../../../stores/profile-store"

export const ProfileAvatarModal: React.FC = () => {
    const {avatarURL} = ProfileStore

    return (
        <img src={avatarURL} alt="avatar" />
    )
}