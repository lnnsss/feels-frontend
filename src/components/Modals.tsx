import React from "react";
import Modal from "./UI/Modal/Modal";
import ModalStore from "../stores/modal-store";
import { observer } from "mobx-react-lite";
import { EditingModal } from "./Account/components/EditingModal";
import { AccountAvatarModal } from "./Account/components/AccountAvatarModal";
import { ProfileAvatarModal } from "./Profile/components/ProfileAvatarModal";
import { SubscriptionsModal } from "./Account/components/SubscriptionsModal";

const Modals: React.FC = observer(() => {
    const { isEditingModalActive, isAccountAvatarModalActive, isProfileAvatarModalActive, isSubscribtionsModalActive } = ModalStore

    return (
        <Modal>
            {isEditingModalActive && <EditingModal />}
            {isAccountAvatarModalActive && <AccountAvatarModal />}
            {isProfileAvatarModalActive && <ProfileAvatarModal />}
            {isSubscribtionsModalActive && <SubscriptionsModal />}
        </Modal>
    )
})



export default Modals