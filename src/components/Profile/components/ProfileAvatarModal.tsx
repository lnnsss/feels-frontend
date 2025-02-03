import ProfileStore from "../../../stores/profile-store"

export const ProfileAvatarModal: React.FC = () => {
    const {avatarURL} = ProfileStore

    return (
        <img src={avatarURL} alt="avatar" style={{ width: '60vw', height: '60vw', objectFit: 'cover' }}/>
    )
}