import { useStores } from "../../../stores/root-store-context";

export const AccountAvatarModal: React.FC = () => {
    const { user: { avatarURL } } = useStores();

    return (
        <img src={avatarURL} alt="avatar" style={{ width: '60vw', height: '60vw', objectFit: 'cover' }}/>
    )
}