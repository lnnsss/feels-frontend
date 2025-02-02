import ProfileStore from "../../../stores/profile-store"

export const ProfileAvatarModal: React.FC = () => {
    const {avatarURL} = ProfileStore

    return (
        <img src={avatarURL} alt="avatar" style={{ width: '70vw', height: '70vw', objectFit: 'cover' }}/>
    )
}