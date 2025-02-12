import { useStores } from "../../../stores/root-store-context";

export const ProfileAvatarModal: React.FC = () => {
    const { profile: { avatarURL } } = useStores();

    return (
        <img src={avatarURL} alt="avatar" style={{ width: '60vw', height: '60vw', objectFit: 'cover' }}/>
    )
}