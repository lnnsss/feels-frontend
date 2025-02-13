import React from "react";
import Modal from "./UI/Modal/Modal";
import { observer } from "mobx-react-lite";
import { EditingModal } from "./Account/components/EditingModal";
import { AccountAvatarModal } from "./Account/components/AccountAvatarModal";
import { ProfileAvatarModal } from "./Profile/components/ProfileAvatarModal";
import { SubscriptionsModal } from "./Account/components/SubscriptionsModal";
import { ProfileEditModal } from "./Admin/components/Profile/components/ProfileEditModal";
import { useStores } from "../stores/root-store-context";

const Modals: React.FC = observer(() => {
    const { modal: { isEditingModalActive, isProfileEditModalActive, isAccountAvatarModalActive, isProfileAvatarModalActive, isSubscribtionsModalActive, profileEditUserId } } = useStores();

    return (
        <Modal>
            {isEditingModalActive && <EditingModal />}
            {isProfileEditModalActive && profileEditUserId && ( <ProfileEditModal id={profileEditUserId} /> )}
            {isAccountAvatarModalActive && <AccountAvatarModal />}
            {isProfileAvatarModalActive && <ProfileAvatarModal />}
            {isSubscribtionsModalActive && <SubscriptionsModal />}
        </Modal>
    )
})

export default Modals